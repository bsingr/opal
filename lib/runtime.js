// Core classes
var rb_cBasicObject     = null,
    rb_cModule          = null,
    class_class         = null,
    rb_cObject          = null,
    module_kernel       = null,
    class_symbol        = null,
    class_true_class    = null,
    class_false_class   = null,
    class_nil_class     = null,
    class_proc          = null,
    class_string        = null,
    class_array         = null,
    class_hash          = null,
    class_number        = null,
    class_regexp        = null,
    class_range         = null,
    class_exception     = null;

// top self
exports.top_self        = null;

// Core object literals (in main window scope)
global.vnNil            = null;
global.vnTrue           = null;
global.vnFalse          = null;

// flags for object/class types
var T_CLASS             = 1,
    T_MODULE            = 2,  
    T_OBJECT            = 4,  
    T_BOOLEAN           = 8, 
    T_STRING            = 16,  
    T_ARRAY             = 32,  
    T_NUMBER            = 64, 
    T_PROC              = 128,  
    T_SYMBOL            = 256,  
    T_HASH              = 512,
    T_RANGE             = 1024, 
    T_ICLASS            = 2048,
    FL_SINGLETON        = 4096;

// our global $opal object for the runtime
$opal = {};

// hash from arguments vnH(key1, val1, key2, val2...)
global.vnH = function() {
  var k, v, res = new class_hash.allocator();
  res.$keys = [];
  res.$assocs = {};
  res.$default = vnNil;
  for (var i = 0; i < arguments.length; i++) {
    k = arguments[i], v = arguments[i+1];
    i++;
    res.$keys.push(k);
    res.$assocs[k.$hash()] = v;
  }
  return res;
};

var symbol_table = { };

$opal.Y = function(str) {
  if (symbol_table.hasOwnProperty(str)) {
    return symbol_table[str];
  }

  var res = new class_symbol.allocator();
  symbol_table[res.$ptr = str] = res;
  return res;
};

// For object_id's .. each object/class will get an object_id
var hash_yield = 0;

var yield_hash = function() {
  return hash_yield++;
};

// globals table
var globals_table = {};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
   for (var i = 0; i< this.length; i++) {
     if (this[i] == obj) return i;
   }
   return -1;
 };
};

// EntryPoint. Every time something causes ruby to be run, it must be done
// through this function. This includes events, timers firing and the initial
// main() code. This will capture possible errors and log them and their stack
// trace to the terminal.
// 
// @param [Function] func to run as main entry point
// @return [Object] returns the result of the function
// 
exports.entry_point = function(func) {
  return func();
};


// depreceate this, and use RClass and RObject. RClass will have .dm etc, robject
// wont. $opal.dm will the check the receivers flags and then use the object or its
// classes .dm to define the method. ka peash ka pow
// 
// Or... do we keep both as boot_base_class, and then just add methods onto the root
// meta? for basic object? makes more sense????
//
// OR: make RClass a "subclass" of RObject?!?!
var __boot_base_class = function() {
  this.$id = yield_hash();
};

__boot_base_class.prototype.$hash = function() {
  return this.$id;
};

// FIXME: This doesnt need to be on boot_base_class. Add to $opal global, so
// files use $class() to generate classes/modules
//__boot_base_class.prototype.define_class = function(sup, id, body, flag) {
//  
//  var klass, base = this;
//  
//  if (base.flags & T_OBJECT)
//    base = base.isa;
//  
//  switch (flag) {
//    // normal class
//    case 0:
//      if (sup === vnNil)
//        sup = class_object;
//      
//      klass = define_class_under(base, id, sup);
//      break;
//    case 1:
//      // throw "running class shift for " + id.class_name
//      klass = id.singleton_class();
//      // return;
//      break;
//    case 2:
//      klass = define_module_under(base, id);
//      break;
//    default:
//      throw "define_class: unknown flag: " + flag
//  }
//  
//  return body.apply(klass);
//  
//  // return klass;
//};

