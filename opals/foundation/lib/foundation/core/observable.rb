# 
# key_value_observing.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

module CherryKit
  
  # Observer pattern
  # 
  # Observers via callback, all keys:
  # 
  #   :old  => old value
  #   :new  => new value
  #   :path => attribute path
  #
  module Observable
    
    def will_change_attribute(attribute)
      if @__observer_info
        __send_change_notifications attribute.to_s, true, :kind => :setting 
      end
    end
    
    def did_change_attribute(attribute)
      if @__observer_info
        __send_change_notifications attribute.to_s, false, nil
      end
    end
    
    
    # New
    # 
    # @returns {Proc} action the observer
    # 
    def observe(path, &action)
      # always deal with strings for path names (not symbols)
      path = path.to_s
      # ensure we have our observer dictionary
      @__observer_info ||= {}
      
      
      if path.index '.'
        # puts "looking up observer info"
        # puts self
        ForwardingObserver.new(self, path, &action)
      # else
      end
        __replace_setter_for_key path
      # end
      
      observer_info = @__observer_info[path]
      
      # add the observer
      observer_info[:observers] << action
      
      action
    end
    
    
  
    # Private method to replace the setter methods for the given key.
    # 
    # @param [String] key
    # @returns nil
    # 
    def __replace_setter_for_key(key)
      key = key.to_s
      
      # puts "replacing setter for #{key}"
      
      # if we have already done this key, skip
      return if @__observer_info[key]
      
      # mark key as being replaced
      @__observer_info[key] = observer_info = {
          # an array of procs. These are what we notify when we change
          :observers  => [],
          # change. This is usually the old value, which we store (will_change)
          :change     => nil,
          # dependants - the keys which depend on this key
          :dependants => []
        }
    
      methods_to_replace = {
        "#{key}=" => proc do |key, original_method|
          # we simply return a closure which takes a single param, the value. We
          # gather the key for sending will_change_value_for_key(), and keep our
          # original method so we can call it between notifications
          proc do |value|
            will_change_attribute(key)
            `#{original_method}.apply(#{self}, [#{value}]);`
            did_change_attribute(key)
          end
        end
      }
    
      methods_to_replace.each do |method_id, implementation|
        `var js_id = #{self}.mid2jsid(#{method_id.to_s}.toString());`
        # only replace method if we have implemented it
        if respond_to? method_id
          original = `#{self}[js_id];`
          # define new method as result of calling the closure
          `#{self}[js_id] = #{implementation}.apply(#{implementation}.__self__, [#{key}, #{original}]);`
        end
      end
      
      # puts "looking up dependencies for #{key}"
      # puts self.class.lookup_affecting_keys_for(key)
      # go through all dependencies (keys affecting)
      self.class.lookup_affecting_keys_for(key).each do |affecting_key|
        __replace_setter_for_key affecting_key
        @__observer_info[affecting_key.to_s][:dependants] << key
      end
    
    end
  
    # Notifications that we are about to change the key, did change etc
    def __send_change_notifications(key, before, options)
      key = key.to_s
      # puts "sending notification for key #{key}"
      options = options || {}
     
      # if we are sending a notification before we change the value
      # (will_change_value_for_key)
      if before
        # puts "will_change: #{key}"
        # notify dependants
        @__observer_info[key][:dependants].each do |dependee|
          __send_change_notifications(dependee, true, {})
        end
        
        old_value = get_attribute key
        @__observer_info[key][:change] = old_value
      else
        # after..
        old_value = @__observer_info[key][:change]
        new_value = get_attribute key
        
        changes = {}
        changes[:old] = old_value
        changes[:new] = new_value
        changes[:path] = key
        changes[:object] = self

        # notify every observer that we have changed
        # puts "did_change: #{key}"
        @__observer_info[key][:observers].each do |block_callback|
          `#{block_callback}.apply(#{block_callback}.__self__, [#{changes}]);`
        end
  
        # puts "dependee keys for #{key} are:"
        # `console.log(#{@__observer_info[key][:dependants]});`
        @__observer_info[key][:dependants].each do |dependee|
          __send_change_notifications(dependee, false, {})
        end
      end
    end
    
    # Remove an observing object for the given key path
    def remove_observer(observer, path)
      observers = @__observer_info[path.to_s][:observers]
      
      observers.delete(observer)
    end

    
  end
  
  
  
end

# Forward observer calls for multipart observer paths
class ForwardingObserver
  
  def initialize(object, path, action)
    
    @object = object
    @path = path
    @action = action
    
    index = path.index '.'
    
    unless index
      raise "ForwardingObserver must be given a multipart attr string"
    end
    
    @first_part = path.slice 0, index
    @second_part = path.slice index + 1, path.length - index
        
    # Observe the first part of the key. When it changes we must notify the
    # observer of the change. Also, as it has changed we must remove our 
    # observer for the second part, and readd ourself as an observer of the
    # second part.
    # 
    @observer = object.observe(@first_part) do |changes|
      # puts "notifying for #{@first_part} from #{changes[:path]}"
      `#{action}.__fun__(#{changes});`
    end
    
    # current value of getting the first part
    @value = object.get_attribute @first_part
    
    # Observe the second part
    @value.observe(@second_part) do |changes|
      dict = {
        :new    => changes[:new],
        :old    => changes[:old],
        :path   => "#{@first_part}.#{changes[:path]}",
        :object => object
      }
      `#{@observer}.__fun__(#{dict});`
    end
  end
end

class Object
  
  # Define that the given affectors will affect the result of the key_name.
  # When key_name is observed, then all the affectors must also be observed so
  # that if they change, we know that key_name might also change
  # 
  # @param {Hash} affectors
  # 
  def self.keys_affecting(affectors)
    # make sure this exists
    @__kvo_affecting_keys ||= {}
    
    affectors.each do |key_name, affecting_keys|
      # puts "setting affectors for #{key_name}"
      @__kvo_affecting_keys[key_name.to_s] = affecting_keys
    end
  end
  
  # Lookup the keys affecting the given key.
  # 
  # @param {Symbol} key_name
  # @returns {Array} affecting keys
  # 
  def self.lookup_affecting_keys_for(key_name)
    key_name = key_name.to_s
    @__kvo_affecting_keys ||= {}
    # puts "in looking up for #{key_name.to_s}"
    if @__kvo_affecting_keys[key_name]
      return @__kvo_affecting_keys[key_name]
    else
      return @__kvo_affecting_keys[key_name] = []
    end
  end
end

Object.include CherryKit::Observable

require 'foundation/core/observable_array'
