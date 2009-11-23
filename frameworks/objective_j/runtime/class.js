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

// Define a class. This must be Objj compatible
function rb_define_class(id, super_klass) {

};


function rb_define_class_under(outer, id, super_klass) {

};


function rb_class2name(klass) {
  return rb_class_name(klass);
};

function rb_obj_classname(obj) {
  return rb_class2name(obj.isa);
};

/**
  Depreceate in Objj
*/
// function rb_make_metametaclass(metaclass) {
// 
// };

/**
  This might have more use as a part of vanilla objj
*/
function rb_real(klass) {
  while ((klass.$singleton == true) || (klass.$type == VN.ICLASS)) {
    klass = klass.$super
  }
  return klass
};

/**
  Depreceate in Objj
*/
// RClass.alloc = function(type, klass) {
//   var obj = new RClass();
//   obj.$klass = klass;
//   obj.$type = type;
//   return obj;
// };

/**
  Depreceate in objj
*/
// RClass.boot = function(super_klass) {
//   var klass = RClass.alloc(VN.CLASS, cClass);
//   klass.$super = super_klass; 
//   return klass;
// };

/**
  Depreceate in objj
*/
// RClass.check_inheritable = function(super_klass) {
//   if (super_klass.$type != VN.CLASS) {
//     VN.type_error('super class must be a Class (' + VN.obj_classname(super_klass) + ' given)');
//   }
//   if (super_klass.singleton) {
//     VN.type_error('can\'t make a subclass of singleton class');
//   }
// };

/**
  Depreceate in objj
*/
// RClass.create = function(super_klass) {
//   RClass.check_inheritable(super_klass);
// 
//   if (super_klass == cClass) {
//     VN.raise(VN.TypeError, "can't make subclass of Class")
//   }
//   return RClass.boot(super_klass);
// };

/**
  Depreceate in objj
*/
// RClass.define_class_id = function(id, super_klass) {
//   var klass;
//   if (!super_klass) super_klass = cObject;
//   klass = RClass.create(super_klass);
//   klass.$make_metaclass(super_klass.$klass);
//   return klass;
// };

/**
  Singleton classes
  =================
  
  This will definately be a good idea in objj. KVO can use this, as can other
  classes/places to make singleton creation simpler. Adding singleton feature
  to objectivej wont be a good idea, it will look messy. could add a class
  method to do it, which takes a function() as the method block.
*/
function rb_singleton_class(obj) {
  var klass;
  
  // check object can be made a singleton
  if ([CPNumber, CPString, rb_cSymbol].indexOf(obj.isa) !== -1) {
    throw 'Cannot define a singleton on this type of object'
  }

  // fix this!. we need a better systm to interoperate with objj
  if (obj.$klass.$singleton && obj.$klass.$i_g('__attached__') == obj) {
    klass = obj.$klass;
  }
  else {
    // klass = RClass.make_metaclass(obj, obj.$klass);
    // console.log(obj);
    klass = obj.$make_metaclass(obj.$klass) ;
  }
  // end fix this

  // do we need to check the property
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

/**
  Depreceate?
  ===========
  Objj shoves everything into subclass' prototype, so if method isnt there
  then we call method_missing/forward.
  
  Stop using mthod_missing, and just use forward: .. stops potential clashes.
*/
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

/**
  This is more elegeantly done in objj, use that instead (seeing as we are making our
  classes conform to objj runtime)
*/
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
// };

// rb_top_self's rb_ivtbl could point to objj's GLOBAL_NAMESPACE.... makes sense in going up
// looking for constants
function rb_const_set(klass, id, val) {
  if (klass) {
    // define on class
    // if we are setting on a class, then its meant to be internal. Global CONSTANTS in
    // objj will be declared outside a class def, on rb_top_self.
    klass.rb_ivtbl[id] = val;
  }
  else {
    // no class, so define top level: in objj's REGISTERED_CLASSES or GLOBAL_NAMESPACE
    // ... probbaly should put in both unless its a class/module
  }
  return val;
}

function rb_const_get(klass, id) {
  var tmp = this;
  var value;
  while (tmp) {
    if (value = tmp.$iv_tbl[id]) {
      return value;
    }
    tmp = tmp.$super;
  }
  throw 'uninitialized constant ' + id + ' in ' + this.name;
  return nil;
}


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
