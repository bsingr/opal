(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
rb_define_method(self,s$adb,function(self,_cmd,table_view){
return self.$i_s(i$ga,table_view);
});
rb_define_method(self,s$adc,function(self,_cmd){
return rb_ivar_get(self, i$ga);
});
rb_define_method(self,s$adr,function(self,_cmd){
return rb_ivar_get(self, i$gj);
});
rb_define_method(self,s$ads,function(self,_cmd){
return rb_ivar_get(self, i$gk);
});
rb_define_method(self,s$adt,function(self,_cmd){
return rb_ivar_get(self, i$gl);
});
rb_define_method(self,s$adu,function(self,_cmd,column){
});
rb_define_method(self,s$aci,function(self,_cmd,point){
});
})(RClass.define_under(self,'TableHeaderView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
