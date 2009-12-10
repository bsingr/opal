// hash of symbol 'names' to their actual sym objects.
// e.g. rb_sym_stack['age'] => #<Symbol:0x92828833> etc
rb_sym_stack = { };

function ID2SYM(id) {
    // check rb_sym_stack for symbol name. If it doesnt exist, create it
    var sym = rb_sym_stack[id];
    if (!sym) {
        // create it..
        sym = rb_funcall(rb_cSymbol, "alloc", id);
        sym.ptr = id;
        rb_sym_stack[id] = sym;
    }
    
    return sym;
}

function SYM2ID(sym) {
    // To get the 'id'/string rep of symbol, just check its .ptr property
    return sym.ptr;
}

function rb_sym_all_symbols() {
    return [];
}

function rb_sym_to_s(self, _cmd) {
    return SYM2ID(self);
}

function rb_sym_to_proc(self, _cmd) {
    return new Function('a', 'return rb_funcall(a,"' + SYM2ID(self) + '");');
    // return function() { };
}

rb_cSymbol = rb_define_class("Symbol", rb_cObject);
// rb_include_module(rb_cSymbol, rb_mComparable);
rb_define_singleton_method(rb_cSymbol, "all_symbols", rb_sym_all_symbols, 0);

// rb_define_method(rb_cSymbol, "==", rb_sym_equal, 1);
// rb_define_method(rb_cSymbol, "inspect", rb_sym_inspect, 0);
rb_define_method(rb_cSymbol, "to_s", rb_sym_to_s, 0);
// rb_define_method(rb_cSymbol, "id2name", rb_sym_to_s, 0);
// rb_define_method(rb_cSymbol, "intern", rb_sym_to_sym, 0);
// rb_define_method(rb_cSymbol, "to_sym", rb_sym_to_sym, 0);
rb_define_method(rb_cSymbol, "to_proc", rb_sym_to_proc, 0);
// rb_define_method(rb_cSymbol, "succ", rb_sym_succ, 0);
// rb_define_method(rb_cSymbol, "next", rb_sym_succ, 0);
// 
// rb_define_method(rb_cSymbol, "<=>", rb_sym_cmp, 1);
// rb_define_method(rb_cSymbol, "casecmp", rb_sym_casecmp, 1);
// rb_define_method(rb_cSymbol, "=~", rb_sym_match, 1);
// 
// rb_define_method(rb_cSymbol, "[]", rb_sym_aref, -1);
// rb_define_method(rb_cSymbol, "slice", rb_sym_aref, -1);
// rb_define_method(rb_cSymbol, "length", rb_sym_length, 0);
// rb_define_method(rb_cSymbol, "size", rb_sym_length, 0);
// rb_define_method(rb_cSymbol, "empty?", rb_sym_empty, 0);
// rb_define_method(rb_cSymbol, "match", rb_sym_match, 1);
// 
// rb_define_method(rb_cSymbol, "upcase", rb_sym_upcase, 0);
// rb_define_method(rb_cSymbol, "downcase", rb_sym_downcase, 0);
// rb_define_method(rb_cSymbol, "capitalize", rb_sym_capitalize, 0);
// rb_define_method(rb_cSymbol, "swapcase", rb_sym_swapcase, 0);
// 
// rb_define_method(rb_cSymbol, "encoding", rb_sym_encoding, 0);