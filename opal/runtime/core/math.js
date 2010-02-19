/* 
 * math.js
 * vienna
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

var rb_mMath;

function rb_math_atan2(m, y, x) {
  return Math.atan2(y, x);
};

function rb_math_cos(m, x) {
  return Math.cos(x);
};

function rb_math_sin(m, x) {
  return Math.sin(x);
};

function rb_math_tan(m, x) {
  return Math.tan(x);
};

function rb_math_acos(m, x) {
  return Math.acos(x);
};

function rb_math_asin(m, x) {
  return Math.asin(x);
};

function rb_math_atan(m, x) {
  return Math.atan(x);
};

function rb_math_exp(m, x) {
  return Math.exp(x);
};

function rb_math_log(m, x) {
  return Math.log(x);
};

function rb_math_sqrt(m, x) {
  return Math.sqrt(x);
};

function Init_Math() {
  rb_mMath = rb_define_module("Math");
  
  rb_const_set(rb_mMath, "PI", Math.PI);
  rb_const_set(rb_mMath, "E", Math.E);
  
  rb_define_singleton_method(rb_mMath, "atan2", rb_math_atan2, 2);
  
  rb_define_singleton_method(rb_mMath, "cos", rb_math_cos, 1);
  rb_define_singleton_method(rb_mMath, "sin", rb_math_sin, 1);
  rb_define_singleton_method(rb_mMath, "tan", rb_math_tan, 1);
  
  rb_define_singleton_method(rb_mMath, "acos", rb_math_acos, 1);
  rb_define_singleton_method(rb_mMath, "asin", rb_math_asin, 1);
  rb_define_singleton_method(rb_mMath, "atan", rb_math_atan, 1);
  
  rb_define_singleton_method(rb_mMath, "exp", rb_math_exp, 1);
  rb_define_singleton_method(rb_mMath, "log", rb_math_log, 1);
  rb_define_singleton_method(rb_mMath, "sqrt", rb_math_sqrt, 1);
};
