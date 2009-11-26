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


VN.cBasicObjectAlloc = function(self, _cmd) {
  // console.log('HMMMM');
  // console.log(self);
  // console.log(_cmd);
  var obj = new RObject(self, VN.OBJECT) ;
  // Cruical ivar setup
  // console.log('HERE');
  // obj.$i_s('@kvo_observers', new Array());
  // obj.$i_s('@kvo_old_values', VN.$h());
  // obj.$i_s('@kvb_info', VN.$h());
   // # @kvo_observers = []
    // #      @kvo_old_values = {}
  return obj;
};

cBasicObject.$define_alloc_func(VN.cBasicObjectAlloc);

cBasicObject.$def_s('alloc', VN.cBasicObjectAlloc);

cBasicObject.$def('==', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('equal?', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('!', function(self, _cmd, obj) {
  
});

cBasicObject.$def('!=', function(self, _cmd, obj) {
  return (self == obj) ? false : true ;
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
  // console.log('returning class...');
  return RClass.real(self.$klass);
});

cBasicObject.$def('respond_to?', function(self, _cmd, selector) {
  var method_name = rb_funcall(selector, 'to_s');
  var method = self.$klass.$search_method(method_name);
  if (!method) return false;
  return true
});

rb_define_method(cBasicObject, 'nil?', function(self, _cmd) {
  return false;
});

cBasicObject.$def('instance_of?', function(self, _cmd, klass) {
  return self.$klass == klass ? true : false;
});

// these should allow super checking as well
cBasicObject.$def('kind_of?', function(self, _cmd, klass) {
  return self.$klass == klass ? true : false;
});

cBasicObject.$def('is_a?', function(self, _cmd, klass) {
  return self.$klass == klass ? true : false;
});

rb_define_method(cBasicObject, 'instance_variable_set', function(self, _cmd, id, val) {
  return rb_ivar_set(self, id, val);
});

// rb_define_singleton_method(cBasicObject, 'const_set')

rb_define_singleton_method(cBasicObject, 'const_get', function(self, _cmd, name) {
  
});

rb_define_singleton_method(cBasicObject, 'full_const_get', function(self, _cmd, name) {
  var parts = name.split('::');
  var obj = rb_cObject;
  for (var i = 0; i < parts.length; i++) {
    obj = obj.$c_g(parts[i]);
  }
  return obj;
});

/**
  Kernel neccessary methods
*/
mKernel = RModule.define("Kernel");

RModule.include(cObject, mKernel);

rb_define_method(rb_cModule, 'append_features', function(self, _cmd, o) {
  switch (o.$type) {
    case T_CLASS:
    case T_MODULE:
      break;
    default:
      throw "wrong type for include"
      break;
  }
  rb_include_module(o, self);

  return self;
});

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
var rb_cSymbol = RClass.define('Symbol', cObject);
var cNumber = RClass.define('Number', cObject);
var cProc = RClass.define('Proc', cObject);
var cRange = RClass.define('Range', cObject);

