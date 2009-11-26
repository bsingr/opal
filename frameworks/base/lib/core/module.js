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

cModule.$define_alloc_func(function(module_s_alloc) {
  
});

var rb_cModule = cModule;

rb_define_method(rb_cModule, 'freeze', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '===', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '==', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '<=>', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '<', function(self, _cmd) {
  
});


rb_define_method(rb_cModule, '<=', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '>', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, '>=', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'initialize_copy', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'to_s', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'included_modules', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'include?', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'freeze', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'name', function(self, _cmd) {
  return self.$iv_tbl['__classid__'];
});

rb_define_method(rb_cModule, 'ancestors', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'attr', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'attr_reader', function(self, _cmd) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    var body = new Function('self', '_cmd', 'return self.$i_g("@' + args[i] + '");');
    rb_define_method(self, args[i], body);
  }
});

rb_define_method(rb_cModule, 'attr_writer', function(self, _cmd) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    var body = new Function('self', '_cmd', 'val', 'return self.$i_s("@' + args[i] + ', val");');
    rb_define_method(self, args[i], body);
  }
});

rb_define_method(rb_cModule, 'attr_accessor', function(self, _cmd) {
  var args = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < args.length; i++) {
    rb_funcall(self, 'attr_reader', args[i]);
    rb_funcall(self, 'attr_writer', args[i]);
  }
});

rb_define_method(rb_cModule, 'initialize', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'public_instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'protected_instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'private_instance_methods', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'constants', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'const_get', function(self, _cmd) {
  
});
  
rb_define_method(rb_cModule, 'const_set', function(self, _cmd, id, val) {
  return self.$iv_tbl[id] = val;
});

rb_define_method(rb_cModule, 'const_defined?', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'remove_const', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'const_missing', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variables', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'remove_class_variable', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variable_get', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variable_set', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'class_variable_defined?', function(self, _cmd) {
  
});

rb_define_method(rb_cModule, 'include', function(self, _cmd, mod) {
  // console.log('including module: ')
  rb_funcall(self, 'append_features', mod);
  rb_funcall(self, 'included', mod);
  return self;
});
