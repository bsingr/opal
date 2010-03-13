/* 
 * init.js
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
 
 var opal_boot_files = [];
 
/**
  Basically start opal.
*/
function ruby_init() {
  rb_call_inits();
  // console.log(opal_boot_files);
  for (var i = 0; i < opal_boot_files.length; i++) {
    (opal_boot_files[i])(opal_top_self);
  }
};

/**
  embed script name/type
*/
function ruby_script(name) {
  
};

var rb_cArray;

var rb_cDir;

var rb_mComparable;

var rb_mEnumerable;

var rb_cNumber;

var rb_cBoolean;

var rb_cNilClass;


/**
  Init core.
*/
function rb_call_inits() {
  Init_Object();
  
  // NilClass
  rb_cNilClass = rb_define_class("NilClass", rb_cObject);
  nil = {flags:T_OBJECT,klass:rb_cNilClass, toString:function(){return "nil";}};
  
  // Boolean
  rb_cBoolean = rb_define_class("Boolean", rb_cObject);
  Boolean.prototype.klass = rb_cBoolean;
  Boolean.prototype.flags = T_OBJECT | T_BOOLEAN;
  
  // Built-in constants
  rb_const_set(rb_cObject, "RUBY_VERSION", "1.9.1");
  rb_const_set(rb_cObject, "RUBY_PATCHLEVEL", 191);
  rb_const_set(rb_cObject, "RUBY_PLATFORM", "opal");
  rb_const_set(rb_cObject, "RUBY_RELEASE_DATE", "2010.02.27");
  
  Init_top_self();
  
  // Array
  rb_cArray = rb_define_class("Array", rb_cObject);
  Array.prototype.klass = rb_cArray;
  Array.prototype.flags = T_ARRAY | T_OBJECT;
  
  // Comparable
  rb_mComparable = rb_define_module("Comparable");
  
  // Enumerable
  rb_mEnumerable = rb_define_module("Enumerable");
  
  // Number
  rb_cNumber = rb_define_class("Number", rb_cObject);
  Number.prototype.klass = rb_cNumber;
  Number.prototype.flags = T_NUMBER | T_OBJECT;
  
  rb_include_module(rb_cNumber, rb_mComparable);
  
  // String
  rb_cString = rb_define_class("String", rb_cObject);
  String.prototype.klass = rb_cString;
  String.prototype.flags = T_OBJECT | T_STRING;
  rb_include_module(rb_cString, rb_mComparable);
  
  // Symbol
  rb_cSymbol = rb_define_class("Symbol", rb_cObject);
  rb_include_module(rb_cSymbol, rb_mComparable);
  
  Init_Exception();
  
  // Hash
  rb_cHash = rb_define_class("Hash", rb_cObject);
  
  Init_Range();
  Init_Proc();
  Init_Regexp();
  Init_IO();
  Init_File();
  
  // Dir
  rb_cDir = rb_define_class("Dir", rb_cObject);
  
  Init_VM();
  Init_vm_eval();
  Init_load();
  Init_JSON();
};
