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

function rb_obj_alloc(klass, id, _) {
  return rb_class_allocate_instance(klass);
};

function rb_class_allocate_instance(klass, id, _) {
  var o = new RObject();
  o.klass = klass;
  FL_SET(o, T_OBJECT);
  return o;
};

function rb_obj_dummy() {
  return nil;
};

function rb_obj_equal($, id, _, obj) {
  if ($ == obj) return true;
  return false;
};

function rb_obj_not($, id, _) {
  return RTEST($) ? false : true;
};

function rb_obj_not_equal($, id, _, obj) {
  return RTEST(rb_funcall($, "==", obj)) ? false : true;
};

function rb_false() {
  return false;
};

function rb_true() {
  return true;
};

function rb_equal($, id, _, obj) {
  var r;
  if ($ == obj) return true;
  r = rb_funcall($, "==", obj);
  if (RTEST(r)) return true;
  return false;
};

function rb_obj_match() {
  return nil;
};

function rb_obj_not_match($, id, _, obj) {
  var r = rb_funcall($, "=~", obj);
  return RTEST(r) ? false : true;
};

function rb_class_real(klass) {
  if (!klass) return nil;
  while (FL_TEST(klass, FL_SINGLETON) || FL_TEST(klass, T_ICLASS)) {
    klass = klass.sup;
  }
  return klass;
};

function rb_obj_class(self) {
  return rb_class_real(self.klass);
};

function rb_obj_clone(self) {
  return self;
};

function rb_obj_dup(self) {
  return self;
};

function rb_obj_init_copy(self) {
  return self;
};

function rb_any_to_s(self, id, _) {
 var c = rb_obj_classname(self);
 if (self.flags & T_OBJECT) {
   return "#<" + c + ":" + self.hash + ">";
 }
 else {
   return c;
 }
 // return (self.flags & T_OBJECT ? "" : "#<") + c + ":" + self.hash + ">";
};

function rb_obj_classname(obj, id, _) {
  var klass;
  if (obj.flags & T_OBJECT) 
    klass = rb_class_real(obj.klass);
  else
    klass = obj;
  // console.log(klass);
  return klass.iv_tbl.__classid__;
};

function rb_obj_inspect(self, id, _) {
  return rb_any_to_s(self);
};

function rb_class_new_instance(klass, id, _) {
  var o = rb_obj_alloc(klass);
  var argv = Array.prototype.slice.call(arguments, 3);
  rb_funcall3(o, "initialize", _, argv);
  // console.log("after initialize" + argv);
  return o;
};

function rb_f_puts(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3)
  for (var i = 0; i < argv.length; i++) {
    console.log(vm_send(argv[i], "inspect", [], nil, 8));
  }
};

function rb_mod_attr_reader(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3);
  for (var i = 0; i < argv.length; i++) {
    var s = argv[i].ptr;
    var f = new Function('r','id','_','return rb_ivar_get(r, "@' + s + '");');
    rb_define_method(recv, s, f, 0);
  }
  return nil;
};

function rb_mod_attr_writer(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3);
  for (var i = 0; i < argv.length; i++) {
    var s = argv[i].ptr;
    var f = new Function('r','id','_','v','return rb_ivar_set(r, "@'+s+'", v);');
    rb_define_method(recv, s + '=', f, 1);
  }
  return nil;  
};

function rb_mod_attr_accessor(recv, id, _) {
  rb_mod_attr_reader.apply(recv, arguments);
  rb_mod_attr_writer.apply(recv, arguments);
  return nil;
};

function rb_mod_const_set(mod, id, _, name, val) {
  // FIXME: should really check that id is valid... i.e. does it start with an
  // uppercase letter.
  rb_const_set(mod, name, val);
  return val;
};

function rb_obj_respond_to(obj, id, _, sym) {
  var f = rb_search_method(obj.klass, sym.ptr);
  if (f) return true;
  return false;
};

function rb_obj_is_instance_of(obj, id, _, c) {
  if (rb_class_real(obj.klass) == c) {
    return true;
  }
  return false;
};

function rb_obj_is_kind_of(obj, id, _, c) {
  var k = obj.klass;
  while (k) {
    
    if (k == c) return true;
    k = k.sup;
  }
  return false;
};

function rb_obj_tap(obj, id, _) {
  vm_yield(_, [obj]);
  return obj;
};

function rb_nil_to_s() {
  return "";
};

function rb_nil_inspect() {
  return "nil";
};

function rb_nil_and(n, id, _, obj) {
  return false;
};

