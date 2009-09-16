/* 
 * string.js
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

String.prototype.$klass = cString ;
String.prototype.$type = VN.STRING ;

String.prototype.$call = RObject.prototype.$call;



cString.$define_alloc_func(function() {
  return new String();
});

cString.$define_singleton_method('try_convert', function(obj) {
  
});

cString.$define_method('initialize', function(str_init) {
  
});

cString.$define_method('initialize_copy', function(str_replace) {
  
});

cString.$define_method('<=>', function(str_cmp_m) {
  
});

cString.$define_method('==', function(str_equal) {
  
});

cString.$define_method('eql?', function(str_eql) {
  
});

cString.$define_method('hash', function(str_hash_m) {
  
});

cString.$define_method('casecmp', function(str_casecmp) {
  
});

cString.$define_method('+', function(str_plus) {
  
});

cString.$define_method('*', function(str_times) {
  
});

cString.$define_method('%', function(str_format_m) {
  
});

cString.$define_method('[]', function(str_aref_m) {
  
});

cString.$define_method('[]=', function(str_aset_m) {
  
});

cString.$define_method('insert', function(str_insert) {
  
});

cString.$define_method('length', function() {
  return this.length;
});

cString.$define_method('size', function() {
  return this.length;
});

cString.$define_method('bytesize', function(str_bytesize) {
  
});

cString.$define_method('empty?', function(str_empty) {
  
});

cString.$define_method('=~', function(str_match) {
  
});

cString.$define_method('match', function(str_match_m) {
  
});

cString.$define_method('succ', function(str_succ) {
  
});

cString.$define_method('next', function(str_succ) {
  
});

cString.$define_method('upto', function(str_upto) {
  
});

cString.$define_method('index', function(str_index_m) {
  
});

cString.$define_method('rindex', function(str_rindex_m) {
  
});

cString.$define_method('replace', function(str_replace) {
  
});

cString.$define_method('clear', function(str_clear) {
  
});

cString.$define_method('chr', function(str_chr) {
  
});

cString.$define_method('getbyte', function(str_getbyte) {
  
});

cString.$define_method('setbyte', function(str_setbyte) {
  
});


cString.$define_method('to_i', function(str_to_i) {

});

cString.$define_method('to_f', function(str_to_f) {
  
});


cString.$define_method('to_s', function() {
  return new String(this);
});

cString.$define_method('to_str', function() {
  return new String(this);
});

cString.$define_method('inspect', function() {
  return new String('"' + this + '"');
});

cString.$define_method('dump', VN.str_dump, 0);

cString.$define_method('upcase', VN.str_upcase, 0);
cString.$define_method('downcase', VN.str_downcase, 0);
cString.$define_method('capitalize', VN.str_capitalize, 0);
cString.$define_method('swapcase', VN.str_swapcase, 0);

cString.$define_method('upcase!', VN.str_upcase_bang, 0);
cString.$define_method('downcase!', VN.str_downcase_bang, 0);
cString.$define_method('capitalize!', VN.str_capitalize_bang, 0);
cString.$define_method('swapcase!', VN.str_swapcase_bang, 0);

cString.$define_method('hex', VN.str_hex, 0);
cString.$define_method('oct', VN.str_oct, 0);
cString.$define_method('split', VN.str_split_m, -1);
cString.$define_method('lines', VN.str_each_line, -1);
cString.$define_method('bytes', VN.str_each_byte, 0);
cString.$define_method('chars', VN.str_each_char, 0);
cString.$define_method('codepoints', VN.str_each_codepoint, 0);
cString.$define_method('reverse', VN.str_reverse, 0);
cString.$define_method('reverse!', VN.str_reverse_bang, 0);
cString.$define_method('concat', VN.str_concat, 1);
cString.$define_method('<<', VN.str_concat, 1);
cString.$define_method('crypt', VN.str_crypt, 1);
cString.$define_method('intern', VN.str_intern, 0);
cString.$define_method('to_sym', VN.str_intern, 0);
cString.$define_method('ord', VN.str_ord, 0);

cString.$define_method('include?', VN.str_include, 1);
cString.$define_method('start_with?', VN.str_start_with, -1);
cString.$define_method('end_with?', VN.str_end_with, -1);

cString.$define_method('scan', VN.str_scan, 1);

cString.$define_method('ljust', VN.str_ljust, -1);
cString.$define_method('rjust', VN.str_rjust, -1);
cString.$define_method('center', VN.str_center, -1);

cString.$define_method('sub', VN.str_sub, -1);
cString.$define_method('gsub', VN.str_gsub, -1);
cString.$define_method('chop', VN.str_chop, 0);
cString.$define_method('chomp', VN.str_chomp, -1);
cString.$define_method('strip', VN.str_strip, 0);
cString.$define_method('lstrip', VN.str_lstrip, 0);
cString.$define_method('rstrip', VN.str_rstrip, 0);

cString.$define_method('sub!', VN.str_sub_bang, -1);
cString.$define_method('gsub!', VN.str_gsub_bang, -1);
cString.$define_method('chop!', VN.str_chop_bang, 0);
cString.$define_method('chomp!', VN.str_chomp_bang, -1);
cString.$define_method('strip!', VN.str_strip_bang, 0);
cString.$define_method('lstrip!', VN.str_lstrip_bang, 0);
cString.$define_method('rstrip!', VN.str_rstrip_bang, 0);

cString.$define_method('tr', VN.str_tr, 2);
cString.$define_method('tr_s', VN.str_tr_s, 2);
cString.$define_method('delete', VN.str_delete, -1);
cString.$define_method('squeeze', VN.str_squeeze, -1);
cString.$define_method('count', VN.str_count, -1);

cString.$define_method('tr!', VN.str_tr_bang, 2);
cString.$define_method('tr_s!', VN.str_tr_s_bang, 2);
cString.$define_method('delete!', VN.str_delete_bang, -1);
cString.$define_method('squeeze!', VN.str_squeeze_bang, -1);

cString.$define_method('each_line', VN.str_each_line, -1);
cString.$define_method('each_byte', VN.str_each_byte, 0);
cString.$define_method('each_char', VN.str_each_char, 0);
cString.$define_method('each_codepoint', VN.str_each_codepoint, 0);

cString.$define_method('sum', VN.str_sum, -1);

cString.$define_method('slice', VN.str_aref_m, -1);
cString.$define_method('slice!', VN.str_slice_bang, -1);

cString.$define_method('partition', VN.str_partition, 1);
cString.$define_method('rpartition', VN.str_rpartition, 1);

cString.$define_method('encoding', VN.obj_encoding, 0); /* in encoding.c */
cString.$define_method('force_encoding', VN.str_force_encoding, 1);
cString.$define_method('valid_encoding?', VN.str_valid_encoding_p, 0);
cString.$define_method('ascii_only?', VN.str_is_ascii_only_p, 0);
