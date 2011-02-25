// our global $opal object that is also exported.
$opal = {};

// Core runtime classes and objects
var rb_cBasicObject,
    rb_cObject,
    rb_cModule,
    rb_cClass,
    rb_mKernel,
    rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
    rb_cFile,
    rb_cProc,
    rb_cNumeric,
    rb_cArray,
    rb_cHash,
    rb_cString,
    rb_cSymbol,
    rb_top_self,
    Qnil,
    Qfalse,
    Qtrue;

// Core object types flags
var T_CLASS       = $opal.T_CLASS       = 1,
    T_MODULE      = $opal.T_MODULE      = 2,
    T_OBJECT      = $opal.T_OBJECT      = 4,
    T_BOOLEAN     = $opal.T_BOOLEAN     = 8,
    T_STRING      = $opal.T_STRING      = 16,
    T_ARRAY       = $opal.T_ARRAY       = 32,
    T_NUMBER      = $opal.T_NUMBER      = 64,
    T_PROC        = $opal.T_PROC        = 128,
    T_SYMBOL      = $opal.T_SYMBOL      = 256,
    T_HASH        = $opal.T_HASH        = 512,
    T_RANGE       = $opal.T_RANGE       = 1024,
    T_ICLASS      = $opal.T_ICLASS      = 2056,
    FL_SINGLETON  = $opal.FL_SINGLETON  = 4112;

// load paths - these will be reset in init(). If not set, then just use default.
// In node we set these to require.paths, and in the browser we use a temporary
// fake namespace.
//
// FIXME: node v.0.4 introduces the idea that require.paths will be depreceated.
// Should we start to look at an alternative solution?
var load_paths = [];

// setting mm methods
$opal.mm = function(method_ids) {
  // var prototype = rb_cBasicObject.$m_prototype_tbl;
  // for (var i = 0; i < method_ids.length; i++) {
  //   var method_id = method_ids[i];
  //   // only add if there isnt already a method there
  //   if (!prototype.hasOwnProperty(method_id)) {

  //       var func = (function(method_id) {
  //         return function(self) {
  //           //throw new Error("method_missing for: " + method_id);
  //           var args = [].slice.call(arguments, 1);
  //           args.unshift(method_id);
  //           args.unshift(self);
        //console.log(self.$m.method_missing);
  //           return self.$m.method_missing.apply(null, args);
  //         };
  //       })(method_id);
  //     // mark as a method missing, to help repond_to? and send etc.
  //     func.$rbMM = true;
  //     prototype[method_id] = func;

  //   } else {
  //   }
  // }
};

// defining methods
$opal.dm = function(base, method_id, body, singleton) {
  if (singleton) {
    rb_define_singleton_method(base, method_id, body);
  } else {
    // should this instead do a rb_singleton_method?? probably..
    if (base.$flags & T_OBJECT) {
      base = base.$klass;
    }

    rb_define_method(base, method_id, body);
  }

  return Qnil;
};

// defining classes and modules
$opal.dc = function(base, super_class, id, body, flag) {
  var klass;
  
  switch (flag) {
    // normal class
    case 0:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & T_OBJECT) {
        base = rb_class_real(base.$klass);
      }
      // If no superclass specified, use Object.
      if (super_class == Qnil) {
        super_class = rb_cObject;
      }
      
      klass = rb_define_class_under(base, id, super_class);
      break;
    // class shift (<<)
    case 1:
      //console.log("need to get singleton class");
      klass = rb_singleton_class(base);
      break;
    // module
    case 2:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & T_OBJECT) {
        base = rb_class_real(base.$klass);
      } 
      klass = rb_define_module_under(base, id);
      break;
    // If default, something has gone wrong (in compiler).
    default:
      rb_raise(rb_eException, "define_class got a unknown flag " + flag);    
  }
  
  // evaluate and return class body using class as the self
  return body.call(klass);
};

// Return a new hash with given keys and values
$opal.H = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};

// Returns a new symbol with the given ptr
//
// FIXME: make new symbols just javascript strings. If we use new String('sym name'),
// we can reset the .$m and $.isa and $.klass on the string directly. It makes a lot
// of the core library more efficient to save having to call obj.to_s constantly as
// we are unsure whether the receiver is a string or symbol, we can just use its
// literal value directly.
$opal.Y = function(str) {
  if (symbol_table.hasOwnProperty(str)) {
    return symbol_table[str];
  }

  var res = new rb_cSymbol.allocator();
  symbol_table[res.$ptr = str] = res;
  // var res = new String(str);

  // res.$klass = rb_cSymbol;
  // res.$m = rb_cSymbol.$m_tbl;
  // symbol_table[str] = res;
  return res;
};

// Returns a new range
// G for ranGe ... yeah.
$opal.G = function(beg, end, exclude_end) {
  return new RRange(beg, end, exclude_end);
};

// break with the given value
$opal.B = function(value) {
  rb_vm_break_instance.$value = value;
  throw rb_vm_break_instance;
};

// return with given value
$opal.R = function(value, func) {
  rb_vm_return_instance.$value = value;
  rb_vm_return_instance.$func = func;
  throw rb_vm_return_instance;
};

// Block passing - by default we keep both values set to null/nil
$opal.P = {
  // function
  f: null,
  // block
  p: null,
  // yield error
  y: function() {
    throw new Error('LocalJumpError - $opal.P.y - no block given');
  }
};

// default loader - just use commonjs. browser overrides this
$opal.require = function(path) {
  require(path);
  return Qtrue;
};

// define a toll free bridged class
$opal.bridged_class = function(prototype, flags, id, super_klass) {
  return rb_define_toll_free_class(prototype, flags || T_OBJECT, id, super_klass);
};

// Set a constant `val` on the given `klass`.
var rb_const_set = function(klass, id, val) {
  // return false;
  klass.$constants[id] = val;
  return val;
};

