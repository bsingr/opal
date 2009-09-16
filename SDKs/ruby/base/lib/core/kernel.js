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

mKernel.$define_method('nil?', function() {
  return false;
});

mKernel.$define_method('===', function() {
  
});

mKernel.$define_method('=~', function(obj) {
  return nil ;
});

mKernel.$define_method('!=', function(obj) {
  return this.$call('=~', obj) ? false : true ;
});

mKernel.$define_method('eql?', function() {
  
});




mKernel.$define_method('class', VN.obj_class, 0);

mKernel.$define_method('clone', VN.obj_clone, 0);

mKernel.$define_method('dup', VN.obj_dup, 0);

mKernel.$define_method('initialize_copy', function(orig) {
  if (orig == this) return this ;
  if (this.$type != orig.$type || this.$klass != orig.$klass) {
    VN.type_error('initialize_copy should take same class object') ;
  }
  return this ;
});

mKernel.$define_method('taint', VN.obj_taint, 0);

mKernel.$define_method('tainted?', VN.obj_tainted, 0);

mKernel.$define_method('untaint', VN.obj_untaint, 0);

mKernel.$define_method('untrust', VN.obj_untrust, 0);

mKernel.$define_method('untrusted?', VN.obj_untrusted, 0);

mKernel.$define_method('trust', VN.obj_trust, 0);

mKernel.$define_method('freeze', VN.obj_freeze, 0);

mKernel.$define_method('frozen?', VN.obj_frozen_p, 0);




mKernel.$define_method('to_s', function() {
  return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;
});

mKernel.$define_method('inspect', function() {
  return "";
});

mKernel.$define_method('methods', function() {
  
});

mKernel.$define_method('singleton_methods', function() {
  
});

mKernel.$define_method('protected_methods', function() {
  
});

mKernel.$define_method('private_methods', function() {
  
});

mKernel.$define_method('public_methods', function() {
  
});

mKernel.$define_method('instance_variables', function() {
  
});

mKernel.$define_method('instance_variables_get', function(iv) {
  return this.$ivar_get(iv);
});

mKernel.$define_method('instance_variables_set', function(iv, val) {
  return this.$ivar_set(iv, val);
});

mKernel.$define_method('instance_variables_defined?', function(iv) {
  return this.$ivar_defined(iv);
});

mKernel.$define_private_method('remove_instance_variable', function(iv) {
  
});





mKernel.$define_method('instance_of?', function(klass) {
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

mKernel.$define_method('kind_of?', function(klass) {
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

mKernel.$define_method('is_a?', function(klass) {
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

mKernel.$define_method('tap', function() {
  VN.warning('Kernel#tap is unimplemented');
});
