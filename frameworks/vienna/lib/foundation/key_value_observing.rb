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

require 'object'
require 'key_value_coding'

module Vienna
  
  KVO_OPTION_OLD = 'VNKVOOptionOld'
  KVO_OPTION_NEW = 'VNKVOOptionNew'
  KVO_OPTION_INITIAL = 'VNKVOOptionInitial'
  KVO_OPTION_prior = 'VNKVOOptionPrior'
  
  class Object
    
    def observe_value_for_key_path path, object, change, context
      puts "Observer notification for keyPath: #{path}"
    end
    
    def add_observer observer, path, options, context
      if !observer or !path
        return
      end
      
      @kvo_observers << {
        :observer => observer,
        :key_path => path,
        :options => options,
        :context => context
      }
    end
    
    # 
    # 
    def will_chnage_value_for_key observer, path
      @kvo_old_values[key] = value_for_key(key)
    end
    
    # 
    # 
    def did_change_value_for_key key
      (0..@kvo_observers.length).each do |idx|
        current = @kvo_observers[i]
        
        if current.key_path == key
          
          change_dict = {
            
          }
          
        end
        
      end
    end
    
  end
  
end

  
  KeyValueObserverNotification: VN.Object.mixin({
    
    willChangeValueForKey: function(key) {
      this.$kvoOldValues[key] = this.valueForKey(key) ;
    },
    
    didChangeValueForKey: function(key) {
      
      for (var i = 0; i < this.$kvoObservers.length; i++) {
        
        var current = this.$kvoObservers[i];
        if (current.keyPath === key) {
          
          var changeDict = new Hash(
            VN.KVO_OPTION_OLD,    this.$kvoOldValues.get(key),
            VN.KVO_OPTION_NEW,    this.get(key)
          );
          
          current.get('observer').observeValueForKeyPath(key, this, changeDict, current.get('context'));
        }
      }
    },
    
    willChangeValuesAtIndexesForKey: function(kind, indexes, key) {
      
    },
    
    didChangeValuesAtIndexesForKey: function(kind, indexes, key) {
      
    },
    
    willChangeValueForKeyWithSetMutation: function(key, mutation, objects) {
      
    },
    
    didChangeValueForKeyWithSetMutation: function(key, mutation, objects) {
      
    }
  }),
  
  KeyValueObservingCustomization: VN.Object.mixin({
    
    $keyPathsForValuesAffectingValueForKey: function(key) {
      
    },
    
    $automaticallyNotifiesObserversForKey: function(key) {
      return true ;
    },
    
    setObservationInfo: function(info) {
      
    }.raw(),
    
    observationInfo: function() {
      
    }
  })
});
