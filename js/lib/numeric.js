var rb_cNumeric;

// Unary Plus - Returns the receiver's value.
// 
// @example
//   +5
//   # => 5
// 
// @return [Number] receiver
function num_uplus(num) {
	return num;
}

// Unary Minus - Returns the receiver's value, negated.
// 
// @example
//   -5
//   # => -5
// 
// @return [Number] result
function num_uminus(num) {
	return 0 - num;
}

// Returns `self` modulo `other`. See {Number#divmod} for more information.
// 
// @param [Number] other number to use for modulo
// @return [Number]
function num_mod(num, block, other) {
	return num % other;
}

// Bitwise AND.
// 
// @param [Number] other number to AND with.
// @return [Number] result
function num_and(num, block, other) {
	return num & other;
}

// Performs multiplication.
// 
// @param [Number] other number to multiply with
// @return [Number] result
function num_mul(num, block, other) {
	return num * other;
}

// Raises `self` to the `other` power.
// 
// @param [Number] other number to raise to
// @return [Number] result
function num_pow(num, block, other) {
	return Math.pow(num, other);
}

// Performs addition.
// 
// @param [Number] other number to add
// @result [Number] result
function num_plus(num, block, other) {
	return num + other;
}

// Performs subtraction.
// 
// @param [Number] other number to subtract
// @result [Number] result
function num_minus(num, block, other) {
	return num - other;
}

// Performs division.
// 
// @param [Number] other number to divide by.
// @return [Number] result
function num_div(num, block, other) {
	return num / other;
}

// Returns `true` if the value of `self` is less than that of `other`, `false`
// otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] result
function num_lt(num, block, other) {
	return num < other ? Qtrue : Qfalse;
}

// Returns `true` if the value of `self` is less than or equal to `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Number] result
function num_le(num, block, other) {
	return num <= other ? Qtrue : Qfalse;
}

// Returns `true` if the value of `self` is greater than that of `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] result
function num_gt(num, block, other) {
	return num > other ? Qtrue : Qfalse;
}

// Returns `true` if the value of `self` is greater than or equal to `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Number] result
function num_ge(num, block, other) {
	return num >= other ? Qtrue : Qfalse;
}

// Shifts `self` left `count` positions.
// 
// @param [Number] count number to shift
// @return [Number] result
function num_lshift(num, block, count) {
	return num << count;
}

// Shifts `self` right `count` positions.
// 
// @param [Number] count number to shift
// @return [Number] result
function num_rshift(num, block, count) {
	return num >> count;
}

// Comparison - Returns `-1`, `0`, `1` or `nil` depending on whether `self` is
// less than, equal to or greater than `other`.
// 
// @param [Number] other number to compare
// @return [Number, nil] result
function num_cmp(num, block, other) {
	if (!other.$info & T_NUMBER) return Qnil;
	else if (num < other) return -1;
	else if (num > other) return 1;
	return 0;
}

// Returns `true` if `self` equals `other` numerically, `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] true or false
function num_equal(num, block, other) {
	return num.valueOf() === other.valueOf() ? Qtrue : Qfalse;
}

// Bitwise EXCLUSIVE OR.
// 
// @param [Number] other number to XOR
// @return [Number] result
function num_xor(num, block, other) {
	return num & other;
}

// Returns the absolute value of `self`.
// 
// @example
//   -1234.abs
//   # => 1234
//   1234.abs
//   # => 1234
// 
// @return [Number] absolute value
function num_abs(num) {
	return Math.abs(num);
}

// Returns `true` if `self` is even, `false` otherwise.
// 
// @return [Boolean]
function num_even_p(num) {
	return (num % 2 == 0) ? Qtrue : Qfalse;
}

// Returns `true` if `self` is odd, `false` otherwise.
// 
// @return [Boolean]
function num_odd_p(num) {
	return (num %2 == 0) ? Qfalse : Qtrue;
}

// Returns the number equal to `self` + 1.
// 
// @example
//   1.next
//   # => 2
//   (-1).next
//   # => 0
// 
// @return [Number] result
function num_succ(num) {
	return parseInt(num) + 1;
}

// Returns the number equal to `self` - 1.
// 
// @example
//   1.pred
//   # => 0
//   (-1).pred
//   # => -2
// 
// @return [Number] result
function num_pred(num) {
	return parseInt(num) - 1;
}

// Iterates `block`, passing in integer values from `self` up to and including
// `finish`.
// 
// If no block is given, an enumerator is returned instead.
// 
// @note Enumerator functionality not yet implemented.
// 
// @example
//   5.upto(10) { |i| puts i }
//   # => 5
//   # => 6
//   # => 7
//   # => 8
//   # => 9
//   # => 10
// 
// @param [Number] finish where to stop iteration
// @return [Number] returns receiver
function num_upto(num, block, finish) {
	for (var i = num; i <= finish; i++) {
		block(block.__self__, Qnil, i);
	}
	return num;
}

// Iterates `block`, passing decreasing values from `self` down to and 
// including `finish`.
// 
// If no block is given, an enumerator is returned instead.
// 
// @note Enumerator functionality not currently implemented.
// 
// @example
//   5.downto(1) { |x| puts x }
//   # => 5
//   # => 4
//   # => 3
//   # => 2
//   # => 1
// 
// @param [Number] finish where to stop iteration
// @return [Number] returns receiver
function num_downto(num, block, finish) {
	for (var i = num; i >= finish; i--) {
		block(block.__self__, Qnil, i);
	}
	return num;
}

