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

Array.prototype.$klass = cArray ;
Array.prototype.$type = VN.ARRAY ;

Array.prototype.$call = RObject.prototype.$call;

RModule.include(cArray, mEnumerable);

cArray.$define_alloc_func(function() {
  return new Array() ;
});

cArray.$define_singleton_method('[]', function() {
  
});

cArray.$define_singleton_method('try_convert', function() {
  
});

cArray.$def('initialize', function() {
  for (var i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
});

cArray.$def('initialize_copy', function() {
  
});



cArray.$def('to_s', function() {
  if (this.length == 0) return '[]';
  var str = '[';
  for (var i = 0; i < (this.length - 1); i++) {
    str += (VN.funcall(this[i], 'inspect', []) + ', ');
  }
  str += (VN.funcall(this[this.length - 1], 'inspect', []) + ']');
  return str ;
});

// Basically copy the to_s method to the inspect method
cArray.$def('inspect', cArray['to_s']);

cArray.$def('to_a', function() {
  return this ;
});

cArray.$def('to_ary', function() {
  return this ;
});

cArray.$def('frozen?', function() {
  
});



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

cArray.$def('==', VN.ary_equal, 1);
cArray.$def('eql?', VN.ary_eql, 1);
cArray.$def('hash', VN.ary_hash, 0);

VN.ary_aref = function() {
  if (arguments.length == 2) {
    var begin = arguments[0] ;
    var end = arguments[1] ;
    if (begin < 0) begin += this.length ;
    return VN.ary_subseq.call(this, begin, length) ;
  }
};

cArray.$def('[]', VN.ary_aref, -1);
cArray.$def('[]=', VN.ary_aset, -1);
cArray.$def('at', VN.ary_at, 1);
cArray.$def('fetch', VN.ary_fetch, -1);
cArray.$def('first', VN.ary_first, -1);
cArray.$def('last', VN.ary_last, -1);
cArray.$def('concat', VN.ary_concat, 1);
cArray.$def('<<', VN.ary_push, 1);
cArray.$def('push', VN.ary_push_m, -1);
cArray.$def('pop', VN.ary_pop_m, -1);
cArray.$def('shift', VN.ary_shift_m, -1);
cArray.$def('unshift', VN.ary_unshift_m, -1);
cArray.$def('insert', VN.ary_insert, -1);
cArray.$def('each', VN.ary_each, 0);
cArray.$def('each_index', VN.ary_each_index, 0);
cArray.$def('reverse_each', VN.ary_reverse_each, 0);
cArray.$def('length', VN.ary_length, 0);
cArray.$define_alias'size', 'length');
cArray.$def('empty?', VN.ary_empty_p, 0);
cArray.$def('find_index', VN.ary_index, -1);
cArray.$def('index', VN.ary_index, -1);
cArray.$def('rindex', VN.ary_rindex, -1);
cArray.$def('join', VN.ary_join_m, -1);
cArray.$def('reverse', VN.ary_reverse_m, 0);
cArray.$def('reverse!', VN.ary_reverse_bang, 0);
cArray.$def('sort', VN.ary_sort, 0);
cArray.$def('sort!', VN.ary_sort_bang, 0);
cArray.$def('collect', VN.ary_collect, 0);
cArray.$def('collect!', VN.ary_collect_bang, 0);
cArray.$def('map', VN.ary_collect, 0);
cArray.$def('map!', VN.ary_collect_bang, 0);
cArray.$def('select', VN.ary_select, 0);
cArray.$def('values_at', VN.ary_values_at, -1);
cArray.$def('delete', VN.ary_delete, 1);
cArray.$def('delete_at', VN.ary_delete_at_m, 1);
cArray.$def('delete_if', VN.ary_delete_if, 0);
cArray.$def('reject', VN.ary_reject, 0);
cArray.$def('reject!', VN.ary_reject_bang, 0);
cArray.$def('zip', VN.ary_zip, -1);
cArray.$def('transpose', VN.ary_transpose, 0);
cArray.$def('replace', VN.ary_replace, 1);
cArray.$def('clear', VN.ary_clear, 0);
cArray.$def('fill', VN.ary_fill, -1);
cArray.$def('include?', VN.ary_includes, 1);
cArray.$def('<=>', VN.ary_cmp, 1);

cArray.$def('slice', VN.ary_aref, -1);
cArray.$def('slice!', VN.ary_slice_bang, -1);

cArray.$def('assoc', VN.ary_assoc, 1);
cArray.$def('rassoc', VN.ary_rassoc, 1);

cArray.$def('+', VN.ary_plus, 1);
cArray.$def('*', VN.ary_times, 1);

cArray.$def('-', VN.ary_diff, 1);
cArray.$def('&', VN.ary_and, 1);
cArray.$def('|', VN.ary_or, 1);

cArray.$def('uniq', VN.ary_uniq, 0);
cArray.$def('uniq!', VN.ary_uniq_bang, 0);
cArray.$def('compact', VN.ary_compact, 0);
cArray.$def('compact!', VN.ary_compact_bang, 0);
cArray.$def('flatten', VN.ary_flatten, -1);
cArray.$def('flatten!', VN.ary_flatten_bang, -1);
cArray.$def('count', VN.ary_count, -1);
cArray.$def('shuffle!', VN.ary_shuffle_bang, 0);
cArray.$def('shuffle', VN.ary_shuffle, 0);
cArray.$def('sample', VN.ary_sample, -1);
cArray.$def('cycle', VN.ary_cycle, -1);
cArray.$def('permutation', VN.ary_permutation, -1);
cArray.$def('combination', VN.ary_combination, 1);
cArray.$def('product', VN.ary_product, -1);

cArray.$def('take', VN.ary_take, 1);
cArray.$def('take_while', VN.ary_take_while, 0);
cArray.$def('drop', VN.ary_drop, 1);
cArray.$def('drop_while', VN.ary_drop_while, 0);



