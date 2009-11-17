/* 
 * number.js
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

var rb_cNumber = cNumber;
 
Number.prototype.$klass = cNumber ;
Number.prototype.$type = VN.NUMBER ;

// VN.include_module(VN.cNumber, VN.mComparable);
RModule.include(cNumber, mComparable);

rb_define_method(rb_cNumber, 'coerce', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '+@', function(self, _cmd) {
  return self;
});

rb_define_method(rb_cNumber, '-@', function(self, _cmd) {
  return self * -1;
});

rb_define_method(rb_cNumber, '<=>', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'eql?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'quo', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'fdiv', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'div', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'divmod', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'modulo', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'remainder', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'abs', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'magnitude', function(self, _cmd) {
  
});
  
rb_define_method(rb_cNumber, 'to_int', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'real?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'integer?', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'zero?', function(self, _cmd) {
  return self == 0 ? true : false;
});

rb_define_method(rb_cNumber, 'nonzero?', function(self, _cmd) {
  return self == 0 ? false : true;
});

rb_define_method(rb_cNumber, 'floor', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'ceil', function(self, _cmd) {
  
});
    
rb_define_method(rb_cNumber, 'round', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'truncate', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'step', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'odd?', function(self, _cmd) {
  return self %2 == 0 ? false : true;
});

rb_define_method(rb_cNumber, 'even?', function(self, _cmd) {
  return self %2 == 0 ? true : false;
});

rb_define_method(rb_cNumber, 'upto', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'downto', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'times', function(self, _cmd, block) {
  for (var i = 0; i < self; i++) {
    rb_funcall(block, 'call', i);
  }
  return self;
});

rb_define_method(rb_cNumber, 'succ', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'next', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'pred', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'chr', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, 'ord', function(self, _cmd) {
  
}); 

rb_define_method(rb_cNumber, 'to_i', function(self, _cmd) {
  return parseInt(self);
});

rb_define_method(rb_cNumber, 'to_s', function(self, _cmd) {
  return new String(self);
});
  
rb_define_method(rb_cNumber, '+', function(self, _cmd, i) {
  return self + i;
});

rb_define_method(rb_cNumber, '-', function(self, _cmd, i) {
  return self - i;
});

rb_define_method(rb_cNumber, '*', function(self, _cmd, i) {
  return self * i;
});

rb_define_method(rb_cNumber, '/', function(self, _cmd, i) {
  return self / i;
});
  
rb_define_method(rb_cNumber, '%', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '**', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '==', function(self, _cmd, other) {
  return (self == other) ? true : false;
});

rb_define_method(rb_cNumber, '>', function(self, _cmd, other) {
  return self > other ? true : false;
});

rb_define_method(rb_cNumber, '>=', function(self, _cmd, other) {
  return self >= other ? true : false;
});

rb_define_method(rb_cNumber, '<', function(self, _cmd, other) {
  return self < other ? true : false;
});

rb_define_method(rb_cNumber, '<=', function(self, _cmd, other) {
  return self <= other ? true : false;
});
  
rb_define_method(rb_cNumber, '~', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '&', function(self, _cmd, other) {
  return self & other;
});

rb_define_method(rb_cNumber, '|', function(self, _cmd, other) {
  return self | other;
});

rb_define_method(rb_cNumber, '^', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '[]', function(self, _cmd) {
  
});

rb_define_method(rb_cNumber, '<<', function(self, _cmd, other) {
  return self << other;
});
  
rb_define_method(rb_cNumber, '>>', function(self, _cmd, other) {
  return self >> other;
});

rb_define_method(rb_cNumber, 'to_f', function(self, _cmd) {
  return parseFloat(self);
});
