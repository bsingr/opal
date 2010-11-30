

// Every object has a unique id. This count is used as the next id for the next
// created object. Therefore, first ruby object has id 0, next has 1 etc.
var opal_hash_yield = 0;

// Yield the next object id, updating the count, and returning it.
var opal_yield_hash = function() {
  return opal_hash_yield++;
};

// VM Methods. These need to be added to all objects/classes


exports.log = function(str) {
  // print("need to print string:");
  
  print(str);
};

// The root class. Every class in opal is an instance of RClass.
var RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$h = opal_yield_hash();
  // Ivars. All ivars etc stored in here - no longer?
  // this.$i = {};
  // Constants. All constants belonging to class stored here.
  // this.$c = {};
  // SuperClass.
  this.$s = super_klass;
  // Method_table - all methods are stored here. This is prototype based so that
  // methods are inherited between subclasses etc.
  // 
  // m_tbl is the actual instance
  // m_prototype_tbl is the prototype, so add methods to that so that they get 
  // inherited
  if (super_klass) {
    // console.log("inheriting");
    var ctor = function() {};
    ctor.prototype = super_klass.$m_prototype_tbl;
    var m_ctor = function() {};
    m_ctor.prototype = new ctor();
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    
    // constants..
    var cctor = function() {};
    cctor.prototype = super_klass.$c_prototype;
    var c_ctor = function() {};
    c_ctor.prototype = new cctor();
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  else {
    // console.log("making fresh");
    // root object behaviour..
    var m_ctor = function() {};
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    // constants..
    var c_ctor = function() {};
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  // methods added to this actual class instance
  this.$method_table = {};
  return this;
};

// Flags. Every RClass instance is simply a T_CLASS, so mark as so.
RClass.prototype.$f = T_CLASS;
// RTest/truthiness - every RClass instance is true.
RClass.prototype.$r = true;

// The root object. Every object in opal (apart from toll free bridged classes 
// like array, string etc) are an instance of RObject.
var RObject = function(klass) {
  // Hash. get out object_id
  this.$h = opal_yield_hash();
  // Ivars. no longer?
  // this.$i = {};
  // klass of the object becomes klass
  this.$k = klass;
  // from the class, we set our local methods property (in sync with our class)
  this.$m = klass.$m_tbl;
  // return object.
  return this;
};

// Flags - every RObject instance is simply a T_OBJECT
RObject.prototype.$f = T_OBJECT;
// RTest - every RObject instance is true.
RObject.prototype.$r = true;




var RHash = function(args) {
  var k, v;
  this.$h = opal_yield_hash();
  this['@keys'] = [];
  this['@assocs'] = {};
  this['@default'] = rb_nil;
  for (var i = 0; i < args.length; i++) {
    k = args[i], v = args[i+1];
    i++;
    this['@keys'].push(k);
    this['@assocs'][k.$hash()] = v;
  }
  return this;
};

// hash
// @global
opalhash = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};



RObject.prototype.$hash = RClass.prototype.$hash = function() {
  return this.$h;
};




// rb_vm_methods







// set the constant on the given class
var rb_const_set = function(klass, id, val) {
  // klass.$i[id] = val;
  klass.$c_prototype[id] = val;
  return val;
};

var rb_const_get = function(klass, id) {
  // print("finding id: " + id);
  // io_puts('finding id ' + id);
  // io_puts(klass.__classid__);
  // io_puts(klass.$f);
  if (klass.$c[id])
    return (klass.$c[id]);
  
  var parent = klass.$parent;
  // io_puts(parent.__classid__);
  // stop infinite loop (objects object is object??)
  while (parent && parent != rb_cObject) {
    // io_puts(parent.__classid__);
    // print(parent == rb_cObject);
    if (parent.$c[id])
      return parent.$c[id];
    
    parent = parent.$parent;
  }
  // print("trying from " + klass.__classid__);
  // for (var prop in klass.$c) print(prop);
  io_puts("Cannot find constant: " + id);
  rb_raise(rb_eNameError, 'uninitialized constant ' + id);
};

// is const defined
var rb_const_defined = function(klass, id) {
  if (klass.$c[id])
    return true;
  
  return false;
};

