function rb_const_set(klass, id, value) {
    klass[id] = value;
}

function rb_const_defined(klass, id) {
    return (klass[id]) ? true : false;
}

function rb_const_get(klass, id) {
    return klass[id];
}