// Opal module within ruby
// @local
var rb_mOpal;


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
global.rb_block_call = function rb_block_call(block, mid, self) {
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
  
  var args_to_send = [self].concat(args);
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

// Return method missing closure.
// @global
rb_vm_meth_m = function(m_id) {
  return function(self) {
    var args = [self,m_id].concat(Array.prototype.slice.call(arguments, 1));
    return self.$m.$method_missing.apply(self, args);
  };
};

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

// Print the given string to the default console. Currelty Kernel#puts uses this
// method.
var opal_puts = function(self, block, arg) {
  // print(arg);
  io_puts(arg);
  return Qnil;
};

// Raw require - require the 'path'. Currently uses commonjs paths and load
// paths etc, but will in future use just a ruby load path.. maybe?
var opal_require = function(self, fname) {
  // print('need to require: ' + arg);
  return rb_require(fname);
};

// Raw define method. our method (name) will be a string here.
// 
// @param base - base class to define on
// @param method - string name of the method
// @param block - the proc implementation (passed in as a block)
// @returns nil
var opal_define_method = function(self, block, base, method) {
  rb_define_method(base, method, block);
  return Qnil;
};

// Alias a method. names here will be strings.
var opal_alias_method = function(self, block, base, new_name, old_name) {
  rb_define_method(base, new_name, base.$m_tbl['$' + old_name]);
  return Qnil;
};

// Include module into the class klass
// @
var opal_include = function(self, block, klass, module) {
  // print("including module: " + module.__classid__);
  rb_include_module(klass, module);
  return Qnil;
};

// Extend module into class
var opal_extend = function(self, block, klass, module) {
  // print("extending module: " + module.__classid__);
  rb_extend_module(klass, module);
  return Qnil;
};

// create a subclass of the given class
var opal_subclass = function(self, block, super_klass) {
  var klass = rb_define_class_id('', super_klass);
  return klass;
};

// get current working directory - platform dependant
var opal_getwd = function(self, block) {
  return io_getwd();
};

var opal_glob = function(self, block, glob) {
  // print("globbing: " + glob);
  return io_glob(glob);
};

var opal_join = function(self, block, parts) {
  // var parts = Array.prototype.slice.call(arguments, 2);
  return opal_file_join.apply(this, parts);
};

var opal_basename = function(self, block, name) {
  return io_basename(name);
};

var opal_expand_path = function(self, block, path) {
	return io_expand_path(path);
};

// raise exception
var opal_raise = function(self, block, exc) {
  rb_vm_raise(exc);
  // we never actually end up returning anything
  return Qnil;
};

// get env variable denoted by name
var opal_getenv = function(self, block, name) {
  if (system.env.hasOwnProperty(name)) {
    return system.env[name];
  }
  
  return Qnil;
};

// get all env variables [[name1, value1], [name2, value2]]
var opal_getallenv = function(self, block, name) {
  var result = [];
  for (var key in system.env)
    result.push([key, system.env[key]])
  
  return result;
};

var opal_context_eval = function(opal, block, self, string, filename, lineno) {
	var code = exports.compile(string);
  var func = new Function('self', '__FILE__', code);
  return func(self, io_expand_path(filename));
};

var InitVM = function() {
	rb_mOpal = rb_define_module('Opal');
	rb_define_singleton_method(rb_mOpal, 'puts', opal_puts);
	rb_define_singleton_method(rb_mOpal, 'raise', opal_raise);
	rb_define_singleton_method(rb_mOpal, 'require_path', opal_require);
	rb_define_singleton_method(rb_mOpal, 'define_method', opal_define_method);
	rb_define_singleton_method(rb_mOpal, 'alias_method', opal_alias_method);
	rb_define_singleton_method(rb_mOpal, 'include', opal_include);
	rb_define_singleton_method(rb_mOpal, 'extend', opal_extend);
	rb_define_singleton_method(rb_mOpal, 'subclass', opal_subclass);
	rb_define_singleton_method(rb_mOpal, 'getwd', opal_getwd);
	// rb_define_singleton_method(rb_mOpalVM, 'expand_path', opal_expand_path);
	rb_define_singleton_method(rb_mOpal, 'glob', opal_glob);
	// rb_define_singleton_method(rb_mOpalVM, 'join', opal_join);
	rb_define_singleton_method(rb_mOpal, 'basename', opal_basename);
	rb_define_singleton_method(rb_mOpal, 'getenv', opal_getenv);
	rb_define_singleton_method(rb_mOpal, 'getallenv', opal_getallenv);
	
	rb_define_singleton_method(rb_mOpal, 'context_eval', opal_context_eval);
};
