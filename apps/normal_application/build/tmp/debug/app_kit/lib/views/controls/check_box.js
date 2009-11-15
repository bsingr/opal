(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
return rb_funcall(self,'type=',ID2SYM('switch'));
});
})(rb_define_class_under(self,'CheckBox',self.$c_g_full('Button')));
})(rb_define_module('Vienna'));
