/* 
 * runtime.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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

/**
  Global namespaced object for all of vienna to run within. When possible, all
  methods, variables etc will be placed within this namespace to avoid conflict
  with other libraries that may be loaded. Some items are used outside this VN
  namespace, including setting the klass/type attributes on object prototypes
  for strings, numbers, arrays, etc.
*/
var VN = { } ;

/**
  VALUE types
*/
VN.T_NONE   = 0;

VN.T_OBJECT = 1;
VN.T_CLASS  = 2;
VN.T_MODULE = 3;
VN.T_FLOAT  = 4;
VN.T_STRING = 5;
VN.T_REGEXP = 6;
VN.T_ARRAY  = 7;
VN.T_HASH   = 8;
VN.T_STRUCT = 9;
VN.T_BIGNUM = 10;
VN.T_FILE   = 11;
VN.T_DATA   = 12;
VN.T_MATCH  = 13;
VN.T_COMPLEX  = 14;
VN.T_RATIONAL = 15;

VN.T_NIL    = 16;
VN.T_TRUE   = 17;
VN.T_FALSE  = 18;
VN.T_SYMBOL = 19;
VN.T_FIXNUM = 20;

VN.T_UNDEF  = 21;
VN.T_NODE   = 22;
VN.T_ICLASS = 23;
VN.T_ZOMBIE = 24;

VN.T_MASK   = 31;

/**
  Method types
*/
VN.NOEX_PUBLIC = 0;
VN.NOEX_PRIVATE = 1;
VN.NOEX_PROTECTED = 2;
VN.NOEX_UNDEF = 3;

/**
  Objects
  
  Strings, Arrays, Numbers etc. are mapped to their native JS equivalents.
*/
VN.RObject = function() {
  this.iv_tbl = { } ;
  this.klass = null;
  this.type = null;
  return this;
};

VN.RClass = function() {
  this.klass = null;
  this.iv_tbl = { } ;
  this.m_tbl = { } ;
  this.super_klass = null;
  this.type = null;
  this.singleton = false;
  return this;
};




/**
  Class
*/
VN.class_inherited = function(super_klass, klass) {
  if (!super_klass) super_klass = VN.cObject;
  return VN.funcall(super_klass, 'inherited', 1, klass);
};

