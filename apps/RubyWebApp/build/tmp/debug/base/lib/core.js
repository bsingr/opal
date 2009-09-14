/* 
 * core.js
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
var VN = { 
  
  /**
    VALUE types
  */
  T_NONE: 0,

  T_OBJECT: 1,
  T_CLASS: 2,
  T_MODULE: 3,
  T_FLOAT: 4,
  T_STRING: 5,
  T_REGEXP: 6,
  T_ARRAY: 7,
  T_HASH: 8,
  T_STRUCT: 9,
  T_BIGNUM: 0,
  T_FILE: 1,
  T_DATA: 2,
  T_MATCH: 3,
  T_COMPLEX: 4,
  T_RATIONAL: 5,

  T_NIL: 6,
  T_TRUE: 7,
  T_FALSE: 8,
  T_SYMBOL: 9,
  T_FIXNUM: 0,

  T_UNDEF: 1,
  T_NODE: 2,
  T_ICLASS: 3,
  T_ZOMBIE: 4,

  T_MASK: 1,
  
  /**
    Method types
  */
  NOEX_PUBLIC: 0,
  NOEX_PRIVATE: 1,
  NOEX_PROTECTED: 2,
  NOEX_UNDEF: 3,
  
  /**
    Objects
  */
  RObject: function() {
    this.iv_tbl = { } ;
    this.klass = null ;
    this.type = VN.T_OBJECT ;
    return this;
  },
  
  RClass: function() {
    this.klass = null;
    this.iv_tbl = { } ;
    this.m_tbl = { } ;
    this.super_klass = null;
    this.type = null;
    this.singleton = false;
    return this;
  },
  
  // Float 
  RFloat: function() {
    this.klass = null ;
    this.type = null ;
    // native Number
    this.float_value = null;
    return this;
  },

  RString: function() {
    this.klass = null ;
    this.type = null ;
    // native String
    this.ptr = null ;
    return this;
  },

  RArray: function() {
    this.klass = null;
    this.type = null;
    // native Array
    this.ptr = null;
    return this;
  },

  RRegexp: function() {
    this.klass = null;
    this.type = null;
    // other stuff....
    return this;
  },

  RHash: function() {
    this.klass = null ;
    this.type = null;
    this.ifnone = null ;
    // store as array... must keep it ordered! 1.9

    return this;
  },

  RBignum: function() {
    this.klass = null;
    this.type = null;
    // native Number;
    this.digits = null;
    return this ;
  },
  
  /**
    Class
  */
  class_inherited: function(super_klass, klass) {
    if (!super_klass) super_klass = VN.cObject ;
    return VN.funcall(super_klass, 'inherited', [klass]);
  },
  
  define_class: function(id, super_klass) {
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
  },
  
  define_class_under: function(outer, id, super_klass) {
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
  },

  define_module: function(id) {
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
  },

  define_module_under: function() {
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
  },

  define_module_id: function(id) {
    var mdl = VN.module_new();
    VN.name_class(mdl, id);
    return mdl;
  },

  module_new: function() {
    var mdl = VN.class_alloc(VN.T_MODULE, VN.cModule);
    return mdl;
  },

  include_module: function(klass, module) {
    // console.log('include_module not yet implemented');
    if (module.type != VN.T_MODULE) {
      // error?
    }
  },

  name_class: function(klass, id) {
    VN.ivar_set(klass, '__classid__', id);
  },

  class_name: function(klass) {
    return VN.class_path(VN.class_real(klass));
  },

  class2name: function(klass) {
    // need to convert into RString..
    return VN.class_name(klass);
  },

  obj_classname: function(obj) {
    return VN.class2name(obj.klass);
  },

  make_metaclass: function(obj, super_klass) {
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
  },

  singleton_class_attached: function(klass, obj) {
    if (klass.singleton == true) {
      klass.iv_tbl['__attached__'] = obj;
    }
  },

  make_metametaclass: function(metaclass) {
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
  },

  class_real: function(klass) {
    return klass;
  },

  define_alloc_func: function(klass, func) {
    // console.log('ALLOC func');
    // console.log(VN.singleton_class(klass));
    VN.add_method(VN.singleton_class(klass), 'allocate', func, 0, VN.NOEX_PRIVATE);
  },
  
  undef_alloc_func: function(klass) {
    VN.add_method(VN.singleton_class(klass), 'allocate', null, 0, VN.NOEX_UNDEF);
  },

  class_alloc: function(type, klass) {
    var obj = new VN.RClass();
    obj.klass = klass;
    obj.type = type;
    return obj;
  },

  class_boot: function(super_klass) {
    var klass = VN.class_alloc(VN.T_CLASS, VN.cClass);
    klass.super_klass = super_klass; 
    return klass;
  },

  check_inheritable: function(super_klass) {
    if (super_klass.type != VN.T_CLASS) {
      VN.type_error('super class must be a Class (' + VN.obj_classname(super_klass) + ' given)');
    }
    if (super_klass.singleton) {
      VN.type_error('can\'t make a subclass of singleton class');
    }
  },

  class_new: function(super_klass) {
    VN.check_inheritable(super_klass);
  
    if (super_klass == VN.cClass) {
      VN.raise(VN.TypeError, "can't make subclass of Class")
    }
    return VN.class_boot(super_klass);
  },

  define_class_id: function(id, super_klass) {
    var klass;
    if (!super_klass) super_klass = VN.cObject;
    klass = VN.class_new(super_klass);
    VN.make_metaclass(klass, super_klass.klass);
    return klass;
  },

  singleton_class: function(obj) {
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
  },

  /**
    Methods
  */
  define_method: function(klass, name, func, argc) {
    VN.add_method(klass, name, func, argc, VN.NOEX_PUBLIC);
  },

  define_protected_method: function(klass, name, func, argc) {
    VN.add_method(klass, name, func, argc, VN.NOEX_PROTECTED);
  },

  define_private_method: function(klass, name, func, argc) {
    VN.add_method(klass, name, func, argc, VN.NOEX_PRIVATE);
  },

  undef_method: function(klass, name) {
    VN.add_method(klass, name, null, 0, VN.NOEX_UNDEF);
  },

  add_method: function(klass, id, func, argc, noex) {
    // throw 'add_method not implemented'
    if (!klass) klass = VN.cObject ; // no class, so assign it to Object#id
    // console.log('add method:' + klass.iv_tbl.__classid__ + '#' + id);
    klass.m_tbl[id] = func;
  },

  define_singleton_method: function(obj, name, func, argc) {
    VN.define_method(VN.singleton_class(obj), name, func, argc);
  },
  
  define_alias: function(id1, id2) {
    
  },

  search_method: function(klass, id) {
    if (!klass) return undefined ;
    var func;
    while (!(func = klass.m_tbl[id])) {
      klass = klass.super_klass;
    
      if (!klass) return undefined ;
    }
    return func;
  },

  funcall: function(recv, id, args) {
    // console.log(recv + '#' + id + ' ...... ' + args);
    // console.log(VN.search_method(recv.klass, id));
    var method = VN.search_method(recv.klass, id);
    console.log(recv);
    if (!method) throw 'VN#funcall cannot find method: ' + id ;
    // console.log('found methods ' + id);
    // console.log(id);
    // args.unshift(recv);
    // return method.apply(window, args);
    return method.apply(recv, args) ;
  },

  /**
    Instance Variables
  */
  ivar_set: function(obj, id, val) {
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
  },

  ivar_get: function(obj, id) {
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
    // console.log(obj);
    VN.warning('instance variable ' + id + ' not initialized');
    return VN.Qnil;
  },

  /**
    Class variables
  */
  cvar_get: function(klass, id) {
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
    return VN.Qnil;
  },

  /**
    Constants
  
    Constants are set in the iv_tbl of the Class itself. They are easily
    distinguishable from class variables, as the constants begin with an
    uppcase letter. Top level constants (defined in the main context) must
    be treated with consideration (as main is an object, not a class).
  */
  const_set: function(klass, id, val) {
    VN.mod_av_set(klass, id, val, true);
  },

  mod_av_set: function(klass, id, val, isconst) {
    // need to check if already set......
    klass.iv_tbl[id] = val;
  },

  const_get: function(klass, id) {
  
  },

  top_const_get: function(id) {
    var value;

    return undefined;
  },

  const_defined_0: function(klass, id, exclude, recurse) {
  
  },

  const_defined: function(klass, id) {
    return VN.const_defined_0(klass, id, false, true);
  },
  
  define_const: function(klass, id, val) {
    VN.const_set(klass, id, val);
  },
  
  define_global_const: function(id, val) {
    VN.define_const(VN.cObject, id, val);
  },

  /**
    Globals
  */
  gvar_get: function(id) {
  
  },

  gvar_set: function(id, val) {
  
  },

  /**
    Initialise var tables
  */
  global_tbl: { }, // globals are stored here
  class_tbl: { },  // all classes are stored here

  /**
    Object
  */
  boot_defclass: function(id, super_klass) {
    var obj = VN.class_boot(super_klass);
    VN.name_class(obj, id);
    VN.class_tbl[id] = obj;
    VN.const_set((VN.cObject ? VN.cObject : obj), id, obj);
    return obj;
  },

  boot_defmetametaclass: function(klass, metametaclass) {
    klass.klass.klass = metametaclass;
  },

  obj_alloc: function(klass) {
    var obj;
  
    // if (klass.super_klass == null && klass != VN.cBasicObject) {
    //   VN.type_error('can\'t instantiate uninitialized class');
    // }
    // siingleton...
  
    obj = VN.funcall(klass, 'allocate', []);
    return obj;
  },
  
  class_allocate_instance: function() {
    var obj = new VN.RObject() ;
    obj.klass = this ;
    obj.type = VN.T_OBJECT ;
    return obj;
  },
  
  /**
    Dummy function to do nothing (empty implementation)
  */
  obj_dummy: function() {
    return VN.Qnil ;
  },
  
  equal: function(obj) {
    if (obj == this) return VN.Qtrue ;
    var result = VN.funcall(this, '==', [obj]);
    if (VN.RTEST(result)) return VN.Qtrue ;
    return VN.Qfalse ;
  },

  eql: function(obj) {
    return VN.funcall(this, '==', [obj]);
  },

  obj_equal: function(obj) {
    if (obj == this) return VN.Qtrue ;
    return VN.Qfalse ;
  },
  
  // Truthiness test. True unless Qfalse or Qnil
  RTEST: function(v) {
    return ((v != VN.Qfalse) && (v != VN.Qnil)) ;
  },
  
  NIL_P: function(v) {
    return (v == VN.Qnil) ;
  },
    
  warning: function(message) {
    console.log('Vienna Warning: ' + message);
  }
};

