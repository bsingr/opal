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
        c_array         = null,
        c_hash          = null,
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
 
// var class_alloc = function(id, super_class) {
//   var meta = function() {};
//   meta.prototype = new super_class.meta();
//   
//   var cls = new meta();
//   cls.meta = meta;
//   
//   cls.super_class = super_class;
//   cls.name = id;
//   cls.flags = T_CLASS;
//   cls.id = yield_hash();
//   
//   return cls;
// };
// 
// global.class_alloc = class_alloc;
// 
// var ruby_class = function(id, super_class) {
//   this.super_class = super_class;
//   
//   this.name = id;
//   
//   this.flags = T_CLASS;
//   
//   this.id = yield_hash();
//   
//   if (super_class) {
//     this.allocator = function() {
//       this.id = yield_hash();
//     };
//     
//     this.allocator.prototype = new super_class.allocator();
//     
//     this.constants = new super_class.constants_alloc();
//     this.constants_alloc = function() {};
//     this.constants_alloc.prototype = this.constants;
//   } else {
//     // default empty constants and default ruby_class allocator
//     this.constants_alloc = function() { };
//     this.constants = this.constants_alloc.prototype;
//   }
//   
//   this.allocator.prototype.flags = T_OBJECT;
//   this.allocator.prototype.name = id;
//   this.allocator.prototype.super_class = super_class;
//   this.allocator.prototype.isa = this;
//   
//   // this.isa = exports.c_class;
//   
//   return this;
// };
// 
// // Default allocator for top level obect: BasicObject
// ruby_class.prototype.allocator = function() {
//   this.id = yield_hash();
// };
// 
// // =========
// // = Class =
// // =========
// 
// /*
//     Get the singleton class - the meta for classes, or real class for objects
// */
// var singleton_class = function(klass) {
//   
// };
// 
// /**
//   Get the "real class".
//   
//   Singleton classes are kept for singleton objects, so we must get the real
//   class
// */
// var class_real = function(klass) {
//   while (klass.flags & FL_SINGLETON)
//     klass = klass.super_class;
//   
//   return klass
// };
// 
// 
// 
// var define_class_under = function(base, id, super_class) {
//   
//   if (base.const_defined(id))
//     return base.const_get(id);
//   
//   var klass;
//   
//   if (!super_class)
//     super_class = exports.c_object;
//     
//   klass = boot_class(super_class, id);
//   base.const_set(id, klass);  
//   
//   return klass;
// };

// // =============
// // = Bootstrap =
// // =============
// 
// function boot_defclass(id, super_class) {
//   var o = boot_class(super_class, id);
//   (exports.c_object ? exports.c_object : o).const_set(id, o);
//   // exports.const_set((exports.c_object ? exports.c_object : o), id, o);
//   return o;
// };
// 
// function boot_class(super_class, name) {
//   var c = new ruby_class(name, super_class);
//   return c;
// };
// 
// // ===================
// // = Runtime methods =
// // ===================
// 
// /**
//   Runtime methods for control etc will be added to each class and each class 
//   instance.
//   
//   e.g. my_rb_obj.add_method(...)
// */
// var runtime_methods = {
//   
//   /**
//     primarily useful for hashes. default returns the id, but some classes like
//     string, number etc return their actual value so multiple strings do not 
//     appear more than once as keys
//   */
//   hash: function() {
//     return this.id;
//   },
//   
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
//   /**
//     define a method on the receiver. 
//     
//     @m_id - actual method id as seen from ruby
//     
//     @param js_id - js version .. starts with '$' and all non characters are
//                   replaces with relevant alternatives
// 
//   */
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
//   
//   /**
//     Set the constant named id on the receiver. Should check to make sure
//     we are setting it on a class, and not an instance.
// 
//     @return val the value of the constant set
//   */
//   const_set: function(id, val) {
//     // FIXME: should check if base is class or object. if object, use class
//     this.constants[id] = val;
//     
//     return val;
//   },
//   
//   /**
//     Get the value of a constant on the base/receiver. For now just returns nil if
//     the id is not found, should really throw error
// 
//     @return returns the value of the constant
//   */
//   const_get: function(id) {
//     // FIXME: check if base is class or instance
//     if (this.flags & T_OBJECT)
//       return this.isa.const_get(id);
//     
//     if (this.constants[id])
//       return this.constants[id];
//     
//     throw "NameError: uninitialized constant: " + id
//   },
// 
//   /*
//     Check if a constant with the given id is defined on the receicer
//     
//     @return true/false
//   */
//   const_defined: function(id) {
//     if (this.constants[id])
//       return true;
// 
//     return false;
//   }
// };
// 
// for (prop in runtime_methods) {
//   ruby_class.prototype.allocator.prototype[prop] = runtime_methods[prop];
//   ruby_class.prototype[prop] = runtime_methods[prop];
// }

// ==============
// = Initialize =
// ==============

