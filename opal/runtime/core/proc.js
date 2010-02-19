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

var rb_cProc;

/*
  Converts a javascript function to a ruby compatible proc. Essentially wraps it
  to take a "self" param at start
*/
function rb_js_func_to_proc(func) {
  return function($) {
    var args = Array.prototype.slice.call(arguments, 1);
    return func.apply($, args);
  };
};

function rb_proc_to_proc(proc) {
  return proc;
};

function rb_proc_call(proc) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.unshift(nil);
  return proc.apply(proc, args);
};

function rb_proc_s_new(cls) {
  var _ = opal_block; opal_block = nil;
  if (_ == nil) throw "Proc#new no block given"
  return _;
};

function rb_proc_lambda(cls) {
  var _ = opal_block; opal_block = nil;
  if (_ == nil) throw "#lambda no block given"
  return _;
};

function rb_obj_define_method(obj) {
  var klass = rb_singleton_class(obj);
  return rb_mod_define_method(obj);
};

function rb_mod_define_method(obj, sym) {
  var _ = opal_block; opal_block = nil;
  if (_ == nil) throw "#define_method no block given"
  if (sym.klass !== rb_cSymbol) throw "#define_method expects a sym for name"
  return rb_define_method(obj, sym.ptr, _, -1);
};

function Init_Proc() {
  rb_cProc = rb_define_class("Proc", rb_cObject);
  
  rb_define_singleton_method(rb_cProc, "new", rb_proc_s_new, 0);
  
  rb_define_method(rb_cProc, "===", rb_proc_call, -1);
  rb_define_method(rb_cProc, "yield", rb_proc_call, -1);
  rb_define_method(rb_cProc, "call", rb_proc_call, -1);
  rb_define_method(rb_cProc, "[]", rb_proc_call, -1);
  rb_define_method(rb_cProc, "to_proc", rb_proc_to_proc, 0);
  
  rb_define_method(rb_mKernel, "lambda", rb_proc_lambda, 0);
  rb_define_method(rb_mKernel, "proc", rb_proc_s_new, 0);
  
  rb_define_method(rb_mKernel, "define_singleton_method", rb_obj_define_method, -1);
  rb_define_method(rb_cModule, "define_method", rb_mod_define_method, -1);
};
