function rb_const_set(klass, id, value) {
    klass[id] = value;
}

function rb_const_defined(klass, id) {
    return (klass[id]) ? true : false;
}

function rb_const_get(klass, id) {
    while(klass) {
        if (klass[id]) {
            return klass[id];
        }
        klass = klass.super_class;
    }
    throw 'cannot find constant ' + id + ' on klass '
}

/**
    This should also check parents for nested modules/classes
    Also, this should check included modules/classes, as should
    rb_const_get();
*/
function rb_const_get_full(klass, id) {
    // console.log("========= Searching for:" + id);
    while(klass) {
        // console.log(klass);
        // console.log(klass.name);
        if (klass[id]) {
            return klass[id];
        }
        klass = klass.super_class;
    }
    // try window level scope (for cappuccino classes etc);
    if (window[id]) {
        // save for future use
        rb_const_set(rb_cObject, id, window[id]);
        return window[id];
    }
    throw 'cannot find constant ' + id + ' on klass '
}

function rb_ivar_set(klass, id, val) {
    return klass[id] = val;
}

function rb_ivar_get(klass, id) {
    return klass[id];
}