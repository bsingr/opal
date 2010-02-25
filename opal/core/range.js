/* 
 * range.js
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


var rb_cRange;

var RRange = function(beg, end, exc) {
  this.hash = opal_yield_hash();
  this.klass = rb_cRange ;
  this.flags = T_OBJECT;
  this.iv_tbl = {};
  this.beg = beg;
  this.end = end;
  this.exc = RTEST(exc);
  return this;
};

function rb_range_initialize(range, beg, end, exc) {
  range.beg = beg;
  range.end = end;
  range.exc = RTEST(exc);
};

function rb_range_eqq(range, other) {
  if (other.klass !== rb_cNumber && other.klass !== rb_cString) {
    // console.log(other);
    rb_raise(rb_eArgError, "bad value for range");
  }
  var beg = range.beg;
  var end = range.exc ? range.end : range.end - 1;
  if (other >= beg && other <= end) return true;
  return false;
};

function rb_range_eq(range, other) {
  if (other.klass !== rb_cRange) return false;
  if (range.beg !== other.beg) return false;
  if (range.end !== other.end) return false;
  if (range.exc !== range.exc) return false;
  return true;
};

function rb_range_first(range) {
  return range.beg;
};

function rb_range_last(range) {
  return range.end;
};

function rb_range_to_a(range) {
  var res = [], end;
  // case strings
  if (range.beg.klass == rb_cString) {
    end = range.exc ? range.end.charCodeAt(0) - 1 : range.end.charCodeAt(0);
    for (var i = range.beg.charCodeAt(0); i <= end; i++) {
      res.push(String.fromCharCode(i));
    }
  }
  // case numbers
  if (range.beg.klass == rb_cNumber) {
    end = range.exc ? range.end - 1 : range.end;
    for (var i = range.beg; i <= end; i++) {
      res.push(i);
    }
  }
  return res;
};

function rb_range_to_s(range) {
  return range.beg + (range.exc ? ".." : "...") + range.end;
};

function rb_range_inspect(range) {
  return vm_send(range.beg, "inspect", [], nil, 8) + (range.exc ? ".." : "...") + vm_send(range.end, "inspect", [], nil, 8);
};

function rb_range_exclude_end_p(range) {
  return !range.exc;
};

function Init_Range() {
  rb_cRange = rb_define_class("Range", rb_cObject);
  // rb_include_module(rb_cRange, rb_cEnumerable);

  rb_define_method(rb_cRange, "initialize", rb_range_initialize, -1);
  // rb_define_method(rb_cRange, "initialize_copy",rb_range_initialize_copy, 1);
  rb_define_method(rb_cRange, "==", rb_range_eq, 1);
  rb_define_method(rb_cRange, "===", rb_range_eqq, 1);
  // rb_define_method(rb_cRange, "eql?", rb_range_eql, 1);
  // rb_define_method(rb_cRange, "hash", rb_range_hash, 0);
  // rb_define_method(rb_cRange, "each", rb_range_each, 0);
  // rb_define_method(rb_cRange, "step", rb_range_step, -1);
  // rb_define_method(rb_cRange, "begin", rb_range_begin, 0);
  // rb_define_method(rb_cRange, "end", rb_range_end, 0);
  rb_define_method(rb_cRange, "first", rb_range_first, -1);
  rb_define_method(rb_cRange, "last", rb_range_last, -1);
  // rb_define_method(rb_cRange, "min", rb_range_min, 0);
  // rb_define_method(rb_cRange, "max", rb_range_max, 0);
  rb_define_method(rb_cRange, "to_s", rb_range_to_s, 0);
  rb_define_method(rb_cRange, "inspect", rb_range_inspect, 0);
  rb_define_method(rb_cRange, "to_a", rb_range_to_a, 0);

  rb_define_method(rb_cRange, "exclude_end?", rb_range_exclude_end_p, 0);

  // rb_define_method(rb_cRange, "member?", rb_range_include, 1);
  // rb_define_method(rb_cRange, "include?", rrb_ange_include, 1);
  // rb_define_method(rb_cRange, "cover?", rb_range_cover, 1);
}
