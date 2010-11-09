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
 
 
// lets just do this straight away, out of the way. Still need a way to log from
// IE, Opera etc etc etc
if (typeof console === 'undefined') {
  global.console = {} ;
  // console.info = console.warn = console.error = console.log = function(){};
}

// Core classes
// exports.c_object        = null;
var class_basic_object  = null,
    class_module        = null,
    class_class         = null,
    class_object        = null,
    module_kernel       = null,
    class_symbol        = null,
    class_boolean       = null,
    class_nil_class     = null,
    class_proc          = null,
    class_string        = null,
    class_array         = null,
    class_hash          = null,
    class_number        = null,
    class_regexp        = null,
    class_range         = null,
    class_exception     = null;

// top self
exports.top_self        = null;

// Core object literals (in main window scope)
global.opalnil          = null;
global.opalsym          = null;
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
    T_RANGE             = 1024, 
    T_ICLASS            = 2048,
    FL_SINGLETON        = 4096;


// create a ruby proc from javascript func



// hash from arguments vnH(key1, val1, key2, val2...)
global.vnH = function() {
  var k, v, res = new class_hash.allocator();
  res.__keys__ = [];
  res.__assocs__ = {};
  res.__default__ = opalnil;
  for (var i = 0; i < arguments.length; i++) {
    k = arguments[i], v = arguments[i+1];
    i++;
    res.__keys__.push(k);
    res.__assocs__[k.hash()] = v;
  }
  return res;
};

global.opalhash = vnH;

// Regexp
global.vnR = function(reg) {
  var res = new class_regexp.allocator();
  res.__reg__ = reg;
  return res;
};

var symbol_table = { };

// For object_id's .. each object/class will get an object_id
var hash_yield = 0;

var yield_hash = function() {
  return hash_yield++;
};

// globals table
var globals_table = {};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
   for (var i = 0; i< this.length; i++) {
     if (this[i] == obj) return i;
   }
   return -1;
 };
};

// EntryPoint. Every time something causes ruby to be run, it must be done
// through this function. This includes events, timers firing and the initial
// main() code. This will capture possible errors and log them and their stack
// trace to the terminal.
// 
// @param [Function] func to run as main entry point
// @return [Object] returns the result of the function
// 
exports.entry_point = function(func) {
  return func();
};

// Base of every object or class object in vienna. Every object, string, number,
// class, module, regexp, proc etc will be an instance of this, so const_set etc
// are all on the prototype of this. This keeps a lot from needing to go into
// global namespace, and keeps vienna export nice and clean.
// 
// Update/Renaming scheme
// ======================
// 
// We are now going to use the native String/Number/Array prototypes, so we need
// to make sure we avoid clashes. All ruby methods start with $, so all
// definitions/usage functions will end with $. No
// generated methods can end with $, so we avoid clashes. For example, the 
// methods/properties above become...
// 
// .t$ - true literal
// .f$ - false literal
// .n$ - nil literal
// 
// .r$ - ruby truthiness
// 
// .h$() - make hash from args
// .y$() - make symbol if not already exists
// 
// .a$() - and test, takes a function as single param to make test
// .o$() - or test, takes a function as single param to make test
// 
// .O$ - T_OBJECT
// .C$ - T_CLASS
// .M$ - T_MODULE
// .A$ - T_ARRAY
// 
// .dc$() - define class
// .dm$() - define method
// 
var __boot_base_class = function() {
  this.id = yield_hash();
};

__boot_base_class.prototype.hash = function() {
  return this.id;
};

// convert ruby id to jsid - for methods
__boot_base_class.prototype.mid2jsid = function(mid) {
  return ("$" + mid).replace(/=/g, '$e').replace(/\?/g, '$q');
};

// all objects have a reference back to opal
__boot_base_class.prototype.opal = exports;


__boot_base_class.prototype.dc = function(sup, id, body, flag) {
  
  var klass, base = this;
  
  if (base.flags & T_OBJECT)
    base = base.isa;
  
  switch (flag) {
    // normal class
    case 0:
      if (sup === opalnil)
        sup = class_object;
      
      klass = define_class_under(base, id, sup);
      break;
    case 1:
      // throw "running class shift for " + id.class_name
      klass = id.singleton_class();
      // return;
      break;
    case 2:
      klass = define_module_under(base, id);
      break;
    default:
      throw "define_class: unknown flag: " + flag
  }
  
  // console.log("executing " + id + " with " + klass);
  // console.log(klass);
  return body(klass);
  
  // return klass;
};

