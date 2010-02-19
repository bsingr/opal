// 
//  proc.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-19.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

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

function Init_Proc() {
  rb_cProc = rb_define_class("Proc", rb_cObject);
  
  rb_define_singleton_method(rb_cProc, "new", rb_proc_s_new, 0);
  
  rb_define_method(rb_cProc, "to_proc", rb_proc_to_proc, 0);
  rb_define_method(rb_cProc, "call", rb_proc_call, -1);
  rb_define_method(rb_cProc, "[]", rb_proc_call, -1);
};
