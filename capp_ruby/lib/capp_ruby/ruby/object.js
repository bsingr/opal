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

rb_cObject = nil;
rb_cBasicObject = nil;
rb_cModule = nil;
rb_cClass = nil;
rb_mKernel = nil;
rb_cBoolean = nil;
rb_cNilClass = nil;

function rb_basic_obj_alloc(cls, sel) {
  return class_createInstance(cls);
};

function rb_module_s_alloc(mod, sel) {
  return rb_module_new();
};

function rb_class_s_alloc(cls, sel) {
  return rb_class_boot();
};

function rb_f_puts(cls, sel, val) {
  console.log(val);
  // CPLog(val);
  return nil;
};

function rb_obj_class(cls, sel) {
  return cls.isa;
};

function rb_mod_attr_accessor(cls, sel) {
  var i, a = Array.prototype.slice.call(arguments, 2);
  for (i = 0; i < a.length; i++) {
    rb_objj_define_kvo_getter(cls, a[i]);
    rb_objj_define_kvo_setter(cls, a[i]);
  }
  return cls;
};

function rb_mod_attr_reader(cls, sel) {
  var i, a = Array.prototype.slice.call(arguments, 2);
  for (i = 0; i < a.length; i++) {
    rb_objj_define_kvo_getter(cls, a[i]);
  }
  return cls;  
};

function rb_mod_attr_writer(cls, sel) {
  var i, a = Array.prototype.slice.call(arguments, 2);
  for (i = 0; i < a.length; i++) {
    rb_objj_define_kvo_setter(cls, a[i]);
  }
  return cls;  
};

function rb_objj_define_kvo_setter(cls, id) {
  id = objj_msgSend(id, "to_s");
  var k = ["set", id.charAt(0).toUpperCase(), id.substr(1), ":"].join("");
  rb_define_method(cls, k, function(self, sel, val) {
    var key = id;
    return rb_ivar_set(self, '@' + key, val);
  }, 1);
};

function rb_objj_define_kvo_getter(cls, id) {
  id = objj_msgSend(id, "to_s");
  rb_define_method(cls, id, function(self, sel, val) {
    var key = id;
    return rb_ivar_get(self, '@' + id);
  }, 0);
};

function rb_obj_new_m(cls, sel) {
  var args = Array.prototype.slice.call(arguments, 2);
  var o = objj_msgSend(cls, "alloc");
  return cr_send(o, 'init', args, nil, 0);
};

function rb_mod_eqq(mod, sel, obj) {
  // console.log(obj);
  return cr_send(obj, 'is_a?', [mod], nil, 0);
};

function rb_mod_const_get(cls, sel, id) {
  return rb_const_get(cls, id);
};

function rb_obj_ivar_set(cls, sel, name, val) {
  return rb_ivar_set(cls, name, val);
};

function rb_obj_send(obj, sel, mid, arg1, arg2, arg3, arg4) {
  // FIXME: check if symbol or not
  if (mid.isa == rb_cSymbol) mid = mid.ptr;
  return objj_msgSend(obj, mid, arg1, arg2, arg3, arg4);
};

function rb_obj_is_instance_of(obj, sel, cls) {
  return objj_msgSend(obj, 'isMemberOfClass:', cls);
};

function rb_obj_is_kind_of(obj, sel, cls) {
  return objj_msgSend(obj, 'isKindOfClass:', cls);
};

function rb_obj_tap(obj, sel) {
  var _$ = cappruby_block; cappruby_block = nil;
  if (!_$) throw "no block passed to obj#tap"

  cr_yield(_$, [obj]);
  return obj;
};

function rb_obj_rand(obj, sel, num) {
  return Math.round(Math.random() * num);
};


function rb_nil_to_i() {
  return 0;
};

function rb_nil_to_f() {
  return 0.0;
};

function rb_nil_to_s() {
  return "";
};

function rb_nil_to_a() {
  return [];
};

function rb_nil_inspect() {
  return "nil";
};

function rb_nil_nil_p() {
  return true;
};





function rb_bool_to_s(self, sel) {
  return self ? "true" : "false";
};

function rb_bool_and(self, sel, other) {
  return self ? RTEST(other) : false; 
};

function rb_bool_or(self, sel, other) {
  return self ? true : RTEST(other); 
};

function rb_bool_xor(self, sel, other) {
  return self ? !RTEST(other) : !RTEST(other);
};

function rb_obj_not(obj) {
  return !RTEST(obj);
};

