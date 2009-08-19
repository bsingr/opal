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

require('basic_object');

rb_cModule = boot_defclass('Module', rb_cObject);

function rb_mod_to_s(klass) {
  
};

function rb_mod_freeze(mod) {
  
};

function rb_mod_eqq(mod, arg) {
  return rb_obj_is_kind_of(arg, mod);
};

function rb_class_inherited_p(mod, arg) {
  
};

function rb_mod_lt(mod, arg) {
  if (mod == arg) return Qfalse;
  return rb_class_inherited_p(mod, arg);
};

function rb_mod_ge(mod, arg) {
  
};

function rb_mod_gt(mod, arg) {
  if (mod == arg) return Qfalse;
  return rb_mod_ge(mod, arg);
};

function rb_mod_cmp(mod, arg) {
  
};




static VALUE
rb_mod_cmp(VALUE mod, VALUE arg)
{
    VALUE cmp;

    if (mod == arg) return INT2FIX(0);
    switch (TYPE(arg)) {
      case T_MODULE:
      case T_CLASS:
	break;
      default:
	return Qnil;
    }

    cmp = rb_class_inherited_p(mod, arg);
    if (NIL_P(cmp)) return Qnil;
    if (cmp) {
	return INT2FIX(-1);
    }
    return INT2FIX(1);
}

static VALUE
rb_module_s_alloc(VALUE klass)
{
    VALUE mod = rb_module_new();

    RBASIC(mod)->klass = klass;
    return mod;
}

static VALUE
rb_class_s_alloc(VALUE klass)
{
    return rb_class_boot(0);
}

/*
 *  call-seq:
 *    Module.new                  => mod
 *    Module.new {|mod| block }   => mod
 *  
 *  Creates a new anonymous module. If a block is given, it is passed
 *  the module object, and the block is evaluated in the context of this
 *  module using <code>module_eval</code>.
 *     
 *     Fred = Module.new do
 *       def meth1
 *         "hello"
 *       end
 *       def meth2
 *         "bye"
 *       end
 *     end
 *     a = "my string"
 *     a.extend(Fred)   #=> "my string"
 *     a.meth1          #=> "hello"
 *     a.meth2          #=> "bye"
 */

static VALUE
rb_mod_initialize(VALUE module)
{
    extern VALUE rb_mod_module_exec(int argc, VALUE *argv, VALUE mod);

    if (rb_block_given_p()) {
	rb_mod_module_exec(1, &module, module);
    }
    return Qnil;
}

rb_define_method(rb_cModule, 'freeze', rb_mod_freeze, 0);
rb_define_method(rb_cModule, '===', rb_mod_eqq, 1);
rb_define_method(rb_cModule, '==', rb_obj_equal, 1);
rb_define_method(rb_cModule, '<=>',  rb_mod_cmp, 1);
rb_define_method(rb_cModule, '<',  rb_mod_lt, 1);
rb_define_method(rb_cModule, '<=', rb_class_inherited_p, 1);
rb_define_method(rb_cModule, '>',  rb_mod_gt, 1);
rb_define_method(rb_cModule, '>=', rb_mod_ge, 1);
rb_define_method(rb_cModule, 'initialize_copy', rb_mod_init_copy, 1); /* in class.c */
rb_define_method(rb_cModule, 'to_s', rb_mod_to_s, 0);
rb_define_method(rb_cModule, 'included_modules', rb_mod_included_modules, 0); /* in class.c */
rb_define_method(rb_cModule, 'include?', rb_mod_include_p, 1); /* in class.c */
rb_define_method(rb_cModule, 'name', rb_mod_name, 0);  /* in variable.c */
rb_define_method(rb_cModule, 'ancestors', rb_mod_ancestors, 0); /* in class.c */

rb_define_private_method(rb_cModule, 'attr', rb_mod_attr, -1);
rb_define_private_method(rb_cModule, 'attr_reader', rb_mod_attr_reader, -1);
rb_define_private_method(rb_cModule, 'attr_writer', rb_mod_attr_writer, -1);
rb_define_private_method(rb_cModule, 'attr_accessor', rb_mod_attr_accessor, -1);

rb_define_alloc_func(rb_cModule, rb_module_s_alloc);
rb_define_method(rb_cModule, 'initialize', rb_mod_initialize, 0);
rb_define_method(rb_cModule, 'instance_methods', rb_class_instance_methods, -1); /* in class.c */
rb_define_method(rb_cModule, 'public_instance_methods', 
     rb_class_public_instance_methods, -1);    /* in class.c */
rb_define_method(rb_cModule, 'protected_instance_methods', 
     rb_class_protected_instance_methods, -1); /* in class.c */
rb_define_method(rb_cModule, 'private_instance_methods', 
     rb_class_private_instance_methods, -1);   /* in class.c */

rb_define_method(rb_cModule, 'constants', rb_mod_constants, -1); /* in variable.c */
rb_define_method(rb_cModule, 'const_get', rb_mod_const_get, -1);
rb_define_method(rb_cModule, 'const_set', rb_mod_const_set, 2);
rb_define_method(rb_cModule, 'const_defined?', rb_mod_const_defined, -1);
rb_define_private_method(rb_cModule, 'remove_const', 
	     rb_mod_remove_const, 1); /* in variable.c */
rb_define_method(rb_cModule, 'const_missing', 
     rb_mod_const_missing, 1); /* in variable.c */
rb_define_method(rb_cModule, 'class_variables', 
     rb_mod_class_variables, 0); /* in variable.c */
rb_define_method(rb_cModule, 'remove_class_variable', 
     rb_mod_remove_cvar, 1); /* in variable.c */
rb_define_method(rb_cModule, 'class_variable_get', rb_mod_cvar_get, 1);
rb_define_method(rb_cModule, 'class_variable_set', rb_mod_cvar_set, 2);
rb_define_method(rb_cModule, 'class_variable_defined?', rb_mod_cvar_defined, 1);
