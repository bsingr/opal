/* 
 * object.js
 * opal
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

 
/**
  Core objects
*/

var rb_cBasicObject, rb_cObject, rb_cModule, rb_cClass;
var rb_cNilClass, rb_cBoolean;

/**
 Call super method
*/
var rb_supcall = function rb_supcall(from, self, id, args) {
 var method = self.$klass.$search_super_method(from, id);
 if (!method) throw 'RObject#call cannot find super method for: ' + id ;

 switch(args.length) {
   case 0: return method(self, id);
   case 1: return method(self, id, args[0]);
   case 2: return method(self, id, args[0], args[1]);
   case 3: return method(self, id, args[0], args[1], args[2]);
   case 4: return method(self, id, args[0], args[1], args[2], args[3]);
 }

 return method.apply(self, arguments);
};
 

function rb_obj_alloc(klass) {
  return rb_class_allocate_instance(klass);
 // return rb_funcall(klass, 'allocate', 0);
}

function rb_obj_dummy() {
 return nil;
}

function rb_class_allocate_instance(klass) {
 var o = new RObject();
 o.klass = klass;
 FL_SET(o, T_OBJECT);
 return o;
}

function rb_obj_equal(self, obj) {
 if (self == obj) return true;
 return false;
}

function rb_obj_not(self) {
 return RTEST(self) ? false : true;
}

function rb_obj_not_equal(self, obj) {
 var r = rb_funcall(self, "==", obj);
 return RTEST(r) ? false : true;
}

function rb_false() {
 return false;
}

function rb_true() {
 return true;
}

function rb_equal(self, obj) {
 var r;
 if (self == obj) return true;
 r = rb_funcall(self, "==", obj);
 if (RTEST(r)) return true;
 return false;
}

function rb_obj_match() {
 return nil;
}

function rb_obj_not_match(self, obj) {
 var r = rb_funcall(self, "=~", obj);
 return RTEST(r) ? false : true;
}

function rb_class_real(klass) {
 if (!klass) return nil;
 while (FL_TEST(klass, FL_SINGLETON) || FL_TEST(klass, T_ICLASS)) {
   klass = klass.sup;
 }
 return klass;
}

function rb_obj_class(self) {
 return rb_class_real(self.klass);
}

function rb_obj_clone(self) {
 return self;
}

function rb_obj_dup(self) {
 return self;
}

function rb_obj_init_copy(self) {
 return self;
}

function rb_any_to_s(self) {
 var c = rb_obj_classname(self);
 return "#<" + c + ":0x000000>";
};

function rb_obj_classname(obj) {
  var klass;
  if (obj.flags & T_OBJECT) 
    klass = rb_class_real(obj.klass);
  else
    klass = obj.klass;
  
  return klass.iv_tbl.__classid__;
};

function rb_obj_inspect(self) {
 return rb_any_to_s(self);
};

function rb_class_new_instance(klass) {
  var o = rb_obj_alloc(klass);
  var argv = Array.prototype.slice.call(arguments, 1);
  // var call_args = [o, "initialize"];
  // for (var i = 0; i < argc; i++) {
    // call_args.push(argv[i]);
  // }
  rb_funcall2(o, "initialize", argv);

  return o;
};

function rb_f_puts(recv) {
  var argv = Array.prototype.slice.call(arguments, 1), argc = arguments.length - 1;
  for (var i = 0; i < argc; i++) {
    console.log(vm_send(argv[i], "inspect", [], nil, 8));
  }
};

function rb_mod_attr_reader(argc, argv, recv) {
  for (var i = 0; i < argc; i++) {
    var s = argv[i].ptr;
    var f = new Function('r', 'return rb_ivar_get(r, "@' + s + '");');
    rb_define_method(recv, s, f, 0);
  }
  return nil;
};

function rb_mod_attr_writer(argc, argv, recv) {
  for (var i = 0; i < argc; i++) {
    var s = argv[i].ptr;
    var f = new Function('r', 'v', 'return rb_ivar_set(r, "@' + s + '", v);');
    rb_define_method(recv, s + '=', f, 1);
  }
  return nil;  
};

function rb_mod_attr_accessor(argc, argv, recv) {
  rb_mod_attr_reader(argc, argv, recv);
  rb_mod_attr_writer(argc, argv, recv);
  return nil;
};

function rb_mod_const_set(mod, id, val) {
  // FIXME: should really check that id is valid... i.e. does it start with an
  // uppercase letter.
  rb_const_set(mod, id, val);
  return val;
};

