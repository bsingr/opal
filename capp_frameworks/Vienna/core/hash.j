function rb_hash_new() {
    var d = new objj_dictionary();
    var k, v;
    for (var i = 0; i < arguments.length; i++) {
        k = arguments[i];
        v = arguments[i+1];
        i++;
        dictionary_setValue(d, k, v);
    }
    return d;
}

function rb_hash_initialize(self, _cmd) {
    // init?
    if (rb_block_given_p(arguments)) {
        if (arguments.length > 3) {
            throw "Hash#initialize, wrong number of args."
        }
        rb_ivar_set(self, "rb_block", arguments[2]);
    }
    else {
        if (arguments.length > 2) {
            rb_ivar_set(self, "rb_if_none", arguments[2]);
        }
    }
    
    return self;
}

function rb_hash_to_hash(self, _cmd) {
    return self;
}

function rb_hash_to_a(self, _cmd) {
    // broken??
    var i, r = [];
    for (i = 0; i < self.count; i++)
        r.push([self.keys[i], self.buckets[self.keys[i]]]);
    return r;
}

function rb_hash_inspect(self, _cmd) {
    // Use Cappuccino's descripstion method
    return rb_funcall(self, "description");
}

function rb_hash_aref(self, _cmd, key) {
    return dictionary_getValue(self, key);
}

function rb_hash_aset(self, _cmd, key, value) {
    dictionary_setValue(self, key, value);
}

function rb_hash_size(self, _cmd) {
    return self.count;
}

function rb_hash_empty_p(self, _cmd) {
    return self.count === 0;
}

function rb_hash_each_key(self, _cmd) {
    var i;
    for (i = 0; i < self.count; i++) {
        rb_yield(arguments, self._keys[i]);
    }
    return self;
}

function rb_hash_each_value(self, _cmd) {
    var i;
    for (i = 0; i < self.count; i++) {
        rb_yield(arguments, dictionary_getValue(self, self._keys[i]));
    }
    return self;
}

function rb_hash_each_pair(self, _cmd) {
    var i;
    for (i = 0; i < self.count; i++) {
        rb_yield(arguments, self._keys[i], dictionary_getValue(self, self._keys[i]));
    }
    return self;
}

function rb_hash_keys(self, _cmd) {
    return self._keys;
}

function rb_hash_values(self, _cmd) {
    return rb_funcall(self, "allValues");
}

rb_cHash = objj_getClass("CPDictionary");
rb_const_set(rb_cObject, "Hash", rb_cHash);
// rb_include_module(rb_cHash, rb_mEnumerable);

// rb_define_singleton_method(rb_cHash, "[]", rb_hash_s_create, -1);
// rb_define_singleton_method(rb_cHash, "try_convert", rb_hash_s_try_convert, 1);
rb_define_method(rb_cHash, "initialize", rb_hash_initialize, -1);

rb_define_method(rb_cHash, "to_hash", rb_hash_to_hash, 0);
rb_define_method(rb_cHash, "to_a", rb_hash_to_a, 0);
rb_define_method(rb_cHash, "to_s", rb_hash_inspect, 0);
rb_define_method(rb_cHash, "inspect", rb_hash_inspect, 0);

// rb_define_method(rb_cHash, "==", rb_hash_equal, 1);
rb_define_method(rb_cHash, "[]", rb_hash_aref, 1);
// rb_define_method(rb_cHash, "eql?", rb_hash_eql, 1);
// rb_define_method(rb_cHash, "fetch", rb_hash_fetch, -1);
rb_define_method(rb_cHash, "[]=", rb_hash_aset, 2);
rb_define_method(rb_cHash, "store", rb_hash_aset, 2);
// rb_define_method(rb_cHash, "default", rb_hash_default, -1);
// rb_define_method(rb_cHash, "default=", rb_hash_set_default, 1);
// rb_define_method(rb_cHash, "default_proc", rb_hash_default_proc, 0);
// rb_define_method(rb_cHash, "key", rb_hash_key, 1);
// rb_define_method(rb_cHash, "index", rb_hash_index, 1);
rb_define_method(rb_cHash, "size", rb_hash_size, 0);
rb_define_method(rb_cHash, "length", rb_hash_size, 0);
rb_define_method(rb_cHash, "empty?", rb_hash_empty_p, 0);

rb_define_method(rb_cHash, "each_value", rb_hash_each_value, 0);
rb_define_method(rb_cHash, "each_key", rb_hash_each_key, 0);
rb_define_method(rb_cHash, "each_pair", rb_hash_each_pair, 0);
rb_define_method(rb_cHash, "each", rb_hash_each_pair, 0);

rb_define_method(rb_cHash, "keys", rb_hash_keys, 0);
rb_define_method(rb_cHash, "values", rb_hash_values, 0);
// rb_define_method(rb_cHash, "values_at", rb_hash_values_at, -1);

// rb_define_method(rb_cHash, "shift", rb_hash_shift, 0);
// rb_define_method(rb_cHash, "delete", rb_hash_delete, 1);
// rb_define_method(rb_cHash, "delete_if", rb_hash_delete_if, 0);
// rb_define_method(rb_cHash, "select", rb_hash_select, 0);
// rb_define_method(rb_cHash, "reject", rb_hash_reject, 0);
// rb_define_method(rb_cHash, "reject!", rb_hash_reject_bang, 0);
// rb_define_method(rb_cHash, "clear", rb_hash_clear, 0);
// rb_define_method(rb_cHash, "invert", rb_hash_invert, 0);
 
// rb_define_method(rb_cHash, "update", rb_hash_update, 1);
// rb_define_method(rb_cHash, "replace", rb_hash_replace, 1);
// rb_define_method(rb_cHash, "merge!", rb_hash_update, 1);
// rb_define_method(rb_cHash, "merge", rb_hash_merge, 1);
// rb_define_method(rb_cHash, "assoc", rb_hash_assoc, 1);
// rb_define_method(rb_cHash, "rassoc", rb_hash_rassoc, 1);
// rb_define_method(rb_cHash, "flatten", rb_hash_flatten, -1);

// rb_define_method(rb_cHash, "include?", rb_hash_has_key_imp, 1);
// rb_define_method(rb_cHash, "member?", rb_hash_has_key_imp, 1);
// rb_define_method(rb_cHash, "has_key?", rb_hash_has_key_imp, 1);
// rb_define_method(rb_cHash, "has_value?", rb_hash_has_value, 1);
// rb_define_method(rb_cHash, "key?", rb_hash_has_key_imp, 1);
// rb_define_method(rb_cHash, "value?", rb_hash_has_value, 1);

// rb_define_method(rb_cHash, "compare_by_identity", rb_hash_compare_by_id, 0);
// rb_define_method(rb_cHash, "compare_by_identity?", rb_hash_compare_by_id_p, 0);
