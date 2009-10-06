/* 
 * kernel.js
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

mKernel.$def('nil?', function() {
  return false;
});

mKernel.$def('===', function() {
  
});

mKernel.$def('=~', function(obj) {
  return nil ;
});

mKernel.$def('!=', function(obj) {
  return this.$call('=~', obj) ? false : true ;
});

mKernel.$def('eql?', function() {
  
});




mKernel.$def('class', VN.obj_class, 0);

mKernel.$def('clone', VN.obj_clone, 0);

mKernel.$def('dup', VN.obj_dup, 0);

mKernel.$def('initialize_copy', function(orig) {
  if (orig == this) return this ;
  if (this.$type != orig.$type || this.$klass != orig.$klass) {
    VN.type_error('initialize_copy should take same class object') ;
  }
  return this ;
});

mKernel.$def('taint', VN.obj_taint, 0);

mKernel.$def('tainted?', VN.obj_tainted, 0);

mKernel.$def('untaint', VN.obj_untaint, 0);

mKernel.$def('untrust', VN.obj_untrust, 0);

mKernel.$def('untrusted?', VN.obj_untrusted, 0);

mKernel.$def('trust', VN.obj_trust, 0);

mKernel.$def('freeze', VN.obj_freeze, 0);

mKernel.$def('frozen?', VN.obj_frozen_p, 0);




mKernel.$def('to_s', function() {
  return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;
});

mKernel.$def('inspect', function() {
  return "";
});

mKernel.$def('methods', function() {
  
});

mKernel.$def('singleton_methods', function() {
  
});

mKernel.$def('protected_methods', function() {
  
});

mKernel.$def('private_methods', function() {
  
});

mKernel.$def('public_methods', function() {
  
});

mKernel.$def('instance_variables', function() {
  
});

mKernel.$def('instance_variables_get', function(iv) {
  return this.$ivar_get(iv);
});

mKernel.$def('instance_variables_set', function(iv, val) {
  return this.$ivar_set(iv, val);
});

mKernel.$def('instance_variables_defined?', function(iv) {
  return this.$ivar_defined(iv);
});

mKernel.$define_private_method('remove_instance_variable', function(iv) {
  
});





mKernel.$def('instance_of?', function(klass) {
  switch (klass.$type) {
    case VN.MODULE:
    case VN.CLASS:
    case VN.ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  if (this.$klass == klass) return true ;
  return false ;
});

mKernel.$def('kind_of?', function(klass) {
  switch (klass.$type) {
    case VN.MODULE:
    case VN.CLASS:
    case VN.ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  var k = self.$klass ;
  while (k) {
    if (k == klass) {
      return true;
    }
    k = k.$super;
  }
  return false; 
});

mKernel.$def('is_a?', function(klass) {
  switch (klass.$type) {
    case VN.MODULE:
    case VN.CLASS:
    case VN.ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  var k = self.$klass ;
  while (k) {
    if (k == klass) {
      return true;
    }
    k = k.$super;
  }
  return false; 
});

mKernel.$def('puts', function(val) {
  console.log(101010101);
});

mKernel.$def('tap', function() {
  VN.warning('Kernel#tap is unimplemented');
});
