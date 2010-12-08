

// Every object has a unique id. This count is used as the next id for the next
// created object. Therefore, first ruby object has id 0, next has 1 etc.
var opal_hash_yield = 0;

// Yield the next object id, updating the count, and returning it.
var opal_yield_hash = function() {
  return opal_hash_yield++;
};

// The root class. Every class in opal is an instance of RClass.
var RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$id = opal_yield_hash();
  // Ivars. All ivars etc stored in here - no longer?
  // this.$i = {};
  // Constants. All constants belonging to class stored here.
  // this.$c = {};
  // SuperClass.
  this.$super = super_klass;
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
RClass.prototype.$flags = T_CLASS;
// RTest/truthiness - every RClass instance is true.
RClass.prototype.$r = true;

// The root object. Every object in opal (apart from toll free bridged classes 
// like array, string etc) are an instance of RObject.
var RObject = function(klass) {
  // Hash. get out object_id
  this.$id = opal_yield_hash();
  // Ivars. no longer?
  // this.$i = {};
  // klass of the object becomes klass
  this.$klass = klass;
  // from the class, we set our local methods property (in sync with our class)
  this.$m = klass.$m_tbl;
  // return object.
  return this;
};

// Flags - every RObject instance is simply a T_OBJECT
RObject.prototype.$flags = T_OBJECT;
// RTest - every RObject instance is true.
RObject.prototype.$r = true;

RObject.prototype.$hash = RClass.prototype.$hash = function() {
  return this.$id;
};

// define method
var rb_define_method = function(klass, name, body, file_name, line_number) {
  
  rb_define_method_raw(klass, name, body);
  
  return Qnil;
  
  // // console.log("defininf " + name + " on:");
  //   // console.log(klass);
  //   klass.$m_prototype_tbl['$' + name] = body;
  //   klass.$method_table['$' + name] = body;
  //  // only define method name if not already set (alias, include etc)
  //  if (!body.displayName) {
  //    body.displayName = klass.__classid__ + "#" + name;
  //    // if we have a filename:
  //    if (file_name) {
  //      body.displayName += " at " + file_name;
  //    }
  //    
  //  }
  //  
  //   // if we are adding to a module, then check to see if mdethod needs to be
  //   // included into "included_in" classes
  //   if (klass.$flags & T_MODULE) {
  //     // print("in module for: " + name);
  //     // print(klass.$h);
  //     // for (var prop in klass) print(prop);
  //     if (klass.$included_in) {
  //       for (var i = 0; i < klass.$included_in.length; i++) {
  //         // deleted this..
  //        // rb_define_method(klass.$included_in[i], name, body);
  //        // replaced with this..
  //        klass.$included_in[i].$m_prototype_tbl['$' + name] = body;
  //        klass.$included_in[i].$method_table['$' + name] = body;
  //       }
  //       // for (var recv_klass in klass.$included_i)
  //       // print("need to include in: " + klass.$i.__classid__);
  //       // klass.$m_prototype_tbl['$' + name] = body;
  //     }
  //   }
};

/**
  The raw functionality of rb_define_method. Seeing as rb_define_method can be
  overriden in debug mode, this is the raw functionlaity used to actually define
  a method. Any wrapper functions are assumed to have been already applied, so
  calling this will apply the method to the receiver directly.
*/
function rb_define_method_raw(klass, name, body) {
  // insert raw method into prototype chain
  klass.$m_prototype_tbl['$' + name] = body;
  // insert method into singular method table (methods defined ON this class)
  klass.$method_table['$' + name] = body;
  // if in module, apply method to all classes we are included in
  if (klass.$included_in) {
    for (var i = 0; i < klass.$included_in.length; i++) {
      // insert method into both prototype and singular chain.
      klass.$included_in[i].$m_prototype_tbl['$' + name] = body;
			klass.$included_in[i].$method_table['$' + name] = body;
    }
  }
}

function rb_define_global_function(name, body) {
	rb_define_method(rb_mKernel, name, body);
	rb_define_singleton_method(rb_mKernel, name, body);
};

// singleton method
var rb_define_singleton_method = function(klass, name, body) {
  rb_define_method(rb_singleton_class(klass), name, body);
};

var rb_define_alias = function(base, new_name, old_name) {
  rb_define_method(base, new_name, base.$m_tbl['$' + old_name]);
  return Qnil;
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

// call from js
function rb_call(recv, mid) {
	// all args are just from our arguments
	var args = Array.prototype.slice.call(arguments, 0);
	// recv
  // args.unshift(recv);
	// simply replace mid with our block (nil)
	// args[1] = Qnil;
	// check method exists
	return (recv.$m['$' + mid] || rb_vm_meth_m).apply(null, args);
}



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
  rb_ivar_set(rb_vm_break_instance, "@exit_value", value);
  throw rb_vm_break_instance;
};

// raise exception class with our given string
// @global
rb_raise = function(exc, str) {
  if (str == undefined) {
    str = exc;
    exc = rb_eException;
  }
  var exception = new RObject(exc, T_OBJECT);
	// var exception = exc_new_instance(exc);
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
  // backtrace
  rb_ivar_set(exc, '@backtrace', debug_stack.slice(0, debug_stack.length));
  throw exc;
};

/**
	Throw an argument error when the wrong number of arguments were given to a 
	method
	
	@param [Number] given the number of arguments actually given
	@param [Number] expected the number of arguments we expected to have
*/
function rb_arg_error(given, expected) {
	rb_raise(rb_eArgError,
		"wrong number of arguments(" + given + " for " + expected + ")");
}


/**
	Convert the given object into a number using #to_int. DO NOT check whether it
	is already a number (it has already been checked).
	
	This may raise a TypeError if number cannot be converted
*/
function to_num(obj) {
	if (obj.$m.$to_int) {
		var result = obj.$m.$to_int(obj, Qnil);
		// make sure result is actually a number..
		if (IS_NUMBER(result)) return result;
		
		rb_raise(rb_eTypeError, 
			"can't convert Object to Integer (Object#to_int gives String)");
	}
	rb_raise(rb_eTypeError, "can't convert Object into Integer");
}

/**
	Convert the given object to an array using #to_ary.
*/
function to_ary(obj) {
	rb_raise(rb_eTypeError, "can't convert Object into Array");
}

/**
  Convert the given object into a string
*/
function to_str(obj) {
  return obj.$m.$to_s(obj);
}

// Run a function - this should be used as an entry point for anything that 
// calls ruby code or may throw an error.
// 
// This is only an entry point, so system events, ruby_init() etc should use
// this. Browser wraps every DOM event in this, for instance.
// 
// @global
rb_run = function(func) {
  // always clear backtrace
  debug_stack.length = 0;
  try {
    debug_stack_push([rb_run], [rb_top_self]);
    return func();
  }
  catch(err) {
    // should check if err is native or ruby error (.$k) also check not string
    if (err.$klass && typeof err != "string") {
      // print('caught error: ' + err.__classid__);
			
      print(err.$klass.__classid__ + ': ' + err['@message']);
			if (err['@backtrace']) {
			  debug_print_backtrace(err['@backtrace']);
			}
    }
    else {
      print('NativeError: ' + err);
			debug_print_backtrace(debug_stack);
    }
  }
};

// Stack trace support
rb_run.displayName = "main";
rb_run.displayFileName = "(main)";

