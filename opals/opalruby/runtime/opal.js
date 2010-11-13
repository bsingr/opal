
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
rb_basic_object = null,
    rb_object = null,
    rb_module = null,
    rb_class = null;

// Other core classes/modules
var rb_kernel,
    rb_nil_class,
    rb_symbol,
    rb_string,
    rb_array,
    rb_number,
    rb_true_class,
    rb_false_class;

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
var rb_vm_methods = {
  // define a class/module
  $dc: function(sup, id, body, flag) {
    // print("defining class " + id + ", " + flag);
    var klass, base = this;
    // print("original base is " )
    // if base is an object, use its class.
    if (base.$f & T_OBJECT)
      base = rb_class_real(base.$k);
    
    // print("base is now: " + base.$h);
    // for (var prop in base.$c) print(base.$c[prop]);
    
    switch (flag) {
      // normal class
      case 0:
        if (sup === rb_nil)
          sup = rb_object;

        klass = rb_define_class_under(base, id, sup);
        break;
      case 1:
        // throw "running class shift for " + id.class_name
        klass = id.singleton_class();
        // return;
        break;
      case 2:
        klass = rb_define_module_under(base, id);
        break;
      default:
        throw "define_class: unknown flag: " + flag
    }
    
      return body(klass);
  },
  
  // define method (normal or singleton)
  $dm: function(m_id, body, singleton) {
    var base = this;
    // print("in define method for: " + m_id);
    if (singleton) {
      // return rb_define_singleton_method(rb_singleton_class(base), m_id, body);
    }
    else {
      if (base.$f & T_OBJECT) base = base.$k;
      return rb_define_method(base, m_id, body);
    }
  },
  
  // every ruby object can reference back to opal through this.
  $opal: exports,
  
  // used for method missing.. need to cerate a closure to call MM
  $M: function(m_id) {
    throw "Error: self does not respond to " + m_id
  },
  
  // const get
  $cg: function(id) {
    var base = this;
    if (base.$f & T_OBJECT)
      base = rb_class_real(base.$k);
    
    return rb_const_get(base, id);
  },
  
  // const set
  $cs: function(id, val) {
    
    var base = this;
    if (base.$f & T_OBJECT) base = base.$k;
    
    return rb_const_set(base, id, val);
  }
  
};

exports.log = function(str) {
  // print("need to print string:");
  
  print(str);
};