// Look for the given constant on the given klass.
var rb_const_get = function(klass, id) {
  // return false;
  if (klass.$constants[id]) {
    return (klass.$constants[id]);
  }

  var parent = klass.$parent;

  while (parent && parent != rb_cObject) {

    if (parent.$constants[id]) {
      return parent.$constants[id];
    }

    parent = parent.$parent;
  }

  rb_raise(rb_eNameError, 'uninitialized constant ' + id);
};

// is const defined
var rb_const_defined = function(klass, id) {
  // return false;
  if (klass.$constants[id]) {
    return true;
  }
  
  return false;
};

// set ivar
// @global
rb_ivar_set = function(obj, id, val) {
  obj[id] = val;
  return val;
};

// @global
rb_ivar_get = function(obj, id) {
  return obj.hasOwnProperty(id) ? obj[id] : Qnil;
};

// @global
rb_ivar_defined = function(obj, id) {
  return obj.hasOwnProperty(id) ? true : false;
};

// global id table
// @local
// 
// @entries are mapped globalid => Object. Object contains the keys:
//  - name, value, getter, setter.
var rb_global_tbl = {};

// defined a hooked (global) variable
// 
// @local
// 
// @param [String] name the name of the global (e.g. '$:')
// @param [Function] getter the getter function to use for the variable
// @param [Function] setter the setter function to use for setting variable
// @returns null
// 
var rb_define_hooked_variable = function(name, getter, setter) {
  var entry = {
    "name": name,
    "value": Qnil,
    "getter": getter,
    "setter": setter
  };
  
  rb_global_tbl[name] = entry;
};

// A default read only getter for a global variable. This will simply throw a
// name error with the given id. This can be used for variables that should not
// be altered.
var rb_gvar_readonly_setter = function(id, value) {
  rb_raise(rb_eNameError, id + " is a read-only variable");
};

// Retrieve a global variable. This will use the assigned getter.
// 
// @local
var rb_gvar_get = function(id) {
  var entry = rb_global_tbl[id];
  if (!entry) { return Qnil; }
  return entry.getter(id);
};

// Set a global. If not already set, then we assign basic getters and setters
// 
// @local
var rb_gvar_set = function(id, value) {
  var entry = rb_global_tbl[id];
  if (entry)  { return entry.setter(id, value); }
  
  // make a new default..
  rb_define_hooked_variable(id, 
    // getter
    function(id) {
      return rb_global_tbl[id].value;
    },
    // setter
    function(id, value) {
      return (rb_global_tbl[id].value = value);
    }
  );
  
  return rb_gvar_set(id, value);
};



// Every object has a unique id. This count is used as the next id for the next
// created object. Therefore, first ruby object has id 0, next has 1 etc.
var opal_hash_yield = 0;

// Yield the next object id, updating the count, and returning it.
var opal_yield_hash = function() {
  return opal_hash_yield++;
};

