/* 
 * enum.js
 * vienna
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

var rb_mEnumerable;

function Init_Enumerable() {
  rb_mEnumerable = rb_define_module("Enumerable");
  
  rb_define_method(rb_mEnumerable, "to_a", rb_enum_to_a, -1);
  rb_define_method(rb_mEnumerable, "entries", rb_enum_to_a, -1);

  rb_define_method(rb_mEnumerable, "sort", rb_enum_sort, 0);
  rb_define_method(rb_mEnumerable, "sort_by", rb_enum_sort_by, 0);
  rb_define_method(rb_mEnumerable, "grep", rb_enum_grep, 1);
  rb_define_method(rb_mEnumerable, "count", rb_enum_count, -1);
  rb_define_method(rb_mEnumerable, "find", rb_enum_find, -1);
  rb_define_method(rb_mEnumerable, "detect", rb_enum_find, -1);
  rb_define_method(rb_mEnumerable, "find_index", rb_enum_find_index, -1);
  rb_define_method(rb_mEnumerable, "find_all", rb_enum_find_all, 0);
  rb_define_method(rb_mEnumerable, "select", rb_enum_find_all, 0);
  rb_define_method(rb_mEnumerable, "reject", rb_enum_reject, 0);
  rb_define_method(rb_mEnumerable, "collect", rb_enum_collect, 0);
  rb_define_method(rb_mEnumerable, "map", rb_enum_collect, 0);
  rb_define_method(rb_mEnumerable, "inject", rb_enum_inject, -1);
  rb_define_method(rb_mEnumerable, "reduce", rb_enum_inject, -1);
  rb_define_method(rb_mEnumerable, "partition", rb_enum_partition, 0);
  rb_define_method(rb_mEnumerable, "group_by", rb_enum_group_by, 0);
  rb_define_method(rb_mEnumerable, "first", rb_enum_first, -1);
  rb_define_method(rb_mEnumerable, "all?", rb_enum_all, 0);
  rb_define_method(rb_mEnumerable, "any?", rb_enum_any, 0);
  rb_define_method(rb_mEnumerable, "one?", rb_enum_one, 0);
  rb_define_method(rb_mEnumerable, "none?", rb_enum_none, 0);
  rb_define_method(rb_mEnumerable, "min", rb_enum_min, 0);
  rb_define_method(rb_mEnumerable, "max", rb_enum_max, 0);
  rb_define_method(rb_mEnumerable, "minmax", rb_enum_minmax, 0);
  rb_define_method(rb_mEnumerable, "min_by", rb_enum_min_by, 0);
  rb_define_method(rb_mEnumerable, "max_by", rb_enum_max_by, 0);
  rb_define_method(rb_mEnumerable, "minmax_by", rb_enum_minmax_by, 0);
  rb_define_method(rb_mEnumerable, "member?", rb_enum_member, 1);
  rb_define_method(rb_mEnumerable, "include?", rb_enum_member, 1);
  rb_define_method(rb_mEnumerable, "each_with_index", rb_enum_each_with_index, -1);
  rb_define_method(rb_mEnumerable, "reverse_each", rb_enum_reverse_each, -1);
  rb_define_method(rb_mEnumerable, "zip", rb_enum_zip, -1);
  rb_define_method(rb_mEnumerable, "take", rb_enum_take, 1);
  rb_define_method(rb_mEnumerable, "take_while", rb_enum_take_while, 0);
  rb_define_method(rb_mEnumerable, "drop", rb_enum_drop, 1);
  rb_define_method(rb_mEnumerable, "drop_while", rb_enum_drop_while, 0);
  rb_define_method(rb_mEnumerable, "cycle", rb_enum_cycle, -1);
}
