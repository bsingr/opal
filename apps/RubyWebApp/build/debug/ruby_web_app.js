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
  if (outer.$const_defined(id)) {
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
  klass = RClass.define_class_id(id, super_klass);
  // VN.set_class_path(klass, outer, id);
  // VN.const_set(outer, id, klass);
  outer.$const_set(id, klass);
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
    // klass = RClass.make_metaclass(obj, obj.$klass);
    console.log(obj);
    klass = obj.$make_metaclass(obj.$klass) ;
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
  We need to copy some of RClass' methods for singletons
*/
RObject.prototype.$define_singleton_method = RClass.prototype.$define_singleton_method;
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
cBasicObject.$define_private_method('initialize', function() {
  return nil ;
});

cBasicObject.$define_alloc_func(function() {
  var obj = new RObject(this, VN.OBJECT) ;
  return obj;
});

cBasicObject.$define_method('==', function(obj) {
  return (obj == this) ? true : false ;
});

cBasicObject.$define_method('equal?', function(obj) {
  return (obj == this) ? true : false ;
});

cBasicObject.$define_method('!', function() {
  
});

cBasicObject.$define_method('!=', function() {
  
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




mKernel.$define_method('class', VN.obj_class, 0);

mKernel.$define_method('clone', VN.obj_clone, 0);

mKernel.$define_method('dup', VN.obj_dup, 0);

mKernel.$define_method('initialize_copy', function(orig) {
  if (orig == this) return this ;
  if (this.$type != orig.$type || this.$klass != orig.$klass) {
    VN.type_error('initialize_copy should take same class object') ;
  }
  return this ;
});

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

cModule.$define_method('freeze', function(mod_freeze) {
  
});
cModule.$define_method('===', function(mod_eqq) {
  
});

cModule.$define_method('==', function(obj_equal) {
  
});

cModule.$define_method('<=>', function(mod_cmp) {
  
});

cModule.$define_method('<', function(mod_lt) {
  
});

cModule.$define_method('<=', function(class_inherited_p) {
  
});

cModule.$define_method('>', function(mod_gt) {
  
});

cModule.$define_method('>=', function(mod_ge) {
  
});




cModule.$define_method('initialize_copy', function(mod_init_copy) {
  
});

cModule.$define_method('to_s', function(mod_to_s) {
  
});

cModule.$define_method('included_modules', function(mod_included_modules) {
  
});

cModule.$define_method('include?', function(mod_include_p) {
  
});

cModule.$define_method('name', function(mod_name) {
  
});

cModule.$define_method('ancestors', function(mod_ancestors) {
  
});




cModule.$define_private_method('attr', function(mod_attr) {
  
});

cModule.$define_private_method('attr_reader', function(mod_attr_reader) {
  
});

cModule.$define_private_method('attr_writer', function(mod_attr_writer) {
  
});

cModule.$define_private_method('attr_accessor', function(mod_attr_accessor) {
  
});


cModule.$define_alloc_func(function(module_s_alloc) {
  
});

cModule.$define_method('initialize', function(mod_initialize) {
  
});

cModule.$define_method('instance_methods', function(class_instance_methods) {
  
});

cModule.$define_method('public_instance_methods', function(class_public_instance_methods) {
  
});

cModule.$define_method('protected_instance_methods', function(class_protected_instance_methods) {
  
});

cModule.$define_method('private_instance_methods', function(class_private_instance_methods) {
  
});




cModule.$define_method('constants', function(mod_constants) {
  
});

cModule.$define_method('const_get', function(mod_const_get) {
  
});

cModule.$define_method('const_set', function(mod_const_set) {
  
});

cModule.$define_method('const_defined?', function(mod_const_defined) {
  
});

cModule.$define_private_method('remove_const', function(mod_remove_const) {
  
});

cModule.$define_method('const_missing', function(mod_const_missing) {
  
});

cModule.$define_method('class_variables', function(mod_class_variables) {
  
});

cModule.$define_method('remove_class_variable', function(mod_remove_cvar) {
  
});

cModule.$define_method('class_variable_get', function(mod_cvar_get) {
  
});

cModule.$define_method('class_variable_set', function(mod_cvar_set) {
  
});

cModule.$define_method('class_variable_defined?', function(mod_cvar_defined) {
  
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


cClass.$define_method('new', function() {
  var obj = this.$call('allocate', []);
  obj.$call('initialize', arguments);
  return obj;
});

cClass.$define_method('allocate', function(obj_alloc) {
  
});

cClass.$define_method('initialize', function(class_initialize) {
  
});

cClass.$define_method('initialize_copy', function(class_init_copy) {
  
});

cClass.$define_method('superclass', function(class_superclass) {
  
});

cClass.$define_alloc_func(function(class_s_alloc) {
  
});

// VN.undef_method(VN.cClass, 'extend_object');
// VN.undef_method(VN.cClass, 'append_features');
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

/**
  'main' object inside runtime
*/
VN.top_self = VN.obj_alloc(cObject);

VN.top_self.$define_singleton_method('to_s', function() {
  return 'main' ;
});

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

mComparable.$define_method('==', function(obj) {
  if (this == obj) return true ;
  return false;
});

mComparable.$define_method('>', function(cmp_gt) {
  
});

mComparable.$define_method('>=', function(cmp_ge) {
  
});

mComparable.$define_method('<', function(cmp_lt) {
  
});

mComparable.$define_method('<=', function(cmp_le) {
  
});

mComparable.$define_method('between?', function(cmp_between) {
  
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

mEnumerable.$define_method('to_a', function(enum_to_a) {
  
});

mEnumerable.$define_method('entries', function(enum_to_a) {
  
});

mEnumerable.$define_method('sort', function(enum_sort) {
  
});

mEnumerable.$define_method('sort_by', function(enum_sort_by) {
  
});

mEnumerable.$define_method('grep', function(enum_grep) {
  
});

mEnumerable.$define_method('count', function(enum_count) {
  
});

mEnumerable.$define_method('find', function(enum_find) {
  
});

mEnumerable.$define_method('detect', function(enum_find) {
  
});

mEnumerable.$define_method('find_index', function(enum_find_index) {
  
});

mEnumerable.$define_method('find_all', function(enum_find_all) {
  
});

mEnumerable.$define_method('select', function(enum_find_all) {
  
});

mEnumerable.$define_method('reject', function(enum_reject) {
  
});

mEnumerable.$define_method('collect', function(enum_collect) {
  
});

mEnumerable.$define_method('map', function(enum_collect) {
  
});

mEnumerable.$define_method('inject', function(enum_inject) {
  
});

mEnumerable.$define_method('reduce', function(enum_inject) {
  
});

mEnumerable.$define_method('partition', function(enum_partition) {
  
});

mEnumerable.$define_method('group_by', function(enum_group_by) {
  
});

mEnumerable.$define_method('first', function(enum_first) {
  
});

mEnumerable.$define_method('all', function(enum_all) {
  
});

mEnumerable.$define_method('any?', function(enum_any) {
  
});

mEnumerable.$define_method('one?', function(enum_one) {
  
});

mEnumerable.$define_method('none?', function(enum_none) {
  
});

mEnumerable.$define_method('min', function(enum_min) {
  
});

mEnumerable.$define_method('max', function(enum_max) {
  
});

mEnumerable.$define_method('minmax', function(enum_minmax) {
  
});

mEnumerable.$define_method('min_by', function(enum_min_by) {
  
});

mEnumerable.$define_method('max_by', function(enum_max_by) {
  
});

mEnumerable.$define_method('minmax_by', function(enum_minmax_by) {
  
});

mEnumerable.$define_method('include?', function(enum_member) {
  
});

mEnumerable.$define_method('member?', function(enum_member) {
  
});

mEnumerable.$define_method('each_with_index', function(enum_each_with_index) {
  
});

mEnumerable.$define_method('reverse_each', function(enum_reverse_each) {
  
});

mEnumerable.$define_method('zip', function(enum_zip) {
  
});

mEnumerable.$define_method('take', function(enum_take) {
  
});

mEnumerable.$define_method('take_while', function(enum_take_while) {
  
});

mEnumerable.$define_method('drop', function(enum_drop) {
  
});

mEnumerable.$define_method('drop_while', function(enum_drop_while) {
  
});

mEnumerable.$define_method('cycle', function(enum_cycle) {
  
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

String.prototype.$klass = cString ;
String.prototype.$type = VN.STRING ;

String.prototype.$call = RObject.prototype.$call;



cString.$define_alloc_func(function() {
  return new String();
});

cString.$define_singleton_method('try_convert', function(obj) {
  
});

cString.$define_method('initialize', function(str_init) {
  
});

cString.$define_method('initialize_copy', function(str_replace) {
  
});

cString.$define_method('<=>', function(str_cmp_m) {
  
});

cString.$define_method('==', function(str_equal) {
  
});

cString.$define_method('eql?', function(str_eql) {
  
});

cString.$define_method('hash', function(str_hash_m) {
  
});

cString.$define_method('casecmp', function(str_casecmp) {
  
});

cString.$define_method('+', function(str_plus) {
  
});

cString.$define_method('*', function(str_times) {
  
});

cString.$define_method('%', function(str_format_m) {
  
});

cString.$define_method('[]', function(str_aref_m) {
  
});

cString.$define_method('[]=', function(str_aset_m) {
  
});

cString.$define_method('insert', function(str_insert) {
  
});

cString.$define_method('length', function() {
  return this.length;
});

cString.$define_method('size', function() {
  return this.length;
});

cString.$define_method('bytesize', function(str_bytesize) {
  
});

cString.$define_method('empty?', function(str_empty) {
  
});

cString.$define_method('=~', function(str_match) {
  
});

cString.$define_method('match', function(str_match_m) {
  
});

cString.$define_method('succ', function(str_succ) {
  
});

cString.$define_method('next', function(str_succ) {
  
});

cString.$define_method('upto', function(str_upto) {
  
});

cString.$define_method('index', function(str_index_m) {
  
});

cString.$define_method('rindex', function(str_rindex_m) {
  
});

cString.$define_method('replace', function(str_replace) {
  
});

cString.$define_method('clear', function(str_clear) {
  
});

cString.$define_method('chr', function(str_chr) {
  
});

cString.$define_method('getbyte', function(str_getbyte) {
  
});

cString.$define_method('setbyte', function(str_setbyte) {
  
});


cString.$define_method('to_i', function(str_to_i) {

});

cString.$define_method('to_f', function(str_to_f) {
  
});


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

// VN.include_module(VN.cNumeric, VN.mComparable);
RModule.include(cNumeric, mComparable);

cNumeric.$define_method('singleton_method_added', function() {
  
});

cNumeric.$define_method('initialize_copy', function() {
  
});

cNumeric.$define_method('coerce', function() {
  
});

cNumeric.$define_method('+@', function() {
  
});

cNumeric.$define_method('-@', function() {
  
});

cNumeric.$define_method('<=>', function() {
  
});

cNumeric.$define_method('eql?', function() {
  
});

cNumeric.$define_method('quo', function() {
  
});

cNumeric.$define_method('fdiv', function() {
  
});

cNumeric.$define_method('div', function() {
  
});

cNumeric.$define_method('divmod', function() {
  
});

cNumeric.$define_method('modulo', function() {
  
});

cNumeric.$define_method('remainder', function() {
  
});

cNumeric.$define_method('abs', function() {
  
});

cNumeric.$define_method('magnitude', function() {
  
});

cNumeric.$define_method('to_int', function() {
  
});

cNumeric.$define_method('real?', function() {
  
});

cNumeric.$define_method('integer?', function() {
  
});

cNumeric.$define_method('zero?', function() {
  
});

cNumeric.$define_method('nonzero?', function() {
  
});

cNumeric.$define_method('floor', function() {
  
});

cNumeric.$define_method('ceil', function() {
  
});

cNumeric.$define_method('round', function() {
  
});

cNumeric.$define_method('truncate', function() {
  
});

cNumeric.$define_method('step', function() {
  
});

cNumeric.$define_method('odd?', function() {
  
});

cNumeric.$define_method('even?', function() {
  
});

cNumeric.$define_method('upto', function() {
  
});

cNumeric.$define_method('downto', function() {
  
});

cNumeric.$define_method('times', function() {
  
});

cNumeric.$define_method('succ', function() {
  
});

cNumeric.$define_method('next', function() {
  
});

cNumeric.$define_method('pred', function() {
  
});

cNumeric.$define_method('chr', function() {
  
});

cNumeric.$define_method('ord', function() {
  
});

cNumeric.$define_method('to_i', function() {
  
});

cNumeric.$define_method('to_s', function() {
  
});

cNumeric.$define_method('+', function() {
  
});

cNumeric.$define_method('-', function() {
  
});

cNumeric.$define_method('*', function() {
  
});

cNumeric.$define_method('/', function() {
  
});

cNumeric.$define_method('%', function() {
  
});

cNumeric.$define_method('**', function() {
  
});

cNumeric.$define_method('==', function() {
  
});

cNumeric.$define_method('>', function() {
  
});

cNumeric.$define_method('>=', function() {
  
});

cNumeric.$define_method('<', function() {
  
});

cNumeric.$define_method('<=', function() {
  
});

cNumeric.$define_method('~', function() {
  
});

cNumeric.$define_method('&', function() {
  
});

cNumeric.$define_method('|', function() {
  
});

cNumeric.$define_method('^', function() {
  
});

cNumeric.$define_method('[]', function() {
  
});

cNumeric.$define_method('<<', function() {
  
});

cNumeric.$define_method('>>', function() {
  
});

cNumeric.$define_method('to_f', function() {
  
});
// require('core/array');

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
  var hash = cHash.$call('new', []) ;
  for (var i = 0; i < arguments.length; i++) {
    hash.$call('[]=', [arguments[i][0], arguments[i][1]]);
  }
  return hash;
};

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
});

cHash.$define_singleton_method('[]', function() {
  
});

cHash.$define_singleton_method('try_convert', function() {
  
});

cHash.$define_method('initialize', function() {
  // for now, just set the arg, if exists, as the ifnone for the hash
  if (arguments.length > 0) {
    this.$ifnone = arguments[0] ;
  }
});

cHash.$define_method('initialize_copy', function() {
  
});

cHash.$define_method('rehash', function() {
  
});




cHash.$define_method('to_hash', function() {
  return this ;
});

cHash.$define_method('to_a', function() {
  var ary = [];
  for (var i = 0; i < this.$keys.length; i++) {
    ary.push([this.$keys[i], this.$values[this.$keys[i]]]);
  }
  return ary;
});

cHash.$define_method('to_s', function() {
  if (this.$keys.length == 0) return '{...}';
  
  var str = '{' + this.$keys[0].$call('inspect', []) + '=>' + this.$values[this.$keys[0]].$call('inspect', []);
  for (var i = 1; i < this.$keys.length; i++) {
    str += (', ' + this.$keys[i].$call('inspect', []) + '=>' + this.$values[this.$keys[i]].$call('inspect', []))
  }
  str += '}';
  return str;
});

cHash.$define_method('inspect', function() {
  return this.$call('to_s', []) ;
});




cHash.$define_method('==', function() {
  
});

cHash.$define_method('[]', function(key) {
  if (!this.$values.hasOwnProperty(key)) {
    return this.$call('default', [key]);
  }
  return this.$values[key] ;
});

cHash.$define_method('hash', function() {
  
});

cHash.$define_method('eql?', function() {
  
});

cHash.$define_method('fetch', function() {
  
});

cHash.$define_method('[]=', function(key, val) {
  // if we dont have the key, add it to the ordered array so that we can keep
  // the hash ordered.
  if (!this.$values.hasOwnProperty(key)) {
    this.$keys.push(key);
  }
  
  this.$values[key] = val ;
  return val ;
});

cHash.$define_method('store', function(key, val) {
  return this.$call('[]=', [key, val]);
});

cHash.$define_method('default', function() {
  return this.$ifnone ;
});

cHash.$define_method('default=', function(ifnone) {
  this.$ifnone = ifnone;
  return ifnone;
});

cHash.$define_method('default_proc', function() {
  
});

cHash.$define_method('default_proc=', function() {
  
});

cHash.$define_method('key', function() {
  
});

cHash.$define_method('index', function() {
  
});

cHash.$define_method('size', function() {
  
});

cHash.$define_method('length', function() {
  
});

cHash.$define_method('empty?', function() {
  
});




cHash.$define_method('each_value', function() {
  
});

cHash.$define_method('each_key', function() {
  
});

cHash.$define_method('each_pair', function() {
  
});

cHash.$define_method('each', function() {
  
});




cHash.$define_method('keys', function() {
  
});

cHash.$define_method('values', function() {
  
});

cHash.$define_method('values_at', function() {
  
});




cHash.$define_method('shift', function() {
  
});

cHash.$define_method('delete', function() {
  
});

cHash.$define_method('delete_if', function() {
  
});

cHash.$define_method('select', function() {
  
});

cHash.$define_method('reject', function() {
  
});

cHash.$define_method('reject!', function() {
  
});

cHash.$define_method('clear', function() {
  
});

cHash.$define_method('invert', function() {
  
});

cHash.$define_method('update', function() {
  
});

cHash.$define_method('replace', function() {
  
});

cHash.$define_method('merge!', function() {
  
});

cHash.$define_method('merge', function() {
  
});

cHash.$define_method('assoc', function() {
  
});

cHash.$define_method('rassoc', function() {
  
});

cHash.$define_method('flatten', function() {
  
});




cHash.$define_method('include?', function() {
  
});

cHash.$define_method('member?', function() {
  
});

cHash.$define_method('has_key?', function() {
  
});

cHash.$define_method('has_value?', function() {
  
});

cHash.$define_method('key?', function() {
  
});

cHash.$define_method('value?', function() {
  
});




cHash.$define_method('compare_by_identity', function() {
  
});

cHash.$define_method('compare_by_identity?', function() {
  
});
// require('core/struct');
// require('core/regexp');
// require('core/range');
// require('core/time');
// require('core/proc');
// require('core/math');
// require('core/enumerator');

VN.top_self.$define_singleton_method('john', function(bob,now,older){
var adam = 4;
this.$call('john', [])return ben = 10;
});
cObject.$const_set('VN',10);
var $VN_1 = RClass.define('Other', cObject);
$VN_1.$define_method('adam', function(){
});

