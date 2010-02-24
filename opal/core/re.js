/* 
 * re.js
 * opal
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


var rb_cRegexp, rb_eRegexpError, rb_cMatch;

function rb_reg_match_m(reg, str) {
  var m = reg.exec(str);
  if (m == null) return nil;
  return rb_match_new(rb_cMatch, m);
};

/**
  Init matchdata - data is array of match results (as from js)
*/
function rb_match_new(match, data) {
  var o = rb_obj_alloc(match);
  o.iv_tbl.data = data;
  return o;
};

function rb_match_inspect(match) {
  return '#<MatchData "' + match.iv_tbl.data[0] + '">';
};

function rb_match_to_s(match) {
  return match.iv_tbl.data[0];
};

function rb_match_size(match) {
  return match.iv_tbl.data[0];
};

function rb_match_aref(match, idx) {
  return match.iv_tbl.data[idx];
};

function rb_reg_eqq(reg, str) {
  var m = reg.exec(str);
  if (m == null) return false;
  return true;
};

function Init_Regexp() {
  // rb_eRegexpError = rb_define_class("RegexpError", rb_eStandardError);
  
  // rb_define_virtual_variable("$~", rb_match_getter, rb_match_setter);
  // rb_define_virtual_variable("$&", rb_last_match_getter, 0);
  // rb_define_virtual_variable("$`", rb_prematch_getter, 0);
  // rb_define_virtual_variable("$'", rb_postmatch_getter, 0);
  // rb_define_virtual_variable("$+", rb_last_paren_match_getter, 0);

  // rb_define_virtual_variable("$=", rb_ignorecase_getter, rb_ignorecase_setter);
  // rb_define_virtual_variable("$KCODE", rb_kcode_getter, rb_kcode_setter);
  // rb_define_virtual_variable("$-K", rb_kcode_getter, rb_kcode_setter);

  rb_cRegexp = rb_define_class("Regexp", rb_cObject);
  RegExp.prototype.klass = rb_cRegexp;
  // rb_define_alloc_func(rb_cRegexp, rb_reg_s_alloc);
  // rb_define_singleton_method(rb_cRegexp, "compile", rb_class_new_instance, -1);
  // rb_define_singleton_method(rb_cRegexp, "quote", rb_reg_s_quote, 1);
  // rb_define_singleton_method(rb_cRegexp, "escape", rb_reg_s_quote, 1);
  // rb_define_singleton_method(rb_cRegexp, "union", rb_reg_s_union_m, -2);
  // rb_define_singleton_method(rb_cRegexp, "last_match", rb_reg_s_last_match, -1);
  // rb_define_singleton_method(rb_cRegexp, "try_convert", rb_reg_s_try_convert, 1);

  // rb_define_method(rb_cRegexp, "initialize", rb_reg_initialize_m, -1);
  // rb_define_method(rb_cRegexp, "initialize_copy", rb_reg_init_copy, 1);
  // rb_define_method(rb_cRegexp, "hash", rb_reg_hash, 0);
  // rb_define_method(rb_cRegexp, "eql?", rb_reg_equal, 1);
  // rb_define_method(rb_cRegexp, "==", rb_reg_equal, 1);
  // rb_define_method(rb_cRegexp, "=~", rb_reg_match, 1);
  rb_define_method(rb_cRegexp, "===", rb_reg_eqq, 1);
  // rb_define_method(rb_cRegexp, "~", rb_reg_match2, 0);
  rb_define_method(rb_cRegexp, "match", rb_reg_match_m, -1);
  // rb_define_method(rb_cRegexp, "to_s", rb_reg_to_s, 0);
  // rb_define_method(rb_cRegexp, "inspect", rb_reg_inspect, 0);
  // rb_define_method(rb_cRegexp, "source", rb_reg_source, 0);
  // rb_define_method(rb_cRegexp, "casefold?", rb_reg_casefold_p, 0);
  // rb_define_method(rb_cRegexp, "options", rb_reg_options_m, 0);
  // rb_define_method(rb_cRegexp, "encoding", rb_obj_encoding, 0);
  // rb_define_method(rb_cRegexp, "fixed_encoding?", rb_reg_fixed_encoding_p, 0);
  // rb_define_method(rb_cRegexp, "names", rb_reg_names, 0);
  // rb_define_method(rb_cRegexp, "named_captures", rb_reg_named_captures, 0);
 
  rb_cMatch = rb_define_class("MatchData", rb_cObject);
  // rb_define_alloc_func(rb_cMatch, rb_match_alloc);
  rb_define_singleton_method(rb_cMatch, "new", rb_match_new, 1);
  // rb_define_method(rb_cMatch, "initialize_copy", match_init_copy, 1);
  // rb_define_method(rb_cMatch, "regexp", match_regexp, 0);
  // rb_define_method(rb_cMatch, "names", match_names, 0);
  rb_define_method(rb_cMatch, "size", rb_match_size, 0);
  rb_define_method(rb_cMatch, "length", rb_match_size, 0);
  // rb_define_method(rb_cMatch, "offset", match_offset, 1);
  // rb_define_method(rb_cMatch, "begin", match_begin, 1);
  // rb_define_method(rb_cMatch, "end", match_end, 1);
  // rb_define_method(rb_cMatch, "to_a", match_to_a, 0);
  rb_define_method(rb_cMatch, "[]", rb_match_aref, -1);
  // rb_define_method(rb_cMatch, "captures", match_captures, 0);
  // rb_define_method(rb_cMatch, "values_at", match_values_at, -1);
  // rb_define_method(rb_cMatch, "pre_match", rb_reg_match_pre, 0);
  // rb_define_method(rb_cMatch, "post_match", rb_reg_match_post, 0);
  rb_define_method(rb_cMatch, "to_s", rb_match_to_s, 0);
  rb_define_method(rb_cMatch, "inspect", rb_match_inspect, 0);
  // rb_define_method(rb_cMatch, "string", match_string, 0);
};
