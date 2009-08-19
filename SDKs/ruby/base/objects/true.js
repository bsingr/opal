/* 
 * true.js
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

function true_to_s(obj) {
 return "true";
};

function true_and(obj, obj2) {
 return RTEST(obj2) ? Qtrue : Qfalse;
};

function true_or(obj, obj2) {
 return Qtrue;
};

function true_xor(obj, obj2) {
 return RTEST(obj2) ? Qfalse : Qtrue;
};

rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
rb_define_method(rb_cTrueClass, 'to_s', true_to_s, 0);
rb_define_method(rb_cTrueClass, '&', true_and, 1);
rb_define_method(rb_cTrueClass, '|', true_or, 1);
rb_define_method(rb_cTrueClass, '^', true_xor, 1);
rb_undef_alloc_func(rb_cTrueClass);
rb_undef_method(CLASS_OF(rb_cTrueClass), 'new');
rb_define_global_const('TRUE', Qtrue);