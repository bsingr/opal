// Exception classes
var rb_eException,
    rb_eStandardError,
    rb_eLocalJumpError,
    rb_eNameError,
    rb_eNoMethodError,
    rb_eArgError,
    rb_eScriptError,
    rb_eLoadError;

// Standard jump exceptions to save re-creating them everytime they are needed
var rb_vm_return_instance,
		rb_vm_loop_return_instance,
		// disgard this? yes we can!
		rb_vm_block_return_instance,
		rb_vm_next_instance;

var Init_Exception = function() {
	// Exception classes
	rb_eException = rb_define_class("Exception", rb_cObject);
	rb_eStandardError = rb_define_class("StandardError", rb_eException);
	rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
	rb_eNameError = rb_define_class("NameError", rb_eStandardError);
	rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
	rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);
	rb_eScriptError = rb_define_class('ScriptError', rb_eException);
	rb_eLoadError = rb_define_class('LoadError', rb_eScriptError);

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

	rb_vm_next_instance = new RObject(rb_eLocalJumpError, T_OBJECT);
	rb_ivar_set(rb_vm_next_instance, '@message', 'unexpected break');
	rb_vm_next_instance.$keyword = 3;
};