// FIXME: again, doesnt need to be on boot_base_class - get singleton class
//__boot_base_class.prototype.singleton_class = function() {
//  var klass;
//  
//  // if (this.info & )
//  
//  if (this.info & FL_SINGLETON) {
//    klass = this.isa;
//  }
//  else {
//    // if we a re a class or module..
//    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
//      // if we have an __attached__, use it
//      if (this.__attached__) {
//        return this.__attached__;
//      }
//      // otherwise, create it
//      else {
//        var meta = __subclass(this.class_name, this.isa);
//        meta.info = meta.info | FL_SINGLETON;
//        this.__attached__ = this.isa = meta;
//        meta.__attached__ = this;
//        return meta;
//      }
//    }
//    else {
//      // object
//      // console.log("need to make singleton class for: " + this.class_name);
//      
//      this.info = this.info | FL_SINGLETON;
//      var meta = __subclass(this.class_name, this.isa);
//      meta.info = meta.info | T_ICLASS;
//      var old_super = this.isa;
//      klass = this.isa = meta;
//      meta.__instance__ = this;
//      meta.constants = old_super.constants;
//      // klass = this.isa;
//      // var class_name = this.isa.class_name;
//      // klass = make_metaclass(this, this.isa);
//    }
//    
//  }
//  
//  return klass;
//};

// FIXME: this should be on $opal, to use like $def. Only classes need a dm method, so we dm on metas and classes,
// not instances
//__boot_base_class.prototype.dm = function(m_id, body, singleton) {
  // console.log(m_id + " for ");
//  // console.log(this.class_name);
//  
//  // hack for replacing mid_to_jsid
//  var js_id = '$' + m_id;
//  
//  body.method_id = m_id;
//  body.jsid = js_id;
//  body.displayName = m_id;
//  // register self as the current class for body (for super calls)
//  body.opal_class = this;
//  
//  if (singleton) {
//    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
//      this.constructor.prototype[js_id] = body;
//      this.constructor.prototype.method_table[js_id] = body;
//    }
//    else {
//      // add method to singleton_object
//      this[js_id] = body;
//      // throw "need to add_method to singleton object"
//    }
//  }
//  else {
//    if ((this.info & T_CLASS) || (this.info & T_MODULE)) {
//      if (this.info & FL_SINGLETON) {
//        // console.log("need to define method for singleton.. " + m_id);
//        this.__attached__.constructor.prototype[js_id] = body;
//        this.__attached__.constructor.prototype.method_table[js_id] = body;
//      }
//      else {
//        this.allocator.prototype[js_id] = body;
//       this.allocator.prototype.method_table[js_id] = body;
//     }
//      
//      if (this.info & T_ICLASS) {
//        this.__instance__[js_id] = body;
//        console.log("adding method " + m_id + " which is " + js_id);
//        // console.log(this.__instance__);
//      }
//    }
//    else {
//      // console.log("need to make into singleton object for: " + this.$inspect() + " with method " + m_id);
//     var cls = this.singleton_class();
//      cls.allocator.prototype[js_id] = body;
//      cls.allocator.prototype.method_table[js_id] = body;
//      // i_class singleton will only ever have one instance: this.
//      // cls.__instance__ = this;
//     body.opal_class = cls;
//     // cls.dm(m_id, body, singleton);
//     // add method to singleton object
//      this[js_id] = body;
//     // console.log(this);
//      // throw "need to add_method to  object " + m_id
//    }
//  }
//  return this.n;
//};

//__boot_base_class.prototype.const_set = function(id, val) {
 // 
//  var base = this;
//  
//  if (base.info & T_OBJECT)
//    base = base.isa;
//
//  base.constants[id] = val;
//  return val;
//};

//__boot_base_class.prototype.const_defined = function(id) {
//  var base = this;
//  
//  if (base.info & T_OBJECT)
//    base = base.isa;
//    
//  if (base.constants[id])
//    return true;
//    
//  return false;
//};

