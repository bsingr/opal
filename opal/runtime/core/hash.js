/* 
 * hash.js
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


var rb_cHash, rb_envtbl;

function rb_hash_alloc(klass) {
  var hash = new RHash();
  hash.klass = klass;
  FL_SET(hash, T_HASH);
  hash.ifnone = nil;
  return hash;
};

function rb_hash_new() {
  return rb_hash_alloc(rb_cHash);
};

function rb_hash_aset(hash, k, v) {
  if (hash.keys.indexOf(k) == -1) {
    hash.keys.push(k);
  }
  hash.dict[k] = v;
  return v;
};

function rb_hash_aref(hash, k) {
  if (hash.keys.indexOf(k) != -1) {
    return hash.dict[k];
  }
  return hash.ifnone;
};

function rb_hash_size(hash) {
  return hash.keys.length;
};

function rb_hash_has_key(hash, k) {
  if (hash.keys.indexOf(k) != -1) {
    return true;
  }
  return false;
};

function Init_Hash() {
  rb_cHash = rb_define_class("Hash", rb_cObject);
  // rb_include_module(rb_cHash, rb_mEnumerable);
  // rb_define_alloc_func(rb_cHash, rb_hash_alloc);
  
  // rb_define_singleton_method(rb_cHash, "[]", rb_hash_s_create, -1);
  // rb_define_singleton_method(rb_cHash, "try_convert", rb_hash_s_try_convert, 1);
  
  // rb_define_method(rb_cHash,"initialize", rb_hash_initialize, -1);
  // rb_define_method(rb_cHash,"initialize_copy", rb_hash_replace, 1);
  // rb_define_method(rb_cHash,"rehash", rb_hash_rehash, 0);

  // rb_define_method(rb_cHash,"to_hash", rb_hash_to_hash, 0);
  // rb_define_method(rb_cHash,"to_a", rb_hash_to_a, 0);
  // rb_define_method(rb_cHash,"to_s", rb_hash_inspect, 0);
  // rb_define_method(rb_cHash,"inspect", rb_hash_inspect, 0);

  // rb_define_method(rb_cHash,"==", rb_hash_equal, 1);
  rb_define_method(rb_cHash,"[]", rb_hash_aref, 1);
  // rb_define_method(rb_cHash,"hash", rb_hash_hash, 0);
  // rb_define_method(rb_cHash,"eql?", rb_hash_eql, 1);
  // rb_define_method(rb_cHash,"fetch", rb_hash_fetch_m, -1);
  rb_define_method(rb_cHash,"[]=", rb_hash_aset, 2);
  // rb_define_method(rb_cHash,"store", rb_hash_aset, 2);
  // rb_define_method(rb_cHash,"default", rb_hash_default, -1);
  // rb_define_method(rb_cHash,"default=", rb_hash_set_default, 1);
  // rb_define_method(rb_cHash,"default_proc", rb_hash_default_proc, 0);
  // rb_define_method(rb_cHash,"default_proc=", rb_hash_set_default_proc, 1);
  // rb_define_method(rb_cHash,"key", rb_hash_key, 1);
  // rb_define_method(rb_cHash,"index", rb_hash_index, 1);
  rb_define_method(rb_cHash,"size", rb_hash_size, 0);
  rb_define_method(rb_cHash,"length", rb_hash_size, 0);
  // rb_define_method(rb_cHash,"empty?", rb_hash_empty_p, 0);

  // rb_define_method(rb_cHash,"each_value", rb_hash_each_value, 0);
  // rb_define_method(rb_cHash,"each_key", rb_hash_each_key, 0);
  // rb_define_method(rb_cHash,"each_pair", rb_hash_each_pair, 0);
  // rb_define_method(rb_cHash,"each", rb_hash_each_pair, 0);

  // rb_define_method(rb_cHash,"keys", rb_hash_keys, 0);
  // rb_define_method(rb_cHash,"values", rb_hash_values, 0);
  // rb_define_method(rb_cHash,"values_at", rb_hash_values_at, -1);

  // rb_define_method(rb_cHash,"shift", rb_hash_shift, 0);
  // rb_define_method(rb_cHash,"delete", rb_hash_delete, 1);
  // rb_define_method(rb_cHash,"delete_if", rb_hash_delete_if, 0);
  // rb_define_method(rb_cHash,"select", rb_hash_select, 0);
  // rb_define_method(rb_cHash,"reject", rb_hash_reject, 0);
  // rb_define_method(rb_cHash,"reject!", rb_hash_reject_bang, 0);
  // rb_define_method(rb_cHash,"clear", rb_hash_clear, 0);
  // rb_define_method(rb_cHash,"invert", rb_hash_invert, 0);
  // rb_define_method(rb_cHash,"update", rb_hash_update, 1);
  // rb_define_method(rb_cHash,"replace", rb_hash_replace, 1);
  // rb_define_method(rb_cHash,"merge!", rb_hash_update, 1);
  // rb_define_method(rb_cHash,"merge", rb_hash_merge, 1);
  // rb_define_method(rb_cHash, "assoc", rb_hash_assoc, 1);
  // rb_define_method(rb_cHash, "rassoc", rb_hash_rassoc, 1);
  // rb_define_method(rb_cHash, "flatten", rb_hash_flatten, -1);

  rb_define_method(rb_cHash,"include?", rb_hash_has_key, 1);
  rb_define_method(rb_cHash,"member?", rb_hash_has_key, 1);
  rb_define_method(rb_cHash,"has_key?", rb_hash_has_key, 1);
  // rb_define_method(rb_cHash,"has_value?", rb_hash_has_value, 1);
  // rb_define_method(rb_cHash,"key?", rb_hash_has_key, 1);
  // rb_define_method(rb_cHash,"value?", rb_hash_has_value, 1);

  // rb_define_method(rb_cHash,"compare_by_identity", rb_hash_compare_by_id, 0);
  // rb_define_method(rb_cHash,"compare_by_identity?",rb_hash_compare_by_id_p, 0);

  // rb_envtbl = rb_obj_alloc(rb_cObject);
  // rb_extend_object(rb_envtbl, rb_mEnumerable);

  // rb_define_singleton_method(rb_envtbl,"[]", rb_f_getenv, 1);
  // rb_define_singleton_method(rb_envtbl,"fetch", env_fetch, -1);
  // rb_define_singleton_method(rb_envtbl,"[]=", env_aset, 2);
  // rb_define_singleton_method(rb_envtbl,"store", env_aset, 2);
  // rb_define_singleton_method(rb_envtbl,"each", env_each_pair, 0);
  // rb_define_singleton_method(rb_envtbl,"each_pair", env_each_pair, 0);
  // rb_define_singleton_method(rb_envtbl,"each_key", env_each_key, 0);
  // rb_define_singleton_method(rb_envtbl,"each_value", env_each_value, 0);
  // rb_define_singleton_method(rb_envtbl,"delete", env_delete_m, 1);
  // rb_define_singleton_method(rb_envtbl,"delete_if", env_delete_if, 0);
  // rb_define_singleton_method(rb_envtbl,"clear", rb_env_clear, 0);
  // rb_define_singleton_method(rb_envtbl,"reject", env_reject, 0);
  // rb_define_singleton_method(rb_envtbl,"reject!", env_reject_bang, 0);
  // rb_define_singleton_method(rb_envtbl,"select", env_select, 0);
  // rb_define_singleton_method(rb_envtbl,"shift", env_shift, 0);
  // rb_define_singleton_method(rb_envtbl,"invert", env_invert, 0);
  // rb_define_singleton_method(rb_envtbl,"replace", env_replace, 1);
  // rb_define_singleton_method(rb_envtbl,"update", env_update, 1);
  // rb_define_singleton_method(rb_envtbl,"inspect", env_inspect, 0);
  // rb_define_singleton_method(rb_envtbl,"rehash", env_none, 0);
  // rb_define_singleton_method(rb_envtbl,"to_a", env_to_a, 0);
  // rb_define_singleton_method(rb_envtbl,"to_s", env_to_s, 0);
  // rb_define_singleton_method(rb_envtbl,"key", env_key, 1);
  // rb_define_singleton_method(rb_envtbl,"index", env_index, 1);
  // rb_define_singleton_method(rb_envtbl,"size", env_size, 0);
  // rb_define_singleton_method(rb_envtbl,"length", env_size, 0);
  // rb_define_singleton_method(rb_envtbl,"empty?", env_empty_p, 0);
  // rb_define_singleton_method(rb_envtbl,"keys", env_keys, 0);
  // rb_define_singleton_method(rb_envtbl,"values", env_values, 0);
  // rb_define_singleton_method(rb_envtbl,"values_at", env_values_at, -1);
  // rb_define_singleton_method(rb_envtbl,"include?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"member?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"has_key?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"has_value?", env_has_value, 1);
  // rb_define_singleton_method(rb_envtbl,"key?", env_has_key, 1);
  // rb_define_singleton_method(rb_envtbl,"value?", env_has_value, 1);
  // rb_define_singleton_method(rb_envtbl,"to_hash", env_to_hash, 0);
  // rb_define_singleton_method(rb_envtbl,"assoc", env_assoc, 1);
  // rb_define_singleton_method(rb_envtbl,"rassoc", env_rassoc, 1);

  // rb_define_global_const("ENV", rb_envtbl);
}