// The root class. Every class in opal is an instance of RClass.
var RClass = $opal.RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$id = opal_yield_hash();
  // SuperClass.
  this.$super = super_klass;
  // Method_table - all methods are stored here. This is prototype based so that
  // methods are inherited between subclasses etc.
  // 
  // m_tbl is the actual instance
  // m_prototype_tbl is the prototype, so add methods to that so that they get 
  // inherited
  if (super_klass) {
    // console.log("inheriting");
    var ctor = function() {};
    ctor.prototype = super_klass.$m_prototype_tbl;
    var m_ctor = function() {};
    m_ctor.prototype = new ctor();
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    
    // constants..
    var cctor = function() {};
    cctor.prototype = super_klass.$c_prototype;
    var c_ctor = function() {};
    c_ctor.prototype = new cctor();
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  else {
    // console.log("making fresh");
    // root object behaviour..
    var m_ctor = function() {};
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    // constants..
    var c_ctor = function() {};
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  // methods added to this actual class instance
  this.$method_table = {};
  return this;
};

// Flags. Every RClass instance is simply a T_CLASS, so mark as so.
RClass.prototype.$flags = T_CLASS;
// RTest/truthiness - every RClass instance is true.
RClass.prototype.$r = true;

// The root object. Every object in opal (apart from toll free bridged classes 
// like array, string etc) are an instance of RObject.
var RObject = $opal.RObject = function(klass) {
  // Hash. get out object_id
  this.$id = opal_yield_hash();
  // Ivars. no longer?
  // this.$i = {};
  // klass of the object becomes klass
  this.$klass = klass;
  // from the class, we set our local methods property (in sync with our class)
  this.$m = klass.$m_tbl;
  // return object.
  return this;
};

// Flags - every RObject instance is simply a T_OBJECT
RObject.prototype.$flags = T_OBJECT;
// RTest - every RObject instance is true.
RObject.prototype.$r = true;

RObject.prototype.$hash = RClass.prototype.$hash = function() {
  return this.$id;
};

// define method
rb_define_method = function(klass, js_id, body) {
  // console.log("defining " + js_id);
  // console.log(klass);
  // console.log(klass);
  // the literal method names on objects become prefixed with 'm$' to avoid
  // clashing with native methods. We keep js_id in the method table so that
  // we have literal method names for various runtime methods etc
  var rb_id = 'm$' + js_id;

  klass.allocator.prototype[rb_id] = body;
  klass.$method_table[js_id] = body;

  if (klass.$included_in) {
    for (var i = 0; i < klass.$included_in.length; i++) {
      // klass.$included_in[i].allocator.prototype... =  ... etc
      // console.log("need to add " + js_id);
      rb_define_method(klass.$included_in[i], js_id, body);
    }
  }

  if (!body.$rbName) {
    body.$rbName = js_id;
  }
  
  return Qnil;
};


rb_define_global_function = function(name, body) {
	rb_define_method(rb_mKernel, name, body);
	rb_define_singleton_method(rb_mKernel, name, body);
};

// singleton method
rb_define_singleton_method = function(klass, name, body) {
  rb_define_method(rb_singleton_class(klass), name, body);
};

var rb_define_alias = function(base, new_name, old_name) {
  rb_define_method(base, new_name, base.$m_tbl[old_name]);
  return Qnil;
};

// Class#new
var rb_class_new_instance = function(klass) {
  var result = rb_obj_alloc(klass);
  // call initialize
  return result;
};

// Class#allocate
// @global
rb_obj_alloc = function() {
  // var result = new RObject(klass, T_OBJECT);
  var result = new this.allocator();
  // console.log("result is:");
  // console.log(result);
  return result;
};

// raise exception class with our given string
// @global
rb_raise = function(exc, str) {
  if (str === undefined) {
    str = exc;
    exc = rb_eException;
  }
  //var exception = new RObject(exc, T_OBJECT);
  // var exception = exc.$m.allocate(exc);
  var exception = exc.m$allocate();
	// var exception = exc_new_instance(exc);
  exception.message = str;
  // rb_ivar_set(exception, '@message', str);
  rb_vm_raise(exception);
};

// raise an exception instance (DO NOT pass strings to this)
rb_vm_raise = function(exc) {
  // backtrace
  //rb_ivar_set(exc, '@backtrace', debug_stack.slice(0, debug_stack.length));
  throw exc;
};

/**
 * Throw an argument error when the wrong number of arguments were given to a 
 * method
 * 
 * @param [Number] given the number of arguments actually given
 * @param [Number] expected the number of arguments we expected to have
*/
function rb_arg_error(given, expected) {
  rb_raise(rb_eArgError,
    "wrong number of arguments(" + given + " for " + expected + ")");
}

// Run a function - this should be used as an entry point for anything that 
// calls ruby code or may throw an error.
// 
// This is only an entry point, so system events, ruby_init() etc should use
// this. Browser wraps every DOM event in this, for instance.
// 
// @global
$opal.rb_run = rb_run = function(func) {
  // always clear backtrace
  //debug_stack.length = 0;
  try {
    //debug_stack_push([rb_run], [rb_top_self]);
    return func();
  }
  catch(err) {
    if (err['@message']) {
      err.message = err['@message'];
    }

    // FIXME: this should uses prepareStackTrace only when needed. An
    // external library may also modify that function, so seeing as we know
    // when we are going to log the stack, we can just temporarily replace
    // that function with our own, then set it back to the original.
    //console.log('about to throw');
    //throw err;

    if (err.stack) {
      console.log(err.stack);
    } else {
      console.log("no stack :(");
      console.log(err);
    }
  }
};

// Stack trace support
rb_run.$rbName = "<main>";

exports.rb_run = rb_run;

/**
  Call a super method.
  
  callee is the function that actually called super(). We use this to find the
  right place in the tree to find the method that actually called super. This is
  actually done in rb_super_find, 
*/
$opal.S = function(callee, self, args) {
  var mid = callee.$rbName;
  // print("looking for super " + callee);
  var func = rb_super_find(self.$klass, callee, callee.$rbName);
  
  if (!func) {
    rb_raise(rb_eNoMethodError, "super: no superclass method for " + mid);
    rb_raise(rb_eNoMethodError, "super: no super class method `" + mid + "`" +
      " for " + self.$m.inspect(self));
  }
  // print("found the super!" + func);
  var args_to_send = [self, mid].concat(args);
  return func.apply(null, args_to_send);
};

/**
  Actually find super impl to call.  Returns null if cannot find it.
  This is the debug version!!!!!!!!!!!!!!!!!!!!. also need non debug version
*/
rb_super_find = function(klass, callee, mid) {
  var cur_method;
  // find current method
  while (klass) {
    if (klass.$method_table[mid]) {
      if (klass.$method_table[mid] == callee) {
        // cur_method = klass.$method_table[mid];
        break;
      }
    }
    klass = klass.$super;
  }
  
  if (!klass) { return null; }
  
  // find super() from klass up
  klass = klass.$super;
  
  while (klass) {
    if (klass.$method_table[mid]) {
      return klass.$method_table[mid];
    }
    
    klass = klass.$super;
  }
  
  return null;
};

// Get constant from base
// @global
rb_vm_cg = function(base, id) {
  if (base.$flags & T_OBJECT) {
    base = rb_class_real(base.$klass);
  }
  return rb_const_get(base, id);
};

// Set constant in base
// @global
rb_vm_cs = function(base, id, val) {
  if (base.$flags & T_OBJECT) {
    base = rb_class_real(base.$klass);
  }
  return rb_const_set(base, id, val);
};

// get global by id
// @global
rb_vm_gg = function(id) {
  return rb_gvar_get(id);
};

// set global by id
// @global
rb_vm_gs = function(id, value) {
  return rb_gvar_set(id, value);
};


// gets the load path
// @local
var load_path_getter = function(id) {
  return load_paths;
};

// gets laoded features
var loaded_feature_getter = function(id) {
  return loaded_features;
};

// make sure init/main are only called once.
var rb_opal_done_init = false;

// where we can save our global argv once calculated
var init_argv = [];

// boot of all (except bridged) classes and objects
var __boot_base_class = function() {};

__boot_base_class.prototype.$hash = function() {
  return this.$id;
};

__boot_base_class.prototype.$r = true;

// makes the core instances objects - these are what will be the basic object, object
// instances etc.
var __boot_defclass = function(id, superklass) {
  var cls = function() {
    this.$id = opal_yield_hash();
  };

  if (superklass) {
    var tmp_ctor = function() {};
    tmp_ctor.prototype = superklass.prototype;
    cls.prototype = new tmp_ctor();
  } else {
    cls.prototype = new __boot_base_class();
  }

  cls.prototype.constructor = cls;
  cls.prototype.$flags = T_OBJECT;
  // cls.prototype.$method_table = {};
  return cls;
};

// makes the actual class objects themselbes - basicobject,object etc.
var __boot_makemeta = function(id, klass, superklass) {
  var meta = function() {
    this.$id = opal_yield_hash();
  };

  var tmp_ctor = function(){};
  tmp_ctor.prototype = superklass.prototype;
  meta.prototype = new tmp_ctor();
  
  var prototype = meta.prototype;
  prototype.included_in = [];
  prototype.method_table = {};
  prototype.allocator = klass;
  prototype.constructor = meta;
  prototype.__classid__ = id;
  prototype.$super = superklass;
  prototype.$flags = T_CLASS;
  prototype.$method_table = {};

  // constants
  if (superklass.prototype.$constants_alloc) {
    prototype.$constants = new superklass.prototype.$constants_alloc();
    prototype.$constants_alloc = function() {};
    prototype.$constants_alloc.prototype = prototype.$constants;
  } else {
    prototype.$constants_alloc = function() {};
    prototype.$constants = prototype.$constants_alloc.prototype;
  }

  var result = new meta();
  klass.prototype.$klass = result;
  return result;
};

var __boot_defmetameta = function(klass, meta) {
  klass.$klass = meta;
};

$opal.init = function(options) {
  if (rb_opal_done_init) { return; }
  rb_opal_done_init = true;

  if (!options) { options = {}; }

  var metaclass;
  // these all represent the instances of what will be basicobject, object, etc
  var boot_cBasicObject = $opal.boot_cBasicObject = __boot_defclass('BasicObject', null);
  var boot_cObject = $opal.boot_cObject = __boot_defclass('Object', boot_cBasicObject);
  var boot_cModule = $opal.boot_cModule = __boot_defclass('Module', boot_cObject);
  var boot_cClass = $opal.boot_cClass = __boot_defclass('Class', boot_cModule);

  // classes themselves
  rb_cBasicObject = $opal.BasicObject = __boot_makemeta('BasicObject', boot_cBasicObject, boot_cClass);
  rb_cObject = $opal.Object = __boot_makemeta('Object', boot_cObject, rb_cBasicObject.constructor);
  rb_cModule = $opal.Module = __boot_makemeta('Module', boot_cModule, rb_cObject.constructor);
  rb_cClass = $opal.Class = __boot_makemeta('Class', boot_cClass, rb_cModule.constructor);

  __boot_defmetameta(rb_cBasicObject, rb_cClass);
  __boot_defmetameta(rb_cObject, rb_cClass);
  __boot_defmetameta(rb_cModule, rb_cClass);
  __boot_defmetameta(rb_cClass, rb_cClass);

  // fix superclasses
  rb_cBasicObject.$super = null;
  rb_cObject.$super = rb_cBasicObject;
  rb_cModule.$super = rb_cObject;
  rb_cClass.$super = rb_cModule;

  rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);
  rb_const_set(rb_cObject, 'Object', rb_cObject);
  rb_const_set(rb_cObject, 'Module', rb_cModule);
  rb_const_set(rb_cObject, 'Class', rb_cClass);

  rb_define_method(rb_cBasicObject, '!', obj_not);
  rb_define_method(rb_cBasicObject, '!=', obj_not_equal);

  rb_mKernel = $opal.Kernel = rb_define_module('Kernel');
  rb_include_module(rb_cObject, rb_mKernel);

  rb_define_method(rb_mKernel, "puts", obj_puts);

  rb_define_method(rb_cClass, "allocate", rb_obj_alloc);
  rb_define_method(rb_cClass, "new", class_new_instance);
  rb_define_method(rb_cClass, "initialize", class_initialize);
  rb_define_singleton_method(rb_cClass, "new", class_s_new);

  // Top self
  global.rb_top_self = rb_top_self = $opal.top = new rb_cObject.allocator();

  // NilClass
  rb_cNilClass = rb_define_class('NilClass', rb_cObject);
  $opal.NilClass = rb_cNilClass;
  global.Qnil = $opal.Qnil = Qnil = new rb_cNilClass.allocator();
  Qnil.$r = false;

  // TrueClass
  rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
  global.Qtrue = Qtrue = new rb_cTrueClass.allocator();

  // FalseClass
  rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
  global.Qfalse = Qfalse = new rb_cFalseClass.allocator();
  Qfalse.$r = false;

  // console.log("REQUIRE BASICOBJECT============================");
  require('./basic_object');
  require('./module');
  require('./class');
  require('./kernel');
  require('./top_self');
  require('./nil_class');
  require('./true_class');
  require('./false_class');

  // String
  rb_cString = $opal.String = rb_define_toll_free_class(String,
      T_OBJECT | T_STRING, 'String', rb_cObject);

  require('./string');

  // Symbol
  rb_cSymbol = $opal.Symbol = rb_define_class('Symbol', rb_cObject);
  rb_cSymbol.allocator.prototype.$flags = T_OBJECT | T_SYMBOL;

  require('./symbol');

  // Array
  rb_cArray = $opal.Array = rb_define_toll_free_class(Array,
      T_OBJECT | T_ARRAY, 'Array', rb_cObject);

  require('./array');

  // Numeric
  rb_cNumeric = $opal.Numeric = rb_define_toll_free_class(Number,
      T_OBJECT | T_NUMBER, 'Numeric', rb_cObject);

  Number.prototype.$hash = function() {
    return '$num_' + this;
  };

  require('./numeric');

  // Hash
  rb_cHash = $opal.Hash = rb_define_toll_free_class(RHash,
      T_OBJECT | T_HASH, 'Hash', rb_cObject);

  rb_define_singleton_method(rb_cHash, '[]', hash_s_create);

  require('./hash');

  // Regexp

  rb_cRegexp = $opal.Regexp = rb_define_toll_free_class(RegExp,
      T_OBJECT, 'Regexp', rb_cObject);

  require('./regexp');

  // MatchData
  rb_cMatch = rb_define_class('MatchData', rb_cObject);
  rb_define_method(rb_cMatch, 'to_a', match_to_a);
  rb_define_method(rb_cMatch, 'inspect', match_inspect);
  rb_define_method(rb_cMatch, 'aref', match_inspect);

  // load
  if (options.load_paths) { load_paths = options.load_paths; }

  rb_define_hooked_variable('$:', load_path_getter, rb_gvar_readonly_setter);
  rb_define_hooked_variable('$LOAD_PATH', load_path_getter, rb_gvar_readonly_setter);

  if (!options.argv) { options.argv = []; }

  rb_const_set(rb_cObject, 'ARGV', options.argv);

  // Exception
  rb_eException = rb_define_toll_free_class(Error, T_OBJECT, 'Exception', rb_cObject);

  rb_eStandardError = rb_define_class("StandardError", rb_eException);
  rb_eRuntimeError = rb_define_class("RuntimeError", rb_eException);
  rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
  rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
  rb_eNameError = rb_define_class("NameError", rb_eStandardError);
  rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
  rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);
  rb_eScriptError = rb_define_class('ScriptError', rb_eException);
  rb_eLoadError = rb_define_class('LoadError', rb_eScriptError);

  rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
  rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
  rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);

  require('./error');

  // jump error literals. We keep a singular instance to avoid recreating each
  // error every time (which would be expensive).
  rb_vm_break_instance = new Error('unexpected break');
  rb_vm_break_instance.$klass = rb_eLocalJumpError;  
  rb_vm_break_instance.$keyword = 2;

  rb_vm_return_instance = new Error('unexpected return');
  rb_vm_return_instance.$klass = rb_eLocalJumpError;
  rb_vm_return_instance.$keyword = 1;

  rb_vm_next_instance = new Error('unexpected next');
  rb_vm_next_instance.$klass = rb_eLocalJumpError;
  rb_vm_next_instance.$keyword = 3;

  // Proc
  rb_cProc = rb_define_toll_free_class(Function, T_OBJECT | T_PROC, 'Proc', rb_cObject);

  require('./proc');


  rb_const_set(rb_cObject, 'RUBY_PLATFORM', 'opal');
};