//__boot_base_class.prototype.const_get = function(id) {
//  
//  var base = this;
//  
// if (base.info & T_OBJECT)
//   base = base.isa;
//   
// if (base.constants[id])
//    return base.constants[id];
//    
//  // need to go up through hierarchy
//  var search = base.opal_parent, res;
//  while (search) {
//    res = search.const_get(id);
//    if (res) {
//      return res;
//    }
//    search = search.opal_parent;
//  }
//  // console.log("my parent is:");
//  // console.log(base.opal_parent);
//  // console.log(base.opal_parent.constants.Reporter);
//  
//  throw { toString: function() {
//    return "NameError: uninitialized constant: " + id;
//  }};
//};

// access to globals
//__boot_base_class.prototype.gg = function(id) {
//  if (globals_table.hasOwnProperty(id)) {
//    return globals_table[id];
//  }
//  return vnNil;
//};

//__boot_base_class.prototype.gs = function(id, val) {
//  return globals_table[id] = val;
//};

// ivar get
//__boot_base_class.prototype.ig = function(id) {
//  if (this.hasOwnProperty(id))
//    return this[id];
//  
//  return vnNil;
//};

// ivar set
//__boot_base_class.prototype.is = function(id, val) {
//  return this[id] = val;
//};

//__boot_base_class.prototype.include = function(module) {
//  
//  if (!this.included_modules)
//    this.included_modules = [];
//  
//  if (this.included_modules.indexOf(module) != -1)
//    return; // already included
//  
//  this.included_modules.push(module);
//  module.included_in.push(this);
//  
//  // add each method from module into class's prototype
//  for (method in module.allocator.prototype.method_table) {
//    // if (!this.allocator.prototype.method_table[method])
//    // if (!this.allocator.prototype.hasOwnProperty(method))
//    this.allocator.prototype.method_table[method] = module.allocator.prototype.method_table[method];
//    this.allocator.prototype[method] = module.allocator.prototype.method_table[method];
//  }
//  
//  // console.log("checking include constants from " + module.class_name + " into " + this.class_name);
//  for (var prop in module.constants) {
//    if (module.constants.hasOwnProperty(prop) && !this.constants[prop]) {
//      this.constants[prop] = module.constants[prop];
//    }
//  }
//};

//__boot_base_class.prototype.extend = function(module) {
//  // add each method from module into class's prototype
//  for (method in module.allocator.prototype.method_table) {
//    // console.log("adding " +method);
//    this.constructor.prototype.method_table[method] = module.allocator.prototype.method_table[method];
//    this.constructor.prototype[method] = module.allocator.prototype.method_table[method];
//  }
//};

// RTEST - true. false and nil override this
__boot_base_class.prototype.$r = true;


var define_class_under = function(base, id, super_class) {
  
  //console.log("looking for class id: " + id);
  //console.log(base);
  if (base.const_defined(id))
    return base.const_get(id);

  //console.log("made it down to here");
  
  if (!super_class)
    super_class = rb_cObject;
  
  var res = __subclass(id, super_class);
  // parent relationship
  res.constructor.prototype.$parent = base;
  base.const_set(id, res);
  return res;
};

// we keep track of all bridhed classes for when we need to add methods etc
var bridged_classes = [];


// Define a toll-free bridged ruby class. This is used for mixing native JS
// strings, arrays etc with ruby versions.
// 
// Usage
// =====
// 
//    class_string = define_bridged_class("String", String);
// 
// This uses the String constructor. For now, every toll free will inherit from
// object, and will be set as a constant in the Object:: namespace
// 
var define_bridged_class = function(id, native_class) {
  var res = __subclass(id, rb_cObject);
  
  var old_allocator = res.allocator.prototype;
  res.allocator = native_class.constructor;
  
  // FIXME: need a better way to add core methods... we could just manually add
  // the ones we need: .$hash, .$r, .$isa, .$info
  //for (var prop in old_allocator) {
  //  native_class[prop] = old_allocator[prop];
  //}
  native_class.$r = old_allocator.$r;
  native_class.$isa = old_allocator.$isa;
  native_class.$info = old_allocator.$info
  native_class.method_table = old_allocator.method_table;
 
 bridged_classes.push(res);

 rb_cObject.const_set(id, res);
  return res;
};

