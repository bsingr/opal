// Base of every class, module and object in opal. Natives like array, string, number
// etc all inherit the properties defined on this class, so they all inherit these
// functionalites as well.
//
// Naming convention
// =================
//
// As we are defining properties on natives as well, all properties and methods will be
// named to avoid conflicts.
//
// Methods
// -------
// All methods are defined on a prootptye with a prefix 'm$', so, to_s, for example will
// actually be named m$to_s.
//
// Runtime
// -------
// All objects etc need some runtime info, like their hash, class, super, etc. All these
// properties will have a '$' prefix, so the info becomes myObject.$info.
//
// Ivars
// -----
// Instance variables are literally the ivar property set on the receiver. For example,
// looking up @some_ivar compiles down to myObject['@some_ivar'] which should avoid any
// naming conflicts due to their irregularity for a javascript system
//
var boot_base_class = function() {
  //this.id = yield_hash();
};

// return the hash for the receiver. By default this returns the .$id property. Overriden
// by some natives.
boot_base_class.prototype.$hash = function() {
  return this.$id;
};

// all objects are truthy unless specified otherwise
boot_base_class.prototype.$r = true;

// set constant
boot_base_class.prototype.$cs = function(id, val) {
  var base = this;

  if (base.$info & T_OBJECT) base = base.$isa;

  base.$constants[id] = val;
  return val;
};

// is constant defined - returns javascript native true/false
boot_base_class.prototype.$cd = function(id) {
  var base = this;

  if (base.$info & T_OBJECT) base = base.$isa;

  return base.$constants[id] ? true : false;
};

// get constant
boot_base_class.prototype.$cg = function(id) {
  var base = this;

  if (base.$info & T_OBJECT) base = base.$isa;

  if (base.$constants[id]) return base.$constants[id];

  //error .. need to search
  throw new Error("NameError: uninitialized constant: " + id);
};

// define method
boot_base_class.prototype.$dm = function(method_id, body, singleton) {
  // js id is just 'm$' prepended to method_id
  var js_id = 'm$' + method_id;

  body.method_id = method_id;
  body.js_id = js_id;
  body.displayName = method_id;
  // for super calls... depreceate?
  body.opal_class = this;

  if (singleton) {
    if ((this.$info & T_CLASS) || (this.$info & T_MODULE)) {
      this.constructor.prototype[js_id] = body;
      this.constructor.prototype.method_table[js_id] = body;
    } else {
      // add method to singleton object. we should really create a singleton class to match as well
      this[js_id] = body;
    }
  } else {
    if ((this.$info & T_CLASS) || (this.$info & T_MODULE)) {
      if (this.$info & FL_SINGLETON) {
      } else {
        this.allocator.prototype[js_id] = body;
        this.allocator.prototype.method_table[js_id] = body;
      }
    }
  }
};

// define class
boot_base_class.prototype.$dc = function(super_klass, id, body, flag) {
  var klass, base = this;

  switch (flag) {
    // normal class
    case 0:
      // if dealing with an object, lets use its class instead
      if (base.$info & T_OBJECT) base = rb_class_real(base.$isa);
      // if no specified superclass, use Object
      if (super_klass == Qnil) super_klass = rb_cObject;

      klass = rb_define_class_under(base, id, super_klass);
      break;

    // class shift
    case 1:
      klass = rb_singleton_class(base);
      break;

    // module
    case 2:
      if (base.$info & T_OBJECT) base = rb_class_real(base.$isa);
      klass = rb_define_module_under(base, id);
      break;

    // something went wrong
    default:
      rb_raise(rb_eException, "define_class got a unknown flag: " + flag);
  }

  return body.call(klass);
};

// include module
boot_base_class.prototype.$include = function(module) {
  
  this.$included_modules || (this.$included_modules = []);

  if (this.$included_modules.indexOf(module) != -1)
    return; // already included

  this.$included_modules.push(module);
  module.$included_in.push(this);

  for (var method in module.allocator.prototype.method_table) {
    this.allocator.prototype.method_table[method] = module.allocator.prototype.method_table[method];
    this.allocator.prototype[method] = module.allocator.prototype.method_table[method];
  }

  // constants..
};

// symbol
boot_base_class.prototype.$Y = function(name) {
  return opalsym(name);
};

// hash
boot_base_class.prototype.$H = function() {
  return Qnil;
};

// block call with this as the receiver.
boot_base_class.prototype.$B = function(method_id, proc) {
  var args = [].slice.call(arguments, 2);
  var js_id = 'm$' + method_id;
  rb_block_proc = proc;

  if (this[js_id]) {
    rb_block_func = this[js_id];
    return this[js_id].apply(this, args);
  }

  throw new Error('method missing......' + method_id);
};


