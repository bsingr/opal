// Boot a base class (only use for very core object classes)
var boot_defclass = function(id, super_klass) {
  var result = rb_class_boot(super_klass);
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
};

// Like boot_defclass, but for root object only (i.e. basicobject)
var boot_defrootclass = function(id) {
  var result = new RClass(null, null);
  // FIXME: set flags - do we need this. already done for us?
  result.$flags = T_CLASS;
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
}


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
  klass['__classid__'] = id;
  //rb_ivar_set(klass, '__classid__', id);
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
    rb_ivar_set(klass, '__attached__', obj);
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
  prototype.$M = RClass.prototype.$M;
  prototype.$B = RClass.prototype.$B;
  prototype.$Y = opalsym;

  // default hashing behaviour
  prototype.$hash = function() {
    // return '$$' + this + '$$';
		return flags + '_' + this;
  };
    
  return klass;
};

// define a new class (normal way), with the given id and superclass. Will be
// top level.
rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_cObject, id, super_klass);
};

var rb_define_class_under = function(base, id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return the existing class
  if (rb_const_defined(base, id)) {
    // print("already defined..");
    // console.log(id + " alreayd defined");
    // check its a class?
    return rb_const_get(base, id);
  }
  
  // console.log(super_klass.constructor);
  klass = rb_define_class_id(id, super_klass);
  
  rb_name_class(klass, id);
  rb_const_set(base, id, klass);
  // if (klass !== rb_object)
  klass.$parent = base;
  // rb_class_inherited(super_klass, klass);
  return klass;
};

// Actually create class
var rb_define_class_id = function(id, super_klass) {
  var klass;
  
  if (!super_klass)
    super_klass = rb_cObject;
    // console.log("A");
  klass = rb_class_create(super_klass);
  rb_name_class(klass, id);
  // console.log("B " + id);
  rb_make_metaclass(klass, super_klass.$klass);
  return klass;
};

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

