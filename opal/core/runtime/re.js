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

function rb_reg_match_m(reg, id, _, str) {
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

function rb_reg_eqq(reg, id, _, str) {
  var m = reg.exec(str);
  if (m == null) return false;
  return true;
};

function Init_Regexp() {

  rb_cRegexp = rb_define_class("Regexp", rb_cObject);
  RegExp.prototype.klass = rb_cRegexp;
  RegExp.prototype.flags = T_OBJECT;
  // 
  // rb_define_method(rb_cRegexp, "===", rb_reg_eqq, 1);
  // rb_define_method(rb_cRegexp, "match", rb_reg_match_m, -1);
 
  rb_cMatch = rb_define_class("MatchData", rb_cObject);
  rb_define_singleton_method(rb_cMatch, "new", rb_match_new, 1);
  rb_define_method(rb_cMatch, "size", rb_match_size, 0);
  rb_define_method(rb_cMatch, "length", rb_match_size, 0);
  rb_define_method(rb_cMatch, "[]", rb_match_aref, -1);
  rb_define_method(rb_cMatch, "to_s", rb_match_to_s, 0);
  rb_define_method(rb_cMatch, "inspect", rb_match_inspect, 0);
};
