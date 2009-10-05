/* 
 * basic_object.js
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
  This is the core/root object inside vienna, and ideally all objects will 
  inherit from this root object. 'Object' is avoided for the root class as
  to avoid infecting json objects and dynamic objects with these core methods.
*/
/*
  Basic Object
*/
var BasicObject = function() {
  this.initialize.apply(this, arguments) ;
};

BasicObject.attrAccessor = function() {
  this.attrWriter.apply(this, arguments);
  this.attrReader.apply(this, arguments);
};

BasicObject.attrWriter = function() {
  for (var i = 0; i < arguments.length; i++) {
    var name = arguments[i];
    this.prototype['set' + name] = new Function('val', 'this.$' + name + ' = val;');
  };
};

BasicObject.attrReader = function() {
  for (var i = 0; i < arguments.length; i++) {
    var name = arguments[i];
    this.prototype[name] = new Function('return this.$' + name + ';');
  };
};

BasicObject.prototype.klass = BasicObject;
BasicObject.prototype.superklass = BasicObject;

BasicObject.prototype.initialize = function() {
  // console.log('Initializing basic object');
  console.log('oh yeahhh');
  return this;
};

BasicObject.extend = Class.prototype.extend;

BasicObject.addSetterMethod = function(key, funcName, func) {
  // var methodBody = 'console.log("setting key: ' + key + '");';
  var methodBody = '';
  methodBody += 'this._$' + funcName + '(val);';
  this.prototype[funcName] = new Function('val', methodBody);
  this.prototype['_$' + funcName] = func;
};
