/* 
 * opal.js
 * opal
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
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
var nil;

/**
  nodes etc
*/

var NOEX_PUBLIC     = 0,
    NOEX_NOSUPER    = 1,
    NOEX_PRIVATE    = 2,
    NOEX_PROTECTED  = 4,
    NOEX_MASK       = 6,
    NOEX_BASIC      = 8;


function require() {
  
};

// Boolean test. false if null, undefined, nil, or false
function RTEST(val) {
  // console.log("val is:" + val);
  return (val != null && val != undefined && val != nil && val != false) ? true : false;
};

/**
  Performs an 'or op' with lhs and rhs
*/
function ORTEST(lhs, rhs) {
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
function ANDTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return nil;
  }
  return rhs;
};

function NOTTEST(expr) {
  if (expr == null || expr == undefined || expr == nil || expr == false) return true;
  return false;
};

/**
  Fix for browsers not having console
*/
// if (typeof console === 'undefined') {
//  var console = console || window.console || { };
//  console.log = console.info = console.warn = console.error = function() { };
// }

function RObject(klass, type) {
  this.klass = klass;
  this.flags = type;
  this.iv_tbl = { };
  return this;
};

function RClass(klass, super_klass) {
  this.klass = klass ;
  this.sup = super_klass ;
  this.flags = T_CLASS ;
  this.m_tbl = { };
  this.iv_tbl = { };
  return this;
};

function RHash() {
  this.klass = nil;
  this.flags = nil;
  this.ifnone = nil;
  // ordered keys
  this.keys = [];
  // keys.to_s => values
  this.dict = { };
  return this;
};

function rb_method_t() {
  this.argc = 0;
  this.body = nil;
  // this.noex = 0;
  return this;
};

// Types
var T_CLASS   = 1,
    T_MODULE  = 2,
    T_OBJECT  = 4,
    T_BOOLEAN = 8,
    T_STRING  = 16,
    T_ARRAY   = 32,
    T_NUMBER  = 64,
    T_PROC    = 128,
    T_SYMBOL  = 256,
    T_HASH    = 512,
    T_ICLASS  = 1024;

// Flags
var FL_SINGLETON = 2056;

function FL_TEST(x, f) {
  return x.flags & f;
}

function FL_SET(x, f) {
  x.flags |= f;
}

function FL_UNSET(x, f) {
  x.flags &= (~f);
}

rb_class_tbl = { } ;  // all classes are stored here
rb_global_tbl = { } ; // globals are stored here

function rb_gvar_get(id) {
  
};

function rb_gvar_set(id, val) {
  
};


function boot_defclass(id, super_class) {
  var o = rb_class_boot(super_class);
  rb_name_class(o, id);
  rb_class_tbl[id] = o;
  rb_const_set((rb_cObject ? rb_cObject : o), id, o);
  return o;
};

boot_defmetametaclass = function(klass, metametaclass) {
  klass.klass.klass = metametaclass;
};

obj_alloc = function(klass) {
  // console.log('in base.js, obj_alloc ' + arguments.length);
  // var obj = klass.$('allocate', []);
  var obj = VN$(klass, 'allocate');
  return obj;
};

class_allocate_instance = function() {
  // console.log('doing VN.class_allocate_instance');
  var obj = new RObject(this, T_OBJECT) ;
  return obj;
};

obj_dummy = function() {
  return nil ;
};

equal = function(obj) {
  if (obj == this) return true ;
  var result = this.$funcall('==', [obj]);
  if (result) return true ;
  return false ;
};

eql = function(obj) {
  return this.$funcall('==', [obj]);
};

obj_equal = function(obj) {
  return (obj == this) ? true : false ;
};
