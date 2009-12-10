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

var RModule = { } ;

function rb_define_module(id) {
  var module;
  if (rb_const_defined(rb_cObject, id)) {
    // module = cObject.$c_g(id);
    module = rb_const_get(rb_cObject, id);
    if (FL_TEST(module, T_MODULE)) {
      return module;
    }
    throw id + ' is not a module';
  }
  module = rb_define_module_id(id);
  rb_class_tbl[id] = module;
  rb_const_set(rb_cObject, id, module);

  return module;
};

function rb_define_module_under(outer, id) {
  var module;
  if (VN.const_defined_at(outer, id)) {
    module = VN.const_get_at(outer, id);
    if (module.type == VN.MODULE) {
      return module;
    }
    VN.type_error(id + ' is not a module');
  }
  module = VN.define_module_id(id);
  VN.const_set(outer, id, module);
  VN.set_class_path(module, outer, name);
  return module;
};

function rb_define_module_id(id) {
  var mdl = rb_mod_create();
  rb_name_class(mdl, id);
  // VN.name_class(mdl, id);
  // mdl.$name(id);
  // mdl.$name(id);
  return mdl;
};

function rb_mod_create() {
  var m = class_alloc(T_MODULE, rb_cModule);
  m.sup = rb_cObject;
  return m;
}

// RModule.create = function() {
//   var mdl = RClass.alloc(VN.MODULE, cModule);
//   mdl.$super = cObject;
//   return mdl;
// };

function rb_include_module(klass, module) {
  rb_include_class_new(module, klass);
}


function rb_include_class_new(mod, sup) {
  var klass = class_alloc(T_ICLASS, rb_cClass);
  klass.iv_tbl = mod.iv_tbl;
  klass.m_tbl = mod.m_tbl;
  klass.sup = sup;
  klass.klass = mod;
  // console.log('included class');
  // console.log(klass);
  return klass;
};
