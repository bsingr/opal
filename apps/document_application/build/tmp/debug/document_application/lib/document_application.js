(function(self) {
rb_funcall(self,'include',self.$c_g_full('Vienna'));
(function(self) {
rb_define_method(self,'application_will_finish_launching',function(self,_,notification){
return rb_funcall(self,'puts',"app will finish launching!");
});
})(rb_define_class_under(self,'AppController',cObject));
})(rb_define_module('DocumentApplication'));
