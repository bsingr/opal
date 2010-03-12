/* 
 * module.js
 * opal
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
  // console.log("include into " + klass.iv_tbl.__classid__);
  // console.log(module);
  var c = klass;
  while (module) {
    if (module == rb_cObject) break; // hack, stop on rb_cObject for now
    c = c.sup = rb_include_class_new(module, c);
    module = module.sup;
    // module = false;
  }
  // console.log("sklass.sup is now " + klass.sup.klass);
  return;
  // FIXME: need to check if already included, or its a parent etc etc.
  // console.log ("=== " + klass.iv_tbl.__classid__ + " << " + module.iv_tbl.__classid__);
  // console.log("       org sup:" + klass.sup.iv_tbl.__class_id);
  // console.log("       mod sup: " + module.sup.iv_tbl.__classid__);
  klass.sup = rb_include_class_new(module, klass);
  // console.log("       result sup: " + klass.sup.iv_tbl.__classid__);
  // if (klass != rb_cObject)
  // klass.sup.sup = module.sup;
  // console.log("       result sup sup: " + klass.sup.sup.iv_tbl.__classid__);
  
};


function rb_include_class_new(mod, sup) {
  // console.log("=== starting include - " + sup.iv_tbl.__classid__ + " " + sup.flags);
  // console.log(sup);
  // console.log(" from: " + mod.iv_tbl.__classid__ + " " + mod.flags);
  // console.log(mod);
  var klass = class_alloc(T_ICLASS, rb_cClass);
  // console.log();
  if (mod.flags & T_ICLASS) mod = mod.klass;
  // console.log(mod.flags);
  
  klass.iv_tbl = mod.iv_tbl;
  klass.m_tbl = mod.m_tbl;
  klass.sup = sup.sup;
  klass.klass = mod;
  // console.log('included class ' + klass.iv_tbl.__classid__ + " into " + sup.iv_tbl.__classid__);
  // console.log(sup);
  // console.log("ok");
  // console.log(klass.iv_tbl.__classid__);
  // console.log(klass);
  return klass;
};
