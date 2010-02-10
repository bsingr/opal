/* 
 * hash.js
 * cappruby
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

rb_cHash = nil;

/**
  Create a new hash. Only called from JS. args are keys and values, so:
  key1, val1, key2, val2, .......keyN, valN.
*/
rb_hash_new = function () {
  var k, v, h = new objj_dictionary();
  for (var i = 0; i < arguments.length; i++) {
    k = arguments[i], v = arguments[i+1];
    i ++;
    dictionary_setValue(h, k, v);
  }
  return h;
};

function rb_hash_delete(hash, sel, id) {
  var r = dictionary_getValue(hash, id);
  dictionary_removeValue(hash, id);
  return r;
};

function rb_hash_merge(hash, sel, options) {
    return objj_msgSend(hash, "addEntriesFromDictionary:", options);
};

function rb_hash_to_hash(hash, sel) {
  return hash;
};

function rb_hash_to_a(hash, sel) {
  var res = [];
  for (var i = 0; i < hash._keys.length; i++) {
    res.push([hash._keys[i], hash._buckets[hash._keys[i]]]);
  }
  return res;
};

function rb_hash_inspect(hash, sel) {
  return dictionary_description(hash);
};

function rb_hash_equal(hash, sel, other) {
  return objj_msgSend(hash, 'isEqualToDictionary:', other);
};

function rb_hash_aref(hash, sel, key) {
  var obj = hash._buckets[key];
  return (obj === undefined) ? nil : obj;
};

function rb_hash_eql(hash, sel, other) {
  return objj_msgSend(hash, 'isEqualToDictionary:', other);
};

function rb_hash_aset(hash, sel, key, val) {
  dictionary_setValue(hash, key, val);
  return val;
};

function rb_hash_size(hash, sel) {
  return hash.count;
};

function rb_hash_empty_p(hash, sel) {
  return (hash.count === 0) ? true : false;
};

function rb_hash_each_value(hash, sel) {
  var _$ = cappruby_block; cappruby_block = nil;
  if (!_$) throw "no block passed to hash#each_value. need to return enumerator"

  for (var i = 0; i < hash.count; i++) {
    cr_yield(_$, [hash._buckets[hash._keys[i]]]);
  }
  return hash;
};

function rb_hash_each_key(hash, sel) {
  var _$ = cappruby_block; cappruby_block = nil;
  if (!_$) throw "no block passed to hash#each_key. need to return enumerator"

  for (var i = 0; i < hash.count; i++) {
    cr_yield(_$, [hash._keys[i]]);
  }
  return hash;
};

function rb_hash_each_pair(hash, sel) {
  var _$ = cappruby_block; cappruby_block = nil;
  if (!_$) throw "no block passed to hash#each_pair. need to return enumerator"

  for (var i = 0; i < hash.count; i++) {
    cr_yield(_$, [hash._keys[i], hash._buckets[hash._keys[i]]]);
  }
  return hash;
};

function rb_hash_keys(hash, sel) {
  return hash._keys;
};

function rb_hash_values(hash, sel) {
  var res = [];
  for (var i = 0; i < hash.count; i++) {
    res.push(dictionary_getValue(hash, hash._keys[i]));
  }
  return res;
};

function rb_hash_values_at(hash, sel) {
  var keys = Array.prototype.slice.call(arguments, 2);
  var res;
  for (var i = 0; i < keys.length; i++) {
    res.push(dictionary_getValue(hash, keys[i]));
  }
  return res;
};

function rb_hash_clear(hash, sel) {
  objj_msgSend(hash, 'removeAllObjects');
  return hash;
};

function Init_Hash() {
  rb_cHash = objj_getClass("CPDictionary");
  rb_const_set(rb_cObject, "Hash", rb_cHash);
  
  // rb_include_module(rb_cHash, rb_mEnumerable);
  
  // rb_define_singleton_method(rb_cHash, "[]", rb_hash_s_create, -1);
  // rb_define_singleton_method(rb_cHash, "try_convert", rb_hash_s_try_convert, 1);
  // rb_define_method(rb_cHash, "initialize", rb_hash_initialize, -1);

  rb_define_method(rb_cHash, "to_hash", rb_hash_to_hash, 0);
  rb_define_method(rb_cHash, "to_a", rb_hash_to_a, 0);
  rb_define_method(rb_cHash, "to_s", rb_hash_inspect, 0);
  rb_define_method(rb_cHash, "inspect", rb_hash_inspect, 0);

  rb_define_method(rb_cHash, "==", rb_hash_equal, 1);
  rb_define_method(rb_cHash, "[]", rb_hash_aref, 1);
  rb_define_method(rb_cHash, "eql?", rb_hash_eql, 1);
  // rb_define_method(rb_cHash, "fetch", rb_hash_fetch, -1);
  rb_define_method(rb_cHash, "[]=", rb_hash_aset, 2);
  rb_define_method(rb_cHash, "store:", rb_hash_aset, 2);
  // rb_define_method(rb_cHash, "default", rb_hash_default, -1);
  // rb_define_method(rb_cHash, "default=", rb_hash_set_default, 1);
  // rb_define_method(rb_cHash, "default_proc", rb_hash_default_proc, 0);
  // rb_define_method(rb_cHash, "key", rb_hash_key, 1);
  // rb_define_method(rb_cHash, "index", rb_hash_index, 1);
  rb_define_method(rb_cHash, "size", rb_hash_size, 0);
  rb_define_method(rb_cHash, "length", rb_hash_size, 0);
  rb_define_method(rb_cHash, "empty?", rb_hash_empty_p, 0);

  rb_define_method(rb_cHash, "each_value", rb_hash_each_value, 0);
  rb_define_method(rb_cHash, "each_key", rb_hash_each_key, 0);
  rb_define_method(rb_cHash, "each_pair", rb_hash_each_pair, 0);
  rb_define_method(rb_cHash, "each", rb_hash_each_pair, 0);

  rb_define_method(rb_cHash, "keys", rb_hash_keys, 0);
  rb_define_method(rb_cHash, "values", rb_hash_values, 0);
  rb_define_method(rb_cHash, "values_at", rb_hash_values_at, -1);

  // rb_define_method(rb_cHash, "shift", rb_hash_shift, 0);
  rb_define_method(rb_cHash, "delete:", rb_hash_delete, 1);
  // rb_define_method(rb_cHash, "delete_if", rb_hash_delete_if, 0);
  // rb_define_method(rb_cHash, "select", rb_hash_select, 0);
  // rb_define_method(rb_cHash, "reject", rb_hash_reject, 0);
  // rb_define_method(rb_cHash, "reject!", rb_hash_reject_bang, 0);
  rb_define_method(rb_cHash, "clear", rb_hash_clear, 0);
  // rb_define_method(rb_cHash, "invert", rb_hash_invert, 0);

  // rb_define_method(rb_cHash, "update", rb_hash_update, 1);
  // rb_define_method(rb_cHash, "replace", rb_hash_replace, 1);
  // rb_define_method(rb_cHash, "merge!", rb_hash_update, 1);
  rb_define_method(rb_cHash, "merge:", rb_hash_merge, 1);
  // rb_define_method(rb_cHash, "assoc", rb_hash_assoc, 1);
  // rb_define_method(rb_cHash, "rassoc", rb_hash_rassoc, 1);
  // rb_define_method(rb_cHash, "flatten", rb_hash_flatten, -1);
};
