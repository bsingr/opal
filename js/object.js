// Root Types/Flags
    
// Core boot classes
rb_cBasicObject = null,
rb_cObject = null,
rb_cModule = null,
rb_cClass = null,
rb_mKernel = null;

boot_cBasicObject = null;
boot_cObject = null;
boot_cModule = null;
boot_cClass = null;


// Other core classes/modules
var rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
		rb_cFile;

// @global Top self context within ruby 
rb_top_self = null;

// some top level objects
Qnil = null;
Qfalse = null;
Qtrue = null;

var mod_name = function() {
  return this['__classid__'];
};

var mod_eqq = function(obj) {
  return obj_is_kind_of.call(obj, this);
};

var mod_define_method = function(method_id) {
  USES_BLOCK

  if (!BLOCK_GIVEN)
    rb_raise(rb_eLocalJumpError, "no block given");

  rb_define_method(this, rb_call(method_id, 'to_s'), __block__);
  return Qnil;
};

var mod_attr_accessor = function() {
  mod_attr_reader.apply(this, arguments);
  mod_attr_writer.apply(this, arguments);
  return Qnil;
};

var mod_attr_reader = function() {
  var attribute = null, attributes = [].slice.call(arguments, 0);

  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i],
        method_id = CALL(attribute, 'to_s');

    // FIXME: this needs to check if ivar is undefined - if so, set it to nil
    rb_define_method(this, method_id,
        new Function('return this["@' + method_id + '"];'));
  }

  return Qnil;
};

var mod_attr_writer = function() {
  var attribute = null, attributes = [].slice.call(arguments, 0);

  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i],
        method_id = CALL(attribute, 'to_s');

    rb_define_method(this, method_id + '=', 
        new Function('val', 'return this["@' + method_id + '"] = val;'));
  }

  return Qnil;
};

var mod_alias_method = function(new_name, old_name) {
  new_name = rb_call(new_name, 'to_s');
  old_name = rb_call(old_name, 'to_s');
  // FIXME: avoid wrapped method? access method table directly?
  return this;
};

var mod_to_s = function() {
  return this['__classid__'];
};

var mod_const_set = function(id, value) {
  return rb_vm_cs(this, rb_call(id, 'to_s'), value);
};

var mod_class_eval = function(string, filename, lineno) {
  USES_BLOCK

  if (!BLOCK_GIVEN) {
    var code = exports.compile(string);
    var func = new Function('__FILE__', code);
    return func(rb_expand_path(filename));
  } else {
    return YIELD_USING(mod);
  };
};

var mod_private = function() {
  return this;
};

var mod_public = function() {
  return this;
};

var mod_protected = function() {
  return this;
};

var mod_include = function(mod) {
	rb_include_module(this, mod);
  return Qnil;
};

var mod_extend = function(mod) {
	rb_extend_module(this, mod);
	return Qnil;
};

function cls_s_new(clas, mid, sup) {
	var klass = rb_define_class_id("AnonClass", sup || rb_cObject);
	return klass;
};

function obj_alloc() {
  return new this.allocator();
};

function cls_new_instance() {
  var obj = this.m$allocate();
  return obj;

	//var obj = cla.$m.$allocate(cla, Qnil);
	//var args = Array.prototype.slice.call(arguments);
	//args[0] = obj;
	
	// if given a block, we need to reroute it to initialize
  //if (rb_block_func == arguments.callee) {
  //  rb_block_call.apply(null, [rb_block_proc, obj, "initialize"].concat(
  //    Array.prototype.slice.call(arguments, 2)));
  //} else {
  //  obj.$m.$initialize.apply(null, args);
  //}
  //return obj;
};

function class_initialize(cla, mid, sup) {
	// print("in Class.new initialize");
	var klass = rb_define_class_id('', sup || rb_cObject);
	return klass;
}

var cls_superclass = function() {
	var sup = this.$super;
	
	if (!sup) {
		if (this == rb_cBasicObject) return Qnil;
    console.log("about to raise 'uninitialized class'");
		rb_raise(rb_eRuntimeError, "uninitialized class");
	}
	
	return sup;
}

