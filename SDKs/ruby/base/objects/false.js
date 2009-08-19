/* 
 * false.js
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

function false_to_s(obj) {
 return "false";
};

function false_and(obj, obj2) {
 return Qfalse;
};

function false_or(obj, obj2) {
 return RTEST(obj2) ? Qtrue : Qfalse;
};

function false_xor(obj, obj2) {
 return RTEST(obj2) ? Qtrue : Qfalse;
};

rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
rb_define_method(rb_cFalseClass, 'to_s', false_to_s, 0);
rb_define_method(rb_cFalseClass, '&', false_and, 1);
rb_define_method(rb_cFalseClass, '|', false_or, 1);
rb_define_method(rb_cFalseClass, '^', false_xor, 1);
rb_undef_alloc_func(rb_cFalseClass);
rb_undef_method(CLASS_OF(rb_cFalseClass), 'new');
rb_define_global_const('FALSE', Qfalse);