// c_basic_object = boot_defclass('BasicObject', null);
// exports.c_object = boot_defclass('Object', c_basic_object);
// exports.c_object.const_set('BasicObject', c_basic_object);
// 
// c_string = boot_defclass('String', exports.c_object);
// c_string.allocator.prototype.flags = T_OBJECT | T_STRING;
// 
// c_numeric = boot_defclass('Numeric', exports.c_object);
// c_numeric.allocator.prototype.flags = T_OBJECT | T_NUMBER;
// 
// c_symbol = boot_defclass('Symbol', exports.c_object);
// c_symbol.allocator.prototype.flags = T_OBJECT | T_SYMBOL;
// 
// c_array = boot_defclass('Array', exports.c_object);
// c_array.allocator.prototype.flags = T_OBJECT | T_ARRAY;
// 
// c_hash = boot_defclass('Hash', exports.c_object);
// c_hash.allocator.prototype.flags = T_OBJECT | T_HASH;
// 
// c_proc = boot_defclass('Proc', exports.c_object);
// c_proc.allocator.prototype.flags = T_OBJECT | T_PROC;
// 
// c_nil_class = boot_defclass('NilClass', exports.c_object);
// vnNil = new c_nil_class.allocator();
// 
// c_true_class = boot_defclass('TrueClass', exports.c_object);
// vnTrue = new c_true_class.allocator();
// 
// c_false_class = boot_defclass('FalseClass', exports.c_object);
// vnFalse = new c_false_class.allocator();
// 
// exports.top_self = new exports.c_object.allocator();

// ==================
// = New Initialize =
// ==================

// Base of every object or class object in vienna. Every object, string, number,
// class, module, regexp, proc etc will be an instance of this, so const_set etc
// are all on the prototype of this.
var __boot_base_class = function() {
  this.id = yield_hash();
};

__boot_base_class.prototype.hash = function() {
  return this.id;
};


__boot_base_class.prototype.define_class = function() {
  console.log("need to define class on:");
  console.log(this);
};

__boot_base_class.prototype.const_set = function(id, val) {
  
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;
    
  // console.log("going to set const on base: " + id);
  // console.log(base);
  // console.log("from..");
  // console.log(this);
  
  // need to check if object
  base.constants[id] = val;
  return val;
};

__boot_base_class.prototype.const_get = function(id) {
  
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;
    
  if (base.constants[id])
    return base.constants[id];
  
  console.log("const_get error in this:");
  console.log(this);
  
  throw "NameError: uninitialized constant: " + id;
};

//   const_get: function(id) {
//     // FIXME: check if base is class or instance
//     if (this.flags & T_OBJECT)
//       return this.isa.const_get(id);
//     
//     if (this.constants[id])
//       return this.constants[id];
//     
//     throw "NameError: uninitialized constant: " + id
//   },


var define_class = function(id, super_class) {
  
  var cls = function() {
    this.id = yield_hash();
  };
  
  cls.prototype = new super_class.allocator();
  
  cls.prototype.constructor = cls;
  cls.prototype.class_name = id;
  cls.prototype.super_class = super_class;
  cls.prototype.info = T_OBJECT;
  
  var meta = function() {
    this.id = yield_hash();
  }
  
  meta.prototype = new super_class.constructor();
  meta.prototype.allocator = cls;
  meta.prototype.class_name = id;
  meta.prototype.super_class = super_class.constructor;
  meta.prototype.info = T_CLASS;
  
  // constants
  meta.prototype.constants = new super_class.constants_alloc();
  meta.prototype.constants_alloc = function() {};
  meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  
  cls.prototype.isa = meta.prototype;

  return new meta();
};

var __boot_defclass = function(id, super_class) {
  
  var cls = function() {
    this.id = yield_hash();
  };
  
  if (super_class)
    cls.prototype = new super_class();
  else
    cls.prototype = new __boot_base_class();
  
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

console.log("new object:");
console.log(new class_object.allocator());

console.log("module class:");
console.log(class_module);

exports.top_self = new class_object.allocator();

// class_class.const_set("const_name", "const_something");
// console.log(class_class.constants['const_name']);
// 
// var class_string = define_class("String", class_object);
// class_object.const_set("String", class_string);
// console.log("string instance");
// console.log(new class_string.allocator().const_set("blah", "bleh"));
// 
// console.log("object");
// console.log(class_object);

var class_string = define_class("String", class_object);
class_object.const_set("String", class_string);
})(window, vienna);
// core/basic_object.rb
(function(){this.define_class(vnNil,"BasicObject",function(){this.add_method("new","$new",function(){},true);this.add_method("initialize","$initialize",function(){},false);this.add_method("==","$$e$e",function(_a){},false);this.add_method("equal?","$equal$q",function(_a){},false);this.add_method("!","$$b",function(){},false);return this.add_method("!=","$$b$e",function(_a){},false);},0);}).apply(vienna.top_self);
// core/string.rb
(function(){this.define_class(vnNil,"String",function(){this.add_method("initialize","$initialize",function(){this.__str__ = vm$a($,"string",[],nil,8);},false);this.add_method("==","$$e$e",function(_a){return this.__str__ === _a.__str__;},false);return this.add_method("upcase!","$upcase$b",function(){return this.__str__ = this.__str__.toUpperCase();},false);},0);console.log("===== Constant");console.log(this.const_get('String'));this.define_class(this.const_get('String'),"CKView",function(){},0);this.const_get('CKView').$new();}).apply(vienna.top_self);
