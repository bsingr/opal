/* 
 * number.js
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

var rb_cNumber;

function rb_num_plus(a, b) {
  return a + b;
}

function rb_num_minus(a, b) {
  return a - b;
}

function rb_num_mul(a, b) {
  return a * b;
}

function rb_num_div(a, b) {
  return a / b;
}

function rb_num_modulo(a, b) {
  return a % b;
}

function rb_num_pow(a, b) {
  return Math.pow(a, b);
}






function rb_num_gt(a, b) {
  return a > b;
}

function rb_num_ge(a, b) {
  return a >= b;
}

function rb_num_lt(a, b) {
  return a < b;
}

function rb_num_le(a, b) {
  return a <= b;
}


function Init_Number() {
  
  rb_cNumber = rb_define_class("Number", rb_cObject);
  Number.prototype.klass = rb_cNumber;
  Number.prototype.flags = T_NUMBER;
  
  // rb_define_method(rb_cNumber, "singleton_method_added", rb_num_sadded, 1);
  // rb_include_module(rb_cNumber, rb_mComparable);
  // rb_define_method(rb_cNumber, "initialize_copy", rb_num_init_copy, 1);
  // rb_define_method(rb_cNumber, "coerce", rb_num_coerce, 1);
  
  // rb_define_method(rb_cNumber, "+@", rb_num_uplus, 0);
  // rb_define_method(rb_cNumber, "-@", rb_num_uminus, 0);
  // rb_define_method(rb_cNumber, "<=>", rb_num_cmp, 1);
  // rb_define_method(rb_cNumber, "eql?", rb_num_eql, 1);
  // rb_define_method(rb_cNumber, "quo", rb_num_quo, 1);
  // rb_define_method(rb_cNumber, "fdiv", rb_num_fdiv, 1);
  // rb_define_method(rb_cNumber, "div", rb_num_div, 1);
  // rb_define_method(rb_cNumber, "divmod", rb_num_divmod, 1);
  // rb_define_method(rb_cNumber, "modulo", rb_num_modulo, 1);
  // rb_define_method(rb_cNumber, "remainder", rb_num_remainder, 1);
  // rb_define_method(rb_cNumber, "abs", rb_num_abs, 0);
  // rb_define_method(rb_cNumber, "magnitude", rb_num_abs, 0);
  // rb_define_method(rb_cNumber, "to_int", rb_num_to_i, 0);

  // rb_define_method(rb_cNumber, "real?", rb_num_real_p, 0);
  // rb_define_method(rb_cNumber, "integer?", rb_num_int_p, 0);
  // rb_define_method(rb_cNumber, "zero?", rb_num_zero_p, 0);
  // rb_define_method(rb_cNumber, "nonzero?", rb_num_nonzero_p, 0);

  // rb_define_method(rb_cNumber, "floor", rb_num_floor, 0);
  // rb_define_method(rb_cNumber, "ceil", rb_num_ceil, 0);
  // rb_define_method(rb_cNumber, "round", rb_num_round, -1);
  // rb_define_method(rb_cNumber, "truncate", rb_num_truncate, 0);
  // rb_define_method(rb_cNumber, "step", rb_num_step, -1);

  // rb_define_method(rb_cNumber, "odd?", rb_num_odd_p, 0);
  // rb_define_method(rb_cNumber, "even?", rb_num_even_p, 0);
  // rb_define_method(rb_cNumber, "upto", rb_num_upto, 1);
  // rb_define_method(rb_cNumber, "downto", rb_num_downto, 1);
  // rb_define_method(rb_cNumber, "times", rb_num_dotimes, 0);
  // rb_define_method(rb_cNumber, "succ", rb_num_succ, 0);
  // rb_define_method(rb_cNumber, "next", rb_num_succ, 0);
  // rb_define_method(rb_cNumber, "pred", rb_num_pred, 0);
  // rb_define_method(rb_cNumber, "chr", rb_num_chr, -1);
  // rb_define_method(rb_cNumber, "ord", rb_num_ord, 0);
  // rb_define_method(rb_cNumber, "to_i", rb_num_to_i, 0);
  // rb_define_method(rb_cNumber, "to_s", rb_num_to_s, -1);
  // rb_define_method(rb_cNumber, "to_f", rb_num_to_f, 0);

  rb_define_method(rb_cNumber, "+", rb_num_plus, 1);
  rb_define_method(rb_cNumber, "-", rb_num_minus, 1);
  rb_define_method(rb_cNumber, "*", rb_num_mul, 1);
  rb_define_method(rb_cNumber, "/", rb_num_div, 1);
  rb_define_method(rb_cNumber, "%", rb_num_modulo, 1);
  rb_define_method(rb_cNumber, "**", rb_num_pow, 1);

  // rb_define_method(rb_cNumber, "==", rb_num_equal, 1);
  // rb_define_method(rb_cNumber, "<=>", rb_num_cmp, 1);
  rb_define_method(rb_cNumber, ">", rb_num_gt, 1);
  rb_define_method(rb_cNumber, ">=", rb_num_ge, 1);
  rb_define_method(rb_cNumber, "<", rb_num_lt, 1);
  rb_define_method(rb_cNumber, "<=", rb_num_le, 1);

  // rb_define_method(rb_cNumber, "~", rb_num_rev, 0);
  // rb_define_method(rb_cNumber, "&", rb_num_and, 1);
  // rb_define_method(rb_cNumber, "|", rb_num_or,  1);
  // rb_define_method(rb_cNumber, "^", rb_num_xor, 1);
  // rb_define_method(rb_cNumber, "[]", rb_num_aref, 1);

  // rb_define_method(rb_cNumber, "<<", rb_num_lshift, 1);
  // rb_define_method(rb_cNumber, ">>", rb_num_rshift, 1);
}
