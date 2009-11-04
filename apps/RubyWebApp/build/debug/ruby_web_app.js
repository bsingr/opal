/* 
 * base.js
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
 
// temp..
var nil = null;

// Boolean test. false if null, undefined, nil, or false
var RTEST = function RTEST(val) {
  return (val != null && val != undefined && val != nil && val != false) ? true : false;
};

/**
  Performs an 'or op' with lhs and rhs
*/
var ORTEST = function ORTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return rhs;
  }
  return lhs;
};

/**
  Performs an 'and op' with lhs and rhs
*/
var ANDTEST = function ANDTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return lhs;
  }
  return rhs;
};

var NOTTEST = function NOTTEST(expr) {
  if (expr == null || expr == undefined || expr == nil || expr == false) return true;
  return false;
};

/**
  Fix for browsers not having console
*/
if (typeof console === 'undefined') {
 var console = console || window.console || { };
 console.log = console.info = console.warn = console.error = function() { };
}

var VN = {
  
  CLASS: 0,
  MODULE: 1,

  OBJECT: 2,
  BOOLEAN: 3,
  STRING: 4,
  ARRAY: 5,
  NUMBER: 6,
  PROC: 7
};

var T_CLASS   = 0,
    T_MODULE  = 1,
    T_OBJECT  = 2,
    T_BOOLEAN = 3,
    T_STRING  = 4,
    T_ARRAY   = 5,
    T_NUMBER  = 6,
    T_PROC    = 7,
    T_SYMBOL  = 8,
    T_HASH    = 9;

VN.warning = function(msg) {
  console.log('Vienna warning: ' + msg);
};

VN.type_error = function(msg) {
  throw 'Vienna TypeError: ' + msg;
};

VN.name_error = function(msg) {
  throw 'Vienna NameError: ' + msg;
}

VN.top_const_get = function(id) {
  return undefined ;
};

VN.define_global_const = function(id, val) {
  cObject.$define_const(id, val);
};

VN.class_tbl = { } ;  // all classes are stored here
VN.global_tbl = { } ; // globals are stored here

VN.gvar_get = function(id) {
  
};

VN.gvar_set = function(id, val) {
  
};



/**
  Object
*/
VN.boot_defclass = function(id, super_klass) {
  var obj = RClass.boot(super_klass);
  obj.$name(id);
  (cObject ? cObject : obj).$c_s(id, obj);
  
  return obj;
};

VN.boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

VN.obj_alloc = function(klass) {
  // console.log('in base.js, obj_alloc ' + arguments.length);
  // var obj = klass.$('allocate', []);
  var obj = VN$(klass, 'allocate');
  return obj;
};

VN.class_allocate_instance = function() {
  // console.log('doing VN.class_allocate_instance');
  var obj = new RObject(this, VN.OBJECT) ;
  return obj;
};

VN.obj_dummy = function() {
  return nil ;
};

VN.equal = function(obj) {
  if (obj == this) return true ;
  var result = this.$funcall('==', [obj]);
  if (result) return true ;
  return false ;
};

VN.eql = function(obj) {
  return this.$funcall('==', [obj]);
};

VN.obj_equal = function(obj) {
  return (obj == this) ? true : false ;
};


/**
  Require the runtime
*/

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
  
RClass.define = function(id, super_klass) {
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
  klass.$name(id);
  cObject.$c_s(id, klass);
  RClass.inherited(super_klass, klass);
  return klass;
};

