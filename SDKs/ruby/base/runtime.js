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
    this.type = null ;
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
    return VN.funcall(super_klass, 'inherited', 1, [klass]);
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

  search_method: function(klass, id) {
    if (!klass) return undefined ;
    var func;
    while (!(func = klass.m_tbl[id])) {
      klass = klass.super_klass;
    
      if (!klass) return undefined ;
    }
    return func;
  },

  funcall: function(recv, id, argc, argv) {
    // console.log(recv.iv_tbl.__classid__ + '#' + id);
    // console.log(VN.search_method(recv.klass, id));
    var method = VN.search_method(recv.klass, id);
    if (!method) throw 'VN#funcall cannot find method: ' + id ;
    // console.log('found methods ' + id);
    // console.log(id);
    argv.unshift(recv);
    return method.apply(window, argv);
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
  
    if (klass.super_klass == null && klass != VN.cBasicObject) {
      VN.type_error('can\'t instantiate uninitialized class');
    }
    // siingleton...
  
    obj = VN.funcall(klass, 'allocate', 0, []);
    return obj;
  },

  class_allocate_instance: function(klass) {
    var obj = new VN.RObject();
    if (!klass) klass = VN.cObject ;
    obj.klass = klass;
    obj.type = VN.T_OBJECT;
    return obj;
  },
  
  /**
    Dummy function to do nothing (empty implementation)
  */
  obj_dummy: function() {
    return null ;
  },
  
  equal: function(obj1, obj2) {
    if (obj1 == obj2) return true ;
    var result = VN.funcall(obj1, '==', 1, obj2);
    if (VN.RTEST(result)) return true ;
    return false ;
  },

  eql: function(obj1, obj2) {
    return VN.funcall(obj1, '==', 1, obj2);
  },

  obj_equal: function(obj1, obj2) {
    if (obj1 == obj2) return true ;
    return false ;
  },
  
  // Truthiness test. True unless Qfalse or Qnil
  RTEST: function(v) {
    return ((v != VN.Qfalse) && (v != VN.Qnil)) ;
  },
  
  NIL_P: function(v) {
    return (v == VN.Qnil) ;
  },
  
  to_id: function(name) {
    switch (name.type) {
      case VN.T_STRING:
        return name.ptr;
      case VN.T_SYMBOL:
        return name;
    }
  },
  
  warning: function(message) {
    console.log('Vienna Warning: ' + message);
  }
} ;

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
} ; // ?

VN.Qtrue = {
  klass: VN.cTrueClass,
  type: VN.T_TRUE
} ;

VN.Qnil = {
  klass: VN.cNilClass,
  type: VN.T_NIL
} ;

VN.Qundef = 6 ; // ?

/**
  Kernel
*/
VN.obj_match = function(self, obj2) {
  return VN.Qnil ;
};

VN.obj_not_match = function(self, obj2) {
  var result = VN.funcall(self, '=~', 1, obj2) ;
  return VN.RTEST(result) ? VN.Qfalse : VN.Qtrue ;
};

VN.define_method(VN.mKernel, 'nil?', VN.rb_false, 0);
VN.define_method(VN.mKernel, '===', VN.equal, 1);
VN.define_method(VN.mKernel, '=~', VN.obj_match, 1);
VN.define_method(VN.mKernel, '!~', VN.obj_not_match, 1);
VN.define_method(VN.mKernel, 'eql?', VN.obj_equal, 1);

VN.obj_init_copy = function (self, orig) {
  if (self == orig) return self ;
  if (self.type != orig.type || obj.klass != orig.klass) {
    VN.type_error('initialize_copy should take same class object');
  }
  return self;
};

VN.define_method(VN.mKernel, 'class', VN.obj_class, 0);
VN.define_method(VN.mKernel, 'clone', VN.obj_clone, 0);
VN.define_method(VN.mKernel, 'dup', VN.obj_dup, 0);
VN.define_method(VN.mKernel, 'initialize_copy', VN.obj_init_copy, 1);

