(function(self) {
(function(self) {
self.$def_s(s$wl,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
self.$def_s(s$wm,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$eb,rb_funcall(self.$klass.$c_g_full(c$ak),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,100,100)));
self.$i_s(i$ec,_$gn);
return rb_funcall(self,s$kt,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-scroll-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
return rb_funcall(context,s$o,VN.$h(_$hy,'rgb(190, 190, 190)'));
});
rb_define_method(self,s$wn,function(self,_cmd){
});
rb_define_method(self,s$wo,function(self,_cmd){
});
rb_define_method(self,s$wp,function(self,_cmd,a_view){
rb_funcall(rb_ivar_get(self, i$eb),'document_view=',a_view);
return rb_funcall(self,s$wq,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$wr,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$eb),s$wr);
});
rb_define_method(self,s$ws,function(self,_cmd,content_view){
rb_funcall(rb_ivar_get(self, i$eb),s$ku);
self.$i_s(i$eb,content_view);
rb_funcall(self,s$kt,rb_ivar_get(self, i$eb));
return rb_funcall(self, s$wt);
});
rb_define_method(self,s$wu,function(self,_cmd){
return rb_ivar_get(self, i$eb);
});
rb_define_method(self,s$wv,function(self,_cmd,an_obj){
return self.$i_s(i$ed,an_obj);
});
rb_define_method(self,s$ww,function(self,_cmd){
return rb_ivar_get(self, i$ed);
});
rb_define_method(self,s$wx,function(self,_cmd,a_type){
return self.$i_s(i$ec,a_type);
});
rb_define_method(self,s$wy,function(self,_cmd){
return rb_ivar_get(self, i$ec);
});
rb_define_method(self,s$iy,function(self,_cmd,a_color){
return self.$i_s(i$aw,a_color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$wz,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$xa,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self, i$ee))){
self.$i_s(i$ee,true);
if(!RTEST(rb_ivar_get(self, i$ef))){
self.$i_s(i$ef,rb_funcall(self.$klass.$c_g_full(c$al),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,150,40,40,15)));
rb_funcall(rb_ivar_get(self, i$ef),'target=',self);
rb_funcall(rb_ivar_get(self, i$ef),'action=',_$hz);
}
rb_funcall(self,s$kt,rb_ivar_get(self, i$ef));
}
}
else{
if(RTEST(rb_ivar_get(self, i$ee))){
self.$i_s(i$ee,false);
rb_funcall(rb_ivar_get(self, i$ef),s$ku);
}
}
return rb_funcall(self, s$wt);
});
rb_define_method(self,s$xb,function(self,_cmd){
return rb_ivar_get(self, i$ee);
});
rb_define_method(self,s$xc,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self, i$eg))){
self.$i_s(i$eg,true);
if(!RTEST(rb_ivar_get(self, i$eh))){
self.$i_s(i$eh,rb_funcall(self.$klass.$c_g_full(c$al),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,150,20,40,15)));
rb_funcall(rb_ivar_get(self, i$eh),'target=',self);
rb_funcall(rb_ivar_get(self, i$eh),'action=',_$ia);
}
rb_funcall(self,s$kt,rb_ivar_get(self, i$eh));
}
}
else{
if(RTEST(rb_ivar_get(self, i$eg))){
self.$i_s(i$eg,false);
rb_funcall(rb_ivar_get(self, i$eh),s$ku);
}
}
return rb_funcall(self, s$wt);
});
rb_define_method(self,s$xd,function(self,_cmd){
return rb_ivar_get(self, i$eg);
});
rb_define_method(self,s$xe,function(self,_cmd,a_scroller){
return self.$i_s(i$ef,a_scroller);
});
rb_define_method(self,s$xf,function(self,_cmd){
return rb_ivar_get(self, i$ef);
});
rb_define_method(self,s$xg,function(self,_cmd,a_scroller){
return self.$i_s(i$eh,a_scroller);
});
rb_define_method(self,s$xh,function(self,_cmd){
return rb_ivar_get(self, i$eh);
});
rb_define_method(self,s$xi,function(self,_cmd){
return rb_ivar_get(self, i$ei);
});
rb_define_method(self,s$xj,function(self,_cmd,flag){
return self.$i_s(i$ei,flag);
});
rb_define_method(self,s$xk,function(self,_cmd,value){
return self.$i_s(i$ej,value);
});
rb_define_method(self,s$xl,function(self,_cmd){
return rb_ivar_get(self, i$ej);
});
rb_define_method(self,s$xm,function(self,_cmd,value){
return self.$i_s(i$ek,value);
});
rb_define_method(self,s$xn,function(self,_cmd){
return rb_ivar_get(self, i$ek);
});
rb_define_method(self,s$xo,function(self,_cmd,value){
return self.$i_s(i$el,value);
});
rb_define_method(self,s$xp,function(self,_cmd){
return rb_ivar_get(self, i$el);
});
rb_define_method(self,s$xq,function(self,_cmd,value){
return self.$i_s(i$em,value);
});
rb_define_method(self,s$xr,function(self,_cmd){
return rb_ivar_get(self, i$em);
});
rb_define_method(self,s$xs,function(self,_cmd,value){
return self.$i_s(i$en,value);
});
rb_define_method(self,s$xt,function(self,_cmd){
return rb_ivar_get(self, i$en);
});
rb_define_method(self,s$xu,function(self,_cmd,value){
return self.$i_s(i$eo,value);
});
rb_define_method(self,s$xv,function(self,_cmd){
return rb_ivar_get(self, i$eo);
});
rb_define_method(self,s$xw,function(self,_cmd,flag){
return self.$i_s(i$ep,flag);
});
rb_define_method(self,s$xx,function(self,_cmd){
return rb_ivar_get(self, i$ep);
});
rb_define_method(self,s$wt,function(self,_cmd){
var header_frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
var header_view = nil;
if(RTEST(rb_funcall(rb_funcall(self, s$wr),s$au,_$ib))){
header_view = rb_funcall(rb_funcall(self, s$wr),s$xy);
header_frame = rb_funcall(header_view,s$lz);
}
var bounds = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,1,1,rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ac),s$mf,2),rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ad),s$mf,2));
if(RTEST(rb_ivar_get(self, i$ee))){
var frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall((rb_funcall(rb_funcall(bounds,s$y),s$hy,rb_funcall(bounds,s$ac))),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
rb_funcall(frame,'y=',rb_funcall(bounds,s$z));
rb_funcall(frame,'width=',rb_funcall(self.$klass.$c_g_full(c$al),s$xz));
rb_funcall(frame,'height=',rb_funcall(bounds,s$ad));
if(RTEST(rb_ivar_get(self, i$eg))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,s$z),s$hy,rb_funcall(header_frame,s$ad)));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(header_frame,s$ad)));
}
rb_funcall(rb_ivar_get(self, i$ef),'frame=',frame);
}
if(RTEST(rb_ivar_get(self, i$eg))){
frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'y=',rb_funcall((rb_funcall(rb_funcall(bounds,s$z),s$hy,rb_funcall(bounds,s$ad))),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
rb_funcall(frame,'x=',rb_funcall(bounds,s$y));
rb_funcall(frame,'width=',rb_funcall(bounds,s$ac));
rb_funcall(frame,'height=',rb_funcall(self.$klass.$c_g_full(c$al),s$xz));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$ac),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
rb_funcall(rb_ivar_get(self, i$eh),'frame=',frame);
}
if(RTEST(rb_ivar_get(self, i$eb))){
frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,s$y));
rb_funcall(frame,'y=',rb_funcall(bounds,s$z));
rb_funcall(frame,'width=',rb_funcall(bounds,s$ac));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$ac),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
rb_funcall(frame,'height=',rb_funcall(bounds,s$ad));
if(RTEST(rb_ivar_get(self, i$eg))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,s$z),s$hy,rb_funcall(header_frame,s$ad)));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$ad),s$mf,rb_funcall(header_frame,s$ad)));
}
rb_funcall(rb_ivar_get(self, i$eb),'frame=',frame);
}
if(RTEST(header_view)){
if(!RTEST(rb_ivar_get(self, i$eq))){
self.$i_s(i$eq,rb_funcall(self.$klass.$c_g_full(c$ak),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,100,100)));
rb_funcall(self,s$e,rb_ivar_get(self, i$eq));
rb_funcall(rb_ivar_get(self, i$eq),s$e,header_view);
rb_funcall(header_view,'needs_display=',true);
}
frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,s$y));
rb_funcall(frame,'y=',rb_funcall(bounds,s$z));
rb_funcall(frame,'width=',rb_funcall(bounds,s$ac));
rb_funcall(frame,'height=',rb_funcall(header_frame,s$ad));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$ac),s$mf,rb_funcall(self.$klass.$c_g_full(c$al),s$xz)));
}
rb_funcall(rb_ivar_get(self, i$eq),'frame=',frame);
}
return rb_funcall(self,s$wq,rb_funcall(self, s$wu));
});
rb_define_method(self,s$wq,function(self,_cmd,clip_view){
if(RTEST(rb_funcall(self, s$wr))){
var document_rect = rb_funcall(rb_funcall(self, s$wr),s$ln);
var content_rect = rb_funcall(clip_view,s$lz);
var height_delta = rb_funcall(rb_funcall(document_rect,s$ad),s$mf,rb_funcall(content_rect,s$ad));
var width_delta = rb_funcall(rb_funcall(document_rect,s$ac),s$mf,rb_funcall(content_rect,s$ac));
rb_funcall(rb_ivar_get(self, i$ef),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,s$z),s$mf,rb_funcall(document_rect,s$z))),s$vq,height_delta));
rb_funcall(rb_ivar_get(self, i$ef),'knob_proportion=',rb_funcall(rb_funcall(content_rect,s$ad),s$vq,rb_funcall(document_rect,s$ad)));
rb_funcall(rb_ivar_get(self, i$eh),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,s$y),s$mf,rb_funcall(document_rect,s$y))),s$vq,width_delta));
rb_funcall(rb_ivar_get(self, i$eh),'knob_proportion=',rb_funcall(rb_funcall(content_rect,s$ac),s$vq,rb_funcall(document_rect,s$ac)));
}
});
rb_define_method(self,s$cz,function(self,_cmd,the_event){
});
rb_define_method(self,s$ya,function(self,_cmd,sender){
var value = rb_funcall(rb_funcall(rb_ivar_get(self, i$ef),s$oz),s$vp,(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$ad),s$mf,rb_funcall(rb_funcall(rb_ivar_get(self, i$eb),s$ln),s$ad))));
return rb_funcall(rb_ivar_get(self, i$eb),s$yb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall((0),s$mf,rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$y)),value));
});
rb_define_method(self,s$yc,function(self,_cmd,sender){
var value = rb_funcall(rb_funcall(rb_ivar_get(self, i$eh),s$oz),s$vp,(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$ac),s$mf,rb_funcall(rb_funcall(rb_ivar_get(self, i$eb),s$ln),s$ac))));
return rb_funcall(rb_ivar_get(self, i$eb),s$yb,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,value,rb_funcall((0),s$mf,rb_funcall(rb_funcall(rb_funcall(self, s$wr),s$ln),s$z))));
});
})(RClass.define_under(self,'ScrollView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