// Boot a base class (only use for very core object classes)
var boot_defclass = function(id, super_klass) {
  
  var cls = function() {
    //this.id = yield_hash();
  };

  if (super_klass)
    cls.prototype = new super_klass();
  else
    cls.prototype = new boot_base_class();

  cls.prototype.method_table = {};
  cls.prototype.constructor = cls;
  cls.prototype.__classid__ = id;
  cls.prototype.$super = super_klass;
  cls.prototype.$info = T_OBJECT;
  return cls;

  //var result = rb_class_boot(super_klass);
  //rb_name_class(result, id);
  //rb_const_set((rb_cObject || result), id, result);
  //return result;
};

var boot_makemeta = function(klass, super_klass) {
  if (!super_klass) super_klass = boot_cClass.prototype;
  //console.log("making meta for :" + klass.prototype.class_name);
  //console.log(super_klass);
  var meta = function() {
    //this.id = yield_hash();
  };

  meta.prototype = new super_klass.constructor();

  meta.prototype.included_in = [];
  meta.prototype.method_table = {};
  meta.prototype.allocator = klass;
  meta.prototype.constructor = meta;
  meta.prototype.__classid__ = klass.prototype.__classid__;
  meta.prototype.$super = super_klass;
  meta.prototype.$info = T_CLASS;

  // constants etc
  if (klass == boot_cBasicObject) {
    meta.prototype.$constants_alloc = function() {};
    meta.prototype.$constants = meta.prototype.$constants_alloc.prototype;
  } else {
    meta.prototype.$constants = new super_klass.$constants_alloc();
    meta.prototype.$constants_alloc = function() {};
    meta.prototype.$constants_alloc.prototype = meta.prototype.$constants;
  }

  var res = new meta();
  klass.prototype.$isa = res;
  return res;
};

var boot_defmetameta = function(klass, meta) {
  klass.$isa = meta;
};

// Like boot_defclass, but for root object only (i.e. basicobject)
//var boot_defrootclass = function(id) {

  //var result = new RClass(null, null);
    // FIXME: set flags - do we need this. already done for us?
  //result.$flags = T_CLASS;
  //rb_name_class(result, id);
  //rb_const_set((rb_cObject || result), id, result);
  //return result;
//}

var define_bridged_class = function(id, native_class) {
  var res = rb_define_class_id(id, rb_cObject);
  var old = res.allocator.prototype;
  res.allocator = native_class;

  for (var prop in old) {
    native_class.prototype[prop] = old[prop];
  }

  rb_cObject.$cs(id, res);
  return res;
};

// Create a new subclass of the given superclass. We do not name it yet.
var rb_class_boot = function(super_class) {
  // print("rb_class_boot with: " + super_class);
  if (super_class) {
    var ctor = function() {};
    ctor.prototype = super_class.constructor.prototype;
    var result = function() {
       RClass.call(this, null, super_class); return this;
    };
    result.prototype = new ctor();
    var klass = new result();
    klass.$klass = rb_cClass;
    return klass;
  }
  else {
    var result = new RClass(null, null);
    return result;
  }
};

// @global
rb_class_real = function(klass) {
  while (klass.$flags & FL_SINGLETON) klass = klass.$super;
  return klass;
};

// Name the class with the given id.
var rb_name_class = function(klass, id) {
  //rb_ivar_set(klass, '__classid__', id);
  klass['__classid__'] = id;
};

// make metaclass for the given class
var rb_make_metaclass = function(klass, super_class) {
  // print("making metaclass for " + klass.__classid__);
  // if klass is a class, and it is a singleton..
  if ((klass.$flags & T_CLASS) && (klass.$flags & FL_SINGLETON)) {
    // console.log("ok");
    // throw "need to implement in rb_make_metaclass"
    return make_metametaclass(klass);
  }
  else {
    // our meta is a 'subclass' of the superclass
    var meta = rb_class_boot(super_class);
    // meta is now also a singleton (as well as class)
    meta.$flags |= FL_SINGLETON;
    // the class of a class is its meta
    klass.$klass = meta;
    // fix method table
    klass.$m = meta.$m_tbl;
    // fix const table
    meta.$c = klass.$c;
    // attach the meta to the klass (so we can refer to it later)
    rb_singleton_class_attached(meta, klass);
    
    return meta;
  }
};

var rb_singleton_class_attached = function(klass, obj) {
  // make sure klass is a singleton
  if (klass.$flags & FL_SINGLETON) {
    // console.log("setting attacjed..");
    //rb_ivar_set(klass, '__attached__', obj);
    klass['__attached__'] = obj;
  }
};

