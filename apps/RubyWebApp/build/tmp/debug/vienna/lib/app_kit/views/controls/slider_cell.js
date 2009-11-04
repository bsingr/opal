(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$px,function(self,_cmd){
return true;
});
rb_define_method(self,s$i,function(self,_cmd){
return rb_supcall(arguments.callee, self,_cmd,[]);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-slider';
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$q),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$b,"<div class='track-left'></div>");
rb_funcall(ctx,s$b,"<div class='track-middle'></div>");
rb_funcall(ctx,s$b,"<div class='track-right'></div>");
rb_funcall(ctx,s$b,"<div class='knob'></div>");
rb_funcall(ctx,'first_time=',false);
}
rb_funcall(ctx,'class_name=',rb_funcall(self, s$kc));
return rb_funcall(ctx,s$jv,_$hr,function(knob){
var min = 0;
var max = 100;
var value = 0;
var knob_position = rb_funcall((rb_funcall(value,s$vh,(rb_funcall(max,s$mf,min)))),s$vi,((rb_funcall(rb_funcall(cell_frame,s$z),s$mf,(rb_funcall((2),s$vi,self.$klass.$c_g_full(c$ad)))))));
return rb_funcall(knob,s$l,VN.$h(_$fq,[(knob_position),"px"].join('')));
});
});
rb_define_method(self,s$up,function(self,_cmd){
return rb_ivar_get(self, i$dm);
});
rb_define_method(self,s$uq,function(self,_cmd,a_double){
return self.$i_s(i$dm,a_double);
});
rb_define_method(self,s$ur,function(self,_cmd){
return rb_ivar_get(self, i$dn);
});
rb_define_method(self,s$us,function(self,_cmd,a_double){
return self.$i_s(i$dn,a_double);
});
rb_define_method(self,s$ut,function(self,_cmd,inc_value){
return self.$i_s(i$do,inc_value);
});
rb_define_method(self,s$uu,function(self,_cmd){
return rb_ivar_get(self, i$do);
});
rb_define_method(self,s$uy,function(self,_cmd){
return false;
});
rb_define_method(self,s$uv,function(self,_cmd,color){
return self.$i_s(i$dp,color);
});
rb_define_method(self,s$uw,function(self,_cmd,font){
return self.$i_s(i$dq,font);
});
rb_define_method(self,s$qg,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$ux,function(self,_cmd,a_float){
return self.$i_s(i$dr,a_float);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$uz,function(self,_cmd,count){
return self.$i_s(i$dt,count);
});
rb_define_method(self,s$va,function(self,_cmd,pos){
return self.$i_s(i$du,pos);
});
rb_define_method(self,s$vb,function(self,_cmd,flag){
return self.$i_s(i$dv,flag);
});
rb_define_method(self,s$vc,function(self,_cmd){
return rb_ivar_get(self, i$dv);
});
rb_define_method(self,s$vd,function(self,_cmd,index){
});
rb_define_method(self,s$ve,function(self,_cmd,index){
});
rb_define_method(self,s$vf,function(self,_cmd,point){
});
rb_define_method(self,s$vg,function(self,_cmd,value){
});
self.$def(s$ru,function(self,_cmd,start_point,control_view){
rb_funcall(self,s$ro,true,nil,control_view);
return true;
});
self.$def(s$rv,function(self,_cmd,last_point,current_point,control_view){
return true;
});
self.$def(s$rw,function(self,_cmd,last_point,stop_point,control_view,flag){
return rb_funcall(self,s$ro,false,nil,control_view);
});
})(RClass.define_under(self,'SliderCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));