var __subclass = exports.__subclass = function(id, super_class) {
  var cls = function() {
    this.$id = yield_hash();
  };
  
  cls.prototype = new super_class.allocator();
  cls.prototype.method_table = {};
  cls.prototype.constructor = cls;
  cls.prototype.__classid__ = id;
  cls.prototype.$super = super_class;
  cls.prototype.$info = T_OBJECT;
  
  var meta = function() {
    this.$id = yield_hash();
  }
  
  meta.prototype = new super_class.constructor();
  meta.prototype.method_table = {};
  meta.prototype.allocator = cls;
  meta.prototype.__classid__ = id;
  meta.prototype.$super = super_class;
  meta.prototype.$info = T_CLASS;
  meta.prototype.constructor = meta;
  
  // constants
  meta.prototype.constants = new super_class.constants_alloc();
  meta.prototype.constants_alloc = function() {};
  meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  
  var res = new meta();
  cls.prototype.$isa = res;
  return res;
}

var define_module_under = function(base, id) {
  
  if (base.const_defined(id))
    return base.const_get(id);
    
  //var mod = __subclass(id, rb_cModule);
 // mod.constructor.prototype.$parent = base;
  ///base.const_set(id, mod);
 // mod.included_in = [];
 // mod.$info = T_MODULE;
 // mod.allocator.prototype.$info = T_MODULE;
  //return mod;

  var mod = define_class_under(base, id, rb_cModule);
  mod.included_in = [];
 mod.$info = T_MODULE;
 mod.allocator.prototype.$info = T_MODULE;
 return mod;
};

// makes the core instances objects - this will be basic_object, object etc instances.
var __boot_defclass = function(id, super_class) {
  
  var cls = function() {
    this.$id = yield_hash();
  };
  
  if (super_class)
    cls.prototype = new super_class();
  else
    cls.prototype = new __boot_base_class();
  
  cls.prototype.method_table = {};
  cls.prototype.constructor = cls;
  cls.prototype.__classid__ = id;
  cls.prototype.$super = super_class;
  cls.prototype.$info = T_OBJECT;
  return cls;
};

// makes the actual class object, BasicObject, Object etc .
var __boot_makemeta = function(klass, super_class) {
  
  var meta = function() {
    this.$id = yield_hash();
  };
  
  meta.prototype = new super_class();
  
  meta.prototype.included_in = [];
  meta.prototype.method_table = {};
  meta.prototype.allocator = klass;
  meta.prototype.constructor = meta;
  meta.prototype.__classid__ = klass.prototype.__classid__;
  meta.prototype.$super = super_class;
  meta.prototype.$info = T_CLASS;
  
  // constants etc
  if (klass === boot_basic_object) {
    meta.prototype.constants_alloc = function() {};
    meta.prototype.constants = meta.prototype.constants_alloc.prototype;
  } else {
    meta.prototype.constants = new super_class.prototype.constants_alloc();
    meta.prototype.constants_alloc = function() {};
    meta.prototype.constants_alloc.prototype = meta.prototype.constants;
  }
  
  var res = new meta();
  klass.prototype.$isa = res;
  return res;
};

var __boot_defmetameta = function(klass, meta) {
  klass.$isa = meta;
};

// ==============
// = Initialize =
// ==============

var metaclass;

var boot_basic_object = __boot_defclass("BasicObject", null);
var boot_object = __boot_defclass("Object", boot_basic_object);
var boot_module = __boot_defclass("Module", boot_object);
var boot_class = __boot_defclass("Class", boot_module);

$opal.BasicObject = rb_cBasicObject = __boot_makemeta(boot_basic_object, boot_class);
$opal.Object = rb_cObject = __boot_makemeta(boot_object, rb_cBasicObject.constructor);
$opal.Module = rb_cModule = __boot_makemeta(boot_module, rb_cObject.constructor);
$opal.Class = class_class = __boot_makemeta(boot_class, rb_cModule.constructor);

__boot_defmetameta(rb_cBasicObject, class_class);
__boot_defmetameta(rb_cObject, class_class);
__boot_defmetameta(rb_cModule, class_class);
__boot_defmetameta(class_class, class_class);

