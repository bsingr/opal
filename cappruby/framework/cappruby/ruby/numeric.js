/* 
 * numeric.js
 * cappruby
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

rb_cNumeric = nil;

function rb_num_to_s(num, sel) {
  return new String(num);
};

function rb_num_uplus(num, sel) {
  return num;
};

function rb_num_uminus(num, sel) {
  return -num;
};

function rb_num_plus(a, sel, b) {
  return a + b;
};

function rb_num_minus(a, sel, b) {
  return a - b;
};

function rb_num_mul(a, sel, b) {
  return a * b;
};

function rb_num_div(a, sel, b) {
  return a / b;
};

function rb_num_modulo(a, sel, b) {
  return a % b;
};

function rb_num_pow(a, sel, b) {
  return Math.pow(a, b);
};

function rb_num_equal(a, sel, b) {
  return a == b;
};

function rb_num_cmp(a, sel, b) {
  if (a == b) return 0;
  if (a < b) return -1;
  return 1;
};

function rb_num_gt(a, sel, b) {
  return a > b;
};

function rb_num_ge(a, sel, b) {
  return a >= b;
};

function rb_num_lt(a, sel, b) {
  return a < b;
};

function rb_num_le(a, sel, b) {
  return a <= b;
};

function rb_num_rev(a, sel) {
  return ~a;
};

function rb_num_and(a, sel, b) {
  return a & b;
};

function rb_num_or(a, sel, b) {
  return a | b;
};

function rb_num_xor(a, sel, b) {
  return (a || b) && !(a && b);
};

function rb_num_lshift(a, sel, b) {
  return a << b;
};

function rb_num_rshift(a, sel, b) {
  return a >> b;
};

function Init_Numeric() {
  rb_cNumeric = objj_getClass("CPNumber");
  rb_const_set(rb_cObject, "Fixnum", rb_cNumeric);
  rb_const_set(rb_cObject, "Number", rb_cNumeric);
  
  // rb_define_method(rb_cNumeric, "singleton_method_added", rb_num_sadded, 1);
  // rb_include_module(rb_cNumeric, rb_mComparable);
  // rb_define_method(rb_cNumeric, "initialize_copy", rb_num_init_copy, 1);
  // rb_define_method(rb_cNumeric, "coerce", rb_num_coerce, 1);
  
  rb_define_method(rb_cNumeric, "+@", rb_num_uplus, 0);
  rb_define_method(rb_cNumeric, "-@", rb_num_uminus, 0);
  rb_define_method(rb_cNumeric, "eql?", rb_num_equal, 1);
  // rb_define_method(rb_cNumeric, "quo", rb_num_quo, 1);
  // rb_define_method(rb_cNumeric, "fdiv", rb_num_fdiv, 1);
  // rb_define_method(rb_cNumeric, "div", rb_num_div, 1);
  // rb_define_method(rb_cNumeric, "divmod", rb_num_divmod, 1);
  // rb_define_method(rb_cNumeric, "modulo", rb_num_modulo, 1);
  // rb_define_method(rb_cNumeric, "remainder", rb_num_remainder, 1);
  // rb_define_method(rb_cNumeric, "abs", rb_num_abs, 0);
  // rb_define_method(rb_cNumeric, "magnitude", rb_num_abs, 0);
  // rb_define_method(rb_cNumeric, "to_int", rb_num_to_i, 0);

  // rb_define_method(rb_cNumeric, "real?", rb_num_real_p, 0);
  // rb_define_method(rb_cNumeric, "integer?", rb_num_int_p, 0);
  // rb_define_method(rb_cNumeric, "zero?", rb_num_zero_p, 0);
  // rb_define_method(rb_cNumeric, "nonzero?", rb_num_nonzero_p, 0);

  // rb_define_method(rb_cNumeric, "floor", rb_num_floor, 0);
  // rb_define_method(rb_cNumeric, "ceil", rb_num_ceil, 0);
  // rb_define_method(rb_cNumeric, "round", rb_num_round, -1);
  // rb_define_method(rb_cNumeric, "truncate", rb_num_truncate, 0);
  // rb_define_method(rb_cNumeric, "step", rb_num_step, -1);

  // rb_define_method(rb_cNumeric, "odd?", rb_num_odd_p, 0);
  // rb_define_method(rb_cNumeric, "even?", rb_num_even_p, 0);
  // rb_define_method(rb_cNumeric, "upto", rb_num_upto, 1);
  // rb_define_method(rb_cNumeric, "downto", rb_num_downto, 1);
  // rb_define_method(rb_cNumeric, "times", rb_num_dotimes, 0);
  // rb_define_method(rb_cNumeric, "succ", rb_num_succ, 0);
  // rb_define_method(rb_cNumeric, "next", rb_num_succ, 0);
  // rb_define_method(rb_cNumeric, "pred", rb_num_pred, 0);
  // rb_define_method(rb_cNumeric, "chr", rb_num_chr, -1);
  // rb_define_method(rb_cNumeric, "ord", rb_num_ord, 0);
  // rb_define_method(rb_cNumeric, "to_i", rb_num_to_i, 0);
  rb_define_method(rb_cNumeric, "to_s", rb_num_to_s, -1);
  // rb_define_method(rb_cNumeric, "to_f", rb_num_to_f, 0);

  rb_define_method(rb_cNumeric, "+", rb_num_plus, 1);
  rb_define_method(rb_cNumeric, "-", rb_num_minus, 1);
  rb_define_method(rb_cNumeric, "*", rb_num_mul, 1);
  rb_define_method(rb_cNumeric, "/", rb_num_div, 1);
  rb_define_method(rb_cNumeric, "%", rb_num_modulo, 1);
  rb_define_method(rb_cNumeric, "**", rb_num_pow, 1);

  rb_define_method(rb_cNumeric, "==", rb_num_equal, 1);
  rb_define_method(rb_cNumeric, "<=>", rb_num_cmp, 1);
  rb_define_method(rb_cNumeric, ">", rb_num_gt, 1);
  rb_define_method(rb_cNumeric, ">=", rb_num_ge, 1);
  rb_define_method(rb_cNumeric, "<", rb_num_lt, 1);
  rb_define_method(rb_cNumeric, "<=", rb_num_le, 1);

  rb_define_method(rb_cNumeric, "~", rb_num_rev, 0);
  rb_define_method(rb_cNumeric, "&", rb_num_and, 1);
  rb_define_method(rb_cNumeric, "|", rb_num_or,  1);
  rb_define_method(rb_cNumeric, "^", rb_num_xor, 1);
  // rb_define_method(rb_cNumeric, "[]", rb_num_aref, 1);

  rb_define_method(rb_cNumeric, "<<", rb_num_lshift, 1);
  rb_define_method(rb_cNumeric, ">>", rb_num_rshift, 1);
};