function Init_Object() {
  
  rb_cObject = objj_getClass("CPObject");
  rb_const_set(rb_cObject, "Object", rb_cObject);
  
  rb_cBasicObject = objj_allocateClassPair(null, 'BasicObject');
  rb_const_set(rb_cObject, "BasicObject", rb_cBasicObject);
  rb_define_singleton_method(rb_cBasicObject, "alloc", rb_basic_obj_alloc, 0);
  
  rb_cModule = boot_defclass("Module", rb_cObject);
  rb_cClass = boot_defclass("Class", rb_cModule);
  
  rb_define_singleton_method(rb_cModule, "alloc", rb_module_s_alloc, 0);
  rb_define_singleton_method(rb_cClass, "alloc", rb_class_s_alloc, 0);
  
  rb_include_module(rb_cObject.isa, rb_cClass);
  rb_include_module(rb_cObject.isa, rb_cModule);
  
  // rb_define_method(rb_cBasicObject, "==", rb_obj_equal, 1);
  // rb_define_method(rb_cBasicObject, "equal?", rb_obj_equal, 1);
  rb_define_method(rb_cBasicObject, "!", rb_obj_not, 0);
  // rb_define_method(rb_cBasicObject, "!=", rb_obj_not_equal, 1);
  
  rb_define_method(rb_cModule, "const_get:", rb_mod_const_get, -1);
  // rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
  
  
  rb_mKernel = rb_define_module("Kernel");
  rb_include_module(rb_cObject, rb_mKernel);
  
  rb_define_method(rb_mKernel, "class", rb_obj_class, 0);
  rb_define_method(rb_mKernel, "send:", rb_obj_send, 1);
  rb_define_method(rb_cModule, "send:", rb_obj_send, 1);
  
  rb_define_method(rb_mKernel, "instance_of?", rb_obj_is_instance_of, 1);
  rb_define_method(rb_mKernel, "kind_of?", rb_obj_is_kind_of, 1);
  rb_define_method(rb_mKernel, "is_a?", rb_obj_is_kind_of, 1);
  rb_define_method(rb_mKernel, "tap", rb_obj_tap, 0);
  
  /**
    puts is generally called with a single param, so we use a colon-iszed name
    for quicker lookups (to save having to reaearch without a colon)
  */
  rb_define_method(rb_mKernel, "puts:", rb_f_puts, 1);
  rb_define_method(rb_cModule, "puts:", rb_f_puts, 1);
  
  rb_define_method(rb_mKernel, "rand:", rb_obj_rand, 1);
  
  // rb_define_method(rb_cModule, "freeze", rb_mod_freeze, 0);
  rb_define_method(rb_cModule, "===", rb_mod_eqq, 1);
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
  
  // rb_define_method(rb_cModule, "attr:", rb_mod_attr, -1);
  rb_define_method(rb_cModule, "attr_reader:", rb_mod_attr_reader, -1);
  rb_define_method(rb_cModule, "attr_writer:", rb_mod_attr_writer, -1);
  rb_define_method(rb_cModule, "attr_accessor:", rb_mod_attr_accessor, -1);
  
  rb_define_method(rb_cModule, "new:", rb_obj_new_m, 1);
  
  rb_define_method(rb_mKernel, "instance_variable_set:", rb_obj_ivar_set, 2);
  
  // NilClass
  rb_cNilClass = objj_getClass("CPNil");
  
  rb_define_method(rb_cNilClass, "to_i", rb_nil_to_i, 0);
  rb_define_method(rb_cNilClass, "to_f", rb_nil_to_f, 0);
  rb_define_method(rb_cNilClass, "to_s", rb_nil_to_s, 0);
  rb_define_method(rb_cNilClass, "to_a", rb_nil_to_a, 0);
  rb_define_method(rb_cNilClass, "inspect", rb_nil_inspect, 0);
  rb_define_method(rb_cNilClass, "&", rb_bool_and, 1);
  rb_define_method(rb_cNilClass, "|", rb_bool_or, 1);
  rb_define_method(rb_cNilClass, "^", rb_bool_xor, 1);
  rb_define_method(rb_cNilClass, "nil?", rb_nil_nil_p, 0);
  
  // Boolean - true/false
  rb_cBoolean = objj_getClass("CPBoolean");
  
  rb_define_method(rb_cBoolean, "to_s", rb_bool_to_s, 0);
  rb_define_method(rb_cBoolean, "&", rb_bool_and, 1);
  rb_define_method(rb_cBoolean, "|", rb_bool_or, 1);
  rb_define_method(rb_cBoolean, "^", rb_bool_xor, 1);

};
