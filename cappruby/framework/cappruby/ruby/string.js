/* 
 * string.js
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

rb_cString = nil;
rb_cSymbol = nil;

// hash of symbol names to actual sym values. Like ruby, only one object per
// symbol is created. use ID2SYM to get instance, or make one.
rb_sym_stack = { };

function ID2SYM(id) {
  var s = rb_sym_stack[id];
  if (!s) {
    s = cr_send(rb_cSymbol, "alloc", [id], nil, 0);
    s.ptr = id;
    rb_sym_stack[id] = s;
  }
  return s;
};

function SYM2ID(sym) {
  return sym.ptr;
};

function rb_sym_to_s(sym, sel) {
  return sym.ptr;
};

function rb_sym_to_sym(sym, sel) {
  return sym;
};

function rb_sym_to_proc(sym, sel) {
  throw "sym#to_proc not uet implemented"
};

function rb_str_to_s(str, sel) {
  return new String(str);
};

function cr_str_titleize(str, sel) {
  var parts = str.split("_");
  for (var i = 0; i < parts.length; i++) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);
  }
  return parts.join(" ");
};

function cr_str_to_kvo_setter(str, sel) {
  return ['set', str.charAt(0).toUpperCase(), str.substr(1), ':'].join('');
};

function rb_str_intern(str, sel) {
  return ID2SYM(str);
};

function rb_str_plus(str, sel, other) {
  return str + other;
};

function Init_String() {
  // string
  rb_cString = objj_getClass("CPString");
  // rb_include_module(rb_cString, rb_mComparable);
  
  
  rb_define_method(rb_cString, "titleize", cr_str_titleize, 0);
  rb_define_method(rb_cString, "to_kvo_setter", cr_str_to_kvo_setter, 0);
  
  // rb_define_method(rb_cString, "initialize", rb_str_init, -1);
  // rb_define_method(rb_cString, "initialize_copy", rb_str_replace, 1);
  // rb_define_method(rb_cString, "<=>", rb_str_cmp_m, 1);
  // rb_define_method(rb_cString, "==", rb_str_equal, 1);
  // rb_define_method(rb_cString, "eql?", rb_str_eql, 1);
  // rb_define_method(rb_cString, "hash", rb_str_hash_m, 0);
  // rb_define_method(rb_cString, "casecmp", rb_str_casecmp, 1);
  rb_define_method(rb_cString, "+", rb_str_plus, 1);
  // rb_define_method(rb_cString, "*", rb_str_times, 1);
  // rb_define_method(rb_cString, "%", rb_str_format_m, 1);
  // rb_define_method(rb_cString, "[]", rb_str_aref_m, -1);
  // rb_define_method(rb_cString, "[]=", rb_str_aset_m, -1);
  // rb_define_method(rb_cString, "insert", rb_str_insert, 2);
  // rb_define_method(rb_cString, "length", rb_str_length, 0);
  // rb_define_method(rb_cString, "size", rb_str_length, 0);
  // rb_define_method(rb_cString, "bytesize", rb_str_bytesize, 0);
  // rb_define_method(rb_cString, "empty?", rb_str_empty, 0);
  // rb_define_method(rb_cString, "=~", rb_str_match, 1);
  // rb_define_method(rb_cString, "match", rb_str_match_m, -1);
  // rb_define_method(rb_cString, "succ", rb_str_succ, 0);
  // rb_define_method(rb_cString, "succ!", rb_str_succ_bang, 0);
  // rb_define_method(rb_cString, "next", rb_str_succ, 0);
  // rb_define_method(rb_cString, "next!", rb_str_succ_bang, 0);
  // rb_define_method(rb_cString, "upto", rb_str_upto, -1);
  // rb_define_method(rb_cString, "index", rb_str_index_m, -1);
  // rb_define_method(rb_cString, "rindex", rb_str_rindex_m, -1);
  // rb_define_method(rb_cString, "replace", rb_str_replace, 1);
  // rb_define_method(rb_cString, "clear", rb_str_clear, 0);
  // rb_define_method(rb_cString, "chr", rb_str_chr, 0);
  // rb_define_method(rb_cString, "getbyte", rb_str_getbyte, 1);
  // rb_define_method(rb_cString, "setbyte", rb_str_setbyte, 2);

  // rb_define_method(rb_cString, "to_i", rb_str_to_i, -1);
  // rb_define_method(rb_cString, "to_f", rb_str_to_f, 0);
  rb_define_method(rb_cString, "to_s", rb_str_to_s, 0);
  // rb_define_method(rb_cString, "to_str", rb_str_to_s, 0);
  // rb_define_method(rb_cString, "inspect", rb_str_inspect, 0);
  // rb_define_method(rb_cString, "dump", rb_str_dump, 0);

  // rb_define_method(rb_cString, "upcase", rb_str_upcase, 0);
  // rb_define_method(rb_cString, "downcase", rb_str_downcase, 0);
  // rb_define_method(rb_cString, "capitalize", rb_str_capitalize, 0);
  // rb_define_method(rb_cString, "swapcase", rb_str_swapcase, 0);

  // rb_define_method(rb_cString, "hex", rb_str_hex, 0);
  // rb_define_method(rb_cString, "oct", rb_str_oct, 0);
  // rb_define_method(rb_cString, "split", rb_str_split_m, -1);
  // rb_define_method(rb_cString, "lines", rb_str_each_line, -1);
  // rb_define_method(rb_cString, "bytes", rb_str_each_byte, 0);
  // rb_define_method(rb_cString, "chars", rb_str_each_char, 0);
  // rb_define_method(rb_cString, "codepoints", rb_str_each_codepoint, 0);
  // rb_define_method(rb_cString, "reverse", rb_str_reverse, 0);
  // rb_define_method(rb_cString, "concat", rb_str_concat, 1);
  // rb_define_method(rb_cString, "<<", rb_str_concat, 1);
  // rb_define_method(rb_cString, "crypt", rb_str_crypt, 1);
  rb_define_method(rb_cString, "intern", rb_str_intern, 0);
  rb_define_method(rb_cString, "to_sym", rb_str_intern, 0);
  // rb_define_method(rb_cString, "ord", rb_str_ord, 0);

  // rb_define_method(rb_cString, "include?", rb_str_include, 1);
  // rb_define_method(rb_cString, "start_with?", rb_str_start_with, -1);
  // rb_define_method(rb_cString, "end_with?", rb_str_end_with, -1);

  // rb_define_method(rb_cString, "scan", rb_str_scan, 1);

  // rb_define_method(rb_cString, "ljust", rb_str_ljust, -1);
  // rb_define_method(rb_cString, "rjust", rb_str_rjust, -1);
  // rb_define_method(rb_cString, "center", rb_str_center, -1);

  // rb_define_method(rb_cString, "sub", rb_str_sub, -1);
  // rb_define_method(rb_cString, "gsub", rb_str_gsub, -1);
  // rb_define_method(rb_cString, "chop", rb_str_chop, 0);
  // rb_define_method(rb_cString, "chomp", rb_str_chomp, -1);
  // rb_define_method(rb_cString, "strip", rb_str_strip, 0);
  // rb_define_method(rb_cString, "lstrip", rb_str_lstrip, 0);
  // rb_define_method(rb_cString, "rstrip", rb_str_rstrip, 0);

  // rb_define_method(rb_cString, "tr", rb_str_tr, 2);
  // rb_define_method(rb_cString, "tr_s", rb_str_tr_s, 2);
  // rb_define_method(rb_cString, "delete", rb_str_delete, -1);
  // rb_define_method(rb_cString, "squeeze", rb_str_squeeze, -1);
  // rb_define_method(rb_cString, "count", rb_str_count, -1);

  // rb_define_method(rb_cString, "each_line", rb_str_each_line, -1);
  // rb_define_method(rb_cString, "each_byte", rb_str_each_byte, 0);
  // rb_define_method(rb_cString, "each_char", rb_str_each_char, 0);
  // rb_define_method(rb_cString, "each_codepoint", rb_str_each_codepoint, 0);

  // rb_define_method(rb_cString, "sum", rb_str_sum, -1);

  // rb_define_method(rb_cString, "slice", rb_str_aref_m, -1);

  // rb_define_method(rb_cString, "partition", rb_str_partition, 1);
  // rb_define_method(rb_cString, "rpartition", rb_str_rpartition, 1);
  
  // symbol
  rb_cSymbol = rb_define_class("Symbol", rb_cObject);
  
  // rb_define_method(rb_cSymbol, "==", rb_sym_equal, 1);
  // rb_define_method(rb_cSymbol, "inspect", rb_sym_inspect, 0);
  rb_define_method(rb_cSymbol, "to_s", rb_sym_to_s, 0);
  rb_define_method(rb_cSymbol, "id2name", rb_sym_to_s, 0);
  rb_define_method(rb_cSymbol, "intern", rb_sym_to_sym, 0);
  rb_define_method(rb_cSymbol, "to_sym", rb_sym_to_sym, 0);
  rb_define_method(rb_cSymbol, "to_proc", rb_sym_to_proc, 0);
  // rb_define_method(rb_cSymbol, "succ", rb_sym_succ, 0);
  // rb_define_method(rb_cSymbol, "next", rb_sym_succ, 0);
  // 
  // rb_define_method(rb_cSymbol, "<=>", rb_sym_cmp, 1);
  // rb_define_method(rb_cSymbol, "casecmp", rb_sym_casecmp, 1);
  // rb_define_method(rb_cSymbol, "=~", rb_sym_match, 1);
  // 
  // rb_define_method(rb_cSymbol, "[]", rb_sym_aref, -1);
  // rb_define_method(rb_cSymbol, "slice", rb_sym_aref, -1);
  // rb_define_method(rb_cSymbol, "length", rb_sym_length, 0);
  // rb_define_method(rb_cSymbol, "size", rb_sym_length, 0);
  // rb_define_method(rb_cSymbol, "empty?", rb_sym_empty, 0);
  // rb_define_method(rb_cSymbol, "match", rb_sym_match, 1);
  // 
  // rb_define_method(rb_cSymbol, "upcase", rb_sym_upcase, 0);
  // rb_define_method(rb_cSymbol, "downcase", rb_sym_downcase, 0);
  // rb_define_method(rb_cSymbol, "capitalize", rb_sym_capitalize, 0);
  // rb_define_method(rb_cSymbol, "swapcase", rb_sym_swapcase, 0);
  // 
  // rb_define_method(rb_cSymbol, "encoding", rb_sym_encoding, 0);
};