/**
  Very top level BasicObject, Object, Class, Module.
*/
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

/**
  BasicObject necessary methods
*/
VN.define_private_method(VN.cBasicObject, 'initialize', VN.obj_dummy, 0);
VN.define_alloc_func(VN.cBasicObject, VN.class_allocate_instance);
VN.define_method(VN.cBasicObject, '==', VN.obj_equal, 1);
VN.define_method(VN.cBasicObject, 'equal?', VN.obj_equal, 1);
VN.define_method(VN.cBasicObject, '!', VN.obj_not, 0);
VN.define_method(VN.cBasicObject, '!=', VN.obj_not_equal);
VN.define_private_method(VN.cBasicObject, 'singleton_method_added', VN.obj_dummy, 1);
VN.define_private_method(VN.cBasicObject, 'singleton_method_removed', VN.obj_dummy, 1);
VN.define_private_method(VN.cBasicObject, 'singleton_method_undefined', VN.obj_dummy, 1);

/**
  Kernel neccessary methods
*/
VN.mKernel = VN.define_module("Kernel");
VN.include_module(VN.cObject, VN.mKernel);
VN.define_private_method(VN.cClass, 'inherited', VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, 'included', VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, 'extended', VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, 'method_added', VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, 'method_removed', VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, 'method_undefined', VN.obj_dummy, 1);

