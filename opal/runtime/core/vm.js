/* 
 * vm.js
 * vienna
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

function Init_VM() {
  
};

var opal_top_self;

function opal_main_to_s() {
  return "main";
};

function Init_top_self() {
  opal_top_self = new RObject();
  opal_top_self.klass = rb_cObject;
  FL_SET(opal_top_self, T_OBJECT);
  rb_define_singleton_method(opal_top_self, "to_s", opal_main_to_s, 0);
};

function rb_method_missing(recv) {
  throw "method missing"
};

function Init_vm_eval() {
  rb_define_private_method(rb_cBasicObject, "method_missing", rb_method_missing, -1);
};

function vm_defineclass(base, sup, id, body, type) {
  var klass;
  switch (type) {
    case 0:
      // get right superclass
      if (sup == nil) sup = rb_cObject;
      // get right base for class
      if (base.flags & T_OBJECT) base = rb_class_real(base.klass);
      
      if (rb_const_defined_at(base, id)) {
        klass = rb_const_get_at(base, id);
      }
      else {
        klass = rb_define_class_id(id, sup);
        rb_name_class(klass, id);
        rb_const_set(base, id, klass);
        klass.parent = base;
      }
      break;
    default:
      throw "unknown vm_defineclass type: " + type
  }
  // return result of executing body
  return body(klass);
};

function vm_definemethod(base, id, body, is_singleton) {
  if (is_singleton) {
    return rb_define_method(rb_singleton_class(base), id, body, 0);
  }
  else {
    return rb_define_method(base, id, body, 0);
  }
};
