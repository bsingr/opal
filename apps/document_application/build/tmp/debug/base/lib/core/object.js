
function rb_obj_alloc(klass){return rb_funcall(klass,'allocate');}
function rb_obj_dummy(){return nil;}
function rb_class_allocate_instance(klass){var o=new RObject();o.klass=klass;FL_SET(o,T_OBJECT);return o;}
function rb_obj_equal(self,_cmd,obj){if(self==obj)return true;return false;}
function rb_obj_not(self){return RTEST(self)?false:true;}
function rb_obj_not_equal(self,_cmd,obj){var r=rb_funcall(self,"==",obj);return RTEST(r)?false:true;}
function rb_false(){return false;}
function rb_true(){return true;}
function rb_equal(self,_cmd,obj){var r;if(self==obj)return true;r=rb_funcall(self,"==",obj);if(RTEST(r))return true;return false;}
function rb_obj_match(){return nil;}
function rb_obj_not_match(self,_cmd,obj){var r=rb_funcall(self,"=~",obj);return RTEST(r)?false:true;}
function rb_class_real(klass){if(!klass)return nil;while(FL_TEST(klass,FL_SINGLETON)||FL_TEST(klass,T_ICLASS)){klass=klass.sup;}
return klass;}
function rb_obj_class(self){return rb_class_real(self.klass);}
function rb_obj_clone(self){return self;}
function rb_obj_dup(self){return self;}
function rb_obj_init_copy(self){return self;}
function rb_any_to_s(self){var c=rb_obj_classname(self);return"<"+c+":0x000000>";}
function rb_obj_inspect(self){return rb_any_to_s(self);}
rb_define_private_method(rb_cBasicObject,"initialize",rb_obj_dummy,0);rb_define_alloc_func(rb_cBasicObject,rb_class_allocate_instance);rb_define_method(rb_cBasicObject,"==",rb_obj_equal,1);rb_define_method(rb_cBasicObject,"equal?",rb_obj_equal,1);rb_define_method(rb_cBasicObject,"!",rb_obj_not,0);rb_define_method(rb_cBasicObject,"!=",rb_obj_not_equal,1);rb_define_private_method(rb_cBasicObject,"singleton_method_added",rb_obj_dummy,1);rb_define_private_method(rb_cBasicObject,"singleton_method_removed",rb_obj_dummy,1);rb_define_private_method(rb_cBasicObject,"singleton_method_undefined",rb_obj_dummy,1);rb_mKernel=rb_define_module("Kernel");rb_include_module(rb_cObject,rb_mKernel);rb_define_private_method(rb_cClass,"inherited",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"included",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"extended",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"method_added",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"method_removed",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"method_undefined",rb_obj_dummy,1);rb_define_method(rb_mKernel,"nil?",rb_false,0);rb_define_method(rb_mKernel,"===",rb_equal,1);rb_define_method(rb_mKernel,"=~",rb_obj_match,1);rb_define_method(rb_mKernel,"!~",rb_obj_not_match,1);rb_define_method(rb_mKernel,"eql?",rb_obj_equal,1);rb_define_method(rb_mKernel,"class",rb_obj_class,0);rb_define_method(rb_mKernel,"clone",rb_obj_clone,0);rb_define_method(rb_mKernel,"dup",rb_obj_dup,0);rb_define_method(rb_mKernel,"initialize_copy",rb_obj_init_copy,1);rb_define_method(rb_mKernel,"to_s",rb_any_to_s,0);rb_define_method(rb_mKernel,"inspect",rb_obj_inspect,0);