VN.define_class = function(id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return existing class/mod.
  if (VN.const_defined(VN.cObject, id)) {
    klass = VN.const_get(VN.cObject, id);
    if (klass.type != VN.T_CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (VN.class_real(klass.super_klass) != super_klass) {
      VN.name_error(id + ' is already defined');
    }
    return klass;
  }
  if (!super_klass) {
    VN.warn('no super class for `' + id + '`, Object assumed')
  }
  klass = VN.define_class_id(id, super_klass);
  VN.class_tbl[id] = klass;
  VN.name_class(klass, id);
  VN.const_set(VN.cObject, id, klass);
  VN.class_inherited(super_klass, klass);
  return klass;
};

VN.define_class_under = function(outer, id, super_klass) {
  var klass;
  // if already defined in context... just ensure it is a macthing class def
  if (VN.const_defined_at(outer, id)) {
    klass = VN.const_get_at(outer, id);
    if (klass.type != VN.T_CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (VN.class_real(klass.super_klass) != super_klass) {
      VN.name_error(id + ' is already defined');
    }
    return klass;
  }
  // not existing...
  if (!super_klass) {
    VN.warn('no super class for `' + VN.class2name(outer), + '::' + id + '`, Object assumed');
  }
  klass = VN.define_class_id(id, super_klass);
  VN.set_class_path(klass, outer, id);
  VN.const_set(outer, id, klass);
  VN.class_inherited(super_klass, klass);
  
  return klass;
};


VN.define_module = function(id) {
  var module;
  if (VN.const_defined(VN.cObject, id)) {
    module = VN.const_get(VN.cObject, id);
    if (module.type == VN.T_MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = VN.define_module_id(id);
  VN.class_tbl[id] = module;
  VN.const_set(VN.cObject, id, module);
  
  return module;
};

VN.define_module_under = function() {
  var module;
  if (VN.const_defined_at(outer, id)) {
    module = VN.const_get_at(outer, id);
    if (module.type == VN.T_MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = VN.define_module_id(id);
  VN.const_set(outer, id, module);
  VN.set_class_path(module, outer, name);
  return module;
};

VN.define_module_id = function(id) {
  var mdl = VN.module_new();
  VN.name_class(mdl, id);
  return mdl;
};

VN.module_new = function() {
  var mdl = VN.class_alloc(VN.T_MODULE, VN.cModule);
  return mdl;
};

VN.include_module = function(klass, module) {
  throw 'include_module not yet implemented'
  if (module.type != VN.T_MODULE) {
    // error?
  }
};

VN.name_class = function(klass, id) {
  VN.ivar_set(klass, '__classid__', id);
};

VN.class_name = function(klass) {
  return VN.class_path(VN.class_real(klass));
};

VN.class2name = function(klass) {
  // need to convert into RString..
  return VN.class_name(klass);
};

VN.obj_classname = function(obj) {
  return VN.class2name(obj.klass);
};

VN.make_metaclass = function(obj, super_klass) {
  // obj is a metaclass...
  if (obj.type == VN.T_CLASS && obj.singleton == true) {
    return VN.make_metametaclass(obj);
  }
  else {
    var klass = VN.class_boot(super_klass);
    klass.singleton = true;
    obj.klass = klass;
    VN.singleton_class_attached(klass, obj);
    
    var metasuper = VN.class_real(super_klass).klass;
    if (metasuper) {
      klass.klass = metasuper;
    }
    return klass;
  }
};

VN.singleton_class_attached = function(klass, obj) {
  if (klass.singleton == true) {
    klass.iv_tbl['__attached__'] = obj;
  }
};

VN.make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;
  
  if (metaclass.klass == metaclass) {
    metametaclass = VN.class_boot(null);
    metametaclass.klass = metametaclass;
  }
  else {
    metametaclass = VN.class_boot(null);
    metametaclass.klass = metaclass.klass.klass == metaclass.klass ? VN.make_metametaclass(metaclass.klass) : metaclass.klass.klass;
  }
  metametaclass.singleton = true;
  VN.singleton_class_attached(metametaclass, metaclass);
  metaclass.klass = metametaclass;
  
  super_of_metaclass = metaclass.super_klass;
  while (super_of_metaclass.type == VN.T_ICLASS) {
    super_of_metaclass = super_of_metaclass.super_klass;
  }
  
  metametaclass.super_klass = VN.ivar_get(super_of_metaclass.klass, '__attached__') == super_of_metaclass ? super_of_metaclass.klass : VN.make_metametaclass(super_of_metaclass);
  return metametaclass;
}

VN.class_real = function(klass) {
  return klass;
};

VN.define_alloc_func = function(klass, func) {
  console.log('ALLOC func');
  console.log(VN.singleton_class(klass));
  VN.add_method(VN.singleton_class(klass), 'allocate', func, 0, VN.NOEX_PRIVATE);
};

VN.class_alloc = function(type, klass) {
  var obj = new VN.RClass();
  obj.klass = klass;
  obj.type = type;
  return obj;
};

VN.class_boot = function(super_klass) {
  var klass = VN.class_alloc(VN.T_CLASS, VN.cClass);
  klass.super_klass = super_klass; 
  return klass;
};

VN.check_inheritable = function(super_klass) {
  if (super_klass.type != VN.T_CLASS) {
    VN.type_error('super class must be a Class (' + VN.obj_classname(super_klass) + ' given)');
  }
  if (super_klass.singleton) {
    VN.type_error('can\'t make a subclass of singleton class');
  }
};

VN.class_new = function(super_klass) {
  VN.check_inheritable(super_klass);
  
  if (super_klass == VN.cClass) {
    VN.raise(VN.TypeError, "can't make subclass of Class")
  }
  return VN.class_boot(super_klass);
};

VN.define_class_id = function(id, super_klass) {
  var klass;
  if (!super_klass) super_klass = VN.cObject;
  klass = VN.class_new(super_klass);
  VN.make_metaclass(klass, super_klass.klass);
  return klass;
};

VN.singleton_class = function(obj) {
  var klass;
  
  if (obj.type == VN.T_FIXNUM || obj.type == VN.T_SYMBOL) {
    VN.type_error('can\'t define singleton');
  }
  
  if (obj.klass.singleton && VN.ivar_get(obj.klass, '__attached__') == obj) {
    klass = obj.klass;
  }
  else {
    klass = VN.make_metaclass(obj, obj.klass);
  }
  
  if (obj.type == VN.T_CLASS) {
    if (VN.ivar_get(klass.klass, '__attached__') != klass) {
      VN.make_metametaclass(klass);
    }
  }
  
  return klass;
};







/**
  Methods.
*/
VN.define_method = function(klass, name, func, argc) {
  VN.add_method(klass, name, func, argc, VN.NOEX_PUBLIC);
};

VN.define_protected_method = function(klass, name, func, argc) {
  VN.add_method(klass, name, func, argc, VN.NOEX_PROTECTED);
};

VN.define_private_method = function(klass, name, func, argc) {
  VN.add_method(klass, name, func, argc, VN.NOEX_PRIVATE);
};

VN.undef_method = function(klass, name) {
  VN.add_method(klass, name, null, 0, VN.NOEX_UNDEF);
}

VN.add_method = function(klass, id, func, argc, noex) {
  // throw 'add_method not implemented'
  if (!klass) klass = VN.cObject ; // no class, so assign it to Object#id
  console.log('add method:' + klass.iv_tbl.__classid__ + '#' + id);
  klass.m_tbl[id] = func;
};

VN.define_singleton_method = function(obj, name, func, argc) {
  VN.define_method(VN.singleton_class(obj), name, func, argc);
};








VN.search_method = function(klass, id) {
  if (!klass) return undefined ;
  var func;
  while (!(func = klass.m_tbl[id])) {
    klass = klass.super_klass;
    
    if (!klass) return undefined ;
  }
  return func;
};

VN.funcall = function(recv, id, argc, argv) {
  // console.log(recv.iv_tbl.__classid__ + '#' + id);
  // console.log(VN.search_method(recv.klass, id));
  var method = VN.search_method(recv.klass, id);
  if (!method) throw 'VN#funcall cannot find method: ' + id ;
  console.log('found methods ' + id);
  console.log(method);
  // argv.unshift(recv);
  return method.call(window, argv);
};


/**
  Instance Variables
*/

VN.ivar_set = function(obj, id, val) {
  switch (obj.type) {
    case VN.T_OBJECT:
    case VN.T_CLASS:
    case VN.T_MODULE:
      obj.iv_tbl[id] = val;
      break;
    default:
      VN.generic_ivar_set(obj, id, val);
      break;
  }
  return val;
};

VN.ivar_get = function(obj, id) {
  switch (obj.type) {
    case VN.T_OBJECT:
    case VN.T_CLASS:
    case VN.T_MODULE:
      var val;
      if (obj.iv_tbl.hasOwnProperty(id))
        return obj.iv_tbl[id];
      break;
    default:
      // generic...
      break;
  }
  // ivar not initialised in this instance/class etc.
  VN.warning('instance variable ' + id + ' not initialized');
  return nil;
};

/**
  Class variables
*/

VN.cvar_get = function(klass, id) {
  var tmp = klass;
  var value;
  while (tmp) {
    if (tmp.iv_tbl) {
      if (value = tmp.iv_tbl[id]) {
        return value;
      }
    }
    tmp = tmp.super_klass;
  }
  VN.name_error(id, 'uninitialized class variable ' + id + ' in ' + klass.name);
  return VN.nil;
};

/**
  Constants
  
  Constants are set in the iv_tbl of the Class itself. They are easily
  distinguishable from class variables, as the constants begin with an
  uppcase letter. Top level constants (defined in the main context) must
  be treated with consideration (as main is an object, not a class).
*/

VN.const_set = function(klass, id, val) {
  VN.mod_av_set(klass, id, val, true);
};

VN.mod_av_set = function(klass, id, val, isconst) {
  // need to check if already set......
  
  klass.iv_tbl[id] = val;
};

VN.const_get = function(klass, id) {
  
};

// top level lookup
VN.top_const_get = function(id) {
  var value;

  return undefined;
};


VN.const_defined_0 = function(klass, id, exclude, recurse) {
  
};


VN.const_defined = function(klass, id) {
  return VN.const_defined_0(klass, id, false, true);
};



/**
  Globals
*/
VN.gvar_get = function(id) {
  
};

VN.gvar_set = function(id, val) {
  
};

/**
  Initialise var tables
*/
VN.global_tbl = { } ; // globals are stored here
VN.class_tbl = { } ;  // all classes are stored here

/**
  Object
*/
VN.boot_defclass = function(id, super_klass) {
  var obj = VN.class_boot(super_klass);
  VN.name_class(obj, id);
  VN.class_tbl[id] = obj;
  VN.const_set((VN.cObject ? VN.cObject : obj), id, obj);
  return obj;
};

VN.boot_defmetametaclass = function(klass, metametaclass) {
  klass.klass.klass = metametaclass;
};

VN.obj_alloc = function(klass) {
  var obj;
  
  if (klass.super_klass == null && klass != VN.cBasicObject) {
    VN.type_error('can\'t instantiate uninitialized class');
  }
  // siingleton...
  
  obj = VN.funcall(klass, 'allocate', 0, null);
  return obj;
};

VN.class_allocate_instance = function(klass) {
  var obj = new VN.RObject();
  if (!klass) klass = VN.cObject ;
  obj.klass = klass;
  obj.type = VN.T_OBJECT;
  return obj;
};



VN.obj_dummy = function() { return null ;} ;

var metaclass;

VN.cBasicObject = VN.boot_defclass('BasicObject', null);
VN.cObject = VN.boot_defclass('Object', VN.cBasicObject);
VN.cModule = VN.boot_defclass('Module', VN.cObject);
VN.cClass = VN.boot_defclass('Class', VN.cModule);

metaclass = VN.make_metaclass(VN.cBasicObject, VN.cClass);
metaclass = VN.make_metaclass(VN.cObject, metaclass);
metaclass = VN.make_metaclass(VN.cModule, metaclass);
metaclass = VN.make_metaclass(VN.cClass, metaclass);

VN.boot_defmetametaclass(VN.cModule, metaclass);
VN.boot_defmetametaclass(VN.cObject, metaclass);
VN.boot_defmetametaclass(VN.cBasicObject, metaclass);

VN.define_private_method(VN.cBasicObject, 'initialize', VN.obj_dummy, 0);
VN.define_alloc_func(VN.cBasicObject, VN.class_allocate_instance);
VN.mKernel = VN.define_module("Kernel");
// VN.include_module(VN.cObject, VN.mKernel);
VN.define_private_method(VN.cClass, "inherited", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "included", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "extended", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "method_added", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "method_removed", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "method_undefined", VN.obj_dummy, 1);
VN.cNilClass = VN.define_class("NilClass", VN.cObject);
/**
  Initialize top self.

  Top self. This is the 'main' within ruby runtime, that all top level methods
  etc are added to.
*/
VN.top_self = VN.obj_alloc(VN.cObject);
VN.define_singleton_method(VN.top_self, 'to_s', function() {
  return 'main';
}, 0);


/**
  Initialize String
*/
VN.cString = VN.define_class('String', VN.cObject);
// VN.define_alloc_func(VN.cString, function() {
//   return new String();
// });
String.prototype.klass = VN.cString;
String.prototype.type = VN.T_STRING;

/**
  Initialize Array
*/
VN.cArray = VN.define_class('Array', VN.cObject);
// VN.define_alloc_func(VN.cArray, function() {
//   return new Array();
// });
Array.prototype.klass = VN.cArray;
Array.prototype.type = VN.T_ARRAY;