var make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;
  
  if (metaclass.$klass == metaclass) {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metametaclass;
  }
  else {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metaclass.$klass.$klass == metaclass.$klass ? 
				make_metametaclass(metaclass.$klass) : 
				metaclass.$klass.$klass;
  }
  
  metametaclass.$flags |= FL_SINGLETON;
  
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.$klass = metametaclass;
  metaclass.$m = metametaclass.$m_tbl;
  super_of_metaclass = metaclass.$super;
  
  // while (super_of_metaclass)
  
  metametaclass.$super = rb_ivar_get(super_of_metaclass.$klass, '__attached__') 
				== super_of_metaclass
				? super_of_metaclass.$klass
				: make_metametaclass(super_of_metaclass);
  
return metametaclass;
};

// 
var boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

// define toll free bridged class
// @local
var rb_define_toll_free_class = function(prototype, flags, id, super_klass) {
  var klass = rb_define_class(id, super_klass);
  
  prototype.$klass = klass;
  prototype.$m = klass.$m_tbl;
  prototype.$flags = flags;
  prototype.$r = true;
  
  // default hashing behaviour
  prototype.$hash = function() {
    // return '$$' + this + '$$';
		return flags + '_' + this;
  };
    
  return klass;
};

// define a new class (normal way), with the given id and superclass. Will be
// top level.
var rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_cObject, id, super_klass);
};

var rb_define_class_under = function(base, id, super_klass) {
  if (base.$cd(id))
    return base.$cg(id);

  super_klass || (super_klass = rb_cObject);

  var res = rb_define_class_id(id, super_klass);
  res.constructor.prototype.$parent = base;
  base.$cs(id, res);
  return res;
};
  //var klass;
  // if already defined, just ensure right type then return the existing class
 // if (rb_const_defined(base, id)) {
    // print("already defined..");
    // console.log(id + " alreayd defined");
    // check its a class?
//    return rb_const_get(base, id);
 // }
  
  // console.log(super_klass.constructor);
  //klass = rb_define_class_id(id, super_klass);
  
  //rb_name_class(klass, id);
 // rb_const_set(base, id, klass);
  // if (klass !== rb_object)
 // klass.$parent = base;
  // rb_class_inherited(super_klass, klass);
 // return klass;
//};

// Actually create class
var rb_define_class_id = function(id, super_klass) {
  var cls = function() {
    //this.$id = yield_hash();
  };

  cls.prototype = new super_klass.allocator();
  cls.prototype.$method_table = {};
  cls.prototype.constructor = cls;
  cls.prototype.__classid__ = id;
  cls.prototype.$super = super_klass;
  cls.prototype.$info = T_OBJECT;

  var meta = function() {
    //this.$id = yield_hash();
  };

  meta.prototype = new super_klass.constructor();
  meta.prototype.$method_table = {};
  meta.prototype.allocator = cls;
  meta.prototype.__classid__ = id;
  meta.prototype.$super = super_klass;
  meta.prototype.$info = T_CLASS;
  meta.prototype.constructor = meta;

  // constants
  meta.prototype.$constants = new super_klass.$constants_alloc();
  meta.prototype.$constants_alloc = function() {};
  meta.prototype.$constants_alloc.prototype = meta.prototype.$constants;

  var res = new meta();
  cls.prototype.$isa = res;
  return res;
}; 
 
 //  var klass;
  
//  if (!super_klass)
//    super_klass = rb_cObject;
    // console.log("A");
//  klass = rb_class_create(super_klass);
//  rb_name_class(klass, id);
  // console.log("B " + id);
//  rb_make_metaclass(klass, super_klass.$klass);
//  return klass;
//};

var rb_class_create = function(super_klass) {
  
  // check inheritable
  // check not rb_class .. error
  return rb_class_boot(super_klass);
};

// get singleton class of obj
var rb_singleton_class = function(obj) {
  var obj;
  // print('finding singleton class for ' + obj.__classid__);
  // console.log("checking for id: " + obj.$h);
  if (obj == rb_cObject) {
    // console.log("right. cchecking rb_cObject");
  }
  // check if number, string etc.. and throw error?
  if ((obj.$klass.$flags & FL_SINGLETON)&& rb_ivar_get(obj.$klass, '__attached__') == obj) {
    // console.log("returning on attacked");
    // print("returning on attached");
    // for (var prop in obj.$k) {print (prop); print(obj.$k[prop]);}
    klass = obj.$klass;
  }
  else {
    var class_id = rb_ivar_get(obj.$klass, '__classid__');
    klass = rb_make_metaclass(obj, obj.$klass);
    // obj
    // klass = obj.$k;
  }
  
  return klass;
};
