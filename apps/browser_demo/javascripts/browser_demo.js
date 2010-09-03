var opal = {};
(function(global, exports) {
// =======================
// = Opal loading system =
// =======================

// "Opals" are similar to gems in vanilla ruby. An opal is like a framework of
// code and other resources.

// Register an opal with the given specification, which is a json literal with
// name, description, dependencies etc.
// 
// Example
// =======
// 
// opal.register({
//  name: "browser",
//  version: "0.1.0",
//  files: {
//    "bin/browser", function() { ... bin imp ... },
//    "lib/browser.rb": function() { ... browser.rb imp ... },
//    "lib/browser/element.rb": function() { ... element.rb imp ... }
//  }
// });
// 
// Notes
// =====
// 
// We then add the lib/ path in browser to our load path, so require('browser')
// will load lib/browser.rb, and require('browser/element') will load
// lib/browser/element.rb
// 
// All opals are stores with their name as a prefix, so lib/browser.rb as above
// will actually have a full path url of "/browser/lib/browser.rb"
// 
// Applications are initialized by calling their "bin" file, which by default is
// named identically to their opal name, so to start our "sample_controls"
// application, we initialize "/sample_controls/bin/sample_controls" which will
// probably require "/sample_controls/lib/sample_controls.rb" which will itself
// load cherry_kit etc etc. the main bin file most often than not will simply
// call something like CKApplication.start()
// 
// Resources like css could be added here, as well as auto loading for them, so
// when the main lib file is loaded, then they are automatically required.. 
// might work.
// 
// require('browser') will first search all opals, so we can carry out potential
// autoloading of css etc
// 
exports.register = function(specification) {
  // console.log("registering new opal: " + specification.name);
  opal_list[specification.name] = specification;
  
  load_paths.push(specification.name + "/lib/");
  
  for (var file_name in specification.files) {
    file_list[specification.name + "/" + file_name] = specification.files[file_name];
  }
};

// same as above but register this as the default application sequence. will
// look in this opal for a bin file with same name to be used for running
// exports.register_application = function(specification) {
//   exports.register(specification);
//   bin_file = '/' + specification.name + '/bin/' + specification.name;
// };

// array of loadpaths used in "require" .. each opal listed etc
// by default has root of filesystem, but each added opal also adds its libpath
var load_paths = [""];

// to load on window.load
var bin_file = null;

// cwd for application
var opal_cwd = null;

// list of all opals: name to specification json object
var opal_list = {};

// dictionary of all files:
// 
// /path/to_file.1: function() { ... imp ... },
// /path/to_file.2: function() { ... imp ... }
// 
// If a file has been included, then its function will be marked with an 
// property ".opal_required" and set to true
var file_list = exports.files = {};

// =======================================================
// = Temp launching - should be done via window.onload.. =
// =======================================================
// Run is our main file to run. usually app path, sometimes spec path etc
// 
// @param [String] path - the main executable file
// @param [String] path - the working directory
exports.run = function(path, cwd) {
  bin_file = path;
  exports.getwd = opal_cwd = cwd;
  
  if (!bin_file)
    throw "Opal: no bin file defined."
    
  var bin_path = bin_file + "/bin/" + bin_file + ".rb";
  
  if (exports.files[bin_path])
    exports.require(bin_path);
  else {
    bin_path = bin_file + "/lib/" + bin_file + ".rb";
    exports.require(bin_path);
  }
};

// require the file at the given path: we have already checked it exists - mark
// as being required - execute in context of top_self
// 
// params function(__FILE__) { .. }
var file_require_path = function(path) {
  // console.log("requiring " + path);
  var f = file_list[path];
  f.opal_required = true;
  return f.apply(exports.top_self, [path]);
};

// require the js string path.. might come from ruby, might come from js
exports.require = function(orig_path) {
  // console.log("native require: " + orig_path);
  // console.log(load_paths);
  var path = orig_path;
  // basically loop through each of the load paths looking for a match
  if ((path.substr(path.length - 3) != '.rb') && (path.substr(path.length -3) != '.js')) {
    // console.log("need to add .rb");
    path += '.rb'
  }
  
  for (var i = 0; i < load_paths.length; i++) {
    var try_path = load_paths[i] + path;
    // console.log("does exist? " + try_path);
    if (file_list.hasOwnProperty(try_path)) {
      if (file_list[try_path].opal_required) {
        // console.log("already required " + path);
        return;
      }
      // console.log("shit son!!!!");
      // console.log(file_list[try_path]);
      return file_require_path(try_path);
    }
  }
  
  throw "could not find require: " + orig_path;
};

// =========================
// = Browser bits and bobs =
// =========================

var browser = exports.browser = (function() {
  var agent = navigator.userAgent.toLowerCase();
  var version = 1;
  var browser = {
    version: 0,
    safari: (/webkit/).test(agent) ? version : 0,
    opera: (/opera/).test(agent) ? version : 0,
    msie: (/msie/).test(agent) && !(/opera/).test(agent) ? version : 0
  };
  
  return browser;
})();

// set callback for when opal/document is ready to go!
exports.setDocumentReadyListener = function(callback) {
  // run it in the context of top self
  var on_ready = function() {
    callback.apply(opal.top_self);
  };
  // attach ready function
  (function(){
    // w3c - firefox, safari, opera
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", on_ready, false);
    }
    // internet explorer
    if (exports.browser.msie) {
      (function() {
        try {
          document.documentElement.doScroll('left');
        }
        catch (e) {
          setTimeout(arguments.callee, 0);
          return;
        }
        on_ready();
      })();
    }

  })();
};

// ================
// = On ready etc =
// ================
// var on_ready = function() {
  // console.log("===== on_ready");

// };


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
  window.console = {} ;
  console.info = console.warn = console.error = console.log = function(){};
}