// get singleton class
__boot_base_class.prototype.singleton_class = function() {
  var klass;
  
  // if (this.info & )
  
  if (this.info & FL_SINGLETON) {
    klass = this.isa;
  }
  else {
    // if we a re a class or module..
    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
      // if we have an __attached__, use it
      if (this.__attached__) {
        return this.__attached__;
      }
      // otherwise, create it
      else {
        var meta = __subclass(this.class_name, this.isa);
        meta.info = meta.info | FL_SINGLETON;
        this.__attached__ = this.isa = meta;
        meta.__attached__ = this;
        return meta;
      }
    }
    else {
      // object
      // console.log("need to make singleton class for: " + this.class_name);
      
      this.info = this.info | FL_SINGLETON;
      var meta = __subclass(this.class_name, this.isa);
      meta.info = meta.info | T_ICLASS;
      var old_super = this.isa;
      klass = this.isa = meta;
      meta.__instance__ = this;
      meta.constants = old_super.constants;
      // klass = this.isa;
      // var class_name = this.isa.class_name;
      // klass = make_metaclass(this, this.isa);
    }
    
  }
  
  return klass;
};

__boot_base_class.prototype.dm = function(m_id, body, singleton) {
  // console.log(m_id + " for ");
  // console.log(this.class_name);
  
  // hack for replacing mid_to_jsid
  var js_id = '$' + m_id;
  
  body.method_id = m_id;
  body.jsid = js_id;
  body.displayName = m_id;
  // register self as the current class for body (for super calls)
  body.opal_class = this;
  
  if (singleton) {
    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
      this.constructor.prototype[js_id] = body;
      this.constructor.prototype.method_table[js_id] = body;
    }
    else {
      // add method to singleton_object
      this[js_id] = body;
      // throw "need to add_method to singleton object"
    }
  }
  else {
    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
      if (this.info & FL_SINGLETON) {
        // console.log("need to define method for singleton.. " + m_id);
        this.__attached__.constructor.prototype[js_id] = body;
        this.__attached__.constructor.prototype.method_table[js_id] = body;
      }
      else {
        this.allocator.prototype[js_id] = body;
        this.allocator.prototype.method_table[js_id] = body;
      }
      
      if (this.info & T_ICLASS) {
        this.__instance__[js_id] = body;
        console.log("adding method " + m_id + " which is " + js_id);
        // console.log(this.__instance__);
      }
    }
    else {
      // console.log("need to make into singleton object for: " + this.$inspect() + " with method " + m_id);
      var cls = this.singleton_class();
      cls.allocator.prototype[js_id] = body;
      cls.allocator.prototype.method_table[js_id] = body;
      // i_class singleton will only ever have one instance: this.
      // cls.__instance__ = this;
      body.opal_class = cls;
      // cls.dm(m_id, body, singleton);
      // add method to singleton object
      this[js_id] = body;
      // console.log(this);
      // throw "need to add_method to  object " + m_id
    }
  }
  return this.n;
};

__boot_base_class.prototype.cs = function(id, val) {
  
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;

  base.constants[id] = val;
  return val;
};

__boot_base_class.prototype.cd = function(id) {
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;
    
  if (base.constants[id])
    return true;
    
  return false;
};

__boot_base_class.prototype.cg = function(id) {
  
  var base = this;
  
  if (base.info & T_OBJECT)
    base = base.isa;
    
  if (base.constants[id])
    return base.constants[id];
    
  // need to go up through hierarchy
  var search = base.opal_parent, res;
  while (search) {
    res = search.const_get(id);
    if (res) {
      return res;
    }
    search = search.opal_parent;
  }
  // console.log("my parent is:");
  // console.log(base.opal_parent);
  // console.log(base.opal_parent.constants.Reporter);
  
  throw { toString: function() {
    return "NameError: uninitialized constant: " + id;
  }};
};

// access to globals
__boot_base_class.prototype.gg = function(id) {
  if (globals_table.hasOwnProperty(id)) {
    return globals_table[id];
  }
  return opalnil;
};