$opal.init_old_legacy = function(options) {
  if (rb_opal_done_init) { return; }
  rb_opal_done_init = true;

  if (!options) { options = {}; }

  var metaclass;

  $opal.BasicObject = rb_cBasicObject = boot_defrootclass('BasicObject');
  $opal.Object = rb_cObject = boot_defclass('Object', rb_cBasicObject);
  $opal.Module = rb_cModule = boot_defclass('Module', rb_cObject);
  $opal.Class = rb_cClass = boot_defclass('Class', rb_cModule);

  rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);

  metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
  metaclass = rb_make_metaclass(rb_cObject, metaclass);
  metaclass = rb_make_metaclass(rb_cModule, metaclass);
  metaclass = rb_make_metaclass(rb_cClass, metaclass);

  boot_defmetametaclass(rb_cModule, metaclass);
  boot_defmetametaclass(rb_cObject, metaclass);
  boot_defmetametaclass(rb_cBasicObject, metaclass);

	rb_define_method(rb_cBasicObject, "!", obj_not);
	rb_define_method(rb_cBasicObject, "!=", obj_not_equal);

	rb_mKernel = rb_define_module('Kernel');

	rb_include_module(rb_cObject, rb_mKernel);

	rb_define_method(rb_cClass, "allocate", rb_obj_alloc);
	rb_define_method(rb_cClass, "new", class_new_instance);
	rb_define_method(rb_cClass, "initialize", class_initialize);
	rb_define_singleton_method(rb_cClass, "new", class_s_new);
	
  // good idea to keep puts here.. we probably need it nice and early.
	rb_define_method(rb_mKernel, "puts", obj_puts);

  // Top self
	global.rb_top_self = rb_top_self = rb_obj_alloc(rb_cObject);
  $opal.top = rb_top_self;

	// @class NilClass
	rb_cNilClass = rb_define_class('NilClass', rb_cObject);
	global.Qnil = $opal.Qnil = Qnil = rb_obj_alloc(rb_cNilClass);
	Qnil.$r = false;
	
	// @class TrueClass
	rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
	global.Qtrue = Qtrue = rb_obj_alloc(rb_cTrueClass);
	
	// @class FalseClass
	rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
	global.Qfalse = Qfalse = rb_obj_alloc(rb_cFalseClass);
	Qfalse.$r = false;

  require('./basic_object');
  require('./module');
  require('./class');
  require('./kernel');
  require('./top_self');
  require('./nil_class');
  require('./true_class');
  require('./false_class');

  // @class Array
  rb_cArray = rb_define_toll_free_class(Array.prototype,
      T_OBJECT | T_ARRAY, 'Array', rb_cObject);

  Array.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  require('./array');

  // @class Numeric
  
  rb_cNumeric = rb_define_toll_free_class(Number.prototype,
      T_OBJECT | T_NUMBER, 'Numeric', rb_cObject);

  require('./numeric');

  // @class Hash

  rb_cHash = rb_define_toll_free_class(RHash.prototype,
      T_OBJECT | T_HASH, 'Hash', rb_cObject);

  RHash.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  rb_define_singleton_method(rb_cHash, '[]', hash_s_create);
  
  require('./hash');

  // @class Regexp  
  
  rb_cRegexp = rb_define_toll_free_class(RegExp.prototype, T_OBJECT,
      'Regexp', rb_cObject);
  
  rb_define_method(rb_cRegexp, "inspect", reg_inspect);
  rb_define_method(rb_cRegexp, "==", reg_equal);
  rb_define_method(rb_cRegexp, "eql?", reg_equal);
  rb_define_method(rb_cRegexp, "match", reg_match);

  rb_cMatch = rb_define_class("MatchData", rb_cObject);
  rb_define_method(rb_cMatch, "to_a", match_to_a);
  rb_define_method(rb_cMatch, "inspect", match_inspect);
  rb_define_method(rb_cMatch, "aref", match_aref);

  // load
  
  if (options.load_paths) { load_paths = options.load_paths; }

  //load_paths.unshift(exports.opal_lib_path);
  rb_define_hooked_variable('$:', load_path_getter, rb_gvar_readonly_setter);
  rb_define_hooked_variable('$LOAD_PATH', load_path_getter, rb_gvar_readonly_setter);

  if (!options.argv) { options.argv = []; }

  rb_const_set(rb_cObject, 'ARGV', options.argv);

  // @class Exception
  rb_eException = rb_define_toll_free_class(Error.prototype, T_OBJECT, 'Exception', rb_cObject);

  rb_eStandardError = rb_define_class("StandardError", rb_eException);
  rb_eRuntimeError = rb_define_class("RuntimeError", rb_eException);
  rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
  rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
  rb_eNameError = rb_define_class("NameError", rb_eStandardError);
  rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
  rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);
  rb_eScriptError = rb_define_class('ScriptError', rb_eException);
  rb_eLoadError = rb_define_class('LoadError', rb_eScriptError);

  rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
  rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
  rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);

  require('./error');

  // jump error literals. We keep a singular instance to avoid recreating each
  // error every time (expensive). 
  rb_vm_break_instance = new Error('unexpected break');
  rb_vm_break_instance.$klass = rb_eLocalJumpError;  
  rb_vm_break_instance.$keyword = 2;

  rb_vm_return_instance = new Error('unexpected return');
  rb_vm_return_instance.$klass = rb_eLocalJumpError;
  rb_vm_return_instance.$keyword = 1;

  rb_vm_next_instance = new Error('unexpected next');
  rb_vm_next_instance.$klass = rb_eLocalJumpError;
  rb_vm_next_instance.$keyword = 3;

  // @class String
  rb_cString = rb_define_toll_free_class(String.prototype,
      T_OBJECT | T_STRING, 'String', rb_cObject);

  require('./string');

  // @class Symbol
  rb_cSymbol = rb_define_class('Symbol', rb_cObject);
  require('./symbol');

  // @class Proc

  rb_cProc = rb_define_toll_free_class(Function.prototype,
      T_OBJECT | T_PROC, 'Proc', rb_cObject);

  Function.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  require('./proc');

  // @class Range
  rb_cRange = rb_define_toll_free_class(RRange.prototype, T_OBJECT | T_RANGE,
      'Range', rb_cObject);

  RRange.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  require('./range');

  rb_const_set(rb_cObject, 'RUBY_PLATFORM', 'opal');
};

