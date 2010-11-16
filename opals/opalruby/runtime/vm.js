// Opal module within ruby
// @local
var rb_mOpalVM;

// define class/module
// @global
rb_vm_class = function(base, super_class, id, body, flag) {
  var klass;
  // if we are dealing with an object, lets use its class instead.
  if (base.$f & T_OBJECT)
    base = rb_class_real(base.$k);
  
  switch (flag) {
    // normal class
    case 0:
      // If no superclass specified, use Object.
      if (super_class == rb_nil)
        super_class = rb_cObject;
      
      klass = rb_define_class_under(base, id, super_class);
      break;
    // class shift (<<)
    case 1:
      klass = rb_singleton_class(base);
      break;
    // module
    case 2:
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
    print("defining singleton method: " + m_id);
    return rb_define_singleton_method(base, m_id, body);
  }
  else {
    if (base.$f & T_OBJECT)
      base = base.$k;
    
    return rb_define_method(base, m_id, body);
  }
};

// Return method missing closure.
// @global
rb_vm_meth_m = function(m_id) {
  return function(self, blk) {
    var args = [self,blk,m_id].concat(Array.prototype.slice.call(arguments, 2));
    return self.$m.$method_missing.apply(self, args);
  };
};

// Get constant from base
// @global
rb_vm_cg = function(base, id) {
  if (base.$f & T_OBJECT)
    base = rb_class_real(base.$k);
  
  return rb_const_get(base, id);
};

// Set constant in base
// @global
rb_vm_cs = function(base, id, val) {
  if (base.$f & T_OBJECT)
    base = rb_class_real(base.$k);
  
  return rb_const_set(base, id, val);
};

// Print the given string to the default console. Currelty Kernel#puts uses this
// method.
var opal_puts = function(self, block, arg) {
  print(arg);
  return rb_nil;
};

// Raw require - require the 'path'. Currently uses commonjs paths and load
// paths etc, but will in future use just a ruby load path.. maybe?
var opal_require = function(self, block, arg) {
  // print('need to require: ' + arg);
  require(arg);
  return rb_true;
};

// Raw define method. our method (name) will be a string here.
// 
// @param base - base class to define on
// @param method - string name of the method
// @param block - the proc implementation (passed in as a block)
// @returns nil
var opal_define_method = function(self, block, base, method) {
  rb_define_method(base, method, block);
  return rb_nil;
};

// Alias a method. names here will be strings.
var opal_alias_method = function(self, block, base, new_name, old_name) {
  rb_define_method(base, new_name, base.$m_tbl['$' + old_name]);
  return rb_nil;
};

// Include module into the class klass
// @
var opal_include = function(self, block, klass, module) {
  print("including module: " + module.__classid__);
  return rb_nil;
};

// Extend module into class
var opal_extend = function(self, block, klass, module) {
  print("extending module: " + module.__classid__);
  return rb_nil;
}

rb_mOpalVM = rb_define_module('OpalVM');
rb_define_singleton_method(rb_mOpalVM, 'puts', opal_puts);
rb_define_singleton_method(rb_mOpalVM, 'require_path', opal_require);
rb_define_singleton_method(rb_mOpalVM, 'define_method', opal_define_method);
rb_define_singleton_method(rb_mOpalVM, 'alias_method', opal_alias_method);
rb_define_singleton_method(rb_mOpalVM, 'include', opal_include);
rb_define_singleton_method(rb_mOpalVM, 'extend', opal_extend);
