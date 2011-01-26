// A {String} object holds a sequence of bytes, typically representing 
// characters.
// 
// ## Implementation Details.
// 
// For performance, strings in Opal are built directly on top of native 
// javascript strings, so that they are in fact the same object. This has the
// side effect that all strings are immutable, that is, they cannot be changed.
// Most of the string methods that end in '!' for example are not implemented, 
// but their counterparts are: {#upcase} exists, but {#upcase!} does not, for
// example.
var rb_cString;

var rb_cSymbol;
		
// Symbol instance
var RSymbol = function(ptr) {
  // hash
  this.$id = opal_yield_hash();
  // ptr
  this.__ptr__ = ptr;
  // Class is rb_symbol
  this.$k = rb_cSymbol;
  // get methods from class
  this.$m = rb_cSymbol.$m_tbl;
  // return new sym
  return this;
};

// Symbol table
var symbol_table = { };

// @global - return/create a symbol
opalsym = function(str) {
  if (symbol_table.hasOwnProperty(str))
    return symbol_table[str];

  var res = new RSymbol(str);
  symbol_table[str] = res;
  return res;
};

// Returns a new string object containing a copy of `str`.
// 
// @param [String] str string to copy
// @return [String] result
function str_s_new(str, mid, text) {
	return new String(text || "");
};

// Copy - Returns a new {String} constaining `num` copies of the receiver.
// 
// @example
//   "Ho! " * 3
//   # => "Ho! Ho! Ho! "
// 
// @param [Number] num number of copies
// @return [String] result
var str_times = function(times) {
	var res = [];
	
	for (var i = 0; i < times; i++) {
		res.push(this);
	}
	
	return res.join("");
};

// Concatenation - Returns a new {String} containing `other_str` concatenated
// to `self`.
// 
// @example
//   "Hello from " + self.to_s
//   # => "Hello from main"
// 
// @param [String] other_str string to concatenate
// @return [String] result
var str_plus = function(other) {
	return this + other;
};

// Returns a copy of `self` with the first character converted to uppercase and
// the remainder to lowercase.
// 
// @example
//   "hello".capitalize
//   # => "Hello"
//   "HELLO".capitalize
//   # => "Hello"
//   "123ABC".capitalize
//   # => "123abc"
// 
// @return [String]
var str_capitalize = function() {
	return this[0].toUpperCase() + this.substr(1).toLowerCase();
}

// Returns a copy of `self` with all uppercase letters replaced with their 
// lowercase counterparts.
// 
// @example
//   "hEllO".downcase
//   # => "hello"
// 
// @return [String] result
var str_downcase = function() {
	return this.toLowerCase();
};

var str_to_s = function() {
	return this;
};

// Returns a printable version of `self`, surrounded by quote marks, with 
// special characters escaped.
// 
// @todo Does not yet escape special characters
// 
// @example
//   str = "hello"
//   str.inspect
//   # => "\"hello\""
// 
// @return [String]
var str_inspect = function() {
	return '"' + this + '"';
};

// Returns the character length of `str`.
// 
// @return [Number] length of string
var str_length = function() {
	return this.length;
};

// Returns the {Symbol} corresponding to `self`, creating the symbol if it did
// not previously exist.
// 
// @example
//   "Koala".to_sym
//   # => :Koala
//   s = 'cat'.to_sym
//   # => :cat
//   s == :cat
//   # => true
//   s = '@cat'.to_sym
//   # => :@cat
//   s == :@cat
//   # => true
// 
// This can also be used to create symbols that cannot be represented using the
// :xxxx notation.
// 
// @example
//   'cat and dog'.to_sym
//   # => :"cat and dog"
// 
// @return [Symbol]
var str_intern = function() {
	return opalsym(this);
};

// Returns a new string with the characters from `self` in reverse order.
// 
// @example
//   "stressed".reverse
//   # => "desserts"
// 
// @return [String]
var str_reverse = function() {
	return this.split("").reverse().join("");
};

var str_sub = function(pattern) {
	return this.replace(pattern, block);
};

var str_gsub = function(pattern) {
	var r = pattern.toString();
	r = r.substr(1, r.lastIndexOf('/') - 1);
	r = new RegExp(r, 'g');
	return this.replace(r, block);
};

var str_slice = function(start, finish) {
	return this.substr(start, finish);
};

var str_split = function(split) {
	return this.split(split);
};

