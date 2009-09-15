/* 
 * boolean.js
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

Boolean.prototype.klass = VN.cBooleanClass ;
Boolean.prototype.type = VN.T_TRUE ;

VN.boolean_class = function() {
  return this ? VN.cTrueClass : VN.cFalseClass ;
};

VN.boolean_name = function() {
  return 'BooleanClass' ;
};

// Need to over-ride these to make them true/false specific
VN.define_method(VN.cBooleanClass, 'class', VN.boolean_class, 0);
VN.define_method(VN.cBooleanClass.klass, 'name', VN.boolean_name, 0);


VN.boolean_to_s = function() {
 return this ? 'true' : 'false' ;
};

VN.boolean_and = function(obj) {
  if (this) {
    return obj ? true : false ;
  }
  else {
    return false ;
  }
};

VN.boolean_or = function(obj) {
  if (this) {
    return true ;
  }
  else {
    return obj ? true : false ;
  }
};

VN.boolean_xor = function(obj) {
  if (this) {
    return obj ? false : true ;
  }
  else {
    return obj ? true : false ;
  }
};

VN.define_method(VN.cBooleanClass, 'to_s', VN.boolean_to_s, 0);
VN.define_method(VN.cBooleanClass, '&', VN.boolean_and, 0);
VN.define_method(VN.cBooleanClass, '|', VN.boolean_or, 0);
VN.define_method(VN.cBooleanClass, '^', VN.boolean_xor, 0);
VN.undef_alloc_func(VN.cBooleanClass);
VN.undef_method(VN.cBooleanClass.klass, 'new');
VN.define_global_const('FALSE', false);
VN.define_global_const('TRUE', true);