/**
  Base Classes/Modules
*/
VN.cNilClass = VN.define_class("NilClass", VN.cObject);
VN.cTrueClass = VN.define_class('TrueClass', VN.cObject);
VN.cFalseClass = VN.define_class('FalseClass', VN.cObject);
VN.cArray = VN.define_class('Array', VN.cObject);
VN.cString = VN.define_class('String', VN.cObject);
VN.cSymbol = VN.define_class('Symbol', VN.cObject);

/**
  Instance types.
*/
VN.Qfalse = {
  klass: VN.cFalseClass,
  type: VN.T_FALSE
};

VN.Qtrue = {
  klass: VN.cTrueClass,
  type: VN.T_TRUE
};

VN.Qnil = {
  klass: VN.cNilClass,
  type: VN.T_NIL
};

VN.Qundef = 6 ; // ?


VN.require('core/kernel');

VN.require('core/nil_class');

VN.require('core/module');

VN.require('core/class');

VN.require('core/true_class');

VN.require('core/false_class');

/**
  Initialize top self - the 'main' object at runtime
*/
VN.top_self = VN.obj_alloc(VN.cObject);

VN.main_to_s = function() {
  return 'main' ;
};

VN.define_singleton_method(VN.top_self, 'to_s', VN.main_to_s, 0);


VN.require('core/string');

VN.require('core/array');

VN.require('core/other');
