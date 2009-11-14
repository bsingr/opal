/* 
 * class.js
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

var RClass = function(klass, super_klass) {
 this.$klass = klass ;
 this.$super = super_klass ;
 this.$type = VN.CLASS ;
 this.$singleton = false ;
 this.$m_tbl = { };
 this.$iv_tbl = { };
 return this ;
};

RClass.inherited = function(super_klass, klass) {
  if (!super_klass) super_klass = cObject ;
  return super_klass.$('inherited', [klass]) ;
};

function rb_define_class(id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return existing class/mod.
  if (cObject.$c_d(id)) {
    // console.log('returning current class for ' + id);
    klass = cObject.$c_g(id);
    if (klass.$type != VN.CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (klass.$super != super_klass) {
      // bail out for Object...error if Object is assigned to another nam (e.g. VNObject)
      if (klass != cObject) {
        // console.log(klass);
        // console.log('wow');
        VN.name_error(id + ' is already defined');
      }
      
    }
    return klass;
  }
  if (!super_klass) {
    VN.warning('no super class for `' + id + '`, Object assumed')
  }
  klass = RClass.define_class_id(id, super_klass);
  VN.class_tbl[id] = klass;
  
  // set class bundle here....
  
  
  klass.$name(id);
  cObject.$c_s(id, klass);
  RClass.inherited(super_klass, klass);
  return klass;
};
  
RClass.define = rb_define_class;

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
  
  // VN.set_class_path(klass, outer, id);
  // VN.const_set(outer, id, klass);
  outer.$c_s(id, klass);
  RClass.inherited(super_klass, klass);
  klass.$name(id);

  return klass;
};


/**
  TODO: Need to stop search going up through chain. Object inside Vienna, for instance, should
  not reference the Base Object class as the same, unless it is set to equal that. Also, VN::Array
  should not be mapped to ::Array. different classes. Need to stop $c_d and $c_g going up through
  the chain. They should only go up when looking for a constant inside the code, not for defining new
  classes.
*/
RClass.define_under = rb_define_class_under;


RClass.class2name = function(klass) {
  return klass.$class_name();
};

RClass.obj_classname = function(obj) {
  return VN.class2name(obj.$klass);
};


RClass.make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;

  if (metaclass.$klass == metaclass) {
    metametaclass = RClass.boot(null);
    metametaclass.$klass = metametaclass;
  }
  else {
    metametaclass = RClass.boot(null);
    metametaclass.$klass = metaclass.$klass.$klass == metaclass.$klass ? VN.make_metametaclass(metaclass.$klass) : metaclass.$klass.$klass;
  }
  metametaclass.$singleton = true;
  metametaclass.$singleton_class_attached(metaclass);
  metaclass.$klass = metametaclass;

  super_of_metaclass = metaclass.$super;
  while (super_of_metaclass.$type == VN.ICLASS) {
    super_of_metaclass = super_of_metaclass.$super;
  }

  metametaclass.$super = super_of_metaclass.$klass.$i_g('__attached__') == super_of_metaclass ? super_of_metaclass.$klass : RClass.make_metametaclass(super_of_metaclass);
  return metametaclass;
};

RClass.real = function(klass) {
  while ((klass.$singleton == true) || (klass.$type == VN.ICLASS)) {
    klass = klass.$super
  }
  return klass
};

RClass.alloc = function(type, klass) {
  var obj = new RClass();
  obj.$klass = klass;
  obj.$type = type;
  return obj;
};

RClass.boot = function(super_klass) {
  var klass = RClass.alloc(VN.CLASS, cClass);
  klass.$super = super_klass; 
  return klass;
};

RClass.check_inheritable = function(super_klass) {
  if (super_klass.$type != VN.CLASS) {
    VN.type_error('super class must be a Class (' + VN.obj_classname(super_klass) + ' given)');
  }
  if (super_klass.singleton) {
    VN.type_error('can\'t make a subclass of singleton class');
  }
};

RClass.create = function(super_klass) {
  RClass.check_inheritable(super_klass);

  if (super_klass == cClass) {
    VN.raise(VN.TypeError, "can't make subclass of Class")
  }
  return RClass.boot(super_klass);
};

RClass.define_class_id = function(id, super_klass) {
  var klass;
  if (!super_klass) super_klass = cObject;
  klass = RClass.create(super_klass);
  klass.$make_metaclass(super_klass.$klass);
  return klass;
};

