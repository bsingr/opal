VN$ENV = { 'display_mode': 'render', 'image_dir': 'images' };

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
  return klass ;
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
  $ivar_set
  
  @param id - Ivar name
  @param val - Value
*/
RObject.prototype.$i_s = function(id, val) {
  this.$iv_tbl[id] = val ;
  return val ;
};

/**
  $ivar_get
  
  @param id - Ivar name
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
  new calling func
*/
var VN$ = function VN$(self, id) {
 // console.log(' >>> ' + id);
 if (!self.$klass) {
   console.log(self);
   console.log(id);
   // throw 'Vienna: VN$ - Trying to call `' + id + '` on null/undefined object'   
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
};

var VN$sup = function(from, self, id, args) {
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
var cObject = VN.boot_defclass('Object', cBasicObject);
var cModule = VN.boot_defclass('Module', cObject);
var cClass = VN.boot_defclass('Class', cModule);

metaclass = cBasicObject.$make_metaclass(cClass);
metaclass = cObject.$make_metaclass(metaclass);
metaclass = cModule.$make_metaclass(metaclass);
metaclass = cClass.$make_metaclass(metaclass);

VN.boot_defmetametaclass(cModule, metaclass);
VN.boot_defmetametaclass(cObject, metaclass);
VN.boot_defmetametaclass(cBasicObject, metaclass);

/**
  BasicObject necessary methods
*/
cBasicObject.$define_private_method('initialize', function(self, _cmd) {
  

  
  return nil ;
});

VN.cBasicObjectAlloc = function(self, _cmd) {
  // console.log('HMMMM');
  // console.log(self);
  // console.log(_cmd);
  var obj = new RObject(self, VN.OBJECT) ;
  // Cruical ivar setup
  // console.log('HERE');
  obj.$i_s('@kvo_observers', new Array());
  obj.$i_s('@kvo_old_values', VN.$h());
  obj.$i_s('@kvb_info', VN.$h());
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
  return self.$klass;
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
var cNumber = RClass.define('Number', cObject);
var cProc = RClass.define('Proc', cObject);
var cRange = RClass.define('Range', cObject);


var $VN_1 = RModule.define('Kernel');
$VN_1.$def('nil?',function(self,_cmd){
return false;
});
$VN_1.$def('===',function(self,_cmd,other){
});
$VN_1.$def('=~',function(self,_cmd,obj){
return nil;
});
$VN_1.$def('!=',function(self,_cmd,obj){
});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('class',function(self,_cmd){
});
$VN_1.$def('clone',function(self,_cmd){
});
$VN_1.$def('dup',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd,orig){
});
$VN_1.$def('taint',function(self,_cmd){
});
$VN_1.$def('tainted?',function(self,_cmd){
});
$VN_1.$def('untaint',function(self,_cmd){
});
$VN_1.$def('untrust',function(self,_cmd){
});
$VN_1.$def('untrusted?',function(self,_cmd){
});
$VN_1.$def('trust',function(self,_cmd){
});
$VN_1.$def('freeze',function(self,_cmd){
});
$VN_1.$def('frozen?',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;});
$VN_1.$def('inspect',function(self,_cmd){
return '';
});
$VN_1.$def('methods',function(self,_cmd){
});
$VN_1.$def('singleton_methods',function(self,_cmd){
});
$VN_1.$def('protected_methods',function(self,_cmd){
});
$VN_1.$def('private_methods',function(self,_cmd){
});
$VN_1.$def('public_methods',function(self,_cmd){
});
$VN_1.$def('instance_variables',function(self,_cmd){
});
$VN_1.$def('instance_variable_get',function(self,_cmd){
});
$VN_1.$def('instance_variable_set',function(self,_cmd){
});
$VN_1.$def('instance_variable_defined?',function(self,_cmd){
});
$VN_1.$def('remove_instance_variable',function(self,_cmd){
});
$VN_1.$def('instance_of?',function(self,_cmd){
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
      break ;
     default:
       VN.type_error('class or module required');
     }
     if (this.$klass == klass) return true ;
    return false ;});
$VN_1.$def('kind_of?',function(self,_cmd){
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
        break ;
      default:
        VN.type_error('class or module required');
    }
    var k = self.$klass ;
    while (k) {
      if (k == klass) {
        return true;
      }
      k = k.$super;
    }
    return false; });
$VN_1.$def('is_a?',function(self,_cmd){
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
        break ;
      default:
        VN.type_error('class or module required');
    }
    var k = self.$klass ;
    while (k) {
      if (k == klass) {
        return true;
      }
      k = k.$super;
    }
    return false;    });
$VN_1.$def('puts',function(self,_cmd){
});
$VN_1.$def('taps',function(self,_cmd){
});

cModule.$define_alloc_func(function(module_s_alloc) {
  
});var $VN_1 = RClass.define('Module',cObject);
$VN_1.$def('freeze',function(self,_cmd){
});
$VN_1.$def('===',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd){
});
$VN_1.$def('<=>',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('included_modules',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('name',function(self,_cmd){
return self.$iv_tbl['__classid__'];});
$VN_1.$def('ancestors',function(self,_cmd){
});
$VN_1.$def('attr',function(self,_cmd){
});
$VN_1.$def('attr_reader',function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'return self.$i_g("@' + args[i] + '");')
      self.$def(args[i], body);
    }});
$VN_1.$def('attr_writer',function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'val', 'VN$(self, "will_change_value_for_key","' + args[i] + '"); var ret = self.$i_s("@' + args[i] + '",val); VN$(self, "did_change_value_for_key","' + args[i] + '"); return ret;');
      self.$def(args[i] + '=', body);
    }});
$VN_1.$def('attr_accessor',function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      VN$(self, 'attr_reader', args[i]);
      VN$(self, 'attr_writer', args[i]);
    }});
$VN_1.$def('initialize',function(self,_cmd){
});
$VN_1.$def('instance_methods',function(self,_cmd){
});
$VN_1.$def('public_instance_methods',function(self,_cmd){
});
$VN_1.$def('protected_instance_methods',function(self,_cmd){
});
$VN_1.$def('private_instance_methods',function(self,_cmd){
});
$VN_1.$def('constants',function(self,_cmd){
});
$VN_1.$def('const_get',function(self,_cmd){
});
$VN_1.$def('const_set',function(self,_cmd){
});
$VN_1.$def('const_defined?',function(self,_cmd){
});
$VN_1.$def('remove_const',function(self,_cmd){
});
$VN_1.$def('const_missing',function(self,_cmd){
});
$VN_1.$def('class_variables',function(self,_cmd){
});
$VN_1.$def('remove_class_variable',function(self,_cmd){
});
$VN_1.$def('class_variable_get',function(self,_cmd){
});
$VN_1.$def('class_variable_set',function(self,_cmd){
});
$VN_1.$def('class_variable_defined?',function(self,_cmd){
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

String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

cString.$define_alloc_func(function() {
  return new String();
}); var $VN_1 = RClass.define('String',cObject);
$VN_1.$def('try_convert',function(self,_cmd){
});
$VN_1.$def('initialize',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('<=>',function(self,_cmd,obj){
});
$VN_1.$def('==',function(self,_cmd,obj){
return (self == obj) ? true : false;});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('hash',function(self,_cmd,obj){
});
$VN_1.$def('casecmp',function(self,_cmd,obj){
});
$VN_1.$def('+',function(self,_cmd,obj){
return self + obj;});
$VN_1.$def('*',function(self,_cmd,obj){
});
$VN_1.$def('%',function(self,_cmd,obj){
});
$VN_1.$def('[]',function(self,_cmd,key){
});
$VN_1.$def('[]=',function(self,_cmd,key,val){
});
$VN_1.$def('insert',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return self.length;});
$VN_1.$def('size',function(self,_cmd){
return self.length});
$VN_1.$def('empty?',function(self,_cmd){
});
$VN_1.$def('=~',function(self,_cmd,match){
});
$VN_1.$def('match',function(self,_cmd,match){
});
$VN_1.$def('succ',function(self,_cmd){
});
$VN_1.$def('next',function(self,_cmd){
});
$VN_1.$def('upto',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd){
});
$VN_1.$def('rindex',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('chr',function(self,_cmd){
});
$VN_1.$def('to_i',function(self,_cmd){
});
$VN_1.$def('to_f',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
return new String(self);});
$VN_1.$def('to_str',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('inspect',function(self,_cmd){
return new String('"' + self + '"');});
$VN_1.$def('dump',function(self,_cmd){
});
$VN_1.$def('upcase',function(self,_cmd){
});
$VN_1.$def('downcase',function(self,_cmd){
});
$VN_1.$def('capitalize',function(self,_cmd){
});
$VN_1.$def('swapcase',function(self,_cmd){
});
$VN_1.$def('camelize',function(self,_cmd){
var parts = self.split('_');
    var length = parts.length;

    if (length == 1) return parts[0];

    var camelized = self.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;});
$VN_1.$def('hex',function(self,_cmd){
});
$VN_1.$def('oct',function(self,_cmd){
});
$VN_1.$def('split',function(self,_cmd){
});
$VN_1.$def('lines',function(self,_cmd){
});
$VN_1.$def('bytes',function(self,_cmd){
});
$VN_1.$def('chars',function(self,_cmd){
});
$VN_1.$def('codepoints',function(self,_cmd){
});
$VN_1.$def('reverse',function(self,_cmd){
});
$VN_1.$def('concat',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd){
});
$VN_1.$def('crypt',function(self,_cmd){
});
$VN_1.$def('intern',function(self,_cmd){
});
$VN_1.$def('to_sym',function(self,_cmd){
return new String(self);});
$VN_1.$def('ord',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('start_with?',function(self,_cmd){
});
$VN_1.$def('end_with?',function(self,_cmd){
});
$VN_1.$def('scan',function(self,_cmd){
});
$VN_1.$def('ljust',function(self,_cmd){
});
$VN_1.$def('rjust',function(self,_cmd){
});
$VN_1.$def('center',function(self,_cmd){
});
$VN_1.$def('sub',function(self,_cmd){
});
$VN_1.$def('gsub',function(self,_cmd){
});
$VN_1.$def('chop',function(self,_cmd){
});
$VN_1.$def('chomp',function(self,_cmd){
});
$VN_1.$def('strip',function(self,_cmd){
});
$VN_1.$def('lstrip',function(self,_cmd){
});
$VN_1.$def('rstrip',function(self,_cmd){
});
$VN_1.$def('tr',function(self,_cmd){
});
$VN_1.$def('tr_s',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('squeeze',function(self,_cmd){
});
$VN_1.$def('count',function(self,_cmd){
});
$VN_1.$def('each_line',function(self,_cmd){
});
$VN_1.$def('each_byte',function(self,_cmd){
});
$VN_1.$def('each_char',function(self,_cmd){
});
$VN_1.$def('each_codepoint',function(self,_cmd){
});
$VN_1.$def('sum',function(self,_cmd){
});
$VN_1.$def('slice!',function(self,_cmd){
});
$VN_1.$def('partition',function(self,_cmd){
});
$VN_1.$def('rpartition',function(self,_cmd){
});

Number.prototype.$klass = cNumber ;
Number.prototype.$type = VN.NUMBER ;
Number.prototype.$ = RObject.prototype.$;

// VN.include_module(VN.cNumber, VN.mComparable);
RModule.include(cNumber, mComparable);var $VN_1 = RClass.define('Number',cObject);
$VN_1.$def('coerce',function(self,_cmd){
});
$VN_1.$def('+@',function(self,_cmd){
});
$VN_1.$def('-@',function(self,_cmd){
return self * -1;});
$VN_1.$def('<=>',function(self,_cmd){
});
$VN_1.$def('eql?',function(self,_cmd){
});
$VN_1.$def('quo',function(self,_cmd){
});
$VN_1.$def('fdiv',function(self,_cmd){
});
$VN_1.$def('div',function(self,_cmd){
});
$VN_1.$def('divmod',function(self,_cmd){
});
$VN_1.$def('modulo',function(self,_cmd){
});
$VN_1.$def('remainder',function(self,_cmd){
});
$VN_1.$def('abs',function(self,_cmd){
});
$VN_1.$def('magnitude',function(self,_cmd){
});
$VN_1.$def('to_int',function(self,_cmd){
});
$VN_1.$def('real?',function(self,_cmd){
});
$VN_1.$def('integer?',function(self,_cmd){
});
$VN_1.$def('zero?',function(self,_cmd){
});
$VN_1.$def('nonzero?',function(self,_cmd){
});
$VN_1.$def('floor',function(self,_cmd){
});
$VN_1.$def('ceil',function(self,_cmd){
});
$VN_1.$def('round',function(self,_cmd){
});
$VN_1.$def('truncate',function(self,_cmd){
});
$VN_1.$def('step',function(self,_cmd){
});
$VN_1.$def('odd?',function(self,_cmd){
return (self %2 == 0) ? false : true;});
$VN_1.$def('even?',function(self,_cmd){
return (self %2 == 0) ? true : false;});
$VN_1.$def('upto',function(self,_cmd){
});
$VN_1.$def('downto',function(self,_cmd){
});
$VN_1.$def('times',function(self,_cmd,block){
for (var i = 0; i < self; i++) {
      VN$(block, 'call', i);
    }return self;
});
$VN_1.$def('succ',function(self,_cmd){
});
$VN_1.$def('next',function(self,_cmd){
});
$VN_1.$def('pred',function(self,_cmd){
});
$VN_1.$def('chr',function(self,_cmd){
});
$VN_1.$def('ord',function(self,_cmd){
});
$VN_1.$def('to_i',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('+',function(self,_cmd,i){
return self + i;});
$VN_1.$def('-',function(self,_cmd,i){
return self - i;});
$VN_1.$def('*',function(self,_cmd,i){
return self * i;});
$VN_1.$def('/',function(self,_cmd,i){
return self / i;});
$VN_1.$def('%',function(self,_cmd){
});
$VN_1.$def('**',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd,other){
return self == other ? true : false;});
$VN_1.$def('>',function(self,_cmd,other){
return self > other;});
$VN_1.$def('>=',function(self,_cmd,other){
return self >= other;});
$VN_1.$def('<',function(self,_cmd,other){
return self < other;});
$VN_1.$def('<=',function(self,_cmd,other){
return self <= other;});
$VN_1.$def('~',function(self,_cmd){
});
$VN_1.$def('&',function(self,_cmd,other){
return self & other;});
$VN_1.$def('|',function(self,_cmd,other){
return self | other;});
$VN_1.$def('^',function(self,_cmd){
});
$VN_1.$def('[]',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd,other){
return self << other});
$VN_1.$def('>>',function(self,_cmd){
});
$VN_1.$def('to_f',function(self,_cmd){
});


Array.prototype.$klass = cArray
Array.prototype.$type = VN.ARRAY;

RModule.include(cArray, mEnumerable);

cArray.$define_alloc_func(function() {
  return new Array();
});

cArray.$def_s('[]', function() {
  
});

cArray.$def_s('try_convert', function() {
  
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
var $VN_1 = RClass.define('Array',cObject);
$VN_1.$def('initialize',function(self,_cmd){
for (var i = 0; i < arguments.length; i++) {
      self.push(arguments[i]);
    }});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
if (self.length == 0) return '[]';
    var str = '[';
    for (var i = 0; i < (self.length - 1); i++) {
      str += (self[i].$('inspect', []) + ', ');
    }
    str += (self[self.length - 1].$('inspect', []) + ']');
    return str ;});
$VN_1.$def('inspect',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('to_a',function(self,_cmd){
return self;
});
$VN_1.$def('to_ary',function(self,_cmd){
return self;
});
$VN_1.$def('==',function(self,_cmd,ary){
if (ary == this) return true;
    if (ary.$type != VN.ARRAY) {
      if (ary.$('respond_to?', ['to_a'])) {
        return false;
      }
    }
    if (this.length != ary.length) return false ;
    return true;});
$VN_1.$def('eql?',function(self,_cmd,other){
});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('[]',function(self,_cmd,idx){
return self[idx];});
$VN_1.$def('[]=',function(self,_cmd,idx,value){
return self[idx] = value;});
$VN_1.$def('at',function(self,_cmd,index){
return self[index];});
$VN_1.$def('fetch',function(self,_cmd,index,the_default){
return self[index];});
$VN_1.$def('first',function(self,_cmd){
return self[0];});
$VN_1.$def('last',function(self,_cmd){
return self[self.length-1];});
$VN_1.$def('concat',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd,obj){
return self.push(obj);});
$VN_1.$def('push',function(self,_cmd,obj){
return self.push(obj);});
$VN_1.$def('pop',function(self,_cmd){
return self.pop();});
$VN_1.$def('shift',function(self,_cmd){
});
$VN_1.$def('unshift',function(self,_cmd){
});
$VN_1.$def('insert',function(self,_cmd){
});
$VN_1.$def('each',function(self,_cmd,block){
for (var i = 0; i < self.length; i++) {arguments[arguments.length -1](self[i]);
}return self;
});
$VN_1.$def('each_index',function(self,_cmd){
});
$VN_1.$def('reverse_each',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return self.length;});
$VN_1.$def('size',function(self,_cmd){
return self.length;});
$VN_1.$def('empty?',function(self,_cmd){
return (self.length == 0) ? true : false;});
$VN_1.$def('find_index',function(self,_cmd){
});
$VN_1.$def('rindex',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd,obj){
var idx = self.indexOf(obj);
     return idx == -1 ? idx : nil;});
$VN_1.$def('join',function(self,_cmd,sep){
return self.join(sep);});
$VN_1.$def('reverse',function(self,_cmd){
});
$VN_1.$def('reverse!',function(self,_cmd){
});
$VN_1.$def('sort',function(self,_cmd){
});
$VN_1.$def('sort!',function(self,_cmd){
});
$VN_1.$def('collect',function(self,_cmd){
});
$VN_1.$def('collect!',function(self,_cmd){
});
$VN_1.$def('map',function(self,_cmd){
});
$VN_1.$def('map!',function(self,_cmd){
});
$VN_1.$def('select',function(self,_cmd){
});
$VN_1.$def('values_at',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('delete_at',function(self,_cmd){
});
$VN_1.$def('delete_if',function(self,_cmd){
});
$VN_1.$def('reject',function(self,_cmd){
});
$VN_1.$def('reject!',function(self,_cmd){
});
$VN_1.$def('zip',function(self,_cmd){
});
$VN_1.$def('transpose',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('fill',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd,obj){
return (self.indexOf(obj) == -1) ? false : true;});
$VN_1.$def('<=>',function(self,_cmd){
});
$VN_1.$def('slice',function(self,_cmd){
});
$VN_1.$def('slice!',function(self,_cmd){
});
$VN_1.$def('assoc',function(self,_cmd){
});
$VN_1.$def('rassoc',function(self,_cmd){
});
$VN_1.$def('uniq',function(self,_cmd){
});
$VN_1.$def('uniq!',function(self,_cmd){
});
$VN_1.$def('compact',function(self,_cmd){
});
$VN_1.$def('compact!',function(self,_cmd){
});
$VN_1.$def('flatten',function(self,_cmd){
});
$VN_1.$def('flatten!',function(self,_cmd){
});
$VN_1.$def('count',function(self,_cmd){
});
$VN_1.$def('shuffle',function(self,_cmd){
});
$VN_1.$def('shuffle!',function(self,_cmd){
});
$VN_1.$def('sample',function(self,_cmd){
});
$VN_1.$def('cycle',function(self,_cmd){
});
$VN_1.$def('permutation',function(self,_cmd){
});
$VN_1.$def('combination',function(self,_cmd){
});
$VN_1.$def('product',function(self,_cmd){
});
$VN_1.$def('take',function(self,_cmd){
});
$VN_1.$def('take_while',function(self,_cmd){
});
$VN_1.$def('drop',function(self,_cmd){
});
$VN_1.$def('drop_while',function(self,_cmd){
});

Boolean.prototype.$klass = cBoolean;
Boolean.prototype.$type = VN.BOOLEAN; var $VN_1 = RClass.define('Boolean',cObject);
$VN_1.$def('to_s',function(self,_cmd){
return self ? 'true' : 'false';});
$VN_1.$def('&',function(self,_cmd,obj){
if (self) {
      return obj ? true : false ;
    }
    else {
      return false;
    }});
$VN_1.$def('|',function(self,_cmd,obj){
if (self) {
      return true ;
    }
    else {
      return obj ? true : false ;
    }});
$VN_1.$def('^',function(self,_cmd,obj){
if (self) {
      return obj ? false : true ;
    }
    else {
      return obj ? true : false ;
    }});

var RHash = function() {
  this.$klass = cHash ;
  this.$type = VN.HASH ;
  this.$keys = [] ;
  this.$values = { } ;
  this.$ifnone = nil ;
  return this;
};

RHash.prototype.$ivar_set = RObject.prototype.$ivar_set;
RHash.prototype.$ivar_get = RObject.prototype.$ivar_get;
RHash.prototype.$call = RObject.prototype.$call;
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

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
}); var $VN_1 = RClass.define('Hash',cObject);
$VN_1.$def_s('[]',function(self,_cmd){
});
$VN_1.$def_s('try_convert',function(self,_cmd){
});
$VN_1.$def('initialize',function(self,_cmd){
if (arguments.length > 0) {
      self.$ifnone = arguments[0] ;
    } });
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('rehash',function(self,_cmd){
});
$VN_1.$def('to_hash',function(self,_cmd){
return self;
});
$VN_1.$def('to_a',function(self,_cmd){
var ary = [];
    for (var i = 0; i < self.$keys.length; i++) {
      ary.push([self.$keys[i], self.$values[self.$keys[i]]]);
    }
    return ary; });
$VN_1.$def('to_s',function(self,_cmd){
if (self.$keys.length == 0) return '{...}';
  
    var str = '{' + self.$keys[0].$call('inspect', []) + '=>' + self.$values[self.$keys[0]].$call('inspect', []);
    for (var i = 1; i < self.$keys.length; i++) {
      str += (', ' + self.$keys[i].$call('inspect', []) + '=>' + self.$values[self.$keys[i]].$call('inspect', []))
    }
    str += '}';
    return str;});