__boot_base_class.prototype.gs = function(id, val) {
  return globals_table[id] = val;
};

// ivar get
__boot_base_class.prototype.ig = function(id) {
  if (this.hasOwnProperty(id))
    return this[id];
  
  return opalnil;
};

// ivar set
__boot_base_class.prototype.is = function(id, val) {
  return this[id] = val;
};

__boot_base_class.prototype.include = function(module) {
  
  if (!this.included_modules)
    this.included_modules = [];
  
  if (this.included_modules.indexOf(module) != -1)
    return; // already included
  
  this.included_modules.push(module);
  module.included_in.push(this);
  
  // add each method from module into class's prototype
  for (method in module.allocator.prototype.method_table) {
    // if (!this.allocator.prototype.method_table[method])
    // if (!this.allocator.prototype.hasOwnProperty(method))
    this.allocator.prototype.method_table[method] = module.allocator.prototype.method_table[method];
    this.allocator.prototype[method] = module.allocator.prototype.method_table[method];
  }
  
  // console.log("checking include constants from " + module.class_name + " into " + this.class_name);
  for (var prop in module.constants) {
    if (module.constants.hasOwnProperty(prop) && !this.constants[prop]) {
      this.constants[prop] = module.constants[prop];
    }
  }
};

__boot_base_class.prototype.extend = function(module) {
  // add each method from module into class's prototype
  for (method in module.allocator.prototype.method_table) {
    // console.log("adding " +method);
    this.constructor.prototype.method_table[method] = module.allocator.prototype.method_table[method];
    this.constructor.prototype[method] = module.allocator.prototype.method_table[method];
  }
};

// method missing support - we recv the selector name, and we then create a 
// closure that acts as a temp method which in turn calls method_missing with the
// given arguments. sel is a string
__boot_base_class.prototype.m$ = function(sel) {
  var self = this;
  return function() {
    // [block, sel, args..]
    var args = [self, arguments[0], sel].concat(Array.prototype.slice.call(arguments, 1));
    // throw "method_missing: " + args.join(", ");
    return self.$method_missing.apply(self, args);
  };
};


// RTEST - true. false and nil override this
// __boot_base_class.prototype.r = true;

// ANDTEST
// __boot_base_class.prototype.a = function(lhs, rhs) {
  // if (lhs.r)
    // return rhs.apply(this);
  
  // return lhs;
// };

// ORTEST
// __boot_base_class.prototype.o = function(lhs, rhs) {
  // if (lhs.r)
    // return lhs;
  
  // return rhs.apply(this);
// };

// Handle yielding
// 
// @param {Function} proc to yield
// @param {Array} params to yield to proc
// 
__boot_base_class.prototype.rbYield = function(proc, params) {
  // if we tried to yield, and we were not given a block..
  if (!proc) {
    throw {
      toString: function() {
        return "Yield: no block given";
      }
    };
  }
  
  // otherwise, yield it in the 'self' context it was created in.
  return proc.apply(proc.__self__, params);
};

// Handle while loops.
// 
// @param {Function} expression wrapped in function to evaluate before each pass
// @param {Function} body wrapped in function to evaluate as eash pass
// @param {Boolean} should_redo - call the body once without reevaluating the
//        expression. This allows for 'redo' support. Default is false, we set
//        it to true ourselves by repplaying() the method.
// 
// Example
// 
//    while true
//      puts 10
//    end
// 
//    self.rbWhile(function() {
//      return self.t;
//    }), function() {
//      self.puts(10);
// };
// })
__boot_base_class.prototype.rbWhile = function(expression, body, should_redo) {
  try {
    // are we in a redo()? if so, apply body once first, then carry on
    if (should_redo) {
      body.apply(this);
    }
    
    while (expression.apply(this)) {
      body.apply(this);
    }
    // while_loop.apply(this);
    // default return nil if everything was ok
    return this.n;
  } catch (e) {
    // try and catch a break statement
    if (e.__keyword__ ==  'break') {
      return e.opal_value || this.n;
    }
    
    // testing next.. this might not work too well...
    if (e.__keyword__ == 'next') {
      return arguments.callee.apply(this, [expression, body]);
    }
    
    if (e.__keyword__ == 'redo') {
      return arguments.callee.apply(this, [expression, body, true]);
    }
    
    // anything else, rethrow
    throw e;
  };
};

