
// Root Types/Flags
var T_CLASS       = 1,
    T_MODULE      = 2,
    T_OBJECT      = 4,
    T_BOOLEAN     = 8,
    T_STRING      = 16,
    T_ARRAY       = 32,
    T_NUMBER      = 64,
    T_PROC        = 128,
    T_SYMBOL      = 256,
    T_HASH        = 512,
    T_ICLASS      = 1024,
    FL_SINGLETON  = 2056;
    
// Core boot classes
rb_cBasicObject = null,
    rb_cObject = null,
    rb_module = null,
    rb_class = null;

// Other core classes/modules
var rb_mKernel,
    rb_nil_class,
    rb_symbol,
    rb_string,
    rb_array,
    rb_number,
    rb_true_class,
    rb_false_class,
    rb_hash;
    
// Exception classes
var rb_eException,
    rb_eStandardError,
    rb_eLocalJumpError,
    rb_eNameError,
    rb_eNoMethodError,
    rb_eArgError;

// @global Top self context within ruby 
rb_top_self = null;

// some top level objects
rb_nil = null;
rb_false = null;
rb_true = null;

// Every object has a unique id. This count is used as the next id for the next
// created object. Therefore, first ruby object has id 0, next has 1 etc.
var opal_hash_yield = 0;

// Yield the next object id, updating the count, and returning it.
var opal_yield_hash = function() {
  return opal_hash_yield++;
};

// VM Methods. These need to be added to all objects/classes


exports.log = function(str) {
  // print("need to print string:");
  
  print(str);
};

// The root class. Every class in opal is an instance of RClass.
var RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$h = opal_yield_hash();
  // Ivars. All ivars etc stored in here - no longer?
  // this.$i = {};
  // Constants. All constants belonging to class stored here.
  // this.$c = {};
  // SuperClass.
  this.$s = super_klass;
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
RClass.prototype.$f = T_CLASS;
// RTest/truthiness - every RClass instance is true.
RClass.prototype.$r = true;

// The root object. Every object in opal (apart from toll free bridged classes 
// like array, string etc) are an instance of RObject.
var RObject = function(klass) {
  // Hash. get out object_id
  this.$h = opal_yield_hash();
  // Ivars. no longer?
  // this.$i = {};
  // klass of the object becomes klass
  this.$k = klass;
  // from the class, we set our local methods property (in sync with our class)
  this.$m = klass.$m_tbl;
  // return object.
  return this;
};

// Flags - every RObject instance is simply a T_OBJECT
RObject.prototype.$f = T_OBJECT;
// RTest - every RObject instance is true.
RObject.prototype.$r = true;

// Symbol instance
var RSymbol = function(ptr) {
  // hash
  this.$h = opal_yield_hash();
  // ptr
  this.__ptr__ = ptr;
  // Class is rb_symbol
  this.$k = rb_symbol;
  // get methods from class
  this.$m = rb_symbol.$m_tbl;
  // return new sym
  return this;
};

// Symbol table
var symbol_table = { };
// @global - return/create a symbol
opalsym = function(str) {
  if (symbol_table.hasOwnProperty(str))
    return symbol_table[str];
    
  var res = new RSymbol(str);
  symbol_table[str] = res;
  return res;
};


var RHash = function(args) {
  var k, v;
  this.$h = opal_yield_hash();
  this['@keys'] = [];
  this['@assocs'] = {};
  this['@default'] = rb_nil;
  for (var i = 0; i < args.length; i++) {
    k = args[i], v = args[i+1];
    i++;
    this['@keys'].push(k);
    this['@assocs'][k.$hash()] = v;
  }
  return this;
};

// hash
// @global
opalhash = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};



RObject.prototype.$hash = RClass.prototype.$hash = function() {
  return this.$h;
};




// rb_vm_methods

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
  result.$f = T_CLASS;
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
}

