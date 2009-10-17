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
  if (!method) throw 'RObject#call cannot find method: ' + id ;
  return method.apply(this, args) ;
};

/**
  new calling func
*/
var VN$ = function VN$(self, id) {
 // console.log(' >>> ' + id);
 if (!self) {
   // console.log(self);
   throw 'Vienna: VN$ - Trying to call `' + id + '` on null/undefined object'   
 }

  
  var method = self.$klass.$search_method(id);
  if (!method) throw 'RObject#call cannot find method: ' + id ;
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

cBasicObject.$define_alloc_func(function(self, _cmd) {
  // console.log('HMMMM');
  // console.log(self);
  // console.log(_cmd);
  var obj = new RObject(self, VN.OBJECT) ;
  // Cruical ivar setup
  // console.log('HERE');
  obj.$i_s('@kvo_observers', new Array());
  obj.$i_s('@kvo_old_values', VN.$h());
   // # @kvo_observers = []
    // #      @kvo_old_values = {}
  return obj;
});

cBasicObject.$def('==', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('equal?', function(self, _cmd, obj) {
  return (self == obj) ? true : false ;
});

cBasicObject.$def('!', function(self, _cmd, obj) {
  
});

cBasicObject.$def('!=', function(self, _cmd, obj) {
  
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
  if (!selector) return false;
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
var cNumeric = RClass.define('Numeric', cObject);
var cProc = RClass.define('Proc', cObject);

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
});
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
return VN$(self,'puts','wow');
});
$VN_1.$def('(',function(self,_cmd,obj){
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
 
Number.prototype.$klass = cNumeric ;
Number.prototype.$type = VN.NUMBER ;
Number.prototype.$ = RObject.prototype.$;

// VN.include_module(VN.cNumeric, VN.mComparable);
RModule.include(cNumeric, mComparable);

cNumeric.$def('singleton_method_added', function() {
  
});

cNumeric.$def('initialize_copy', function() {
  
});

cNumeric.$def('coerce', function() {
  
});

cNumeric.$def('+@', function() {
  
});

cNumeric.$def('-@', function() {
  
});

cNumeric.$def('<=>', function() {
  
});

cNumeric.$def('eql?', function() {
  
});

cNumeric.$def('quo', function() {
  
});

cNumeric.$def('fdiv', function() {
  
});

cNumeric.$def('div', function() {
  
});

cNumeric.$def('divmod', function() {
  
});

cNumeric.$def('modulo', function() {
  
});

cNumeric.$def('remainder', function() {
  
});

cNumeric.$def('abs', function() {
  
});

cNumeric.$def('magnitude', function() {
  
});

cNumeric.$def('to_int', function() {
  
});

cNumeric.$def('real?', function() {
  
});

cNumeric.$def('integer?', function() {
  
});

cNumeric.$def('zero?', function() {
  
});

cNumeric.$def('nonzero?', function() {
  
});

cNumeric.$def('floor', function() {
  
});

cNumeric.$def('ceil', function() {
  
});

cNumeric.$def('round', function() {
  
});

cNumeric.$def('truncate', function() {
  
});

cNumeric.$def('step', function() {
  
});

cNumeric.$def('odd?', function() {
  
});

cNumeric.$def('even?', function() {
  
});

cNumeric.$def('upto', function() {
  
});

cNumeric.$def('downto', function() {
  
});

cNumeric.$def('times', function() {
  
});

cNumeric.$def('succ', function() {
  
});

cNumeric.$def('next', function() {
  
});

cNumeric.$def('pred', function() {
  
});

cNumeric.$def('chr', function() {
  
});

cNumeric.$def('ord', function() {
  
});

cNumeric.$def('to_i', function() {
  
});

cNumeric.$def('to_s', function() {
  
});

cNumeric.$def('+', function(i) {
  return this + i;
});

cNumeric.$def('-', function(i) {
  return this - i;
});

cNumeric.$def('*', function() {
  
});

cNumeric.$def('/', function() {
  
});

cNumeric.$def('%', function() {
  
});

cNumeric.$def('**', function() {
  
});

cNumeric.$def('==', function() {
  
});

cNumeric.$def('>', function() {
  
});

cNumeric.$def('>=', function() {
  
});

cNumeric.$def('<', function() {
  
});

cNumeric.$def('<=', function() {
  
});

cNumeric.$def('~', function() {
  
});

cNumeric.$def('&', function() {
  
});

cNumeric.$def('|', function() {
  
});

cNumeric.$def('^', function() {
  
});

cNumeric.$def('[]', function() {
  
});

cNumeric.$def('<<', function() {
  
});

cNumeric.$def('>>', function() {
  
});

cNumeric.$def('to_f', function() {
  
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
$VN_1.$def('at',function(self,_cmd){
});
$VN_1.$def('fetch',function(self,_cmd){
});
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
$VN_1.$def('index',function(self,_cmd){
});
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
$VN_1.$def('each',function(self,_cmd){
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
return VN$(self,'puts','wow');
});
$VN_1.$def('(',function(self,_cmd,obj){
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
// require('core/range');
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
// require('core/math');
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

var $VN_1 = RClass.define('Element',cObject);
VN$($VN_1,'attr_accessor','element');
$VN_1.$def_s('find',function(self,_cmd,the_id){
document.getElementById(the_id)});
$VN_1.$def('initialize',function(self,_cmd,type,class_name,the_id){
self.$i_s('@element',document.createElement(type));
self.$i_s('@type',type);
self.$i_s('@class_name',class_name);
return self.$i_s('@id',the_id);
});
$VN_1.$def_s('element_with_type:class_name:id:',function(self,_cmd,type,class_name,the_id){
return VN$(self,'new',type,class_name,the_id);
});
$VN_1.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_1.$def('origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'origin');
VN$(self, 'element').style.x = VN$(new_origin,'x');VN$(self, 'element').style.y = VN$(new_origin,'y');VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_1.$def('size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'size');
if(RTEST(VN$(self.$i_g('@type'),'==','canvas'))){
VN$(self, 'element').width = VN$(new_size,'width');VN$(self, 'element').height = VN$(new_size,'height');}
else{
VN$(self, 'element').style.width = VN$(new_size,'width');VN$(self, 'element').style.height = VN$(new_size,'height');}
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_1.$def('<<',function(self,_cmd,other){
if(RTEST(VN$(other,'instance_of?',self.$klass.$c_g_full('String')))){
VN$(self, 'element').innerHTML += other}
else{
VN$(self, 'element').appendChild(VN$(other,'element'))}
});
$VN_1.$def('add_event_listener',function(self,_cmd,type,listener){
if (document.addEventListener) {
      VN$(self, 'element').addEventListener(type, listener, false);
    }
    else {
      VN$(self, 'element').attachEvent(type, listener);
    }});

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

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('access_instance_variables_directly?',function(self,_cmd){
return true;
});
$VN_2.$def('value_for_key',function(self,_cmd,key){
return self.$i_g('@' + key);});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
return VN$(self,'puts',["Setting value for ",(key)].join(''));
});
$VN_2.$def('validate_value:for_key:error:',function(self,_cmd,value,key,out_error){
});
$VN_2.$def('array_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('value_for_key_path',function(self,_cmd,path){
});
$VN_2.$def('set_value:for_key_path:',function(self,_cmd,value,path){
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
return (self.$k_d('@@default_center') ? self.$k_g('@@default_center') : self.$k_s('@@default_center',VN$(self,'new')));
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
VN$(self,'puts','initialising responder');
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

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
var $VN_2 = RClass.define_under($VN_1, 'Application',cObject);
VN$($VN_2,'attr_accessor','windows','event_queue','views_needing_display');
VN$($VN_2,'attr_reader','delegate');
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@windows',[]);
self.$i_s('@event_queue',[]);
self.$i_s('@views_needing_display',[]);
return self.$i_s('@delegate',nil);
});
$VN_2.$def('run',function(self,_cmd){
return VN$(self, 'finish_launching');
});
$VN_2.$def('finish_launching',function(self,_cmd){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
return VN$(self, 'display_required_views');
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
return (self.$k_d('@@app') ? self.$k_g('@@app') : self.$k_s('@@app',VN$(self,'new')));
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
VN$(self,'puts',['===== In: Application','#finish_launching'].join(''));
VN$(self,'puts',self.$i_g('@delegate'));
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
return VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
});
$VN_2.$def('run',function(self,_cmd,block){
return self.$i_s('@run_block',block);
});
$VN_1.$c_s('App',VN$($VN_1.$c_g_full('Application'),'shared_application'));

var cEvent = RClass.define_under(cObject.$c_g_full('Vienna'), 'Event', cObject);

Event.prototype.$klass = cEvent
Event.prototype.$type = VN.CLASS;

cEvent.$define_alloc_func(function() {
}); var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Event',cObject);
$VN_2.$def('type',function(self,_cmd){
});
$VN_2.$def('modifier_flags',function(self,_cmd){
});
$VN_2.$def('timestamp',function(self,_cmd){
});
$VN_2.$def('window',function(self,_cmd){
});
$VN_2.$def('window_number',function(self,_cmd){
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

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Image',cObject);
$VN_2.$def_s('image_named',function(self,_cmd,name){
if(RTEST(VN$(VN$(self, 'named_images'),'has_key?',name))){
return VN$(VN$(self, 'named_images'),'[]',name);
}
if(RTEST(VN$(VN$(self, 'sprite_images'),'has_key?',name))){
}
var img = VN$(self,'image_with_contents_of_url',name);
VN$(VN$(self, 'named_images'),'[]=',name,img);
return img;
});
$VN_2.$def_s('named_images',function(self,_cmd){
return (self.$k_d('@@named_images') ? self.$k_g('@@named_images') : self.$k_s('@@named_images',VN.$h()));
});
$VN_2.$def_s('sprite_images',function(self,_cmd){
return (self.$k_d('@@sprite_images') ? self.$k_g('@@sprite_images') : self.$k_s('@@sprite_images',VN.$h()));
});
$VN_2.$def_s('define_sprite_image_named:in_image:with_rect:',function(self,_cmd,name,image,rect){
return VN$(VN$(self, 'sprite_images'),'[]=',name,[image,rect]);
});
$VN_2.$def_s('resource',function(self,_cmd,name,block){
var img = VN$(self,'image_named',name);
return arguments[arguments.length -1](img);
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$sup(arguments.callee, self,_cmd,[]);
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
self.$i_s('@status','loading');
self.$i_s('@image',nil);
return VN$(self, 'load');
});
$VN_2.$def('status',function(self,_cmd){
return self.$i_g('@status');
});
$VN_2.$def('load',function(self,_cmd){
if(RTEST(VN$(ORTEST(VN$(self.$i_g('@status'),'==','loading'),self.$i_g('@status')),'==','completed'))){
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
return VN$(self,'puts','WAYYY');
});
$VN_2.$def('sprite',function(self,_cmd,name,rect){
});
$VN_2.$def('size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'size');
self.$i_s('@size',size);
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_2.$def('size',function(self,_cmd){
return self.$i_g('@size');
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
return self.$i_s('@first_time',true);
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
$VN_2.$def('find_selector',function(self,_cmd,a_selector){
return VN$(self, 'element');
});

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
var view = VN$(self,'new',VN$(self.$c_g_full('Rect'),'new',0,0,100,100));
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
VN$(self, 'setup_render_context');
}
else{
VN$(self, 'setup_drawing_context');
}
});
$VN_2.$def('setup_render_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@display_context',VN$(self.$klass.$c_g_full('RenderContext'),'new','div',nil));
return VN$(self.$i_g('@element'),'<<',self.$i_g('@display_context'));
});
$VN_2.$def('setup_drawing_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@display_context',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','canvas','',''));
return VN$(self.$i_g('@element'),'<<',self.$i_g('@display_context'));
});
$VN_2.$def('graphics_port',function(self,_cmd){
return VN$(self.$i_g('@display_context'),'element').getContext('2d');});
$VN_2.$def('initialize_with_coder',function(self,_cmd,coder){
});
$VN_2.$def('initialize_with_builder',function(self,_cmd,builder){
});
$VN_2.$def_s('display_properties',function(self,_cmd){
return VN$(self,'puts','in display properties..');
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
return self.$i_s('@window',win);
});
$VN_2.$def('view_did_move_to_window',function(self,_cmd){
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
VN$(self,'puts','Rendering....?');
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
VN$(self,'puts','REDNERING');
VN$(context,'<<',"<div class='well'></div>");
return VN$(context,'<<',"<div>adam</div>");
});
$VN_2.$def('draw_rect',function(self,_cmd,rect){
return VN$(self,'puts','drawing rect');
});
$VN_2.$def('view_will_draw',function(self,_cmd){
});
$VN_2.$def('hit_test',function(self,_cmd,point){
});
$VN_2.$def('mouse:in_rect:',function(self,_cmd,point,rect){
});
$VN_2.$def('add_tracking_area',function(self,_cmd,tracking_area){
if(RTEST(VN$(self.$i_g('@tracking_areas'),'empty?'))){
VN$(self.$i_g('@element'),'add_event_listener','mouseover',function(evt){
return VN$(self,'puts','OMG, mouse over!');
});
VN$(self.$i_g('@element'),'add_event_listener','mouseout',function(evt){
return VN$(self,'puts','OMG, mouse out of element');
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
return self.$i_s('@cell',VN$(VN$(VN$(self,'class'),'cell_class'),'new'));
});
$VN_2.$def_s('cell_class=',function(self,_cmd,cell_class){
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return (self.$k_d('@@cell_class') ? self.$k_g('@@cell_class') : self.$k_s('@@cell_class',self.$c_g_full('Vienna').$c_g('Cell')));
});
$VN_2.$def('draw_rect',function(self,_cmd,rect){
VN$(self,'puts','drawing rect from control');
return VN$(self.$i_g('@cell'),'draw_with_frame:in_view:',self.$i_g('@bounds'),self);
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('calc_size',function(self,_cmd){
});
$VN_2.$def('cell',function(self,_cmd){
});
$VN_2.$def('cell=',function(self,_cmd,a_cell){
VN$(self, 'will_change_value_for_key', 'cell');
VN$(self, 'did_change_value_for_key', 'cell');
});
$VN_2.$def('selected_cell',function(self,_cmd){
});
$VN_2.$def('target',function(self,_cmd){
});
$VN_2.$def('target=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'target');
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
});
$VN_2.$def('action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'action');
VN$(self, 'did_change_value_for_key', 'action');
});
$VN_2.$def('tag',function(self,_cmd){
});
$VN_2.$def('tag=',function(self,_cmd,tag){
VN$(self, 'will_change_value_for_key', 'tag');
VN$(self, 'did_change_value_for_key', 'tag');
});
$VN_2.$def('selected_tag',function(self,_cmd){
});
$VN_2.$def('ignores_multi_click=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'ignores_multi_click');
VN$(self, 'did_change_value_for_key', 'ignores_multi_click');
});
$VN_2.$def('ignores_multi_click?',function(self,_cmd){
});
$VN_2.$def('send_action_on',function(self,_cmd,mask){
});
$VN_2.$def('continuous?',function(self,_cmd){
});
$VN_2.$def('continuous=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'continuous');
VN$(self, 'did_change_value_for_key', 'continuous');
});
$VN_2.$def('enabled?',function(self,_cmd){
});
$VN_2.$def('enabled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'enabled');
VN$(self, 'did_change_value_for_key', 'enabled');
});
$VN_2.$def('alignment',function(self,_cmd){
});
$VN_2.$def('alignment=',function(self,_cmd,mode){
VN$(self, 'will_change_value_for_key', 'alignment');
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('font',function(self,_cmd){
});
$VN_2.$def('font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'font');
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('formatter=',function(self,_cmd,new_formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
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
$VN_2.$def('needs_display',function(self,_cmd){
});
$VN_2.$def('update_cell',function(self,_cmd,cell){
});
$VN_2.$def('update_cell_inside',function(self,_cmd,cell){
});
$VN_2.$def('draw_cell_inside',function(self,_cmd,cell){
});
$VN_2.$def('draw_cell',function(self,_cmd,cell){
});
$VN_2.$def('select_cell',function(self,_cmd,cell){
});
$VN_2.$def('send_action:to:',function(self,_cmd,action,target){
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
$VN_2.$def('abort_editing',function(self,_cmd){
});
$VN_2.$def('validate_editing',function(self,_cmd){
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Cell',cObject);
$VN_2.$def_s('prefers_tracking_until_mouse_up',function(self,_cmd){
return true;
});
$VN_2.$def('init_text_cell',function(self,_cmd,string){
});
$VN_2.$def('init_image_cell',function(self,_cmd,image){
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
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
self.$i_s('@type',type);
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
$VN_2.$def('target=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'target');
self.$i_s('@target',obj);
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
return self.$i_g('@action');
});
$VN_2.$def('action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'action');
self.$i_s('@action',selector);
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
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
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
return wraps = false;
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
$VN_2.$def('alignment=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'alignment');
self.$i_s('@alignment',flag);
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('wraps?',function(self,_cmd){
return self.$i_g('@wraps');
});
$VN_2.$def('wraps=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'wraps');
self.$i_s('@wraps',flag);
if(RTEST(flag)){
return scrollable = false;
}
VN$(self, 'did_change_value_for_key', 'wraps');
});
$VN_2.$def('font',function(self,_cmd){
return self.$i_g('@font');
});
$VN_2.$def('font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'font');
self.$i_s('@font',font);
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('entry_acceptable?',function(self,_cmd,str){
return true;
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('formatter=',function(self,_cmd,new_formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
self.$i_s('@formatter',new_formatter);
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
return self.$i_g('@formatter');
});
$VN_2.$def('object_value',function(self,_cmd){
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
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
$VN_2.$def('compare',function(self,_cmd,other_cell){
});
$VN_2.$def('int_value',function(self,_cmd){
});
$VN_2.$def('int_value=',function(self,_cmd,an_int){
VN$(self, 'will_change_value_for_key', 'int_value');
VN$(self, 'did_change_value_for_key', 'int_value');
});
$VN_2.$def('float_value',function(self,_cmd){
});
$VN_2.$def('float_value=',function(self,_cmd,a_float){
VN$(self, 'will_change_value_for_key', 'float_value');
VN$(self, 'did_change_value_for_key', 'float_value');
});
$VN_2.$def('double_value',function(self,_cmd){
});
$VN_2.$def('double_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'double_value');
VN$(self, 'did_change_value_for_key', 'double_value');
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
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
self.$i_s('@control_tint',control_tint);
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_tint',function(self,_cmd){
return self.$i_g('@control_tint');
});
$VN_2.$def('control_size',function(self,_cmd){
return self.$i_g('@control_size');
});
$VN_2.$def('control_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'control_size');
self.$i_s('@control_size',size);
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('represented_object',function(self,_cmd){
return self.$i_g('@represented_object');
});
$VN_2.$def('represented_object=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'represented_object');
self.$i_s('@represented_object',obj);
VN$(self, 'did_change_value_for_key', 'represented_object');
});
$VN_2.$def('cell_attribute',function(self,_cmd,param){
});
$VN_2.$def('set_cell_attribute:to:',function(self,_cmd,param,value){
});
$VN_2.$def('image_rect_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('title_rect_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('drawing_rect_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('cell_size',function(self,_cmd){
});
$VN_2.$def('cell_size_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('highlight_color_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('calc_draw_info',function(self,_cmd){
});
$VN_2.$def('setup_field_editor_attributes',function(self,_cmd,text_obj){
});
$VN_2.$def('draw_interior_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('draw_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('highlight:with_frame:in_view:',function(self,_cmd,flag,cell_frame,control_view){
});
$VN_2.$def('mouse_down_flags',function(self,_cmd){
});
$VN_2.$def('get_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('start_tracking_at:in_view:',function(self,_cmd,start_point,control_view){
});
$VN_2.$def('continue_tracking:at:in_view:',function(self,_cmd,last_point,current_point,control_view){
});
$VN_2.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_cmd,last_point,stop_point,control_view,flag){
});
$VN_2.$def('track_mouse:in_rect:of_view:until_mouse_up:',function(self,_cmd,the_event,cell_frame,control_view,flag){
});
$VN_2.$def('edit_with_frame:in_view:editor:delegate:event:',function(self,_cmd,rect,control_view,text_obj,an_obj,the_event){
});
$VN_2.$def('select_with_frame:in_view:editor:delegate:start:length:',function(self,_cmd,rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
$VN_2.$def('end_editing',function(self,_cmd,text_obj){
});
$VN_2.$def('reset_cursor_rect:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('menu=',function(self,_cmd,menu){
VN$(self, 'will_change_value_for_key', 'menu');
self.$i_s('@menu',menu);
VN$(self, 'did_change_value_for_key', 'menu');
});
$VN_2.$def('menu',function(self,_cmd){
return self.$i_g('@menu');
});
$VN_2.$def('menu_for_event:in_rect:of_view:',function(self,_cmd,event,cell_frame,view){
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
$VN_2.$def('truncates_last_visible_line?',function(self,_cmd){
return self.$i_g('@truncates_last_visible_line');
});
$VN_2.$def('truncates_last_visible_line=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'truncates_last_visible_line');
self.$i_s('@truncates_last_visible_line',flag);
VN$(self, 'did_change_value_for_key', 'truncates_last_visible_line');
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
return self.$i_g('@accepts_first_responder');
});
$VN_2.$def('shows_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'shows_first_responder');
self.$i_s('@shows_first_responder',flag);
VN$(self, 'did_change_value_for_key', 'shows_first_responder');
});
$VN_2.$def('shows_first_responder?',function(self,_cmd){
return self.$i_g('@shows_first_responder');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('focus_ring_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'focus_ring_type');
self.$i_s('@focus_ring_type',type);
VN$(self, 'did_change_value_for_key', 'focus_ring_type');
});
$VN_2.$def('focus_ring_type',function(self,_cmd){
return self.$i_g('@focus_ring_type');
});
$VN_2.$def_s('default_focus_ring_type',function(self,_cmd){
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
return imports_graphics = false;
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
return self.$i_s('@allows_editing_text_attributes',true);
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
$VN_2.$def('background_style',function(self,_cmd){
return self.$i_g('@background_style');
});
$VN_2.$def('background_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'background_style');
self.$i_s('@background_style',style);
VN$(self, 'did_change_value_for_key', 'background_style');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Button',$VN_2.$c_g_full('Control'));
VN$($VN_2,'attr_reader','title','alternate_title','image','image_position');
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('ButtonCell');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('alternate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alternate_title');
VN$(self, 'did_change_value_for_key', 'alternate_title');
});
$VN_2.$def('image=',function(self,_cmd,image){
VN$(self, 'will_change_value_for_key', 'image');
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('image_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'image_position');
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('button_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'button_type');
VN$(self, 'did_change_value_for_key', 'button_type');
});
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
var button_type = type;
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',val);
VN$(self, 'did_change_value_for_key', 'state');
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
$VN_2.$def('bordered?',function(self,_cmd){
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('transparent?',function(self,_cmd){
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('key_equivalent',function(self,_cmd){
});
$VN_2.$def('key_equivalent=',function(self,_cmd,code){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('highlight=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'highlight');
VN$(self, 'did_change_value_for_key', 'highlight');
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,key){
});
$VN_2.$def('bezel_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel');
var bezel_style = style;
VN$(self, 'did_change_value_for_key', 'bezel');
});
$VN_2.$def('bezel_style',function(self,_cmd){
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state',function(self,_cmd){
});
$VN_2.$def('next_state',function(self,_cmd){
});

var $VN_1 = RModule.define('Vienna');
VN$($VN_1.$c_g_full('Image'),'resource','controls.png',function(img){
VN$(img,'sprite','rounded_bezel_enabled_regular_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_regular_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_regular_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_regular_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_regular_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_regular_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_regular_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_regular_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_regular_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_small_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_small_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_small_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_small_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_small_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_small_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_small_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_small_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_small_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_mini_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_mini_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_enabled_mini_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_mini_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_mini_middle',[0,24,36,24]);
VN$(img,'sprite','rounded_bezel_disabled_mini_right',[0,48,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_mini_left',[0,0,36,24]);
VN$(img,'sprite','rounded_bezel_pushed_mini_middle',[0,24,36,24]);
return VN$(img,'sprite','rounded_bezel_pushed_mini_right',[0,48,36,24]);
});
var $VN_2 = RClass.define_under($VN_1, 'ButtonCell',$VN_2.$c_g_full('Cell'));
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
$VN_2.$def('alternate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alternate_title');
self.$i_s('@alternate_title',str);
VN$(self, 'did_change_value_for_key', 'alternate_title');
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
$VN_2.$def('image_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'image_position');
self.$i_s('@image_position',pos);
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('image_scaling',function(self,_cmd){
return self.$i_g('@image_scaling');
});
$VN_2.$def('image_scaling=',function(self,_cmd,scaling){
VN$(self, 'will_change_value_for_key', 'image_scaling');
self.$i_s('@image_scaling',scaling);
VN$(self, 'did_change_value_for_key', 'image_scaling');
});
$VN_2.$def('highlights_by',function(self,_cmd){
return self.$i_g('@highlights_by');
});
$VN_2.$def('highlights_by=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'highlights_by');
self.$i_s('@highlights_by',type);
VN$(self, 'did_change_value_for_key', 'highlights_by');
});
$VN_2.$def('shows_state_by',function(self,_cmd){
return self.$i_g('@shows_state_by');
});
$VN_2.$def('shows_state_by=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'shows_state_by');
self.$i_s('@shows_state_by',type);
VN$(self, 'did_change_value_for_key', 'shows_state_by');
});
$VN_2.$def('button_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'button_type');
VN$(self, 'did_change_value_for_key', 'button_type');
});
$VN_2.$def('opaque?',function(self,_cmd){
});
$VN_2.$def('font=',function(self,_cmd,font_obj){
VN$(self, 'will_change_value_for_key', 'font');
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
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,keys){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
self.$i_s('@key_equivalent',keys);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return self.$i_g('@key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
self.$i_s('@key_equivalent_modifier_mask',mask);
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('render_with_context:in_view:',function(self,_cmd,context,control_view){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='button_left'></div>");
VN$(context,'<<',"<div class='button_right'></div>");
VN$(context,'<<',"<div class='button_title'></div>");
VN$(context,'first_time=',false);
}
VN$(context,'class_name=',VN$(['vn_button','bezel','regular','enabled'],'join',' '));
return VN$(context,'selector','#button_title',function(title){
VN$(title,'inner_html=','My Button!');
return VN$(title,'frame=',VN$(self,'title_rect_for_bounds',self.$i_g('@bounds')));
});
});
$VN_2.$def('draw_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
VN$(self,'puts','current context is:');
var ctx = VN$(self.$klass.$c_g_full('GraphicsContext'),'current_context');
VN$(ctx,'graphics_port').fillRect(20, 20, 100, 100);VN$(ctx,'graphics_port').clearRect(40, 40, 60, 60);});
$VN_2.$def('draw_image:with_frame:in_view:',function(self,_cmd,image,frame,control_view){
});
$VN_2.$def('draw_title:with_frame:in_view:',function(self,_cmd,title,frame,control_view){
});
$VN_2.$def('draw_bezel_with_frame:in_view:',function(self,_cmd,frame,control_view){
});
$VN_2.$def('mouse_entered',function(self,_cmd,event){
});
$VN_2.$def('mouse_exited',function(self,_cmd,event){
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
$VN_2.$def('bezel_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',style);
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Slider',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('SliderCell');
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
$VN_2.$def('title_cell=',function(self,_cmd,cell){
VN$(self, 'will_change_value_for_key', 'title_cell');
self.$i_s('@title_cell',cell);
VN$(self, 'did_change_value_for_key', 'title_cell');
});
$VN_2.$def('title_cell',function(self,_cmd){
return self.$i_g('@title_cell');
});
$VN_2.$def('title_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'title_color');
self.$i_s('@title_color',color);
VN$(self, 'did_change_value_for_key', 'title_color');
});
$VN_2.$def('title_color',function(self,_cmd){
return self.$i_g('@title_color');
});
$VN_2.$def('title_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'title_font');
self.$i_s('@title_font',font);
VN$(self, 'did_change_value_for_key', 'title_font');
});
$VN_2.$def('title_font',function(self,_cmd){
return self.$i_g('@title_font');
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
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
$VN_2.$def('knob_thickness',function(self,_cmd){
return self.$i_g('@knob_thickness');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('image',function(self,_cmd){
return self.$i_g('@image');
});
$VN_2.$def('vertical?',function(self,_cmd){
return self.$i_g('@vertical');
});
$VN_2.$def('accepts_first_mouse',function(self,_cmd,event){
return true;
});
$VN_2.$def('number_of_tick_marks=',function(self,_cmd,count){
VN$(self, 'will_change_value_for_key', 'number_of_tick_marks');
self.$i_s('@number_of_tick_marks',count);
VN$(self, 'did_change_value_for_key', 'number_of_tick_marks');
});
$VN_2.$def('number_of_tick_marks',function(self,_cmd){
return self.$i_g('@number_of_tick_marks');
});
$VN_2.$def('tick_mark_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'tick_mark_position');
self.$i_s('@tick_mark_position',pos);
VN$(self, 'did_change_value_for_key', 'tick_mark_position');
});
$VN_2.$def('tick_mark_position',function(self,_cmd){
return self.$i_g('@tick_mark_position');
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
$VN_2.$def_s('prefers_tracking_until_mouse_up',function(self,_cmd){
return true;
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
$VN_2.$def('title_cell=',function(self,_cmd,cell){
VN$(self, 'will_change_value_for_key', 'title_cell');
self.$i_s('@title_cell',cell);
VN$(self, 'did_change_value_for_key', 'title_cell');
});
$VN_2.$def('title_cell',function(self,_cmd){
return self.$i_g('@title_cell');
});
$VN_2.$def('title_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'title_color');
self.$i_s('@title_color',color);
VN$(self, 'did_change_value_for_key', 'title_color');
});
$VN_2.$def('title_color',function(self,_cmd){
return self.$i_g('@title_color');
});
$VN_2.$def('title_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'title_font');
self.$i_s('@title_font',font);
VN$(self, 'did_change_value_for_key', 'title_font');
});
$VN_2.$def('title_font',function(self,_cmd){
return self.$i_g('@title_font');
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
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
$VN_2.$def('knob_thickness',function(self,_cmd){
return self.$i_g('@knob_thickness');
});
$VN_2.$def('vertical?',function(self,_cmd){
return self.$i_g('@vertical');
});
$VN_2.$def('draw_knob',function(self,_cmd,knob_rect){
});
$VN_2.$def('draw_bar_inside',function(self,_cmd,rect){
});
$VN_2.$def('track_rect',function(self,_cmd){
});
$VN_2.$def('slider_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'slider_type');
self.$i_s('@slider_type',type);
VN$(self, 'did_change_value_for_key', 'slider_type');
});
$VN_2.$def('slider_type',function(self,_cmd){
return self.$i_g('@slider_type');
});
$VN_2.$def('number_of_tick_marks=',function(self,_cmd,count){
VN$(self, 'will_change_value_for_key', 'number_of_tick_marks');
self.$i_s('@number_of_tick_marks',count);
VN$(self, 'did_change_value_for_key', 'number_of_tick_marks');
});
$VN_2.$def('number_of_tick_marks',function(self,_cmd){
return self.$i_g('@number_of_tick_marks');
});
$VN_2.$def('tick_mark_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'tick_mark_position');
self.$i_s('@tick_mark_position',pos);
VN$(self, 'did_change_value_for_key', 'tick_mark_position');
});
$VN_2.$def('tick_mark_position',function(self,_cmd){
return self.$i_g('@tick_mark_position');
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
var $VN_2 = RClass.define_under($VN_1, 'WindowView',$VN_2.$c_g_full('View'));
$VN_2.$def('draw_rect',function(self,_cmd,rect){
});
var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Window',$VN_2.$c_g_full('Responder'));
$VN_2.$def('initialize',function(self,_cmd,content_rect,style_mask){
VN$sup(arguments.callee, self,_cmd,[]);
VN$(self, 'setup_display_context');
self.$i_s('@frame',content_rect);
self.$i_s('@window_number',VN$(self.$klass.$c_g_full('App'),'add_window',self));
self.$i_s('@style_mask',style_mask);
VN$(self,'level=','normal');
self.$i_s('@min_size',VN$(self.$klass.$c_g_full('Size'),'new',0.0,0.0));
self.$i_s('@max_size',VN$(self.$klass.$c_g_full('Size'),'new',9999.0,9999.0));
self.$i_s('@first_responder',self);
self.$i_s('@next_responder',self.$klass.$c_g_full('App'));
return VN$(self,'content_view=',VN$(self.$klass.$c_g_full('View'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',100,100,100,100)));
});
$VN_2.$def('setup_display_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@display_element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','canvas','',''));
VN$(self.$i_g('@element'),'<<',self.$i_g('@display_element'));
VN$(self.$klass.$c_g_full('Document'),'<<',self.$i_g('@element'));
self.$i_s('@graphics_context',VN$(self.$klass.$c_g_full('GraphicsContext'),'new',VN$(self.$i_g('@display_element'),'element').getContext('2d'),false));
VN$(self.$i_g('@element'),'add_event_listener','mousedown',function(event){
return VN$(self,'puts','Yeah! mouse down inside window..');
});
return VN$(self.$i_g('@element'),'add_event_listener','mouseup',function(event){
return VN$(self,'puts','...and the mouse is up again.');
});
});
$VN_2.$def_s('build',function(self,_cmd,options,block){
var win = VN$(self,'new',VN$(self.$c_g_full('Rect'),'new',100,100,100,100),nil);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
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
VN$(self.$i_g('@element'),'<<',VN$(self.$i_g('@content_view'),'element'));
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
$VN_2.$def('set_frame:display:',function(self,_cmd,frame_rect,flag){
return VN$(self,'set_frame:display:animate:',frame_rect,flag,false);
});
$VN_2.$def('content_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'content_size');
VN$(self, 'did_change_value_for_key', 'content_size');
});
$VN_2.$def('frame_origin=',function(self,_cmd,origin){
VN$(self, 'will_change_value_for_key', 'frame_origin');
VN$(self, 'did_change_value_for_key', 'frame_origin');
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
$VN_2.$def('animation_resize_time',function(self,_cmd,new_frame){
});
$VN_2.$def('set_frame:display:animate:',function(self,_cmd,frame_rect,flag,animate_flag){
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
});
$VN_2.$def('convert_screen_to_base',function(self,_cmd,point){
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
return (function($v){
if(($e = VN$('key_up', '===', $v),$e!==nil && $e!==false)){
return VN$(VN$(self, 'first_responder'),'key_up',event);
}
else if(($e = VN$('key_down', '===', $v),$e!==nil && $e!==false)){
return VN$(VN$(self, 'first_responder'),'key_down',event);
}
else if(($e = VN$('scroll_wheel', '===', $v),$e!==nil && $e!==false)){
}
else if(($e = VN$('left_mouse_up', '===', $v),$e!==nil && $e!==false)){
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
VN$(self,'puts',["Building UI: ",(self.$i_g('@name'))].join(''));
VN$(self.$i_g('@builder'),'call',self);
VN$(self,'puts',"Options:");
VN$(self,'puts',options);
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
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',[0,0,100,100],'title','My Window!'),function(win){
var my_button = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',[0,0,100,100],'bezel','rounded'));
VN$(win,'<<',my_button);
VN$(my_button,'needs_display=',true);
var my_slider = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Slider'),'build',VN.$h('frame',[0,0,100,100]));
VN$(win,'<<',my_slider);
return VN$(my_slider,'needs_display=',true);
});
});

var $VN_1 = RModule.define('RubyWebApp');
var $VN_2 = RClass.define_under($VN_1, 'AppController',cObject);
$VN_2.$def('initialize',function(self,_cmd){
VN$(self,'puts','initialising app controller');
return self.$i_s('@adam',10);
});
$VN_2.$def('will_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application will finish launching!');
});
$VN_2.$def('did_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application did finish launching!!');
});
VN$(cObject.$c_g('Vienna').$c_g('App'),'run',function(app){
return VN$(cObject.$c_g('VN').$c_g('Builder'),'build','main_menu',VN.$h('owner',cObject.$c_g('VN').$c_g('App'),'top_level_objects',[]),function(builder){
return VN$(VN.self,'puts',"builder finished!");
});
});
