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

rb_mKernel = rb_define_module('Kernel');
rb_include_module(rb_cObject, rb_mKernel);
rb_define_private_method(rb_cClass, 'inherited', rb_obj_dummy, 1);
rb_define_private_method(rb_cModule, 'included', rb_obj_dummy, 1);
rb_define_private_method(rb_cModule, 'extended', rb_obj_dummy, 1);
rb_define_private_method(rb_cModule, 'method_added', rb_obj_dummy, 1);
rb_define_private_method(rb_cModule, 'method_removed', rb_obj_dummy, 1);
rb_define_private_method(rb_cModule, 'method_undefined', rb_obj_dummy, 1);

rb_define_method(rb_mKernel, 'nil?', rb_false, 0);
rb_define_method(rb_mKernel, '===', rb_equal, 1); 
rb_define_method(rb_mKernel, '=~', rb_obj_match, 1);
rb_define_method(rb_mKernel, '!~', rb_obj_not_match, 1);
rb_define_method(rb_mKernel, 'eql?', rb_obj_equal, 1);

rb_define_method(rb_mKernel, 'class', rb_obj_class, 0);
rb_define_method(rb_mKernel, 'clone', rb_obj_clone, 0);
rb_define_method(rb_mKernel, 'dup', rb_obj_dup, 0);
rb_define_method(rb_mKernel, 'initialize_copy', rb_obj_init_copy, 1);

rb_define_method(rb_mKernel, 'taint', rb_obj_taint, 0);
rb_define_method(rb_mKernel, 'tainted?', rb_obj_tainted, 0);
rb_define_method(rb_mKernel, 'untaint', rb_obj_untaint, 0);
rb_define_method(rb_mKernel, 'untrust', rb_obj_untrust, 0);
rb_define_method(rb_mKernel, 'untrusted?', rb_obj_untrusted, 0);
rb_define_method(rb_mKernel, 'trust', rb_obj_trust, 0);
rb_define_method(rb_mKernel, 'freeze', rb_obj_freeze, 0);
rb_define_method(rb_mKernel, 'frozen?', rb_obj_frozen_p, 0);

rb_define_method(rb_mKernel, 'to_s', rb_any_to_s, 0);
rb_define_method(rb_mKernel, 'inspect', rb_obj_inspect, 0);
rb_define_method(rb_mKernel, 'methods', rb_obj_methods, -1);
rb_define_method(rb_mKernel, 'singleton_methods', rb_obj_singleton_methods, -1); /* in class.c */
rb_define_method(rb_mKernel, 'protected_methods', rb_obj_protected_methods, -1);
rb_define_method(rb_mKernel, 'private_methods', rb_obj_private_methods, -1);
rb_define_method(rb_mKernel, 'public_methods', rb_obj_public_methods, -1);
rb_define_method(rb_mKernel, 'instance_variables', rb_obj_instance_variables, 0); /* in variable.c */
rb_define_method(rb_mKernel, 'instance_variable_get', rb_obj_ivar_get, 1);
rb_define_method(rb_mKernel, 'instance_variable_set', rb_obj_ivar_set, 2);
rb_define_method(rb_mKernel, 'instance_variable_defined?', rb_obj_ivar_defined, 1);
rb_define_private_method(rb_mKernel, 'remove_instance_variable',
	     rb_obj_remove_instance_variable, 1); /* in variable.c */

rb_define_method(rb_mKernel, 'instance_of?', rb_obj_is_instance_of, 1);
rb_define_method(rb_mKernel, 'kind_of?', rb_obj_is_kind_of, 1);
rb_define_method(rb_mKernel, 'is_a?', rb_obj_is_kind_of, 1);
rb_define_method(rb_mKernel, 'tap', rb_obj_tap, 0);