RClass.singleton_class = function(obj) {
  var klass;
  
  // console.log(obj);

  if (obj.$type == VN.T_FIXNUM || obj.$type == VN.T_SYMBOL) {
    VN.type_error('can\'t define singleton');
  }

  if (obj.$klass.$singleton && obj.$klass.$i_g('__attached__') == obj) {
    klass = obj.$klass;
  }
  else {
    // klass = RClass.make_metaclass(obj, obj.$klass);
    // console.log(obj);
    klass = obj.$make_metaclass(obj.$klass) ;
  }

  if (obj.$type == VN.CLASS) {
    if (klass.$klass.$i_g('__attached__') != klass) {
      RClass.make_metametaclass(klass);
    }
  }

  return klass;
};

RClass.prototype.$name = function(id) {
  this.$i_s('__classid__', id);
};

RClass.prototype.$class_name = function() {
  return VN.class_path(klass.$real());
};

RClass.prototype.$make_metaclass = function(super_klass) {
  // obj is a metaclass...
  if (this.$type == VN.CLASS && this.$singleton == true) {
    return this.$make_metametaclass();
  }
  else {
    var klass = RClass.boot(super_klass);
    klass.$singleton = true;
    this.$klass = klass;
    klass.$singleton_class_attached(this);
  
    var metasuper = klass.$klass;
    if (metasuper) {
      klass.$klass = metasuper;
    }
    return klass;
  }
};

RClass.prototype.$singleton_class_attached = function(obj) {
  if (this.$singleton == true) {
    this.$i_s('__attached__', obj);
  }
};


RClass.prototype.$ = function(id, args) {
  var method = this.$klass.$search_method(id);
  // console.log('searching for: ' + id);
  // console.log(this.$klass);
  if (!method) throw 'VN#funcall cannot find method: ' + id ;
  return method.apply(this, args) ;
};

/**
  cvar_get (klassvar_get)
*/
RClass.prototype.$k_g = function(id) {
  var tmp = this;
  var value;
  while(tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return value;
    }
    tmp = tmp.$super;
  }
  VN.name_error('uninitialized class variable ' + id + ' in ' + this);
  return nil ;
};

/**
  class var defined
*/
RClass.prototype.$k_d = function(id) {
  var tmp = this;
  var value;
  while(tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return true;
    }
    tmp = tmp.$super;
  }
  return false;
}

/**
  cvar_set (klassvar_set)
*/
RClass.prototype.$k_s = function(id, val) {
  return this.$iv_tbl[id] = val;
};

RClass.prototype.$i_g = function(id) {
  return this.$iv_tbl[id];
};

RClass.prototype.$i_s = function(id, val) {
  this.$iv_tbl[id] = val;
  return val ;
}

/**
  Define 'normal' method
*/
function rb_define_method(klass, name, func) {
  rb_add_method(klass, name, func);
}

function rb_define_singleton_method(klass, name, func) {
  rb_define_method(RClass.singleton_class(klass), name, func);
}

function rb_add_method(klass, name, func) {
  klass.$m_tbl[name] = func;
  func.displayName = klass.$iv_tbl.__classid__ + "#" + name;
}


RClass.prototype.$def = function(name, func) {
  this.$add_method(name, func);
};

RClass.prototype.$define_protected_method = function(name, func) {
  this.$add_method(name, func);
};

RClass.prototype.$define_private_method = function(name, func) {
  this.$add_method(name, func);
};

RClass.prototype.$undef_method = function(name, func) {
  this.$add_method(name, func);
};

RClass.prototype.$add_method = function(name, func) {
  this.$m_tbl[name] = func;
};

/**
  Define singleton
*/
RClass.prototype.$def_s = function(name, func) {
  RClass.singleton_class(this).$def(name, func);
};

RClass.prototype.$define_alias = function(id1, id2) {
  
};

RClass.prototype.$define_alloc_func = function(func) {
  RClass.singleton_class(this).$add_method('allocate', func);
};

RClass.prototype.$undef_alloc_func = function() {
  RClass.singleton_class(this).$add_method('allocate', null);
};

RClass.prototype.$search_method = function search_method(id) {
  // console.log('checking ' + id);
  // console.log(this);
  var klass = this; var func ;
  // console.log(id);
  // console.log(klass);
  // return null ;
  while (!(func = klass.$m_tbl[id])) {
    klass = klass.$super;
    // console.log(this.$super.__classid__);
    if (!klass) return undefined;
  }
  // console.log('returning true for ' + id);
  return func;
};

