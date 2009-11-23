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
 
/**
  Objj redefines this as null.. we need to look at null, undefined etc as we can
  no longer guarantee they will be cast to 'nil' from objj methods. Might have to
  have some method dispatch overhead... ecspecially for ivars.
*/
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
    return nil;
  }
  return rhs;
};

var NOTTEST = function NOTTEST(expr) {
  if (expr == null || expr == undefined || expr == nil || expr == false) return true;
  return false;
};

/**
  Fix for browsers not having console
  Dont need this. We will just call CPLog and let that handle console.log for us
*/
// if (typeof console === 'undefined') {
//  var console = console || window.console || { };
//  console.log = console.info = console.warn = console.error = function() { };
// }

/**
  Again, do we need these. Objj objects wont support them
*/
var T_CLASS   = 0,
    T_MODULE  = 1,
    T_OBJECT  = 2,
    T_BOOLEAN = 3,
    T_STRING  = 4,
    T_ARRAY   = 5,
    T_NUMBER  = 6,
    T_PROC    = 7,
    T_SYMBOL  = 8,
    T_HASH    = 9;

/**
  CPException instead.
*/
// VN.warning = function(msg) {
//   console.log('Vienna warning: ' + msg);
// };
// 
// VN.type_error = function(msg) {
//   throw 'Vienna TypeError: ' + msg;
// };
// 
// VN.name_error = function(msg) {
//   throw 'Vienna NameError: ' + msg;
// }

/**
  Functionality will be defined else where.
*/
// VN.top_const_get = function(id) {
//   return undefined ;
// };
// 
// VN.define_global_const = function(id, val) {
//   cObject.$define_const(id, val);
// };
// 
// VN.class_tbl = { } ;  // all classes are stored here
// VN.global_tbl = { } ; // globals are stored here

/**
  Global vars will just be set on window.*.. access directly?
*/
// VN.gvar_get = function(id) {
//   
// };
// 
// VN.gvar_set = function(id, val) {
//   
// };



/**
  Core Object functionality
  =========================
  This is useful for building classes before we let ObjectiveJ touch them.
  rb_ is appended as a prefix to some methods to avoid any possible name clashes.
  
  We need to strip a lot of this out and 'cast' it to objc runtime. defclass can
  still exist as we need modules (that will be 'special' objj Classes). We will
  just remove their alloc/allocator methods so instances cannot be made of them.
  Classes will forward allocate to call objj's alloc method.
*/
rb_boot_defclass = function(id, super_klass) {
  var obj = RClass.boot(super_klass);
  obj.$name(id);
  (cObject ? cObject : obj).$c_s(id, obj);
  
  return obj;
};

rb_boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

/**
  Just use Objj's allocator?
*/
rb_obj_alloc = function(klass) {
  // console.log('in base.js, obj_alloc ' + arguments.length);
  // var obj = klass.$('allocate', []);
  var obj = VN$(klass, 'allocate');
  return obj;
};

rb_class_allocate_instance = function() {
  // console.log('doing VN.class_allocate_instance');
  var obj = new RObject(this, VN.OBJECT) ;
  return obj;
};

/**
  Seems silly to still use this.
*/
rb_obj_dummy = function() {
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


// /**
//   Require the runtime
// */
// require('runtime/class');
// require('runtime/module');
// require('runtime/object');
// require('runtime/system');
// 
// /**
//   Require core library
// */
// require('core/object');
// // require('core/kernel');
// require('core/module');
// require('core/class');
// 
// 
// require('core/comparable');
// require('core/enumerable');
// require('core/string');
// require('core/symbol');
// require('core/number');
// require('core/array');
// require('core/boolean');
// require('core/hash');
// require('core/string');
// // require('core/struct');
// // require('core/regexp');
// require('core/range');
// // require('core/time');
// require('core/proc');
// require('core/math');
// // require('core/enumerator');
// // 
// 
// require('core/resources');
// 
// require('core/top_self');
// 
// require('core/nil_class');
// nil = VN$(cObject.$k_g('NilClass'), 'new');
// nil.toString = function() { return 'nil';};
// 
// require('core/bundle');
// require('core/json');
// require('core/yaml');
// require('core/plist');
// require('core/lib');
// require('core/env');
