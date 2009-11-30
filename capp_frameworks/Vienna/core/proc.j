/**
    Proc#call
    
    Calls proc with given arguments.
*/
function rb_proc_call(self, _cmd) {
    var a = Array.prototype.slice.call(arguments);
    return self.apply(self, a);
}

/**
    Proc#to_proc
    
    Useful when saving blocks etc or passing them around to methods.
*/
function rb_proc_to_proc(self, _cmd) {
    return self;
}


rb_cProc = rb_define_class("Proc", rb_cObject);
// rb_define_singleton_method(rb_cProc, "new", rb_proc_s_new, -1);

// we want javascript functions to be Procs (instances of proc atleast...)
Function.prototype.isa = rb_cProc;

rb_define_method(rb_cProc, "call", rb_proc_call, -1);
rb_define_method(rb_cProc, "[]", rb_proc_call, -1);
rb_define_method(rb_cProc, "===", rb_proc_call, -1);
rb_define_method(rb_cProc, "yield", rb_proc_call, -1);
rb_define_method(rb_cProc, "to_proc", rb_proc_to_proc, 0);
// rb_define_method(rb_cProc, "arity", rb_proc_arity, 0);
// rb_define_method(rb_cProc, "clone", rb_proc_clone, 0);
// rb_define_method(rb_cProc, "dup", rb_proc_dup, 0);
// rb_define_method(rb_cProc, "==", rb_proc_eq, 1);
// rb_define_method(rb_cProc, "eql?", rb_proc_eq, 1);
// rb_define_method(rb_cProc, "hash", rb_proc_hash, 0);
// rb_define_method(rb_cProc, "to_s", rb_proc_to_s, 0);
// rb_define_method(rb_cProc, "lambda?", rb_proc_lambda_p, 0);
// rb_define_method(rb_cProc, "binding", rb_proc_binding, 0);
// rb_define_method(rb_cProc, "curry", rb_proc_curry, -1);
// rb_define_method(rb_cProc, "source_location", rb_proc_location, 0);