VN.define_method(VN.mKernel, 'taint', VN.obj_taint, 0);
VN.define_method(VN.mKernel, 'tainted?', VN.obj_tainted, 0);
VN.define_method(VN.mKernel, 'untaint', VN.obj_untaint, 0);
VN.define_method(VN.mKernel, 'untrust', VN.obj_untrust, 0);
VN.define_method(VN.mKernel, 'untrusted?', VN.obj_untrusted, 0);
VN.define_method(VN.mKernel, 'trust', VN.obj_trust, 0);
VN.define_method(VN.mKernel, 'freeze', VN.obj_freeze, 0);
VN.define_method(VN.mKernel, 'frozen?', VN.obj_frozen_p, 0);

VN.any_to_s = function(self) {
  return VN.str_new_cstr("#<" + VN.obj_classname(self) + ":0x00000000>");
};

VN.inspect = function(self) {
  return VN.str_new_cstr("");
};

VN.obj_methods = function(argc, argv, self) {
  
};

VN.obj_singleton_methods = function(argc, argv, self) {
  
};

VN.obj_protected_methods = function(argc, argv, self) {
  
};

VN.obj_private_methods = function(argc, argv, self) {
  
};

VN.obj_public_methods = function(argc, argv, self) {
  
};

VN.obj_instance_variables = function(self) {
  
};

VN.obj_ivar_get = function(self, iv) {
  return VN.ivar_get(self, VN.to_id(iv)) ;
};


VN.obj_ivar_set = function(self, iv, val) {
  return VN.ivar_set(self, VN.to_id(iv), val) ;
};

VN.obj_ivar_defined = function(self, iv) {
  return VN.ivar_defined(self, VN.to_id(iv)) ;
};

VN.define_method(VN.mKernel, 'to_s', VN.any_to_s, 0);
VN.define_method(VN.mKernel, 'inspect', VN.obj_inspect, 0);
VN.define_method(VN.mKernel, 'methods', VN.obj_methods, -1);
VN.define_method(VN.mKernel, 'singleton_methods', VN.obj_singleton_methods, -1);
VN.define_method(VN.mKernel, 'protected_methods', VN.obj_protected_methods, -1);
VN.define_method(VN.mKernel, 'private_methods', VN.obj_private_methods, -1);
VN.define_method(VN.mKernel, 'public_methods', VN.obj_public_methods, -1);
VN.define_method(VN.mKernel, 'instance_variables', VN.obj_instance_variables, 0);
VN.define_method(VN.mKernel, 'instance_variables_get', VN.obj_ivar_get, 1);
VN.define_method(VN.mKernel, 'instance_variables_set', VN.obj_ivar_set, 2);
VN.define_method(VN.mKernel, 'instance_variables_defined?', VN.obj_ivar_defined, 1);
VN.define_private_method(VN.mKernel, 'remove_instance_variable', VN.obj_remove_instance_variable, 1);

