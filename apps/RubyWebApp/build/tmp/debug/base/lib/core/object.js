/* 
 * object.js
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

var metaclass;
var cBasicObject = VN.boot_defclass('BasicObject', null);
var cObject = VN.boot_defclass('Object', cBasicObject);
var cModule = VN.boot_defclass('Module', cObject);
var cClass = VN.boot_defclass('Class', cModule);

metaclass = cBasicObject.$make_metaclass(cClass);
metaclass = cObject.$make_metaclass(metaclass);
metaclass = cModule.$make_metaclass(metaclass);
metaclass = cClass.$make_metaclass(metaclass);

VN.boot_defmetametaclass(cModule, metaclass);
VN.boot_defmetametaclass(cObject, metaclass);
VN.boot_defmetametaclass(cBasicObject, metaclass);

/**
  BasicObject necessary methods
*/
cBasicObject.$define_private_method('initialize', function(self, _cmd) {
  

  
  return nil ;
});

cBasicObject.$define_alloc_func(function(self, _cmd) {
  // console.log('HMMMM');
  // console.log(self);
  // console.log(_cmd);
  var obj = new RObject(self, VN.OBJECT) ;
  // Cruical ivar setup
  // console.log('HERE');
  obj.$i_s('@kvo_observers', new Array());
  obj.$i_s('@kvo_old_values', VN.$h());
   // # @kvo_observers = []
    // #      @kvo_old_values = {}
  return obj;
});

cBasicObject.$def('==', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('equal?', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('!', function(self, _cmd, obj) {
  
});

cBasicObject.$def('!=', function(self, _cmd, obj) {
  
});

cBasicObject.$define_private_method('singleton_method_added', function() {
  return nil ;
});

cBasicObject.$define_private_method('singleton_method_removed', function() {
  return nil ;
});

cBasicObject.$define_private_method('singleton_method_undefined', function() {
  return nil ;
});

// TODO: remove and put in kernel
cBasicObject.$def('puts', function(self, _cmd, val) {
  // console.log('in here pal');
  console.log(val);
});

// TODO: remove and put in kernel
cBasicObject.$def('===', function(self, _cmd, other) {
  return self == other;
});

cBasicObject.$def('class', function(self, _cmd) {
  console.log('returning class...');
  return self.$klass;
});

cBasicObject.$def('respond_to?', function(self, _cmd, selector) {
  var method = self.$klass.$search_method(selector);
  if (!selector) return false;
  return true
});

/**
  Kernel neccessary methods
*/
mKernel = RModule.define("Kernel");

RModule.include(cObject, mKernel);

cClass.$define_private_method('inherited', function() {
  return nil ;
});

cModule.$define_private_method('included', function() {
  return nil ;
});

cModule.$define_private_method('extended', function() {
  return nil ;
});

cModule.$define_private_method('method_added', function() {
  return nil ;
});

cModule.$define_private_method('method_removed', function() {
  return nil ;
});

cModule.$define_private_method('method_undefined', function() {
  return nil ;
});

/**
  Base Classes/Modules
*/
var cNilClass = RClass.define('NilClass', cObject);
var cBoolean = RClass.define('Boolean', cObject);
var cArray = RClass.define('Array', cObject);
var cString = RClass.define('String', cObject);
var cNumeric = RClass.define('Numeric', cObject);
