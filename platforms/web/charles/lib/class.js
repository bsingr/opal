/* 
 * class.js
 * charles
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

function rb_class_inherited(super_class, klass) {
  if (!super_class) super_class = rb_cObject ;
  // return rb_funcall(super_class, "inherited", klass);
};

function rb_define_class(id, super_class) {
  var k;
  // if already defined, just ensure right type then return existing class/mod.
  if (rb_const_defined(rb_cObject, id)) {  
    k = rb_const_get(rb_cObject, id);
    if (!(k.flags & T_CLASS)) {
      throw id + " is not a class"
    }
    if (k.sup != super_class) {
      if (k != rb_cObject) {
        throw id + " is already defined"
      }
    }
    return k
  }
  if (!super_class) {
    console.log("no superclass given for " + id + " . Object assumed");
  }
  k = rb_define_class_id(id, super_class);
  rb_class_tbl[id] = k;
  
  // class bundle...?
  // rb_ivar_set(k, '__bundle__', window.vn_current_bundle);
  
  rb_name_class(k, id);
  rb_const_set(rb_cObject, id, k);
  rb_class_inherited(super_class, k);
  return k;
}

function rb_define_class_under(outer, id, super_klass) {
  var klass;
  // if already defined in context... just ensure it is a macthing class def
  /**
    this should be const_defined_at
  */
  if (outer.$c_d_a(id)) {
    // klass = VN.const_get_at(outer, id);
    /**
      this should be const_get_at
    */
    klass = outer.$c_g_a(id);
    // console.log(klass);
    if (klass.$type != VN.CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (RClass.real(klass.$super) != super_klass) {
      // avoid error for cObject
      if (klass != cObject) {
        VN.name_error(id + ' is already defined');
      }
      
    }
    return klass;
  }
  // not existing...
  if (!super_klass) {
    VN.warning('no super class for `' + VN.class2name(outer), + '::' + id + '`, Object assumed');
  }
  klass = RClass.define_class_id(id, super_klass);
  // sets that the klass knows about its outer, i.e. classes within modules know about the module
  klass.$parent = outer;
  
  // set class bundle here....
  // console.log('current bundle ' + window.vn_current_bundle);
  rb_ivar_set(klass, '__bundle__', window.vn_current_bundle);
  
  // VN.set_class_path(klass, outer, id);
  // VN.const_set(outer, id, klass);
  outer.$c_s(id, klass);
  RClass.inherited(super_klass, klass);
  klass.$name(id);

  return klass;
};

RClass.class2name = function(klass) {
  return klass.$class_name();
};

RClass.obj_classname = function(obj) {
  return VN.class2name(obj.$klass);
};

function make_metametaclass(metaclass) {
  console.log("wwowow");
  var metametaclass, super_of_metaclass;

  if (metaclass.klass == metaclass) {
    // console.log(1);
    metametaclass = rb_class_boot(null);
    metametaclass.klass = metametaclass;
  }
  else {
    // console.log(2);
    metametaclass = rb_class_boot(null);
    metametaclass.klass = metaclass.klass.klass == metaclass.klass ? make_metametaclass(metaclass.klass) : metaclass.klass.klass;
  }
  // console.log(1);
  FL_SET(metametaclass, FL_SINGLETON);
  // console.log(2);
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.klass = metametaclass;

  super_of_metaclass = metaclass.sup;
  while (FL_TEST(super_of_metaclass, T_ICLASS)) {
    super_of_metaclass = super_of_metaclass.sup;
  }

  metametaclass.sup = rb_ivar_get(super_of_metaclass.klass, '__attached__') == super_of_metaclass ? super_of_metaclass.klass : make_metametaclass(super_of_metaclass);
  return metametaclass;
};

function rb_class_real(klass) {
  while (klass.flags & FL_SINGLETON) klass = klass.sup;
  return klass;
}

RClass.real = function(klass) {
  while ((klass.$singleton == true) || (klass.$type == VN.ICLASS)) {
    klass = klass.$super
  }
  return klass
};

function class_alloc(type, klass) {
  var o = new RClass();
  o.klass = klass;
  o.flags |= type;
  return o;
}

function rb_class_boot(super_class) {
  var k = class_alloc(T_CLASS, rb_cClass);
  k.sup = super_class;
  return k;
}