VN.obj_is_instance_of = function(self, klass) {
  switch (klass.type) {
    case VN.T_MODULE:
    case VN.T_CLASS:
    case VN.T_ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  if (self.klass == klass) return VN.Qtrue ;
  return VN.Qfalse ;
};

VN.obj_is_kind_of = function(self, klass) { 
  switch (klass.type) {
    case VN.T_MODULE:
    case VN.T_CLASS:
    case VN.T_ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  var k = self.klass ;
  while (k) {
    if (k == klass || klass.m_tbl == k.m_tbl) {
      return VN.Qtrue;
    }
    k = k.super_klass;
  }
  return VN.Qfalse;
};

VN.obj_tap = function(self) {
  VN.warning('Kernel#tap unimplemented');
};

VN.define_method(VN.mKernel, 'instance_of?', VN.obj_is_instance_of, 1);
VN.define_method(VN.mKernel, 'kind_of?', VN.obj_is_kind_of, 1);
VN.define_method(VN.mKernel, 'is_a?', VN.obj_is_kind_of, 1);
VN.define_method(VN.mKernel, 'tap', VN.obj_tap, 0);

/*
  NilClass
*/
VN.nil_to_i = function(obj) {
    return 0 ;
};

VN.nil_to_f = function(obj) {
    return 0.0 ;
};

VN.nil_to_s = function(obj) {
    return VN.str_new_cstr("") ;
};

VN.nil_to_a = function(obj) {
    return VN.ary_new2(null) ;
};

VN.nil_inspect = function(obj) {
    return VN.str_new_cstr("nil");
};

VN.define_method(VN.cNilClass, 'to_i', VN.nil_to_i, 0);
VN.define_method(VN.cNilClass, 'to_f', VN.nil_to_f, 0);
VN.define_method(VN.cNilClass, 'to_s', VN.nil_to_s, 0);
VN.define_method(VN.cNilClass, 'to_a', VN.nil_to_a, 0);
VN.define_method(VN.cNilClass, 'inspect', VN.nil_inspect, 0);
VN.define_method(VN.cNilClass, '&', VN.false_and, 0);
VN.define_method(VN.cNilClass, '|', VN.false_or, 0);
VN.define_method(VN.cNilClass, '^', VN.false_xor, 0);

VN.define_method(VN.cNilClass, 'nil?', VN.rb_true, 0);
VN.undef_alloc_func(VN.cNilClass);
VN.undef_method(VN.cNilClass.klass, "new");
VN.define_global_const('NIL', VN.Qnil);

/**
  Module
*/
VN.define_method(VN.cModule, 'freeze', VN.mod_freeze, 0);
VN.define_method(VN.cModule, '===', VN.mod_eqq, 1);
VN.define_method(VN.cModule, '==', VN.obj_equal, 1);
VN.define_method(VN.cModule, '<=>', VN.mod_cmp, 1);
VN.define_method(VN.cModule, '<', VN.mod_lt, 1);
VN.define_method(VN.cModule, '<=', VN.class_inherited_p, 1);
VN.define_method(VN.cModule, '>', VN.mod_gt, 1);
VN.define_method(VN.cModule, '>=', VN.mod_ge, 1);

VN.define_method(VN.cModule, 'initialize_copy', VN.mod_init_copy, 1);
VN.define_method(VN.cModule, 'to_s', VN.mod_to_s, 0);
VN.define_method(VN.cModule, 'included_modules', VN.mod_included_modules, 0);
VN.define_method(VN.cModule, 'include?', VN.mod_include_p, 1);
VN.define_method(VN.cModule, 'name', VN.mod_name, 0);
VN.define_method(VN.cModule, 'ancestors', VN.mod_ancestors, 0);

VN.define_private_method(VN.cModule, 'attr', VN.mod_attr, -1);
VN.define_private_method(VN.cModule, 'attr_reader', VN.mod_attr_reader, -1);
VN.define_private_method(VN.cModule, 'attr_writer', VN.mod_attr_writer, -1);
VN.define_private_method(VN.cModule, 'attr_accessor', VN.mod_attr_accessor, -1);

VN.define_alloc_func(VN.cModule, VN.module_s_alloc);
VN.define_method(VN.cModule, 'initialize', VN.mod_initialize, 0);
VN.define_method(VN.cModule, 'instance_methods', VN.class_instance_methods, -1);
VN.define_method(VN.cModule, 'public_instance_methods', VN.class_public_instance_methods, -1);
VN.define_method(VN.cModule, 'protected_instance_methods', VN.class_protected_instance_methods, -1);
VN.define_method(VN.cModule, 'private_instance_methods', VN.class_private_instance_methods, -1);

VN.define_method(VN.cModule, 'constance', VN.mod_constants, -1);
VN.define_method(VN.cModule, 'const_get', VN.mod_const_get, -1);
VN.define_method(VN.cModule, 'const_set', VN.mod_const_set, 2);
VN.define_method(VN.cModule, 'const_defined?', VN.mod_const_defined, -1);
VN.define_private_method(VN.cModule, 'remove_const', VN.mod_remove_const, 1);
VN.define_method(VN.cModule, 'const_missing', VN.mod_const_missing, 1);
VN.define_method(VN.cModule, 'class_variables', VN.mod_class_variables, 0);
VN.define_method(VN.cModule, 'remove_class_variable', VN.mod_remove_cvar, 1);
VN.define_method(VN.cModule, 'class_variable_get', VN.mod_cvar_get, 1);
VN.define_method(VN.cModule, 'class_variable_set', VN.mod_cvar_set, 2);
VN.define_method(VN.cModule, 'class_variable_defined?', VN.mod_cvar_defined, 1);

/**
  Class
*/
VN.define_method(VN.cClass, 'allocate', VN.obj_alloc, 0);
VN.define_method(VN.cClass, 'new', VN.class_new_instance, -1);
VN.define_method(VN.cClass, 'initialize', VN.class_initialize, -1);
VN.define_method(VN.cClass, 'initialize_copy', VN.class_init_copy, 1);
VN.define_method(VN.cClass, 'superclass', VN.class_superclass, 0);
VN.define_alloc_func(VN.cClass, VN.class_s_alloc);
VN.undef_method(VN.cClass, 'extend_object');
VN.undef_method(VN.cClass, 'append_features');

/*
  TrueClass
*/
VN.true_to_s = function(obj) {
  return VN.str_new_cstr("true");
};

VN.true_and = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qtrue : VN.Qfalse ;
};

VN.true_or = function(obj, obj2) {
  return VN.Qtrue ;
};

VN.true_xor = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qfalse : VN.Qtrue ;
};