function false_to_s() {
	return "false";
}

function false_and(self, mid, other) {
	return Qfalse;
}

function false_or(self, mid, other) {
	return other.$r ? Qtrue : Qfalse;
}

function false_xor(self, mid, other) {
	return other.$r ? Qtrue : Qfalse;
}

var true_to_s = function() {
	return "true";
};

var true_and = function(other) {
  return other.$r ? Qtrue : Qfalse;
};

var true_or = function() {
	return Qtrue;
};

var true_xor = function(other) {
	return other.$r ? Qfalse : Qtrue;
};

var rb_true = function() {
	return Qtrue;
};

var rb_false = function() {
	return Qfalse;
};

var nil_to_i = function() {
	return 0;
};

var nil_to_f = function() {
	return 0.0;
};

var nil_to_s = function() {
	return "";
};

var nil_to_a = function() {
	return [];
};

var nil_inspect = function() {
	return "nil";
};

/**
	Repeatedly executes the block.

	@note Method does not return an enumerator if no block given(yet).

	@example
	  loop do
	    puts "this will infinetly print"
	  end

	@param [Proc] block
	@return [Object] returns the receiver
*/
function obj_loop(obj, mid, block) {
	ARG_COUNT(0);
	
	if (!BLOCK_GIVEN(block))
		rb_raise(rb_eLocalJumpError, "no block given");
	
	while (true) {
		PRE_LOOP
		BLOCK_CALL(block);
		POST_LOOP
	}
	
	return obj;
}

/**
	Simple equivalent to `Proc.new`. Returns a {Proc} instance.

	@example
	  proc { puts "a" }
	  # => #<Proc 0x2828283>

	@param [Proc] block
	@return [Proc]
*/
function obj_proc(obj, mid, block) {
	
	ARG_COUNT(0)
	USES_BLOCK
	
	if (!BLOCK_GIVEN)
		rb_raise(rb_eArgError, "block required");
	
	return __block__;
}

/**
	Prints each argument in turn to the browser console. Currently there is no
	use of `$stdout`, so it is hardcoded into this method to write to the 
	console directly.

	@param [Object] args objects to print using `inspect`
	@return [nil]
*/
var obj_puts = function() {
	//var args = [].slice.call(arguments, 0);
	
	for (var i = 0; i < arguments.length; i++) {
    //console.log("args is:");
    //console.log(args[i]);
    //console.log(CALL(args[i], 'to_s'))
    //io_puts(CALL(args[i], 'to_s'));
    //console.log(CALL(arguments[i], 'to_s'));
    console.log(arguments[i].m$to_s().toString());
	}

	
	return Qnil
}

/**
  Try to load the library or file named `require_path`. Causes an error to be
  thrown if required path cannot be found.

  For in browser async loading, only use string paths. String paths must use 
  their base package name as well (e.g. 'cherry_kit/views/view'). Non string
  names will and cannot be async loaded. (for example, File.join... etc will
  not be async loaded

  @param [String] require_path
  @return [Boolean] success
*/
var obj_require = function(path) {
  
  return rb_require(path);
};


/**
	Raises an exception. If given a {String} argument, this method will raise a
	{RuntimeError} with the given `string` as a message. Otherwise, if the first
	parameter is a subclass of {Exception}, then the method will raise a new 
	instance of the given `exception` class with the `string` as a method, if it
	exists, or a default message otherwise`

	@example String message
	  raise "some error"
	  # => RuntimeError: some error

	@example Exception subclass
	  raise StandardError, "something went wrong"
	  # => StandardError: something went wrong

	@param [Exception, String] exception exception class or string to throw
	@param [String] string to pass as message for exception
	@return [nil]
*/
function obj_raise(obj, mid, exception, string) {
	ARG_MIN(1)
	
	var msg = Qnil, exc;
	
	if (IS_STRING(exception)) {
		msg = exception;
		exc = rb_call(rb_eRuntimeError, "new", msg);
	} else if (obj_is_kind_of(exception, "kind_of?", rb_eException)) {
		exc = exception;
	} else {
		if (string != undefined)
			msg = string;
		
		exc = rb_call(exception, "new", msg);
	}
	
	rb_vm_raise(exc);
}

