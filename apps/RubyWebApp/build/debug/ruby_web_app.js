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
  (cObject ? cObject : obj).$const_set(id, obj);
  
  return obj;
};

VN.boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

VN.obj_alloc = function(klass) {
  var obj = klass.$call('allocate', []);
  return obj;
};

VN.class_allocate_instance = function() {
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
 return this ;
};

RClass.inherited = function(super_klass, klass) {
  if (!super_klass) super_klass = cObject ;
  return super_klass.$call('inherited', [klass]) ;
};
  
RClass.define = function(id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return existing class/mod.
  if (cObject.$const_defined(id)) {
    klass = cObject.$const_get(id);
    if (klass.$type != VN.CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (klass.$super.$real() != super_klass) {
      VN.name_error(id + ' is already defined');
    }
    return klass;
  }
  if (!super_klass) {
    VN.warning('no super class for `' + id + '`, Object assumed')
  }
  klass = RClass.define_class_id(id, super_klass);
  VN.class_tbl[id] = klass;
  klass.$name(id);
  cObject.$const_set(id, klass);
  RClass.inherited(super_klass, klass);
  return klass;
};
  
RClass.define_under = function(outer, id, super_klass) {
  var klass;
  // if already defined in context... just ensure it is a macthing class def
  if (VN.const_defined_at(outer, id)) {
    klass = VN.const_get_at(outer, id);
    if (klass.$type != VN.CLASS) {
      VN.type_error(id + ' is not a class');
    }
    if (VN.class_real(klass.$super) != super_klass) {
      VN.name_error(id + ' is already defined');
    }
    return klass;
  }
  // not existing...
  if (!super_klass) {
    VN.warning('no super class for `' + VN.class2name(outer), + '::' + id + '`, Object assumed');
  }
  klass = RClass.define_id(id, super_klass);
  VN.set_class_path(klass, outer, id);
  VN.const_set(outer, id, klass);
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

  metametaclass.$super = super_of_metaclass.$klass.$ivar_get('__attached__') == super_of_metaclass ? super_of_metaclass.$klass : RClass.make_metametaclass(super_of_metaclass);
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

  if (obj.$type == VN.T_FIXNUM || obj.$type == VN.T_SYMBOL) {
    VN.type_error('can\'t define singleton');
  }

  if (obj.$klass.$singleton && obj.$klass['__attached__'] == obj) {
    klass = obj.$klass;
  }
  else {
    klass = RClass.make_metaclass(obj, obj.$klass);
  }

  if (obj.$type == VN.CLASS) {
    if (klass.$klass.$ivar_get('__attached__') != klass) {
      RClass.make_metametaclass(klass);
    }
  }

  return klass;
};

RClass.prototype.$name = function(id) {
  this['__classid__'] = id;
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
    this['__attached__'] = obj;
  }
};


RClass.prototype.$call = function(id, args) {
  var method = this.$klass.$search_method(id);
  // console.log('searching for: ' + id);
  // console.log(this.$klass);
  if (!method) throw 'VN#funcall cannot find method: ' + id ;
  return method.apply(this, args) ;
};

RClass.prototype.$cvar_get = function(id) {
  var tmp = this;
  var value;
  while(tmp) {
    if (value = tmp[id]) {
      return value;
    }
    tmp = tmp.$super;
  }
  VN.name_error('uninitialized class variable ' + id + ' in ' + klass.name);
  return nil ;
};

RClass.prototype.$ivar_get = function(id) {
  return this[id];
};

RClass.prototype.$ivar_set = function(id, val) {
  this[id] = val;
  return val ;
}

RClass.prototype.$define_method = function(name, func) {
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
  this[name] = func;
};

RClass.prototype.$define_singleton_method = function(name, func) {
  RClass.singleton_class(this).$define_method(name, func);
};

RClass.prototype.$define_alias = function(id1, id2) {
  
};

RClass.prototype.$define_alloc_func = function(func) {
  RClass.singleton_class(this).$add_method('allocate', func);
};

RClass.prototype.$undef_alloc_func = function() {
  RClass.singleton_class(this).$add_method('allocate', null);
};

RClass.prototype.$search_method = function(id) {
  var klass = this; var func ;
  console.log(id);
  console.log(klass);
  // return null ;
  while (!(func = klass[id])) {
    klass = klass.$super;
    console.log(this.$super.__classid__);
    if (!klass) return undefined;
  }
  return func;
};