VN.define_method(VN.cTrueClass, 'to_s', VN.true_to_s, 0);
VN.define_method(VN.cTrueClass, '&', VN.true_and, 0);
VN.define_method(VN.cTrueClass, '|', VN.true_or, 0);
VN.define_method(VN.cTrueClass, '^', VN.true_xor, 0);
VN.undef_alloc_func(VN.cTrueClass);
VN.undef_method(VN.cTrueClass.klass, 'new');
VN.define_global_const('TRUE', VN.Qtrue);
 
/*
  FalseClass
*/
VN.false_to_s = function(obj) {
  return VN.str_new_cstr("false");
};

VN.false_and = function(obj, obj2) {
  return VN.Qfalse ;
};

VN.false_or = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qtrue : VN.Qfalse ;
};

VN.false_xor = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qtrue : VN.Qfalse ;
};

VN.define_method(VN.cFalseClass, 'to_s', VN.false_to_s, 0);
VN.define_method(VN.cFalseClass, '&', VN.false_and, 0);
VN.define_method(VN.cFalseClass, '|', VN.false_or, 0);
VN.define_method(VN.cFalseClass, '^', VN.false_xor, 0);
VN.undef_alloc_func(VN.cFalseClass);
VN.undef_method(VN.cFalseClass.klass, 'new');
VN.define_global_const('FALSE', VN.Qfalse);

/**
  Initialize top self.

  Top self. This is the 'main' within ruby runtime, that all top level methods
  etc are added to.
*/
VN.top_self = VN.obj_alloc(VN.cObject);

VN.main_to_s = function(self) {
  return VN.str_new_cstr("main") ;
};

VN.define_singleton_method(VN.top_self, 'to_s', VN.main_to_s, 0);


/**
  Initialize String
*/
// VN.include_module(VN.cString, VN.mComparable);

VN.str_alloc = function(klass) {
  var str = new VN.RString();
  str.klass = klass;
  str.type = VN.T_STRING;
  str.ptr = new String() ;
  return str;
};

VN.str_new = function(klass, ptr, len) {
  var str ;
  
  if (len < 0) {
    VN.arg_error('negative string size (or size too big)');
  }
  str = VN.str_alloc(klass) ;
  str.ptr = ptr;
  return str ;
};

VN.str_new_cstr = function(ptr) {
  if (!ptr) {
    VN.arg_error('NULL pointer given');
  }
  return VN.str_new(VN.cString, ptr, ptr.length);
};

VN.define_alloc_func(VN.cString, VN.str_alloc);
VN.define_singleton_method(VN.cString, 'try_convert', VN.str_s_try_convert, 1);