function obj_instance_variable_defined_p(obj, mid, name) {
	ARG_COUNT(1)
	TO_STRING(name)
	return rb_ivar_defined(obj, name) ? Qtrue : Qfalse;
}

function obj_instance_variable_get(obj, mid, name) {
	ARG_COUNT(1)
	TO_STRING(name)
	return rb_ivar_get(obj, name);
}

function obj_instance_variable_set(obj, mid, name, value) {
	ARG_COUNT(2)
	TO_STRING(name)
	return rb_ivar_set(obj, name, value);
}

/**
	Returns `true` if `yield` would execute a block in the current context, 
	`false` otherwise. 

	@note In Opal this is kind of a fake method. The compiler treats 
	`block_given?` as a keyword to make its use easier to deal with in 
	javascript (keep things nice and efficient). Its use is the same to the end
	programmer, apart from it should not be overriden - it is never actually
	called.

	@return [Boolean] was a block given
*/
function obj_block_given_p() {
	return Qfalse;
}

function obj_method_missing(obj, mid, sym) {
	ARG_MIN(1)
	TO_STRING(sym)
	
	var str = "undefined method `" + sym + "` for " + rb_call(obj, "inspect");
	
	rb_raise(rb_eNoMethodError, str);
}

function obj_to_a(obj, mid) {
	ARG_COUNT(0)
	return [obj];
}

function obj_tap(obj, mid, block) {
	ARG_COUNT(0)
	if (!BLOCK_GIVEN(block))
		rb_raise(rb_eLocalJumpError, "no block given");
	
	BLOCK_CALL(block, obj);
	
	return obj;
}

function obj_is_kind_of(obj, mid, klass) {
	ARG_COUNT(1)
	
	var search = obj.$klass;
	
	while (search) {
		if (search == klass)
			return Qtrue;
		
		search = search.$super;
	}
	
	return Qfalse;
}

function obj_nil_p(obj) {
	ARG_COUNT(0)
	
	return Qfalse;
}

function obj_respond_to_p(obj, mid, method) {
	ARG_COUNT(1)
	
	TO_STRING(method)
	
	if (obj.$m['$' + method])
		return Qtrue;
	
	return Qfalse;
}

function obj_eqq(obj, mid, other) {
	ARG_COUNT(1)
	
	return rb_call(obj, "==", other);
}

function obj_send(obj, mid, method) {
  // print("sending message: " + method);
	ARG_MIN(1)
  // print("a");
	TO_STRING(method)
  // print("b");
	var args = Array.prototype.slice.call(arguments, 3);
	// method
  args.unshift(method);
	// recv
	args.unshift(obj);
  // print("args: " + args.join(", "));
	return (obj.$m['$' + method] || rb_vm_meth_m).apply(null, args);
}

var obj_class = function() {
  return rb_class_real(this.$isa);
};


/**
	Returns a random number. If `max` is `nil` then the result is 0. Otherwise
	returns a random number from `0` to `max`.

	@example
	  rand      # => 0.192272821917329
	  rand      # => 0.972628272363732
	  rand 10   # => 8
	  rand 10   # => 4

	@param [Number] max max number to use
	@return [Number] random number
*/
function obj_rand(obj, mid, max) {
	if (max != undefined)
		return Math.floor(Math.random() * max);
	else
		return Math.random();
}

function obj_object_id(obj, mid) {
	ARG_COUNT(0)
	
	return obj.$hash();
}

var obj_to_s = function() {
  return '#<' + ':' + this.$hash() + '>';
};
//function obj_to_s(obj, mid) {
//	ARG_COUNT(0)
	
//	return "#<" + rb_call(rb_class_real(obj.$klass), "to_s") + ":" + obj.$hash() +
	 ">";
//}

var obj_inspect = function() {
  return CALL(this, 'to_s');
};
//function obj_inspect(obj, mid) {
//	return rb_call(obj, "to_s");
//}

