// This shouldnt be here.. class tbl for all of ruby.
rb_class_tbl = { };

function boot_defclass(id, superclass) {
    var o = rb_class_boot(superclass);
    rb_class_tbl[id] = o;
    rb_const_set((rb_cObject ? rb_cObject : o), id, o);
    return o;
}

function rb_module_s_alloc() {
    return rb_module_new();
}

function rb_class_s_alloc() {
    return rb_class_boot();
}

function rb_class_new_instance_imp(klass, _cmd) {
    var o = rb_funcall(klass, "alloc");
    // FIXME: no initialize params being sent
    rb_funcall(o, "initialize");
    return o;
}

function rb_obj_dummy(self, _cmd) {
    return rb_nil;
}

function rb_obj_equal(self, _cmd, other) {
    return (self == other) ? true : false;
}

function rb_obj_not(self, _cmd) {
    return RTEST(self) ? false : true;
}

function rb_obj_not_equal(self, _cmd, other) {
    return (rb_funcall(self, "==", other)) ? false : true; 
}

function rb_obj_dummy2(self, _cmd, other) {
    return rb_nil;
}

rb_cObject = objj_getClass("CPObject");
rb_const_set(rb_cObject, "Object", rb_cObject);
rb_cBasicObject = objj_duplicateClass(rb_cObject, "BasicObject");

rb_const_set(rb_cObject, "BasicObject", rb_cBasicObject);
rb_cModule = boot_defclass("Module", rb_cObject);
rb_cClass = boot_defclass("Class", rb_cModule);



rb_define_method(rb_cModule, "alloc", rb_module_s_alloc, 0);
rb_define_method(rb_cClass, "alloc", rb_class_s_alloc, 0);
 
rb_define_singleton_method(rb_cObject, "new:", rb_class_new_instance_imp, -1);
 
rb_define_method(rb_cObject, "initialize", rb_obj_dummy, 0);
rb_define_method(rb_cObject, "==", rb_obj_equal, 1);
rb_define_method(rb_cObject, "equal?", rb_obj_equal, 1);
rb_define_method(rb_cObject, "!", rb_obj_not, 0);
rb_define_method(rb_cObject, "!=", rb_obj_not_equal, 1);

rb_define_method(rb_cBasicObject, "initialize", rb_obj_dummy, 0);
rb_define_method(rb_cBasicObject, "==", rb_obj_equal, 1);
rb_define_method(rb_cBasicObject, "equal?", rb_obj_equal, 1);
rb_define_method(rb_cBasicObject, "!", rb_obj_not, 0);
rb_define_method(rb_cBasicObject, "!=", rb_obj_not_equal, 1);

rb_define_method(rb_cObject, "singleton_method_added:", rb_obj_dummy2, 1);
rb_define_method(rb_cObject, "singleton_method_removed:", rb_obj_dummy2, 1);
rb_define_method(rb_cObject, "singleton_method_undefined:", rb_obj_dummy2, 1);

rb_define_method(rb_cBasicObject, "singleton_method_added:", rb_obj_dummy2, 1);
rb_define_method(rb_cBasicObject, "singleton_method_removed:", rb_obj_dummy2, 1);
rb_define_method(rb_cBasicObject, "singleton_method_undefined:", rb_obj_dummy2, 1);

rb_mKernel = rb_define_module("Kernel");
// rb_include_module(rb_cObject, rb_mKernel);
rb_define_method(rb_cClass, "inherited:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "included:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "extended:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "method_added:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "method_removed:", rb_obj_dummy2, 1);
rb_define_method(rb_cModule, "method_undefined:", rb_obj_dummy2, 1);