// Create a new subclass of the given superclass. We do not name it yet.
var rb_class_boot = function(super_class) {
  // print("rb_class_boot with: " + super_class);
  if (super_class) {
    var ctor = function() {};
    ctor.prototype = super_class.constructor.prototype;
    var result = function() {
       RClass.call(this, null, super_class); return this;
    };
    result.prototype = new ctor();
    var klass = new result();
    klass.$k = rb_class;
    return klass;
  }
  else {
    var result = new RClass(null, null);
    return result;
    }
  
};

// @global
rb_class_real = function(klass) {
  while (klass.$f & FL_SINGLETON) klass = klass.$s;
  return klass;
};

// Name the class with the given id.
var rb_name_class = function(klass, id) {
  rb_ivar_set(klass, '__classid__', id);
};

// make metaclass for the given class
var rb_make_metaclass = function(klass, super_class) {
  // print("making metaclass for " + klass.__classid__);
  // if klass is a class, and it is a singleton..
  if ((klass.$f & T_CLASS) && (klass.$f & FL_SINGLETON)) {
    // console.log("ok");
    // throw "need to implement in rb_make_metaclass"
    return make_metametaclass(klass);
  }
  else {
    // our meta is a 'subclass' of the superclass
    var meta = rb_class_boot(super_class);
    // meta is now also a singleton (as well as class)
    meta.$f |= FL_SINGLETON;
    // the class of a class is its meta
    klass.$k = meta;
    // fix method table
    klass.$m = meta.$m_tbl;
    // fix const table
    meta.$c = klass.$c;
    // attach the meta to the klass (so we can refer to it later)
    rb_singleton_class_attached(meta, klass);
    
    return meta;
  }
};

var rb_singleton_class_attached = function(klass, obj) {
  // make sure klass is a singleton
  if (klass.$f & FL_SINGLETON) {
    // console.log("setting attacjed..");
    rb_ivar_set(klass, '__attached__', obj);
  }
};

var make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;
  
  if (metaclass.$k == metaclass) {
    metametaclass = rb_class_boot(null);
    metametaclass.$k = metametaclass;
  }
  else {
    metametaclass = rb_class_boot(null);
    metametaclass.$k = metaclass.$k.$k == metaclass.$k ? make_metametaclass(metaclass.$k) : metaclass.$k.$k;
  }
  
  metametaclass.$f |= FL_SINGLETON;
  
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.$k = metametaclass;
  metaclass.$m = metametaclass.$m_tbl;
  super_of_metaclass = metaclass.$s;
  
  // while (super_of_metaclass)
  
  metametaclass.$s = rb_ivar_get(super_of_metaclass.$k, '__attached__') == super_of_metaclass ? super_of_metaclass.$k : make_metametaclass(super_of_metaclass);
  return metametaclass;
};

// 
var boot_defmetametaclass = function(klass, metametaclass) {
  klass.$k.$k = metametaclass;
};

// define a top level module with the given id
var rb_define_module = function(id) {
  return rb_define_module_under(rb_cObject, id);
};

var rb_define_module_under = function(base, id) {
  var module;
  // print("defining module " + id);
  // if module already exists..
  if (rb_const_defined(base, id)) {
    // print("already defined");
    // make sure it is a module, otherwise error (trying to change class)
    module = rb_const_get(base, id);
    if (module.$f & T_MODULE) {
      return module;
    }

    throw id + " is not a module."
  }
  
  module = rb_define_module_id(id);
  rb_const_set(base, id, module);
  module.$parent = base;
  return module;
};

var rb_define_module_id = function(id) {
  var module = rb_define_class_id(id, rb_module);
  module.$f = T_MODULE;
  rb_name_class(module, id);
  return module;
};

var rb_mod_create = function() {
  // return // rb_define_class_id()
  return rb_class_boot(rb_module);
};