function obj_instance_eval(obj, mid) {
	USES_BLOCK
	
  // print("about to instance eval..");
	// if (!BLOCK_GIVEN)
	// 	rb_raise(rb_eLocalJumpError, "no block given");
	// ARG_COUNT(0)
	
	if (BLOCK_GIVEN) {
    // print("instance evaling with a block!!!");
    // print(__block__);
		// we use obj as the self instead of block's self
		// return block(obj, Qnil);
		return YIELD_USING(obj);
	}
	return obj;
}

function obj_const_set(obj, mid, name, value) {
	ARG_COUNT(2)
	
	TO_STRING(name)
	
	return rb_const_set(obj, name, value);
}

function obj_const_defined_p(obj, mid, name) {
	ARG_COUNT(1)
	
	TO_STRING(name)
	
	return Qfalse;
}

/**
  Equality for basic objects.
*/
var obj_equal = function(obj2) {
  if (this == obj2) return Qtrue;
  return Qfalse;
};

/**
  @example
  
    !obj  # => true or false
*/
function obj_not(obj, mid) {
  return RTEST(obj) ? Qfalse : Qtrue;
}

/**
  @example
  
    obj != obj2  # => true or false
*/
function obj_not_equal(obj1, mid, obj2) {
  var res = CALL(obj1, "==", obj2);
  return RTEST(res) ? Qfalse : Qtrue;
}

/**
  Basic object initialize
*/
function obj_initialize(obj, mid) {
  // no imp
}