// The root class. Every class in opal is an instance of RClass.
var RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$h = opal_yield_hash();
  // Ivars. All ivars etc stored in here
  this.$i = {};
  // Constants. All constants belonging to class stored here.
  this.$c = {};
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
  }
  else {
    // console.log("making fresh");
    // root object behaviour..
    var m_ctor = function() {};
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
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
  // Ivars.
  this.$i = {};
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


var rb_core_vm_objects = [RClass.prototype, RObject.prototype, Array.prototype, Number.prototype, String.prototype, Function.prototype];

for (var prop in rb_vm_methods) {
  if (rb_vm_methods.hasOwnProperty(prop)) {
    for (var i = 0; i < rb_core_vm_objects.length; i++) {
      rb_core_vm_objects[i][prop] = rb_vm_methods[prop];
    }
  }
}

// rb_vm_methods

// Boot a base class (only use for very core object classes)
var boot_defclass = function(id, super_klass) {
  var result = rb_class_boot(super_klass);
  rb_name_class(result, id);
  rb_const_set((rb_object || result), id, result);
  return result;
};

// Like boot_defclass, but for root object only (i.e. basicobject)
var boot_defrootclass = function(id) {
  var result = new RClass(null, null);
  // FIXME: set flags - do we need this. already done for us?
  result.$f = T_CLASS;
  rb_name_class(result, id);
  rb_const_set((rb_object || result), id, result);
  return result;
}

// Create a new subclass of the given superclass. We do not name it yet.
var rb_class_boot = function(super_class) {
  
  var ctor = function() {};
  ctor.prototype = super_class.constructor.prototype;
  var result = function() { RClass.call(this, null, super_class); return this; };
  result.prototype = new ctor();
  return new result();
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
  // if klass is a class, and it is a singleton..
  if ((klass.$f & T_CLASS) && (klass.$f & FL_SINGLETON)) {
    // console.log("ok");
    throw "need to implement in rb_make_metaclass"
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

// 
var boot_defmetametaclass = function(klass, metametaclass) {
  klass.$k.$k = metametaclass;
};

// define a top level module with the given id
var rb_define_module = function(id) {
  return rb_define_module_under(rb_object, id);
};

var rb_define_module_under = function(base, id) {
  var module;
  
  // if module already exists..
  if (rb_const_defined(base, id)) {
    // make sure it is a module, otherwise error (trying to change class)
    module = rb_const_get(base, id);
    if (module.$f & T_MODULE) {
      return module;
    }
    
    throw id + " is not a module."
  }
  
  module = rb_define_module_id(id);
  rb_const_set(base, id, module);
  return module;
};

var rb_define_module_id = function(id) {
  var module = rb_mod_create();
  module.$f = T_MODULE;
  rb_name_class(module, id);
  return module;
};

var rb_mod_create = function() {
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
  // print(rb_kernel.$h);
  // print(module.$h);
  
  module.$included_in.push(klass);
  // print(rb_kernel.$included_in);
  // print(module.method_table);
  for (var method in module.$method_table) {
    // print("adding method: " + method);
    // check to make sure we are not overriding? if so, add it to the superclass
    // of klass.
    klass.$m_prototype_tbl[method] = module.$method_table[method];
  }
  
};

// define a new class (normal way), with the given id and superclass. Will be
// top level.
var rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_object, id, super_klass);
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
  // rb_class_inherited(super_klass, klass);
  return klass;
};

// Actually create class
var rb_define_class_id = function(id, super_klass) {
  var klass;
  
  if (!super_klass)
    super_klass = rb_object;
    // console.log("A");
  klass = rb_class_create(super_klass);
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
  // console.log("checking for id: " + obj.$h);
  if (obj == rb_object) {
    // console.log("right. cchecking rb_object");
  }
  // check if number, string etc.. and throw error?
  if ((obj.$k.$f & FL_SINGLETON)&& rb_ivar_get(obj.$k, '__attached__') == obj) {
    // console.log("returning on attacked");
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
  klass.$c[id] = val;
  return val;
};

var rb_const_get = function(klass, id) {
  if (klass.$c[id])
    return (klass.$c[id]);
    
  throw "Cannot find constant: " + id;
};

// is const defined
var rb_const_defined = function(klass, id) {
  if (klass.$c[id])
    return true;
  
  return false;
};

// set ivar
var rb_ivar_set = function(obj, id, val) {
  obj.$i[id] = val;
  return val;
};

var rb_ivar_get = function(obj, id) {
  return obj.$i[id];
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
        klass.$included_in[i].$m_prototype_tbl['$' + name] = body;
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

rb_basic_object = boot_defrootclass('BasicObject');
rb_object = boot_defclass('Object', rb_basic_object);
rb_module = boot_defclass('Module', rb_object);
rb_class = boot_defclass('Class', rb_module);

rb_const_set(rb_object, 'BasicObject', rb_basic_object);

tmp_metaclass = rb_make_metaclass(rb_basic_object, rb_class);
tmp_metaclass = rb_make_metaclass(rb_object, tmp_metaclass);
tmp_metaclass = rb_make_metaclass(rb_module, tmp_metaclass);
tmp_metaclass = rb_make_metaclass(rb_class, tmp_metaclass);

boot_defmetametaclass(rb_module, tmp_metaclass);
boot_defmetametaclass(rb_object, tmp_metaclass);
boot_defmetametaclass(rb_basic_object, tmp_metaclass);

rb_kernel = rb_define_module('Kernel');

// rb_define_method(rb_kernel, 'require', function(recv, block, path){
  // print("need to require " + path);
// });

rb_include_module(rb_object, rb_kernel);

rb_define_method(rb_class, 'allocate', rb_obj_alloc);
rb_define_method(rb_class, 'new', rb_class_new_instance);
rb_define_method(rb_class, 'initialize', function() {});

// @class Symbol
rb_symbol = rb_define_class('Symbol', rb_object);

// @class String
rb_string = rb_define_class('String', rb_object);
// native string toll free bridging
String.prototype.$k = rb_string;
String.prototype.$m = rb_string.$m_tbl;
// Flags - every native String instance is T_OBJECT and a T_STRING.
String.prototype.$f = T_OBJECT | T_STRING;
// RTest - every string instance is true.
String.prototype.$r = true;

// @class Array
rb_array = rb_define_class('Array', rb_object);
// native array toll free bridging
Array.prototype.$k = rb_array;
Array.prototype.$m = rb_array.$m_tbl;
// flags
Array.prototype.$f = T_OBJECT | T_ARRAY;
// Rtest
Array.prototype.$r = true;

// @class Number
rb_number = rb_define_class('Numeric', rb_object);
// toll free bridging
Number.prototype.$k = rb_number;
Number.prototype.$m = rb_number.$m_tbl;
// flags
Number.prototype.$f = T_OBJECT | T_NUMBER;
// RTest
Number.prototype.$r = true;

// @class TrueClass
rb_true_class = rb_define_class('TrueClass', rb_object);
// true literal
rb_true = rb_obj_alloc(rb_true_class);

// @class FalseClass
rb_false_class = rb_define_class('FalseClass', rb_object);
// false literal
rb_false = rb_obj_alloc(rb_false_class);
// false is false for truthiness
rb_false.$r = false;

// @class NilClass
rb_nil_class = rb_define_class('NilClass', rb_object);
// nil literal
rb_nil = rb_obj_alloc(rb_nil_class);
// nil is false for truthiness
rb_nil.$r = false;

// Top self
rb_top_self = new RObject(rb_object, T_OBJECT);

var rb_main_include = function() {
  // console.log("main include, should error..");
};

rb_define_singleton_method(rb_top_self, 'include', rb_main_include);

// rb_define_singleton_method(rb_object, 'inspect', function(){});
