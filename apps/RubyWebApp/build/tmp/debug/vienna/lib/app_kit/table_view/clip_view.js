(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
rb_define_method(self,s$jz,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return rb_funcall(rb_ivar_get(self, i$b),s$l,VN.$h(_$fx,'hidden'));
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
rb_define_method(self,s$vl,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vm,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$wf,function(self,_cmd,a_view){
var default_center = rb_funcall(self.$klass.$c_g_full(c$m),s$cc);
if(RTEST(rb_ivar_get(self, i$es))){
rb_funcall(default_center,s$cl,self,self.$klass.$c_g_full(c$ai),rb_ivar_get(self, i$es));
rb_funcall(default_center,s$cl,self,self.$klass.$c_g_full(c$aj),rb_ivar_get(self, i$es));
rb_funcall(rb_ivar_get(self, i$es),s$ku);
}
self.$i_s(i$es,a_view);
return rb_funcall(self,s$kt,a_view);
});
rb_define_method(self,s$wh,function(self,_cmd){
return rb_ivar_get(self, i$es);
});
rb_define_method(self,s$yg,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
});
rb_define_method(self,s$wl,function(self,_cmd,an_obj){
return self.$i_s(i$ed,an_obj);
});
rb_define_method(self,s$wm,function(self,_cmd){
return rb_ivar_get(self, i$ed);
});
rb_define_method(self,s$wd,function(self,_cmd){
return rb_funcall(self,s$mk,rb_ivar_get(self, i$bc),rb_ivar_get(self, i$es));
});
rb_define_method(self,s$yh,function(self,_cmd,notification){
});
rb_define_method(self,s$yi,function(self,_cmd,notification){
});
rb_define_method(self,s$yj,function(self,_cmd,flag){
return self.$i_s(i$et,flag);
});
rb_define_method(self,s$yk,function(self,_cmd){
return rb_ivar_get(self, i$et);
});
rb_define_method(self,s$yl,function(self,_cmd,the_event){
return false;
});
rb_define_method(self,s$ym,function(self,_cmd,new_origin){
return new_origin;
});
rb_define_method(self,s$yn,function(self,_cmd,new_origin){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bd),s$nb),s$yo,0))){
rb_funcall(rb_funcall(rb_ivar_get(self, i$bd),s$e,0),'frame_origin=',rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_funcall((0),s$mf,rb_funcall(new_origin,s$v)),rb_funcall((0),s$mf,rb_funcall(new_origin,s$w))));
}
});
rb_define_method(self,s$yp,function(self,_cmd,x,y){
return rb_funcall(self,s$yn,rb_funcall(self.$klass.$c_g_full(c$o),s$al,x,y));
});
})(RClass.define_under(self,'ClipView',self.$c_g_full(c$x)));
(function(self) {
rb_define_method(self,s$wg,function(self,_cmd,a_clip_view){
});
self.$def(s$yq,function(self,_cmd,a_clip_view,a_point){
});
})(RClass.define_under(self,'View',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));