function rb_obj_respond_to(argc, argv, obj) {
  // first arg is a symbol to use
  var id = argv[0].ptr;
  var f = rb_search_method(obj.klass, id);
  if (f) return true;
  return false;
};

function rb_obj_is_instance_of(obj, c) {
  if (rb_class_real(obj.klass) == c) {
    return true;
  }
  return false;
};

function rb_obj_is_kind_of(obj, c) {
  var k = obj.klass;
  while (k) {
    if (k == c) return true;
    k = k.sup;
  }
  return false;
};

function rb_obj_tap(obj) {
  var _ = opal_block; opal_block = nil;
  vm_yield(_, [obj]);
  return obj;
};

function rb_nil_to_s() {
  return "";
};

function rb_nil_inspect() {
  return "nil";
};

function rb_nil_and(n, obj) {
  return false;
};

function rb_nil_or(n, obj) {
  if (obj === nil || obj === false) return false;
  return true;
};

function rb_nil_xor(n, obj) {
  if (obj === nil || obj === false) return false;
  return true;
};

function rb_nil_to_a() {
  return [];
};

function rb_nil_to_f() {
  return 0.0;
};

function rb_nil_to_i() {
  return 0;
};

/**
  Object#instance_eval(&block)
  
  Currently, only takes blocks as params. Strings will be added once eval.js is
  finished. Throws error if string given (for now)
*/
function rb_obj_instance_eval(obj, str) {
  if (str) {
    return rb_vm_eval_str(obj, str);
  }
  var _ = opal_block; opal_block = nil;
  if (_ == nil) throw "no block given for instance_eval."
  return _.call(_, obj);
};

function rb_bool_to_s(bool) {
  return bool ? "true" : "false";
};

function rb_nil_nil_q() {
  return true;
};


function rb_mod_include(cls, mod) {
  return rb_include_module(cls, mod);
};

function rb_obj_send(recv, id) {
  var args = Array.prototype.slice.call(arguments, 2);
  return vm_send(recv, id, args, nil, 8);
};


