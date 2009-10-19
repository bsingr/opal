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
 
Number.prototype.$klass = cNumeric ;
Number.prototype.$type = VN.NUMBER ;
Number.prototype.$ = RObject.prototype.$;

// VN.include_module(VN.cNumeric, VN.mComparable);
RModule.include(cNumeric, mComparable);

cNumeric.$def('singleton_method_added', function() {
  
});

cNumeric.$def('initialize_copy', function() {
  
});

cNumeric.$def('coerce', function() {
  
});

cNumeric.$def('+@', function() {
  
});

cNumeric.$def('-@', function() {
  
});

cNumeric.$def('<=>', function() {
  
});

cNumeric.$def('eql?', function() {
  
});

cNumeric.$def('quo', function() {
  
});

cNumeric.$def('fdiv', function() {
  
});

cNumeric.$def('div', function() {
  
});

cNumeric.$def('divmod', function() {
  
});

cNumeric.$def('modulo', function() {
  
});

cNumeric.$def('remainder', function() {
  
});

cNumeric.$def('abs', function() {
  
});

cNumeric.$def('magnitude', function() {
  
});

cNumeric.$def('to_int', function() {
  
});

cNumeric.$def('real?', function() {
  
});

cNumeric.$def('integer?', function() {
  
});

cNumeric.$def('zero?', function() {
  
});

cNumeric.$def('nonzero?', function() {
  
});

cNumeric.$def('floor', function() {
  
});

cNumeric.$def('ceil', function() {
  
});

cNumeric.$def('round', function() {
  
});

cNumeric.$def('truncate', function() {
  
});

cNumeric.$def('step', function() {
  
});

cNumeric.$def('odd?', function() {
  
});

cNumeric.$def('even?', function() {
  
});

cNumeric.$def('upto', function() {
  
});

cNumeric.$def('downto', function() {
  
});

cNumeric.$def('times', function() {
  
});

cNumeric.$def('succ', function() {
  
});

cNumeric.$def('next', function() {
  
});

cNumeric.$def('pred', function() {
  
});

cNumeric.$def('chr', function() {
  
});

cNumeric.$def('ord', function() {
  
});

cNumeric.$def('to_i', function() {
  
});

cNumeric.$def('to_s', function() {
  
});

cNumeric.$def('+', function(i) {
  return this + i;
});

cNumeric.$def('-', function(i) {
  return this - i;
});

cNumeric.$def('*', function() {
  
});

cNumeric.$def('/', function() {
  
});

cNumeric.$def('%', function() {
  
});

cNumeric.$def('**', function() {
  
});

cNumeric.$def('==', function(self, _cmd, other) {
  return self == other ? true : false;
});

cNumeric.$def('>', function() {
  
});

cNumeric.$def('>=', function() {
  
});

cNumeric.$def('<', function() {
  
});

cNumeric.$def('<=', function() {
  
});

cNumeric.$def('~', function() {
  
});

cNumeric.$def('&', function(self, _cmd, other) {
  return self & other;
});

cNumeric.$def('|', function(self, _cmd, other) {
  return self | other;
});

cNumeric.$def('^', function(self, _cmd, other) {
  
});

cNumeric.$def('[]', function() {
  
});

cNumeric.$def('<<', function(self, _cmd, other) {
  return self << other;
});

cNumeric.$def('>>', function() {
  
});

cNumeric.$def('to_f', function() {
  
});
