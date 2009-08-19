/* 
 * nil.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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
 
require('basic_object'); 

/**
  @class NilClass
  
  The class of the singleton object <code>nil</code>
*/
rb_cNilClass = rb_define_class('NilClass', rb_cObject);

function nil_to_i(obj) {
  return 0;
};

function nil_to_f(obj) {
  return 0.0;
};

function nil_to_s(obj) {
  return "";
};

function nil_to_a(obj) {
  return [];
}

function nil_inspect(obj) {
  return "inspect";
};


rb_define_method(rb_cNilClass, 'to_i', nil_to_i, 0);
rb_define_method(rb_cNilClass, 'to_f', nil_to_f, 0);
rb_define_method(rb_cNilClass, 'to_s', nil_to_s, 0);
rb_define_method(rb_cNilClass, 'to_a', nil_to_a, 0);
rb_define_method(rb_cNilClass, 'inspect', nil_inspect, 0);
rb_define_method(rb_cNilClass, '&', false_and, 1);
rb_define_method(rb_cNilClass, '|', false_or, 1);
rb_define_method(rb_cNilClass, '^', false_xor, 1);

rb_define_method(rb_cNilClass, 'nil?', rb_true, 0);
rb_undef_alloc_func(rb_cNilClass);
rb_undef_method(CLASS_OF(rb_cNilClass), 'new');
rb_define_global_const('NIL', Qnil);
