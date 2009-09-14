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

String.prototype.klass = VN.cString ;
String.prototype.type = VN.T_STRING ;

VN.str_alloc = function(klass) {
  return new String() ;
};

VN.define_alloc_func(VN.cString, VN.str_alloc);
VN.define_singleton_method(VN.cString, 'try_convert', VN.str_s_try_convert, 1);

VN.str_length = function(self) {
  return self.length ;
};

VN.define_method(VN.cString, 'initialize', VN.str_init, -1);
VN.define_method(VN.cString, 'initialize_copy', VN.str_replace, 1);
VN.define_method(VN.cString, '<=>', VN.str_cmp_m, 1);
VN.define_method(VN.cString, '==', VN.str_equal, 1);
VN.define_method(VN.cString, 'eql?', VN.str_eql, 1);
VN.define_method(VN.cString, 'hash', VN.str_hash_m, 0);
VN.define_method(VN.cString, 'casecmp', VN.str_casecmp, 1);
VN.define_method(VN.cString, '+', VN.str_plus, 1);
VN.define_method(VN.cString, '*', VN.str_times, 1);
VN.define_method(VN.cString, '%', VN.str_format_m, 1);
VN.define_method(VN.cString, '[]', VN.str_aref_m, -1);
VN.define_method(VN.cString, '[]=', VN.str_aset_m, -1);
VN.define_method(VN.cString, 'insert', VN.str_insert, 2);
VN.define_method(VN.cString, 'length', VN.str_length, 0);
VN.define_method(VN.cString, 'size', VN.str_length, 0);
VN.define_method(VN.cString, 'bytesize', VN.str_bytesize, 0);
VN.define_method(VN.cString, 'empty?', VN.str_empty, 0);
VN.define_method(VN.cString, '=~', VN.str_match, 1);
VN.define_method(VN.cString, 'match', VN.str_match_m, -1);
VN.define_method(VN.cString, 'succ', VN.str_succ, 0);
VN.define_method(VN.cString, 'succ!', VN.str_succ_bang, 0);
VN.define_method(VN.cString, 'next', VN.str_succ, 0);
VN.define_method(VN.cString, 'next!', VN.str_succ_bang, 0);
VN.define_method(VN.cString, 'upto', VN.str_upto, -1);
VN.define_method(VN.cString, 'index', VN.str_index_m, -1);
VN.define_method(VN.cString, 'rindex', VN.str_rindex_m, -1);
VN.define_method(VN.cString, 'replace', VN.str_replace, 1);
VN.define_method(VN.cString, 'clear', VN.str_clear, 0);
VN.define_method(VN.cString, 'chr', VN.str_chr, 0);
VN.define_method(VN.cString, 'getbyte', VN.str_getbyte, 1);
VN.define_method(VN.cString, 'setbyte', VN.str_setbyte, 2);

VN.str_to_i = function(argc, argv, self) {
  var base ;
  if (argc == 0) {
    base = 10 ;
  }
  else {
    base = argv[0] ;
  }
  
  if (base < 0) {
    VN.arg_error('invalid radix: ' + base);
  }
  return VN.str_to_inum(self, base, VN.Qfalse);
}

VN.str_to_s = function() {
  return new String(this) ;
};

VN.str_inspect = function() {
  return new String('"' + this + '"');
};

VN.define_method(VN.cString, 'to_i', VN.str_to_i, -1);
VN.define_method(VN.cString, 'to_f', VN.str_to_f, 0);
VN.define_method(VN.cString, 'to_s', VN.str_to_s, 0);
VN.define_method(VN.cString, 'to_str', VN.str_to_s, 0);
VN.define_method(VN.cString, 'inspect', VN.str_inspect, 0);
VN.define_method(VN.cString, 'dump', VN.str_dump, 0);

VN.define_method(VN.cString, 'upcase', VN.str_upcase, 0);
VN.define_method(VN.cString, 'downcase', VN.str_downcase, 0);
VN.define_method(VN.cString, 'capitalize', VN.str_capitalize, 0);
VN.define_method(VN.cString, 'swapcase', VN.str_swapcase, 0);

VN.define_method(VN.cString, 'upcase!', VN.str_upcase_bang, 0);
VN.define_method(VN.cString, 'downcase!', VN.str_downcase_bang, 0);
VN.define_method(VN.cString, 'capitalize!', VN.str_capitalize_bang, 0);
VN.define_method(VN.cString, 'swapcase!', VN.str_swapcase_bang, 0);

