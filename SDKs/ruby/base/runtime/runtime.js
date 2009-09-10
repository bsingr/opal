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
    throw 'include_module not yet implemented'
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
    console.log('ALLOC func');
    console.log(VN.singleton_class(klass));
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
    console.log('add method:' + klass.iv_tbl.__classid__ + '#' + id);
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
    console.log(id);
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
    VN.warning('instance variable ' + id + ' not initialized');
    return nil;
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
    return VN.nil;
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
  }
};

VN.Qfalse = 0 ; // ?
// VN.Qfalse.klass = VN.cFalseClass
// VN.Qfalse.type = VN.T_FALSE
VN.Qtrue = 2 ; // ?
// VN.Qtrue.klass = VN.cTrueClass
// VN.Qtrue.type = VN.T_TRUE
VN.Qnil = 4 ; // ?
// VN.Qnil.klass = VN.cNilClass
// VN.Qnil.type = VN.T_NIL
VN.Qundef = 6 ; // ?

VN.RTEST = function(v) {
  return ((v & ~VN.Qnil) != 0)
};

VN.NIL_P = function(v) {
  return (v == VN.Qnil);
};

/**
  Object
*/
VN.equal = function(obj1, obj2) {
  if (obj1 == obj2) return true ;
  var result = VN.funcall(obj1, '==', 1, obj2);
  if (VN.RTEST(result)) return true ;
  return false ;
};

VN.eql = function(obj1, obj2) {
  return VN.funcall(obj1, '==', 1, obj2);
};