function rb_check_inheritable(super_class) {
  if (!FL_TEST(super_class, T_CLASS)) {
    throw 'super class must be a Class (' + VN.obj_classname(super_klass) + ' given)';
  }
  if (super_class.flags & FL_SINGLETON) {
    throw 'can\'t make a subclass of singleton class';
  }
};

function rb_class_create(super_klass) {
  rb_check_inheritable(super_klass);

  if (super_klass == rb_cClass) {
    VN.raise(VN.TypeError, "can't make subclass of Class")
  }
  return rb_class_boot(super_klass);
};

function rb_define_class_id(id, super_klass) {
  var klass;
  if (!super_klass) super_klass = rb_cObject;
  klass = rb_class_create(super_klass);
  rb_make_metaclass(klass, super_klass.klass);
  return klass;
};

function rb_singleton_class(obj) {
  var klass;
  // console.log(obj);
  // console.log("here");
  if (FL_TEST(obj, T_NUMBER) || FL_TEST(obj, T_SYMBOL)) {
    console.log(obj);
    throw 'can\'t define singleton';
  }
// console.log("yeap");
  if (FL_TEST(obj.klass, FL_SINGLETON) && rb_ivar_get(obj.klass, '__attached__') == obj) {
    klass = obj.klass;
  }
  else {
    // klass = RClass.make_metaclass(obj, obj.$klass);
    // console.log(obj);
    // klass = obj.$make_metaclass(obj.$klass) ;
    klass = rb_make_metaclass(obj, obj.klass);
  }
  // console.log("nearly done");

  if (FL_TEST(obj, T_CLASS)) {
    if (rb_ivar_get(klass.klass, '__attached__') != klass) {
      // console.log("this far down");
      // console.log(klass);
      
      //FIXME: def need to fix this.!!!!!!!!!!!!! uncomment basically.
      // make_metametaclass(klass);
    }
  }
  // console.log("completely done");

  return klass;
};

function rb_name_class(klass, id) {
  rb_ivar_set(klass, '__classid__', id);
}

// RClass.prototype.$class_name = function() {
//   return VN.class_path(klass.$real());
// };

function rb_make_metaclass(klass, super_class) {
  if (FL_TEST(klass, T_CLASS) && FL_TEST(klass, FL_SINGLETON)) {
    return make_metametaclass(klass);
  }
  else {
    var meta = rb_class_boot(super_class);
    FL_SET(meta, FL_SINGLETON);
    klass.klass = meta;
    rb_singleton_class_attached(meta, klass);
    
    var metasuper = meta.klass;
    if (metasuper) {
      meta.klass = metasuper;
    }
    return meta;
  }
}

function rb_singleton_class_attached(klass, obj) {
  if (FL_TEST(klass, FL_SINGLETON)) {
    rb_ivar_set(klass, '__attached__', obj);
  }
}


// RClass.prototype.$ = function(id, args) {
//   var method = this.$klass.$search_method(id);
//   // console.log('searching for: ' + id);
//   // console.log(this.$klass);
//   if (!method) throw 'VN#funcall cannot find method: ' + id ;
//   return method.apply(this, args) ;
// };
// 
// /**
//   cvar_get (klassvar_get)
// */
// RClass.prototype.$k_g = function(id) {
//   var tmp = this;
//   var value;
//   while(tmp) {
//     if (value = tmp.$iv_tbl[id]) {
//       return value;
//     }
//     tmp = tmp.$super;
//   }
//   VN.name_error('uninitialized class variable ' + id + ' in ' + this);
//   return nil ;
// };
// 
// /**
//   class var defined
// */
// RClass.prototype.$k_d = function(id) {
//   var tmp = this;
//   var value;
//   while(tmp) {
//     if (value = tmp.$iv_tbl[id]) {
//       return true;
//     }
//     tmp = tmp.$super;
//   }
//   return false;
// }
// 
// /**
//   cvar_set (klassvar_set)
// */
// RClass.prototype.$k_s = function(id, val) {
//   return this.$iv_tbl[id] = val;
// };
// 
// RClass.prototype.$i_g = function(id) {
//   return this.$iv_tbl[id];
// };
// 
// RClass.prototype.$i_s = function(id, val) {
//   this.$iv_tbl[id] = val;
//   return val ;
// }

/**
  Define 'normal' method
*/
function rb_define_method(klass, name, func, argc) {
  func.rb_argc = argc;
  rb_add_method(klass, name, func, NOEX_PUBLIC);
}

