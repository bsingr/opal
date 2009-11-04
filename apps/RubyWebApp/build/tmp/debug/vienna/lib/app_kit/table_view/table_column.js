(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,identifier){
rb_funcall(self,'identifier=',identifier);
self.$i_s(i$fy,rb_funcall(self.$klass.$c_g_full(c$ae),s$al,''));
return self.$i_s(i$an,100);
});
rb_define_method(self,s$acz,function(self,_cmd,identifier){
return self.$i_s(i$fz,identifier);
});
rb_define_method(self,s$ada,function(self,_cmd){
return rb_ivar_get(self, i$fz);
});
rb_define_method(self,s$adb,function(self,_cmd,table_view){
return self.$i_s(i$ga,table_view);
});
rb_define_method(self,s$adc,function(self,_cmd){
return rb_ivar_get(self, i$ga);
});
rb_define_method(self,s$hl,function(self,_cmd,width){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$add,function(self,_cmd,min_width){
return self.$i_s(i$gb,min_width);
});
rb_define_method(self,s$ade,function(self,_cmd){
return rb_ivar_get(self, i$gb);
});
rb_define_method(self,s$adf,function(self,_cmd,max_width){
return self.$i_s(i$gc,max_width);
});
rb_define_method(self,s$adg,function(self,_cmd){
return rb_ivar_get(self, i$gc);
});
rb_define_method(self,s$adh,function(self,_cmd,cell){
return self.$i_s(i$gd,cell);
});
rb_define_method(self,s$adi,function(self,_cmd){
return rb_ivar_get(self, i$gd);
});
rb_define_method(self,s$adj,function(self,_cmd){
return rb_ivar_get(self, i$fy);
});
rb_define_method(self,s$adk,function(self,_cmd,data_cell){
return self.$i_s(i$fy,data_cell);
});
rb_define_method(self,s$ack,function(self,_cmd){
return rb_ivar_get(self, i$fy);
});
rb_define_method(self,s$qi,function(self,_cmd,flag){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qh,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$adl,function(self,_cmd,sort_descriptor){
return self.$i_s(i$ge,sort_descriptor);
});
rb_define_method(self,s$adm,function(self,_cmd){
return rb_ivar_get(self, i$ge);
});
rb_define_method(self,s$adn,function(self,_cmd,resizing_mask){
return self.$i_s(i$gf,resizing_mask);
});
rb_define_method(self,s$ado,function(self,_cmd){
return rb_ivar_get(self, i$gf);
});
rb_define_method(self,s$adp,function(self,_cmd,string){
return self.$i_s(i$gg,string);
});
rb_define_method(self,s$adq,function(self,_cmd){
return rb_ivar_get(self, i$gh);
});
rb_define_method(self,s$ko,function(self,_cmd){
return rb_ivar_get(self, i$gi);
});
rb_define_method(self,s$kn,function(self,_cmd,flag){
return self.$i_s(i$gi,flag);
});
})(RClass.define_under(self,'TableColumn',cObject));
})(RModule.define('Vienna'));
