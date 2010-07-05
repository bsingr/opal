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
        module_kernel        = null,
        c_symbol        = null,
        c_true_class    = null,
        c_false_class   = null,
        c_nil_class     = null,
        class_proc          = null,
        class_string        = null,
        c_array         = null,
        c_hash          = null,
        class_number       = null;

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
  var res = new class_string.allocator();
  res.__str__ = str;
  return res;
};

// Create ruby number from javascript number
global.vnN = function(num) {
  var res = new class_number.allocator();
  res.__num__ = num;
  return res;
};

// create a ruby proc from javascript func
global.vnP = function(fun) {
  var res = new class_proc.allocator();
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

// create a ruby array from arguments..
// vnA(arr1, arr2....arr3);
global.vnA = function() {
  var res = new c_array.allocator();
  res.__arr__ = Array.prototype.slice.call(arguments);
  return res;
};

// hash from arguments vnH(key1, val1, key2, val2...)
global.vnH = function() {
  var k, v, res = new c_hash.allocator();
  res.__keys__ = [];
  res.__assocs__ = {};
  for (var i = 0; i < arguments.length; i++) {
    k = arguments[i], v = arguments[i+1];
    i++;
    res.__keys__.push(k);
    res.__assocs__[k.hash()] = v;
  }
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
 
//   define_class: function(super_class, id, body, flag) {
// 
//     var klass, base = this;
// 
//     // need to check if base is object or class. if object, use its class
//     if (base.flags & T_OBJECT)
//       base = class_real(base.isa);
// 
//     switch (flag) {
//       // normal class
//       case 0:
//         if (super_class === vnNil)
//           super_class = exports.c_object;
// 
//         klass = define_class_under(base, id, super_class);
//         break;
//       // class shift
//       case 1:
//         throw "define_class: class shift is currently unimplemented"
//         break;
//       // module
//       case 2:
//         throw "define_class: module is currently unimplemented"
//         break;
//       default:
//         throw "unknown define_class flag: " + flag
//     }
// 
//     // for each case call the body using our klass as the receiver (self/this)
//     body.apply(klass);
// 
//     return klass;
//   },
//   


//   add_method: function(m_id, js_id, body, singleton) {
//     
//     // if singleton... only works for class level (at the moment)
//         
//     
//     if (this.flags & T_CLASS) {
//       this.allocator.prototype[js_id] = body;
//     } else {
//       this[js_id] = body;
//     }
//     
//     
//     body.method_id = m_id;
//     body.displayName = m_id;
//   
//     // if module, then could use callback to add to all classes this has been
//     // included in
//   },


// Base of every object or class object in vienna. Every object, string, number,
// class, module, regexp, proc etc will be an instance of this, so const_set etc
// are all on the prototype of this.
var __boot_base_class = function() {
  this.id = yield_hash();
};

__boot_base_class.prototype.hash = function() {
  return this.id;
};


__boot_base_class.prototype.define_class = function(sup, id, body, flag) {
  
  var klass, base = this;
  
  if (base.flags & T_OBJECT)
    base = base.isa;
  
  switch (flag) {
    // normal class
    case 0:
      if (sup === vnNil)
        sup = class_object;
      
      klass = define_class_under(base, id, sup);
      break;
    case 2:
      klass = define_module_under(base, id);
      break;
    default:
      throw "define_class: unknown flag: " + flag
  }
  
  body.apply(klass);
  
  return klass;
};

__boot_base_class.prototype.add_method =function(m_id, js_id, body, singleton) {
  
  body.method_id = m_id;
  body.displayName = m_id;
  
  if (singleton) {
    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
      this.constructor.prototype[js_id] = body;
      this.constructor.prototype.method_table[js_id] = body;
    }
    else {
      throw "need to add_method to singleton object"
    }
  }
  else {
    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
      this.allocator.prototype[js_id] = body;
      this.allocator.prototype.method_table[js_id] = body;
    }
    else {
      throw "need to add_method to  object"
    }
  }
  return;
};

__boot_base_class.prototype.const_set = function(id, val) {
  
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;

  base.constants[id] = val;
  return val;
};

__boot_base_class.prototype.const_defined = function(id) {
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;
    
  if (base.constants[id])
    return true;
    
  return false;
};

__boot_base_class.prototype.const_get = function(id) {
  
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;
    
  if (base.constants[id])
    return base.constants[id];
  
  throw "NameError: uninitialized constant: " + id;
};

__boot_base_class.prototype.include = function(module) {
  
  if (!this.included_modules)
    this.included_modules = [];
  
  if (this.included_modules.indexOf(module) != -1)
    return; // already included
  
  this.included_modules.push(module);
  module.included_in.push(this);
  
  for (method in module.method_table) {
    console.log("need to add:" + method);
  }
};