// finally ensure correct superclass trees
rb_cObject.$super = rb_cBasicObject;
rb_cBasicObject.$super = null;
class_class.$super = rb_cModule;
rb_cModule.$super = rb_cObject;

// Now need to add all class/module methods here..
rb_cBasicObject.constructor.prototype.define_method = function(method_id, method_body, singleton) {
  
  var js_id = 'm$' + method_id;

  if (singleton) {
    if ((this.$info & T_CLASS) || (this.$info & T_MODULE)) {
      this.constructor.prototype[js_id] = method_body;
      this.constructor.prototype.method_table[js_id] = method_body;
    } else {
      // add method to singleton object? hmm.. this wont/cant be here?
      this[js_id] = method_body;
    }
  } else {
    if ((this.$info & T_CLASS) || (this.$info & T_MODULE)) {
      if (this.$info & FL_SINGLETON) {
        this.__attached__.constructor.prototype[js_id] = method_body;
        this.__attached__.constructor.prototype.method_table[js_id] = method_body;
      } else {
        this.allocator.prototype[js_id] = method_body;
        this.allocator.prototype.method_table[js_id] = method_body;
      }

      if (this.$info & T_ICLASS) {
        this.__instance__[js_id] = method_body;
      }
    } else {
      this.$info = this.$info | FL_SINGLETON;
      this[js_id] = method_body;
    }
  }
};

rb_cBasicObject.allocator.prototype.define_method = rb_cBasicObject.constructor.prototype.define_method;

rb_cBasicObject.constructor.prototype.const_set = function(id, val) {
  var base = this;

  if (base.$info & T_OBJECT) base = base.$isa;

  base.constants[id] = val;
  return val;
};

rb_cBasicObject.constructor.prototype.const_defined = function(id, val) {
  var base = this;

  if (base.$info & T_OBJECT) base = base.$isa;

  if (base.constants[id])
    return true;
 
  return false;
};

rb_cBasicObject.constructor.prototype.const_get = function(id) {
  var base = this;

  if (base.$info & T_OBJECT) base = base.$isa;

  if (base.constants[id]) return base.constants[id];

  // need to go up through hierarchy
  var search = base.$parent, res;
  while (search) {
    res = search.const_get(id);
    if (res) return res;
    search = search.$parent;
  }

  //couldnt find it..
  return null;
};

//__boot_base_class.prototype.extend = function(module) {
//  // add each method from module into class's prototype
//  for (method in module.allocator.prototype.method_table) {
//    // console.log("adding " +method);
//    this.constructor.prototype.method_table[method] = module.allocator.prototype.method_table[method];
//    this.constructor.prototype[method] = module.allocator.prototype.method_table[method];
//  }
//};

rb_cBasicObject.constructor.prototype.extend = function(module) {
  for (var method in module.allocator.prototype.method_table) {
    this.constructor.prototype.method_table[method] = module.allocator.prototype.method_table[method];
    this.constructor.prototype[method] = module.allocator.prototype.method_table[method];
  }
};

rb_cBasicObject.constructor.prototype.include = function(module) {
  
  if (!this.included_modules)
    this.included_modules = [];
  
  if (this.included_modules.indexOf(module) != -1)
    return; // already included
  
  this.included_modules.push(module);
  module.included_in.push(this);

  
  // add each method from module into class's prototype
  for (method in module.allocator.prototype.method_table) {
    // if (!this.allocator.prototype.method_table[method])
    // if (!this.allocator.prototype.hasOwnProperty(method))
    this.allocator.prototype.method_table[method] = module.allocator.prototype.method_table[method];
    this.allocator.prototype[method] = module.allocator.prototype.method_table[method];
  }
  
  // console.log("checking include constants from " + module.class_name + " into " + this.class_name);
  for (var prop in module.constants) {
    if (module.constants.hasOwnProperty(prop) && !this.constants[prop]) {
      this.constants[prop] = module.constants[prop];
    }
  }
};

rb_cObject.const_set("BasicObject", rb_cBasicObject);
rb_cObject.const_set("Object", rb_cObject);
rb_cObject.const_set("Class", class_class);
rb_cObject.const_set("Module", rb_cModule);