// Core classes
// exports.c_object        = null;
var class_basic_object  = null,
    class_module        = null,
    class_class         = null,
    class_object        = null,
    module_kernel       = null,
    class_symbol        = null,
    class_true_class    = null,
    class_false_class   = null,
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
    T_RANGE             = 1024, 
    T_ICLASS            = 2048,
    FL_SINGLETON        = 4096;


// create a ruby proc from javascript func



// hash from arguments vnH(key1, val1, key2, val2...)
global.vnH = function() {
  var k, v, res = new class_hash.allocator();
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

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
   for (var i = 0; i< this.length; i++) {
     if (this[i] == obj) return i;
   }
   return -1;
 };
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
  
  return body.apply(klass);
  
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

// ivar get
__boot_base_class.prototype.ig = function(id) {
  if (this.hasOwnProperty(id))
    return this[id];
  
  return vnNil;
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
    this.constructor.prototype[method] = module.allocator.prototype.method_table[method];
  }
};

// RTEST - true. false and nil override this
__boot_base_class.prototype.r = true;

// ANDTEST
__boot_base_class.prototype.a = function(lhs, rhs) {
  if (lhs.r)
    return rhs.apply(this);
  
  return lhs;
};

// ORTEST
__boot_base_class.prototype.o = function(lhs, rhs) {
  if (lhs.r)
    return lhs;
  
  return rhs.apply(this);
};

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
  return fun;
  // var res = new class_proc.allocator();
  // res.__fun__ = fun;
  // return res;
};

// same as above, but lambda
__boot_base_class.prototype.L = function(fun) {
  fun.__self__ = this;
  fun.__lambda__ = true;
  return fun;
};

