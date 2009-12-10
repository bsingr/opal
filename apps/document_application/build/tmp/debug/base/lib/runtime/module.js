
var RModule={};function rb_define_module(id){var module;if(rb_const_defined(rb_cObject,id)){module=rb_const_get(rb_cObject,id);if(FL_TEST(module,T_MODULE)){return module;}
throw id+' is not a module';}
module=rb_define_module_id(id);rb_class_tbl[id]=module;rb_const_set(rb_cObject,id,module);return module;};function rb_define_module_under(outer,id){var module;if(VN.const_defined_at(outer,id)){module=VN.const_get_at(outer,id);if(module.type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=VN.define_module_id(id);VN.const_set(outer,id,module);VN.set_class_path(module,outer,name);return module;};function rb_define_module_id(id){var mdl=rb_mod_create();rb_name_class(mdl,id);return mdl;};function rb_mod_create(){var m=class_alloc(T_MODULE,rb_cModule);m.sup=rb_cObject;return m;}
function rb_include_module(klass,module){rb_include_class_new(module,klass);}
function rb_include_class_new(mod,sup){var klass=class_alloc(T_ICLASS,rb_cClass);klass.iv_tbl=mod.iv_tbl;klass.m_tbl=mod.m_tbl;klass.sup=sup;klass.klass=mod;return klass;};