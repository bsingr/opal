/* 
 * nil_class.js
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

VN.nil_to_i = function(obj) {
   return 0 ;
};

VN.nil_to_f = function(obj) {
   return 0.0 ;
};

VN.nil_to_s = function(obj) {
   return VN.str_new_cstr("") ;
};

VN.nil_to_a = function(obj) {
   return VN.ary_new2(null) ;
};

VN.nil_inspect = function(obj) {
   return VN.str_new_cstr("nil");
};

VN.define_method(VN.cNilClass, 'to_i', VN.nil_to_i, 0);
VN.define_method(VN.cNilClass, 'to_f', VN.nil_to_f, 0);
VN.define_method(VN.cNilClass, 'to_s', VN.nil_to_s, 0);
VN.define_method(VN.cNilClass, 'to_a', VN.nil_to_a, 0);
VN.define_method(VN.cNilClass, 'inspect', VN.nil_inspect, 0);
VN.define_method(VN.cNilClass, '&', VN.false_and, 0);
VN.define_method(VN.cNilClass, '|', VN.false_or, 0);
VN.define_method(VN.cNilClass, '^', VN.false_xor, 0);

VN.define_method(VN.cNilClass, 'nil?', VN.rb_true, 0);
VN.undef_alloc_func(VN.cNilClass);
VN.undef_method(VN.cNilClass.klass, "new");
VN.define_global_const('NIL', VN.Qnil);