RClass.prototype.$search_super_method = function(from,id) {
  // get current
  
  /**
    Match func = from, to match current function
    THEN search by name from there up, otherwise, chains of more then
    2 supers will keep rematching second super
  */
  var klass = this; var func;
  while (!((func = klass.$m_tbl[id]) && func == from)) {
    klass = klass.$super;
    if (!klass) return undefined;
  }
  // now skip up one
  klass = klass.$super;
  if (!klass) return undefined;
  while (!(func = klass.$m_tbl[id])) {
     klass = klass.$super;
     if(!klass) return undefined;
   }
   return func;
  
    // 
    // var klass = this; var func;
    // while (!((func = klass.$m_tbl[id]) && func != from)) {
    //    klass = klass.$super;
    //    if(!klass) return undefined;
    //  }
    // 
    // var klass = this; var func;
    // // console.log('from');
    // // console.log(from);
    // // console.log('views');
    // // console.log(klass.$m_tbl[id]);
    // // console.log(klass.$m_tbl[id] === from);
    // // console.log(klass.$m_tbl[id]);
    // while (!((func = klass.$m_tbl[id]) && func != from)) {
    //    klass = klass.$super;
    //    if(!klass) return undefined;
    //  }
    // // return func = klass.$m_tbl[id];
    // // return func = klass.$m_tbl[id];
    // return func;

  // var klass = this; var func ;
  // 
  // while (!(func = klass.$m_tbl[id])) {
  //   klass = klass.$super;
  //   if (!klass) return undefined;
  // }
  // console.log('this point');
  // // we have the current impl, now we need to search for the super from this point..
  // klass = klass.$super;
  // if (!klass) return undefined;
  // while (!(func = klass.$m_tbl[id])) {
  //   klass = klass.$super;
  //   if (!klass) return undefined;
  // }
  // return func;
};

RClass.prototype.$ = function(id, args) {
  // var method = this.$search_method(this.$klass, id);
  var method = this.$klass.$search_method(id);
  if (!method) throw 'VN#funcall cannot find method: ' + id ;
  return method.apply(this, args) ;
};

/**
  $const_set
*/
RClass.prototype.$c_s = function(id, val) {
  this.$mod_av_set(id, val, true);
  return val;
};

RClass.prototype.$mod_av_set = function(id, val, isconst) {
  this.$iv_tbl[id] = val ;
};

/**
  $c_g
*/
RClass.prototype.$c_g = function(id) {
  var tmp = this;
  var value;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return value;
    }
    tmp = tmp.$super;
  }
  VN.name_error(id, 'uninitialized constant ' + id + ' in ' + this.name);
  return nil;
};

/**
  Get constant, but look in the classes' parent as well
  -const_get_full (full search)
  Note: This does not work within objects copied from another context. E.g, from VN::Object, we cannot
  search for things indside Vienna... just doesnt work - no $parent on top object, but we dont want to
  chnage this..
*/
RClass.prototype.$c_g_full = function(id) {
  var tmp = this;
  var value;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return value;
    }
    tmp = tmp.$super;
  }
  // now try parent instead..
  var tmp = this.$parent;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return value;
    }
    tmp = tmp.$parent
  }
  VN.name_error(id, 'uninitialized constant ' + id + ' in ' + this.name);
  return nil;
};

/**
  SAME AS ABOVE BUT CHECK IF DEFINED
*/
RClass.prototype.$c_d_full = function(id) {
  var tmp = this;
  var value;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return true;
    }
    tmp = tmp.$super;
  }
  // now try parent instead..
  var tmp = this.$parent;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return true;
    }
    tmp = tmp.$parent
  }
  return false;
};

/**
  $const)defined
*/
RClass.prototype.$c_d = function(id) {
  var tmp = this;
  var value;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return true;
    }
    tmp = tmp.$super;
  }
  return false;
};

/**
  const_defined_at
*/
RClass.prototype.$c_d_a = function(id) {
  return (this.$iv_tbl[id]) ? true : false;
};

/**
  const_get_at
*/
RClass.prototype.$c_g_a = function(id) {
  return (this.$iv_tbl[id]) ? this.$iv_tbl[id] : nil;
};

RClass.prototype.$define_const = function(id, val) {
  
};
