rb_cNumeric = null;

// Unary Plus - Returns the receiver's value.
// 
// @example
//   +5
//   # => 5
// 
// @return [Number] receiver
var num_uplus = function() {
	return this;
};

// Unary Minus - Returns the receiver's value, negated.
// 
// @example
//   -5
//   # => -5
// 
// @return [Number] result
var num_uminus = function() {
	return -this;
};

// Returns `self` modulo `other`. See {Number#divmod} for more information.
// 
// @param [Number] other number to use for modulo
// @return [Number]
var num_mod = function(other) {
	return this % other;
};

// Bitwise AND.
// 
// @param [Number] other number to AND with.
// @return [Number] result
var num_and = function(other) {
	return this & other;
};

// Performs multiplication.
// 
// @param [Number] other number to multiply with
// @return [Number] result
var num_mul = function(other) {
	return this * other;
};

// Raises `self` to the `other` power.
// 
// @param [Number] other number to raise to
// @return [Number] result
var num_pow = function(other) {
	return Math.pow(this, other);
};

// Performs addition.
// 
// @param [Number] other number to add
// @result [Number] result
var num_plus = function(other) {
  return this + other;
};

// Performs subtraction.
// 
// @param [Number] other number to subtract
// @result [Number] result
var num_minus = function(other) {
	return this - other;
};

// Performs division.
// 
// @param [Number] other number to divide by.
// @return [Number] result
var num_div = function(other) {
	return this / other;
};

// Returns `true` if the value of `self` is less than that of `other`, `false`
// otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] result
var num_lt = function(other) {
	return this < other ? Qtrue : Qfalse;
};

// Returns `true` if the value of `self` is less than or equal to `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Number] result
var num_le = function(other) {
	return this <= other ? Qtrue : Qfalse;
};

// Returns `true` if the value of `self` is greater than that of `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] result
var num_gt = function(other) {
	return this > other ? Qtrue : Qfalse;
};

// Returns `true` if the value of `self` is greater than or equal to `other`, 
// `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Number] result
var num_ge = function(other) {
	return this >= other ? Qtrue : Qfalse;
};

// Shifts `self` left `count` positions.
// 
// @param [Number] count number to shift
// @return [Number] result
var num_lshift = function(count) {
	return this << count;
};

// Shifts `self` right `count` positions.
// 
// @param [Number] count number to shift
// @return [Number] result
var num_rshift = function(count) {
	return this >> count;
};

// Comparison - Returns `-1`, `0`, `1` or `nil` depending on whether `self` is
// less than, equal to or greater than `other`.
// 
// @param [Number] other number to compare
// @return [Number, nil] result
var num_cmp = function(other) {
	if (!other.$info & T_NUMBER) return Qnil;
	else if (this < other) return -1;
	else if (this > other) return 1;
	return 0;
}

// Returns `true` if `self` equals `other` numerically, `false` otherwise.
// 
// @param [Number] other number to compare
// @return [Boolean] true or false
var num_equal = function(other) {
	return this.valueOf() === other.valueOf() ? Qtrue : Qfalse;
};

// Bitwise EXCLUSIVE OR.
// 
// @param [Number] other number to XOR
// @return [Number] result
var num_xor = function(other) {
	return this & other;
};

// Returns the absolute value of `self`.
// 
// @example
//   -1234.abs
//   # => 1234
//   1234.abs
//   # => 1234
// 
// @return [Number] absolute value
var num_abs = function() {
	return Math.abs(this);
};

// Returns `true` if `self` is even, `false` otherwise.
// 
// @return [Boolean]
var num_even_p = function() {
	return (this % 2 == 0) ? Qtrue : Qfalse;
};

// Returns `true` if `self` is odd, `false` otherwise.
// 
// @return [Boolean]
var num_odd_p = function() {
	return (this %2 == 0) ? Qfalse : Qtrue;
};

// Returns the number equal to `self` + 1.
// 
// @example
//   1.next
//   # => 2
//   (-1).next
//   # => 0
// 
// @return [Number] result
var num_succ = function() {
	return parseInt(this) + 1;
};

// Returns the number equal to `self` - 1.
// 
// @example
//   1.pred
//   # => 0
//   (-1).pred
//   # => -2
// 
// @return [Number] result
var num_pred = function() {
	return parseInt(this) - 1;
};

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
var num_upto = function(finish) {
	for (var i = this; i <= finish; i++) {
		block(block.$self, Qnil, i);
	}
	return this;
};

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
var num_downto = function(finish) {
	for (var i = this; i >= finish; i--) {
		block(block.$self, Qnil, i);
	}
	return this;
};

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
var num_dotimes = function() {
  for (var i = 0; i < this; i++) {
		block(block.$self, Qnil, i);
	}
	return this;
};

