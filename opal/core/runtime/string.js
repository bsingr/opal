/* 
 * string.js
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
 
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };


var rb_cString, rb_cSymbol;

var RSymbol = function(ptr) {
  this.hash = opal_yield_hash();
  this.flags = T_OBJECT | T_SYMBOL;
  this.klass = rb_cSymbol ;
  this.toString = function() {
    return "#<Symbol:0x000000 @ptr=\"" + this.ptr + "\">";
  };
  this.ptr = ptr;
  return this;
};

var rb_sym_table = { };

function ID2SYM(id) {
 if (rb_sym_table.hasOwnProperty(id)) {
   return rb_sym_table[id];
 }
 var sym = new RSymbol(id);
 rb_sym_table[id] = sym
 return sym;
};

function Init_String() {
  
  rb_cString = rb_define_class("String", rb_cObject);
  String.prototype.klass = rb_cString;
  String.prototype.flags = T_OBJECT | T_STRING;
  rb_include_module(rb_cString, rb_mComparable);

  rb_cSymbol = rb_define_class("Symbol", rb_cObject);
  rb_include_module(rb_cSymbol, rb_mComparable);
};
