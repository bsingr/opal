(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$af);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-slider';
});
rb_define_method(self,s$uw,function(self,_cmd){
return rb_ivar_get(self, i$dl);
});
rb_define_method(self,s$ux,function(self,_cmd,a_double){
return self.$i_s(i$dl,a_double);
});
rb_define_method(self,s$uy,function(self,_cmd){
return rb_ivar_get(self, i$dm);
});
rb_define_method(self,s$uz,function(self,_cmd,a_double){
return self.$i_s(i$dm,a_double);
});
rb_define_method(self,s$va,function(self,_cmd,inc_value){
return self.$i_s(i$dn,inc_value);
});
rb_define_method(self,s$vb,function(self,_cmd){
return rb_ivar_get(self, i$dn);
});
rb_funcall(self,s$by,_$hp,_$hq,_$dx,_$hr,_$cq);
rb_define_method(self,s$vc,function(self,_cmd,color){
return self.$i_s(i$do,color);
});
rb_define_method(self,s$vd,function(self,_cmd,font){
return self.$i_s(i$dp,font);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$ve,function(self,_cmd,a_float){
return self.$i_s(i$dq,a_float);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$vf,function(self,_cmd){
return rb_ivar_get(self, i$dr);
});
rb_define_method(self,s$kb,function(self,_cmd,event){
return true;
});
rb_funcall(self,s$by,_$hs,_$ht);
rb_define_method(self,s$vg,function(self,_cmd,count){
return self.$i_s(i$ds,count);
});
rb_define_method(self,s$vh,function(self,_cmd,pos){
return self.$i_s(i$dt,pos);
});
rb_define_method(self,s$vi,function(self,_cmd,flag){
return self.$i_s(i$du,flag);
});
rb_define_method(self,s$vj,function(self,_cmd){
return rb_ivar_get(self, i$du);
});
rb_define_method(self,s$vk,function(self,_cmd,index){
});
rb_define_method(self,s$vl,function(self,_cmd,index){
});
rb_define_method(self,s$vm,function(self,_cmd,point){
});
rb_define_method(self,s$vn,function(self,_cmd,value){
});
})(RClass.define_under(self,'Slider',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