/**
  TODO: Need to stop search going up through chain. Object inside Vienna, for instance, should
  not reference the Base Object class as the same, unless it is set to equal that. Also, VN::Array
  should not be mapped to ::Array. different classes. Need to stop $c_d and $c_g going up through
  the chain. They should only go up when looking for a constant inside the code, not for defining new
  classes.
*/
RClass.define_under = function(outer, id, super_klass) {
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

/* 
 * module.js
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

var RModule = { } ;

RModule.define = function(id) {
  var module;
  if (cObject.$c_d(id)) {
    module = cObject.$c_g(id);
    if (module.$type == VN.MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = RModule.define_module_id(id);
  VN.class_tbl[id] = module;
  cObject.$c_s(id, module);

  return module;
};

RModule.define_module_under = function() {
  var module;
  if (VN.const_defined_at(outer, id)) {
    module = VN.const_get_at(outer, id);
    if (module.type == VN.MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = VN.define_module_id(id);
  VN.const_set(outer, id, module);
  VN.set_class_path(module, outer, name);
  return module;
};

RModule.define_module_id = function(id) {
  var mdl = RModule.create();
  // VN.name_class(mdl, id);
  mdl.$name(id);
  // mdl.$name(id);
  return mdl;
};

RModule.create = function() {
  var mdl = RClass.alloc(VN.MODULE, cModule);
  mdl.$super = cObject;
  return mdl;
};

RModule.include = function(klass, module) {
  RModule.include_class_new(module, klass);
};


RModule.include_class_new = function(mod, sup) {
  var klass = RClass.alloc(VN.T_ICLASS, cClass);
  klass.iv_tbl = mod.iv_tbl;
  klass.m_tbl = mod.m_tbl;
  klass.$super = sup;
  klass.$klass = mod;
  return klass;
};

/* 
 * object.js
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

var RObject = function(klass, type) {
  
  // console.log('in here!');
  // console.log(klass);
  
  this.$klass = klass ;
  this.$type = type ;
  this.$iv_tbl = {};
  return this;
};

// RObject.prototype.toString = function() {
  // console.log('calling toString');
  // return VN$(this, 'to_s');
// }


/**
  Set ivar
  @param obj - object to set ivar on
  @param id - name of variable, e.g. '@background_color'
  @param val - value to set
*/
var rb_ivar_set = function rb_ivar_set(obj, id, val) {
  obj.$iv_tbl[id] = val;
  return val;
};


/**
  For compatibility
*/
RObject.prototype.$i_s = function(id, val) {
  this.$iv_tbl[id] = val ;
  return val ;
};


/**
  Get ivar
*/
var rb_ivar_get = function rb_ivar_get(obj, id) {
  if (obj.$iv_tbl[id] == undefined || obj.$iv_tbl[id] == null) {
    return nil;
  }
  return obj.$iv_tbl[id];
};


/**
  For compatibility
*/
RObject.prototype.$i_g = function(id) {
  if (this.$iv_tbl[id] == undefined || this.$iv_tbl[id] == null) {
    return nil;
  }
  return this.$iv_tbl[id];
};

/*
  $ - call method
  @param id - method name
  @param args - array of all arguments
*/
RObject.prototype.$ = function(id, args) {
  var method = this.$klass.$search_method(id);
  
  if (!method) {
    console.log(this);
    throw 'RObject#call cannot find method: ' + id ;
  } 
  return method.apply(this, args) ;
};

/**
  Call method
*/
var rb_funcall = function rb_funcall(self, id) {
  
  if (!self.$klass) {
    console.log('ERROR: rb_funcall');
    console.log(self);
    console.log(id);
  }
  
  var method = self.$klass.$search_method(id);
  
  if (!method) {
    console.log(self);
    throw 'RObject#call cannot find method: ' + id ;
  } 
  // console.log(Array.prototype.slice.call(arguments));
  switch(arguments.length) {
    case 2: return method(self, id);
    case 3: return method(self, id, arguments[2]);
    case 4: return method(self, id, arguments[2], arguments[3]);
    case 5: return method(self, id, arguments[2], arguments[3], arguments[4]);
  }
  
  return method.apply(self, arguments);
}

/**
  For compatibility
*/
var VN$ = rb_funcall;

/**
  Call super method
*/
var rb_supcall = function rb_supcall(from, self, id, args) {
  var method = self.$klass.$search_super_method(from, id);
  if (!method) throw 'RObject#call cannot find super method for: ' + id ;
  
  switch(args.length) {
    case 0: return method(self, id);
    case 1: return method(self, id, args[0]);
    case 2: return method(self, id, args[0], args[1]);
    case 3: return method(self, id, args[0], args[1], args[2]);
    case 4: return method(self, id, args[0], args[1], args[2], args[3]);
  }
  
  return method.apply(self, arguments);
};

/**
  For compatibility
*/
var VN$sup = rb_supcall;

/**
  Call super
  - from = callee
*/
RObject.prototype.$sup = function(from, id, args) {
  // console.log('callee');
  // console.log(from);
  var method = this.$klass.$search_super_method(from, id);
  if (!method) throw 'RObject#call cannot find super method for: ' + id ;
  // console.log('got super');
  // console.log(method);
  return method.apply(this, args) ;
};

/**
  We need to copy some of RClass' methods for singletons
*/
RObject.prototype.$def_s = RClass.prototype.$def_s;
RObject.prototype.$make_metaclass = RClass.prototype.$make_metaclass;
/**
  Require core library
*/

/* 
 * object.js
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

var metaclass;
var cBasicObject = VN.boot_defclass('BasicObject', null);
var rb_cBasicObject = cBasicObject;
var cObject = VN.boot_defclass('Object', rb_cBasicObject);
var rb_cObject = cObject;
var cModule = VN.boot_defclass('Module', rb_cObject);
var rb_cModule = cModule;
var cClass = VN.boot_defclass('Class', rb_cModule);
var rb_cClass = cClass;

metaclass = rb_cBasicObject.$make_metaclass(cClass);
metaclass = rb_cObject.$make_metaclass(metaclass);
metaclass = rb_cModule.$make_metaclass(metaclass);
metaclass = rb_cClass.$make_metaclass(metaclass);

VN.boot_defmetametaclass(rb_cModule, metaclass);
VN.boot_defmetametaclass(rb_cObject, metaclass);
VN.boot_defmetametaclass(rb_cBasicObject, metaclass);

/**
  BasicObject necessary methods
*/
rb_cBasicObject.$define_private_method('initialize', function(self, _cmd) {
  

  
  return nil ;
});

VN.cBasicObjectAlloc = function(self, _cmd) {
  // console.log('HMMMM');
  // console.log(self);
  // console.log(_cmd);
  var obj = new RObject(self, VN.OBJECT) ;
  // Cruical ivar setup
  // console.log('HERE');
  // obj.$i_s('@kvo_observers', new Array());
  // obj.$i_s('@kvo_old_values', VN.$h());
  // obj.$i_s('@kvb_info', VN.$h());
   // # @kvo_observers = []
    // #      @kvo_old_values = {}
  return obj;
};

cBasicObject.$define_alloc_func(VN.cBasicObjectAlloc);

cBasicObject.$def_s('alloc', VN.cBasicObjectAlloc);

cBasicObject.$def('==', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('equal?', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('!', function(self, _cmd, obj) {
  
});

cBasicObject.$def('!=', function(self, _cmd, obj) {
  return (self == obj) ? false : true ;
});

cBasicObject.$define_private_method('singleton_method_added', function() {
  return nil ;
});

cBasicObject.$define_private_method('singleton_method_removed', function() {
  return nil ;
});

cBasicObject.$define_private_method('singleton_method_undefined', function() {
  return nil ;
});

// TODO: remove and put in kernel
cBasicObject.$def('puts', function(self, _cmd, val) {
  // console.log('in here pal');
  console.log(val);
});

// TODO: remove and put in kernel
cBasicObject.$def('===', function(self, _cmd, other) {
  return self == other;
});

cBasicObject.$def('class', function(self, _cmd) {
  // console.log('returning class...');
  return RClass.real(self.$klass);
});

cBasicObject.$def('respond_to?', function(self, _cmd, selector) {
  var method = self.$klass.$search_method(selector);
  if (!method) return false;
  return true
});

cBasicObject.$def('instance_of?', function(self, _cmd, klass) {
  return self.$klass == klass ? true : false;
});

// these should allow super checking as well
cBasicObject.$def('kind_of?', function(self, _cmd, klass) {
  return self.$klass == klass ? true : false;
});

cBasicObject.$def('is_a?', function(self, _cmd, klass) {
  return self.$klass == klass ? true : false;
});

/**
  Kernel neccessary methods
*/
mKernel = RModule.define("Kernel");

RModule.include(cObject, mKernel);

cClass.$define_private_method('inherited', function() {
  return nil ;
});

cModule.$define_private_method('included', function() {
  return nil ;
});

cModule.$define_private_method('extended', function() {
  return nil ;
});

cModule.$define_private_method('method_added', function() {
  return nil ;
});

cModule.$define_private_method('method_removed', function() {
  return nil ;
});

cModule.$define_private_method('method_undefined', function() {
  return nil ;
});

/**
  Base Classes/Modules
*/
var cNilClass = RClass.define('NilClass', cObject);
var cBoolean = RClass.define('Boolean', cObject);
var cArray = RClass.define('Array', cObject);
var cString = RClass.define('String', cObject);
var rb_cSymbol = RClass.define('Symbol', cObject);
var cNumber = RClass.define('Number', cObject);
var cProc = RClass.define('Proc', cObject);
var cRange = RClass.define('Range', cObject);

// require('core/kernel');

/* 
 * module.js
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

cModule.$define_alloc_func(function(module_s_alloc) {
  
});

var rb_cModule = cModule;

rb_define_method(rb_cModule, 'freeze', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '===', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '==', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '<=>', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '<', function(self, _cmd) {
  
});


rb_define_method(rb_cModule, '<=', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '>', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '>=', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'initialize_copy', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'to_s', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'included_modules', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'include?', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'freeze', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'name', function(self, _cmd) {
  return self.$iv_tbl['__classid__'];
});

rb_define_method(rb_cModule, 'ancestors', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'attr', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'attr_reader', function(self, _cmd) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    var body = new Function('self', '_cmd', 'return self.$i_g("@' + args[i] + '");');
    rb_define_method(self, args[i], body);
  }
});

rb_define_method(rb_cModule, 'attr_writer', function(self, _cmd) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    var body = new Function('self', '_cmd', 'val', 'return self.$i_s("@' + args[i] + ', val");');
    rb_define_method(self, args[i], body);
  }
});

rb_define_method(rb_cModule, 'attr_accessor', function(self, _cmd) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    rb_funcall(self, 'attr_reader', args[i]);
    rb_funcall(self, 'attr_writer', args[i]);
  }
});

rb_define_method(rb_cModule, 'initialize', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'public_instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'protected_instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'private_instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'constants', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'const_get', function(self, _cmd) {
  
});
  
rb_define_method(rb_cModule, 'const_set', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'const_defined?', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'remove_const', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'const_missing', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variables', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'remove_class_variable', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variable_get', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variable_set', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variable_defined?', function(self, _cmd) {
  
});

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


cClass.$def('new', function(self, _cmd) {
  // var obj = this.$('allocate', []);
  // console.log('In new');
  var obj = VN$(self, 'allocate');
  // split args from 2 (to avoid sending self, _cmd)
  arguments[0] = obj;
  arguments[1] = 'initialize';
  // VN$(obj, 'initialize');
  VN$.apply(obj, arguments);
  // obj.$('initialize', arguments);
  return obj;
});

cClass.$def('allocate', function(obj_alloc) {
  
});

cClass.$def('initialize', function(class_initialize) {
  
});

cClass.$def('initialize_copy', function(class_init_copy) {
  
});

cClass.$def('superclass', function(class_superclass) {
  
});

cClass.$define_alloc_func(function(class_s_alloc) {
  
});

// VN.undef_method(VN.cClass, 'extend_object');
// VN.undef_method(VN.cClass, 'append_features');



/* 
 * comparable.js
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

var mComparable = RModule.define('Comparable');

mComparable.$def('==', function(obj) {
  if (this == obj) return true ;
  return false;
});

mComparable.$def('>', function(cmp_gt) {
  
});

mComparable.$def('>=', function(cmp_ge) {
  
});

mComparable.$def('<', function(cmp_lt) {
  
});

mComparable.$def('<=', function(cmp_le) {
  
});

mComparable.$def('between?', function(cmp_between) {
  
});

/* 
 * enumerable.js
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

var mEnumerable = RModule.define('Enumerable');

mEnumerable.$def('to_a', function(enum_to_a) {
  
});

mEnumerable.$def('entries', function(enum_to_a) {
  
});

mEnumerable.$def('sort', function(enum_sort) {
  
});

mEnumerable.$def('sort_by', function(enum_sort_by) {
  
});

mEnumerable.$def('grep', function(enum_grep) {
  
});

mEnumerable.$def('count', function(enum_count) {
  
});

mEnumerable.$def('find', function(enum_find) {
  
});

mEnumerable.$def('detect', function(enum_find) {
  
});

mEnumerable.$def('find_index', function(enum_find_index) {
  
});

mEnumerable.$def('find_all', function(enum_find_all) {
  
});

mEnumerable.$def('select', function(enum_find_all) {
  
});

mEnumerable.$def('reject', function(enum_reject) {
  
});

mEnumerable.$def('collect', function(enum_collect) {
  
});

mEnumerable.$def('map', function(enum_collect) {
  
});

mEnumerable.$def('inject', function(enum_inject) {
  
});

mEnumerable.$def('reduce', function(enum_inject) {
  
});

mEnumerable.$def('partition', function(enum_partition) {
  
});

mEnumerable.$def('group_by', function(enum_group_by) {
  
});

mEnumerable.$def('first', function(enum_first) {
  
});

mEnumerable.$def('all', function(enum_all) {
  
});

mEnumerable.$def('any?', function(enum_any) {
  
});

mEnumerable.$def('one?', function(enum_one) {
  
});

mEnumerable.$def('none?', function(enum_none) {
  
});

mEnumerable.$def('min', function(enum_min) {
  
});

mEnumerable.$def('max', function(enum_max) {
  
});

mEnumerable.$def('minmax', function(enum_minmax) {
  
});

mEnumerable.$def('min_by', function(enum_min_by) {
  
});

mEnumerable.$def('max_by', function(enum_max_by) {
  
});

mEnumerable.$def('minmax_by', function(enum_minmax_by) {
  
});

mEnumerable.$def('include?', function(enum_member) {
  
});

mEnumerable.$def('member?', function(enum_member) {
  
});

mEnumerable.$def('each_with_index', function(enum_each_with_index) {
  
});

mEnumerable.$def('reverse_each', function(enum_reverse_each) {
  
});

mEnumerable.$def('zip', function(enum_zip) {
  
});

mEnumerable.$def('take', function(enum_take) {
  
});

mEnumerable.$def('take_while', function(enum_take_while) {
  
});

mEnumerable.$def('drop', function(enum_drop) {
  
});

mEnumerable.$def('drop_while', function(enum_drop_while) {
  
});

mEnumerable.$def('cycle', function(enum_cycle) {
  
});

/* 
 * string.js
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

var rb_cString = cString;

String.prototype.$klass = rb_cString;
String.prototype.$type = T_STRING;

rb_cString.$define_alloc_func(function() {
  return new String();
});

rb_define_method(rb_cString, "try_convert", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "initialize", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "initialize_copy", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "<=>", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "==", function(self, _cmd, obj) {
  return self == obj ? true : false;
});

rb_define_method(rb_cString, "eql?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "hash", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "casecmp", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "+", function(self, _cmd, obj) {
  return self + obj;
});

rb_define_method(rb_cString, "*", function(self, _cmd, obj) {
  
});

rb_define_method(rb_cString, "%", function(self, _cmd, obj) {
  
});

rb_define_method(rb_cString, "[]", function(self, _cmd, key) {
  
});

rb_define_method(rb_cString, "[]=", function(self, _cmd, key, val) {
  
});

rb_define_method(rb_cString, "insert", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "length", function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cString, "size", function(self, _cmd) {
  return self.size;
});

rb_define_method(rb_cString, "empty?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "=~", function(self, _cmd, match) {
  
});
  
rb_define_method(rb_cString, "succ", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "next", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "upto", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "index", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rindex", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "replace", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "clear", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chr", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_i", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_f", function(self, _cmd) {
  
});
 
rb_define_method(rb_cString, "to_s", function(self, _cmd) {
  return new String(self);
}); 

rb_define_method(rb_cString, "to_str", function(self, _cmd) {
  return new String(self);
});

rb_define_method(rb_cString, "inspect", function(self, _cmd) {
  return new String('"' + self + '"');
});

rb_define_method(rb_cString, "dump", function(self, _cmd) {
  
});


rb_define_method(rb_cString, "upcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "downcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "capitalize", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "swapcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "camelize", function(self, _cmd) {
  var parts = self.split('_');
  var length = parts.length;
  
  if (length == 1) return parts[0];
  
  var camelized = self.charAt(0) == '-'
    ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
    : parts[0];
    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
});

rb_define_method(rb_cString, "hex", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "oct", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "split", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "lines", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "bytes", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chars", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "codepoints", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "reverse", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "concat", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "<<", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "crypt", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "intern", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_sym", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "ord", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "include?", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "start_with?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "end_with?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "scan", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "ljust", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rjust", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "center", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "sub", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "gsub", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chop", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chomp", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "strip", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "lstrip", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "rstrip", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "tr", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "tr_s", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "delete", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "squeeze", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "count", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_line", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_byte", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_char", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_codepoint", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "sum", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "partition", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rpartition", function(self, _cmd) {
  
});

/* 
 * symbol.js
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


// rb_include_module(rb_cSymbol, rb_mComparable);
// rb_undef_alloc_func(rb_cSymbol);
// rb_undef_method(rb_cSymbol.$klass, 'new');


rb_define_singleton_method(rb_cSymbol, 'all_symbols', function(self, _cmd) {
  // return an array of all symbols
});

rb_define_method(rb_cSymbol, '==', function(self, _cmd, obj) {
  return false;
});

rb_define_method(rb_cSymbol, 'inspect', function(self, _cmd) {
  return ":";
});

rb_define_method(rb_cSymbol, 'to_s', function(self, _cmd) {
  return "";
});

rb_define_method(rb_cSymbol, 'id2name', function(self, _cmd) {
  return "";
});

rb_define_method(rb_cSymbol, 'intern', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cSymbol, 'to_sym', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cSymbol, 'to_proc', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'succ', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'next', function(self, _cmd) {
  return rb_funcall(self, 'succ');
});

rb_define_method(rb_cSymbol, '<=>', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'casecmp', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, '=~', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, '[]', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'slice', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'length', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'size', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'empty?', function(self, _cmd) {
  
});
  
rb_define_method(rb_cSymbol, 'match', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'upcase', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'downcase', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'capitalize', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'swapcase', function(self, _cmd) {
  
});

/* 
 * number.js
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

var rb_cNumber = cNumber;
 
Number.prototype.$klass = cNumber ;
Number.prototype.$type = VN.NUMBER ;

// VN.include_module(VN.cNumber, VN.mComparable);
RModule.include(cNumber, mComparable);

rb_define_method(rb_cNumber, 'coerce', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '+@', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cNumber, '-@', function(self, _cmd) {
  return self * -1;
});

rb_define_method(rb_cNumber, '<=>', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'eql?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'quo', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'fdiv', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'div', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'divmod', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'modulo', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'remainder', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'abs', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'magnitude', function(self, _cmd) {
  
});
  
rb_define_method(rb_cNumber, 'to_int', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'real?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'integer?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'zero?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'nonzero?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'floor', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'ceil', function(self, _cmd) {
  
});
    
rb_define_method(rb_cNumber, 'round', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'truncate', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'step', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'odd?', function(self, _cmd) {
  return self %2 == 0 ? false : true;
});

rb_define_method(rb_cNumber, 'even?', function(self, _cmd) {
  return self %2 == 0 ? true : false;
});

rb_define_method(rb_cNumber, 'upto', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'downto', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'times', function(self, _cmd, block) {
  for (var i = 0; i < self; i++) {
    rb_funcall(block, 'call', i);
  }
  return self;
});

rb_define_method(rb_cNumber, 'succ', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'next', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'pred', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'chr', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'ord', function(self, _cmd) {
  
}); 

rb_define_method(rb_cNumber, 'to_i', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'to_s', function(self, _cmd) {
  
});
  
rb_define_method(rb_cNumber, '+', function(self, _cmd, i) {
  return self + i;
});

rb_define_method(rb_cNumber, '-', function(self, _cmd, i) {
  return self - i;
});

rb_define_method(rb_cNumber, '*', function(self, _cmd, i) {
  return self * i;
});

rb_define_method(rb_cNumber, '/', function(self, _cmd, i) {
  return self / i;
});
  
rb_define_method(rb_cNumber, '%', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '**', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '==', function(self, _cmd, other) {
  return (self == other) ? true : false;
});

rb_define_method(rb_cNumber, '>', function(self, _cmd, other) {
  return self > other ? true : false;
});

rb_define_method(rb_cNumber, '>=', function(self, _cmd, other) {
  return self >= other ? true : false;
});

rb_define_method(rb_cNumber, '<', function(self, _cmd, other) {
  return self < other ? true : false;
});

rb_define_method(rb_cNumber, '<=', function(self, _cmd, other) {
  return self <= other ? true : false;
});
  
rb_define_method(rb_cNumber, '~', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '&', function(self, _cmd, other) {
  return self & other;
});

rb_define_method(rb_cNumber, '|', function(self, _cmd, other) {
  return self | other;
});

rb_define_method(rb_cNumber, '^', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '[]', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '<<', function(self, _cmd, other) {
  return self << other;
});
  
rb_define_method(rb_cNumber, '>>', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'to_f', function(self, _cmd) {
  
});

/* 
 * array.js
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

var rb_cArray = cArray;
Array.prototype.$klass = rb_cArray
Array.prototype.$type = T_ARRAY;

RModule.include(rb_cArray, mEnumerable);

rb_cArray.$define_alloc_func(function() {
  return new Array();
});

rb_cArray.$def_s('[]', function() {
  
});

rb_cArray.$def_s('try_convert', function() {
  
});

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item, i) {
    i || (i = 0);
    var len = this.length;
    if (i < 0) i = len + i;
    for (; i < len; i++)
      if (this[i] === item) return i;
      return -1;
  };
}


rb_define_method(rb_cArray, 'initialize', function(self, _cmd) {
  var len = arguments.length;
  for (var i = 2; i < len; i++) {
    self.push(arguments[i]);
  }
});

rb_define_method(rb_cArray, 'initialize_copy', function(self, _cmd) {
  
});

rb_define_method(rb_cArray, 'to_s', function(self, _cmd) {
  if (self.length == 0) return '[]';
  var str = '[';
  for (var i = 0; i < (self.length - 1); i++) {
    str += (self[i].$('inspect', []) + ', ');
  }
  str += (self[self.length - 1].$('inspect', []) + ']');
  return str ;
});

rb_define_method(rb_cArray, 'inspect', function(self, _cmd) {
  return rb_funcall(self, 'to_s');
});

rb_define_method(rb_cArray, 'to_a', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cArray, 'to_ary', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cArray, '==', function(self, _cmd, ary) {
  if (ary == self) return true;
  if (ary.$type != VN.ARRAY) {
    if (rb_funcall(ary, 'respond_to?', 'to_a')) {
      return false;
    }
  }
  if (self.length != ary.length) return false ;
  return true;
});

rb_define_method(rb_cArray, 'eql?', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'hash', function(self, _cmd) {

});

rb_define_method(rb_cArray, '[]', function(self, _cmd, idx) {
  return self[idx];
});

rb_define_method(rb_cArray, '[]=', function(self, _cmd, idx, value) {
  return self[idx] = value;
});

rb_define_method(rb_cArray, 'at', function(self, _cmd, index) {
  return self[index];
});

rb_define_method(rb_cArray, 'fetch', function(self, _cmd, index, def) {
  return self[index];
});

rb_define_method(rb_cArray, 'first', function(self, _cmd) {
  return self[0];
});

rb_define_method(rb_cArray, 'last', function(self, _cmd) {
  return self[self.length - 1];
});

rb_define_method(rb_cArray, 'concat', function(self, _cmd) {

});

rb_define_method(rb_cArray, '<<', function(self, _cmd, obj) {
  return self.push(obj);
});

rb_define_method(rb_cArray, 'push', function(self, _cmd, obj) {
  return self.push(obj);
});

rb_define_method(rb_cArray, 'pop', function(self, _cmd) {
  return self.pop();
});

rb_define_method(rb_cArray, 'shift', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'unshift', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'insert', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'each', function(self, _cmd, block) {
  for (var i = 0; i < self.length; i++) {
    block(self[i]);
  }
  return self;
});


rb_define_method(rb_cArray, 'each_index', function(self, _cmd) {

});  

rb_define_method(rb_cArray, 'reverse_each', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'length', function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cArray, 'size', function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cArray, 'empty?', function(self, _cmd) {
  return (self.length == 0) ? true : false;
});

rb_define_method(rb_cArray, 'find_index', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'rindex', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'index', function(self, _cmd, obj) {
  var idx = self.indexOf(obj);
  return (idx == -1) ? idx : nil;
});

rb_define_method(rb_cArray, 'join', function(self, _cmd, sep) {
  return self.join(sep);
});

rb_define_method(rb_cArray, 'reverse', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'reverse!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'sort', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'sort!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'collect', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'collect!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'map', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'map!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'select', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'values_at', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'delete', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'delete_at', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'delete_if', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'reject', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'reject!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'zip', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'trnaspose', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'replace', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'clear', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'fill', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'include?', function(self, _cmd, obj) {
  return (self.indexOf(obj) == -1) ? false : true;
});

rb_define_method(rb_cArray, '<=>', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'slice', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'slice!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'assoc', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'rassoc', function(self, _cmd) {

});

rb_define_method(rb_cArray, '+', function(self, _cmd) {

});

rb_define_method(rb_cArray, '*', function(self, _cmd) {

});

rb_define_method(rb_cArray, '-', function(self, _cmd) {

});

rb_define_method(rb_cArray, '&', function(self, _cmd) {

});

rb_define_method(rb_cArray, '|', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'uniq', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'uniq!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'compact', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'compact!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'flatten', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'flatten!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'count', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'shuffle', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'shuffle!', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'sample', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'cycle', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'permutation', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'combination', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'product', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'take', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'take_while', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'drop', function(self, _cmd) {

});

rb_define_method(rb_cArray, 'drop_while', function(self, _cmd) {

});

/* 
 * boolean.js
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

var rb_cBoolean = cBoolean;

Boolean.prototype.$klass = rb_cBoolean;
Boolean.prototype.$type = T_BOOLEAN;

rb_define_method(rb_cBoolean, 'to_s', function(self, _cmd) {
  return self ? 'true' : 'false';
});

rb_define_method(rb_cBoolean, '&', function(self, _cmd, obj) {
  return (self) ? (obj ? true : false) : false;
});

rb_define_method(rb_cBoolean, '|', function(self, _cmd, obj) {
  return (self) ? true : (obj ? true : false);
});

rb_define_method(rb_cBoolean, '^', function(self, _cmd, obj) {
  return self ? (obj ? false : true) : (obj ? true : false);
});

/* 
 * hash.js
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

var RHash = function() {
  this.$klass = rb_cHash ;
  this.$type = T_HASH;
  
  this.keys = [];
  this.values = { };
  this.ifnone = nil;
  return this;
};

RHash.prototype.$define_singleton_method = RObject.prototype.$define_singleton_method;
RHash.prototype.$make_metaclass = RObject.prototype.$make_metaclass;

VN.$h = function() {
  var hash = new RHash();
  for (var i = 0; i < arguments.length; i++) {
    VN$(hash, '[]=', arguments[i], arguments[i + 1]);
    i++;
  }
  return hash;
};

var rb_cHash = RClass.define('Hash', rb_cObject) ;

// RModule.include(cHash, mEnumerable);

rb_cHash.$define_alloc_func(function() {
  return new RHash();
});


rb_define_singleton_method(rb_cHash, "[]", function(self, _cmd) {
  
});

rb_define_singleton_method(rb_cHash, "try_convert", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "initialize", function(self, _cmd) {
  if (arguments.length > 0) {
    self.ifnone = arguments[0] ;
  }  
});

rb_define_method(rb_cHash, "initialize_copy", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "rehash", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "to_hash", function(self, _cmd) {
  return self;
});

rb_define_method(rb_cHash, "to_a", function(self, _cmd) {
 
});
  
rb_define_method(rb_cHash, "to_ary", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "to_s", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "inspect", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "==", function(self, _cmd) {
 
});
  
rb_define_method(rb_cHash, "[]", function(self, _cmd, key) {
  if (!self.values.hasOwnProperty(key)) {
    return self.ifnone;
  }
  return self.values[key];
});

rb_define_method(rb_cHash, "hash", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "eql?", function(self, _cmd) {
 
});

rb_define_method(rb_cHash, "fetch", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "[]=", function(self, _cmd, key, value) {
  return rb_funcall(self, 'store', key, value);
});

rb_define_method(rb_cHash, "store", function(self, _cmd, key, val) {
  // if we dont have the key, add it to the ordered array so that we can keep
  // the hash ordered.
  if (self.values[key] === undefined) {
    self.keys.push(key);
  }

  self.values[key] = val ;
  return val ;
});

rb_define_method(rb_cHash, "default", function(self, _cmd) {
  return self.ifnone;
});

rb_define_method(rb_cHash, "default=", function(self, _cmd, val) {
  return self.ifnone = val;
});

rb_define_method(rb_cHash, "default_proc", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "default_proc=", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "key", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "index", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "size", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "length", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "empty?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each_value", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each_key", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each_pair", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "each", function(self, _cmd, block) {
  for (var i = 0; i < self.keys.length; i++) {
    block(self.keys[i], self.values[self.keys[i]]);
  }
  return self;
});

rb_define_method(rb_cHash, "keys", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "values", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "values_at", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "shift", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "delete", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "delete_if", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "select", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "reject", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "reject!", function(self, _cmd) {
  
});
  

rb_define_method(rb_cHash, "clear", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "invert", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "update", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "replace", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "merge!", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "merge", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "assoc", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "rassoc", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "include?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "member?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "has_key?", function(self, _cmd, key) {
  if (!self.values.hasOwnProperty(key)) {
    return false;
  }
  return true;
});
  
rb_define_method(rb_cHash, "has_value?", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "key?", function(self, _cmd, key) {
  return rb_funcall(self, 'has_key?', key);
});

rb_define_method(rb_cHash, "value?", function(self, _cmd) {
  
});
  
rb_define_method(rb_cHash, "compare_by_identity", function(self, _cmd) {
  
});

rb_define_method(rb_cHash, "compare_by_identity?", function(self, _cmd) {
  
});

/* 
 * string.js
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

var rb_cString = cString;

String.prototype.$klass = rb_cString;
String.prototype.$type = T_STRING;

rb_cString.$define_alloc_func(function() {
  return new String();
});

rb_define_method(rb_cString, "try_convert", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "initialize", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "initialize_copy", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "<=>", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "==", function(self, _cmd, obj) {
  return self == obj ? true : false;
});

rb_define_method(rb_cString, "eql?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "hash", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "casecmp", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "+", function(self, _cmd, obj) {
  return self + obj;
});

rb_define_method(rb_cString, "*", function(self, _cmd, obj) {
  
});

rb_define_method(rb_cString, "%", function(self, _cmd, obj) {
  
});

rb_define_method(rb_cString, "[]", function(self, _cmd, key) {
  
});

rb_define_method(rb_cString, "[]=", function(self, _cmd, key, val) {
  
});

rb_define_method(rb_cString, "insert", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "length", function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cString, "size", function(self, _cmd) {
  return self.size;
});

rb_define_method(rb_cString, "empty?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "=~", function(self, _cmd, match) {
  
});
  
rb_define_method(rb_cString, "succ", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "next", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "upto", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "index", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rindex", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "replace", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "clear", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chr", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_i", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_f", function(self, _cmd) {
  
});
 
rb_define_method(rb_cString, "to_s", function(self, _cmd) {
  return new String(self);
}); 

rb_define_method(rb_cString, "to_str", function(self, _cmd) {
  return new String(self);
});

rb_define_method(rb_cString, "inspect", function(self, _cmd) {
  return new String('"' + self + '"');
});

rb_define_method(rb_cString, "dump", function(self, _cmd) {
  
});


rb_define_method(rb_cString, "upcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "downcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "capitalize", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "swapcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "camelize", function(self, _cmd) {
  var parts = self.split('_');
  var length = parts.length;
  
  if (length == 1) return parts[0];
  
  var camelized = self.charAt(0) == '-'
    ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
    : parts[0];
    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
});

rb_define_method(rb_cString, "hex", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "oct", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "split", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "lines", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "bytes", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chars", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "codepoints", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "reverse", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "concat", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "<<", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "crypt", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "intern", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_sym", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "ord", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "include?", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "start_with?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "end_with?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "scan", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "ljust", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rjust", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "center", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "sub", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "gsub", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chop", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chomp", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "strip", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "lstrip", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "rstrip", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "tr", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "tr_s", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "delete", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "squeeze", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "count", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_line", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_byte", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_char", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_codepoint", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "sum", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "partition", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rpartition", function(self, _cmd) {
  
});
// require('core/struct');
// require('core/regexp');

/* 
 * range.js
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

var rb_cRange = cRange;

VN.$r = function(start, ending, exclusive) {
  return rb_funcall(rb_cRange, 'new', start, ending, exclusive);
};

rb_define_method(rb_cRange, 'initialize', function(self, _cmd, start, ending, exclusive) {
  rb_ivar_set(self, '@start', start);
  rb_ivar_set(self, '@ending', ending);
});

rb_define_method(rb_cRange, 'initialize_copy', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, '==', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, '===', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'eql?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'hash', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'each', function(self, _cmd, block) {
  var start = rb_ivar_get(self, '@start');
  var ending = rb_ivar_get(self, '@ending');
  for (var i = start; i <= ending; i++) {
    rb_funcall(block, 'call', i);
  }
  return self;
});

rb_define_method(rb_cRange, 'step', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'begin', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'first', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'end', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'last', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'min', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'max', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'to_s', function(self, _cmd) {
  
});
  
rb_define_method(rb_cRange, 'inspect', function(self, _cmd) {
  
}); 

rb_define_method(rb_cRange, 'exclude_end?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'member?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'include?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'cover?', function(self, _cmd) {
  
});
// require('core/time');

/* 
 * proc.js
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

var rb_cProc = cProc;

Function.prototype.$klass = rb_cProc
Function.prototype.$type = T_PROC;

rb_define_singleton_method(rb_cProc, 'new', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'call', function(self, _cmd) {
  return self.apply(self, [arguments[2]]);
});

rb_define_method(rb_cProc, '[]', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, '===', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'yield', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'to_proc', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'arity', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'clone', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'dup', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, '==', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'eql?', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'hash', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'to_s', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'lambda?', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'binding', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'curry', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'source_location', function(self, _cmd) {
  
});

/* 
 * math.js
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

var rb_mMath = RModule.define('Math');

rb_mMath.$define_const('PI', 3.142);
rb_mMath.$define_const('E', 0.000001);

rb_define_singleton_method(rb_mMath, 'min', function(self, _cmd, a, b) {
  return a < b ? a : b;
});

rb_define_singleton_method(rb_mMath, 'max', function(self, _cmd, a, b) {
  return a > b ? a : b;
});


// # mMath.$define_module_function('atan2', function(math_atan2) {
// #   
// # });
// # 
// # mMath.$define_module_function('cos', function(math_cos) {
// #   
// # });
// # 
// # mMath.$define_module_function('sin', function(math_sin) {
// #   
// # });
// # 
// # mMath.$define_module_function('tan', function(math_tan) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('acos', function(math_acos) {
// # 
// # });
// # 
// # mMath.$define_module_function('asin', function(math_asin) {
// #   
// # });
// # 
// # mMath.$define_module_function('atan', function(math_atan) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('cosh', function(math_cosh) {
// #   
// # });
// # 
// # mMath.$define_module_function('sinh', function(math_sinh) {
// #   
// # });
// # 
// # mMath.$define_module_function('tanh', function(math_tanh) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('acosh', function(math_acosh) {
// #   
// # });
// # 
// # mMath.$define_module_function('asinh', function(math_asinh) {
// #   
// # });
// # 
// # mMath.$define_module_function('atanh', function(math_atanh) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('exp', function(math_exp) {
// #   
// # });
// # 
// # mMath.$define_module_function('log', function(math_log) {
// #   
// # });
// # 
// # mMath.$define_module_function('log2', function(math_log2) {
// #   
// # });
// # 
// # mMath.$define_module_function('log10', function(math_log10) {
// #   
// # });
// # 
// # mMath.$define_module_function('sqrt', function(math_sqrt) {
// #   
// # });
// # 
// # mMath.$define_module_function('cbrt', function(math_cbrt) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('frexp', function(math_frexp) {
// #   
// # });
// # 
// # mMath.$define_module_function('ldexp', function(math_ldexp) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('ldexp', function(math_ldexp) {
// #   
// # });
// # 
// # 
// # mMath.$define_module_function('erf', function(math_erf) {
// #   
// # });
// # 
// # mMath.$define_module_function('erfc', function(math_erfc) {
// #   
// # });
// # 
// # 
// # 
// # mMath.$define_module_function('gamma', function(math_gamma) {
// #   
// # });
// # 
// # mMath.$define_module_function('lgamma', function(math_lgamma) {
// #   
// # });
// require('core/enumerator');
// 


/* 
 * top_self.js
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

var rb_top_self = VN.obj_alloc(rb_cObject);
VN.self = rb_top_self;

rb_define_singleton_method(rb_top_self, 'to_s', function(self, _cmd) {
  return 'main';
});

/* 
 * env.js
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
 
// var VN$ENVhash = VN.$h();
// for (prop in VN$ENV) {
//   VN$(VN$ENVhash, '[]=', prop, VN$ENV[prop]);
// }
// 
// cObject.$c_s('ENV', VN$ENVhash);


/* 
 * nil_class.js
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
 
var rb_cNilClass = cNilClass;

rb_define_method(rb_cNilClass, 'nil?', function(self, _cmd) {
  return true;
});

rb_define_method(rb_cNilClass, 'to_i', function(self, _cmd) {
  return 0;
});

rb_define_method(rb_cNilClass, 'to_f', function(self, _cmd) {
  return 0.0;
});

rb_define_method(rb_cNilClass, 'to_s', function(self, _cmd) {
  return 'nil';
});

rb_define_method(rb_cNilClass, 'to_a', function(self, _cmd) {
  return [];
});

rb_define_method(rb_cNilClass, 'inspect', function(self, _cmd) {
  return nil;
});

rb_define_method(rb_cNilClass, '&', function(self, _cmd, obj) {
  return false;
});

rb_define_method(rb_cNilClass, '|', function(self, _cmd, obj) {
  
});

rb_define_method(rb_cNilClass, '^', function(self, _cmd, obj) {

});
nil = VN$(cObject.$k_g('NilClass'), 'new');
nil.toString = function() { return 'nil';};
_$jm='age';
_$cq='image';
_$dy='tool_tip';
_$je='torn_off_menu';
_$bv='content_values';
_$en='creates_sort_descriptor';
_$fi='gray_mask';
_$iv='close_button';
_$r='selector';
_$cb='document_edited';
_$ga='frame_size';
_$jk='bezel';
_$bd='observed_object';
_$eg='allows_editing_multiple_values_selection';
_$bu='content_set';
_$fj='disabled';
_$bq='content_dictionary';
_$co='header_title';
_$gn='none';
_$ap='mouse_entered';
_$gi='below';
_$hb='center';
_$ce='editable';
_$p='object';
_$im='only_arrows';
_$go='contents';
_$fn='image_did_error';
_$dt='selection_index_paths';
_$bz='display_pattern_title';
_$fl='completed';
_$hh='toggle';
_$jd='submenu';
_$gw='hud';
_$ix='zoom_button';
_$hy='background_color';
_$dj='row_height';
_$ct='initial_value';
_$jn='band';
_$gk='overlaps';
_$e='initial';
_$dc='min_width';
_$ck='font_family_name';
_$jg='status';
_$jb='doc_modal';
_$bn='content_array';
_$fv='frame';
_$fe='value_transformer_name';
_$hd='radio';
_$ij='min_end';
_$ah='mousedown';
_$ax='periodic';
_$ef='width';
_$ag='browser';
_$at='flags_changed';
_$if='decrement_page';
_$em='continuously_updates_value';
_$l='key_path';
_$es='handles_content_as_compound_value';
_$cv='label';
_$dl='selected_index';
_$ao='right_mouse_dragged';
_$iu='unified_title_and_toolbar';
_$ie='increment_page';
_$hg='push_on_push_off';
_$ar='key_down';
_$hm='highlighted';
_$ca='display_pattern_value';
_$gs='default';
_$fz='overflow';
_$fd='validates_immediately';
_$eo='deletes_objects_on_remove';
_$y='event_queue';
_$ih='increment_arrow';
_$dr='selected_values';
_$gf='text_only';
_$al='right_mouse_down';
_$iy='toolbar_button';
_$ib='header_view';
_$br='content_height';
_$aw='application_defined';
_$dq='selected_value';
_$da='max_width';
_$be='observed_key_path';
_$bj='animate_binding';
_$eb='value_path';
_$ec='value_url';
_$jh='pop_up_menu';
_$fc='selects_all_when_setting_content';
_$et='inserts_null_placeholder';
_$v='modal_panel';
_$aa='delegate';
_$dh='recent_searches';
_$gl='off';
_$ep='display_name';
_$o='name';
_$fh='owner';
_$am='right_mouse_up';
_$in='number_of_rows_in_table_view';
_$hf='momentary_light';
_$q='user_info';
_$jf='main_menu';
_$jc='floating';
_$it='textured_background';
_$df='on_state_image';
_$di='represented_filename';
_$dm='selected_label';
_$ae='did_finish_launching';
_$gt='blue';
_$ir='titled';
_$ig='knob_slot';
_$hw='rounded';
_$do='selected_objects';
_$bt='content_objects';
_$bc='other_mouse_dragged';
_$fx='render';
_$hl='bordered';
_$cl='font_italic';
_$du='sort_descriptors';
_$iz='document_icon_button';
_$ho='paragraph_style';
_$bm='attributed_string';
_$an='mouse_moved';
_$ia='scroll_h';
_$hp='title_color';
_$d='old';
_$ch='filter_predicate';
_$z='views_needing_display';
_$hj='on_off';
_$eh='allows_null_argument';
_$fr='height';
_$w='event_tracking';
_$fm='read_error';
_$ft='top';
_$ex='not_applicable_placeholder';
_$dv='target';
_$u='normal';
_$ds='selection_indexes';
_$gq='change_gray';
_$er='content_placement_tag';
_$ik='max_end';
_$hr='knob_thickness';
_$ba='other_mouse_down';
_$h='insertion';
_$cg='excluded_keys';
_$ge='text';
_$gu='graphite';
_$fa='predicate_format';
_$bf='key';
_$ab='left_mouse_dragged';
_$aj='left_mouse_down';
_$gh='right';
_$av='system_defined';
_$i='removal';
_$m='options';
_$n='context';
_$il='all';
_$hk='momentary_push_in';
_$bh='alternate_image';
_$k='observer';
_$f='prior';
_$ay='cursor_update';
_$b='canvas';
_$x='windows';
_$eq='display_pattern';
_$id='decrement_line';
_$hi='momentary_change';
_$jo='top_level_objects';
_$ja='utility';
_$bi='alternate_title';
_$ei='always_presents_application_modal_alerts';
_$cr='included_keys';
_$by='data';
_$c='new';
_$a='element';
_$bb='other_mouse_up';
_$io='closable';
_$as='key_up';
_$fs='left';
_$db='min_value';
_$ic='increment_line';
_$fb='selector_name';
_$cu='is_intermediate';
_$cw='localized_key_dictionary';
_$cp='hidden';
_$gx='regular';
_$ea='value';
_$g='setting';
_$ee='warning_value';
_$fw='display_mode';
_$cs='initial_key';
_$gg='image_only';
_$hv='square';
_$ff='value_transformer';
_$eu='invokes_separately_with_array_objects';
_$iq='borderless';
_$hz='scroll_v';
_$bp='content';
_$hn='color';
_$hs='number_of_tick_marks';
_$cc='double_click_argument';
_$gc='mouseout';
_$bk='animation_delay';
_$ii='decrement_arrow';
_$gr='change_background';
_$ai='mouseup';
_$bl='argument';
_$dk='selected_identifier';
_$az='scroll_wheel';
_$dz='transparent';
_$iw='miniaturize_button';
_$fp='block';
_$fq='background_image';
_$fy='div';
_$ac='mousemove';
_$gb='mouseover';
_$ip='miniaturizable';
_$t='active';
_$fg='rect';
_$cf='enabled';
_$ci='font';
_$fo='display';
_$cx='managed_object_context';
_$cm='font_name';
_$aq='mouse_exited';
_$gp='push_in';
_$el='conditionally_sets_hidden';
_$dd='mixed_state_image';
_$dw='text_color';
_$hc='switch';
_$hx='input';
_$dx='title';
_$bo='content_array_for_multiple_selection';
_$gv='clear';
_$bg='alignment';
_$dp='selected_tag';
_$fk='loading';
_$he='mixed';
_$ez='raises_for_not_applicable_keys';
_$ed='visible';
_$gm='on';
_$ev='multiple_values_placeholder';
_$dg='predicate';
_$ak='left_mouse_up';
_$ji='screen_saver';
_$hq='title_font';
_$au='app_kit_defined';
_$cy='maximum_recents';
_$ek='conditionally_sets_enabled';
_$ht='tick_mark_position';
_$ad='will_finish_launching';
_$jj='z_index';
_$af='platform';
_$ew='no_selection_placeholder';
_$hu='knob';
_$ha='controls';
_$gz='mini';
_$bs='content_object';
_$cn='font_size';
_$bw='content_width';
_$cd='double_click_target';
_$ey='null_placeholder';
_$dn='selected_object';
_$cj='font_bold';
_$gd='null';
_$gj='above';
_$fu='background_position';
_$de='off_state_image';
_$bx='critical_value';
_$jl='something';
_$is='resizable';
_$gy='small';
_$ej='conditionally_sets_editable';
_$j='replacement';
_$cz='max_value';
_$s='sender';

s$o='css';
s$aw='value_for_undefined_key';
s$j='attr_accessor';
s$pq='track_mouse:in_rect:of_view:until_mouse_up:';
s$bt='remove_observer:from_objects_at_indexes:for_key_path:';
s$td='image_position=';
s$hi='to_rect';
s$zn='allows_column_resizing?';
s$gt='add_curve_to_point';
s$ajb='will_finish_launching';
s$agz='can_become_main_window?';
s$tg='mixed?';
s$oc='enabled=';
s$dz='send_event';
s$dd='mouse_exited';
s$ef='draw_rect';
s$jb='draw_in_rect:from_rect:operation:fraction:';
s$bo='_kvo_setup';
s$afs='preserves_content_during_live_resize=';
s$aq='perform_selector:with_object:';
s$ew='context';
s$gz='ctm';
s$aad='number_of_rows';
s$kl='ancestor_shared_with_view';
s$ob='enabled?';
s$afr='preserves_content_during_live_resize?';
s$aeh='draw_sort_indicator_with_frame:in_view:ascending:priority:';
s$kh='display_properties';
s$dk='become_first_responder';
s$rd='represented_object=';
s$vl='rect_of_tick_mark_at_index';
s$fe='repeat?';
s$fp='set_value_for_binding';
s$agp='order_back';
s$kg='initialize_with_builder';
s$ha='add_ellipse_in_rect';
s$qx='entry_acceptable?';
s$dy='from_native_event:with_window:with_type:';
s$nb='length';
s$ws='content_view=';
s$mc='opaque?';
s$oq='string_value=';
s$aam='scroll_row_to_visible';
s$ahs='post_event:at_start:';
s$ahp='min_size=';
s$acp='selection_highlight_style';
s$gp='alpha=';
s$el='run';
s$ea='unbind_events';
s$ts='alternate_title';
s$di='no_responder_for';
s$wd='text_did_begin_editing';
s$mq='can_draw?';
s$lm='frame_size=';
s$aia='attatched_sheet';
s$hm='height=';
s$acb='select_row_indexes:by_extending_selection:';
s$gx='rotate_ctm';
s$kb='accepts_first_mouse';
s$he='path_empty?';
s$rm='calc_draw_info';
s$ns='action=';
s$ps='refuses_first_responder=';
s$xk='horizontal_line_scroll=';
s$aga='miniaturize';
s$ju='pop';
s$cj='post_notification_name:object:';
s$agn='make_key_window';
s$hs='inspect';
s$pt='refuses_first_responder?';
s$qy='key_equivalent';
s$lq='frame_center_rotation=';
s$afj='animation_resize_time';
s$rw='render_context';
s$acq='dragging_destination_feedback_style=';
s$aco='selection_highlight_style=';
s$nr='action';
s$gc='commit_editing_with_delegate:did_commit_selector:context_info:';
s$iv='filename=';
s$agd='zoom';
s$afp='aspect_ratio=';
s$adi='highlight_selection_in_clip_rect';
s$zt='intercell_spacing';
s$fl='exposed_bindings';
s$ln='frame';
s$fd='characters_ignoring_modifiers';
s$adp='min_width=';
s$tf='off?';
s$abd='clicked_row';
s$uw='min_value';
s$sg='sends_action_on_end_editing=';
s$up='attributed_title=';
s$ov='double_value=';
s$aal='size_last_column_to_fit';
s$fs='dict';
s$pg='select_cell';
s$pd='update_cell_inside';
s$sh='sends_action_on_end_editing?';
s$md='convert_point:from_view:';
s$mo='convert_rect_to_base';
s$ly='bounds=';
s$aja='test_binding=';
s$ady='sort_descriptor_prototype';
s$ei='delegate=';
s$ac='width';
s$afd='end_editing_for';
s$bd='set_value_for_key';
s$uc='key_equivalent_font';
s$lk='autoresizing_mask';
s$rj='cell_size';
s$do='menu=';
s$bn='add_observer:for_key_path:options:context:';
s$uv='sound';
s$zg='data_source';
s$tq='is_a?';
s$nl='cell=';
s$kd='theme_name';
s$ww='document_cursor';
s$zy='row_height=';
s$yu='document_rect';
s$dm='interpret_key_events';
s$c='app';
s$dw='window';
s$fw='default_placeholder_for_marker:with_binding:';
s$cl='remove_observer:name:object:';
s$ze='-@';
s$mp='convert_rect_from_base';
s$kq='view_did_hide';
s$my='render';
s$vb='alt_increment_value';
s$lp='frame_rotation';
s$abk='highlighted_table_column=';
s$adg='edit_column:row:with_event:select:';
s$ek='finish_launching';
s$nw='ignores_multi_click=';
s$aab='table_columns';
s$nx='ignores_multi_click?';
s$ku='remove_from_superview';
s$aaa='note_height_of_rows_with_indexes_changed';
s$vp='*';
s$yg='check_space_for_parts';
s$aik='select_key_view_following_view';
s$cq='perform_key_equivalent';
s$hy='+';
s$agj='hides_on_deactivate=';
s$ni='cell_class';
s$aig='initial_first_responder=';
s$adn='table_view=';
s$yr='hit_part';
s$pb='double_value';
s$mf='-';
s$iq='status';
s$agk='hides_on_deactivate?';
s$hh='path_contains_point?';
s$jq='first_time=';
s$lo='frame_rotation=';
s$vq='/';
s$xr='horizontal_page_scroll';
s$xh='horizontal_scroller';
s$ev='window_number';
s$agt='document_edited=';
s$aet='represnted_url=';
s$jp='first_time?';
s$jc='render_in_rect:enabled:gray_mask:';
s$abe='double_action=';
s$tc='alternate_image=';
s$px='attributed_string_value';
s$jk='lock_focus';
s$jo='alignment_rect=';
s$agu='document_edited?';
s$ys='knob_proportion';
s$acd='selected_row_indexes';
s$iu='image=';
s$adq='min_width';
s$g='remove_event_listener';
s$or='text=';
s$ms='display';
s$n='class_name=';
s$h='[]';
s$zj='corner_view';
s$bl='set_values_for_keys_with_dictionary';
s$ym='draw_knob_slot_in_rect:highlight:';
s$ss='allows_editing_text_attributes=';
s$wp='document_view=';
s$jm='delegate';
s$afo='resize_incremenets';
s$oi='alignment=';
s$ux='min_value=';
s$sr='allows_editing_text_attributes?';
s$nd='add_tracking_area';
s$ahj='level=';
s$uu='sound=';
s$ta='alternate_title=';
s$zh='header_view=';
s$ld='posts_frame_changed_notifications=';
s$lc='replace_subview:with:';
s$bc='array_value_for_key';
s$pc='update_cell';
s$dj='accepts_first_responder';
s$acf='deselect_row';
s$aim='autorecalculates_key_view_loop';
s$wg='style';
s$fq='info_for_binding';
s$hq='center';
s$lg='resize_with_old_superview_size';
s$le='posts_frame_changed_notifications?';
s$vs='min';
s$zq='grid_style_mask=';
s$ez='event_number';
s$ml='convert_point_to_base';
s$hx='<';
s$xu='page_scroll=';
s$gi='current_context=';
s$abp='drag_image_for_rows_with_indexes:table_columns:event:offset:';
s$ca='notification_with_name:object:';
s$zb='>';
s$hc='arc_to_point';
s$ap='perform_selector:with_object:with_object:';
s$xm='vertical_line_scroll=';
s$acs='column_indexes_in_rect';
s$ag='observe';
s$pw='control_text_did_change';
s$sa='edit_with_frame:in_view:editor:delegate:event:';
s$ch='object';
s$no='calc_size';
s$wx='border_type=';
s$ahe='works_when_modal?';
s$adw='data_cell=';
s$re='cell_attribute';
s$qs='scrollable=';
s$ahq='max_size=';
s$yf='draw_parts';
s$jr='last';
s$uz='max_value=';
s$aeg='header_rect_of_column';
s$qr='scrollable?';
s$jl='unlock_focus';
s$uk='render_image:with_frame:in_view:';
s$gg='flipped?';
s$ru='get_periodic_delay:interval:';
s$aat='times';
s$ec='mark_view_for_display';
s$fm='value_class_for_binding';
s$ach='selected_row';
s$acv='row_at_point';
s$jj='valid?';
s$yb='scroll_to_point';
s$agl='make_key_and_order_front';
s$xl='horizontal_line_scroll';
s$je='draw_representation:in_rect:';
s$ahf='convert_base_to_screen';
s$ji='remove_representation';
s$tl='key_equivalent_modifier_mask=';
s$se='menu_for_event:in_rect:of_view:';
s$jf='representations';
s$aav='odd?';
s$ahz='sheet?';
s$aha='become_key_window';
s$adc='should_focus_cell:at_column:row:';
s$ait='shows_toolbar_button=';
s$dh='cursor_update';
s$bg='validate_value:for_key_path:error:';
s$ft='set_info:for_binding:';
s$ix='name=';
s$ge='graphics_port';
s$qg='state=';
s$jy='child_node';
s$aip='toolbar=';
s$abo='can_drag_rows_with_indexes:at_point:';
s$qc='control_view';
s$pz='prefers_tracking_until_mouse_up';
s$fz='discard_editing';
s$yx='copies_on_scroll=';
s$lj='autoresizing_mask=';
s$aiu='shows_toolbar_button?';
s$adx='sort_descriptor_prototype=';
s$wq='reflect_scrolled_clip_view';
s$aaf='add_table_column';
s$hj='x=';
s$aed='dragged_column';
s$acy='autosave_name=';
s$adf='perform_click_on_cell_at_column:row:';
s$qa='init_text_cell';
s$oh='alignment';
s$ih='image';
s$rc='represented_object';
s$ade='focused_column=';
s$afu='make_first_responder';
s$bf='set_value:for_key_path:';
s$mg='convert_point:to_view:';
s$nk='cell';
s$yw='view_bounds_changed';
s$rz='stop_tracking:at:in_view:mouse_is_up:';
s$aix='owner';
s$adm='identifier';
s$op='abort_editing';
s$zf='data_source=';
s$xg='horizontal_scroller=';
s$agr='order_window:relative_to:';
s$abz='deselect_all';
s$ox='int_value';
s$ey='button_number';
s$eo='initialize_with_native_event:with_window:with_type:';
s$aar='_synchronize_render_context_with_row_data';
s$cz='scroll_wheel';
s$ahr='next_event_matching_mask';
s$ep='stop_propagation';
s$fh='user_data';
s$vi='allows_tick_mark_values_only=';
s$vg='number_of_tick_marks=';
s$nv='selected_tag';
s$hk='y=';
s$gw='translate_ctm';
s$qw='wraps=';
s$tx='highlights_by=';
s$aaj='column_with_identifier';
s$fa='location_in_window';
s$vj='allows_tick_mark_values_only?';
s$xq='horizontal_page_scroll=';
s$ph='send_action:to:';
s$qv='wraps?';
s$zx='grid_color';
s$pm='take_string_value_from';
s$acw='data_cell_for_row';
s$su='imports_graphics=';
s$zi='corner_view=';
s$afw='resize_flags';
s$zr='grid_style_mask';
s$hg='path_bounding_box';
s$us='bezel_style=';
s$aic='remove_child_window';
s$st='imports_graphics?';
s$nm='selected_cell';
s$nf='remove_tracking_area';
s$aek='frame_rect_for_content_rect:style_mask:';
s$kp='hidden_or_has_hidden_ancestor?';
s$gq='begin_path';
s$oa='continuous=';
s$aho='max_size';
s$ads='max_width';
s$oo='object_value';
s$rl='highlight_color_with_frame:in_view:';
s$nz='continuous?';
s$aid='child_windows';
s$dl='resign_first_responder';
s$zz='row_height';
s$aau='render_row';
s$hp='h';
s$cm='add_observer_for_name:object:queue:';
s$s='src=';
s$wf='text_did_change';
s$hf='path_current_point';
s$mn='convert_size_from_base';
s$zc='scroll_x_y';
s$afn='resize_increments=';
s$afi='set_frame:display:';
s$kv='view_will_move_to_superview';
s$rn='set_up_field_editor_attributes';
s$qb='init_image_cell';
s$js='push_element_stack';
s$jt='pop_element_stack';
s$aaw='prepared_cell_at_column:row:';
s$av='class';
s$aie='parent_window';
s$adz='resizing_mask=';
s$af='inner_html=';
s$aas='render_background_in_clip_rect';
s$gu='add_lines';
s$nj='render_with_frame:in_view:';
s$aan='scroll_column_to_visible';
s$sy='set_next_state';
s$oe='control_tint=';
s$cr='mouse_down';
s$gm='line_cap=';
s$uq='attributed_alternate_title';
s$aeq='setup_window_view';
s$sk='line_break_mode=';
s$kf='initialize_with_coder';
s$xc='has_horizontal_scroller=';
s$wm='content_size_for_frame_size:has_horizontal_scroller:has_vertical_scroller:border_type:';
s$of='control_size=';
s$dt='run_loop_mode';
s$zs='intercell_spacing=';
s$xd='has_horizontal_scroller?';
s$qu='highlighted=';
s$gh='current_context';
s$agy='can_become_key_window?';
s$aca='select_column_indexes:by_extending_selection:';
s$ie='image_with_contents_of_url';
s$qt='highlighted?';
s$zu='uses_alternating_row_background_colors=';
s$aee='dragged_distance';
s$hn='to_a';
s$ail='select_key_view_preceding_view';
s$zv='uses_alternating_row_background_colors?';
s$ho='w';
s$acg='selected_column';
s$pn='current_editor';
s$adk='draw_background_in_clip_rect';
s$sb='select_with_frame:in_view:editor:delegate:start:length:';
s$y='x';
s$wh='placeholder_string=';
s$aah='remove_table_column';
s$afy='released_when_closed=';
s$z='y';
s$co='next_responder';
s$gf='graphics_port=';
s$pj='take_float_value_from';
s$pv='control_text_did_end_editing';
s$au='respond_to?';
s$mx='view_will_draw';
s$ke='theme_name=';
s$dv='current_event';
s$afz='released_when_closed?';
s$tp='_update_button_images';
s$ve='knob_thickness=';
s$xz='scroller_width';
s$gb='editor:did_commit:context_info:';
s$pa='to_f';
s$qm='selectable=';
s$aiz='test_binding';
s$aff='frame_top_left_point=';
s$aep='init_with_content_rect:style_mask:';
s$pu='control_text_did_begin_editing';
s$abu='allows_empty_selection=';
s$abj='indicator_image_in_table_column';
s$yi='arrows_position=';
s$ub='key_equivalent_font=';
s$adu='header_cell';
s$abg='sort_descriptors=';
s$ql='selectable?';
s$lb='will_remove_subview';
s$po='abort_editing?';
s$kx='view_did_move_to_superview';
s$oy='to_i';
s$tj='key_equivalent=';
s$dn='flush_buffered_key_events';
s$abv='allows_empty_selection?';
s$afx='close';
s$adr='max_width=';
s$to='bezel';
s$acr='dragging_destination_feedback_style';
s$ex='click_count';
s$br='did_change:values_at_indexes:for_key:';
s$agq='order_out';
s$lv='bounds_rotation';
s$os='int_value=';
s$tb='alternate_image';
s$aii='select_next_key_view';
s$ui='join';
s$add='focused_column';
s$sj='base_writing_direction=';
s$acu='column_at_point';
s$aex='set_title_with_represented_filename';
s$zk='allows_column_reordering=';
s$ky='view_did_move_to_window';
s$fn='bind:to_object:with_key_path:options:';
s$nh='update_tracking_areas';
s$zl='allows_column_reordering?';
s$fg='tracking_number';
s$mi='convert_size:to_view:';
s$aeu='represented_url';
s$lw='translate_origin_to_point';
s$zo='column_autoresizing_style=';
s$jv='selector';
s$ah='to_s';
s$bz='attr_writer';
s$um='control_text_color';
s$tn='bezel=';
s$ol='formatter=';
s$ck='remove_observer';
s$ri='drawing_rect_for_bounds';
s$abf='double_action';
s$qq='bezeled=';
s$aio='recalculate_key_view_loop';
s$sm='allows_undo=';
s$wn='document_visible_rect';
s$ma='rotated_from_base?';
s$k='find';
s$pi='take_int_value_from';
s$qp='bezeled?';
s$ahg='perform_close';
s$ahc='resign_key_window';
s$agw='key_window?';
s$sn='allows_undo?';
s$fc='characters';
s$nu='tag=';
s$aiv='build!';
s$qo='bordered=';
s$vf='vertical?';
s$ls='bounds_origin=';
s$db='other_mouse_dragged';
s$aai='move_column:to_column:';
s$v='origin';
s$qn='bordered?';
s$fv='set_default_placeholder:for_marker:with_binding:';
s$abr='set_drop_row:drop_operation:';
s$cg='name';
s$sv='allows_mixed_state=';
s$cd='add_observer:selector:name:object:';
s$cb='notification_with_name:object:user_info:';
s$on='object_value=';
s$act='rows_in_rect';
s$afg='cascade_top_left_from_point';
s$wi='placeholder_string';
s$sw='allows_mixed_state?';
s$aiw='top';
s$kt='add_subview';
s$nq='target=';
s$nc='mouse:in_rect:';
s$ib='named_images';
s$yl='draw_knob';
s$vo='_knob_rect_for_value';
s$ad='height';
s$cf='post_notification_name:object:user_info:';
s$aao='note_number_of_rows_changed';
s$ip='load';
s$acn='allows_type_select=';
s$bq='will_change:values_at_indexes:for_key:';
s$abw='allows_column_selection=';
s$acm='allows_type_select?';
s$abx='allows_column_selection?';
s$mr='needs_display=';
s$f='add_event_listener';
s$rb='compare';
s$abl='highlighted_table_column';
s$qh='title';
s$sl='line_break_mode';
s$lr='frame_center_rotation';
s$vv='become_first_responder?';
s$fi='tracking_area';
s$mu='needs_display?';
s$ne='empty?';
s$yn='highlight';
s$aiy='adam?';
s$aem='min_frame_width_with_title:style_mask:';
s$ks='subviews=';
s$rf='set_cell_attribute:to:';
s$jw='find_selector';
s$yd='scroller_width_for_control_size';
s$hl='width=';
s$vc='title_color=';
s$mz='graphics_context';
s$va='alt_increment_value=';
s$ug='draw_bezel_with_frame:in_view:';
s$wu='content_view';
s$gj='save_graphics_state';
s$yc='scroll_h';
s$aih='initial_first_responder';
s$ej='running?';
s$afc='field_editor:for_object:';
s$adh='draw_row:clip_rect:';
s$gv='scale_ctm';
s$ai='listener';
s$uy='max_value';
s$ay='will_change_value_for_key';
s$tz='shows_state_by';
s$ajc='did_finish_launching';
s$ahd='resign_main_window';
s$rs='!=';
s$acc='selected_column_indexes';
s$fo='unbind';
s$yv='view_frame_changed';
s$ahy='window_controller=';
s$xs='vertical_page_scroll=';
s$zd='scroll_clip_view:to_point:';
s$hz='to_size';
s$acx='table_view:object_value_for_table_column:row:';
s$agv='visible?';
s$od='control_tint';
s$ak='puts';
s$xw='scrolls_dynamically=';
s$wr='document_view';
s$dr='help_requested';
s$yk='draw_arrow:highlight:';
s$vk='tick_mark_value_at_index';
s$ot='obj';
s$aij='select_previous_key_view';
s$bp='remove_observer:for_key_path:';
s$ace='deselect_column';
s$xx='scrolls_dynamically?';
s$ahh='perform_miniaturize';
s$fb='convert_screen_to_base';
s$fy='object_did_end_editing';
s$yt='knob_proportion=';
s$tt='image_position';
s$cx='mouse_moved';
s$ya='scroll_v';
s$lz='bounds';
s$aag='reload_data';
s$jh='add_representation';
s$abc='clicked_column';
s$en='allocate';
s$agb='deminiaturize';
s$km='opaque_ancestor';
s$zp='column_autoresizing_style';
s$ia='image_named';
s$kw='view_will_move_to_window';
s$gn='line_join=';
s$ra='val';
s$uo='default_paragraph_style';
s$ct='other_mouse_down';
s$pr='perform_click';
s$wl='frame_size_for_content_size:has_horizontal_scroller:has_vertical_scroller:border_type:';
s$jd='render_in_rect';
s$bs='add_observer:to_objects_at_indexes:for_key_path:options:context:';
s$jg='add_representations';
s$sf='default_menu';
s$xa='has_vertical_scroller=';
s$dg='flags_changed';
s$ahn='min_size';
s$aew='represented_filename=';
s$ja='draw_at_point:from_rect:operation:fraction:';
s$pf='draw_cell';
s$df='key_up';
s$wz='draws_background';
s$ain='autorecalculates_key_view_loop?';
s$wa='select_text';
s$rp='draw_interior_with_frame:in_view:';
s$aib='add_child_window:ordered:';
s$aef='resized_column';
s$a='version';
s$cs='right_mouse_down';
s$xb='has_vertical_scroller?';
s$rk='cell_size_for_bounds';
s$vw='draws_background=';
s$ae='instance_of?';
s$aeo='content_rect_for_frame_rect';
s$gy='concat_ctm';
s$ro='render_interior_with_frame:in_view:';
s$tv='image_scaling=';
s$ax='set_value:for_key:';
s$ahi='perform_zoom';
s$uj='render_title:with_frame:in_view:';
s$lu='bounds_rotation=';
s$dq='show_context_help';
s$agx='main_window?';
s$aer='alloc';
s$iw='sprite_origin=';
s$me='convert_point_from_base';
s$vx='draws_background?';
s$yj='arrows_position';
s$jz='setup_display_context';
s$na='hit_test';
s$ais='run_toolbar_customization_palette';
s$ahb='become_main_window';
s$aby='select_all';
s$mj='convert_rect:from_view:';
s$xy='header_view';
s$i='age';
s$aap='rect_of_row';
s$afk='in_live_resize?';
s$adt='header_cell=';
s$sq='shows_first_responder=';
s$hu='to_point';
s$abm='vertical_motion_can_begin_drag=';
s$w='size';
s$yz='auto_scroll?';
s$age='miniaturized?';
s$kr='view_did_unhide';
s$sp='shows_first_responder?';
s$qd='control_view=';
s$bx='observation_info';
s$agh='movable_by_window_background=';
s$abs='allows_multiple_selection=';
s$qz='valid_object_value?';
s$lh='autoresizes_subviews=';
s$py='attributed_string_value=';
s$vz='text_color';
s$za='constrain_scroll_point';
s$rq='draw_with_frame:in_view:';
s$kc='class_name';
s$yq='track_scroll_buttons';
s$zw='grid_color=';
s$agi='movable_by_window_background?';
s$abt='allows_multiple_selection?';
s$li='autoresizes_subviews?';
s$ul='attributed_title';
s$aaz='reload_data_for_row_indexes:column_indexes:';
s$hr='contain?';
s$wo='content_size';
s$aei='render_sort_indicator_with_frame:in_view:ascending:priority:';
s$by='attr_reader';
s$al='get!';
s$xt='vertical_page_scroll';
s$vr='_value_for_mouse_point';
s$ada='autosave_table_columns=';
s$ce='post_notification';
s$bi='set_value_for_key_path';
s$so='accepts_first_responder?';
s$we='text_did_end_editing';
s$wb='text_should_begin_editing?';
s$adb='autosave_table_columns?';
s$abq='set_dragging_source_operation_mask:for_local:';
s$iy='background_color=';
s$bh='array_value_for_key_path';
s$rg='image_rect_for_bounds';
s$e='<<';
s$nn='size_to_fit';
s$adj='draw_grid_in_clip_rect';
s$ig='sprite';
s$fu='option_descriptions_for_binding';
s$acj='row_selected?';
s$r='set_attribute';
s$ci='user_info';
s$bb='validate_value:for_key:error:';
s$oj='font';
s$aey='excluded_from_windows_menu=';
s$wj='placeholder_attributed_string=';
s$qi='title=';
s$ahl='has_shadow=';
s$ahk='level';
s$afa='style_mask';
s$pe='draw_cell_inside';
s$fr='propagate_binding';
s$in='init_with_data';
s$qf='state';
s$aez='excluded_from_windows_menu?';
s$aen='frame_rect_for_content_rect';
s$aeb='header_tool_tip=';
s$hv='in_rect?';
s$ow='string_value';
s$sx='next_state';
s$eu='window=';
s$xe='vertical_scroller=';
s$si='base_writing_direction';
s$rt='mouse_down_flags';
s$ahm='has_shadow?';
s$ar='perform_selector';
s$aci='column_selected?';
s$ty='shows_state_by=';
s$ff='key_code';
s$agf='movable=';
s$aaq='rect_of_column';
s$il='sprite_cell_masks';
s$m='element';
s$rx='start_tracking_at:in_view:';
s$cy='mouse_dragged';
s$agg='movable?';
s$ki='superview';
s$abi='set_indicator_image:in_table_column:';
s$aay='frame_of_cell_at_column:row:';
s$agc='zoomed?';
s$ng='tracking_areas';
s$mm='convert_size_to_base';
s$vn='closest_tick_mark_value_to_value';
s$wt='tile';
s$kj='subviews';
s$aej='sort_indicator_rect_for_bounds';
s$sd='reset_cursor_rect:in_view:';
s$x='origin=';
s$ab='==';
s$mt='needs_display_in_rect';
s$bw='observation_info=';
s$qk='editable=';
s$rr='highlight:with_frame:in_view:';
s$ga='commit_editing?';
s$adl='identifier=';
s$lf='resize_subviews_with_old_size';
s$bm='observe_value_for_key_path:of_object:change:context:';
s$xf='vertical_scroller';
s$kn='hidden=';
s$qj='editable?';
s$ahv='ignores_mouse_events=';
s$u='frame=';
s$eb='type';
s$d='ready?';
s$az='did_change_value_for_key';
s$afe='content_size=';
s$ado='table_view';
s$ko='hidden?';
s$ok='font=';
s$dc='mouse_entered';
s$ahw='ignores_mouse_events?';
s$it='image_did_error';
s$aba='edited_column';
s$np='target';
s$aac='number_of_columns';
s$abb='edited_row';
s$rv='render_context=';
s$wy='border_type';
s$aev='represented_filename';
s$jx='child_nodes';
s$lt='bounds_size=';
s$pk='take_double_value_from';
s$cp='try_to_perform:with:';
s$abn='vertical_motion_can_begin_drag';
s$hw='>=';
s$et='timestamp';
s$vh='tick_mark_position=';
s$xn='vertical_line_scroll';
s$bj='set_nil_value_for_key';
s$aif='parent_window=';
s$og='control_size';
s$ur='attributed_alternate_title=';
s$uf='draw_title:with_frame:in_view:';
s$ue='draw_image:with_frame:in_view:';
s$bv='automatically_notifies_observers_for_key';
s$dp='menu';
s$an='call';
s$ka='build';
s$ij='add_representation:rect:';
s$ud='set_key_equivalent_font:size:';
s$gl='line_width=';
s$de='key_down';
s$t='inner_text=';
s$ii='filename';
s$eh='shared_application';
s$vm='index_of_tick_mark_at_point';
s$ee='display_required_views';
s$be='value_for_key_path';
s$xv='page_scroll';
s$wc='text_should_end_editing?';
s$kk='descendant_of?';
s$cn='next_responder=';
s$as='access_instance_variables_directly?';
s$yh='usable_parts';
s$ds='undo_manager';
s$tu='image_scaling';
s$id='sprite_images';
s$tw='highlights_by';
s$ti='transparent=';
s$jn='alignment_rect';
s$cv='right_mouse_up';
s$aj='get';
s$ba='set_value:for_undefined_key:';
s$bu='key_paths_for_values_affecting_value_for_key';
s$th='transparent?';
s$hd='add_path';
s$rh='title_rect_for_bounds';
s$abh='sort_descriptors';
s$aht='accepts_mouse_moved_events=';
s$ago='make_main_window';
s$gd='tracking_area_with_rect:options:owner:user_info:';
s$air='toggle_toolbar_shown';
s$mh='convert_size:from_view:';
s$aak='table_column_with_identifier';
s$ahu='accepts_mouse_moved_events?';
s$afq='aspect_ratio';
s$sc='end_editing';
s$oz='float_value';
s$xj='autohides_scrollers=';
s$da='right_mouse_dragged';
s$cu='mouse_up';
s$fj='mouse_location';
s$aea='resizing_mask';
s$p='each';
s$b='display_mode';
s$at='value_for_key';
s$iz='background_color';
s$du='bind_events';
s$xi='autohides_scrollers?';
s$go='miter_limit=';
s$tr='string';
s$qe='type=';
s$acz='autosave_name';
s$afv='first_responder';
s$ack='number_of_selected_columns';
s$is='_image_did_error';
s$nt='tag';
s$ye='rect_for_part';
s$vt='max';
s$un='disabled_control_text_color';
s$ahx='window_controller';
s$agm='order_front';
s$afh='set_frame:display:animate:';
s$mw='visible_rect';
s$aae='number_of_rows_in_table_view';
s$aiq='toolbar';
s$afl='shows_resize_indicator=';
s$om='formatter';
s$ut='bezel_style';
s$ags='order_front_regardless';
s$afm='shows_resize_indicator?';
s$adv='data_cell';
s$yp='track_knob';
s$cc='default_center';
s$yy='copies_on_scroll';
s$tk='key_equivalent_modifier_mask';
s$ic='has_key?';
s$ny='send_action_on';
s$aft='update';
s$ou='float_value=';
s$er='allows_propagation=';
s$vy='text_color=';
s$xo='line_scroll=';
s$vd='title_font=';
s$mk='convert_rect:to_view:';
s$gk='restore_graphics_state';
s$eq='allows_propagation?';
s$ao='new';
s$aes='_window_view_class_for_style_mask';
s$q='camelize';
s$aax='table_view:will_display_cell:for_table_column:row:';
s$ll='frame_origin=';
s$afb='style_mask=';
s$mv='focus_view';
s$es='modifier_flags';
s$pl='take_object_value_from';
s$em='send_action:to:from:';
s$fx='object_did_begin_editing';
s$kz='did_add_subview';
s$l='initialize';
s$xp='line_scroll';
s$gr='move_to_point';
s$gs='add_line_to_point';
s$ael='content_rect_for_frame_rect:style_mask:';
s$aec='header_tool_tip';
s$ry='continue_tracking:at:in_view:';
s$eg='add_window';
s$im='init_with_size';
s$yo='test_part';
s$ht='eql?';
s$aa='size=';
s$vu='resign_first_responder?';
s$fk='expose_binding';
s$mb='rotated_or_scaled_from_base?';
s$ed='contains?';
s$sz='hit_test_for_event:in_rect:of_view:';
s$la='add_subview:positioned:relative_to:';
s$if='resource';
s$am='got_response';
s$acl='number_of_selected_rows';
s$ir='_image_did_load';
s$wk='placeholder_attributed_string';
s$ik='sprite:normal:gray_mask:disabled:';
s$ua='set_periodic_delay:interval:';
s$wv='document_cursor=';
s$te='on?';
s$tm='highlight=';
s$io='init_with_contents_of_url';
s$dx='include?';
s$lx='rotate_by_angle';
s$bk='dictionary_with_values_for_keys';
s$cw='other_mouse_up';
s$uh='render_bezel_with_frame:in_view:';
s$zm='allows_column_resizing=';
s$hb='add_arc';
s$pp='validate_editing';

i$dz='@placeholder_string';
i$hz='@toolbar';
i$di='@attributed_alternate_title';
i$hi='@hides_on_deactivate';
i$en='@vertical_page_scroll';
i$df='@image_scaling';
i$fw='@autosave_name';
i$bo='@cell_type';
i$dx='@text_color';
i$fx='@autosave_table_columns';
i$ar='@representations';
i$cb='@tag';
i$er='@knob_proportion';
i$ao='@height';
i$dj='@bezel_style';
i$ho='@has_shadow';
i$ed='@document_cursor';
i$h='@_kvo_observers';
i$dr='@vertical';
i$gg='@resizing_mask';
i$ff='@allows_column_resizing';
i$gl='@dragged_distance';
i$fz='@header_cell';
i$dh='@key_equivalent_font';
i$t='@delegate';
i$ib='@builder';
i$ha='@resize_increments';
i$fb='@header_view';
i$fe='@allows_column_reordering';
i$cc='@opaque';
i$as='@filename';
i$gf='@sort_descriptor_prototype';
i$fj='@grid_color';
i$cj='@formatter';
i$hf='@miniaturized';
i$ht='@attached_sheet';
i$p='@menu';
i$cm='@control_size';
i$gv='@max_size';
i$ew='@intercell_spacing';
i$d='@url';
i$fa='@column_rects';
i$r='@event_queue';
i$dd='@key_equivalent_modifier_mask';
i$fn='@vertical_motion_can_begin_drag';
i$bu='@bordered';
i$gw='@first_responder';
i$db='@alternate_image';
i$bb='@frame';
i$u='@run_loop_mode';
i$af='@options';
i$gh='@header_tool_tip';
i$bv='@bezeled';
i$fr='@selected_column_indexes';
i$ah='@ctx';
i$cw='@allows_mixed_state';
i$bh='@tracking_areas';
i$do='@title_color';
i$dy='@text_input_type';
i$ak='@size';
i$b='@element';
i$ci='@key_equivalent';
i$o='@next_responder';
i$gb='@identifier';
i$fk='@double_action';
i$gy='@excluded_from_windows_menu';
i$eu='@copies_on_scroll';
i$hr='@window_controller';
i$dm='@max_value';
i$hj='@document_edited';
i$fs='@selected_row_indexes';
i$j='@name';
i$be='@superview';
i$bm='@needs_display';
i$id='@adam';
i$cn='@represented_object';
i$br='@selectable';
i$hv='@parent_window';
i$cu='@allows_editing_text_attributes';
i$gx='@window_view';
i$fo='@allows_multiple_selection';
i$fi='@uses_alternating_row_background_colors';
i$ag='@owner';
i$aa='@run_block';
i$ct='@shows_first_responder';
i$ep='@scrolls_dynamically';
i$bw='@highlighted';
i$bc='@bounds';
i$gd='@min_width';
i$aj='@origin';
i$hy='@autorecalculates_key_view_loop';
i$f='@block';
i$au='@status';
i$dn='@alt_increment_value';
i$a='@event_listeners';
i$ay='@element_stack';
i$aq='@sprite_images';
i$hl='@key_window';
i$dl='@min_value';
i$de='@image_position';
i$by='@control_view';
i$hd='@released_when_closed';
i$ie='@test_binding';
i$hp='@accepts_mouse_moved_events';
i$ej='@horizontal_line_scroll';
i$es='@arrows_position';
i$fy='@focused_column';
i$v='@event_binding_mask';
i$aw='@background_color';
i$da='@alternate_title';
i$dk='@sound';
i$e='@callback';
i$gs='@min_button';
i$m='@default_center';
i$bz='@target';
i$cs='@allows_undo';
i$ga='@data_cell';
i$hk='@visible';
i$bp='@enabled';
i$dg='@opaue';
i$hn='@level';
i$cx='@transparent';
i$fq='@allows_column_selection';
i$hx='@initial_first_responder';
i$gt='@window_number';
i$i='@observation_info';
i$dq='@knob_thickness';
i$dv='@cell_frame';
i$s='@views_needing_display';
i$dw='@draws_background';
i$ek='@vertical_line_scroll';
i$ac='@window';
i$fv='@dragging_destination_feedback_style';
i$he='@zoomed';
i$eb='@content_view';
i$bk='@theme_name';
i$gi='@heder_tool_tip';
i$hm='@main_window';
i$bs='@state';
i$gz='@shows_resize_indicator';
i$ft='@allows_type_select';
i$q='@windows';
i$eq='@header_clip_view';
i$co='@render_context';
i$fg='@column_autoresizing_style';
i$fp='@allows_empty_selection';
i$eh='@horizontal_scroller';
i$dc='@image_dims_when_disabled';
i$ab='@event';
i$hq='@ignores_mouse_events';
i$dp='@title_font';
i$w='@event_binding_block';
i$cz='@shows_state_by';
i$ce='@scrollable';
i$ad='@kvb_info';
i$ck='@value';
i$go='@window_origin';
i$gr='@close_button';
i$k='@object';
i$cv='@imports_graphics';
i$z='@app';
i$bd='@subviews';
i$hw='@graphics_context';
i$ba='@current_context';
i$cg='@wraps';
i$bi='@display_context';
i$bx='@refuses_first_responder';
i$du='@allows_tick_mark_values_only';
i$at='@image';
i$bj='@class_name';
i$ex='@number_of_rows';
i$ae='@rect';
i$ch='@font';
i$dt='@tick_mark_position';
i$ea='@placeholder_attributed_string';
i$bq='@editable';
i$n='@dispatch_table';
i$gc='@table_view';
i$fh='@grid_style_mask';
i$ai='@flip_state';
i$x='@event_binding_window';
i$al='@x';
i$ei='@autohides_scrollers';
i$ds='@number_of_tick_marks';
i$cp='@sends_action_on_end_editing';
i$am='@y';
i$ec='@border_type';
i$bl='@frame_rotation';
i$eg='@has_horizontal_scroller';
i$fl='@sort_descriptors';
i$ez='@row_rects';
i$ax='@alignment_rect';
i$hh='@movable_by_window_background';
i$hs='@sheet';
i$ge='@max_width';
i$ef='@vertical_scroller';
i$ee='@has_vertical_scroller';
i$gp='@delta_x';
i$fd='@data_source';
i$gu='@min_size';
i$bt='@title';
i$gq='@delta_y';
i$fu='@selection_highlight_style';
i$av='@sprite_origin';
i$cf='@alignment';
i$fm='@highlighted_table_column';
i$ca='@action';
i$hu='@child_windows';
i$hb='@aspect_ratio';
i$fc='@corner_view';
i$cd='@continuous';
i$g='@script';
i$ic='@top_level_objects';
i$an='@width';
i$bn='@cell';
i$gm='@resized_column';
i$y='@current_event';
i$az='@first_time';
i$bg='@autoresizes_subviews';
i$ia='@shows_toolbar_button';
i$bf='@posts_frame_changed_notifications';
i$l='@user_info';
i$hg='@movable';
i$ev='@row_height';
i$ap='@named_images';
i$eo='@page_scroll';
i$cl='@control_tint';
i$cq='@base_writing_direction';
i$cy='@highlights_by';
i$gk='@dragged_column';
i$em='@horizontal_page_scroll';
i$gn='@style_mask';
i$c='@type';
i$gj='@hidden';
i$el='@line_scroll';
i$hc='@preserves_content_during_live_resize';
i$cr='@line_break_mode';
i$ey='@table_columns';
i$et='@document_view';

c$bc='Object';
c$am='DECREMENT_LINE_SIZE';
c$y='ButtonCell';
c$v='Responder';
c$au='WindowView';
c$ak='ClipView';
c$m='App';
c$k='APP_DID_CHANGE_SCREEN_PARAMETERS';
c$j='APP_DID_FINISH_LAUNCHING';
c$e='JSONP';
c$ba='BUILDERS';
c$as='CLOSE_IMAGE';
c$ap='TableHeaderView';
c$l='ENV';
c$h='VN';
c$aw='HUDWindowView';
c$ao='VIEW_BOUNDS_DID_CHANGE_NOTIFICATION';
c$an='VIEW_FRAME_DID_CHANGE_NOTIFICATION';
c$ad='ParagraphStyle';
c$ac='Color';
c$r='RenderContext';
c$q='Size';
c$f='JSONP_CALLBACKS';
c$ai='TextFieldCell';
c$w='Cell';
c$u='GraphicsContext';
c$t='Rect';
c$n='NotificationCenter';
c$af='SliderCell';
c$o='Application';
c$ax='NormalWindowView';
c$av='BorderlessWindowView';
c$at='CLOSE_HIGHLIGHTED_IMAGE';
c$aj='TextField';
c$a='VERSION';
c$bb='RubyWebApp';
c$az='Window';
c$ar='TableHeaderCell';
c$ae='Button';
c$ab='AttributedString';
c$aa='Image';
c$z='Control';
c$p='Point';
c$bd='TABLE_VIEW_DATA';
c$al='Scroller';
c$ah='Math';
c$g='Event';
c$b='Vienna';
c$ag='KNOB_PADDING_REGULAR';
c$x='View';
c$i='APP_WILL_FINISH_LAUNCHING';
c$c='Document';
c$ay='WINDOW_LEVELS';
c$aq='TableCornerView';
c$s='Element';
c$d='String';
rb_oENV = VN.$h('display_mode', 'render', 'image_dir', 'images');rb_cObject.$c_s('ENV', rb_oENV);
(function(self) {
self.$c_s('VERSION','0.0.1');
self.$def_s(s$a,function(self,_cmd){
return self.$c_g_full(c$a);
});
self.$def_s(s$b,function(self,_cmd){
return 'render';});
rb_define_method(self,s$c,function(self,_cmd){
});
})(RModule.define('Vienna'));
cObject.$c_s('VN',cObject.$c_g(c$b));


(function(self) {
self.$def_s(s$d,function(self,_cmd,block){
});
self.$def_s(s$e,function(self,_cmd,elem){
var e = elem.$i_g('@element');
document.body.appendChild(e);});
self.$def_s(s$f,function(self,_cmd,type,listener){
self.$i_s(i$a,ORTEST(rb_ivar_get(self, i$a),VN.$h()));
rb_funcall(rb_ivar_get(self, i$a),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(type, listener, false);
    }
    else {
      document.body.attachEvent('on' + type, listener);
    }});
self.$def_s(s$g,function(self,_cmd,type){
var listener = rb_funcall(rb_ivar_get(self, i$a),s$h,type);
if (document.addEventListener) {
      document.body.removeEventListener(type, listener, false);
    }
    else {
      document.body.detachEvent('on' + type, listener);
    }});
self.$c_g_full(c$c).$def_s(s$i,function(self,_cmd){
return 3;
});
})(RClass.define('Document',cObject));

(function(self) {
rb_funcall(self,s$j,_$a);
self.$def_s(s$k,function(self,_cmd,the_id){
document.getElementById(the_id)});
rb_define_method(self,s$l,function(self,_cmd,type,options){
self.$i_s(i$b,document.createElement(type));
return self.$i_s(i$c,type);
});
rb_define_method(self,s$m,function(self,_cmd){
return rb_ivar_get(self, i$b);
});
rb_define_method(self,s$n,function(self,_cmd,name){
rb_funcall(self, s$m).className = name;});
rb_define_method(self,s$o,function(self,_cmd,options){
rb_funcall(options,s$p,function(key,value){
rb_funcall(self, s$m).style[rb_funcall(key,s$q)] = value;});
return self;
});
rb_define_method(self,s$r,function(self,_cmd,key,value){
rb_funcall(self, s$m).setAttribute(key, value);});
rb_define_method(self,s$s,function(self,_cmd,obj){
rb_funcall(self, s$m).src = obj;});
rb_define_method(self,s$t,function(self,_cmd,str){
rb_funcall(self, s$m).innerHTML = str;});
rb_define_method(self,s$u,function(self,_cmd,new_frame){
rb_funcall(self,'origin=',rb_funcall(new_frame,s$v));
return rb_funcall(self,'size=',rb_funcall(new_frame,s$w));
});
rb_define_method(self,s$x,function(self,_cmd,new_origin){
rb_funcall(self, s$m).style.left = rb_funcall(new_origin,s$y) + 'px';rb_funcall(self, s$m).style.top = rb_funcall(new_origin,s$z) + 'px';});
rb_define_method(self,s$aa,function(self,_cmd,new_size){
if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$b))){
rb_funcall(self, s$m).width = rb_funcall(new_size,s$ac);rb_funcall(self, s$m).height = rb_funcall(new_size,s$ad);}
else{
rb_funcall(self, s$m).style.width = rb_funcall(new_size,s$ac) + 'px';rb_funcall(self, s$m).style.height = rb_funcall(new_size,s$ad) + 'px';}
});
rb_define_method(self,s$e,function(self,_cmd,other){
if(RTEST(rb_funcall(other,s$ae,self.$klass.$c_g_full(c$d)))){
rb_funcall(self, s$m).innerHTML += other;}
else{
rb_funcall(self, s$m).appendChild(rb_funcall(other,s$m));}
});
rb_define_method(self,s$af,function(self,_cmd,str){
rb_funcall(self, s$m).innerHTML = str;});
rb_define_method(self,s$ag,function(self,_cmd,type,block){
self.$i_s(i$a,ORTEST(rb_ivar_get(self, i$a),VN.$h()));
rb_funcall(rb_ivar_get(self, i$a),'[]=',type,block);
if (document.addEventListener) {
      rb_funcall(self, s$m).addEventListener(rb_funcall(type,s$ah), rb_funcall(self, s$ai), false);
    }
    else {
      rb_funcall(self, s$m).attachEvent('on' + rb_funcall(type,s$ah), rb_funcall(self, s$ai));
    }});
rb_define_method(self,s$f,function(self,_cmd,type,listener){
if (document.addEventListener) {
      rb_funcall(self, s$m).addEventListener(type, listener, false);
    }
    else {
      rb_funcall(self, s$m).attachEvent('on' + type, listener);
    }});
})(RClass.define('Element',cObject));

(function(self) {
rb_define_method(self,s$l,function(self,_cmd,url,options,block){
});
self.$def_s(s$aj,function(self,_cmd,url,options,block){
return rb_funcall(self.$c_g_full(c$e),s$aj,url,options,block);
});
})(RClass.define('JSON',cObject));
(function(self) {
self.$c_s('JSONP_CALLBACKS',[]);
rb_define_method(self,s$l,function(self,_cmd,url,options,block){
self.$i_s(i$d,url);
self.$i_s(i$e,"vn_jsonp_callback_0");
self.$i_s(i$f,block);
rb_funcall(self.$klass.$c_g_full(c$f),s$e,rb_ivar_get(self, i$e));
rb_funcall(self,s$ak,["Initializing JSNOP connection with url: ",(rb_ivar_get(self, i$d))].join(''));
return rb_funcall(self, s$al);
});
rb_define_method(self,s$al,function(self,_cmd){
window[rb_ivar_get(self, i$e)] = function(response) {
      VN$(self, 'got_response', response);
    };self.$i_s(i$g,document.createElement('script'));
rb_ivar_get(self, i$g).setAttribute('type', 'text/javascript');rb_ivar_get(self, i$g).setAttribute('src', rb_ivar_get(self, i$d));document.body.appendChild(rb_ivar_get(self, i$g));});
rb_define_method(self,s$am,function(self,_cmd,response){
rb_funcall(self,s$ak,'got response! toot!');
return rb_funcall(rb_ivar_get(self, i$f),s$an,JSONParserReformatter(response));
});
self.$def_s(s$aj,function(self,_cmd,url,options,block){
return rb_funcall(self,s$ao,url,options,block);
});
})(RClass.define('JSONP',cObject));

// 
//  parse.js
//  vienna
//  
//  Created by Adam Beynon on 2009-09-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function JSONParserParse(parse_text)
{
  var at,
    ch,
    escapee = {
      '"':  '"',
      '\\': '\\',
      '/':  '/',
      b:  '\b',
      f:  '\f',
      n:  '\n',
      r:  '\r',
      t:  '\t'
    },
    text;
  
  var error = function(m)
  {
    console.log("message:" + m + "...... at:" + at +  " /////// text:");
    // throw {
    //       name:  'SyntaxError',
    //       message: m,
    //       at:    at,
    //       text:  text
    //     };
  };

  var next = function(c)
  {
    if (c && c !== ch) {
      error("Expected '" + c + "' instead of '" + ch + "'");
    }

    ch = text.charAt(at);
    at += 1;
    return ch;
  };

  var number = function()
  {
    var number,
      string = '';

    if (ch === '-') {
      string = '-';
      next('-');
    }
    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }
    if (ch === '.') {
      string += '.';
      while (next() && ch >= '0' && ch <= '9') {
        string += ch;
      }
    }
    if (ch === 'e' || ch === 'E') {
      string += ch;
      next();
      if (ch === '-' || ch === '+') {
        string += ch;
        next();
      }
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
    }
    number = +string;
    if (isNaN(number)) {
      error("Bad number");
    } else {
      return number;
    }
  };

  var string = function()
  {

    var hex,
      i,
      string = '',
      uffff;
    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next();
          return string;
        } else if (ch === '\\') {
          next();
          if (ch === 'u') {
            uffff = 0;
            for (i = 0; i < 4; i += 1) {
              hex = parseInt(next(), 16);
              if (!isFinite(hex)) {
                break;
              }
              uffff = uffff * 16 + hex;
            }
            string += String.fromCharCode(uffff);
          } else if (typeof escapee[ch] === 'string') {
            string += escapee[ch];
          } else {
            break;
          }
        } else {
          string += ch;
        }
      }
    }
    error("Bad string");
  };

  var white = function()
  {
    while (ch && ch <= ' ') {
      next();
    }
  };

  var word = function ()
  {
    switch (ch) {
    case 't':
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    case 'f':
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');
      return false;
    case 'n':
      next('n');
      next('u');
      next('l');
      next('l');
      return nil;
    }
    error("Unexpected '" + ch + "'");
  };

  var value;

  var array = function()
  {
    var array = [];

    if (ch === '[') {
      next('[');
      white();
      if (ch === ']') {
        next(']');
        return array;   // empty array
      }
      while (ch) {
        array.push(value());
        white();
        if (ch === ']') {
          next(']');
          return array;
        }
        next(',');
        white();
      }
    }
    error("Bad array");
  };

  var dictionary = function()
  {
    var key;
    var newDict = new RHash();

    if (ch === '{') {
      next('{');
      white();
      if (ch === '}') {
        next('}');
        return newDict;   // empty object
      }
      while (ch) {
        key = string();
        white();
        next(':');
        if (VN$(newDict, 'has_key?', key)) {
          error('Duplicate key "' + key + '"');
        }
        VN$(newDict, 'store', key, value());
        white();
        if (ch === '}') {
          next('}');
          return newDict;
        }
        next(',');
        white();
      }
    }
    error("Bad dictionary");
  };

  var value = function()
  {

    white();
    switch (ch) {
    case '{':
      return dictionary();
    case '[':
      return array();
    case '"':
      return string();
    case '-':
      return number();
    default:
      return ch >= '0' && ch <= '9' ? number() : word();
    }
  };

    var result;

    text = parse_text;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
      error("Syntax error");
    }

    return result;
}
/* 
 * reformatter.js
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

// Reformats the object into a Ruby compatible object. Basically, objects are 
// converted into hashes, and null into 'nil'
function JSONParserReformatter(object)
{
  var hash = new RHash();
  for (var prop in object) {
    var val = object[prop];
    
    if (val == null) {
      val = nil;
    }
    else if (val.$klass == cArray) {
      val = JSONParserReformatterArray(val);
    }
    else if (val.constructor == Object) {
      val = JSONParserReformatter(val);
    }
    
    VN$(hash, 'store', prop, val);
  }
  return hash;
}

function JSONParserReformatterArray(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == null) {
      array[i] = nil;
    }
    else if (array[i].$klass == cArray) {
      array[i] = JSONParserReformatterArray(array[i]);
    }
    else if (array[i].constructor == Object) {
      array[i] = JSONParserReformatter(array[i]);
    }
  }
  return array;
}

(function(self) {
self.$c_s('Object',cObject.$c_g('Object'));
self.$c_s('Array',cObject.$c_g('Array'));
self.$c_s('Dictionary',cObject.$c_g('Hash'));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd){
});
self.$def(s$ap,function(self,_cmd,selector,obj1,obj2){
return VN$(self, selector, obj1, obj2);});
self.$def(s$aq,function(self,_cmd,selector,obj){
return VN$(self, selector, obj);});
rb_define_method(self,s$ar,function(self,_cmd,selector){
return VN$(self, selector);});
})(RClass.define_under(self,'Object',cObject));
})(RModule.define('Vienna'));

(function(self) {
self.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
(function(self) {
self.$def_s(s$as,function(self,_cmd){
return true;
});
rb_define_method(self,s$at,function(self,_cmd,key){
var accessor = key;
if(RTEST(rb_funcall(self,s$au,accessor))){
return rb_funcall(self,s$ar,accessor);
}
accessor = [(key),"?"].join('');
if(RTEST(rb_funcall(self,s$au,accessor))){
return rb_funcall(self,s$ar,accessor);
}
if(RTEST(rb_funcall(rb_funcall(self,s$av),s$as))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return rb_funcall(self,s$aw,key);
});
self.$def(s$ax,function(self,_cmd,value,key){
var accessor = [(key),"="].join('');
if(RTEST(rb_funcall(self,s$au,accessor))){
rb_funcall(self,s$aq,accessor,value);
return value;
}
if(RTEST(rb_funcall(rb_funcall(self,s$av),s$as))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {rb_funcall(self,s$ay,key);
self.$iv_tbl['@' + key] = value;rb_funcall(self,s$az,key);
return value;
}}
return rb_funcall(self,s$ba,value,key);
});
self.$def(s$bb,function(self,_cmd,value,key,out_error){
});
rb_define_method(self,s$bc,function(self,_cmd,key){
});
rb_define_method(self,s$bd,function(self,_cmd,key){
});
rb_define_method(self,s$be,function(self,_cmd,path){
return rb_funcall(self,s$at,path);
});
self.$def(s$bf,function(self,_cmd,value,path){
return rb_funcall(self,s$ax,value,path);
});
self.$def(s$bg,function(self,_cmd,value,path,out_error){
});
rb_define_method(self,s$bh,function(self,_cmd,path){
});
rb_define_method(self,s$bi,function(self,_cmd,path){
});
rb_define_method(self,s$aw,function(self,_cmd,key){
});
self.$def(s$ba,function(self,_cmd,value,key){
});
rb_define_method(self,s$bj,function(self,_cmd,key){
});
rb_define_method(self,s$bk,function(self,_cmd,keys){
});
rb_define_method(self,s$bl,function(self,_cmd,keyed_values){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,s$at,function(self,_cmd,key){
});
self.$def(s$ax,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,s$at,function(self,_cmd,key){
});
self.$def(s$ax,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Dictionary',cObject));
(function(self) {
rb_define_method(self,s$at,function(self,_cmd,key){
});
self.$def(s$ax,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Set',cObject));
})(RModule.define('Vienna'));

(function(self) {
self.$c_s('KEY_VALUE_CHANGE_KIND_KEY','KEY_VALUE_CHANGE_KIND_KEY');
self.$c_s('KEY_VALUE_CHANGE_NEW_KEY','KEY_VALUE_CHANGE_NEW_KEY');
self.$c_s('KEY_VALUE_CHANGE_OLD_KEY','KEY_VALUE_CHANGE_OLD_KEY');
self.$c_s('KEY_VALUE_CHANGE_INDEXES_KEY','KEY_VALUE_CHANGE_INDEXES_KEY');
self.$c_s('KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY','KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY');
self.$c_s('KEY_VALUE_OBSERVING_OPTIONS',VN.$h(_$c, 1, _$d, 2, _$e, 4, _$f, 8));
self.$c_s('KEY_VALUE_CHANGE',VN.$h(_$g, 0, _$h, 1, _$i, 2, _$j, 3));
(function(self) {
self.$def(s$bm,function(self,_cmd,path,object,change,context){
});
self.$def(s$bn,function(self,_cmd,observer,key_path,options,context){
rb_funcall(self, s$bo);
var key_observers = rb_funcall(rb_ivar_get(self, i$h),s$h,key_path);
if(!RTEST(key_observers)){
key_observers = VN.$h();
rb_funcall(rb_ivar_get(self, i$h),'[]=',key_path,key_observers);
}
return rb_funcall(key_observers,'[]=',observer,VN.$h(_$k, observer, _$l, key_path, _$m, options, _$n, context));
});
self.$def(s$bp,function(self,_cmd,observer,key_path){
});
rb_define_method(self,s$bo,function(self,_cmd){
if(RTEST(rb_ivar_get(self, i$h))){
return ;
}
(function(self) {
self.$def_s(s$ay,function(self,_cmd,a_key){
return rb_supcall(arguments.callee, self,_cmd,[a_key]);
});
self.$def_s(s$az,function(self,_cmd,a_key){
});
self.$def_s(s$bq,function(self,_cmd,change,indexes,a_key){
});
self.$def_s(s$br,function(self,_cmd,change,indexes,a_key){
});
})(self);
return self.$i_s(i$h,VN.$h());
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def(s$bs,function(self,_cmd,observer,indexes,key_path,options,context){
});
self.$def(s$bt,function(self,_cmd,observer,indexes,keyPath){
});
self.$def(s$bn,function(self,_cmd,observer,key_path,options,context){
});
self.$def(s$bp,function(self,_cmd,observer,key_path){
});
})(RClass.define_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,s$ay,function(self,_cmd,key){
return rb_funcall(self,s$ak,key);
});
rb_define_method(self,s$az,function(self,_cmd,key){
});
self.$def(s$bq,function(self,_cmd,changeKind,indexes,key){
});
self.$def(s$br,function(self,_cmd,changeKind,indexes,key){
});
self.$def_s(s$bu,function(self,_cmd,key){
});
rb_define_method(self,s$bv,function(self,_cmd,key){
return true;
});
rb_define_method(self,s$bw,function(self,_cmd,info){
return self.$i_s(i$i,info);
});
rb_define_method(self,s$bx,function(self,_cmd){
return rb_ivar_get(self, i$i);
});
})(RClass.define_under(self,'Object',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_funcall(self,s$by,_$o,_$p,_$q);
rb_funcall(self,s$bz,_$o,_$p,_$q);
rb_define_method(self,s$l,function(self,_cmd,name,obj,info){
rb_supcall(arguments.callee, self,_cmd,[]);
self.$i_s(i$j,name);
self.$i_s(i$k,obj);
return self.$i_s(i$l,info);
});
self.$def_s(s$ca,function(self,_cmd,name,obj){
return rb_funcall(self,s$cb,name,obj,nil);
});
self.$def_s(s$cb,function(self,_cmd,name,obj,info){
return rb_funcall(self,s$ao,name,obj,info);
});
})(RClass.define_under(self,'Notification',cObject));
(function(self) {
self.$def_s(s$cc,function(self,_cmd){
return self.$i_s(i$m,ORTEST(rb_ivar_get(self, i$m),rb_funcall(self,s$ao)));
});
rb_define_method(self,s$l,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return self.$i_s(i$n,[]);
});
self.$def(s$cd,function(self,_cmd,observer,selector,name,obj){
return rb_funcall(rb_ivar_get(self, i$n),s$e,VN.$h(_$k, observer, _$r, selector, _$o, name, _$s, obj, _$t, true));
});
rb_define_method(self,s$ce,function(self,_cmd,notification){
return rb_funcall(self,s$cf,rb_funcall(notification,s$cg),rb_funcall(notification,s$ch),rb_funcall(notification,s$ci));
});
self.$def(s$cj,function(self,_cmd,name,obj){
return rb_funcall(self,s$cf,name,obj,nil);
});
self.$def(s$cf,function(self,_cmd,name,obj,info){
return rb_funcall(rb_ivar_get(self, i$n),s$p,function(the_obj){
if(RTEST(rb_funcall(rb_funcall(the_obj,s$h,_$o),s$ab,name))){
rb_funcall(rb_funcall(the_obj,s$h,_$k),s$ap,rb_funcall(the_obj,s$h,_$r),obj,info);
}
});
});
rb_define_method(self,s$ck,function(self,_cmd,observer){
});
self.$def(s$cl,function(self,_cmd,observer,name,obj){
});
self.$def(s$cm,function(self,_cmd,name,obj,queue){
});
})(RClass.define_under(self,'NotificationCenter',cObject));
})(RModule.define('Vienna'));


(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return self.$i_s(i$o,nil);
});
rb_define_method(self,s$cn,function(self,_cmd,a_responder){
return self.$i_s(i$o,a_responder);
});
rb_define_method(self,s$co,function(self,_cmd){
return rb_ivar_get(self, i$o);
});
self.$def(s$cp,function(self,_cmd,an_action,an_object){
});
rb_define_method(self,s$cq,function(self,_cmd,the_event){
return false;
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cr,the_event);
});
rb_define_method(self,s$cs,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cs,the_event);
});
rb_define_method(self,s$ct,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$ct,the_event);
});
rb_define_method(self,s$cu,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cu,the_event);
});
rb_define_method(self,s$cv,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cv,the_event);
});
rb_define_method(self,s$cw,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cw,the_event);
});
rb_define_method(self,s$cx,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cx,the_event);
});
rb_define_method(self,s$cy,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cy,the_event);
});
rb_define_method(self,s$cz,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cz,the_event);
});
rb_define_method(self,s$da,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$da,the_event);
});
rb_define_method(self,s$db,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$db,the_event);
});
rb_define_method(self,s$dc,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$dc,the_event);
});
rb_define_method(self,s$dd,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$dd,the_event);
});
rb_define_method(self,s$de,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$de,the_event);
});
rb_define_method(self,s$df,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$df,the_event);
});
rb_define_method(self,s$dg,function(self,_cmd,the_event){
});
rb_define_method(self,s$dh,function(self,_cmd,the_event){
});
rb_define_method(self,s$di,function(self,_cmd,event_selector){
});
rb_define_method(self,s$dj,function(self,_cmd){
return false;
});
rb_define_method(self,s$dk,function(self,_cmd){
return true;
});
rb_define_method(self,s$dl,function(self,_cmd){
return true;
});
rb_define_method(self,s$dm,function(self,_cmd,event_array){
});
rb_define_method(self,s$dn,function(self,_cmd){
});
rb_define_method(self,s$do,function(self,_cmd,menu){
return self.$i_s(i$p,menu);
});
rb_define_method(self,s$dp,function(self,_cmd){
return rb_ivar_get(self, i$p);
});
rb_define_method(self,s$dq,function(self,_cmd,sender){
});
rb_define_method(self,s$dr,function(self,_cmd,the_event){
});
rb_define_method(self,s$ds,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$o),s$ds);
});
})(RClass.define_under(self,'Responder',cObject));
})(RModule.define('Vienna'));

(function(self) {
self.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(_$u, 0, _$v, 1, _$w, 2));
(function(self) {
rb_funcall(self,s$j,_$x,_$y,_$z);
rb_funcall(self,s$by,_$aa);
rb_define_method(self,s$l,function(self,_cmd){
self.$i_s(i$q,[]);
self.$i_s(i$r,[]);
self.$i_s(i$s,[]);
self.$i_s(i$t,nil);
return self.$i_s(i$u,_$u);
});
rb_define_method(self,s$dt,function(self,_cmd){
return rb_ivar_get(self, i$u);
});
rb_define_method(self,s$du,function(self,_cmd,types,block){
self.$i_s(i$u,_$w);
self.$i_s(i$v,types);
self.$i_s(i$w,block);
self.$i_s(i$x,rb_funcall(rb_funcall(self,s$dv),s$dw));
if(RTEST(rb_funcall(types,s$dx,_$ab))){
rb_funcall(self.$klass.$c_g_full(c$c),s$f,_$ac,function(evt){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,evt,nil,'left_mouse_dragged');
return rb_funcall(self,s$dz,the_event);
});
}
});
rb_define_method(self,s$ea,function(self,_cmd){
self.$i_s(i$u,_$u);
if(RTEST(rb_funcall(rb_ivar_get(self, i$v),s$dx,_$ab))){
rb_funcall(self.$klass.$c_g_full(c$c),s$g,_$ac);
}
});
rb_define_method(self,s$dv,function(self,_cmd){
return rb_ivar_get(self, i$y);
});
rb_define_method(self,s$dz,function(self,_cmd,the_event){
self.$i_s(i$y,the_event);
if(RTEST(rb_funcall(rb_ivar_get(self, i$u),s$ab,_$w))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$v),s$dx,rb_funcall(the_event,s$eb)))){
rb_funcall(the_event,'window=',rb_ivar_get(self, i$x));
rb_funcall(rb_ivar_get(self, i$w),s$an,the_event);
}
return ;
}
return rb_funcall(rb_funcall(the_event,s$dw),s$dz,the_event);
});
rb_define_method(self,s$ec,function(self,_cmd,view,flag){
if(!RTEST(rb_funcall(rb_ivar_get(self, i$s),s$ed,view))){
rb_funcall(rb_ivar_get(self, i$s),s$e,view);
}
});
rb_define_method(self,s$ee,function(self,_cmd){
rb_funcall(rb_ivar_get(self, i$s),s$p,function(view){
return rb_funcall(view,s$ef);
});
return self.$i_s(i$s,[]);
});
rb_define_method(self,s$eg,function(self,_cmd,window){
return 0;
});
rb_define_method(self,s$e,function(self,_cmd,window){
return rb_funcall(self,s$eg,window);
});
self.$def_s(s$eh,function(self,_cmd){
return self.$i_s(i$z,ORTEST(rb_ivar_get(self, i$z),rb_funcall(self,s$ao)));
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
if(RTEST(rb_funcall(rb_ivar_get(self, i$t),s$ab,obj))){
return ;
}
var nc = rb_funcall(self.$klass.$c_g_full(c$h).$c_g('NotificationCenter'),s$cc);
if(RTEST(rb_ivar_get(self, i$t))){
rb_funcall(nc,s$cl,rb_ivar_get(self, i$t),self.$klass.$c_g_full(c$i),self);
rb_funcall(nc,s$cl,rb_ivar_get(self, i$t),self.$klass.$c_g_full(c$j),self);
rb_funcall(nc,s$cl,rb_ivar_get(self, i$t),self.$klass.$c_g_full(c$k),self);
}
self.$i_s(i$t,obj);
if(RTEST(rb_funcall(rb_ivar_get(self, i$t),s$au,_$ad))){
rb_funcall(nc,s$cd,rb_ivar_get(self, i$t),'will_finish_launching',self.$klass.$c_g_full(c$i),self);
}
if(RTEST(rb_funcall(rb_ivar_get(self, i$t),s$au,_$ae))){
rb_funcall(nc,s$cd,rb_ivar_get(self, i$t),'did_finish_launching',self.$klass.$c_g_full(c$j),self);
}
});
rb_define_method(self,s$ej,function(self,_cmd){
return true;
});
rb_define_method(self,s$ek,function(self,_cmd){
rb_funcall(self.$klass.$c_g_full(c$l),'[]=',_$af,_$ag);
if(RTEST(rb_ivar_get(self, i$aa))){
rb_funcall(rb_ivar_get(self, i$aa),s$an,self);
}
rb_funcall(self.$klass.$c_g_full(c$c),s$f,_$ah,function(evt){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$dt),s$ab,_$w))){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,evt,nil,'left_mouse_down');
rb_funcall(self,s$ak,'sending event from here');
rb_funcall(self,s$dz,the_event);
}
});
rb_funcall(self.$klass.$c_g_full(c$c),s$f,_$ai,function(evt){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$dt),s$ab,_$w))){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,evt,nil,'left_mouse_up');
rb_funcall(self,s$dz,the_event);
}
});
var nc = rb_funcall(self.$klass.$c_g_full(c$n),s$cc);
rb_funcall(nc,s$cj,self.$klass.$c_g_full(c$i),self);
return rb_funcall(nc,s$cj,self.$klass.$c_g_full(c$j),self);
});
rb_define_method(self,s$el,function(self,_cmd,block){
return self.$i_s(i$aa,block);
});
self.$def(s$em,function(self,_cmd,action,target,sender){
if(RTEST(ANDTEST(action,target))){
rb_funcall(target,s$aq,action,sender);
}
});
})(RClass.define_under(self,'Application',cObject));
console.log('this pare');self.$c_s('App',rb_funcall(self.$c_g_full(c$o),s$eh));
console.log('ermmm');})(RModule.define('Vienna'));
window.onload = function() {rb_funcall(cObject.$c_g(c$h).$c_g('App'),s$ek);
};
(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(_$aj, 1, _$ak, 2, _$al, 3, _$am, 4, _$an, 5, _$ab, 6, _$ao, 7, _$ap, 8, _$aq, 9, _$ar, 10, _$as, 11, _$at, 12, _$au, 13, _$av, 14, _$aw, 15, _$ax, 16, _$ay, 17, _$az, 22, _$ba, 25, _$bb, 26, _$bc, 27));
(function(self) {
self.$def_s(s$dy,function(self,_cmd,event,win,type){
var obj = rb_funcall(self,s$en);
rb_funcall(obj,s$eo,event,win,type);
return obj;
});
self.$def(s$eo,function(self,_cmd,event,win,type){
self.$i_s(i$ab,event);
self.$i_s(i$ac,win);
return self.$i_s(i$c,type);
});
rb_define_method(self,s$ep,function(self,_cmd){
var event = rb_ivar_get(self, i$ab);
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
rb_define_method(self,s$eq,function(self,_cmd){
return rb_ivar_get(self, i$ab)._vn_allow_event_propagation? true : false;});
rb_define_method(self,s$er,function(self,_cmd,flag){
rb_ivar_get(self, i$ab)._vn_allow_event_propagation = flag;});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_ivar_get(self, i$c);
});
rb_define_method(self,s$es,function(self,_cmd){
});
rb_define_method(self,s$et,function(self,_cmd){
});
rb_define_method(self,s$eu,function(self,_cmd,a_window){
return self.$i_s(i$ac,a_window);
});
rb_define_method(self,s$dw,function(self,_cmd){
return rb_ivar_get(self, i$ac);
});
rb_define_method(self,s$ev,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ac),s$ev);
});
rb_define_method(self,s$ew,function(self,_cmd){
});
rb_define_method(self,s$ex,function(self,_cmd){
});
rb_define_method(self,s$ey,function(self,_cmd){
});
rb_define_method(self,s$ez,function(self,_cmd){
});
rb_define_method(self,s$fa,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ac),s$fb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_ivar_get(self, i$ab).clientX,rb_ivar_get(self, i$ab).clientY));
});
rb_define_method(self,s$fc,function(self,_cmd){
});
rb_define_method(self,s$fd,function(self,_cmd){
});
rb_define_method(self,s$fe,function(self,_cmd){
});
rb_define_method(self,s$ff,function(self,_cmd){
});
rb_define_method(self,s$fg,function(self,_cmd){
});
rb_define_method(self,s$fh,function(self,_cmd){
});
rb_define_method(self,s$fi,function(self,_cmd){
});
self.$def_s(s$fj,function(self,_cmd){
});
})(RClass.define_under(self,'Event',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$def_s(s$fk,function(self,_cmd,binding){
});
rb_define_method(self,s$fl,function(self,_cmd){
return [];
});
rb_define_method(self,s$fm,function(self,_cmd,binding){
});
self.$def(s$fn,function(self,_cmd,binding,observable,key_path,options){
if(!RTEST(rb_funcall(rb_funcall(self, s$fl),s$dx,binding))){
rb_funcall(self,s$ak,["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!RTEST(ANDTEST(observable,key_path))){
rb_funcall(self,s$ak,["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
rb_funcall(self,s$fo,binding);
rb_funcall(observable,s$bn,self,key_path,options,binding);
rb_funcall(rb_ivar_get(self, i$ad),'[]=',binding,VN.$h(_$bd, observable, _$be, key_path, _$m, options, _$bf, binding));
return rb_funcall(self,s$fp,binding);
});
self.$def(s$bm,function(self,_cmd,path,object,change,context){
if(RTEST(rb_funcall(self,s$fq,context))){
rb_funcall(self,s$ak,['KVB: received notification for chnage of context ',(context)].join(''));
rb_funcall(self,s$fp,context);
}
});
rb_define_method(self,s$fp,function(self,_cmd,binding){
var dict = rb_funcall(self,s$fq,binding);
var obj = rb_funcall(dict,s$h,_$bd);
var path = rb_funcall(dict,s$h,_$be);
var key = rb_funcall(dict,s$h,_$bf);
var value = rb_funcall(obj,s$be,path);
return rb_funcall(self,s$ax,value,key);
});
rb_define_method(self,s$fr,function(self,_cmd,binding){
var binding_dict = rb_funcall(self,s$fq,binding);
if(!RTEST(binding_dict)){
return nil;
}
var obj = rb_funcall(rb_funcall(self, s$fs),s$h,_$bd);
var path = rb_funcall(rb_funcall(self, s$fs),s$h,_$be);
var value = rb_funcall(self,s$at,rb_funcall(rb_funcall(self, s$fs),s$h,_$bf));
return rb_funcall(obj,s$bf,value,path);
});
rb_define_method(self,s$fo,function(self,_cmd,binding){
});
rb_define_method(self,s$fq,function(self,_cmd,binding){
return rb_funcall(rb_ivar_get(self, i$ad),s$h,binding);
});
self.$def(s$ft,function(self,_cmd,info,binding){
return rb_funcall(rb_ivar_get(self, i$ad),'[]=',binding,info);
});
rb_define_method(self,s$fu,function(self,_cmd,binding){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def_s(s$fv,function(self,_cmd,placeholder,marker,binding){
});
self.$def(s$fw,function(self,_cmd,marker,binding){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,s$fx,function(self,_cmd,editor){
});
rb_define_method(self,s$fy,function(self,_cmd,editor){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,s$fz,function(self,_cmd){
});
rb_define_method(self,s$ga,function(self,_cmd){
});
self.$def(s$gb,function(self,_cmd,editor,did_commit,context_info){
});
self.$def(s$gc,function(self,_cmd,delegate,did_commit_selector,context_info){
});
})(RClass.define_under(self,'Object',cObject));
self.$c_s('BINDING_NAMES',VN.$h(_$bg, '', _$bh, '', _$bi, '', _$bj, '', _$bk, '', _$bl, '', _$bm, '', _$bn, '', _$bo, '', _$bp, '', _$bq, '', _$br, '', _$bs, '', _$bt, '', _$bu, '', _$bv, '', _$bw, '', _$bx, '', _$by, '', _$bz, '', _$ca, '', _$cb, '', _$cc, '', _$cd, '', _$ce, '', _$cf, '', _$cg, '', _$ch, '', _$ci, '', _$cj, '', _$ck, '', _$cl, '', _$cm, '', _$cn, '', _$co, '', _$cp, '', _$cq, '', _$cr, '', _$cs, '', _$ct, '', _$cu, '', _$cv, '', _$cw, '', _$cx, '', _$cy, '', _$cz, '', _$da, '', _$db, '', _$dc, '', _$dd, '', _$de, '', _$df, '', _$dg, '', _$dh, '', _$di, '', _$dj, '', _$dk, '', _$dl, '', _$dm, '', _$dn, '', _$do, '', _$dp, '', _$dq, '', _$dr, '', _$ds, '', _$dt, '', _$du, '', _$dv, '', _$dw, '', _$dx, '', _$dy, '', _$dz, '', _$ea, '', _$eb, '', _$ec, '', _$ed, '', _$ee, '', _$ef, ''));
return self.$c_s('BINDING_OPTIONS',VN.$h(_$eg, '', _$eh, '', _$ei, '', _$ej, '', _$ek, '', _$el, '', _$em, '', _$en, '', _$eo, '', _$ep, '', _$eq, '', _$er, '', _$es, '', _$et, '', _$eu, '', _$ev, '', _$ew, '', _$ex, '', _$ey, '', _$ez, '', _$fa, '', _$fb, '', _$fc, '', _$fd, '', _$fe, '', _$ff, ''));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_funcall(self,s$by,_$fg,_$m,_$fh,_$q);
rb_define_method(self,s$l,function(self,_cmd,rect,options,owner,user_info){
self.$i_s(i$ae,rect);
self.$i_s(i$af,options);
self.$i_s(i$ag,owner);
return self.$i_s(i$l,user_info);
});
self.$def_s(s$gd,function(self,_cmd,rect,options,owner,user_info){
return rb_funcall(self,s$ao,rect,options,owner,user_info);
});
})(RClass.define_under(self,'TrackingArea',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,graphics_port,flip_state){
self.$i_s(i$ah,graphics_port);
return self.$i_s(i$ai,flip_state);
});
rb_define_method(self,s$ge,function(self,_cmd){
return rb_ivar_get(self, i$ah);
});
rb_define_method(self,s$gf,function(self,_cmd,graphics_port){
return self.$i_s(i$ah,graphics_port);
});
rb_define_method(self,s$gg,function(self,_cmd){
return rb_ivar_get(self, i$ai);
});
self.$def_s(s$gh,function(self,_cmd){
return self.$k_g('@@current_context');
});
self.$def_s(s$gi,function(self,_cmd,context){
return self.$k_s('@@current_context',context);
});
rb_define_method(self,s$gj,function(self,_cmd){
});
rb_define_method(self,s$gk,function(self,_cmd){
});
rb_define_method(self,s$gl,function(self,_cmd,width){
rb_ivar_get(self, i$ah).lineWidth = width});
rb_define_method(self,s$gm,function(self,_cmd,cap){
rb_ivar_get(self, i$ah).lineCap = cap});
rb_define_method(self,s$gn,function(self,_cmd,join){
rb_ivar_get(self, i$ah).lineJoin = join});
rb_define_method(self,s$go,function(self,_cmd,limit){
rb_ivar_get(self, i$ah).miterLimit = limit});
rb_define_method(self,s$gp,function(self,_cmd,alpha){
rb_ivar_get(self, i$ah).globalAlpha = alpha});
rb_define_method(self,s$gq,function(self,_cmd){
rb_ivar_get(self, i$ah).beginPath()});
rb_define_method(self,s$gr,function(self,_cmd,point){
rb_ivar_get(self, i$ah).moveTo(rb_funcall(point,s$y),rb_funcall(point,s$z))});
rb_define_method(self,s$gs,function(self,_cmd,point){
rb_ivar_get(self, i$ah).lineTo(rb_funcall(point,s$y),rb_funcall(point,s$z))});
rb_define_method(self,s$gt,function(self,_cmd,cp1,cp2,point){
rb_ivar_get(self, i$ah).bezierCurveTo(rb_funcall(cp1,s$y),rb_funcall(cp1,s$z),rb_funcall(cp2,s$y),rb_funcall(cp2,s$z),rb_funcall(point,s$y),rb_funcall(point,s$z))});
rb_define_method(self,s$gu,function(self,_cmd,points){
});
rb_define_method(self,s$gv,function(self,_cmd,sx,sy){
});
rb_define_method(self,s$gw,function(self,_cmd,tx,ty){
});
rb_define_method(self,s$gx,function(self,_cmd,angle){
});
rb_define_method(self,s$gy,function(self,_cmd,transform){
});
rb_define_method(self,s$gz,function(self,_cmd){
});
rb_define_method(self,s$ha,function(self,_cmd,rect){
});
rb_define_method(self,s$hb,function(self,_cmd,point,radius,start_angle,end_angle,clock_wise){
});
rb_define_method(self,s$hc,function(self,_cmd,point1,point2,radius){
});
rb_define_method(self,s$hd,function(self,_cmd,path){
});
rb_define_method(self,s$he,function(self,_cmd){
});
rb_define_method(self,s$hf,function(self,_cmd){
});
rb_define_method(self,s$hg,function(self,_cmd){
});
rb_define_method(self,s$hh,function(self,_cmd,point){
});
})(RClass.define_under(self,'GraphicsContext',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,x,y,w,h){
self.$i_s(i$aj,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,x,y));
return self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,w,h));
});
rb_define_method(self,s$hi,function(self,_cmd){
return self;
});
rb_define_method(self,s$w,function(self,_cmd){
return rb_ivar_get(self, i$ak);
});
rb_define_method(self,s$aa,function(self,_cmd,size){
return self.$i_s(i$ak,size);
});
rb_define_method(self,s$v,function(self,_cmd){
return rb_ivar_get(self, i$aj);
});
rb_define_method(self,s$x,function(self,_cmd,point){
return self.$i_s(i$aj,point);
});
rb_define_method(self,s$y,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$aj),s$y);
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$aj),s$z);
});
rb_define_method(self,s$ac,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ak),s$ac);
});
rb_define_method(self,s$ad,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ak),s$ad);
});
rb_define_method(self,s$hj,function(self,_cmd,x){
return rb_funcall(rb_ivar_get(self, i$aj),'x=',x);
});
rb_define_method(self,s$hk,function(self,_cmd,y){
return rb_funcall(rb_ivar_get(self, i$aj),'y=',y);
});
rb_define_method(self,s$hl,function(self,_cmd,w){
return rb_funcall(rb_ivar_get(self, i$ak),'width=',w);
});
rb_define_method(self,s$hm,function(self,_cmd,h){
return rb_funcall(rb_ivar_get(self, i$ak),'height=',h);
});
rb_define_method(self,s$hn,function(self,_cmd){
return [rb_funcall(self, s$y),rb_funcall(self, s$z),rb_funcall(self, s$ho),rb_funcall(self, s$hp)];
});
rb_define_method(self,s$hq,function(self,_cmd){
});
rb_define_method(self,s$hr,function(self,_cmd){
});
rb_define_method(self,s$ah,function(self,_cmd){
return ["{{",(rb_funcall(self, s$y)),", ",(rb_funcall(self, s$z)),"}, {",(rb_funcall(self, s$ac)),", ",(rb_funcall(self, s$ad)),"}}"].join('');
});
rb_define_method(self,s$hs,function(self,_cmd){
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$ak),s$ht,rb_funcall(other,s$w)),rb_funcall(rb_ivar_get(self, i$aj),s$ht,rb_funcall(other,s$v)));
});
})(RClass.define_under(self,'Rect',cObject));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,x,y){
self.$i_s(i$al,x);
return self.$i_s(i$am,y);
});
rb_define_method(self,s$hu,function(self,_cmd){
return self;
});
rb_define_method(self,s$y,function(self,_cmd){
return rb_ivar_get(self, i$al);
});
rb_define_method(self,s$hj,function(self,_cmd,x){
return self.$i_s(i$al,x);
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_ivar_get(self, i$am);
});
rb_define_method(self,s$hk,function(self,_cmd,y){
return self.$i_s(i$am,y);
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$al),s$ab,rb_funcall(other,s$y)),rb_funcall(rb_ivar_get(self, i$am),s$ab,rb_funcall(other,s$z)));
});
rb_define_method(self,s$hv,function(self,_cmd,a_rect){
return ANDTEST(rb_funcall(rb_funcall(self, s$y),s$hw,rb_funcall(a_rect,s$y)),ANDTEST(rb_funcall(rb_funcall(self, s$z),s$hw,rb_funcall(a_rect,s$z)),ANDTEST(rb_funcall(rb_funcall(self, s$y),s$hx,rb_funcall(rb_funcall(a_rect,s$y),s$hy,rb_funcall(a_rect,s$ac))),rb_funcall(rb_funcall(self, s$z),s$hx,rb_funcall(rb_funcall(a_rect,s$z),s$hy,rb_funcall(a_rect,s$ad))))));
});
})(RClass.define_under(self,'Point',cObject));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,w,h){
self.$i_s(i$an,w);
return self.$i_s(i$ao,h);
});
rb_define_method(self,s$hz,function(self,_cmd){
return self;
});
rb_define_method(self,s$ac,function(self,_cmd){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$hl,function(self,_cmd,w){
return self.$i_s(i$an,w);
});
rb_define_method(self,s$ad,function(self,_cmd){
return rb_ivar_get(self, i$ao);
});
rb_define_method(self,s$hm,function(self,_cmd,h){
return self.$i_s(i$ao,h);
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$an),s$ab,rb_funcall(other,s$ac)),rb_funcall(rb_ivar_get(self, i$ao),s$ab,rb_funcall(other,s$ad)));
});
})(RClass.define_under(self,'Size',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$def_s(s$ia,function(self,_cmd,name){
if(RTEST(rb_funcall(rb_funcall(self, s$ib),s$ic,name))){
return rb_funcall(rb_funcall(self, s$ib),s$h,name);
}
if(RTEST(rb_funcall(rb_funcall(self, s$id),s$ic,name))){
}
var img = rb_funcall(self,s$ie,["images/",(name),".png"].join(''));
rb_funcall(rb_funcall(self, s$ib),'[]=',name,img);
return img;
});
self.$def_s(s$ib,function(self,_cmd){
return self.$i_s(i$ap,ORTEST(rb_ivar_get(self, i$ap),VN.$h()));
});
self.$def_s(s$id,function(self,_cmd){
return self.$i_s(i$aq,ORTEST(rb_ivar_get(self, i$aq),VN.$h()));
});
self.$def_s(s$if,function(self,_cmd,name,block){
var img = rb_funcall(self,s$ia,name);
return arguments[arguments.length -1](img);
});
self.$def_s(s$ig,function(self,_cmd,name,rect){
var img = rb_funcall(self,s$ia,name);
var obj = rb_funcall(self,s$ao);
rb_funcall(obj,'image=',rb_funcall(img,s$ih));
rb_funcall(obj,'filename=',rb_funcall(img,s$ii));
rb_funcall(obj,s$ij,_$u,rect);
return obj;
});
self.$def_s(s$ik,function(self,_cmd,image,normal,gray_mask,disabled){
var img = rb_funcall(self,s$ia,image);
var obj = rb_funcall(self,s$ao);
rb_funcall(obj,'image=',rb_funcall(img,s$ih));
rb_funcall(obj,'filename=',rb_funcall(img,s$ii));
rb_funcall(obj,s$ij,_$u,normal);
rb_funcall(obj,s$ij,_$fi,gray_mask);
rb_funcall(obj,s$ij,_$fj,disabled);
return obj;
});
self.$def_s(s$il,function(self,_cmd,name,block){
var img = rb_funcall(self,s$ia,name);
var obj = rb_funcall(self,s$ao);
rb_funcall(obj,'image=',rb_funcall(img,s$ih));
rb_funcall(obj,'filename=',rb_funcall(img,s$ii));
arguments[arguments.length -1](obj);
return obj;
});
self.$def(s$ij,function(self,_cmd,type,array_rect){
rb_funcall(rb_ivar_get(self, i$ar),'[]=',type,array_rect);
if(RTEST(rb_funcall(type,s$ab,_$u))){
self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,rb_funcall(array_rect,s$h,2),rb_funcall(array_rect,s$h,3)));
}
});
rb_define_method(self,s$l,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return self.$i_s(i$ar,VN.$h());
});
rb_define_method(self,s$im,function(self,_cmd,size){
});
rb_define_method(self,s$in,function(self,_cmd,data){
});
self.$def_s(s$ie,function(self,_cmd,url){
var obj = rb_funcall(self, s$en);
rb_funcall(obj,s$io,url);
return obj;
});
rb_define_method(self,s$io,function(self,_cmd,url){
rb_funcall(self, s$l);
self.$i_s(i$as,url);
self.$i_s(i$at,nil);
return rb_funcall(self, s$ip);
});
rb_define_method(self,s$iq,function(self,_cmd){
return rb_ivar_get(self, i$au);
});
rb_define_method(self,s$ip,function(self,_cmd){
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$au),s$ab,_$fk),rb_funcall(rb_ivar_get(self, i$au),s$ab,_$fl)))){
return ;
}
self.$i_s(i$au,_$fk);
self.$i_s('@image', new Image());
      
      rb_ivar_get(self, i$at).onload = function() {
        rb_funcall(self,s$ir)
      };
      
      rb_ivar_get(self, i$at).onerror = function() {
        rb_funcall(self,s$is)
      };
      
      rb_ivar_get(self, i$at).onabort = function() {
        rb_funcall(self,s$is)
      };
      
      rb_ivar_get(self, i$at).src = rb_ivar_get(self, i$as);
      });
rb_define_method(self,s$is,function(self,_cmd){
self.$i_s(i$au,_$fm);
if(RTEST(ANDTEST(rb_ivar_get(self, i$t),rb_funcall(rb_ivar_get(self, i$t),s$au,_$fn)))){
rb_funcall(rb_ivar_get(self, i$t),s$it,self);
}
});
rb_define_method(self,s$ir,function(self,_cmd){
return self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,rb_ivar_get(self, i$at).width,rb_ivar_get(self, i$at).height));
});
rb_define_method(self,s$ig,function(self,_cmd,name,rect){
return self;
});
rb_define_method(self,s$ih,function(self,_cmd){
return rb_ivar_get(self, i$at);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$iv,function(self,_cmd,name){
return self.$i_s(i$as,name);
});
rb_define_method(self,s$ii,function(self,_cmd){
return rb_ivar_get(self, i$as);
});
rb_define_method(self,s$iw,function(self,_cmd,point){
return self.$i_s(i$av,point);
});
rb_define_method(self,s$aa,function(self,_cmd,size){
return self.$i_s(i$ak,size);
});
rb_define_method(self,s$w,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$ak),rb_funcall(self.$klass.$c_g_full(c$q),s$ao,0,0));
});
rb_define_method(self,s$ix,function(self,_cmd,name){
return self.$i_s(i$j,name);
});
rb_define_method(self,s$cg,function(self,_cmd){
return rb_ivar_get(self, i$j);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
self.$def(s$ja,function(self,_cmd,point,from_rect,op,delta){
});
self.$def(s$jb,function(self,_cmd,rect,from_rect,op,delta){
});
self.$def(s$jc,function(self,_cmd,rect,enabled,gray_mask){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
rb_funcall(ctx,s$o,VN.$h(_$fo,_$fp,_$fq,["url('",(rb_funcall(self, s$ii)),"')"].join('')));
rb_funcall(ctx,s$o,VN.$h(_$ef,[(rb_funcall(rect,s$ac)),"px"].join(''),_$fr,[(rb_funcall(rect,s$ad)),"px"].join('')));
rb_funcall(ctx,s$o,VN.$h(_$fs,[(rb_funcall(rect,s$y)),"px"].join(''),_$ft,[(rb_funcall(rect,s$z)),"px"].join('')));
var rep = RTEST(gray_mask) ? rb_funcall(rb_ivar_get(self, i$ar),s$h,_$fi) : rb_funcall(rb_ivar_get(self, i$ar),s$h,_$u);
if(!RTEST(enabled)){
rep = rb_funcall(rb_ivar_get(self, i$ar),s$h,_$fj);
}
return rb_funcall(ctx,s$o,VN.$h(_$fu,["-",(rb_funcall(rep,s$h,0)),"px -",(rb_funcall(rep,s$h,1)),"px"].join('')));
});
rb_define_method(self,s$jd,function(self,_cmd,rect){
return rb_funcall(self,s$jc,rect,true,false);
});
self.$def(s$je,function(self,_cmd,image_rep,rect){
});
rb_define_method(self,s$jf,function(self,_cmd){
return rb_ivar_get(self, i$ar);
});
rb_define_method(self,s$jg,function(self,_cmd,image_reps){
});
rb_define_method(self,s$jh,function(self,_cmd,image_rep){
});
rb_define_method(self,s$ji,function(self,_cmd,image_rep){
});
rb_define_method(self,s$jj,function(self,_cmd){
});
rb_define_method(self,s$jk,function(self,_cmd){
});
rb_define_method(self,s$jl,function(self,_cmd){
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
return self.$i_s(i$t,obj);
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$jn,function(self,_cmd){
return rb_ivar_get(self, i$ax);
});
rb_define_method(self,s$jo,function(self,_cmd,rect){
return self.$i_s(i$ax,rect);
});
})(RClass.define_under(self,'Image',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,tag_name,options){
self.$i_s(i$ay,[document.createElement(tag_name)]);
self.$i_s(i$az,true);
return self.$i_s(i$c,tag_name);
});
self.$def_s(s$gi,function(self,_cmd,current_context){
return self.$i_s(i$ba,current_context);
});
self.$def_s(s$gh,function(self,_cmd){
return rb_ivar_get(self, i$ba);
});
rb_define_method(self,s$jp,function(self,_cmd){
return rb_ivar_get(self, i$az);
});
rb_define_method(self,s$jq,function(self,_cmd,first_time){
return self.$i_s(i$az,first_time);
});
rb_define_method(self,s$m,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ay),s$jr);
});
rb_define_method(self,s$js,function(self,_cmd,element){
return rb_funcall(rb_ivar_get(self, i$ay),s$e,element);
});
rb_define_method(self,s$jt,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ay),s$ju);
});
rb_define_method(self,s$jv,function(self,_cmd,a_selector,block){
var element = rb_funcall(self,s$jw,a_selector);
rb_funcall(self,s$js,element);
arguments[arguments.length -1](self);
return rb_funcall(self, s$jt);
});
rb_define_method(self,s$jx,function(self,_cmd){
return rb_funcall(self, s$m).childNodes.length;});
rb_define_method(self,s$jy,function(self,_cmd,a_number,block){
var e = rb_funcall(self, s$m).childNodes[a_number];
rb_funcall(self,s$js,e);
arguments[arguments.length -1](self);
return rb_funcall(self, s$jt);
});
rb_define_method(self,s$jw,function(self,_cmd,a_selector){
var nodes = rb_funcall(self, s$m).childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == a_selector) {
          return nodes[i];
        }
      }
      return rb_funcall(self, s$m)});
})(RClass.define_under(self,'RenderContext',self.$c_g_full(c$s)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[]);
rb_funcall(self, s$jz);
self.$i_s(i$bb,frame);
self.$i_s(i$bc,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(frame,s$ac),rb_funcall(frame,s$ad)));
rb_funcall(self,'frame=',frame);
self.$i_s(i$bd,[]);
self.$i_s(i$ac,nil);
self.$i_s(i$be,nil);
self.$i_s(i$bf,false);
self.$i_s(i$bg,true);
return self.$i_s(i$bh,[]);
});
self.$def_s(s$ka,function(self,_cmd,options,block){
var view = rb_funcall(self,s$ao,rb_funcall(options,s$h,_$fv));
if(RTEST(block)){
arguments[arguments.length -1](view);
}
return view;
});
rb_define_method(self,s$m,function(self,_cmd){
return rb_ivar_get(self, i$b);
});
rb_define_method(self,s$b,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$l),s$h,_$fw);
});
rb_define_method(self,s$jz,function(self,_cmd){
if(RTEST(rb_funcall(rb_funcall(self, s$b),s$ab,_$fx))){
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$s),s$ao,_$fy,nil));
rb_funcall(rb_ivar_get(self, i$b),s$o,VN.$h(_$fz,'hidden'));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$r),s$ao,_$fy,nil));
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_ivar_get(self, i$bi));
}
else{
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$s),s$ao,_$fy));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$u),s$ao));
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_ivar_get(self, i$bi));
}
});
rb_define_method(self,s$kb,function(self,_cmd,the_event){
return true;
});
rb_define_method(self,s$dj,function(self,_cmd){
return true;
});
rb_define_method(self,s$kc,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bj),'vn-view');
});
rb_define_method(self,s$n,function(self,_cmd,a_class){
return self.$i_s(i$bj,a_class);
});
rb_define_method(self,s$kd,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bk),'');
});
rb_define_method(self,s$ke,function(self,_cmd,a_theme){
return self.$i_s(i$bk,a_theme);
});
rb_define_method(self,s$ge,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bi),s$m).getContext('2d');});
rb_define_method(self,s$kf,function(self,_cmd,coder){
});
rb_define_method(self,s$kg,function(self,_cmd,builder){
});
self.$def_s(s$kh,function(self,_cmd){
});
rb_funcall(self,s$kh,_$fv,_$ga);
rb_define_method(self,s$az,function(self,_cmd){
});
rb_define_method(self,s$dw,function(self,_cmd){
});
rb_define_method(self,s$ki,function(self,_cmd){
});
rb_define_method(self,s$kj,function(self,_cmd){
});
rb_define_method(self,s$kk,function(self,_cmd,a_view){
});
rb_define_method(self,s$kl,function(self,_cmd,a_view){
});
rb_define_method(self,s$km,function(self,_cmd){
});
rb_define_method(self,s$kn,function(self,_cmd,flag){
});
rb_define_method(self,s$ko,function(self,_cmd){
});
rb_define_method(self,s$kp,function(self,_cmd){
});
rb_define_method(self,s$kq,function(self,_cmd){
});
rb_define_method(self,s$kr,function(self,_cmd){
});
rb_define_method(self,s$ks,function(self,_cmd,new_subviews){
});
rb_define_method(self,s$kt,function(self,_cmd,a_view){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bd),s$dx,a_view))){
return ;
}
rb_funcall(a_view,s$ku);
rb_funcall(a_view,s$kv,self);
rb_funcall(a_view,s$kw,rb_ivar_get(self, i$ac));
rb_funcall(rb_ivar_get(self, i$bd),s$e,a_view);
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_funcall(a_view,s$m));
rb_funcall(a_view,'next_responder=',self);
rb_funcall(a_view,s$kx);
rb_funcall(a_view,s$ky);
return rb_funcall(self,s$kz,self);
});
rb_define_method(self,s$e,function(self,_cmd,a_view){
return rb_funcall(self,s$kt,a_view);
});
self.$def(s$la,function(self,_cmd,a_view,place,other_view){
});
rb_define_method(self,s$kw,function(self,_cmd,win){
self.$i_s(i$ac,win);
return rb_funcall(rb_ivar_get(self, i$bd),s$p,function(s){
return rb_funcall(s,s$kw,win);
});
});
rb_define_method(self,s$ky,function(self,_cmd){
rb_funcall(rb_ivar_get(self, i$bd),s$p,function(s){
return rb_funcall(s,s$ky);
});
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$kv,function(self,_cmd,new_super){
return self.$i_s(i$be,new_super);
});
rb_define_method(self,s$kx,function(self,_cmd){
});
rb_define_method(self,s$kz,function(self,_cmd,subview){
});
rb_define_method(self,s$lb,function(self,_cmd,subview){
});
rb_define_method(self,s$ku,function(self,_cmd){
});
self.$def(s$lc,function(self,_cmd,old_view,new_view){
});
rb_define_method(self,s$ld,function(self,_cmd,flag){
});
rb_define_method(self,s$le,function(self,_cmd){
});
rb_define_method(self,s$lf,function(self,_cmd,size){
});
rb_define_method(self,s$lg,function(self,_cmd,old){
});
rb_define_method(self,s$lh,function(self,_cmd,flag){
});
rb_define_method(self,s$li,function(self,_cmd){
});
rb_define_method(self,s$lj,function(self,_cmd,mask){
});
rb_define_method(self,s$lk,function(self,_cmd){
});
rb_define_method(self,s$ll,function(self,_cmd,new_origin){
rb_funcall(rb_ivar_get(self, i$bb),'x=',rb_funcall(new_origin,s$y));
rb_funcall(rb_ivar_get(self, i$bb),'y=',rb_funcall(new_origin,s$z));
rb_funcall(rb_ivar_get(self, i$b),'origin=',new_origin);
if(RTEST(rb_ivar_get(self, i$bf))){
var nc = rb_funcall(self.$klass.$c_g_full(c$n),s$cc);
rb_funcall(nc,s$cj,'frame chnage notification',self);
}
});
rb_define_method(self,s$lm,function(self,_cmd,new_size){
var old_size = rb_funcall(self.$klass.$c_g_full(c$q),s$ao,rb_funcall(rb_ivar_get(self, i$bb),s$ac),rb_funcall(rb_ivar_get(self, i$bb),s$ad));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$w),'width=',rb_funcall(new_size,s$ac));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$w),'height=',rb_funcall(new_size,s$ad));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$w),'width=',rb_funcall(new_size,s$ac));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$w),'height=',rb_funcall(new_size,s$ad));
rb_funcall(self,'needs_display=',true);
rb_funcall(rb_ivar_get(self, i$b),'size=',new_size);
rb_funcall(rb_ivar_get(self, i$bi),'size=',new_size);
if(RTEST(rb_ivar_get(self, i$bf))){
var nc = rb_funcall(self.$klass.$c_g_full(c$n),s$cc);
rb_funcall(nc,s$cj,'frame chnage notification',self);
}
});
rb_define_method(self,s$u,function(self,_cmd,frame){
rb_funcall(self,'frame_origin=',rb_funcall(frame,s$v));
rb_funcall(self,'frame_size=',rb_funcall(frame,s$w));
if(RTEST(rb_ivar_get(self, i$bf))){
var nc = rb_funcall(self.$klass.$c_g_full(c$n),s$cc);
rb_funcall(nc,s$cj,'view chnages notification',self);
}
});
rb_define_method(self,s$ln,function(self,_cmd){
return rb_ivar_get(self, i$bb);
});
rb_define_method(self,s$lo,function(self,_cmd,angle){
});
rb_define_method(self,s$lp,function(self,_cmd){
return rb_ivar_get(self, i$bl);
});
rb_define_method(self,s$lq,function(self,_cmd,angle){
});
rb_define_method(self,s$lr,function(self,_cmd){
});
rb_define_method(self,s$ls,function(self,_cmd,new_origin){
});
rb_define_method(self,s$lt,function(self,_cmd,new_size){
});
rb_define_method(self,s$lu,function(self,_cmd,angle){
});
rb_define_method(self,s$lv,function(self,_cmd){
});
rb_define_method(self,s$lw,function(self,_cmd,translation){
});
rb_define_method(self,s$lx,function(self,_cmd,angle){
});
rb_define_method(self,s$ly,function(self,_cmd,bounds){
});
rb_define_method(self,s$lz,function(self,_cmd){
return rb_ivar_get(self, i$bc);
});
rb_define_method(self,s$gg,function(self,_cmd){
});
rb_define_method(self,s$ma,function(self,_cmd){
});
rb_define_method(self,s$mb,function(self,_cmd){
});
rb_define_method(self,s$mc,function(self,_cmd){
});
self.$def(s$md,function(self,_cmd,point,view){
if(!RTEST(view)){
return rb_funcall(self,s$me,point);
}
return rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(point,s$y),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$y)),rb_funcall(rb_funcall(point,s$z),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$z)));
});
self.$def(s$mg,function(self,_cmd,point,view){
});
self.$def(s$mh,function(self,_cmd,size,view){
});
self.$def(s$mi,function(self,_cmd,size,view){
});
self.$def(s$mj,function(self,_cmd,rect,view){
});
self.$def(s$mk,function(self,_cmd,rect,view){
});
rb_define_method(self,s$ml,function(self,_cmd,point){
});
rb_define_method(self,s$me,function(self,_cmd,point){
if(RTEST(rb_ivar_get(self, i$be))){
return rb_funcall(rb_ivar_get(self, i$be),s$me,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(point,s$y),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$y)),rb_funcall(rb_funcall(point,s$z),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$z))));
}
else{
return point;
}
});
rb_define_method(self,s$mm,function(self,_cmd,size){
});
rb_define_method(self,s$mn,function(self,_cmd,size){
});
rb_define_method(self,s$mo,function(self,_cmd,rect){
});
rb_define_method(self,s$mp,function(self,_cmd,rect){
});
rb_define_method(self,s$mq,function(self,_cmd){
});
rb_define_method(self,s$mr,function(self,_cmd,flag){
if(!RTEST(rb_ivar_get(self, i$ac))){
return ;
}
return rb_funcall(self, s$ms);
});
rb_define_method(self,s$mt,function(self,_cmd,invalid_rect){
return rb_ivar_get(self, i$bm);
});
rb_define_method(self,s$mu,function(self,_cmd){
return rb_ivar_get(self, i$bm);
});
rb_define_method(self,s$jk,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$r),'current_context=',rb_ivar_get(self, i$bi));
});
rb_define_method(self,s$jl,function(self,_cmd){
});
self.$def_s(s$mv,function(self,_cmd){
});
rb_define_method(self,s$mw,function(self,_cmd){
});
rb_define_method(self,s$ms,function(self,_cmd){
if(!RTEST(rb_ivar_get(self, i$ac))){
return ;
}
rb_funcall(self, s$mx);
if(RTEST(rb_funcall(rb_funcall(self, s$b),s$ab,_$fx))){
rb_funcall(self, s$jk);
rb_funcall(self,s$my,rb_ivar_get(self, i$bi));
}
else{
var graphics_context = rb_funcall(rb_ivar_get(self, i$ac),s$mz);
rb_funcall(self.$klass.$c_g_full(c$u),'current_context=',graphics_context);
rb_funcall(graphics_context,'graphics_port=',rb_funcall(self,s$ge));
rb_funcall(self,s$ef,rb_funcall(self, s$lz));
}
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
rb_funcall(context,'first_time=',false);
}
});
rb_define_method(self,s$ef,function(self,_cmd,rect){
});
rb_define_method(self,s$mx,function(self,_cmd){
});
rb_define_method(self,s$na,function(self,_cmd,point){
point = rb_funcall(self,s$md,point,rb_ivar_get(self, i$be));
if(!RTEST(rb_funcall(point,s$hv,rb_funcall(self, s$lz)))){
return nil;
}
var count = rb_funcall(rb_ivar_get(self, i$bd),s$nb);
var i = 0;
for (i = 0; i < count; i++) {var view_to_check = rb_funcall(rb_ivar_get(self, i$bd),s$h,i);
var hit_test = rb_funcall(view_to_check,s$na,point);
if(RTEST(hit_test)){
return hit_test;
}
}return self;
});
self.$def(s$nc,function(self,_cmd,point,rect){
});
rb_define_method(self,s$nd,function(self,_cmd,tracking_area){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bh),s$ne))){
rb_funcall(rb_ivar_get(self, i$b),s$f,_$gb,function(evt){
});
rb_funcall(rb_ivar_get(self, i$b),s$f,_$gc,function(evt){
});
}
return rb_funcall(rb_ivar_get(self, i$bh),s$e,tracking_area);
});
rb_define_method(self,s$nf,function(self,_cmd,tracking_area){
});
rb_define_method(self,s$ng,function(self,_cmd){
return rb_ivar_get(self, i$bh);
});
rb_define_method(self,s$nh,function(self,_cmd){
});
})(RClass.define_under(self,'View',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$bn,rb_funcall(rb_funcall(rb_funcall(self,s$av),s$ni),s$ao));
return rb_funcall(rb_ivar_get(self, i$bn),'render_context=',rb_ivar_get(self, i$bi));
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$w);
});
rb_define_method(self,s$my,function(self,_cmd,context){
rb_funcall(self.$klass.$c_g_full(c$r),'current_context=',context);
return rb_funcall(rb_ivar_get(self, i$bn),s$nj,rb_funcall(self, s$lz),self);
});
rb_define_method(self,s$n,function(self,_cmd,class_name){
return rb_funcall(rb_ivar_get(self, i$bn),'class_name=',class_name);
});
rb_define_method(self,s$kc,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$kc);
});
rb_define_method(self,s$ke,function(self,_cmd,theme_name){
return rb_funcall(rb_ivar_get(self, i$bn),'theme_name=',theme_name);
});
rb_define_method(self,s$kd,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$kd);
});
rb_define_method(self,s$nk,function(self,_cmd){
return rb_ivar_get(self, i$bn);
});
rb_define_method(self,s$nl,function(self,_cmd,a_cell){
return rb_ivar_get(self, i$bn);
});
rb_define_method(self,s$nm,function(self,_cmd){
return rb_ivar_get(self, i$bn);
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$no,function(self,_cmd){
});
rb_define_method(self,s$np,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$np);
});
rb_define_method(self,s$nq,function(self,_cmd,obj){
return rb_funcall(rb_ivar_get(self, i$bn),'target=',obj);
});
rb_define_method(self,s$nr,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nr);
});
rb_define_method(self,s$ns,function(self,_cmd,selector){
return rb_funcall(rb_ivar_get(self, i$bn),'action=',selector);
});
rb_define_method(self,s$nt,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nt);
});
rb_define_method(self,s$nu,function(self,_cmd,tag){
return rb_funcall(rb_ivar_get(self, i$bn),'tag=',tag);
});
rb_define_method(self,s$nv,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nt);
});
rb_define_method(self,s$nw,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'ignores_multi_click=',flag);
});
rb_define_method(self,s$nx,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nx);
});
rb_define_method(self,s$ny,function(self,_cmd,mask){
});
rb_define_method(self,s$nz,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nz);
});
rb_define_method(self,s$oa,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'continuous=',flag);
});
rb_define_method(self,s$ob,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$ob);
});
rb_define_method(self,s$oc,function(self,_cmd,flag){
rb_funcall(rb_ivar_get(self, i$bn),'enabled=',flag);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$od,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$od);
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
return rb_funcall(rb_ivar_get(self, i$bn),'control_tint=',control_tint);
});
rb_define_method(self,s$of,function(self,_cmd,size){
return rb_funcall(rb_ivar_get(self, i$bn),'control_size=',size);
});
rb_define_method(self,s$og,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$og);
});
rb_define_method(self,s$oh,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$oh);
});
rb_define_method(self,s$oi,function(self,_cmd,mode){
return rb_funcall(rb_ivar_get(self, i$bn),'alignment=',mode);
});
rb_define_method(self,s$oj,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$oj);
});
rb_define_method(self,s$ok,function(self,_cmd,font){
return rb_funcall(rb_ivar_get(self, i$bn),'font=',font);
});
rb_define_method(self,s$ol,function(self,_cmd,new_formatter){
return rb_funcall(rb_ivar_get(self, i$bn),'formatter=',new_formatter);
});
rb_define_method(self,s$om,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$om);
});
rb_define_method(self,s$on,function(self,_cmd,obj){
if(!RTEST(rb_funcall(obj,s$ab,rb_funcall(rb_ivar_get(self, i$bn),s$oo)))){
rb_funcall(self, s$op);
rb_funcall(rb_ivar_get(self, i$bn),'object_value=',obj);
var needs_display = true;
}
});
rb_define_method(self,s$oq,function(self,_cmd,obj){
return rb_funcall(self,'object_value=',obj);
});
rb_define_method(self,s$or,function(self,_cmd,text){
return string_value = text;
});
rb_define_method(self,s$os,function(self,_cmd,val){
return rb_funcall(self,'object_value=',rb_funcall(self, s$ot));
});
rb_define_method(self,s$ou,function(self,_cmd,val){
return rb_funcall(self,'object_value=',rb_funcall(self, s$ot));
});
rb_define_method(self,s$ov,function(self,_cmd,val){
return rb_funcall(self,'object_value=',rb_funcall(self, s$ot));
});
rb_define_method(self,s$oo,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$oo);
});
rb_define_method(self,s$ow,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$ow);
});
rb_define_method(self,s$ah,function(self,_cmd){
return rb_funcall(self, s$ow);
});
rb_define_method(self,s$ox,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$ox);
});
rb_define_method(self,s$oy,function(self,_cmd){
return rb_funcall(self, s$ox);
});
rb_define_method(self,s$oz,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$oz);
});
rb_define_method(self,s$pa,function(self,_cmd){
return rb_funcall(self, s$oz);
});
rb_define_method(self,s$pb,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$pb);
});
rb_define_method(self,s$pc,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pd,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pe,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pf,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pg,function(self,_cmd,a_cell){
});
self.$def(s$ph,function(self,_cmd,action,target){
return rb_funcall(self.$klass.$c_g_full(c$m),s$em,action,target,self);
});
rb_define_method(self,s$pi,function(self,_cmd,sender){
});
rb_define_method(self,s$pj,function(self,_cmd,sender){
});
rb_define_method(self,s$pk,function(self,_cmd,sender){
});
rb_define_method(self,s$pl,function(self,_cmd,sender){
});
rb_define_method(self,s$pm,function(self,_cmd,sender){
});
rb_define_method(self,s$pn,function(self,_cmd){
});
rb_define_method(self,s$po,function(self,_cmd){
});
rb_define_method(self,s$pp,function(self,_cmd){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
if(!RTEST(rb_funcall(self, s$ob))){
return ;
}
rb_funcall(self,s$jk);
rb_funcall(rb_ivar_get(self, i$bn),s$pq,the_event,rb_funcall(self, s$lz),self,true);
return rb_funcall(self,s$jl);
});
rb_define_method(self,s$pr,function(self,_cmd,sender){
});
rb_define_method(self,s$ps,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'refuses_first_responder=',flag);
});
rb_define_method(self,s$pt,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$pt);
});
rb_define_method(self,s$pu,function(self,_cmd,notification){
});
rb_define_method(self,s$pv,function(self,_cmd,notification){
});
rb_define_method(self,s$pw,function(self,_cmd,notification){
});
rb_define_method(self,s$px,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$px);
});
rb_define_method(self,s$py,function(self,_cmd,val){
return rb_funcall(rb_ivar_get(self, i$bn),'attributed_string_value=',val);
});
self.$def(s$fn,function(self,_cmd,binding,observable,key_path,options){
if(RTEST(rb_funcall(binding,s$ab,_$ea))){
rb_funcall(self,s$fo,binding);
rb_funcall(observable,s$bn,self,key_path,options,binding);
var binding_dict = VN.$h(_$bd, observable, _$be, key_path, _$m, options, _$bf, 'object_value');
rb_funcall(self,s$ft,binding_dict,binding);
rb_funcall(self,s$fp,binding);
}
else{
rb_supcall(arguments.callee, self,_cmd,[binding,observable,key_path,options]);
}
});
})(RClass.define_under(self,'Control',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));

(function(self) {
self.$c_s('CELL_TYPES',VN.$h(_$gd, 0, _$ge, 1, _$cq, 2));
self.$c_s('IMAGE_POSITIONS',VN.$h(_$gf, 0, _$gg, 1, _$fs, 2, _$gh, 3, _$gi, 4, _$gj, 5, _$gk, 6));
self.$c_s('CELL_STATES',VN.$h(_$gl, 0, _$gm, 1));
self.$c_s('CELL_MASKS',VN.$h(_$gn, 0, _$go, 1, _$gp, 2, _$gq, 4, _$gr, 8));
self.$c_s('CONTROL_TINTS',VN.$h(_$gs, 0, _$gt, 1, _$gu, 6, _$gv, 7, _$gw, 10));
self.$c_s('CONTROL_SIZES',VN.$h(_$gx, 0, _$gy, 1, _$gz, 2));
(function(self) {
self.$def_s(s$pz,function(self,_cmd){
});
rb_define_method(self,s$qa,function(self,_cmd,str){
self.$i_s(i$bo,_$ge);
self.$i_s(i$bp,true);
self.$i_s(i$bq,false);
self.$i_s(i$br,false);
self.$i_s(i$bs,_$gl);
self.$i_s(i$bt,str);
self.$i_s(i$at,nil);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
self.$i_s(i$bw,false);
return self.$i_s(i$bx,false);
});
rb_define_method(self,s$qb,function(self,_cmd,img){
});
rb_define_method(self,s$l,function(self,_cmd){
return rb_funcall(self,s$qa,'Cell');
});
rb_define_method(self,s$n,function(self,_cmd,class_name){
return self.$i_s(i$bj,class_name);
});
rb_define_method(self,s$kc,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bj),'vn-control');
});
rb_define_method(self,s$ke,function(self,_cmd,theme_name){
return self.$i_s(i$bk,theme_name);
});
rb_define_method(self,s$kd,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bk),'');
});
rb_define_method(self,s$qc,function(self,_cmd){
return rb_ivar_get(self, i$by);
});
rb_define_method(self,s$qd,function(self,_cmd,view){
return self.$i_s(i$by,view);
});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_ivar_get(self, i$c);
});
rb_define_method(self,s$qe,function(self,_cmd,a_type){
return self.$i_s(i$c,a_type);
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_ivar_get(self, i$bs);
});
rb_define_method(self,s$qg,function(self,_cmd,state){
return self.$i_s(i$bs,state);
});
rb_define_method(self,s$np,function(self,_cmd){
return rb_ivar_get(self, i$bz);
});
rb_define_method(self,s$nq,function(self,_cmd,target){
return self.$i_s(i$bz,target);
});
rb_define_method(self,s$nr,function(self,_cmd){
return rb_ivar_get(self, i$ca);
});
rb_define_method(self,s$ns,function(self,_cmd,action){
return self.$i_s(i$ca,action);
});
rb_define_method(self,s$nt,function(self,_cmd){
return rb_ivar_get(self, i$cb);
});
rb_define_method(self,s$nu,function(self,_cmd,tag){
return self.$i_s(i$cb,tag);
});
rb_define_method(self,s$qh,function(self,_cmd){
return rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qi,function(self,_cmd,title){
return self.$i_s(i$bt,title);
});
rb_define_method(self,s$mc,function(self,_cmd){
return rb_ivar_get(self, i$cc);
});
rb_define_method(self,s$ob,function(self,_cmd){
return rb_ivar_get(self, i$bp);
});
rb_define_method(self,s$oc,function(self,_cmd,flag){
return self.$i_s(i$bp,flag);
});
rb_define_method(self,s$ny,function(self,_cmd,mask){
});
rb_define_method(self,s$nz,function(self,_cmd){
return rb_ivar_get(self, i$cd);
});
rb_define_method(self,s$oa,function(self,_cmd,flag){
return self.$i_s(i$cd,flag);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return self.$i_s(i$bq,flag);
});
rb_define_method(self,s$ql,function(self,_cmd){
return rb_ivar_get(self, i$br);
});
rb_define_method(self,s$qm,function(self,_cmd,flag){
return self.$i_s(i$br,flag);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_ivar_get(self, i$bu);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return self.$i_s(i$bu,flag);
});
rb_define_method(self,s$qp,function(self,_cmd){
return rb_ivar_get(self, i$bv);
});
rb_define_method(self,s$qq,function(self,_cmd,flag){
return self.$i_s(i$bv,flag);
});
rb_define_method(self,s$qr,function(self,_cmd){
return rb_ivar_get(self, i$ce);
});
rb_define_method(self,s$qs,function(self,_cmd,flag){
self.$i_s(i$ce,flag);
if(RTEST(flag)){
rb_funcall(self,'wraps=',false);
}
});
rb_define_method(self,s$qt,function(self,_cmd){
return rb_ivar_get(self, i$bw);
});
rb_define_method(self,s$qu,function(self,_cmd,flag){
return self.$i_s(i$bw,flag);
});
rb_define_method(self,s$oh,function(self,_cmd){
return rb_ivar_get(self, i$cf);
});
rb_define_method(self,s$oi,function(self,_cmd,align){
return self.$i_s(i$cf,align);
});
rb_define_method(self,s$qv,function(self,_cmd){
return rb_ivar_get(self, i$cg);
});
rb_define_method(self,s$qw,function(self,_cmd,flag){
self.$i_s(i$cg,flag);
if(RTEST(flag)){
rb_funcall(self,'scrollable=',false);
}
});
rb_define_method(self,s$oj,function(self,_cmd){
return rb_ivar_get(self, i$ch);
});
rb_define_method(self,s$ok,function(self,_cmd,obj){
return self.$i_s(i$ch,obj);
});
rb_define_method(self,s$qx,function(self,_cmd,str){
return true;
});
rb_define_method(self,s$qy,function(self,_cmd){
return rb_ivar_get(self, i$ci);
});
rb_define_method(self,s$ol,function(self,_cmd,formatter){
return self.$i_s(i$cj,formatter);
});
rb_define_method(self,s$om,function(self,_cmd){
return rb_ivar_get(self, i$cj);
});
rb_define_method(self,s$oo,function(self,_cmd){
});
rb_define_method(self,s$on,function(self,_cmd,obj){
return self.$i_s(i$ck,obj);
});
rb_define_method(self,s$qz,function(self,_cmd){
return true;
});
rb_define_method(self,s$ow,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$oq,function(self,_cmd,str){
return self.$i_s(i$ck,rb_funcall(self, s$ra));
});
rb_define_method(self,s$ox,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$os,function(self,_cmd,val){
return self.$i_s(i$ck,val);
});
rb_define_method(self,s$oz,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$ou,function(self,_cmd,val){
return self.$i_s(i$ck,val);
});
rb_define_method(self,s$pb,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$ov,function(self,_cmd,val){
return self.$i_s(i$ck,val);
});
rb_define_method(self,s$rb,function(self,_cmd,other_cell){
});
rb_define_method(self,s$pi,function(self,_cmd,sender){
});
rb_define_method(self,s$pj,function(self,_cmd,sender){
});
rb_define_method(self,s$pk,function(self,_cmd,sender){
});
rb_define_method(self,s$pm,function(self,_cmd,sender){
});
rb_define_method(self,s$pl,function(self,_cmd,sender){
});
rb_define_method(self,s$ih,function(self,_cmd){
return rb_ivar_get(self, i$at);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$od,function(self,_cmd){
return rb_ivar_get(self, i$cl);
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
return self.$i_s(i$cl,control_tint);
});
rb_define_method(self,s$of,function(self,_cmd,size){
return self.$i_s(i$cm,size);
});
rb_define_method(self,s$og,function(self,_cmd){
return rb_ivar_get(self, i$cm);
});
rb_define_method(self,s$rc,function(self,_cmd){
return rb_ivar_get(self, i$cn);
});
rb_define_method(self,s$rd,function(self,_cmd,obj){
return self.$i_s(i$cn,obj);
});
rb_define_method(self,s$re,function(self,_cmd,a_parameter){
});
self.$def(s$rf,function(self,_cmd,a_parameter,value){
});
rb_define_method(self,s$rg,function(self,_cmd,the_rect){
return the_rect;
});
rb_define_method(self,s$rh,function(self,_cmd,the_rect){
return the_rect;
});
rb_define_method(self,s$ri,function(self,_cmd,the_rect){
return the_rect;
});
rb_define_method(self,s$rj,function(self,_cmd){
});
rb_define_method(self,s$rk,function(self,_cmd,a_rect){
});
self.$def(s$rl,function(self,_cmd,cell_frame,control_view){
});
rb_define_method(self,s$rm,function(self,_cmd,a_rect){
});
rb_define_method(self,s$rn,function(self,_cmd,text_obj){
return text_obj;
});
self.$def(s$ro,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$rp,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$rq,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$rr,function(self,_cmd,flag,cell_frame,control_view){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bw),s$rs,flag))){
self.$i_s(i$bw,flag);
rb_funcall(self,s$nj,cell_frame,control_view);
}
});
rb_define_method(self,s$rt,function(self,_cmd){
});
self.$def(s$ru,function(self,_cmd,delay,interval){
});
rb_define_method(self,s$rv,function(self,_cmd,a_context){
return self.$i_s(i$co,a_context);
});
rb_define_method(self,s$rw,function(self,_cmd){
return rb_ivar_get(self, i$co);
});
self.$def(s$rx,function(self,_cmd,start_point,control_view){
return true;
});
self.$def(s$ry,function(self,_cmd,last_point,current_point,control_view){
return true;
});
self.$def(s$rz,function(self,_cmd,last_point,stop_point,control_view,flag){
});
self.$def(s$pq,function(self,_cmd,the_event,cell_frame,control_view,flag){
var location = rb_funcall(control_view,s$md,rb_funcall(the_event,s$fa),nil);
if(!RTEST(rb_funcall(self,s$rx,location,control_view))){
return false;
}
rb_funcall(self,s$rr,true,cell_frame,control_view);
if(RTEST(rb_funcall(self, s$nz))){
rb_funcall(control_view,s$ph,rb_funcall(self, s$nr),rb_funcall(self, s$np));
}
return rb_funcall(self.$klass.$c_g_full(c$m),s$du,[_$ak,_$ab],function(the_event){
location = rb_funcall(control_view,s$md,rb_funcall(the_event,s$fa),nil);
if(RTEST(flag)){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$ab,_$ak))){
rb_funcall(self,s$rz,location,location,control_view,true);
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
if(RTEST(rb_funcall(location,s$hv,cell_frame))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$gm))){
self.$i_s(i$bs,_$gl);
}
else{
self.$i_s(i$bs,_$gm);
}
rb_funcall(control_view,s$ph,rb_ivar_get(self, i$ca),rb_ivar_get(self, i$bz));
}
rb_funcall(self,s$rr,false,cell_frame,control_view);
return ;
}
else{
if(!RTEST(rb_funcall(self,s$ry,location,location,control_view))){
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
}
rb_funcall(self,s$rr,RTEST(rb_funcall(location,s$hv,cell_frame)) ? true : false,cell_frame,control_view);
}
}
});
});
self.$def(s$sa,function(self,_cmd,a_rect,control_view,text_obj,an_obj,the_event){
});
self.$def(s$sb,function(self,_cmd,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
rb_define_method(self,s$sc,function(self,_cmd,text_obj){
});
self.$def(s$sd,function(self,_cmd,cell_frame,control_view){
});
rb_define_method(self,s$do,function(self,_cmd,a_menu){
return self.$i_s(i$p,a_menu);
});
rb_define_method(self,s$dp,function(self,_cmd){
return rb_ivar_get(self, i$p);
});
self.$def(s$se,function(self,_cmd,the_event,cell_frame,view){
});
self.$def_s(s$sf,function(self,_cmd){
});
rb_define_method(self,s$sg,function(self,_cmd,flag){
return self.$i_s(i$cp,flag);
});
rb_define_method(self,s$sh,function(self,_cmd){
return rb_ivar_get(self, i$cp);
});
rb_define_method(self,s$si,function(self,_cmd){
return rb_ivar_get(self, i$cq);
});
rb_define_method(self,s$sj,function(self,_cmd,direction){
return self.$i_s(i$cq,direction);
});
rb_define_method(self,s$sk,function(self,_cmd,mode){
return self.$i_s(i$cr,mode);
});
rb_define_method(self,s$sl,function(self,_cmd){
return rb_ivar_get(self, i$cr);
});
rb_define_method(self,s$sm,function(self,_cmd,flag){
return self.$i_s(i$cs,flag);
});
rb_define_method(self,s$sn,function(self,_cmd){
return rb_ivar_get(self, i$cs);
});
rb_define_method(self,s$ps,function(self,_cmd,flag){
return self.$i_s(i$bx,flag);
});
rb_define_method(self,s$pt,function(self,_cmd){
return rb_ivar_get(self, i$bx);
});
rb_define_method(self,s$so,function(self,_cmd){
return true;
});
rb_define_method(self,s$sp,function(self,_cmd){
return rb_ivar_get(self, i$ct);
});
rb_define_method(self,s$sq,function(self,_cmd,flag){
return self.$i_s(i$ct,flag);
});
rb_define_method(self,s$pr,function(self,_cmd,sender){
});
rb_define_method(self,s$px,function(self,_cmd){
});
rb_define_method(self,s$py,function(self,_cmd,obj){
});
rb_define_method(self,s$sr,function(self,_cmd){
return rb_ivar_get(self, i$cu);
});
rb_define_method(self,s$ss,function(self,_cmd,flag){
self.$i_s(i$cu,flag);
if(!RTEST(flag)){
rb_funcall(self,'imports_graphics=',false);
}
});
rb_define_method(self,s$st,function(self,_cmd){
return rb_ivar_get(self, i$cv);
});
rb_define_method(self,s$su,function(self,_cmd,flag){
self.$i_s(i$cv,flag);
if(RTEST(flag)){
var allows_editing_text_attributes = true;
}
});
rb_define_method(self,s$sv,function(self,_cmd,flag){
return self.$i_s(i$cw,flag);
});
rb_define_method(self,s$sw,function(self,_cmd){
return rb_ivar_get(self, i$cw);
});
rb_define_method(self,s$sx,function(self,_cmd){
});
rb_define_method(self,s$sy,function(self,_cmd){
});
self.$def(s$sz,function(self,_cmd,event,cell_frame,control_view){
});
})(RClass.define_under(self,'Cell',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$y);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return rb_funcall(rb_ivar_get(self, i$bn),'title=',str);
});
rb_define_method(self,s$ta,function(self,_cmd,str){
return rb_funcall(rb_ivar_get(self, i$bn),'alternate_title=',str);
});
rb_define_method(self,s$tb,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tb);
});
rb_define_method(self,s$tc,function(self,_cmd,img){
return rb_funcall(rb_ivar_get(self, i$bn),'alternate_image=',img);
});
rb_define_method(self,s$iu,function(self,_cmd,image){
return rb_funcall(rb_ivar_get(self, i$bn),'image=',image);
});
rb_define_method(self,s$td,function(self,_cmd,position){
return rb_funcall(rb_ivar_get(self, i$bn),'image_position=',position);
});
rb_define_method(self,s$qe,function(self,_cmd,type){
return rb_funcall(rb_ivar_get(self, i$bn),'type=',type);
});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$eb);
});
rb_define_method(self,s$qg,function(self,_cmd,val){
return rb_funcall(rb_ivar_get(self, i$bn),'state=',val);
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$qf);
});
rb_define_method(self,s$te,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$te);
});
rb_define_method(self,s$tf,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tf);
});
rb_define_method(self,s$tg,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tg);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$qn);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'bordered=',flag);
});
rb_define_method(self,s$th,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$th);
});
rb_define_method(self,s$ti,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'transparent=',flag);
});
rb_define_method(self,s$qy,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$qy);
});
rb_define_method(self,s$tj,function(self,_cmd,code){
return rb_funcall(rb_ivar_get(self, i$bn),'key_equivalent=',code);
});
rb_define_method(self,s$tk,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tk);
});
rb_define_method(self,s$tl,function(self,_cmd,mask){
return rb_funcall(rb_ivar_get(self, i$bn),'key_equivalent_modifier_mask=',mask);
});
rb_define_method(self,s$tm,function(self,_cmd,flag){
});
rb_define_method(self,s$cq,function(self,_cmd,key){
});
rb_define_method(self,s$tn,function(self,_cmd,style){
return rb_funcall(rb_ivar_get(self, i$bn),'bezel=',style);
});
rb_define_method(self,s$to,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$to);
});
rb_define_method(self,s$sv,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'allows_mixed_state=',flag);
});
rb_define_method(self,s$sw,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$sw);
});
rb_define_method(self,s$sx,function(self,_cmd){
});
})(RClass.define_under(self,'Button',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));


(function(self) {
(function(self) {
self.$c_s('SWITCH_IMAGE_REGULAR',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[0,0,15,16],[0,17,15,16],[0,34,15,16]));
self.$c_s('SWITCH_HIGHLIGHTED_IMAGE_REGULAR',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[16,0,15,16],[16,17,15,16],[16,34,15,16]));
self.$c_s('SWITCH_IMAGE_SMALL',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[0,51,12,13],[0,65,12,13],[0,79,12,13]));
self.$c_s('SWITCH_HIGHLIGHTED_IMAGE_SMALL',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[13,51,12,13],[13,65,12,13],[13,79,12,13]));
self.$c_s('SWITCH_IMAGE_MINI',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[0,93,10,11],[0,105,10,11],[0,117,10,11]));
self.$c_s('SWITCH_HIGHLIGHTED_IMAGE_MINI',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[11,93,10,11],[11,105,10,11],[11,117,10,11]));
self.$c_s('SWITCH_IMAGE_REGULAR_GRAPHITE',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[0,129,15,16],[0,146,15,16],[0,163,15,16]));
self.$c_s('SWITCH_HIGHLIGHTED_IMAGE_REGULAR_GRAPHITE',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[16,129,15,16],[16,146,15,16],[16,163,15,16]));
self.$c_s('SWITCH_IMAGE_SMALL_GRAPHITE',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[0,180,12,13],[0,194,12,13],[0,208,12,13]));
self.$c_s('SWITCH_HIGHLIGHTED_IMAGE_SMALL_GRAPHITE',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[13,180,12,13],[13,194,12,13],[13,208,12,13]));
self.$c_s('SWITCH_IMAGE_MINI_GRAPHITE',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[0,222,10,11],[0,234,10,11],[0,246,10,11]));
return self.$c_s('SWITCH_HIGHLIGHTED_IMAGE_MINI_GRAPHITE',rb_funcall(self.$c_g_full(c$aa),s$ik,_$ha,[11,222,10,11],[11,234,10,11],[11,246,10,11]));
})(RClass.define_under(self,'ButtonCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));
(function(self) {
(function(self) {
rb_define_method(self,s$qa,function(self,_cmd,str){
rb_supcall(arguments.callee, self,_cmd,[str]);
self.$i_s(i$cx,false);
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gn);
self.$i_s(i$da,'');
self.$i_s(i$db,nil);
self.$i_s(i$dc,false);
self.$i_s(i$bu,true);
self.$i_s(i$bv,true);
self.$i_s(i$cf,_$hb);
self.$i_s(i$ci,'');
return self.$i_s(i$dd,0);
});
rb_define_method(self,s$qb,function(self,_cmd,img){
});
rb_define_method(self,s$l,function(self,_cmd){
return rb_funcall(self,s$qa,'ButtonCell');
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
rb_supcall(arguments.callee, self,_cmd,[control_tint]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hc),rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hd)))){
rb_funcall(self, s$tp);
}
});
rb_define_method(self,s$of,function(self,_cmd,size){
rb_supcall(arguments.callee, self,_cmd,[size]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hc),rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hd)))){
rb_funcall(self, s$tp);
}
});
rb_define_method(self,s$tp,function(self,_cmd){
var size_str = (function($v){
if(($e = rb_funcall(_$gy, '===', $v),$e!==nil && $e!==false)){
return '_SMALL';
}
else if(($e = rb_funcall(_$gz, '===', $v),$e!==nil && $e!==false)){
return '_MINI';
}
else {
return '_REGULAR';
}
})(rb_ivar_get(self, i$cm));
var tint_str = (function($v){
if(($e = rb_funcall(_$gu, '===', $v),$e!==nil && $e!==false)){
return '_GRAPHITE';
}
else if(($e = rb_funcall(_$gw, '===', $v),$e!==nil && $e!==false)){
return '_HUD';
}
else {
return '';
}
})(rb_ivar_get(self, i$cl));
if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hc))){
var img_name = ["SWITCH_IMAGE",(size_str),(tint_str)].join('');
var alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
else if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hd))){
img_name = ["RADIO_IMAGE",(size_str),(tint_str)].join('');
alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
self.$i_s(i$at,self.$klass.$c_g(img_name));
return self.$i_s(i$db,self.$klass.$c_g(alt_img_name));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-button';
});
rb_define_method(self,s$qh,function(self,_cmd){
return RTEST(rb_funcall(rb_ivar_get(self, i$bt),s$tq,self.$klass.$c_g_full(c$ab))) ? rb_funcall(rb_ivar_get(self, i$bt),s$tr) : rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$ts,function(self,_cmd){
return rb_ivar_get(self, i$da);
});
rb_define_method(self,s$ta,function(self,_cmd,str){
return self.$i_s(i$da,str);
});
rb_define_method(self,s$tb,function(self,_cmd){
return rb_ivar_get(self, i$db);
});
rb_define_method(self,s$tc,function(self,_cmd,img){
return self.$i_s(i$db,img);
});
rb_define_method(self,s$tt,function(self,_cmd){
return rb_ivar_get(self, i$de);
});
rb_define_method(self,s$td,function(self,_cmd,position){
return self.$i_s(i$de,position);
});
rb_define_method(self,s$tu,function(self,_cmd){
return rb_ivar_get(self, i$df);
});
rb_define_method(self,s$tv,function(self,_cmd,image_scaling){
return self.$i_s(i$df,image_scaling);
});
rb_define_method(self,s$qg,function(self,_cmd,val){
return self.$i_s(i$bs,val);
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_ivar_get(self, i$bs);
});
rb_define_method(self,s$te,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$gm);
});
rb_define_method(self,s$tf,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$gl);
});
rb_define_method(self,s$tg,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$he);
});
rb_define_method(self,s$tw,function(self,_cmd){
return rb_ivar_get(self, i$cy);
});
rb_define_method(self,s$tx,function(self,_cmd,a_type){
return self.$i_s(i$cy,a_type);
});
rb_define_method(self,s$ty,function(self,_cmd,a_type){
return self.$i_s(i$cz,a_type);
});
rb_define_method(self,s$tz,function(self,_cmd){
return rb_ivar_get(self, i$cz);
});
rb_define_method(self,s$qe,function(self,_cmd,a_type){
self.$i_s(i$c,a_type);
return (function($v){
if(($e = rb_funcall(_$hf, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gr);
self.$i_s(i$cz,_$gn);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hg, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gr);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hh, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$go);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hc, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$go);
self.$i_s(i$cz,_$go);
self.$i_s(i$dc,true);
self.$i_s(i$de,_$fs);
rb_funcall(self, s$tp);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
return self.$i_s(i$cf,_$fs);
}
else if(($e = rb_funcall(_$hd, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$go);
self.$i_s(i$cz,_$go);
self.$i_s(i$dc,true);
self.$i_s(i$de,_$fs);
rb_funcall(self, s$tp);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
return self.$i_s(i$cf,_$fs);
}
else if(($e = rb_funcall(_$hi, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$go);
self.$i_s(i$cz,_$gn);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hj, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gr);
self.$i_s(i$cz,_$gr);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hk, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gn);
return self.$i_s(i$dc,true);
}
})(a_type);
});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_ivar_get(self, i$c);
});
rb_define_method(self,s$mc,function(self,_cmd){
return rb_ivar_get(self, i$dg);
});
rb_define_method(self,s$ok,function(self,_cmd,font_obj){
return self.$i_s(i$ch,font_obj);
});
rb_define_method(self,s$th,function(self,_cmd){
return rb_ivar_get(self, i$cx);
});
rb_define_method(self,s$ti,function(self,_cmd,flag){
return self.$i_s(i$cx,flag);
});
self.$def(s$ua,function(self,_cmd,delay,interval){
});
self.$def(s$ru,function(self,_cmd,delay,interval){
});
rb_define_method(self,s$qy,function(self,_cmd){
return rb_ivar_get(self, i$ci);
});
rb_define_method(self,s$tj,function(self,_cmd,equiv){
return self.$i_s(i$ci,equiv);
});
rb_define_method(self,s$tl,function(self,_cmd,mask){
return self.$i_s(i$dd,mask);
});
rb_define_method(self,s$tk,function(self,_cmd){
return rb_ivar_get(self, i$dd);
});
rb_define_method(self,s$ub,function(self,_cmd,font){
return self.$i_s(i$dh,font);
});
rb_define_method(self,s$uc,function(self,_cmd){
return rb_ivar_get(self, i$dh);
});
self.$def(s$ud,function(self,_cmd,font_name,size){
});
rb_define_method(self,s$pr,function(self,_cmd,sender){
});
rb_define_method(self,s$on,function(self,_cmd,obj){
if(RTEST(ORTEST(NOTTEST(obj),ORTEST(rb_funcall(obj,s$ab,0),rb_funcall(obj,s$ab,_$gl))))){
obj = _$gl;
}
else{
obj = _$gm;
}
return rb_supcall(arguments.callee, self,_cmd,[obj]);
});
self.$def(s$ue,function(self,_cmd,images,frame,control_view){
});
self.$def(s$uf,function(self,_cmd,title,frame,control_view){
});
self.$def(s$ug,function(self,_cmd,frame,control_view){
});
self.$def(s$uh,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$e,"<div class='left'></div>");
rb_funcall(ctx,s$e,"<div class='middle'></div>");
rb_funcall(ctx,s$e,"<div class='right'></div>");
rb_funcall(ctx,s$e,"<div class='title'></div>");
rb_funcall(ctx,s$e,"<div class='image'></div>");
rb_funcall(ctx,'first_time=',false);
}
var class_name_array = [rb_funcall(self, s$kc),rb_funcall(self, s$kd)];
if(!RTEST(rb_funcall(self, s$ob))){
rb_funcall(class_name_array,s$e,_$fj);
}
if(RTEST(rb_funcall(self, s$qn))){
rb_funcall(class_name_array,s$e,_$hl);
if(RTEST(ANDTEST(rb_funcall(self, s$qt),rb_funcall(rb_ivar_get(self, i$cy),s$ab,_$gp)))){
rb_funcall(class_name_array,s$e,_$hm);
}
else{
}
}
return rb_funcall(ctx,'class_name=',rb_funcall(class_name_array,s$ui,' '));
});
self.$def(s$ro,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(!RTEST(rb_funcall(rb_ivar_get(self, i$de),s$ab,_$gg))){
rb_funcall(self,s$uj,rb_ivar_get(self, i$bt),cell_frame,control_view);
}
if(RTEST(rb_ivar_get(self, i$at))){
if(RTEST(rb_funcall(self, s$te))){
rb_funcall(self,s$uk,rb_ivar_get(self, i$db),cell_frame,control_view);
}
else{
rb_funcall(self,s$uk,rb_ivar_get(self, i$at),cell_frame,control_view);
}
}
});
self.$def(s$uk,function(self,_cmd,image,frame,control_view){
var enabled = RTEST(rb_ivar_get(self, i$bp)) ? true : NOTTEST(rb_ivar_get(self, i$dc));
var gray_mask = rb_ivar_get(self, i$bw);
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
return rb_funcall(ctx,s$jv,'image',function(img){
return rb_funcall(image,s$jc,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_funcall(image,s$w),s$ac),rb_funcall(rb_funcall(image,s$w),s$ad)),enabled,gray_mask);
});
});
rb_define_method(self,s$rh,function(self,_cmd,the_rect){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(the_rect,s$y),rb_funcall(the_rect,s$z),rb_funcall(the_rect,s$ac),rb_funcall(the_rect,s$ad));
var image_size = RTEST(rb_ivar_get(self, i$at)) ? rb_funcall(rb_ivar_get(self, i$at),s$w) : rb_funcall(self.$klass.$c_g_full(c$q),s$ao,0,0);
if(RTEST(rb_ivar_get(self, i$bu))){
rb_funcall(result,'width=',rb_funcall(rb_funcall(result,s$ac),s$mf,4));
rb_funcall(result,'height=',rb_funcall(rb_funcall(result,s$ad),s$mf,4));
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,2));
rb_funcall(result,'y=',rb_funcall(rb_funcall(result,s$z),s$hy,2));
}
(function($v){
if(($e = rb_funcall(_$fs, '===', $v),$e!==nil && $e!==false)){
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,(rb_funcall(rb_funcall(image_size,s$ac),s$hy,3))));
return rb_funcall(result,'width=',rb_funcall(rb_funcall(result,s$ac),s$mf,(rb_funcall(rb_funcall(image_size,s$ac),s$hy,3))));
}
else if(($e = rb_funcall(_$gh, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$gi, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$gj, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$gk, '===', $v),$e!==nil && $e!==false)){
}
})(rb_ivar_get(self, i$de));
return result;
});
self.$def(s$uj,function(self,_cmd,title,frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
return rb_funcall(ctx,s$jv,_$dx,function(title_div){
rb_funcall(title_div,'inner_html=',title);
return rb_funcall(title_div,'frame=',rb_funcall(self,s$rh,frame));
});
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
self.$i_s(i$by,control_view);
if(RTEST(rb_funcall(self, s$th))){
return ;
}
rb_funcall(self,s$uh,cell_frame,control_view);
return rb_funcall(self,s$ro,cell_frame,control_view);
});
rb_define_method(self,s$dc,function(self,_cmd,the_event){
});
rb_define_method(self,s$dd,function(self,_cmd,the_event){
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$ul,function(self,_cmd){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bt),s$tq,self.$c_g_full(c$ab)))){
return rb_ivar_get(self, i$bt);
}
var attributes = VN.$h();
if(RTEST(rb_ivar_get(self, i$ch))){
rb_funcall(attributes,'[]=',_$ci,rb_ivar_get(self, i$ch));
}
rb_funcall(attributes,'[]=',_$hn,(RTEST(rb_ivar_get(self, i$bp)) ? rb_funcall(self.$klass.$c_g_full(c$ac),s$um) : rb_funcall(self.$klass.$c_g_full(c$ac),s$un)));
var paragraph_style = rb_funcall(self.$klass.$c_g_full(c$ad),s$uo);
rb_funcall(paragraph_style,'line_break_mode=',rb_ivar_get(self, i$cr));
rb_funcall(paragraph_style,'alignment=',rb_ivar_get(self, i$cf));
rb_funcall(attributes,'[]=',_$ho,paragraph_style);
return rb_funcall(self.$klass.$c_g_full(c$ab),s$ao,rb_ivar_get(self, i$bt),attributes);
});
rb_define_method(self,s$up,function(self,_cmd,obj){
return self.$i_s(i$bt,obj);
});
rb_define_method(self,s$uq,function(self,_cmd){
return rb_ivar_get(self, i$di);
});
rb_define_method(self,s$ur,function(self,_cmd,obj){
return self.$i_s(i$di,obj);
});
rb_define_method(self,s$us,function(self,_cmd,bezel_style){
return self.$i_s(i$dj,bezel_style);
});
rb_define_method(self,s$ut,function(self,_cmd){
return rb_ivar_get(self, i$dj);
});
rb_define_method(self,s$uu,function(self,_cmd,a_sound){
return rb_ivar_get(self, i$dk);
});
rb_define_method(self,s$uv,function(self,_cmd){
return rb_ivar_get(self, i$dk);
});
})(RClass.define_under(self,'ButtonCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
return rb_funcall(self,'type=',_$hc);
});
})(RClass.define_under(self,'CheckBox',self.$c_g_full(c$ae)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$af);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-slider';
});
rb_define_method(self,s$uw,function(self,_cmd){
return rb_ivar_get(self, i$dl);
});
rb_define_method(self,s$ux,function(self,_cmd,a_double){
return self.$i_s(i$dl,a_double);
});
rb_define_method(self,s$uy,function(self,_cmd){
return rb_ivar_get(self, i$dm);
});
rb_define_method(self,s$uz,function(self,_cmd,a_double){
return self.$i_s(i$dm,a_double);
});
rb_define_method(self,s$va,function(self,_cmd,inc_value){
return self.$i_s(i$dn,inc_value);
});
rb_define_method(self,s$vb,function(self,_cmd){
return rb_ivar_get(self, i$dn);
});
rb_funcall(self,s$by,_$hp,_$hq,_$dx,_$hr,_$cq);
rb_define_method(self,s$vc,function(self,_cmd,color){
return self.$i_s(i$do,color);
});
rb_define_method(self,s$vd,function(self,_cmd,font){
return self.$i_s(i$dp,font);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$ve,function(self,_cmd,a_float){
return self.$i_s(i$dq,a_float);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$vf,function(self,_cmd){
return rb_ivar_get(self, i$dr);
});
rb_define_method(self,s$kb,function(self,_cmd,event){
return true;
});
rb_funcall(self,s$by,_$hs,_$ht);
rb_define_method(self,s$vg,function(self,_cmd,count){
return self.$i_s(i$ds,count);
});
rb_define_method(self,s$vh,function(self,_cmd,pos){
return self.$i_s(i$dt,pos);
});
rb_define_method(self,s$vi,function(self,_cmd,flag){
return self.$i_s(i$du,flag);
});
rb_define_method(self,s$vj,function(self,_cmd){
return rb_ivar_get(self, i$du);
});
rb_define_method(self,s$vk,function(self,_cmd,index){
});
rb_define_method(self,s$vl,function(self,_cmd,index){
});
rb_define_method(self,s$vm,function(self,_cmd,point){
});
rb_define_method(self,s$vn,function(self,_cmd,value){
});
})(RClass.define_under(self,'Slider',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$pz,function(self,_cmd){
return true;
});
rb_define_method(self,s$l,function(self,_cmd){
self.$i_s(i$dl,0);
self.$i_s(i$dm,100);
self.$i_s(i$ck,0);
return rb_supcall(arguments.callee, self,_cmd,[]);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-slider';
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
self.$i_s(i$dv,cell_frame);
self.$i_s(i$by,control_view);
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$e,"<div class='track-left'></div>");
rb_funcall(ctx,s$e,"<div class='track-middle'></div>");
rb_funcall(ctx,s$e,"<div class='track-right'></div>");
rb_funcall(ctx,s$e,"<div class='knob'></div>");
rb_funcall(ctx,'first_time=',false);
}
rb_funcall(ctx,'class_name=',rb_funcall(self, s$kc));
return rb_funcall(ctx,s$jv,_$hu,function(knob){
var knob_position = rb_funcall(self,s$vo,rb_ivar_get(self, i$ck));
return rb_funcall(knob,s$o,VN.$h(_$fs,[(knob_position),"px"].join('')));
});
});
rb_define_method(self,s$uw,function(self,_cmd){
return rb_ivar_get(self, i$dl);
});
rb_define_method(self,s$ux,function(self,_cmd,a_double){
return self.$i_s(i$dl,a_double);
});
rb_define_method(self,s$uy,function(self,_cmd){
return rb_ivar_get(self, i$dm);
});
rb_define_method(self,s$uz,function(self,_cmd,a_double){
return self.$i_s(i$dm,a_double);
});
rb_define_method(self,s$va,function(self,_cmd,inc_value){
return self.$i_s(i$dn,inc_value);
});
rb_define_method(self,s$vb,function(self,_cmd){
return rb_ivar_get(self, i$dn);
});
rb_define_method(self,s$vf,function(self,_cmd){
return false;
});
rb_define_method(self,s$vc,function(self,_cmd,color){
return self.$i_s(i$do,color);
});
rb_define_method(self,s$vd,function(self,_cmd,font){
return self.$i_s(i$dp,font);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$ve,function(self,_cmd,a_float){
return self.$i_s(i$dq,a_float);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$vg,function(self,_cmd,count){
return self.$i_s(i$ds,count);
});
rb_define_method(self,s$vh,function(self,_cmd,pos){
return self.$i_s(i$dt,pos);
});
rb_define_method(self,s$vi,function(self,_cmd,flag){
return self.$i_s(i$du,flag);
});
rb_define_method(self,s$vj,function(self,_cmd){
return rb_ivar_get(self, i$du);
});
rb_define_method(self,s$vk,function(self,_cmd,index){
});
rb_define_method(self,s$vl,function(self,_cmd,index){
});
rb_define_method(self,s$vm,function(self,_cmd,point){
});
rb_define_method(self,s$vn,function(self,_cmd,value){
});
rb_define_method(self,s$vo,function(self,_cmd,a_value){
var x = rb_funcall((rb_funcall(rb_funcall(rb_ivar_get(self, i$dv),s$ac),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$ag))))),s$vp,(rb_funcall((rb_funcall(rb_ivar_get(self, i$ck),s$vq,(rb_funcall(rb_ivar_get(self, i$dm),s$mf,rb_ivar_get(self, i$dl))))),s$hy,rb_ivar_get(self, i$dl))));
return x;
});
rb_define_method(self,s$vr,function(self,_cmd,a_point){
var value = rb_funcall((rb_funcall(rb_funcall(a_point,s$y),s$mf,(rb_funcall(rb_funcall(rb_ivar_get(self, i$dv),s$y),s$hy,self.$klass.$c_g_full(c$ag))))),s$vq,(rb_funcall(rb_funcall(rb_ivar_get(self, i$dv),s$ac),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$ag))))));
value = rb_funcall(value,s$vp,(rb_funcall((rb_funcall(rb_ivar_get(self, i$dm),s$mf,rb_ivar_get(self, i$dl))),s$hy,rb_ivar_get(self, i$dl))));
return rb_funcall(self.$klass.$c_g_full(c$ah),s$vs,rb_funcall(self.$klass.$c_g_full(c$ah),s$vt,value,rb_ivar_get(self, i$dl)),rb_ivar_get(self, i$dm));
});
self.$def(s$rx,function(self,_cmd,start_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,s$vr,start_point));
rb_funcall(self,s$rr,true,rb_ivar_get(self, i$dv),control_view);
return true;
});
self.$def(s$ry,function(self,_cmd,last_point,current_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,s$vr,current_point));
rb_funcall(self,s$nj,rb_ivar_get(self, i$dv),control_view);
return true;
});
self.$def(s$rz,function(self,_cmd,last_point,stop_point,control_view,flag){
return rb_funcall(self,s$rr,false,rb_ivar_get(self, i$dv),control_view);
});
})(RClass.define_under(self,'SliderCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));

(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(_$hv, 0, _$hw, 1));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$bq,true);
return self.$i_s(i$br,true);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$ai);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-text-field';
});
rb_define_method(self,s$vu,function(self,_cmd){
rb_funcall(self,s$ak,'resign first responder....');
return true;
});
rb_define_method(self,s$vv,function(self,_cmd){
rb_funcall(self,s$ak,'becoming first responder!!');
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$dv),'allows_propagation=',true);
return true;
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
return rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$dv),'allows_propagation=',true);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vx,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$vy,function(self,_cmd,color){
return self.$i_s(i$dx,color);
});
rb_define_method(self,s$vz,function(self,_cmd){
return rb_ivar_get(self, i$dx);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_ivar_get(self, i$bu);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return self.$i_s(i$bu,flag);
});
rb_define_method(self,s$qp,function(self,_cmd){
return rb_ivar_get(self, i$bv);
});
rb_define_method(self,s$qq,function(self,_cmd,flag){
return self.$i_s(i$bv,flag);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return self.$i_s(i$bq,flag);
});
rb_define_method(self,s$ql,function(self,_cmd){
return rb_ivar_get(self, i$br);
});
rb_define_method(self,s$qm,function(self,_cmd,flag){
return self.$i_s(i$br,flag);
});
rb_define_method(self,s$wa,function(self,_cmd,sender){
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$ei,function(self,_cmd,an_obj){
return self.$i_s(i$t,an_obj);
});
rb_define_method(self,s$wb,function(self,_cmd,text_object){
return true;
});
rb_define_method(self,s$wc,function(self,_cmd,text_object){
return true;
});
rb_define_method(self,s$wd,function(self,_cmd,notification){
});
rb_define_method(self,s$we,function(self,_cmd,notification){
});
rb_define_method(self,s$wf,function(self,_cmd,notification){
});
rb_define_method(self,s$us,function(self,_cmd,stlye){
return self.$i_s(i$dj,rb_funcall(self, s$wg));
});
rb_define_method(self,s$ut,function(self,_cmd){
return rb_ivar_get(self, i$dj);
});
})(RClass.define_under(self,'TextField',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$qa,function(self,_cmd,str){
rb_supcall(arguments.callee, self,_cmd,[str]);
self.$i_s(i$bq,true);
self.$i_s(i$br,true);
self.$i_s(i$bv,true);
self.$i_s(i$dy,_$hx);
self.$i_s(i$ck,'');
return self;
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-text-field';
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$e,"<div class='left'></div>");
rb_funcall(ctx,s$e,"<div class='middle'></div>");
rb_funcall(ctx,s$e,"<div class='right'></div>");
if(RTEST(rb_funcall(control_view,s$tq,self.$klass.$c_g_full(c$aj)))){
rb_funcall(ctx,s$e,"<input class='input'></input>");
}
else{
rb_funcall(ctx,s$e,"<div class='input'></input>");
}
rb_funcall(ctx,'first_time=',false);
}
rb_funcall(ctx,'class_name=',rb_funcall([rb_funcall(self, s$kc),rb_funcall(self, s$kd)],s$ui,' '));
if(RTEST(rb_funcall(control_view,s$tq,self.$klass.$c_g_full(c$aj)))){
}
else{
rb_funcall(ctx,s$jv,_$hx,function(input){
return rb_funcall(input,'inner_text=',rb_ivar_get(self, i$ck));
});
}
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vx,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$vy,function(self,_cmd,color){
return self.$i_s(i$dx,color);
});
rb_define_method(self,s$vz,function(self,_cmd){
return rb_ivar_get(self, i$dx);
});
rb_define_method(self,s$rn,function(self,_cmd,text_obj){
return text_obj;
});
rb_define_method(self,s$us,function(self,_cmd,style){
return self.$i_s(i$dj,style);
});
rb_define_method(self,s$ut,function(self,_cmd){
return rb_ivar_get(self, i$dj);
});
rb_define_method(self,s$wh,function(self,_cmd,string){
return self.$i_s(i$dz,string);
});
rb_define_method(self,s$wi,function(self,_cmd){
return rb_ivar_get(self, i$dz);
});
rb_define_method(self,s$wj,function(self,_cmd,str){
return rb_ivar_get(self, i$ea);
});
rb_define_method(self,s$wk,function(self,_cmd){
return rb_ivar_get(self, i$ea);
});
})(RClass.define_under(self,'TextFieldCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$def_s(s$wl,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
self.$def_s(s$wm,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$eb,rb_funcall(self.$klass.$c_g_full(c$ak),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,100,100)));
self.$i_s(i$ec,_$gn);
return rb_funcall(self,s$kt,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-scroll-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
return rb_funcall(context,s$o,VN.$h(_$hy,'rgb(190, 190, 190)'));
});
rb_define_method(self,s$wn,function(self,_cmd){
});
rb_define_method(self,s$wo,function(self,_cmd){
});
rb_define_method(self,s$wp,function(self,_cmd,a_view){
rb_funcall(rb_ivar_get(self, i$eb),'document_view=',a_view);
return rb_funcall(self,s$wq,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$wr,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$eb),s$wr);
});
rb_define_method(self,s$ws,function(self,_cmd,content_view){
rb_funcall(rb_ivar_get(self, i$eb),s$ku);
self.$i_s(i$eb,content_view);
rb_funcall(self,s$kt,rb_ivar_get(self, i$eb));
return rb_funcall(self, s$wt);
});
rb_define_method(self,s$wu,function(self,_cmd){
return rb_ivar_get(self, i$eb);
});
rb_define_method(self,s$wv,function(self,_cmd,an_obj){
return self.$i_s(i$ed,an_obj);
});
rb_define_method(self,s$ww,function(self,_cmd){
return rb_ivar_get(self, i$ed);
});
rb_define_method(self,s$wx,function(self,_cmd,a_type){
return self.$i_s(i$ec,a_type);
});
rb_define_method(self,s$wy,function(self,_cmd){
return rb_ivar_get(self, i$ec);
});
rb_define_method(self,s$iy,function(self,_cmd,a_color){
return self.$i_s(i$aw,a_color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$wz,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$xa,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self, i$ee))){
self.$i_s(i$ee,true);
if(!RTEST(rb_ivar_get(self, i$ef))){
self.$i_s(i$ef,rb_funcall(self.$klass.$c_g_full(c$al),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,150,40,40,15)));
rb_funcall(rb_ivar_get(self, i$ef),'target=',self);
rb_funcall(rb_ivar_get(self, i$ef),'action=',_$hz);
}
rb_funcall(self,s$kt,rb_ivar_get(self, i$ef));
}
}
else{
if(RTEST(rb_ivar_get(self, i$ee))){
self.$i_s(i$ee,false);
rb_funcall(rb_ivar_get(self, i$ef),s$ku);
}
}
return rb_funcall(self, s$wt);
});
rb_define_method(self,s$xb,function(self,_cmd){
return rb_ivar_get(self, i$ee);
});
rb_define_method(self,s$xc,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self, i$eg))){
self.$i_s(i$eg,true);
if(!RTEST(rb_ivar_get(self, i$eh))){
self.$i_s(i$eh,rb_funcall(self.$klass.$c_g_full(c$al),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,150,20,40,15)));
rb_funcall(rb_ivar_get(self, i$eh),'target=',self);
rb_funcall(rb_ivar_get(self, i$eh),'action=',_$ia);
}
rb_funcall(self,s$kt,rb_ivar_get(self, i$eh));
}
}
else{
if(RTEST(rb_ivar_get(self, i$eg))){
self.$i_s(i$eg,false);
rb_funcall(rb_ivar_get(self, i$eh),s$ku);
}
}
return rb_funcall(self, s$wt);
});
rb_define_method(self,s$xd,function(self,_cmd){
return rb_ivar_get(self, i$eg);
});
rb_define_method(self,s$xe,function(self,_cmd,a_scroller){
return self.$i_s(i$ef,a_scroller);
});
rb_define_method(self,s$xf,function(self,_cmd){
return rb_ivar_get(self, i$ef);
});
rb_define_method(self,s$xg,function(self,_cmd,a_scroller){
return self.$i_s(i$eh,a_scroller);
});
rb_define_method(self,s$xh,function(self,_cmd){
return rb_ivar_get(self, i$eh);
});
rb_define_method(self,s$xi,function(self,_cmd){
return rb_ivar_get(self, i$ei);
});
rb_define_method(self,s$xj,function(self,_cmd,flag){
return self.$i_s(i$ei,flag);
});
rb_define_method(self,s$xk,function(self,_cmd,value){
return self.$i_s(i$ej,value);
});
rb_define_method(self,s$xl,function(self,_cmd){
return rb_ivar_get(self, i$ej);
});
rb_define_method(self,s$xm,function(self,_cmd,value){
return self.$i_s(i$ek,value);
});
rb_define_method(self,s$xn,function(self,_cmd){
return rb_ivar_get(self, i$ek);
});
rb_define_method(self,s$xo,function(self,_cmd,value){
return self.$i_s(i$el,value);
});
rb_define_method(self,s$xp,function(self,_cmd){
return rb_ivar_get(self, i$el);
});
rb_define_method(self,s$xq,function(self,_cmd,value){
return self.$i_s(i$em,value);
});
rb_define_method(self,s$xr,function(self,_cmd){
return rb_ivar_get(self, i$em);
});
rb_define_method(self,s$xs,function(self,_cmd,value){
return self.$i_s(i$en,value);
});
rb_define_method(self,s$xt,function(self,_cmd){
return rb_ivar_get(self, i$en);
});
rb_define_method(self,s$xu,function(self,_cmd,value){
return self.$i_s(i$eo,value);
});
rb_define_method(self,s$xv,function(self,_cmd){
return rb_ivar_get(self, i$eo);
});
rb_define_method(self,s$xw,function(self,_cmd,flag){
return self.$i_s(i$ep,flag);
});
rb_define_method(self,s$xx,function(self,_cmd){
return rb_ivar_get(self, i$ep);
});
rb_define_method(self,s$wt,function(self,_cmd){
var header_frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
var header_view = nil;
if(RTEST(rb_funcall(rb_funcall(self, s$wr),s$au,_$ib))){
header_view = rb_funcall(rb_funcall(self, s$wr),s$xy);
header_frame = rb_funcall(header_view,s$lz);
}
var bounds = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,1,1,rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ac),s$mf,2),rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ad),s$mf,2));
if(RTEST(rb_ivar_get(self, i$ee))){
var frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall((rb_funcall(rb_funcall(bounds,s$y),s$hy,rb_funcall(bounds,s$ac))),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
rb_funcall(frame,'y=',rb_funcall(bounds,s$z));
rb_funcall(frame,'width=',rb_funcall(self.$klass.$c_g_full(c$al),s$xz));
rb_funcall(frame,'height=',rb_funcall(bounds,s$ad));
if(RTEST(rb_ivar_get(self, i$eg))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,s$z),s$hy,rb_funcall(header_frame,s$ad)));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(header_frame,s$ad)));
}
rb_funcall(rb_ivar_get(self, i$ef),'frame=',frame);
}
if(RTEST(rb_ivar_get(self, i$eg))){
frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'y=',rb_funcall((rb_funcall(rb_funcall(bounds,s$z),s$hy,rb_funcall(bounds,s$ad))),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
rb_funcall(frame,'x=',rb_funcall(bounds,s$y));
rb_funcall(frame,'width=',rb_funcall(bounds,s$ac));
rb_funcall(frame,'height=',rb_funcall(self.$klass.$c_g_full(c$al),s$xz));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$ac),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
rb_funcall(rb_ivar_get(self, i$eh),'frame=',frame);
}
if(RTEST(rb_ivar_get(self, i$eb))){
frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,s$y));
rb_funcall(frame,'y=',rb_funcall(bounds,s$z));
rb_funcall(frame,'width=',rb_funcall(bounds,s$ac));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$ac),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
rb_funcall(frame,'height=',rb_funcall(bounds,s$ad));
if(RTEST(rb_ivar_get(self, i$eg))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,s$z),s$hy,rb_funcall(header_frame,s$ad)));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(header_frame,s$ad)));
}
rb_funcall(rb_ivar_get(self, i$eb),'frame=',frame);
}
if(RTEST(header_view)){
if(!RTEST(rb_ivar_get(self, i$eq))){
self.$i_s(i$eq,rb_funcall(self.$klass.$c_g_full(c$ak),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,100,100)));
rb_funcall(self,s$e,rb_ivar_get(self, i$eq));
rb_funcall(rb_ivar_get(self, i$eq),s$e,header_view);
rb_funcall(header_view,'needs_display=',true);
}
frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,s$y));
rb_funcall(frame,'y=',rb_funcall(bounds,s$z));
rb_funcall(frame,'width=',rb_funcall(bounds,s$ac));
rb_funcall(frame,'height=',rb_funcall(header_frame,s$ad));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$ac),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
rb_funcall(rb_ivar_get(self, i$eq),'frame=',frame);
}
return rb_funcall(self,s$wq,rb_funcall(self, s$wu));
});
rb_define_method(self,s$wq,function(self,_cmd,clip_view){
if(RTEST(rb_funcall(self, s$wr))){
var document_rect = rb_funcall(rb_funcall(self, s$wr),s$ln);
var content_rect = rb_funcall(clip_view,s$lz);
var height_delta = rb_funcall(rb_funcall(document_rect,s$ad),s$mf,rb_funcall(content_rect,s$ad));
var width_delta = rb_funcall(rb_funcall(document_rect,s$ac),s$mf,rb_funcall(content_rect,s$ac));
rb_funcall(rb_ivar_get(self, i$ef),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,s$z),s$mf,rb_funcall(document_rect,s$z))),s$vq,height_delta));
rb_funcall(rb_ivar_get(self, i$ef),'knob_proportion=',rb_funcall(rb_funcall(content_rect,s$ad),s$vq,rb_funcall(document_rect,s$ad)));
rb_funcall(rb_ivar_get(self, i$eh),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,s$y),s$mf,rb_funcall(document_rect,s$y))),s$vq,width_delta));
rb_funcall(rb_ivar_get(self, i$eh),'knob_proportion=',rb_funcall(rb_funcall(content_rect,s$ac),s$vq,rb_funcall(document_rect,s$ac)));
}
});
rb_define_method(self,s$cz,function(self,_cmd,the_event){
});
rb_define_method(self,s$ya,function(self,_cmd,sender){
var value = rb_funcall(rb_funcall(rb_ivar_get(self, i$ef),s$oz),s$vp,(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$ad),s$mf,rb_funcall(rb_funcall(rb_ivar_get(self, i$eb),s$ln),s$ad))));
return rb_funcall(rb_ivar_get(self, i$eb),s$yb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall((0),s$mf,rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$y)),value));
});
rb_define_method(self,s$yc,function(self,_cmd,sender){
var value = rb_funcall(rb_funcall(rb_ivar_get(self, i$eh),s$oz),s$vp,(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$ac),s$mf,rb_funcall(rb_funcall(rb_ivar_get(self, i$eb),s$ln),s$ac))));
return rb_funcall(rb_ivar_get(self, i$eb),s$yb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,value,rb_funcall((0),s$mf,rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$z))));
});
})(RClass.define_under(self,'ScrollView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$c_s('SCROLLER_PARTS',VN.$h(_$gn, 0, _$ic, 1, _$id, 2, _$ie, 3, _$if, 4, _$hu, 5, _$ig, 6));
self.$c_s('SCROLLER_ARROWS',VN.$h(_$ih, 0, _$ii, 1));
self.$c_s('SCROLL_ARROW_POSITIONS',VN.$h(_$gn, 1, _$ij, 2, _$ik, 3));
self.$c_s('USABLE_SCROLLER_PARTS',VN.$h(_$gn, 0, _$il, 1, _$im, 2));
self.$def_s(s$xz,function(self,_cmd){
return 17;
});
self.$def_s(s$yd,function(self,_cmd,control_size){
return 17;
});
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$ck,0.0);
return self.$i_s(i$er,1);
});
rb_define_method(self,s$kc,function(self,_cmd){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$ac),s$hx,rb_funcall(rb_ivar_get(self, i$bb),s$ad))) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$e,"<div class='dec-line'></div>");
rb_funcall(context,s$e,"<div class='inc-line'></div>");
rb_funcall(context,s$e,"<div class='knob'><div class='start'</div><div class='middle'></div><div class='end'></div></div>");
rb_funcall(context,'first_time=',false);
}
rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
return rb_funcall(context,s$jv,_$hu,function(knob){
return rb_funcall(knob,'frame=',rb_funcall(self,s$ye,_$hu));
});
});
rb_define_method(self,s$yf,function(self,_cmd){
});
self.$c_s('DECREMENT_LINE_SIZE',22);
rb_define_method(self,s$ye,function(self,_cmd,part){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
var increment_line = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
var decrement_line = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
var knob = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
var knob_slot = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
if(RTEST(rb_funcall(self, s$vf))){
rb_funcall(decrement_line,'height=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'height=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ad),s$mf,self.$klass.$c_g_full(c$am)));
rb_funcall(knob_slot,'height=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ad),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$am)))));
rb_funcall(knob_slot,'y=',self.$klass.$c_g_full(c$am));
rb_funcall(knob,'height=',rb_funcall(rb_funcall(knob_slot,s$ad),s$vp,rb_ivar_get(self, i$er)));
rb_funcall(knob,'y=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,s$ad),s$mf,rb_funcall(knob,s$ad))),s$vp,rb_ivar_get(self, i$ck))),s$hy,rb_funcall(knob_slot,s$z)));
}
else{
rb_funcall(decrement_line,'width=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'width=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ac),s$mf,self.$klass.$c_g_full(c$am)));
rb_funcall(knob_slot,'width=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ac),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$am)))));
rb_funcall(knob_slot,'x=',self.$klass.$c_g_full(c$am));
rb_funcall(knob,'width=',rb_funcall(rb_funcall(knob_slot,s$ac),s$vp,rb_ivar_get(self, i$er)));
rb_funcall(knob,'x=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,s$ac),s$mf,rb_funcall(knob,s$ac))),s$vp,rb_ivar_get(self, i$ck))),s$hy,rb_funcall(knob_slot,s$y)));
}
return (function($v){
if(($e = rb_funcall(_$gn, '===', $v),$e!==nil && $e!==false)){
return result;
}
else if(($e = rb_funcall(_$ic, '===', $v),$e!==nil && $e!==false)){
if(RTEST(rb_funcall(self, s$vf))){
}
else{
}
}
else if(($e = rb_funcall(_$id, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$ie, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$if, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$hu, '===', $v),$e!==nil && $e!==false)){
return knob;
}
else if(($e = rb_funcall(_$ig, '===', $v),$e!==nil && $e!==false)){
return knob_slot;
}
})(part);
});
rb_define_method(self,s$yg,function(self,_cmd){
});
rb_define_method(self,s$yh,function(self,_cmd){
});
rb_define_method(self,s$yi,function(self,_cmd,position){
return self.$i_s(i$es,position);
});
rb_define_method(self,s$yj,function(self,_cmd){
return rb_ivar_get(self, i$es);
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
return self.$i_s(i$cl,control_tint);
});
rb_define_method(self,s$od,function(self,_cmd){
return rb_ivar_get(self, i$cl);
});
rb_define_method(self,s$of,function(self,_cmd,control_size){
return self.$i_s(i$cm,control_size);
});
rb_define_method(self,s$og,function(self,_cmd){
return rb_ivar_get(self, i$cm);
});
self.$def(s$yk,function(self,_cmd,which_arrow,flag){
});
rb_define_method(self,s$yl,function(self,_cmd){
});
self.$def(s$ym,function(self,_cmd,slot_rect,flag){
});
rb_define_method(self,s$yn,function(self,_cmd,flag){
});
rb_define_method(self,s$yo,function(self,_cmd,the_point){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
if(!RTEST(rb_funcall(self, s$ob))){
return ;
}
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
return rb_funcall(self,s$yp,the_event);
});
rb_define_method(self,s$yp,function(self,_cmd,the_event){
var original_value = rb_ivar_get(self, i$ck);
var mouse_down_point = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
var slot_rect = rb_funcall(self,s$ye,_$ig);
var knob_rect = rb_funcall(self,s$ye,_$hu);
var size = RTEST(rb_funcall(self, s$vf)) ? rb_funcall(rb_funcall(slot_rect,s$ad),s$mf,rb_funcall(knob_rect,s$ad)) : rb_funcall(rb_funcall(slot_rect,s$ac),s$mf,rb_funcall(knob_rect,s$ac));
return rb_funcall(self.$klass.$c_g_full(c$m),s$du,[_$ak,_$ab],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$ab,_$ak))){
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
}
else{
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
var delta = RTEST(rb_funcall(self, s$vf)) ? rb_funcall(rb_funcall(location,s$z),s$mf,rb_funcall(mouse_down_point,s$z)) : rb_funcall(rb_funcall(location,s$y),s$mf,rb_funcall(mouse_down_point,s$y));
rb_funcall(self,'float_value=',rb_funcall(self.$klass.$c_g_full(c$ah),s$vs,rb_funcall(self.$klass.$c_g_full(c$ah),s$vt,0,rb_funcall(original_value,s$hy,(rb_funcall(delta,s$vq,size)))),1));
rb_funcall(self,'needs_display=',true);
rb_funcall(self,s$ph,rb_ivar_get(self, i$ca),rb_ivar_get(self, i$bz));
}
});
});
rb_define_method(self,s$yq,function(self,_cmd,the_event){
});
rb_define_method(self,s$yr,function(self,_cmd){
});
rb_define_method(self,s$ys,function(self,_cmd){
return rb_ivar_get(self, i$er);
});
rb_define_method(self,s$yt,function(self,_cmd,proportion){
self.$i_s(i$er,proportion);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$ou,function(self,_cmd,a_float){
return self.$i_s(i$ck,a_float);
});
rb_define_method(self,s$oz,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$pb,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$ov,function(self,_cmd,a_double){
return self.$i_s(i$ck,a_double);
});
rb_define_method(self,s$ns,function(self,_cmd,an_action){
return self.$i_s(i$ca,an_action);
});
rb_define_method(self,s$nq,function(self,_cmd,a_target){
return self.$i_s(i$bz,a_target);
});
rb_define_method(self,s$vf,function(self,_cmd){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$ac),s$hx,rb_funcall(rb_ivar_get(self, i$bb),s$ad))) ? true : false;
});
})(RClass.define_under(self,'Scroller',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
rb_define_method(self,s$jz,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return rb_funcall(rb_ivar_get(self, i$b),s$o,VN.$h(_$fz,'hidden'));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-clip-view';
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vx,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$wp,function(self,_cmd,a_view){
var default_center = rb_funcall(self.$klass.$c_g_full(c$n),s$cc);
if(RTEST(rb_ivar_get(self, i$et))){
rb_funcall(default_center,s$cl,self,self.$klass.$c_g_full(c$an),rb_ivar_get(self, i$et));
rb_funcall(default_center,s$cl,self,self.$klass.$c_g_full(c$ao),rb_ivar_get(self, i$et));
rb_funcall(rb_ivar_get(self, i$et),s$ku);
}
self.$i_s(i$et,a_view);
return rb_funcall(self,s$kt,a_view);
});
rb_define_method(self,s$wr,function(self,_cmd){
return rb_ivar_get(self, i$et);
});
rb_define_method(self,s$yu,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
});
rb_define_method(self,s$wv,function(self,_cmd,an_obj){
return self.$i_s(i$ed,an_obj);
});
rb_define_method(self,s$ww,function(self,_cmd){
return rb_ivar_get(self, i$ed);
});
rb_define_method(self,s$wn,function(self,_cmd){
return rb_funcall(self,s$mk,rb_ivar_get(self, i$bc),rb_ivar_get(self, i$et));
});
rb_define_method(self,s$yv,function(self,_cmd,notification){
});
rb_define_method(self,s$yw,function(self,_cmd,notification){
});
rb_define_method(self,s$yx,function(self,_cmd,flag){
return self.$i_s(i$eu,flag);
});
rb_define_method(self,s$yy,function(self,_cmd){
return rb_ivar_get(self, i$eu);
});
rb_define_method(self,s$yz,function(self,_cmd,the_event){
return false;
});
rb_define_method(self,s$za,function(self,_cmd,new_origin){
return new_origin;
});
rb_define_method(self,s$yb,function(self,_cmd,new_origin){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bd),s$nb),s$zb,0))){
rb_funcall(rb_funcall(rb_ivar_get(self, i$bd),s$h,0),'frame_origin=',rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall((0),s$mf,rb_funcall(new_origin,s$y)),rb_funcall((0),s$mf,rb_funcall(new_origin,s$z))));
}
});
rb_define_method(self,s$zc,function(self,_cmd,x,y){
return rb_funcall(self,s$yb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,x,y));
});
})(RClass.define_under(self,'ClipView',self.$c_g_full(c$x)));
(function(self) {
rb_define_method(self,s$wq,function(self,_cmd,a_clip_view){
});
self.$def(s$zd,function(self,_cmd,a_clip_view,a_point){
});
})(RClass.define_under(self,'View',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
})(RClass.define_under(self,'TableCornerView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$ev,17.0);
self.$i_s(i$ew,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,3.0,2.0));
self.$i_s(i$ex,rb_funcall((1),s$ze));
self.$i_s(i$ey,[]);
self.$i_s(i$ez,[]);
self.$i_s(i$fa,[]);
self.$i_s(i$fb,rb_funcall(self.$klass.$c_g_full(c$ap),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),17)));
rb_funcall(rb_ivar_get(self, i$fb),'table_view=',self);
return self.$i_s(i$fc,rb_funcall(self.$klass.$c_g_full(c$aq),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(self.$klass.$c_g_full(c$al),s$xz),rb_funcall(self.$klass.$c_g_full(c$al),s$xz))));
});
rb_define_method(self,s$zf,function(self,_cmd,a_source){
return self.$i_s(i$fd,a_source);
});
rb_define_method(self,s$zg,function(self,_cmd){
return rb_ivar_get(self, i$fd);
});
rb_define_method(self,s$ei,function(self,_cmd,a_delegate){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$zh,function(self,_cmd,header_view){
return self.$i_s(i$fb,header_view);
});
rb_define_method(self,s$xy,function(self,_cmd){
return rb_ivar_get(self, i$fb);
});
rb_define_method(self,s$zi,function(self,_cmd,corner_view){
return self.$i_s(i$fc,corner_view);
});
rb_define_method(self,s$zj,function(self,_cmd){
return rb_ivar_get(self, i$fc);
});
rb_define_method(self,s$zk,function(self,_cmd,flag){
return self.$i_s(i$fe,flag);
});
rb_define_method(self,s$zl,function(self,_cmd){
return rb_ivar_get(self, i$fe);
});
rb_define_method(self,s$zm,function(self,_cmd,flag){
return self.$i_s(i$ff,flag);
});
rb_define_method(self,s$zn,function(self,_cmd){
return rb_ivar_get(self, i$ff);
});
rb_define_method(self,s$zo,function(self,_cmd,style){
return self.$i_s(i$fg,style);
});
rb_define_method(self,s$zp,function(self,_cmd){
return rb_ivar_get(self, i$fg);
});
rb_define_method(self,s$zq,function(self,_cmd,grid_type){
return self.$i_s(i$fh,grid_type);
});
rb_define_method(self,s$zr,function(self,_cmd){
return rb_ivar_get(self, i$fh);
});
rb_define_method(self,s$zs,function(self,_cmd,size){
return self.$i_s(i$ew,size);
});
rb_define_method(self,s$zt,function(self,_cmd){
return rb_ivar_get(self, i$ew);
});
rb_define_method(self,s$zu,function(self,_cmd,flag){
return self.$i_s(i$fi,flag);
});
rb_define_method(self,s$zv,function(self,_cmd){
return rb_ivar_get(self, i$fi);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$zw,function(self,_cmd,color){
return self.$i_s(i$fj,color);
});
rb_define_method(self,s$zx,function(self,_cmd){
return rb_ivar_get(self, i$fj);
});
rb_define_method(self,s$zy,function(self,_cmd,height){
return self.$i_s(i$ev,height);
});
rb_define_method(self,s$zz,function(self,_cmd){
return rb_ivar_get(self, i$ev);
});
rb_define_method(self,s$aaa,function(self,_cmd,index_set){
});
rb_define_method(self,s$aab,function(self,_cmd){
return rb_ivar_get(self, i$ey);
});
rb_define_method(self,s$aac,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ey),s$nb);
});
rb_define_method(self,s$aad,function(self,_cmd){
if(RTEST(rb_funcall(rb_ivar_get(self, i$ex),s$hx,0))){
if(RTEST(rb_ivar_get(self, i$fd))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$fd),s$au,_$in))){
self.$i_s(i$ex,rb_funcall(rb_ivar_get(self, i$fd),s$aae,self));
}
else{
rb_funcall(self,s$ak,['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s(i$ex,0);
}
}
else{
self.$i_s(i$ex,0);
}
}
return rb_ivar_get(self, i$ex);
});
rb_define_method(self,s$aaf,function(self,_cmd,table_column){
rb_funcall(rb_ivar_get(self, i$ey),s$e,table_column);
rb_funcall(table_column,'table_view=',self);
return rb_funcall(self, s$aag);
});
rb_define_method(self,s$aah,function(self,_cmd,table_column){
});
self.$def(s$aai,function(self,_cmd,old_index,new_index){
});
rb_define_method(self,s$aaj,function(self,_cmd){
});
rb_define_method(self,s$aak,function(self,_cmd){
});
rb_define_method(self,s$wt,function(self,_cmd){
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$aal,function(self,_cmd){
});
rb_define_method(self,s$aam,function(self,_cmd,row){
});
rb_define_method(self,s$aan,function(self,_cmd,column){
});
rb_define_method(self,s$aag,function(self,_cmd){
rb_funcall(self, s$aao);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$aao,function(self,_cmd){
self.$i_s(i$ex,rb_funcall((1),s$ze));
var rows = rb_funcall(self,s$aad);
var size = rb_funcall(self.$klass.$c_g_full(c$q),s$ao,rb_funcall(rb_ivar_get(self, i$bb),s$ac),rb_funcall(rb_ivar_get(self, i$bb),s$ad));
if(RTEST(rb_funcall(rows,s$zb,0))){
rb_funcall(size,'width=',rb_funcall(rb_funcall(self,s$aap,0),s$ac));
}
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$nb),s$zb,0))){
rb_funcall(size,'height=',rb_funcall(rb_funcall(self,s$aaq,0),s$ad));
}
});
rb_define_method(self,s$my,function(self,_cmd,context){
rb_funcall(self,s$aar,context);
rb_funcall(self,s$aas,rb_ivar_get(self, i$bc),context);
return rb_funcall(rb_funcall(self, s$aad),s$aat,function(row){
return rb_funcall(context,s$jy,row,function(row_element){
return rb_funcall(self,s$aau,row,rb_ivar_get(self, i$bc),row_element);
});
});
});
rb_define_method(self,s$aar,function(self,_cmd,context){
var children = rb_funcall(context,s$jx);
var rows = rb_funcall(self, s$aad);
if(RTEST(rb_funcall(children,s$hx,rows))){
rb_funcall(children,s$aat,function(i){
var rect = rb_funcall(self,s$aap,i);
return rb_funcall(context,s$jy,i,function(elem){
return rb_funcall(elem,s$o,VN.$h(_$ef,[(rb_funcall(rect,s$ac)),"px"].join('')));
});
});
rb_funcall((rb_funcall(rows,s$mf,children)),s$aat,function(i){
var rect = rb_funcall(self,s$aap,rb_funcall(children,s$hy,i));
return rb_funcall(context,s$e,["<div style='top:",(rb_funcall(rect,s$z)),"px;left:",(rb_funcall(rect,s$y)),"px;width:",(rb_funcall(rect,s$ac)),"px;height:",(rb_funcall(rect,s$ad)),"px;'></div>"].join(''));
});
}
else if(RTEST(rb_funcall(rows,s$hx,children))){
}
else{
rb_funcall(children,s$aat,function(i){
var rect = rb_funcall(self,s$aap,i);
return rb_funcall(context,s$jy,i,function(elem){
return rb_funcall(elem,s$o,VN.$h(_$ef,[(rb_funcall(rect,s$ac)),"px"].join('')));
});
});
}
});
rb_define_method(self,s$aas,function(self,_cmd,clip_rect,context){
return rb_funcall(context,s$o,VN.$h(_$hy,'white'));
});
rb_define_method(self,s$aau,function(self,_cmd,row,clip_rect,context){
var color = rb_funcall((rb_funcall(row,s$vp,10)),s$hy,150);
var children = rb_funcall(context,s$jx);
var columns = rb_funcall(self, s$aac);
if(RTEST(rb_funcall(children,s$hx,columns))){
rb_funcall((rb_funcall(columns,s$mf,children)),s$aat,function(i){
return rb_funcall(context,s$e,"<div></div>");
});
}
else if(RTEST(rb_funcall(columns,s$hx,children))){
}
else{
}
if(RTEST(rb_funcall(row,s$aav))){
rb_funcall(context,s$o,VN.$h(_$hy,'rgb(234, 234, 234)'));
}
return rb_funcall(columns,s$aat,function(column){
var data_cell = rb_funcall(self,s$aaw,column,row);
var table_column = rb_funcall(rb_ivar_get(self, i$ey),s$h,column);
if(RTEST(ANDTEST(rb_ivar_get(self, i$t),rb_funcall(rb_ivar_get(self, i$t),s$au,'table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self, i$t),s$aax,self,data_cell,table_column,row);
}
var cell_frame = rb_funcall(self,s$aay,column,row);
return rb_funcall(context,s$jy,column,function(column_context){
if(RTEST(rb_funcall(column,s$hx,children))){
rb_funcall(column_context,'first_time=',false);
}
else{
rb_funcall(column_context,'first_time=',true);
}
rb_funcall(self.$klass.$c_g_full(c$r),'current_context=',column_context);
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(data_cell,s$nj,cell_frame,self);
});
});
});
self.$def(s$aaz,function(self,_cmd,row_indexes,column_indexes){
});
rb_define_method(self,s$aba,function(self,_cmd){
});
rb_define_method(self,s$abb,function(self,_cmd){
});
rb_define_method(self,s$abc,function(self,_cmd){
});
rb_define_method(self,s$abd,function(self,_cmd){
});
rb_define_method(self,s$abe,function(self,_cmd,selector){
return self.$i_s(i$fk,selector);
});
rb_define_method(self,s$abf,function(self,_cmd){
return rb_ivar_get(self, i$fk);
});
rb_define_method(self,s$abg,function(self,_cmd,array){
return self.$i_s(i$fl,array);
});
rb_define_method(self,s$abh,function(self,_cmd){
return rb_ivar_get(self, i$fl);
});
self.$def(s$abi,function(self,_cmd,an_image,table_column){
});
rb_define_method(self,s$abj,function(self,_cmd,table_column){
});
rb_define_method(self,s$abk,function(self,_cmd,table_column){
return self.$i_s(i$fm,table_column);
});
rb_define_method(self,s$abl,function(self,_cmd){
return rb_ivar_get(self, i$fm);
});
rb_define_method(self,s$abm,function(self,_cmd,flag){
return self.$i_s(i$fn,flag);
});
rb_define_method(self,s$abn,function(self,_cmd){
return rb_ivar_get(self, i$fn);
});
self.$def(s$abo,function(self,_cmd,row_indexes,mouse_down_point){
});
self.$def(s$abp,function(self,_cmd,drag_rows,table_columns,drag_event,drag_image_offset){
});
self.$def(s$abq,function(self,_cmd,mask,is_local){
});
self.$def(s$abr,function(self,_cmd,row,drop_operation){
});
rb_define_method(self,s$abs,function(self,_cmd,flag){
return self.$i_s(i$fo,flag);
});
rb_define_method(self,s$abt,function(self,_cmd){
return rb_ivar_get(self, i$fo);
});
rb_define_method(self,s$abu,function(self,_cmd,flag){
return self.$i_s(i$fp,flag);
});
rb_define_method(self,s$abv,function(self,_cmd){
return rb_ivar_get(self, i$fp);
});
rb_define_method(self,s$abw,function(self,_cmd,flag){
return self.$i_s(i$fq,flag);
});
rb_define_method(self,s$abx,function(self,_cmd){
return rb_ivar_get(self, i$fq);
});
rb_define_method(self,s$aby,function(self,_cmd,sender){
});
rb_define_method(self,s$abz,function(self,_cmd,sender){
});
self.$def(s$aca,function(self,_cmd,indexes,extend_flag){
});
self.$def(s$acb,function(self,_cmd,indexes,extend_flag){
});
rb_define_method(self,s$acc,function(self,_cmd){
return rb_ivar_get(self, i$fr);
});
rb_define_method(self,s$acd,function(self,_cmd){
return rb_ivar_get(self, i$fs);
});
rb_define_method(self,s$ace,function(self,_cmd,column){
});
rb_define_method(self,s$acf,function(self,_cmd,row){
});
rb_define_method(self,s$acg,function(self,_cmd){
});
rb_define_method(self,s$ach,function(self,_cmd){
});
rb_define_method(self,s$aci,function(self,_cmd,column){
});
rb_define_method(self,s$acj,function(self,_cmd,row){
});
rb_define_method(self,s$ack,function(self,_cmd){
});
rb_define_method(self,s$acl,function(self,_cmd){
});
rb_define_method(self,s$acm,function(self,_cmd){
return rb_ivar_get(self, i$ft);
});
rb_define_method(self,s$acn,function(self,_cmd,value){
return self.$i_s(i$ft,value);
});
rb_define_method(self,s$aco,function(self,_cmd,style){
return self.$i_s(i$fu,style);
});
rb_define_method(self,s$acp,function(self,_cmd){
return rb_ivar_get(self, i$fu);
});
rb_define_method(self,s$acq,function(self,_cmd,style){
return self.$i_s(i$fv,style);
});
rb_define_method(self,s$acr,function(self,_cmd){
return rb_ivar_get(self, i$fv);
});
rb_define_method(self,s$aaq,function(self,_cmd,column){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,s$hx,0),rb_funcall(column,s$hw,rb_funcall(rb_ivar_get(self, i$ey),s$nb))))){
return result;
}
var rows = rb_funcall(self, s$aad);
var i = 0;
for (i = 0; i < column; i++) {rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$h,i),s$ac),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ac))));
}for (i = 0; i < rows; i++) {rb_funcall(result,'height=',rb_funcall(rb_funcall(result,s$ad),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad))));
}return result;
});
rb_define_method(self,s$aap,function(self,_cmd,row){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(row,s$hx,0),rb_funcall(row,s$hw,rb_funcall(self,s$aad))))){
return result;
}
var i = 0;
for (i = 0; i < row; i++) {rb_funcall(result,'y=',rb_funcall(rb_funcall(result,s$z),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad))));
}rb_funcall(result,'width=',rb_funcall(rb_ivar_get(self, i$bc),s$ac));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad)));
return result;
});
rb_define_method(self,s$acs,function(self,_cmd,rect){
});
rb_define_method(self,s$act,function(self,_cmd,rect){
});
rb_define_method(self,s$acu,function(self,_cmd,point){
});
rb_define_method(self,s$acv,function(self,_cmd,point){
});
self.$def(s$aay,function(self,_cmd,column,row){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,s$hx,0),rb_funcall(column,s$zb,rb_funcall(self, s$aac))))){
return result;
}
rb_funcall(column,s$aat,function(i){
return rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$h,i),s$ac),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ac))));
});
rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$h,column),s$ac),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ac)));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad)));
return result;
});
self.$def(s$aaw,function(self,_cmd,column,row){
var table_column = rb_funcall(rb_ivar_get(self, i$ey),s$h,column);
var cell = rb_funcall(table_column,s$acw,row);
rb_funcall(cell,'object_value=',rb_funcall(rb_ivar_get(self, i$fd),s$acx,self,table_column,row));
return cell;
});
rb_define_method(self,s$wb,function(self,_cmd,text_obj){
});
rb_define_method(self,s$wc,function(self,_cmd,text_obj){
});
rb_define_method(self,s$wd,function(self,_cmd,notification){
});
rb_define_method(self,s$we,function(self,_cmd,notification){
});
rb_define_method(self,s$wf,function(self,_cmd,notification){
});
rb_define_method(self,s$acy,function(self,_cmd,name){
return rb_ivar_get(self, i$fw);
});
rb_define_method(self,s$acz,function(self,_cmd){
return rb_ivar_get(self, i$fw);
});
rb_define_method(self,s$ada,function(self,_cmd,save){
return rb_ivar_get(self, i$fx);
});
rb_define_method(self,s$adb,function(self,_cmd){
return rb_ivar_get(self, i$fx);
});
self.$def(s$adc,function(self,_cmd,cell,column,row){
});
rb_define_method(self,s$add,function(self,_cmd){
return rb_ivar_get(self, i$fy);
});
rb_define_method(self,s$ade,function(self,_cmd,column){
return self.$i_s(i$fy,column);
});
self.$def(s$adf,function(self,_cmd,column,row){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
rb_funcall(self,s$ak,'mouse down');
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
return rb_funcall(self,s$ak,[(rb_funcall(location,s$y)),", ",(rb_funcall(location,s$z))].join(''));
});
self.$def(s$adg,function(self,_cmd,column,row,the_event,select){
});
self.$def(s$adh,function(self,_cmd,row,clip_rect){
});
rb_define_method(self,s$adi,function(self,_cmd,clip_rect){
});
rb_define_method(self,s$adj,function(self,_cmd,clip_rect){
});
rb_define_method(self,s$adk,function(self,_cmd,clip_rect){
});
})(RClass.define_under(self,'TableView',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,identifier){
rb_funcall(self,'identifier=',identifier);
self.$i_s(i$fz,rb_funcall(self.$klass.$c_g_full(c$ar),s$ao,''));
self.$i_s(i$ga,rb_funcall(self.$klass.$c_g_full(c$ai),s$ao,''));
return self.$i_s(i$an,100);
});
rb_define_method(self,s$adl,function(self,_cmd,identifier){
return self.$i_s(i$gb,identifier);
});
rb_define_method(self,s$adm,function(self,_cmd){
return rb_ivar_get(self, i$gb);
});
rb_define_method(self,s$adn,function(self,_cmd,table_view){
return self.$i_s(i$gc,table_view);
});
rb_define_method(self,s$ado,function(self,_cmd){
return rb_ivar_get(self, i$gc);
});
rb_define_method(self,s$hl,function(self,_cmd,width){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$ac,function(self,_cmd){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$adp,function(self,_cmd,min_width){
return self.$i_s(i$gd,min_width);
});
rb_define_method(self,s$adq,function(self,_cmd){
return rb_ivar_get(self, i$gd);
});
rb_define_method(self,s$adr,function(self,_cmd,max_width){
return self.$i_s(i$ge,max_width);
});
rb_define_method(self,s$ads,function(self,_cmd){
return rb_ivar_get(self, i$ge);
});
rb_define_method(self,s$adt,function(self,_cmd,cell){
return self.$i_s(i$fz,cell);
});
rb_define_method(self,s$adu,function(self,_cmd){
return rb_ivar_get(self, i$fz);
});
rb_define_method(self,s$adv,function(self,_cmd){
return rb_ivar_get(self, i$ga);
});
rb_define_method(self,s$adw,function(self,_cmd,data_cell){
return self.$i_s(i$ga,data_cell);
});
rb_define_method(self,s$acw,function(self,_cmd){
return rb_ivar_get(self, i$ga);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$adx,function(self,_cmd,sort_descriptor){
return self.$i_s(i$gf,sort_descriptor);
});
rb_define_method(self,s$ady,function(self,_cmd){
return rb_ivar_get(self, i$gf);
});
rb_define_method(self,s$adz,function(self,_cmd,resizing_mask){
return self.$i_s(i$gg,resizing_mask);
});
rb_define_method(self,s$aea,function(self,_cmd){
return rb_ivar_get(self, i$gg);
});
rb_define_method(self,s$aeb,function(self,_cmd,string){
return self.$i_s(i$gh,string);
});
rb_define_method(self,s$aec,function(self,_cmd){
return rb_ivar_get(self, i$gi);
});
rb_define_method(self,s$ko,function(self,_cmd){
return rb_ivar_get(self, i$gj);
});
rb_define_method(self,s$kn,function(self,_cmd,flag){
return self.$i_s(i$gj,flag);
});
})(RClass.define_under(self,'TableColumn',cObject));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-table-header-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
rb_funcall(context,'first_time=',false);
}
var children = rb_funcall(context,s$jx);
var table_columns = rb_funcall(rb_ivar_get(self, i$gc),s$aab);
var i = 0;
var columns = rb_funcall(table_columns,s$nb);
var intercell_spacing = rb_funcall(rb_ivar_get(self, i$gc),s$zt);
var cell_frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_funcall(self, s$lz),s$ac),rb_funcall(rb_funcall(self, s$lz),s$ad));
if(RTEST(rb_funcall(children,s$hx,columns))){
rb_funcall((rb_funcall(columns,s$mf,children)),s$aat,function(i){
return rb_funcall(context,s$e,"<div></div>");
});
}
return rb_funcall(columns,s$aat,function(i){
var column = rb_funcall(table_columns,s$h,i);
var width = rb_funcall(rb_funcall(column,s$ac),s$hy,rb_funcall(intercell_spacing,s$ac));
rb_funcall(cell_frame,'width=',width);
rb_funcall(context,s$jy,i,function(column_context){
if(RTEST(rb_funcall(i,s$hx,children))){
rb_funcall(column_context,'first_time=',false);
}
else{
rb_funcall(column_context,'first_time=',true);
}
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(rb_funcall(column,s$adu),s$nj,cell_frame,self);
});
return rb_funcall(cell_frame,'x=',rb_funcall(rb_funcall(cell_frame,s$y),s$hy,width));
});
});
rb_define_method(self,s$adn,function(self,_cmd,table_view){
return self.$i_s(i$gc,table_view);
});
rb_define_method(self,s$ado,function(self,_cmd){
return rb_ivar_get(self, i$gc);
});
rb_define_method(self,s$aed,function(self,_cmd){
return rb_ivar_get(self, i$gk);
});
rb_define_method(self,s$aee,function(self,_cmd){
return rb_ivar_get(self, i$gl);
});
rb_define_method(self,s$aef,function(self,_cmd){
return rb_ivar_get(self, i$gm);
});
rb_define_method(self,s$aeg,function(self,_cmd,column){
});
rb_define_method(self,s$acu,function(self,_cmd,point){
});
})(RClass.define_under(self,'TableHeaderView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$def(s$aeh,function(self,_cmd,cell_frame,control_view,ascending,priority){
});
self.$def(s$aei,function(self,_cmd,cell_frame,control_view,ascending,priority){
});
rb_define_method(self,s$aej,function(self,_cmd,the_rect){
});
})(RClass.define_under(self,'TableHeaderCell',self.$c_g_full(c$ai)));
})(RModule.define('Vienna'));


(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame]);
return self.$i_s(i$gn,style_mask);
});
self.$def_s(s$aek,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$ael,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$aem,function(self,_cmd,title,style){
});
rb_define_method(self,s$aen,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
rb_define_method(self,s$aeo,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-window-view';
});
rb_define_method(self,s$eu,function(self,_cmd,win){
return self.$i_s(i$ac,win);
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
var mouse_down_point = rb_funcall(the_event,s$fa);
return rb_funcall(self.$klass.$c_g_full(c$m),s$du,[_$ak,_$ab],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$ab,_$ak))){
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
}
else{
var window_point = rb_funcall(the_event,s$fa);
self.$i_s(i$go,rb_funcall(rb_funcall(rb_ivar_get(self, i$ac),s$ln),s$v));
self.$i_s(i$gp,rb_funcall(rb_funcall(window_point,s$y),s$mf,rb_funcall(mouse_down_point,s$y)));
self.$i_s(i$gq,rb_funcall(rb_funcall(window_point,s$z),s$mf,rb_funcall(mouse_down_point,s$z)));
rb_funcall(rb_ivar_get(self, i$ac),'frame_origin=',rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(rb_ivar_get(self, i$go),s$y),s$hy,rb_ivar_get(self, i$gp)),rb_funcall(rb_funcall(rb_ivar_get(self, i$go),s$z),s$hy,rb_ivar_get(self, i$gq))));
}
});
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(['vn-window-view'],s$ui,' '));
});
})(RClass.define_under(self,'WindowView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[16,855,16,16]));
self.$c_s('MIN_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
rb_define_method(self,s$l,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self, i$gn),s$dx,_$io))){
self.$i_s(i$gr,rb_funcall(self.$klass.$c_g_full(c$ae),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,6,6,16,16),_$hl,false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',_$gg);
rb_funcall(close,'image=',self.$klass.$c_g_full(c$as));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full(c$at));
rb_funcall(self,s$e,close);
return rb_funcall(close,'needs_display=',true);
}));
}
if(RTEST(rb_funcall(rb_ivar_get(self, i$gn),s$dx,_$ip))){
self.$i_s(i$gs,rb_funcall(self.$klass.$c_g_full(c$ae),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,10,10,300,300),_$hl,false),function(min){
return rb_funcall(self,s$e,min);
}));
}
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-normal-window-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
rb_funcall(context,s$e,"<div class='body'></div>");
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
});
self.$def_s(s$aek,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$ael,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$aem,function(self,_cmd,title,style){
});
rb_define_method(self,s$aen,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
rb_define_method(self,s$aeo,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
})(RClass.define_under(self,'NormalWindowView',self.$c_g_full(c$au)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
rb_define_method(self,s$l,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self, i$gn),s$dx,_$io))){
self.$i_s(i$gr,rb_funcall(self.$klass.$c_g_full(c$ae),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,5,3,13,13),_$hl,false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',_$gg);
rb_funcall(close,'image=',self.$klass.$c_g_full(c$as));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full(c$at));
rb_funcall(self,s$e,close);
return rb_funcall(close,'needs_display=',true);
}));
}
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-hud-window-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
rb_funcall(context,s$e,"<div class='body'></div>");
rb_funcall(context,s$e,"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
});
})(RClass.define_under(self,'HUDWindowView',self.$c_g_full(c$au)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
})(RClass.define_under(self,'BorderlessWindowView',self.$c_g_full(c$au)));
})(RModule.define('Vienna'));
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$iq, 0, _$ir, rb_funcall((1),s$e,0), _$io, rb_funcall((1),s$e,1), _$ip, rb_funcall((1),s$e,2), _$is, rb_funcall((1),s$e,3), _$it, rb_funcall((1),s$e,8), _$iu, rb_funcall((1),s$e,12), _$iv, 1, _$iw, 1, _$ix, 1, _$iy, 1, _$iz, 1, _$ja, rb_funcall((1),s$e,4), _$jb, rb_funcall((1),s$e,6), _$gw, rb_funcall((1),s$e,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$u, 0, _$jc, 0, _$jd, 0, _$je, 0, _$jf, 0, _$jg, 0, _$v, 0, _$jh, 0, _$ji, 0));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,content_rect,style_mask){
return rb_funcall(self,s$aep,content_rect,style_mask);
});
self.$def(s$aep,function(self,_cmd,content_rect,style_mask){
rb_funcall(self, s$jz);
self.$i_s(i$bb,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0));
self.$i_s(i$gt,rb_funcall(self.$klass.$c_g_full(c$m),s$eg,self));
self.$i_s(i$gn,style_mask);
rb_funcall(self,'level=',_$u);
self.$i_s(i$gu,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,0.0,0.0));
self.$i_s(i$gv,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,9999.0,9999.0));
self.$i_s(i$gw,self);
self.$i_s(i$o,self.$klass.$c_g_full(c$m));
rb_funcall(self,s$aeq);
rb_funcall(self,'frame=',content_rect);
rb_funcall(rb_ivar_get(self, i$gx),'needs_display=',true);
rb_funcall(self,'content_view=',rb_funcall(self.$klass.$c_g_full(c$x),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bb),s$ac),rb_funcall(rb_ivar_get(self, i$bb),s$ad))));
return self;
});
self.$def_s(s$ka,function(self,_cmd,options,block){
var win = rb_funcall(rb_funcall(self,s$aer),s$aep,rb_funcall(options,s$h,_$fv),[_$ir,_$io]);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
rb_define_method(self,s$jz,function(self,_cmd){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full(c$l),s$h,_$af),s$ab,_$ag))){
}
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$s),s$ao,_$fy));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$r),s$ao,_$fy));
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_ivar_get(self, i$bi));
return rb_funcall(self.$klass.$c_g_full(c$c),s$e,rb_ivar_get(self, i$b));
});
rb_define_method(self,s$aeq,function(self,_cmd){
var view_class = rb_funcall(self,s$aes,rb_ivar_get(self, i$gn));
self.$i_s(i$gx,rb_funcall(view_class,s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,100,100),rb_ivar_get(self, i$gn)));
rb_funcall(rb_ivar_get(self, i$gx),s$kw,self);
rb_funcall(rb_ivar_get(self, i$gx),'next_responder=',self);
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_funcall(rb_ivar_get(self, i$gx),s$m));
rb_funcall(rb_ivar_get(self, i$gx),s$ky);
rb_funcall(rb_ivar_get(self, i$gx),'needs_display=',true);
rb_funcall(rb_funcall(rb_ivar_get(self, i$gx),s$m),s$f,_$ah,function(event){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,event,self,'left_mouse_down');
rb_funcall(self.$klass.$c_g_full(c$m),s$dz,the_event);
if(!RTEST(rb_funcall(the_event,s$eq))){
rb_funcall(the_event,s$ep);
}
});
return rb_funcall(rb_funcall(rb_ivar_get(self, i$gx),s$m),s$f,_$ai,function(event){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,event,self,'left_mouse_up');
rb_funcall(self.$klass.$c_g_full(c$m),s$dz,the_event);
if(!RTEST(rb_funcall(the_event,s$eq))){
rb_funcall(the_event,s$ep);
}
});
});
rb_define_method(self,s$aes,function(self,_cmd,style_mask){
if(RTEST(rb_funcall(style_mask,s$dx,_$iq))){
return self.$klass.$c_g_full(c$av);
}
else if(RTEST(rb_funcall(style_mask,s$dx,_$gw))){
return self.$klass.$c_g_full(c$aw);
}
else{
return self.$klass.$c_g_full(c$ax);
}
});
self.$def_s(s$aek,function(self,_cmd,rect,style){
});
self.$def_s(s$ael,function(self,_cmd,rect,style){
});
self.$def_s(s$aem,function(self,_cmd,title,style){
});
rb_define_method(self,s$aen,function(self,_cmd,rect){
});
rb_define_method(self,s$aeo,function(self,_cmd,rect){
return rect;
});
rb_define_method(self,s$qh,function(self,_cmd){
return rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$aet,function(self,_cmd,str){
});
rb_define_method(self,s$aeu,function(self,_cmd){
});
rb_define_method(self,s$aev,function(self,_cmd){
});
rb_define_method(self,s$aew,function(self,_cmd,filename){
});
rb_define_method(self,s$aex,function(self,_cmd,filename){
});
rb_define_method(self,s$aey,function(self,_cmd,flag){
return self.$i_s(i$gy,flag);
});
rb_define_method(self,s$aez,function(self,_cmd){
return rb_ivar_get(self, i$gy);
});
rb_define_method(self,s$ws,function(self,_cmd,view){
rb_funcall(view,s$kw,self);
var bounds = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$w),s$ac),rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$w),s$ad));
self.$i_s(i$eb,view);
rb_funcall(rb_ivar_get(self, i$eb),'frame=',rb_funcall(self,s$aeo,bounds));
rb_funcall(view,s$ky);
return rb_funcall(rb_ivar_get(self, i$gx),s$e,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$wu,function(self,_cmd){
return rb_ivar_get(self, i$eb);
});
rb_define_method(self,s$e,function(self,_cmd,view){
return rb_funcall(rb_ivar_get(self, i$eb),s$e,view);
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
return self.$i_s(i$t,obj);
});
rb_define_method(self,s$jm,function(self,_cmd){
});
rb_define_method(self,s$ev,function(self,_cmd){
return rb_ivar_get(self, i$gt);
});
rb_define_method(self,s$afa,function(self,_cmd){
return rb_ivar_get(self, i$gn);
});
rb_define_method(self,s$afb,function(self,_cmd,mask){
return self.$i_s(i$gn,mask);
});
self.$def(s$afc,function(self,_cmd,create_flag,obj){
});
rb_define_method(self,s$afd,function(self,_cmd,obj){
});
rb_define_method(self,s$afe,function(self,_cmd,size){
});
rb_define_method(self,s$aff,function(self,_cmd,point){
});
rb_define_method(self,s$afg,function(self,_cmd,point){
});
rb_define_method(self,s$ln,function(self,_cmd){
return rb_ivar_get(self, i$bb);
});
rb_define_method(self,s$u,function(self,_cmd,frame){
return rb_funcall(self,s$afh,frame,true,false);
});
self.$def(s$afi,function(self,_cmd,frame_rect,flag){
return rb_funcall(self,s$afh,frame_rect,flag,false);
});
self.$def(s$afh,function(self,_cmd,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin = rb_funcall(rb_ivar_get(self, i$bb),s$v);
var size = rb_funcall(rb_ivar_get(self, i$bb),s$w);
var new_origin = rb_funcall(frame_rect,s$v);
var new_size = rb_funcall(frame_rect,s$w);
if(!RTEST(rb_funcall(origin,s$ht,new_origin))){
rb_funcall(origin,'x=',rb_funcall(new_origin,s$y));
rb_funcall(origin,'y=',rb_funcall(new_origin,s$z));
rb_funcall(rb_ivar_get(self, i$b),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$n),s$cc),s$cj,'window did move',self);
}
if(!RTEST(rb_funcall(size,s$ht,new_size))){
rb_funcall(size,'width=',rb_funcall(new_size,s$ac));
rb_funcall(size,'height=',rb_funcall(new_size,s$ad));
rb_funcall(rb_ivar_get(self, i$gx),'frame_size=',size);
rb_funcall(rb_ivar_get(self, i$b),'size=',size);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$n),s$cc),s$cj,'window did resize',self);
}
}
});
rb_define_method(self,s$ll,function(self,_cmd,origin){
if(!RTEST(rb_funcall(origin,s$ht,rb_funcall(rb_ivar_get(self, i$bb),s$v)))){
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$v),'x=',rb_funcall(origin,s$y));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$v),'y=',rb_funcall(origin,s$z));
rb_funcall(rb_ivar_get(self, i$b),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$n),s$cc),s$cj,'window did move',self);
}
});
rb_define_method(self,s$afj,function(self,_cmd,new_frame){
});
rb_define_method(self,s$afk,function(self,_cmd){
});
rb_define_method(self,s$afl,function(self,_cmd,show){
return self.$i_s(i$gz,show);
});
rb_define_method(self,s$afm,function(self,_cmd){
return rb_ivar_get(self, i$gz);
});
rb_define_method(self,s$afn,function(self,_cmd,increments){
return self.$i_s(i$ha,increments);
});
rb_define_method(self,s$afo,function(self,_cmd){
return rb_ivar_get(self, i$ha);
});
rb_define_method(self,s$afp,function(self,_cmd,ratio){
return self.$i_s(i$hb,ratio);
});
rb_define_method(self,s$afq,function(self,_cmd){
return rb_ivar_get(self, i$hb);
});
rb_define_method(self,s$ms,function(self,_cmd){
});
rb_define_method(self,s$afr,function(self,_cmd){
return rb_ivar_get(self, i$hc);
});
rb_define_method(self,s$afs,function(self,_cmd,flag){
return self.$i_s(i$hc,flag);
});
rb_define_method(self,s$aft,function(self,_cmd){
});
rb_define_method(self,s$afu,function(self,_cmd,responder){
if(RTEST(rb_funcall(rb_ivar_get(self, i$gw),s$ab,responder))){
return true;
}
if(!RTEST(rb_funcall(rb_ivar_get(self, i$gw),s$dl))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(rb_funcall(responder,s$dj)),NOTTEST(rb_funcall(responder,s$dk)))))){
self.$i_s(i$gw,self);
rb_funcall(self,s$ak,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$gw,responder);
return true;
});
rb_define_method(self,s$afv,function(self,_cmd){
});
rb_define_method(self,s$afw,function(self,_cmd){
});
rb_define_method(self,s$de,function(self,_cmd,the_event){
});
rb_define_method(self,s$afx,function(self,_cmd){
});
rb_define_method(self,s$afy,function(self,_cmd,flag){
return self.$i_s(i$hd,flag);
});
rb_define_method(self,s$afz,function(self,_cmd){
return rb_ivar_get(self, i$hd);
});
rb_define_method(self,s$aga,function(self,_cmd,sender){
});
rb_define_method(self,s$agb,function(self,_cmd,sender){
});
rb_define_method(self,s$agc,function(self,_cmd){
return rb_ivar_get(self, i$he);
});
rb_define_method(self,s$agd,function(self,_cmd,sender){
});
rb_define_method(self,s$age,function(self,_cmd){
return rb_ivar_get(self, i$hf);
});
self.$def(s$cp,function(self,_cmd,action,object){
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$agf,function(self,_cmd,flag){
return self.$i_s(i$hg,flag);
});
rb_define_method(self,s$agg,function(self,_cmd){
return rb_ivar_get(self, i$hg);
});
rb_define_method(self,s$agh,function(self,_cmd,flag){
return rb_ivar_get(self, i$hh);
});
rb_define_method(self,s$agi,function(self,_cmd){
return rb_ivar_get(self, i$hh);
});
rb_define_method(self,s$agj,function(self,_cmd,flag){
return self.$i_s(i$hi,flag);
});
rb_define_method(self,s$agk,function(self,_cmd){
return rb_ivar_get(self, i$hi);
});
rb_define_method(self,s$hq,function(self,_cmd){
});
rb_define_method(self,s$agl,function(self,_cmd,sender){
rb_funcall(self,s$agm,self);
rb_funcall(self, s$agn);
return rb_funcall(self, s$ago);
});
rb_define_method(self,s$agm,function(self,_cmd,sender){
});
rb_define_method(self,s$agp,function(self,_cmd,sender){
});
rb_define_method(self,s$agq,function(self,_cmd,sender){
});
self.$def(s$agr,function(self,_cmd,place,other_win){
});
rb_define_method(self,s$ags,function(self,_cmd){
});
rb_define_method(self,s$agt,function(self,_cmd,flag){
return self.$i_s(i$hj,flag);
});
rb_define_method(self,s$agu,function(self,_cmd){
return rb_ivar_get(self, i$hj);
});
rb_define_method(self,s$agv,function(self,_cmd){
return rb_ivar_get(self, i$hk);
});
rb_define_method(self,s$agw,function(self,_cmd){
return rb_ivar_get(self, i$hl);
});
rb_define_method(self,s$agx,function(self,_cmd){
return rb_ivar_get(self, i$hm);
});
rb_define_method(self,s$agy,function(self,_cmd){
});
rb_define_method(self,s$agz,function(self,_cmd){
});
rb_define_method(self,s$agn,function(self,_cmd){
});
rb_define_method(self,s$ago,function(self,_cmd){
});
rb_define_method(self,s$aha,function(self,_cmd){
});
rb_define_method(self,s$ahb,function(self,_cmd){
});
rb_define_method(self,s$ahc,function(self,_cmd){
});
rb_define_method(self,s$ahd,function(self,_cmd){
});
rb_define_method(self,s$ahe,function(self,_cmd){
});
rb_define_method(self,s$ahf,function(self,_cmd,point){
return rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(point,s$y),s$hy,rb_funcall(rb_ivar_get(self, i$bb),s$y)),rb_funcall(rb_funcall(point,s$z),s$hy,rb_funcall(rb_ivar_get(self, i$bb),s$z)));
});
rb_define_method(self,s$fb,function(self,_cmd,point){
var res = rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(point,s$y),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$y)),rb_funcall(rb_funcall(point,s$z),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$z)));
return res;
});
rb_define_method(self,s$ahg,function(self,_cmd,sender){
});
rb_define_method(self,s$ahh,function(self,_cmd,sender){
});
rb_define_method(self,s$ahi,function(self,_cmd,sender){
});
rb_define_method(self,s$ahj,function(self,_cmd,level){
self.$i_s(i$hn,level);
return rb_funcall(rb_ivar_get(self, i$b),s$o,VN.$h(_$jj,rb_funcall(self.$klass.$c_g_full(c$ay),s$h,level)));
});
rb_define_method(self,s$ahk,function(self,_cmd){
return rb_ivar_get(self, i$hn);
});
rb_define_method(self,s$ahl,function(self,_cmd,flag){
return self.$i_s(i$ho,flag);
});
rb_define_method(self,s$ahm,function(self,_cmd){
return rb_ivar_get(self, i$ho);
});
rb_define_method(self,s$ahn,function(self,_cmd){
return rb_ivar_get(self, i$gu);
});
rb_define_method(self,s$aho,function(self,_cmd){
return rb_ivar_get(self, i$gv);
});
rb_define_method(self,s$ahp,function(self,_cmd,size){
return self.$i_s(i$gu,size);
});
rb_define_method(self,s$ahq,function(self,_cmd,size){
return self.$i_s(i$gv,size);
});
rb_define_method(self,s$ahr,function(self,_cmd,mask){
});
self.$def(s$ahs,function(self,_cmd,event,flag){
});
rb_define_method(self,s$dv,function(self,_cmd){
return rb_ivar_get(self, i$y);
});
rb_define_method(self,s$aht,function(self,_cmd,flag){
return self.$i_s(i$hp,flag);
});
rb_define_method(self,s$ahu,function(self,_cmd){
return rb_ivar_get(self, i$hp);
});
rb_define_method(self,s$ahv,function(self,_cmd,flag){
return self.$i_s(i$hq,flag);
});
rb_define_method(self,s$ahw,function(self,_cmd){
return rb_ivar_get(self, i$hq);
});
rb_define_method(self,s$dz,function(self,_cmd,event){
var point = rb_funcall(event,s$fa);
return (function($v){
if(($e = rb_funcall(_$as, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'key_up');
}
else if(($e = rb_funcall(_$ar, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'key_down');
}
else if(($e = rb_funcall(_$aj, '===', $v),$e!==nil && $e!==false)){
var hit_test = rb_funcall(rb_ivar_get(self, i$gx),s$na,point);
if(RTEST(ANDTEST(rb_funcall(hit_test,s$rs,rb_ivar_get(self, i$gw)),rb_funcall(hit_test,s$dj)))){
rb_funcall(self,s$afu,hit_test);
}
rb_funcall(self,s$agl,self);
if(RTEST(rb_funcall(hit_test,s$kb,event))){
return rb_funcall(hit_test,s$cr,event);
}
}
else if(($e = rb_funcall(_$ak, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'left_mouse_up');
}
else if(($e = rb_funcall(_$ab, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'left_mouse_dragged');
}
else if(($e = rb_funcall(_$az, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'scroll_wheel');
}
else if(($e = rb_funcall(_$al, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'right_mouse_down');
}
else if(($e = rb_funcall(_$am, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'right_mouse_up');
}
else if(($e = rb_funcall(_$ao, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'right_mouse_dragged');
}
})(rb_funcall(event,s$eb));
});
rb_define_method(self,s$ahx,function(self,_cmd){
return rb_ivar_get(self, i$hr);
});
rb_define_method(self,s$ahy,function(self,_cmd,controller){
return self.$i_s(i$hr,controller);
});
rb_define_method(self,s$ahz,function(self,_cmd){
return rb_ivar_get(self, i$hs);
});
rb_define_method(self,s$aia,function(self,_cmd){
return rb_ivar_get(self, i$ht);
});
self.$def(s$aib,function(self,_cmd,win,place){
});
rb_define_method(self,s$aic,function(self,_cmd,win){
});
rb_define_method(self,s$aid,function(self,_cmd){
return rb_ivar_get(self, i$hu);
});
rb_define_method(self,s$aie,function(self,_cmd){
return rb_ivar_get(self, i$hv);
});
rb_define_method(self,s$aif,function(self,_cmd,win){
return self.$i_s(i$hv,win);
});
rb_define_method(self,s$mz,function(self,_cmd){
return rb_ivar_get(self, i$hw);
});
rb_define_method(self,s$aig,function(self,_cmd,view){
return self.$i_s(i$hx,view);
});
rb_define_method(self,s$aih,function(self,_cmd){
return rb_ivar_get(self, i$hx);
});
rb_define_method(self,s$aii,function(self,_cmd,sender){
});
rb_define_method(self,s$aij,function(self,_cmd,sender){
});
rb_define_method(self,s$aik,function(self,_cmd,view){
});
rb_define_method(self,s$ail,function(self,_cmd,view){
});
rb_define_method(self,s$aim,function(self,_cmd,flag){
return self.$i_s(i$hy,flag);
});
rb_define_method(self,s$ain,function(self,_cmd){
return rb_ivar_get(self, i$hy);
});
rb_define_method(self,s$aio,function(self,_cmd){
});
rb_define_method(self,s$aip,function(self,_cmd,toolbar){
return self.$i_s(i$hz,toolbar);
});
rb_define_method(self,s$aiq,function(self,_cmd){
return rb_ivar_get(self, i$hz);
});
rb_define_method(self,s$air,function(self,_cmd,sender){
});
rb_define_method(self,s$ais,function(self,_cmd,sender){
});
rb_define_method(self,s$ait,function(self,_cmd,show){
return rb_ivar_get(self, i$ia);
});
rb_define_method(self,s$aiu,function(self,_cmd){
return rb_ivar_get(self, i$ia);
});
})(RClass.define_under(self,'Window',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
})(RClass.define_under(self,'Panel',self.$c_g_full(c$az)));
})(RModule.define('Vienna'));

(function(self) {
(function(self) {
rb_funcall(self,s$j,_$fh);
self.$c_s('BUILDERS',VN.$h());
rb_define_method(self,s$l,function(self,_cmd,name,block){
self.$i_s(i$j,name);
self.$i_s(i$ib,block);
self.$i_s(i$ic,[]);
return rb_funcall(self.$klass.$c_g_full(c$ba),'[]=',name,self);
});
self.$def_s(s$ka,function(self,_cmd,name,options,block){
var builder = rb_funcall(self.$c_g_full(c$ba),s$h,name);
return rb_funcall(builder,s$aiv,options,block);
});
rb_define_method(self,s$aiv,function(self,_cmd,options,block){
rb_funcall(rb_ivar_get(self, i$ib),s$an,self);
return arguments[arguments.length -1](self);
});
rb_define_method(self,s$aiw,function(self,_cmd,obj){
return rb_funcall(rb_ivar_get(self, i$ic),s$e,obj);
});
rb_define_method(self,s$aix,function(self,_cmd){
return rb_ivar_get(self, i$ag);
});
rb_define_method(self,s$do,function(self,_cmd,a_menu){
});
})(RClass.define_under(self,'Builder',cObject));
})(RModule.define('Vienna'));
(function(self) {
self.$c_s('VERSION',"0.0.1");
self.$def_s(s$a,function(self,_cmd){
return self.$c_g_full(c$a);
});
})(RModule.define('RubyWebApp'));

(function(self) {
return rb_funcall(self.$c_g_full(c$b).$c_g('Builder'),s$ao,_$jf,function(builder){
var app_delegate = rb_funcall(self.$klass.$c_g_full(c$bb).$c_g('AppController'),s$ao);
rb_funcall(self.$klass.$c_g_full(c$h).$c_g('App'),'delegate=',app_delegate);
var app_observer = rb_funcall(self.$klass.$c_g_full(c$bc),s$ao);
window.app_observer = app_observer;rb_funcall(app_delegate,s$bn,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window = rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ao,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,800,100,400,250),[_$gw,_$io]);
return rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,50,100,700,400),_$dx,'My Window!'),function(win){
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Button'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,40,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Disabled');
rb_funcall(button,'enabled=',false);
rb_funcall(button,'alignment=',_$hb);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Button'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,70,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Right');
rb_funcall(button,'enabled=',false);
rb_funcall(button,'alignment=',_$gh);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,100,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Check');
rb_funcall(button,'enabled=',true);
rb_funcall(button,'control_size=',_$gy);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,130,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Checkon');
rb_funcall(button,'state=',_$gm);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,160,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Checkon');
rb_funcall(button,'state=',_$gm);
rb_funcall(button,'enabled=',false);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,190,90,24),_$jk,_$hw),function(slider){
rb_funcall(win,s$e,slider);
return rb_funcall(slider,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,210,180,26),_$ce,true),function(text){
rb_funcall(win,s$e,text);
return rb_funcall(text,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Button'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,240,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Normal');
rb_funcall(button,'alignment=',_$fs);
return rb_funcall(button,'needs_display=',true);
});
return scroll_view = rb_funcall(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,300,100,250,150),_$jl,true),function(scroll_view){
rb_funcall(scroll_view,'has_vertical_scroller=',true);
rb_funcall(rb_funcall(scroll_view,s$xf),'needs_display=',true);
rb_funcall(scroll_view,'has_horizontal_scroller=',true);
rb_funcall(rb_funcall(scroll_view,s$xh),'needs_display=',true);
rb_funcall(win,s$e,scroll_view);
var table_view = rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,0,0,400,200),_$jl,true),function(table_view){
rb_funcall(table_view,'data_source=',app_delegate);
rb_funcall(table_view,s$aaf,rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ao,'name'));
rb_funcall(table_view,s$aaf,rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ao,'age'));
rb_funcall(table_view,s$aaf,rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ao,'band'));
return rb_funcall(table_view,s$aag);
});
rb_funcall(scroll_view,'document_view=',table_view);
return rb_funcall(scroll_view,s$wt);
});
});
});
})(RModule.define('RubyWebApp'));

(function(self) {
(function(self) {
self.$c_s('TABLE_VIEW_DATA',[VN.$h(_$o, 'Adam', _$jm, 23, _$jn, 'Led Zepplin'),VN.$h(_$o, 'Ben', _$jm, 20, _$jn, 'Pendulum'),VN.$h(_$o, 'Tom', _$jm, 30, _$jn, 'Tweenies'),VN.$h(_$o, 'Becky', _$jm, 12, _$jn, '50 pence'),VN.$h(_$o, 'Dad', _$jm, 24, _$jn, 'Take That'),VN.$h(_$o, 'Mum', _$jm, 25, _$jn, 'Rod Stewart')]);
rb_define_method(self,s$l,function(self,_cmd){
self.$i_s(i$id,10);
return self.$i_s(i$ie,false);
});
rb_define_method(self,s$aae,function(self,_cmd,table_view){
return rb_funcall(self.$klass.$c_g_full(c$bd),s$nb);
});
self.$def(s$acx,function(self,_cmd,table_view,table_column,row){
return rb_funcall(rb_funcall(self.$klass.$c_g_full(c$bd),s$h,row),s$h,rb_funcall(table_column,s$adm));
});
rb_define_method(self,s$aiy,function(self,_cmd){
return rb_ivar_get(self, i$id);
});
rb_define_method(self,s$aiz,function(self,_cmd){
return rb_ivar_get(self, i$ie);
});
rb_define_method(self,s$aja,function(self,_cmd,aValue){
return self.$i_s(i$ie,aValue);
});
rb_define_method(self,s$ajb,function(self,_cmd,notification){
});
rb_define_method(self,s$ajc,function(self,_cmd,notification){
});
})(RClass.define_under(self,'AppController',cObject));
})(RModule.define('RubyWebApp'));
rb_funcall(cObject.$c_g(c$b).$c_g('App'),s$el,function(app){
return rb_funcall(cObject.$c_g(c$h).$c_g('Builder'),s$ka,_$jf,VN.$h(_$fh,cObject.$c_g(c$h).$c_g('App'),_$jo,[]),function(builder){
});
});
