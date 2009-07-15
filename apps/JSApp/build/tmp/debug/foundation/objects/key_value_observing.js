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


// NSKeyValueObservingOptions
var NSKeyValueObservingOptionNew            = 0x01;
var NSKeyValueObservingOptionOld            = 0x02;
var NSKeyValueObservingOptionInitial        = 0x04;
var NSKeyValueObservingOptionPrior          = 0x08;
                                        
// NSKeyValueChange                     
var NSKeyValueChangeSetting                 = 1;
var NSKeyValueChangeInsertion               = 2;
var NSKeyValueChangeRemoval                 = 3;
var NSKeyValueChangeReplacement             = 4;

// NSKeyValueSetMutationKind
var NSKeyValueUnionSetMutation              = 1;
var NSKeyValueMinusSetMutation              = 2;
var NSKeyValueIntersectSetMutation          = 3;
var NSKeyValueSetSetMutation                = 4;

// keys for chnage dictionary
var NSKeyValueChangeKindKey                 = "NSKeyValueChangeKindKey"; 
var NSKeyValueChangeNewKey                  = "NSKeyValueChangeNewKey";
var NSKeyValueChangeOldKey                  = "NSKeyValueChangeOldKey";
var NSKeyValueChangeIndexesKey              = "NSKeyValueChangeIndexesKey";
var NSKeyValueChangeNotificationIsPriorKey  = "NSKeyValueChangeNotificationIsPriorKey";

/**
	@mixin NSKeyValueObserving
	@class NSObject
*/
NSObject.mixin({
    
    /**
        This is used to store a list of observers that are observing this object
        for changes to key values. When a chnage takes place, the observers need
        to be notified.
        
        @type NSArray
    */
    _kvo_observers: NSArray.create(),
    
    /**
        This dictionary maintains a list of "old values" for keys that request 
        to have their old values sent in the info dictionary for observers.
        
        @type NSDictionary
    */
    _kvo_oldValues: NSDictionary.create(),
    
	/**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        console.log('observer notification for:' + keyPath);
        console.log(this);
    }
});

/**
	@mixin NSKeyValueObserverRegistration
	@class NSObject
*/
NSObject.mixin({
    
	/**
		@param {NSObject} observer
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
    addObserverForKeyPath: function(observer, keyPath, options, context) {
        if (!observer || !keyPath)
            return;
        
        var kvcDict = NSDictionary.dictionaryWithObjectsForKeys(
            [observer, keyPath, options, context],
            ['NSObserver', 'NSKeyPath', 'NSOptions', 'NSContext']);
            
        this._kvo_observers.push(kvcDict);
    },
    
	/**
		@param {NSObject} observer
		@param {NSString} keyPath
	*/
    removeObserverForKeyPath: function(observer, keyPath) {
        
    }
});

/**
	@mixin NSKeyValueObserverRegistration
	@class NSArray
*/
NSArray.mixin({
	
	/**
		@param {NSObject} observer
		@param {NSIndexSet} indexes
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
	addObserverToObjectsAtIndexes: function(observer, indexes, keyPath, options, context) {
		
	},
	
	/**
		@param {NSObject} observer
		@param {NSIndexSet} indexes
		@param {NSString} keyPath
	*/
	removeObserverFromObjectsAtIndexes: function(observer, indexes, keyPath) {
		
	},
	
	/**
		Arrays are not observable, so this method just throws an error.
	
		@param {NSObject} observer
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
    addObserverForKeyPath: function(observer, keyPath, options, context) {
        throw "NSArray.addObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
    },
    
	/**
		Arrays are not observable, so this method just throws an error.
		
		@param {NSObject} observer
		@param {NSString} keyPath
	*/
    removeObserverForKeyPath: function(observer, keyPath) {
        throw "NSArray.removeObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
    }
});

/**
	@mixin NSKeyValueObserverRegistration
	@class NSSet
*/
NSSet.mixin({

	/**
		Sets are not observable, so this method just throws an error.
	
		@param {NSObject} observer
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
    addObserverForKeyPath: function(observer, keyPath, options, context) {
        throw "NSSet.addObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
    },
    
	/**
		Sets are not observable, so this method just throws an error.
		
		@param {NSObject} observer
		@param {NSString} keyPath
	*/
    removeObserverForKeyPath: function(observer, keyPath) {
        throw "NSSet.removeObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
    }
});


/**
	@mixin NSKeyValueObserverNotification
	@class NSObject
*/
NSObject.mixin({
	
	/**
	    This should be called before a value is set, assuming the value is
	    required to be observable. This notes the current value of the 
	    specified key so that it can be returned in the info dictionary
	    to the observer if required. The order of using this function is:
	    
	    {{{
	        this.willChangeValueForKey('theKey');
	        theKey = newValue;
	        this.didChangeValueForKey('theKey');
	    }}}
	    
	    To avoid this coding repetition, these should be placed inside
	    KVO compliant functions, so the following simipler call will
	    handle the complexity:
	    
	    {{{
	        this.setTheKey(newValue);
            // or...
            this.setValueForKey(newValue, 'theKey');
	    }}}
	
		@param {NSString} key
	*/
	willChangeValueForKey: function(key) {
	    this._kvo_oldValues.setObjectForKey(this.valueForKey(key), key);
	},
	
	/**
		@param {NSString} key
	*/
	didChangeValueForKey: function(key) {
		for (var idx = 0; idx < this._kvo_observers.length; idx++) {
		    var current = this._kvo_observers[idx];
		    if (current.objectForKey('NSKeyPath') == key) {
		        var theObserver = current.objectForKey('NSObserver');
		        var changeDict = NSDictionary.dictionaryWithObjectsForKeys(
                    [this._kvo_oldValues.objectForKey(key), this.valueForKey(key)],
                    [NSKeyValueChangeOldKey, NSKeyValueChangeNewKey]);
                theObserver.observeValueForKeyPath(key, this, changeDict, current.valueForKey('NSContext'));
		    }
		}
	},
	
	/**
		@param {NSKeyValueChange} changeKind
		@param {NSIndexSet} indexes
		@param {NSString} key
	*/
	willChangeValuesAtIndexesForKey: function(changeKind, indexes, key) {
		
	},
	
	/**
		@param {NSKeyValueChange} changeKind
		@param {NSIndexSet} indexes
		@param {NSString} key
	*/
	didChangeValuesAtIndexesForKey: function(changeKind, indexes, key) {
		
	},
	
	/**
		@param {NSString} key
		@param {NSKeyValueSetMutationKind} mutationKind
		@param {NSSet} objects
	*/
	willChangeValueForKeyWithSetMutationUsingObjects: function(key, mutationKind, objects) {
		
	},
	
	/**
		@param {NSString} key
		@param {NSKeyValueSetMutationKind} mutationKind
		@param {NSSet} objects
	*/
	didChangeValueForKeyWithSetMutationUsingObjects: function(key, mutationKind, objects) {
		
	}
});

/**
	@mixin NSKeyValueObservingCustomization
	@class NSObject
*/
NSObject.mixin({
	
	/**
		@param {NSString} key
		@returns {NSSet}
	*/
	keyPathsForValuesAffectingValueForKey: function(key) {
		
	},
	
	/**
	   @param {NSString} key
	   @returns Boolean
	*/
	automaticallyNotifiesObserversForKey: function(key) {
	    
	}
});