// Custom methods for modules to handle includes properly
rb_cModule.constructor.prototype.define_method = function(m_id, body, sing){
    
  var js_id = 'm$' + m_id;  
  
  // super
  rb_cBasicObject.define_method.apply(this, arguments);
    
  // go through each class we are included in and add new method to that as well
  for (var i = 0; i < this.included_in.length; i++) {
    this.included_in[i].allocator.prototype[js_id] = body;
  }
};

// and then fix again for class
class_class.constructor.prototype.dm = rb_cObject.constructor.prototype.dm;


exports.Object = rb_cObject;
exports.top_self = new rb_cObject.allocator();

// Override Object.include so that we can also include each module into our
// Natives String, Array, Number etc.
rb_cObject.include = function(module) {
  // super
  var res = rb_cBasicObject.include.apply(rb_cObject, [module]);
    
  var natives = bridged_classes;

  // return res;
  for (var i = 0; i < natives.length; i++) {
    natives[i].include(module);
  }
  
  return res;
};

// When we define a method on object itself, we need to also set it on our 
// natives.
rb_cObject.define_method = function() {
  // super
  var res = rb_cBasicObject.define_method.apply(rb_cObject, arguments);
  var natives = bridged_classes; 
  // return res;
  for (var i = 0; i < natives.length; i++) {
    natives[i].define_method.apply(natives[i], arguments);
  }
  
  return res;
};

// Proc class
// class_proc = define_class_under(class_object, "Proc", class_object);
// class_proc.allocator.prototype.info = T_OBJECT | T_PROC;

class_proc = define_bridged_class("Proc", Function.prototype);
class_proc.allocator.prototype.$info = T_OBJECT | T_PROC;
// Fix for Object's super_class being a proc and causing inifite recusrion in
// super class chain Object->Proc->Object...etc
//rb_cObject.allocator.prototype.$super = undefined;


// Range class
class_range = define_class_under(rb_cObject, "Range", rb_cObject);
class_range.allocator.prototype.info = T_OBJECT | T_RANGE;

// True class
class_true_class = define_class_under(rb_cObject, "TrueClass", rb_cObject);
$opal.Qtrue = Qtrue = new class_true_class.allocator();
Qtrue.info = Qtrue.info | FL_SINGLETON;

// False class
class_false_class = define_class_under(rb_cObject, "FalseClass",rb_cObject);
$opal.Qfalse = Qfalse = new class_false_class.allocator();
Qfalse.info = Qfalse.info | FL_SINGLETON;

Qfalse.$r = false;

// Nil class
class_nil_class = define_class_under(rb_cObject, "NilClass", rb_cObject);
$opal.Qnil = Qnil = new class_nil_class.allocator();
Qnil.info = Qnil.$info | FL_SINGLETON;

Qnil.$r = false;

// Hash
class_hash = define_class_under(rb_cObject, "Hash", rb_cObject);
class_hash.allocator.prototype.info = T_OBJECT | T_HASH;

class_hash.allocator.prototype.hash_store = function(key, value) {
  var hash = key.hash();
  // if we dont have the hashed key, add it
  if (!this.__assocs__.hasOwnProperty(hash)) {
    this.__keys__.push(key);
  }
  // then in both cases reset the assoc
  return this.__assocs__[hash] = value;
};

class_hash.allocator.prototype.hash_delete = function(key) {
  var hash = key.hash();
  
  if (this.__assocs__[hash]) {
    var ret = this.__assocs__[hash];
    delete this.__assocs__[hash];
    this.__keys__.splice(this.__keys__.indexOf(key), 1);
    return ret;
  }
  
  return this.__default__;
};

class_hash.allocator.prototype.hash_fetch = function(key) {
  var hash = key.hash();
  
  if (this.__assocs__.hasOwnProperty(hash))
    return this.__assocs__[hash];
  
  // default return nil (should be overrideable)
  return this.__default__;
};

// Symbol class
class_symbol = define_class_under(rb_cObject, "Symbol", rb_cObject);

