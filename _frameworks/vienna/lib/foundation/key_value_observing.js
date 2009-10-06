/* 
 * key_value_observing.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Vienna.extend({
  
  KVO_OPTION_NEW: 'VNKVOOptionNew',
  KVO_OPTION_OLD: 'VNKVOOptionOld',
  KVO_OPTION_INITIAL: 'VNKVOOptionInitial',
  KVO_OPTION_PRIOR: 'VNKVOOptionPrior',
  
  /**
    @mixin KeyValueObserving
    @class VN.Object
  */
  KeyValueObserving: VN.Object.mixin({
    
    observeValueForKeyPath: function(path, object, change, context) {
      console.log('Observer notification for keyPath: %@'.format(path));
    }
  }),
  
  /**
    @mixin KeyValueObserverRegistration
    @class VN.Object
  */
  KeyValueObserverRegistration: VN.Object.mixin({
    
    addObserver: function(observer, path, options, context) {
      if (!observer || !path) return ;
      this.$kvoObservers.push({
        observer: observer,
        keyPath: path,
        options: options,
        context: context
      });
    },
    
    removeObserver: function(observer, path) {
      
    }
  }),
  
  ArrayKeyValueObserverRegistration: VN.Array.mixin({
    
    addObserverToObjects: function(observer, indexes, path, options, context) {
      
    },
    
    removeObserverFromObjects: function(observer, indexes, path) {
      
    },
    
    addObserver: function(observer, path, options, context) {
      
    },
    
    removeObserver: function(observer, path) {
      
    }
  }),
  
  // SetKeyValueObserverRegistration: VN.Set.mixin({
  //   
  //   addObserver: function(observer, path, options, context) {
  //     
  //   },
  //   
  //   removeObserver: function(observer, path) {
  //     
  //   }
  // })
  
  KeyValueObserverNotification: VN.Object.mixin({
    
    willChangeValueForKey: function(key) {
      this.$kvoOldValues[key] = this.valueForKey(key) ;
    },
    
    /**
      - {VN.String} key
    
      Called when a manual chnage in key value takes place. This method 
      posts the relevant observer notifications to objects that have registered
      interest. This is automatically called from set methods, but manually 
      chnaging a key outside it's respective setter function will require use 
      of this method, in tangent with Object#willChangeValueForKey.
    */
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
