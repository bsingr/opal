// Root Types/Flags
    
// Core boot classes
rb_cBasicObject = null,
    rb_cObject = null,
    rb_cModule = null,
    rb_cClass = null;

// Other core classes/modules
var rb_mKernel,
    rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
    rb_proc,
		rb_cFile,
		rb_cDir;

// @global Top self context within ruby 
rb_top_self = null;

// some top level objects
Qnil = null;
Qfalse = null;
Qtrue = null;


function mod_name(mod) {
	return rb_ivar_get(mod, "__classid__");
}

function mod_eqq(mod, obj) {
	return obj_is_kind_of(obj, mod);
}

function mod_define_method(mod, mid) {
	USES_BLOCK
	
	if (!BLOCK_GIVEN)
		rb_raise(rb_eLocalJumpError, "no block given");
	
	rb_define_method(mod, rb_call(mid, "to_s"), __block__);
  return Qnil;
}

function mod_attr_accessor(mod) {
	mod_attr_reader.apply(null, arguments);
	mod_attr_writer.apply(null, arguments);
	return Qnil;
}

function mod_attr_reader(mod) {
	var mid				 = null,
			attribute	 = null,
			attributes = Array.prototype.slice.call(arguments, 1);
	
	for (var i = 0; i < attributes.length; i++) {
		attribute = attributes[i];
		mid = rb_call(attribute, "to_s");

		rb_define_method(mod, mid, function(self) {
			return rb_ivar_get(self, "@" + mid);
		});
	}
	
	return Qnil;
}

function mod_attr_writer(mod) {
	var mid				 = null,
			attribute	 = null,
			attributes = Array.prototype.slice.call(arguments, 1);
	
	for (var i = 0; i < attributes.length; i++) {
		attribute = attributes[i];
		mid = rb_call(attribute, "to_s");
		
		rb_define_method(mod, mid + "=", function(self, val) {
			return rb_ivar_set(self, "@" + mid, val);
		});
	}
	
	return Qnil;
}

function mod_alias_method(mod, new_name, old_name) {
	new_name = rb_call(new_name, "to_s");
	old_name = rb_call(old_name, "to_s");
	rb_define_method(mod, new_name, mod.$m_tbl['$' + old_name]);
	return mod;
}

function mod_to_s(mod) {
	return rb_ivar_get(mod, "__classid__");
}

function mod_const_set(mod, id, value) {
	return rb_vm_cs(mod, rb_call(id, "to_s"), value);
}

function mod_class_eval(mod, string, filename, lineno) {
	USES_BLOCK
	
	if (!BLOCK_GIVEN) {
		var code = exports.compile(string);
	  var func = new Function('self', '__FILE__', code);
	  return func(mod, io_expand_path(filename));
	} else {
		return YIELD_USING(mod);
	}
}

function mod_private(mod) {
	return mod;
}

function mod_public(mod) {
	return mod;
}

function mod_protected(mod) {
	return mod;
}

function mod_include(cla, mod) {
	rb_include_module(cla, mod);
  return Qnil;
}

function mod_extend(cla, mod) {
	rb_extend_module(cla, mod);
	return Qnil;
}

function class_s_new(clas, sup) {
	var klass = rb_define_class_id("AnonClass", sup || rb_cObject);
	return klass;
};

function class_new_instance(cla) {
	var obj = cla.$m.$allocate(cla, Qnil);
	var args = Array.prototype.slice.call(arguments);
	args[0] = obj;
	obj.$m.$initialize.apply(null, args);
	return obj;
};

function class_initialize(cla, sup) {
	// print("in Class.new initialize");
	var klass = rb_define_class_id('', sup || rb_cObject);
	return klass;
}

function class_superclass(cla) {
	var sup = cla.$super;
	
	if (!sup) {
		if (cla == rb_cBasicObject) return Qnil;
		rb_raise(rb_eRuntimeError, "uninitialized class");
	}
	
	return sup;
}

function false_to_s() {
	return "false";
}

function false_and(self, other) {
	return Qfalse;
}

function false_or(self, other) {
	return other.$r ? Qtrue : Qfalse;
}

function false_xor(self, other) {
	return other.$r ? Qtrue : Qfalse;
}

function true_to_s() {
	return "true";
}

function true_and(self, other) {
	return other.$r ? Qtrue : Qfalse;
}

function true_or() {
	return Qtrue;
}

function true_xor(self, other) {
	return other.$r ? Qfalse : Qtrue;
}

function rb_true() {
	return Qtrue;
}

function rb_false() {
	return Qfalse;
}

function nil_to_i() {
	return 0;
}

function nil_to_f() {
	return 0.0;
}

function nil_to_s() {
	return "";
}

function nil_to_a() {
	return [];
}

