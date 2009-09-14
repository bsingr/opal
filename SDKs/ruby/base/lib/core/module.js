/* 
 * module.js
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

VN.define_method(VN.cModule, 'freeze', VN.mod_freeze, 0);
VN.define_method(VN.cModule, '===', VN.mod_eqq, 1);
VN.define_method(VN.cModule, '==', VN.obj_equal, 1);
VN.define_method(VN.cModule, '<=>', VN.mod_cmp, 1);
VN.define_method(VN.cModule, '<', VN.mod_lt, 1);
VN.define_method(VN.cModule, '<=', VN.class_inherited_p, 1);
VN.define_method(VN.cModule, '>', VN.mod_gt, 1);
VN.define_method(VN.cModule, '>=', VN.mod_ge, 1);

VN.define_method(VN.cModule, 'initialize_copy', VN.mod_init_copy, 1);
VN.define_method(VN.cModule, 'to_s', VN.mod_to_s, 0);
VN.define_method(VN.cModule, 'included_modules', VN.mod_included_modules, 0);
VN.define_method(VN.cModule, 'include?', VN.mod_include_p, 1);
VN.define_method(VN.cModule, 'name', VN.mod_name, 0);
VN.define_method(VN.cModule, 'ancestors', VN.mod_ancestors, 0);

VN.define_private_method(VN.cModule, 'attr', VN.mod_attr, -1);
VN.define_private_method(VN.cModule, 'attr_reader', VN.mod_attr_reader, -1);
VN.define_private_method(VN.cModule, 'attr_writer', VN.mod_attr_writer, -1);
VN.define_private_method(VN.cModule, 'attr_accessor', VN.mod_attr_accessor, -1);

VN.define_alloc_func(VN.cModule, VN.module_s_alloc);
VN.define_method(VN.cModule, 'initialize', VN.mod_initialize, 0);
VN.define_method(VN.cModule, 'instance_methods', VN.class_instance_methods, -1);
VN.define_method(VN.cModule, 'public_instance_methods', VN.class_public_instance_methods, -1);
VN.define_method(VN.cModule, 'protected_instance_methods', VN.class_protected_instance_methods, -1);
VN.define_method(VN.cModule, 'private_instance_methods', VN.class_private_instance_methods, -1);

VN.define_method(VN.cModule, 'constance', VN.mod_constants, -1);
VN.define_method(VN.cModule, 'const_get', VN.mod_const_get, -1);
VN.define_method(VN.cModule, 'const_set', VN.mod_const_set, 2);
VN.define_method(VN.cModule, 'const_defined?', VN.mod_const_defined, -1);
VN.define_private_method(VN.cModule, 'remove_const', VN.mod_remove_const, 1);
VN.define_method(VN.cModule, 'const_missing', VN.mod_const_missing, 1);
VN.define_method(VN.cModule, 'class_variables', VN.mod_class_variables, 0);
VN.define_method(VN.cModule, 'remove_class_variable', VN.mod_remove_cvar, 1);
VN.define_method(VN.cModule, 'class_variable_get', VN.mod_cvar_get, 1);
VN.define_method(VN.cModule, 'class_variable_set', VN.mod_cvar_set, 2);
VN.define_method(VN.cModule, 'class_variable_defined?', VN.mod_cvar_defined, 1);