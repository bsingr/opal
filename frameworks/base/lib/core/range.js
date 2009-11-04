/* 
 * range.js
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

var rb_cRange = cRange;

VN.$r = function(start, ending, exclusive) {
  return rb_funcall(rb_cRange, 'new', start, ending, exclusive);
};

rb_define_method(rb_cRange, 'initialize', function(self, _cmd, start, ending, exclusive) {
  rb_ivar_set(self, '@start', start);
  rb_ivar_set(self, '@ending', ending);
});

rb_define_method(rb_cRange, 'initialize_copy', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, '==', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, '===', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'eql?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'hash', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'each', function(self, _cmd, block) {
  var start = rb_ivar_get(self, '@start');
  var ending = rb_ivar_get(self, '@ending');
  for (var i = start; i <= ending; i++) {
    rb_funcall(block, 'call', i);
  }
  return self;
});

rb_define_method(rb_cRange, 'step', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'begin', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'first', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'end', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'last', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'min', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'max', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'to_s', function(self, _cmd) {
  
});
  
rb_define_method(rb_cRange, 'inspect', function(self, _cmd) {
  
}); 

rb_define_method(rb_cRange, 'exclude_end?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'member?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'include?', function(self, _cmd) {
  
});

rb_define_method(rb_cRange, 'cover?', function(self, _cmd) {
  
});
