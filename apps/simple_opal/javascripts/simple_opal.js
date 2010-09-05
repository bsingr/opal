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

// native xml http request
exports.request = (function() {
  try {
    new XMLHttpRequest();
    return function() {
      return new XMLHttpRequest();
    };
  }
  catch (e) {
    try {
      new ActiveXObject('MSXML2.XMLHTTP');
      return function() {
        return new ActiveXObject('MSXML2.XMLHTTP');
      };
    }
    catch (e) {
      try {
        new ActiveXObject('Microsoft.XMLHTTP');
        return function() {
          return new ActiveXObject('Microsoft.XMLHTTP');
        };
      }
      catch (e) {
        return function() {
          console.log("cannot create a native XMLHttpRequest");
        }
      }
    }
  }
})();

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
  "name": "cherry_kit",
  "files": {
    "bin/cherry_kit.rb": (function(__FILE__){var app = this.n;this.$puts("running in bin!");
this.$require("cherry_kit");
this.$require(this.const_get('File').$join(this.const_get('Dir').$getwd(),"lib","app_controller"));
app=this.const_get('CherryKit').const_get("Application").$new();
app['$delegate='](this.const_get('AppController').$new());
app.$run();
}),
    "lib/cherry_kit.rb": (function(__FILE__){this.$require("foundation");
this.$puts("well, cherry kut");
})
  }
});
opal.register({
  "name": "simple_opal",
  "files": {
    "lib/app_controller.rb": (function(__FILE__){this.$include(this.const_get('CherryKit'));
this.$require("main_window");
this.define_class(this.n,"AppController",function(){this.dm("initialize",function(){return this.is("@test_value",0);
},false);
this.dm("application_will_finish_launching",function(){return this.n;},false);
this.dm("application_did_finish_launching",function(notification){return this.$main_window();
},false);
this.dm("number_of_rows_in_table_view",function(table_view){return 4;
},false);
this.dm("value_for_table_view_at",function(row,column){return 54;
},false);
this.$attr_reader(this.Y("test_value"));
return this.$attr_writer(this.Y("test_value"));
},0);
}),
    "lib/main_window.rb": (function(__FILE__){this.define_class(this.n,"AppController",function(){return this.dm("main_window",function(){var test_button = this.n;if(this.ig('@main_window').r){return this.ig('@main_window');
}else{this.n;}this.is("@main_window",this.$window(vnH()));
this.ig('@main_window').$show();
test_button=this.$button(vnH(this.Y("layout"),vnH(this.Y("left"),200,this.Y("top"),20,this.Y("right"),250,this.Y("bottom"),100,this.Y("height"),24),this.Y("enabled"),this.t));
this.ig('@main_window')['$<<'](test_button);
this.ig('@main_window')['$<<'](this.$text_field(vnH(this.Y("layout"),vnH(this.Y("left"),30,this.Y("top"),20,this.Y("width"),150,this.Y("height"),24))));
this.ig('@main_window')['$<<'](this.$text_field(vnH(this.Y("layout"),vnH(this.Y("left"),30,this.Y("top"),100,this.Y("width"),150,this.Y("height"),24),this.Y("bezel"),this.Y("rounded"))));
return this.ig('@main_window');
},false);
},0);
})
  }
});
opal.register({
  "name": "browser",
  "files": {
    "lib/browser/css.rb": (function(__FILE__){this.define_class(this.n,"Element",function(){this.dm("css",function(element, name, value){if (value == undefined) {  value = this.f;}var style = this.n;name=name.$to_s();
style=element.__element__.style || element.__element__;
name=name.replace(/[_-]\D/g, function(res) {
      return res.charAt(1).toUpperCase();
    });;
if(value['$=='](this.f).r){return style[name];}else{return style[name] = value;}},true);
this.dm("css",function(styles){var $a = this.n;$a = styles;if(this.const_get('Hash')['$===']($a).r) {return styles.$each(this.P(function(style,value){return this.const_get('Element').$css(this,style,value);
}));
}else if(this.const_get('String')['$===']($a).r || this.const_get('Symbol')['$===']($a).r) {return this.const_get('Element').$css(this,styles);
}else {return this.n;}},false);
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
return this.dm("set_class_names",function(class_names){var current = this.n;current=this.$class_name().$split(" ");
class_names.$each(this.P(function(name,flag){if(current['$include?'](name).r){if(!flag.r){return current.$delete(name);
}else{return this.n;}}else{if(flag.r){return current['$<<'](name);
}else{return this.n;}}}));
return this['$class_name='](current.$join(" "));
},false);
},0);
}),
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
this.dm("transverse",function(element,path,stop_state,all){var result = [];
    var working = element.__element__[path];
    while (working && (working.nodeType == 1)) {
      //console.log("working is:");
      //console.log(working);
      if (!all.r) {
        return this.const_get('Element').$from_native(working);
      } else {
        result.push(this.const_get('Element').$from_native(working));
      }
      working = working[path];
    }
    return result},true);
opal.setDocumentReadyListener(function() {
    this.const_get('Document').$__make_ready();
  });this.__element__ = document;},2);
}),
    "lib/browser/element.rb": (function(__FILE__){this.define_class(this.n,"Element",function(){this.dm("initialize",function(type,options){if (!options) { options = vnH()}this.__element__ = document.createElement(type.$to_s());this.is("@tag_name",type.$to_s());
return this.$set(options);
},false);
this.dm("from_native",function(native_element){var element = this.n;if(!native_element) return this.n;element=this.$allocate();
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
this.dm("<<",function(element){return this.$append(element);
},false);
this.dm("append",function(element){this.__element__.appendChild(element.__element__);return this;
},false);
this.dm("before",function(element){var parent = this.__element__.parentNode;
    if (parent) {
      parent.insertBefore(element.__element__, this.__element__);
    }return this;
},false);
this.dm("after",function(element){var parent = this.__element__.parentNode;
    if (parent) {
      parent.insertBefore(element.__element__, this.__element__.nextSibling);
    }return this;
},false);
this.dm("parent",function(selector){if (selector == undefined) {  selector = this.n;}return this.const_get('Document').$transverse(this,"parentNode",this.n,this.f);
},false);
this.dm("parents",function(selector){if (selector == undefined) {  selector = this.n;}return this.const_get('Document').$transverse(this,"parentNode",this.n,this.t);
},false);
this.dm("next",function(selector){if (selector == undefined) {  selector = this.n;}return this.const_get('Document').$transverse(this,"nextSibling",this.n,this.f);
},false);
this.dm("prev",function(selector){if (selector == undefined) {  selector = this.n;}return this.const_get('Document').$transverse(this,"previousSibling",this.n,this.f);
},false);
this.dm("first",function(selector){if (selector == undefined) {  selector = this.n;}return this.const_get('Document').$transverse(this,"firstChild",this.n,this.f);
},false);
this.dm("last",function(selector){if (selector == undefined) {  selector = this.n;}return this.const_get('Document').$transverse(this,"lastChild",this.n,this.f);
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
    "lib/browser/event.rb": (function(__FILE__){this.define_class(this.n,"Event",function(){this.dm("from_native",function(event){var result = this.n;result=this.$allocate();
event = event || window.event;
    
    var type = event.type,
        target = event.target || event.srcElement;
    
    while (target && target.nodeType == 3) {
      target = target.parentNode;
    }
    
    result.__event__ = event;
    result.__type__ = type;return result;
},true);
this.dm("stop_propagation",function(){var evt = this.__event__;
    if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {
      evt.cancelBubble = true;
    }return this;
},false);
this.dm("prevent_default",function(){var evt = this.__event__;
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }return this;
},false);
this.dm("stop!",function(){this.$stop_propagation();
return this.$prevent_default();
},false);
this.dm("type",function(){if(this.ig('@type').r){return this.ig('@type');
}else{this.is("@type",vnY(this.__event__.type));
return this.ig('@type');
}},false);
this.dm("type=",function(event_type){return this.is("@type",event_type);
},false);
this.const_set("KEYS",vnH(this.Y("backspace"),8,this.Y("tab"),9,this.Y("enter"),13,this.Y("esc"),27,this.Y("space"),32,this.Y("left"),37,this.Y("up"),38,this.Y("right"),39,this.Y("down"),40,this.Y("delete"),46));
return this.const_get('KEYS').$each(this.P(function(key,code){return this.$define_method([key.$to_s(),"?"].join(''),this.P(function(){return code['$=='](key);
}));
}));
},0);
}),
    "lib/browser/event_responder.rb": (function(__FILE__){this.define_class(this.n,"Event",function(){return this.define_class(this.n,'EventResponder',function(){this.dm("listen",function(event_name){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;return this.$add_listener(event_name,__block__==this.n ? this.n : __block__.$to_proc());
},false);
this.dm("on",function(event_name){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;return this.$add_listener(event_name,__block__==this.n ? this.n : __block__.$to_proc());
},false);
return this.dm("add_listener",function(event_name){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;var event_class = this.n;event_class=this.const_get('Event');
var func = function(evt) {
        //console.log(event_class);
        evt = event_class.$from_native(evt);
        var res = __block__.apply(__block__.__self__, [evt]);
        return res.r;
      };
      
      var element = this.__element__;
      if (element.addEventListener) {
        element.addEventListener(event_name.$to_s(), func, false);
      } else {
        element.attachEvent('on' + event_name.$to_s(), fn);
      }return this;
},false);
},2);
},0);
this.const_get('Element').$include(this.const_get('Event').const_get("EventResponder"));
this.const_get('Document').$extend(this.const_get('Event').const_get("EventResponder"));
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
    "lib/browser/request.rb": (function(__FILE__){this.define_class(this.n,"Request",function(){this.const_set("OPTIONS",vnH(this.Y("url"),"",this.Y("data"),vnH(),this.Y("headers"),vnH("X-Requested-With","XMLHttpRequest","Accept"," text/javascript, text/html, application/xml, text/xml, */*"),this.Y("async"),this.t,this.Y("format"),this.n,this.Y("method"),"POST",this.Y("link"),"ignore",this.Y("is_success"),this.n,this.Y("emulation"),this.t,this.Y("url_encoded"),this.t,this.Y("encoding"),"utf-8",this.Y("eval_scripts"),this.f,this.Y("eval_response"),this.f,this.Y("timeout"),0,this.Y("no_cache"),this.f));
return this.dm("initialize",function(options){if (options == undefined) {  options = vnH();}this.__request__ = opal.request();this.is("@options",this.const_get('OPTIONS').$merge(options));
return this.is("@headers",this.ig('@options')['$[]'](this.Y("headers")));
},false);
},0);
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
},false);
this.dm("safari?",function(){return this.o(this.ig('@__is_safari__'),function(){return this.is("@__is_safari__",(opal.browser.safari ? this.t : this.f));
});
},false);
this.dm("msie?",function(){return this.o(this.ig('@__is_msie__'),function(){return this.is("@__is_msie__",(opal.browser.msie ? this.t : this.f));
});
},false);
this.dm("touch?",function(){return this.o(this.ig('@__is_touch__'),function(){return this.is("@__is_touch__",(('createTouch' in document) ? this.t : this.f));
});
},false);
this.dm("document",function(){if(this.ig('@document_element').r){return this.ig('@document_element');
}else{this.n;}this.is("@document_element",this.const_get('Element').$from_native(document));
this.ig('@document_element').dm("inspect",function(){return "#<Element document>";
},true);
return this.ig('@document_element');
},false);
this.dm("window",function(){if(this.ig('@window_element').r){return this.ig('@window_element');
}else{this.n;}this.is("@window_element",this.const_get('Element').$from_native(window));
this.ig('@window_element').dm("inspect",function(){return "#<Element window>";
},true);
return this.ig('@window_element');
},false);
return this.dm("alert",function(message){if (message == undefined) {  message = "";}return alert(message);},false);
},2);
this.const_get('Browser').$extend(this.const_get('Browser'));
this.$include(this.const_get('Browser'));
this.$require("browser/string");
this.$require("browser/window");
this.$require("browser/document");
this.$require("browser/sizzle.js");
this.$require("browser/element");
this.$require("browser/css");
this.$require("browser/event");
this.$require("browser/event_responder");
this.$require("browser/graphics");
this.$require("browser/request");
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
  "name": "foundation",
  "files": {
    "lib/foundation/__table_view_desktop/outline_view.rb": (function(__FILE__){}),
    "lib/foundation/__table_view_desktop/table_column.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"TableColumnDesktop",function(){this.$attr_accessor(this.Y("table_view"));
this.$attr_accessor(this.Y("identifer"));
this.dm("initialize",function(identifier){this.is("@identifier",this.n);
return this['$data_view='](this.const_get('Control').$new());
},false);
this.dm("hidden?",function(){return this.f;
},false);
this.dm("data_view=",function(data_view){if(this.ig('@data_view')['$=='](data_view).r){return this.n;
}else{this.n;}return this.is("@data_view",data_view);
},false);
this.dm("data_view",function(){return this.ig('@data_view');
},false);
return this.dm("_create_data_view_for_row",function(row){return this.$data_view().$dup();
},false);
},0);
},2);
}),
    "lib/foundation/__table_view_desktop/table_header_view.rb": (function(__FILE__){}),
    "lib/foundation/__table_view_desktop/table_view.rb": (function(__FILE__){this.$require("foundation/views/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Control'),"TableViewDesktop",function(){this.$class_names("ck-table-view");
this.dm("initialize",function(layout){this.opal_super(arguments.callee, [layout]);
this.is("@row_height",23);
this.is("@table_columns",[]);
this.is("@table_column_views",vnH());
this.is("@selected_row_indexes",this.const_get('IndexSet').$new());
this.is("@allows_empty_selection",this.t);
this.is("@allows_multiple_selection",this.f);
this.is("@dirty_rows",[]);
this.is("@dirty_columns",[]);
return this.is("@data_source_methods",[]);
},false);
this.dm("<<",function(column){this.ig('@table_columns')['$<<'](column);
column['$table_view='](this);
return this['$needs_display='](this.t);
},false);
this.dm("remove_table_column",function(column){if(!column.$table_view()['$=='](this).r){return this.n;
}else{return this.n;}},false);
this.dm("table_columns=",function(columns){return columns.$each(this.P(function(column){return this['$<<'](column);
}));
},false);
this.dm("data_source=",function(data_source){if(this.ig('@data_source')['$=='](data_source).r){return this.n;
}else{this.n;}this.is("@data_source",data_source);
this.is("@data_source_methods",[]);
if(!this.ig('@data_source')['$respond_to?'](this.Y("number_of_rows_in_table_view")).r){this.$raise(["TableView delegate ",this.ig('@data_source').$to_s()," does not respond to 'number_of_rows_in_table_view'"].join(''));
}else{this.n;}if(!this.ig('@data_source')['$respond_to?'](this.Y("value_for_table_view_at")).r){this.$raise(["TableView delegate ",this.ig('@data_source').$to_s()," does not respond to 'value_for_table_view_at'"].join(''));
}else{this.n;}if(this.ig('@data_source')['$respond_to?'](this.Y("table_view_write_rows_to_pasteboard")).r){this.ig('@data_source_methods')['$<<'](this.Y("table_view_write_rows_to_pasteboard"));
}else{this.n;}return this.$reload_data();
},false);
this.dm("reload_data",function(){this.is("@reload_all_data",this.t);
this.$note_number_of_rows_changed();
return this['$needs_display='](this.t);
},false);
this.dm("note_number_of_rows_changed",function(){this.is("@number_of_rows",this.n);
this.is("@number_of_rows",this.$number_of_rows());
return this['$needs_display='](this.t);
},false);
this.dm("number_of_rows",function(){if(this.ig('@number_of_rows').r){return this.ig('@number_of_rows');
}else{this.n;}if(this.ig('@data_source').r){return this.ig('@data_source').$number_of_rows_in_table_view(this);
}else{this.n;}return 0;
},false);
this.dm("create_renderer",function(theme){return theme.$table_view(this);
},false);
this.dm("update_renderer",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.$_update_render_rows();
},false);
this.dm("_update_render_rows",function(){if(this.ig('@reload_all_data').r){this.$_render_data_views_for();
return this.is("@reload_all_data",this.f);
}else{return this.$_update_data_views_for();
}},false);
this.dm("_render_data_views_for",function(rows,columns){return this.ig('@table_columns').$each(this.P(function(column){if(!column['$hidden?']().r){this.$puts(["need to render ",column.$to_s()].join(''));
this.ig('@table_column_views')['$[]='](column,this.o(this.ig('@table_column_views')['$[]'](column),function(){return [];
}));
return (0).$upto(this.$number_of_rows()['$-'](1),this.P(function(row){var frame = this.n,view = this.n;this.$puts(["need to render row ",row.$to_s()].join(''));
view=this.$_create_data_view_for(row,column);
frame=this.$_frame_of_data_view_at(row,column);
view['$layout='](vnH(this.Y("left"),frame.$x(),this.Y("top"),frame.$y(),this.Y("width"),frame.$width(),this.Y("height"),frame.$height()));
view['$value='](this.$_table_data_value_for(row,column));
view['$selected='](this['$row_selected?'](row));
this.$puts(["view is ",view.$to_s()].join(''));
if(!view.$superview()['$=='](this).r){return this.$add_subview(view);
}else{return this.n;}}));
}else{return this.n;}}));
},false);
this.dm("_update_data_views_for",function(){return this.n;},false);
this.dm("_create_data_view_for",function(row,column){return column.$_create_data_view_for_row(row);
},false);
this.dm("_frame_of_data_view_at",function(row,column){var row_rect = this.n,column_rect = this.n;row_rect=this.$rect_of_row(row);
column_rect=this.$rect_of_column(column);
return this.const_get('Rect').$new(column_rect.$x(),row_rect.$y(),column_rect.$width(),row_rect.$height());
},false);
this.dm("rect_of_row",function(row){return this.const_get('Rect').$new(0,row['$*'](this.ig('@row_height')),200,this.ig('@row_height'));
},false);
this.dm("rect_of_column",function(column){return this.const_get('Rect').$new(this.ig('@table_columns').$index(column)['$*'](100),0,100,200);
},false);
this.dm("row_at_point",function(point){var row = this.n;row=(point.$y()['$/'](this.ig('@row_height'))).$to_i();
if (row >= this.ig('@number_of_rows')) {
        return this.n;
      }
      return row;},false);
this.dm("_table_data_value_for",function(row,column){return this.ig('@data_source').$value_for_table_view_at(row,column);
},false);
this.dm("start_tracking?",function(location){var row = this.n;row=this.$row_at_point(location);
this.is("@start_tracking_location",location);
if(this.a(this.ig('@allows_empty_selection'),function(){return row['$=='](this.n);
}).r){this.$select_row_indexes(this.const_get('IndexSet').$new(),this.f);
}else{this.n;}this.$notify(this.Y("table_view_selection_is_changing"));
if(this.a(row,function(){return this.ig('@data_source_methods')['$include?'](this.Y("table_view_write_rows_to_pasteboard"))['$!']();
}).r){return this.$_update_with_selection_at_row(row);
}else{return this.n;}},false);
this.dm("stop_tracking",function(location){return this.$puts("stop trackinhg.. tableview");
},false);
this.dm("continue_tracking?",function(location){var row = this.n;return row=this.$row_at_point(location);
},false);
this.dm("_update_with_selection_at_row",function(row){var indexes = this.n;if(!row.r){return this.n;
}else{this.n;}if(this.ig('@allows_multiple_selection').r){this.$puts("allows multiple selection!");
indexes=this.ig('@selected_row_indexes');
indexes.$add_index(row);
}else if(row['$<'](this.ig('@number_of_rows')).r){indexes=this.const_get('IndexSet').$new(row);
}else{this.$puts("deselect all rows!");
}if(this.ig('@selected_row_indexes')['$=='](indexes).r){return this.n;
}else{this.n;}if(this.a(this.ig('@allows_empty_selection')['$!'](),function(){return indexes.$count()['$=='](0);
}).r){return this.n;
}else{this.n;}return this.$select_row_indexes(indexes,this.f);
},false);
this.dm("select_row_indexes",function(indexes,extend_selection){var new_indexes = this.n;if(extend_selection.r){new_indexes=this.ig('@selected_row_indexes').$dup();
new_indexes.$add_indexes(indexes);
}else{new_indexes=indexes.$dup();
}return this['$_selected_row_indexes='](new_indexes);
},false);
this.dm("_selected_row_indexes=",function(indexes){var old_indexes = this.n;old_indexes=this.ig('@selected_row_indexes').$dup();
this.$puts(["setting indexes ",indexes.$length().$to_s()].join(''));
this.is("@selected_row_indexes",indexes);
return this['$needs_display='](this.t);
},false);
return this.dm("row_selected?",function(index){return this.ig('@selected_row_indexes')['$include?'](index);
},false);
},0);
},2);
}),
    "lib/foundation/controllers/array_controller.rb": (function(__FILE__){this.$require("foundation/controllers/object_controller");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('ObjectController'),"ArrayController",function(){this.$expose_binding(this.Y("content_array"));
this.$attr_accessor(this.Y("content_array"));
this.$attr_writer(this.Y("preserves_selection"));
this.dm("preserves_selection?",function(){return this.ig('@preserves_selection');
},false);
return this.dm("content=",function(content){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/controllers/controller.rb": (function(__FILE__){this.$require("foundation/core/bindings");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"Controller",function(){this.dm("initialize",function(){return this.is("@editors",[]);
},false);
this.dm("editing?",function(){return this.ig('@editors').$length()['$>'](0);
},false);
this.dm("commit_editing?",function(){var result = this.n;if(this.ig('@editors').$length()['$=='](0).r){return this.t;
}else{this.n;}result=this.t;
this.ig('@editors').$each(this.P(function(editor){if(!editor['$commit_editing?']().r){return result=this.f;
}else{return this.n;}}));
return result;
},false);
this.dm("discard_editing",function(){return this.ig('@editors').$each(this.P(function(editor){return editor.$discard_editing();
}));
},false);
this.dm("object_did_begin_editing",function(editor){return this.ig('@editors')['$<<'](editor);
},false);
return this.dm("object_did_end_editing",function(editor){return this.ig('@editors').$delete(editor);
},false);
},0);
},2);
}),
    "lib/foundation/controllers/controller_selection_proxy.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"ControllerSelectionProxy",function(){this.dm("initialize",function(controller){this.is("@controller",controller);
