/* 
 * module.js
 * cappruby
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
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

function rb_module_new() {
  return rb_define_module_id("");
};

function rb_define_module_id(id) {
  var m;
  m = rb_objj_alloc_class(id, rb_cObject, T_MODULE, rb_cModule);
  return m;
};

function rb_define_module(id) {
  return rb_define_module_under(rb_cObject, id);
};

function rb_define_module_under(outer, id) {
  var m;
  if (rb_const_defined(outer, id)) {
    m = rb_const_get(outer, id);
    // check tyoe
    return m;
  }
  m = rb_define_module_id(id);
  rb_const_set(outer, id, m);
  return m;
};

/**
  Objj wont natively support including modules, so instead, modules
  are added to class's meta classes in an array, so rb_funcall can
  check there if a method is not found otherwise. This is correct
  behaviour as methods defined in modules, then included, should 
  be checked after method defined on a class itself. Note, because
  we use this, objj_msgSend cannot be used: rb_funcall must be used
  instead.

  Also, these are stores on the klass in which the module was included.
  For that reason, the entire inheritance stack must be searched all the
  way back to CPObject (i.e. no more superclass.)

  This will only happen on module methods, not all the time, so there
  wont be that much performance impact.
*/
function rb_include_module(klass, module) {
  // make array if not already present
  if (!klass.rb_included_modules) klass.rb_included_modules = [];
  // might already be included
  if (klass.rb_included_modules.indexOf(module) != -1) return;
  // else, push it on
  klass.rb_included_modules.push(module);
};