VN.obj_equal = function(obj1, obj2) {
  if (obj1 == obj2) return true ;
  return false ;
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

VN.define_method(VN.cBasicObject, '==', function(obj1, obj2) {
  return (obj1 == obj2) ? true : false ;
}, 1);
VN.define_method(VN.cBasicObject, 'equal?', function(obj1, obj2) {
  return (obj1 == obj2) ? true : false ;
}, 1);
VN.define_method(VN.cBasicObject, '!', function(obj1) {
  return (!obj1) ? true : false ;
}, 0);
VN.define_method(VN.cBasicObject, '!=', function(obj1, obj2) {
  var result = VN.funcall(obj1, '==', 1, obj2);
  return (result) ? false : true ;
}, 1);







VN.mKernel = VN.define_module("Kernel");
// VN.include_module(VN.cObject, VN.mKernel);
VN.define_private_method(VN.cClass, "inherited", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "included", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "extended", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "method_added", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "method_removed", VN.obj_dummy, 1);
VN.define_private_method(VN.cModule, "method_undefined", VN.obj_dummy, 1);

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

VN.cNilClass = VN.define_class("NilClass", VN.cObject);
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

// rb_define_method(rb_cModule, "freeze", rb_mod_freeze, 0);
// rb_define_method(rb_cModule, "===", rb_mod_eqq, 1);
// rb_define_method(rb_cModule, "==", rb_obj_equal, 1);
// rb_define_method(rb_cModule, "<=>",  rb_mod_cmp, 1);
// rb_define_method(rb_cModule, "<",  rb_mod_lt, 1);
// rb_define_method(rb_cModule, "<=", rb_class_inherited_p, 1);
// rb_define_method(rb_cModule, ">",  rb_mod_gt, 1);
// rb_define_method(rb_cModule, ">=", rb_mod_ge, 1);
// rb_define_method(rb_cModule, "initialize_copy", rb_mod_init_copy, 1); /* in class.c */
// rb_define_method(rb_cModule, "to_s", rb_mod_to_s, 0);
// rb_define_method(rb_cModule, "included_modules", rb_mod_included_modules, 0); /* in class.c */
// rb_define_method(rb_cModule, "include?", rb_mod_include_p, 1); /* in class.c */
// rb_define_method(rb_cModule, "name", rb_mod_name, 0);  /* in variable.c */
// rb_define_method(rb_cModule, "ancestors", rb_mod_ancestors, 0); /* in class.c */

// rb_define_private_method(rb_cModule, "attr", rb_mod_attr, -1);
// rb_define_private_method(rb_cModule, "attr_reader", rb_mod_attr_reader, -1);
// rb_define_private_method(rb_cModule, "attr_writer", rb_mod_attr_writer, -1);
// rb_define_private_method(rb_cModule, "attr_accessor", rb_mod_attr_accessor, -1);
// 
// rb_define_alloc_func(rb_cModule, rb_module_s_alloc);
// rb_define_method(rb_cModule, "initialize", rb_mod_initialize, 0);
// rb_define_method(rb_cModule, "instance_methods", rb_class_instance_methods, -1); /* in class.c */
// rb_define_method(rb_cModule, "public_instance_methods", 
//       rb_class_public_instance_methods, -1);    /* in class.c */
// rb_define_method(rb_cModule, "protected_instance_methods", 
//       rb_class_protected_instance_methods, -1); /* in class.c */
// rb_define_method(rb_cModule, "private_instance_methods", 
//       rb_class_private_instance_methods, -1);   /* in class.c */
// 
// rb_define_method(rb_cModule, "constants", rb_mod_constants, -1); /* in variable.c */
// rb_define_method(rb_cModule, "const_get", rb_mod_const_get, -1);
// rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
// rb_define_method(rb_cModule, "const_defined?", rb_mod_const_defined, -1);
// rb_define_private_method(rb_cModule, "remove_const", 
//           rb_mod_remove_const, 1); /* in variable.c */
// rb_define_method(rb_cModule, "const_missing", 
//       rb_mod_const_missing, 1); /* in variable.c */
// rb_define_method(rb_cModule, "class_variables", 
//       rb_mod_class_variables, 0); /* in variable.c */
// rb_define_method(rb_cModule, "remove_class_variable", 
//       rb_mod_remove_cvar, 1); /* in variable.c */
// rb_define_method(rb_cModule, "class_variable_get", rb_mod_cvar_get, 1);
// rb_define_method(rb_cModule, "class_variable_set", rb_mod_cvar_set, 2);
// rb_define_method(rb_cModule, "class_variable_defined?", rb_mod_cvar_defined, 1);
// 
// rb_define_method(rb_cClass, "allocate", rb_obj_alloc, 0);
// rb_define_method(rb_cClass, "new", rb_class_new_instance, -1);
// rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);
// rb_define_method(rb_cClass, "initialize_copy", rb_class_init_copy, 1); /* in class.c */
// rb_define_method(rb_cClass, "superclass", rb_class_superclass, 0);
// rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
// rb_undef_method(rb_cClass, "extend_object");
// rb_undef_method(rb_cClass, "append_features");
// 
// rb_cData = rb_define_class("Data", rb_cObject);
// rb_undef_alloc_func(rb_cData);


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

VN.cTrueClass = VN.define_class('TrueClass', VN.cObject);
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

VN.cFalseClass = VN.define_class('FalseClass', VN.cObject);
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
VN.define_singleton_method(VN.top_self, 'to_s', function() {
  return 'main';
}, 0);


/**
  Initialize String
*/
VN.cString = VN.define_class('String', VN.cObject);
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


// rb_define_singleton_method(rb_cString, "try_convert", rb_str_s_try_convert, 1);
// rb_define_method(rb_cString, "initialize", rb_str_init, -1);
// rb_define_method(rb_cString, "initialize_copy", rb_str_replace, 1);
// rb_define_method(rb_cString, "<=>", rb_str_cmp_m, 1);

// VN.define_method(VN.cString, '==', rb_str_equal, 1);
// rb_define_method(rb_cString, "eql?", rb_str_eql, 1);
// rb_define_method(rb_cString, "hash", rb_str_hash_m, 0);
// rb_define_method(rb_cString, "casecmp", rb_str_casecmp, 1);
// rb_define_method(rb_cString, "+", rb_str_plus, 1);
// rb_define_method(rb_cString, "*", rb_str_times, 1);
// rb_define_method(rb_cString, "%", rb_str_format_m, 1);
// rb_define_method(rb_cString, "[]", rb_str_aref_m, -1);
// rb_define_method(rb_cString, "[]=", rb_str_aset_m, -1);
// rb_define_method(rb_cString, "insert", rb_str_insert, 2);

VN.str_length = function(str) {
  console.log(str);
  var len = str.ptr.length;
  // int2num
  return len;
};

VN.define_method(VN.cString, 'length', VN.str_length, 0);
VN.define_method(VN.cString, 'size', VN.str_length, 0);
// rb_define_method(rb_cString, "bytesize", rb_str_bytesize, 0);
// rb_define_method(rb_cString, "empty?", rb_str_empty, 0);
// rb_define_method(rb_cString, "=~", rb_str_match, 1);
// rb_define_method(rb_cString, "match", rb_str_match_m, -1);
// rb_define_method(rb_cString, "succ", rb_str_succ, 0);
// rb_define_method(rb_cString, "succ!", rb_str_succ_bang, 0);
// rb_define_method(rb_cString, "next", rb_str_succ, 0);
// rb_define_method(rb_cString, "next!", rb_str_succ_bang, 0);
// rb_define_method(rb_cString, "upto", rb_str_upto, -1);
// rb_define_method(rb_cString, "index", rb_str_index_m, -1);
// rb_define_method(rb_cString, "rindex", rb_str_rindex_m, -1);
// rb_define_method(rb_cString, "replace", rb_str_replace, 1);
// rb_define_method(rb_cString, "clear", rb_str_clear, 0);
// rb_define_method(rb_cString, "chr", rb_str_chr, 0);
// rb_define_method(rb_cString, "getbyte", rb_str_getbyte, 1);
// rb_define_method(rb_cString, "setbyte", rb_str_setbyte, 2);
// 
// rb_define_method(rb_cString, "to_i", rb_str_to_i, -1);
// rb_define_method(rb_cString, "to_f", rb_str_to_f, 0);

VN.str_to_s = function(str) {
  if (str.klass != VN.cString) {
    return VN.str_duplicate(VN.cString, str);
  }
  return str;
};

VN.define_method(VN.cString, 'to_s', VN.str_to_s, 0);
VN.define_method(VN.cString, 'to_str', VN.str_to_s, 0);
VN.define_method(VN.cString, 'inspect', VN.str_to_s, 0); // this should escape the stirng... TODO.

// rb_define_method(rb_cString, "dump", rb_str_dump, 0);
// 
// rb_define_method(rb_cString, "upcase", rb_str_upcase, 0);
// rb_define_method(rb_cString, "downcase", rb_str_downcase, 0);
// rb_define_method(rb_cString, "capitalize", rb_str_capitalize, 0);
// rb_define_method(rb_cString, "swapcase", rb_str_swapcase, 0);
// 
// rb_define_method(rb_cString, "upcase!", rb_str_upcase_bang, 0);
// rb_define_method(rb_cString, "downcase!", rb_str_downcase_bang, 0);
// rb_define_method(rb_cString, "capitalize!", rb_str_capitalize_bang, 0);
// rb_define_method(rb_cString, "swapcase!", rb_str_swapcase_bang, 0);
// 
// rb_define_method(rb_cString, "hex", rb_str_hex, 0);
// rb_define_method(rb_cString, "oct", rb_str_oct, 0);
// rb_define_method(rb_cString, "split", rb_str_split_m, -1);
// rb_define_method(rb_cString, "lines", rb_str_each_line, -1);
// rb_define_method(rb_cString, "bytes", rb_str_each_byte, 0);
// rb_define_method(rb_cString, "chars", rb_str_each_char, 0);
// rb_define_method(rb_cString, "codepoints", rb_str_each_codepoint, 0);
// rb_define_method(rb_cString, "reverse", rb_str_reverse, 0);
// rb_define_method(rb_cString, "reverse!", rb_str_reverse_bang, 0);
// rb_define_method(rb_cString, "concat", rb_str_concat, 1);
// rb_define_method(rb_cString, "<<", rb_str_concat, 1);
// rb_define_method(rb_cString, "crypt", rb_str_crypt, 1);
// rb_define_method(rb_cString, "intern", rb_str_intern, 0);
// rb_define_method(rb_cString, "to_sym", rb_str_intern, 0);
// rb_define_method(rb_cString, "ord", rb_str_ord, 0);
// 
// rb_define_method(rb_cString, "include?", rb_str_include, 1);
// rb_define_method(rb_cString, "start_with?", rb_str_start_with, -1);
// rb_define_method(rb_cString, "end_with?", rb_str_end_with, -1);
// 
// rb_define_method(rb_cString, "scan", rb_str_scan, 1);
// 
// rb_define_method(rb_cString, "ljust", rb_str_ljust, -1);
// rb_define_method(rb_cString, "rjust", rb_str_rjust, -1);
// rb_define_method(rb_cString, "center", rb_str_center, -1);
// 
// rb_define_method(rb_cString, "sub", rb_str_sub, -1);
// rb_define_method(rb_cString, "gsub", rb_str_gsub, -1);
// rb_define_method(rb_cString, "chop", rb_str_chop, 0);
// rb_define_method(rb_cString, "chomp", rb_str_chomp, -1);
// rb_define_method(rb_cString, "strip", rb_str_strip, 0);
// rb_define_method(rb_cString, "lstrip", rb_str_lstrip, 0);
// rb_define_method(rb_cString, "rstrip", rb_str_rstrip, 0);
// 
// rb_define_method(rb_cString, "sub!", rb_str_sub_bang, -1);
// rb_define_method(rb_cString, "gsub!", rb_str_gsub_bang, -1);
// rb_define_method(rb_cString, "chop!", rb_str_chop_bang, 0);
// rb_define_method(rb_cString, "chomp!", rb_str_chomp_bang, -1);
// rb_define_method(rb_cString, "strip!", rb_str_strip_bang, 0);
// rb_define_method(rb_cString, "lstrip!", rb_str_lstrip_bang, 0);
// rb_define_method(rb_cString, "rstrip!", rb_str_rstrip_bang, 0);
// 
// rb_define_method(rb_cString, "tr", rb_str_tr, 2);
// rb_define_method(rb_cString, "tr_s", rb_str_tr_s, 2);
// rb_define_method(rb_cString, "delete", rb_str_delete, -1);
// rb_define_method(rb_cString, "squeeze", rb_str_squeeze, -1);
// rb_define_method(rb_cString, "count", rb_str_count, -1);
// 
// rb_define_method(rb_cString, "tr!", rb_str_tr_bang, 2);
// rb_define_method(rb_cString, "tr_s!", rb_str_tr_s_bang, 2);
// rb_define_method(rb_cString, "delete!", rb_str_delete_bang, -1);
// rb_define_method(rb_cString, "squeeze!", rb_str_squeeze_bang, -1);
// 
// rb_define_method(rb_cString, "each_line", rb_str_each_line, -1);
// rb_define_method(rb_cString, "each_byte", rb_str_each_byte, 0);
// rb_define_method(rb_cString, "each_char", rb_str_each_char, 0);
// rb_define_method(rb_cString, "each_codepoint", rb_str_each_codepoint, 0);
// 
// rb_define_method(rb_cString, "sum", rb_str_sum, -1);
// 
// rb_define_method(rb_cString, "slice", rb_str_aref_m, -1);
// rb_define_method(rb_cString, "slice!", rb_str_slice_bang, -1);
// 
// rb_define_method(rb_cString, "partition", rb_str_partition, 1);
// rb_define_method(rb_cString, "rpartition", rb_str_rpartition, 1);
// 
// rb_define_method(rb_cString, "encoding", rb_obj_encoding, 0); /* in encoding.c */
// rb_define_method(rb_cString, "force_encoding", rb_str_force_encoding, 1);
// rb_define_method(rb_cString, "valid_encoding?", rb_str_valid_encoding_p, 0);
// rb_define_method(rb_cString, "ascii_only?", rb_str_is_ascii_only_p, 0);

/**
  Symbol
*/
VN.cSymbol = VN.define_class('Symbol', VN.cObject);
// VN.include_module(VN.cSymbol, VN.mComparable);
// VN.undef_alloc_func(VN.cSymbol);
// VN.undef_method(VN.cSymbol.klass, 'new');
// VN.define_singleton_method(VN.cSymbol, 'all_symbols', function() { }, 0); // do we really need this....




/**
  Initialize Array
*/
VN.cArray = VN.define_class('Array', VN.cObject);
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

// VN.define_singleton_method(VN.cArray, 'try_convert', rb_ary_s_try_convert, 1);
// 
// VN.define_method(VN.cArray, "initialize", rb_ary_initialize, -1);
// VN.define_method(VN.cArray, "initialize_copy", rb_ary_replace, 1);
// 
// VN.define_method(VN.cArray, "to_s", rb_ary_inspect, 0);
// VN.define_method(VN.cArray, "inspect", rb_ary_inspect, 0);
// VN.define_method(VN.cArray, "to_a", rb_ary_to_a, 0);
// VN.define_method(VN.cArray, "to_ary", rb_ary_to_ary_m, 0);
// VN.define_method(VN.cArray, "frozen?",  rb_ary_frozen_p, 0);
// 
// VN.define_method(VN.cArray, "==", rb_ary_equal, 1);
// VN.define_method(VN.cArray, "eql?", rb_ary_eql, 1);
// VN.define_method(VN.cArray, "hash", rb_ary_hash, 0);
// 
// VN.define_method(VN.cArray, "[]", rb_ary_aref, -1);
// VN.define_method(VN.cArray, "[]=", rb_ary_aset, -1);
// VN.define_method(VN.cArray, "at", rb_ary_at, 1);
// VN.define_method(VN.cArray, "fetch", rb_ary_fetch, -1);
// VN.define_method(VN.cArray, "first", rb_ary_first, -1);
// VN.define_method(VN.cArray, "last", rb_ary_last, -1);
// VN.define_method(VN.cArray, "concat", rb_ary_concat, 1);
// VN.define_method(VN.cArray, "<<", rb_ary_push, 1);
// VN.define_method(VN.cArray, "push", rb_ary_push_m, -1);
// VN.define_method(VN.cArray, "pop", rb_ary_pop_m, -1);
// VN.define_method(VN.cArray, "shift", rb_ary_shift_m, -1);
// VN.define_method(VN.cArray, "unshift", rb_ary_unshift_m, -1);
// VN.define_method(VN.cArray, "insert", rb_ary_insert, -1);
// VN.define_method(VN.cArray, "each", rb_ary_each, 0);
// VN.define_method(VN.cArray, "each_index", rb_ary_each_index, 0);
// VN.define_method(VN.cArray, "reverse_each", rb_ary_reverse_each, 0);
// VN.define_method(VN.cArray, "length", rb_ary_length, 0);
// rb_define_alias(VN.cArray,  "size", "length");
// VN.define_method(VN.cArray, "empty?", rb_ary_empty_p, 0);
// VN.define_method(VN.cArray, "find_index", rb_ary_index, -1);
// VN.define_method(VN.cArray, "index", rb_ary_index, -1);
// VN.define_method(VN.cArray, "rindex", rb_ary_rindex, -1);
// VN.define_method(VN.cArray, "join", rb_ary_join_m, -1);
// VN.define_method(VN.cArray, "reverse", rb_ary_reverse_m, 0);
// VN.define_method(VN.cArray, "reverse!", rb_ary_reverse_bang, 0);
// VN.define_method(VN.cArray, "sort", rb_ary_sort, 0);
// VN.define_method(VN.cArray, "sort!", rb_ary_sort_bang, 0);
// VN.define_method(VN.cArray, "collect", rb_ary_collect, 0);
// VN.define_method(VN.cArray, "collect!", rb_ary_collect_bang, 0);
// VN.define_method(VN.cArray, "map", rb_ary_collect, 0);
// VN.define_method(VN.cArray, "map!", rb_ary_collect_bang, 0);
// VN.define_method(VN.cArray, "select", rb_ary_select, 0);
// VN.define_method(VN.cArray, "values_at", rb_ary_values_at, -1);
// VN.define_method(VN.cArray, "delete", rb_ary_delete, 1);
// VN.define_method(VN.cArray, "delete_at", rb_ary_delete_at_m, 1);
// VN.define_method(VN.cArray, "delete_if", rb_ary_delete_if, 0);
// VN.define_method(VN.cArray, "reject", rb_ary_reject, 0);
// VN.define_method(VN.cArray, "reject!", rb_ary_reject_bang, 0);
// VN.define_method(VN.cArray, "zip", rb_ary_zip, -1);
// VN.define_method(VN.cArray, "transpose", rb_ary_transpose, 0);
// VN.define_method(VN.cArray, "replace", rb_ary_replace, 1);
// VN.define_method(VN.cArray, "clear", rb_ary_clear, 0);
// VN.define_method(VN.cArray, "fill", rb_ary_fill, -1);
// VN.define_method(VN.cArray, "include?", rb_ary_includes, 1);
// VN.define_method(VN.cArray, "<=>", rb_ary_cmp, 1);
// 
// VN.define_method(VN.cArray, "slice", rb_ary_aref, -1);
// VN.define_method(VN.cArray, "slice!", rb_ary_slice_bang, -1);
// 
// VN.define_method(VN.cArray, "assoc", rb_ary_assoc, 1);
// VN.define_method(VN.cArray, "rassoc", rb_ary_rassoc, 1);
// 
// VN.define_method(VN.cArray, "+", rb_ary_plus, 1);
// VN.define_method(VN.cArray, "*", rb_ary_times, 1);
// 
// VN.define_method(VN.cArray, "-", rb_ary_diff, 1);
// VN.define_method(VN.cArray, "&", rb_ary_and, 1);
// VN.define_method(VN.cArray, "|", rb_ary_or, 1);
// 
// VN.define_method(VN.cArray, "uniq", rb_ary_uniq, 0);
// VN.define_method(VN.cArray, "uniq!", rb_ary_uniq_bang, 0);
// VN.define_method(VN.cArray, "compact", rb_ary_compact, 0);
// VN.define_method(VN.cArray, "compact!", rb_ary_compact_bang, 0);
// VN.define_method(VN.cArray, "flatten", rb_ary_flatten, -1);
// VN.define_method(VN.cArray, "flatten!", rb_ary_flatten_bang, -1);
// VN.define_method(VN.cArray, "count", rb_ary_count, -1);
// VN.define_method(VN.cArray, "shuffle!", rb_ary_shuffle_bang, 0);
// VN.define_method(VN.cArray, "shuffle", rb_ary_shuffle, 0);
// VN.define_method(VN.cArray, "sample", rb_ary_sample, -1);
// VN.define_method(VN.cArray, "cycle", rb_ary_cycle, -1);
// VN.define_method(VN.cArray, "permutation", rb_ary_permutation, -1);
// VN.define_method(VN.cArray, "combination", rb_ary_combination, 1);
// VN.define_method(VN.cArray, "product", rb_ary_product, -1);
// 
// VN.define_method(VN.cArray, "take", rb_ary_take, 1);
// VN.define_method(VN.cArray, "take_while", rb_ary_take_while, 0);
// VN.define_method(VN.cArray, "drop", rb_ary_drop, 1);
// VN.define_method(VN.cArray, "drop_while", rb_ary_drop_while, 0);
// 
// 