VN.str_length = function(str) {
  // console.log(str);
  var len = str.ptr.length;
  // int2num
  return len;
};

VN.str_to_s = function(str) {
  if (str.klass != VN.cString) {
    return VN.str_duplicate(VN.cString, str);
  }
  return str;
};

VN.define_method(VN.cString, 'initialize', VN.str_init, -1);
VN.define_method(VN.cString, 'initialize_copy', VN.str_replace, 1);
VN.define_method(VN.cString, '<=>', VN.str_cmp_m, 1);
VN.define_method(VN.cString, '==', VN.str_equal, 1);
VN.define_method(VN.cString, 'eql?', VN.str_eql, 1);
VN.define_method(VN.cString, 'hash', VN.str_hash_m, 0);
VN.define_method(VN.cString, 'casecmp', VN.str_casecmp, 1);
VN.define_method(VN.cString, '+', VN.str_plus, 1);
VN.define_method(VN.cString, '*', VN.str_times, 1);
VN.define_method(VN.cString, '%', VN.str_format_m, 1);
VN.define_method(VN.cString, '[]', VN.str_aref_m, -1);
VN.define_method(VN.cString, '[]=', VN.str_aset_m, -1);
VN.define_method(VN.cString, 'insert', VN.str_insert, 2);
VN.define_method(VN.cString, 'length', VN.str_length, 0);
VN.define_method(VN.cString, 'size', VN.str_length, 0);
VN.define_method(VN.cString, 'bytesize', VN.str_bytesize, 0);
VN.define_method(VN.cString, 'empty?', VN.str_empty, 0);
VN.define_method(VN.cString, '=~', VN.str_match, 1);
VN.define_method(VN.cString, 'match', VN.str_match_m, -1);
VN.define_method(VN.cString, 'succ', VN.str_succ, 0);
VN.define_method(VN.cString, 'succ!', VN.str_succ_bang, 0);
VN.define_method(VN.cString, 'next', VN.str_succ, 0);
VN.define_method(VN.cString, 'next!', VN.str_succ_bang, 0);
VN.define_method(VN.cString, 'upto', VN.str_upto, -1);
VN.define_method(VN.cString, 'index', VN.str_index_m, -1);
VN.define_method(VN.cString, 'rindex', VN.str_rindex_m, -1);
VN.define_method(VN.cString, 'replace', VN.str_replace, 1);
VN.define_method(VN.cString, 'clear', VN.str_clear, 0);
VN.define_method(VN.cString, 'chr', VN.str_chr, 0);
VN.define_method(VN.cString, 'getbyte', VN.str_getbyte, 1);
VN.define_method(VN.cString, 'setbyte', VN.str_setbyte, 2);

VN.str_to_i = function(argc, argv, self) {
  var base ;
  if (argc == 0) {
    base = 10 ;
  }
  else {
    base = argv[0] ;
  }
  
  if (base < 0) {
    VN.arg_error('invalid radix: ' + base);
  }
  return VN.str_to_inum(self, base, VN.Qfalse);
}

VN.define_method(VN.cString, 'to_i', VN.str_to_i, -1);
VN.define_method(VN.cString, 'to_f', VN.str_to_f, 0);
VN.define_method(VN.cString, 'to_s', VN.str_to_s, 0);
VN.define_method(VN.cString, 'to_str', VN.str_to_s, 0);
VN.define_method(VN.cString, 'inspect', VN.str_inspect, 0);
VN.define_method(VN.cString, 'dump', VN.str_dump, 0);

VN.define_method(VN.cString, 'upcase', VN.str_upcase, 0);
VN.define_method(VN.cString, 'downcase', VN.str_downcase, 0);
VN.define_method(VN.cString, 'capitalize', VN.str_capitalize, 0);
VN.define_method(VN.cString, 'swapcase', VN.str_swapcase, 0);

