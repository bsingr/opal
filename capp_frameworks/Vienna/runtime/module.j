function rb_module_new() {
    return rb_define_module_id();
}

function rb_define_module_id(id) {
    RB_MODULE = 1;
    var m;
    m = rb_objj_alloc_class(id, rb_cObject, RB_MODULE, rb_cModule);
    return m;
}

function rb_define_module(id) {
    var m;
    if (rb_const_defined(rb_cObject, id)) {
        m = rb_const_get(rb_cObject, id);
        // check type of m is a module..
        return m;
    }
    m = rb_define_module_id(id);
    rb_class_tbl[id] = m;
    rb_const_set(rb_cObject, id, m);
    return m;
}