this.is("@values",vnH());
return this.is("@proxies",[]);
},false);
this.dm("controller_will_change",function(){return this.$puts("controller_will_change");
},false);
this.dm("controller_did_change",function(){return this.$puts("controller_did_change");
},false);
return this.dm("get_attribute",function(attribute){var values = this.n,value = this.n,length = this.n;attribute=attribute.$to_s();
value=this.ig('@values')['$[]'](attribute);
if(value.r){return value;
}else{this.n;}values=this.ig('@controller').$selected_objects().$get_path(attribute);
length=values.$length();
if(length['$=='](0).r){value=this.Y("no_selection");
}else if(length['$=='](1).r){value=values['$[]'](0);
}else{value=this.Y("selected_objects_many");
}this.ig('@values')['$[]='](attribute,value);
return value;
},false);
},0);
},2);
}),
    "lib/foundation/controllers/object_controller.rb": (function(__FILE__){this.$require("foundation/controllers/controller");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Controller'),"ObjectController",function(){this.$expose_binding(this.Y("editable"));
this.$expose_binding(this.Y("content_object"));
this.$keys_affecting(vnH(this.Y("can_add"),[this.Y("editable")]));
this.$keys_affecting(vnH(this.Y("can_insert"),[this.Y("editable")]));
this.$keys_affecting(vnH(this.Y("can_remove"),[this.Y("editable"),this.Y("selection")]));
this.$keys_affecting(vnH(this.Y("content_object"),[this.Y("content")]));
this.$attr_reader(this.Y("content"));
this.$attr_accessor(this.Y("selection"));
this.$attr_accessor(this.Y("object_class"));
this.dm("initialize",function(content){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
this['$content='](content || this.n);
this['$editable='](this.t);
return this['$object_class='](this.const_get('Hash'));
},false);
this.dm("content=",function(content){if(!this.ig('@content')['$=='](content).r){this.$will_change_attribute(this.Y("content_object"));
this.$_selection_will_change();
this.is("@content",content);
this.$did_change_attribute(this.Y("content_object"));
this.$_selection_did_change();
}else{this.n;}return content;
},false);
this.dm("_selection_will_change",function(){this.$will_change_attribute(this.Y("selection"));
if(this.ig('@selection').r){return this.ig('@selection').$controller_will_change();
}else{return this.n;}},false);
this.dm("_selection_did_change",function(){if(!this.ig('@selection').r){this.is("@selection",this.const_get('ControllerSelectionProxy').$new(this));
}else{this.n;}this.ig('@selection').$controller_did_change();
return this.$did_change_attribute(this.Y("selection"));
},false);
this.dm("selected_objects",function(){return [this.ig('@content')];
},false);
this.dm("new_object",function(){return this.$object_class().$new();
},false);
this.dm("add_object",function(object){return this['$content='](object);
},false);
this.dm("add",function(sender){return this.$add_object(this.$new_object());
},false);
this.dm("can_add?",function(){return this['$editable?']();
},false);
this.dm("can_remove?",function(){return this.a(this['$editable?'](),function(){return this.$selected_objects().$length()['$>'](0);
});
},false);
this.dm("editable?",function(){return this.ig('@editable');
},false);
this.dm("editable=",function(editable){return this.is("@editable",editable);
},false);
this.dm("automatically_prepares_content?",function(){return this.ig('@automatically_prepares_content');
},false);
this.$attr_writer(this.Y("automatically_prepares_content"));
this.$attr_reader(this.Y("_observed_keys"));
this.dm("_content_object",function(){return this.$content();
},false);
return this.dm("_content_object=",function(value){return this['$content='](value);
},false);
},0);
},2);
}),
    "lib/foundation/controllers/view.rb": (function(__FILE__){this.$require("foundation/core/responder");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"ViewController",function(){this.$attr_reader(this.Y("first_name"));
return this.dm("initialize",function(){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/core/application.rb": (function(__FILE__){this.$require("foundation/core/responder");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Responder'),"Application",function(){this.$attr_reader(this.Y("delegate"));
this.dm("initialize",function(){this.is("@windows",[]);
this.is("@touches",vnH());
return this.is("@touches_for_views",vnH());
},false);
this.dm("register_window",function(window){return this.ig('@windows')['$<<'](window);
},false);
this.dm("delegate=",function(delegate){var center = this.n,notifications = this.n;this.is("@delegate",delegate);
center=this.const_get('NotificationCenter').$default_center();
notifications=[this.Y("application_will_finish_launching"),this.Y("application_did_finish_launching")];
notifications.$each(this.P(function(notification){if(delegate['$respond_to?'](notification).r){return center.$add_observer(delegate,notification,notification,this);
}else{return this.n;}}));
return delegate;
},false);
this.dm("run",function(){return this.const_get('RunLoop').$run(this.P(function(){var window = this.n;this.$setup_body_class_names();
this.const_get('Object').$const_set("CKApp",this);
window=this.const_get('CherryKit').const_get("Window").$build(vnH());
window.$show();
this.ig('@delegate')['$window='](window);
this.$notify(this.Y("application_will_finish_launching"));
this.$setup_event_handlers();
return this.$notify(this.Y("application_did_finish_launching"));
}));
},false);
this.dm("setup_body_class_names",function(){var body = this.n;body=this.const_get('Browser').const_get("Element").$body();
if(this.const_get('Browser')['$safari?']().r){return body['$class_name=']("safari");
}else if(this.const_get('Browser')['$opera?']().r){return body['$class_name=']("opera");
}else if(this.const_get('Browser')['$msie?']().r){return body['$class_name=']("msie");
}else{return this.n;}},false);
this.dm("setup_event_handlers",function(){this.$listen_for(this.const_get('Browser').$document(),this.Y("touchstart"),this.Y("touchmove"),this.Y("touchend"),this.Y("touchcancel"));
this.$listen_for(this.const_get('Browser').$document(),this.Y("mousedown"),this.Y("mouseup"),this.Y("mousemove"));
this.$listen_for(this.const_get('Browser').$document(),this.Y("keydown"),this.Y("keyup"),this.Y("keypress"));
this.$listen_for(this.const_get('Browser').$window(),this.Y("resize"));
if(this.const_get('Browser')['$msie?']().r){}else{}},false);
this.dm("listen_for",function(target,events){target=arguments[0];events=Array.prototype.slice.call(arguments,1);return events.$each(this.P(function(event){return this.const_get('Browser').const_get("Event").$listen(target,event,this.$__send__(["on_",event.$to_s()].join('')));
}));
},false);
this.dm("send_event",function(event){this.is("@current_event",event);
if(this.ig('@event_handler').r){event['$view='](this.ig('@event_handler_view'));
return this.const_get('RunLoop').$run(this.P(function(){this.ig('@event_handler').apply(this.ig('@event_handler').__self__, [event]);}));
}else{return this.const_get('RunLoop').$run(this.P(function(){var res = this.n;res=event.$window().$send_event(event);
return res;
}));
}},false);
this.dm("handle_events",function(events){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;this.is("@event_handler",__block__);
this.is("@event_handler_events",events);
this.is("@event_handler_view",this.ig('@current_event').$view());
this.ig('@event_handler').apply(this.ig('@event_handler').__self__, [this.ig('@current_event')]);},false);
this.dm("finish_handling_events",function(){this.is("@event_handler",this.n);
this.is("@event_handler_events",this.n);
return this.is("@event_handler_view",this.n);
},false);
this.dm("touches_for_view",function(view){if(this.ig('@touches_for_views')['$[]'](view).r){return this.ig('@touches_for_views')['$[]'](view);
}else{return this.ig('@touches_for_views')['$[]='](view,[]);
}},false);
this.dm("setup_touch_began",function(touch,event){var capturing_view = this.n,touch_hierarchy = this.n,to_try = this.n,view = this.n;touch_hierarchy=[];
view=touch.$view();
while(view.r) {
        touch_hierarchy.unshift(view);
        view = view.$superview();
      }capturing_view=this.n;
to_try=this.n;
for (var i = 0; i < touch_hierarchy.length; i++) {
        to_try = touch_hierarchy[i];
        if (to_try['$capture_touches?']().r) {
          capturing_view = to_try;
          break;
        }
      }if(capturing_view.r){return touch['$view='](capturing_view);
}else{return touch['$view='](event.$view());
}},false);
this.dm("on_touchstart",function(){return this.$proc(this.P(function(event){return this.const_get('RunLoop').$run(this.P(function(){var touches = this.n;touches=event.$changed_touches();
touches.$each(this.P(function(touch){var view = this.n,view_touches = this.n;this.ig('@touches')['$[]='](touch.$identifier(),touch);
touch['$event='](event);
this.$setup_touch_began(touch,event);
view=touch.$view();
view_touches=this.$touches_for_view(view);
if(view['$multiple_touch_enabled?']().r){this.$puts("can send event!");
view_touches['$<<'](touch.$identifier());
return touch.$view().$touches_began(touches,event);
}else{if(view_touches.$length()['$>'](0).r){return this.$puts(["touch_start: ",touch.$identifier().$to_s()," being dropped"].join(''));
}else{view_touches['$<<'](touch.$identifier());
this.$puts(["touch_start: ",touch.$identifier().$to_s()," sending!"].join(''));
return touch.$view().$touches_began(touches,event);
}}}));
return this.f;
}));
}));
},false);
this.dm("on_touchend",function(){return this.$proc(this.P(function(event){this.const_get('RunLoop').$run(this.P(function(){var touches = this.n;touches=event.$changed_touches();
return touches.$each(this.P(function(touch){var entry = this.n;entry=this.ig('@touches')['$[]'](touch.$identifier());
if(this.ig('@touches_for_views')['$[]'](entry.$view())['$include?'](touch.$identifier()).r){this.$puts(["sending touchend for ",entry.$identifier().$to_s()].join(''));
entry['$event='](event);
entry.$view().$touches_ended(touches,event);
return this.ig('@touches_for_views')['$[]'](entry.$view()).$delete(touch.$identifier());
}else{}}));
}));
return this.f;
}));
},false);
this.dm("on_touchmove",function(){return this.$proc(this.P(function(event){this.const_get('RunLoop').$run(this.P(function(){var touches = this.n,view_touches = this.n;view_touches=vnH();
touches=event.$changed_touches();
return touches.$each(this.P(function(touch){var entry = this.n,view_array = this.n;entry=this.ig('@touches')['$[]'](touch.$identifier());
if(!entry.r){this.$raise(["Application: touchmove: unknown touch ",touch.$identifier().$to_s()].join(''));
}else{this.n;}if(this.ig('@touches_for_views')['$[]'](entry.$view())['$include?'](touch.$identifier()).r){entry['$event='](event);
view_array=view_touches['$[]'](entry.$view());
if(!view_array.r){view_array=view_touches['$[]='](entry.$view(),[]);
}else{this.n;}view_array['$<<'](touch);
return entry.$view().$touches_moved(touches,event);
}else{}}));
}));
return this.f;
}));
},false);
this.dm("on_touchcancel",function(){return this.$proc(this.P(function(event){this.$puts("touchcancel!");
return this.t;
}));
},false);
this.dm("on_resize",function(){return this.$proc(this.P(function(event){}));
},false);
this.dm("on_keydown",function(){return this.$proc(this.P(function(event){var res = this.n;event['$type='](this.Y("key_down"));
res=this.$send_event(event);
return res;
}));
},false);
this.dm("on_keyup",function(){return this.$proc(this.P(function(event){event['$type='](this.Y("key_up"));
return this.$send_event(event);
}));
},false);
this.dm("on_keypress",function(){try {return this.$proc(this.P(function(event){event['$type='](this.Y("key_down"));
this.rbReturn(this.t);
}));
} catch(e) {if (e.__keyword__ == 'return') {  return e.opal_value;}throw e;}},false);
this.dm("on_mousemove",function(){return this.$proc(this.P(function(event){event['$type='](this.Y("mouse_moved"));
this.$send_event(event);
return this.t;
}));
},false);
this.dm("on_mousedown",function(){return this.$proc(this.P(function(event){var window = this.n,view = this.n,first_responder = this.n;event['$type='](this.Y("mouse_down"));
this.is("@mouse_down_view",view=event.$view());
window=view.$window();
first_responder=window.$first_responder();
if(this.a(view['$!='](first_responder),function(){return view['$accepts_first_responder?']();
}).r){window['$make_first_responder?'](view);
}else{this.n;}this.$send_event(event);
return this.t;
}));
},false);
return this.dm("on_mouseup",function(){return this.$proc(this.P(function(event){event['$type='](this.Y("mouse_up"));
this.$send_event(event);
return this.t;
}));
},false);
},0);
},2);
}),
    "lib/foundation/core/attributes.rb": (function(__FILE__){this.define_class(this.n,"Object",function(){this.dm("get_attribute",function(key){if(this['$respond_to?'](key).r){return this.$__send__(key);
}else if(this['$respond_to?']([key.$to_s(),"?"].join('')).r){return this.$__send__([key.$to_s(),"?"].join(''));
}else if(this['$instance_variable_defined?'](["@",key.$to_s()].join('')).r){return this.$instance_variable_get(["@",key.$to_s()].join(''));
}else{return this.$value_for_undefined_key(key);
}},false);
this.dm("set_attribute",function(key,value){if(this['$respond_to?']([key.$to_s(),"="].join('')).r){this.$__send__([key.$to_s(),"="].join(''),value);
}else if(this['$instance_variable_defined?'](["@",key.$to_s()].join('')).r){this.$will_change_attribute(key);
this.$instance_variable_set(["@",key.$to_s()].join(''),value);
this.$did_change_attribute(key);
}else{this.$set_value_for_undefined_key(value,key);
}return value;
},false);
this.dm("get_path",function(key_path){var parts = this.n,object = this.n;if(!key_path.$index(".").r){return this.$get_attribute(key_path);
}else{this.n;}parts=key_path.$split(".");
object=this;
parts.$each(this.P(function(part){return object=object.$get_attribute(part);
}));
return object;
},false);
this.dm("set_path",function(key_path,value){var parts = this.n,object = this.n,last_part = this.n;if(!key_path.$index(".").r){return this.$set_attribute(key_path,value);
}else{this.n;}parts=key_path.$split(".");
last_part=parts.$pop();
object=this;
parts.$each(this.P(function(part){return object=object.$get_attribute(part);
}));
return object.$set_attribute(last_part,value);
},false);
this.dm("value_for_undefined_key",function(key){return this.$raise([this.$inspect().$to_s()," is not Key Value Coding compliant for key ",key.$to_s()].join(''));
},false);
return this.dm("set_value_for_undefined_key",function(value,key){return this.$raise([this.$inspect().$to_s()," is not Key Value Coding compliant for key ",key.$to_s()].join(''));
},false);
},0);
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'HashKeyValueCoding',function(){this.dm("get_attribute",function(key){return this['$[]'](key.$to_s());
},false);
return this.dm("set_attribute",function(key,value){return this['$[]='](key.$to_s(),value);
},false);
},2);
},2);
this.const_get('Hash').$include(this.const_get('CherryKit').const_get("HashKeyValueCoding"));
this.define_class(this.n,"NilClass",function(){return this.dm("get_attribute",function(key){return this.n;
},false);
},0);
this.define_class(this.n,"Array",function(){this.dm("get_attribute",function(key){return this.$map(this.P(function(object){return object.$get_attribute(key);
}));
},false);
return this.dm("set_attribute",function(key,value){return this.$each(this.P(function(object){return object.$set_attribute(key,value);
}));
},false);
},0);
}),
    "lib/foundation/core/bindings.rb": (function(__FILE__){this.$require("foundation/core/observable");
this.define_class(this.n,"Object",function(){return this.dm("expose_binding",function(binding_name){return this.$define_method([binding_name.$to_s(),"_binding="].join(''),this.P(function(binding_options){return this.$bind(binding_name,binding_options);
}));
},true);
},0);
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'Bindings',function(){this.dm("bind",function(binding,binding_options){var to = this.n,key = this.n;this.o(to=binding_options['$[]'](this.Y("to")),function(){return this.$raise("binding options must have a :to key");
});
this.o(key=binding_options['$[]'](this.Y("path")).$to_s(),function(){return this.$raise("binding options must have :path key");
});
this.$unbind(binding);
return this.ig('@__ck_bindings')['$[]='](binding,this.const_get('KVBBindingProxy').$new(binding,to,key,this.n,this));
},false);
this.dm("unbind",function(the_binding){var binding = this.n;this.o(this.ig('@__ck_bindings'),function(){return this.is("@__ck_bindings",vnH());
});
binding=this.ig('@__ck_bindings')['$[]'](the_binding);
if(!binding.r){return this.n;
}else{return this.n;}},false);
return this.define_class(this.n,"KVBBindingProxy",function(){this.dm("initialize",function(binding,observed,path,options,source){this.is("@binding",binding);
this.is("@observed",observed);
this.is("@path",path);
this.is("@options",options);
this.is("@source",source);
observed.$observe(path,this.P(function(info){return this.$update_value_for(binding);
}));
return this.$update_value_for(binding);
},false);
this.dm("update_value_for",function(context){var new_value = this.n;new_value=this.ig('@observed').$get_path(this.ig('@path'));
return this.ig('@source').$set_attribute(context,new_value);
},false);
return this.dm("transform_value",function(value,options){return this.n;},false);
},0);
},2);
},2);
this.const_get('Object').$include(this.const_get('CherryKit').const_get("Bindings"));
}),
    "lib/foundation/core/builder.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'Builder',function(){this.define_class(this.n,'BuilderClassMethods',function(){this.dm("register_builder",function(builder_name,builder_options){var builder_class = this.n;builder_class=this;
