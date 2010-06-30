var vienna = { };
(function(global, exports) {
/* 
 * vienna.js
 * vienna
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
 
// Core classes
exports.c_object        = null;
exports.c_basic_object  = null;
exports.c_module        = null;
exports.c_class         = null;
exports.c_kernel        = null;
exports.c_symbol        = null;
exports.c_true_class    = null;
exports.c_false_class   = null;
exports.c_nil_class     = null;
exports.c_proc          = null;
exports.c_string        = null;
exports.c_numeric       = null;

// top self
exports.top_self        = null;

// Core object literals (in main window scope)
global.vnNil            = null;
global.vnTrue           = null;
global.vnFalse          = null;

// flags for object/class types
var T_CLASS             = 1,
    T_MODULE            = 2,  
    T_OBJECT            = 4,  
    T_BOOLEAN           = 8, 
    T_STRING            = 16,  
    T_ARRAY             = 32,  
    T_NUMBER            = 64, 
    T_PROC              = 128,  
    T_SYMBOL            = 256,  
    T_HASH              = 512, 
    T_ICLASS            = 1024,
    FL_SINGLETON        = 2056;

// For object_id's .. each object/class will get an object_id
exports.hash_yield = 0;

exports.yield_hash = function() {
  return exports.hash_yield++;
};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
	  for (var i = 0; i< this.length; i++) {
	    if (this[i] == obj) return i;
	  }
	  return -1;
	};
};

exports.ruby_class = function(id, super_class) {
  this.super_class = super_class;
  
  this.name = id;
  
  this.flags = T_CLASS;
  
  this.allocator = function() { };
  
  if (super_class) {
    this.allocator.prototype = new super_class.allocator();
    
    this.constants = new super_class.constants_alloc();
    this.constants_alloc = function() {};
    this.constants_alloc.prototype = this.constants;
  } else {
    // default empty constants
    this.constants_alloc = function() { };
    this.constants = this.constants_alloc.prototype;
  }
  
  this.allocator.prototype.flags = T_OBJECT;
  this.allocator.prototype.name = id;
  this.allocator.prototype.super_class = super_class;
  this.allocator.prototype.isa = this;
  
  // this.isa = exports.c_class;
  
  return this;
};

// =========
// = Class =
// =========

/**
  Get the "real class".
  
  Singleton classes are kept for singleton objects, so we must get the real
  class
*/
var class_real = function(klass) {
  while (klass.flags & FL_SINGLETON)
    klass = klass.super_class;
  
  return klass
};

exports.define_class = function(base, super_class, id, body, flag) {
  
  var klass;
  
  // need to check if base is object or class. if object, use its class
  if (base.flags & T_OBJECT)
    base = class_real(base.isa);
  
  switch (flag) {
    // normal class
    case 0:
      if (super_class === vnNil)
        super_class = exports.c_object;
      
      klass = exports.define_class_under(base, id, super_class);
      break;
    // class shift
    case 1:
      throw "define_class: class shift is currently unimplemented"
      break;
    // module
    case 2:
      throw "define_class: module is currently unimplemented"
      break;
    default:
      throw "unknown define_class flag: " + flag
  }
  
  // for each case call the body using our klass as the receiver (self/this)
  body.apply(klass);
  
  return klass;
};

exports.define_class_under = function(base, id, super_class) {
  
  if (exports.const_defined(base, id))
    return exports.const_get(base, id);
  
  var klass;
  
  if (!super_class)
    super_class = exports.c_object;
    
  klass = boot_class(super_class, id);
  
  return klass;
  
  console.log("does not exist for " + id);
};

// =============
// = Variables =
// =============

/**
  Set the constant named id on the base (receiver). Should check to make sure
  we are setting it on a class, and not an instance.
  
  @return val the value of the constant set
*/
exports.const_set = function(base, id, val) {
  // FIXME: should check if base is class or object. if object, use class
  base.constants[id] = val;
  
  return val;
};

/**
  Get the value of a constant on the base/receiver. For now just returns nil if
  the id is not found, should really throw error
  
  @return returns the value of the constant
*/
exports.const_get = function(base, id) {
  // FIXME: check if base is class or instance
  return base.constants[id];
};

exports.const_defined = function(base, id) {
  if (base.constants[id])
    return true;
  
  return false;
};

// =============
// = Bootstrap =
// =============

function boot_defclass(id, super_class) {
  var o = boot_class(super_class, id);
  exports.const_set((exports.c_object ? exports.c_object : o), id, o);
  return o;
};

function boot_class(super_class, name) {
  var c = new exports.ruby_class(name, super_class);
  return c;
};

// ==============
// = Initialize =
// ==============

exports.c_basic_object = boot_defclass('BasicObject', null);
exports.c_object = boot_defclass('Object', exports.c_basic_object);
exports.const_set(exports.c_object, 'BasicObject', exports.c_basic_object);

exports.top_self = new exports.c_object.allocator();


// ===================
// = Runtime methods =
// ===================

var _basic_allocator = exports.c_basic_object.allocator.prototype;
var _basic_meta = exports.c_basic_object;

/**
  Runtime methods for control etc will be added to each class and each class 
  instance.
  
  e.g. my_rb_obj.add_method(...)
*/
var runtime_methods = {
  
  /**
    define a method on the receiver. 
    
    @m_id - actual method id as seen from ruby
    
    @param js_id - js version .. starts with '$' and all non characters are
                  replaces with relevant alternatives

  */
  add_method: function(m_id, js_id, body, singleton) {
    console.log("adding for " + m_id);
    console.log(this);
    if (this.flags & T_CLASS) {
      this.allocator.prototype[js_id] = body;
    } else {
      this[js_id] = body;
    }
    
    
    body.method_id = m_id;
    body.displayName = m_id;
  
    // if module, then could use callback to add to all classes this has been
    // included in
  }
};

for (prop in runtime_methods) {
  _basic_allocator[prop] = runtime_methods[prop];
  _basic_meta[prop] = runtime_methods[prop];
}
})(window, vienna);
// core/basic_object.rb
(function(){vienna.define_class(this,vnNil,"BasicObject",function(){this.add_method("initialize","$initialize",function($,id,_){},false);this.add_method("==","$==",function($,id,_,_a){},false);this.add_method("equal?","$equal?",function($,id,_,_a){},false);this.add_method("!","$!",function($,id,_){},false);return this.add_method("!=","$!=",function($,id,_,_a){},false);},0);}).apply(vienna.top_self);
