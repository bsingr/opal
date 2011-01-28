// Exception classes
var rb_eException,
    rb_eStandardError,
    rb_eLocalJumpError,
    rb_eNameError,
    rb_eNoMethodError,
    rb_eArgError,
    rb_eScriptError,
    rb_eLoadError,
		rb_eRuntimeError,
		rb_eTypeError,
		rb_eIndexError,
		rb_eKeyError,
		rb_eRangeError;

// Standard jump exceptions to save re-creating them everytime they are needed
var rb_vm_return_instance,
		rb_vm_loop_return_instance,
		// disgard this? yes we can!
		rb_vm_block_return_instance,
		rb_vm_next_instance,
		rb_vm_break_instance;

function exc_initialize(exc, mid, message) {
	// if (message != Qnil)	
		rb_ivar_set(exc, "@message", (message == undefined) ? "" : message);
}

function exc_message(exc) {
	return rb_ivar_get(exc, "@message");
}

function exc_inspect(exc) {
	return "#<" + exc.$klass.__classid__ + ": " + rb_call(exc, "to_s") + ">";
}

function exc_to_s(exc) {
	return rb_ivar_get(exc, "@message");
}

var Init_Exception = function() {
	
	//rb_eException = rb_define_class("Exception", rb_cObject);
  rb_eException = rb_define_toll_free_class(Error.prototype, T_OBJECT, 'Exception', rb_cObject);
	
	rb_define_method(rb_eException, "initialize", exc_initialize);
	rb_define_method(rb_eException, "message", exc_message);
	rb_define_method(rb_eException, "inspect", exc_inspect);
	rb_define_method(rb_eException, "to_s", exc_to_s);
	
	rb_eStandardError = rb_define_class("StandardError", rb_eException);
	rb_eRuntimeError = rb_define_class("RuntimeError", rb_eException);
	rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
	rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
	rb_eNameError = rb_define_class("NameError", rb_eStandardError);
	rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
	rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);
	rb_eScriptError = rb_define_class('ScriptError', rb_eException);
	rb_eLoadError = rb_define_class('LoadError', rb_eScriptError);
	
	rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
	rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
	rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);

	// jump error literals. We keep a singular instance to avoid recreating each
	// error every time (expensive).
	rb_vm_return_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
	rb_ivar_set(rb_vm_return_instance, '@message', 'unexpected return');
	rb_vm_return_instance.$keyword = 0;

	rb_vm_loop_return_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
	rb_ivar_set(rb_vm_loop_return_instance, '@message', 'unexpected return');
	rb_vm_loop_return_instance.$keyword = 1;

	// disgard this? yes we can!
	rb_vm_block_return_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
	rb_ivar_set(rb_vm_block_return_instance, '@message', 'unexpected return');
	rb_vm_block_return_instance.$keyword = 0;
	
	rb_vm_break_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
	rb_ivar_set(rb_vm_break_instance, "@message", "unexpected break");
	rb_vm_break_instance.$keyword = 2;

	rb_vm_next_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
	rb_ivar_set(rb_vm_next_instance, '@message', 'unexpected next');
	rb_vm_next_instance.$keyword = 3;
};
