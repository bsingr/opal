(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,identifier){
rb_funcall(self,'identifier=',identifier);
self.$i_s(i$fz,rb_funcall(self.$klass.$c_g_full(c$ar),s$ao,''));
self.$i_s(i$ga,rb_funcall(self.$klass.$c_g_full(c$ai),s$ao,''));
return self.$i_s(i$an,100);
});
rb_define_method(self,s$adl,function(self,_cmd,identifier){
return self.$i_s(i$gb,identifier);
});
rb_define_method(self,s$adm,function(self,_cmd){
return rb_ivar_get(self, i$gb);
});
rb_define_method(self,s$adn,function(self,_cmd,table_view){
return self.$i_s(i$gc,table_view);
});
rb_define_method(self,s$ado,function(self,_cmd){
return rb_ivar_get(self, i$gc);
});
rb_define_method(self,s$hl,function(self,_cmd,width){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$ac,function(self,_cmd){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$adp,function(self,_cmd,min_width){
return self.$i_s(i$gd,min_width);
});
rb_define_method(self,s$adq,function(self,_cmd){
return rb_ivar_get(self, i$gd);
});
rb_define_method(self,s$adr,function(self,_cmd,max_width){
return self.$i_s(i$ge,max_width);
});
rb_define_method(self,s$ads,function(self,_cmd){
return rb_ivar_get(self, i$ge);
});
rb_define_method(self,s$adt,function(self,_cmd,cell){
return self.$i_s(i$fz,cell);
});
rb_define_method(self,s$adu,function(self,_cmd){
return rb_ivar_get(self, i$fz);
});
rb_define_method(self,s$adv,function(self,_cmd){
return rb_ivar_get(self, i$ga);
});
rb_define_method(self,s$adw,function(self,_cmd,data_cell){
return self.$i_s(i$ga,data_cell);
});
rb_define_method(self,s$acw,function(self,_cmd){
return rb_ivar_get(self, i$ga);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$adx,function(self,_cmd,sort_descriptor){
return self.$i_s(i$gf,sort_descriptor);
});
rb_define_method(self,s$ady,function(self,_cmd){
return rb_ivar_get(self, i$gf);
});
rb_define_method(self,s$adz,function(self,_cmd,resizing_mask){
return self.$i_s(i$gg,resizing_mask);
});
rb_define_method(self,s$aea,function(self,_cmd){
return rb_ivar_get(self, i$gg);
});
rb_define_method(self,s$aeb,function(self,_cmd,string){
return self.$i_s(i$gh,string);
});
rb_define_method(self,s$aec,function(self,_cmd){
return rb_ivar_get(self, i$gi);
});
rb_define_method(self,s$ko,function(self,_cmd){
return rb_ivar_get(self, i$gj);
});
rb_define_method(self,s$kn,function(self,_cmd,flag){
return self.$i_s(i$gj,flag);
});
})(RClass.define_under(self,'TableColumn',cObject));
})(RModule.define('Vienna'));
