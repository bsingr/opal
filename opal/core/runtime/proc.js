/* 
 * proc.js
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

var rb_cProc, rb_eLocalJumpError;

function rb_obj_define_method(obj) {
  var klass = rb_singleton_class(obj);
  return rb_mod_define_method(obj);
};

function rb_mod_define_method(obj, id, _, sym) {
  // var _ = opal_block; opal_block = nil;
  var id;
  if (_ == nil) throw "#define_method no block given"
  if (sym.klass == rb_cString) {
    id = sym;
  } 
  else if (sym.klass == rb_cSymbol) {
    id = sym.ptr;
  }
  else {
    throw "#define_method expects a sym for name"
  }
  return rb_define_method(obj, id, _, -1);
};

function Init_Proc() {
  rb_cProc = rb_define_class("Proc", rb_cObject);
  Function.prototype.klass = rb_cProc;
  Function.prototype.flags = T_OBJECT | T_PROC;
  
  rb_define_method(rb_mKernel, "define_singleton_method", rb_obj_define_method, -1);
  rb_define_method(rb_cModule, "define_method", rb_mod_define_method, -1);
  
  rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
};