var rb_include_module = function(klass, module) {
  // print("YEAH");
  // console.log("including " + module.$i.__classid__);
  // make sure our klass has the included modules array
  if (!klass.$included_modules)
    klass.$included_modules = [];
  
  // if we already have the module included, just return
  if (klass.$included_modules.indexOf(module) != -1)
    return;
    
  // make a note of the included module
  klass.$included_modules.push(module);
  // make a note in module that its been included in here? yes we do.
  // print("do we have included_in");
  if (!module.$included_in) {
    // print ("adding inclided in");
    module.$included_in = [];
  }
  
  // print("are we kernel?");
  // print(rb_mKernel.$h);
  // print(module.$h);
  
  module.$included_in.push(klass);
  // print(rb_mKernel.$included_in);
  // print(module.method_table);
  for (var method in module.$method_table) {
    // print("adding method: " + method);
    // check to make sure we are not overriding? if so, add it to the superclass
    // of klass.
    // klass.$m_prototype_tbl[method] = module.$method_table[method];
    rb_define_method(klass, method.substr(1), module.$method_table[method]);
  }
  
};

var rb_extend_module = function(klass, module) {
  if (!klass.$extended_modules)
    klass.$extended_modules = [];
  
  if (klass.$extended_modules.indexOf(module) != -1)
    return;
  
  klass.$extended_modules.push(module);
  
  if (!module.$extended_in)
    module.$extended_in = [];
    
  module.$extended_in.push(klass);
  
  // for (var prop in klass.$k) {
    // print(prop);
    // print(klass.$k[prop]);
  // }
  
  for (var method in module.$method_table) {
    klass.$k.$m_prototype_tbl[method] = module.$method_table[method];
  }
};

// define toll free bridged class
// @local
var rb_define_toll_free_class = function(prototype, flags, id, super_klass) {
  var klass = rb_define_class(id, super_klass);
  
  prototype.$k = klass;
  prototype.$m = klass.$m_tbl;
  prototype.$f = flags;
  prototype.$r = true;
  
  // default hashing behaviour
  prototype.$hash = function() {
    return '$$' + this + '$$';
  };
    
  return klass;
};

// define a new class (normal way), with the given id and superclass. Will be
// top level.
var rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_cObject, id, super_klass);
};

var rb_define_class_under = function(base, id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return the existing class
  if (rb_const_defined(base, id)) {
    // print("already defined..");
    // console.log(id + " alreayd defined");
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
  rb_make_metaclass(klass, super_klass.$k);
  return klass;
};

var rb_class_create = function(super_klass) {
  
  // check inheritable
  // check not rb_class .. error
  return rb_class_boot(super_klass);
};

// get singleton class of obj
var rb_singleton_class = function(obj) {
  var obj;
  print('finding singleton class for ' + obj.__classid__);
  // console.log("checking for id: " + obj.$h);
  if (obj == rb_cObject) {
    // console.log("right. cchecking rb_cObject");
  }
  // check if number, string etc.. and throw error?
  if ((obj.$k.$f & FL_SINGLETON)&& rb_ivar_get(obj.$k, '__attached__') == obj) {
    // console.log("returning on attacked");
    print("returning on attached");
    // for (var prop in obj.$k) {print (prop); print(obj.$k[prop]);}
    klass = obj.$k;
  }
  else {
    var class_id = rb_ivar_get(obj.$k, '__classid__');
    klass = rb_make_metaclass(obj, obj.$k);
    // obj
    // klass = obj.$k;
  }
  
  return klass;
};

// set the constant on the given class
var rb_const_set = function(klass, id, val) {
  // klass.$i[id] = val;
  klass.$c_prototype[id] = val;
  return val;
};

var rb_const_get = function(klass, id) {
  if (klass.$c[id])
    return (klass.$c[id]);
  
  var parent = klass.$parent;
  
  while (parent) {
    if (parent.$c[id])
      return parent.$c[id];
    
    parent = klass.$parent;
  }
  // print("trying from " + klass.__classid__);
  // for (var prop in klass.$c) print(prop);
  // print("Cannot find constant: " + id);
  rb_raise(rb_eNameError, 'uninitialized constant ' + id);
};

// is const defined
var rb_const_defined = function(klass, id) {
  if (klass.$c[id])
    return true;
  
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
  return obj.hasOwnProperty(id) ? obj[id] : rb_nil;
};

// @global
rb_ivar_defined = function(obj, id) {
  return obj.hasOwnProperty(id) ? true : false;
};

// define method
var rb_define_method = function(klass, name, body) {
  // console.log("defininf " + name + " on:");
  // console.log(klass);
  klass.$m_prototype_tbl['$' + name] = body;
  klass.$method_table['$' + name] = body;
  
  // if we are adding to a module, then check to see if mdethod needs to be
  // included into "included_in" classes
  if (klass.$f & T_MODULE) {
    // print("in module for: " + name);
    // print(klass.$h);
    // for (var prop in klass) print(prop);
    if (klass.$included_in) {
      for (var i = 0; i < klass.$included_in.length; i++) {
        // klass.$included_in[i].$m_prototype_tbl['$' + name] = body;
        rb_define_method(klass.$included_in[i], name, body);
      }
      // for (var recv_klass in klass.$included_i)
      // print("need to include in: " + klass.$i.__classid__);
      // klass.$m_prototype_tbl['$' + name] = body;
    }
  }
};

// singleton method
var rb_define_singleton_method = function(klass, name, body) {
  rb_define_method(rb_singleton_class(klass), name, body);
};


// Class#new
var rb_class_new_instance = function(klass) {
  var result = rb_obj_alloc(klass);
  // call initialize
  return result;
};

// Class#allocate
// @global
rb_obj_alloc = function(klass) {
  var result = new RObject(klass, T_OBJECT);
  return result;
};

// ========
// = Boot =
// ========
var tmp_metaclass;

rb_cBasicObject = boot_defrootclass('BasicObject');
rb_cObject = boot_defclass('Object', rb_cBasicObject);
rb_module = boot_defclass('Module', rb_cObject);
rb_class = boot_defclass('Class', rb_module);

rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);