// redo keyword - no args ever
__boot_base_class.prototype.rbRedo = function() {
  throw {
    toString: function() {
      return "uncaught redo";
    },
    __keyword__: 'redo'
  };
};

// break keyword (with possible args?)
__boot_base_class.prototype.rbBreak = function(value) {
  throw {
    toString: function() {
      return "uncaught break";
    },
    __keyword__: 'break',
    opal_value: value == undefined ? this.n : value
  };
};

// next keyword
__boot_base_class.prototype.rbNext = function(value) {
  throw {
    toString: function() {
      return "uncaught next";
    },
    __keyword__: 'next',
    opal_value: value || this.n
  };
};

// return keyword (only within a block) with args..
__boot_base_class.prototype.rbReturn = function(value) {
  throw  {
    toString: function() {
      return "uncaught rbReturn";
    },
    __keyword__: 'return',
    opal_value: value || this.n
  };
};

// ruby proc from function
// 
// A proc/block/llambda are simply javascript functions. Everytime a block is
// created in ruby, its current self, as in the self which the block should use
// for evaluating, is stored by the function onto the property .__self__, so 
// that whenever the block is call()'d or yield()'d, it is apply()'d using this
// self so that it evaluates in that given context. To evaluate the block in
// another context, with, for exampke, instance_eval, we just apply() with our
// own custom self. We never need to replace __self__, we just apply uysing a
// different context.
// 
// @param {Function} fun - the block implementation
__boot_base_class.prototype.P = function(fun) {
  fun.__self__ = this;
  fun.id = yield_hash();
  return fun;
  // var res = new class_proc.allocator();
  // res.__fun__ = fun;
  // return res;
};

// same as above, but lambda
__boot_base_class.prototype.L = function(fun) {
  fun.__self__ = this;
  fun.__lambda__ = true;
  fun.id = yield_hash();
  return fun;
};

// create a ruby symbol from javascript str. This checks the global sym table
// first to make sure we only create one symbol per name (id).
__boot_base_class.prototype.Y = opalsym = function(str) {
  if (symbol_table.hasOwnProperty(str))
    return symbol_table[str];
    
  var res = new class_symbol.allocator();
  res.__ptr__ = str;
  symbol_table[str] = res;
  return res;
};

// ruby range
__boot_base_class.prototype.R = function(start, end, exclusive) {
  var res = new class_range.allocator();
  res.__start__ = start;
  res.__end__ = end;
  res.__exclusive__ = exclusive;
  res.__real_end__ = exclusive ? end - 1 : end;
  return res; 
};

// calling super
// 
// @param {Function} func of current func calling super
// @param {Array} args to pass to super implementation
// @return {Object} return value from super call
// 
// CURRENTLY ONLY SUPPORTS INSTANCE CLASSES
// 
__boot_base_class.prototype.opal_super = function(func, args) {
  // get current imp's implementation
  var cur_class = func.opal_class;
  // for super, we just need the imp of the superclass's method. This will work
  // up the chain as opal_class is set to the class on which the method was
  // defines, so any method put in as a super class to this will have our super
  // method.
  var sup_class = cur_class.super_class;
  
  if (!sup_class) {
    throw "NativeError: no super class found from " + cur_class
  }
  
  var sup_func = sup_class.allocator.prototype[func.jsid];
  
  if (!sup_func) {
    throw "NativeError: no superclass method found for " + func.method_id;
  }
  
  // console.log("ok, going to call it");
  // console.log(sup_func);
  // console.log(args);
  // if all ok, call it
  var res = sup_func.apply(this, args);
  // console.log("res is:");
  // console.log(res);
  return res;
};

// ruby error from native error
__boot_base_class.prototype.rbNativeError = function(err) {
  var res = class_exception.$new();
  res.is('@message', err.toString());
  return res;
};

__boot_base_class.prototype.TN = T_NUMBER;
__boot_base_class.prototype.TS = T_STRING;
__boot_base_class.prototype.TP = T_PROC;
__boot_base_class.prototype.TA = T_ARRAY;
__boot_base_class.prototype.TH = T_HASH;