// create a ruby symbol from javascript str. This checks the global sym table
// first to make sure we only create one symbol per name (id).
__boot_base_class.prototype.Y = function(str) {
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

__boot_base_class.prototype.TP = T_PROC;
__boot_base_class.prototype.TA = T_ARRAY;
__boot_base_class.prototype.TH = T_HASH;

var define_class_under = function(base, id, super_class) {
  
  if (base.const_defined(id))
    return base.const_get(id);
  
  if (!super_class)
    super_class = class_object;
  
  var res = __subclass(id, super_class);
  // parent relationship
  res.constructor.prototype.opal_parent = base;
  base.const_set(id, res);
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
  
  class_object.const_set(id, res);
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
  
  if (base.const_defined(id))
    return base.const_get(id);
    
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

class_object.const_set("BasicObject", class_basic_object);
class_object.const_set("Object", class_object);
class_object.const_set("Class", class_class);
class_object.const_set("Module", class_module);

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
exports.top_self = new class_object.allocator();

// Override Object.include so that we can also include each module into our
// Natives String, Array, Number etc.
class_object.include = function(module) {
  // super
  var res = __boot_base_class.prototype.include.apply(class_object, [module]);
    
  var natives = [class_string, class_number, class_array, class_regexp];
  
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
  
  var natives = [class_string, class_number, class_array, class_regexp];
  
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

// True class
class_true_class = define_class_under(class_object, "TrueClass", class_object);
vnTrue = new class_true_class.allocator();
vnTrue.info = vnTrue.info | FL_SINGLETON;
__boot_base_class.prototype.t = vnTrue;

// False class
class_false_class = define_class_under(class_object, "FalseClass",class_object);
vnFalse = new class_false_class.allocator();
vnFalse.info = vnFalse.info | FL_SINGLETON;
__boot_base_class.prototype.f = vnFalse;

vnFalse.r = false;

// Nil class
class_nil_class = define_class_under(class_object, "NilClass", class_object);
vnNil = new class_nil_class.allocator();
vnNil.info = vnNil.info | FL_SINGLETON;
__boot_base_class.prototype.n = vnNil;

vnNil.r = false;

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
  
  return this.n;
};

class_hash.allocator.prototype.hash_fetch = function(key) {
  var hash = key.hash();
  
  if (this.__assocs__.hasOwnProperty(hash))
    return this.__assocs__[hash];
  
  // default return nil (should be overrideable)
  return this.n;
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
class_string.allocator.prototype.info = T_OBJECT | T_NUMBER;

class_string.allocator.prototype.hash = function() {
  return this;
};


// Array class
class_array = define_bridged_class("Array", Array);
class_array.allocator.prototype.info = T_OBJECT | T_ARRAY;

// Regexp class
class_regexp = define_bridged_class("Regexp", RegExp);
class_regexp.allocator.prototype.info = T_OBJECT;


// Kernel module
module_kernel = define_module_under(class_object, "Kernel");
class_object.include(module_kernel);
})(this.window || global, opal);
// ##################### lib/kernel.rb #####################
(function(__FILE__){this.define_class(this.n,'Kernel',function(){this.dm("!=",function(other){return this['$=='](other).r ? this.f : this.t;},false);
this.dm("loop",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}try {
      while (true) {
        __block__.apply(__block__.__self__, []);
      }
    } catch (e) {
      // capture break statements
      if (e.__keyword__ == 'break') {
        return e.opal_value;
      }
      
      // rethrow everything else
      throw e;
    }},false);
this.dm("is_a?",function(klass){var search = this.isa;
    
    while (search) {
      if (search == klass)
        return this.t;
      
      search = search.super_class;
    }
    
    return this.f;},false);
this.dm("nil?",function(){return this.f;
},false);
this.dm("respond_to?",function(method){var method_id = method.$to_s().toString();
    method_id = this.mid2jsid(method_id);
    if (this[method_id]) {
      return this.t;
    }return this.f;
},false);
this.dm("===",function(other){return this['$=='](other);
},false);
this.dm("instance_variable_defined?",function(variable_name){return (this[variable_name.$to_s().toString()]) ? this.t : this.f;},false);
this.dm("instance_variable_get",function(variable_name){return this.ig(variable_name.$to_s().toString());},false);
this.dm("instance_variable_set",function(variable_name,value){this.is(variable_name.$to_s().toString(), value);return value;
},false);
this.dm("__send__",function(method,args){method=arguments[0];args=Array.prototype.slice.call(arguments,1);var res= this['$' + method.$to_s()].apply(this, args);
    return res;},false);
this.dm("class",function(){return this.isa;},false);
this.dm("superclass",function(){return this.super_class;},false);
this.dm("require",function(require_path){opal.require(require_path);return require_path;
},false);
this.dm("proc",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}if(((!__block__ || !__block__.r) ? this.f : this.t).r){return __block__;
}else{return this.$raise("ArgumentError: tried to create Proc object without a block");
}},false);
this.dm("puts",function(str){console.log(str.$inspect().toString());return this.n;
},false);
this.dm("to_s",function(){return "#<" + this.class_name + ":" + this.id + ">";},false);
this.dm("inspect",function(){return this.$to_s();
},false);
this.dm("object_id",function(){return this.id;},false);
this.dm("raise",function(exception,string){var msg = this.n,exc = this.n;msg=this.n;
if(exception['$is_a?'](this.const_get('String')).r){msg=exception;
exc=this.const_get('RuntimeError').$new(msg);
}else if(exception['$is_a?'](this.const_get('Exception')).r){exc=exception;
}else{if (string) { msg=string }exc=exception.$new(msg);
}exc.raise();},false);
this.dm("instance_eval",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}if(((!__block__ || !__block__.r) ? this.f : this.t).r){__block__.apply(this);}else{return this.n;}},false);
return this.dm("const_set",function(const_name,const_value){return this.const_set(const_name, const_value);},false);
},2);
}).apply(opal.top_self);
// ##################### lib/module.rb #####################
(function(__FILE__){this.define_class(this.n,"Module",function(){this.dm("===",function(object){return object['$is_a?'](this);
},false);
this.dm("undef_method",function(symbol){return this.$puts(["need to undefine method: ",symbol.$to_s()].join(''));
},false);
this.dm("define_method",function(method){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;var mid = method.$to_s();
    this.dm(mid, __block__, false);return this;
},false);
this.dm("attr_accessor",function(attributes){attributes=Array.prototype.slice.call(arguments);this.$attr_reader.apply(this, attributes);this.$attr_writer.apply(this, attributes);return this;
},false);
this.dm("to_s",function(){return this.class_name;},false);
this.dm("attr_reader",function(attributes){attributes=Array.prototype.slice.call(arguments);attributes.$each(this.P(function(attribute){var mid = attribute.$to_s();
      this.dm(mid, function() {
        return this.ig('@' + mid);
      }, false);}));
return this;
},false);
this.dm("attr_writer",function(attributes){attributes=Array.prototype.slice.call(arguments);attributes.$each(this.P(function(attribute){var mid = attribute.$to_s();
      var mid2 = mid + "=";
      this.dm(mid2, function(val) {
        return this.is('@' + mid, val);
      }, false);}));
return this;
},false);
this.dm("const_set",function(id,value){return this.const_set(id, value);},false);
return this.dm("module_eval",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}if(((!__block__ || !__block__.r) ? this.f : this.t).r){__block__.apply(this);}else{return this.n;}},false);
},0);
}).apply(opal.top_self);
// ##################### lib/array.rb #####################
(function(__FILE__){this.define_class(this.n,"Array",function(){this.dm("each",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}for (var i = 0; i < this.length; i++) {
      try {
        __block__.apply(__block__.__self__, [this[i]]);
      } catch (e) {
        if (e.__keyword__ == 'redo') {
          i--;
        }
        else if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        else {
          throw e;
        }
      }
    }return this;
},false);
this.dm("each_with_index",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}for (var i = 0; i < this.length; i++) {
      __block__.__fun__(this[i], i);
    }return this;
},false);
this.dm("map",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}var result = this.n;result=[];
for (var i = 0; i < this.length; i++) {
      try {
        result.push(__block__.apply(__block__.__self__, [this[i]]));
      } catch (e) {
        if (e.__keyword__ == 'break') {
          return e.opal_value;
        }
        
        throw e;
      }
    }return result;
},false);
this.dm("join",function(separator){return this.join(separator);},false);
this.dm("<<",function(obj){this.push(obj);return this;
},false);
this.dm("first",function(count){if (count == undefined) {  count = this.n;}if(count.r){return this.slice(0, count);}else{if (this.length == 0) {
        return this.n;
      }
      return this[0];}},false);
