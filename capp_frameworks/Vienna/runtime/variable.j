function rb_const_set(klass, id, value) {
    klass[id] = value;
}

function rb_const_defined(klass, id) {
    return (klass[id]) ? true : false;
}

function rb_const_get(klass, id) {
    return klass[id];
}

function rb_const_get_full(klass, id) {
    if (klass[id]) {
        return klass[id];
    }
    return window[id];
}

function rb_ivar_set(klass, id, val) {
    return klass[id] = val;
}

function rb_ivar_get(klass, id) {
    return klass[id];
}