function nil_inspect() {
	return "nil";
}

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
function obj_loop(obj, block) {
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
function obj_proc(obj, block) {
	ARG_COUNT(0)
	
	if (!BLOCK_GIVEN(block))
		rb_raise(rb_eArgError, "block required");
	
	return block;
}

/**
	Prints each argument in turn to the browser console. Currently there is no
	use of `$stdout`, so it is hardcoded into this method to write to the 
	console directly.

	@param [Object] args objects to print using `inspect`
	@return [nil]
*/
function obj_puts(obj) {
	var args = Array.prototype.slice.call(arguments, 1);
	
	for (var i = 0; i < args.length; i++) {
		io_puts(rb_call(args[i], "to_s"));
	}
	
	return Qnil
}

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
function obj_raise(obj, exception, string) {
	ARG_MIN(1)
	
	var msg = Qnil, exc;
	
	if (IS_STRING(exception)) {
		msg = exception;
		exc = rb_call(rb_eRuntimeError, "new", msg);
	} else if (false && obj_is_kind_of(exception, rb_eException)) {
		exc = exception;
	} else {
		if (string != undefined)
			msg = string;
		
		exc = rb_call(exception, "new", msg);
	}
	
	rb_vm_raise(exc);
}

function obj_instance_variable_defined_p(obj, name) {
	ARG_COUNT(1)
	TO_STRING(name)
	return rb_ivar_defined(obj, name) ? Qtrue : Qfalse;
}

function obj_instance_variable_get(obj, name) {
	ARG_COUNT(1)
	TO_STRING(name)
	return rb_ivar_get(obj, name);
}

function obj_instance_variable_set(obj, name, value) {
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

function obj_method_missing(obj, sym) {
	ARG_MIN(1)
	TO_STRING(sym)
	
	var str = "undefined method `" + sym + "` for " + rb_call(obj, "inspect");
	
	rb_raise(rb_eNoMethodError, str);
}

function obj_to_a(obj) {
	ARG_COUNT(0)
	return [obj];
}

function obj_tap(obj, block) {
	ARG_COUNT(0)
	if (!BLOCK_GIVEN(block))
		rb_raise(rb_eLocalJumpError, "no block given");
	
	BLOCK_CALL(block, obj);
	
	return obj;
}

function obj_is_kind_of(obj, klass) {
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

function obj_respond_to_p(obj, method) {
	ARG_COUNT(1)
	
	TO_STRING(method)
	
	if (obj.$m['$' + method])
		return Qtrue;
	
	return Qfalse;
}

function obj_eqq(obj, other) {
	ARG_COUNT(1)
	
	return rb_call(obj, "==", other);
}

function obj_send(obj, method) {
	ARG_COUNT(1)
	
	TO_STRING(method)
	
	var args = Array.prototype.slice.call(arguments, 3);
	// block
	args.unshift(Qnil);
	// recv
	args.unshift(obj);
	
	return (obj.$m['$' + method] || rb_vm_meth_m(m_id)).apply(null, args);
}

function obj_class(obj) {
	ARG_COUNT(0)
	
	return rb_class_real(obj.$klass);
}


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
function obj_rand(obj, max) {
	if (max != undefined)
		return Math.floor(Math.random() * max);
	else
		return Math.random();
}

function obj_object_id(obj) {
	ARG_COUNT(0)
	
	return obj.$hash();
}

function obj_to_s(obj) {
	ARG_COUNT(0)
	
	return "#<" + rb_call(rb_class_real(obj.$klass), "to_s") + ":" + obj.$hash() +
	 ">";
}

function obj_inspect(obj) {
	return rb_call(obj, "to_s");
}

function obj_instance_eval(obj, block) {
	USES_BLOCK
	
	// if (!BLOCK_GIVEN)
	// 	rb_raise(rb_eLocalJumpError, "no block given");
	// ARG_COUNT(0)
	
	if (BLOCK_GIVEN)
		// we use obj as the self instead of block's self
		// return block(obj, Qnil);
		return YIELD_USING(obj);
	
	return obj;
}

function obj_const_set(obj, name, value) {
	ARG_COUNT(2)
	
	TO_STRING(name)
	
	return rb_const_set(obj, name, value);
}

function obj_const_defined_p(obj, name) {
	ARG_COUNT(1)
	
	TO_STRING(name)
	
	return Qfalse;
}

// Init core Object classes with some bootstrap methods
var InitObject = function() {
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
	
	// @class Proc
	rb_proc = rb_define_toll_free_class(Function.prototype, T_OBJECT | T_PROC, 'Proc', rb_cObject);

	// Top self
	rb_top_self = new RObject(rb_cObject, T_OBJECT);

	var rb_main_include = function() {
	  // console.log("main include, should error..");
	};

	rb_define_singleton_method(rb_top_self, 'include', rb_main_include);
	
};