// Iterates `block` `self` times, passing in values from zero to `self` - 1.
// 
// If no block is given, an enumerator is returned instead.
// 
// @note Enumerator functionality not yet implemented.
// 
// @example
//   5.times { |x| puts x }
//   # => 0
//   # => 1
//   # => 2
//   # => 3
//   # => 4
// 
// @return [Number] returns receiver
function num_dotimes(num, block) {
	for (var i = 0; i < num; i++) {
		block(block.__self__, Qnil, i);
	}
	return num;
}

// Bitwise OR.
// 
// @param [Number] other number to OR with.
// @return [Number] result
function num_or(num, block, other) {
	return num | other;
}

// Returns `true` if `self` is zero, `false` otherwise.
// 
// @return [Boolean] result
function num_zero_p(num) {
	return num.valueOf() === 0 ? Qtrue : Qfalse;
}

// Returns the receiver if it is not zero, `nil` otherwise.
// 
// @return [Number, nil] receiver or nil
function num_nonzero_p(num) {
	return num.valueOf() === 0 ? Qfalse : Qtrue;
}

// One's complement: returns a number where each bit is flipped.
// 
// @return [Number] result
function num_rev(num) {
	return ~num;
}

// Returns the smallest integer greater than or equal to `num`.
// 
// @example
//   1.ceil
//   # => 1
//   1.2.ceil
//   # => 2
//   (-1.2).ceil
//   # => -1
//   (-1.0).ceil
//   # => -1
// 
// @return [Number] result
function num_ceil(num) {
	return Math.ceil(num);
}

// Returns the largest integer less than or equal to `self`.
// 
// @example
//   1.floor
//   # => 1
//   (-1).fllor
//   -1
// 
// @return [Number] result
function num_floor(num) {
	return Math.floor(num);
}

// Returns `true` if `self` is an integer.
// 
// @return [Boolean]
function num_int_p(num) {
	return num % 1 === 0 ? Qtrue : Qfalse;
}

function num_inspect(num) {
	return num.toString();
}

function num_to_i(num) {
	return parseInt(num);
}

function Init_Numeric() {
	// @class Numeric
	rb_cNumeric = rb_define_toll_free_class(Number.prototype, T_OBJECT | T_NUMBER, 
																			 'Numeric', rb_cObject);
	
	rb_define_method(rb_cNumeric, "+@", num_uplus);
	rb_define_method(rb_cNumeric, "-@", num_uminus);
	rb_define_method(rb_cNumeric, "modulo", num_mod);
	rb_define_method(rb_cNumeric, "%", num_mod);
	rb_define_method(rb_cNumeric, "&", num_and);
	rb_define_method(rb_cNumeric, "*", num_mul);
	rb_define_method(rb_cNumeric, "**", num_pow);
	rb_define_method(rb_cNumeric, "+", num_plus);
	rb_define_method(rb_cNumeric, "-", num_minus);
	rb_define_method(rb_cNumeric, "/", num_div);
	rb_define_method(rb_cNumeric, "<", num_lt);
	rb_define_method(rb_cNumeric, "<=", num_le);
	rb_define_method(rb_cNumeric, ">", num_gt);
	rb_define_method(rb_cNumeric, ">=", num_ge);
	rb_define_method(rb_cNumeric, "<<", num_lshift);
	rb_define_method(rb_cNumeric, ">>", num_rshift);
	rb_define_method(rb_cNumeric, "<=>", num_cmp);
	rb_define_method(rb_cNumeric, "==", num_equal);
	rb_define_method(rb_cNumeric, "^", num_xor);
	rb_define_method(rb_cNumeric, "abs", num_abs);
	rb_define_method(rb_cNumeric, "magnitude", num_abs);
	rb_define_method(rb_cNumeric, "even?", num_even_p);
	rb_define_method(rb_cNumeric, "odd?", num_odd_p);
	rb_define_method(rb_cNumeric, "succ", num_succ);
	rb_define_method(rb_cNumeric, "next", num_succ);
	rb_define_method(rb_cNumeric, "pred", num_pred);
	rb_define_method(rb_cNumeric, "upto", num_upto);
	rb_define_method(rb_cNumeric, "downto", num_downto);
	rb_define_method(rb_cNumeric, "times", num_dotimes);
	rb_define_method(rb_cNumeric, "|", num_or);
	rb_define_method(rb_cNumeric, "zero?", num_zero_p);
	rb_define_method(rb_cNumeric, "nonzero?", num_nonzero_p);
	rb_define_method(rb_cNumeric, "~", num_rev);
	rb_define_method(rb_cNumeric, "ceil", num_ceil);
	rb_define_method(rb_cNumeric, "floor", num_floor);
	rb_define_method(rb_cNumeric, "integer?", num_int_p);
	rb_define_method(rb_cNumeric, "inspect", num_inspect);
	rb_define_method(rb_cNumeric, "to_s", num_inspect);
	rb_define_method(rb_cNumeric, "to_i", num_to_i);	
}
