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

function rb_define_module_under(outer, id) {
    var m;
    if (rb_const_defined(outer, id)) {
        m = rb_const_get(outer, id);
        // check type..
        return m;
    }
    m = rb_define_module_id(id);
    rb_const_set(outer, id, m);
    return m;
}

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
    // copy module into klass
    // console.log('copying ' + module.name + ' into ' + klass.name);
    // var t = klass.isa; // t = target
    
    if (!klass._rb_included_modules) {
        klass._rb_included_modules = [];
    }
    if (klass._rb_included_modules.indexOf(module) > -1) {
        // already added, so return!
        return;
    }
    // else, add it....
    klass._rb_included_modules.push(module);
    
    if (!module._rb_included_in_classes) {
        module._rb_included_in_classes = [];
    }
    module._rb_included_in_classes.push(klass);
}