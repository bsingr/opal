// @class Regexp
var rb_cRegexp;
// @class MatchData
var rb_cMatch;

// `#{m = nil}
// var test;
// if (test = #{self}.exec(#{string})) {
//   #{m} = #{MatchData.new(`test`)};
//   #{self}.gs('$&', test[0]);
//   for (var i = 1; i < test.length; i++) {
//     #{self}.gs('$' + i, test[i]);
//   }
// } else {
//   #{m = nil};
// }
// return #{$~ = m};`


// Regexp#__match__
var rb_cRegexp_match = function(regexp, block, string) {
	var test, match = Qnil;
	
	if (test = regexp.exec(string)) {
		match = rb_cMatch_alloc();
		rb_ivar_set(match, '@data', []);
	}
	
	return match;
};

var rb_cMatch_alloc = function() {
	return rb_obj_alloc(rb_cMatch);
}

var Init_Regexp = function() {
	// @class Regexp
	rb_cRegexp = rb_define_toll_free_class(RegExp.prototype, T_OBJECT, 'Regexp', rb_cObject);
	
	rb_define_method(rb_cRegexp, "__match__", rb_cRegexp_match);
	
	rb_cMatch = rb_define_class('MatchData', rb_cObject);
};