this.dm("length",function(){return this.length;},false);
this.dm("size",function(){return this.length;},false);
this.dm("inspect",function(){var description = this.n;description=["["];
this.$each(this.P(function(item){return description['$<<'](item.$inspect());
}));
description['$<<']("]");
return description.$join("");
},false);
this.dm("==",function(other){if (this === other) return this.t;
    if (!(other.info & this.TA)) return this.f;
    if (this.length !== other.length) return this.f;
    for (var i = 0; i < this.length; i++) {
      if (!this[i]['$=='](other[i]).r) return this.f;
    }return this.t;
},false);
this.dm("[]",function(index){return this[index];},false);
this.dm("[]=",function(index,value){return this[index] = value;},false);
this.dm("index",function(object){return this.indexOf(object);},false);
this.dm("include?",function(member){return this.indexOf(member) == -1 ? this.f : this.t;},false);
this.dm("delete",function(object){var index = this.indexOf(object);
    if (index !== -1) {
      this.splice(index, 1);
    }return this;
},false);
this.dm("pop",function(){if (this.length) {
      return this.pop();
    }
    return this.n;},false);
this.dm("+",function(other){for (var i = 0; i < other.length; i++) {
      this.push(other[i]);
    }return this;
},false);
return this.dm("unshift",function(object){return this.unshift(object);},false);
},0);
}).apply(opal.top_self);
// ##################### lib/basic_object.rb #####################
(function(__FILE__){this.define_class(this.n,"BasicObject",function(){this.dm("initialize",function(){return this.n;},false);
this.dm("==",function(obj){return this === obj ? this.t : this.f;},false);
this.dm("equal?",function(other){return this.n;},false);
this.dm("!",function(){return this.f;
},false);
return this.dm("!=",function(other){return this['$=='](other).r ? this.f : this.t;},false);
},0);
}).apply(opal.top_self);
// ##################### lib/class.rb #####################
(function(__FILE__){this.define_class(this.n,"Class",function(){this.dm("include",function(mod){return this.include(mod);},false);
this.dm("extend",function(mod){return this.extend(mod);},false);
this.dm("allocate",function(){return new this.allocator();},false);
this.dm("new",function(super_class){return opal.__subclass("", super_class);},true);
this.dm("new",function(){var obj = this.n;obj=this.$allocate();
obj.$initialize.apply(obj, arguments);return obj;
},false);
return this.dm("initialize",function(){return this.$puts("in Class.new initialize");
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/dir.rb #####################
(function(__FILE__){this.define_class(this.n,"Dir",function(){this.dm("getwd",function(){return opal.getwd;},true);
return this.dm("glob",function(glob){var working = glob.replace(/\*\*\//g, '.*').replace(/\*\*/g, '.*').replace(/\//g, '\\/');
    var result = [];
    var reg = new RegExp('^' + working + '$');
    for (var prop in opal.files) {
      if (reg.exec(prop)) {
        result.push(prop);
      }
    }
    return result;},true);
},0);
}).apply(opal.top_self);
// ##################### lib/error.rb #####################
(function(__FILE__){this.define_class(this.n,"Exception",function(){this.dm("message",function(){return this.ig('@message');
},false);
return this.dm("initialize",function(message){if (!message) {
      message = this.n;
    }return this.is("@message",message);
},false);
},0);
this.define_class(this.const_get('Exception'),"RuntimeError",function(){},0);
this.define_class(this.const_get('Exception'),"StandardError",function(){},0);
}).apply(opal.top_self);
// ##################### lib/false_class.rb #####################
(function(__FILE__){this.define_class(this.n,"FalseClass",function(){this.dm("inspect",function(){return "false";
},false);
this.dm("to_s",function(){return "false";
},false);
this.dm("!",function(){return this.t;
},false);
this.dm("&",function(other){return this.f;
},false);
this.dm("|",function(other){return (other).r ? this.t : this.f;
},false);
return this.dm("^",function(other){return (other).r ? this.t : this.f;
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/file.rb #####################
(function(__FILE__){this.define_class(this.n,"File",function(){return this.dm("join",function(parts){parts=Array.prototype.slice.call(arguments);return parts.$join("/");
},true);
},0);
}).apply(opal.top_self);
// ##################### lib/hash.rb #####################
(function(__FILE__){this.define_class(this.n,"Hash",function(){this.dm("[]=",function(key,value){return this.hash_store(key, value);},false);
this.dm("delete",function(key){return this.hash_delete(key);},false);
this.dm("keys",function(){return this.__keys__;},false);
this.dm("values",function(){var result = [];
    for (var i = 0; i < this.__keys__.length; i++) {
      result.push(this.__assocs__[this.__keys__[i].hash()]);
    }
    return result;},false);
this.dm("[]",function(key){return this.hash_fetch(key);},false);
this.dm("each",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}var key, value;
    for (var i = 0; i < this.__keys__.length; i++) {
      key = this.__keys__[i];
      value = this.__assocs__[key.hash()];
      __block__.apply(__block__.__self__, [key, value]);
    }return this;
},false);
this.dm("size",function(){return this.__keys__.length;},false);
return this.dm("==",function(other){if (this === other) return this.t;
    if (!(other.info & this.TH)) return this.f
    if (this.__keys__.length !== other.__keys__.length) return this.f;
    for (var i = 0; i < this.__keys__.length; i++) {
      var key = this.__keys__[i].hash();
      if (!(this.__assocs__[key]['$=='](other.__assocs__[key]).r)) return this.f;
    }return this.t;
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/io.rb #####################
(function(__FILE__){this.define_class(this.n,"IO",function(){return this.dm("puts",function(objects){objects=Array.prototype.slice.call(arguments);if(objects.$length()['$=='](0).r){}else{objects.$each(this.P(function(object){}));
}return this.n;
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/match_data.rb #####################
(function(__FILE__){this.define_class(this.n,"MatchData",function(){this.dm("initialize",function(data){return this.is("@data",data);
},false);
return this.dm("inspect",function(){return ["#<MatchData '",this.ig('@data')['$[]'](0).$to_s(),"'>"].join('');
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/nil_class.rb #####################
(function(__FILE__){this.define_class(this.n,"NilClass",function(){this.dm("nil?",function(){return this.t;
},false);
this.dm("!",function(){return this.t;
},false);
this.dm("to_i",function(){return 0;
},false);
this.dm("to_f",function(){return 0.0;
},false);
this.dm("to_s",function(){return "";
},false);
this.dm("to_a",function(){return [];
},false);
this.dm("inspect",function(){return "nil";
},false);
this.dm("&",function(other){return this.f;
},false);
this.dm("|",function(other){return (other).r ? this.t : this.f;
},false);
return this.dm("^",function(other){return (other).r ? this.t : this.f;
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/number.rb #####################
(function(__FILE__){this.define_class(this.n,"Number",function(){this.dm("inspect",function(){return this.toString();},false);
this.dm("==",function(other){return (this == other) ? this.t : this.f;},false);
this.dm("to_s",function(){return this.toString();},false);
this.dm("+",function(other){return this + other;},false);
this.dm("-",function(other){return this - other;},false);
this.dm("-@",function(){return -this;},false);
this.dm("/",function(other){return this / other;},false);
this.dm("*",function(other){return this * other;},false);
this.dm("upto",function(finish){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;for (var i = this; i <= finish; i++) {
      __block__.apply(__block__.__self__, [i]);
    }return this;
},false);
this.dm("times",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}for (var i = 0; i < this; i++) {
       __block__.apply(__block__.__self__, [i]);
    }return this;
},false);
this.dm("to_i",function(){return parseInt(this);},false);
this.dm(">",function(other){return this > other ? this.t : this.f;},false);
this.dm("<",function(other){return this < other ? this.t : this.f;},false);
this.dm(">=",function(other){return this >= other ? this.t : this.f;},false);
return this.dm("<=",function(other){return this <= other ? this.t : this.f;},false);
},0);
}).apply(opal.top_self);
// ##################### lib/proc.rb #####################
(function(__FILE__){this.define_class(this.n,"Proc",function(){this.dm("to_proc",function(){return this;
},false);
return this.dm("call",function(){if (this.__lambda__) {
      try {
        return this.apply(this.__self__, []);
      }
      catch (e) {
        // first try and catch a break (from the lambda proc)
        if (e.__keyword__ == 'break') {
          //console.log("break!");
          return e.opal_value;
        }
        
        // look for next statements
        if (e.__keyword__ == 'next') {
          return e.opal_value;
        }
        
        // next try and catch return error statement (simply return it)
        if (e.__keyword__ == 'return') {
          return e.opal_value;
        }
        
        // redo - simply recall block?
        if (e.__keyword__ == 'redo') {
          return arguments.callee.apply(this);
        }
        
        // worst case, rethrow error
        throw e;
      }
    }
    else {
      //throw "cannot .call for non lambda block.. yet"
      return this.apply(this.__self__);
    }},false);
},0);
}).apply(opal.top_self);
// ##################### lib/range.rb #####################
(function(__FILE__){this.define_class(this.n,"Range",function(){this.dm("new",function(start,ending,exclusive){if (!exclusive) {
      exclusive = this.f;
    }return this.R(start, ending, exclusive.r);},true);
this.dm("length",function(){return this.__end__ - this.__start__;},false);
this.dm("begin",function(){return this.__start__;},false);
this.dm("end",function(){return this.__end__;},false);
this.dm("===",function(val){return this['$include?'](val);
},false);
this.dm("cover?",function(val){return this['$include?'](val);
},false);
this.dm("include?",function(val){return (this.__start__ <= val && val <= this.__real_end__) ? this.t : this.f;},false);
return this.dm("exclude_end?",function(){return this.__exclusive__ ? this.t : this.f;},false);
},0);
}).apply(opal.top_self);
// ##################### lib/regexp.rb #####################
(function(__FILE__){this.define_class(this.n,"Regexp",function(){this.dm("match",function(string){var m = this.n;m=this.n;
if (m = this.exec(string)) {
      return this.const_get('MatchData').$new(m);
    } else {
      return this.n;
    }},false);
return this.dm("===",function(string){return this.$match(string);
},false);
},0);
}).apply(opal.top_self);
// ##################### lib/string.rb #####################
(function(__FILE__){this.define_class(this.n,"String",function(){this.dm("index",function(string){var res = this.indexOf(string);
    if (res != -1) {
      return res;
    }
    return this.n;},false);
this.dm("include?",function(str){var res = this.indexOf(str);
    if (res != -1) {
      return this.t;
    }
    return this.f;},false);
this.dm("slice",function(start,finish){return this.substr(start, finish);},false);
this.dm("==",function(other){return (this == other) ? this.t : this.f;},false);
this.dm("+",function(other){return this + other;},false);
this.dm("upcase!",function(){return this = this.toUpperCase();},false);
this.dm("<<",function(string){return this;
},false);
this.dm("to_s",function(){return this;
},false);
this.dm("inspect",function(){return this;
},false);
this.dm("length",function(){return this.length;},false);
return this.dm("split",function(str){return this.split(str);},false);
},0);
}).apply(opal.top_self);
// ##################### lib/symbol.rb #####################
(function(__FILE__){this.define_class(this.n,"Symbol",function(){this.dm("inspect",function(){return ":" + this.__ptr__;},false);
return this.dm("to_s",function(){return this.__ptr__;},false);
},0);
}).apply(opal.top_self);
// ##################### lib/top_self.rb #####################
(function(__FILE__){this.dm("to_s",function(){return "main";
},false);
this.dm("include",function(mod){return this.const_get('Object').$include(mod);
},false);
}).apply(opal.top_self);
// ##################### lib/true_class.rb #####################
(function(__FILE__){this.define_class(this.n,"TrueClass",function(){this.dm("to_s",function(){return "true";
},false);
this.dm("&",function(other){return (other).r ? this.t : this.f;
},false);
this.dm("|",function(other){return this.t;
},false);
return this.dm("^",function(other){return (other).r ? this.f : this.t;
},false);
},0);
}).apply(opal.top_self);
opal.register({
  "name": "opal",
  "files": {

  }
});
opal.register({
  "name": "browser",
  "files": {
    "lib/browser/document.rb": (function(__FILE__){this.define_class(this.n,'Document',function(){this.dm("[]",function(selector){var $a = this.n;$a = selector;if(this.const_get('Symbol')['$===']($a).r) {this.$puts(["need to find symbol ",selector.$to_s()].join(''));
return this.$find_by_id(selector);
}else if(/^#/['$===']($a).r) {this.$puts("need to find id");
return this.$find_by_id(selector);
}else {this.$puts("need to find array of things");
return this.const_get('Element').$find_in_context(selector,this);
}},true);
this.dm("find_by_id",function(id){this.$puts("finding by id");
return this.const_get('Element').$from_native(document.getElementById(id.$to_s()));
},true);
this.is("@on_ready_actions",[]);
this.is("@__ready__",this.f);
this.dm("ready?",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}if(((!__block__ || !__block__.r) ? this.f : this.t).r){if(this.ig('@__ready__').r){this.rbYield(__block__,[]);
}else{this.ig('@on_ready_actions')['$<<'](__block__);
}}else{this.n;}return this.ig('@__ready__');
},true);
this.dm("__make_ready",function(){this.is("@__ready__",this.t);
return this.ig('@on_ready_actions').$each(this.P(function(action){return action.$call();
}));
},true);
this.dm("body",function(){return this.const_get('Element').$from_native(document.body);
},true);
opal.setDocumentReadyListener(function() {
    this.const_get('Document').$__make_ready();
  });this.__element__ = document;},2);
}),
    "lib/browser/element.rb": (function(__FILE__){this.define_class(this.n,"Element",function(){this.dm("initialize",function(type,options){if (!options) { options = vnH()}this.__element__ = document.createElement(type.$to_s());this.is("@tag_name",type.$to_s());
return this.$set(options);
},false);
this.dm("from_native",function(native_element){var element = this.n;console.log("loogking up for "  + native_element);if(!native_element) return this.n;element=this.$allocate();
element.__element__ = native_element;return element;
},true);
this.dm("body",function(){if(this.ig('@body_element').r){return this.ig('@body_element');
}else{this.n;}this.is("@body_element",this.$from_native(document.body));
this.ig('@body_element').dm("inspect",function(){return "#<Element body>";
},true);
return this.ig('@body_element');
},true);
this.dm("find_in_context",function(selector,context){var elements = this.n;if(selector['$is_a?'](this.const_get('Symbol')).r){selector='#' + selector.$to_s();
}else{this.n;}elements=Sizzle(selector, context.__element__);;
return elements.$map(this.P(function(e){return this.$from_native(e);
}));
},true);
this.dm("find",function(selector){return this.$class().$find_in_context(selector,this);
},false);
this.dm("tag_name",function(){return this.o(this.ig('@tag_name'),function(){return this.is("@tag_name",this.__element__.tagName);
});
},false);
this.dm("id",function(){return this.__element__.id || this.n;},false);
this.dm("inspect",function(){var description = this.n;description=[["#<Element tag_name=",this.$tag_name().$to_s()].join('')];
if(!this.$class_name()['$==']("").r){description['$<<']([" class_name='",this.$class_name().$to_s(),"'"].join(''));
}else{this.n;}if(!this.$id()['$==']("").r){description['$<<']([" id='",this.$id().$to_s(),"'"].join(''));
}else{this.n;}description['$<<'](">");
return description.$join("");
},false);
this.const_set("SET_OPTIONS",vnH(this.Y("class_name"),this.Y("class_name="),this.Y("content"),this.Y("text="),this.Y("id"),this.Y("id=")));
this.dm("set",function(options){return options.$each(this.P(function(key,value){var method = this.n;method=this.const_get('SET_OPTIONS')['$[]'](key);
if(!method.r){this.$raise(["Bad Element.set key ",key.$to_s()].join(''));
}else{this.n;}return this.$__send__(this.const_get('SET_OPTIONS')['$[]'](key),value);
}));
},false);
this.dm("has_class?",function(class_name){return this.$class_name().$__contains__(class_name.$to_s()," ");
},false);
this.dm("add_class",function(class_name){if(!this['$has_class?'](class_name).r){this['$class_name='](this.$class_name()['$+']([" ",class_name.$to_s()].join('')));
}else{this.n;}return this;
},false);
this.dm("add_classes",function(class_names){class_names=Array.prototype.slice.call(arguments);class_names.$each(this.P(function(class_name){return this.$add_class(class_name);
}));
return this;
},false);
this.dm("remove_class",function(class_name){class_name=class_name.$to_s();
this.__element__.className = this.$class_name().replace(new RegExp('(^|\\s)' + class_name + '(?:\\s|$)'), '$1');return this;
},false);
this.dm("toggle_class",function(class_name){class_name=class_name.$to_s();
(this['$has_class?'](class_name)).r ? this.$remove_class(class_name) : this.$add_class(class_name);
return this;
},false);
this.dm("class_name=",function(class_name){this.__element__.className = class_name.toString();return this;
},false);
this.dm("class_name",function(){return this.__element__.className || "";},false);
this.dm("set_class_names",function(class_names){var current = this.n;current=this.$class_name().$split(" ");
class_names.$each(this.P(function(name,flag){if(current['$include?'](name).r){if(!flag.r){return current.$delete(name);
}else{return this.n;}}else{if(flag.r){return current['$<<'](name);
}else{return this.n;}}}));
return this['$class_name='](current.$join(" "));
},false);
this.dm("id=",function(id){return this.__element__.id = id;},false);
this.dm("text=",function(text_content){var element = this.__element__;
    if (element.textContent !== undefined) {
      element.textContent = text_content.toString();
    }
    else {
      element.innerText = text_content.toString();
    }return this;
},false);
this.dm("css",function(styles){var native_element = this.n;native_element=this.__element__;
return styles.$each(this.P(function(style,value){(native_element.style || native_element)[style.$to_s()] = value;}));
},false);
this.dm("id=",function(id){this.__element__.id = id.toString();return this;
},false);
this.dm("<<",function(append){if(append['$is_a?'](this.const_get('Element')).r){this.__element__.appendChild(append.__element__);}else{this.$raise("bad Element <<");
}return this;
},false);
this.dm("element_offset",function(){var left = this.n,top = this.n;left=0;
top=0;
var element = this.__element__;
    var parent = element;
    while (parent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return this.const_get('Point').$new(left,top);
},false);
this.const_set("VALID_HTML_TAGS",[this.Y("html"),this.Y("head"),this.Y("title"),this.Y("base"),this.Y("meta"),this.Y("link"),this.Y("style"),this.Y("script"),this.Y("body"),this.Y("div"),this.Y("dl"),this.Y("dt"),this.Y("dd"),this.Y("span"),this.Y("pre")]);
return this.const_get('VALID_HTML_TAGS').$each(this.P(function(tag_name){return this.$define_method(tag_name,this.P(function(options){var e = this.n;e=this.const_get('Element').$new(tag_name,options);
this['$<<'](e);
return e;
}));
}));
},0);
}),
    "lib/browser/event.rb": (function(__FILE__){this.define_class(this.n,'Browser',function(){return this.define_class(this.n,"Event",function(){this.dm("listen",function(element,event_name){var __block__ = 
              (arguments[2] && arguments[2].info & this.TP)
              ? arguments[2] : this.n;var event_class = this.n;event_class=this;
var eventName = event_name.$to_s();
      var elem = element.__element__;
      
      var listener = function(evt) {
        var native_event = event_class.$from_native(evt);
        
        var result = __block__.apply(__block__.__self__, [native_event]);
        
        if (!result.r) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      };
      
      if (elem.addEventListener) {
        elem.addEventListener(eventName, listener, false);
      }
      else if (elem.attachEvent) {
        elem.attachEvent("on" + eventName, listener)
      }
      else {
        throw "Unknown elem attach type for element";
      }return this;
},true);
this.dm("from_native",function(native_event){var event = this.n;event=this.$allocate();
event.__event__ = native_event;return event;
},true);
this.dm("type",function(){if(this.ig('@type').r){return this.ig('@type');
}else{this.is("@type",vnY(this.__event__.type));
return this.ig('@type');
}},false);
this.dm("type=",function(event_type){return this.is("@type",event_type);
},false);
this.const_set("KEY_CODES",vnH(8,this.Y("delete"),9,this.Y("tab"),13,this.Y("return")));
this.dm("key",function(){if(this.ig('@key').r){return this.ig('@key');
}else{this.n;}return this.is("@key",this.const_get('KEY_CODES')['$[]'](this.$key_code()));
},false);
return this.dm("key_code",function(){var event = this.n;event=this.__event__;
return event.keyCode || event.which;},false);
},0);
},2);
}),
    "lib/browser/graphics.rb": (function(__FILE__){this.define_class(this.n,'Browser',function(){this.define_class(this.n,"Point",function(){this.$attr_accessor(this.Y("x"),this.Y("y"));
return this.dm("initialize",function(x,y){this.is("@x",x);
return this.is("@y",y);
},false);
},0);
this.define_class(this.n,"Size",function(){this.$attr_accessor(this.Y("height"),this.Y("width"));
return this.dm("initialize",function(w,h){this.is("@width",w);
return this.is("@height",h);
},false);
},0);
return this.define_class(this.n,"Rect",function(){this.$attr_accessor(this.Y("size"),this.Y("origin"));
this.dm("initialize",function(x,y,w,h){this.is("@origin",this.const_get('Point').$new(x,y));
return this.is("@size",this.const_get('Size').$new(w,h));
},false);
this.dm("x",function(){return this.$origin().$x();
},false);
this.dm("y",function(){return this.$origin().$y();
},false);
this.dm("width",function(){return this.$size().$width();
},false);
this.dm("height",function(){return this.$size().$height();
},false);
return this.dm("contains_point?",function(point){var res = (this.$x() < point.$x()) && (this.$y() < point.$y()) && ((this.$x() + this.$width()) > point.$x()) && ((this.$y() + this.$height()) > point.$y());
      return res ? this.t : this.f;
      },false);
},0);
},2);
}),
    "lib/browser/string.rb": (function(__FILE__){this.define_class(this.n,"String",function(){return this.dm("__contains__",function(str, sep){if (sep == undefined) {  sep = "";}if ((sep + this + sep).indexOf(sep + str + sep) > -1) {
      return this.t;
    } else {
      return this.f;
    }},false);
},0);
}),
    "lib/browser/window.rb": (function(__FILE__){this.define_class(this.n,"Window",function(){this.dm("window",function(){return this;
},true);
return this.dm("document",function(){return this.const_get('Document');
},true);
},0);
}),
    "lib/browser.rb": (function(__FILE__){this.define_class(this.n,'Browser',function(){this.dm("opera?",function(){return this.o(this.ig('@__is_opera__'),function(){return this.is("@__is_opera__",(opal.browser.opera ? this.t : this.f));
});
},true);
this.dm("safari?",function(){return this.o(this.ig('@__is_safari__'),function(){return this.is("@__is_safari__",(opal.browser.safari ? this.t : this.f));
});
},true);
this.dm("msie?",function(){return this.o(this.ig('@__is_msie__'),function(){return this.is("@__is_msie__",(opal.browser.msie ? this.t : this.f));
});
},true);
this.dm("touch?",function(){return this.o(this.ig('@__is_touch__'),function(){return this.is("@__is_touch__",(('createTouch' in document) ? this.t : this.f));
});
},true);
this.dm("document",function(){if(this.ig('@document_element').r){return this.ig('@document_element');
}else{this.n;}this.is("@document_element",this.const_get('Element').$from_native(document));
this.ig('@document_element').dm("inspect",function(){return "#<Element document>";
},true);
return this.ig('@document_element');
},true);
return this.dm("window",function(){if(this.ig('@window_element').r){return this.ig('@window_element');
}else{this.n;}this.is("@window_element",this.const_get('Element').$from_native(window));
this.ig('@window_element').dm("inspect",function(){return "#<Element window>";
},true);
return this.ig('@window_element');
},true);
},2);
this.$require("browser/string");
this.$require("browser/window");
this.$require("browser/document");
this.$require("browser/sizzle.js");
this.$require("browser/element");
this.$require("browser/event");
this.$require("browser/graphics");
this.$include(this.const_get('Browser'));
}),
    "lib/browser/sizzle.js": function() {/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, extra, prune = true, contextXML = isXML(context),
		soFar = selector, ret, cur, pop, i;

	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec("");
		m = chunker.exec(soFar);

		if ( m ) {
			soFar = m[3];

			parts.push( m[1] );

			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}

				set = posProcess( selector, set );
			}
		}
	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;

		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice(1,1);

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var filter = Expr.filter[ type ], found, item, left = match[1];
				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},
	leftMatch: {},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part){
			var isPartStr = typeof part === "string",
				elem, i = 0, l = checkSet.length;

			if ( isPartStr && !/\W/.test(part) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}
			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck, nodeCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck, nodeCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			return match[1].toLowerCase();
		},
		CHILD: function(match){
			if ( match[1] === "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");

			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}

			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return (/h\d/i).test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},
		input: function(elem){
			return (/input|select|textarea|button/i).test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 === i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;
			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					if ( type === "first" ) { 
						return true; 
					}
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}

					var doneName = match[0],
						parent = elem.parentNode;

					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}

					var diff = elem.nodeIndex - last;
					if ( first === 0 ) {
						return diff === 0;
					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}

	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [], i = 0;

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.compareDocumentPosition ? -1 : 1;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.sourceIndex ? -1 : 1;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return a.ownerDocument ? -1 : 1;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; // release memory in IE
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}

	div = null; // release memory in IE
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle, div = document.createElement("div");
		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}

		Sizzle = function(query, context, extra, seed){
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && context.nodeType === 9 && !isXML(context) ) {
				try {
					return makeArray( context.querySelectorAll(query), extra );
				} catch(e){}
			}

			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		div = null; // release memory in IE
	})();
}

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ? function(a, b){
	return !!(a.compareDocumentPosition(b) & 16);
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = Sizzle;

})();}
  }
});
opal.register({
  "name": "browser_demo",
  "files": {
    "lib/browser_demo.rb": (function(__FILE__){this.$require("browser");
this.const_get('Document')['$ready?'](this.P(function(){var testers = this.n,a = this.n,wow = this.n;this.$puts("doc is now ready");
this.$puts(this.const_get('Document'));
this.$puts(this.const_get('Document')['$[]']("#wow"));
this.$puts(this.const_get('Document')['$[]'](".typess"));
this.$puts(this.const_get('Document')['$[]']("div"));
wow=this.const_get('Document')['$[]'](this.Y("wow"));
this.$puts("does wow have class names...");
testers=["typess",this.Y("typess"),"types"];
testers.$each(this.P(function(test){this.$puts(["does 'wow' have ",test.$inspect().$to_s(),"?"].join(''));
return this.$puts(wow['$has_class?'](test));
}));
this.$puts("ytesting add class");
wow.$add_class("shit");
wow.$add_class("types");
wow.$add_class("typess");
this.$puts("testing remove class");
wow.$remove_class("benny");
wow.$remove_class(this.Y("shit"));
wow.$remove_class("types");
this.$puts("testing toggle_clas");
wow.$toggle_class("adam");
wow.$toggle_class("beynon");
wow.$toggle_class("adam");
this.$puts("testing window..");
this.$puts(this.const_get('Window'));
this.$puts("document:");
this.$puts(this.const_get('Window').$document());
this.$puts("window:");
this.$puts(this.const_get('Window').$window());
this.$puts(["testing Element","#new etc"].join(''));
a=this.const_get('Element').$new(this.Y("div"));
return wow['$<<'](a);
}));
})
  }
});
opal.run('browser_demo','browser_demo');
