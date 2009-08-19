/* 
 * array.js
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


VN.Array = {
  
  each: function(array) {
    for (var idx = 0; idx < this.length; idx++) {
      array(this[idx]);
    }
  },
  
  map: function(array) {
    var result = [];
    for (var idx = 0; idx < this.length; idx++) {
      result[idx] = array(this[idx]);
    }
    
    return result;
  },
  
  count: function() {
    return this.length;
  },
  
  objectAtIndex: function(index) {
    return this[index];
  },
  
  addObject: function(anObject) {
    this.push(anObject);
  },
  
  lastObject: function() {
    return this.objectAtIndex(this.length - 1);
  },
  
  removeLastObject: function() {
    this.pop();
  },
  
  initWithCoder: function(aCoder) {
    var newObjects = aCoder.decodeObjectForKey('NS.Objects');
    
    for (var idx = 0; idx < newObjects.length; idx++) {
      this.push(newObjects[idx]);
    }
    return this;
  },
  
  awakeAfterUsingCoder: function(aCoder) {
    return this;
  }
};

// Fix for IE not having indexOf property.
if (!Array.prototype.indexOf) Array.prototype.indexOf = function(item, i)
{
  i || (i = 0);
  var length = this.length;
  if (i < 0) i = length + i;
  for (; i < length; i++)
    if (this[i] === item) return i;
      return -1;
};

VN.extend(Array.prototype, VN.Array);

VN.Array.create = function() {
  return [];
};

VN.Array.mixin = function(props) {
  VN.extend(this.prototype, props);
};

var NSMutableArray = NSArray = VN.Array;