return this.const_get('CherryKit').$define_method(builder_name,this.P(function(options){return builder_class.$build(options);
}));
},false);
return this.dm("build",function(builder_options){var object = this.n;object=this.$allocate();
object.$initialize_from_builder(builder_options);
builder_options.$each(this.P(function(key,value){return object.$set_attribute(key,value);
}));
return object;
},false);
},2);
return this.define_class(this.n,'BuilderMethods',function(){return this.dm("initialize_from_builder",function(builder_options){return this.$initialize();
},false);
},2);
},2);
},2);
this.const_get('Object').$extend(this.const_get('CherryKit').const_get("Builder").const_get("BuilderClassMethods"));
this.const_get('Object').$include(this.const_get('CherryKit').const_get("Builder").const_get("BuilderMethods"));
}),
    "lib/foundation/core/event.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'EventAdditions',function(){this.dm("view",function(){var element = this.n;if(this.ig('@view').r){return this.ig('@view');
}else{element=this.__event__.target || this.__event__.srcElement;;
while (element) {
        if (!element.id) {
          element = element.parentNode; 
        } else {
          break;
        }
      }return this.is("@view",this.const_get('CherryKit').const_get("View")['$[]'](element.id));
}},false);
this.dm("view=",function(view){return this.is("@view",view);
},false);
this.dm("location_in_client",function(){var event = this.n;if(this.ig('@location_in_client').r){return this.ig('@location_in_client');
}else{this.n;}event=this.__event__;;
return this.is("@location_in_client",this.const_get('Browser').const_get("Point").$new(event.clientX,event.clientY));
},false);
this.dm("location_in_view",function(view){var client = this.n,offset = this.n;offset=view.$render_context().$element().$element_offset();
client=this.$location_in_client();
return this.const_get('Browser').const_get("Point").$new(client.$x()['$-'](offset.$x()),client.$y()['$-'](offset.$y()));
},false);
this.dm("window",function(){return this.o(this.ig('@window'),function(){return this.is("@window",this.$view().$window());
});
},false);
return this.dm("changed_touches",function(){if(this.ig('@changed_touches').r){return this.ig('@changed_touches');
}else{this.n;}this.is("@changed_touches",[]);
var event = this.__event__;
      var changed = event.changedTouches;
      for (var i = 0; i < changed.length; i++) {
        this.ig('@changed_touches').push(this.const_get('Touch').$from_native(changed[i]));
      }return this.ig('@changed_touches');
},false);
},2);
},2);
this.const_get('Browser').const_get("Event").$include(this.const_get('CherryKit').const_get("EventAdditions"));
}),
    "lib/foundation/core/index_path.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"IndexPath",function(){this.dm("initialize",function(path){if(path['$is_a?'](this.const_get('Number')).r){return this.is("@path",[path]);
}else if(path['$is_a?'](this.const_get('Array')).r){return this.is("@path",path);
}else{return this.is("@path",[]);
}},false);
this.dm("length",function(){return this.ig('@path').$length();
},false);
return this.dm("[]",function(index){return this.ig('@path')['$[]'](index);
},false);
},0);
},2);
}),
    "lib/foundation/core/index_set.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"IndexSet",function(){this.$attr_reader(this.Y("length"));
