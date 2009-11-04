(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$pz,function(self,_cmd){
return true;
});
rb_define_method(self,s$l,function(self,_cmd){
self.$i_s(i$dl,0);
self.$i_s(i$dm,100);
self.$i_s(i$ck,0);
return rb_supcall(arguments.callee, self,_cmd,[]);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-slider';
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
self.$i_s(i$dv,cell_frame);
self.$i_s(i$by,control_view);
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$e,"<div class='track-left'></div>");
rb_funcall(ctx,s$e,"<div class='track-middle'></div>");
rb_funcall(ctx,s$e,"<div class='track-right'></div>");
rb_funcall(ctx,s$e,"<div class='knob'></div>");
rb_funcall(ctx,'first_time=',false);
}
rb_funcall(ctx,'class_name=',rb_funcall(self, s$kc));
return rb_funcall(ctx,s$jv,_$hu,function(knob){
var knob_position = rb_funcall(self,s$vo,rb_ivar_get(self, i$ck));
return rb_funcall(knob,s$o,VN.$h(_$fs,[(knob_position),"px"].join('')));
});
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
rb_define_method(self,s$vf,function(self,_cmd){
return false;
});
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
rb_define_method(self,s$vo,function(self,_cmd,a_value){
var x = rb_funcall((rb_funcall(rb_funcall(rb_ivar_get(self, i$dv),s$ac),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$ag))))),s$vp,(rb_funcall((rb_funcall(rb_ivar_get(self, i$ck),s$vq,(rb_funcall(rb_ivar_get(self, i$dm),s$mf,rb_ivar_get(self, i$dl))))),s$hy,rb_ivar_get(self, i$dl))));
return x;
});
rb_define_method(self,s$vr,function(self,_cmd,a_point){
var value = rb_funcall((rb_funcall(rb_funcall(a_point,s$y),s$mf,(rb_funcall(rb_funcall(rb_ivar_get(self, i$dv),s$y),s$hy,self.$klass.$c_g_full(c$ag))))),s$vq,(rb_funcall(rb_funcall(rb_ivar_get(self, i$dv),s$ac),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$ag))))));
value = rb_funcall(value,s$vp,(rb_funcall((rb_funcall(rb_ivar_get(self, i$dm),s$mf,rb_ivar_get(self, i$dl))),s$hy,rb_ivar_get(self, i$dl))));
return rb_funcall(self.$klass.$c_g_full(c$ah),s$vs,rb_funcall(self.$klass.$c_g_full(c$ah),s$vt,value,rb_ivar_get(self, i$dl)),rb_ivar_get(self, i$dm));
});
self.$def(s$rx,function(self,_cmd,start_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,s$vr,start_point));
rb_funcall(self,s$rr,true,rb_ivar_get(self, i$dv),control_view);
return true;
});
self.$def(s$ry,function(self,_cmd,last_point,current_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,s$vr,current_point));
rb_funcall(self,s$nj,rb_ivar_get(self, i$dv),control_view);
return true;
});
self.$def(s$rz,function(self,_cmd,last_point,stop_point,control_view,flag){
return rb_funcall(self,s$rr,false,rb_ivar_get(self, i$dv),control_view);
});
})(RClass.define_under(self,'SliderCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));