// define a top level module with the given id
rb_define_module = function(id) {
  return rb_define_module_under(rb_cObject, id);
};

var rb_define_module_under = function(base, id) {
  var module;
  // if module already exists..
  if (rb_const_defined(base, id)) {
    // print("already defined");
    // make sure it is a module, otherwise error (trying to change class)
    module = rb_const_get(base, id);
    if (module.$flags & T_MODULE) {
      return module;
    }

    throw id + " is not a module.";
  }
  
  module = rb_define_module_id(id);
  rb_const_set(base, id, module);
  module.$parent = base;
  return module;
};

var rb_define_module_id = function(id) {
  var module = rb_define_class_id(id, rb_cModule);
  module.$flags = T_MODULE;
  rb_name_class(module, id);
  return module;
};

var rb_mod_create = function() {
  // return // rb_define_class_id()
  return rb_class_boot(rb_cModule);
};

rb_include_module = function(klass, module) {

  // console.log("including " + module.__classid__ + " into " + klass.__classid__);
  if (!klass.$included_modules) {
    klass.$included_modules = [];
  }

  if (klass.$included_modules.indexOf(module) != -1) {
    return;
  }
  klass.$included_modules.push(module);
  
  if (!module.$included_in) {
    module.$included_in = [];
  }
  
  module.$included_in.push(klass);
  // console.log("about to loop");
  for (var method in module.$method_table) {
    // console.log("checking " + method);
    // rb_define_method_raw(klass, method, module.$method_table[method]);
    if (module.$method_table.hasOwnProperty(method)) {
      // console.log(" ... and adding " + method);
      rb_define_method(klass, method, module.$method_table[method]);
    }
  }
};

