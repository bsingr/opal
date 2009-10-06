/* 
 * key_value_coding.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Vienna.extend({
  
  UNDEFINED_KEY_EXCEPTION: 'VNUndefinedKeyException',
  AVERAGE_KEY_VALUE_OPERATOR: 'VNAverageKeyValueOperator',
  COUNT_KEY_VALUE_OPERATOR: 'VNCountKeyValueOperator',
  DISTINCT_UNION_OF_ARRAYS_KEY_VALUE_OPERATOR: 'VNDistinctUnionOfArraysKeyValueOperator',
  DISTINT_UNION_OF_OBJECTS_KEY_VALUE_OPERATOR: 'VNDistinctUnionOfObjectsKeyValueOperator',
  DISTINCT_UNION_OF_SETS_KEY_VALUE_OPERATOR: 'VNDistinctUnionOfSetsKeyValueOperator',
  MAXIMUM_KEY_VALUE_OPERATOR: 'VNMaximumKeyValueOperator',
  MINIMUM_KEY_VALUE_OPERATOR: 'VNMinimumKeyValueOperator',
  SUM_KEY_VALUE_OPERATOR: 'VNSumKeyValueOperator',
  UNION_OF_ARRAYS_KEY_VALUE_OPERATOR: 'VNUnionOfArraysKeyValueOperator',
  UNION_OF_OBJECTS_KEY_VALUE_OPERATOR: 'VNUnionOfObjectsKeyValueOperator',
  UNION_OF_SETS_KEY_VALUE_OPERATOR: 'VNUnionOfSetsKeyValueOperator',
  
  
  KeyValueCoding: VN.Object.mixin({
    
    $accessInstanceVariablesDirectly: function() {
      return true;
    },
    
    valueForKey: function(key) {
      
    },
    
    setValueForKey: function(key) {
      
    }.raw(),
    
    validateValueForKey: function(val, key, err) {
      return true;
    },
    
    arrayValueForKey: function(key) {
      
    },
    
    setValueForKey: function(key) {
      
    }.raw(),
    
    valueForKeyPath: function(path) {
      
    },
    
    setValueForKeyPath: function(val, path) {
      
    }.raw(),
    
    validateValueForKeyPath: function(val, path, err) {
      
    },
    
    arrayValueForKeyPath: function(path) {
      
    },
    
    setValueForKeyPath: function(path) {
      
    }.raw(),
    
    valueForUndefinedKey: function(key) {
      
    },
    
    setValueForUndefinedKey: function(val, key) {
      
    }.raw(),
    
    setNilValueForKey: function(key) {
      
    }.raw(),
    
    dictionaryWithValuesForKeys: function(keys) {
      
    },
    
    setValuesforKeysWithDictionary: function(keyedValues) {
      
    }.raw()
  }),
  
  ArrayKeyValueCoding: VN.Array.mixin({
    
    valueForKey: function(key) {
      
    },
    
    setValueForKey: function(val, key) {
      
    }.raw()
  }),
  
  // DictionaryKeyValueCoding: VN.Dictionary.mixin({
  //   
  //   valueForKey: function(key) {
  //     
  //   },
  //   
  //   setValueForKey: function(val, key) {
  //     
  //   }.raw()
  // }),
  // 
  // SetKeyValueCoding: VN.Set.mixin({
  //   
  //   valueForKey: function(key) {
  //     
  //   },
  //   
  //   setValueForKey: function(val, key) {
  //     
  //   }.raw()
  // })
});

// BasicObject.extend({
//   
//   valueForKey: function(key) {
//     // key
//     var accessor = key ;
//     if (this.respondsTo(key)) {
//       return this.perform(accessor);
//     }
//   },
//  
//   setValueForKey: function(val, key) {
//     
//   },
//   
//   get: function(key) {
//     return this.valueForKeyPath(key);
//   },
//   
//   set: function(key, val) {
//     return this.setValueForKeyPath(val, key);
//   },
//   
//   validateValueForKey: function(val, key) {
//     
//   },
//   
//   arrayValueForKey: function(key) {
//     
//   },
//   
//   valueForKeyPath: function(key) {
//     
//   },
//   
//   setValueForKeyPath: function(val, key) {
//     
//   },
//   
//   validateValueForKeyPath: function(val, key) {
//     
//   },
//   
//   arrayValueForKeyPath: function(key) {
//     
//   },
//   
//   valueForUndefinedKey: function(key) {
//     
//   },
//   
//   setValueForUndefinedKey: function(val, key) {
//     
//   }
// });
