/* 
 * class.js
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
 
require('module');

rb_cClass = boot_defclass('Class', rb_cModule);

function rb_obj_alloc(klass) {
  
};

function rb_class_new_instance(argc, argv, klass) {
  var obj = rb_obj_alloc(klass);
  rb_obj_call_init(obj, argc, argv);
  return obj;
};

function rb_class_superclass(klass) {
  
};

rb_define_method(rb_cClass, 'allocate', rb_obj_alloc, 0);
rb_define_method(rb_cClass, 'new', rb_class_new_instance, -1);
rb_define_method(rb_cClass, 'initialize', rb_class_initialize, -1);
rb_define_method(rb_cClass, 'initialize_copy', rb_class_init_copy, 1); /* in class.c */
rb_define_method(rb_cClass, 'superclass', rb_class_superclass, 0);
rb_define_alloc_func(rb_cClass, rb_class_s_alloc);
rb_undef_method(rb_cClass, 'extend_object');
rb_undef_method(rb_cClass, 'append_features');
