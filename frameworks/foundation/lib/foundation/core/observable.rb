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
  
  # KeyValueObserving
  #
  module KeyValueObserving
    
    def will_change_value_for_key(key)
      if @__observer_replaced_keys
        __send_change_notifications key, true, :kind => :setting 
      end
    end
    
    def did_change_value_for_key(key)
      if @__observer_replaced_keys
        __send_change_notifications key, false, nil
      end
    end
    
    # New
    def observe(path, &action)
      @__observer_replaced_keys ||= {}
      @__observers_for_key ||= {}
      @__observer_changes_for_key ||= {}
      
      path = path.to_s
      
      __replace_setter_for_key path
      
      observers = @__observers_for_key[path]
      
      unless observers
        @__observers_for_key[path] = observers = []
      end
      
      observers << action
    end
    
    # depreceated
    # def add_observer(an_observer, path, options, context)
    #   options = options || []
    #   # ensure we have our replaced keys hash
    #   @__kvo_replaced_keys ||= {}
    #   # ensure we have observers for key hash
    #   @__kvo_observers_for_key ||= {}
    #   # ensure we have our chnages for key hash
    #   @__kvo_changes_for_key ||= {}
    #   # we should check here if we are looking at a key_path, or just a normal
    #   # path. For now, we assume normal path
    #   __replace_setter_for_key path
    #   
    #   observers = @__kvo_observers_for_key[path]
    #   
    #   unless observers
    #     @__kvo_observers_for_key[path] = observers = {}
    #   end
    #   
    #   # puts "=========== setting observer info"
    #   observers[an_observer] = {
    #     :observer => an_observer,
    #     :options  => options,
    #     :context  => context
    #   }
    #   
    #   # If our options require an :initial notification, send it now
    #   if options.include? :initial
    #     puts "add_observer needs to send initial notification"
    #   end
    # 
    # end
    
    # Remove an observing object for the given key path
    def remove_observer(observer, path)
      observers = @__kvo_observers_for_key[path]
      
      observers.delete(observer)
    end
    
    def observe_value(path, object, changes, context)
      
    end
  
    # Private method to replace the setter methods for the given key.
    # 
    # @param [String] key
    # @returns nil
    # 
    def __replace_setter_for_key(key)
      # if we have already done this key, skip
      return if @__observer_replaced_keys[key]
    
      # puts "replacing methods for #{key}"
    
      methods_to_replace = {
        "#{key}=" => proc do |key, original_method|
          # we simply return a closure which takes a single param, the value. We
          # gather the key for sending will_change_value_for_key(), and keep our
          # original method so we can call it between notifications
          proc do |value|
            will_change_value_for_key(key)
            `#{original_method}.apply(#{self}, [#{value}]);`
            did_change_value_for_key(key)
          end
        end
      }
    
      methods_to_replace.each do |method_id, implementation|
        `var js_id = #{self}.mid2jsid(#{method_id.to_s}.toString());`
        # only replace method if we have implemented it
        if respond_to? method_id
          original = `#{self}[js_id];`
          # define new method as result of calling the closure
          `#{self}[js_id] = #{implementation}.__fun__(#{key}, #{original}).__fun__;`
        end
      end
    
      # puts "need to look for affecting keys for #{key}"
    end
  
    # Notifications that we are about to change the key, did change etc
    def __send_change_notifications(key, before, options)
      puts "sending notification for key #{key}"
      options = options || {}
     
      # if we are sending a notification before we change the value
      # (will_change_value_for_key)
      if before
        old = value_for_key key
        @__observer_changes_for_key[key] = old
      else
        # after..
        old_value = @__observer_changes_for_key[key]
        new_value = value_for_key key
      end
      
      puts "need to loop over observers"
      @__observers_for_key[key].each do |block_callback|
        unless before
          `#{block_callback}.__fun__(#{old_value}, #{new_value});`
        end
      end
    end

  end
end

Object.include CherryKit::KeyValueObserving
