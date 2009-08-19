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

include('foundation/array');
include('foundation/dictionary');
include('foundation/set');

VN.UNDEFINED_KEY_EXCEPTION = "NSUndefinedKeyException";
VN.AVERAGE_KEY_VALUE_OPERATOR = "NSAverageKeyValueOperator";
VN.COUNT_KEY_VALUE_OPERATOR = "NSCountKeyValueOperator";
VN.DISTINCT_UNION_OF_ARRAYS_KEY_VALUE_OPERATOR = "NSDistinctUnionOfArraysKeyValueOperator";
VN.DISTINT_UNION_OF_OBJECTS_KEY_VALUE_OPERATOR = "NSDistinctUnionOfObjectsKeyValueOperator";
VN.DISTINCT_UNION_OF_SETS_KEY_VALUE_OPERATOR = "NSDistinctUnionOfSetsKeyValueOperator";
VN.MAXIMUM_KEY_VALUE_OPERATOR = "NSMaximumKeyValueOperator";
VN.MINIMUM_KEY_VALUE_OPERATOR = "NSMinimumKeyValueOperator";
VN.SUM_KEY_VALUE_OPERATOR = "NSSumKeyValueOperator";
VN.UNION_OF_ARRAYS_KEY_VALUE_OPERATOR = "NSUnionOfArraysKeyValueOperator";
VN.UNION_OF_OBJECTS_KEY_VALUE_OPERATOR = "NSUnionOfObjectsKeyValueOperator";
VN.UNION_OF_SETS_KEY_VALUE_OPERATOR = "NSUnionOfSetsKeyValueOperator";

/**
  @mixin VN.KeyValueCoding
  @class VN.Object
*/
VN.Object.mixin({
  
  /**
    @param {VN.String} key
    @returns VN.Object
  */
  value_for_key: function(key) {

    // -get<Key>
    var accessor = 'get' + key.capitalize();
    if (this.responds_to(accessor))
      return this.perform(accessor);

    // -<key>
    accessor = key;
    if (this.respons_to(accessor))
      return this.perform(accessor);

    // -is<Key>
    var accessor = 'is' + key.capitalize();
    if (this.responds_to(accessor))
      return this.perform(accessor);

    if (this.access_instance_variables_directly) {
      var theValue;

      // _<key>
      accessor = '_' + key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];

      // _is<Key>
      accessor = '_is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];

      // <key>
      accessor = key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];
      
      accessor = 'is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];    
    }
    // if not found
    return this.value_for_undefined_key(key);
  },
  
  get: function(key) {
    return this.value_for_key_path(key);
  },
  
  set: function(key, value) {
    return this.set_value_for_key_path(value, key);
  },
  
  /**
    Sends observer notifications if setting a key was successful. Currently,
    custom setters will not call observer notifications unless they are
    triggered through this custom method. This is a planned feature for the
    v0.1 release once performance measures have been determined.
  
    @param {id} value
    @param {NSString} key
  */
  set_value_for_key: function(value, key) {
    // -set<Key>
    var accessor = 'set' + key.capitalize();
    if (this.responds_to(accessor)) {
      this.will_chnage_value_for_key(key);
      this.perform(accessor, value);
      this.did_change_value_for_key(key);
      return;
    }
    
    if (this.access_instance_variables_directly) {

      // _<key>
      accessor = '_' + key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }

      // _is<Key>
      accessorName = '_is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }

      // <key>
      accessorName = key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }
      
      // is<Key>
      accessorName = 'is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }
    }

    this.set_value_for_undefined_key(value, key);
  },
  
  
  validate_value_for_key: function(value, key, error) {
    
  },
  
  mutable_array_value_for_key: function(key) {
    
  },
  
  /**
    Takes the key path and splits the string into seperate keys. The keys
    are then used to recursively fetcha  value using valueForKey() for the
    returned object at each point. The final value is then returned from
    this function.
    
    @param {NSString} keyPath
    @returns id
  */
  value_for_key_path: function(key_path) {
    var keys = key_path.split('.'), parent = this;
    
    for (var idx = 0; idx < keys.length; idx++) {
      // check if VN.Object, otherwise treet as if Javascript Object
      if (parent['value_for_key_path'] && parent['set_value_for_key_path'])
        parent = parent.value_for_key(keys[idx]);
      else
        parent = parent[keys[idx]];
    }
    
    return parent;
  },
  
  /**
    Splits the key path into keys and recusively does through the chain to 
    set the final destination value to the provided value
    
    @param {id} value
    @param {NSString} keyPath
  */
  set_value_for_key_path: function(value, key_path) {
    var keys = key_path.split('.'), parent = this;
    
    for (var idx = 0; idx < (keys.length - 1); idx++)
      parent = parent.value_for_key(keys[idx]);
    
    console.log(key_path);
    
    parent.set_value_for_key(value, keys[idx++]);
  },
  
  validate_value_for_key_path: function(value, key_path, error) {
    
  },
  
  mutable_array_value_for_key_path: function(key_path) {
    
  },
  
  value_for_undefined_key: function(key) {
    throw "Undefined key was requested from object. '" + key + "'";
  },
  
  set_value_for_undefined_key: function(value, key) {
    console.log(this);
    throw "Undefined key was requested from object for setting. '" + key + "'";
  },
  
  set_nil_value_for_key: function(key) {
    
  },
  
  dictionary_with_values_for_keys: function(keys) {
    
  },
  
  set_values_for_keys_with_dictionary: function(keyed_values) {
    
  },
  
  access_instance_variables_directly: true
});

/**
  @mixin NSKeyValueCoding
  @class NSArray
*/
VN.Array.mixin({
  
  /**
    Returns an array of the result of requesting -valueForKey from each object
    
    @param {VN.String} key
    @returns VN.Array
  */
  value_for_key: function(key) {
    var result = [];
    for (var idx = 0; idx < this.length; idx++)
      result.push(this[idx].value_for_key(key));
    
    return result;
  },
  
  set_value_for_key: function(value, key) {
    
  }
});

/**
  @mixin NSKeyValueCoding
  @class NSDictionary
*/
VN.Dictionary.mixin({
  
  value_for_key: function(key) {
    return this.object_for_key(key);
  },
  
  set_value_for_key: function(value, key) {
    this.set_object_for_key(value, key);
  }
});
