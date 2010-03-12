/* 
 * number.js
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


var rb_cNumber;


function rb_num_downto(num, to) {
  var _ = opal_block; opal_block = nil;
  for (var i = num; i >= to; i--) {
    vm_yield(_, [i]);
  }
  return num;
};

function rb_num_upto(num, id, _, stop) {
  console.log("from " + num + " to " + stop);
  if (stop < num) return num;
  for (var i = num; i <= stop; i++) {
    vm_yield(_, [i]);
  }
  return num;
};


function rb_num_step(num, limit, step) {
  var _ = opal_block; opal_block = nil;
  for (var i = num; i <= limit; i+= step) {
    vm_yield(_, [i]);
  }
  return num;
};

function Init_Number() {
  
  rb_cNumber = rb_define_class("Number", rb_cObject);
  rb_const_set(rb_cObject, "Fixnum", rb_cNumber);
  rb_const_set(rb_cObject, "Float", rb_cNumber);
  Number.prototype.klass = rb_cNumber;
  Number.prototype.flags = T_NUMBER | T_OBJECT;
  
  rb_include_module(rb_cNumber, rb_mComparable);


  rb_define_method(rb_cNumber, "step", rb_num_step, -1);

  rb_define_method(rb_cNumber, "upto", rb_num_upto, 1);
  rb_define_method(rb_cNumber, "downto", rb_num_downto, 1);
  
};