tmp_metaclass = rb_make_metaclass(rb_cBasicObject, rb_class);
tmp_metaclass = rb_make_metaclass(rb_cObject, tmp_metaclass);
tmp_metaclass = rb_make_metaclass(rb_module, tmp_metaclass);
tmp_metaclass = rb_make_metaclass(rb_class, tmp_metaclass);

boot_defmetametaclass(rb_module, tmp_metaclass);
boot_defmetametaclass(rb_cObject, tmp_metaclass);
boot_defmetametaclass(rb_cBasicObject, tmp_metaclass);

rb_mKernel = rb_define_module('Kernel');

// rb_define_method(rb_mKernel, 'require', function(recv, block, path){
  // print("need to require " + path);
// });

rb_include_module(rb_cObject, rb_mKernel);

rb_define_method(rb_class, 'allocate', rb_obj_alloc);
rb_define_method(rb_class, 'new', rb_class_new_instance);
rb_define_method(rb_class, 'initialize', function() {});

// @class Symbol
// rb_symbol = rb_define_class('Symbol', rb_cObject);
rb_symbol = rb_define_toll_free_class(RSymbol.prototype, T_OBJECT | T_SYMBOL, 'Symbol', rb_cObject);

// @class String
rb_string = rb_define_toll_free_class(String.prototype, T_OBJECT | T_STRING, 'String', rb_cObject);

// @class Array
rb_array = rb_define_toll_free_class(Array.prototype, T_OBJECT | T_ARRAY, 'Array', rb_cObject);

// @class Hash
rb_hash = rb_define_toll_free_class(RHash.prototype, T_OBJECT | T_HASH, 'Hash', rb_cObject);

rb_define_method(rb_hash, '__store__', function(self, blk, key, value) {
  print("hashing: " + key);
  print(key.$k.__classid__);
  var hash = key.$hash();
  // if we dont have hashed key, add it
  if (!self['@assocs'].hasOwnProperty(hash)) {
    self['@keys'].push(key);
  }
  
  return self['@assocs'][hash] = value;
});