var define_class_under = function(base, id, super_class) {
  
  if (base.const_defined(id))
    return base.const_get(id);
  
  if (!super_class)
    super_class = class_object;
  
  var cls = function() {
    this.id = yield_hash();
  };
  
  cls.prototype = new super_class.allocator();
  cls.prototype.method_table = {};
  cls.prototype.constructor = cls;
  cls.prototype.class_name = id;
  cls.prototype.super_class = super_class;
  cls.prototype.info = T_OBJECT;
  
  var meta = function() {
    this.id = yield_hash();
  }
  
  meta.prototype = new super_class.constructor();
  meta.prototype.method_table = {};
  meta.prototype.allocator = cls;
  meta.prototype.class_name = id;
  meta.prototype.super_class = super_class.constructor;
  meta.prototype.info = T_CLASS;
  meta.prototype.constructor = meta;
  
  // constants
  meta.prototype.constants = new super_class.constants_alloc();
  meta.prototype.constants_alloc = function() {};
  meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  
  cls.prototype.isa = meta.prototype;
  
  var res = new meta();
  base.const_set(id, res);
  return res;
};

var define_module_under = function(base, id) {
  
  if (base.const_defined(id))
    return base.const_get(id);
    
  var mod = define_class_under(base, id, class_module);
  mod.included_in = [];
  mod.info = T_MODULE | FL_SINGLETON;
  mod.allocator.prototype.info = T_MODULE;
  return mod;
};

var __boot_defclass = function(id, super_class) {
  
  var cls = function() {
    this.id = yield_hash();
  };
  
  if (super_class)
    cls.prototype = new super_class();
  else
    cls.prototype = new __boot_base_class();
  
  cls.prototype.method_table = {};
  cls.prototype.constructor = cls;
  cls.prototype.class_name = id;
  cls.prototype.super_class = super_class;
  cls.prototype.info = T_OBJECT;
  return cls;
};

var __boot_makemeta = function(klass, super_class) {
  
  var meta = function() {
    this.id = yield_hash();
  };
  
  meta.prototype = new super_class();
  
  meta.prototype.method_table = {};
  meta.prototype.allocator = klass;
  meta.prototype.constructor = meta;
  meta.prototype.class_name = klass.prototype.class_name;
  meta.prototype.super_class = super_class;
  meta.prototype.info = T_CLASS;
  
  klass.prototype.isa = meta.prototype;
  
  // constants etc
  if (klass === boot_basic_object) {
    meta.prototype.constants_alloc = function() {};
    meta.prototype.constants = meta.prototype.constants_alloc.prototype;
  } else {
    meta.prototype.constants = new super_class.prototype.constants_alloc();
    meta.prototype.constants_alloc = function() {};
    meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  }
  
  return new meta();
};

var __boot_defmetameta = function(klass, meta) {
  klass.isa = meta;
};

// ==============
// = Initialize =
// ==============

var metaclass;

var boot_basic_object = __boot_defclass("BasicObject", null);
var boot_object = __boot_defclass("Object", boot_basic_object);
var boot_module = __boot_defclass("Module", boot_object);
var boot_class = __boot_defclass("Class", boot_module);

var class_basic_object = __boot_makemeta(boot_basic_object, boot_class);
var class_object = __boot_makemeta(boot_object, class_basic_object.constructor);
var class_module = __boot_makemeta(boot_module, class_object.constructor);
var class_class = __boot_makemeta(boot_class, class_module.constructor);

__boot_defmetameta(class_basic_object, class_class);
__boot_defmetameta(class_object, class_class);
__boot_defmetameta(class_module, class_class);
__boot_defmetameta(class_class, class_class);

class_object.const_set("BasicObject", class_basic_object);
class_object.const_set("Object", class_object);
class_object.const_set("Class", class_class);
class_object.const_set("Module", class_module);

// Custom methods for modules to handle includes properly
class_module.constructor.prototype.add_method = function(m_id,js_id,body, sing){
    
  // super
  __boot_base_class.prototype.add_method.apply(this, arguments);
    
  // go through each class we are included in and add new method to that as well
  for (var i = 0; i < this.included_in.length; i++) {
    this.included_in[i].allocator.prototype[js_id] = body;
  }
};


exports.Object = class_object;
exports.top_self = new class_object.allocator();

// Kernel module
module_kernel = define_module_under(class_object, "Kernel");
class_object.include(module_kernel);

// String class
class_string = define_class_under(class_object, "String", class_object);
class_string.allocator.prototype.info = T_OBJECT | T_STRING;

class_string.allocator.prototype.hash = function() {
  return '$$str$$' + this.__str__;
};

class_string.allocator.prototype.toString = function() {
  return this.__str__;
};

// Number class
class_number = define_class_under(class_object, "Number", class_object);
class_number.allocator.prototype.info = T_OBJECT | T_NUMBER;

class_number.allocator.prototype.hash = function() {
  return '$$num$$' + this.__num__;
};

class_number.allocator.prototype.toString = function() {
  return this.__num__;
};

// Proc class
class_proc = define_class_under(class_object, "Proc", class_object);
class_proc.allocator.prototype.info = T_OBJECT | T_PROC;