// Bitwise OR.
// 
// @param [Number] other number to OR with.
// @return [Number] result
var num_or = function(other) {
	return this | other;
};

// Returns `true` if `self` is zero, `false` otherwise.
// 
// @return [Boolean] result
var num_zero_p = function() {
	return this.valueOf() === 0 ? Qtrue : Qfalse;
};

// Returns the receiver if it is not zero, `nil` otherwise.
// 
// @return [Number, nil] receiver or nil
var num_nonzero_p = function() {
	return this.valueOf() === 0 ? Qfalse : Qtrue;
};

// One's complement: returns a number where each bit is flipped.
// 
// @return [Number] result
var num_rev = function() {
	return ~this;
};

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
var num_ceil = function() {
	return Math.ceil(this);
};

// Returns the largest integer less than or equal to `self`.
// 
// @example
//   1.floor
//   # => 1
//   (-1).fllor
//   -1
// 
// @return [Number] result
var num_floor = function() {
	return Math.floor(this);
};

// Returns `true` if `self` is an integer.
// 
// @return [Boolean]
var num_int_p = function() {
	return this % 1 === 0 ? Qtrue : Qfalse;
};

var num_inspect = function() {
	return this.toString();
};

var num_to_i = function() {
	return parseInt(this);
};

var Init_Numeric = function() {
  rb_cNumeric = define_bridged_class('Numeric', Number);
  rb_cNumeric.allocator.prototype.$info = T_OBJECT | T_NUMBER;

  rb_cNumeric.allocator.prototype.$hash = function() {
    return '$$num$$' + this;
  };

  rb_cNumeric.$dm('+@', num_uplus, 0);
  rb_cNumeric.$dm('-@', num_uminus, 0);
  rb_cNumeric.$dm('modulo', num_mod, 0);
  rb_cNumeric.$dm('%', num_mod, 0);
  rb_cNumeric.$dm('*', num_mul, 0);
  rb_cNumeric.$dm('&', num_and, 0);
  rb_cNumeric.$dm('**', num_pow, 0);
  rb_cNumeric.$dm('+', num_plus, 0);
  rb_cNumeric.$dm('/', num_div, 0);
  rb_cNumeric.$dm('<', num_lt, 0);
  rb_cNumeric.$dm('<=', num_le, 0);
  rb_cNumeric.$dm('>', num_gt, 0);
  rb_cNumeric.$dm('>=', num_ge, 0);
  rb_cNumeric.$dm('<<', num_lshift, 0);
  rb_cNumeric.$dm('>>', num_rshift, 0);
  rb_cNumeric.$dm('<=>', num_cmp, 0);
  rb_cNumeric.$dm('==', num_equal, 0);
  rb_cNumeric.$dm('^', num_xor, 0);
  rb_cNumeric.$dm('abs', num_abs, 0);
  rb_cNumeric.$dm('magnitude', num_abs, 0);
  rb_cNumeric.$dm('even?', num_even_p, 0);
  rb_cNumeric.$dm('odd?', num_odd_p, 0);
  rb_cNumeric.$dm('succ', num_succ, 0);
  rb_cNumeric.$dm('next', num_succ, 0);
  rb_cNumeric.$dm('pred', num_pred, 0);
  rb_cNumeric.$dm('upto', num_upto, 0);
  rb_cNumeric.$dm('downto', num_downto, 0);
  rb_cNumeric.$dm('times', num_dotimes, 0);
  rb_cNumeric.$dm('|', num_or, 0);
  rb_cNumeric.$dm('zero?', num_zero_p, 0);
  rb_cNumeric.$dm('nonzero?', num_nonzero_p, 0);
  rb_cNumeric.$dm('~', num_rev, 0);
  rb_cNumeric.$dm('ceil', num_ceil, 0);
  rb_cNumeric.$dm('floor', num_floor, 0);
  rb_cNumeric.$dm('integer?', num_int_p, 0);
  rb_cNumeric.$dm('inspect', num_inspect, 0);
  rb_cNumeric.$dm('to_s', num_inspect, 0);
  rb_cNumeric.$dm('to_i', num_to_i, 0);
};

