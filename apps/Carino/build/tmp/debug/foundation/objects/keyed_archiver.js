/* 
 * keyed_archiver.js
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


var NSInvalidArchiveOperationException = "NSInvalidArchiveOperationException";
var NSInvalidUnarchiveOperationException = "NSInvalidUnarchiveOperationException";

var NSKeyedArchiver = NSCoder.extend({
  
  archivedDataWithRootObject: function(rootObject) {
  
  },
  
  archiveRootObjectToFile: function(rootObject, path) {
    
  },
  
  initForWritingWithMutableData: function(data) {
    
  },
  
  setDelegate: function(delegate) {
    
  },
  
  delegate: function() {
    
  },
  
  setOutputFormat: function(format) {
    
  },
  
  outputFormat: function() {
    
  },
  
  finishEncoding: function() {
    
  },
  
  setClassNameForClass: function(codedName, cls) {
    
  },
  
  classNameForClass: function(cls) {
    
  },
  
  encodeObjectForKey: function(object, key) {
    
  },
  
  encodeConditionalObjectForKey: function(object, key) {
    
  },
  
  encodeBoolForKey: function(aBool, key) {
    
  },
  
  encodeIntForKey: function(anInt, key) {
    
  },
  
  encodeFloatForKey: function(aFloat, key) {
    
  },
  
  encodeDoubleForKey: function(aDouble, key) {
    
  }
});

var NSKeyedUnarchiver = NSCoder.extend({
  
  _delegate: null,
  _data: null,
  _rootDict: null,
  _contextStack: null,
  _unarchivedObjects: null,
  
  initForReadingWithData: function(data) {
    this.init();
    this._data = data.archive.data;
    this._rootDict = this._data; //CFPropertyListFromData(this._data.bytes());
    this._contextStack = [];
    this._contextStack.addObject(this._rootDict);
    this._unarchivedObjects = NSDictionary.create();
    return this;
  },

  setDelegate: function(delegate) {
    
  },
  
  delegate: function() {
    
  },
  
  finishDecoding: function() {
    // do nothing?
  },
  
  containsValueForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    
    if (theContext[key])
      return true;
    
    return false;
  },
  
  decodeObjectForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    // if the context is an array, then we need to decode this differently
    if(theContext['indexOf']) {
      var array = [];
      for (var idx = 0; idx < theContext.length; idx++) {
        this._contextStack.addObject(theContext[idx]);
        var newObject = this._decodeObject(theContext[idx]);
        array.push(newObject);
        this._contextStack.removeLastObject();
      }
      return array;
    }
    
    var theObject = theContext[key];
  
    return this._decodeObject(theObject);
  },
  
  /**
    @private
    
    Private method to decode an actual object at the head of the context
    array.
  */
  _decodeObject: function(theObject) {
    // no context, so return null... error?
    if (!theObject)
      return null;
    
    // object is a string, so just return it
    if (typeof theObject == 'string')
      return new String(theObject);
    
    var theClass = window[theObject["class"]];
    
    if (!theClass) {
      if (this._unarchivedObjects.containsKey(theObject['id']))
        return this._unarchivedObjects.objectForKey(theObject['id'])
      else {
        console.log('unable to decode ' + theObject['class']);
        return null;
      }
        
    }
    
    var newObject;
    
    //throws error if array...............
    if (theClass == NSArray || theClass == NSMutableArray) {
      newObject = [];
    }
    else {
      newObject = new theClass(); // basically just alloc's it.. does not init().
    }
    
    this._unarchivedObjects.setObjectForKey(newObject, theObject['id']);
    
    // if (theObject['class'] == "NSCustomObject") {
    //   newObject.init();
    // }
    // else {
      this._contextStack.addObject(theObject['objects']);
      newObject = newObject.initWithCoder(this);
      this._contextStack.removeLastObject();
    // }
    
    newObject = newObject.awakeAfterUsingCoder(this);
    this._unarchivedObjects.setObjectForKey(newObject, theObject['id']);
    
    return newObject;
  },
  
  decodeBoolForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    var theObject = theContext[key];
    
    // return false if it does not exist, otherwise, return value
    return (!theObject) ? false : true;
  },
  
  decodeIntForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    return parseInt(theContext[key]);
  },
  
  decodeInt32ForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    return parseInt(theContext[key]);    
  },
  
  decodeInt64ForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    return parseInt(theContext[key]);    
  },
  
  decodeFloatForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    return parseFloat(theContext[key]);
  },
  
  decodeDoubleForKey: function(key) {
    var theContext = this._contextStack.lastObject();
    return parseFloat(theContext[key]);
  },
  
  decodePointForKey: function(key) {
    var thePoint = this.decodeObjectForKey(key);
    return NSPointFromString(thePoint);
  },
  
  decodeSizeForKey: function(key) {
    var theSize = this.decodeObjectForKey(key);
    return NSSizeFromString(theSize);
  },
  
  decodeRectForKey: function(key) {
    var theRect = this.decodeObjectForKey(key);
    return NSRectFromString(theRect);
  }  
});

NSObject.mixin({
  
  awakeAfterUsingCoder: function(aCoder) {
    return this;
  }
});
