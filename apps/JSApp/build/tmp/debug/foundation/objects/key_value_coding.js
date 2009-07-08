/* 
 * key_value_coding.js
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


var NSUndefinedKeyException                     = "NSUndefinedKeyException";
var NSAverageKeyValueOperator                   = "NSAverageKeyValueOperator";
var NSCountKeyValueOperator                     = "NSCountKeyValueOperator";
var NSDistinctUnionOfArraysKeyValueOperator     = "NSDistinctUnionOfArraysKeyValueOperator";
var NSDistinctUnionOfObjectsKeyValueOperator    = "NSDistinctUnionOfObjectsKeyValueOperator";
var NSDistinctUnionOfSetsKeyValueOperator       = "NSDistinctUnionOfSetsKeyValueOperator";
var NSMaximumKeyValueOperator                   = "NSMaximumKeyValueOperator";
var NSMinimumKeyValueOperator                   = "NSMinimumKeyValueOperator";
var NSSumKeyValueOperator                       = "NSSumKeyValueOperator";
var NSUnionOfArraysKeyValueOperator             = "NSUnionOfArraysKeyValueOperator";
var NSUnionOfObjectsKeyValueOperator            = "NSUnionOfObjectsKeyValueOperator";
var NSUnionOfSetsKeyValueOperator               = "NSUnionOfSetsKeyValueOperator";

/*
    @mixin NSKeyValueCoding
    @class NSObject
*/
NSObject.mixin({
    
    /*
        @param {NSString} key
        @returns id
    */
    valueForKey: function(key) {

        // -get<Key>
        var accessorName = "get" + key.capitalizedString();
        if (this.respondsTo(accessorName))
            return this.perform(accessorName);

        // -<key>
        accessorName = key;
        if (this.respondsTo(accessorName))
            return this.perform(accessorName);

        // -is<Key>
        var accessorName = "is" + key.capitalizedString();
        if (this.respondsTo(accessorName))
            return this.perform(accessorName);

        if (this.accessInstanceVariablesDirectly()) {
            var theValue;

            // _<key>
            accessorName = "_" + key;
            if (theValue = this[accessorName])
                return theValue;

            // _is<Key>
            accessorName = "_is" + key.capitalizedString();
            if (theValue = this[accessorName])
                return theValue;

            // <key>
            accessorName = key;
            if (theValue = this[accessorName])
                return theValue;
            
            // is<Key>
            accessorName = "is" + key.capitalizedString();
            if (theValue = this[accessorName])
                return theValue;            
        }
        // if not found
        return this.valueForUndefinedKey(key);
    },
    
    /*
        @param {id} value
        @param {NSString} key
    */
    setValueForKey: function(value, key) {
        // -set<Key>
        var accessorName = "set" + key.capitalizedString();
        if (this.respondsTo(accessorName)) {
            this.willChangeValueForKey(key);
            this.perform(accessorName, value);
            this.didChangeValueForKey(key);
            return;
        }
        
        if (this.accessInstanceVariablesDirectly()) {

            // _<key>
            accessorName = "_" + key;
            if ((this[accessorName] != 'undefined') && (typeof this[accessorName] != 'function')) {
                this.willChangeValueForKey(key);
                this[accessorName] = value;
                this.didChangeValueForKey(key);
                return;
            }

            // _is<Key>
            accessorName = "_is" + key.capitalizedString();
            if ((this[accessorName] != 'undefined') && (typeof this[accessorName] != 'function')) {
                this.willChangeValueForKey(key);
                this[accessorName] = value;
                this.didChangeValueForKey(key);
                return;
            }

            // <key>
            accessorName = key;
            if ((this[accessorName] != 'undefined') && (typeof this[accessorName] != 'function')) {
                this.willChangeValueForKey(key);
                this[accessorName] = value;
                this.didChangeValueForKey(key);
                return;
            }
            
            // is<Key>
            accessorName = "is" + key.capitalizedString();
            if ((this[accessorName] != 'undefined') && (typeof this[accessorName] != 'function')) {
                this.willChangeValueForKey(key);
                this[accessorName] = value;
                this.didChangeValueForKey(key);
                return;
            }
        }
        
        this.setValueForUndefinedKey(value, key);
    },
    
    
    validateValueForKey: function(aValue, aKey, error) {
        
    },
    
    mutableArrayValueForKey: function(key) {
        
    },
    
    /*
        Takes the key path and splits the string into seperate keys. The keys
        are then used to recursively fetcha  value using valueForKey() for the
        returned object at each point. The final value is then returned from
        this function.
        
        @param {NSString} keyPath
        @returns id
    */
    valueForKeyPath: function(keyPath) {
        var keys = keyPath.split('.'), parent = this;
        
        for (var idx = 0; idx < (keys.length - 1); idx++)
            parent = parent.valueForKey(keys[idx]);
        
        return parent.valueForKey(keys[idx++]);
    },
    
    /*
        Splits the key path into keys and recusively does through the chain to 
        set the final destination value to the provided value
        
        @param {id} value
        @param {NSString} keyPath
    */
    setValueForKeyPath: function(value, keyPath) {
        var keys = keyPath.split('.'), parent = this;
        
        for (var idx = 0; idx < (keys.length - 1); idx++)
            parent = parent.valueForKey(keys[idx]);
        
        parent.setValueForKey(value, keys[idx++]);
    },
    
    validateValueForKeyPath: function(value, keyPath, error) {
        
    },
    
    mutableArrayValueForKeyPath: function(keyPath) {
        
    },
    
    valueForUndefinedKey: function(key) {
        throw "Undefined key was requested from object. '" + key + "'";
    },
    
    setValueForUndefinedKey: function(value, key) {
        throw "Undefined key was requested from object for setting. '" + key + "'";
    },
    
    setNilValueForKey: function(key) {
        
    },
    
    dictionaryWithValuesForKeys: function(keys) {
        
    },
    
    setValuesForKeysWithDictionary: function(keyedValues) {
        
    },
    
    accessInstanceVariablesDirectly: function() {
        return true;
    }
});

/*
    @mixin NSKeyValueCoding
    @class NSArray
*/
NSArray.mixin({
    
    valueForKey: function(key) {
        
    },
    
    setValueForKey: function(value, key) {
        
    }
});

/*
    @mixin NSKeyValueCoding
    @class NSDictionary
*/
NSDictionary.mixin({
    
    valueForKey: function(key) {
        
    },
    
    setValueForKey: function(value, key) {
        
    }
});