// Comparison - returns -1 if `other_str` is greater than, 0 if `other_str` is
// equal to, and 1 if `other_str` is less than `self`.
// 
// @example
//   "abcdef" <=> "abcde"
//   # => 1
//   "abcdef" <=> "abcdef"
//   # => 0
//   "abcdef" <=> "abcdefg"
//   # => -1
//   "abcdef" <=> "ABCDEF"
//   # => 1
// 
// @param [String] other_str string to compare
// @return [-1, 0, 1, nil] result
var str_cmp_m = function(other) {
  if (!(other.info & TS)) return Qnil;
  else if (this > other) return 1;
  else if (this < other) return -1;
  return 0;
};

// Equality - if `other` is not a {String} return `false`. Otherwise, returns
// `true` if `self` <=> `other` returns zero.
// 
// @param [String] other string to compare
// @return [Boolean] result
var str_equal = function(other) {
	return this.valueOf() == other.valueOf() ? Qtrue : Qfalse;
};

// Match - If obj is a {Regexp}, then uses it to match against self, returning
// `nil` if there is no match, or the index of the match location otherwise. If
// obj is not a regexp, then it calls `=~` on it, using the receiver as an
// argument.
// 
// @todo passing a non regexp is not currently supported
// 
// @param [Regexp, Object] obj
// @return [Number, nil]
var str_match = function(obj) {
	rb_call(obj, "match", this);
	return Qnil;
};

// Case-inseneitive version of {String#<=>}.
// 
// @example
//   "abcdef".casecmp("abcde")
//   # => 1
//   "aBcDeF".casecmp("abcdef")
//   # => 0
//   "abcdef".casecmp("abcdefg")
//   # => -1
//   "abcdef".casecmp("ABCDEF")
//   # => 0
// 
// @param [String] other_str string to compare
// @return [-1, 0, 1, nil] result
var str_casecmp = function(other) {
	var a = this.toLowerCase(), b = other.toLowerCase();
	if (!(b.info & TS)) return Qnil;
	else if (a > b) return 1;
	else if (a < b) return -1;
	return 0;
};

// Returns `true` if `self` has a length of zero.
// 
// @example
//   "hello".empty?
//   # => false
//   "".empty?
//   # => true
// 
// @return [Boolean]
var str_empty = function() {
	return this == "" ? Qtrue : Qfalse;
};

// Returns `true` if `self` ends with a `suffix` given.
// 
// @example
//   "hello".end_with? "lo"
//   # => true
// 
// @param [String] suffix suffix to check
// @return [Boolean]
var str_end_with = function(suffix) {
	if (!suffix) return false;
	
	if (this.lastIndexOf(suffix) == this.length - suffix.length)
		return Qtrue;
	
	return Qfalse;
};

// Two strings are equal if they have the same length and content.
// 
// @param [String] other string to comapre
// @return [Boolean]
var str_eql = function(other) {
	return this == other ? Qtrue : Qfalse;	
};

// Returns true if `self` contains the given `other_str`.
// 
// @example
//   "hello".include? "lo"
//   # => true
//   "hello".include? "ol"
//   # => false
//   "hello".include? "h"
//   # => true
// 
// @param [String] other_str string to check for
// @return [Boolean]
var str_include = function(other) {
	var res = this.indexOf(other);
	
	return res == -1 ? Qfalse : Qtrue;
};

// Returns the index of the first occurrence of the given `substring` or
// pattern (regexp) in `self`. Returns `nil` if not found. If the second
// parameter is present, it specifies the position in the string to begin the
// search.
// 
// @todo Use of Regexp or offsets not yet implemented.
// 
// @example
//   "hello".index "e"
//   # => 1
//   "hello".index "lo"
//   # => 3
//   "hello".index "a"
//   # => nil
// 
// @param [String] substring string to look for
// @return [Number, nil] result
var str_index = function(substr) {
	var res = this.indexOf(substr);
	
	return res == -1 ? Qnil : res;	
};

// Returns a copy of `self` with leading whitespace removed. See also
// {String#rstrip} and {String#strip}.
// 
// @example
//   "   hello   ".lstrip
//   # => "hello   "
//   "hello".lstrip
//   # => "hello"
// 
// @return [String]
var str_lstrip = function() {
	return this.replace(/^\s*/, "");
};

// Converts `pattern` to a match, if it isnt alrady one, then invokes its 
// `match` method on the receiver. 
// 
// @param [Regexp] pattern
// @return [MatchData, nil]
var str_match_m = function(pattern) {
	return rb_call(pattern, "match", this);
};

var sym_inspect = function() {
	return ":" + this.__ptr__;
};

function sym_to_s(sym) {
	return sym.__ptr__;
}

function sym_to_sym(sym) {
	return sym;
}

