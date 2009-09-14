VN.false_to_s = function(obj) {
  return VN.str_new_cstr("false");
};

VN.false_and = function(obj, obj2) {
  return VN.Qfalse ;
};

VN.false_or = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qtrue : VN.Qfalse ;
};

VN.false_xor = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qtrue : VN.Qfalse ;
};

VN.define_method(VN.cFalseClass, 'to_s', VN.false_to_s, 0);
VN.define_method(VN.cFalseClass, '&', VN.false_and, 0);
VN.define_method(VN.cFalseClass, '|', VN.false_or, 0);
VN.define_method(VN.cFalseClass, '^', VN.false_xor, 0);
VN.undef_alloc_func(VN.cFalseClass);
VN.undef_method(VN.cFalseClass.klass, 'new');
VN.define_global_const('FALSE', VN.Qfalse);