function rb_nil_or(n, id, _, obj) {
  if (obj === nil || obj === false) return false;
  return true;
};

function rb_nil_xor(n, id, _, obj) {
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
  ensure nil matches null and undefined as well as itself
*/
function rb_nil_eql(self, id, _, other) {
  return (other === nil || other === null || other === undefined);
};

/**
  Object#instance_eval(&block)
  
  Currently, only takes blocks as params. Strings will be added once eval.js is
  finished. Throws error if string given (for now)
*/
function rb_obj_instance_eval(obj, id, _, str) {
  if (str) {
    return rb_vm_eval_str(obj, str);
  }
  if (_ == nil) throw "no block given for instance_eval."
  return _.call(_, obj, nil, nil, obj);
};

function rb_obj_mod_eval(obj, id, _) {
  if (_ == nil) throw "no block given for module_eval."
  return _.call(_, obj);
};

function rb_obj_instance_exec(obj, id, _) {
  // console.log("well, here first");
  if (_ == nil) throw "no block given for instance_exec"
  var args = Array.prototype.slice.call(arguments, 3);
  args.unshift(nil);
  args.unshift(nil);
  // recv
  args.unshift(obj); 
  // console.log("this bit in exec");
  return _.apply(_, args);
};

function rb_bool_to_s(bool) {
  return bool ? "true" : "false";
};

function rb_bool_and(bool, id, _, other) {
  return bool ? RTEST(other) : false;
};

function rb_bool_or(bool, id, _, other) {
  return bool ? true : RTEST(other);
};

function rb_bool_xor(bool, id, _, other) {
  return bool ? !RTEST(other) : RTEST(other);
};


function rb_nil_nil_q() {
  return true;
};

function rb_mod_include(cls, id, _, mod) {
  return rb_include_module(cls, mod);
};

function rb_mod_extend(cls, id, _, mod) {
  // possibly fix back to (cls.klass, mod)
  return rb_include_module(rb_singleton_class(cls), mod);
};

function rb_obj_send(recv, id, _, mid) {
  var args = Array.prototype.slice.call(arguments, 4);
  return vm_send(recv, mid, args, nil, 8);
};

function rb_class_initialize(cls, id, _) {
  var sup = (arguments.length > 3) ? arguments[3] : rb_cObject;
  // console.log("initializing from");
  // console.log(sup);
  // console.log("setting class to " + sup.iv_tbl.__classid__);
  // cls.klass = sup.klass;
  cls.m_tbl = {};
  cls.sup = sup;
  // console.log(sup);
  rb_make_metaclass(cls, sup.klass);
  rb_class_inherited(sup, cls);
  
  
  // console.log("new class");
  // console.log(cls);
  // console.log("done");
  return cls;
};

function rb_mod_alias_method(cls, id, _, new_name, old_name) {
  return rb_define_alias(cls, new_name.ptr, old_name.ptr);
};

/*
  raise
  =====
  Simply throws an error
  
  raise(string)
  =============
  simply throws an error with string as message. uses rb_eRuntimeError
  
  raise(exception, [string])
  ==========================
  throws error with the given exception as the exception class
*/
function rb_f_raise($, id, _) {
  // console.log("raising " + arguments[3]);
  var exc, msg = "";
  if (arguments.length > 3) {
    if (arguments[3].klass == rb_cString) {
      msg = arguments[3];
      // console.log("route a");
      exc = vm_send(rb_eRuntimeError, "new", [msg], nil, 0);
    }
    else if (arguments[3].flags & T_OBJECT) {
      // console.log("route b");
      exc = arguments[3];
    }
    else {
      if (arguments[4] && arguments[4].klass == rb_cString) {
        msg = arguments[2];
      }
      // console.log("route c");
      exc = vm_send(arguments[3], "new", [msg], nil, 0);
    }
  }
  else {
    throw "rb_f_raise needs atleast 3 args!!"
  }
  // exc.toString = function() {
    // return "an error string causing problems";
    // console.log(this);
    // return this.klass.iv_tbl.__classid__ + ": " + this.iv_tbl.message;
  // };
  // console.log("about to throw exc " + arguments[3]);
  // console.log(exc);
  throw exc
};

function rb_mod_ancestors(cls) {
  var a = [], k = cls;
  while (k) {
    a.push(k);
    k = k.sup;
  }
  return a;
};

function rb_mod_eqq(mod, id, _, arg) {
  // console.log("matching #=== " + mod);
  // console.log(mod);
  // console.log(" arg: " + arg);
  // console.log(arg);
  return rb_obj_is_kind_of(arg, "", nil, mod);
};

function rb_obj_object_id(obj) {
  if (obj.hash != undefined) return obj.hash;
  var hash = opal_yield_hash();
  obj.hash = hash;
  return hash;
};

function rb_mod_to_s(mod) {
  return mod.iv_tbl.__classid__;
};

function rb_class_superclass(klass) {
  return klass.sup;
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
  
  rb_define_method(rb_mKernel, "raise", rb_f_raise, -1);
  rb_define_method(rb_mKernel, "fail", rb_f_raise, -1);

  // rb_define_method(rb_mKernel, "taint", rb_obj_taint, 0);
  // rb_define_method(rb_mKernel, "tainted?", rb_obj_tainted, 0);
  // rb_define_method(rb_mKernel, "untaint", rb_obj_untaint, 0);
  // rb_define_method(rb_mKernel, "untrust", rb_obj_untrust, 0);
  // rb_define_method(rb_mKernel, "untrusted?", rb_obj_untrusted, 0);
  // rb_define_method(rb_mKernel, "trust", rb_obj_trust, 0);
  // rb_define_method(rb_mKernel, "freeze", rb_obj_freeze, 0);
  // rb_define_method(rb_mKernel, "frozen?", rb_obj_frozen_p, 0);
  
  rb_define_method(rb_mKernel, "object_id", rb_obj_object_id, 0);
  
  rb_define_method(rb_mKernel, "module_eval", rb_obj_mod_eval, 0);
  rb_define_method(rb_cModule, "module_eval", rb_obj_mod_eval, 0);
  rb_define_method(rb_mKernel, "instance_eval", rb_obj_instance_eval, 0);
  rb_define_method(rb_mKernel, "instance_exec", rb_obj_instance_exec, 0);
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
  rb_define_method(rb_cNilClass, "==", rb_nil_eql, 0);
  nil = { flags: T_OBJECT, klass: rb_cNilClass };
  // 
  // 
  // 
  // rb_define_method(rb_cModule, "freeze", rb_mod_freeze, 0);
  rb_define_method(rb_cModule, "===", rb_mod_eqq, 1);
  // rb_define_method(rb_cModule, "==", rb_obj_equal, 1);
  // rb_define_method(rb_cModule, "<=>",  rb_mod_cmp, 1);
  // rb_define_method(rb_cModule, "<",  rb_mod_lt, 1);
  // rb_define_method(rb_cModule, "<=", rb_class_inherited_p, 1);
  // rb_define_method(rb_cModule, ">",  rb_mod_gt, 1);
  // rb_define_method(rb_cModule, ">=", rb_mod_ge, 1);
  // rb_define_method(rb_cModule, "initialize_copy", rb_mod_init_copy, 1);
  rb_define_method(rb_cModule, "to_s", rb_mod_to_s, 0);
  // rb_define_method(rb_cModule, "included_modules", rb_mod_included_modules, 0);
  rb_define_method(rb_cModule, "extend", rb_mod_extend, 1);
  rb_define_method(rb_cModule, "include", rb_mod_include, 1);
  // rb_define_method(rb_cModule, "include?", rb_mod_include_p, 1);
  // rb_define_method(rb_cModule, "name", rb_mod_name, 0);
  rb_define_method(rb_cModule, "ancestors", rb_mod_ancestors, 0);
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
  
  rb_define_method(rb_cModule, "alias_method", rb_mod_alias_method, 2);
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
  rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);
  // rb_define_method(rb_cClass, "initialize_copy", rb_class_init_copy, 1);
  rb_define_method(rb_cClass, "superclass", rb_class_superclass, 0);
  // rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
  // rb_undef_method(rb_cClass, "extend_object");
  // rb_undef_method(rb_cClass, "append_features");
  // 
  rb_cBoolean = rb_define_class("Boolean", rb_cObject);
  Boolean.prototype.klass = rb_cBoolean;
  Boolean.prototype.flags = T_OBJECT | T_BOOLEAN;
  rb_define_method(rb_cBoolean, "to_s", rb_bool_to_s, 0);
  rb_define_method(rb_cBoolean, "inspect", rb_bool_to_s, 0);
  rb_define_method(rb_cBoolean, "&", rb_bool_and, 1);
  rb_define_method(rb_cBoolean, "|", rb_bool_or, 1);
  rb_define_method(rb_cBoolean, "^", rb_bool_xor, 1);

}