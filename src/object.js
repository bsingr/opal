// Root Types/Flags
    
// Core boot classes
rb_cBasicObject = null,
    rb_cObject = null,
    rb_cModule = null,
    rb_cClass = null;

// Other core classes/modules
rb_mKernel = null;

  var    rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
		rb_cFile;
// @global Top self context within ruby 
rb_top_self = null;

// some top level objects
Qnil = null;
Qfalse = null;
Qtrue = null;



function class_s_new(clas, sup) {
	var klass = rb_define_class_id("AnonClass", sup || rb_cObject);              
	return klass;
};

function class_new_instance(cla) {

	var obj = cla.$m.allocate(cla, Qnil);
	var args = Array.prototype.slice.call(arguments);
	args[0] = obj;
	
	// if given a block, we need to reroute it to initialize
  if (rb_block_func == arguments.callee) {
    obj.$B.apply(obj, ['initialize', rb_block_proc].concat(
      Array.prototype.slice.call(arguments, 1)));
  } else {
    obj.$m.initialize.apply(null, args);
  }
  return obj;
};

function class_initialize(cla, mid, sup) {
	// print("in Class.new initialize");
	var klass = rb_define_class_id('', sup || rb_cObject);
	return klass;
}

function class_superclass(cla, mid) {
	var sup = cla.$super;
	
	if (!sup) {
		if (cla == rb_cBasicObject) return Qnil;
		rb_raise(rb_eRuntimeError, "uninitialized class");
	}
	
	return sup;
}


function rb_true() {
	return Qtrue;
}

function rb_false() {
	return Qfalse;
}


/**
	Prints each argument in turn to the browser console. Currently there is no
	use of `$stdout`, so it is hardcoded into this method to write to the 
	console directly.

	@param [Object] args objects to print using `inspect`
	@return [nil]
*/
function obj_puts(ob) {
	var args = Array.prototype.slice.call(arguments, 1);
	
	for (var i = 0; i < args.length; i++) {
		console.log(CALL(args[i], "to_s"));
	}
	
	return Qnil;
}

/**
  Equality for basic objects.
*/
function obj_equal(obj1, mid, obj2) {
  if (obj1 == obj2) return Qtrue;
  return Qfalse;
}

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

// Init core Object classes with some bootstrap methods
var Init_Object = function() {
	var tmp_metaclass;
	
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
	
	
  // good idea to keep puts here.. we probably need it nice and early.
	rb_define_method(rb_mKernel, "puts", obj_puts);

  // Top self
	rb_top_self = rb_obj_alloc(rb_cObject);

	// @class NilClass
	rb_cNilClass = rb_define_class('NilClass', rb_cObject);
	// nil literal
	Qnil = rb_obj_alloc(rb_cNilClass);
	// nil is false for truthiness
	Qnil.$r = false;
	
	// @class TrueClass
	rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
	// true literal
	Qtrue = rb_obj_alloc(rb_cTrueClass);
	
	// @class FalseClass
	rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
	// false literal
	Qfalse = rb_obj_alloc(rb_cFalseClass);
	// false is false for truthiness
	Qfalse.$r = false;	
};

