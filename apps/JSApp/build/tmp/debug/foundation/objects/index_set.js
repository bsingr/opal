/* 
 * index_set.js
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


/**
  @class NSIndexSet
  @extends NSObject
*/
var NSIndexSet = VN.IndexSet = VN.Object.extend({
  
  /**
    @type Integer
  */
  _count: null,
  
  /**
    @type NSArray
  */
  _ranges: null,
  
  /**
    @returns NSIndexSet
  */
  init: function() {
    this._super();
    this._count = 0;
    this._ranges = [];
    return this;
  },
  
  /**
    @param {Integer} value
    @returns NSIndexSet
  */
  initWithIndex: function(value) {
    this.init();
    this._count = 1;
    this._ranges.push(NSMakeRange(value, 1));
    return this;
  },
  
  /**
    @param {NSRange} range
    @returns NSIndexSet
  */
  initWithIndexesInRange: function(range) {
    this.init();
    this._count = range.length;
    this._ranges.push(range);
    return this;
  },
  
  /**
    @param {NSIndexSet} indexSet
    @returns NSIndexSet
  */
  initWithIndexSet: function(indexSet) {
    this.init();
    this._count = indexSet.count();
    
    for (var idx = 0; idx < indexSet._ranges.length; idx++)
      this._ranges.push(indexSet._ranges[idx]);
    
    return this;
  },
  
  /**
    @param {NSIndexSet} indexSet
    @returns Boolean
  */
  isEqualToIndexSet: function(indexSet) {
    
  },
  
  /**
    @returns Integer
  */
  count: function() {
    return this._count;
  },
  
  /**
    @returns Integer
  */
  firstIndex: function() {
    var firstIndex = this._ranges[0].location;
    for (var idx = 1; idx < this._ranges.length; idx++) {
      if (this._ranges[idx].location < firstIndex)
        firstIndex = this._ranges[idx].location;
    }
    
    return firstIndex;
  },
  
  /**
    @returns Integer
  */
  lastIndex: function() {
    var lastIndex = this._ranges[0].location + this._ranges[0].length;
    for (var idx = 0; idx < this._ranges.length; idx++) {
      if (this._ranges[idx].location + this._ranges[idx].length > lastIndex)
        lastIndex = this._ranges[idx].location + this._ranges[idx].length;
    }
    
    return lastIndex;
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexGreaterThanIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexLessThanIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexGreaterThanOrEqualToIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexLessThanOrEqualToIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Boolean
  */
  containsIndex: function(value) {
    return this.containsIndexesInRange(NSMakeRange(value, 1));
  },
  
  /**
    @param {NSRange} range
    @returns Boolean
  */
  containsIndexesInRange: function(range) {
    
    for (var idx = 0; idx < this._ranges.length; idx++) {
      if (this._ranges[idx].location <= range.location && (this._ranges[idx].location + this._ranges[idx].length) >= (range.location + range.length)) {
        return true;
      }
    }
    
    return false;
  },
  
  /**
    @param {NSIndexSet} indexSet
    @returns Boolean
  */
  containsIndexes: function(indexSet) {
    
  },
  
  /**
    @param {NSRange} range
    @returns Boolean
  */
  intersectsIndexesInRange: function(range) {
    
  },
  
  /**
    @param {NSIndexSet} indexSet
  */
  addIndexes: function(indexSet) {
    for (var idx = 0; idx < indexSet._ranges.length; idx++) {
      this.addIndexesInRange(NSMakeRange(indexSet._ranges[idx].location, indexSet._ranges[idx].length));
    }
  },
  
  /**
    @param {NSIndexSet} indexSet
  */
  removeIndexes: function(indexSet) {
    
  },
  
  /**
    
  */
  removeAllIndexes: function() {
    
  },
  
  /**
    @param {Integer} index
  */
  addIndex: function(index) {
    this.addIndexesInRange(NSMakeRange(index, 1));
  },
  
  /**
    @param {Integer} index
  */
  removeIndex: function(index) {
    this.removeIndexesInRange(NSMakeRange(index, 1));
  },
  
  /**
    @param {NSRange} range
  */
  addIndexesInRange: function(range) {
    this._ranges.push(range);
  },
  
  /**
    @param {NSRange} range
  */
  removeIndexesInRange: function(range) {
    
  }
});

/**
  @returns NSIndexSet
*/
VN.IndexSet.indexSet = function() {
  return this.create();
};

/**
  @param {Integer} value
  @returns NSIndexSet
*/
VN.IndexSet.indexSetWithIndex = function(value) {
  return this.create('initWithIndex', value);
};

/**
  @param {NSRange} range
  @returns NSIndexSet
*/
VN.IndexSet.indexSetWithIndexesInRange = function(range) {
  return this.create('initWithIndexesInRange', range);
};