this.dm("initialize",function(index){if (index == undefined) {
        index = this.n;
      }this.is("@length",0);
this.is("@ranges",[]);
if(index['$is_a?'](this.const_get('Number')).r){return this.$add_index(index);
}else if(index['$is_a?'](this.const_get('Range')).r){return this.$add_range(index);
}else{return this.n;}},false);
this.dm("add_index",function(index){this.$puts(["adding index ",index.$to_s()].join(''));
return this.$add_range(this.const_get('Range').$new(index,index['$+'](1),this.t));
},false);
this.dm("add_range",function(range){if(this.ig('@length')['$=='](0).r){this.is("@length",range.$length());
return this.is("@ranges",[range]);
}else{this.is("@length",this.ig('@length')['$+'](range.$length()));
return this.ig('@ranges')['$<<'](range);
}},false);
this.dm("include?",function(index){if(index['$is_a?'](this.const_get('Number')).r){return this['$include_index?'](index);
}else if(index['$is_a?'](this.const_get('Range')).r){return this['$include_range?'](index);
}else{return this.$raise(["Bad index given to Range","#include? ",index.$to_s()].join(''));
}},false);
this.dm("include_index?",function(index){var found_index = this.n;found_index=this.f;
this.ig('@ranges').$each(this.P(function(range){if(range['$include?'](index).r){return found_index=this.t;
}else{return this.n;}}));
return found_index;
},false);
return this.dm("dup",function(){return this;
},false);
},0);
},2);
}),
    "lib/foundation/core/notification.rb": (function(__FILE__){this.define_class(this.n,'Kernel',function(){return this.dm("notify",function(notification_name){return this.const_get('CherryKit').const_get("NotificationCenter").$default_center().$post_notification(vnH(this.Y("name"),notification_name,this.Y("sender"),this));
},false);
},2);
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"NotificationCenter",function(){this.dm("initialize",function(){return this.is("@dispatch_table",vnH());
},false);
this.dm("add_observer",function(observer,action,name,object){var observers = this.n;observers=(this.o(this.ig('@dispatch_table')['$[]'](object),function(){return this.ig('@dispatch_table')['$[]='](object,[]);
}));
observers['$<<'](vnH(this.Y("observer"),observer,this.Y("action"),action,this.Y("name"),name,this.Y("sender"),object));
return this;
},false);
this.dm("default_center",function(){return this.o(this.ig('@default_center'),function(){return this.is("@default_center",this.$new());
});
},true);
return this.dm("post_notification",function(options){var observers = this.n;observers=this.ig('@dispatch_table')['$[]'](options['$[]'](this.Y("sender")));
if(observers.r){observers.$each(this.P(function(observer){if(observer['$[]'](this.Y("name"))['$=='](options['$[]'](this.Y("name"))).r){return observer['$[]'](this.Y("observer")).$__send__(observer['$[]'](this.Y("action")),observer);
}else{return this.n;}}));
}else{this.n;}return this;
},false);
},0);
},2);
}),
    "lib/foundation/core/observable.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'Observable',function(){this.dm("will_change_attribute",function(attribute){if(this.ig('@__observer_info').r){return this.$__send_change_notifications(attribute.$to_s(),this.t,vnH(this.Y("kind"),this.Y("setting")));
}else{return this.n;}},false);
this.dm("did_change_attribute",function(attribute){if(this.ig('@__observer_info').r){return this.$__send_change_notifications(attribute.$to_s(),this.f,this.n);
}else{return this.n;}},false);
this.dm("observe",function(path){var __block__ = 
              (arguments[1] && arguments[1].info & this.TP)
              ? arguments[1] : this.n;var observer_info = this.n;path=path.$to_s();
this.o(this.ig('@__observer_info'),function(){return this.is("@__observer_info",vnH());
});
if(path.$index(".").r){this.const_get('ForwardingObserver').$new(this,path,__block__==this.n ? this.n : __block__.$to_proc());
}else{this.n;}this.$__replace_setter_for_key(path);
observer_info=this.ig('@__observer_info')['$[]'](path);
observer_info['$[]'](this.Y("observers"))['$<<'](__block__);
return __block__;
},false);
this.dm("__replace_setter_for_key",function(key){var observer_info = this.n,methods_to_replace = this.n;key=key.$to_s();
if(this.ig('@__observer_info')['$[]'](key).r){return this.n;
}else{this.n;}this.ig('@__observer_info')['$[]='](key,observer_info=vnH(this.Y("observers"),[],this.Y("change"),this.n,this.Y("dependants"),[]));
methods_to_replace=vnH([key.$to_s(),"="].join(''),this.$proc(this.P(function(key,original_method){return this.$proc(this.P(function(value){this.$will_change_attribute(key);
original_method.apply(this, [value]);return this.$did_change_attribute(key);
}));
})));
methods_to_replace.$each(this.P(function(method_id,implementation){var original = this.n;var js_id = this.mid2jsid(method_id.$to_s().toString());if(this['$respond_to?'](method_id).r){original=this[js_id];;
this[js_id] = implementation.apply(implementation.__self__, [key, original]);}else{return this.n;}}));
return this.$class().$lookup_affecting_keys_for(key).$each(this.P(function(affecting_key){this.$__replace_setter_for_key(affecting_key);
return this.ig('@__observer_info')['$[]'](affecting_key.$to_s())['$[]'](this.Y("dependants"))['$<<'](key);
}));
},false);
this.dm("__send_change_notifications",function(key,before,options){var new_value = this.n,old_value = this.n,changes = this.n;key=key.$to_s();
options=this.o(options,function(){return vnH();
});
if(before.r){this.ig('@__observer_info')['$[]'](key)['$[]'](this.Y("dependants")).$each(this.P(function(dependee){return this.$__send_change_notifications(dependee,this.t,vnH());
}));
old_value=this.$get_attribute(key);
return this.ig('@__observer_info')['$[]'](key)['$[]='](this.Y("change"),old_value);
}else{old_value=this.ig('@__observer_info')['$[]'](key)['$[]'](this.Y("change"));
new_value=this.$get_attribute(key);
changes=vnH();
changes['$[]='](this.Y("old"),old_value);
changes['$[]='](this.Y("new"),new_value);
changes['$[]='](this.Y("path"),key);
changes['$[]='](this.Y("object"),this);
this.ig('@__observer_info')['$[]'](key)['$[]'](this.Y("observers")).$each(this.P(function(block_callback){block_callback.apply(block_callback.__self__, [changes]);}));
return this.ig('@__observer_info')['$[]'](key)['$[]'](this.Y("dependants")).$each(this.P(function(dependee){return this.$__send_change_notifications(dependee,this.f,vnH());
}));
}},false);
return this.dm("remove_observer",function(observer,path){var observers = this.n;observers=this.ig('@__observer_info')['$[]'](path.$to_s())['$[]'](this.Y("observers"));
return observers.$delete(observer);
},false);
},2);
},2);
this.define_class(this.n,"ForwardingObserver",function(){return this.dm("initialize",function(object,path,action){var index = this.n;this.is("@object",object);
this.is("@path",path);
this.is("@action",action);
index=path.$index(".");
if(!index.r){this.$raise("ForwardingObserver must be given a multipart attr string");
}else{this.n;}this.is("@first_part",path.$slice(0,index));
this.is("@second_part",path.$slice(index['$+'](1),path.$length()['$-'](index)));
this.is("@observer",object.$observe(this.ig('@first_part'),this.P(function(changes){action.__fun__(changes);})));
this.is("@value",object.$get_attribute(this.ig('@first_part')));
return this.ig('@value').$observe(this.ig('@second_part'),this.P(function(changes){var dict = this.n;dict=vnH(this.Y("new"),changes['$[]'](this.Y("new")),this.Y("old"),changes['$[]'](this.Y("old")),this.Y("path"),[this.ig('@first_part').$to_s(),".",changes['$[]'](this.Y("path")).$to_s()].join(''),this.Y("object"),object);
this.ig('@observer').__fun__(dict);}));
},false);
},0);
this.define_class(this.n,"Object",function(){this.dm("keys_affecting",function(affectors){this.o(this.ig('@__kvo_affecting_keys'),function(){return this.is("@__kvo_affecting_keys",vnH());
});
return affectors.$each(this.P(function(key_name,affecting_keys){return this.ig('@__kvo_affecting_keys')['$[]='](key_name.$to_s(),affecting_keys);
}));
},true);
return this.dm("lookup_affecting_keys_for",function(key_name){key_name=key_name.$to_s();
this.o(this.ig('@__kvo_affecting_keys'),function(){return this.is("@__kvo_affecting_keys",vnH());
});
if(this.ig('@__kvo_affecting_keys')['$[]'](key_name).r){return this.ig('@__kvo_affecting_keys')['$[]'](key_name);
}else{return this.ig('@__kvo_affecting_keys')['$[]='](key_name,[]);
}},true);
},0);
this.const_get('Object').$include(this.const_get('CherryKit').const_get("Observable"));
this.$require("foundation/core/observable_array");
}),
    "lib/foundation/core/observable_array.rb": (function(__FILE__){this.define_class(this.n,"Array",function(){},0);
}),
    "lib/foundation/core/responder.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"Responder",function(){this.$attr_accessor(this.Y("next_responder"));
