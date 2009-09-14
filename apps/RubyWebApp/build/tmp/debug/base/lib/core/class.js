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

/**
  Variable arguments
*/
VN.obj_call_init = function(self, args) {
  VN.funcall(self, 'initialize', args);
};

/**
  Variable number of arguments
*/
VN.class_new_instance = function() {
  var obj = VN.obj_alloc(this);
  VN.obj_call_init(obj, arguments);
  return obj;
};

VN.define_method(VN.cClass, 'allocate', VN.obj_alloc, 0);
VN.define_method(VN.cClass, 'new', VN.class_new_instance, -1);
VN.define_method(VN.cClass, 'initialize', VN.class_initialize, -1);
VN.define_method(VN.cClass, 'initialize_copy', VN.class_init_copy, 1);
VN.define_method(VN.cClass, 'superclass', VN.class_superclass, 0);
VN.define_alloc_func(VN.cClass, VN.class_s_alloc);
VN.undef_method(VN.cClass, 'extend_object');
VN.undef_method(VN.cClass, 'append_features');