VN.define_method(VN.cString, 'hex', VN.str_hex, 0);
VN.define_method(VN.cString, 'oct', VN.str_oct, 0);
VN.define_method(VN.cString, 'split', VN.str_split_m, -1);
VN.define_method(VN.cString, 'lines', VN.str_each_line, -1);
VN.define_method(VN.cString, 'bytes', VN.str_each_byte, 0);
VN.define_method(VN.cString, 'chars', VN.str_each_char, 0);
VN.define_method(VN.cString, 'codepoints', VN.str_each_codepoint, 0);
VN.define_method(VN.cString, 'reverse', VN.str_reverse, 0);
VN.define_method(VN.cString, 'reverse!', VN.str_reverse_bang, 0);
VN.define_method(VN.cString, 'concat', VN.str_concat, 1);
VN.define_method(VN.cString, '<<', VN.str_concat, 1);
VN.define_method(VN.cString, 'crypt', VN.str_crypt, 1);
VN.define_method(VN.cString, 'intern', VN.str_intern, 0);
VN.define_method(VN.cString, 'to_sym', VN.str_intern, 0);
VN.define_method(VN.cString, 'ord', VN.str_ord, 0);

VN.define_method(VN.cString, 'include?', VN.str_include, 1);
VN.define_method(VN.cString, 'start_with?', VN.str_start_with, -1);
VN.define_method(VN.cString, 'end_with?', VN.str_end_with, -1);

VN.define_method(VN.cString, 'scan', VN.str_scan, 1);

VN.define_method(VN.cString, 'ljust', VN.str_ljust, -1);
VN.define_method(VN.cString, 'rjust', VN.str_rjust, -1);
VN.define_method(VN.cString, 'center', VN.str_center, -1);

VN.define_method(VN.cString, 'sub', VN.str_sub, -1);
VN.define_method(VN.cString, 'gsub', VN.str_gsub, -1);
VN.define_method(VN.cString, 'chop', VN.str_chop, 0);
VN.define_method(VN.cString, 'chomp', VN.str_chomp, -1);
VN.define_method(VN.cString, 'strip', VN.str_strip, 0);
VN.define_method(VN.cString, 'lstrip', VN.str_lstrip, 0);
VN.define_method(VN.cString, 'rstrip', VN.str_rstrip, 0);

VN.define_method(VN.cString, 'sub!', VN.str_sub_bang, -1);
VN.define_method(VN.cString, 'gsub!', VN.str_gsub_bang, -1);
VN.define_method(VN.cString, 'chop!', VN.str_chop_bang, 0);
VN.define_method(VN.cString, 'chomp!', VN.str_chomp_bang, -1);
VN.define_method(VN.cString, 'strip!', VN.str_strip_bang, 0);
VN.define_method(VN.cString, 'lstrip!', VN.str_lstrip_bang, 0);
VN.define_method(VN.cString, 'rstrip!', VN.str_rstrip_bang, 0);

VN.define_method(VN.cString, 'tr', VN.str_tr, 2);
VN.define_method(VN.cString, 'tr_s', VN.str_tr_s, 2);
VN.define_method(VN.cString, 'delete', VN.str_delete, -1);
VN.define_method(VN.cString, 'squeeze', VN.str_squeeze, -1);
VN.define_method(VN.cString, 'count', VN.str_count, -1);

VN.define_method(VN.cString, 'tr!', VN.str_tr_bang, 2);
VN.define_method(VN.cString, 'tr_s!', VN.str_tr_s_bang, 2);
VN.define_method(VN.cString, 'delete!', VN.str_delete_bang, -1);
VN.define_method(VN.cString, 'squeeze!', VN.str_squeeze_bang, -1);

VN.define_method(VN.cString, 'each_line', VN.str_each_line, -1);
VN.define_method(VN.cString, 'each_byte', VN.str_each_byte, 0);
VN.define_method(VN.cString, 'each_char', VN.str_each_char, 0);
VN.define_method(VN.cString, 'each_codepoint', VN.str_each_codepoint, 0);

VN.define_method(VN.cString, 'sum', VN.str_sum, -1);

VN.define_method(VN.cString, 'slice', VN.str_aref_m, -1);
VN.define_method(VN.cString, 'slice!', VN.str_slice_bang, -1);

VN.define_method(VN.cString, 'partition', VN.str_partition, 1);
VN.define_method(VN.cString, 'rpartition', VN.str_rpartition, 1);

VN.define_method(VN.cString, 'encoding', VN.obj_encoding, 0); /* in encoding.c */
VN.define_method(VN.cString, 'force_encoding', VN.str_force_encoding, 1);
VN.define_method(VN.cString, 'valid_encoding?', VN.str_valid_encoding_p, 0);
VN.define_method(VN.cString, 'ascii_only?', VN.str_is_ascii_only_p, 0);