var define_class_under = function(base, id, super_class) {
  
  if (base.cd(id))
    return base.cg(id);
  
  if (!super_class)
    super_class = class_object;
  
  var res = __subclass(id, super_class);
  // parent relationship
  res.constructor.prototype.opal_parent = base;
  base.cs(id, res);
  return res;
};

// Define a toll-free bridged ruby class. This is used for mixing native JS
// strings, arrays etc with ruby versions.
// 
// Usage
// =====
// 
//    class_string = define_bridged_class("String", String);
// 
// This uses the String constructor. For now, every toll free will inherit from
// object, and will be set as a constant in the Object:: namespace
// 
var define_bridged_class = function(id, native_class) {
  var res = __subclass(id, class_object);
  
  var old_allocator = res.allocator.prototype;
  res.allocator = native_class;
  
  for (var prop in old_allocator) {
    native_class.prototype[prop] = old_allocator[prop];
  }
  
  class_object.cs(id, res);
  return res;
};

var __subclass = exports.__subclass = function(id, super_class) {
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
  meta.prototype.super_class = super_class;
  meta.prototype.info = T_CLASS;
  meta.prototype.constructor = meta;
  
  // constants
  meta.prototype.constants = new super_class.constants_alloc();
  meta.prototype.constants_alloc = function() {};
  meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  
  var res = new meta();
  cls.prototype.isa = res;
  return res;
}