RClass.prototype.$call = function(id, args) {
  // var method = this.$search_method(this.$klass, id);
  var method = this.$klass.$search_method(id);
  if (!method) throw 'VN#funcall cannot find method: ' + id ;
  return method.apply(this, args) ;
};

RClass.prototype.$cvar_get = function(id) {
  var tmp = this;
  var value ;
  while (tmp) {
    if (value = tmp[id]) {
      return value;
    }
    tmp = tmp.$super;
  }
  VN.name_error(id, 'uninitialized class variable ' + id + ' in ' + klass.name);
  return nil;
};

RClass.prototype.$const_set = function(id, val) {
  this.$mod_av_set(id, val, true);
};

RClass.prototype.$mod_av_set = function(id, val, isconst) {
  this[id] = val ;
};

RClass.prototype.$const_get = function(id) {
  
};

RClass.prototype.$const_defined = function(id) {
  
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
  if (cObject.$const_defined(id)) {
    module = cObject.$const_get(id);
    if (module.type == VN.MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = RModule.define_module_id(id);
  VN.class_tbl[id] = module;
  cObject.$const_set(id, module);

  return module;
};

RModule.define_module_under = function() {
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

RModule.define_module_id = function(id) {
  var mdl = RModule.create();
  // VN.name_class(mdl, id);
  mdl.$name(id);
  // mdl.$name(id);
  return mdl;
};

RModule.create = function() {
  var mdl = RClass.alloc(VN.MODULE, cModule);
  return mdl;
};

RModule.include = function(klass, module) {
  // console.log('include_module not yet implemented');
  if (module.type != VN.MODULE) {
    // error?
  }
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
  this.$klass = klass ;
  this.$type = type ;
  return this;
};

RObject.prototype.$ivar_set = function(id, val) {
  this[id] = val ;
  return val ;
};

RObject.prototype.$ivar_get = function(id) {
  return this[id] ;
};

RObject.prototype.$call = function(id, args) {
  var method = this.$klass.$search_method(id);
  if (!method) throw 'RObject#call cannot find method: ' + id ;
  return method.apply(this, args) ;
};
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
cBasicObject.$define_private_method('initialize', VN.obj_dummy, 0);
cBasicObject.$define_alloc_func(VN.class_allocate_instance);
cBasicObject.$define_method('==', VN.obj_equal, 1);
cBasicObject.$define_method('equal?', VN.obj_equal, 1);
cBasicObject.$define_method('!', VN.obj_not, 0);
cBasicObject.$define_method('!=', VN.obj_not_equal);
cBasicObject.$define_private_method('singleton_method_added', VN.obj_dummy, 1);
cBasicObject.$define_private_method('singleton_method_removed', VN.obj_dummy, 1);
cBasicObject.$define_private_method('singleton_method_undefined', VN.obj_dummy, 1);

/**
  Kernel neccessary methods
*/
mKernel = RModule.define("Kernel");
// VN.include_module(VN.cObject, VN.mKernel);
cClass.$define_private_method('inherited', VN.obj_dummy, 1);
cModule.$define_private_method('included', VN.obj_dummy, 1);
cModule.$define_private_method('extended', VN.obj_dummy, 1);
cModule.$define_private_method('method_added', VN.obj_dummy, 1);
cModule.$define_private_method('method_removed', VN.obj_dummy, 1);
cModule.$define_private_method('method_undefined', VN.obj_dummy, 1);

/**
  Base Classes/Modules
*/
// VN.cNilClass = RClass.define('NilClass', VN.cObject);
var cNilClass = RClass.define('NilClass', cObject);
var cString = RClass.define('String', cObject);

// // VN.cTrueClass = VN.define_class('TrueClass', VN.cObject);
// // VN.cFalseClass = VN.define_class('FalseClass', VN.cObject);
// // VN.cArray = VN.define_class('Array', VN.cObject);
// // VN.cString = VN.define_class('String', VN.cObject);
// // VN.cSymbol = VN.define_class('Symbol', VN.cObject);
// 
// 
// /**
//   Initialize top self - the 'main' object at runtime
// */
// VN.top_self = VN.obj_alloc(VN.cObject);
// 
// VN.top_self.$define_singleton_method('to_s', function() {
//   return 'main';
// });


/* 
 * kernel.js
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

mKernel.$define_method('nil?', function() {
  return false;
});

mKernel.$define_method('===', function() {
  
});

mKernel.$define_method('=~', function(obj) {
  return nil ;
});

mKernel.$define_method('!=', function(obj) {
  return this.$call('=~', obj) ? false : true ;
});

mKernel.$define_method('eql?', function() {
  
});

// VN.define_method(VN.mKernel, 'nil?', VN.rb_false, 0);
// VN.define_method(VN.mKernel, '===', VN.equal, 1);
// VN.define_method(VN.mKernel, '=~', VN.obj_match, 1);
// VN.define_method(VN.mKernel, '!~', VN.obj_not_match, 1);
// VN.define_method(VN.mKernel, 'eql?', VN.obj_equal, 1);

VN.obj_init_copy = function (self, orig) {
  if (self == orig) return self ;
  if (self.type != orig.type || obj.klass != orig.klass) {
    VN.type_error('initialize_copy should take same class object');
  }
  return self;
};

mKernel.$define_method('class', VN.obj_class, 0);
mKernel.$define_method('clone', VN.obj_clone, 0);
mKernel.$define_method('dup', VN.obj_dup, 0);
mKernel.$define_method('initialize_copy', VN.obj_init_copy, 1);

mKernel.$define_method('taint', VN.obj_taint, 0);
mKernel.$define_method('tainted?', VN.obj_tainted, 0);
mKernel.$define_method('untaint', VN.obj_untaint, 0);
mKernel.$define_method('untrust', VN.obj_untrust, 0);
mKernel.$define_method('untrusted?', VN.obj_untrusted, 0);
mKernel.$define_method('trust', VN.obj_trust, 0);
mKernel.$define_method('freeze', VN.obj_freeze, 0);
mKernel.$define_method('frozen?', VN.obj_frozen_p, 0);




mKernel.$define_method('to_s', function() {
  return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;
});

mKernel.$define_method('inspect', function() {
  return "";
});

mKernel.$define_method('methods', function() {
  
});

mKernel.$define_method('singleton_methods', function() {
  
});

mKernel.$define_method('protected_methods', function() {
  
});

mKernel.$define_method('private_methods', function() {
  
});

mKernel.$define_method('public_methods', function() {
  
});

mKernel.$define_method('instance_variables', function() {
  
});

mKernel.$define_method('instance_variables_get', function(iv) {
  return this.$ivar_get(iv);
});

mKernel.$define_method('instance_variables_set', function(iv, val) {
  return this.$ivar_set(iv, val);
});

mKernel.$define_method('instance_variables_defined?', function(iv) {
  return this.$ivar_defined(iv);
});

mKernel.$define_private_method('remove_instance_variable', function(iv) {
  
});





mKernel.$define_method('instance_of?', function(klass) {
  switch (klass.$type) {
    case VN.MODULE:
    case VN.CLASS:
    case VN.ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  if (this.$klass == klass) return true ;
  return false ;
});

mKernel.$define_method('kind_of?', function(klass) {
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
  return false; 
});

mKernel.$define_method('is_a?', function(klass) {
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
  return false; 
});

mKernel.$define_method('tap', function() {
  VN.warning('Kernel#tap is unimplemented');
});

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

cModule.$define_method('freeze', VN.mod_freeze, 0);
cModule.$define_method('===', VN.mod_eqq, 1);
cModule.$define_method('==', VN.obj_equal, 1);
cModule.$define_method('<=>', VN.mod_cmp, 1);
cModule.$define_method('<', VN.mod_lt, 1);
cModule.$define_method('<=', VN.class_inherited_p, 1);
cModule.$define_method('>', VN.mod_gt, 1);
cModule.$define_method('>=', VN.mod_ge, 1);

cModule.$define_method('initialize_copy', VN.mod_init_copy, 1);
cModule.$define_method('to_s', VN.mod_to_s, 0);
cModule.$define_method('included_modules', VN.mod_included_modules, 0);
cModule.$define_method('include?', VN.mod_include_p, 1);
cModule.$define_method('name', VN.mod_name, 0);
cModule.$define_method('ancestors', VN.mod_ancestors, 0);

cModule.$define_private_method('attr', VN.mod_attr, -1);
cModule.$define_private_method('attr_reader', VN.mod_attr_reader, -1);
cModule.$define_private_method('attr_writer', VN.mod_attr_writer, -1);
cModule.$define_private_method('attr_accessor', VN.mod_attr_accessor, -1);

cModule.$define_alloc_func(VN.module_s_alloc);
cModule.$define_method('initialize', VN.mod_initialize, 0);
cModule.$define_method('instance_methods', VN.class_instance_methods, -1);
cModule.$define_method('public_instance_methods', VN.class_public_instance_methods, -1);
cModule.$define_method('protected_instance_methods', VN.class_protected_instance_methods, -1);
cModule.$define_method('private_instance_methods', VN.class_private_instance_methods, -1);

cModule.$define_method('constance', VN.mod_constants, -1);
cModule.$define_method('const_get', VN.mod_const_get, -1);
cModule.$define_method('const_set', VN.mod_const_set, 2);
cModule.$define_method('const_defined?', VN.mod_const_defined, -1);
cModule.$define_private_method('remove_const', VN.mod_remove_const, 1);
cModule.$define_method('const_missing', VN.mod_const_missing, 1);
cModule.$define_method('class_variables', VN.mod_class_variables, 0);
cModule.$define_method('remove_class_variable', VN.mod_remove_cvar, 1);
cModule.$define_method('class_variable_get', VN.mod_cvar_get, 1);
cModule.$define_method('class_variable_set', VN.mod_cvar_set, 2);
cModule.$define_method('class_variable_defined?', VN.mod_cvar_defined, 1);
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

/**
  Variable arguments
*/
VN.obj_call_init = function(self, args) {
  console.log(self);
  self.$call('initialize', args);
};

cClass.$define_method('allocate', VN.obj_alloc);

cClass.$define_method('new', function() {
  var obj = VN.obj_alloc(this);
  VN.obj_call_init(obj, arguments);
  return obj;
});

cClass.$define_method('initialize', VN.class_initialize, -1);
cClass.$define_method('initialize_copy', VN.class_init_copy, 1);
cClass.$define_method('superclass', VN.class_superclass, 0);
cClass.$define_alloc_func(VN.class_s_alloc);
// VN.undef_method(VN.cClass, 'extend_object');
// VN.undef_method(VN.cClass, 'append_features');
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

String.prototype.$klass = cString ;
String.prototype.$type = VN.STRING ;

cString.$define_alloc_func(function() {
  return new String();
});

cString.$define_singleton_method('try_convert', function(obj) {
  
});

cString.$define_method('initialize', VN.str_init, -1);
cString.$define_method('initialize_copy', VN.str_replace, 1);
cString.$define_method('<=>', VN.str_cmp_m, 1);
cString.$define_method('==', VN.str_equal, 1);
cString.$define_method('eql?', VN.str_eql, 1);
cString.$define_method('hash', VN.str_hash_m, 0);
cString.$define_method('casecmp', VN.str_casecmp, 1);
cString.$define_method('+', VN.str_plus, 1);
cString.$define_method('*', VN.str_times, 1);
cString.$define_method('%', VN.str_format_m, 1);
cString.$define_method('[]', VN.str_aref_m, -1);
cString.$define_method('[]=', VN.str_aset_m, -1);
cString.$define_method('insert', VN.str_insert, 2);

cString.$define_method('length', function() {
  return this.length;
});

cString.$define_method('size', function() {
  return this.length;
});

cString.$define_method('bytesize', VN.str_bytesize, 0);
cString.$define_method('empty?', VN.str_empty, 0);
cString.$define_method('=~', VN.str_match, 1);
cString.$define_method('match', VN.str_match_m, -1);
cString.$define_method('succ', VN.str_succ, 0);
cString.$define_method('succ!', VN.str_succ_bang, 0);
cString.$define_method('next', VN.str_succ, 0);
cString.$define_method('next!', VN.str_succ_bang, 0);
cString.$define_method('upto', VN.str_upto, -1);
cString.$define_method('index', VN.str_index_m, -1);
cString.$define_method('rindex', VN.str_rindex_m, -1);
cString.$define_method('replace', VN.str_replace, 1);
cString.$define_method('clear', VN.str_clear, 0);
cString.$define_method('chr', VN.str_chr, 0);
cString.$define_method('getbyte', VN.str_getbyte, 1);
cString.$define_method('setbyte', VN.str_setbyte, 2);

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

cString.$define_method('to_i', VN.str_to_i, -1);
cString.$define_method('to_f', VN.str_to_f, 0);

cString.$define_method('to_s', function() {
  return new String(this);
});

cString.$define_method('to_str', function() {
  return new String(this);
});

cString.$define_method('inspect', function() {
  return new String('"' + this + '"');
});

cString.$define_method('dump', VN.str_dump, 0);

cString.$define_method('upcase', VN.str_upcase, 0);
cString.$define_method('downcase', VN.str_downcase, 0);
cString.$define_method('capitalize', VN.str_capitalize, 0);
cString.$define_method('swapcase', VN.str_swapcase, 0);

cString.$define_method('upcase!', VN.str_upcase_bang, 0);
cString.$define_method('downcase!', VN.str_downcase_bang, 0);
cString.$define_method('capitalize!', VN.str_capitalize_bang, 0);
cString.$define_method('swapcase!', VN.str_swapcase_bang, 0);

cString.$define_method('hex', VN.str_hex, 0);
cString.$define_method('oct', VN.str_oct, 0);
cString.$define_method('split', VN.str_split_m, -1);
cString.$define_method('lines', VN.str_each_line, -1);
cString.$define_method('bytes', VN.str_each_byte, 0);
cString.$define_method('chars', VN.str_each_char, 0);
cString.$define_method('codepoints', VN.str_each_codepoint, 0);
cString.$define_method('reverse', VN.str_reverse, 0);
cString.$define_method('reverse!', VN.str_reverse_bang, 0);
cString.$define_method('concat', VN.str_concat, 1);
cString.$define_method('<<', VN.str_concat, 1);
cString.$define_method('crypt', VN.str_crypt, 1);
cString.$define_method('intern', VN.str_intern, 0);
cString.$define_method('to_sym', VN.str_intern, 0);
cString.$define_method('ord', VN.str_ord, 0);

cString.$define_method('include?', VN.str_include, 1);
cString.$define_method('start_with?', VN.str_start_with, -1);
cString.$define_method('end_with?', VN.str_end_with, -1);

cString.$define_method('scan', VN.str_scan, 1);

cString.$define_method('ljust', VN.str_ljust, -1);
cString.$define_method('rjust', VN.str_rjust, -1);
cString.$define_method('center', VN.str_center, -1);

cString.$define_method('sub', VN.str_sub, -1);
cString.$define_method('gsub', VN.str_gsub, -1);
cString.$define_method('chop', VN.str_chop, 0);
cString.$define_method('chomp', VN.str_chomp, -1);
cString.$define_method('strip', VN.str_strip, 0);
cString.$define_method('lstrip', VN.str_lstrip, 0);
cString.$define_method('rstrip', VN.str_rstrip, 0);

cString.$define_method('sub!', VN.str_sub_bang, -1);
cString.$define_method('gsub!', VN.str_gsub_bang, -1);
cString.$define_method('chop!', VN.str_chop_bang, 0);
cString.$define_method('chomp!', VN.str_chomp_bang, -1);
cString.$define_method('strip!', VN.str_strip_bang, 0);
cString.$define_method('lstrip!', VN.str_lstrip_bang, 0);
cString.$define_method('rstrip!', VN.str_rstrip_bang, 0);

cString.$define_method('tr', VN.str_tr, 2);
cString.$define_method('tr_s', VN.str_tr_s, 2);
cString.$define_method('delete', VN.str_delete, -1);
cString.$define_method('squeeze', VN.str_squeeze, -1);
cString.$define_method('count', VN.str_count, -1);

cString.$define_method('tr!', VN.str_tr_bang, 2);
cString.$define_method('tr_s!', VN.str_tr_s_bang, 2);
cString.$define_method('delete!', VN.str_delete_bang, -1);
cString.$define_method('squeeze!', VN.str_squeeze_bang, -1);

cString.$define_method('each_line', VN.str_each_line, -1);
cString.$define_method('each_byte', VN.str_each_byte, 0);
cString.$define_method('each_char', VN.str_each_char, 0);
cString.$define_method('each_codepoint', VN.str_each_codepoint, 0);

cString.$define_method('sum', VN.str_sum, -1);

cString.$define_method('slice', VN.str_aref_m, -1);
cString.$define_method('slice!', VN.str_slice_bang, -1);

cString.$define_method('partition', VN.str_partition, 1);
cString.$define_method('rpartition', VN.str_rpartition, 1);

cString.$define_method('encoding', VN.obj_encoding, 0); /* in encoding.c */
cString.$define_method('force_encoding', VN.str_force_encoding, 1);
cString.$define_method('valid_encoding?', VN.str_valid_encoding_p, 0);
cString.$define_method('ascii_only?', VN.str_is_ascii_only_p, 0);
