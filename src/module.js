// define a top level module with the given id
rb_define_module = function(id) {
  return rb_define_module_under(rb_cObject, id);
};

var rb_define_module_under = function(base, id) {
  var module;
  // print("defining module " + id);
  // if module already exists..
  if (rb_const_defined(base, id)) {
    // print("already defined");
    // make sure it is a module, otherwise error (trying to change class)
    module = rb_const_get(base, id);
    if (module.$flags & T_MODULE) {
      return module;
    }

    throw id + " is not a module."
  }
  
  module = rb_define_module_id(id);
  rb_const_set(base, id, module);
  module.$parent = base;
  return module;
};

var rb_define_module_id = function(id) {
  var module = rb_define_class_id(id, rb_cModule);
  module.$flags = T_MODULE;
  rb_name_class(module, id);
  return module;
};

var rb_mod_create = function() {
  // return // rb_define_class_id()
  return rb_class_boot(rb_cModule);
};

rb_include_module = function(klass, module) {
  // print("YEAH");
  // console.log("including " + module.$i.__classid__);
  // make sure our klass has the included modules array
  if (!klass.$included_modules)
    klass.$included_modules = [];
  
  // if we already have the module included, just return
  if (klass.$included_modules.indexOf(module) != -1)
    return;
    
  // make a note of the included module
  klass.$included_modules.push(module);
  // make a note in module that its been included in here? yes we do.
  // print("do we have included_in");
  if (!module.$included_in) {
    // print ("adding inclided in");
    module.$included_in = [];
  }
  
  // print("are we kernel?");
  // print(rb_mKernel.$h);
  // print(module.$h);
  
  module.$included_in.push(klass);
  // print(rb_mKernel.$included_in);
  // print(module.method_table);
  for (var method in module.$method_table) {
    // already potentially wrapped, so use define_raw
    rb_define_method_raw(klass, method, module.$method_table[method]);
    // print("adding method: " + method);
    // check to make sure we are not overriding? if so, add it to the superclass
    // of klass.
    // klass.$m_prototype_tbl[method] = module.$method_table[method];
    
	// delted...
		// rb_define_method(klass, method.substr(1), module.$method_table[method]);
		// replaces
    // klass.$m_prototype_tbl[method] = module.$method_table[method];
    // klass.$method_table[method] = module.$method_table[method];
		// $method_table['$' + name] = body;
		
		
  }
  
};

rb_extend_module = function(klass, module) {
  if (!klass.$extended_modules)
    klass.$extended_modules = [];
  
  if (klass.$extended_modules.indexOf(module) != -1)
    return;
  
  klass.$extended_modules.push(module);
  
  if (!module.$extended_in)
    module.$extended_in = [];
    
  module.$extended_in.push(klass);
  
  // for (var prop in klass.$k) {
    // print(prop);
    // print(klass.$k[prop]);
  // }
  
  for (var method in module.$method_table) {
    // klass.$klass.$m_prototype_tbl[method] = module.$method_table[method];
    rb_define_method_raw(klass.$klass, method, module.$method_table[method]);
  }
};