$VN_1.$def('inspect',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('==',function(self,_cmd,obj){
});
$VN_1.$def('[]',function(self,_cmd,key){
if (!self.$values.hasOwnProperty(key)) {
      return VN$(self, 'default', [key]);
    }
    return self.$values[key] ;});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('eql?',function(self,_cmd){
});
$VN_1.$def('fetch',function(self,_cmd){
});
$VN_1.$def('[]=',function(self,_cmd,key,val){
return VN$(self,'store',key,val);
});
$VN_1.$def('store',function(self,_cmd,key,val){
if (self.$values[key] === undefined) {
      self.$keys.push(key);
    }
  
    self.$values[key] = val ;
    return val ;});
$VN_1.$def('default',function(self,_cmd){
return self.$ifnone});
$VN_1.$def('default=',function(self,_cmd,def_obj){
VN$(self, 'will_change_value_for_key', 'default');
self.$ifnone = ifnone;
    return ifnone;VN$(self, 'did_change_value_for_key', 'default');
});
$VN_1.$def('default_proc',function(self,_cmd){
});
$VN_1.$def('default_proc=',function(self,_cmd,proc){
VN$(self, 'will_change_value_for_key', 'default_proc');
VN$(self, 'did_change_value_for_key', 'default_proc');
});
$VN_1.$def('key',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd){
});
$VN_1.$def('size',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return VN$(self, 'size');
});
$VN_1.$def('empty?',function(self,_cmd){
});
$VN_1.$def('each_value',function(self,_cmd){
});
$VN_1.$def('each_key',function(self,_cmd){
});
$VN_1.$def('each_pair',function(self,_cmd){
});
$VN_1.$def('each',function(self,_cmd,block){
for (var i = 0; i < self.$keys.length; i++) {arguments[arguments.length -1](self.$keys[i],self.$values[self.$keys[i]]);
}return self;
});
$VN_1.$def('keys',function(self,_cmd){
});
$VN_1.$def('values',function(self,_cmd){
});
$VN_1.$def('values_at',function(self,_cmd){
});
$VN_1.$def('shift',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('delete_if',function(self,_cmd){
});
$VN_1.$def('select',function(self,_cmd){
});
$VN_1.$def('reject',function(self,_cmd){
});
$VN_1.$def('reject!',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('invert',function(self,_cmd){
});
$VN_1.$def('update',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('merge!',function(self,_cmd){
});
$VN_1.$def('merge',function(self,_cmd){
});
$VN_1.$def('assoc',function(self,_cmd){
});
$VN_1.$def('rassoc',function(self,_cmd){
});
$VN_1.$def('flatten',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd,obj){
});
$VN_1.$def('member?',function(self,_cmd,obj){
return VN$(self,'include?',obj);
});
$VN_1.$def('has_key?',function(self,_cmd,key){
if (!self.$values.hasOwnProperty(key)) {
      return false;
    }
    return true ;});
$VN_1.$def('has_value?',function(self,_cmd,val){
});
$VN_1.$def('key?',function(self,_cmd,key){
return VN$(self,'has_key?',key);
});
$VN_1.$def('value?',function(self,_cmd,val){
return VN$(self,'has_value?',val);
});
$VN_1.$def('compare_by_identity',function(self,_cmd){
});
$VN_1.$def('compare_by_identity?',function(self,_cmd){
});

String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

cString.$define_alloc_func(function() {
  return new String();
}); var $VN_1 = RClass.define('String',cObject);
$VN_1.$def('try_convert',function(self,_cmd){
});
$VN_1.$def('initialize',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('<=>',function(self,_cmd,obj){
});
$VN_1.$def('==',function(self,_cmd,obj){
return (self == obj) ? true : false;});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('hash',function(self,_cmd,obj){
});
$VN_1.$def('casecmp',function(self,_cmd,obj){
});
$VN_1.$def('+',function(self,_cmd,obj){
return self + obj;});
$VN_1.$def('*',function(self,_cmd,obj){
});
$VN_1.$def('%',function(self,_cmd,obj){
});
$VN_1.$def('[]',function(self,_cmd,key){
});
$VN_1.$def('[]=',function(self,_cmd,key,val){
});
$VN_1.$def('insert',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return self.length;});
$VN_1.$def('size',function(self,_cmd){
return self.length});
$VN_1.$def('empty?',function(self,_cmd){
});
$VN_1.$def('=~',function(self,_cmd,match){
});
$VN_1.$def('match',function(self,_cmd,match){
});
$VN_1.$def('succ',function(self,_cmd){
});
$VN_1.$def('next',function(self,_cmd){
});
$VN_1.$def('upto',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd){
});
$VN_1.$def('rindex',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('chr',function(self,_cmd){
});
$VN_1.$def('to_i',function(self,_cmd){
});
$VN_1.$def('to_f',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
return new String(self);});
$VN_1.$def('to_str',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('inspect',function(self,_cmd){
return new String('"' + self + '"');});
$VN_1.$def('dump',function(self,_cmd){
});
$VN_1.$def('upcase',function(self,_cmd){
});
$VN_1.$def('downcase',function(self,_cmd){
});
$VN_1.$def('capitalize',function(self,_cmd){
});
$VN_1.$def('swapcase',function(self,_cmd){
});
$VN_1.$def('camelize',function(self,_cmd){
var parts = self.split('_');
    var length = parts.length;

    if (length == 1) return parts[0];

    var camelized = self.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;});
$VN_1.$def('hex',function(self,_cmd){
});
$VN_1.$def('oct',function(self,_cmd){
});
$VN_1.$def('split',function(self,_cmd){
});
$VN_1.$def('lines',function(self,_cmd){
});
$VN_1.$def('bytes',function(self,_cmd){
});
$VN_1.$def('chars',function(self,_cmd){
});
$VN_1.$def('codepoints',function(self,_cmd){
});
$VN_1.$def('reverse',function(self,_cmd){
});
$VN_1.$def('concat',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd){
});
$VN_1.$def('crypt',function(self,_cmd){
});
$VN_1.$def('intern',function(self,_cmd){
});
$VN_1.$def('to_sym',function(self,_cmd){
return new String(self);});
$VN_1.$def('ord',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('start_with?',function(self,_cmd){
});
$VN_1.$def('end_with?',function(self,_cmd){
});
$VN_1.$def('scan',function(self,_cmd){
});
$VN_1.$def('ljust',function(self,_cmd){
});
$VN_1.$def('rjust',function(self,_cmd){
});
$VN_1.$def('center',function(self,_cmd){
});
$VN_1.$def('sub',function(self,_cmd){
});
$VN_1.$def('gsub',function(self,_cmd){
});
$VN_1.$def('chop',function(self,_cmd){
});
$VN_1.$def('chomp',function(self,_cmd){
});
$VN_1.$def('strip',function(self,_cmd){
});
$VN_1.$def('lstrip',function(self,_cmd){
});
$VN_1.$def('rstrip',function(self,_cmd){
});
$VN_1.$def('tr',function(self,_cmd){
});
$VN_1.$def('tr_s',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('squeeze',function(self,_cmd){
});
$VN_1.$def('count',function(self,_cmd){
});
$VN_1.$def('each_line',function(self,_cmd){
});
$VN_1.$def('each_byte',function(self,_cmd){
});
$VN_1.$def('each_char',function(self,_cmd){
});
$VN_1.$def('each_codepoint',function(self,_cmd){
});
$VN_1.$def('sum',function(self,_cmd){
});
$VN_1.$def('slice!',function(self,_cmd){
});
$VN_1.$def('partition',function(self,_cmd){
});
$VN_1.$def('rpartition',function(self,_cmd){
});
// require('core/struct');
// require('core/regexp');


VN.$r = function(start, ending, exclusive) {
  return VN$(cRange, 'new', start, ending, exclusive);
}
var $VN_1 = RClass.define('Range',cObject);
$VN_1.$def('initialize',function(self,_cmd,start,ending,exclusive){
self.$i_s('@start',start);
return self.$i_s('@ending',ending);
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd,obj){
});
$VN_1.$def('===',function(self,_cmd,obj){
});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('each',function(self,_cmd,block){
for (var i = self.$i_g('@start'); i <= self.$i_g('@ending'); i++) {
      VN$(block, 'call', i);
    }return self;
});
$VN_1.$def('step',function(self,_cmd){
});
$VN_1.$def('begin',function(self,_cmd){
});
$VN_1.$def('end',function(self,_cmd){
});
$VN_1.$def('first',function(self,_cmd){
});
$VN_1.$def('last',function(self,_cmd){
});
$VN_1.$def('min',function(self,_cmd){
});
$VN_1.$def('max',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('inspect',function(self,_cmd){
});
$VN_1.$def('exclude_end?',function(self,_cmd){
});
$VN_1.$def('member?',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('cover?',function(self,_cmd){
});
// require('core/time');


Function.prototype.$klass = cProc
Function.prototype.$type = VN.PROC;
var $VN_1 = RClass.define('Proc',cObject);
$VN_1.$def_s('new',function(self,_cmd){
});
$VN_1.$def('call',function(self,_cmd){
return self.apply(self, [arguments[2]]);;
});
$VN_1.$def('[]',function(self,_cmd){
});
$VN_1.$def('===',function(self,_cmd){
});
$VN_1.$def('yield',function(self,_cmd){
});
$VN_1.$def('to_proc',function(self,_cmd){
});
$VN_1.$def('arity',function(self,_cmd){
});
$VN_1.$def('clone',function(self,_cmd){
});
$VN_1.$def('dup',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd){
});
$VN_1.$def('eql?',function(self,_cmd){
});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('lambda?',function(self,_cmd){
});
$VN_1.$def('binding',function(self,_cmd){
});
$VN_1.$def('curry',function(self,_cmd){
});
$VN_1.$def('source_location',function(self,_cmd){
});

var mMath = RModule.define('Math');

mMath.$define_const('PI', 3.142);
mMath.$define_const('E', 0.000001);var $VN_1 = RModule.define('Math');
$VN_1.$def_s('min',function(self,_cmd,a,b){
return VN$(a,'<',b) ? a : b;
});
$VN_1.$def_s('max',function(self,_cmd,a,b){
return VN$(a,'>',b) ? a : b;
});
// require('core/enumerator');
// 


VN.self = VN.obj_alloc(cObject);
VN.self.$def_s('to_s', function() { 
  return 'main' ;}
);
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
 
var VN$ENVhash = VN.$h();
for (prop in VN$ENV) {
  VN$(VN$ENVhash, '[]=', prop, VN$ENV[prop]);
}

cObject.$c_s('ENV', VN$ENVhash);


var $VN_1 = RClass.define('NilClass',cObject);
$VN_1.$def('nil?',function(self,_cmd){
return true;
});
$VN_1.$def('to_i',function(self,_cmd){
return 0;
});
$VN_1.$def('to_f',function(self,_cmd){
return 0.0;
});
$VN_1.$def('to_s',function(self,_cmd){
return 'nil';
});
$VN_1.$def('to_a',function(self,_cmd){
return [];
});
$VN_1.$def('inspect',function(self,_cmd){
return 'nil';
});
$VN_1.$def('&',function(self,_cmd,other){
return false;
});
$VN_1.$def('|',function(self,_cmd,other){
});
$VN_1.$def('^',function(self,_cmd,other){
});
nil = VN$(cObject.$k_g('NilClass'), 'new');
nil.toString = function() { return 'nil';};


var $VN_1 = RClass.define('Document',cObject);
$VN_1.$def_s('ready?',function(self,_cmd,block){
});
$VN_1.$def_s('<<',function(self,_cmd,elem){
var e = elem.$i_g('@element');
document.body.appendChild(e);});
$VN_1.$def_s('add_event_listener',function(self,_cmd,type,listener){
self.$i_s('@event_listeners',ORTEST(self.$i_g('@event_listeners'),VN.$h()));
VN$(self.$i_g('@event_listeners'),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(type, listener, false);
    }
    else {
      document.body.attachEvent('on' + type, listener);
    }});
$VN_1.$def_s('remove_event_listener',function(self,_cmd,type){
var listener = VN$(self.$i_g('@event_listeners'),'[]',type);
if (document.addEventListener) {
      document.body.removeEventListener(type, listener, false);
    }
    else {
      document.body.detachEvent('on' + type, listener);
    }});
$VN_1.$c_g_full('Document').$def_s('age',function(self,_cmd){
return 3;
});

var $VN_1 = RClass.define('Element',cObject);
VN$($VN_1,'attr_accessor','element');
$VN_1.$def_s('find',function(self,_cmd,the_id){
document.getElementById(the_id)});
$VN_1.$def('initialize',function(self,_cmd,type,options){
self.$i_s('@element',document.createElement(type));
return self.$i_s('@type',type);
});
$VN_1.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_1.$def('class_name=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'class_name');
VN$(self, 'element').className = name;VN$(self, 'did_change_value_for_key', 'class_name');
});
$VN_1.$def('css',function(self,_cmd,options){
VN$(options,'each',function(key,value){
VN$(self, 'element').style[VN$(key,'camelize')] = value;});
return self;
});
$VN_1.$def('set_attribute',function(self,_cmd,key,value){
VN$(self, 'element').setAttribute(key, value);});
$VN_1.$def('src=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'src');
VN$(self, 'element').src = obj;VN$(self, 'did_change_value_for_key', 'src');
});
$VN_1.$def('inner_text=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'inner_text');
VN$(self, 'element').innerHTML = str;VN$(self, 'did_change_value_for_key', 'inner_text');
});
$VN_1.$def('frame=',function(self,_cmd,new_frame){
VN$(self, 'will_change_value_for_key', 'frame');
VN$(self,'origin=',VN$(new_frame,'origin'));
VN$(self,'size=',VN$(new_frame,'size'));
VN$(self, 'did_change_value_for_key', 'frame');
});
$VN_1.$def('origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'origin');
VN$(self, 'element').style.left = VN$(new_origin,'x') + 'px';VN$(self, 'element').style.top = VN$(new_origin,'y') + 'px';VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_1.$def('size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'size');
if(RTEST(VN$(self.$i_g('@type'),'==','canvas'))){
VN$(self, 'element').width = VN$(new_size,'width');VN$(self, 'element').height = VN$(new_size,'height');}
else{
VN$(self, 'element').style.width = VN$(new_size,'width') + 'px';VN$(self, 'element').style.height = VN$(new_size,'height') + 'px';}
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_1.$def('<<',function(self,_cmd,other){
if(RTEST(VN$(other,'instance_of?',self.$klass.$c_g_full('String')))){
VN$(self, 'element').innerHTML += other;}
else{
VN$(self, 'element').appendChild(VN$(other,'element'));}
});
$VN_1.$def('inner_html=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'inner_html');
VN$(self, 'element').innerHTML = str;VN$(self, 'did_change_value_for_key', 'inner_html');
});
$VN_1.$def('add_event_listener',function(self,_cmd,type,listener){
if (document.addEventListener) {
      VN$(self, 'element').addEventListener(type, listener, false);
    }
    else {
      VN$(self, 'element').attachEvent('on' + type, listener);
    }});

var $VN_1 = RClass.define('JSON',cObject);
$VN_1.$def('initialize',function(self,_cmd,url,options,block){
});
$VN_1.$def_s('get',function(self,_cmd,url,options,block){
return VN$(self.$c_g_full('JSONP'),'get',url,options,block);
});
var $VN_1 = RClass.define('JSONP',cObject);
$VN_1.$c_s('JSONP_CALLBACKS',[]);
$VN_1.$def('initialize',function(self,_cmd,url,options,block){
self.$i_s('@url',url);
self.$i_s('@callback',"vn_jsonp_callback_0");
self.$i_s('@block',block);
VN$(self.$klass.$c_g_full('JSONP_CALLBACKS'),'<<',self.$i_g('@callback'));
VN$(self,'puts',["Initializing JSNOP connection with url: ",(self.$i_g('@url'))].join(''));
return VN$(self, 'get!');
});
$VN_1.$def('get!',function(self,_cmd){
window[self.$i_g('@callback')] = function(response) {
      VN$(self, 'got_response', response);
    };self.$i_s('@script',document.createElement('script'));
self.$i_g('@script').setAttribute('type', 'text/javascript');self.$i_g('@script').setAttribute('src', self.$i_g('@url'));document.body.appendChild(self.$i_g('@script'));});
$VN_1.$def('got_response',function(self,_cmd,response){
VN$(self,'puts','got response! toot!');
return VN$(self.$i_g('@block'),'call',JSONParserReformatter(response));
});
$VN_1.$def_s('get',function(self,_cmd,url,options,block){
return VN$(self,'new',url,options,block);
});

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

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('VERSION','0.0.1');
$VN_1.$def_s('version',function(self,_cmd){
return self.$c_g_full('VERSION');
});
$VN_1.$def_s('display_mode',function(self,_cmd){
return 'render';});
$VN_1.$def('app',function(self,_cmd){
});
cObject.$c_s('VN',cObject.$c_g('Vienna'));
cObject.$c_s('YES',true);
cObject.$c_s('NO',false);

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('Object',cObject.$c_g('Object'));
$VN_1.$c_s('Array',cObject.$c_g('Array'));
$VN_1.$c_s('Dictionary',cObject.$c_g('Hash'));
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('initialize',function(self,_cmd){
});
$VN_2.$def('perform_selector:with_object:with_object:',function(self,_cmd,selector,obj1,obj2){
return VN$(self, selector, obj1, obj2);});
$VN_2.$def('perform_selector:with_object:',function(self,_cmd,selector,obj){
return VN$(self, selector, obj);});
$VN_2.$def('perform_selector',function(self,_cmd,selector){
return VN$(self, selector);});

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('access_instance_variables_directly?',function(self,_cmd){
return true;
});
$VN_2.$def('value_for_key',function(self,_cmd,key){
var accessor = key;
if(RTEST(VN$(self,'respond_to?',accessor))){
return VN$(self,'perform_selector',accessor);
}
accessor = [(key),"?"].join('');
if(RTEST(VN$(self,'respond_to?',accessor))){
return VN$(self,'perform_selector',accessor);
}
if(RTEST(VN$(VN$(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return VN$(self,'value_for_undefined_key',key);
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
var accessor = [(key),"="].join('');
if(RTEST(VN$(self,'respond_to?',accessor))){
VN$(self,'perform_selector:with_object:',accessor,value);
return value;
}
if(RTEST(VN$(VN$(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {VN$(self,'will_change_value_for_key',key);
self.$iv_tbl['@' + key] = value;VN$(self,'did_change_value_for_key',key);
return value;
}}
return VN$(self,'set_value:for_undefined_key:',value,key);
});
$VN_2.$def('validate_value:for_key:error:',function(self,_cmd,value,key,out_error){
});
$VN_2.$def('array_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('value_for_key_path',function(self,_cmd,path){
return VN$(self,'value_for_key',path);
});
$VN_2.$def('set_value:for_key_path:',function(self,_cmd,value,path){
return VN$(self,'set_value:for_key:',value,path);
});
$VN_2.$def('validate_value:for_key_path:error:',function(self,_cmd,value,path,out_error){
});
$VN_2.$def('array_value_for_key_path',function(self,_cmd,path){
});
$VN_2.$def('set_value_for_key_path',function(self,_cmd,path){
});
$VN_2.$def('value_for_undefined_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_undefined_key:',function(self,_cmd,value,key){
});
$VN_2.$def('set_nil_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('dictionary_with_values_for_keys',function(self,_cmd,keys){
});
$VN_2.$def('set_values_for_keys_with_dictionary',function(self,_cmd,keyed_values){
});
var $VN_2 = RClass.define_under($VN_1, 'Array',cObject);
$VN_2.$def('value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
});
var $VN_2 = RClass.define_under($VN_1, 'Dictionary',cObject);
$VN_2.$def('value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
});
var $VN_2 = RClass.define_under($VN_1, 'Set',cObject);
$VN_2.$def('value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(self,_cmd,path,object,change,context){
});
$VN_2.$def('add_observer:for_key_path:options:context:',function(self,_cmd,observer,key_path,options,context){
return VN$(self.$i_g('@kvo_observers'),'<<',VN.$h('observer', observer, 'key_path', key_path, 'options', options, 'context', context));
});
$VN_2.$def('remove_observer:for_key_path:',function(self,_cmd,observer,key_path){
});
var $VN_2 = RClass.define_under($VN_1, 'Array',cObject);
$VN_2.$def('add_observer:to_objects_at_indexes:for_key_path:options:context:',function(self,_cmd,observer,indexes,key_path,options,context){
});
$VN_2.$def('remove_observer:from_objects_at_indexes:for_key_path:',function(self,_cmd,observer,indexes,keyPath){
});
$VN_2.$def('add_observer:for_key_path:options:context:',function(self,_cmd,observer,key_path,options,context){
});
$VN_2.$def('remove_observer:for_key_path:',function(self,_cmd,observer,key_path){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('will_change_value_for_key',function(self,_cmd,key){
return VN$(self.$i_g('@kvo_old_values'),'[]=',key,VN$(self,'value_for_key',key));
});
$VN_2.$def('did_change_value_for_key',function(self,_cmd,key){
return VN$(self.$i_g('@kvo_observers'),'each',function(current){
if(RTEST(VN$(VN$(current,'[]','key_path'),'==',key))){
var change_dict = VN.$h('old', VN$(self.$i_g('@kvo_old_values'),'[]',key), 'new', VN$(self,'value_for_key',key));
VN$(VN$(current,'[]','observer'),'observe_value_for_key_path:of_object:change:context:',key,self,change_dict,VN$(current,'[]','context'));
}
});
});
$VN_2.$def('will_change:values_at_indexes:for_key:',function(self,_cmd,changeKind,indexes,key){
});
$VN_2.$def('did_change:values_at_indexes:for_key:',function(self,_cmd,changeKind,indexes,key){
});
$VN_2.$def_s('key_paths_for_values_affecting_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('automatically_notifies_observers_for_key',function(self,_cmd,key){
return true;
});
$VN_2.$def('observation_info=',function(self,_cmd,info){
VN$(self, 'will_change_value_for_key', 'observation_info');
self.$i_s('@observation_info',info);
VN$(self, 'did_change_value_for_key', 'observation_info');
});
$VN_2.$def('observation_info',function(self,_cmd){
return self.$i_g('@observation_info');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Notification',cObject);
VN$($VN_2,'attr_reader','name','object','user_info');
VN$($VN_2,'attr_writer','name','object','user_info');
$VN_2.$def('initialize',function(self,_cmd,name,obj,info){
VN$sup(arguments.callee, self,_cmd,[]);
self.$i_s('@name',name);
self.$i_s('@object',obj);
return self.$i_s('@user_info',info);
});
$VN_2.$def_s('notification_with_name:object:',function(self,_cmd,name,obj){
return VN$(self,'notification_with_name:object:user_info:',name,obj,nil);
});
$VN_2.$def_s('notification_with_name:object:user_info:',function(self,_cmd,name,obj,info){
return VN$(self,'new',name,obj,info);
});
var $VN_2 = RClass.define_under($VN_1, 'NotificationCenter',cObject);
$VN_2.$def_s('default_center',function(self,_cmd){
return self.$i_s('@default_center',ORTEST(self.$i_g('@default_center'),VN$(self,'new')));
});
$VN_2.$def('initialize',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@dispatch_table',[]);
});
$VN_2.$def('add_observer:selector:name:object:',function(self,_cmd,observer,selector,name,obj){
return VN$(self.$i_g('@dispatch_table'),'<<',VN.$h('observer', observer, 'selector', selector, 'name', name, 'sender', obj, 'active', true));
});
$VN_2.$def('post_notification',function(self,_cmd,notification){
return VN$(self,'post_notification_name:object:user_info:',VN$(notification,'name'),VN$(notification,'object'),VN$(notification,'user_info'));
});
$VN_2.$def('post_notification_name:object:',function(self,_cmd,name,obj){
return VN$(self,'post_notification_name:object:user_info:',name,obj,nil);
});
$VN_2.$def('post_notification_name:object:user_info:',function(self,_cmd,name,obj,info){
return VN$(self.$i_g('@dispatch_table'),'each',function(the_obj){
if(RTEST(VN$(VN$(the_obj,'[]','name'),'==',name))){
VN$(VN$(the_obj,'[]','observer'),'perform_selector:with_object:with_object:',VN$(the_obj,'[]','selector'),obj,info);
}
});
});
$VN_2.$def('remove_observer',function(self,_cmd,observer){
});
$VN_2.$def('remove_observer:name:object:',function(self,_cmd,observer,name,obj){
});
$VN_2.$def('add_observer_for_name:object:queue:',function(self,_cmd,name,obj,queue){
});


var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Responder',cObject);
$VN_2.$def('initialize',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@next_responder',nil);
});
$VN_2.$def('next_responder=',function(self,_cmd,a_responder){
VN$(self, 'will_change_value_for_key', 'next_responder');
self.$i_s('@next_responder',a_responder);
VN$(self, 'did_change_value_for_key', 'next_responder');
});
$VN_2.$def('next_responder',function(self,_cmd){
return self.$i_g('@next_responder');
});
$VN_2.$def('try_to_perform:with:',function(self,_cmd,an_action,an_object){
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,the_event){
return false;
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_down',the_event);
});
$VN_2.$def('right_mouse_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'right_mouse_down',the_event);
});
$VN_2.$def('other_mouse_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'other_mouse_down',the_event);
});
$VN_2.$def('mouse_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_up',the_event);
});
$VN_2.$def('right_mouse_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'right_mouse_up',the_event);
});
$VN_2.$def('other_mouse_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'other_mouse_up',the_event);
});
$VN_2.$def('mouse_moved',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_moved',the_event);
});
$VN_2.$def('mouse_dragged',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_dragged',the_event);
});
$VN_2.$def('scroll_wheel',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'scroll_wheel',the_event);
});
$VN_2.$def('right_mouse_dragged',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'right_mouse_dragged',the_event);
});
$VN_2.$def('other_mouse_dragged',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'other_mouse_dragged',the_event);
});
$VN_2.$def('mouse_entered',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_entered',the_event);
});
$VN_2.$def('mouse_exited',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_exited',the_event);
});
$VN_2.$def('key_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'key_down',the_event);
});
$VN_2.$def('key_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'key_up',the_event);
});
$VN_2.$def('flags_changed',function(self,_cmd,the_event){
});
$VN_2.$def('cursor_update',function(self,_cmd,the_event){
});
$VN_2.$def('no_responder_for',function(self,_cmd,event_selector){
});
$VN_2.$def('accepts_first_responder',function(self,_cmd){
return false;
});
$VN_2.$def('become_first_responder',function(self,_cmd){
return true;
});
$VN_2.$def('resign_first_responder',function(self,_cmd){
return true;
});
$VN_2.$def('interpret_key_events',function(self,_cmd,event_array){
});
$VN_2.$def('flush_buffered_key_events',function(self,_cmd){
});
$VN_2.$def('menu=',function(self,_cmd,menu){
VN$(self, 'will_change_value_for_key', 'menu');
self.$i_s('@menu',menu);
VN$(self, 'did_change_value_for_key', 'menu');
});
$VN_2.$def('menu',function(self,_cmd){
return self.$i_g('@menu');
});
$VN_2.$def('show_context_help',function(self,_cmd,sender){
});
$VN_2.$def('help_requested',function(self,_cmd,the_event){
});
$VN_2.$def('undo_manager',function(self,_cmd){
return VN$(self.$i_g('@next_responder'),'undo_manager');
});

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
$VN_1.$c_s('RUN_LOOP_MODES',VN.$h('normal', 0, 'modal_panel', 1, 'event_tracking', 2));
var $VN_2 = RClass.define_under($VN_1, 'Application',cObject);
VN$($VN_2,'attr_accessor','windows','event_queue','views_needing_display');
VN$($VN_2,'attr_reader','delegate');
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@windows',[]);
self.$i_s('@event_queue',[]);
self.$i_s('@views_needing_display',[]);
self.$i_s('@delegate',nil);
return self.$i_s('@run_loop_mode','normal');
});
$VN_2.$def('run_loop_mode',function(self,_cmd){
return self.$i_g('@run_loop_mode');
});
$VN_2.$def('bind_events',function(self,_cmd,types,block){
self.$i_s('@run_loop_mode','event_tracking');
self.$i_s('@event_binding_mask',types);
self.$i_s('@event_binding_block',block);
self.$i_s('@event_binding_window',VN$(VN$(self,'current_event'),'window'));
if(RTEST(VN$(types,'include?','left_mouse_dragged'))){
VN$(self.$klass.$c_g_full('Document'),'add_event_listener','mousemove',function(evt){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,'left_mouse_dragged');
return VN$(self,'send_event',the_event);
});
}
});
$VN_2.$def('unbind_events',function(self,_cmd){
self.$i_s('@run_loop_mode','normal');
if(RTEST(VN$(self.$i_g('@event_binding_mask'),'include?','left_mouse_dragged'))){
VN$(self.$klass.$c_g_full('Document'),'remove_event_listener','mousemove');
}
});
$VN_2.$def('current_event',function(self,_cmd){
return self.$i_g('@current_event');
});
$VN_2.$def('send_event',function(self,_cmd,the_event){
self.$i_s('@current_event',the_event);
if(RTEST(VN$(self.$i_g('@run_loop_mode'),'==','event_tracking'))){
if(RTEST(VN$(self.$i_g('@event_binding_mask'),'include?',VN$(the_event,'type')))){
VN$(the_event,'window=',self.$i_g('@event_binding_window'));
VN$(self.$i_g('@event_binding_block'),'call',the_event);
}
return ;
}
return VN$(VN$(the_event,'window'),'send_event',the_event);
});
$VN_2.$def('mark_view_for_display',function(self,_cmd,view,flag){
if(!RTEST(VN$(self.$i_g('@views_needing_display'),'contains?',view))){
VN$(self.$i_g('@views_needing_display'),'<<',view);
}
});
$VN_2.$def('display_required_views',function(self,_cmd){
VN$(self.$i_g('@views_needing_display'),'each',function(view){
return VN$(view,'draw_rect');
});
return self.$i_s('@views_needing_display',[]);
});
$VN_2.$def('add_window',function(self,_cmd,window){
return 0;
});
$VN_2.$def('<<',function(self,_cmd,window){
return VN$(self,'add_window',window);
});
$VN_2.$def_s('shared_application',function(self,_cmd){
return self.$i_s('@app',ORTEST(self.$i_g('@app'),VN$(self,'new')));
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'delegate');
if(RTEST(VN$(self.$i_g('@delegate'),'==',obj))){
return ;
}
var nc = VN$(self.$klass.$c_g_full('VN').$c_g('NotificationCenter'),'default_center');
if(RTEST(self.$i_g('@delegate'))){
VN$(nc,'remove_observer:name:object:',self.$i_g('@delegate'),self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
VN$(nc,'remove_observer:name:object:',self.$i_g('@delegate'),self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
VN$(nc,'remove_observer:name:object:',self.$i_g('@delegate'),self.$klass.$c_g_full('APP_DID_CHANGE_SCREEN_PARAMETERS'),self);
}
self.$i_s('@delegate',obj);
if(RTEST(VN$(self.$i_g('@delegate'),'respond_to?','will_finish_launching'))){
VN$(nc,'add_observer:selector:name:object:',self.$i_g('@delegate'),'will_finish_launching',self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
}
if(RTEST(VN$(self.$i_g('@delegate'),'respond_to?','did_finish_launching'))){
VN$(nc,'add_observer:selector:name:object:',self.$i_g('@delegate'),'did_finish_launching',self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
}
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('running?',function(self,_cmd){
return true;
});
$VN_2.$def('finish_launching',function(self,_cmd){
if(RTEST(self.$i_g('@run_block'))){
VN$(self.$i_g('@run_block'),'call',self);
}
VN$(self.$klass.$c_g_full('Document'),'add_event_listener','mousedown',function(evt){
if(RTEST(VN$(VN$(self.$klass.$c_g_full('App'),'run_loop_mode'),'==','event_tracking'))){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,'left_mouse_down');
VN$(self,'puts','sending event from here');
VN$(self,'send_event',the_event);
}
});
VN$(self.$klass.$c_g_full('Document'),'add_event_listener','mouseup',function(evt){
if(RTEST(VN$(VN$(self.$klass.$c_g_full('App'),'run_loop_mode'),'==','event_tracking'))){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,'left_mouse_up');
VN$(self,'send_event',the_event);
}
});
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
return VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
});
$VN_2.$def('run',function(self,_cmd,block){
return self.$i_s('@run_block',block);
});
$VN_2.$def('send_action:to:from:',function(self,_cmd,action,target,sender){
});
$VN_1.$c_s('App',VN$($VN_1.$c_g_full('Application'),'shared_application'));
window.onload = function() {VN$(cObject.$c_g('VN').$c_g('App'),'finish_launching');
};
var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('EVENT_TYPES',VN.$h('left_mouse_down', 1, 'left_mouse_up', 2, 'right_mouse_down', 3, 'right_mouse_up', 4, 'mouse_moved', 5, 'left_mouse_dragged', 6, 'right_mouse_dragged', 7, 'mouse_entered', 8, 'mouse_exited', 9, 'key_down', 10, 'key_up', 11, 'flags_changed', 12, 'app_kit_defined', 13, 'system_defined', 14, 'application_defined', 15, 'periodic', 16, 'cursor_update', 17, 'scroll_wheel', 22, 'other_mouse_down', 25, 'other_mouse_up', 26, 'other_mouse_dragged', 27));
var $VN_2 = RClass.define_under($VN_1, 'Event',cObject);
$VN_2.$def_s('from_native_event:with_window:with_type:',function(self,_cmd,event,win,type){
var obj = VN$(self,'allocate');
VN$(obj,'initialize_with_native_event:with_window:with_type:',event,win,type);
return obj;
});
$VN_2.$def('initialize_with_native_event:with_window:with_type:',function(self,_cmd,event,win,type){
self.$i_s('@event',event);
self.$i_s('@window',win);
return self.$i_s('@type',type);
});
$VN_2.$def('stop_propagation',function(self,_cmd){
var event = self.$i_g('@event');
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
$VN_2.$def('allows_propagation?',function(self,_cmd){
return self.$i_g('@event')._vn_allow_event_propagation? true : false;});
$VN_2.$def('allows_propagation=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_propagation');
self.$i_g('@event')._vn_allow_event_propagation = flag;VN$(self, 'did_change_value_for_key', 'allows_propagation');
});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('modifier_flags',function(self,_cmd){
});
$VN_2.$def('timestamp',function(self,_cmd){
});
$VN_2.$def('window=',function(self,_cmd,a_window){
VN$(self, 'will_change_value_for_key', 'window');
self.$i_s('@window',a_window);
VN$(self, 'did_change_value_for_key', 'window');
});
$VN_2.$def('window',function(self,_cmd){
return self.$i_g('@window');
});
$VN_2.$def('window_number',function(self,_cmd){
return VN$(self.$i_g('@window'),'window_number');
});
$VN_2.$def('context',function(self,_cmd){
});
$VN_2.$def('click_count',function(self,_cmd){
});
$VN_2.$def('button_number',function(self,_cmd){
});
$VN_2.$def('event_number',function(self,_cmd){
});
$VN_2.$def('location_in_window',function(self,_cmd){
return VN$(self.$i_g('@window'),'convert_screen_to_base',VN$(self.$klass.$c_g_full('Point'),'new',self.$i_g('@event').clientX,self.$i_g('@event').clientY));
});
$VN_2.$def('characters',function(self,_cmd){
});
$VN_2.$def('characters_ignoring_modifiers',function(self,_cmd){
});
$VN_2.$def('repeat?',function(self,_cmd){
});
$VN_2.$def('key_code',function(self,_cmd){
});
$VN_2.$def('tracking_number',function(self,_cmd){
});
$VN_2.$def('user_data',function(self,_cmd){
});
$VN_2.$def('tracking_area',function(self,_cmd){
});
$VN_2.$def_s('mouse_location',function(self,_cmd){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('expose_binding',function(self,_cmd,binding){
});
$VN_2.$def('exposed_bindings',function(self,_cmd){
return [];
});
$VN_2.$def('value_class_for_binding',function(self,_cmd,binding){
});
$VN_2.$def('bind:to_object:with_key_path:options:',function(self,_cmd,binding,observable,key_path,options){
if(!RTEST(VN$(VN$(self, 'exposed_bindings'),'include?',binding))){
VN$(self,'puts',["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!RTEST(ANDTEST(observable,key_path))){
VN$(self,'puts',["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
VN$(self,'unbind',binding);
VN$(observable,'add_observer:for_key_path:options:context:',self,key_path,options,binding);
VN$(self.$i_g('@kvb_info'),'[]=',binding,VN.$h('observed_object', observable, 'observed_key_path', key_path, 'options', options, 'key', binding));
return VN$(self,'set_value_for_binding',binding);
});
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(self,_cmd,path,object,change,context){
if(RTEST(VN$(self,'info_for_binding',context))){
VN$(self,'puts',['KVB: received notification for chnage of context ',(context)].join(''));
VN$(self,'set_value_for_binding',context);
}
});
$VN_2.$def('set_value_for_binding',function(self,_cmd,binding){
var dict = VN$(self,'info_for_binding',binding);
var obj = VN$(dict,'[]','observed_object');
var path = VN$(dict,'[]','observed_key_path');
var key = VN$(dict,'[]','key');
var value = VN$(obj,'value_for_key_path',path);
return VN$(self,'set_value:for_key:',value,key);
});
$VN_2.$def('propagate_binding',function(self,_cmd,binding){
var binding_dict = VN$(self,'info_for_binding',binding);
if(!RTEST(binding_dict)){
return nil;
}
var obj = VN$(VN$(self, 'dict'),'[]','observed_object');
var path = VN$(VN$(self, 'dict'),'[]','observed_key_path');
var value = VN$(self,'value_for_key',VN$(VN$(self, 'dict'),'[]','key'));
return VN$(obj,'set_value:for_key_path:',value,path);
});
$VN_2.$def('unbind',function(self,_cmd,binding){
});
$VN_2.$def('info_for_binding',function(self,_cmd,binding){
return VN$(self.$i_g('@kvb_info'),'[]',binding);
});
$VN_2.$def('set_info:for_binding:',function(self,_cmd,info,binding){
return VN$(self.$i_g('@kvb_info'),'[]=',binding,info);
});
$VN_2.$def('option_descriptions_for_binding',function(self,_cmd,binding){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('set_default_placeholder:for_marker:with_binding:',function(self,_cmd,placeholder,marker,binding){
});
$VN_2.$def('default_placeholder_for_marker:with_binding:',function(self,_cmd,marker,binding){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('object_did_begin_editing',function(self,_cmd,editor){
});
$VN_2.$def('object_did_end_editing',function(self,_cmd,editor){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('discard_editing',function(self,_cmd){
});
$VN_2.$def('commit_editing?',function(self,_cmd){
});
$VN_2.$def('editor:did_commit:context_info:',function(self,_cmd,editor,did_commit,context_info){
});
$VN_2.$def('commit_editing_with_delegate:did_commit_selector:context_info:',function(self,_cmd,delegate,did_commit_selector,context_info){
});
$VN_1.$c_s('BINDING_NAMES',VN.$h('alignment', '', 'alternate_image', '', 'alternate_title', '', 'animate_binding', '', 'animation_delay', '', 'argument', '', 'attributed_string', '', 'content_array', '', 'content_array_for_multiple_selection', '', 'content', '', 'content_dictionary', '', 'content_height', '', 'content_object', '', 'content_objects', '', 'content_set', '', 'content_values', '', 'content_width', '', 'critical_value', '', 'data', '', 'display_pattern_title', '', 'display_pattern_value', '', 'document_edited', '', 'double_click_argument', '', 'double_click_target', '', 'editable', '', 'enabled', '', 'excluded_keys', '', 'filter_predicate', '', 'font', '', 'font_bold', '', 'font_family_name', '', 'font_italic', '', 'font_name', '', 'font_size', '', 'header_title', '', 'hidden', '', 'image', '', 'included_keys', '', 'initial_key', '', 'initial_value', '', 'is_intermediate', '', 'label', '', 'localized_key_dictionary', '', 'managed_object_context', '', 'maximum_recents', '', 'max_value', '', 'max_width', '', 'min_value', '', 'min_width', '', 'mixed_state_image', '', 'off_state_image', '', 'on_state_image', '', 'predicate', '', 'recent_searches', '', 'represented_filename', '', 'row_height', '', 'selected_identifier', '', 'selected_index', '', 'selected_label', '', 'selected_object', '', 'selected_objects', '', 'selected_tag', '', 'selected_value', '', 'selected_values', '', 'selection_indexes', '', 'selection_index_paths', '', 'sort_descriptors', '', 'target', '', 'text_color', '', 'title', '', 'tool_tip', '', 'transparent', '', 'value', '', 'value_path', '', 'value_url', '', 'visible', '', 'warning_value', '', 'width', ''));
$VN_1.$c_s('BINDING_OPTIONS',VN.$h('allows_editing_multiple_values_selection', '', 'allows_null_argument', '', 'always_presents_application_modal_alerts', '', 'conditionally_sets_editable', '', 'conditionally_sets_enabled', '', 'conditionally_sets_hidden', '', 'continuously_updates_value', '', 'creates_sort_descriptor', '', 'deletes_objects_on_remove', '', 'display_name', '', 'display_pattern', '', 'content_placement_tag', '', 'handles_content_as_compound_value', '', 'inserts_null_placeholder', '', 'invokes_separately_with_array_objects', '', 'multiple_values_placeholder', '', 'no_selection_placeholder', '', 'not_applicable_placeholder', '', 'null_placeholder', '', 'raises_for_not_applicable_keys', '', 'predicate_format', '', 'selector_name', '', 'selects_all_when_setting_content', '', 'validates_immediately', '', 'value_transformer_name', '', 'value_transformer', ''));

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TrackingArea',cObject);
VN$($VN_2,'attr_reader','rect','options','owner','user_info');
$VN_2.$def('initialize',function(self,_cmd,rect,options,owner,user_info){
self.$i_s('@rect',rect);
self.$i_s('@options',options);
self.$i_s('@owner',owner);
return self.$i_s('@user_info',user_info);
});
$VN_2.$def_s('tracking_area_with_rect:options:owner:user_info:',function(self,_cmd,rect,options,owner,user_info){
return VN$(self,'new',rect,options,owner,user_info);
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'GraphicsContext',cObject);
$VN_2.$def('initialize',function(self,_cmd,graphics_port,flip_state){
self.$i_s('@ctx',graphics_port);
return self.$i_s('@flip_state',flip_state);
});
$VN_2.$def('graphics_port',function(self,_cmd){
return self.$i_g('@ctx');
});
$VN_2.$def('graphics_port=',function(self,_cmd,graphics_port){
VN$(self, 'will_change_value_for_key', 'graphics_port');
self.$i_s('@ctx',graphics_port);
VN$(self, 'did_change_value_for_key', 'graphics_port');
});
$VN_2.$def('flipped?',function(self,_cmd){
return self.$i_g('@flip_state');
});
$VN_2.$def_s('current_context',function(self,_cmd){
return self.$k_g('@@current_context');
});
$VN_2.$def_s('current_context=',function(self,_cmd,context){
return self.$k_s('@@current_context',context);
});
$VN_2.$def('save_graphics_state',function(self,_cmd){
});
$VN_2.$def('restore_graphics_state',function(self,_cmd){
});
$VN_2.$def('line_width=',function(self,_cmd,width){
VN$(self, 'will_change_value_for_key', 'line_width');
self.$i_g('@ctx').lineWidth = widthVN$(self, 'did_change_value_for_key', 'line_width');
});
$VN_2.$def('line_cap=',function(self,_cmd,cap){
VN$(self, 'will_change_value_for_key', 'line_cap');
self.$i_g('@ctx').lineCap = capVN$(self, 'did_change_value_for_key', 'line_cap');
});
$VN_2.$def('line_join=',function(self,_cmd,join){
VN$(self, 'will_change_value_for_key', 'line_join');
self.$i_g('@ctx').lineJoin = joinVN$(self, 'did_change_value_for_key', 'line_join');
});
$VN_2.$def('miter_limit=',function(self,_cmd,limit){
VN$(self, 'will_change_value_for_key', 'miter_limit');
self.$i_g('@ctx').miterLimit = limitVN$(self, 'did_change_value_for_key', 'miter_limit');
});
$VN_2.$def('alpha=',function(self,_cmd,alpha){
VN$(self, 'will_change_value_for_key', 'alpha');
self.$i_g('@ctx').globalAlpha = alphaVN$(self, 'did_change_value_for_key', 'alpha');
});
$VN_2.$def('begin_path',function(self,_cmd){
self.$i_g('@ctx').beginPath()});
$VN_2.$def('move_to_point',function(self,_cmd,point){
self.$i_g('@ctx').moveTo(VN$(point,'x'),VN$(point,'y'))});
$VN_2.$def('add_line_to_point',function(self,_cmd,point){
self.$i_g('@ctx').lineTo(VN$(point,'x'),VN$(point,'y'))});
$VN_2.$def('add_curve_to_point',function(self,_cmd,cp1,cp2,point){
self.$i_g('@ctx').bezierCurveTo(VN$(cp1,'x'),VN$(cp1,'y'),VN$(cp2,'x'),VN$(cp2,'y'),VN$(point,'x'),VN$(point,'y'))});
$VN_2.$def('add_lines',function(self,_cmd,points){
});
$VN_2.$def('scale_ctm',function(self,_cmd,sx,sy){
});
$VN_2.$def('translate_ctm',function(self,_cmd,tx,ty){
});
$VN_2.$def('rotate_ctm',function(self,_cmd,angle){
});
$VN_2.$def('concat_ctm',function(self,_cmd,transform){
});
$VN_2.$def('ctm',function(self,_cmd){
});
$VN_2.$def('add_ellipse_in_rect',function(self,_cmd,rect){
});
$VN_2.$def('add_arc',function(self,_cmd,point,radius,start_angle,end_angle,clock_wise){
});
$VN_2.$def('arc_to_point',function(self,_cmd,point1,point2,radius){
});
$VN_2.$def('add_path',function(self,_cmd,path){
});
$VN_2.$def('path_empty?',function(self,_cmd){
});
$VN_2.$def('path_current_point',function(self,_cmd){
});
$VN_2.$def('path_bounding_box',function(self,_cmd){
});
$VN_2.$def('path_contains_point?',function(self,_cmd,point){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Rect',cObject);
$VN_2.$def('initialize',function(self,_cmd,x,y,w,h){
self.$i_s('@origin',VN$(self.$klass.$c_g_full('Point'),'new',x,y));
return self.$i_s('@size',VN$(self.$klass.$c_g_full('Size'),'new',w,h));
});
$VN_2.$def('to_rect',function(self,_cmd){
return self;
});
$VN_2.$def('size',function(self,_cmd){
return self.$i_g('@size');
});
$VN_2.$def('size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'size');
self.$i_s('@size',size);
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_2.$def('origin',function(self,_cmd){
return self.$i_g('@origin');
});
$VN_2.$def('origin=',function(self,_cmd,point){
VN$(self, 'will_change_value_for_key', 'origin');
self.$i_s('@origin',point);
VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_2.$def('x',function(self,_cmd){
return VN$(self.$i_g('@origin'),'x');
});
$VN_2.$def('y',function(self,_cmd){
return VN$(self.$i_g('@origin'),'y');
});
$VN_2.$def('width',function(self,_cmd){
return VN$(self.$i_g('@size'),'width');
});
$VN_2.$def('height',function(self,_cmd){
return VN$(self.$i_g('@size'),'height');
});
$VN_2.$def('x=',function(self,_cmd,x){
VN$(self, 'will_change_value_for_key', 'x');
VN$(self.$i_g('@origin'),'x=',x);
VN$(self, 'did_change_value_for_key', 'x');
});
$VN_2.$def('y=',function(self,_cmd,y){
VN$(self, 'will_change_value_for_key', 'y');
VN$(self.$i_g('@origin'),'y=',y);
VN$(self, 'did_change_value_for_key', 'y');
});
$VN_2.$def('width=',function(self,_cmd,w){
VN$(self, 'will_change_value_for_key', 'width');
VN$(self.$i_g('@size'),'width=',w);
VN$(self, 'did_change_value_for_key', 'width');
});
$VN_2.$def('height=',function(self,_cmd,h){
VN$(self, 'will_change_value_for_key', 'height');
VN$(self.$i_g('@size'),'height=',h);
VN$(self, 'did_change_value_for_key', 'height');
});
$VN_2.$def('to_a',function(self,_cmd){
return [VN$(self, 'x'),VN$(self, 'y'),VN$(self, 'w'),VN$(self, 'h')];
});
$VN_2.$def('center',function(self,_cmd){
});
$VN_2.$def('contain?',function(self,_cmd){
});
$VN_2.$def('to_s',function(self,_cmd){
return ["{{",(VN$(self, 'x')),", ",(VN$(self, 'y')),"}, {",(VN$(self, 'width')),", ",(VN$(self, 'height')),"}}"].join('');
});
$VN_2.$def('inspect',function(self,_cmd){
});
$VN_2.$def('eql?',function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g('@size'),'eql?',VN$(other,'size')),VN$(self.$i_g('@origin'),'eql?',VN$(other,'origin')));
});
var $VN_2 = RClass.define_under($VN_1, 'Point',cObject);
$VN_2.$def('initialize',function(self,_cmd,x,y){
self.$i_s('@x',x);
return self.$i_s('@y',y);
});
$VN_2.$def('to_point',function(self,_cmd){
return self;
});
$VN_2.$def('x',function(self,_cmd){
return self.$i_g('@x');
});
$VN_2.$def('x=',function(self,_cmd,x){
VN$(self, 'will_change_value_for_key', 'x');
self.$i_s('@x',x);
VN$(self, 'did_change_value_for_key', 'x');
});
$VN_2.$def('y',function(self,_cmd){
return self.$i_g('@y');
});
$VN_2.$def('y=',function(self,_cmd,y){
VN$(self, 'will_change_value_for_key', 'y');
self.$i_s('@y',y);
VN$(self, 'did_change_value_for_key', 'y');
});
$VN_2.$def('eql?',function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g('@x'),'==',VN$(other,'x')),VN$(self.$i_g('@y'),'==',VN$(other,'y')));
});
$VN_2.$def('in_rect?',function(self,_cmd,a_rect){
return ANDTEST(VN$(VN$(self, 'x'),'>=',VN$(a_rect,'x')),ANDTEST(VN$(VN$(self, 'y'),'>=',VN$(a_rect,'y')),ANDTEST(VN$(VN$(self, 'x'),'<',VN$(VN$(a_rect,'x'),'+',VN$(a_rect,'width'))),VN$(VN$(self, 'y'),'<',VN$(VN$(a_rect,'y'),'+',VN$(a_rect,'height'))))));
});
var $VN_2 = RClass.define_under($VN_1, 'Size',cObject);
$VN_2.$def('initialize',function(self,_cmd,w,h){
self.$i_s('@width',w);
return self.$i_s('@height',h);
});
$VN_2.$def('to_size',function(self,_cmd){
return self;
});
$VN_2.$def('width',function(self,_cmd){
return self.$i_g('@width');
});
$VN_2.$def('width=',function(self,_cmd,w){
VN$(self, 'will_change_value_for_key', 'width');
self.$i_s('@width',w);
VN$(self, 'did_change_value_for_key', 'width');
});
$VN_2.$def('height',function(self,_cmd){
return self.$i_g('@height');
});
$VN_2.$def('height=',function(self,_cmd,h){
VN$(self, 'will_change_value_for_key', 'height');
self.$i_s('@height',h);
VN$(self, 'did_change_value_for_key', 'height');
});
$VN_2.$def('eql?',function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g('@width'),'==',VN$(other,'width')),VN$(self.$i_g('@height'),'==',VN$(other,'height')));
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Image',cObject);
$VN_2.$def_s('image_named',function(self,_cmd,name){
if(RTEST(VN$(VN$(self, 'named_images'),'has_key?',name))){
return VN$(VN$(self, 'named_images'),'[]',name);
}
if(RTEST(VN$(VN$(self, 'sprite_images'),'has_key?',name))){
}
var img = VN$(self,'image_with_contents_of_url',["images/",(name),".png"].join(''));
VN$(VN$(self, 'named_images'),'[]=',name,img);
return img;
});
$VN_2.$def_s('named_images',function(self,_cmd){
return self.$i_s('@named_images',ORTEST(self.$i_g('@named_images'),VN.$h()));
});
$VN_2.$def_s('sprite_images',function(self,_cmd){
return self.$i_s('@sprite_images',ORTEST(self.$i_g('@sprite_images'),VN.$h()));
});
$VN_2.$def_s('resource',function(self,_cmd,name,block){
var img = VN$(self,'image_named',name);
return arguments[arguments.length -1](img);
});
$VN_2.$def_s('sprite',function(self,_cmd,name,rect){
var img = VN$(self,'image_named',name);
var obj = VN$(self,'new');
VN$(obj,'image=',VN$(img,'image'));
VN$(obj,'filename=',VN$(img,'filename'));
VN$(obj,'add_representation:rect:','normal',rect);
return obj;
});
$VN_2.$def_s('sprite:normal:gray_mask:disabled:',function(self,_cmd,image,normal,gray_mask,disabled){
var img = VN$(self,'image_named',image);
var obj = VN$(self,'new');
VN$(obj,'image=',VN$(img,'image'));
VN$(obj,'filename=',VN$(img,'filename'));
VN$(obj,'add_representation:rect:','normal',normal);
VN$(obj,'add_representation:rect:','gray_mask',gray_mask);
VN$(obj,'add_representation:rect:','disabled',disabled);
return obj;
});
$VN_2.$def_s('sprite_cell_masks',function(self,_cmd,name,block){
var img = VN$(self,'image_named',name);
var obj = VN$(self,'new');
VN$(obj,'image=',VN$(img,'image'));
VN$(obj,'filename=',VN$(img,'filename'));
arguments[arguments.length -1](obj);
return obj;
});
$VN_2.$def('add_representation:rect:',function(self,_cmd,type,array_rect){
VN$(self.$i_g('@representations'),'[]=',type,array_rect);
if(RTEST(VN$(type,'==','normal'))){
self.$i_s('@size',VN$(self.$klass.$c_g_full('Size'),'new',VN$(array_rect,'[]',2),VN$(array_rect,'[]',3)));
}
});
$VN_2.$def('initialize',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@representations',VN.$h());
});
$VN_2.$def('init_with_size',function(self,_cmd,size){
});
$VN_2.$def('init_with_data',function(self,_cmd,data){
});
$VN_2.$def_s('image_with_contents_of_url',function(self,_cmd,url){
var obj = VN$(self, 'allocate');
VN$(obj,'init_with_contents_of_url',url);
return obj;
});
$VN_2.$def('init_with_contents_of_url',function(self,_cmd,url){
VN$(self, 'initialize');
self.$i_s('@filename',url);
self.$i_s('@image',nil);
return VN$(self, 'load');
});
$VN_2.$def('status',function(self,_cmd){
return self.$i_g('@status');
});
$VN_2.$def('load',function(self,_cmd){
if(RTEST(ORTEST(VN$(self.$i_g('@status'),'==','loading'),VN$(self.$i_g('@status'),'==','completed')))){
return ;
}
self.$i_s('@status','loading');
self.$i_s('@image', new Image());
      
      self.$i_g('@image').onload = function() {
        VN$(self,'_image_did_load')
      };
      
      self.$i_g('@image').onerror = function() {
        VN$(self,'_image_did_error')
      };
      
      self.$i_g('@image').onabort = function() {
        VN$(self,'_image_did_error')
      };
      
      self.$i_g('@image').src = self.$i_g('@filename');
      });
$VN_2.$def('_image_did_error',function(self,_cmd){
self.$i_s('@status','read_error');
if(RTEST(ANDTEST(self.$i_g('@delegate'),VN$(self.$i_g('@delegate'),'respond_to?','image_did_error')))){
VN$(self.$i_g('@delegate'),'image_did_error',self);
}
});
$VN_2.$def('_image_did_load',function(self,_cmd){
return self.$i_s('@size',VN$(self.$klass.$c_g_full('Size'),'new',self.$i_g('@image').width,self.$i_g('@image').height));
});
$VN_2.$def('sprite',function(self,_cmd,name,rect){
return self;
});
$VN_2.$def('image',function(self,_cmd){
return self.$i_g('@image');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('filename=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'filename');
self.$i_s('@filename',name);
VN$(self, 'did_change_value_for_key', 'filename');
});
$VN_2.$def('filename',function(self,_cmd){
return self.$i_g('@filename');
});
$VN_2.$def('sprite_origin=',function(self,_cmd,point){
VN$(self, 'will_change_value_for_key', 'sprite_origin');
self.$i_s('@sprite_origin',point);
VN$(self, 'did_change_value_for_key', 'sprite_origin');
});
$VN_2.$def('size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'size');
self.$i_s('@size',size);
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_2.$def('size',function(self,_cmd){
return ORTEST(self.$i_g('@size'),VN$(self.$klass.$c_g_full('Size'),'new',0,0));
});
$VN_2.$def('name=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'name');
self.$i_s('@name',name);
VN$(self, 'did_change_value_for_key', 'name');
});
$VN_2.$def('name',function(self,_cmd){
return self.$i_g('@name');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draw_at_point:from_rect:operation:fraction:',function(self,_cmd,point,from_rect,op,delta){
});
$VN_2.$def('draw_in_rect:from_rect:operation:fraction:',function(self,_cmd,rect,from_rect,op,delta){
});
$VN_2.$def('render_in_rect:enabled:gray_mask:',function(self,_cmd,rect,enabled,gray_mask){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
VN$(ctx,'css',VN.$h('display','block','background_image',["url('",(VN$(self, 'filename')),"')"].join('')));
VN$(ctx,'css',VN.$h('width',[(VN$(rect,'width')),"px"].join(''),'height',[(VN$(rect,'height')),"px"].join('')));
VN$(ctx,'css',VN.$h('left',[(VN$(rect,'x')),"px"].join(''),'top',[(VN$(rect,'y')),"px"].join('')));
var rep = gray_mask ? VN$(self.$i_g('@representations'),'[]','gray_mask') : VN$(self.$i_g('@representations'),'[]','normal');
if(!RTEST(enabled)){
rep = VN$(self.$i_g('@representations'),'[]','disabled');
}
return VN$(ctx,'css',VN.$h('background_position',["-",(VN$(rep,'[]',0)),"px -",(VN$(rep,'[]',1)),"px"].join('')));
});
$VN_2.$def('render_in_rect',function(self,_cmd,rect){
return VN$(self,'render_in_rect:enabled:gray_mask:',rect,true,false);
});
$VN_2.$def('draw_representation:in_rect:',function(self,_cmd,image_rep,rect){
});
$VN_2.$def('representations',function(self,_cmd){
return self.$i_g('@representations');
});
$VN_2.$def('add_representations',function(self,_cmd,image_reps){
});
$VN_2.$def('add_representation',function(self,_cmd,image_rep){
});
$VN_2.$def('remove_representation',function(self,_cmd,image_rep){
});
$VN_2.$def('valid?',function(self,_cmd){
});
$VN_2.$def('lock_focus',function(self,_cmd){
});
$VN_2.$def('unlock_focus',function(self,_cmd){
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_s('@delegate',obj);
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('alignment_rect',function(self,_cmd){
return self.$i_g('@alignment_rect');
});
$VN_2.$def('alignment_rect=',function(self,_cmd,rect){
VN$(self, 'will_change_value_for_key', 'alignment_rect');
self.$i_s('@alignment_rect',rect);
VN$(self, 'did_change_value_for_key', 'alignment_rect');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'RenderContext',$VN_2.$c_g_full('Element'));
$VN_2.$def('initialize',function(self,_cmd,tag_name,options){
self.$i_s('@element_stack',[document.createElement(tag_name)]);
self.$i_s('@first_time',true);
return self.$i_s('@type',tag_name);
});
$VN_2.$def_s('current_context=',function(self,_cmd,current_context){
return self.$i_s('@current_context',current_context);
});
$VN_2.$def_s('current_context',function(self,_cmd){
return self.$i_g('@current_context');
});
$VN_2.$def('first_time?',function(self,_cmd){
return self.$i_g('@first_time');
});
$VN_2.$def('first_time=',function(self,_cmd,first_time){
VN$(self, 'will_change_value_for_key', 'first_time');
self.$i_s('@first_time',first_time);
VN$(self, 'did_change_value_for_key', 'first_time');
});
$VN_2.$def('element',function(self,_cmd){
return VN$(self.$i_g('@element_stack'),'last');
});
$VN_2.$def('push_element_stack',function(self,_cmd,element){
return VN$(self.$i_g('@element_stack'),'<<',element);
});
$VN_2.$def('pop_element_stack',function(self,_cmd){
return VN$(self.$i_g('@element_stack'),'pop');
});
$VN_2.$def('selector',function(self,_cmd,a_selector,block){
var element = VN$(self,'find_selector',a_selector);
VN$(self,'push_element_stack',element);
arguments[arguments.length -1](self);
return VN$(self, 'pop_element_stack');
});
$VN_2.$def('child_nodes',function(self,_cmd){
return VN$(self, 'element').childNodes.length;});
$VN_2.$def('child_node',function(self,_cmd,a_number,block){
var e = VN$(self, 'element').childNodes[a_number];
VN$(self,'push_element_stack',e);
arguments[arguments.length -1](self);
return VN$(self, 'pop_element_stack');
});
$VN_2.$def('find_selector',function(self,_cmd,a_selector){
var nodes = VN$(self, 'element').childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == a_selector) {
          return nodes[i];
        }
      }
      return VN$(self, 'element')});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'View',$VN_2.$c_g_full('Responder'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[]);
VN$(self, 'setup_display_context');
self.$i_s('@frame',frame);
self.$i_s('@bounds',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(frame,'width'),VN$(frame,'height')));
VN$(self,'frame=',frame);
self.$i_s('@subviews',[]);
self.$i_s('@window',nil);
self.$i_s('@superview',nil);
self.$i_s('@posts_frame_changed_notifications',false);
self.$i_s('@autoresizes_subviews',true);
return self.$i_s('@tracking_areas',[]);
});
$VN_2.$def_s('build',function(self,_cmd,options,block){
var view = VN$(self,'new',VN$(options,'[]','frame'));
if(RTEST(block)){
arguments[arguments.length -1](view);
}
return view;
});
$VN_2.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_2.$def('display_mode',function(self,_cmd){
return VN$(self.$klass.$c_g_full('ENV'),'[]','display_mode');
});
$VN_2.$def('setup_display_context',function(self,_cmd){
if(RTEST(VN$(VN$(self, 'display_mode'),'==','render'))){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'new','div',nil));
VN$(self.$i_g('@element'),'css',VN.$h('overflow','hidden'));
self.$i_s('@display_context',VN$(self.$klass.$c_g_full('RenderContext'),'new','div',nil));
VN$(self.$i_g('@element'),'<<',self.$i_g('@display_context'));
}
else{
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'new','div'));
self.$i_s('@display_context',VN$(self.$klass.$c_g_full('GraphicsContext'),'new'));
VN$(self.$i_g('@element'),'<',self.$i_g('@display_context'));
}
});
$VN_2.$def('accepts_first_mouse',function(self,_cmd,the_event){
return true;
});
$VN_2.$def('accepts_first_responder',function(self,_cmd){
return true;
});
$VN_2.$def('class_name',function(self,_cmd){
return ORTEST(self.$i_g('@class_name'),'vn-view');
});
$VN_2.$def('class_name=',function(self,_cmd,a_class){
VN$(self, 'will_change_value_for_key', 'class_name');
self.$i_s('@class_name',a_class);
VN$(self, 'did_change_value_for_key', 'class_name');
});
$VN_2.$def('theme_name',function(self,_cmd){
return ORTEST(self.$i_g('@theme_name'),'');
});
$VN_2.$def('theme_name=',function(self,_cmd,a_theme){
VN$(self, 'will_change_value_for_key', 'theme_name');
self.$i_s('@theme_name',a_theme);
VN$(self, 'did_change_value_for_key', 'theme_name');
});
$VN_2.$def('graphics_port',function(self,_cmd){
return VN$(self.$i_g('@display_context'),'element').getContext('2d');});
$VN_2.$def('initialize_with_coder',function(self,_cmd,coder){
});
$VN_2.$def('initialize_with_builder',function(self,_cmd,builder){
});
$VN_2.$def_s('display_properties',function(self,_cmd){
});
VN$($VN_2,'display_properties','frame','frame_size');
$VN_2.$def('did_change_value_for_key',function(self,_cmd){
});
$VN_2.$def('window',function(self,_cmd){
});
$VN_2.$def('superview',function(self,_cmd){
});
$VN_2.$def('subviews',function(self,_cmd){
});
$VN_2.$def('descendant_of?',function(self,_cmd,a_view){
});
$VN_2.$def('ancestor_shared_with_view',function(self,_cmd,a_view){
});
$VN_2.$def('opaque_ancestor',function(self,_cmd){
});
$VN_2.$def('hidden=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'hidden');
VN$(self, 'did_change_value_for_key', 'hidden');
});
$VN_2.$def('hidden?',function(self,_cmd){
});
$VN_2.$def('hidden_or_has_hidden_ancestor?',function(self,_cmd){
});
$VN_2.$def('view_did_hide',function(self,_cmd){
});
$VN_2.$def('view_did_unhide',function(self,_cmd){
});
$VN_2.$def('subviews=',function(self,_cmd,new_subviews){
VN$(self, 'will_change_value_for_key', 'subviews');
VN$(self, 'did_change_value_for_key', 'subviews');
});
$VN_2.$def('add_subview',function(self,_cmd,a_view){
if(RTEST(VN$(self.$i_g('@subviews'),'include?',a_view))){
return ;
}
VN$(a_view,'remove_from_superview');
VN$(a_view,'view_will_move_to_superview',self);
VN$(a_view,'view_will_move_to_window',self.$i_g('@window'));
VN$(self.$i_g('@subviews'),'<<',a_view);
VN$(self.$i_g('@element'),'<<',VN$(a_view,'element'));
VN$(a_view,'next_responder=',self);
VN$(a_view,'view_did_move_to_superview');
VN$(a_view,'view_did_move_to_window');
return VN$(self,'did_add_subview',self);
});
$VN_2.$def('<<',function(self,_cmd,a_view){
return VN$(self,'add_subview',a_view);
});
$VN_2.$def('add_subview:positioned:relative_to:',function(self,_cmd,a_view,place,other_view){
});
$VN_2.$def('view_will_move_to_window',function(self,_cmd,win){
self.$i_s('@window',win);
return VN$(self.$i_g('@subviews'),'each',function(s){
return VN$(s,'view_will_move_to_window',win);
});
});
$VN_2.$def('view_did_move_to_window',function(self,_cmd){
VN$(self.$i_g('@subviews'),'each',function(s){
return VN$(s,'view_did_move_to_window');
});
return VN$(self,'needs_display=',true);
});
$VN_2.$def('view_will_move_to_superview',function(self,_cmd,new_super){
return self.$i_s('@superview',new_super);
});
$VN_2.$def('view_did_move_to_superview',function(self,_cmd){
});
$VN_2.$def('did_add_subview',function(self,_cmd,subview){
});
$VN_2.$def('will_remove_subview',function(self,_cmd,subview){
});
$VN_2.$def('remove_from_superview',function(self,_cmd){
});
$VN_2.$def('replace_subview:with:',function(self,_cmd,old_view,new_view){
});
$VN_2.$def('posts_frame_changed_notifications=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'posts_frame_changed_notifications');
VN$(self, 'did_change_value_for_key', 'posts_frame_changed_notifications');
});
$VN_2.$def('posts_frame_changed_notifications?',function(self,_cmd){
});
$VN_2.$def('resize_subviews_with_old_size',function(self,_cmd,size){
});
$VN_2.$def('resize_with_old_superview_size',function(self,_cmd,old){
});
$VN_2.$def('autoresizes_subviews=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'autoresizes_subviews');
VN$(self, 'did_change_value_for_key', 'autoresizes_subviews');
});
$VN_2.$def('autoresizes_subviews?',function(self,_cmd){
});
$VN_2.$def('autoresizing_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'autoresizing_mask');
VN$(self, 'did_change_value_for_key', 'autoresizing_mask');
});
$VN_2.$def('autoresizing_mask',function(self,_cmd){
});
$VN_2.$def('frame_origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'frame_origin');
VN$(self.$i_g('@frame'),'x=',VN$(new_origin,'x'));
VN$(self.$i_g('@frame'),'y=',VN$(new_origin,'y'));
VN$(self.$i_g('@element'),'origin=',new_origin);
if(RTEST(self.$i_g('@posts_frame_changed_notifications'))){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:','frame chnage notification',self);
}
VN$(self, 'did_change_value_for_key', 'frame_origin');
});
$VN_2.$def('frame_size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'frame_size');
var old_size = VN$(self.$klass.$c_g_full('Size'),'new',VN$(self.$i_g('@frame'),'width'),VN$(self.$i_g('@frame'),'height'));
VN$(VN$(self.$i_g('@frame'),'size'),'width=',VN$(new_size,'width'));
VN$(VN$(self.$i_g('@frame'),'size'),'height=',VN$(new_size,'height'));
VN$(VN$(self.$i_g('@bounds'),'size'),'width=',VN$(new_size,'width'));
VN$(VN$(self.$i_g('@bounds'),'size'),'height=',VN$(new_size,'height'));
VN$(self,'needs_display=',true);
VN$(self.$i_g('@element'),'size=',new_size);
VN$(self.$i_g('@display_context'),'size=',new_size);
if(RTEST(self.$i_g('@posts_frame_changed_notifications'))){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:','frame chnage notification',self);
}
VN$(self, 'did_change_value_for_key', 'frame_size');
});
$VN_2.$def('frame=',function(self,_cmd,frame){
VN$(self, 'will_change_value_for_key', 'frame');
VN$(self,'frame_origin=',VN$(frame,'origin'));
VN$(self,'frame_size=',VN$(frame,'size'));
if(RTEST(self.$i_g('@posts_frame_changed_notifications'))){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:','view chnages notification',self);
}
VN$(self, 'did_change_value_for_key', 'frame');
});
$VN_2.$def('frame',function(self,_cmd){
return self.$i_g('@frame');
});
$VN_2.$def('frame_rotation=',function(self,_cmd,angle){
VN$(self, 'will_change_value_for_key', 'frame_rotation');
VN$(self, 'did_change_value_for_key', 'frame_rotation');
});
$VN_2.$def('frame_rotation',function(self,_cmd){
return self.$i_g('@frame_rotation');
});
$VN_2.$def('frame_center_rotation=',function(self,_cmd,angle){
VN$(self, 'will_change_value_for_key', 'frame_center_rotation');
VN$(self, 'did_change_value_for_key', 'frame_center_rotation');
});
$VN_2.$def('frame_center_rotation',function(self,_cmd){
});
$VN_2.$def('bounds_origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'bounds_origin');
VN$(self, 'did_change_value_for_key', 'bounds_origin');
});
$VN_2.$def('bounds_size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'bounds_size');
VN$(self, 'did_change_value_for_key', 'bounds_size');
});
$VN_2.$def('bounds_rotation=',function(self,_cmd,angle){
VN$(self, 'will_change_value_for_key', 'bounds_rotation');
VN$(self, 'did_change_value_for_key', 'bounds_rotation');
});
$VN_2.$def('bounds_rotation',function(self,_cmd){
});
$VN_2.$def('translate_origin_to_point',function(self,_cmd,translation){
});
$VN_2.$def('rotate_by_angle',function(self,_cmd,angle){
});
$VN_2.$def('bounds=',function(self,_cmd,bounds){
VN$(self, 'will_change_value_for_key', 'bounds');
VN$(self, 'did_change_value_for_key', 'bounds');
});
$VN_2.$def('bounds',function(self,_cmd){
return self.$i_g('@bounds');
});
$VN_2.$def('flipped?',function(self,_cmd){
});
$VN_2.$def('rotated_from_base?',function(self,_cmd){
});
$VN_2.$def('rotated_or_scaled_from_base?',function(self,_cmd){
});
$VN_2.$def('opaque?',function(self,_cmd){
});
$VN_2.$def('convert_point:from_view:',function(self,_cmd,point,view){
if(!RTEST(view)){
return VN$(self,'convert_point_from_base',point);
}
return VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(point,'x'),'-',VN$(self.$i_g('@frame'),'x')),VN$(VN$(point,'y'),'-',VN$(self.$i_g('@frame'),'y')));
});
$VN_2.$def('convert_point:to_view:',function(self,_cmd,point,view){
});
$VN_2.$def('convert_size:from_view:',function(self,_cmd,size,view){
});
$VN_2.$def('convert_size:to_view:',function(self,_cmd,size,view){
});
$VN_2.$def('convert_rect:from_view:',function(self,_cmd,rect,view){
});
$VN_2.$def('convert_rect:to_view:',function(self,_cmd,rect,view){
});
$VN_2.$def('convert_point_to_base',function(self,_cmd,point){
});
$VN_2.$def('convert_point_from_base',function(self,_cmd,point){
if(RTEST(self.$i_g('@superview'))){
return VN$(self.$i_g('@superview'),'convert_point_from_base',VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(point,'x'),'-',VN$(self.$i_g('@frame'),'x')),VN$(VN$(point,'y'),'-',VN$(self.$i_g('@frame'),'y'))));
}
else{
return point;
}
});
$VN_2.$def('convert_size_to_base',function(self,_cmd,size){
});
$VN_2.$def('convert_size_from_base',function(self,_cmd,size){
});
$VN_2.$def('convert_rect_to_base',function(self,_cmd,rect){
});
$VN_2.$def('convert_rect_from_base',function(self,_cmd,rect){
});
$VN_2.$def('can_draw?',function(self,_cmd){
});
$VN_2.$def('needs_display=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'needs_display');
if(!RTEST(self.$i_g('@window'))){
return ;
}
VN$(self, 'display');
VN$(self, 'did_change_value_for_key', 'needs_display');
});
$VN_2.$def('needs_display_in_rect',function(self,_cmd,invalid_rect){
return self.$i_g('@needs_display');
});
$VN_2.$def('needs_display?',function(self,_cmd){
return self.$i_g('@needs_display');
});
$VN_2.$def('lock_focus',function(self,_cmd){
return VN$(self.$klass.$c_g_full('RenderContext'),'current_context=',self.$i_g('@display_context'));
});
$VN_2.$def('unlock_focus',function(self,_cmd){
});
$VN_2.$def_s('focus_view',function(self,_cmd){
});
$VN_2.$def('visible_rect',function(self,_cmd){
});
$VN_2.$def('display',function(self,_cmd){
if(!RTEST(self.$i_g('@window'))){
return ;
}
VN$(self, 'view_will_draw');
if(RTEST(VN$(VN$(self, 'display_mode'),'==','render'))){
VN$(self,'render',self.$i_g('@display_context'));
}
else{
var graphics_context = VN$(self.$i_g('@window'),'graphics_context');
VN$(self.$klass.$c_g_full('GraphicsContext'),'current_context=',graphics_context);
VN$(graphics_context,'graphics_port=',VN$(self,'graphics_port'));
VN$(self,'draw_rect',VN$(self, 'bounds'));
}
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'class_name=',VN$(self, 'class_name'));
VN$(context,'first_time=',false);
}
});
$VN_2.$def('draw_rect',function(self,_cmd,rect){
});
$VN_2.$def('view_will_draw',function(self,_cmd){
});
$VN_2.$def('hit_test',function(self,_cmd,point){
point = VN$(self,'convert_point:from_view:',point,self.$i_g('@superview'));
if(!RTEST(VN$(point,'in_rect?',VN$(self, 'bounds')))){
return nil;
}
var count = VN$(self.$i_g('@subviews'),'length');
var i = 0;
for (i = 0; i < count; i++) {var view_to_check = VN$(self.$i_g('@subviews'),'[]',i);
var hit_test = VN$(view_to_check,'hit_test',point);
if(RTEST(hit_test)){
return hit_test;
}
}return self;
});
$VN_2.$def('mouse:in_rect:',function(self,_cmd,point,rect){
});
$VN_2.$def('add_tracking_area',function(self,_cmd,tracking_area){
if(RTEST(VN$(self.$i_g('@tracking_areas'),'empty?'))){
VN$(self.$i_g('@element'),'add_event_listener','mouseover',function(evt){
});
VN$(self.$i_g('@element'),'add_event_listener','mouseout',function(evt){
});
}
return VN$(self.$i_g('@tracking_areas'),'<<',tracking_area);
});
$VN_2.$def('remove_tracking_area',function(self,_cmd,tracking_area){
});
$VN_2.$def('tracking_areas',function(self,_cmd){
return self.$i_g('@tracking_areas');
});
$VN_2.$def('update_tracking_areas',function(self,_cmd){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Control',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@cell',VN$(VN$(VN$(self,'class'),'cell_class'),'new'));
return VN$(self.$i_g('@cell'),'render_context=',self.$i_g('@display_context'));
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('Cell');
});
$VN_2.$def('render',function(self,_cmd,context){
VN$(self.$klass.$c_g_full('RenderContext'),'current_context=',context);
return VN$(self.$i_g('@cell'),'render_with_frame:in_view:',VN$(self, 'bounds'),self);
});
$VN_2.$def('class_name=',function(self,_cmd,class_name){
VN$(self, 'will_change_value_for_key', 'class_name');
VN$(self.$i_g('@cell'),'class_name=',class_name);
VN$(self, 'did_change_value_for_key', 'class_name');
});
$VN_2.$def('class_name',function(self,_cmd){
return VN$(self.$i_g('@cell'),'class_name');
});
$VN_2.$def('theme_name=',function(self,_cmd,theme_name){
VN$(self, 'will_change_value_for_key', 'theme_name');
VN$(self.$i_g('@cell'),'theme_name=',theme_name);
VN$(self, 'did_change_value_for_key', 'theme_name');
});
$VN_2.$def('theme_name',function(self,_cmd){
return VN$(self.$i_g('@cell'),'theme_name');
});
$VN_2.$def('cell',function(self,_cmd){
return self.$i_g('@cell');
});
$VN_2.$def('cell=',function(self,_cmd,a_cell){
VN$(self, 'will_change_value_for_key', 'cell');
self.$i_g('@cell');
VN$(self, 'did_change_value_for_key', 'cell');
});
$VN_2.$def('selected_cell',function(self,_cmd){
return self.$i_g('@cell');
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('calc_size',function(self,_cmd){
});
$VN_2.$def('target',function(self,_cmd){
return VN$(self.$i_g('@cell'),'target');
});
$VN_2.$def('target=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'target');
VN$(self.$i_g('@cell'),'target=',obj);
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
return VN$(self.$i_g('@cell'),'action');
});
$VN_2.$def('action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'action');
VN$(self.$i_g('@cell'),'action=',selector);
VN$(self, 'did_change_value_for_key', 'action');
});
$VN_2.$def('tag',function(self,_cmd){
return VN$(self.$i_g('@cell'),'tag');
});
$VN_2.$def('tag=',function(self,_cmd,tag){
VN$(self, 'will_change_value_for_key', 'tag');
VN$(self.$i_g('@cell'),'tag=',tag);
VN$(self, 'did_change_value_for_key', 'tag');
});
$VN_2.$def('selected_tag',function(self,_cmd){
return VN$(self.$i_g('@cell'),'tag');
});
$VN_2.$def('ignores_multi_click=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'ignores_multi_click');
VN$(self.$i_g('@cell'),'ignores_multi_click=',flag);
VN$(self, 'did_change_value_for_key', 'ignores_multi_click');
});
$VN_2.$def('ignores_multi_click?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'ignores_multi_click?');
});
$VN_2.$def('send_action_on',function(self,_cmd,mask){
});
$VN_2.$def('continuous?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'continuous?');
});
$VN_2.$def('continuous=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'continuous');
VN$(self.$i_g('@cell'),'continuous=',flag);
VN$(self, 'did_change_value_for_key', 'continuous');
});
$VN_2.$def('enabled?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'enabled?');
});
$VN_2.$def('enabled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'enabled');
VN$(self.$i_g('@cell'),'enabled=',flag);
VN$(self,'needs_display=',true);
VN$(self, 'did_change_value_for_key', 'enabled');
});
$VN_2.$def('control_tint',function(self,_cmd){
return VN$(self.$i_g('@cell'),'control_tint');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
VN$(self.$i_g('@cell'),'control_tint=',control_tint);
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'control_size');
VN$(self.$i_g('@cell'),'control_size=',size);
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('control_size',function(self,_cmd){
return VN$(self.$i_g('@cell'),'control_size');
});
$VN_2.$def('alignment',function(self,_cmd){
return VN$(self.$i_g('@cell'),'alignment');
});
$VN_2.$def('alignment=',function(self,_cmd,mode){
VN$(self, 'will_change_value_for_key', 'alignment');
VN$(self.$i_g('@cell'),'alignment=',mode);
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('font',function(self,_cmd){
return VN$(self.$i_g('@cell'),'font');
});
$VN_2.$def('font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'font');
VN$(self.$i_g('@cell'),'font=',font);
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('formatter=',function(self,_cmd,new_formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
VN$(self.$i_g('@cell'),'formatter=',new_formatter);
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
return VN$(self.$i_g('@cell'),'formatter');
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
VN$(self, 'did_change_value_for_key', 'object_value');
});
$VN_2.$def('string_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'string_value');
VN$(self, 'did_change_value_for_key', 'string_value');
});
$VN_2.$def('text=',function(self,_cmd,text){
VN$(self, 'will_change_value_for_key', 'text');
var string_value = text;
VN$(self, 'did_change_value_for_key', 'text');
});
$VN_2.$def('int_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'int_value');
VN$(self, 'did_change_value_for_key', 'int_value');
});
$VN_2.$def('float_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'float_value');
VN$(self, 'did_change_value_for_key', 'float_value');
});
$VN_2.$def('double_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'double_value');
VN$(self, 'did_change_value_for_key', 'double_value');
});
$VN_2.$def('object_value',function(self,_cmd){
});
$VN_2.$def('string_value',function(self,_cmd){
});
$VN_2.$def('to_s',function(self,_cmd){
return VN$(self, 'string_value');
});
$VN_2.$def('int_value',function(self,_cmd){
});
$VN_2.$def('to_i',function(self,_cmd){
return VN$(self, 'int_value');
});
$VN_2.$def('float_value',function(self,_cmd){
});
$VN_2.$def('to_f',function(self,_cmd){
return VN$(self, 'float_value');
});
$VN_2.$def('double_value',function(self,_cmd){
});
$VN_2.$def('update_cell',function(self,_cmd,a_cell){
});
$VN_2.$def('update_cell_inside',function(self,_cmd,a_cell){
});
$VN_2.$def('draw_cell_inside',function(self,_cmd,a_cell){
});
$VN_2.$def('draw_cell',function(self,_cmd,a_cell){
});
$VN_2.$def('select_cell',function(self,_cmd,a_cell){
});
$VN_2.$def('send_action:to:',function(self,_cmd,action,target){
VN$(self,'puts','sending action on');
if(RTEST(VN$(self,'info_for_binding','value'))){
VN$(self,'propagate_binding','value');
}
return VN$(self.$klass.$c_g_full('App'),'send_action:to:from:',action,target,self);
});
$VN_2.$def('take_int_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_float_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_double_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_object_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_string_value_from',function(self,_cmd,sender){
});
$VN_2.$def('current_editor',function(self,_cmd){
});
$VN_2.$def('abort_editing?',function(self,_cmd){
});
$VN_2.$def('validate_editing',function(self,_cmd){
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
if(!RTEST(VN$(self, 'enabled?'))){
return ;
}
VN$(self,'lock_focus');
VN$(self.$i_g('@cell'),'track_mouse:in_rect:of_view:until_mouse_up:',the_event,VN$(self, 'frame'),self,true);
return VN$(self,'unlock_focus');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('refuses_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'refuses_first_responder');
VN$(self.$i_g('@cell'),'refuses_first_responder=',flag);
VN$(self, 'did_change_value_for_key', 'refuses_first_responder');
});
$VN_2.$def('refuses_first_responder?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'refuses_first_responder?');
});
$VN_2.$def('control_text_did_begin_editing',function(self,_cmd,notification){
});
$VN_2.$def('control_text_did_end_editing',function(self,_cmd,notification){
});
$VN_2.$def('control_text_did_change',function(self,_cmd,notification){
});
$VN_2.$def('attributed_string_value',function(self,_cmd){
return VN$(self.$i_g('@cell'),'attributed_string_value');
});
$VN_2.$def('attributed_string_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'attributed_string_value');
VN$(self.$i_g('@cell'),'attributed_string_value=',val);
VN$(self, 'did_change_value_for_key', 'attributed_string_value');
});
$VN_2.$def('bind:to_object:with_key_path:options:',function(self,_cmd,binding,observable,key_path,options){
if(RTEST(VN$(binding,'==','value'))){
VN$(self,'unbind',binding);
VN$(observable,'add_observer:for_key_path:options:context:',self,key_path,options,binding);
var binding_dict = VN.$h('observed_object', observable, 'observed_key_path', key_path, 'options', options, 'key', 'object_value');
VN$(self,'set_info:for_binding:',binding_dict,binding);
VN$(self,'set_value_for_binding',binding);
}
else{
VN$sup(arguments.callee, self,_cmd,[binding,observable,key_path,options]);
}
});

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('CELL_TYPES',VN.$h('null', 0, 'text', 1, 'image', 2));
$VN_1.$c_s('IMAGE_POSITIONS',VN.$h('text_only', 0, 'image_only', 1, 'left', 2, 'right', 3, 'below', 4, 'above', 5, 'overlaps', 6));
$VN_1.$c_s('CELL_STATES',VN.$h('off', 0, 'on', 1));
$VN_1.$c_s('CELL_MASKS',VN.$h('none', 0, 'contents', 1, 'push_in', 2, 'change_gray', 4, 'change_background', 8));
$VN_1.$c_s('CONTROL_TINTS',VN.$h('default', 0, 'blue', 1, 'graphite', 6, 'clear', 7, 'hud', 10));
$VN_1.$c_s('CONTROL_SIZES',VN.$h('regular', 0, 'small', 1, 'mini', 2));
var $VN_2 = RClass.define_under($VN_1, 'Cell',cObject);
$VN_2.$def_s('prefers_tracking_until_mouse_up',function(self,_cmd){
});
$VN_2.$def('init_text_cell',function(self,_cmd,str){
self.$i_s('@cell_type','text');
self.$i_s('@enabled',true);
self.$i_s('@editable',false);
self.$i_s('@selectable',false);
self.$i_s('@state','off');
self.$i_s('@title',str);
self.$i_s('@image',nil);
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
self.$i_s('@highlighted',false);
return self.$i_s('@refuses_first_responder',false);
});
$VN_2.$def('init_image_cell',function(self,_cmd,img){
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$(self,'init_text_cell','Cell');
});
$VN_2.$def('class_name=',function(self,_cmd,class_name){
VN$(self, 'will_change_value_for_key', 'class_name');
self.$i_s('@class_name',class_name);
VN$(self, 'did_change_value_for_key', 'class_name');
});
$VN_2.$def('class_name',function(self,_cmd){
return ORTEST(self.$i_g('@class_name'),'vn-control');
});
$VN_2.$def('theme_name=',function(self,_cmd,theme_name){
VN$(self, 'will_change_value_for_key', 'theme_name');
self.$i_s('@theme_name',theme_name);
VN$(self, 'did_change_value_for_key', 'theme_name');
});
$VN_2.$def('theme_name',function(self,_cmd){
return ORTEST(self.$i_g('@theme_name'),'');
});
$VN_2.$def('control_view',function(self,_cmd){
return self.$i_g('@control_view');
});
$VN_2.$def('control_view=',function(self,_cmd,view){
VN$(self, 'will_change_value_for_key', 'control_view');
self.$i_s('@control_view',view);
VN$(self, 'did_change_value_for_key', 'control_view');
});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('type=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'type');
self.$i_s('@type',a_type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
});
$VN_2.$def('state=',function(self,_cmd,state){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',state);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('target',function(self,_cmd){
return self.$i_g('@target');
});
$VN_2.$def('target=',function(self,_cmd,target){
VN$(self, 'will_change_value_for_key', 'target');
self.$i_s('@target',target);
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
return self.$i_g('@action');
});
$VN_2.$def('action=',function(self,_cmd,action){
VN$(self, 'will_change_value_for_key', 'action');
self.$i_s('@action',action);
VN$(self, 'did_change_value_for_key', 'action');
});
$VN_2.$def('tag',function(self,_cmd){
return self.$i_g('@tag');
});
$VN_2.$def('tag=',function(self,_cmd,tag){
VN$(self, 'will_change_value_for_key', 'tag');
self.$i_s('@tag',tag);
VN$(self, 'did_change_value_for_key', 'tag');
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
});
$VN_2.$def('title=',function(self,_cmd,title){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',title);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('opaque?',function(self,_cmd){
return self.$i_g('@opaque');
});
$VN_2.$def('enabled?',function(self,_cmd){
return self.$i_g('@enabled');
});
$VN_2.$def('enabled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'enabled');
self.$i_s('@enabled',flag);
VN$(self, 'did_change_value_for_key', 'enabled');
});
$VN_2.$def('send_action_on',function(self,_cmd,mask){
});
$VN_2.$def('continuous?',function(self,_cmd){
return self.$i_g('@continuous');
});
$VN_2.$def('continuous=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'continuous');
self.$i_s('@continuous',flag);
VN$(self, 'did_change_value_for_key', 'continuous');
});
$VN_2.$def('editable?',function(self,_cmd){
return self.$i_g('@editable');
});
$VN_2.$def('editable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'editable');
self.$i_s('@editable',flag);
VN$(self, 'did_change_value_for_key', 'editable');
});
$VN_2.$def('selectable?',function(self,_cmd){
return self.$i_g('@selectable');
});
$VN_2.$def('selectable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'selectable');
self.$i_s('@selectable',flag);
VN$(self, 'did_change_value_for_key', 'selectable');
});
$VN_2.$def('bordered?',function(self,_cmd){
return self.$i_g('@bordered');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
self.$i_s('@bordered',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('bezeled?',function(self,_cmd){
return self.$i_g('@bezeled');
});
$VN_2.$def('bezeled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bezeled');
self.$i_s('@bezeled',flag);
VN$(self, 'did_change_value_for_key', 'bezeled');
});
$VN_2.$def('scrollable?',function(self,_cmd){
return self.$i_g('@scrollable');
});
$VN_2.$def('scrollable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'scrollable');
self.$i_s('@scrollable',flag);
if(RTEST(flag)){
VN$(self,'wraps=',false);
}
VN$(self, 'did_change_value_for_key', 'scrollable');
});
$VN_2.$def('highlighted?',function(self,_cmd){
return self.$i_g('@highlighted');
});
$VN_2.$def('highlighted=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'highlighted');
self.$i_s('@highlighted',flag);
VN$(self, 'did_change_value_for_key', 'highlighted');
});
$VN_2.$def('alignment',function(self,_cmd){
return self.$i_g('@alignment');
});
$VN_2.$def('alignment=',function(self,_cmd,align){
VN$(self, 'will_change_value_for_key', 'alignment');
self.$i_s('@alignment',align);
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('wraps?',function(self,_cmd){
return self.$i_g('@wraps');
});
$VN_2.$def('wraps=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'wraps');
self.$i_s('@wraps',flag);
if(RTEST(flag)){
VN$(self,'scrollable=',false);
}
VN$(self, 'did_change_value_for_key', 'wraps');
});
$VN_2.$def('font',function(self,_cmd){
return self.$i_g('@font');
});
$VN_2.$def('font=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'font');
self.$i_s('@font',obj);
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('entry_acceptable?',function(self,_cmd,str){
return true;
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('formatter=',function(self,_cmd,formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
self.$i_s('@formatter',formatter);
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
return self.$i_g('@formatter');
});
$VN_2.$def('object_value',function(self,_cmd){
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
self.$i_s('@value',obj);
VN$(self, 'did_change_value_for_key', 'object_value');
});
$VN_2.$def('valid_object_value?',function(self,_cmd){
return true;
});
$VN_2.$def('string_value',function(self,_cmd){
});
$VN_2.$def('string_value=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'string_value');
VN$(self, 'did_change_value_for_key', 'string_value');
});
$VN_2.$def('int_value',function(self,_cmd){
});
$VN_2.$def('int_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'int_value');
VN$(self, 'did_change_value_for_key', 'int_value');
});
$VN_2.$def('float_value',function(self,_cmd){
});
$VN_2.$def('float_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'float_value');
VN$(self, 'did_change_value_for_key', 'float_value');
});
$VN_2.$def('double_value',function(self,_cmd){
});
$VN_2.$def('double_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'double_value');
VN$(self, 'did_change_value_for_key', 'double_value');
});
$VN_2.$def('compare',function(self,_cmd,other_cell){
});
$VN_2.$def('take_int_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_float_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_double_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_string_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_object_value_from',function(self,_cmd,sender){
});
$VN_2.$def('image',function(self,_cmd){
return self.$i_g('@image');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('control_tint',function(self,_cmd){
return self.$i_g('@control_tint');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
self.$i_s('@control_tint',control_tint);
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'control_size');
self.$i_s('@control_size',size);
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('control_size',function(self,_cmd){
return self.$i_g('@control_size');
});
$VN_2.$def('represented_object',function(self,_cmd){
return self.$i_g('@represented_object');
});
$VN_2.$def('represented_object=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'represented_object');
self.$i_s('@represented_object',obj);
VN$(self, 'did_change_value_for_key', 'represented_object');
});
$VN_2.$def('cell_attribute',function(self,_cmd,a_parameter){
});
$VN_2.$def('set_cell_attribute:to:',function(self,_cmd,a_parameter,value){
});
$VN_2.$def('image_rect_for_bounds',function(self,_cmd,the_rect){
return the_rect;
});
$VN_2.$def('title_rect_for_bounds',function(self,_cmd,the_rect){
return the_rect;
});
$VN_2.$def('drawing_rect_for_bounds',function(self,_cmd,the_rect){
return the_rect;
});
$VN_2.$def('cell_size',function(self,_cmd){
});
$VN_2.$def('cell_size_for_bounds',function(self,_cmd,a_rect){
});
$VN_2.$def('highlight_color_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('calc_draw_info',function(self,_cmd,a_rect){
});
$VN_2.$def('set_up_field_editor_attributes',function(self,_cmd,text_obj){
return text_obj;
});
$VN_2.$def('render_interior_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('draw_interior_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('draw_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('highlight:with_frame:in_view:',function(self,_cmd,flag,cell_frame,control_view){
if(RTEST(VN$(self.$i_g('@highlighted'),'!=',flag))){
self.$i_s('@highlighted',flag);
VN$(self,'render_with_frame:in_view:',cell_frame,control_view);
}
});
$VN_2.$def('mouse_down_flags',function(self,_cmd){
});
$VN_2.$def('get_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('render_context=',function(self,_cmd,a_context){
VN$(self, 'will_change_value_for_key', 'render_context');
self.$i_s('@render_context',a_context);
VN$(self, 'did_change_value_for_key', 'render_context');
});
$VN_2.$def('render_context',function(self,_cmd){
return self.$i_g('@render_context');
});
$VN_2.$def('start_tracking_at:in_view:',function(self,_cmd,start_point,control_view){
return true;
});
$VN_2.$def('continue_tracking:at:in_view:',function(self,_cmd,last_point,current_point,control_view){
return true;
});
$VN_2.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_cmd,last_point,stop_point,control_view,flag){
});
$VN_2.$def('track_mouse:in_rect:of_view:until_mouse_up:',function(self,_cmd,the_event,cell_frame,control_view,flag){
var location = VN$(control_view,'convert_point:from_view:',VN$(the_event,'location_in_window'),nil);
if(!RTEST(VN$(self,'start_tracking_at:in_view:',VN$(the_event,'location_in_window'),control_view))){
return false;
}
VN$(self,'highlight:with_frame:in_view:',true,cell_frame,control_view);
if(RTEST(VN$(self, 'continuous?'))){
VN$(control_view,'send_action:to:',VN$(self, 'action'),VN$(self, 'target'));
}
return VN$(self.$klass.$c_g_full('App'),'bind_events',['left_mouse_up','left_mouse_dragged'],function(the_event){
location = VN$(control_view,'convert_point:from_view:',VN$(the_event,'location_in_window'),nil);
if(RTEST(flag)){
if(RTEST(VN$(VN$(the_event,'type'),'==','left_mouse_up'))){
VN$(self,'stop_tracking:at:in_view:mouse_is_up:',VN$(the_event,'location_in_window'),VN$(the_event,'location_in_window'),control_view,true);
VN$(self.$klass.$c_g_full('App'),'unbind_events');
if(RTEST(VN$(location,'in_rect?',cell_frame))){
if(RTEST(VN$(self.$i_g('@state'),'==','on'))){
self.$i_s('@state','off');
}
else{
self.$i_s('@state','on');
}
VN$(control_view,'send_action:to:',VN$(self, 'action'),VN$(self, 'target'));
}
VN$(self,'highlight:with_frame:in_view:',false,cell_frame,control_view);
return ;
}
else{
if(!RTEST(VN$(self,'continue_tracking:at:in_view:',VN$(the_event,'location_in_window'),VN$(the_event,'location_in_window'),control_view))){
VN$(self.$klass.$c_g_full('App'),'unbind_events');
}
VN$(self,'highlight:with_frame:in_view:',VN$(location,'in_rect?',cell_frame) ? true : false,cell_frame,control_view);
}
}
});
});
$VN_2.$def('edit_with_frame:in_view:editor:delegate:event:',function(self,_cmd,a_rect,control_view,text_obj,an_obj,the_event){
});
$VN_2.$def('select_with_frame:in_view:editor:delegate:start:length:',function(self,_cmd,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
$VN_2.$def('end_editing',function(self,_cmd,text_obj){
});
$VN_2.$def('reset_cursor_rect:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('menu=',function(self,_cmd,a_menu){
VN$(self, 'will_change_value_for_key', 'menu');
self.$i_s('@menu',a_menu);
VN$(self, 'did_change_value_for_key', 'menu');
});
$VN_2.$def('menu',function(self,_cmd){
return self.$i_g('@menu');
});
$VN_2.$def('menu_for_event:in_rect:of_view:',function(self,_cmd,the_event,cell_frame,view){
});
$VN_2.$def_s('default_menu',function(self,_cmd){
});
$VN_2.$def('sends_action_on_end_editing=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'sends_action_on_end_editing');
self.$i_s('@sends_action_on_end_editing',flag);
VN$(self, 'did_change_value_for_key', 'sends_action_on_end_editing');
});
$VN_2.$def('sends_action_on_end_editing?',function(self,_cmd){
return self.$i_g('@sends_action_on_end_editing');
});
$VN_2.$def('base_writing_direction',function(self,_cmd){
return self.$i_g('@base_writing_direction');
});
$VN_2.$def('base_writing_direction=',function(self,_cmd,direction){
VN$(self, 'will_change_value_for_key', 'base_writing_direction');
self.$i_s('@base_writing_direction',direction);
VN$(self, 'did_change_value_for_key', 'base_writing_direction');
});
$VN_2.$def('line_break_mode=',function(self,_cmd,mode){
VN$(self, 'will_change_value_for_key', 'line_break_mode');
self.$i_s('@line_break_mode',mode);
VN$(self, 'did_change_value_for_key', 'line_break_mode');
});
$VN_2.$def('line_break_mode',function(self,_cmd){
return self.$i_g('@line_break_mode');
});
$VN_2.$def('allows_undo=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_undo');
self.$i_s('@allows_undo',flag);
VN$(self, 'did_change_value_for_key', 'allows_undo');
});
$VN_2.$def('allows_undo?',function(self,_cmd){
return self.$i_g('@allows_undo');
});
$VN_2.$def('refuses_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'refuses_first_responder');
self.$i_s('@refuses_first_responder',flag);
VN$(self, 'did_change_value_for_key', 'refuses_first_responder');
});
$VN_2.$def('refuses_first_responder?',function(self,_cmd){
return self.$i_g('@refuses_first_responder');
});
$VN_2.$def('accepts_first_responder?',function(self,_cmd){
return true;
});
$VN_2.$def('shows_first_responder?',function(self,_cmd){
return self.$i_g('@shows_first_responder');
});
$VN_2.$def('shows_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'shows_first_responder');
self.$i_s('@shows_first_responder',flag);
VN$(self, 'did_change_value_for_key', 'shows_first_responder');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('attributed_string_value',function(self,_cmd){
});
$VN_2.$def('attributed_string_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'attributed_string_value');
VN$(self, 'did_change_value_for_key', 'attributed_string_value');
});
$VN_2.$def('allows_editing_text_attributes?',function(self,_cmd){
return self.$i_g('@allows_editing_text_attributes');
});
$VN_2.$def('allows_editing_text_attributes=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_editing_text_attributes');
self.$i_s('@allows_editing_text_attributes',flag);
if(!RTEST(flag)){
VN$(self,'imports_graphics=',false);
}
VN$(self, 'did_change_value_for_key', 'allows_editing_text_attributes');
});
$VN_2.$def('imports_graphics?',function(self,_cmd){
return self.$i_g('@imports_graphics');
});
$VN_2.$def('imports_graphics=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'imports_graphics');
self.$i_s('@imports_graphics',flag);
if(RTEST(flag)){
var allows_editing_text_attributes = true;
}
VN$(self, 'did_change_value_for_key', 'imports_graphics');
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
self.$i_s('@allows_mixed_state',flag);
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state?',function(self,_cmd){
return self.$i_g('@allows_mixed_state');
});
$VN_2.$def('next_state',function(self,_cmd){
});
$VN_2.$def('set_next_state',function(self,_cmd){
});
$VN_2.$def('hit_test_for_event:in_rect:of_view:',function(self,_cmd,event,cell_frame,control_view){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Button',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('ButtonCell');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
VN$(self.$i_g('@cell'),'title=',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('alternate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alternate_title');
VN$(self.$i_g('@cell'),'alternate_title=',str);
VN$(self, 'did_change_value_for_key', 'alternate_title');
});
$VN_2.$def('alternate_image',function(self,_cmd){
return VN$(self.$i_g('@cell'),'alternate_image');
});
$VN_2.$def('alternate_image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'alternate_image');
VN$(self.$i_g('@cell'),'alternate_image=',img);
VN$(self, 'did_change_value_for_key', 'alternate_image');
});
$VN_2.$def('image=',function(self,_cmd,image){
VN$(self, 'will_change_value_for_key', 'image');
VN$(self.$i_g('@cell'),'image=',image);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('image_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'image_position');
VN$(self.$i_g('@cell'),'image_position=',position);
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
VN$(self.$i_g('@cell'),'type=',type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('type',function(self,_cmd){
return VN$(self.$i_g('@cell'),'type');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
VN$(self.$i_g('@cell'),'state=',val);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('state',function(self,_cmd){
return VN$(self.$i_g('@cell'),'state');
});
$VN_2.$def('on?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'on?');
});
$VN_2.$def('off?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'off?');
});
$VN_2.$def('mixed?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'mixed?');
});
$VN_2.$def('bordered?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'bordered?');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
VN$(self.$i_g('@cell'),'bordered=',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('transparent?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'transparent?');
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
VN$(self.$i_g('@cell'),'transparent=',flag);
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return VN$(self.$i_g('@cell'),'key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,code){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
VN$(self.$i_g('@cell'),'key_equivalent=',code);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return VN$(self.$i_g('@cell'),'key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
VN$(self.$i_g('@cell'),'key_equivalent_modifier_mask=',mask);
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('highlight=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'highlight');
VN$(self, 'did_change_value_for_key', 'highlight');
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,key){
});
$VN_2.$def('bezel=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel');
VN$(self.$i_g('@cell'),'bezel=',style);
VN$(self, 'did_change_value_for_key', 'bezel');
});
$VN_2.$def('bezel',function(self,_cmd){
return VN$(self.$i_g('@cell'),'bezel');
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
VN$(self.$i_g('@cell'),'allows_mixed_state=',flag);
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'allows_mixed_state?');
});
$VN_2.$def('next_state',function(self,_cmd){
});


var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ButtonCell',$VN_2.$c_g_full('Cell'));
$VN_2.$c_s('SWITCH_IMAGE_REGULAR',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[0,0,15,16],[0,17,15,16],[0,34,15,16]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE_REGULAR',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[16,0,15,16],[16,17,15,16],[16,34,15,16]));
$VN_2.$c_s('SWITCH_IMAGE_SMALL',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[0,51,12,13],[0,65,12,13],[0,79,12,13]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE_SMALL',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[13,51,12,13],[13,65,12,13],[13,79,12,13]));
$VN_2.$c_s('SWITCH_IMAGE_MINI',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[0,93,10,11],[0,105,10,11],[0,117,10,11]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE_MINI',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[11,93,10,11],[11,105,10,11],[11,117,10,11]));
$VN_2.$c_s('SWITCH_IMAGE_REGULAR_GRAPHITE',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[0,129,15,16],[0,146,15,16],[0,163,15,16]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE_REGULAR_GRAPHITE',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[16,129,15,16],[16,146,15,16],[16,163,15,16]));
$VN_2.$c_s('SWITCH_IMAGE_SMALL_GRAPHITE',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[0,180,12,13],[0,194,12,13],[0,208,12,13]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE_SMALL_GRAPHITE',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[13,180,12,13],[13,194,12,13],[13,208,12,13]));
$VN_2.$c_s('SWITCH_IMAGE_MINI_GRAPHITE',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[0,222,10,11],[0,234,10,11],[0,246,10,11]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE_MINI_GRAPHITE',VN$($VN_2.$c_g_full('Image'),'sprite:normal:gray_mask:disabled:','controls',[11,222,10,11],[11,234,10,11],[11,246,10,11]));
var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ButtonCell',$VN_2.$c_g_full('Cell'));
$VN_2.$def('init_text_cell',function(self,_cmd,str){
VN$sup(arguments.callee, self,_cmd,[str]);
self.$i_s('@transparent',false);
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','none');
self.$i_s('@alternate_title','');
self.$i_s('@alternate_image',nil);
self.$i_s('@image_dims_when_disabled',false);
self.$i_s('@bordered',true);
self.$i_s('@bezeled',true);
self.$i_s('@alignment','center');
self.$i_s('@key_equivalent','');
return self.$i_s('@key_equivalent_modifier_mask',0);
});
$VN_2.$def('init_image_cell',function(self,_cmd,img){
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$(self,'init_text_cell','ButtonCell');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
VN$sup(arguments.callee, self,_cmd,[control_tint]);
if(RTEST(ORTEST(VN$(self.$i_g('@type'),'==','switch'),VN$(self.$i_g('@type'),'==','radio')))){
VN$(self, '_update_button_images');
}
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'control_size');
VN$sup(arguments.callee, self,_cmd,[size]);
if(RTEST(ORTEST(VN$(self.$i_g('@type'),'==','switch'),VN$(self.$i_g('@type'),'==','radio')))){
VN$(self, '_update_button_images');
}
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('_update_button_images',function(self,_cmd){
var size_str = (function($v){
if(($e = VN$('small', '===', $v),$e!==nil && $e!==false)){
return '_SMALL';
}
else if(($e = VN$('mini', '===', $v),$e!==nil && $e!==false)){
return '_MINI';
}
else {
return '_REGULAR';
}
})(self.$i_g('@control_size'));
var tint_str = (function($v){
if(($e = VN$('graphite', '===', $v),$e!==nil && $e!==false)){
return '_GRAPHITE';
}
else if(($e = VN$('hud', '===', $v),$e!==nil && $e!==false)){
return '_HUD';
}
else {
return '';
}
})(self.$i_g('@control_tint'));
if(RTEST(VN$(self.$i_g('@type'),'==','switch'))){
var img_name = ["SWITCH_IMAGE",(size_str),(tint_str)].join('');
var alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
else if(RTEST(VN$(self.$i_g('@type'),'==','radio'))){
img_name = ["RADIO_IMAGE",(size_str),(tint_str)].join('');
alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
self.$i_s('@image',self.$klass.$c_g(img_name));
return self.$i_s('@alternate_image',self.$klass.$c_g(alt_img_name));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-button';
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('alternate_title',function(self,_cmd){
return self.$i_g('@alternate_title');
});
$VN_2.$def('alteernate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alteernate_title');
self.$i_s('@alternate_title',str);
VN$(self, 'did_change_value_for_key', 'alteernate_title');
});
$VN_2.$def('alternate_image',function(self,_cmd){
return self.$i_g('@alternate_image');
});
$VN_2.$def('alternate_image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'alternate_image');
self.$i_s('@alternate_image',img);
VN$(self, 'did_change_value_for_key', 'alternate_image');
});
$VN_2.$def('image_position',function(self,_cmd){
return self.$i_g('@image_position');
});
$VN_2.$def('image_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'image_position');
self.$i_s('@image_position',position);
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('image_scaling',function(self,_cmd){
return self.$i_g('@image_scaling');
});
$VN_2.$def('image_scaling=',function(self,_cmd,image_scaling){
VN$(self, 'will_change_value_for_key', 'image_scaling');
self.$i_s('@image_scaling',image_scaling);
VN$(self, 'did_change_value_for_key', 'image_scaling');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',val);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
});
$VN_2.$def('on?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','on');
});
$VN_2.$def('off?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','off');
});
$VN_2.$def('mixed?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','mixed');
});
$VN_2.$def('highlights_by',function(self,_cmd){
return self.$i_g('@highlights_by');
});
$VN_2.$def('highlights_by=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'highlights_by');
self.$i_s('@highlights_by',a_type);
VN$(self, 'did_change_value_for_key', 'highlights_by');
});
$VN_2.$def('shows_state_by=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'shows_state_by');
self.$i_s('@shows_state_by',a_type);
VN$(self, 'did_change_value_for_key', 'shows_state_by');
});
$VN_2.$def('shows_state_by',function(self,_cmd){
return self.$i_g('@shows_state_by');
});
$VN_2.$def('type=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'type');
self.$i_s('@type',a_type);
(function($v){
if(($e = VN$('momentary_light', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','change_background');
self.$i_s('@shows_state_by','none');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('push_on_push_off', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','change_background');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('toggle', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','contents');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('switch', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','contents');
self.$i_s('@shows_state_by','contents');
self.$i_s('@image_dims_when_disabled',true);
self.$i_s('@image_position','left');
VN$(self, '_update_button_images');
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment','left');
}
else if(($e = VN$('radio', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','contents');
self.$i_s('@shows_state_by','contents');
self.$i_s('@image_dims_when_disabled',true);
self.$i_s('@image_position','left');
VN$(self, '_update_button_images');
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment','left');
}
else if(($e = VN$('momentary_change', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','contents');
self.$i_s('@shows_state_by','none');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('on_off', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','change_background');
self.$i_s('@shows_state_by','change_background');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('momentary_push_in', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','none');
return self.$i_s('@image_dims_when_disabled',true);
}
})(a_type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('opaque?',function(self,_cmd){
return self.$i_g('@opaue');
});
$VN_2.$def('font=',function(self,_cmd,font_obj){
VN$(self, 'will_change_value_for_key', 'font');
self.$i_s('@font',font_obj);
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('transparent?',function(self,_cmd){
return self.$i_g('@transparent');
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
self.$i_s('@transparent',flag);
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('set_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('get_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,equiv){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
self.$i_s('@key_equivalent',equiv);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
self.$i_s('@key_equivalent_modifier_mask',mask);
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return self.$i_g('@key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'key_equivalent_font');
self.$i_s('@key_equivalent_font',font);
VN$(self, 'did_change_value_for_key', 'key_equivalent_font');
});
$VN_2.$def('key_equivalent_font',function(self,_cmd){
return self.$i_g('@key_equivalent_font');
});
$VN_2.$def('set_key_equivalent_font:size:',function(self,_cmd,font_name,size){
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
if(RTEST(ORTEST(NOTTEST(obj),ORTEST(VN$(obj,'==',0),VN$(obj,'==','off'))))){
obj = 'off';
}
else{
obj = 'on';
}
VN$sup(arguments.callee, self,_cmd,[obj]);
VN$(self, 'did_change_value_for_key', 'object_value');
});
$VN_2.$def('draw_image:with_frame:in_view:',function(self,_cmd,images,frame,control_view){
});
$VN_2.$def('draw_title:with_frame:in_view:',function(self,_cmd,title,frame,control_view){
});
$VN_2.$def('draw_bezel_with_frame:in_view:',function(self,_cmd,frame,control_view){
});
$VN_2.$def('render_bezel_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(RTEST(VN$(ctx,'first_time?'))){
VN$(ctx,'<<',"<div class='left'></div>");
VN$(ctx,'<<',"<div class='middle'></div>");
VN$(ctx,'<<',"<div class='right'></div>");
VN$(ctx,'<<',"<div class='title'></div>");
VN$(ctx,'<<',"<div class='image'></div>");
VN$(ctx,'first_time=',false);
}
var class_name_array = [VN$(self, 'class_name'),VN$(self, 'theme_name')];
if(!RTEST(VN$(self, 'enabled?'))){
VN$(class_name_array,'<<','disabled');
}
if(RTEST(VN$(self, 'bordered?'))){
VN$(class_name_array,'<<','bordered');
if(RTEST(ANDTEST(VN$(self, 'highlighted?'),VN$(self.$i_g('@highlights_by'),'==','push_in')))){
VN$(class_name_array,'<<','highlighted');
}
else{
}
}
return VN$(ctx,'class_name=',VN$(class_name_array,'join',' '));
});
$VN_2.$def('render_interior_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(!RTEST(VN$(VN$(self, 'image_position'),'==','image_only'))){
VN$(ctx,'selector','title',function(title){
VN$(title,'inner_html=',self.$i_g('@title'));
return VN$(title,'css',VN.$h('text_align',VN$(self, 'alignment')));
});
}
if(RTEST(self.$i_g('@image'))){
if(RTEST(VN$(self, 'on?'))){
VN$(self,'render_image:with_frame:in_view:',self.$i_g('@alternate_image'),cell_frame,control_view);
}
else{
VN$(self,'render_image:with_frame:in_view:',self.$i_g('@image'),cell_frame,control_view);
}
}
});
$VN_2.$def('render_image:with_frame:in_view:',function(self,_cmd,image,frame,control_view){
var enabled = self.$i_g('@enabled') ? true : NOTTEST(self.$i_g('@image_dims_when_disabled'));
var gray_mask = self.$i_g('@highlighted');
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
return VN$(ctx,'selector','image',function(img){
return VN$(image,'render_in_rect:enabled:gray_mask:',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(VN$(image,'size'),'width'),VN$(VN$(image,'size'),'height')),enabled,gray_mask);
});
});
$VN_2.$def('render_title:with_frame:in_view:',function(self,_cmd,title,frame,control_view){
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
self.$i_s('@control_view',control_view);
if(RTEST(VN$(self, 'transparent?'))){
return ;
}
VN$(self,'render_bezel_with_frame:in_view:',cell_frame,control_view);
return VN$(self,'render_interior_with_frame:in_view:',cell_frame,control_view);
});
$VN_2.$def('mouse_entered',function(self,_cmd,the_event){
});
$VN_2.$def('mouse_exited',function(self,_cmd,the_event){
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('attributed_title',function(self,_cmd){
return self.$i_g('@attributed_title');
});
$VN_2.$def('attributed_title=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'attributed_title');
self.$i_s('@attributed_title',obj);
VN$(self, 'did_change_value_for_key', 'attributed_title');
});
$VN_2.$def('attributed_alternate_title',function(self,_cmd){
return self.$i_g('@attributed_alternate_title');
});
$VN_2.$def('attributed_alternate_title=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'attributed_alternate_title');
self.$i_s('@attributed_alternate_title',obj);
VN$(self, 'did_change_value_for_key', 'attributed_alternate_title');
});
$VN_2.$def('bezel_style=',function(self,_cmd,bezel_style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',bezel_style);
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
$VN_2.$def('sound=',function(self,_cmd,a_sound){
VN$(self, 'will_change_value_for_key', 'sound');
self.$i_g('@sound');
VN$(self, 'did_change_value_for_key', 'sound');
});
$VN_2.$def('sound',function(self,_cmd){
return self.$i_g('@sound');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'CheckBox',$VN_2.$c_g_full('Button'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
return VN$(self,'type=','switch');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Slider',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('SliderCell');
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-slider';
});
$VN_2.$def('min_value',function(self,_cmd){
return self.$i_g('@min_value');
});
$VN_2.$def('min_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'min_value');
self.$i_s('@min_value',a_double);
VN$(self, 'did_change_value_for_key', 'min_value');
});
$VN_2.$def('max_value',function(self,_cmd){
return self.$i_g('@max_value');
});
$VN_2.$def('max_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'max_value');
self.$i_s('@max_value',a_double);
VN$(self, 'did_change_value_for_key', 'max_value');
});
$VN_2.$def('alt_increment_value=',function(self,_cmd,inc_value){
VN$(self, 'will_change_value_for_key', 'alt_increment_value');
self.$i_s('@alt_increment_value',inc_value);
VN$(self, 'did_change_value_for_key', 'alt_increment_value');
});
$VN_2.$def('alt_increment_value',function(self,_cmd){
return self.$i_g('@alt_increment_value');
});
VN$($VN_2,'attr_reader','title_color','title_font','title','knob_thickness','image');
$VN_2.$def('title_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'title_color');
self.$i_s('@title_color',color);
VN$(self, 'did_change_value_for_key', 'title_color');
});
$VN_2.$def('title_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'title_font');
self.$i_s('@title_font',font);
VN$(self, 'did_change_value_for_key', 'title_font');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('knob_thickness=',function(self,_cmd,a_float){
VN$(self, 'will_change_value_for_key', 'knob_thickness');
self.$i_s('@knob_thickness',a_float);
VN$(self, 'did_change_value_for_key', 'knob_thickness');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('vertical?',function(self,_cmd){
return self.$i_g('@vertical');
});
$VN_2.$def('accepts_first_mouse',function(self,_cmd,event){
return true;
});
VN$($VN_2,'attr_reader','number_of_tick_marks','tick_mark_position');
$VN_2.$def('number_of_tick_marks=',function(self,_cmd,count){
VN$(self, 'will_change_value_for_key', 'number_of_tick_marks');
self.$i_s('@number_of_tick_marks',count);
VN$(self, 'did_change_value_for_key', 'number_of_tick_marks');
});
$VN_2.$def('tick_mark_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'tick_mark_position');
self.$i_s('@tick_mark_position',pos);
VN$(self, 'did_change_value_for_key', 'tick_mark_position');
});
$VN_2.$def('allows_tick_mark_values_only=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_tick_mark_values_only');
self.$i_s('@allows_tick_mark_values_only',flag);
VN$(self, 'did_change_value_for_key', 'allows_tick_mark_values_only');
});
$VN_2.$def('allows_tick_mark_values_only?',function(self,_cmd){
return self.$i_g('@allows_tick_mark_values_only');
});
$VN_2.$def('tick_mark_value_at_index',function(self,_cmd,index){
});
$VN_2.$def('rect_of_tick_mark_at_index',function(self,_cmd,index){
});
$VN_2.$def('index_of_tick_mark_at_point',function(self,_cmd,point){
});
$VN_2.$def('closest_tick_mark_value_to_value',function(self,_cmd,value){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'SliderCell',$VN_2.$c_g_full('Cell'));
$VN_2.$c_s('TRACK_PADDING',2.0);
$VN_2.$c_s('KNOB_PADDING_REGULAR',9.5);
$VN_2.$c_s('KNOB_PADDING_SMALL',8);
$VN_2.$c_s('KNOB_PADDING_MINI',6.5);
$VN_2.$def_s('prefers_tracking_until_mouse_up',function(self,_cmd){
return true;
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$sup(arguments.callee, self,_cmd,[]);
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-slider';
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(RTEST(VN$(ctx,'first_time?'))){
VN$(ctx,'<<',"<div class='track-left'></div>");
VN$(ctx,'<<',"<div class='track-middle'></div>");
VN$(ctx,'<<',"<div class='track-right'></div>");
VN$(ctx,'<<',"<div class='knob'></div>");
VN$(ctx,'first_time=',false);
}
VN$(ctx,'class_name=',VN$(self, 'class_name'));
return VN$(ctx,'selector','knob',function(knob){
var min = 0;
var max = 100;
var value = 0;
var knob_position = VN$((VN$(value,'/',(VN$(max,'-',min)))),'*',((VN$(VN$(cell_frame,'width'),'-',(VN$((2),'*',self.$klass.$c_g_full('KNOB_PADDING_REGULAR')))))));
return VN$(knob,'css',VN.$h('left',[(knob_position),"px"].join('')));
});
});
$VN_2.$def('min_value',function(self,_cmd){
return self.$i_g('@min_value');
});
$VN_2.$def('min_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'min_value');
self.$i_s('@min_value',a_double);
VN$(self, 'did_change_value_for_key', 'min_value');
});
$VN_2.$def('max_value',function(self,_cmd){
return self.$i_g('@max_value');
});
$VN_2.$def('max_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'max_value');
self.$i_s('@max_value',a_double);
VN$(self, 'did_change_value_for_key', 'max_value');
});
$VN_2.$def('alt_increment_value=',function(self,_cmd,inc_value){
VN$(self, 'will_change_value_for_key', 'alt_increment_value');
self.$i_s('@alt_increment_value',inc_value);
VN$(self, 'did_change_value_for_key', 'alt_increment_value');
});
$VN_2.$def('alt_increment_value',function(self,_cmd){
return self.$i_g('@alt_increment_value');
});
$VN_2.$def('vertical?',function(self,_cmd){
return false;
});
$VN_2.$def('title_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'title_color');
self.$i_s('@title_color',color);
VN$(self, 'did_change_value_for_key', 'title_color');
});
$VN_2.$def('title_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'title_font');
self.$i_s('@title_font',font);
VN$(self, 'did_change_value_for_key', 'title_font');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('knob_thickness=',function(self,_cmd,a_float){
VN$(self, 'will_change_value_for_key', 'knob_thickness');
self.$i_s('@knob_thickness',a_float);
VN$(self, 'did_change_value_for_key', 'knob_thickness');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('number_of_tick_marks=',function(self,_cmd,count){
VN$(self, 'will_change_value_for_key', 'number_of_tick_marks');
self.$i_s('@number_of_tick_marks',count);
VN$(self, 'did_change_value_for_key', 'number_of_tick_marks');
});
$VN_2.$def('tick_mark_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'tick_mark_position');
self.$i_s('@tick_mark_position',pos);
VN$(self, 'did_change_value_for_key', 'tick_mark_position');
});
$VN_2.$def('allows_tick_mark_values_only=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_tick_mark_values_only');
self.$i_s('@allows_tick_mark_values_only',flag);
VN$(self, 'did_change_value_for_key', 'allows_tick_mark_values_only');
});
$VN_2.$def('allows_tick_mark_values_only?',function(self,_cmd){
return self.$i_g('@allows_tick_mark_values_only');
});
$VN_2.$def('tick_mark_value_at_index',function(self,_cmd,index){
});
$VN_2.$def('rect_of_tick_mark_at_index',function(self,_cmd,index){
});
$VN_2.$def('index_of_tick_mark_at_point',function(self,_cmd,point){
});
$VN_2.$def('closest_tick_mark_value_to_value',function(self,_cmd,value){
});
$VN_2.$def('start_tracking_at:in_view:',function(self,_cmd,start_point,control_view){
VN$(self,'highlight:with_frame:in_view:',true,nil,control_view);
return true;
});
$VN_2.$def('continue_tracking:at:in_view:',function(self,_cmd,last_point,current_point,control_view){
return true;
});
$VN_2.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_cmd,last_point,stop_point,control_view,flag){
return VN$(self,'highlight:with_frame:in_view:',false,nil,control_view);
});

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h('square', 0, 'rounded', 1));
var $VN_2 = RClass.define_under($VN_1, 'TextField',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@editable',true);
return self.$i_s('@selectable',true);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('TextFieldCell');
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
});
$VN_2.$def('resign_first_responder?',function(self,_cmd){
VN$(self,'puts','resign first responder....');
return true;
});
$VN_2.$def('become_first_responder?',function(self,_cmd){
VN$(self,'puts','becoming first responder!!');
VN$(VN$(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
return true;
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
return VN$(VN$(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'draws_background');
self.$i_s('@draws_background',flag);
VN$(self, 'did_change_value_for_key', 'draws_background');
});
$VN_2.$def('draws_background?',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('text_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'text_color');
self.$i_s('@text_color',color);
VN$(self, 'did_change_value_for_key', 'text_color');
});
$VN_2.$def('text_color',function(self,_cmd){
return self.$i_g('@text_color');
});
$VN_2.$def('bordered?',function(self,_cmd){
return self.$i_g('@bordered');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
self.$i_s('@bordered',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('bezeled?',function(self,_cmd){
return self.$i_g('@bezeled');
});
$VN_2.$def('bezeled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bezeled');
self.$i_s('@bezeled',flag);
VN$(self, 'did_change_value_for_key', 'bezeled');
});
$VN_2.$def('editable?',function(self,_cmd){
return self.$i_g('@editable');
});
$VN_2.$def('editable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'editable');
self.$i_s('@editable',flag);
VN$(self, 'did_change_value_for_key', 'editable');
});
$VN_2.$def('selectable?',function(self,_cmd){
return self.$i_g('@selectable');
});
$VN_2.$def('selectable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'selectable');
self.$i_s('@selectable',flag);
VN$(self, 'did_change_value_for_key', 'selectable');
});
$VN_2.$def('select_text',function(self,_cmd,sender){
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('delegate=',function(self,_cmd,an_obj){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_s('@delegate',an_obj);
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('text_should_begin_editing?',function(self,_cmd,text_object){
return true;
});
$VN_2.$def('text_should_end_editing?',function(self,_cmd,text_object){
return true;
});
$VN_2.$def('text_did_begin_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_end_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_change',function(self,_cmd,notification){
});
$VN_2.$def('bezel_style=',function(self,_cmd,stlye){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',VN$(self, 'style'));
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TextFieldCell',$VN_2.$c_g_full('Cell'));
$VN_2.$def('init_text_cell',function(self,_cmd,str){
VN$sup(arguments.callee, self,_cmd,[str]);
self.$i_s('@editable',true);
self.$i_s('@selectable',true);
self.$i_s('@bezeled',true);
self.$i_s('@text_input_type','input');
self.$i_s('@value','');
return self;
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(RTEST(VN$(ctx,'first_time?'))){
VN$(ctx,'<<',"<div class='left'></div>");
VN$(ctx,'<<',"<div class='middle'></div>");
VN$(ctx,'<<',"<div class='right'></div>");
if(RTEST(VN$(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
VN$(ctx,'<<',"<input class='input'></input>");
}
else{
VN$(ctx,'<<',"<div class='input'></input>");
}
VN$(ctx,'first_time=',false);
}
VN$(ctx,'class_name=',VN$([VN$(self, 'class_name'),VN$(self, 'theme_name')],'join',' '));
if(RTEST(VN$(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
}
else{
VN$(ctx,'selector','input',function(input){
return VN$(input,'inner_text=',self.$i_g('@value'));
});
}
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'draws_background');
self.$i_s('@draws_background',flag);
VN$(self, 'did_change_value_for_key', 'draws_background');
});
$VN_2.$def('draws_background?',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('text_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'text_color');
self.$i_s('@text_color',color);
VN$(self, 'did_change_value_for_key', 'text_color');
});
$VN_2.$def('text_color',function(self,_cmd){
return self.$i_g('@text_color');
});
$VN_2.$def('set_up_field_editor_attributes',function(self,_cmd,text_obj){
return text_obj;
});
$VN_2.$def('bezel_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',style);
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
$VN_2.$def('placeholder_string=',function(self,_cmd,string){
VN$(self, 'will_change_value_for_key', 'placeholder_string');
self.$i_s('@placeholder_string',string);
VN$(self, 'did_change_value_for_key', 'placeholder_string');
});
$VN_2.$def('placeholder_string',function(self,_cmd){
return self.$i_g('@placeholder_string');
});
$VN_2.$def('placeholder_attributed_string=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'placeholder_attributed_string');
self.$i_g('@placeholder_attributed_string');
VN$(self, 'did_change_value_for_key', 'placeholder_attributed_string');
});
$VN_2.$def('placeholder_attributed_string',function(self,_cmd){
return self.$i_g('@placeholder_attributed_string');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ScrollView',$VN_2.$c_g_full('View'));
$VN_2.$def_s('frame_size_for_content_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
$VN_2.$def_s('content_size_for_frame_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@content_view',VN$(self.$klass.$c_g_full('ClipView'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,100,100)));
self.$i_s('@border_type','none');
return VN$(self,'add_subview',self.$i_g('@content_view'));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-scroll-view';
});
$VN_2.$def('document_visible_rect',function(self,_cmd){
});
$VN_2.$def('content_size',function(self,_cmd){
});
$VN_2.$def('document_view=',function(self,_cmd,a_view){
VN$(self, 'will_change_value_for_key', 'document_view');
VN$(self.$i_g('@content_view'),'document_view=',a_view);
VN$(self,'reflect_scrolled_clip_view',self.$i_g('@content_view'));
VN$(self, 'did_change_value_for_key', 'document_view');
});
$VN_2.$def('document_view',function(self,_cmd){
return VN$(self.$i_g('@content_view'),'document_view');
});
$VN_2.$def('content_view=',function(self,_cmd,content_view){
VN$(self, 'will_change_value_for_key', 'content_view');
VN$(self.$i_g('@content_view'),'remove_from_superview');
self.$i_s('@content_view',content_view);
VN$(self,'add_subview',self.$i_g('@content_view'));
VN$(self, 'tile');
VN$(self, 'did_change_value_for_key', 'content_view');
});
$VN_2.$def('content_view',function(self,_cmd){
return self.$i_g('@content_view');
});
$VN_2.$def('document_cursor=',function(self,_cmd,an_obj){
VN$(self, 'will_change_value_for_key', 'document_cursor');
self.$i_s('@document_cursor',an_obj);
VN$(self, 'did_change_value_for_key', 'document_cursor');
});
$VN_2.$def('document_cursor',function(self,_cmd){
return self.$i_g('@document_cursor');
});
$VN_2.$def('border_type=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'border_type');
self.$i_s('@border_type',a_type);
VN$(self, 'did_change_value_for_key', 'border_type');
});
$VN_2.$def('border_type',function(self,_cmd){
return self.$i_g('@border_type');
});
$VN_2.$def('background_color=',function(self,_cmd,a_color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',a_color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'draws_background');
self.$i_s('@draws_background',flag);
VN$(self, 'did_change_value_for_key', 'draws_background');
});
$VN_2.$def('draws_background',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('has_vertical_scroller=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'has_vertical_scroller');
if(RTEST(flag)){
if(!RTEST(self.$i_g('@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',true);
if(!RTEST(self.$i_g('@vertical_scroller'))){
self.$i_s('@vertical_scroller',VN$(self.$klass.$c_g_full('Scroller'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',150,40,40,15)));
VN$(self.$i_g('@vertical_scroller'),'target=',self);
VN$(self.$i_g('@vertical_scroller'),'action=','scroll_v');
}
VN$(self,'add_subview',self.$i_g('@vertical_scroller'));
}
}
else{
if(RTEST(self.$i_g('@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',false);
VN$(self.$i_g('@vertical_scroller'),'remove_from_superview');
}
}
VN$(self, 'tile');
VN$(self, 'did_change_value_for_key', 'has_vertical_scroller');
});
$VN_2.$def('has_vertical_scroller?',function(self,_cmd){
return self.$i_g('@has_vertical_scroller');
});
$VN_2.$def('has_horizontal_scroller=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'has_horizontal_scroller');
if(RTEST(flag)){
if(!RTEST(self.$i_g('@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',true);
if(!RTEST(self.$i_g('@horizontal_scroller'))){
self.$i_s('@horizontal_scroller',VN$(self.$klass.$c_g_full('Scroller'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',150,20,40,15)));
VN$(self.$i_g('@horizontal_scroller'),'target=',self);
VN$(self.$i_g('@horizontal_scroller'),'action=','scroll_h');
}
VN$(self,'add_subview',self.$i_g('@horizontal_scroller'));
}
}
else{
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',false);
VN$(self.$i_g('@horizontal_scroller'),'remove_from_superview');
}
}
VN$(self, 'tile');
VN$(self, 'did_change_value_for_key', 'has_horizontal_scroller');
});
$VN_2.$def('has_horizontal_scroller?',function(self,_cmd){
return self.$i_g('@has_horizontal_scroller');
});
$VN_2.$def('vertical_scroller=',function(self,_cmd,a_scroller){
VN$(self, 'will_change_value_for_key', 'vertical_scroller');
self.$i_s('@vertical_scroller',a_scroller);
VN$(self, 'did_change_value_for_key', 'vertical_scroller');
});
$VN_2.$def('vertical_scroller',function(self,_cmd){
return self.$i_g('@vertical_scroller');
});
$VN_2.$def('horizontal_scroller=',function(self,_cmd,a_scroller){
VN$(self, 'will_change_value_for_key', 'horizontal_scroller');
self.$i_s('@horizontal_scroller',a_scroller);
VN$(self, 'did_change_value_for_key', 'horizontal_scroller');
});
$VN_2.$def('horizontal_scroller',function(self,_cmd){
return self.$i_g('@horizontal_scroller');
});
$VN_2.$def('autohides_scrollers?',function(self,_cmd){
return self.$i_g('@autohides_scrollers');
});
$VN_2.$def('autohides_scrollers=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'autohides_scrollers');
self.$i_s('@autohides_scrollers',flag);
VN$(self, 'did_change_value_for_key', 'autohides_scrollers');
});
$VN_2.$def('horizontal_line_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'horizontal_line_scroll');
self.$i_s('@horizontal_line_scroll',value);
VN$(self, 'did_change_value_for_key', 'horizontal_line_scroll');
});
$VN_2.$def('horizontal_line_scroll',function(self,_cmd){
return self.$i_g('@horizontal_line_scroll');
});
$VN_2.$def('vertical_line_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'vertical_line_scroll');
self.$i_s('@vertical_line_scroll',value);
VN$(self, 'did_change_value_for_key', 'vertical_line_scroll');
});
$VN_2.$def('vertical_line_scroll',function(self,_cmd){
return self.$i_g('@vertical_line_scroll');
});
$VN_2.$def('line_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'line_scroll');
self.$i_s('@line_scroll',value);
VN$(self, 'did_change_value_for_key', 'line_scroll');
});
$VN_2.$def('line_scroll',function(self,_cmd){
return self.$i_g('@line_scroll');
});
$VN_2.$def('horizontal_page_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'horizontal_page_scroll');
self.$i_s('@horizontal_page_scroll',value);
VN$(self, 'did_change_value_for_key', 'horizontal_page_scroll');
});
$VN_2.$def('horizontal_page_scroll',function(self,_cmd){
return self.$i_g('@horizontal_page_scroll');
});
$VN_2.$def('vertical_page_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'vertical_page_scroll');
self.$i_s('@vertical_page_scroll',value);
VN$(self, 'did_change_value_for_key', 'vertical_page_scroll');
});
$VN_2.$def('vertical_page_scroll',function(self,_cmd){
return self.$i_g('@vertical_page_scroll');
});
$VN_2.$def('page_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'page_scroll');
self.$i_s('@page_scroll',value);
VN$(self, 'did_change_value_for_key', 'page_scroll');
});
$VN_2.$def('page_scroll',function(self,_cmd){
return self.$i_g('@page_scroll');
});
$VN_2.$def('scrolls_dynamically=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'scrolls_dynamically');
self.$i_s('@scrolls_dynamically',flag);
VN$(self, 'did_change_value_for_key', 'scrolls_dynamically');
});
$VN_2.$def('scrolls_dynamically?',function(self,_cmd){
return self.$i_g('@scrolls_dynamically');
});
$VN_2.$def('tile',function(self,_cmd){
if(RTEST(self.$i_g('@has_vertical_scroller'))){
var frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'x=',VN$(VN$(self.$i_g('@bounds'),'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
VN$(frame,'width=',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'));
VN$(frame,'height=',VN$(self.$i_g('@bounds'),'height'));
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
VN$(frame,'height=',VN$(VN$(frame,'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@vertical_scroller'),'frame=',frame);
}
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'y=',VN$(VN$(self.$i_g('@bounds'),'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
VN$(frame,'width=',VN$(self.$i_g('@bounds'),'width'));
VN$(frame,'height=',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
VN$(frame,'width=',VN$(VN$(frame,'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@horizontal_scroller'),'frame=',frame);
}
if(RTEST(self.$i_g('@content_view'))){
frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'width=',VN$(self.$i_g('@bounds'),'width'));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
VN$(frame,'width=',VN$(VN$(frame,'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(frame,'height=',VN$(self.$i_g('@bounds'),'height'));
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
VN$(frame,'height=',VN$(VN$(frame,'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@content_view'),'frame=',frame);
}
});
$VN_2.$def('reflect_scrolled_clip_view',function(self,_cmd,clip_view){
});
$VN_2.$def('scroll_wheel',function(self,_cmd,the_event){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Scroller',$VN_2.$c_g_full('Control'));
$VN_2.$def_s('scroller_width',function(self,_cmd){
return 15;
});
$VN_2.$def_s('scroller_width_for_control_size',function(self,_cmd,control_size){
return 15;
});
$VN_2.$def('class_name',function(self,_cmd){
return VN$(VN$(self.$i_g('@frame'),'width'),'<',VN$(self.$i_g('@frame'),'height')) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
$VN_2.$def('render',function(self,_cmd,context){
return VN$(context,'css',VN.$h('background_color','rgb(220,220,220)'));
});
$VN_2.$def('draw_parts',function(self,_cmd){
});
$VN_2.$def('rect_for_part',function(self,_cmd,part){
});
$VN_2.$def('check_space_for_parts',function(self,_cmd){
});
$VN_2.$def('usable_parts',function(self,_cmd){
});
$VN_2.$def('arrows_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'arrows_position');
self.$i_s('@arrows_position',position);
VN$(self, 'did_change_value_for_key', 'arrows_position');
});
$VN_2.$def('arrows_position',function(self,_cmd){
return self.$i_g('@arrows_position');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
self.$i_s('@control_tint',control_tint);
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_tint',function(self,_cmd){
return self.$i_g('@control_tint');
});
$VN_2.$def('control_size=',function(self,_cmd,control_size){
VN$(self, 'will_change_value_for_key', 'control_size');
self.$i_s('@control_size',control_size);
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('control_size',function(self,_cmd){
return self.$i_g('@control_size');
});
$VN_2.$def('draw_arrow:highlight:',function(self,_cmd,which_arrow,flag){
});
$VN_2.$def('draw_knob',function(self,_cmd){
});
$VN_2.$def('draw_knob_slot_in_rect:highlight:',function(self,_cmd,slot_rect,flag){
});
$VN_2.$def('highlight',function(self,_cmd,flag){
});
$VN_2.$def('test_part',function(self,_cmd,the_point){
});
$VN_2.$def('track_knob',function(self,_cmd,the_event){
});
$VN_2.$def('track_scroll_buttons',function(self,_cmd,the_event){
});
$VN_2.$def('hit_part',function(self,_cmd){
});
$VN_2.$def('knob_proportion',function(self,_cmd){
return self.$i_g('@knob_proportion');
});
$VN_2.$def('knob_proportion=',function(self,_cmd,proportion){
VN$(self, 'will_change_value_for_key', 'knob_proportion');
self.$i_s('@knob_proportion',proportion);
VN$(self, 'did_change_value_for_key', 'knob_proportion');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ClipView',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def('setup_display_context',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return VN$(self.$i_g('@element'),'css',VN.$h('overflow','hidden'));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-clip-view';
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'draws_background');
self.$i_s('@draws_background',flag);
VN$(self, 'did_change_value_for_key', 'draws_background');
});
$VN_2.$def('draws_background?',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('document_view=',function(self,_cmd,a_view){
VN$(self, 'will_change_value_for_key', 'document_view');
var default_center = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
if(RTEST(self.$i_g('@document_view'))){
VN$(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_FRAME_DID_CHANGE_NOTIFICATION'),self.$i_g('@document_view'));
VN$(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_BOUNDS_DID_CHANGE_NOTIFICATION'),self.$i_g('@document_view'));
VN$(self.$i_g('@document_view'),'remove_from_superview');
}
self.$i_s('@document_view',a_view);
VN$(self,'add_subview',a_view);
VN$(self, 'did_change_value_for_key', 'document_view');
});
$VN_2.$def('document_view',function(self,_cmd){
return self.$i_g('@document_view');
});
$VN_2.$def('document_rect',function(self,_cmd){
return VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
});
$VN_2.$def('document_cursor=',function(self,_cmd,an_obj){
VN$(self, 'will_change_value_for_key', 'document_cursor');
self.$i_s('@document_cursor',an_obj);
VN$(self, 'did_change_value_for_key', 'document_cursor');
});
$VN_2.$def('document_cursor',function(self,_cmd){
return self.$i_g('@document_cursor');
});
$VN_2.$def('document_visible_rect',function(self,_cmd){
return VN$(self,'convert_rect:to_view:',self.$i_g('@bounds'),self.$i_g('@document_view'));
});
$VN_2.$def('view_frame_changed',function(self,_cmd,notification){
});
$VN_2.$def('view_bounds_changed',function(self,_cmd,notification){
});
$VN_2.$def('copies_on_scroll=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'copies_on_scroll');
self.$i_s('@copies_on_scroll',flag);
VN$(self, 'did_change_value_for_key', 'copies_on_scroll');
});
$VN_2.$def('copies_on_scroll',function(self,_cmd){
return self.$i_g('@copies_on_scroll');
});
$VN_2.$def('auto_scroll?',function(self,_cmd,the_event){
return false;
});
$VN_2.$def('constrain_scroll_point',function(self,_cmd,new_origin){
return new_origin;
});
$VN_2.$def('scroll_to_point',function(self,_cmd,new_origin){
if(RTEST(VN$(VN$(self.$i_g('@subviews'),'length'),'>',0))){
VN$(VN$(self.$i_g('@subviews'),'[]',0),'frame_origin=',VN$(self.$klass.$c_g_full('Point'),'new',VN$((0),'-',VN$(new_origin,'x')),VN$((0),'-',VN$(new_origin,'y'))));
}
});
$VN_2.$def('scroll_x_y',function(self,_cmd,x,y){
return VN$(self,'scroll_to_point',VN$(self.$klass.$c_g_full('Point'),'new',x,y));
});
var $VN_2 = RClass.define_under($VN_1, 'View',$VN_2.$c_g_full('Responder'));
$VN_2.$def('reflect_scrolled_clip_view',function(self,_cmd,a_clip_view){
});
$VN_2.$def('scroll_clip_view:to_point:',function(self,_cmd,a_clip_view,a_point){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TableView',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@row_height',17.0);
self.$i_s('@intercell_spacing',VN$(self.$klass.$c_g_full('Size'),'new',3.0,2.0));
self.$i_s('@number_of_rows',VN$((1),'-@'));
self.$i_s('@table_columns',[]);
self.$i_s('@row_rects',[]);
return self.$i_s('@column_rects',[]);
});
$VN_2.$def('data_source=',function(self,_cmd,a_source){
VN$(self, 'will_change_value_for_key', 'data_source');
self.$i_s('@data_source',a_source);
VN$(self, 'did_change_value_for_key', 'data_source');
});
$VN_2.$def('data_source',function(self,_cmd){
return self.$i_g('@data_source');
});
$VN_2.$def('delegate=',function(self,_cmd,a_delegate){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_g('@delegate');
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('header_view=',function(self,_cmd,header_view){
VN$(self, 'will_change_value_for_key', 'header_view');
self.$i_s('@header_view',header_view);
VN$(self, 'did_change_value_for_key', 'header_view');
});
$VN_2.$def('header_view',function(self,_cmd){
return self.$i_g('@header_view');
});
$VN_2.$def('corner_view=',function(self,_cmd,corner_view){
VN$(self, 'will_change_value_for_key', 'corner_view');
self.$i_s('@corner_view',corner_view);
VN$(self, 'did_change_value_for_key', 'corner_view');
});
$VN_2.$def('corner_view',function(self,_cmd){
return self.$i_g('@corner_view');
});
$VN_2.$def('allows_column_reordering=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_column_reordering');
self.$i_s('@allows_column_reordering',flag);
VN$(self, 'did_change_value_for_key', 'allows_column_reordering');
});
$VN_2.$def('allows_column_reordering?',function(self,_cmd){
return self.$i_g('@allows_column_reordering');
});
$VN_2.$def('allows_column_resizing=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_column_resizing');
self.$i_s('@allows_column_resizing',flag);
VN$(self, 'did_change_value_for_key', 'allows_column_resizing');
});
$VN_2.$def('allows_column_resizing?',function(self,_cmd){
return self.$i_g('@allows_column_resizing');
});
$VN_2.$def('column_autoresizing_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'column_autoresizing_style');
self.$i_s('@column_autoresizing_style',style);
VN$(self, 'did_change_value_for_key', 'column_autoresizing_style');
});
$VN_2.$def('column_autoresizing_style',function(self,_cmd){
return self.$i_g('@column_autoresizing_style');
});
$VN_2.$def('grid_style_mask=',function(self,_cmd,grid_type){
VN$(self, 'will_change_value_for_key', 'grid_style_mask');
self.$i_s('@grid_style_mask',grid_type);
VN$(self, 'did_change_value_for_key', 'grid_style_mask');
});
$VN_2.$def('grid_style_mask',function(self,_cmd){
return self.$i_g('@grid_style_mask');
});
$VN_2.$def('intercell_spacing=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'intercell_spacing');
self.$i_s('@intercell_spacing',size);
VN$(self, 'did_change_value_for_key', 'intercell_spacing');
});
$VN_2.$def('intercell_spacing',function(self,_cmd){
return self.$i_g('@intercell_spacing');
});
$VN_2.$def('uses_alternating_row_background_colors=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'uses_alternating_row_background_colors');
self.$i_s('@uses_alternating_row_background_colors',flag);
VN$(self, 'did_change_value_for_key', 'uses_alternating_row_background_colors');
});
$VN_2.$def('uses_alternating_row_background_colors?',function(self,_cmd){
return self.$i_g('@uses_alternating_row_background_colors');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('grid_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'grid_color');
self.$i_s('@grid_color',color);
VN$(self, 'did_change_value_for_key', 'grid_color');
});
$VN_2.$def('grid_color',function(self,_cmd){
return self.$i_g('@grid_color');
});
$VN_2.$def('row_height=',function(self,_cmd,height){
VN$(self, 'will_change_value_for_key', 'row_height');
self.$i_s('@row_height',height);
VN$(self, 'did_change_value_for_key', 'row_height');
});
$VN_2.$def('row_height',function(self,_cmd){
return self.$i_g('@row_height');
});
$VN_2.$def('note_height_of_rows_with_indexes_changed',function(self,_cmd,index_set){
});
$VN_2.$def('table_columns',function(self,_cmd){
return self.$i_g('@table_columns');
});
$VN_2.$def('number_of_columns',function(self,_cmd){
return VN$(self.$i_g('@table_columns'),'length');
});
$VN_2.$def('number_of_rows',function(self,_cmd){
if(RTEST(VN$(self.$i_g('@number_of_rows'),'<',0))){
if(RTEST(self.$i_g('@data_source'))){
if(RTEST(VN$(self.$i_g('@data_source'),'respond_to?','number_of_rows_in_table_view'))){
self.$i_s('@number_of_rows',VN$(self.$i_g('@data_source'),'number_of_rows_in_table_view',self));
}
else{
VN$(self,'puts',['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s('@number_of_rows',0);
}
}
else{
self.$i_s('@number_of_rows',0);
}
}
return self.$i_g('@number_of_rows');
});
$VN_2.$def('add_table_column',function(self,_cmd,table_column){
VN$(self.$i_g('@table_columns'),'<<',table_column);
VN$(table_column,'table_view=',self);
return VN$(self, 'reload_data');
});
$VN_2.$def('remove_table_column',function(self,_cmd,table_column){
});
$VN_2.$def('move_column:to_column:',function(self,_cmd,old_index,new_index){
});
$VN_2.$def('column_with_identifier',function(self,_cmd){
});
$VN_2.$def('table_column_with_identifier',function(self,_cmd){
});
$VN_2.$def('tile',function(self,_cmd){
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('size_last_column_to_fit',function(self,_cmd){
});
$VN_2.$def('scroll_row_to_visible',function(self,_cmd,row){
});
$VN_2.$def('scroll_column_to_visible',function(self,_cmd,column){
});
$VN_2.$def('reload_data',function(self,_cmd){
VN$(self, 'note_number_of_rows_changed');
return VN$(self,'needs_display=',true);
});
$VN_2.$def('note_number_of_rows_changed',function(self,_cmd){
self.$i_s('@number_of_rows',VN$((1),'-@'));
var rows = VN$(self,'number_of_rows');
var size = VN$(self.$klass.$c_g_full('Size'),'new',VN$(self.$i_g('@frame'),'width'),VN$(self.$i_g('@frame'),'height'));
if(RTEST(VN$(rows,'>',0))){
VN$(size,'width=',VN$(VN$(self,'rect_of_row',0),'width'));
}
if(RTEST(VN$(VN$(self.$i_g('@table_columns'),'length'),'>',0))){
VN$(size,'height=',VN$(VN$(self,'rect_of_column',0),'height'));
}
});
$VN_2.$def('render',function(self,_cmd,context){
VN$(self,'_synchronize_render_context_with_row_data',context);
VN$(self,'render_background_in_clip_rect',self.$i_g('@bounds'),context);
return VN$(VN$(self, 'number_of_rows'),'times',function(row){
return VN$(context,'child_node',row,function(row_element){
return VN$(self,'render_row',row,self.$i_g('@bounds'),row_element);
});
});
});
$VN_2.$def('_synchronize_render_context_with_row_data',function(self,_cmd,context){
var children = VN$(context,'child_nodes');
var rows = VN$(self, 'number_of_rows');
if(RTEST(VN$(children,'<',rows))){
VN$(children,'times',function(i){
var rect = VN$(self,'rect_of_row',i);
return VN$(context,'child_node',i,function(elem){
return VN$(elem,'css',VN.$h('width',[(VN$(rect,'width')),"px"].join('')));
});
});
VN$((VN$(rows,'-',children)),'times',function(i){
var rect = VN$(self,'rect_of_row',VN$(children,'+',i));
return VN$(context,'<<',["<div style='top:",(VN$(rect,'y')),"px;left:",(VN$(rect,'x')),"px;width:",(VN$(rect,'width')),"px;height:",(VN$(rect,'height')),"px;'></div>"].join(''));
});
}
else if(RTEST(VN$(rows,'<',children))){
}
else{
VN$(children,'times',function(i){
var rect = VN$(self,'rect_of_row',i);
return VN$(context,'child_node',i,function(elem){
return VN$(elem,'css',VN.$h('width',[(VN$(rect,'width')),"px"].join('')));
});
});
}
});
$VN_2.$def('render_background_in_clip_rect',function(self,_cmd,clip_rect,context){
return VN$(context,'css',VN.$h('background_color','white'));
});
$VN_2.$def('render_row',function(self,_cmd,row,clip_rect,context){
var color = VN$((VN$(row,'*',10)),'+',150);
var children = VN$(context,'child_nodes');
var columns = VN$(self, 'number_of_columns');
if(RTEST(VN$(children,'<',columns))){
VN$((VN$(columns,'-',children)),'times',function(i){
return VN$(context,'<<',"<div></div>");
});
}
else if(RTEST(VN$(columns,'<',children))){
}
else{
}
if(RTEST(VN$(row,'odd?'))){
VN$(context,'css',VN.$h('background_color','rgb(234, 234, 234)'));
}
return VN$(columns,'times',function(column){
var data_cell = VN$(self,'prepared_cell_at_column:row:',column,row);
var table_column = VN$(self.$i_g('@table_columns'),'[]',column);
if(RTEST(ANDTEST(self.$i_g('@delegate'),VN$(self.$i_g('@delegate'),'respond_to?','table_view:will_display_cell:for_table_column:row:')))){
VN$(self.$i_g('@delegate'),'table_view:will_display_cell:for_table_column:row:',self,data_cell,table_column,row);
}
var cell_frame = VN$(self,'frame_of_cell_at_column:row:',column,row);
return VN$(context,'child_node',column,function(column_context){
if(RTEST(VN$(column,'<',children))){
VN$(column_context,'first_time=',false);
}
else{
VN$(column_context,'first_time=',true);
}
VN$(self.$klass.$c_g_full('RenderContext'),'current_context=',column_context);
VN$(column_context,'frame=',cell_frame);
return VN$(data_cell,'render_with_frame:in_view:',cell_frame,self);
});
});
});
$VN_2.$def('reload_data_for_row_indexes:column_indexes:',function(self,_cmd,row_indexes,column_indexes){
});
$VN_2.$def('edited_column',function(self,_cmd){
});
$VN_2.$def('edited_row',function(self,_cmd){
});
$VN_2.$def('clicked_column',function(self,_cmd){
});
$VN_2.$def('clicked_row',function(self,_cmd){
});
$VN_2.$def('double_action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'double_action');
self.$i_s('@double_action',selector);
VN$(self, 'did_change_value_for_key', 'double_action');
});
$VN_2.$def('double_action',function(self,_cmd){
return self.$i_g('@double_action');
});
$VN_2.$def('sort_descriptors=',function(self,_cmd,array){
VN$(self, 'will_change_value_for_key', 'sort_descriptors');
self.$i_s('@sort_descriptors',array);
VN$(self, 'did_change_value_for_key', 'sort_descriptors');
});
$VN_2.$def('sort_descriptors',function(self,_cmd){
return self.$i_g('@sort_descriptors');
});
$VN_2.$def('set_indicator_image:in_table_column:',function(self,_cmd,an_image,table_column){
});
$VN_2.$def('indicator_image_in_table_column',function(self,_cmd,table_column){
});
$VN_2.$def('highlighted_table_column=',function(self,_cmd,table_column){
VN$(self, 'will_change_value_for_key', 'highlighted_table_column');
self.$i_s('@highlighted_table_column',table_column);
VN$(self, 'did_change_value_for_key', 'highlighted_table_column');
});
$VN_2.$def('highlighted_table_column',function(self,_cmd){
return self.$i_g('@highlighted_table_column');
});
$VN_2.$def('vertical_motion_can_begin_drag=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'vertical_motion_can_begin_drag');
self.$i_s('@vertical_motion_can_begin_drag',flag);
VN$(self, 'did_change_value_for_key', 'vertical_motion_can_begin_drag');
});
$VN_2.$def('vertical_motion_can_begin_drag',function(self,_cmd){
return self.$i_g('@vertical_motion_can_begin_drag');
});
$VN_2.$def('can_drag_rows_with_indexes:at_point:',function(self,_cmd,row_indexes,mouse_down_point){
});
$VN_2.$def('drag_image_for_rows_with_indexes:table_columns:event:offset:',function(self,_cmd,drag_rows,table_columns,drag_event,drag_image_offset){
});
$VN_2.$def('set_dragging_source_operation_mask:for_local:',function(self,_cmd,mask,is_local){
});
$VN_2.$def('set_drop_row:drop_operation:',function(self,_cmd,row,drop_operation){
});
$VN_2.$def('allows_multiple_selection=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_multiple_selection');
self.$i_s('@allows_multiple_selection',flag);
VN$(self, 'did_change_value_for_key', 'allows_multiple_selection');
});
$VN_2.$def('allows_multiple_selection?',function(self,_cmd){
return self.$i_g('@allows_multiple_selection');
});
$VN_2.$def('allows_empty_selection=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_empty_selection');
self.$i_s('@allows_empty_selection',flag);
VN$(self, 'did_change_value_for_key', 'allows_empty_selection');
});
$VN_2.$def('allows_empty_selection?',function(self,_cmd){
return self.$i_g('@allows_empty_selection');
});
$VN_2.$def('allows_column_selection=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_column_selection');
self.$i_s('@allows_column_selection',flag);
VN$(self, 'did_change_value_for_key', 'allows_column_selection');
});
$VN_2.$def('allows_column_selection?',function(self,_cmd){
return self.$i_g('@allows_column_selection');
});
$VN_2.$def('select_all',function(self,_cmd,sender){
});
$VN_2.$def('deselect_all',function(self,_cmd,sender){
});
$VN_2.$def('select_column_indexes:by_extending_selection:',function(self,_cmd,indexes,extend_flag){
});
$VN_2.$def('select_row_indexes:by_extending_selection:',function(self,_cmd,indexes,extend_flag){
});
$VN_2.$def('selected_column_indexes',function(self,_cmd){
return self.$i_g('@selected_column_indexes');
});
$VN_2.$def('selected_row_indexes',function(self,_cmd){
return self.$i_g('@selected_row_indexes');
});
$VN_2.$def('deselect_column',function(self,_cmd,column){
});
$VN_2.$def('deselect_row',function(self,_cmd,row){
});
$VN_2.$def('selected_column',function(self,_cmd){
});
$VN_2.$def('selected_row',function(self,_cmd){
});
$VN_2.$def('column_selected?',function(self,_cmd,column){
});
$VN_2.$def('row_selected?',function(self,_cmd,row){
});
$VN_2.$def('number_of_selected_columns',function(self,_cmd){
});
$VN_2.$def('number_of_selected_rows',function(self,_cmd){
});
$VN_2.$def('allows_type_select?',function(self,_cmd){
return self.$i_g('@allows_type_select');
});
$VN_2.$def('allows_type_select=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'allows_type_select');
self.$i_s('@allows_type_select',value);
VN$(self, 'did_change_value_for_key', 'allows_type_select');
});
$VN_2.$def('selection_highlight_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'selection_highlight_style');
self.$i_s('@selection_highlight_style',style);
VN$(self, 'did_change_value_for_key', 'selection_highlight_style');
});
$VN_2.$def('selection_highlight_style',function(self,_cmd){
return self.$i_g('@selection_highlight_style');
});
$VN_2.$def('dragging_destination_feedback_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'dragging_destination_feedback_style');
self.$i_s('@dragging_destination_feedback_style',style);
VN$(self, 'did_change_value_for_key', 'dragging_destination_feedback_style');
});
$VN_2.$def('dragging_destination_feedback_style',function(self,_cmd){
return self.$i_g('@dragging_destination_feedback_style');
});
$VN_2.$def('rect_of_column',function(self,_cmd,column){
var result = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(VN$(column,'<',0),VN$(column,'>=',VN$(self.$i_g('@table_columns'),'length'))))){
return result;
}
var rows = VN$(self, 'number_of_rows');
var i = 0;
for (i = 0; i < column; i++) {VN$(result,'x=',VN$(VN$(result,'x'),'+',VN$(VN$(VN$(self.$i_g('@table_columns'),'[]',i),'width'),'+',VN$(self.$i_g('@intercell_spacing'),'width'))));
}for (i = 0; i < rows; i++) {VN$(result,'height=',VN$(VN$(result,'height'),'+',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height'))));
}return result;
});
$VN_2.$def('rect_of_row',function(self,_cmd,row){
var result = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(VN$(row,'<',0),VN$(row,'>=',VN$(self,'number_of_rows'))))){
return result;
}
var i = 0;
for (i = 0; i < row; i++) {VN$(result,'y=',VN$(VN$(result,'y'),'+',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height'))));
}VN$(result,'width=',VN$(self.$i_g('@bounds'),'width'));
VN$(result,'height=',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height')));
return result;
});
$VN_2.$def('column_indexes_in_rect',function(self,_cmd,rect){
});
$VN_2.$def('rows_in_rect',function(self,_cmd,rect){
});
$VN_2.$def('column_at_point',function(self,_cmd,point){
});
$VN_2.$def('row_at_point',function(self,_cmd,point){
});
$VN_2.$def('frame_of_cell_at_column:row:',function(self,_cmd,column,row){
var result = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(VN$(column,'<',0),VN$(column,'>',VN$(self, 'number_of_columns'))))){
return result;
}
VN$(column,'times',function(i){
return VN$(result,'x=',VN$(VN$(result,'x'),'+',VN$(VN$(VN$(self.$i_g('@table_columns'),'[]',i),'width'),'+',VN$(self.$i_g('@intercell_spacing'),'width'))));
});
VN$(result,'width=',VN$(VN$(VN$(self.$i_g('@table_columns'),'[]',column),'width'),'+',VN$(self.$i_g('@intercell_spacing'),'width')));
VN$(result,'height=',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height')));
return result;
});
$VN_2.$def('prepared_cell_at_column:row:',function(self,_cmd,column,row){
var table_column = VN$(self.$i_g('@table_columns'),'[]',column);
var cell = VN$(table_column,'data_cell_for_row',row);
VN$(cell,'object_value=',VN$(self.$i_g('@data_source'),'table_view:object_value_for_table_column:row:',self,table_column,row));
return cell;
});
$VN_2.$def('text_should_begin_editing?',function(self,_cmd,text_obj){
});
$VN_2.$def('text_should_end_editing?',function(self,_cmd,text_obj){
});
$VN_2.$def('text_did_begin_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_end_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_change',function(self,_cmd,notification){
});
$VN_2.$def('autosave_name=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'autosave_name');
self.$i_g('@autosave_name');
VN$(self, 'did_change_value_for_key', 'autosave_name');
});
$VN_2.$def('autosave_name',function(self,_cmd){
return self.$i_g('@autosave_name');
});
$VN_2.$def('autosave_table_columns=',function(self,_cmd,save){
VN$(self, 'will_change_value_for_key', 'autosave_table_columns');
self.$i_g('@autosave_table_columns');
VN$(self, 'did_change_value_for_key', 'autosave_table_columns');
});
$VN_2.$def('autosave_table_columns?',function(self,_cmd){
return self.$i_g('@autosave_table_columns');
});
$VN_2.$def('should_focus_cell:at_column:row:',function(self,_cmd,cell,column,row){
});
$VN_2.$def('focused_column',function(self,_cmd){
return self.$i_g('@focused_column');
});
$VN_2.$def('focused_column=',function(self,_cmd,column){
VN$(self, 'will_change_value_for_key', 'focused_column');
self.$i_s('@focused_column',column);
VN$(self, 'did_change_value_for_key', 'focused_column');
});
$VN_2.$def('perform_click_on_cell_at_column:row:',function(self,_cmd,column,row){
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
VN$(self,'puts','mouse down');
var location = VN$(self,'convert_point:from_view:',VN$(the_event,'location_in_window'),nil);
return VN$(self,'puts',[(VN$(location,'x')),", ",(VN$(location,'y'))].join(''));
});
$VN_2.$def('edit_column:row:with_event:select:',function(self,_cmd,column,row,the_event,select){
});
$VN_2.$def('draw_row:clip_rect:',function(self,_cmd,row,clip_rect){
});
$VN_2.$def('highlight_selection_in_clip_rect',function(self,_cmd,clip_rect){
});
$VN_2.$def('draw_grid_in_clip_rect',function(self,_cmd,clip_rect){
});
$VN_2.$def('draw_background_in_clip_rect',function(self,_cmd,clip_rect){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TableColumn',cObject);
$VN_2.$def('initialize',function(self,_cmd,identifier){
VN$(self,'identifier=',identifier);
self.$i_s('@data_cell',VN$(self.$klass.$c_g_full('TextFieldCell'),'new',''));
return self.$i_s('@width',100);
});
$VN_2.$def('identifier=',function(self,_cmd,identifier){
VN$(self, 'will_change_value_for_key', 'identifier');
self.$i_s('@identifier',identifier);
VN$(self, 'did_change_value_for_key', 'identifier');
});
$VN_2.$def('identifier',function(self,_cmd){
return self.$i_g('@identifier');
});
$VN_2.$def('table_view=',function(self,_cmd,table_view){
VN$(self, 'will_change_value_for_key', 'table_view');
self.$i_s('@table_view',table_view);
VN$(self, 'did_change_value_for_key', 'table_view');
});
$VN_2.$def('table_view',function(self,_cmd){
return self.$i_g('@table_view');
});
$VN_2.$def('width=',function(self,_cmd,width){
VN$(self, 'will_change_value_for_key', 'width');
self.$i_g('@width');
VN$(self, 'did_change_value_for_key', 'width');
});
$VN_2.$def('width',function(self,_cmd){
return self.$i_g('@width');
});
$VN_2.$def('min_width=',function(self,_cmd,min_width){
VN$(self, 'will_change_value_for_key', 'min_width');
self.$i_s('@min_width',min_width);
VN$(self, 'did_change_value_for_key', 'min_width');
});
$VN_2.$def('min_width',function(self,_cmd){
return self.$i_g('@min_width');
});
$VN_2.$def('max_width=',function(self,_cmd,max_width){
VN$(self, 'will_change_value_for_key', 'max_width');
self.$i_s('@max_width',max_width);
VN$(self, 'did_change_value_for_key', 'max_width');
});
$VN_2.$def('max_width',function(self,_cmd){
return self.$i_g('@max_width');
});
$VN_2.$def('header_cell=',function(self,_cmd,cell){
VN$(self, 'will_change_value_for_key', 'header_cell');
self.$i_s('@header_cell',cell);
VN$(self, 'did_change_value_for_key', 'header_cell');
});
$VN_2.$def('header_cell',function(self,_cmd){
return self.$i_g('@header_cell');
});
$VN_2.$def('data_cell',function(self,_cmd){
return self.$i_g('@data_cell');
});
$VN_2.$def('data_cell=',function(self,_cmd,data_cell){
VN$(self, 'will_change_value_for_key', 'data_cell');
self.$i_s('@data_cell',data_cell);
VN$(self, 'did_change_value_for_key', 'data_cell');
});
$VN_2.$def('data_cell_for_row',function(self,_cmd){
return self.$i_g('@data_cell');
});
$VN_2.$def('editable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'editable');
self.$i_g('@editable');
VN$(self, 'did_change_value_for_key', 'editable');
});
$VN_2.$def('editable?',function(self,_cmd){
return self.$i_g('@editable');
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('sort_descriptor_prototype=',function(self,_cmd,sort_descriptor){
VN$(self, 'will_change_value_for_key', 'sort_descriptor_prototype');
self.$i_s('@sort_descriptor_prototype',sort_descriptor);
VN$(self, 'did_change_value_for_key', 'sort_descriptor_prototype');
});
$VN_2.$def('sort_descriptor_prototype',function(self,_cmd){
return self.$i_g('@sort_descriptor_prototype');
});
$VN_2.$def('resizing_mask=',function(self,_cmd,resizing_mask){
VN$(self, 'will_change_value_for_key', 'resizing_mask');
self.$i_s('@resizing_mask',resizing_mask);
VN$(self, 'did_change_value_for_key', 'resizing_mask');
});
$VN_2.$def('resizing_mask',function(self,_cmd){
return self.$i_g('@resizing_mask');
});
$VN_2.$def('header_tool_tip=',function(self,_cmd,string){
VN$(self, 'will_change_value_for_key', 'header_tool_tip');
self.$i_s('@header_tool_tip',string);
VN$(self, 'did_change_value_for_key', 'header_tool_tip');
});
$VN_2.$def('header_tool_tip',function(self,_cmd){
return self.$i_g('@heder_tool_tip');
});
$VN_2.$def('hidden?',function(self,_cmd){
return self.$i_g('@hidden');
});
$VN_2.$def('hidden=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'hidden');
self.$i_s('@hidden',flag);
VN$(self, 'did_change_value_for_key', 'hidden');
});


var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'WindowView',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame]);
return self.$i_s('@style_mask',style_mask);
});
$VN_2.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def_s('min_frame_width_with_title:style_mask:',function(self,_cmd,title,style){
});
$VN_2.$def('frame_rect_for_content_rect',function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def('content_rect_for_frame_rect',function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-window-view';
});
$VN_2.$def('window=',function(self,_cmd,win){
VN$(self, 'will_change_value_for_key', 'window');
self.$i_s('@window',win);
VN$(self, 'did_change_value_for_key', 'window');
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
self.$i_s('@mouse_down_point',VN$(the_event,'location_in_window'));
return VN$(self.$klass.$c_g_full('App'),'bind_events',['left_mouse_up','left_mouse_dragged'],function(the_event){
if(RTEST(VN$(VN$(the_event,'type'),'==','left_mouse_up'))){
VN$(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var window_point = VN$(the_event,'location_in_window');
self.$i_s('@window_origin',VN$(VN$(self.$i_g('@window'),'frame'),'origin'));
self.$i_s('@delta_x',VN$(VN$(window_point,'x'),'-',VN$(self.$i_g('@mouse_down_point'),'x')));
self.$i_s('@delta_y',VN$(VN$(window_point,'y'),'-',VN$(self.$i_g('@mouse_down_point'),'y')));
VN$(self.$i_g('@window'),'frame_origin=',VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(self.$i_g('@window_origin'),'x'),'+',self.$i_g('@delta_x')),VN$(VN$(self.$i_g('@window_origin'),'y'),'+',self.$i_g('@delta_y'))));
}
});
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(['vn-window-view'],'join',' '));
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'NormalWindowView',$VN_2.$c_g_full('WindowView'));
$VN_2.$c_s('CLOSE_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,855,16,16]));
$VN_2.$c_s('CLOSE_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,855,16,16]));
$VN_2.$c_s('MIN_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,872,16,16]));
$VN_2.$c_s('MIN_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,872,16,16]));
$VN_2.$c_s('ZOOM_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,889,16,16]));
$VN_2.$c_s('ZOOM_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,889,16,16]));
$VN_2.$c_s('TITLEBAR_HEIGHT',24.0);
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(VN$(self.$i_g('@style_mask'),'include?','closable'))){
self.$i_s('@close_button',VN$(self.$klass.$c_g_full('Button'),'build',VN.$h('frame',VN$(self.$klass.$c_g_full('Rect'),'new',6,6,16,16),'bordered',false),function(close){
VN$(close,'bordered=',false);
VN$(close,'image_position=','image_only');
VN$(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
VN$(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
VN$(self,'<<',close);
return VN$(close,'needs_display=',true);
}));
}
if(RTEST(VN$(self.$i_g('@style_mask'),'include?','miniaturizable'))){
self.$i_s('@min_button',VN$(self.$klass.$c_g_full('Button'),'build',VN.$h('frame',VN$(self.$klass.$c_g_full('Rect'),'new',10,10,300,300),'bordered',false),function(min){
return VN$(self,'<<',min);
}));
}
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-normal-window-view';
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
VN$(context,'<<',"<div class='body'></div>");
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
});
$VN_2.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def_s('min_frame_width_with_title:style_mask:',function(self,_cmd,title,style){
});
$VN_2.$def('frame_rect_for_content_rect',function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def('content_rect_for_frame_rect',function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'HUDWindowView',$VN_2.$c_g_full('WindowView'));
$VN_2.$c_s('CLOSE_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,1280,13,13]));
$VN_2.$c_s('CLOSE_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[14,1280,13,13]));
$VN_2.$c_s('TITLEBAR_HEIGHT',19.0);
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(VN$(self.$i_g('@style_mask'),'include?','closable'))){
self.$i_s('@close_button',VN$(self.$klass.$c_g_full('Button'),'build',VN.$h('frame',VN$(self.$klass.$c_g_full('Rect'),'new',5,3,13,13),'bordered',false),function(close){
VN$(close,'bordered=',false);
VN$(close,'image_position=','image_only');
VN$(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
VN$(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
VN$(self,'<<',close);
return VN$(close,'needs_display=',true);
}));
}
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-hud-window-view';
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
VN$(context,'<<',"<div class='body'></div>");
VN$(context,'<<',"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'BorderlessWindowView',$VN_2.$c_g_full('WindowView'));
var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('WINDOW_MASKS',VN.$h('borderless', 0, 'titled', VN$((1),'<<',0), 'closable', VN$((1),'<<',1), 'miniaturizable', VN$((1),'<<',2), 'resizable', VN$((1),'<<',3), 'textured_background', VN$((1),'<<',8), 'unified_title_and_toolbar', VN$((1),'<<',12), 'close_button', 1, 'miniaturize_button', 1, 'zoom_button', 1, 'toolbar_button', 1, 'document_icon_button', 1, 'utility', VN$((1),'<<',4), 'doc_modal', VN$((1),'<<',6), 'hud', VN$((1),'<<',13)));
$VN_1.$c_s('WINDOW_LEVELS',VN.$h('normal', 0, 'floating', 0, 'submenu', 0, 'torn_off_menu', 0, 'main_menu', 0, 'status', 0, 'modal_panel', 0, 'pop_up_menu', 0, 'screen_saver', 0));
var $VN_2 = RClass.define_under($VN_1, 'Window',$VN_2.$c_g_full('Responder'));
$VN_2.$def('initialize',function(self,_cmd,content_rect,style_mask){
return VN$(self,'init_with_content_rect:style_mask:',content_rect,style_mask);
});
$VN_2.$def('init_with_content_rect:style_mask:',function(self,_cmd,content_rect,style_mask){
VN$(self, 'setup_display_context');
self.$i_s('@frame',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0));
self.$i_s('@window_number',VN$(self.$klass.$c_g_full('App'),'add_window',self));
self.$i_s('@style_mask',style_mask);
VN$(self,'level=','normal');
self.$i_s('@min_size',VN$(self.$klass.$c_g_full('Size'),'new',0.0,0.0));
self.$i_s('@max_size',VN$(self.$klass.$c_g_full('Size'),'new',9999.0,9999.0));
self.$i_s('@first_responder',self);
self.$i_s('@next_responder',self.$klass.$c_g_full('App'));
VN$(self,'setup_window_view');
VN$(self,'frame=',content_rect);
VN$(self.$i_g('@window_view'),'needs_display=',true);
VN$(self,'content_view=',VN$(self.$klass.$c_g_full('View'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(self.$i_g('@frame'),'width'),VN$(self.$i_g('@frame'),'height'))));
return self;
});
$VN_2.$def_s('build',function(self,_cmd,options,block){
var win = VN$(VN$(self,'alloc'),'init_with_content_rect:style_mask:',VN$(options,'[]','frame'),['titled','closable']);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
$VN_2.$def('setup_display_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'new','div'));
self.$i_s('@display_context',VN$(self.$klass.$c_g_full('RenderContext'),'new','div'));
VN$(self.$i_g('@element'),'<<',self.$i_g('@display_context'));
return VN$(self.$klass.$c_g_full('Document'),'<<',self.$i_g('@element'));
});
$VN_2.$def('setup_window_view',function(self,_cmd){
var view_class = VN$(self,'_window_view_class_for_style_mask',self.$i_g('@style_mask'));
self.$i_s('@window_view',VN$(view_class,'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,100,100),self.$i_g('@style_mask')));
VN$(self.$i_g('@window_view'),'view_will_move_to_window',self);
VN$(self.$i_g('@window_view'),'next_responder=',self);
VN$(self.$i_g('@element'),'<<',VN$(self.$i_g('@window_view'),'element'));
VN$(self.$i_g('@window_view'),'view_did_move_to_window');
VN$(self.$i_g('@window_view'),'needs_display=',true);
VN$(VN$(self.$i_g('@window_view'),'element'),'add_event_listener','mousedown',function(event){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',event,self,'left_mouse_down');
VN$(self.$klass.$c_g_full('App'),'send_event',the_event);
if(!RTEST(VN$(the_event,'allows_propagation?'))){
VN$(the_event,'stop_propagation');
}
});
return VN$(VN$(self.$i_g('@window_view'),'element'),'add_event_listener','mouseup',function(event){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',event,self,'left_mouse_up');
VN$(self.$klass.$c_g_full('App'),'send_event',the_event);
if(!RTEST(VN$(the_event,'allows_propagation?'))){
VN$(the_event,'stop_propagation');
}
});
});
$VN_2.$def('_window_view_class_for_style_mask',function(self,_cmd,style_mask){
if(RTEST(VN$(style_mask,'include?','borderless'))){
return self.$klass.$c_g_full('BorderlessWindowView');
}
else if(RTEST(VN$(style_mask,'include?','hud'))){
return self.$klass.$c_g_full('HUDWindowView');
}
else{
return self.$klass.$c_g_full('NormalWindowView');
}
});
$VN_2.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_cmd,rect,style){
});
$VN_2.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_cmd,rect,style){
});
$VN_2.$def_s('min_frame_width_with_title:style_mask:',function(self,_cmd,title,style){
});
$VN_2.$def('frame_rect_for_content_rect',function(self,_cmd,rect){
});
$VN_2.$def('content_rect_for_frame_rect',function(self,_cmd,rect){
return rect;
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('represnted_url=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'represnted_url');
VN$(self, 'did_change_value_for_key', 'represnted_url');
});
$VN_2.$def('represented_url',function(self,_cmd){
});
$VN_2.$def('represented_filename',function(self,_cmd){
});
$VN_2.$def('represented_filename=',function(self,_cmd,filename){
VN$(self, 'will_change_value_for_key', 'represented_filename');
VN$(self, 'did_change_value_for_key', 'represented_filename');
});
$VN_2.$def('set_title_with_represented_filename',function(self,_cmd,filename){
});
$VN_2.$def('excluded_from_windows_menu=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'excluded_from_windows_menu');
self.$i_s('@excluded_from_windows_menu',flag);
VN$(self, 'did_change_value_for_key', 'excluded_from_windows_menu');
});
$VN_2.$def('excluded_from_windows_menu?',function(self,_cmd){
return self.$i_g('@excluded_from_windows_menu');
});
$VN_2.$def('content_view=',function(self,_cmd,view){
VN$(self, 'will_change_value_for_key', 'content_view');
VN$(view,'view_will_move_to_window',self);
var bounds = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(VN$(self.$i_g('@frame'),'size'),'width'),VN$(VN$(self.$i_g('@frame'),'size'),'height'));
self.$i_s('@content_view',view);
VN$(self.$i_g('@content_view'),'frame=',VN$(self,'content_rect_for_frame_rect',bounds));
VN$(view,'view_did_move_to_window');
VN$(self.$i_g('@window_view'),'<<',self.$i_g('@content_view'));
VN$(self, 'did_change_value_for_key', 'content_view');
});
$VN_2.$def('content_view',function(self,_cmd){
return self.$i_g('@content_view');
});
$VN_2.$def('<<',function(self,_cmd,view){
return VN$(self.$i_g('@content_view'),'<<',view);
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_s('@delegate',obj);
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('delegate',function(self,_cmd){
});
$VN_2.$def('window_number',function(self,_cmd){
return self.$i_g('@window_number');
});
$VN_2.$def('style_mask',function(self,_cmd){
return self.$i_g('@style_mask');
});
$VN_2.$def('style_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'style_mask');
self.$i_s('@style_mask',mask);
VN$(self, 'did_change_value_for_key', 'style_mask');
});
$VN_2.$def('field_editor:for_object:',function(self,_cmd,create_flag,obj){
});
$VN_2.$def('end_editing_for',function(self,_cmd,obj){
});
$VN_2.$def('content_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'content_size');
VN$(self, 'did_change_value_for_key', 'content_size');
});
$VN_2.$def('frame_top_left_point=',function(self,_cmd,point){
VN$(self, 'will_change_value_for_key', 'frame_top_left_point');
VN$(self, 'did_change_value_for_key', 'frame_top_left_point');
});
$VN_2.$def('cascade_top_left_from_point',function(self,_cmd,point){
});
$VN_2.$def('frame',function(self,_cmd){
return self.$i_g('@frame');
});
$VN_2.$def('frame=',function(self,_cmd,frame){
VN$(self, 'will_change_value_for_key', 'frame');
VN$(self,'set_frame:display:animate:',frame,true,false);
VN$(self, 'did_change_value_for_key', 'frame');
});
$VN_2.$def('set_frame:display:',function(self,_cmd,frame_rect,flag){
return VN$(self,'set_frame:display:animate:',frame_rect,flag,false);
});
$VN_2.$def('set_frame:display:animate:',function(self,_cmd,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin = VN$(self.$i_g('@frame'),'origin');
var size = VN$(self.$i_g('@frame'),'size');
var new_origin = VN$(frame_rect,'origin');
var new_size = VN$(frame_rect,'size');
if(!RTEST(VN$(origin,'eql?',new_origin))){
VN$(origin,'x=',VN$(new_origin,'x'));
VN$(origin,'y=',VN$(new_origin,'y'));
VN$(self.$i_g('@element'),'origin=',origin);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did move',self);
}
if(!RTEST(VN$(size,'eql?',new_size))){
VN$(size,'width=',VN$(new_size,'width'));
VN$(size,'height=',VN$(new_size,'height'));
VN$(self.$i_g('@window_view'),'frame_size=',size);
VN$(self.$i_g('@element'),'size=',size);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did resize',self);
}
}
});
$VN_2.$def('frame_origin=',function(self,_cmd,origin){
VN$(self, 'will_change_value_for_key', 'frame_origin');
if(!RTEST(VN$(origin,'eql?',VN$(self.$i_g('@frame'),'origin')))){
VN$(VN$(self.$i_g('@frame'),'origin'),'x=',VN$(origin,'x'));
VN$(VN$(self.$i_g('@frame'),'origin'),'y=',VN$(origin,'y'));
VN$(self.$i_g('@element'),'origin=',origin);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did move',self);
}
VN$(self, 'did_change_value_for_key', 'frame_origin');
});
$VN_2.$def('animation_resize_time',function(self,_cmd,new_frame){
});
$VN_2.$def('in_live_resize?',function(self,_cmd){
});
$VN_2.$def('shows_resize_indicator=',function(self,_cmd,show){
VN$(self, 'will_change_value_for_key', 'shows_resize_indicator');
self.$i_s('@shows_resize_indicator',show);
VN$(self, 'did_change_value_for_key', 'shows_resize_indicator');
});
$VN_2.$def('shows_resize_indicator?',function(self,_cmd){
return self.$i_g('@shows_resize_indicator');
});
$VN_2.$def('resize_increments=',function(self,_cmd,increments){
VN$(self, 'will_change_value_for_key', 'resize_increments');
self.$i_s('@resize_increments',increments);
VN$(self, 'did_change_value_for_key', 'resize_increments');
});
$VN_2.$def('resize_incremenets',function(self,_cmd){
return self.$i_g('@resize_increments');
});
$VN_2.$def('aspect_ratio=',function(self,_cmd,ratio){
VN$(self, 'will_change_value_for_key', 'aspect_ratio');
self.$i_s('@aspect_ratio',ratio);
VN$(self, 'did_change_value_for_key', 'aspect_ratio');
});
$VN_2.$def('aspect_ratio',function(self,_cmd){
return self.$i_g('@aspect_ratio');
});
$VN_2.$def('display',function(self,_cmd){
});
$VN_2.$def('preserves_content_during_live_resize?',function(self,_cmd){
return self.$i_g('@preserves_content_during_live_resize');
});
$VN_2.$def('preserves_content_during_live_resize=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'preserves_content_during_live_resize');
self.$i_s('@preserves_content_during_live_resize',flag);
VN$(self, 'did_change_value_for_key', 'preserves_content_during_live_resize');
});
$VN_2.$def('update',function(self,_cmd){
});
$VN_2.$def('make_first_responder',function(self,_cmd,responder){
if(RTEST(VN$(self.$i_g('@first_responder'),'==',responder))){
return true;
}
if(!RTEST(VN$(self.$i_g('@first_responder'),'resign_first_responder'))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(VN$(responder,'accepts_first_responder')),NOTTEST(VN$(responder,'become_first_responder')))))){
self.$i_s('@first_responder',self);
VN$(self,'puts','Cant make responder the first responder :(');
return false;
}
self.$i_s('@first_responder',responder);
return true;
});
$VN_2.$def('first_responder',function(self,_cmd){
});
$VN_2.$def('resize_flags',function(self,_cmd){
});
$VN_2.$def('key_down',function(self,_cmd,the_event){
});
$VN_2.$def('close',function(self,_cmd){
});
$VN_2.$def('released_when_closed=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'released_when_closed');
self.$i_s('@released_when_closed',flag);
VN$(self, 'did_change_value_for_key', 'released_when_closed');
});
$VN_2.$def('released_when_closed?',function(self,_cmd){
return self.$i_g('@released_when_closed');
});
$VN_2.$def('miniaturize',function(self,_cmd,sender){
});
$VN_2.$def('deminiaturize',function(self,_cmd,sender){
});
$VN_2.$def('zoomed?',function(self,_cmd){
return self.$i_g('@zoomed');
});
$VN_2.$def('zoom',function(self,_cmd,sender){
});
$VN_2.$def('miniaturized?',function(self,_cmd){
return self.$i_g('@miniaturized');
});
$VN_2.$def('try_to_perform:with:',function(self,_cmd,action,object){
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('movable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'movable');
self.$i_s('@movable',flag);
VN$(self, 'did_change_value_for_key', 'movable');
});
$VN_2.$def('movable?',function(self,_cmd){
return self.$i_g('@movable');
});
$VN_2.$def('movable_by_window_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'movable_by_window_background');
self.$i_g('@movable_by_window_background');
VN$(self, 'did_change_value_for_key', 'movable_by_window_background');
});
$VN_2.$def('movable_by_window_background?',function(self,_cmd){
return self.$i_g('@movable_by_window_background');
});
$VN_2.$def('hides_on_deactivate=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'hides_on_deactivate');
self.$i_s('@hides_on_deactivate',flag);
VN$(self, 'did_change_value_for_key', 'hides_on_deactivate');
});
$VN_2.$def('hides_on_deactivate?',function(self,_cmd){
return self.$i_g('@hides_on_deactivate');
});
$VN_2.$def('center',function(self,_cmd){
});
$VN_2.$def('make_key_and_order_front',function(self,_cmd,sender){
VN$(self,'order_front',self);
VN$(self, 'make_key_window');
return VN$(self, 'make_main_window');
});
$VN_2.$def('order_front',function(self,_cmd,sender){
});
$VN_2.$def('order_back',function(self,_cmd,sender){
});
$VN_2.$def('order_out',function(self,_cmd,sender){
});
$VN_2.$def('order_window:relative_to:',function(self,_cmd,place,other_win){
});
$VN_2.$def('order_front_regardless',function(self,_cmd){
});
$VN_2.$def('document_edited=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'document_edited');
self.$i_s('@document_edited',flag);
VN$(self, 'did_change_value_for_key', 'document_edited');
});
$VN_2.$def('document_edited?',function(self,_cmd){
return self.$i_g('@document_edited');
});
$VN_2.$def('visible?',function(self,_cmd){
return self.$i_g('@visible');
});
$VN_2.$def('key_window?',function(self,_cmd){
return self.$i_g('@key_window');
});
$VN_2.$def('main_window?',function(self,_cmd){
return self.$i_g('@main_window');
});
$VN_2.$def('can_become_key_window?',function(self,_cmd){
});
$VN_2.$def('can_become_main_window?',function(self,_cmd){
});
$VN_2.$def('make_key_window',function(self,_cmd){
});
$VN_2.$def('make_main_window',function(self,_cmd){
});
$VN_2.$def('become_key_window',function(self,_cmd){
});
$VN_2.$def('become_main_window',function(self,_cmd){
});
$VN_2.$def('resign_key_window',function(self,_cmd){
});
$VN_2.$def('resign_main_window',function(self,_cmd){
});
$VN_2.$def('works_when_modal?',function(self,_cmd){
});
$VN_2.$def('convert_base_to_screen',function(self,_cmd,point){
return VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(point,'x'),'+',VN$(self.$i_g('@frame'),'x')),VN$(VN$(point,'y'),'+',VN$(self.$i_g('@frame'),'y')));
});
$VN_2.$def('convert_screen_to_base',function(self,_cmd,point){
var res = VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(point,'x'),'-',VN$(self.$i_g('@frame'),'x')),VN$(VN$(point,'y'),'-',VN$(self.$i_g('@frame'),'y')));
return res;
});
$VN_2.$def('perform_close',function(self,_cmd,sender){
});
$VN_2.$def('perform_miniaturize',function(self,_cmd,sender){
});
$VN_2.$def('perform_zoom',function(self,_cmd,sender){
});
$VN_2.$def('level=',function(self,_cmd,level){
VN$(self, 'will_change_value_for_key', 'level');
self.$i_s('@level',level);
VN$(self.$i_g('@element'),'css',VN.$h('z_index',VN$(self.$klass.$c_g_full('WINDOW_LEVELS'),'[]',level)));
VN$(self, 'did_change_value_for_key', 'level');
});
$VN_2.$def('level',function(self,_cmd){
return self.$i_g('@level');
});
$VN_2.$def('has_shadow=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'has_shadow');
self.$i_s('@has_shadow',flag);
VN$(self, 'did_change_value_for_key', 'has_shadow');
});
$VN_2.$def('has_shadow?',function(self,_cmd){
return self.$i_g('@has_shadow');
});
$VN_2.$def('min_size',function(self,_cmd){
return self.$i_g('@min_size');
});
$VN_2.$def('max_size',function(self,_cmd){
return self.$i_g('@max_size');
});
$VN_2.$def('min_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'min_size');
self.$i_s('@min_size',size);
VN$(self, 'did_change_value_for_key', 'min_size');
});
$VN_2.$def('max_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'max_size');
self.$i_s('@max_size',size);
VN$(self, 'did_change_value_for_key', 'max_size');
});
$VN_2.$def('next_event_matching_mask',function(self,_cmd,mask){
});
$VN_2.$def('post_event:at_start:',function(self,_cmd,event,flag){
});
$VN_2.$def('current_event',function(self,_cmd){
return self.$i_g('@current_event');
});
$VN_2.$def('accepts_mouse_moved_events=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'accepts_mouse_moved_events');
self.$i_s('@accepts_mouse_moved_events',flag);
VN$(self, 'did_change_value_for_key', 'accepts_mouse_moved_events');
});
$VN_2.$def('accepts_mouse_moved_events?',function(self,_cmd){
return self.$i_g('@accepts_mouse_moved_events');
});
$VN_2.$def('ignores_mouse_events=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'ignores_mouse_events');
self.$i_s('@ignores_mouse_events',flag);
VN$(self, 'did_change_value_for_key', 'ignores_mouse_events');
});
$VN_2.$def('ignores_mouse_events?',function(self,_cmd){
return self.$i_g('@ignores_mouse_events');
});
$VN_2.$def('send_event',function(self,_cmd,event){
var point = VN$(event,'location_in_window');
return (function($v){
if(($e = VN$('key_up', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','key_up');
}
else if(($e = VN$('key_down', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','key_down');
}
else if(($e = VN$('left_mouse_down', '===', $v),$e!==nil && $e!==false)){
var hit_test = VN$(self.$i_g('@window_view'),'hit_test',point);
if(RTEST(ANDTEST(VN$(hit_test,'!=',self.$i_g('@first_responder')),VN$(hit_test,'accepts_first_responder')))){
VN$(self,'make_first_responder',hit_test);
}
VN$(self,'make_key_and_order_front',self);
if(RTEST(VN$(hit_test,'accepts_first_mouse',event))){
return VN$(hit_test,'mouse_down',event);
}
}
else if(($e = VN$('left_mouse_up', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','left_mouse_up');
}
else if(($e = VN$('left_mouse_dragged', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','left_mouse_dragged');
}
else if(($e = VN$('scroll_wheel', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','scroll_wheel');
}
else if(($e = VN$('right_mouse_down', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','right_mouse_down');
}
else if(($e = VN$('right_mouse_up', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','right_mouse_up');
}
else if(($e = VN$('right_mouse_dragged', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','right_mouse_dragged');
}
})(VN$(event,'type'));
});
$VN_2.$def('window_controller',function(self,_cmd){
return self.$i_g('@window_controller');
});
$VN_2.$def('window_controller=',function(self,_cmd,controller){
VN$(self, 'will_change_value_for_key', 'window_controller');
self.$i_s('@window_controller',controller);
VN$(self, 'did_change_value_for_key', 'window_controller');
});
$VN_2.$def('sheet?',function(self,_cmd){
return self.$i_g('@sheet');
});
$VN_2.$def('attatched_sheet',function(self,_cmd){
return self.$i_g('@attached_sheet');
});
$VN_2.$def('add_child_window:ordered:',function(self,_cmd,win,place){
});
$VN_2.$def('remove_child_window',function(self,_cmd,win){
});
$VN_2.$def('child_windows',function(self,_cmd){
return self.$i_g('@child_windows');
});
$VN_2.$def('parent_window',function(self,_cmd){
return self.$i_g('@parent_window');
});
$VN_2.$def('parent_window=',function(self,_cmd,win){
VN$(self, 'will_change_value_for_key', 'parent_window');
self.$i_s('@parent_window',win);
VN$(self, 'did_change_value_for_key', 'parent_window');
});
$VN_2.$def('graphics_context',function(self,_cmd){
return self.$i_g('@graphics_context');
});
$VN_2.$def('initial_first_responder=',function(self,_cmd,view){
VN$(self, 'will_change_value_for_key', 'initial_first_responder');
self.$i_s('@initial_first_responder',view);
VN$(self, 'did_change_value_for_key', 'initial_first_responder');
});
$VN_2.$def('initial_first_responder',function(self,_cmd){
return self.$i_g('@initial_first_responder');
});
$VN_2.$def('select_next_key_view',function(self,_cmd,sender){
});
$VN_2.$def('select_previous_key_view',function(self,_cmd,sender){
});
$VN_2.$def('select_key_view_following_view',function(self,_cmd,view){
});
$VN_2.$def('select_key_view_preceding_view',function(self,_cmd,view){
});
$VN_2.$def('autorecalculates_key_view_loop',function(self,_cmd,flag){
return self.$i_s('@autorecalculates_key_view_loop',flag);
});
$VN_2.$def('autorecalculates_key_view_loop?',function(self,_cmd){
return self.$i_g('@autorecalculates_key_view_loop');
});
$VN_2.$def('recalculate_key_view_loop',function(self,_cmd){
});
$VN_2.$def('toolbar=',function(self,_cmd,toolbar){
VN$(self, 'will_change_value_for_key', 'toolbar');
self.$i_s('@toolbar',toolbar);
VN$(self, 'did_change_value_for_key', 'toolbar');
});
$VN_2.$def('toolbar',function(self,_cmd){
return self.$i_g('@toolbar');
});
$VN_2.$def('toggle_toolbar_shown',function(self,_cmd,sender){
});
$VN_2.$def('run_toolbar_customization_palette',function(self,_cmd,sender){
});
$VN_2.$def('shows_toolbar_button=',function(self,_cmd,show){
VN$(self, 'will_change_value_for_key', 'shows_toolbar_button');
self.$i_g('@shows_toolbar_button');
VN$(self, 'did_change_value_for_key', 'shows_toolbar_button');
});
$VN_2.$def('shows_toolbar_button?',function(self,_cmd){
return self.$i_g('@shows_toolbar_button');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Panel',$VN_2.$c_g_full('Window'));

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Builder',cObject);
VN$($VN_2,'attr_accessor','owner');
$VN_2.$c_s('BUILDERS',VN.$h());
$VN_2.$def('initialize',function(self,_cmd,name,block){
self.$i_s('@name',name);
self.$i_s('@builder',block);
self.$i_s('@top_level_objects',[]);
return VN$(self.$klass.$c_g_full('BUILDERS'),'[]=',name,self);
});
$VN_2.$def_s('build',function(self,_cmd,name,options,block){
var builder = VN$(self.$c_g_full('BUILDERS'),'[]',name);
return VN$(builder,'build!',options,block);
});
$VN_2.$def('build!',function(self,_cmd,options,block){
VN$(self.$i_g('@builder'),'call',self);
return arguments[arguments.length -1](self);
});
$VN_2.$def('top',function(self,_cmd,obj){
return VN$(self.$i_g('@top_level_objects'),'<<',obj);
});
$VN_2.$def('owner',function(self,_cmd){
return self.$i_g('@owner');
});
$VN_2.$def('menu=',function(self,_cmd,a_menu){
VN$(self, 'will_change_value_for_key', 'menu');
VN$(self, 'did_change_value_for_key', 'menu');
});
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION',"0.0.1");
$VN_1.$def_s('version',function(self,_cmd){
return self.$c_g_full('VERSION');
});

var $VN_1 = RModule.define('RubyWebApp');
VN$($VN_1.$c_g_full('Vienna').$c_g('Builder'),'new','main_menu',function(builder){
var app_delegate = VN$($VN_1.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),'new');
VN$($VN_1.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
var hud_window = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'new',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',800,100,400,250),['hud','closable']);
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',50,100,700,400),'title','My Window!'),function(win){
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,40,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Disabled');
VN$(button,'enabled=',false);
VN$(button,'alignment=','center');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,70,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Right');
VN$(button,'enabled=',false);
VN$(button,'alignment=','right');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,100,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Check');
VN$(button,'enabled=',true);
VN$(button,'control_size=','small');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,130,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Checkon');
VN$(button,'state=','on');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,160,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Checkon');
VN$(button,'state=','on');
VN$(button,'enabled=',false);
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Slider'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,190,90,24),'bezel','rounded'),function(slider){
VN$(win,'<<',slider);
return VN$(slider,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TextField'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,210,180,26),'editable',true),function(text){
VN$(win,'<<',text);
return VN$(text,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,240,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Normal');
VN$(button,'alignment=','left');
VN$(button,'bind:to_object:with_key_path:options:','enabled',app_delegate,'test_binding',nil);
return VN$(button,'needs_display=',true);
});
return scroll_view = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('ScrollView'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',300,100,250,150),'something',true),function(scroll_view){
VN$(win,'<<',scroll_view);
var table_view = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableView'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',VN$((20),'-@'),VN$((20),'-@'),400,200),'something',true),function(table_view){
VN$(table_view,'data_source=',app_delegate);
var name_col = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableColumn'),'new','name');
VN$(table_view,'add_table_column',name_col);
var age_col = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableColumn'),'new','age');
VN$(table_view,'add_table_column',age_col);
var band_col = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableColumn'),'new','band');
VN$(table_view,'add_table_column',band_col);
return VN$(table_view,'reload_data');
});
VN$(scroll_view,'document_view=',table_view);
return VN$(scroll_view,'tile');
});
});
});

var $VN_1 = RModule.define('RubyWebApp');
var $VN_2 = RClass.define_under($VN_1, 'AppController',cObject);
$VN_2.$c_s('TABLE_VIEW_DATA',[VN.$h('name', 'Adam', 'age', 23, 'band', 'Led Zepplin'),VN.$h('name', 'Ben', 'age', 20, 'band', 'Pendulum'),VN.$h('name', 'Tom', 'age', 30, 'band', 'Tweenies'),VN.$h('name', 'Becky', 'age', 12, 'band', '50 pence'),VN.$h('name', 'Dad', 'age', 24, 'band', 'Take That'),VN.$h('name', 'Mum', 'age', 25, 'band', 'Rod Stewart')]);
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@adam',10);
return self.$i_s('@test_binding',false);
});
$VN_2.$def('number_of_rows_in_table_view',function(self,_cmd,table_view){
return VN$(self.$klass.$c_g_full('TABLE_VIEW_DATA'),'length');
});
$VN_2.$def('table_view:object_value_for_table_column:row:',function(self,_cmd,table_view,table_column,row){
return VN$(VN$(self.$klass.$c_g_full('TABLE_VIEW_DATA'),'[]',row),'[]',VN$(table_column,'identifier'));
});
$VN_2.$def('adam?',function(self,_cmd){
return self.$i_g('@adam');
});
$VN_2.$def('test_binding',function(self,_cmd){
return self.$i_g('@test_binding');
});
$VN_2.$def('test_binding=',function(self,_cmd,aValue){
VN$(self, 'will_change_value_for_key', 'test_binding');
self.$i_s('@test_binding',aValue);
VN$(self, 'did_change_value_for_key', 'test_binding');
});
$VN_2.$def('will_finish_launching',function(self,_cmd,notification){
});
$VN_2.$def('did_finish_launching',function(self,_cmd,notification){
});
VN$(cObject.$c_g('Vienna').$c_g('App'),'run',function(app){
return VN$(cObject.$c_g('VN').$c_g('Builder'),'build','main_menu',VN.$h('owner',cObject.$c_g('VN').$c_g('App'),'top_level_objects',[]),function(builder){
return VN$(VN$(cObject.$c_g('VN').$c_g('App'),'delegate'),'set_value:for_key:',20,'adam');
});
});
