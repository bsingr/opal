/* 
 * string.js
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
 
Number.prototype.klass = VN.cFixnum ;
Number.prototype.type = VN.T_FLOAT ; // what to put here? hmmmm....

VN.cNumeric = VN.define_class('Numeric', VN.cObject) ;

VN.define_method(VN.cNumeric, 'singleton_method_added', VN.num_sadded, 1) ;
// VN.include_module(VN.cNumeric, VN.mComparable);
VN.define_method(VN.cNumeric, 'initialize_copy', VN.num_init_copy, 1);
VN.define_method(VN.cNumeric, 'coerce', VN.num_coerce, 1);



VN.define_method(VN.cNumeric, "+@", num_uplus, 0);
VN.define_method(VN.cNumeric, "-@", num_uminus, 0);
VN.define_method(VN.cNumeric, "<=>", num_cmp, 1);
VN.define_method(VN.cNumeric, "eql?", num_eql, 1);
VN.define_method(VN.cNumeric, "quo", num_quo, 1);
VN.define_method(VN.cNumeric, "fdiv", num_fdiv, 1);
VN.define_method(VN.cNumeric, "div", num_div, 1);
VN.define_method(VN.cNumeric, "divmod", num_divmod, 1);
VN.define_method(VN.cNumeric, "modulo", num_modulo, 1);
VN.define_method(VN.cNumeric, "remainder", num_remainder, 1);
VN.define_method(VN.cNumeric, "abs", num_abs, 0);
VN.define_method(VN.cNumeric, "magnitude", num_abs, 0);
VN.define_method(VN.cNumeric, "to_int", num_to_int, 0);

VN.define_method(VN.cNumeric, "real?", num_real_p, 0);
VN.define_method(VN.cNumeric, "integer?", num_int_p, 0);
VN.define_method(VN.cNumeric, "zero?", num_zero_p, 0);
VN.define_method(VN.cNumeric, "nonzero?", num_nonzero_p, 0);

VN.define_method(VN.cNumeric, "floor", num_floor, 0);
VN.define_method(VN.cNumeric, "ceil", num_ceil, 0);
VN.define_method(VN.cNumeric, "round", num_round, -1);
VN.define_method(VN.cNumeric, "truncate", num_truncate, 0);
VN.define_method(VN.cNumeric, "step", num_step, -1);

VN.cInteger = VN.define_class("Integer", VN.cNumeric);
VN.undef_alloc_func(VN.cInteger);
VN.undef_method(CLASS_OF(VN.cInteger), "new");

VN.define_method(VN.cInteger, "integer?", int_int_p, 0);
VN.define_method(VN.cInteger, "odd?", int_odd_p, 0);
VN.define_method(VN.cInteger, "even?", int_even_p, 0);
VN.define_method(VN.cInteger, "upto", int_upto, 1);
VN.define_method(VN.cInteger, "downto", int_downto, 1);
VN.define_method(VN.cInteger, "times", int_dotimes, 0);
VN.define_method(VN.cInteger, "succ", int_succ, 0);
VN.define_method(VN.cInteger, "next", int_succ, 0);
VN.define_method(VN.cInteger, "pred", int_pred, 0);
VN.define_method(VN.cInteger, "chr", int_chr, -1);
VN.define_method(VN.cInteger, "ord", int_ord, 0);
VN.define_method(VN.cInteger, "to_i", int_to_i, 0);
VN.define_method(VN.cInteger, "to_int", int_to_i, 0);
VN.define_method(VN.cInteger, "floor", int_to_i, 0);
VN.define_method(VN.cInteger, "ceil", int_to_i, 0);
VN.define_method(VN.cInteger, "truncate", int_to_i, 0);
VN.define_method(VN.cInteger, "round", int_round, -1);

VN.cFixnum = VN.define_class("Fixnum", VN.cInteger);

VN.define_method(VN.cFixnum, "to_s", fix_to_s, -1);

VN.define_method(VN.cFixnum, "-@", fix_uminus, 0);
VN.define_method(VN.cFixnum, "+", fix_plus, 1);
VN.define_method(VN.cFixnum, "-", fix_minus, 1);
VN.define_method(VN.cFixnum, "*", fix_mul, 1);
VN.define_method(VN.cFixnum, "/", fix_div, 1);
VN.define_method(VN.cFixnum, "div", fix_idiv, 1);
VN.define_method(VN.cFixnum, "%", fix_mod, 1);
VN.define_method(VN.cFixnum, "modulo", fix_mod, 1);
VN.define_method(VN.cFixnum, "divmod", fix_divmod, 1);
VN.define_method(VN.cFixnum, "fdiv", fix_fdiv, 1);
VN.define_method(VN.cFixnum, "**", fix_pow, 1);

VN.define_method(VN.cFixnum, "abs", fix_abs, 0);
VN.define_method(VN.cFixnum, "magnitude", fix_abs, 0);

VN.define_method(VN.cFixnum, "==", fix_equal, 1);
VN.define_method(VN.cFixnum, "<=>", fix_cmp, 1);
VN.define_method(VN.cFixnum, ">",  fix_gt, 1);
VN.define_method(VN.cFixnum, ">=", fix_ge, 1);
VN.define_method(VN.cFixnum, "<",  fix_lt, 1);
VN.define_method(VN.cFixnum, "<=", fix_le, 1);

VN.define_method(VN.cFixnum, "~", fix_rev, 0);
VN.define_method(VN.cFixnum, "&", fix_and, 1);
VN.define_method(VN.cFixnum, "|", fix_or,  1);
VN.define_method(VN.cFixnum, "^", fix_xor, 1);
VN.define_method(VN.cFixnum, "[]", fix_aref, 1);

VN.define_method(VN.cFixnum, "<<", VN.fix_lshift, 1);
VN.define_method(VN.cFixnum, ">>", VN.fix_rshift, 1);

VN.define_method(VN.cFixnum, "to_f", fix_to_f, 0);
VN.define_method(VN.cFixnum, "size", fix_size, 0);
VN.define_method(VN.cFixnum, "zero?", fix_zero_p, 0);
VN.define_method(VN.cFixnum, "odd?", fix_odd_p, 0);
VN.define_method(VN.cFixnum, "even?", fix_even_p, 0);
VN.define_method(VN.cFixnum, "succ", fix_succ, 0);

VN.cFloat  = VN.define_class("Float", VN.cNumeric);

VN.undef_alloc_func(VN.cFloat);
VN.undef_method(CLASS_OF(VN.cFloat), "new");

VN.define_const(VN.cFloat, "ROUNDS", INT2FIX(FLT_ROUNDS));
VN.define_const(VN.cFloat, "RADIX", INT2FIX(FLT_RADIX));
VN.define_const(VN.cFloat, "MANT_DIG", INT2FIX(DBL_MANT_DIG));
VN.define_const(VN.cFloat, "DIG", INT2FIX(DBL_DIG));
VN.define_const(VN.cFloat, "MIN_EXP", INT2FIX(DBL_MIN_EXP));
VN.define_const(VN.cFloat, "MAX_EXP", INT2FIX(DBL_MAX_EXP));
VN.define_const(VN.cFloat, "MIN_10_EXP", INT2FIX(DBL_MIN_10_EXP));
VN.define_const(VN.cFloat, "MAX_10_EXP", INT2FIX(DBL_MAX_10_EXP));
VN.define_const(VN.cFloat, "MIN", DBL2NUM(DBL_MIN));
VN.define_const(VN.cFloat, "MAX", DBL2NUM(DBL_MAX));
VN.define_const(VN.cFloat, "EPSILON", DBL2NUM(DBL_EPSILON));

VN.define_method(VN.cFloat, "to_s", flo_to_s, 0);
VN.define_method(VN.cFloat, "coerce", flo_coerce, 1);
VN.define_method(VN.cFloat, "-@", flo_uminus, 0);
VN.define_method(VN.cFloat, "+", flo_plus, 1);
VN.define_method(VN.cFloat, "-", flo_minus, 1);
VN.define_method(VN.cFloat, "*", flo_mul, 1);
VN.define_method(VN.cFloat, "/", flo_div, 1);
VN.define_method(VN.cFloat, "quo", flo_quo, 1);
VN.define_method(VN.cFloat, "fdiv", flo_quo, 1);
VN.define_method(VN.cFloat, "%", flo_mod, 1);
VN.define_method(VN.cFloat, "modulo", flo_mod, 1);
VN.define_method(VN.cFloat, "divmod", flo_divmod, 1);
VN.define_method(VN.cFloat, "**", flo_pow, 1);
VN.define_method(VN.cFloat, "==", flo_eq, 1);
VN.define_method(VN.cFloat, "<=>", flo_cmp, 1);
VN.define_method(VN.cFloat, ">",  flo_gt, 1);
VN.define_method(VN.cFloat, ">=", flo_ge, 1);
VN.define_method(VN.cFloat, "<",  flo_lt, 1);
VN.define_method(VN.cFloat, "<=", flo_le, 1);
VN.define_method(VN.cFloat, "eql?", flo_eql, 1);
VN.define_method(VN.cFloat, "hash", flo_hash, 0);
VN.define_method(VN.cFloat, "to_f", flo_to_f, 0);
VN.define_method(VN.cFloat, "abs", flo_abs, 0);
VN.define_method(VN.cFloat, "magnitude", flo_abs, 0);
VN.define_method(VN.cFloat, "zero?", flo_zero_p, 0);

VN.define_method(VN.cFloat, "to_i", flo_truncate, 0);
VN.define_method(VN.cFloat, "to_int", flo_truncate, 0);
VN.define_method(VN.cFloat, "floor", flo_floor, 0);
VN.define_method(VN.cFloat, "ceil", flo_ceil, 0);
VN.define_method(VN.cFloat, "round", flo_round, -1);
VN.define_method(VN.cFloat, "truncate", flo_truncate, 0);

VN.define_method(VN.cFloat, "nan?",      flo_is_nan_p, 0);
VN.define_method(VN.cFloat, "infinite?", flo_is_infinite_p, 0);
VN.define_method(VN.cFloat, "finite?",   flo_is_finite_p, 0);