// new
var Init_Object = function() {
  var metaclass;

  boot_cBasicObject = boot_defclass('BasicObject', null);
  boot_cObject = boot_defclass('Object', boot_cBasicObject);
  boot_cModule = boot_defclass('Module', boot_cObject);
  boot_cClass = boot_defclass('Class', boot_cModule);

  // boot_cClass
  rb_cBasicObject = boot_makemeta(boot_cBasicObject, null);
  rb_cObject = boot_makemeta(boot_cObject, rb_cBasicObject);
  rb_cModule = boot_makemeta(boot_cModule, rb_cObject);
  rb_cClass = boot_makemeta(boot_cClass, rb_cModule);

  boot_defmetameta(rb_cBasicObject, rb_cClass);

  console.log("Object has been created!");
  console.log(rb_cObject.$cs);


  rb_cObject.$cs('BasicObject', rb_cBasicObject);
  rb_cObject.$cs('Object', rb_cObject);
  rb_cObject.$cs('Module', rb_cModule);
  rb_cObject.$cs('Class', rb_cClass);

  // defining a method on a module needs special behaviour for includes
  rb_cModule.constructor.prototype.$dm = function(method_id, body, singleton) {
   // console.log("defining module function for: " + method_id);

    var js_id = 'm$' + method_id;

    // super
    boot_base_class.prototype.$dm.apply(this, arguments);

    // go through each class we are included in and add to that as well
    // FIXME: should this really be needed when defining on module? probably actually, yeah..
    if (this.$included_in) {
      for (var i = 0; i < this.$included_in.length; i++) {
       this.$included_in[i].allocator.prototype[js_id] = body;
      }
    }
  };

  // fix the previous $dm for classes (as they use normal dm.)
  rb_cClass.constructor.prototype.$dm = rb_cObject.constructor.prototype.$dm;

  rb_cBasicObject.$dm('initialize', obj_initialize, 0);
  rb_cBasicObject.$dm('==', obj_equal, 0);
  rb_cBasicObject.$dm('equal?', obj_equal, 0);
  rb_cBasicObject.$dm('!', obj_not, 0);
  rb_cBasicObject.$dm('!=', obj_not_equal, 0);

  rb_mKernel = rb_define_module('Kernel');
  rb_cObject.$include(rb_mKernel);

  rb_cClass.$dm('allocate', obj_alloc, 0);
  rb_cClass.$dm('new', cls_new_instance, 0);
  rb_cClass.$dm('superclass', cls_superclass, 0);


  rb_cModule.$dm('name', mod_name, 0);
  rb_cModule.$dm('===', mod_eqq, 0);
  rb_cModule.$dm('define_method', mod_define_method, 0);
  rb_cModule.$dm('attr_accessor', mod_attr_accessor, 0);
  rb_cModule.$dm('attr_reader', mod_attr_reader, 0);
  rb_cModule.$dm('attr_writer', mod_attr_writer, 0);
  rb_cModule.$dm('alias_method', mod_alias_method, 0);
  rb_cModule.$dm('to_s', mod_to_s, 0);
  rb_cModule.$dm('const_set', mod_const_set, 0);
  rb_cModule.$dm('class_eval', mod_class_eval, 0);
  rb_cModule.$dm('module_eval', mod_class_eval, 0);
  rb_cModule.$dm('private', mod_private, 0);
  rb_cModule.$dm('public', mod_public, 0);
  rb_cModule.$dm('protected', mod_protected, 0);
  rb_cModule.$dm('include', mod_include, 0);
  rb_cModule.$dm('extend', mod_extend, 0);

  rb_mKernel.$dm('require', obj_require, 0);
  rb_mKernel.$dm('loop', obj_loop, 0);
  rb_mKernel.$dm('proc', obj_proc, 0);
  rb_mKernel.$dm('lambda', obj_proc, 0);
  rb_mKernel.$dm('puts', obj_puts, 0);
  rb_mKernel.$dm('raise', obj_raise, 0);
  rb_mKernel.$dm('fail', obj_raise, 0);
  rb_mKernel.$dm('instance_variable_defined?', obj_instance_variable_defined_p);
  rb_mKernel.$dm('instance_variable_get', obj_instance_variable_get);
  rb_mKernel.$dm('instance_variable_set', obj_instance_variable_set);
  //rb_mKernel.$dm('block_given?', obj_block_given_p);
  //rb_mKernel.$dm('method_missing', obj_method_missing);
  rb_mKernel.$dm('to_a', obj_to_a, 0);
  rb_mKernel.$dm('tap', obj_tap, 0);
  rb_mKernel.$dm('kind_of?', obj_is_kind_of);
  rb_mKernel.$dm('is_a?', obj_is_kind_of);
  rb_mKernel.$dm('nil?', obj_nil_p);
  rb_mKernel.$dm('respond_to?', obj_respond_to_p);
  rb_mKernel.$dm('===', obj_eqq);
  rb_mKernel.$dm('send', obj_send);
  rb_mKernel.$dm('__send__', obj_send);
  rb_mKernel.$dm('class', obj_class);
  rb_mKernel.$dm('rand', obj_rand);
  rb_mKernel.$dm('object_id', obj_object_id);
  rb_mKernel.$dm('__id__', obj_object_id);
  rb_mKernel.$dm('to_s', obj_to_s, 0);
  rb_mKernel.$dm('inspect', obj_inspect, 0);
  rb_mKernel.$dm('instance_eval', obj_instance_eval);
  rb_mKernel.$dm('const_set', obj_const_set);
  rb_mKernel.$dm('const_defined?', obj_const_defined_p);

  // @class NilClass
  rb_cNilClass = rb_define_class('NilClass', rb_cObject);
  // nil literal
  Qnil = rb_obj_alloc(rb_cNilClass);
  // nil is always falsy
  Qnil.$r = false;

  rb_cNilClass.$dm('to_i', nil_to_i);
  rb_cNilClass.$dm('to_f', nil_to_f);
  rb_cNilClass.$dm('to_a', nil_to_a);
  rb_cNilClass.$dm('to_s', nil_to_s);
  rb_cNilClass.$dm('inspect', nil_inspect);
  rb_cNilClass.$dm('&', false_and);
  rb_cNilClass.$dm('|', false_or);
  rb_cNilClass.$dm('^', false_xor);
  rb_cNilClass.$dm('nil?', rb_true);

  rb_cObject.$cs('NIL', Qnil);

  // @class TrueClass
  rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
  // true literal
  Qtrue = rb_obj_alloc(rb_cTrueClass);

  rb_cTrueClass.$dm('to_s', true_to_s, 0);
  rb_cTrueClass.$dm('&', true_and, 0);
  rb_cTrueClass.$dm('|', true_or, 0);
  rb_cTrueClass.$dm('^', true_xor, 0);
  
  rb_cObject.$cs('TRUE', Qtrue);

  // @class FalseClass
  rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
  Qfalse = rb_obj_alloc(rb_cFalseClass);
  Qfalse.$r = false;

  rb_cFalseClass.$dm('to_s', false_to_s, 0);
  rb_cFalseClass.$dm('&', false_and, 0);
  rb_cFalseClass.$dm('|', false_or, 0);
  rb_cFalseClass.$dm('^', false_xor, 0);
  rb_cObject.$cs('FALSE', Qfalse);
};