var Init_String = function() {
  rb_cString = define_bridged_class('String', String);
  rb_cString.allocator.prototype.$info = T_OBJECT | T_STRING;

  rb_cString.allocator.prototype.$hash = function() {
    return '$$str$$' + this;
  };

  rb_cString.$dm('*', str_times, 0);
  rb_cString.$dm('+', str_plus, 0);
  rb_cString.$dm('capitalize', str_capitalize);
  rb_cString.$dm('downcase', str_downcase);
  rb_cString.$dm('to_s', str_to_s, 0);
  rb_cString.$dm('inspect', str_inspect, 0);
  rb_cString.$dm('length', str_length, 0);
  rb_cString.$dm('size', str_length, 0);
  rb_cString.$dm('intern', str_intern, 0);
  rb_cString.$dm('to_sym', str_intern, 0);
  rb_cString.$dm('reverse', str_reverse, 0);
  rb_cString.$dm('sub', str_sub, 0);
  rb_cString.$dm('gsub', str_gsub, 0);
  rb_cString.$dm('slice', str_slice, 0);
  rb_cString.$dm('[]', str_slice, 0);
  rb_cString.$dm('split', str_split, 0);
  rb_cString.$dm('<=>', str_cmp_m, 0);
  rb_cString.$dm('==', str_equal, 0);
  rb_cString.$dm('=~', str_match, 0);
  rb_cString.$dm('casecmp', str_casecmp, 0);
  rb_cString.$dm('empty?', str_empty, 0);
  rb_cString.$dm('end_with?', str_end_with, 0);
  rb_cString.$dm('eql?', str_eql, 0);
  rb_cString.$dm('include?', str_include, 0);
  rb_cString.$dm('index', str_index, 0);
  rb_cString.$dm('lstrip', str_lstrip, 0);
  rb_cString.$dm('match', str_match_m, 0);

  // @class Symbol
  rb_cSymbol = define_bridged_class('Symbol', RSymbol);

  rb_cSymbol.$dm('inspect', sym_inspect);
  rb_cSymbol.$dm('to_s', sym_to_s);
  rb_cSymbol.$dm('to_sym', sym_to_sym);

};

var Init_String_Legacy = function() {
	// @class String
	rb_cString = rb_define_toll_free_class(String.prototype, T_OBJECT | T_STRING, 
																				'String', rb_cObject);
	
	rb_define_singleton_method(rb_cString, "new", str_s_new);
	rb_define_method(rb_cString, "*", str_times);
	rb_define_method(rb_cString, "+", str_plus);
	rb_define_method(rb_cString, "capitalize", str_capitalize);
	rb_define_method(rb_cString, "downcase", str_downcase);
	rb_define_method(rb_cString, "to_s", str_to_s);
	rb_define_method(rb_cString, "inspect", str_inspect);
	rb_define_method(rb_cString, "length", str_length);
	rb_define_method(rb_cString, "size", str_length);
	rb_define_method(rb_cString, "intern", str_intern);
	rb_define_method(rb_cString, "to_sym", str_intern);
	rb_define_method(rb_cString, "reverse", str_reverse);
	rb_define_method(rb_cString, "sub", str_sub);
	rb_define_method(rb_cString, "gsub", str_gsub);
	rb_define_method(rb_cString, "slice", str_slice);
	rb_define_method(rb_cString, "[]", str_slice);
	rb_define_method(rb_cString, "split", str_split);
	rb_define_method(rb_cString, "<=>", str_cmp_m);
	rb_define_method(rb_cString, "==", str_equal);
	rb_define_method(rb_cString, "=~", str_match);
	rb_define_method(rb_cString, "casecmp", str_casecmp);
	rb_define_method(rb_cString, "empty?", str_empty);
	rb_define_method(rb_cString, "end_with?", str_end_with);
	rb_define_method(rb_cString, "eql?", str_eql);
	rb_define_method(rb_cString, "include?", str_include);
	rb_define_method(rb_cString, "index", str_index);
	rb_define_method(rb_cString, "lstrip", str_lstrip);
	rb_define_method(rb_cString, "match", str_match_m);
	
	// @class Symbol
	rb_cSymbol = rb_define_toll_free_class(RSymbol.prototype, T_OBJECT | T_SYMBOL, 
																				'Symbol', rb_cObject);
	
	rb_define_method(rb_cSymbol, "inspect", sym_inspect);
	rb_define_method(rb_cSymbol, "to_s", sym_to_s);
	rb_define_method(rb_cSymbol, "to_sym", sym_to_sym);
};
