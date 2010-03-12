/* 
 * array.js
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

var rb_cArray;

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj) {
	  for (var i = 0; i< this.length; i++) {
	    if (this[i] == obj) return i;
	  }
	  return -1;
	};
};

function rb_ary_reject(ary) {
  var _ = opal_block; opal_block = nil;
  var res = [], v;
  for (var i = 0; i < ary.length; i++) {
    v = vm_yield(_, [ary[i]]);
    if (!RTEST(v)) res.push(ary[i]);
  }
  return rest;
};

function rb_ary_plus(a, b) {
  var c = [];
  for (var i = 0; i < a.length; i++) {
    c.push(a[i]);
  }
  for (var i = 0; i < b.length; i++) {
    c.push(b[i]);
  }
  return c;
};



function Init_Array() {
  
  rb_cArray = rb_define_class("Array", rb_cObject);
  Array.prototype.klass = rb_cArray;
  Array.prototype.flags = T_ARRAY | T_OBJECT;
  rb_define_method(rb_cArray, "reject", rb_ary_reject, 0);
  rb_define_method(rb_cArray, "+", rb_ary_plus, 1);
};