// Init core Object classes with some bootstrap methods - old
var Init_Object_Legacy = function() {
	var tmp_metaclass;
	
	// debug support for filename
	var filename = "opal/runtime/object.js";

	rb_cBasicObject = boot_defrootclass('BasicObject');
	rb_cObject = boot_defclass('Object', rb_cBasicObject);
	rb_cModule = boot_defclass('Module', rb_cObject);
	rb_cClass = boot_defclass('Class', rb_cModule);

	rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);

	tmp_metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
	tmp_metaclass = rb_make_metaclass(rb_cObject, tmp_metaclass);
	tmp_metaclass = rb_make_metaclass(rb_cModule, tmp_metaclass);
	tmp_metaclass = rb_make_metaclass(rb_cClass, tmp_metaclass);

	boot_defmetametaclass(rb_cModule, tmp_metaclass);
	boot_defmetametaclass(rb_cObject, tmp_metaclass);
	boot_defmetametaclass(rb_cBasicObject, tmp_metaclass);
	
	rb_define_method(rb_cBasicObject, "initialize", obj_initialize);
	rb_define_method(rb_cBasicObject, "==", obj_equal);
	rb_define_method(rb_cBasicObject, "equal?", obj_equal);
	rb_define_method(rb_cBasicObject, "!", obj_not);
	rb_define_method(rb_cBasicObject, "!=", obj_not_equal);

	rb_mKernel = rb_define_module('Kernel');

	rb_include_module(rb_cObject, rb_mKernel);

	rb_define_method(rb_cClass, "allocate", rb_obj_alloc);
	rb_define_method(rb_cClass, "new", class_new_instance);
	rb_define_method(rb_cClass, "initialize", class_initialize);
	rb_define_method(rb_cClass, "superclass", class_superclass);
	rb_define_singleton_method(rb_cClass, "new", class_s_new);
	
	rb_define_method(rb_cModule, "name", mod_name);
	rb_define_method(rb_cModule, "===", mod_eqq);
	rb_define_method(rb_cModule, "define_method", mod_define_method);
	rb_define_method(rb_cModule, "attr_accessor", mod_attr_accessor);
	rb_define_method(rb_cModule, "attr_reader", mod_attr_reader);
	rb_define_method(rb_cModule, "attr_writer", mod_attr_writer);
	rb_define_method(rb_cModule, "alias_method", mod_alias_method);
	rb_define_method(rb_cModule, "to_s", mod_to_s);
	rb_define_method(rb_cModule, "const_set", mod_const_set);
	rb_define_method(rb_cModule, "class_eval", mod_class_eval);
	rb_define_method(rb_cModule, "module_eval", mod_class_eval);
	rb_define_method(rb_cModule, "private", mod_private);
	rb_define_method(rb_cModule, "public", mod_public);
	rb_define_method(rb_cModule, "protected", mod_protected);
	rb_define_method(rb_cModule, "include", mod_include);
	rb_define_method(rb_cModule, "extend", mod_extend);
	
	rb_define_method(rb_mKernel, "require", obj_require);
	rb_define_method(rb_mKernel, "loop", obj_loop);
	rb_define_method(rb_mKernel, "proc", obj_proc);
	rb_define_method(rb_mKernel, "lambda", obj_proc);
	rb_define_method(rb_mKernel, "puts", obj_puts);
	rb_define_method(rb_mKernel, "raise", obj_raise);
	rb_define_method(rb_mKernel, "fail", obj_raise);
	rb_define_method(rb_mKernel, "instance_variable_defined?", 
																obj_instance_variable_defined_p);
	rb_define_method(rb_mKernel, "instance_variable_get", 
																obj_instance_variable_get);
	rb_define_method(rb_mKernel, "instance_variable_set", 
																obj_instance_variable_set);
	rb_define_method(rb_mKernel, "block_given?", obj_block_given_p);
	rb_define_method(rb_mKernel, "method_missing", obj_method_missing, filename);
	rb_define_method(rb_mKernel, "to_a", obj_to_a);
	rb_define_method(rb_mKernel, "tap", obj_tap);
	rb_define_method(rb_mKernel, "kind_of?", obj_is_kind_of);
	rb_define_method(rb_mKernel, "is_a?", obj_is_kind_of);
	rb_define_method(rb_mKernel, "nil?", obj_nil_p);
	rb_define_method(rb_mKernel, "respond_to?", obj_respond_to_p);
	rb_define_method(rb_mKernel, "===", obj_eqq);
	rb_define_method(rb_mKernel, "send", obj_send);
	rb_define_method(rb_mKernel, "__send__", obj_send);
	rb_define_method(rb_mKernel, "class", obj_class);
	rb_define_method(rb_mKernel, "rand", obj_rand);
	rb_define_method(rb_mKernel, "object_id", obj_object_id);
	rb_define_method(rb_mKernel, "__id__", obj_object_id);
	rb_define_method(rb_mKernel, "to_s", obj_to_s);
	rb_define_method(rb_mKernel, "inspect", obj_inspect);
	rb_define_method(rb_mKernel, "instance_eval", obj_instance_eval);
	rb_define_method(rb_mKernel, "const_set", obj_const_set);
	rb_define_method(rb_mKernel, "const_defined?", obj_const_defined_p);
	
	// @class NilClass
	rb_cNilClass = rb_define_class('NilClass', rb_cObject);
	// nil literal
	Qnil = rb_obj_alloc(rb_cNilClass);
	// nil is false for truthiness
	Qnil.$r = false;
	
	rb_define_method(rb_cNilClass, "to_i", nil_to_i);
	rb_define_method(rb_cNilClass, "to_f", nil_to_f);
	rb_define_method(rb_cNilClass, "to_s", nil_to_s);
	rb_define_method(rb_cNilClass, "to_a", nil_to_a);
	rb_define_method(rb_cNilClass, "inspect", nil_inspect);
	rb_define_method(rb_cNilClass, "&", false_and);
	rb_define_method(rb_cNilClass, "|", false_or);
	rb_define_method(rb_cNilClass, "^", false_xor);
	rb_define_method(rb_cNilClass, "nil?", rb_true);
	rb_const_set(rb_cObject, "NIL", Qnil);

	// @class TrueClass
	rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
	// true literal
	Qtrue = rb_obj_alloc(rb_cTrueClass);
	
	rb_define_method(rb_cTrueClass, "to_s", true_to_s);
	rb_define_method(rb_cTrueClass, "&", true_and);
	rb_define_method(rb_cTrueClass, "|", true_or);
	rb_define_method(rb_cTrueClass, "^", true_xor);
	rb_const_set(rb_cObject, "TRUE", Qtrue);

	// @class FalseClass
	rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
	// false literal
	Qfalse = rb_obj_alloc(rb_cFalseClass);
	// false is false for truthiness
	Qfalse.$r = false;
	
	rb_define_method(rb_cFalseClass, "to_s", false_to_s);
	rb_define_method(rb_cFalseClass, "&", false_and);
	rb_define_method(rb_cFalseClass, "|", false_or);
	rb_define_method(rb_cFalseClass, "^", false_xor);
	rb_const_set(rb_cObject, "FALSE", Qfalse);
};