var define_module_under = function(base, id) {
  
  if (base.cd(id))
    return base.cg(id);
    
  var mod = define_class_under(base, id, class_module);
  mod.included_in = [];
  mod.info = T_MODULE;
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
  
  meta.prototype.included_in = [];
  meta.prototype.method_table = {};
  meta.prototype.allocator = klass;
  meta.prototype.constructor = meta;
  meta.prototype.class_name = klass.prototype.class_name;
  meta.prototype.super_class = super_class;
  meta.prototype.info = T_CLASS;
  
  // constants etc
  if (klass === boot_basic_object) {
    meta.prototype.constants_alloc = function() {};
    meta.prototype.constants = meta.prototype.constants_alloc.prototype;
  } else {
    meta.prototype.constants = new super_class.prototype.constants_alloc();
    meta.prototype.constants_alloc = function() {};
    meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  }
  
  var res = new meta();
  klass.prototype.isa = res;
  return res;
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

class_basic_object = __boot_makemeta(boot_basic_object, boot_class);
class_object = __boot_makemeta(boot_object, class_basic_object.constructor);
class_module = __boot_makemeta(boot_module, class_object.constructor);
class_class = __boot_makemeta(boot_class, class_module.constructor);

__boot_defmetameta(class_basic_object, class_class);
__boot_defmetameta(class_object, class_class);
__boot_defmetameta(class_module, class_class);
__boot_defmetameta(class_class, class_class);

class_object.cs("BasicObject", class_basic_object);
class_object.cs("Object", class_object);
class_object.cs("Class", class_class);
class_object.cs("Module", class_module);

// Custom methods for modules to handle includes properly
class_module.constructor.prototype.dm = function(m_id, body, sing){
    
  js_id = '$' + m_id;  
  
  // super
  __boot_base_class.prototype.dm.apply(this, arguments);
    
  // go through each class we are included in and add new method to that as well
  for (var i = 0; i < this.included_in.length; i++) {
    this.included_in[i].allocator.prototype[js_id] = body;
  }
};

// and then fix again for class
class_class.constructor.prototype.dm = class_object.constructor.prototype.dm;


exports.Object = class_object;
opal_top_self = exports.top_self = new class_object.allocator();

// Override Object.include so that we can also include each module into our
// Natives String, Array, Number etc.
class_object.include = function(module) {
  // super
  var res = __boot_base_class.prototype.include.apply(class_object, [module]);
    
  var natives = [class_string, class_number, class_array, class_regexp, class_boolean];
  
  // return res;
  for (var i = 0; i < natives.length; i++) {
    natives[i].include(module);
  }
  
  return res;
};

// When we define a method on object itself, we need to also set it on our 
// natives.
class_object.dm = function() {
  // super
  var res = __boot_base_class.prototype.dm.apply(class_object, arguments);
  
  var natives = [class_string, class_number, class_array, class_regexp, class_boolean];
  
  // return res;
  for (var i = 0; i < natives.length; i++) {
    natives[i].dm.apply(natives[i], arguments);
  }
  
  return res;
};

// Proc class
// class_proc = define_class_under(class_object, "Proc", class_object);
// class_proc.allocator.prototype.info = T_OBJECT | T_PROC;

class_proc = define_bridged_class("Proc", Function);
class_proc.allocator.prototype.info = T_OBJECT | T_PROC;
// Fix for Object's super_class being a proc and causing inifite recusrion in
// super class chain Object->Proc->Object...etc
class_object.allocator.prototype.super_class = undefined;
class_object.super_class = undefined;


// Range class
class_range = define_class_under(class_object, "Range", class_object);
class_range.allocator.prototype.info = T_OBJECT | T_RANGE;

// Nil class
class_nil_class = define_class_under(class_object, "NilClass", class_object);
opalnil = new class_nil_class.allocator();
opalnil.info = opalnil.info | FL_SINGLETON;
__boot_base_class.prototype.nil = opalnil;

opalnil.r = false;

// __boot_base_class.prototype.nil = opalnil;

// Hash
class_hash = define_class_under(class_object, "Hash", class_object);
class_hash.allocator.prototype.info = T_OBJECT | T_HASH;

class_hash.allocator.prototype.hash_store = function(key, value) {
  var hash = key.hash();
  // if we dont have the hashed key, add it
  if (!this.__assocs__.hasOwnProperty(hash)) {
    this.__keys__.push(key);
  }
  // then in both cases reset the assoc
  return this.__assocs__[hash] = value;
};

class_hash.allocator.prototype.hash_delete = function(key) {
  var hash = key.hash();
  
  if (this.__assocs__[hash]) {
    var ret = this.__assocs__[hash];
    delete this.__assocs__[hash];
    this.__keys__.splice(this.__keys__.indexOf(key), 1);
    return ret;
  }
  
  return this.__default__;
};

class_hash.allocator.prototype.hash_fetch = function(key) {
  var hash = key.hash();
  
  if (this.__assocs__.hasOwnProperty(hash))
    return this.__assocs__[hash];
  
  // default return nil (should be overrideable)
  return this.__default__;
};

// Symbol class
class_symbol = define_class_under(class_object, "Symbol", class_object);

class_symbol.allocator.prototype.toString = function() {
  return ":" + this.__ptr__;
};

// Regexp
class_regexp = define_class_under(class_object, "Regexp", class_object);


// Exceptions
class_exception = define_class_under(class_object, "Exception", class_object);

class_exception.allocator.prototype.toString = function() {
  var message = this.ig('@message');
  if (message && message.r)
    return this.class_name + ": " + this.ig('@message').toString();
  
  return this.class_name;
};

class_exception.allocator.prototype.raise = function() {
  // console.log(this);
  throw this;
};

// Special Classes: We do these three (Array, String, Number) last so that we
// have all our special runtime methods setup so we can add them to 
// Array.prototype, String.prototype and Number.prototype. Note: we could also
// do RegExp....?

// Number class
class_number = define_bridged_class("Number", Number);
class_number.allocator.prototype.info = T_OBJECT | T_NUMBER;
 
class_number.allocator.prototype.hash = function() {
  return '$$num$$' + this;
};


// String class
class_string = define_bridged_class("String", String);
class_string.allocator.prototype.info = T_OBJECT | T_STRING;

class_string.allocator.prototype.hash = function() {
  return this;
};

// Boolean class
class_boolean = define_bridged_class("Boolean", Boolean);
class_boolean.allocator.prototype.info = T_OBJECT | T_BOOLEAN;


// Array class
class_array = define_bridged_class("Array", Array);
class_array.allocator.prototype.info = T_OBJECT | T_ARRAY;

// Regexp class
class_regexp = define_bridged_class("Regexp", RegExp);
class_regexp.allocator.prototype.info = T_OBJECT;


// Kernel module
module_kernel = define_module_under(class_object, "Kernel");
class_object.include(module_kernel);



// argh, another fix needed:
class_proc.allocator.prototype.nil = opalnil;