this.dm("first_responder?",function(){return this.f;
},false);
this.dm("accepts_first_responder?",function(){return this.f;
},false);
this.dm("mouse_down",function(event){return this.ig('@next_responder').$mouse_down(event);
},false);
this.dm("touches_began",function(touches,event){return this.$puts("in responder with touches_began!");
},false);
this.dm("touches_ended",function(touches,event){return this.n;},false);
this.dm("touches_moved",function(touches,event){return this.n;},false);
return this.dm("touched_cancelled",function(touches,event){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/core/run_loop.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"RunLoop",function(){this.dm("run",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}var res = this.n,run_loop = this.n;run_loop=this.$current_run_loop();
res=__block__.apply(__block__.__self__);;
this.ig('@current_run_loop').$flush_queue();
this.is("@current_run_loop",this.n);
return res;
},true);
this.dm("current_run_loop",function(){return this.o(this.ig('@current_run_loop'),function(){return this.is("@current_run_loop",this.$new());
});
},true);
this.dm("initialize",function(){this.is("@tasks_to_perform",vnH());
return this.is("@ordered_tasks",[]);
},false);
this.dm("add_task",function(target,action){var object_tasks = this.n;object_tasks=(this.o(this.ig('@tasks_to_perform')['$[]'](target),function(){return this.ig('@tasks_to_perform')['$[]='](target,[]);
}));
if(!object_tasks['$include?'](action).r){object_tasks['$<<'](action);
this.ig('@ordered_tasks').$unshift([target,action]);
}else{this.n;}return this;
},false);
return this.dm("flush_queue",function(){var task = this.n;while ((task=this.ig('@ordered_tasks').$pop()).r){task['$[]'](0).$__send__(task['$[]'](1));
}return this.is("@tasks_to_perform",vnH());
},false);
},0);
},2);
}),
    "lib/foundation/core/touch.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"Touch",function(){this.$attr_accessor(this.Y("event"));
this.$attr_accessor(this.Y("view"));
this.$attr_writer(this.Y("window"));
this.dm("from_native",function(native_touch_object){var result = this.$allocate();
      result.__touch__ = native_touch_object;
      result.__identifier__ = native_touch_object.identifier;
      var target = native_touch_object.target;
      //console.log("original target:");
      //console.log(target.className);
      while (target) {
        if (!target.id) {
          target = target.parentNode; 
        } else {
          break;
        }
      }
      
      //target.style.webkitTransform = "translate3d(0px, 0px, 0px)";
      
      result.__target__ = target;
      
      result.__pageX__ = native_touch_object.pageX;
      result.__pageY__ = native_touch_object.pageY;
            
      return result;},true);
this.dm("identifier",function(){return this.__identifier__;},false);
this.dm("view",function(){var element = this.n;if(this.ig('@view').r){return this.ig('@view');
}else{this.n;}element=this.__target__;
return this.is("@view",this.const_get('CherryKit').const_get("View")['$[]'](element.id));
},false);
this.dm("window",function(){return this.is("@window",this.$view().$window());
},false);
this.dm("location_in_client",function(){if(this.ig('@location_in_client').r){return this.ig('@location_in_client');
}else{this.n;}return this.is("@location_in_client",this.const_get('Browser').const_get("Point").$new(this.__touch__.pageX,this.__touch__.pageY));
},false);
this.dm("location_in_view",function(view){var client = this.n,offset = this.n;offset=view.$render_context().$element().$element_offset();
client=this.$location_in_client();
return this.const_get('Browser').const_get("Point").$new(client.$x()['$-'](offset.$x()),client.$y()['$-'](offset.$y()));
},false);
return this.dm("location_in_window",function(window){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/gestures/gesture_recognizer.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"GestureRecognizer",function(){return this.dm("initialize",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}return this.is("@action",__block__);
},false);
},0);
},2);
}),
    "lib/foundation/rendering/render_context.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"RenderContext",function(){this.dm("initialize",function(tag_name){return this.is("@element",this.const_get('Browser').const_get("Element").$new(tag_name));
},false);
this.dm("add_class_name",function(class_name){if(this.ig('@element').$class_name()['$==']("").r){return this.ig('@element')['$class_name='](class_name);
}else{return this.ig('@element')['$class_name=']([this.ig('@element').$class_name(),class_name].$join(" "));
}},false);
this.dm("id=",function(id){this.ig('@element')['$id='](id);
return this;
},false);
this.dm("class_name=",function(class_name){this.ig('@element')['$class_name='](class_name);
return this;
},false);
this.dm("<<",function(string){this.ig('@element').__element__.innerHTML += string;},false);
this.dm("label",function(){if (arguments.length > 0 && arguments[0].info & this.TP) {  var __block__ = arguments[0];}var label_context = this.n;label_context=this.const_get('RenderContext').$new(this.Y("label"));
__block__.__fun__(label_context);return this.ig('@element')['$<<'](label_context.$element());
},false);
this.dm("set_class_names",function(class_names){var current = this.n;current=this.ig('@element').$class_name().$split(" ");
class_names.$each(this.P(function(class_name,flag){if(current['$include?'](class_name.$to_s()).r){if(!flag.r){return current.$delete(class_name);
}else{return this.n;}}else{if(flag.r){return current['$<<'](class_name);
}else{return this.n;}}}));
return this.ig('@element')['$class_name='](current.$join(" "));
},false);
this.dm("css",function(styles){return this.ig('@element').$css(styles);
},false);
return this.dm("element",function(){return this.ig('@element');
},false);
},0);
},2);
}),
    "lib/foundation/rendering/renderer.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"Renderer",function(){this.dm("initialize",function(view,theme){this.is("@view",view);
this.is("@theme",theme);
return this.is("@class_names",[]);
},false);
this.dm("element",function(){return this.ig('@element');
},false);
this.dm("render",function(render_context){return this.n;},false);
this.dm("update",function(){return this.n;},false);
this.dm("theme_attribute",function(attribute_name,values){return this.n;},true);
return this.dm("theme_attribute_for",function(name,second){if (!second) second = this.n;if(second.r){return this.$__send__(["theme_attribute_for_",name.$to_s(),"_",second.$to_s()].join(''));
}else{return this.$__send__(["theme_attribute_for_",name.$to_s()].join(''));
}},false);
},0);
},2);
}),
    "lib/foundation/rendering/root_theme/button.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"RootTheme",function(){return this.define_class(this.const_get('Control'),"Button",function(){this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return this.$render_contents(render_context);
},false);
this.dm("render_contents",function(render_context){return render_context.$label(this.P(function(label){label['$class_name=']("label");
return label['$<<'](this.ig('@view').$title());
}));
},false);
this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.$update_contents();
},false);
return this.dm("update_contents",function(){var label = this.n;label=this.$element().$find(".label");
return label['$text='](this.ig('@view').$title());
},false);
},0);
},0);
},2);
}),
    "lib/foundation/rendering/root_theme/control.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/view");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"RootTheme",function(){return this.define_class(this.const_get('View'),"Control",function(){this.$theme_attribute(this.Y("control_size"),vnH(this.Y("mini"),15,this.Y("small"),18,this.Y("regular"),22,this.Y("large"),25));
this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return render_context.$add_class_name(this.ig('@view').$control_size().$to_s());
},false);
this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.$element().$set_class_names(this.$calculate_class_names());
},false);
return this.dm("calculate_class_names",function(){return vnH("disabled",this.ig('@view')['$enabled?']()['$!'](),"selected",this.ig('@view')['$selected?'](),"highlighted",this.ig('@view')['$highlighted?']());
},false);
},0);
},0);
},2);
}),
    "lib/foundation/rendering/root_theme/label.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'RootTheme',function(){return this.define_class(this.const_get('Control'),"Label",function(){this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return this.$render_label(render_context);
},false);
this.dm("render_label",function(render_context){return render_context['$<<']("<span class='title'></span>");
},false);
return this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.ig('@element').$find(".title")['$text='](this.ig('@view').$title());
},false);
},0);
},2);
},2);
}),
    "lib/foundation/rendering/root_theme/scroller.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'RootTheme',function(){return this.define_class(this.const_get('Control'),"Scroller",function(){this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return this.$render_scroller(render_context);
},false);
this.dm("render_scroller",function(render_context){return this.n;},false);
return this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.ig('@element').$set_class_names(vnH("horizontal",this.ig('@view')['$vertical?']()['$!'](),"vertical",this.ig('@view')['$vertical?']()));
},false);
},0);
},2);
},2);
}),
    "lib/foundation/rendering/root_theme/slider.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'RootTheme',function(){return this.define_class(this.const_get('Control'),"Slider",function(){this.$theme_attribute(this.Y("track_indent"),vnH(this.Y("small"),5,this.Y("regular"),7,this.Y("large"),9));
this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return this.$render_slider(render_context);
},false);
this.dm("render_slider",function(render_context){return render_context['$<<'](["<span class='inner'>","<span class='left'></span>","<span class='middle'></span>","<span class='right'></span>","<span class='handle' style='left:50%'></span>","</span>"].$join(""));
},false);
return this.dm("update",function(){var e = this.n;this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
e=this.ig('@element').$find(".handle");
return this.ig('@element').$find(".handle").$css(vnH(this.Y("left"),[this.ig('@view').$value().$to_s(),"%"].join('')));
},false);
},0);
},2);
},2);
}),
    "lib/foundation/rendering/root_theme/table_view.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'RootTheme',function(){return this.define_class(this.const_get('Control'),"TableView",function(){this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
