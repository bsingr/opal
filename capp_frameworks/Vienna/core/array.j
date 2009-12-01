/**
    get obj from array at index using a ruby index (can be nagative..)
    
    @param a: array
    @param i: index
*/
function rb_ary_entry(a, i) {
    var l = a.length;
    if (l == 0) {
        return null;
    }
    else if (i < 0) {
        i += l;
    }
    if (i < 0 || l <= i) {
        return null;
    }
    return a[i];
}

function rb_ary_s_create(self, _cmd) {
    var a = Array.prototype.slice.call(arguments, 2);
    return a; 
}

function rb_ary_s_try_convert(self, _cmd, ary) {
    throw 'Array#' + _cmd + ' not implemented.'
}

function rb_ary_initialize(self, _cmd) {
    var i, a = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < a.length; i++) {
        self.push(a[i]);
    }
    return self;
}

function rb_ary_replace_imp(self, _cmd) {
    throw 'Array#' + _cmd + ' not implemented.'
}

function rb_ary_inspect(self, _cmd) {
    // Fixme.. need to inspect each element..
    var i, s = "["
    for (i = 1; i < self.length; i++) {
        
    }
    s = s + "...]"
    return s;
}

function rb_ary_to_a(self, _cmd) {
    return self;
}

function rb_ary_to_ary_m(self, _cmd) {
    return self;
}

function rb_ary_equal_imp(self, _cmd, obj) {
    return self == obj;
}

function rb_ary_eql(self, _cmd, obj) {
    return self == obj;
}

function rb_ary_aref(self, _cmd) {
    if (arguments.length == 3) {
        // should really check if number or range was given
        return self[arguments[2]];
    }
    else if (arguments.length == 4) {
        return self.slice(arguments[2], arguments[3]);
    }
    else {
        throw "Array#[] wrong number of arguments."
    }
}

function rb_ary_aset(self, _cmd, i, v) {
    // for now, only two arguments are valid...
    // three should be valid: first two will indicate start and end, third will be values
    // for those indecies.
    return self[i] = v;
}

function rb_ary_at(self, _cmd, i) {
    return rb_ary_entry(self, i);
}

function rb_ary_fetch(self, _cmd) {
    // This needs fixing.
    var n = arguments[3];
    var b = rb_block_given_p(arguments);
    var i = arguments[2];
    if (i < 0) {
        i += self.length;
    }
    
    if (i < 0 || self.length <= i) {
        if (b) {
            return rb_yield(arguments, arguments[2]);
        }
        if (arguments.length == 3) {
            throw "index out of range, Array#" + _cmd
        }
    }
    return self[i];
}

function rb_ary_first(self, _cmd) {
    return self[0];
}

function rb_ary_each(self, _cmd) {
    var i;
    for (i = 0; i < self.length; i++) {
        rb_yield(arguments, self[i]);
    }
    return self;
}

function rb_ary_reverse_each(self, _cmd) {
    var i;
    for (i = self.length - 1; i >= 0; i--) {
        rb_yield(arguments, self[i]);
    }
    return self;
}

function rb_ary_length(self, _cmd) {
    return self.length;
}

function rb_ary_collect(self, _cmd) {
    var i, r = [];
    for (i = 0; i < self.length; i++) {
        r.push(rb_yield(arguments, self[i]))
    }
    return r;
}

function rb_ary_collect_bang(self, _cmd) {
    var i;
    for (i = 0; i < self.length; i++) {
        self[i] = rb_yield(arguments, self[i]);
    }
    return self;
}


rb_cArray = objj_getClass("CPArray");
rb_const_set(rb_cObject, "Array", rb_cArray);
// rb_include_module(rb_cArray, rb_mEnumberable);

rb_define_singleton_method(rb_cArray, '[]', rb_ary_s_create, -1);
rb_define_singleton_method(rb_cArray, 'try_convert:', rb_ary_s_try_convert, 1);
rb_define_method(rb_cArray, "initialize", rb_ary_initialize, -1);
rb_define_method(rb_cArray, "initialize_copy", rb_ary_replace_imp, -1);

rb_define_method(rb_cArray, "to_s", rb_ary_inspect, 0);
rb_define_method(rb_cArray, "inspect", rb_ary_inspect, 0);
rb_define_method(rb_cArray, "to_a", rb_ary_to_a, 0);
rb_define_method(rb_cArray, "to_ary", rb_ary_to_ary_m, 0);

rb_define_method(rb_cArray, "==", rb_ary_equal_imp, 1);
rb_define_method(rb_cArray, "eql?", rb_ary_eql, 1);
 
rb_define_method(rb_cArray, "[]", rb_ary_aref, -1);
rb_define_method(rb_cArray, "[]=", rb_ary_aset, -1);
rb_define_method(rb_cArray, "at", rb_ary_at, 1);
rb_define_method(rb_cArray, "fetch", rb_ary_fetch, -1);
rb_define_method(rb_cArray, "first", rb_ary_first, -1);
// rb_define_method(rb_cArray, "last", rb_ary_last, -1);
// rb_define_method(rb_cArray, "concat", rb_ary_concat_imp, 1);
// rb_define_method(rb_cArray, "<<", rb_ary_push_imp, 1);
// rb_define_method(rb_cArray, "push", rb_ary_push_m, -1);
// rb_define_method(rb_cArray, "pop", rb_ary_pop_m, -1);
// rb_define_method(rb_cArray, "shift", rb_ary_shift_m, -1);
// rb_define_method(rb_cArray, "unshift", rb_ary_unshift_m, -1);
// rb_define_method(rb_cArray, "insert", rb_ary_insert_m, -1);

