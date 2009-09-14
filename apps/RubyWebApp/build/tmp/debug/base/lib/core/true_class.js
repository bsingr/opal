VN.true_to_s = function(obj) {
  return VN.str_new_cstr("true");
};

VN.true_and = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qtrue : VN.Qfalse ;
};

VN.true_or = function(obj, obj2) {
  return VN.Qtrue ;
};

VN.true_xor = function(obj, obj2) {
  return VN.RTEST(obj2) ? VN.Qfalse : VN.Qtrue ;
};


VN.define_method(VN.cTrueClass, 'to_s', VN.true_to_s, 0);
VN.define_method(VN.cTrueClass, '&', VN.true_and, 0);
VN.define_method(VN.cTrueClass, '|', VN.true_or, 0);
VN.define_method(VN.cTrueClass, '^', VN.true_xor, 0);
VN.undef_alloc_func(VN.cTrueClass);
VN.undef_method(VN.cTrueClass.klass, 'new');
VN.define_global_const('TRUE', VN.Qtrue);