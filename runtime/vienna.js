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
var c_basic_object      = null,
        c_module        = null,
        c_class         = null,
        c_kernel        = null,
        c_symbol        = null,
        c_true_class    = null,
        c_false_class   = null,
        c_nil_class     = null,
        c_proc          = null,
        c_string        = null,
        c_numeric       = null;

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
    
// literal construction functions etc

// Create a ruby string from a javascript string
// 
// Usage:
//  vnS("some string goes here")
//  => {RubyString}
// 
global.vnS = function(str) {
  var res = new c_string.allocator();
  res.__str__ = str;
  return res;
};

// Create ruby number from javascript number
global.vnN = function(num) {
  var res = new c_numeric.allocator();
  res.__num__ = num;
  return res;
};

// create a ruby proc from javascript func
global.vnP = function(fun) {
  var res = new c_proc.allocator();
  res.__fun__ = fun;
  return res;
};

// create a ruby symbol from javascript str. This checks the global sym table
// first to make sure we only create one symbol per name (id).
global.vnY = function(str) {
  if (symbol_table.hasOwnProperty(str))
    return symbol_table[str];
    
  var res = new c_symbol.allocator();
  res.__ptr__ = str;
  symbol_table[str] = res;
  return res;
};

// create a ruby array from a javascript array.
global.vnA = function(arr) {
  var res = new c_array.allocator();
  res.__arr__ = arr;
  return res;
};

var symbol_table = { };

// For object_id's .. each object/class will get an object_id
var hash_yield = 0;

var yield_hash = function() {
  return hash_yield++;
};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
	  for (var i = 0; i< this.length; i++) {
	    if (this[i] == obj) return i;
	  }
	  return -1;
	};
};

var ruby_class = function(id, super_class) {
  this.super_class = super_class;
  
  this.name = id;
  
  this.flags = T_CLASS;
  
  this.id = yield_hash();
  
  if (super_class) {
    this.allocator = function() {
      this.id = yield_hash();
    };
    
    this.allocator.prototype = new super_class.allocator();
    
    this.constants = new super_class.constants_alloc();
    this.constants_alloc = function() {};
    this.constants_alloc.prototype = this.constants;
  } else {
    // default empty constants and default ruby_class allocator
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

// Default allocator for top level obect: BasicObject
ruby_class.prototype.allocator = function() {
  this.id = yield_hash();
};

// =========
// = Class =
// =========

/*
    Get the singleton class - the meta for classes, or real class for objects
*/
var singleton_class = function(klass) {
  
};

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



var define_class_under = function(base, id, super_class) {
  
  if (base.const_defined(id))
    return base.const_get(id);
  
  var klass;
  
  if (!super_class)
    super_class = exports.c_object;
    
  klass = boot_class(super_class, id);
  
  return klass;
};

// =============
// = Bootstrap =
// =============

function boot_defclass(id, super_class) {
  var o = boot_class(super_class, id);
  (exports.c_object ? exports.c_object : o).const_set(id, o);
  // exports.const_set((exports.c_object ? exports.c_object : o), id, o);
  return o;
};

function boot_class(super_class, name) {
  var c = new ruby_class(name, super_class);
  return c;
};

// ===================
// = Runtime methods =
// ===================

/**
  Runtime methods for control etc will be added to each class and each class 
  instance.
  
  e.g. my_rb_obj.add_method(...)
*/
var runtime_methods = {
  
  define_class: function(super_class, id, body, flag) {

    var klass, base = this;

    // need to check if base is object or class. if object, use its class
    if (base.flags & T_OBJECT)
      base = class_real(base.isa);

    switch (flag) {
      // normal class
      case 0:
        if (super_class === vnNil)
          super_class = exports.c_object;

        klass = define_class_under(base, id, super_class);
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
  },
  
  /**
    define a method on the receiver. 
    
    @m_id - actual method id as seen from ruby
    
    @param js_id - js version .. starts with '$' and all non characters are
                  replaces with relevant alternatives

  */
  add_method: function(m_id, js_id, body, singleton) {
    
    if (this.flags & T_CLASS) {
      this.allocator.prototype[js_id] = body;
    } else {
      this[js_id] = body;
    }
    
    
    body.method_id = m_id;
    body.displayName = m_id;
  
    // if module, then could use callback to add to all classes this has been
    // included in
  },
  
  /**
    Set the constant named id on the receiver. Should check to make sure
    we are setting it on a class, and not an instance.

    @return val the value of the constant set
  */
  const_set: function(id, val) {
    // FIXME: should check if base is class or object. if object, use class
    this.constants[id] = val;
    
    return val;
  },
  
  /**
    Get the value of a constant on the base/receiver. For now just returns nil if
    the id is not found, should really throw error

    @return returns the value of the constant
  */
  const_get: function(id) {
    // FIXME: check if base is class or instance
    return this.constants[id];
  },

  /*
    Check if a constant with the given id is defined on the receicer
    
    @return true/false
  */
  const_defined: function(id) {
    if (this.constants[id])
      return true;

    return false;
  }
};

for (prop in runtime_methods) {
  ruby_class.prototype.allocator.prototype[prop] = runtime_methods[prop];
  ruby_class.prototype[prop] = runtime_methods[prop];
}

// ==============
// = Initialize =
// ==============

c_basic_object = boot_defclass('BasicObject', null);
exports.c_object = boot_defclass('Object', c_basic_object);
exports.c_object.const_set('BasicObject', c_basic_object);

c_string = boot_defclass('String', exports.c_object);
c_string.allocator.prototype.flags = T_OBJECT | T_STRING;

c_numeric = boot_defclass('Numeric', exports.c_object);
c_numeric.allocator.prototype.flags = T_OBJECT | T_NUMBER;

c_symbol = boot_defclass('Symbol', exports.c_object);
c_symbol.allocator.prototype.flags = T_OBJECT | T_SYMBOL;

exports.top_self = new exports.c_object.allocator();