rb_extend_module = function(klass, module) {
  if (!klass.$extended_modules) {
    klass.$extended_modules = [];
  }

  if (klass.$extended_modules.indexOf(module) != -1) {
    return;
  }
  klass.$extended_modules.push(module);
  
  if (!module.$extended_in) {
    module.$extended_in = [];
  }

  module.$extended_in.push(klass);

  var meta = klass.$klass;
  
  for (var method in module.$method_table) {
    // rb_define_method_raw(klass.$klass, method, module.$method_table[method]);
    if (module.$method_table.hasOwnProperty(method)) {
      rb_define_method(meta, method, module.$method_table[method]);
    }
  }
};

// Boot a base class (only use for very core object classes)
var boot_defclass = function(id, super_klass) {
  var result = rb_class_boot(super_klass);
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
};

// Like boot_defclass, but for root object only (i.e. basicobject)
var boot_defrootclass = function(id) {
  var result = new RClass(null, null);
  // FIXME: set flags - do we need this. already done for us?
  result.$flags = T_CLASS;
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
};


// Create a new subclass of the given superclass. We do not name it yet.
var rb_class_boot = $opal.class_boot = function(superklass) {
  // instances of the new class..
  var cls = function() {
    this.$id = opal_yield_hash();
  };

  var tmp_cls = function() {};
  tmp_cls.prototype = superklass.allocator.prototype;
  cls.prototype = new tmp_cls();

  var prototype = cls.prototype;
  prototype.constructor = cls;
  prototype.$flags = T_OBJECT;
  //prototype.$method_table = {};

  // the class object itself
  var meta = function() {
    this.$id = opal_yield_hash();
  };

  var tmp_meta = function() {};
  tmp_meta.prototype = superklass.constructor.prototype;
  meta.prototype = new tmp_meta();

  prototype = meta.prototype;
  prototype.allocator = cls;
  prototype.$flags = T_CLASS;
  prototype.$method_table = {};
  prototype.constructor = meta;
  prototype.$super = superklass;

  // constants
  prototype.$constants = new superklass.$constants_alloc();
  prototype.$constants_alloc = function() {};
  prototype.$constants_alloc.prototype = prototype.$constants;

  var result = new meta();
  cls.prototype.$klass = result;
  return result;

  // console.log("calling rb_class_boot for super:");
  // console.log(superklass);
  // throw "a";
  // if (super_class) {
  //   var ctor = function() {};
  //   ctor.prototype = super_class.constructor.prototype;
  //   var result = function() {
  //      RClass.call(this, null, super_class); return this;
  //   };
  //   result.prototype = new ctor();
  //   var klass = new result();
  //   klass.$klass = rb_cClass;
  //   return klass;
  // }
  // else {
  //   var result = new RClass(null, null);
  //   return result;
  // }
};

