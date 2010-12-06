/**
	Debug stack is used as a stack of all method calls. Wrapper methods push the
	method onto the stack, and then pop it off once it has returned. This will be
	an empty array for non debug environments (no backtrace available..)
*/
debug_stack = []; // need to make local var once finished writing.

/**
	Push the method body onto the stack. This should be the actual method, not the
	wrapper "fake" method. Returns an index of the current stack (so the method
	knows where it needs to pop to)
*/
function debug_stack_push(body) {
	var idx = debug_stack.length;
	debug_stack.push(body);
	return idx;
}

/**
	Pop the stack. Here, an index is given to pop to, which MUST be the same index
	returned by debug_stack_push. This allows for correct handling of throw/raise.
*/
function debug_stack_pop(idx) {
	// debug_stack.splice(idx, debug_stack.length);
	return idx;
}

/**
	Replacement method for rb_define_method. This will call the original after 
	some modifications. A wrapper is essentially placed around every method which
	logs when a method is called, and when it is left.
*/
function debug_define_method(klass, name, body) {
	print("Debug define method.");
	
	var args = Array.prototype.slice.call(arguments);
	
	// wrapper function used to log actual calls
	var wrapper = function() {
		// stack index
		var idx = debug_stack_push(name);
		// result from method call
		var res = body.apply(null, Array.prototype.slice.call(arguments));
		// pop stack
		debug_stack_pop(idx);
		// finally return our result
		return res;
	};
	
	// wrapper needs to be able to reference original (for rb_super etc)
	wrapper.$wrapped = body;
	
	// replace body in args with our wraper
	args[2] = wrapper;
	
	debug_original_define_method.apply(null, args);
	
}

/**
	Where to save the original rb_define_method
*/
var debug_original_define_method;

/**
	Initialize debug mode. This MUST be called before any Init'ing takes place as
	methods defined before this is called will not have their calls pushed into 
	the stack.
*/
function Init_Debug_Mode() {
	print("Initializing debug mode.");
	debug_original_define_method = rb_define_method;
	rb_define_method = debug_define_method;
}
