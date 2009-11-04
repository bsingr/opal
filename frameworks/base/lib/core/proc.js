/* 
 * proc.js
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

var rb_cProc = cProc;

Function.prototype.$klass = rb_cProc
Function.prototype.$type = T_PROC;

rb_define_singleton_method(rb_cProc, 'new', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'call', function(self, _cmd) {
  return self.apply(self, [arguments[2]]);
});

rb_define_method(rb_cProc, '[]', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, '===', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'yield', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'to_proc', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'arity', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'clone', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'dup', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, '==', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'eql?', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'hash', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'to_s', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'lambda?', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'binding', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'curry', function(self, _cmd) {
  
});

rb_define_method(rb_cProc, 'source_location', function(self, _cmd) {
  
});
