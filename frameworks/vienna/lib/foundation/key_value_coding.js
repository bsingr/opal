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

Vienna.extend({
  
  UNDEFINED_KEY_EXCEPTION: "VNUndefinedKeyException",
  AVERAGE_KEY_VALUE_OPERATOR: "VNAverageKeyValueOperator",
  COUNT_KEY_VALUE_OPERATOR: "VNCountKeyValueOperator",
  DISTINCT_UNION_OF_ARRAYS_KEY_VALUE_OPERATOR: "VNDistinctUnionOfArraysKeyValueOperator",
  DISTINT_UNION_OF_OBJECTS_KEY_VALUE_OPERATOR: "VNDistinctUnionOfObjectsKeyValueOperator",
  DISTINCT_UNION_OF_SETS_KEY_VALUE_OPERATOR: "VNDistinctUnionOfSetsKeyValueOperator",
  MAXIMUM_KEY_VALUE_OPERATOR: "VNMaximumKeyValueOperator",
  MINIMUM_KEY_VALUE_OPERATOR: "VNMinimumKeyValueOperator",
  SUM_KEY_VALUE_OPERATOR: "VNSumKeyValueOperator",
  UNION_OF_ARRAYS_KEY_VALUE_OPERATOR: "VNUnionOfArraysKeyValueOperator",
  UNION_OF_OBJECTS_KEY_VALUE_OPERATOR: "VNUnionOfObjectsKeyValueOperator",
  UNION_OF_SETS_KEY_VALUE_OPERATOR: "VNUnionOfSetsKeyValueOperator"
});

BasicObject.extend({
  
  valueForKey: function(key) {
    // key
    var accessor = key ;
    if (this.respondsTo(key)) {
      return this.perform(accessor);
    }
  },
 
  setValueForKey: function(val, key) {
    
  },
  
  get: function(key) {
    return this.valueForKeyPath(key);
  },
  
  set: function(key, val) {
    return this.setValueForKeyPath(val, key);
  },
  
  validateValueForKey: function(val, key) {
    
  },
  
  arrayValueForKey: function(key) {
    
  },
  
  valueForKeyPath: function(key) {
    
  },
  
  setValueForKeyPath: function(val, key) {
    
  },
  
  validateValueForKeyPath: function(val, key) {
    
  },
  
  arrayValueForKeyPath: function(key) {
    
  },
  
  valueForUndefinedKey: function(key) {
    
  },
  
  setValueForUndefinedKey: function(val, key) {
    
  }
});