// set ivar
// @global
rb_ivar_set = function(obj, id, val) {
  obj[id] = val;
  return val;
};

// @global
rb_ivar_get = function(obj, id) {
  return obj.hasOwnProperty(id) ? obj[id] : rb_nil;
};

// @global
rb_ivar_defined = function(obj, id) {
  return obj.hasOwnProperty(id) ? true : false;
};

// define method
var rb_define_method = function(klass, name, body) {
  // console.log("defininf " + name + " on:");
  // console.log(klass);
  klass.$m_prototype_tbl['$' + name] = body;
  klass.$method_table['$' + name] = body;
  
  // if we are adding to a module, then check to see if mdethod needs to be
  // included into "included_in" classes
  if (klass.$f & T_MODULE) {
    // print("in module for: " + name);
    // print(klass.$h);
    // for (var prop in klass) print(prop);
    if (klass.$included_in) {
      for (var i = 0; i < klass.$included_in.length; i++) {
        // klass.$included_in[i].$m_prototype_tbl['$' + name] = body;
        rb_define_method(klass.$included_in[i], name, body);
      }
      // for (var recv_klass in klass.$included_i)
      // print("need to include in: " + klass.$i.__classid__);
      // klass.$m_prototype_tbl['$' + name] = body;
    }
  }
};

// singleton method
var rb_define_singleton_method = function(klass, name, body) {
  rb_define_method(rb_singleton_class(klass), name, body);
};


// Class#new
var rb_class_new_instance = function(klass) {
  var result = rb_obj_alloc(klass);
  // call initialize
  return result;
};

// Class#allocate
// @global
rb_obj_alloc = function(klass) {
  var result = new RObject(klass, T_OBJECT);
  return result;
};



// normal return called in normal context? (should just be the same as block???)
// @global
rb_vm_return = function(value) {
  console.log("throwing rb_vm_return");
  rb_ivar_set(rb_vm_return_instance, '@exit_value', value);
  throw rb_vm_return_instance;
};

// called (thrown) when returning inside a while loop
// @global
rb_vm_loop_return = function(value) {
  console.log("throwing rb_vm_loop_return");
  rb_ivar_set(rb_vm_loop_return_instance, '@exit_value', value);
  throw rb_vm_loop_return_instance;
};

// called (thrown) when returning inside a block (that might be called by a 
// while loop
// @global
rb_vm_block_return = function(value, jump_function) {
  // console.log("throwing rb_vm_block_return");
  rb_ivar_set(rb_vm_block_return_instance, '@exit_value', value);
  rb_ivar_set(rb_vm_block_return_instance, '@jump_function', jump_function);
  throw rb_vm_block_return_instance;
};

// called for next keyword
rb_vm_next = function(value) {
  rb_ivar_set(rb_vm_next_instance, '@exit_value', value);
  throw rb_vm_next_instance;
};



// need fixing:

// global
rb_break = function(value) {
  throw {
    toString: function() {
      return "uncaught break";
    },
    __keyword__: 'break',
    opal_value: value == undefined ? rb_nil : value
  };
};

// raise exception class with our given string
// @global
rb_raise = function(exc, str) {
  if (str == undefined) {
    str = exc;
    exc = rb_eException;
  }
  var exception = new RObject(exc, T_OBJECT);
  rb_ivar_set(exception, '@message', str);
  rb_vm_raise(exception);
};
// convert natiuve error into proper error
rb_vm_make_exception = function(native_error) {
  var exc = new RObject(rb_eException, T_OBJECT);
  rb_ivar_set(exc, '@message', new String(native_error));
  return exc;
};

// raise an exception instance (DO NOT pass strings to this)
rb_vm_raise = function(exc) {
  throw exc;
};

// Run a function - this should be used as an entry point for anything that 
// calls ruby code or may throw an error.
// 
// This is only an entry point, so system events, ruby_init() etc should use
// this. Browser wraps every DOM event in this, for instance.
// 
// @global
rb_run = function(func) {
  try {
    return func();
  }
  catch(err) {
    // should check if err is native or ruby error (.$k)
    if (err.$k) {
      print('caught error: ');
      print(err.$k.__classid__ + ': ' + err['@message'])
    }
    else {
      print('NativeError: ' + err);
    }
  }
};