VN.define_method(VN.cString, 'upcase!', VN.str_upcase_bang, 0);
VN.define_method(VN.cString, 'downcase!', VN.str_downcase_bang, 0);
VN.define_method(VN.cString, 'capitalize!', VN.str_capitalize_bang, 0);
VN.define_method(VN.cString, 'swapcase!', VN.str_swapcase_bang, 0);

VN.define_method(VN.cString, 'hex', VN.str_hex, 0);
VN.define_method(VN.cString, 'oct', VN.str_oct, 0);
VN.define_method(VN.cString, 'split', VN.str_split_m, -1);
VN.define_method(VN.cString, 'lines', VN.str_each_line, -1);
VN.define_method(VN.cString, 'bytes', VN.str_each_byte, 0);
VN.define_method(VN.cString, 'chars', VN.str_each_char, 0);
VN.define_method(VN.cString, 'codepoints', VN.str_each_codepoint, 0);
VN.define_method(VN.cString, 'reverse', VN.str_reverse, 0);
VN.define_method(VN.cString, 'reverse!', VN.str_reverse_bang, 0);
VN.define_method(VN.cString, 'concat', VN.str_concat, 1);
VN.define_method(VN.cString, '<<', VN.str_concat, 1);
VN.define_method(VN.cString, 'crypt', VN.str_crypt, 1);
VN.define_method(VN.cString, 'intern', VN.str_intern, 0);
VN.define_method(VN.cString, 'to_sym', VN.str_intern, 0);
VN.define_method(VN.cString, 'ord', VN.str_ord, 0);

VN.define_method(VN.cString, 'include?', VN.str_include, 1);
VN.define_method(VN.cString, 'start_with?', VN.str_start_with, -1);
VN.define_method(VN.cString, 'end_with?', VN.str_end_with, -1);

VN.define_method(VN.cString, 'scan', VN.str_scan, 1);

VN.define_method(VN.cString, 'ljust', VN.str_ljust, -1);
VN.define_method(VN.cString, 'rjust', VN.str_rjust, -1);
VN.define_method(VN.cString, 'center', VN.str_center, -1);

VN.define_method(VN.cString, 'sub', VN.str_sub, -1);
VN.define_method(VN.cString, 'gsub', VN.str_gsub, -1);
VN.define_method(VN.cString, 'chop', VN.str_chop, 0);
VN.define_method(VN.cString, 'chomp', VN.str_chomp, -1);
VN.define_method(VN.cString, 'strip', VN.str_strip, 0);
VN.define_method(VN.cString, 'lstrip', VN.str_lstrip, 0);
VN.define_method(VN.cString, 'rstrip', VN.str_rstrip, 0);

VN.define_method(VN.cString, 'sub!', VN.str_sub_bang, -1);
VN.define_method(VN.cString, 'gsub!', VN.str_gsub_bang, -1);
VN.define_method(VN.cString, 'chop!', VN.str_chop_bang, 0);
VN.define_method(VN.cString, 'chomp!', VN.str_chomp_bang, -1);
VN.define_method(VN.cString, 'strip!', VN.str_strip_bang, 0);
VN.define_method(VN.cString, 'lstrip!', VN.str_lstrip_bang, 0);
VN.define_method(VN.cString, 'rstrip!', VN.str_rstrip_bang, 0);

VN.define_method(VN.cString, 'tr', VN.str_tr, 2);
VN.define_method(VN.cString, 'tr_s', VN.str_tr_s, 2);
VN.define_method(VN.cString, 'delete', VN.str_delete, -1);
VN.define_method(VN.cString, 'squeeze', VN.str_squeeze, -1);
VN.define_method(VN.cString, 'count', VN.str_count, -1);

VN.define_method(VN.cString, 'tr!', VN.str_tr_bang, 2);
VN.define_method(VN.cString, 'tr_s!', VN.str_tr_s_bang, 2);
VN.define_method(VN.cString, 'delete!', VN.str_delete_bang, -1);
VN.define_method(VN.cString, 'squeeze!', VN.str_squeeze_bang, -1);

