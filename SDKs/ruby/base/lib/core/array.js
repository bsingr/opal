/* 
 * array.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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

Array.prototype.klass = VN.cArray ;
Array.prototype.type = VN.T_ARRAY ;

// VN.include_module(VN.cArray, VN.mEnumerable);

/**
  Array#allocate
*/
VN.ary_alloc = function() {
  return new Array() ;
};

/**
  Array#initialize (*args)
*/
VN.ary_initialize = function() {
  for (var i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
};

VN.define_alloc_func(VN.cArray, VN.ary_alloc);
VN.define_singleton_method(VN.cArray, '[]', VN.ary_s_create, -1);
VN.define_singleton_method(VN.cArray, 'try_convert', VN.ary_s_try_convert, 1);
VN.define_method(VN.cArray, 'initialize', VN.ary_initialize, -1);
VN.define_method(VN.cArray, 'initialize_copy', VN.ary_replace, 1);

VN.ary_inspect = function() {
  if (this.length == 0) return '[]';
  var str = '[';
  for (var i = 0; i < (this.length - 1); i++) {
    str += (VN.funcall(this[i], 'inspect', []) + ', ');
  }
  str += (VN.funcall(this[this.length - 1], 'inspect', []) + ']');
  return str ;
};

VN.ary_to_a = function() {
  return this;
};

VN.ary_to_ary_m = function() {
  return this;
};

VN.define_method(VN.cArray, 'to_s', VN.ary_inspect, 0);
VN.define_method(VN.cArray, 'inspect', VN.ary_inspect, 0);
VN.define_method(VN.cArray, 'to_a', VN.ary_to_a, 0);
VN.define_method(VN.cArray, 'to_ary', VN.ary_to_ary_m, 0);
VN.define_method(VN.cArray, 'frozen?',  VN.ary_frozen_p, 0);

VN.ary_equal = function(ary) {
  if (ary == this) return VN.Qtrue ;
  if (ary.type != VN.T_ARRAY) {
    if (!VN.respond_to(ary, 'to_ary')) {
      return VN.Qfalse;
    }
    return VN.equal(ary, this);
  }
  if (this.length != ary.length) return VN.Qfalse ;
  return VN.Qtrue;
};

VN.define_method(VN.cArray, '==', VN.ary_equal, 1);
VN.define_method(VN.cArray, 'eql?', VN.ary_eql, 1);
VN.define_method(VN.cArray, 'hash', VN.ary_hash, 0);

VN.ary_aref = function() {
  if (arguments.length == 2) {
    var begin = arguments[0] ;
    var end = arguments[1] ;
    if (begin < 0) begin += this.length ;
    return VN.ary_subseq.call(this, begin, length) ;
  }
};

VN.define_method(VN.cArray, '[]', VN.ary_aref, -1);
VN.define_method(VN.cArray, '[]=', VN.ary_aset, -1);
VN.define_method(VN.cArray, 'at', VN.ary_at, 1);
VN.define_method(VN.cArray, 'fetch', VN.ary_fetch, -1);
VN.define_method(VN.cArray, 'first', VN.ary_first, -1);
VN.define_method(VN.cArray, 'last', VN.ary_last, -1);
VN.define_method(VN.cArray, 'concat', VN.ary_concat, 1);
VN.define_method(VN.cArray, '<<', VN.ary_push, 1);
VN.define_method(VN.cArray, 'push', VN.ary_push_m, -1);
VN.define_method(VN.cArray, 'pop', VN.ary_pop_m, -1);
VN.define_method(VN.cArray, 'shift', VN.ary_shift_m, -1);
VN.define_method(VN.cArray, 'unshift', VN.ary_unshift_m, -1);
VN.define_method(VN.cArray, 'insert', VN.ary_insert, -1);
VN.define_method(VN.cArray, 'each', VN.ary_each, 0);
VN.define_method(VN.cArray, 'each_index', VN.ary_each_index, 0);
VN.define_method(VN.cArray, 'reverse_each', VN.ary_reverse_each, 0);
VN.define_method(VN.cArray, 'length', VN.ary_length, 0);
VN.define_alias(VN.cArray,  'size', 'length');
VN.define_method(VN.cArray, 'empty?', VN.ary_empty_p, 0);
VN.define_method(VN.cArray, 'find_index', VN.ary_index, -1);
VN.define_method(VN.cArray, 'index', VN.ary_index, -1);
VN.define_method(VN.cArray, 'rindex', VN.ary_rindex, -1);
VN.define_method(VN.cArray, 'join', VN.ary_join_m, -1);
VN.define_method(VN.cArray, 'reverse', VN.ary_reverse_m, 0);
VN.define_method(VN.cArray, 'reverse!', VN.ary_reverse_bang, 0);
VN.define_method(VN.cArray, 'sort', VN.ary_sort, 0);
VN.define_method(VN.cArray, 'sort!', VN.ary_sort_bang, 0);
VN.define_method(VN.cArray, 'collect', VN.ary_collect, 0);
VN.define_method(VN.cArray, 'collect!', VN.ary_collect_bang, 0);
VN.define_method(VN.cArray, 'map', VN.ary_collect, 0);
VN.define_method(VN.cArray, 'map!', VN.ary_collect_bang, 0);
VN.define_method(VN.cArray, 'select', VN.ary_select, 0);
VN.define_method(VN.cArray, 'values_at', VN.ary_values_at, -1);
VN.define_method(VN.cArray, 'delete', VN.ary_delete, 1);
VN.define_method(VN.cArray, 'delete_at', VN.ary_delete_at_m, 1);
VN.define_method(VN.cArray, 'delete_if', VN.ary_delete_if, 0);
VN.define_method(VN.cArray, 'reject', VN.ary_reject, 0);
VN.define_method(VN.cArray, 'reject!', VN.ary_reject_bang, 0);
VN.define_method(VN.cArray, 'zip', VN.ary_zip, -1);
VN.define_method(VN.cArray, 'transpose', VN.ary_transpose, 0);
VN.define_method(VN.cArray, 'replace', VN.ary_replace, 1);
VN.define_method(VN.cArray, 'clear', VN.ary_clear, 0);
VN.define_method(VN.cArray, 'fill', VN.ary_fill, -1);
VN.define_method(VN.cArray, 'include?', VN.ary_includes, 1);
VN.define_method(VN.cArray, '<=>', VN.ary_cmp, 1);

VN.define_method(VN.cArray, 'slice', VN.ary_aref, -1);
VN.define_method(VN.cArray, 'slice!', VN.ary_slice_bang, -1);

VN.define_method(VN.cArray, 'assoc', VN.ary_assoc, 1);
VN.define_method(VN.cArray, 'rassoc', VN.ary_rassoc, 1);

VN.define_method(VN.cArray, '+', VN.ary_plus, 1);
VN.define_method(VN.cArray, '*', VN.ary_times, 1);

VN.define_method(VN.cArray, '-', VN.ary_diff, 1);
VN.define_method(VN.cArray, '&', VN.ary_and, 1);
VN.define_method(VN.cArray, '|', VN.ary_or, 1);

VN.define_method(VN.cArray, 'uniq', VN.ary_uniq, 0);
VN.define_method(VN.cArray, 'uniq!', VN.ary_uniq_bang, 0);
VN.define_method(VN.cArray, 'compact', VN.ary_compact, 0);
VN.define_method(VN.cArray, 'compact!', VN.ary_compact_bang, 0);
VN.define_method(VN.cArray, 'flatten', VN.ary_flatten, -1);
VN.define_method(VN.cArray, 'flatten!', VN.ary_flatten_bang, -1);
VN.define_method(VN.cArray, 'count', VN.ary_count, -1);
VN.define_method(VN.cArray, 'shuffle!', VN.ary_shuffle_bang, 0);
VN.define_method(VN.cArray, 'shuffle', VN.ary_shuffle, 0);
VN.define_method(VN.cArray, 'sample', VN.ary_sample, -1);
VN.define_method(VN.cArray, 'cycle', VN.ary_cycle, -1);
VN.define_method(VN.cArray, 'permutation', VN.ary_permutation, -1);
VN.define_method(VN.cArray, 'combination', VN.ary_combination, 1);
VN.define_method(VN.cArray, 'product', VN.ary_product, -1);

VN.define_method(VN.cArray, 'take', VN.ary_take, 1);
VN.define_method(VN.cArray, 'take_while', VN.ary_take_while, 0);
VN.define_method(VN.cArray, 'drop', VN.ary_drop, 1);
VN.define_method(VN.cArray, 'drop_while', VN.ary_drop_while, 0);