function Init_Object() {
  var metaclass;
  rb_cBasicObject = boot_defclass('BasicObject', null);
  rb_cObject = boot_defclass('Object', rb_cBasicObject);
  rb_cModule = boot_defclass('Module', rb_cObject);
  rb_cClass = boot_defclass('Class', rb_cModule);
  
  // hmm, we jhave to set the const again... or should we?
  rb_const_set(rb_cObject, "BaiscObject", rb_cBasicObject);

  metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
  metaclass = rb_make_metaclass(rb_cObject, metaclass);
  metaclass = rb_make_metaclass(rb_cModule, metaclass);
  metaclass = rb_make_metaclass(rb_cClass, metaclass);

  boot_defmetametaclass(rb_cModule, metaclass);
  boot_defmetametaclass(rb_cObject, metaclass);
  boot_defmetametaclass(rb_cBasicObject, metaclass);
  
  rb_define_private_method(rb_cBasicObject, "initialize", rb_obj_dummy, 0);
  // FIXME: wtf made this break?
  // rb_define_alloc_func(rb_cBasicObject, rb_class_allocate_instance);
  rb_define_method(rb_cBasicObject, "==", rb_obj_equal, 1);
  rb_define_method(rb_cBasicObject, "equal?", rb_obj_equal, 1);
  rb_define_method(rb_cBasicObject, "!", rb_obj_not, 0);
  rb_define_method(rb_cBasicObject, "!=", rb_obj_not_equal, 1);

  rb_define_private_method(rb_cBasicObject, "singleton_method_added", rb_obj_dummy, 1);
  rb_define_private_method(rb_cBasicObject, "singleton_method_removed", rb_obj_dummy, 1);
  rb_define_private_method(rb_cBasicObject, "singleton_method_undefined", rb_obj_dummy, 1);

  rb_mKernel = rb_define_module("Kernel");
  rb_include_module(rb_cObject, rb_mKernel);
  rb_define_private_method(rb_cClass, "inherited", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "included", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "extended", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "method_added", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "method_removed", rb_obj_dummy, 1);
  rb_define_private_method(rb_cModule, "method_undefined", rb_obj_dummy, 1);

  rb_define_method(rb_mKernel, "nil?", rb_false, 0);
  rb_define_method(rb_mKernel, "===", rb_equal, 1); 
  rb_define_method(rb_mKernel, "=~", rb_obj_match, 1);
  rb_define_method(rb_mKernel, "!~", rb_obj_not_match, 1);
  rb_define_method(rb_mKernel, "eql?", rb_obj_equal, 1);

  rb_define_method(rb_mKernel, "class", rb_obj_class, 0);
  rb_define_method(rb_mKernel, "clone", rb_obj_clone, 0);
  rb_define_method(rb_mKernel, "dup", rb_obj_dup, 0);
  rb_define_method(rb_mKernel, "initialize_copy", rb_obj_init_copy, 1);

  // rb_define_method(rb_mKernel, "taint", rb_obj_taint, 0);
  // rb_define_method(rb_mKernel, "tainted?", rb_obj_tainted, 0);
  // rb_define_method(rb_mKernel, "untaint", rb_obj_untaint, 0);
  // rb_define_method(rb_mKernel, "untrust", rb_obj_untrust, 0);
  // rb_define_method(rb_mKernel, "untrusted?", rb_obj_untrusted, 0);
  // rb_define_method(rb_mKernel, "trust", rb_obj_trust, 0);
  // rb_define_method(rb_mKernel, "freeze", rb_obj_freeze, 0);
  // rb_define_method(rb_mKernel, "frozen?", rb_obj_frozen_p, 0);
  
  rb_define_method(rb_mKernel, "instance_eval", rb_obj_instance_eval, 0);
  rb_define_method(rb_mKernel, "send", rb_obj_send, -1);
  rb_define_method(rb_mKernel, "__send__", rb_obj_send, -1);
  
  rb_define_method(rb_mKernel, "respond_to?", rb_obj_respond_to, -1);
  
  rb_define_method(rb_mKernel, "puts", rb_f_puts, -1);
  
  rb_define_method(rb_mKernel, "to_s", rb_any_to_s, 0);
  rb_define_method(rb_mKernel, "inspect", rb_obj_inspect, 0);
  // rb_define_method(rb_mKernel, "methods", rb_obj_methods, -1);
  // rb_define_method(rb_mKernel, "singleton_methods", rb_obj_singleton_methods, -1);
  // rb_define_method(rb_mKernel, "protected_methods", rb_obj_protected_methods, -1);
  // rb_define_method(rb_mKernel, "private_methods", rb_obj_private_methods, -1);
  // rb_define_method(rb_mKernel, "public_methods", rb_obj_public_methods, -1);
  // rb_define_method(rb_mKernel, "instance_variables", rb_obj_instance_variables, 0);
  // rb_define_method(rb_mKernel, "instance_variable_get", rb_obj_ivar_get, 1);
  // rb_define_method(rb_mKernel, "instance_variable_set", rb_obj_ivar_set, 2);
  // rb_define_method(rb_mKernel, "instance_variable_defined?", rb_obj_ivar_defined, 1);
  // rb_define_private_method(rb_mKernel, "remove_instance_variable", rb_obj_remove_instance_variable, 1);
  // 
  rb_define_method(rb_mKernel, "instance_of?", rb_obj_is_instance_of, 1);
  rb_define_method(rb_mKernel, "kind_of?", rb_obj_is_kind_of, 1);
  rb_define_method(rb_mKernel, "is_a?", rb_obj_is_kind_of, 1);
  rb_define_method(rb_mKernel, "tap", rb_obj_tap, 0);
  // 
  // rb_define_global_function("sprintf", rb_f_sprintf, -1);
  // rb_define_global_function("format", rb_f_sprintf, -1);
  // 
  // rb_define_global_function("Integer", rb_f_integer, 1);
  // rb_define_global_function("Float", rb_f_float, 1);
  // 
  // rb_define_global_function("String", rb_f_string, 1);
  // rb_define_global_function("Array", rb_f_array, 1);
   
  rb_cNilClass = rb_define_class("NilClass", rb_cObject);
  rb_define_method(rb_cNilClass, "to_i", rb_nil_to_i, 0);
  rb_define_method(rb_cNilClass, "to_f", rb_nil_to_f, 0);
  rb_define_method(rb_cNilClass, "to_s", rb_nil_to_s, 0);
  rb_define_method(rb_cNilClass, "to_a", rb_nil_to_a, 0);
  rb_define_method(rb_cNilClass, "inspect", rb_nil_inspect, 0);
  rb_define_method(rb_cNilClass, "&", rb_nil_and, 1);
  rb_define_method(rb_cNilClass, "|", rb_nil_or, 1);
  rb_define_method(rb_cNilClass, "^", rb_nil_xor, 1);
  rb_define_method(rb_cNilClass, "nil?", rb_nil_nil_q, 0);
  nil = { flags: T_OBJECT, klass: rb_cNilClass };
  // 
  // 
  // 
  // rb_define_method(rb_cModule, "freeze", rb_mod_freeze, 0);
  // rb_define_method(rb_cModule, "===", rb_mod_eqq, 1);
  // rb_define_method(rb_cModule, "==", rb_obj_equal, 1);
  // rb_define_method(rb_cModule, "<=>",  rb_mod_cmp, 1);
  // rb_define_method(rb_cModule, "<",  rb_mod_lt, 1);
  // rb_define_method(rb_cModule, "<=", rb_class_inherited_p, 1);
  // rb_define_method(rb_cModule, ">",  rb_mod_gt, 1);
  // rb_define_method(rb_cModule, ">=", rb_mod_ge, 1);
  // rb_define_method(rb_cModule, "initialize_copy", rb_mod_init_copy, 1);
  // rb_define_method(rb_cModule, "to_s", rb_mod_to_s, 0);
  // rb_define_method(rb_cModule, "included_modules", rb_mod_included_modules, 0);
  rb_define_method(rb_cModule, "include", rb_mod_include, 1);
  // rb_define_method(rb_cModule, "include?", rb_mod_include_p, 1);
  // rb_define_method(rb_cModule, "name", rb_mod_name, 0);
  // rb_define_method(rb_cModule, "ancestors", rb_mod_ancestors, 0);
  // 
  // rb_define_private_method(rb_cModule, "attr", rb_mod_attr, -1);
  rb_define_private_method(rb_cModule, "attr_reader", rb_mod_attr_reader, -1);
  rb_define_private_method(rb_cModule, "attr_writer", rb_mod_attr_writer, -1);
  rb_define_private_method(rb_cModule, "attr_accessor", rb_mod_attr_accessor, -1);
  // 
  // rb_define_alloc_func(rb_cModule, rb_module_s_alloc);
  // rb_define_method(rb_cModule, "initialize", rb_mod_initialize, 0);
  // rb_define_method(rb_cModule, "instance_methods", rb_class_instance_methods, -1);
  // rb_define_method(rb_cModule, "public_instance_methods", rb_class_public_instance_methods, -1);
  // rb_define_method(rb_cModule, "protected_instance_methods", rb_class_protected_instance_methods, -1);
  // rb_define_method(rb_cModule, "private_instance_methods", rb_class_private_instance_methods, -1);
  // 
  // rb_define_method(rb_cModule, "constants", rb_mod_constants, -1);
  // rb_define_method(rb_cModule, "const_get", rb_mod_const_get, -1);
  rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
  // rb_define_method(rb_cModule, "const_defined?", rb_mod_const_defined, -1);
  // rb_define_private_method(rb_cModule, "remove_const", rb_mod_remove_const, 1);
  // rb_define_method(rb_cModule, "const_missing", rb_mod_const_missing, 1);
  // rb_define_method(rb_cModule, "class_variables", rb_mod_class_variables, 0);
  // rb_define_method(rb_cModule, "remove_class_variable", rb_mod_remove_cvar, 1);
  // rb_define_method(rb_cModule, "class_variable_get", rb_mod_cvar_get, 1);
  // rb_define_method(rb_cModule, "class_variable_set", rb_mod_cvar_set, 2);
  // rb_define_method(rb_cModule, "class_variable_defined?", rb_mod_cvar_defined, 1);
  // 
  rb_define_method(rb_cClass, "allocate", rb_obj_alloc, 0);
  rb_define_method(rb_cClass, "new", rb_class_new_instance, -1);
  // rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);
  // rb_define_method(rb_cClass, "initialize_copy", rb_class_init_copy, 1);
  // rb_define_method(rb_cClass, "superclass", rb_class_superclass, 0);
  // rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
  // rb_undef_method(rb_cClass, "extend_object");
  // rb_undef_method(rb_cClass, "append_features");
  // 
  rb_cBoolean = rb_define_class("Boolean", rb_cObject);
  Boolean.prototype.klass = rb_cBoolean;
  rb_define_method(rb_cBoolean, "to_s", rb_bool_to_s, 0);
  rb_define_method(rb_cBoolean, "inspect", rb_bool_to_s, 0);
  // rb_define_method(rb_cTrueClass, "&", true_and, 1);
  // rb_define_method(rb_cTrueClass, "|", true_or, 1);
  // rb_define_method(rb_cTrueClass, "^", true_xor, 1);
  // rb_undef_alloc_func(rb_cTrueClass);
  // rb_undef_method(rb_cTrueClass.klass, "new");
  // rb_define_global_const("TRUE", true);

}