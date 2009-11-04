(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
return rb_funcall(self,'type=',_$hc);
});
})(RClass.define_under(self,'CheckBox',self.$c_g_full(c$ae)));
})(RModule.define('Vienna'));
