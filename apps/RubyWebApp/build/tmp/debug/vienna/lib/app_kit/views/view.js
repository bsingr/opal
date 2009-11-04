(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[]);
rb_funcall(self, s$jz);
self.$i_s(i$bb,frame);
self.$i_s(i$bc,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,rb_funcall(frame,s$z),rb_funcall(frame,s$aa)));
rb_funcall(self,'frame=',frame);
self.$i_s(i$bd,[]);
self.$i_s(i$ac,nil);
self.$i_s(i$be,nil);
self.$i_s(i$bf,false);
self.$i_s(i$bg,true);
return self.$i_s(i$bh,[]);
});
self.$def_s(s$ka,function(self,_cmd,options,block){
var view = rb_funcall(self,s$al,rb_funcall(options,s$e,_$ft));
if(RTEST(block)){
arguments[arguments.length -1](view);
}
return view;
});
rb_define_method(self,s$j,function(self,_cmd){
return rb_ivar_get(self, i$b);
});
rb_define_method(self,s$an,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$t),s$e,_$fu);
});
rb_define_method(self,s$jz,function(self,_cmd){
if(RTEST(rb_funcall(rb_funcall(self, s$an),s$y,_$fv))){
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$r),s$al,_$fw,nil));
rb_funcall(rb_ivar_get(self, i$b),s$l,VN.$h(_$fx,'hidden'));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$q),s$al,_$fw,nil));
rb_funcall(rb_ivar_get(self, i$b),s$b,rb_ivar_get(self, i$bi));
}
else{
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$r),s$al,_$fw));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$u),s$al));
rb_funcall(rb_ivar_get(self, i$b),s$hx,rb_ivar_get(self, i$bi));
}
});
rb_define_method(self,s$kb,function(self,_cmd,the_event){
return true;
});
rb_define_method(self,s$dj,function(self,_cmd){
return true;
});
rb_define_method(self,s$kc,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bj),'vn-view');
});
rb_define_method(self,s$k,function(self,_cmd,a_class){
return self.$i_s(i$bj,a_class);
});
rb_define_method(self,s$kd,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bk),'');
});
rb_define_method(self,s$ke,function(self,_cmd,a_theme){
return self.$i_s(i$bk,a_theme);
});
rb_define_method(self,s$ge,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bi),s$j).getContext('2d');});
rb_define_method(self,s$kf,function(self,_cmd,coder){
});
rb_define_method(self,s$kg,function(self,_cmd,builder){
});
self.$def_s(s$kh,function(self,_cmd){
});
rb_funcall(self,s$kh,_$ft,_$fy);
rb_define_method(self,s$az,function(self,_cmd){
});
rb_define_method(self,s$dw,function(self,_cmd){
});
rb_define_method(self,s$ki,function(self,_cmd){
});
rb_define_method(self,s$kj,function(self,_cmd){
});
rb_define_method(self,s$kk,function(self,_cmd,a_view){
});
rb_define_method(self,s$kl,function(self,_cmd,a_view){
});
rb_define_method(self,s$km,function(self,_cmd){
});
rb_define_method(self,s$kn,function(self,_cmd,flag){
});
rb_define_method(self,s$ko,function(self,_cmd){
});
rb_define_method(self,s$kp,function(self,_cmd){
});
rb_define_method(self,s$kq,function(self,_cmd){
});
rb_define_method(self,s$kr,function(self,_cmd){
});
rb_define_method(self,s$ks,function(self,_cmd,new_subviews){
});
rb_define_method(self,s$kt,function(self,_cmd,a_view){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bd),s$dx,a_view))){
return ;
}
rb_funcall(a_view,s$ku);
rb_funcall(a_view,s$kv,self);
rb_funcall(a_view,s$kw,rb_ivar_get(self, i$ac));
rb_funcall(rb_ivar_get(self, i$bd),s$b,a_view);
rb_funcall(rb_ivar_get(self, i$b),s$b,rb_funcall(a_view,s$j));
rb_funcall(a_view,'next_responder=',self);
rb_funcall(a_view,s$kx);
rb_funcall(a_view,s$ky);
return rb_funcall(self,s$kz,self);
});
rb_define_method(self,s$b,function(self,_cmd,a_view){
return rb_funcall(self,s$kt,a_view);
});
self.$def(s$la,function(self,_cmd,a_view,place,other_view){
});
rb_define_method(self,s$kw,function(self,_cmd,win){
self.$i_s(i$ac,win);
return rb_funcall(rb_ivar_get(self, i$bd),s$m,function(s){
return rb_funcall(s,s$kw,win);
});
});
rb_define_method(self,s$ky,function(self,_cmd){
rb_funcall(rb_ivar_get(self, i$bd),s$m,function(s){
return rb_funcall(s,s$ky);
});
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$kv,function(self,_cmd,new_super){
return self.$i_s(i$be,new_super);
});
rb_define_method(self,s$kx,function(self,_cmd){
});
rb_define_method(self,s$kz,function(self,_cmd,subview){
});
rb_define_method(self,s$lb,function(self,_cmd,subview){
});
rb_define_method(self,s$ku,function(self,_cmd){
});
self.$def(s$lc,function(self,_cmd,old_view,new_view){
});
rb_define_method(self,s$ld,function(self,_cmd,flag){
});
rb_define_method(self,s$le,function(self,_cmd){
});
rb_define_method(self,s$lf,function(self,_cmd,size){
});
rb_define_method(self,s$lg,function(self,_cmd,old){
});
rb_define_method(self,s$lh,function(self,_cmd,flag){
});
rb_define_method(self,s$li,function(self,_cmd){
});
rb_define_method(self,s$lj,function(self,_cmd,mask){
});
rb_define_method(self,s$lk,function(self,_cmd){
});
rb_define_method(self,s$ll,function(self,_cmd,new_origin){
rb_funcall(rb_ivar_get(self, i$bb),'x=',rb_funcall(new_origin,s$v));
rb_funcall(rb_ivar_get(self, i$bb),'y=',rb_funcall(new_origin,s$w));
rb_funcall(rb_ivar_get(self, i$b),'origin=',new_origin);
if(RTEST(rb_ivar_get(self, i$bf))){
var nc = rb_funcall(self.$klass.$c_g_full(c$m),s$cc);
rb_funcall(nc,s$cj,'frame chnage notification',self);
}
});
rb_define_method(self,s$lm,function(self,_cmd,new_size){
var old_size = rb_funcall(self.$klass.$c_g_full(c$p),s$al,rb_funcall(rb_ivar_get(self, i$bb),s$z),rb_funcall(rb_ivar_get(self, i$bb),s$aa));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$t),'width=',rb_funcall(new_size,s$z));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$t),'height=',rb_funcall(new_size,s$aa));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$t),'width=',rb_funcall(new_size,s$z));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$t),'height=',rb_funcall(new_size,s$aa));
rb_funcall(self,'needs_display=',true);
rb_funcall(rb_ivar_get(self, i$b),'size=',new_size);
rb_funcall(rb_ivar_get(self, i$bi),'size=',new_size);
if(RTEST(rb_ivar_get(self, i$bf))){
var nc = rb_funcall(self.$klass.$c_g_full(c$m),s$cc);
rb_funcall(nc,s$cj,'frame chnage notification',self);
}
});
rb_define_method(self,s$r,function(self,_cmd,frame){
rb_funcall(self,'frame_origin=',rb_funcall(frame,s$s));
rb_funcall(self,'frame_size=',rb_funcall(frame,s$t));
if(RTEST(rb_ivar_get(self, i$bf))){
var nc = rb_funcall(self.$klass.$c_g_full(c$m),s$cc);
rb_funcall(nc,s$cj,'view chnages notification',self);
}
});
rb_define_method(self,s$ln,function(self,_cmd){
return rb_ivar_get(self, i$bb);
});
rb_define_method(self,s$lo,function(self,_cmd,angle){
});
rb_define_method(self,s$lp,function(self,_cmd){
return rb_ivar_get(self, i$bl);
});
rb_define_method(self,s$lq,function(self,_cmd,angle){
});
rb_define_method(self,s$lr,function(self,_cmd){
});
rb_define_method(self,s$ls,function(self,_cmd,new_origin){
});
rb_define_method(self,s$lt,function(self,_cmd,new_size){
});
rb_define_method(self,s$lu,function(self,_cmd,angle){
});
rb_define_method(self,s$lv,function(self,_cmd){
});
rb_define_method(self,s$lw,function(self,_cmd,translation){
});
rb_define_method(self,s$lx,function(self,_cmd,angle){
});
rb_define_method(self,s$ly,function(self,_cmd,bounds){
});
rb_define_method(self,s$lz,function(self,_cmd){
return rb_ivar_get(self, i$bc);
});
rb_define_method(self,s$gg,function(self,_cmd){
});
rb_define_method(self,s$ma,function(self,_cmd){
});
rb_define_method(self,s$mb,function(self,_cmd){
});
rb_define_method(self,s$mc,function(self,_cmd){
});
self.$def(s$md,function(self,_cmd,point,view){
if(!RTEST(view)){
return rb_funcall(self,s$me,point);
}
return rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_funcall(rb_funcall(point,s$v),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$v)),rb_funcall(rb_funcall(point,s$w),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$w)));
});
self.$def(s$mg,function(self,_cmd,point,view){
});
self.$def(s$mh,function(self,_cmd,size,view){
});
self.$def(s$mi,function(self,_cmd,size,view){
});
self.$def(s$mj,function(self,_cmd,rect,view){
});
self.$def(s$mk,function(self,_cmd,rect,view){
});
rb_define_method(self,s$ml,function(self,_cmd,point){
});
rb_define_method(self,s$me,function(self,_cmd,point){
if(RTEST(rb_ivar_get(self, i$be))){
return rb_funcall(rb_ivar_get(self, i$be),s$me,rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_funcall(rb_funcall(point,s$v),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$v)),rb_funcall(rb_funcall(point,s$w),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$w))));
}
else{
return point;
}
});
rb_define_method(self,s$mm,function(self,_cmd,size){
});
rb_define_method(self,s$mn,function(self,_cmd,size){
});
rb_define_method(self,s$mo,function(self,_cmd,rect){
});
rb_define_method(self,s$mp,function(self,_cmd,rect){
});
rb_define_method(self,s$mq,function(self,_cmd){
});
rb_define_method(self,s$mr,function(self,_cmd,flag){
if(!RTEST(rb_ivar_get(self, i$ac))){
return ;
}
return rb_funcall(self, s$ms);
});
rb_define_method(self,s$mt,function(self,_cmd,invalid_rect){
return rb_ivar_get(self, i$bm);
});
rb_define_method(self,s$mu,function(self,_cmd){
return rb_ivar_get(self, i$bm);
});
rb_define_method(self,s$jk,function(self,_cmd){
return rb_funcall(self.$klass.$c_g_full(c$q),'current_context=',rb_ivar_get(self, i$bi));
});
rb_define_method(self,s$jl,function(self,_cmd){
});
self.$def_s(s$mv,function(self,_cmd){
});
rb_define_method(self,s$mw,function(self,_cmd){
});
rb_define_method(self,s$ms,function(self,_cmd){
if(!RTEST(rb_ivar_get(self, i$ac))){
return ;
}
rb_funcall(self, s$mx);
if(RTEST(rb_funcall(rb_funcall(self, s$an),s$y,_$fv))){
rb_funcall(self,s$my,rb_ivar_get(self, i$bi));
}
else{
var graphics_context = rb_funcall(rb_ivar_get(self, i$ac),s$mz);
rb_funcall(self.$klass.$c_g_full(c$u),'current_context=',graphics_context);
rb_funcall(graphics_context,'graphics_port=',rb_funcall(self,s$ge));
rb_funcall(self,s$ef,rb_funcall(self, s$lz));
}
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
rb_funcall(context,'first_time=',false);
}
});
rb_define_method(self,s$ef,function(self,_cmd,rect){
});
rb_define_method(self,s$mx,function(self,_cmd){
});
rb_define_method(self,s$na,function(self,_cmd,point){
point = rb_funcall(self,s$md,point,rb_ivar_get(self, i$be));
if(!RTEST(rb_funcall(point,s$hv,rb_funcall(self, s$lz)))){
return nil;
}
var count = rb_funcall(rb_ivar_get(self, i$bd),s$nb);
var i = 0;
for (i = 0; i < count; i++) {var view_to_check = rb_funcall(rb_ivar_get(self, i$bd),s$e,i);
var hit_test = rb_funcall(view_to_check,s$na,point);
if(RTEST(hit_test)){
return hit_test;
}
}return self;
});
self.$def(s$nc,function(self,_cmd,point,rect){
});
rb_define_method(self,s$nd,function(self,_cmd,tracking_area){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bh),s$ne))){
rb_funcall(rb_ivar_get(self, i$b),s$c,_$fz,function(evt){
});
rb_funcall(rb_ivar_get(self, i$b),s$c,_$ga,function(evt){
});
}
return rb_funcall(rb_ivar_get(self, i$bh),s$b,tracking_area);
});
rb_define_method(self,s$nf,function(self,_cmd,tracking_area){
});
rb_define_method(self,s$ng,function(self,_cmd){
return rb_ivar_get(self, i$bh);
});
rb_define_method(self,s$nh,function(self,_cmd){
});
})(RClass.define_under(self,'View',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));
