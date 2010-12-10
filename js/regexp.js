/**
  @class Regexp

  A Regexp holds a regular expression, used to match a pattern against strings.
  Regexps are created using the `/.../` and `%r{...}` literals, and by the
  {Regexp.new} constructor.

  ## Implementation

  Toll free bridged with native regexp object.
*/
var rb_cRegexp;

// @class MatchData
var rb_cMatch;

/**
  Produce a nicely formatted string-version of `self`.

  @example
    /^abc/.inspect
    # => "/^abc/"

  @return [String] string
*/
function reg_inspect(reg, mid) {
  return reg.toString();
}

/**
  Equality - Two regexps are equal if their patterns are identical, they have
  the same character set code, and their {#casefold?} values are the same.

  @example
    /abc/ == /abc/x     # => false
    /abc/ == /abc/i     # => false
    /abc/ == /abc/n     # => false
    /abc/u == /abc/n    # => false

  @param [Regexp] other_regexp another regexp to comapre
  @return [Boolean]
*/
function reg_equal(reg, mid, reg2) {
  ARG_COUNT(1)
  return reg.toString() === reg2.toString() ? Qtrue : Qfalse;
}

/**
  Returns a {MatchData} object describing the match, or `nil` if there was no
  match. This is equivalent to retrieving the value of the special variable
  $~ following a normal match. If the second parameter is present, it 
  specifies the position in the string to begin the search.

  @example
    /(.)(.)(.)/.match("abc")[2]
    # => "b"
    /(.)(.)/.match("abc")[2]
    # => "c"

  @todo Passing a block is not yet supported.

  @param [Sring] string to match against
  @return [MatchData, nil] result or nil
*/
function reg_match(reg, mid, str) {
  var test, match = Qnil;
	
	if (test = reg.exec(str)) {
		match = rb_obj_alloc(rb_cMatch);
		rb_ivar_set(match, '@data', []);
	}
	
	return match;
}

function match_to_a(match, mid) {
  return rb_ivar_get(match, "@data");
}

function match_inspect(match, mide) {
  return "#<MatchData \"\">";
}

function match_aref(match, mid, idx) {
  return Qnil;
}

var Init_Regexp = function() {
	// @class Regexp
	rb_cRegexp = rb_define_toll_free_class(RegExp.prototype, T_OBJECT,
	  "Regexp", rb_cObject);
	  
	rb_define_method(rb_cRegexp, "inspect", reg_inspect);
	rb_define_method(rb_cRegexp, "==", reg_equal);
	rb_define_method(rb_cRegexp, "eql?", reg_equal);
	rb_define_method(rb_cRegexp, "match", reg_match);
		
	rb_cMatch = rb_define_class("MatchData", rb_cObject);
	rb_define_method(rb_cMatch, "to_a", match_to_a);
	rb_define_method(rb_cMatch, "inspect", match_inspect);
	rb_define_method(rb_cMatch, "aref", match_aref);
};
