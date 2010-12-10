// Opal module within ruby
// @local
var rb_mOpal;

global.rb_block_func = global.rb_block_proc = Qnil;

/**
	A method call (from the VM) with a block must use this method. This method 
	sets the block and ensures the right method can receive it. To do this, the
	following varoables are set (globally):
	
	* rb_block_proc - the actual proc object (function). This is the proc that
										yield should use.
										
	* rb_block_func - the function prototype that the block was sent to. This will
										be ary_each, for Array#each (for example). ary_each must
										then check the global func is itself to ensure the right
										method is capturing the block (and then set it to Qnil)
	
	At this point, there is no guarantee that the method even exists, so we need
	to check first. Also, if it doesnt, we dispatch to method_missing and we must
	then fix the rb_block_func global to point to the method_missing instead.
*/
global.rb_block_call = function rb_block_call(block, self, mid) {
	// print("block is: " + block);
	rb_block_proc = block;
	var func = self.$m['$' + mid];
	
	if (func) {
		// method exists..
		rb_block_func = func;
		return func.apply(null, Array.prototype.slice.call(arguments, 2));
	} else {
		// method_missing
		func = self.$m['$method_missing'];
		throw "need to forward rb_block_call to method missing"
	}
}

/**
  Call a super method.
  
  callee is the function that actually called super(). We use this to find the
  right place in the tree to find the method that actually called super. This is
  actually done in rb_super_find, 
*/
global.rb_super = function(callee, mid, self, args) {
  // print("looking for super " + callee);
  var func = rb_super_find(self.$klass, callee, mid);
  
  if (!func)
    rb_raise(rb_eNoMethodError, "super: no super class method `" + mid + "`" +
      " for " + CALL(self, "inspect"));
  
  // print("found the super!" + func);
  var args_to_send = [self, mid].concat(args);
  return func.apply(null, args_to_send);
};

/**
  Actually find super impl to call.  Returns null if cannot find it.
  This is the debug version!!!!!!!!!!!!!!!!!!!!. also need non debug version
*/
function rb_super_find(klass, callee, mid) {
  var mid = '$' + mid;
  var cur_method;
  // find current method
  while (klass) {
    if (klass.$method_table[mid]) {
      if (klass.$method_table[mid].$wrapped == callee) {
        // cur_method = klass.$method_table[mid];
        break;
      }
    }
    klass = klass.$super;
  }
  
  if (!klass) return null;
  
  // find super() from klass up
  klass = klass.$super;
  
  while (klass) {
    if (klass.$method_table[mid]) {
      return klass.$method_table[mid];
    }
    
    klass = klass.$super;
  }
  
  return null;
}

// define class/module
// @global
rb_vm_class = function(base, super_class, id, body, flag) {
  var klass;
  
  
  switch (flag) {
    // normal class
    case 0:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & T_OBJECT)
        base = rb_class_real(base.$klass);
      // If no superclass specified, use Object.
      if (super_class == Qnil)
        super_class = rb_cObject;
      
      klass = rb_define_class_under(base, id, super_class);
      break;
    // class shift (<<)
    case 1:
      klass = rb_singleton_class(base);
      break;
    // module
    case 2:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & T_OBJECT)
        base = rb_class_real(base.$klass);
      klass = rb_define_module_under(base, id);
      break;
    // If default, something has gone wrong (in compiler).
    default:
      rb_raise(rb_eException, "define_class got a unknown flag " + flag);
  }
  
  // evaluate and return class body using class as the self
  return body(klass);
};

// define method (normal or singleton)
// @global
rb_vm_defn = function(base, m_id, body, singleton) {
  // print("defining: " + m_id);
  if (singleton) {
    // print("defining singleton method: " + m_id);
    rb_define_singleton_method(base, m_id, body);
  }
  else {
    if (base.$flags & T_OBJECT)
      base = base.$klass;
    
    rb_define_method(base, m_id, body);
  }
  // always return nil
  return Qnil;
};


global.rb_vm_meth_m = function(recv, mid) {
  var args = [recv, 'method_missing'].concat(
    Array.prototype.slice.call(arguments, 1));
    
    return recv.$m.$method_missing.apply(null, args);
}

// Get constant from base
// @global
rb_vm_cg = function(base, id) {
  if (base.$flags & T_OBJECT)
    base = rb_class_real(base.$klass);
  
  return rb_const_get(base, id);
};

// Set constant in base
// @global
rb_vm_cs = function(base, id, val) {
  if (base.$flags & T_OBJECT)
    base = rb_class_real(base.$klass);
  
  return rb_const_set(base, id, val);
};

// get global by id
// @global
rb_vm_gg = function(id) {
  return rb_gvar_get(id);
};

// set global by id
// @global
rb_vm_gs = function(id, value) {
  return rb_gvar_set(id, value);
};

var opal_context_eval = function(opal, mid, block, self, string, filename, lineno) {
	var code = exports.compile(string);
  var func = new Function('self', '__FILE__', code);
  return func(self, rb_expand_path(filename));
};

var opal_s_compile = function(opal, mid, string) {
  var code = exports.compile(string);
  return "function(self, __FILE__) {" + code + "}";
}

/**
  top self #to_s
*/
function top_self_to_s(self, mid) {
  ARG_COUNT(0)
  return "main";
}

/**
  top self #include(mod)
*/
function top_self_include(self, mid, mod) {
  rb_include_module(rb_cObject, mod);
}

var InitVM = function() {
	rb_mOpal = rb_define_module('Opal');
	
	rb_define_singleton_method(rb_mOpal, 'context_eval', opal_context_eval);
	rb_define_singleton_method(rb_mOpal, 'compile', opal_s_compile);
	
  // Top self
	rb_top_self = new RObject(rb_cObject, T_OBJECT);
	
  rb_define_singleton_method(rb_top_self, "to_s", top_self_to_s);
  rb_define_singleton_method(rb_top_self, "include", top_self_include);
	
	rb_const_set(rb_cObject, "RUBY_PLATFORM", opal_ruby_platform);
};
