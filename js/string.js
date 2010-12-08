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
function str_times(str, mid, times) {
	var res = [];
	
	for (var i = 0; i < times; i++) {
		res.push(str);
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
function str_plus(str, mid, other) {
	return str + other;
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
function str_capitalize(str, mid) {
	return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

// Returns a copy of `self` with all uppercase letters replaced with their 
// lowercase counterparts.
// 
// @example
//   "hEllO".downcase
//   # => "hello"
// 
// @return [String] result
function str_downcase(str, mid) {
	return str.toLowerCase();
}

function str_to_s(str, mid) {
	return str;
}

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
function str_inspect(str, mid) {
	return '"' + str + '"';
}

// Returns the character length of `str`.
// 
// @return [Number] length of string
function str_length(str, mid) {
	return str.length;
}

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
function str_intern(str, mid) {
	return opalsym(str);
}

// Returns a new string with the characters from `self` in reverse order.
// 
// @example
//   "stressed".reverse
//   # => "desserts"
// 
// @return [String]
function str_reverse(str, mid) {
	return str.split("").reverse().join("");
}

function str_sub(str, mid, pattern) {
	return str.replace(pattern, block);
}

function str_gsub(str, mid, pattern) {
	var r = pattern.toString();
	r = r.substr(1, r.lastIndexOf('/') - 1);
	r = new RegExp(r, 'g');
	return str.replace(r, block);
}

function str_slice(str, mid, start, finish) {
	return str.substr(start, finish);
}

function str_split(str, mid, split) {
	return str.split(split);
}

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
function str_cmp_m(str, mid, other) {
  if (!(other.info & TS)) return Qnil;
  else if (str > other) return 1;
  else if (str < other) return -1;
  return 0;
}

// Equality - if `other` is not a {String} return `false`. Otherwise, returns
// `true` if `self` <=> `other` returns zero.
// 
// @param [String] other string to compare
// @return [Boolean] result
function str_equal(str, mid, other) {
	return str.valueOf() == other.valueOf() ? Qtrue : Qfalse;
}

// Match - If obj is a {Regexp}, then uses it to match against self, returning
// `nil` if there is no match, or the index of the match location otherwise. If
// obj is not a regexp, then it calls `=~` on it, using the receiver as an
// argument.
// 
// @todo passing a non regexp is not currently supported
// 
// @param [Regexp, Object] obj
// @return [Number, nil]
function str_match(str, mid, obj) {
	rb_call(obj, "match", self);
	return Qnil;
}

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
function str_casecmp(str, mid, other) {
	var a = str.toLowerCase(), b = other.toLowerCase();
	if (!(b.info & TS)) return Qnil;
	else if (a > b) return 1;
	else if (a < b) return -1;
	return 0;
}

// Returns `true` if `self` has a length of zero.
// 
// @example
//   "hello".empty?
//   # => false
//   "".empty?
//   # => true
// 
// @return [Boolean]
function str_empty(str, mid) {
	return str == "" ? Qtrue : Qfalse;
}

// Returns `true` if `self` ends with a `suffix` given.
// 
// @example
//   "hello".end_with? "lo"
//   # => true
// 
// @param [String] suffix suffix to check
// @return [Boolean]
function str_end_with(str, mid, suffix) {
	if (!suffix) return false;
	
	if (str.lastIndexOf(suffix) == str.length - suffix.length)
		return Qtrue;
	
	return Qfalse;
}

// Two strings are equal if they have the same length and content.
// 
// @param [String] other string to comapre
// @return [Boolean]
function str_eql(str, mid, other) {
	return str == other ? Qtrue : Qfalse;	
}

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
function str_include(str, mid, other) {
	var res = str.indexOf(other);
	
	return res == -1 ? Qfalse : Qtrue;
}

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
function str_index(str, mid, substr) {
	var res = str.indexOf(substr);
	
	return res == -1 ? Qnil : res;	
}

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
function str_lstrip(str, mid) {
	return str.replace(/^\s*/, "");
}

// Converts `pattern` to a match, if it isnt alrady one, then invokes its 
// `match` method on the receiver. 
// 
// @param [Regexp] pattern
// @return [MatchData, nil]
function str_match_m(str, mid, pattern) {
	return rb_call(pattern, "match", str);
}

function sym_inspect(sym) {
	return ":" + sym.__ptr__;
}

function sym_to_s(sym) {
	return sym.__ptr__;
}

function sym_to_sym(sym) {
	return sym;
}

var Init_String = function() {
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