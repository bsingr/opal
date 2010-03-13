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

var rb_cBasicObject, rb_cObject, rb_cModule, rb_cClass;


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

function rb_mod_const_set(mod, id, _, name, val) {
  // FIXME: should really check that id is valid... i.e. does it start with an
  // uppercase letter.
  rb_const_set(mod, name, val);
  return val;
};

function rb_obj_mod_eval(obj, id, _) {
  if (_ == nil) throw "no block given for module_eval."
  return _.call(_, obj);
};


function rb_class_initialize(cls, id, _) {
  var sup = (arguments.length > 3) ? arguments[3] : rb_cObject;
  cls.m_tbl = {};
  cls.sup = sup;
  // console.log(sup);
  rb_make_metaclass(cls, sup.klass);
  rb_class_inherited(sup, cls);
  
  return cls;
};

function rb_mod_alias_method(cls, id, _, new_name, old_name) {
  return rb_define_alias(cls, new_name.ptr, old_name.ptr);
};

function Init_Object() {
  var metaclass;
  rb_cBasicObject = boot_defclass('BasicObject', null);
  rb_cObject = boot_defclass('Object', rb_cBasicObject);
  rb_cModule = boot_defclass('Module', rb_cObject);
  rb_cClass = boot_defclass('Class', rb_cModule);
  
  rb_const_set(rb_cObject, "BasicObject", rb_cBasicObject);

  metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
  metaclass = rb_make_metaclass(rb_cObject, metaclass);
  metaclass = rb_make_metaclass(rb_cModule, metaclass);
  metaclass = rb_make_metaclass(rb_cClass, metaclass);

  boot_defmetametaclass(rb_cModule, metaclass);
  boot_defmetametaclass(rb_cObject, metaclass);
  boot_defmetametaclass(rb_cBasicObject, metaclass);
  

  rb_mKernel = rb_define_module("Kernel");
  rb_include_module(rb_cObject, rb_mKernel);
  
  rb_define_method(rb_mKernel, "module_eval", rb_obj_mod_eval, 0);
  rb_define_method(rb_cModule, "module_eval", rb_obj_mod_eval, 0);
   
  

  
  // These methods will be needed early, so boot them here.
  rb_define_method(rb_cModule, "alias_method", rb_mod_alias_method, 2);
  rb_define_method(rb_cModule, "const_set", rb_mod_const_set, 2);
  rb_define_method(rb_cClass, "allocate", rb_obj_alloc, 0);
  rb_define_method(rb_cClass, "new", rb_class_new_instance, -1);
  rb_define_method(rb_cClass, "initialize", rb_class_initialize, -1);

};
