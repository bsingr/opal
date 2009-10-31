(function(self) {
(function(self) {
self.$def(s$as,function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[]);
VN$(self, s$sv);
self.$i_s(i$bd,frame);
self.$i_s(i$be,VN$(self.$klass.$c_g_full(c$t),s$is,0,0,VN$(frame,s$jr),VN$(frame,s$js)));
VN$(self,'frame=',frame);
self.$i_s(i$bf,[]);
self.$i_s(i$ae,nil);
self.$i_s(i$bg,nil);
self.$i_s(i$bh,false);
self.$i_s(i$bi,true);
return self.$i_s(i$bj,[]);
});
self.$def_s(s$sw,function(self,_cmd,options,block){
var view = VN$(self,s$is,VN$(options,s$bo,_$ft));
if(RTEST(block)){
arguments[arguments.length -1](view);
}
return view;
});
self.$def(s$jf,function(self,_cmd){
return self.$i_g(i$d);
});
self.$def(s$jy,function(self,_cmd){
return VN$(self.$klass.$c_g_full(c$u),s$bo,_$fu);
});
self.$def(s$sv,function(self,_cmd){
if(RTEST(VN$(VN$(self, s$jy),s$ai,_$fv))){
self.$i_s(i$d,VN$(self.$klass.$c_g_full(c$s),s$is,_$fw,nil));
VN$(self.$i_g(i$d),s$jh,VN.$h(_$fx,'hidden'));
self.$i_s(i$bk,VN$(self.$klass.$c_g_full(c$r),s$is,_$fw,nil));
VN$(self.$i_g(i$d),s$cv,self.$i_g(i$bk));
}
else{
self.$i_s(i$d,VN$(self.$klass.$c_g_full(c$s),s$is,_$fw));
self.$i_s(i$bk,VN$(self.$klass.$c_g_full(c$v),s$is));
VN$(self.$i_g(i$d),s$fj,self.$i_g(i$bk));
}
});
self.$def(s$sx,function(self,_cmd,the_event){
return true;
});
self.$def(s$mq,function(self,_cmd){
return true;
});
self.$def(s$sy,function(self,_cmd){
return ORTEST(self.$i_g(i$bl),'vn-view');
});
self.$def(s$jg,function(self,_cmd,a_class){
return self.$i_s(i$bl,a_class);
});
self.$def(s$sz,function(self,_cmd){
return ORTEST(self.$i_g(i$bm),'');
});
self.$def(s$ta,function(self,_cmd,a_theme){
return self.$i_s(i$bm,a_theme);
});
self.$def(s$pk,function(self,_cmd){
return VN$(self.$i_g(i$bk),s$jf).getContext('2d');});
self.$def(s$tb,function(self,_cmd,coder){
});
self.$def(s$tc,function(self,_cmd,builder){
});
self.$def_s(s$td,function(self,_cmd){
});
VN$(self,s$td,_$ft,_$fy);
self.$def(s$kj,function(self,_cmd){
});
self.$def(s$nd,function(self,_cmd){
});
self.$def(s$te,function(self,_cmd){
});
self.$def(s$tf,function(self,_cmd){
});
self.$def(s$tg,function(self,_cmd,a_view){
});
self.$def(s$th,function(self,_cmd,a_view){
});
self.$def(s$ti,function(self,_cmd){
});
self.$def(s$tj,function(self,_cmd,flag){
});
self.$def(s$tk,function(self,_cmd){
});
self.$def(s$tl,function(self,_cmd){
});
self.$def(s$tm,function(self,_cmd){
});
self.$def(s$tn,function(self,_cmd){
});
self.$def(s$to,function(self,_cmd,new_subviews){
});
self.$def(s$tp,function(self,_cmd,a_view){
if(RTEST(VN$(self.$i_g(i$bf),s$al,a_view))){
return ;
}
VN$(a_view,s$tq);
VN$(a_view,s$tr,self);
VN$(a_view,s$ts,self.$i_g(i$ae));
VN$(self.$i_g(i$bf),s$cv,a_view);
VN$(self.$i_g(i$d),s$cv,VN$(a_view,s$jf));
VN$(a_view,'next_responder=',self);
VN$(a_view,s$tt);
VN$(a_view,s$tu);
return VN$(self,s$tv,self);
});
self.$def(s$cv,function(self,_cmd,a_view){
return VN$(self,s$tp,a_view);
});
self.$def(s$tw,function(self,_cmd,a_view,place,other_view){
});
self.$def(s$ts,function(self,_cmd,win){
self.$i_s(i$ae,win);
return VN$(self.$i_g(i$bf),s$ga,function(s){
return VN$(s,s$ts,win);
});
});
self.$def(s$tu,function(self,_cmd){
VN$(self.$i_g(i$bf),s$ga,function(s){
return VN$(s,s$tu);
});
return VN$(self,'needs_display=',true);
});
self.$def(s$tr,function(self,_cmd,new_super){
return self.$i_s(i$bg,new_super);
});
self.$def(s$tt,function(self,_cmd){
});
self.$def(s$tv,function(self,_cmd,subview){
});
self.$def(s$tx,function(self,_cmd,subview){
});
self.$def(s$tq,function(self,_cmd){
});
self.$def(s$ty,function(self,_cmd,old_view,new_view){
});
self.$def(s$tz,function(self,_cmd,flag){
});
self.$def(s$ua,function(self,_cmd){
});
self.$def(s$ub,function(self,_cmd,size){
});
self.$def(s$uc,function(self,_cmd,old){
});
self.$def(s$ud,function(self,_cmd,flag){
});
self.$def(s$ue,function(self,_cmd){
});
self.$def(s$uf,function(self,_cmd,mask){
});
self.$def(s$ug,function(self,_cmd){
});
self.$def(s$uh,function(self,_cmd,new_origin){
VN$(self.$i_g(i$bd),'x=',VN$(new_origin,s$jo));
VN$(self.$i_g(i$bd),'y=',VN$(new_origin,s$jp));
VN$(self.$i_g(i$d),'origin=',new_origin);
if(RTEST(self.$i_g(i$bh))){
var nc = VN$(self.$klass.$c_g_full(c$n),s$lk);
VN$(nc,s$lq,'frame chnage notification',self);
}
});
self.$def(s$ui,function(self,_cmd,new_size){
var old_size = VN$(self.$klass.$c_g_full(c$q),s$is,VN$(self.$i_g(i$bd),s$jr),VN$(self.$i_g(i$bd),s$js));
VN$(VN$(self.$i_g(i$bd),s$bs),'width=',VN$(new_size,s$jr));
VN$(VN$(self.$i_g(i$bd),s$bs),'height=',VN$(new_size,s$js));
VN$(VN$(self.$i_g(i$be),s$bs),'width=',VN$(new_size,s$jr));
VN$(VN$(self.$i_g(i$be),s$bs),'height=',VN$(new_size,s$js));
VN$(self,'needs_display=',true);
VN$(self.$i_g(i$d),'size=',new_size);
VN$(self.$i_g(i$bk),'size=',new_size);
if(RTEST(self.$i_g(i$bh))){
var nc = VN$(self.$klass.$c_g_full(c$n),s$lk);
VN$(nc,s$lq,'frame chnage notification',self);
}
});
self.$def(s$jl,function(self,_cmd,frame){
VN$(self,'frame_origin=',VN$(frame,s$jm));
VN$(self,'frame_size=',VN$(frame,s$bs));
if(RTEST(self.$i_g(i$bh))){
var nc = VN$(self.$klass.$c_g_full(c$n),s$lk);
VN$(nc,s$lq,'view chnages notification',self);
}
});
self.$def(s$uj,function(self,_cmd){
return self.$i_g(i$bd);
});
self.$def(s$uk,function(self,_cmd,angle){
});
self.$def(s$ul,function(self,_cmd){
return self.$i_g(i$bn);
});
self.$def(s$um,function(self,_cmd,angle){
});
self.$def(s$un,function(self,_cmd){
});
self.$def(s$uo,function(self,_cmd,new_origin){
});
self.$def(s$up,function(self,_cmd,new_size){
});
self.$def(s$uq,function(self,_cmd,angle){
});
self.$def(s$ur,function(self,_cmd){
});
self.$def(s$us,function(self,_cmd,translation){
});
self.$def(s$ut,function(self,_cmd,angle){
});
self.$def(s$uu,function(self,_cmd,bounds){
});
self.$def(s$uv,function(self,_cmd){
return self.$i_g(i$be);
});
self.$def(s$pm,function(self,_cmd){
});
self.$def(s$uw,function(self,_cmd){
});
self.$def(s$ux,function(self,_cmd){
});
self.$def(s$uy,function(self,_cmd){
});
self.$def(s$uz,function(self,_cmd,point,view){
if(!RTEST(view)){
return VN$(self,s$va,point);
}
return VN$(self.$klass.$c_g_full(c$p),s$is,VN$(VN$(point,s$jo),s$fe,VN$(self.$i_g(i$bd),s$jo)),VN$(VN$(point,s$jp),s$fe,VN$(self.$i_g(i$bd),s$jp)));
});
self.$def(s$vb,function(self,_cmd,point,view){
});
self.$def(s$vc,function(self,_cmd,size,view){
});
self.$def(s$vd,function(self,_cmd,size,view){
});
self.$def(s$ve,function(self,_cmd,rect,view){
});
self.$def(s$vf,function(self,_cmd,rect,view){
});
self.$def(s$vg,function(self,_cmd,point){
});
self.$def(s$va,function(self,_cmd,point){
if(RTEST(self.$i_g(i$bg))){
return VN$(self.$i_g(i$bg),s$va,VN$(self.$klass.$c_g_full(c$p),s$is,VN$(VN$(point,s$jo),s$fe,VN$(self.$i_g(i$bd),s$jo)),VN$(VN$(point,s$jp),s$fe,VN$(self.$i_g(i$bd),s$jp))));
}
else{
return point;
}
});
self.$def(s$vh,function(self,_cmd,size){
});
self.$def(s$vi,function(self,_cmd,size){
});
self.$def(s$vj,function(self,_cmd,rect){
});
self.$def(s$vk,function(self,_cmd,rect){
});
self.$def(s$vl,function(self,_cmd){
});
self.$def(s$vm,function(self,_cmd,flag){
if(!RTEST(self.$i_g(i$ae))){
return ;
}
return VN$(self, s$vn);
});
self.$def(s$vo,function(self,_cmd,invalid_rect){
return self.$i_g(i$bo);
});
self.$def(s$vp,function(self,_cmd){
return self.$i_g(i$bo);
});
self.$def(s$si,function(self,_cmd){
return VN$(self.$klass.$c_g_full(c$r),'current_context=',self.$i_g(i$bk));
});
self.$def(s$sj,function(self,_cmd){
});
self.$def_s(s$vq,function(self,_cmd){
});
self.$def(s$vr,function(self,_cmd){
});
self.$def(s$vn,function(self,_cmd){
if(!RTEST(self.$i_g(i$ae))){
return ;
}
VN$(self, s$vs);
if(RTEST(VN$(VN$(self, s$jy),s$ai,_$fv))){
VN$(self,s$vt,self.$i_g(i$bk));
}
else{
var graphics_context = VN$(self.$i_g(i$ae),s$vu);
VN$(self.$klass.$c_g_full(c$v),'current_context=',graphics_context);
VN$(graphics_context,'graphics_port=',VN$(self,s$pk));
VN$(self,s$nl,VN$(self, s$uv));
}
});
self.$def(s$vt,function(self,_cmd,context){
if(RTEST(VN$(context,s$sn))){
VN$(context,'class_name=',VN$(self, s$sy));
VN$(context,'first_time=',false);
}
});
self.$def(s$nl,function(self,_cmd,rect){
});
self.$def(s$vs,function(self,_cmd){
});
self.$def(s$vv,function(self,_cmd,point){
point = VN$(self,s$uz,point,self.$i_g(i$bg));
if(!RTEST(VN$(point,s$qx,VN$(self, s$uv)))){
return nil;
}
var count = VN$(self.$i_g(i$bf),s$br);
var i = 0;
for (i = 0; i < count; i++) {var view_to_check = VN$(self.$i_g(i$bf),s$bo,i);
var hit_test = VN$(view_to_check,s$vv,point);
if(RTEST(hit_test)){
return hit_test;
}
}return self;
});
self.$def(s$vw,function(self,_cmd,point,rect){
});
self.$def(s$vx,function(self,_cmd,tracking_area){
if(RTEST(VN$(self.$i_g(i$bj),s$bt))){
VN$(self.$i_g(i$d),s$jb,_$fz,function(evt){
});
VN$(self.$i_g(i$d),s$jb,_$ga,function(evt){
});
}
return VN$(self.$i_g(i$bj),s$cv,tracking_area);
});
self.$def(s$vy,function(self,_cmd,tracking_area){
});
self.$def(s$vz,function(self,_cmd){
return self.$i_g(i$bj);
});
self.$def(s$wa,function(self,_cmd){
});
})(RClass.define_under(self,'View',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));