class_symbol.allocator.prototype.toString = function() {
  return ":" + this.__ptr__;
};

// Regexp
class_regexp = define_class_under(rb_cObject, "Regexp", rb_cObject);


// Exceptions
class_exception = define_class_under(rb_cObject, "Exception", rb_cObject);

class_exception.allocator.prototype.toString = function() {
  var message = this.ig('@message');
  if (message && message.r)
    return this.__classid__ + ": " + this.ig('@message').toString();
  
  return this.__classid__;
};

class_exception.allocator.prototype.raise = function() {
  throw this;
};

// Special Classes: We do these three (Array, String, Number) last so that we
// have all our special runtime methods setup so we can add them to 
// Array.prototype, String.prototype and Number.prototype. Note: we could also
// do RegExp....?

// Number class
class_number = define_bridged_class("Numeric", Number.prototype);
class_number.allocator.prototype.$info = T_OBJECT | T_NUMBER;
 
class_number.allocator.prototype.$hash = function() {
  return '$$num$$' + this;
};


// String class
class_string = define_bridged_class("String", String.prototype);
class_string.allocator.prototype.$info = T_OBJECT | T_STRING;

class_string.allocator.prototype.$hash = function() {
  return this.toString();
};


// Array class
class_array = define_bridged_class("Array", Array.prototype);
class_array.allocator.prototype.info = T_OBJECT | T_ARRAY;

// Regexp class
class_regexp = define_bridged_class("Regexp", RegExp.prototype);
class_regexp.allocator.prototype.info = T_OBJECT;


// Kernel module
$opal.Kernel = module_kernel = define_module_under(rb_cObject, "Kernel");
rb_cObject.include(module_kernel);

// ####################################
// VM Methods
// ####################################

$opal.dm = function(base, method_id, method_body, singleton) {
  //console.log("defininf method: " + method_id);
  //if (base.$info & T_OBJECT)
  //console.log("base:");
  //console.log(base);

  // basically, if base doesnt have .define_method defined, then we cannot
  // define a method on that object; it may be a string for instance
  if (!base.define_method) {
    throw new Error("can't define singleton method `" + method_id + "` for " + base);
  }

  base.define_method(method_id, method_body, singleton);
};

$opal.dc = function(base, sup, id, body, flag) {
  var klass;

  if (base.$info & T_OBJECT) base = base.$isa;

  switch (flag) {
    // normal class declaration
    case 0:
      if (sup == Qnil) sup = rb_cObject;
      klass = define_class_under(base, id, sup);
      break;

    // class shift
    case 1:
      throw new Error("singleton class not yet implemented");

    // module
    case 2:
      klass = define_module_under(base, id);
      break;

    // something went wrong
    default:
      throw new Error("define class: unknown flag: " + flag);
  }

  return body.apply(klass);
};

// top self
$opal.top = exports.top_self;

// we no longer use method missing, so ignore for now
$opal.mm = function() {};

// run in ruby context
$opal.run = function(f) {
  return f();
};

// require
$opal.require = function(path) {
  require(path);
  return Qtrue;
};

$opal.P = {
  // function
  f: null,
  // block
  p: null,
  // yield error
  y: function() {
    throw new Error('LocalJumpError - $opal.P.y - no block given');
  }
};

$opal.cg = function(base, id) {
  if (base.$info & T_OBJECT) base = base.$isa;

  var res = rb_cBasicObject.constructor.prototype.const_get.call(base, id);

  if (res) return res;
  throw new Error("constget: cant find " + id);
};

$opal.am = function(self, new_name, old_name) {
  var old = self['m$' + old_name];

  if (old) {
    throw new Error("alias method: does not exist: " + old_name);
  }

  self.define_method(new_name, old, 0);

  return Qnil;
};

// do we still need this?
exports.init = function() {

};

// INIT - load all runtime files..
require('./basic_object');

require('./kernel');
require('./array');

require('./numeric');
require('./top_self');

require('./class');

require('./module');

require('./string');

require('./symbol')

require('./true_class');
require('./false_class');
require('./nil_class');

require('./error');
