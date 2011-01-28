
//
// DEBUG MODE IS DEPRECEATED!!!!!!!!!!!!!!!!
//



/**
	Debug stack is used as a stack of all method calls. Wrapper methods push the
	method onto the stack, and then pop it off once it has returned. This will be
	an empty array for non debug environments (no backtrace available..).
	
	Items on the stack will be an array:
	  
	  [body, arguments]
	  
	For now arguments will also include the receiver (incase it is needed)
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
	debug_stack.splice(idx, debug_stack.length);
	return idx;
}

/**
  Print backtrace. The given array of items from the stack need to be printed to
  the console.
*/
function debug_print_backtrace(items) {
  var item, line = "";
  
  for (var i = items.length - 1; i >= 0; i--) {
    item = items[i];
    line = "\tfrom " + item[0].displayName; 
    
    // args.. 
    
    // filename + linenumber.
    if (item[0].displayFileName)
      line += " at " + item[0].displayFileName;
    
    print(line);
  }
}

/**
	Replacement method for rb_define_method. This will call the original after 
	some modifications. A wrapper is essentially placed around every method which
	logs when a method is called, and when it is left.
*/
function debug_define_method(klass, name, body, filename, lineno) {
  // print("Debug define method.");
	
	var args = Array.prototype.slice.call(arguments);
	
	// wrapper function used to log actual calls
	var wrapper = function() {
    // arguments we need to forward on to body
    var args = Array.prototype.slice.call(arguments);
		// stack index
		var idx = debug_stack_push([body]);
		// result from method call
		var res = body.apply(null, args);
		// pop stack
		debug_stack_pop(idx);
		// finally return our result
		return res;
	};
	
	// wrapper needs to be able to reference original (for rb_super etc)
	wrapper.$wrapped = body;
	
	// displayName for debugger and "pretty printing". Also, do not do it on 
  // methods that have already have it set on (rb_alias_method etc).
	if (!body.displayName) {
    body.displayName = rb_class_real(klass).__classid__ + '#' + name;
    body.displayFileName = filename;
  }
	
	// replace body in args with our wraper
	args[2] = wrapper;
	
	return debug_original_define_method.apply(null, args);
}


/**
	Where to save the original rb_define_method
*/
var debug_original_define_method;

/**
	Replacement method for rb_block_call. Here we need to correct the
	rb_block_func variable to point to the .$wrapped function instead of the outer
	wrapping function. The $wrapped function always checks itself against this var
	to ensure it is correctly getting the block (make sure the block was not given 
	to someone else)
*/
function debug_block_call(block, self, mid) {
  // print("calling block for " + mid);
  // print("block is: " + block.$m.$inspect(block));
	rb_block_proc = block;
	var func = self.$m['$' + mid];
	
	if (func) {
		// method exists..
		rb_block_func = func.$wrapped;
    // print("SETTING rb_block_func to " + rb_block_func);
		
		return func.apply(null, Array.prototype.slice.call(arguments, 1));
	} else {
		// method_missing
		func = self.$m['$method_missing'];
		rb_raise(rb_eRuntimeError,
		  "need to forward rb_block_call to method missing");
	}
}

/**
	Initialize debug mode. This MUST be called before any Init'ing takes place as
	methods defined before this is called will not have their calls pushed into 
	the stack.
*/
function Init_Debug_Mode() {
	print("Initializing debug mode.");
	// rb_define_method
	debug_original_define_method = rb_define_method;
	rb_define_method = debug_define_method;
	// rb_block_call
	var original_block_call = rb_block_call;
	global.rb_block_call = rb_block_call = debug_block_call;
}
