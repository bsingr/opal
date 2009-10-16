/* 
 * base.js
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
 
// temp..
var nil = null;

// Boolean test. false if null, undefined, nil, or false
var RTEST = function RTEST(val) {
  return (val != null && val != undefined && val != nil && val != false) ? true : false;
};

/**
  Performs an 'or op' with lhs and rhs
*/
var ORTEST = function ORTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return rhs;
  }
  return lhs;
};

/**
  Performs an 'and op' with lhs and rhs
*/
var ANDTEST = function ANDTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return lhs;
  }
  return rhs;
};

var VN = {
  
  CLASS: 0,
  MODULE: 1,

  OBJECT: 2,
  BOOLEAN: 3,
  STRING: 4,
  ARRAY: 5,
  NUMBER: 6,
  PROC: 7

};

VN.warning = function(msg) {
  console.log('Vienna warning: ' + msg);
};

VN.type_error = function(msg) {
  throw 'Vienna TypeError: ' + msg;
};

VN.name_error = function(msg) {
  throw 'Vienna NameError: ' + msg;
}

VN.top_const_get = function(id) {
  return undefined ;
};

VN.define_global_const = function(id, val) {
  cObject.$define_const(id, val);
};

VN.class_tbl = { } ;  // all classes are stored here
VN.global_tbl = { } ; // globals are stored here

VN.gvar_get = function(id) {
  
};

VN.gvar_set = function(id, val) {
  
};



/**
  Object
*/
VN.boot_defclass = function(id, super_klass) {
  var obj = RClass.boot(super_klass);
  obj.$name(id);
  (cObject ? cObject : obj).$c_s(id, obj);
  
  return obj;
};

VN.boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

VN.obj_alloc = function(klass) {
  // console.log('in base.js, obj_alloc ' + arguments.length);
  // var obj = klass.$('allocate', []);
  var obj = VN$(klass, 'allocate');
  return obj;
};

VN.class_allocate_instance = function() {
  // console.log('doing VN.class_allocate_instance');
  var obj = new RObject(this, VN.OBJECT) ;
  return obj;
};

VN.obj_dummy = function() {
  return nil ;
};

VN.equal = function(obj) {
  if (obj == this) return true ;
  var result = this.$funcall('==', [obj]);
  if (result) return true ;
  return false ;
};

VN.eql = function(obj) {
  return this.$funcall('==', [obj]);
};

VN.obj_equal = function(obj) {
  return (obj == this) ? true : false ;
};


/**
  Require the runtime
*/

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/runtime/class.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/runtime/module.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/runtime/object.js');

/**
  Require core library
*/

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/object.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/kernel.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/module.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/class.js');



VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/comparable.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/enumerable.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/string.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/numeric.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/array.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/boolean.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/hash.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/string.js');
// require('core/struct');
// require('core/regexp');
// require('core/range');
// require('core/time');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/proc.js');
// require('core/math');
// require('core/enumerator');
// 


VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/top_self.js');


VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/nil_class.js');
nil = VN$(cObject.$k_g('NilClass'), 'new');
nil.toString = function() { return 'nil';};
