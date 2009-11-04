(function(self) {
(function(self) {
self.$def_s(s$wb,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
self.$def_s(s$wc,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
rb_define_method(self,s$i,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$eb,rb_funcall(self.$klass.$c_g_full(c$ag),s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,100,100)));
self.$i_s(i$ec,_$gl);
return rb_funcall(self,s$kt,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-scroll-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
return rb_funcall(context,s$l,VN.$h(_$hv,'rgb(190, 190, 190)'));
});
rb_define_method(self,s$wd,function(self,_cmd){
});
rb_define_method(self,s$we,function(self,_cmd){
});
rb_define_method(self,s$wf,function(self,_cmd,a_view){
rb_funcall(rb_ivar_get(self, i$eb),'document_view=',a_view);
return rb_funcall(self,s$wg,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$wh,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$eb),s$wh);
});
rb_define_method(self,s$wi,function(self,_cmd,content_view){
rb_funcall(rb_ivar_get(self, i$eb),s$ku);
self.$i_s(i$eb,content_view);
rb_funcall(self,s$kt,rb_ivar_get(self, i$eb));
return rb_funcall(self, s$wj);
});
rb_define_method(self,s$wk,function(self,_cmd){
return rb_ivar_get(self, i$eb);
});
rb_define_method(self,s$wl,function(self,_cmd,an_obj){
return self.$i_s(i$ed,an_obj);
});
rb_define_method(self,s$wm,function(self,_cmd){
return rb_ivar_get(self, i$ed);
});
rb_define_method(self,s$wn,function(self,_cmd,a_type){
return self.$i_s(i$ec,a_type);
});
rb_define_method(self,s$wo,function(self,_cmd){
return rb_ivar_get(self, i$ec);
});
rb_define_method(self,s$iy,function(self,_cmd,a_color){
return self.$i_s(i$aw,a_color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vl,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$wp,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$wq,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self, i$ee))){
self.$i_s(i$ee,true);
if(!RTEST(rb_ivar_get(self, i$ef))){
self.$i_s(i$ef,rb_funcall(self.$klass.$c_g_full(c$ah),s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,150,40,40,15)));
rb_funcall(rb_ivar_get(self, i$ef),'target=',self);
rb_funcall(rb_ivar_get(self, i$ef),'action=',_$hw);
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
return rb_funcall(self, s$wj);
});
rb_define_method(self,s$wr,function(self,_cmd){
return rb_ivar_get(self, i$ee);
});
rb_define_method(self,s$ws,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self, i$eg))){
self.$i_s(i$eg,true);
if(!RTEST(rb_ivar_get(self, i$eh))){
self.$i_s(i$eh,rb_funcall(self.$klass.$c_g_full(c$ah),s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,150,20,40,15)));
rb_funcall(rb_ivar_get(self, i$eh),'target=',self);
rb_funcall(rb_ivar_get(self, i$eh),'action=',_$hx);
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
return rb_funcall(self, s$wj);
});
rb_define_method(self,s$wt,function(self,_cmd){
return rb_ivar_get(self, i$eg);
});
rb_define_method(self,s$wu,function(self,_cmd,a_scroller){
return self.$i_s(i$ef,a_scroller);
});
rb_define_method(self,s$wv,function(self,_cmd){
return rb_ivar_get(self, i$ef);
});
rb_define_method(self,s$ww,function(self,_cmd,a_scroller){
return self.$i_s(i$eh,a_scroller);
});
rb_define_method(self,s$wx,function(self,_cmd){
return rb_ivar_get(self, i$eh);
});
rb_define_method(self,s$wy,function(self,_cmd){
return rb_ivar_get(self, i$ei);
});
rb_define_method(self,s$wz,function(self,_cmd,flag){
return self.$i_s(i$ei,flag);
});
rb_define_method(self,s$xa,function(self,_cmd,value){
return self.$i_s(i$ej,value);
});
rb_define_method(self,s$xb,function(self,_cmd){
return rb_ivar_get(self, i$ej);
});
rb_define_method(self,s$xc,function(self,_cmd,value){
return self.$i_s(i$ek,value);
});
rb_define_method(self,s$xd,function(self,_cmd){
return rb_ivar_get(self, i$ek);
});
rb_define_method(self,s$xe,function(self,_cmd,value){
return self.$i_s(i$el,value);
});
rb_define_method(self,s$xf,function(self,_cmd){
return rb_ivar_get(self, i$el);
});
rb_define_method(self,s$xg,function(self,_cmd,value){
return self.$i_s(i$em,value);
});
rb_define_method(self,s$xh,function(self,_cmd){
return rb_ivar_get(self, i$em);
});
rb_define_method(self,s$xi,function(self,_cmd,value){
return self.$i_s(i$en,value);
});
rb_define_method(self,s$xj,function(self,_cmd){
return rb_ivar_get(self, i$en);
});
rb_define_method(self,s$xk,function(self,_cmd,value){
return self.$i_s(i$eo,value);
});
rb_define_method(self,s$xl,function(self,_cmd){
return rb_ivar_get(self, i$eo);
});
rb_define_method(self,s$xm,function(self,_cmd,flag){
return self.$i_s(i$ep,flag);
});
rb_define_method(self,s$xn,function(self,_cmd){
return rb_ivar_get(self, i$ep);
});
rb_define_method(self,s$wj,function(self,_cmd){
var bounds = rb_funcall(self.$klass.$c_g_full(c$s),s$al,1,1,rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$z),s$mf,2),rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$aa),s$mf,2));
if(RTEST(rb_ivar_get(self, i$ee))){
var frame = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall((rb_funcall(rb_funcall(bounds,s$v),s$hy,rb_funcall(bounds,s$z))),s$mf,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo)));
rb_funcall(frame,'y=',rb_funcall(bounds,s$w));
rb_funcall(frame,'width=',rb_funcall(self.$klass.$c_g_full(c$ah),s$xo));
rb_funcall(frame,'height=',rb_funcall(bounds,s$aa));
if(RTEST(rb_ivar_get(self, i$eg))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$aa),s$mf,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo)));
}
rb_funcall(rb_ivar_get(self, i$ef),'frame=',frame);
}
if(RTEST(rb_ivar_get(self, i$eg))){
frame = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
rb_funcall(frame,'y=',rb_funcall((rb_funcall(rb_funcall(bounds,s$w),s$hy,rb_funcall(bounds,s$aa))),s$mf,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo)));
rb_funcall(frame,'x=',rb_funcall(bounds,s$v));
rb_funcall(frame,'width=',rb_funcall(bounds,s$z));
rb_funcall(frame,'height=',rb_funcall(self.$klass.$c_g_full(c$ah),s$xo));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$z),s$mf,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo)));
}
rb_funcall(rb_ivar_get(self, i$eh),'frame=',frame);
}
if(RTEST(rb_ivar_get(self, i$eb))){
frame = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,s$v));
rb_funcall(frame,'y=',rb_funcall(bounds,s$w));
rb_funcall(frame,'width=',rb_funcall(bounds,s$z));
if(RTEST(rb_ivar_get(self, i$ee))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,s$z),s$mf,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo)));
}
rb_funcall(frame,'height=',rb_funcall(bounds,s$aa));
if(RTEST(rb_ivar_get(self, i$eg))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,s$aa),s$mf,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo)));
}
rb_funcall(rb_ivar_get(self, i$eb),'frame=',frame);
}
});
rb_define_method(self,s$wg,function(self,_cmd,clip_view){
});
rb_define_method(self,s$cz,function(self,_cmd,the_event){
});
})(RClass.define_under(self,'ScrollView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
