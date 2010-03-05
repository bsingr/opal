// 
//  io.js
//  vienna
//  
//  Created by Adam Beynon on 2010-03-05.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var rb_eIOError, rb_cIO;

var rb_stdout;

/**
  AJAX IO
  
  Basics of stdout. Stdout by default simply maps to the browser's debugger, i.e
  console.log etc. It can also be mapped to an Ajax/Comet connection to push 
  log statements out to the vn-server, or any other backend. This makes it 
  easier to debug applications running on iphone/ipad etc, where the debug
  console is not easily accessible. Requires app to be run through vn-server.
*/
var opal_oIOAjax;

/**
  cAjaxIO#puts(str)
  
  Write the given string to the stdout ajax connection
*/
function opal_oIOAjax_puts(ajax, id, _, str) {
  console.log("need to write to ajax stdout: " + str);
};

/**
  Out for writing to Browser's console.log debug console
*/
var opal_oIOConsole;

/**
  opal_oIOConsole#puts(str)
  
  console.log..
*/
function opal_oIOConsole_puts(cons, id, _, str) {
  console.log(vm_send(str, "inspect", [], nil, 8));
};

/**
  Kernel#puts(str)
  
  Puts the string to the stdout variable: rb_stdout and $stdout. By default uses
  the native console.log in thw browser, but can be tied up to vn-server for
  sending console logs over an ajax connection for remote debugging.
*/
function rb_f_puts(recv, id, _) {
  var argv = Array.prototype.slice.call(arguments, 3)
  for (var i = 0; i < argv.length; i++) {
    vm_send(rb_stdout, "puts", [argv[i]], nil, 8);
  }
};

function Init_IO() {
  rb_eIOError = rb_define_class("IOError", rb_eStandardError);
  
  rb_define_method(rb_mKernel, "puts", rb_f_puts, -1);
  
  rb_cIO = rb_define_class("IO", rb_cObject);
  rb_include_module(rb_cIO, rb_mEnumerable);
  
  opal_oIOAjax = rb_obj_alloc(rb_cIO);
  rb_define_singleton_method(opal_oIOAjax, "puts", opal_oIOAjax_puts, 1);
  
  opal_oIOConsole = rb_obj_alloc(rb_cIO);
  rb_define_singleton_method(opal_oIOConsole, "puts", opal_oIOConsole_puts, 1);
  
  // by default, stdout point to opal_oIOConsole
  rb_stdout = opal_oIOConsole;
};
