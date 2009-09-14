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

VN.obj_match = function(self, obj2) {
  return VN.Qnil ;
};

VN.obj_not_match = function(self, obj2) {
  var result = VN.funcall(self, '=~', 1, obj2) ;
  return VN.RTEST(result) ? VN.Qfalse : VN.Qtrue ;
};

VN.define_method(VN.mKernel, 'nil?', VN.rb_false, 0);
VN.define_method(VN.mKernel, '===', VN.equal, 1);
VN.define_method(VN.mKernel, '=~', VN.obj_match, 1);
VN.define_method(VN.mKernel, '!~', VN.obj_not_match, 1);
VN.define_method(VN.mKernel, 'eql?', VN.obj_equal, 1);

VN.obj_init_copy = function (self, orig) {
  if (self == orig) return self ;
  if (self.type != orig.type || obj.klass != orig.klass) {
    VN.type_error('initialize_copy should take same class object');
  }
  return self;
};

VN.define_method(VN.mKernel, 'class', VN.obj_class, 0);
VN.define_method(VN.mKernel, 'clone', VN.obj_clone, 0);
VN.define_method(VN.mKernel, 'dup', VN.obj_dup, 0);
VN.define_method(VN.mKernel, 'initialize_copy', VN.obj_init_copy, 1);

VN.define_method(VN.mKernel, 'taint', VN.obj_taint, 0);
VN.define_method(VN.mKernel, 'tainted?', VN.obj_tainted, 0);
VN.define_method(VN.mKernel, 'untaint', VN.obj_untaint, 0);
VN.define_method(VN.mKernel, 'untrust', VN.obj_untrust, 0);
VN.define_method(VN.mKernel, 'untrusted?', VN.obj_untrusted, 0);
VN.define_method(VN.mKernel, 'trust', VN.obj_trust, 0);
VN.define_method(VN.mKernel, 'freeze', VN.obj_freeze, 0);
VN.define_method(VN.mKernel, 'frozen?', VN.obj_frozen_p, 0);

VN.any_to_s = function(self) {
  return VN.str_new_cstr("#<" + VN.obj_classname(self) + ":0x00000000>");
};

VN.inspect = function(self) {
  return VN.str_new_cstr("");
};

VN.obj_methods = function(argc, argv, self) {
  
};

VN.obj_singleton_methods = function(argc, argv, self) {
  
};

VN.obj_protected_methods = function(argc, argv, self) {
  
};

VN.obj_private_methods = function(argc, argv, self) {
  
};

VN.obj_public_methods = function(argc, argv, self) {
  
};

VN.obj_instance_variables = function(self) {
  
};

VN.obj_ivar_get = function(self, iv) {
  return VN.ivar_get(self, VN.to_id(iv)) ;
};


VN.obj_ivar_set = function(self, iv, val) {
  return VN.ivar_set(self, VN.to_id(iv), val) ;
};

VN.obj_ivar_defined = function(self, iv) {
  return VN.ivar_defined(self, VN.to_id(iv)) ;
};

VN.define_method(VN.mKernel, 'to_s', VN.any_to_s, 0);
VN.define_method(VN.mKernel, 'inspect', VN.obj_inspect, 0);
VN.define_method(VN.mKernel, 'methods', VN.obj_methods, -1);
VN.define_method(VN.mKernel, 'singleton_methods', VN.obj_singleton_methods, -1);
VN.define_method(VN.mKernel, 'protected_methods', VN.obj_protected_methods, -1);
VN.define_method(VN.mKernel, 'private_methods', VN.obj_private_methods, -1);
VN.define_method(VN.mKernel, 'public_methods', VN.obj_public_methods, -1);
VN.define_method(VN.mKernel, 'instance_variables', VN.obj_instance_variables, 0);
VN.define_method(VN.mKernel, 'instance_variables_get', VN.obj_ivar_get, 1);
VN.define_method(VN.mKernel, 'instance_variables_set', VN.obj_ivar_set, 2);
VN.define_method(VN.mKernel, 'instance_variables_defined?', VN.obj_ivar_defined, 1);
VN.define_private_method(VN.mKernel, 'remove_instance_variable', VN.obj_remove_instance_variable, 1);

VN.obj_is_instance_of = function(self, klass) {
  switch (klass.type) {
    case VN.T_MODULE:
    case VN.T_CLASS:
    case VN.T_ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  if (self.klass == klass) return VN.Qtrue ;
  return VN.Qfalse ;
};

VN.obj_is_kind_of = function(self, klass) { 
  switch (klass.type) {
    case VN.T_MODULE:
    case VN.T_CLASS:
    case VN.T_ICLASS:
      break ;
    default:
      VN.type_error('class or module required');
  }
  var k = self.klass ;
  while (k) {
    if (k == klass || klass.m_tbl == k.m_tbl) {
      return VN.Qtrue;
    }
    k = k.super_klass;
  }
  return VN.Qfalse;
};

VN.obj_tap = function(self) {
  VN.warning('Kernel#tap unimplemented');
};

VN.define_method(VN.mKernel, 'instance_of?', VN.obj_is_instance_of, 1);
VN.define_method(VN.mKernel, 'kind_of?', VN.obj_is_kind_of, 1);
VN.define_method(VN.mKernel, 'is_a?', VN.obj_is_kind_of, 1);
VN.define_method(VN.mKernel, 'tap', VN.obj_tap, 0);