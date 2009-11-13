(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$zm,function(self,_){
return true;
});
_I(self,s$n,function(self,_){
self.$i_s(i$eh,0);
self.$i_s(i$ei,100);
self.$i_s(i$dg,0);
self.$i_s(i$da,true);
return rb_supcall(arguments.callee, self,_,[]);
});
_I(self,s$wu,function(self,_){
return 'vn-slider';
});
self.$def(s$wt,function(self,_,cell_frame,control_view){
var ctx=_E(self.$klass.$c_g_full(c$ah),s$hz);
self.$i_s(i$eq,cell_frame);
self.$i_s(i$cv,control_view);
if(_A(_E(ctx,s$rx))){
_E(ctx,s$nv,_$fu,function(track){
return _E(track,s$p,"track");
});
_E(ctx,s$nv,_$fu,function(knob){
return _E(knob,s$p,"knob");
});
}
return _E(ctx,s$sc,_$io,function(knob){
var knob_position=_E(self,s$aeu,_H(self,i$dg));
return _E(knob,s$q,VN.$h(_$gf,[(knob_position),"px"].join('')));
});
});
_I(self,s$aec,function(self,_){
return _H(self,i$eh);
});
_I(self,s$aed,function(self,_,a_double){
return self.$i_s(i$eh,a_double);
});
_I(self,s$aee,function(self,_){
return _H(self,i$ei);
});
_I(self,s$aef,function(self,_,a_double){
return self.$i_s(i$ei,a_double);
});
_I(self,s$aeg,function(self,_,inc_value){
return self.$i_s(i$ej,inc_value);
});
_I(self,s$aeh,function(self,_){
return _H(self,i$ej);
});
_I(self,s$ael,function(self,_){
return false;
});
_I(self,s$aei,function(self,_,color){
return self.$i_s(i$ek,color);
});
_I(self,s$aej,function(self,_,font){
return self.$i_s(i$el,font);
});
_I(self,s$zx,function(self,_,str){
return self.$i_s(i$cp,str);
});
_I(self,s$aek,function(self,_,a_float){
return self.$i_s(i$em,a_float);
});
_I(self,s$mz,function(self,_,img){
return self.$i_s(i$az,img);
});
_I(self,s$aem,function(self,_,count){
return self.$i_s(i$en,count);
});
_I(self,s$aen,function(self,_,pos){
return self.$i_s(i$eo,pos);
});
_I(self,s$aeo,function(self,_,flag){
return self.$i_s(i$ep,flag);
});
_I(self,s$aep,function(self,_){
return _H(self,i$ep);
});
_I(self,s$aeq,function(self,_,index){
});
_I(self,s$aer,function(self,_,index){
});
_I(self,s$aes,function(self,_,point){
});
_I(self,s$aet,function(self,_,value){
});
_I(self,s$aeu,function(self,_,a_value){
var x=_E((_E(_E(_H(self,i$eq),s$ae),s$dy,(_E((2),s$om,self.$klass.$c_g_full(c$az))))),s$om,(_E((_E(_H(self,i$dg),s$uu,(_E(_H(self,i$ei),s$dy,_H(self,i$eh))))),s$ed,_H(self,i$eh))));
return x;
});
_I(self,s$aev,function(self,_,a_point){
var value=_E((_E(_E(a_point,s$ab),s$dy,(_E(_E(_H(self,i$eq),s$ab),s$ed,self.$klass.$c_g_full(c$az))))),s$uu,(_E(_E(_H(self,i$eq),s$ae),s$dy,(_E((2),s$om,self.$klass.$c_g_full(c$az))))));
value=_E(value,s$om,(_E((_E(_H(self,i$ei),s$dy,_H(self,i$eh))),s$ed,_H(self,i$eh))));
return _E(self.$klass.$c_g_full(c$ba),s$aew,_E(self.$klass.$c_g_full(c$ba),s$aex,value,_H(self,i$eh)),_H(self,i$ei));
});
self.$def(s$abl,function(self,_,start_point,control_view){
_E(self,s$yh,_E(self,s$aev,start_point));
_E(self,s$abf,true,_H(self,i$eq),control_view);
return true;
});
self.$def(s$abm,function(self,_,last_point,current_point,control_view){
_E(self,s$yh,_E(self,s$aev,current_point));
_E(self,s$wt,_H(self,i$eq),control_view);
return true;
});
self.$def(s$abn,function(self,_,last_point,stop_point,control_view,flag){
return _E(self,s$abf,false,_H(self,i$eq),control_view);
});
})(_N(self,c$ax,self.$c_g_full(c$aq)));
})(_K(c$b));
