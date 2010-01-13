/* 
 * compar.js
 * charles
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


var rb_mComparable;

function rb_cmp_equal(x, y) {
  if (x == y) return true;
  // rescue..
}

function rb_cmp_gt(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c > 0) return true;
  return false;
}

function rb_cmp_ge(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c >= 0) return true;
  return false;
}

function rb_cmp_lt(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c < 0) return true;
  return false;
}

function rb_cmp_le(x, y) {
  var c = rb_funcall(x, "<=>", 1, y);
  if (c <= 0) return true;
  return false;
}

function rb_cmp_between(obj, min, max) {
  if (RTEST(rb_cmp_lt(obj, min))) return false;
  if (RTEST(rb_cmp_gt(obj, max))) return false;
  return true;
}

function Init_Comparable() {
  rb_mComparable = rb_define_module("Comparable");
  rb_define_method(rb_mComparable, "==", rb_cmp_equal, 1);
  rb_define_method(rb_mComparable, ">", rb_cmp_gt, 1);
  rb_define_method(rb_mComparable, ">=", rb_cmp_ge, 1);
  rb_define_method(rb_mComparable, "<", rb_cmp_lt, 1);
  rb_define_method(rb_mComparable, "<=", rb_cmp_le, 1);
  rb_define_method(rb_mComparable, "between?", rb_cmp_between, 2);
}