// @global
rb_class_real = function(klass) {
  while (klass.$flags & FL_SINGLETON) { klass = klass.$super; }
  return klass;
};

// Name the class with the given id.
var rb_name_class = function(klass, id) {
  klass.__classid__ = id;
};

// make metaclass for the given class
var rb_make_metaclass = function(klass, super_class) {
  // console.log("making metaclass for " + klass.__classid__);
  // if klass is a class, and it is a singleton..
  if ((klass.$flags & T_CLASS) && (klass.$flags & FL_SINGLETON)) {
    // console.log("ok");
    // throw "need to implement in rb_make_metaclass"
    return make_metametaclass(klass);
  }
  else {
    // console.log("using else");
    // console.log(super_class);
    // our meta is a 'subclass' of the superclass
    var meta = rb_class_boot(super_class);
    // meta is now also a singleton (as well as class)
    meta.$flags |= FL_SINGLETON;
    // the class of a class is its meta
    klass.$klass = meta;
    // fix method table
    // klass.$m = meta.$m_tbl;
    // fix const table
    // meta.$c = klass.$c;
    // console.log("meta is:");
    // console.log(meta);
    // attach the meta to the klass (so we can refer to it later)
    rb_singleton_class_attached(meta, klass);
    
    return meta;
  }
};

var rb_singleton_class_attached = function(klass, obj) {
  // make sure klass is a singleton
  if (klass.$flags & FL_SINGLETON) {
    
    // console.log("setting attacjed..");
    rb_ivar_set(klass, '__attached__', obj);
    klass.allocator.prototype = obj.constructor.prototype;
  }
};

var make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;
  
  if (metaclass.$klass == metaclass) {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metametaclass;
  }
  else {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metaclass.$klass.$klass == metaclass.$klass ? 
        make_metametaclass(metaclass.$klass) : 
        metaclass.$klass.$klass;
  }
  
  metametaclass.$flags |= FL_SINGLETON;
  
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.$klass = metametaclass;
  metaclass.$m = metametaclass.$m_tbl;
  super_of_metaclass = metaclass.$super;
  
  // while (super_of_metaclass)
  
  metametaclass.$super = rb_ivar_get(super_of_metaclass.$klass, '__attached__') 
        == super_of_metaclass
        ? super_of_metaclass.$klass
        : make_metametaclass(super_of_metaclass);
  
  return metametaclass;
};

// 
var boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

// define toll free bridged class
// @local
var rb_define_toll_free_class = function(constructor, flags, id, superklass) {
  var klass = rb_define_class(id, superklass);
  
  
  var old_allocator = klass.allocator.prototype;

  klass.allocator = constructor;
  var prototype = constructor.prototype;

  prototype.$flags = flags;
  prototype.$klass = klass;
  prototype.$r = true;
  prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  // We introduce a MASSIVE hack here. We secretly include Object into all
  // bridged classes so that any method defined on Object, or any module
  // included into Object will also be included into our natives like 
  // Array, String etc. BIG hack, but it works. We do this even though
  // Object isnt  a module.. ka pessh ka pow.
  rb_include_module(klass, rb_cObject);

  rb_const_set(rb_cObject, id, klass);
  return klass;
};

// define a new class (normal way), with the given id and superclass. Will be
// top level.
rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_cObject, id, super_klass);
};

var rb_define_class_under = function(base, id, super_klass) {
  // console.log("DEFINING " + id);
  var klass;
  // if already defined, just ensure right type then return the existing class
  if (rb_const_defined(base, id)) {
    // console.log("CONST DEFINED");
    // check its a class?
    return rb_const_get(base, id);
  }
  
  // console.log(super_klass.constructor);
  klass = rb_define_class_id(id, super_klass);
  
  rb_name_class(klass, id);
  rb_const_set(base, id, klass);
  // if (klass !== rb_object)
  klass.$parent = base;
  // rb_class_inherited(super_klass, klass);
  return klass;
};

// Actually create class
var rb_define_class_id = function(id, super_klass) {
  var klass;
  
  if (!super_klass)
    super_klass = rb_cObject;
    // console.log("A");
  klass = rb_class_create(super_klass);
  rb_name_class(klass, id);
  // console.log("B " + id);
  rb_make_metaclass(klass, super_klass.$klass);
  return klass;
};

var rb_class_create = function(super_klass) {
  return rb_class_boot(super_klass);
};

