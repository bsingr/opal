/* 
 * base.js
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
require('class');
require('data');
require('false');
require('global');
require('kernel');
require('module');
require('nil');
require('true');

var metaclass;
metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
metaclass = rb_make_metaclass(rb_cObject, metaclass);
metaclass = rb_make_metaclass(rb_cModule, metaclass);
metaclass = rb_make_metaclass(rb_cClass, metaclass);
boot_defmetametaclass(rb_cModule, metaclass);
boot_defmetametaclass(rb_cObject, metaclass);
boot_defmetametaclass(rb_cBasicObject, metaclass);


rb_define_global_function('sprintf', rb_f_sprintf, -1); /* in sprintf.c */
rb_define_global_function('format', rb_f_sprintf, -1);  /* in sprintf.c */

rb_define_global_function('Integer', rb_f_integer, 1);
rb_define_global_function('Float', rb_f_float, 1);


function rb_f_string(obj, arg) {
  return rb_String(arg);
};
rb_define_global_function('String', rb_f_string, 1);


function rb_f_array(obj, arg) {
  return rb_Array(arg);
};
rb_define_global_function('Array', rb_f_array, 1);