VN.define_method(VN.cString, 'each_line', VN.str_each_line, -1);
VN.define_method(VN.cString, 'each_byte', VN.str_each_byte, 0);
VN.define_method(VN.cString, 'each_char', VN.str_each_char, 0);
VN.define_method(VN.cString, 'each_codepoint', VN.str_each_codepoint, 0);

VN.define_method(VN.cString, 'sum', VN.str_sum, -1);

VN.define_method(VN.cString, 'slice', VN.str_aref_m, -1);
VN.define_method(VN.cString, 'slice!', VN.str_slice_bang, -1);

VN.define_method(VN.cString, 'partition', VN.str_partition, 1);
VN.define_method(VN.cString, 'rpartition', VN.str_rpartition, 1);

VN.define_method(VN.cString, 'encoding', VN.obj_encoding, 0); /* in encoding.c */
VN.define_method(VN.cString, 'force_encoding', VN.str_force_encoding, 1);
VN.define_method(VN.cString, 'valid_encoding?', VN.str_valid_encoding_p, 0);
VN.define_method(VN.cString, 'ascii_only?', VN.str_is_ascii_only_p, 0);

/**
  Symbol
*/
// VN.VN.include_module(VN.cSymbol, VN.mComparable);
VN.undef_alloc_func(VN.cSymbol);
VN.undef_method(VN.cSymbol.klass, 'new');
VN.define_singleton_method(VN.cSymbol, 'all_symbols', VN.sym_all_symbols, 0);

VN.define_method(VN.cSymbol, '==', VN.sym_equal, 1);
VN.define_method(VN.cSymbol, 'inspect', VN.sym_inspect, 0);
VN.define_method(VN.cSymbol, 'to_s', VN.sym_to_s, 0);
VN.define_method(VN.cSymbol, 'id2name', VN.sym_to_s, 0);
VN.define_method(VN.cSymbol, 'intern', VN.sym_to_sym, 0);
VN.define_method(VN.cSymbol, 'to_sym', VN.sym_to_sym, 0);
VN.define_method(VN.cSymbol, 'to_proc', VN.sym_to_proc, 0);
VN.define_method(VN.cSymbol, 'succ', VN.sym_succ, 0);
VN.define_method(VN.cSymbol, 'next', VN.sym_succ, 0);

VN.define_method(VN.cSymbol, '<=>', VN.sym_cmp, 1);
VN.define_method(VN.cSymbol, 'casecmp', VN.sym_casecmp, 1);
VN.define_method(VN.cSymbol, '=~', VN.sym_match, 1);

VN.define_method(VN.cSymbol, '[]', VN.sym_aref, -1);
VN.define_method(VN.cSymbol, 'slice', VN.sym_aref, -1);
VN.define_method(VN.cSymbol, 'length', VN.sym_length, 0);
VN.define_method(VN.cSymbol, 'size', VN.sym_length, 0);
VN.define_method(VN.cSymbol, 'empty?', VN.sym_empty, 0);
VN.define_method(VN.cSymbol, 'match', VN.sym_match, 1);

VN.define_method(VN.cSymbol, 'upcase', VN.sym_upcase, 0);
VN.define_method(VN.cSymbol, 'downcase', VN.sym_downcase, 0);
VN.define_method(VN.cSymbol, 'capitalize', VN.sym_capitalize, 0);
VN.define_method(VN.cSymbol, 'swapcase', VN.sym_swapcase, 0);

VN.define_method(VN.cSymbol, 'encoding', VN.sym_encoding, 0);



/**
  Initialize Array
*/

// VN.include_module(VN.cArray, VN.mEnumerable);
VN.define_alloc_func(VN.cArray, function(klass) {
  var obj = new VN.RArray();
  obj.ptr = new Array () ;
  obj.klass = klass;
  obj.type = VN.T_ARRAY;
  return obj ;
});

/**
  Returns a new array with the given objects
  
  Array[1, 2, 3] => [1, 2, 3]
*/
VN.define_singleton_method(VN.cArray, '[]', function(argc, argv, klass) {
  var ary = VN.ary_new(klass, argc);
  if (argc > 0 && argv) {
    // do work
  }
  return ary ;
}, -1);


