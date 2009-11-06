(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$rt,function(self,_){
return true;
});
_I(self,s$n,function(self,_){
self.$i_s(i$dl,0);
self.$i_s(i$dm,100);
self.$i_s(i$ck,0);
return rb_supcall(arguments.callee, self,_,[]);
});
_I(self,s$lx,function(self,_){
return 'vn-slider';
});
self.$def(s$pd,function(self,_,cell_frame,control_view){
self.$i_s(i$dv,cell_frame);
self.$i_s(i$by,control_view);
var ctx=_E(self.$klass.$c_g_full(c$ae),s$gj);
if(_A(_E(ctx,s$lk))){
_E(ctx,s$e,"<div class='track-left'></div>");
_E(ctx,s$e,"<div class='track-middle'></div>");
_E(ctx,s$e,"<div class='track-right'></div>");
_E(ctx,s$e,"<div class='knob'></div>");
_E(ctx,s$ll,false);
}
_E(ctx,s$p,_E(self,s$lx));
return _E(ctx,s$lq,_$ia,function(knob){
var knob_position=_E(self,s$xi,_H(self,i$ck));
return _E(knob,s$q,VN.$h(_$fz,[(knob_position),"px"].join('')));
});
});
_I(self,s$wq,function(self,_){
return _H(self,i$dl);
});
_I(self,s$wr,function(self,_,a_double){
return self.$i_s(i$dl,a_double);
});
_I(self,s$ws,function(self,_){
return _H(self,i$dm);
});
_I(self,s$wt,function(self,_,a_double){
return self.$i_s(i$dm,a_double);
});
_I(self,s$wu,function(self,_,inc_value){
return self.$i_s(i$dn,inc_value);
});
_I(self,s$wv,function(self,_){
return _H(self,i$dn);
});
_I(self,s$wz,function(self,_){
return false;
});
_I(self,s$ww,function(self,_,color){
return self.$i_s(i$do,color);
});
_I(self,s$wx,function(self,_,font){
return self.$i_s(i$dp,font);
});
_I(self,s$sc,function(self,_,str){
return self.$i_s(i$bt,str);
});
_I(self,s$wy,function(self,_,a_float){
return self.$i_s(i$dq,a_float);
});
_I(self,s$kc,function(self,_,img){
return self.$i_s(i$av,img);
});
_I(self,s$xa,function(self,_,count){
return self.$i_s(i$ds,count);
});
_I(self,s$xb,function(self,_,pos){
return self.$i_s(i$dt,pos);
});
_I(self,s$xc,function(self,_,flag){
return self.$i_s(i$du,flag);
});
_I(self,s$xd,function(self,_){
return _H(self,i$du);
});
_I(self,s$xe,function(self,_,index){
});
_I(self,s$xf,function(self,_,index){
});
_I(self,s$xg,function(self,_,point){
});
_I(self,s$xh,function(self,_,value){
});
_I(self,s$xi,function(self,_,a_value){
var x=_E((_E(_E(_H(self,i$dv),s$ae),s$ob,(_E((2),s$xj,self.$klass.$c_g_full(c$at))))),s$xj,(_E((_E(_H(self,i$ck),s$xk,(_E(_H(self,i$dm),s$ob,_H(self,i$dl))))),s$jt,_H(self,i$dl))));
return x;
});
_I(self,s$xl,function(self,_,a_point){
var value=_E((_E(_E(a_point,s$ab),s$ob,(_E(_E(_H(self,i$dv),s$ab),s$jt,self.$klass.$c_g_full(c$at))))),s$xk,(_E(_E(_H(self,i$dv),s$ae),s$ob,(_E((2),s$xj,self.$klass.$c_g_full(c$at))))));
value=_E(value,s$xj,(_E((_E(_H(self,i$dm),s$ob,_H(self,i$dl))),s$jt,_H(self,i$dl))));
return _E(self.$klass.$c_g_full(c$au),s$xm,_E(self.$klass.$c_g_full(c$au),s$xn,value,_H(self,i$dl)),_H(self,i$dm));
});
self.$def(s$tr,function(self,_,start_point,control_view){
_E(self,s$qp,_E(self,s$xl,start_point));
_E(self,s$tl,true,_H(self,i$dv),control_view);
return true;
});
self.$def(s$ts,function(self,_,last_point,current_point,control_view){
_E(self,s$qp,_E(self,s$xl,current_point));
_E(self,s$pd,_H(self,i$dv),control_view);
return true;
});
self.$def(s$tt,function(self,_,last_point,stop_point,control_view,flag){
return _E(self,s$tl,false,_H(self,i$dv),control_view);
});
})(_N(self,c$ar,self.$c_g_full(c$aj)));
})(_K(c$b));