rb_define_method(rb_hash, '__fetch__', function(self, blk, key) {
  var hash = key.$hash();
  
  // print("looking for " + hash);
  
  // for (var prop in self['@assocs']){
    // print(prop);
    // print(self['@assocs'][prop]);
  // }

  if (self['@assocs'].hasOwnProperty(hash)) {
    return self['@assocs'][hash];
  }
  
  return self['@default'];
});

rb_define_method(rb_hash, '__delete__', function(self, blk, key) {
  var hash = key.$hash();

  if (!self['@assocs'].hasOwnProperty(hash)) {
    var ret = self['@assocs'][hash];
    delete self['@assocs'][hash];
    self['@keys'].splice(self['@keys'].indexOf(key), 1);
    return ret;
  }
  
  return self['@default'];
});

// @class Numeric
rb_number = rb_define_toll_free_class(Number.prototype, T_OBJECT | T_NUMBER, 'Numeric', rb_cObject);

// @class TrueClass
rb_true_class = rb_define_class('TrueClass', rb_cObject);
// true literal
rb_true = rb_obj_alloc(rb_true_class);

// @class FalseClass
rb_false_class = rb_define_class('FalseClass', rb_cObject);
// false literal
rb_false = rb_obj_alloc(rb_false_class);
// false is false for truthiness
rb_false.$r = false;

// @class NilClass
rb_nil_class = rb_define_class('NilClass', rb_cObject);
// nil literal
rb_nil = rb_obj_alloc(rb_nil_class);
// nil is false for truthiness
rb_nil.$r = false;

// Top self
rb_top_self = new RObject(rb_cObject, T_OBJECT);

var rb_main_include = function() {
  // console.log("main include, should error..");
};

rb_define_singleton_method(rb_top_self, 'include', rb_main_include);

// Exception classes
rb_eException = rb_define_class("Exception", rb_cObject);
rb_eStandardError = rb_define_class("StandardError", rb_eException);
rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
rb_eNameError = rb_define_class("NameError", rb_eStandardError);
rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);

// VM Methods
// ==========
// 

// jump error literals. We keep a singular instance to avoid recreating each
// error every time (expensive).
var rb_vm_return_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
rb_ivar_set(rb_vm_return_instance, '@message', 'unexpected return');
rb_vm_return_instance.$keyword = 0;

var rb_vm_loop_return_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
rb_ivar_set(rb_vm_loop_return_instance, '@message', 'unexpected return');
rb_vm_loop_return_instance.$keyword = 1;

// disgard this? yes we can!
var rb_vm_block_return_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
rb_ivar_set(rb_vm_block_return_instance, '@message', 'unexpected return');
rb_vm_block_return_instance.$keyword = 0;

// normal return called in normal context? (should just be the same as block???)
// @global
rb_vm_return = function(value) {
  rb_ivar_set(rb_vm_return_instance, '@exit_value', value);
  throw rb_vm_return_instance;
};

// called (thrown) when returning inside a while loop
// @global
rb_vm_loop_return = function(value) {
  rb_ivar_set(rb_vm_loop_return_instance, '@exit_value', value);
  throw rb_vm_loop_return_instance;
};

// called (thrown) when returning inside a block (that might be called by a 
// while loop
// @global
rb_vm_block_return = function(value) {
  rb_ivar_set(rb_vm_block_return_instance, '@exit_value', value);
  throw rb_vm_block_return_instance;
};




// need fixing:

// global
rb_break = function(value) {
  throw {
    toString: function() {
      return "uncaught break";
    },
    __keyword__: 'break',
    opal_value: value == undefined ? rb_nil : value
  };
};


// raise exception class with our given string
rb_raise = function(exc, str) {
  var exception = new RObject(exc, T_OBJECT);
  rb_ivar_set(exception, '@message', str);
  rb_vm_raise(exception);
};

// raise an exception instance (DO NOT pass strings to this)
rb_vm_raise = function(exc) {
  throw exc;
};
