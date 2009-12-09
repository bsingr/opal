/* 
 * object.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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

function rb_obj_alloc(klass) {
  return rb_funcall(klass, 'allocate');
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

function rb_obj_equal(self, _cmd, obj) {
  if (self == obj) return true;
  return false;
}

function rb_obj_not(self) {
  return RTEST(self) ? false : true;
}

function rb_obj_not_equal(self, _cmd, obj) {
  var r = rb_funcall(self, "==", obj);
  return RTEST(r) ? false : true;
}

function rb_false() {
  return false;
}

function rb_true() {
  return true;
}

function rb_equal(self, _cmd, obj) {
  var r;
  if (self == obj) return true;
  r = rb_funcall(self, "==", obj);
  if (RTEST(r)) return true;
  return false;
}

function rb_obj_match() {
  return nil;
}

function rb_obj_not_match(self, _cmd, obj) {
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
  return "<" + c + ":0x000000>";
}

function rb_obj_inspect(self) {
  return rb_any_to_s(self);
}
 
rb_define_private_method(rb_cBasicObject, "initialize", rb_obj_dummy, 0);
rb_define_alloc_func(rb_cBasicObject, rb_class_allocate_instance);
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
// rb_define_method(rb_mKernel, "instance_of?", rb_obj_is_instance_of, 1);
// rb_define_method(rb_mKernel, "kind_of?", rb_obj_is_kind_of, 1);
// rb_define_method(rb_mKernel, "is_a?", rb_obj_is_kind_of, 1);
// rb_define_method(rb_mKernel, "tap", rb_obj_tap, 0);
// 
// rb_define_global_function("sprintf", rb_f_sprintf, -1);
// rb_define_global_function("format", rb_f_sprintf, -1);
// 
// rb_define_global_function("Integer", rb_f_integer, 1);
// rb_define_global_function("Float", rb_f_float, 1);
// 
// rb_define_global_function("String", rb_f_string, 1);
// rb_define_global_function("Array", rb_f_array, 1);
// 
// rb_cNilClass = rb_define_class("NilClass", rb_cObject);
// rb_define_method(rb_cNilClass, "to_i", nil_to_i, 0);
// rb_define_method(rb_cNilClass, "to_f", nil_to_f, 0);
// rb_define_method(rb_cNilClass, "to_s", nil_to_s, 0);
// rb_define_method(rb_cNilClass, "to_a", nil_to_a, 0);
// rb_define_method(rb_cNilClass, "inspect", nil_inspect, 0);
// rb_define_method(rb_cNilClass, "&", false_and, 1);
// rb_define_method(rb_cNilClass, "|", false_or, 1);
// rb_define_method(rb_cNilClass, "^", false_xor, 1);
// 
// rb_define_method(rb_cNilClass, "nil?", rb_true, 0);
// rb_undef_alloc_func(rb_cNilClass);
// rb_undef_method(rb_cNilClass.klass, "new");
// rb_define_global_const("NIL", Qnil);
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
// rb_define_method(rb_cModule, "include?", rb_mod_include_p, 1);
// rb_define_method(rb_cModule, "name", rb_mod_name, 0);
// rb_define_method(rb_cModule, "ancestors", rb_mod_ancestors, 0);
// 
// rb_define_private_method(rb_cModule, "attr", rb_mod_attr, -1);
// rb_define_private_method(rb_cModule, "attr_reader", rb_mod_attr_reader, -1);
// rb_define_private_method(rb_cModule, "attr_writer", rb_mod_attr_writer, -1);
// rb_define_private_method(rb_cModule, "attr_accessor", rb_mod_attr_accessor, -1);
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
// rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
// rb_define_method(rb_cModule, "const_defined?", rb_mod_const_defined, -1);
// rb_define_private_method(rb_cModule, "remove_const", rb_mod_remove_const, 1);
// rb_define_method(rb_cModule, "const_missing", rb_mod_const_missing, 1);
// rb_define_method(rb_cModule, "class_variables", rb_mod_class_variables, 0);
// rb_define_method(rb_cModule, "remove_class_variable", rb_mod_remove_cvar, 1);
// rb_define_method(rb_cModule, "class_variable_get", rb_mod_cvar_get, 1);
// rb_define_method(rb_cModule, "class_variable_set", rb_mod_cvar_set, 2);
// rb_define_method(rb_cModule, "class_variable_defined?", rb_mod_cvar_defined, 1);
// 
// rb_define_method(rb_cClass, "allocate", rb_obj_alloc, 0);
// rb_define_method(rb_cClass, "new", rb_class_new_instance, -1);
// rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);
// rb_define_method(rb_cClass, "initialize_copy", rb_class_init_copy, 1);
// rb_define_method(rb_cClass, "superclass", rb_class_superclass, 0);
// rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
// rb_undef_method(rb_cClass, "extend_object");
// rb_undef_method(rb_cClass, "append_features");
// 
// rb_cTrueClass = rb_define_class("TrueClass", rb_cObject);
// rb_define_method(rb_cTrueClass, "to_s", true_to_s, 0);
// rb_define_method(rb_cTrueClass, "&", true_and, 1);
// rb_define_method(rb_cTrueClass, "|", true_or, 1);
// rb_define_method(rb_cTrueClass, "^", true_xor, 1);
// rb_undef_alloc_func(rb_cTrueClass);
// rb_undef_method(rb_cTrueClass.klass, "new");
// rb_define_global_const("TRUE", true);
// 
// rb_cFalseClass = rb_define_class("FalseClass", rb_cObject);
// rb_define_method(rb_cFalseClass, "to_s", false_to_s, 0);
// rb_define_method(rb_cFalseClass, "&", false_and, 1);
// rb_define_method(rb_cFalseClass, "|", false_or, 1);
// rb_define_method(rb_cFalseClass, "^", false_xor, 1);
// rb_undef_alloc_func(rb_cFalseClass);
// rb_undef_method(rb_cFalseClass.klass, "new");
// rb_define_global_const("FALSE", false);
