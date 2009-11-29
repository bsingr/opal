
function rb_num_uplus(self) {
    return self;
}

function rb_num_uminus(self) {
    return 0 - self;
}

function rb_num_cmp(self, _cmd, other) {
    if (self == other) return 0;
    return null;
}

function rb_num_eql(self, _cmd, other) {
    if (self === other) return true;
    return false;
}

function rb_num_quo(self, _cmd, other) {
    
}

function rb_num_plus(self, _cmd, i) {
    return self + i;
}


function rb_num_gt(self, _cmd, i) {
    return self > i;
}

function rb_num_ge(self, _cmd, i) {
    return self >= i;
}

function rb_num_lt(self, _cmd, i) {
    return self < i;
}

function rb_num_le(self, _cmd, i) {
    return self <= i;
}

rb_cNumber = objj_getClass("CPNumber");
rb_const_set(rb_cObject, "Number", rb_cNumber);

rb_define_method(rb_cNumber, "+@", rb_num_uplus, 0);
rb_define_method(rb_cNumber, "-@", rb_num_uminus, 0);
rb_define_method(rb_cNumber, "<=>", rb_num_cmp, 1);
rb_define_method(rb_cNumber, "eql?", rb_num_eql, 1);

// rb_define_method(rb_cNumber, "+@", num_uplus, 0);
// rb_define_method(rb_cNumber, "-@", num_uminus, 0);
// rb_define_method(rb_cNumber, "<=>", num_cmp, 1);
// rb_define_method(rb_cNumber, "eql?", num_eql, 1);
// rb_define_method(rb_cNumber, "quo", num_quo, 1);
// rb_define_method(rb_cNumber, "fdiv", num_fdiv, 1);
// rb_define_method(rb_cNumber, "div", num_div, 1);
// rb_define_method(rb_cNumber, "divmod", num_divmod, 1);
// rb_define_method(rb_cNumber, "%", num_modulo, 1);
// rb_define_method(rb_cNumber, "modulo", num_modulo, 1);
// rb_define_method(rb_cNumber, "remainder", num_remainder, 1);
// rb_define_method(rb_cNumber, "abs", num_abs, 0);
// rb_define_method(rb_cNumber, "to_int", num_to_int, 0);
// 
// rb_define_method(rb_cNumber, "real?", num_real_p, 0);
// rb_define_method(rb_cNumber, "scalar?", num_scalar_p, 0);
// rb_define_method(rb_cNumber, "integer?", num_int_p, 0);
// rb_define_method(rb_cNumber, "zero?", num_zero_p, 0);
// rb_define_method(rb_cNumber, "nonzero?", num_nonzero_p, 0);
// 
// rb_define_method(rb_cNumber, "floor", num_floor, 0);
// rb_define_method(rb_cNumber, "ceil", num_ceil, 0);
// rb_define_method(rb_cNumber, "round", num_round, -1);
// rb_define_method(rb_cNumber, "truncate", num_truncate, 0);
// rb_define_method(rb_cNumber, "step", num_step, -1);
// 
// rb_define_method(rb_cNumber, "integer?", int_int_p, 0);
// rb_define_method(rb_cNumber, "odd?", int_odd_p, 0);
// rb_define_method(rb_cNumber, "even?", int_even_p, 0);
// rb_define_method(rb_cNumber, "upto", int_upto, 1);
// rb_define_method(rb_cNumber, "downto", int_downto, 1);
// rb_define_method(rb_cNumber, "times", int_dotimes, 0);
// rb_define_method(rb_cNumber, "succ", int_succ, 0);
// rb_define_method(rb_cNumber, "next", int_succ, 0);
// rb_define_method(rb_cNumber, "pred", int_pred, 0);
// rb_define_method(rb_cNumber, "chr", int_chr, -1);
// rb_define_method(rb_cNumber, "ord", int_ord, 0);
// rb_define_method(rb_cNumber, "to_i", int_to_i, 0);
// rb_define_method(rb_cNumber, "to_int", int_to_i, 0);
// rb_define_method(rb_cNumber, "floor", int_to_i, 0);
// rb_define_method(rb_cNumber, "ceil", int_to_i, 0);
// rb_define_method(rb_cNumber, "truncate", int_to_i, 0);
// rb_define_method(rb_cNumber, "round", int_round, -1);
// 
// rb_define_method(rb_cNumber, "to_s", fix_to_s, -1);
// 
// rb_define_method(rb_cNumber, "-@", fix_uminus, 0);
rb_define_method(rb_cNumber, "+", rb_num_plus);
// rb_define_method(rb_cNumber, "-", fix_minus, 1);
// rb_define_method(rb_cNumber, "*", fix_mul, 1);
// rb_define_method(rb_cNumber, "/", fix_div, 1);
// rb_define_method(rb_cNumber, "div", fix_idiv, 1);
// rb_define_method(rb_cNumber, "%", fix_mod, 1);
// rb_define_method(rb_cNumber, "modulo", fix_mod, 1);
// rb_define_method(rb_cNumber, "divmod", fix_divmod, 1);
// rb_define_method(rb_cNumber, "fdiv", fix_fdiv, 1);
// rb_define_method(rb_cNumber, "**", fix_pow, 1);
// 
// rb_define_method(rb_cNumber, "abs", fix_abs, 0);
// 
// rb_define_method(rb_cNumber, "==", fix_equal, 1);
// rb_define_method(rb_cNumber, "<=>", fix_cmp, 1);
rb_define_method(rb_cNumber, ">", rb_num_gt, 1);
rb_define_method(rb_cNumber, ">=", rb_num_ge, 1);
rb_define_method(rb_cNumber, "<", rb_num_lt, 1);
rb_define_method(rb_cNumber, "<=", rb_num_le, 1);
// 
// rb_define_method(rb_cNumber, "~", fix_rev, 0);
// rb_define_method(rb_cNumber, "&", fix_and, 1);
// rb_define_method(rb_cNumber, "|", fix_or,  1);
// rb_define_method(rb_cNumber, "^", fix_xor, 1);
// rb_define_method(rb_cNumber, "[]", fix_aref, 1);
// 
// rb_define_method(rb_cNumber, "<<", rb_fix_lshift, 1);
// rb_define_method(rb_cNumber, ">>", rb_fix_rshift, 1);
// 
// rb_define_method(rb_cNumber, "to_f", fix_to_f, 0);
// rb_define_method(rb_cNumber, "size", fix_size, 0);
// rb_define_method(rb_cNumber, "zero?", fix_zero_p, 0);
// rb_define_method(rb_cNumber, "odd?", fix_odd_p, 0);
// rb_define_method(rb_cNumber, "even?", fix_even_p, 0);
// rb_define_method(rb_cNumber, "succ", fix_succ, 0);
// rb_define_method(rb_cNumber, "popcnt", fix_popcnt, 0);
// 
// 
// rb_define_method(rb_cNumber, "to_i", flo_truncate, 0);
// rb_define_method(rb_cNumber, "to_int", flo_truncate, 0);
// rb_define_method(rb_cNumber, "floor", flo_floor, 0);
// rb_define_method(rb_cNumber, "ceil", flo_ceil, 0);
// rb_define_method(rb_cNumber, "round", flo_round, -1);
// rb_define_method(rb_cNumber, "truncate", flo_truncate, 0);
// 
// rb_define_method(rb_cNumber, "nan?",      flo_is_nan_p, 0);
// rb_define_method(rb_cNumber, "infinite?", flo_is_infinite_p, 0);
// rb_define_method(rb_cNumber, "finite?",   flo_is_finite_p, 0);
