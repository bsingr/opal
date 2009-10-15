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

module Vienna
  
  # KVO options
  # ===========
  # :new, :old, :initial, :prior
  
  # KVO Change kind
  # ===============
  # :change_kind => :new, :old, :indexes, :prior_notification

  class Object
    
    def observe_value_for_key_path path, of_object:object, change:change, context:context
      
    end
  
    def add_observer observer, for_key_path:key_path, options:options, context:context
      # return unless observer and key_path
      
      @kvo_observers << {
        :observer => observer,
        :key_path => key_path,
        :options => options,
        :context => context
      }
    end
  
    def remove_observer observer, for_key_path:key_path
  
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
      # puts self
      @kvo_old_values[key] = value_for_key(key)
    end
  
    def did_change_value_for_key key
      # puts 'yeap, in did_change'
      @kvo_observers.each do |current|
        if current[:key_path] == key
          change_dict = { :old => @kvo_old_values[key], :new => value_for_key(key) }
          current[:observer].observe_value_for_key_path key, of_object:self, change:change_dict, context:current[:context]
        end
      end
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