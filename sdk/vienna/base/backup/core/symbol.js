/* 
 * symbol.js
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
 



// rb_include_module(rb_cSymbol, rb_mComparable);
// rb_undef_alloc_func(rb_cSymbol);
// rb_undef_method(rb_cSymbol.$klass, 'new');

rb_define_singleton_method(rb_cSymbol, 'all_symbols', function(self, _cmd) {
  // return an array of all symbols
});

rb_define_method(rb_cSymbol, '==', function(self, _cmd, obj) {
  return (self == obj) && (obj.$type == T_SYMBOL) ? true : false;
});

rb_define_method(rb_cSymbol, 'inspect', function(self, _cmd) {
  return ":" + self.ptr;
});

rb_define_method(rb_cSymbol, 'to_s', function(self, _cmd) {
  return self.ptr;
});

rb_define_method(rb_cSymbol, 'id2name', function(self, _cmd) {
  return self.ptr;
});

rb_define_method(rb_cSymbol, 'intern', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cSymbol, 'to_sym', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cSymbol, 'to_proc', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'succ', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'next', function(self, _cmd) {
  return rb_funcall(self, 'succ');
});

rb_define_method(rb_cSymbol, '<=>', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'casecmp', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, '=~', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, '[]', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'slice', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'length', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'size', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'empty?', function(self, _cmd) {
  
});
  
rb_define_method(rb_cSymbol, 'match', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'upcase', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'downcase', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'capitalize', function(self, _cmd) {
  
});

rb_define_method(rb_cSymbol, 'swapcase', function(self, _cmd) {
  
});
