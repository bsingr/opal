(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
rb_define_method(self,s$jz,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return rb_funcall(rb_ivar_get(self, i$b),s$o,VN.$h(_$fz,'hidden'));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-clip-view';
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vx,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$wp,function(self,_cmd,a_view){
var default_center = rb_funcall(self.$klass.$c_g_full(c$n),s$cc);
if(RTEST(rb_ivar_get(self, i$et))){
rb_funcall(default_center,s$cl,self,self.$klass.$c_g_full(c$an),rb_ivar_get(self, i$et));
rb_funcall(default_center,s$cl,self,self.$klass.$c_g_full(c$ao),rb_ivar_get(self, i$et));
rb_funcall(rb_ivar_get(self, i$et),s$ku);
}
self.$i_s(i$et,a_view);
return rb_funcall(self,s$kt,a_view);
});
rb_define_method(self,s$wr,function(self,_cmd){
return rb_ivar_get(self, i$et);
});
rb_define_method(self,s$yu,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
});
rb_define_method(self,s$wv,function(self,_cmd,an_obj){
return self.$i_s(i$ed,an_obj);
});
rb_define_method(self,s$ww,function(self,_cmd){
return rb_ivar_get(self, i$ed);
});
rb_define_method(self,s$wn,function(self,_cmd){
return rb_funcall(self,s$mk,rb_ivar_get(self, i$bc),rb_ivar_get(self, i$et));
});
rb_define_method(self,s$yv,function(self,_cmd,notification){
});
rb_define_method(self,s$yw,function(self,_cmd,notification){
});
rb_define_method(self,s$yx,function(self,_cmd,flag){
return self.$i_s(i$eu,flag);
});
rb_define_method(self,s$yy,function(self,_cmd){
return rb_ivar_get(self, i$eu);
});
rb_define_method(self,s$yz,function(self,_cmd,the_event){
return false;
});
rb_define_method(self,s$za,function(self,_cmd,new_origin){
return new_origin;
});
rb_define_method(self,s$yb,function(self,_cmd,new_origin){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bd),s$nb),s$zb,0))){
rb_funcall(rb_funcall(rb_ivar_get(self, i$bd),s$h,0),'frame_origin=',rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall((0),s$mf,rb_funcall(new_origin,s$y)),rb_funcall((0),s$mf,rb_funcall(new_origin,s$z))));
}
});
rb_define_method(self,s$zc,function(self,_cmd,x,y){
return rb_funcall(self,s$yb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,x,y));
});
})(RClass.define_under(self,'ClipView',self.$c_g_full(c$x)));
(function(self) {
rb_define_method(self,s$wq,function(self,_cmd,a_clip_view){
});
self.$def(s$zd,function(self,_cmd,a_clip_view,a_point){
});
})(RClass.define_under(self,'View',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));