this.is("@row_elements",[]);
this.is("@column_elements",[]);
return this.$render_rows_and_columns(render_context);
},false);
this.dm("render_rows_and_columns",function(render_context){return render_context['$<<']("<div class='rows'></div><div class='columns'></div>");
},false);
this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.$update_rows_and_columns();
},false);
return this.dm("update_rows_and_columns",function(){var new_rows = this.n,delta_rows = this.n,old_rows = this.n;old_rows=this.ig('@row_elements').$length();
new_rows=this.ig('@view').$number_of_rows();
delta_rows=new_rows['$-'](old_rows);
if(delta_rows['$>'](0).r){delta_rows.$times(this.P(function(row){return this.ig('@row_elements')['$<<'](this.ig('@element').$find(".rows").$div(vnH(this.Y("class_name"),"row")));
}));
}else if(delta_rows['$<'](0).r){this.$puts("need to remove extra divs?");
}else{this.n;}return this.ig('@row_elements').$each_with_index(this.P(function(row,index){var rect = this.n;rect=this.ig('@view').$rect_of_row(index);
row.$css(vnH(this.Y("left"),[rect.$x().$to_s(),"px"].join(''),this.Y("top"),[rect.$y().$to_s(),"px"].join(''),this.Y("height"),[rect.$height().$to_s(),"px"].join(''),this.Y("right"),"0px"));
return row.$set_class_names(vnH("selected",this.ig('@view')['$row_selected?'](index)));
}));
},false);
},0);
},2);
},2);
}),
    "lib/foundation/rendering/root_theme/text_field.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,'RootTheme',function(){return this.define_class(this.const_get('Control'),"TextField",function(){this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return this.$render_inner(render_context);
},false);
this.dm("render_inner",function(render_context){return render_context['$<<']("<span class='border'></span><span class='padding'><input type='text' class='field'></span>");
},false);
return this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.ig('@element').$set_class_names(vnH(this.ig('@view').$bezel().$to_s(),this.t));
},false);
},0);
},2);
},2);
}),
    "lib/foundation/rendering/root_theme/view.rb": (function(__FILE__){this.$require("foundation/rendering/root_theme");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"RootTheme",function(){return this.define_class(this.const_get('Renderer'),"View",function(){this.dm("render",function(render_context){var view_id = this.n;this.is("@element",render_context.$element());
view_id=["ck-view-",this.ig('@view').$object_id().$to_s()].join('');
render_context['$id='](view_id);
this.const_get('CherryKit').const_get("View")['$[]='](view_id,this.ig('@view'));
render_context.$add_class_name(this.ig('@view').$class().$all_class_names().$join(" "));
return render_context.$css(this.$calculate_layout_style());
},false);
this.dm("calculate_class_names",function(){return vnH("hidden",this.ig('@view')['$visible?']()['$!'](),"focus",this.ig('@view')['$first_responder?']());
},false);
return this.dm("calculate_layout_style",function(){var res = this.n,layout = this.n;layout=this.ig('@view').$layout();
res=vnH();
if(layout['$[]'](this.Y("left")).r){res['$[]='](this.Y("left"),[layout['$[]'](this.Y("left")).$to_s(),"px"].join(''));
}else{this.n;}if(layout['$[]'](this.Y("right")).r){res['$[]='](this.Y("right"),[layout['$[]'](this.Y("right")).$to_s(),"px"].join(''));
}else{this.n;}if(layout['$[]'](this.Y("top")).r){res['$[]='](this.Y("top"),[layout['$[]'](this.Y("top")).$to_s(),"px"].join(''));
}else{this.n;}if(layout['$[]'](this.Y("bottom")).r){res['$[]='](this.Y("bottom"),[layout['$[]'](this.Y("bottom")).$to_s(),"px"].join(''));
}else{this.n;}if(layout['$[]'](this.Y("width")).r){res['$[]='](this.Y("width"),[layout['$[]'](this.Y("width")).$to_s(),"px"].join(''));
}else{this.n;}if(layout['$[]'](this.Y("height")).r){res['$[]='](this.Y("height"),[layout['$[]'](this.Y("height")).$to_s(),"px"].join(''));
}else{this.n;}return res;
},false);
},0);
},0);
},2);
}),
    "lib/foundation/rendering/root_theme.rb": (function(__FILE__){this.$require("foundation/rendering/theme");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Theme'),"RootTheme",function(){this.dm("view",function(view){return this.const_get('RootTheme').const_get("View").$new(view,this);
},true);
this.dm("button",function(view){return this.const_get('RootTheme').const_get("Button").$new(view,this);
},true);
this.dm("control",function(view){return this.const_get('RootTheme').const_get("Control").$new(view,this);
},true);
this.dm("slider",function(view){return this.const_get('RootTheme').const_get("Slider").$new(view,this);
},true);
this.dm("scroller",function(view){return this.const_get('RootTheme').const_get("Scroller").$new(view,this);
},true);
this.dm("label",function(view){return this.const_get('RootTheme').const_get("Label").$new(view,this);
},true);
this.dm("table_view",function(view){return this.const_get('RootTheme').const_get("TableView").$new(view,this);
},true);
return this.dm("text_field",function(view){return this.const_get('RootTheme').const_get("TextField").$new(view,this);
},true);
},0);
},2);
}),
    "lib/foundation/rendering/theme.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.n,"Theme",function(){return this.dm("find_theme",function(theme_name){return this.const_get('RootTheme');
},true);
},0);
},2);
}),
    "lib/foundation/table_view/cell.rb": (function(__FILE__){this.$require("foundation/views/view");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('View'),"TableViewCell",function(){this.$class_names("ck-table-view-cell");
return this.dm("initialize",function(style,reuse_identifier){return this.opal_super(arguments.callee, [vnH()]);
},false);
},0);
},2);
}),
    "lib/foundation/table_view/table.rb": (function(__FILE__){this.$require("foundation/views/scroll");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('ScrollView'),"TableView",function(){this.$class_names("ck-table-view");
this.dm("initialize",function(layout,style){this.opal_super(arguments.callee, [layout]);
this.is("@style",this.Y("plain"));
this.is("@row_height",44);
return this['$has_horizontal_scroller='](this.f);
},false);
this.dm("data_source=",function(data_source){var required = this.n;if(this.ig('@data_source')['$=='](data_source).r){return this.n;
}else{this.n;}required=[this.Y("table_view_number_of_rows_in_section"),this.Y("table_view_cell_for_row_at_index_path")];
required.$each(this.P(function(method){if(!data_source['$respond_to?'](method).r){return this.$raise(["TableView: delegate does not respond to '",method.$to_s(),"'"].join(''));
}else{return this.n;}}));
this.is("@data_source",data_source);
return this.$reload_data();
},false);
this.dm("reload_data",function(){this.is("@reload_all_data",this.t);
this.is("@number_of_sections",this.n);
this.is("@number_of_rows_in_section",[]);
this.$number_of_sections();
this.$puts(["our table view has ",this.$number_of_sections().$to_s()," sections"].join(''));
return this['$needs_display='](this.t);
},false);
this.dm("update",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.$_update_table_render();
},false);
this.dm("_update_table_render",function(){if(this.ig('@reload_all_data').r){this.$number_of_sections().$times(this.P(function(section){return this.$_render_section(section);
}));
return this.is("@reload_all_data",this.f);
}else{}},false);
this.dm("_render_section",function(section){var rows = this.n;this.$puts(["need to render section ",section.$to_s()].join(''));
rows=this.$number_of_rows_in_section(section);
this.$puts(["need to render ",rows.$to_s()," row(s)"].join(''));
return rows.$times(this.P(function(row){var view = this.n,path = this.n;path=this.const_get('IndexPath').$new([section,row]);
view=this.ig('@data_source').$table_view_cell_for_row_at_index_path(this,path);
this.$puts(["view for ",row.$to_s()," is ",view.$to_s()].join(''));
if(!view.$superview()['$=='](this).r){return this.$add_subview(view);
}else{return this.n;}}));
},false);
this.dm("rect_for_section",function(section){var rect = this.n;if(this.ig('@rect_for_section')['$[]'](section).r){return this.ig('@rect_for_section')['$[]'](section);
}else{this.n;}rect=this.const_get('Browser').const_get("Rect").$new(0,0,0,0);
return rect;
},false);
this.dm("rect_for_row_at_index_path",function(index_path){return this.n;},false);
this.dm("rect_for_header_in_section",function(section){return this.const_get('Browser').const_get("Rect").$new(0,0,0,0);
},false);
this.dm("rect_for_footer_in_section",function(section){return this.const_get('Browser').const_get("Rect").$new(0,0,0,0);
},false);
this.dm("number_of_sections",function(){var num = this.n;if(this.ig('@number_of_sections').r){return this.ig('@number_of_sections');
}else{this.n;}if(this.ig('@data_source')['$respond_to?'](this.Y("number_of_sections_in_table_view")).r){num=this.ig('@data_source').$number_of_sections_in_table_view(this);
}else{num=1;
}return this.is("@number_of_sections",num);
},false);
this.dm("number_of_rows_in_section",function(section){var rows = this.n;if(this.ig('@number_of_rows_in_section')['$[]'](section).r){this.ig('@number_of_rows_in_section')['$[]'](section);
}else{this.n;}rows=this.ig('@data_source').$table_view_number_of_rows_in_section(this,section);
return this.ig('@number_of_rows_in_section')['$[]='](section,rows);
},false);
return this.dm("dequeue_reusable_cell_with_identifier",function(identifier){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/views/button.rb": (function(__FILE__){this.$require("foundation/views/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Control'),"Button",function(){this.$register_builder(this.Y("button"),vnH(this.Y("title"),"Button"));
this.$display_attributes(this.Y("title"));
this.$class_names("ck-button");
this.$attr_accessor(this.Y("value"));
this.$attr_accessor(this.Y("title"));
this.dm("initialize",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.is("@title","Button!");
},false);
this.dm("create_renderer",function(theme){return theme.$button(this);
},false);
this.dm("start_tracking?",function(location){return this['$highlighted='](this.t);
},false);
return this.dm("stop_tracking",function(location){this.$puts("button stop tracking");
return this['$highlighted='](this.f);
},false);
},0);
},2);
}),
    "lib/foundation/views/checkbox.rb": (function(__FILE__){}),
    "lib/foundation/views/clip.rb": (function(__FILE__){this.$require("foundation/views/view");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('View'),"ClipView",function(){this.$class_names("ck-clip-view");
this.$attr_reader(this.Y("document_view"));
return this.dm("document_view=",function(document_view){if(this.ig('@document_view')['$=='](document_view).r){return this.n;
}else{this.n;}this.is("@document_view",document_view);
return this['$<<'](document_view);
},false);
},0);
},2);
}),
    "lib/foundation/views/control.rb": (function(__FILE__){this.$require("foundation/views/view");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('View'),"Control",function(){this.$display_attributes(this.Y("enabled"),this.Y("selected"),this.Y("highlighted"),this.Y("control_size"));
this.$attr_writer(this.Y("enabled"),this.Y("highlighted"),this.Y("selected"));
this.$attr_accessor(this.Y("value"));
this.$attr_accessor(this.Y("control_size"));
this.dm("highlighted?",function(){return this.ig('@highlighted');
},false);
this.dm("enabled?",function(){return this.ig('@enabled');
},false);
this.dm("selected?",function(){return this.ig('@selected');
},false);
this.dm("initialize",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
this.is("@selected",this.f);
this.is("@highlighted",this.f);
this.is("@control_size",this.Y("regular"));
return this.is("@enabled",this.t);
},false);
this.dm("dup",function(){var result = this.n;result=this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
result['$enabled='](this['$enabled?']());
return result;
},false);
this.dm("mouse_down",function(event){if(!this['$enabled?']().r){return this.n;
}else{this.n;}return this.$track_mouse(event);
},false);
this.dm("track_mouse",function(event){return this.const_get('CKApp').$handle_events([this.Y("mouse_up"),this.Y("mouse_dragged")],this.P(function(event){var location = this.n,within_frame = this.n,type = this.n;type=event.$type();
location=event.$location_in_view(this);
within_frame=this.$bounds()['$contains_point?'](location);
this.$puts(["within frame: ",location.$x().$to_s(),", ",location.$y().$to_s()].join(''));
this.$puts([this.$bounds().$x().$to_s(),", ",this.$bounds().$y().$to_s(),", ",this.$bounds().$width().$to_s(),", ",this.$bounds().$height().$to_s()].join(''));
this.$puts(["witjing frame.....? ",within_frame.$to_s()].join(''));
if(type['$=='](this.Y("mouse_down")).r){this['$start_tracking?'](location);
}else if(type['$=='](this.Y("mouse_up")).r){this.$stop_tracking(location);
this.const_get('CKApp').$finish_handling_events();
}else if(this.o(type['$=='](this.Y("mouse_moved")),function(){return type['$=='](this.Y("mouse_dragged"));
}).r){if(within_frame.r){if(this.ig('@tracking_was_within_frame')['$!']().r){this['$start_tracking?'](location);
}else{this['$continue_tracking?'](location);
}}else{this.$stop_tracking(location,this.f);
}}else{this.n;}return this.is("@tracking_was_within_frame",within_frame);
}));
},false);
this.dm("start_tracking?",function(location){return this.n;},false);
this.dm("stop_tracking",function(location,mouse_up){return this.n;},false);
this.dm("continue_tracking?",function(location){return this.n;},false);
this.dm("touches_began",function(touches,event){var location = this.n,touch = this.n;touch=touches['$[]'](0);
location=touch.$location_in_view(this);
return this['$begin_tracking_with_touch?'](touch,event);
},false);
this.dm("touches_ended",function(touches,event){var location = this.n,touch = this.n;touch=touches['$[]'](0);
location=touch.$location_in_view(this);
return this.$end_tracking_with_touch(touch,event);
},false);
this.dm("touches_moved",function(touches,event){var location = this.n,touch = this.n;touch=touches['$[]'](0);
location=touch.$location_in_view(this);
return this['$continue_tracking_with_touch?'](touch,event);
},false);
this.dm("begin_tracking_with_touch?",function(touch,event){return this['$start_tracking?'](touch.$location_in_view(this));
},false);
this.dm("continue_tracking_with_touch?",function(touch,event){return this['$continue_tracking?'](touch.$location_in_view(this));
},false);
this.dm("end_tracking_with_touch",function(touch,event){return this.$stop_tracking(touch.$location_in_view(this));
},false);
return this.dm("cancel_tracking_with_event",function(event){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/views/label.rb": (function(__FILE__){this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Control'),"Label",function(){this.$class_names("ck-label");
this.$display_attributes(this.Y("title"));
this.$attr_accessor(this.Y("title"));
this.dm("initialize",function(layout){this.opal_super(arguments.callee, [layout]);
return this.is("@title","Label");
},false);
this.dm("value=",function(value){return this['$title='](value);
},false);
this.dm("create_renderer",function(theme){return theme.$label(this);
},false);
return this.dm("mouse_down",function(event){return this.ig('@next_responder').$mouse_down(event);
},false);
},0);
},2);
}),
    "lib/foundation/views/scroll.rb": (function(__FILE__){this.$require("foundation/views/view");
this.define_class(this.n,'CherryKit',function(){this.define_class(this.const_get('View'),"ScrollView",function(){this.$class_names("ck-scroll-view");
this.$attr_reader(this.Y("vertical_scroller"));
this.$attr_reader(this.Y("horizontal_scroller"));
this.$attr_accessor(this.Y("content_size"));
this.$attr_accessor(this.Y("content_view"));
this.$attr_accessor(this.Y("zoom_scale"));
this.dm("initialize",function(layout){this.opal_super(arguments.callee, [layout]);
this['$content_view='](this.const_get('ClipView').$new(layout));
this['$<<'](this.$content_view());
this['$has_vertical_scroller='](this.t);
this['$has_horizontal_scroller='](this.t);
this['$document_view='](this.const_get('TestScrollingClass').$new(layout));
this.$document_view()['$layout='](vnH(this.Y("left"),0,this.Y("top"),0,this.Y("width"),700,this.Y("height"),700));
this.is("@content_offset",this.const_get('Browser').const_get("Point").$new(0,0));
this.is("@zoom_scale",1.0);
this.is("@multiple_touch_enabled",this.t);
return this.$tile();
},false);
this.dm("document_view",function(){return this.ig('@content_view').$document_view();
},false);
this.dm("document_view=",function(document_view){this.ig('@content_view')['$document_view='](document_view);
return this.$tile();
},false);
this.dm("has_vertical_scroller=",function(flag){if(this.ig('@has_vertical_scroller')['$=='](flag).r){return this.n;
}else{this.n;}this.is("@has_vertical_scroller",flag);
if(this.a(this.a(flag,function(){return this.const_get('Browser')['$touch?']()['$!']();
}),function(){return this.ig('@vertical_scroller')['$!']();
}).r){this['$vertical_scroller='](this.const_get('Scroller').$build(vnH(this.Y("vertical"),this.t)));
}else{this.n;}return this.$tile();
},false);
this.dm("capture_touches?",function(){return this.t;
},false);
this.dm("vertical_scroller=",function(scroller){this.is("@vertical_scroller",scroller);
this['$<<'](scroller);
return this.$tile();
},false);
this.dm("has_horizontal_scroller=",function(flag){return this.f;
},false);
this.dm("touches_began",function(touches,event){var location = this.n,content_offset = this.n,touch = this.n;touch=touches['$[]'](0);
content_offset=this.ig('@content_offset');
location=touch.$location_in_view(this);
this.is("@touch_last_offset",location);
this.is("@tracking",this.t);
return this.is("@dragging",this.f);
},false);
this.dm("touches_moved",function(touches,event){var location = this.n,offset_x = this.n,content_offset = this.n,offset_y = this.n,delta_x = this.n,delta_y = this.n,touch = this.n;touch=touches['$[]'](0);
location=touch.$location_in_view(this);
delta_x=this.ig('@touch_last_offset').$x()['$-'](location.$x());
delta_y=this.ig('@touch_last_offset').$y()['$-'](location.$y());
if(this.t.r){this.ig('@touch_last_offset')['$x='](location.$x());
}else{this.n;}if(this.t.r){this.ig('@touch_last_offset')['$y='](location.$y());
}else{this.n;}content_offset=this.ig('@content_offset');
offset_x=content_offset.$x()['$-'](delta_x);
offset_y=content_offset.$y()['$-'](delta_y);
this.$set_content_offset(this.const_get('Browser').const_get("Point").$new(offset_x,offset_y),this.f);
return this.f;
},false);
this.dm("touches_ended",function(touches,event){return this.$puts([this.$to_s(),"#touches_ended"].join(''));
},false);
this.dm("content_offset=",function(content_offset){return this.$set_content_offset(content_offset,this.f);
},false);
this.dm("set_content_offset",function(offset,animated){var class_name = this.n,transform = this.n,offset_x = this.n,offset_y = this.n,element = this.n;element=this.$document_view().$render_context().$element().__element__;
this.is("@content_offset",offset);
offset_x=[offset.$x().$to_s(),"px"].join('');
offset_y=[offset.$y().$to_s(),"px"].join('');
transform=["translate3d(",offset_x.$to_s(),", ",offset_y.$to_s(),", 0px)"].join('');
class_name=element.className;
this.$puts(["setting transform to ",transform.$to_s()," for ",class_name.$to_s()].join(''));
element.style.webkitTransform = transform;return this.$puts(element.style.webkitTransform);
},false);
this.dm("tile",function(){var layout = this.n,vertical = this.n,horizontal = this.n,touch = this.n;touch=this.const_get('Browser')['$touch?']();
vertical=this.ig('@vertical_scroller');
horizontal=this.ig('@horizontal_scroller');
layout=vnH(this.Y("left"),0,this.Y("top"),0);
if(vertical.r){vertical['$layout='](vnH(this.Y("width"),20,this.Y("top"),0,this.Y("right"),0,this.Y("bottom"),0));
layout['$[]='](this.Y("right"),20);
}else{layout['$[]='](this.Y("right"),0);
}if(horizontal.r){horizontal['$layout='](vnH(this.Y("height"),20,this.Y("left"),0,this.Y("right"),0,this.Y("bottom"),0));
layout['$[]='](this.Y("bottom"),20);
}else{layout['$[]='](this.Y("bottom"),0);
}return this.ig('@content_view')['$layout='](layout);
},false);
return this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
if(this.const_get('Browser')['$touch?']().r){return render_context['$<<']("<div class='vertical'><div class='scroller'></div></div><div class='horizontal'><div class='scroller'></div></div>");
}else{}},false);
},0);
return this.define_class(this.const_get('View'),"TestScrollingClass",function(){this.$class_names("test-scrolling");
this.dm("render",function(render_context){this.opal_super(arguments.callee, [render_context]);
return render_context['$<<'](["<div class='tl'></div>","<div class='tr'></div>","<div class='bl'></div>","<div class='br'></div>"].$join(""));
},false);
return this.dm("update",function(){return this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
},false);
},0);
},2);
}),
    "lib/foundation/views/scroll_view_desktop.rb": (function(__FILE__){this.$require("foundation/views/view");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('View'),"ScrollViewDesktop",function(){this.$register_builder(this.Y("scroll_view"),vnH());
this.$class_names("ck-scroll-view");
this.$attr_accessor(this.Y("vertical_scroller"),this.Y("horizontal_scroller"));
this.dm("initialize",function(layout){this.opal_super(arguments.callee, [layout]);
this.is("@content_view",this.const_get('ClipView').$new());
this['$<<'](this.ig('@content_view'));
this.is("@header_clip_view",this.const_get('ClipView').$new());
this['$<<'](this.ig('@header_clip_view'));
this['$has_vertical_scroller='](this.t);
return this['$has_horizontal_scroller='](this.t);
},false);
this.dm("document_view",function(){return this.ig('@content_view').$document_view();
},false);
this.dm("document_view=",function(document_view){this.ig('@content_view')['$document_view='](document_view);
return this.$reflect_scrolled_clip_view(this.ig('@content_view'));
},false);
this.dm("reflect_scrolled_clip_view",function(clip_view){var document_view = this.n;if(!this.ig('@content_view')['$=='](clip_view).r){return this.n;
}else{this.n;}document_view=this.$document_view();
this.ig('@content_view')['$layout='](vnH(this.Y("left"),0,this.Y("top"),20,this.Y("bottom"),16,this.Y("right"),16));
this.ig('@header_clip_view')['$layout='](vnH(this.Y("left"),0,this.Y("top"),0,this.Y("right"),16,this.Y("height"),20));
if(this.ig('@vertical_scroller').r){this.ig('@vertical_scroller')['$layout='](vnH(this.Y("right"),0,this.Y("top"),20,this.Y("bottom"),16,this.Y("width"),16));
}else{this.n;}if(this.ig('@horizontal_scroller').r){return this.ig('@horizontal_scroller')['$layout='](vnH(this.Y("left"),0,this.Y("bottom"),0,this.Y("right"),16,this.Y("height"),16));
}else{return this.n;}},false);
this.dm("has_vertical_scroller=",function(flag){if(this.ig('@has_vertical_scroller')['$=='](flag).r){return this.n;
}else{this.n;}this.is("@has_vertical_scroller",flag);
if(this.a(flag,function(){return this.ig('@vertical_scroller')['$!']();
}).r){this['$vertical_scroller='](this.const_get('Scroller').$build(vnH(this.Y("vertical"),this.t)));
}else{this.n;}return this.$reflect_scrolled_clip_view(this.ig('@content_view'));
},false);
this.dm("has_horizontal_scroller=",function(flag){if(this.ig('@has_horizontal_scroller')['$=='](flag).r){return this.n;
}else{this.n;}this.is("@has_horizontal_scroller",flag);
if(this.a(flag,function(){return this.ig('@horizontal_scroller')['$!']();
}).r){return this['$horizontal_scroller='](this.const_get('Scroller').$new());
}else{return this.n;}},false);
this.dm("vertical_scroller=",function(vertical_scroller){this.is("@vertical_scroller",vertical_scroller);
this['$<<'](vertical_scroller);
return this.$reflect_scrolled_clip_view(this.ig('@clip_view'));
},false);
return this.dm("horizontal_scroller=",function(horizontal_scroller){this.is("@horizontal_scroller",horizontal_scroller);
this['$<<'](horizontal_scroller);
return this.$reflect_scrolled_clip_view(this.ig('@clip_view'));
},false);
},0);
},2);
}),
    "lib/foundation/views/scroller.rb": (function(__FILE__){this.$require("foundation/views/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Control'),"Scroller",function(){this.$class_names("ck-scroller");
this.$attr_writer(this.Y("vertical"));
this.dm("initialize",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
return this.is("@vertical",this.f);
},false);
this.dm("create_renderer",function(theme){return theme.$scroller(this);
},false);
this.dm("vertical?",function(){return this.ig('@vertical');
},false);
return this.dm("horizontal?",function(){return this.ig('@vertical')['$!']();
},false);
},0);
},2);
}),
    "lib/foundation/views/slider.rb": (function(__FILE__){this.$require("foundation/views/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Control'),"Slider",function(){this.$register_builder(this.Y("slider"),vnH());
this.$class_names("ck-slider");
this.$display_attributes(this.Y("value"),this.Y("min"),this.Y("max"));
this.$attr_accessor(this.Y("value"),this.Y("min"),this.Y("max"));
this.dm("initialize",function(){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
this.is("@value",0);
this.is("@min",0);
return this.is("@max",100);
},false);
this.dm("create_renderer",function(theme){return theme.$slider(this);
},false);
this.dm("value_for_location",function(location){var x = this.n,width = this.n;width=this.$bounds().$width()['$-'](14);
x=location.$x()['$-'](7);
return (x['$/'](width))['$*'](100);
},false);
this.dm("start_tracking?",function(location){this['$value='](this.$value_for_location(location));
return this['$highlighted='](this.t);
},false);
this.dm("stop_tracking",function(location){this['$value='](this.$value_for_location(location));
return this['$highlighted='](this.f);
},false);
this.dm("continue_tracking?",function(location){return this['$value='](this.$value_for_location(location));
},false);
return this.dm("value=",function(value){if(value['$<'](this.ig('@min')).r){return this.is("@value",this.ig('@min'));
}else if(this.ig('@max')['$<'](value).r){return this.is("@value",this.ig('@max'));
}else{return this.is("@value",value);
}},false);
},0);
},2);
}),
    "lib/foundation/views/text_field.rb": (function(__FILE__){this.$require("foundation/views/control");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Control'),"TextField",function(){this.$register_builder(this.Y("text_field"),vnH());
this.$class_names("ck-text-field");
this.$display_attributes(this.Y("bezel"));
this.$attr_accessor(this.Y("bezel"));
this.dm("initialize",function(layout){this.opal_super(arguments.callee, [layout]);
this.is("@value","");
return this.is("@bezel",this.Y("square"));
},false);
this.dm("create_renderer",function(theme){return theme.$text_field(this);
},false);
this.dm("key_down",function(event){if(event.$key()['$=='](this.Y("return")).r){return this.f;
}else if(event.$key()['$=='](this.Y("tab")).r){return this.f;
}else{return this.t;
}},false);
this.dm("key_up",function(event){var old_value = this.n;this.$puts("key up event!");
old_value=this.$value();
if(!old_value['$==']("some old valye...s.s.s").r){if(!this.ig('@editing').r){this.is("@editing",this.t);
}else{this.n;}}else{this.n;}return this.t;
},false);
return this.dm("_string_value=",function(value){return this.n;},false);
},0);
},2);
}),
    "lib/foundation/views/view.rb": (function(__FILE__){this.$require("foundation/core/responder");
this.$require("foundation/core/builder");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('Responder'),"View",function(){this.$attr_accessor(this.Y("layout"));
this.$attr_reader(this.Y("window"));
this.$attr_writer(this.Y("multiple_touch_enabled"));
this.dm("initialize",function(frame){this.is("@layout",vnH(this.Y("left"),0,this.Y("top"),0,this.Y("right"),0,this.Y("bottom"),0));
this.is("@subviews",[]);
this.is("@multiple_touch_enabled",this.f);
return this.$class().$all_display_attributes().$each(this.P(function(property){return this.$observe(property,this.P(function(oldvalue,newvalue){return this['$needs_display='](this.t);
}));
}));
},false);
this.dm("dup",function(){var result = this.n;result=this.$class().$new();
result['$layout='](this.$layout());
return result;
},false);
this.dm("all_display_attributes",function(){if(this.const_get('CherryKit').const_get("View")['$=='](this).r){return this.o(this.ig('@display_attributes'),function(){return this.is("@display_attributes",[]);
});
}else{this.o(this.ig('@display_attributes'),function(){return this.is("@display_attributes",[]);
});
return this.ig('@display_attributes')['$+'](this.$superclass().$all_display_attributes());
}},true);
this.dm("display_attributes",function(properties){properties=Array.prototype.slice.call(arguments);this.o(this.ig('@display_attributes'),function(){return this.is("@display_attributes",[]);
});
return this.is("@display_attributes",this.ig('@display_attributes')['$+'](properties));
},true);
this.dm("class_names",function(names){names=Array.prototype.slice.call(arguments);return this.is("@css_class_names",names);
},true);
this.dm("all_class_names",function(){if(this.const_get('CherryKit').const_get("View")['$=='](this).r){return this.o(this.ig('@css_class_names'),function(){return this.is("@css_class_names",[]);
});
}else{this.o(this.ig('@css_class_names'),function(){return this.is("@css_class_names",[]);
});
return ([]['$+'](this.$superclass().$all_class_names()))['$+'](this.ig('@css_class_names'));
}},true);
this.$display_attributes(this.Y("visible"),this.Y("layout"));
this.$class_names("ck-view");
this.dm("theme_name",function(){return this.Y("root_theme");
},false);
this.dm("superview",function(){return this.ig('@superview');
},false);
this.dm("render_context",function(){return this.ig('@render_context');
},false);
this.dm("display",function(){var render_context = this.n;if(this.ig('@render_context').r){return this.$update();
}else{render_context=this.$create_render_context();
this.$render(render_context);
this.$update();
return this.ig('@superview').$render_context().$element()['$<<'](render_context.$element());
}},false);
this.dm("create_render_context",function(){var theme = this.n,render_context = this.n;if(this.ig('@render_context').r){return this.ig('@render_context');
}else{this.n;}render_context=this.const_get('RenderContext').$new(this.$tag_name());
theme=this.const_get('Theme').$find_theme(this.$theme_name());
this.o(theme,function(){return this.$raise(["Cannot find theme named ",this.$theme_name().$to_s()].join(''));
});
this.is("@renderer",this.$create_renderer(theme));
return this.is("@render_context",render_context);
},false);
this.dm("create_renderer",function(theme){return theme.$view(this);
},false);
this.dm("render",function(render_context){return this.ig('@renderer').$render(render_context);
},false);
this.dm("update",function(){return this.ig('@renderer').$update();
},false);
this.dm("visible?",function(){return this.t;
},false);
this.dm("bounds",function(){return this.const_get('Browser').const_get("Rect").$new(0,0,this.$render_context().$element().__element__.clientWidth,this.$render_context().$element().__element__.clientHeight);
},false);
this.dm("tag_name",function(){return this.Y("div");
},false);
this.dm("<<",function(subview){return this.$add_subview(subview);
},false);
this.dm("add_subview",function(subview){subview.$remove_from_superview();
subview['$_window='](this.ig('@window'));
subview.$will_move_to_superview(this);
subview.$instance_variable_set(this.Y("@superview"),this);
this.ig('@subviews')['$<<'](subview);
subview['$next_responder='](this);
subview.$did_move_to_superview(this);
return this.$did_add_subview(subview);
},false);
this.dm("remove_from_superview",function(){return this.n;},false);
this.dm("did_add_subview",function(subview){return this.n;},false);
this.dm("will_move_to_superview",function(superview){return this.n;},false);
this.dm("did_move_to_superview",function(superview){return this['$needs_display='](this.t);
},false);
this.dm("needs_display=",function(needs_displaying){if(this.ig('@window').r){return this.const_get('RunLoop').$current_run_loop().$add_task(this,this.Y("display"));
}else{return this.n;}},false);
this.dm("_window=",function(window){if(this.ig('@window')['$=='](window).r){return this.n;
}else{this.n;}this.$will_move_to_window(window);
this.is("@window",window);
this['$needs_display='](this.t);
this.ig('@subviews').$each(this.P(function(subview){return subview['$_window='](window);
}));
return this.$did_move_to_window(window);
},false);
this.dm("will_move_to_window",function(window){return this.n;},false);
this.dm("did_move_to_window",function(window){return this.n;},false);
this.dm("capture_touches?",function(){return this.f;
},false);
this.dm("multiple_touch_enabled?",function(){return this.ig('@multiple_touch_enabled');
},false);
this.dm("mouse_down",function(event){return this.opal_super(arguments.callee, [event]);
},false);
this.dm("touches_began",function(touches,event){return this.$puts([this.$to_s(),"#touches_began"].join(''));
},false);
this.dm("touches_ended",function(touches,event){return this.$puts([this.$to_s(),"#touches_ended"].join(''));
},false);
this.dm("touches_moved",function(touches,event){return this.$puts([this.$to_s(),"#touches_moved"].join(''));
},false);
this.dm("[]=",function(id,view){return (this.o(this.ig('@view_ids'),function(){return this.is("@view_ids",vnH());
}))['$[]='](id,view);
},true);
return this.dm("[]",function(id){return this.ig('@view_ids')['$[]'](id);
},true);
},0);
},2);
}),
    "lib/foundation/windows/window.rb": (function(__FILE__){this.$require("foundation/views/view");
this.define_class(this.n,'CherryKit',function(){return this.define_class(this.const_get('View'),"Window",function(){this.dm("initialize",function(layout){this.opal_super(arguments.callee, Array.prototype.slice.call(arguments));
this.is("@views_needing_display",[]);
this.is("@window",this);
return this.is("@first_responder",this);
},false);
this.dm("show",function(){return this['$needs_display='](this.t);
},false);
this.$class_names("ck-window");
this.dm("append_to",function(base_element){var render_context = this.n;render_context=this.$create_render_context();
return base_element['$<<'](render_context.$element());
},false);
this.dm("mark_view_for_display",function(view){if(!this.ig('@views_needing_display')['$include?'](view).r){this.ig('@views_needing_display')['$<<'](view);
console.log(this.ig('@views_needing_display'));}else{return this.n;}},false);
this.dm("display",function(){var render_context = this.n;if(this.ig('@render_context').r){this.$update();
}else{render_context=this.$create_render_context();
this.$render(render_context);
this.$update();
this.$append_to(this.const_get('Browser').const_get("Element").$body());
}return this.ig('@subviews').$each(this.P(function(view){return view.$display();
}));
},false);
this.dm("send_event",function(event){var res = this.n;if(event.$type()['$=='](this.Y("mouse_down")).r){return event.$view().$mouse_down(event);
}else if(event.$type()['$=='](this.Y("mouse_up")).r){}else if(event.$type()['$=='](this.Y("key_down")).r){res=event.$view().$key_down(event);
return res;
}else if(event.$type()['$=='](this.Y("key_up")).r){return event.$view().$key_up(event);
}else{return this.n;}},false);
this.dm("first_responder",function(){return this.ig('@first_responder');
},false);
this.dm("make_first_responder?",function(responder){if(responder['$=='](this.ig('@first_responder')).r){return this.t;
}else{this.n;}if(!this.ig('@first_responder')['$resign_first_responder?']().r){return this.f;
}else{this.n;}if(this.o(responder['$accepts_first_responder?']()['$!'](),function(){return responder['$become_first_responder?']()['$!']();
}).r){this.is("@first_responder",this);
return this.f;
}else{this.n;}this.is("@first_responder",responder);
return this.t;
},false);
this.$register_builder(this.Y("window"),vnH(this.Y("title"),"Window"));
return this.dm("initialize_from_builder",function(builder_options){return this.$initialize();
},false);
},0);
},2);
}),
    "lib/foundation.rb": (function(__FILE__){this.$puts("well, foundation here init");
this.$require("browser");
this.const_get('Dir').$glob("foundation/lib/**/*.rb").$each(this.P(function(rb){return this.$require(rb);
}));
})
  }
});
opal.run('cherry_kit','simple_opal');