rb_define_method(rb_cArray, "each", rb_ary_each, 0);
// rb_define_method(rb_cArray, "each_index", rb_ary_each_index, 0);
rb_define_method(rb_cArray, "reverse_each", rb_ary_reverse_each, 0);
rb_define_method(rb_cArray, "length", rb_ary_length, 0);
rb_define_method(rb_cArray, "size", rb_ary_length, 0);
// rb_define_method(rb_cArray, "empty?", rb_ary_empty_p, 0);
// rb_define_method(rb_cArray, "find_index", rb_ary_index, -1);
// rb_define_method(rb_cArray, "index", rb_ary_index, -1);
// rb_define_method(rb_cArray, "rindex", rb_ary_rindex, -1);
// rb_define_method(rb_cArray, "join", rb_ary_join_m, -1);
// rb_define_method(rb_cArray, "reverse", rb_ary_reverse_m, 0);
// rb_define_method(rb_cArray, "reverse!", rb_ary_reverse_bang, 0);
// rb_define_method(rb_cArray, "sort", rb_ary_sort_imp, 0);
// rb_define_method(rb_cArray, "sort!", rb_ary_sort_bang_imp, 0);
rb_define_method(rb_cArray, "collect", rb_ary_collect, 0);
rb_define_method(rb_cArray, "collect!", rb_ary_collect_bang, 0);
rb_define_method(rb_cArray, "map", rb_ary_collect, 0);
rb_define_method(rb_cArray, "map!", rb_ary_collect_bang, 0);
// rb_define_method(rb_cArray, "select", rb_ary_select, 0);
// rb_define_method(rb_cArray, "values_at", rb_ary_values_at, -1);
// rb_define_method(rb_cArray, "delete", rb_ary_delete_imp, 1);
// rb_define_method(rb_cArray, "delete_at", rb_ary_delete_at_m, 1);
// rb_define_method(rb_cArray, "delete_if", rb_ary_delete_if, 0);
// rb_define_method(rb_cArray, "reject", rb_ary_reject, 0);
// rb_define_method(rb_cArray, "reject!", rb_ary_reject_bang, 0);
// rb_define_method(rb_cArray, "zip", rb_ary_zip, -1);
// rb_define_method(rb_cArray, "transpose", rb_ary_transpose, 0);
// rb_define_method(rb_cArray, "replace", rb_ary_replace_imp, 1);
// rb_define_method(rb_cArray, "clear", rb_ary_clear_imp, 0);
// rb_define_method(rb_cArray, "fill", rb_ary_fill, -1);
// rb_define_method(rb_cArray, "include?", rb_ary_includes_imp, 1);
// rb_define_method(rb_cArray, "<=>", rb_ary_cmp, 1);

// rb_define_method(rb_cArray, "slice", rb_ary_aref, -1);
// rb_define_method(rb_cArray, "slice!", rb_ary_slice_bang, -1);

// rb_define_method(rb_cArray, "assoc", rb_ary_assoc, 1);
// rb_define_method(rb_cArray, "rassoc", rb_ary_rassoc, 1);

// rb_define_method(rb_cArray, "+", rb_ary_plus_imp, 1);
// rb_define_method(rb_cArray, "*", rb_ary_times, 1);

// rb_define_method(rb_cArray, "-", rb_ary_diff, 1);
// rb_define_method(rb_cArray, "&", rb_ary_and, 1);
// rb_define_method(rb_cArray, "|", rb_ary_or, 1);

// rb_define_method(rb_cArray, "uniq", rb_ary_uniq, 0);
// rb_define_method(rb_cArray, "uniq!", rb_ary_uniq_bang, 0);
// rb_define_method(rb_cArray, "compact", rb_ary_compact, 0);
// rb_define_method(rb_cArray, "compact!", rb_ary_compact_bang, 0);
// rb_define_method(rb_cArray, "flatten", rb_ary_flatten, -1);
// rb_define_method(rb_cArray, "flatten!", rb_ary_flatten_bang, -1);
// rb_define_method(rb_cArray, "_count", rb_ary_count, -1);

// rb_define_method(rb_cArray, "shuffle!", rb_ary_shuffle_bang, 0);
// rb_define_method(rb_cArray, "shuffle", rb_ary_shuffle, 0);
// rb_define_method(rb_cArray, "sample", rb_ary_sample, -1);
// rb_define_method(rb_cArray, "cycle", rb_ary_cycle, -1);
// rb_define_method(rb_cArray, "permutation", rb_ary_permutation, -1);
// rb_define_method(rb_cArray, "combination", rb_ary_combination, 1);
// rb_define_method(rb_cArray, "product", rb_ary_product, -1);

// rb_define_method(rb_cArray, "take", rb_ary_take, 1);
// rb_define_method(rb_cArray, "take_while", rb_ary_take_while, 0);
// rb_define_method(rb_cArray, "drop", rb_ary_drop, 1);
// rb_define_method(rb_cArray, "drop_while", rb_ary_drop_while, 0);