// get singleton class of obj
var rb_singleton_class = function(obj) {
  // console.log("getting singleton class for " + obj.__classid__);
  // console.log(obj);
  var obj;
  //console.log("rb_singleton_class:");
  //console.log(obj);
  // print('finding singleton class for ' + obj.__classid__);
  // console.log("checking for id: " + obj.$h);
  if (obj == rb_cObject) {
    //console.log("right. cchecking rb_cObject");
  }
  // check if number, string etc.. and throw error?
  if ((obj.$klass.$flags & FL_SINGLETON)&& rb_ivar_get(obj.$klass, '__attached__') == obj) {
    // console.log("returning on attacked");
    // print("returning on attached");
    // for (var prop in obj.$k) {print (prop); print(obj.$k[prop]);}
    klass = obj.$klass;
  }
  else {

    var orig_klass = obj.$klass;
    klass = rb_class_boot(orig_klass);

    klass.$flags = klass.$flags | FL_SINGLETON;
    obj.$klass = klass;
    klass.__attached__ = obj;

    // basically, to keep right chain, when making singleton for a class, we want new methods
    // to be set on the constructor for the object so that subclasses inherit these new methods.
    // When setting on an object instance, we do not want to set it on the constructor, otherwise
    // Object will inherit methods set on top_self etc, and this goes for all singleton objects. 
    //
    // FIXME: we could reset the constructor on the obj to our new singleton class and then do
    // rb_singleton_class_attached... makes sure if we create a new instance of our singleton then
    // that will also get the methods (say we do (class << self; self; end).new)
    if (obj.$flags & T_OBJECT) {
      klass.allocator.prototype = obj;
    } else {
      rb_singleton_class_attached(klass, obj);
    }
    klass.$klass = rb_class_real(orig_klass).$klass;
  }
  
  return klass;
};

$opal.rb_singleton_class = rb_singleton_class;

// obj must be an obj
var make_singleton_class = function(obj) {

};

var RHash = function(args) {
  var k, v;
  this.$keys = [];
  this.$assocs = {};
  this.$default = Qnil;
  for (var i = 0; i < args.length; i++) {
    k = args[i];
    v = args[i+1];
    i++;
    this.$keys.push(k);
    this.$assocs[k.$hash()] = v;
  }
  return this;
};

// Symbol table
var symbol_table = { };

var rb_cRange;

/**
  Global VM method used for creating a range (from the VM)
  
  FIXME: This should be placed in vm.js
*/
global.rb_vm_range = function(beg, end, exclude_end) {
  return new RRange(beg, end, exclude_end);
};

/**
  Range ruby object
*/
function RRange(beg, end, exclude_end) {
  // begin - first item belonging to range
  this.$beg = beg;
  // end - last item belonging to range
  this.$end = end;
  // exclude end - whether last item is excluded or not
  this.$exc = exclude_end;
  return this;
}


var rb_cRegexp;

// @class MatchData
var rb_cMatch;

function match_to_a(match, mid) {
  return rb_ivar_get(match, "@data");
}

function match_inspect(match, mide) {
  return "#<MatchData \"\">";
}

function match_aref(match, mid, idx) {
  return Qnil;
}

// Exception classes
var rb_eException,
    rb_eStandardError,
    rb_eLocalJumpError,
    rb_eNameError,
    rb_eNoMethodError,
    rb_eArgError,
    rb_eScriptError,
    rb_eLoadError,
		rb_eRuntimeError,
		rb_eTypeError,
		rb_eIndexError,
		rb_eKeyError,
		rb_eRangeError;

// Standard jump exceptions to save re-creating them everytime they are needed
var rb_vm_return_instance,
		rb_vm_loop_return_instance,
		// disgard this? yes we can!
		rb_vm_block_return_instance,
		rb_vm_next_instance,
		rb_vm_break_instance;

Error.prepareStackTrace = function(error, stack) {
  var parts = [];
  // actual error
  //console.log("about to raise");
  if (error.$klass)
    parts.push(error.$klass.__classid__ + ': ' + error.message);
  else
    parts.push(error.toString());

  for (var i = 0; i < stack.length; i++) {
    var part = stack[i], func = part.getFunction();

    // we are only interested in ruby methods..
    if (func.$rbName || true) {
      parts.push('\tfrom ' + (part.getFileName() || '(irb)') + ':' + part.getLineNumber() + ':in `' + func.$rbName + '\'');
    }
  }

  return parts.join('\n');
};





// Returns a new string object containing a copy of `str`.
// 
// @param [String] str string to copy
// @return [String] result
function str_s_new(str, mid, text) {
	return new String(text || "");
};


/**
	Creates a new hash populated with the given objects. Equivalent to the 
	literal `{ key => value, ... }`. 

	@example
	  Hash["a", 100, "b", 200]
	  # => {"a" =>100, "b"=>200}

	@return [Hash]
*/
function hash_s_create(obj, mid) {
	return opalhash.apply(null, Array.prototype.slice.call(arguments, 2));
}

function class_s_new(sup) {
  var klass = rb_define_class_id("AnonClass", sup || rb_cObject);
  return klass;
};

function class_new_instance() {

  var obj = this.m$allocate();
  var args = Array.prototype.slice.call(arguments);
  // args[0] = obj;

  if ($opal.P.f == arguments.callee) {
    $opal.P.f = obj.m$initialize;
  }

  obj.m$initialize.apply(obj, args);
  return obj;
};

function class_initialize(cla, mid, sup) {
	// print("in Class.new initialize");
	var klass = rb_define_class_id('', sup || rb_cObject);
	return klass;
}


/**
	Prints each argument in turn to the browser console. Currently there is no
	use of `$stdout`, so it is hardcoded into this method to write to the 
	console directly.

	@param [Object] args objects to print using `inspect`
	@return [nil]
*/
function obj_puts(ob) {
	var args = Array.prototype.slice.call(arguments, 0);
	
	for (var i = 0; i < args.length; i++) {
		// console.log((args[i].$m.to_s(args[i])).toString());
    console.log(args[i].m$to_s().toString());
	}
	
	return Qnil;
}

/**
  @example
  
    !obj  # => true or false
*/
function obj_not(obj, mid) {
  return obj.$r ? Qfalse : Qtrue;
}

/**
  @example
  
    obj != obj2  # => true or false
*/
function obj_not_equal(obj1, mid, obj2) {
  var res = obj1.$m['=='](obj1, obj2);
  return res.$r ? Qfalse : Qtrue;
}

// exports become our runtime $opal object
//module.exports = $opal;
for (var prop in $opal) {
  exports[prop] = $opal[prop];
}