function rb_define_private_method(klass, name, func, argc) {
  func.rb_argc = argc;
  rb_add_method(klass, name, func, NOEX_PRIVATE);
}

function rb_define_private_method(klass, name, func, argc) {
  func.rb_argc = argc;
  rb_add_method(klass, name, func, NOEX_PROTECTED);
}

function rb_define_singleton_method(klass, name, func, argc) {
  rb_define_method(rb_singleton_class(klass), name, func, argc);
}

function rb_add_method(klass, name, func) {
  klass.m_tbl[name] = func;
  // func.displayName = klass.iv_tbl.__classid__ + "#" + name;
}

function rb_define_alloc_func(klass, func) {
  rb_define_method(rb_singleton_class(klass), 'allocate', func, 0);
}


// RClass.prototype.$def = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$define_protected_method = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$define_private_method = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$undef_method = function(name, func) {
//   this.$add_method(name, func);
// };
// 
// RClass.prototype.$add_method = function(name, func) {
//   this.$m_tbl[name] = func;
// };

/**
  Define singleton
*/
// RClass.prototype.$def_s = function(name, func) {
//   RClass.singleton_class(this).$def(name, func);
// };
// 
// RClass.prototype.$define_alias = function(id1, id2) {
//   
// };
// 
// RClass.prototype.$define_alloc_func = function(func) {
//   RClass.singleton_class(this).$add_method('allocate', func);
// };
// 
// RClass.prototype.$undef_alloc_func = function() {
//   RClass.singleton_class(this).$add_method('allocate', null);
// };
// 
// RClass.prototype.$search_method = function search_method(id) {
//   // console.log('checking ' + id);
//   // console.log(this);
//   var klass = this; var func ;
//   // console.log(id);
//   // console.log(klass);
//   // return null ;
//   while (!(func = klass.$m_tbl[id])) {
//     klass = klass.$super;
//     // console.log(this.$super.__classid__);
//     if (!klass) return undefined;
//   }
//   // console.log('returning true for ' + id);
//   return func;
// };
// 
// RClass.prototype.$search_super_method = function(from,id) {
//   // get current
//   
//   /**
//     Match func = from, to match current function
//     THEN search by name from there up, otherwise, chains of more then
//     2 supers will keep rematching second super
//   */
//   var klass = this; var func;
//   while (!((func = klass.$m_tbl[id]) && func == from)) {
//     klass = klass.$super;
//     if (!klass) return undefined;
//   }
//   // now skip up one
//   klass = klass.$super;
//   if (!klass) return undefined;
//   while (!(func = klass.$m_tbl[id])) {
//      klass = klass.$super;
//      if(!klass) return undefined;
//    }
//    return func;
//   
//     // 
//     // var klass = this; var func;
//     // while (!((func = klass.$m_tbl[id]) && func != from)) {
//     //    klass = klass.$super;
//     //    if(!klass) return undefined;
//     //  }
//     // 
//     // var klass = this; var func;
//     // // console.log('from');
//     // // console.log(from);
//     // // console.log('views');
//     // // console.log(klass.$m_tbl[id]);
//     // // console.log(klass.$m_tbl[id] === from);
//     // // console.log(klass.$m_tbl[id]);
//     // while (!((func = klass.$m_tbl[id]) && func != from)) {
//     //    klass = klass.$super;
//     //    if(!klass) return undefined;
//     //  }
//     // // return func = klass.$m_tbl[id];
//     // // return func = klass.$m_tbl[id];
//     // return func;
// 
//   // var klass = this; var func ;
//   // 
//   // while (!(func = klass.$m_tbl[id])) {
//   //   klass = klass.$super;
//   //   if (!klass) return undefined;
//   // }
//   // console.log('this point');
//   // // we have the current impl, now we need to search for the super from this point..
//   // klass = klass.$super;
//   // if (!klass) return undefined;
//   // while (!(func = klass.$m_tbl[id])) {
//   //   klass = klass.$super;
//   //   if (!klass) return undefined;
//   // }
//   // return func;
// };
// 
// RClass.prototype.$ = function(id, args) {
//   // var method = this.$search_method(this.$klass, id);
//   var method = this.$klass.$search_method(id);
//   if (!method) throw 'VN#funcall cannot find method: ' + id ;
//   return method.apply(this, args) ;
// };

/**
  $const_set
*/
