/* 
 * dictionary.js
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

include('foundation/object');

var NSDictionary = VN.Dictionary = VN.Object.extend({
  
  _keys: null,
  
  _values: null,
  
  init: function() {
    this._keys = [];
    this._values = { };
    return this;
  },
  
  initWithCoder: function(aCoder) {
    
  },
  
  count: function() {
    return this._keys.length;
  },
  
  objectForKey: function(aKey) {
    return this._values[aKey];
  },
  
  keyEnumerator: function() {
    
  },
  
  allKeys: function() {
    
  },
  
  allKeysForObject: function(anObject) {
    
  },
  
  allValues: function() {
    
  },
  
  description: function() {
    
  },
  
  containsKey: function(aKey) {
    return this._values[aKey] ? true : false;
  },
  
  setObjectForKey: function(anObject, aKey) {
    
    if (!this._values[aKey]) {
      this._keys.push(aKey);
    }
    
    this._values[aKey] = anObject;
  }
});

VN.Dictionary.create = function(values) {
  var dict = new VN.Dictionary().init();
  for (key in values)
    dict.setObjectForKey(values[key], key);
    
  return dict;
};

/*
  
*/
VN.extend(NSDictionary, {
  
  /*
    @return NSDictionary
  */
  dictionary: function() {
    return this.create();
  },

  /*
    @param {id} anObject
    @param {key} aKey
    @return NSDictionary
  */
  dictionaryWithObjectForKey: function(anObject, aKey) {
    var theDict = this.create();
    theDict.setObjectForKey(anObject, aKey);
    return theDict;
  },
  
  /*
    @param {id} firstObject
    @param ... variable arguments
    @return NSDictionary
  */
  dictionaryWithObjectsAndKeys: function(firstObject) {
    
  },

  /*
    @param {NSDictionary) dict
    @return NSDictionary
  */
  dictionaryWithDictionary: function(dict) {
    
  },
  
  /*
    @param {NSArray} objects
    @param {NSArray} keys
    @return NSDictionary
  */
  dictionaryWithObjectsForKeys: function(objects, keys) {
    var theDict = this.create();
    
    for (var idx = 0; idx < objects.length; idx++)
      theDict.setObjectForKey(objects[idx], keys[idx]);
    
    return theDict;
  }
});

/**
  @class NSMutableDictionary
  
  This is just for compatibility. NSDictionary and this are interchnageable
  in usage. This is not recomended for use.
*/
var NSMutableDictionary = NSDictionary;
