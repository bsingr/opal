# 
# key_value_observing.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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

# Key Value observing in this ruby implementation makes heavy use of ruby's
# singleton abilities, and will not sit well above pure objc runtime.
module Vienna
  
  # Keys in hash sent to observe_value_for_key_path(of_object:change:context:)
  KEY_VALUE_CHANGE_KIND_KEY = 'KEY_VALUE_CHANGE_KIND_KEY'
  KEY_VALUE_CHANGE_NEW_KEY = 'KEY_VALUE_CHANGE_NEW_KEY'
  KEY_VALUE_CHANGE_OLD_KEY = 'KEY_VALUE_CHANGE_OLD_KEY'
  KEY_VALUE_CHANGE_INDEXES_KEY = 'KEY_VALUE_CHANGE_INDEXES_KEY'
  KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY = 'KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY'

  # Options passed to add_observer(...) to determine what is returned
  KEY_VALUE_OBSERVING_OPTIONS = {
    # change dictionary should provide the new value
    :new          => 1,
    # change dictionary should provide the old value
    :old          => 2,
    # notification should be sent to receiver immediately
    :initial      => 4,
    # seperate notifications should be sent, or, if not, a single one after change
    :prior        => 8
  }
  
  KEY_VALUE_CHANGE = {
    :setting      => 0,
    :insertion    => 1,
    :removal      => 2,
    :replacement  => 3
  }
  
  class Object
    
    def observe_value_for_key_path(path, of_object:object, change:change, context:context)
      
    end
  
    def add_observer(observer, for_key_path:key_path, options:options, context:context)
      _kvo_setup
      
      key_observers = @_kvo_observers[key_path]
      
      unless key_observers
        key_observers = {}
        @_kvo_observers[key_path] = key_observers
      end
      
      key_observers[observer] = {
        :observer => observer,
        :key_path => key_path,
        :options => options,
        :context => context
      }
      
      # if options.include? :initial
      #   will_change_value_for_key key_path
      #   did_change_value_for_key key_path
      # end
    end
  
    def remove_observer(observer, for_key_path:key_path)
  
    end
    
    def _kvo_setup
      # if this ivar exists, then we have already done this for this object, so
      # we can just skip
      return if @_kvo_observers

      class << self
        
        def will_change_value_for_key(a_key)
          super a_key
        end
        
        def did_change_value_for_key(a_key)
          
        end
        
        def will_change(change, values_at_indexes:indexes, for_key:a_key)
          
        end
        
        def did_change(change, values_at_indexes:indexes, for_key:a_key)
          
        end
      end
      
      # hash to store observers for a key. Key is the hash key, hash is the value
      @_kvo_observers = {}
    end
  end
  
  
  class Array
  
    def add_observer observer, to_objects_at_indexes:indexes, for_key_path:key_path, options:options, context:context
  
    end
  
    def remove_observer observer, from_objects_at_indexes:indexes, for_key_path:keyPath
  
    end
  
    def add_observer observer, for_key_path:key_path, options:options, context:context
  
    end
  
    def remove_observer observer, for_key_path:key_path
  
    end
  
  end
  
  
  class Object
  
    def will_change_value_for_key key
      # # puts self
      # @kvo_old_values[key] = value_for_key(key)
      puts key
    end
  
    def did_change_value_for_key key
      # # puts 'yeap, in did_change'
      # @kvo_observers.each do |current|
      #   if current[:key_path] == key
      #     change_dict = { :old => @kvo_old_values[key], :new => value_for_key(key) }
      #     current[:observer].observe_value_for_key_path key, of_object:self, change:change_dict, context:current[:context]
      #   end
      # end
    end
  
    def will_change changeKind, values_at_indexes:indexes, for_key:key
  
    end
  
    def did_change changeKind, values_at_indexes:indexes, for_key:key
  
    end
  
    def self.key_paths_for_values_affecting_value_for_key key
  
    end
  
    def automatically_notifies_observers_for_key key
      true
    end
  
    def observation_info=(info)
      @observation_info = info
    end
  
    def observation_info
      @observation_info
    end
  end
end