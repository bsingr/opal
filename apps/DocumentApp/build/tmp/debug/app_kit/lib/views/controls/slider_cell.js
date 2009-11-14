(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$zt,function(self,_){
return true;
});
_I(self,s$n,function(self,_){
self.$i_s(i$eh,0);
self.$i_s(i$ei,100);
self.$i_s(i$dg,0);
self.$i_s(i$da,true);
return rb_supcall(arguments.callee, self,_,[]);
});
_I(self,s$xb,function(self,_){
return 'vn-slider';
});
self.$def(s$xa,function(self,_,cell_frame,control_view){
var ctx=_E(self.$klass.$c_g_full(c$ah),s$ib);
self.$i_s(i$eq,cell_frame);
self.$i_s(i$cv,control_view);
if(_A(_E(ctx,s$sa))){
_E(ctx,s$ny,_$fu,function(track){
return _E(track,s$p,"track");
});
_E(ctx,s$ny,_$fu,function(knob){
return _E(knob,s$p,"knob");
});
}
return _E(ctx,s$sf,_$iq,function(knob){
var knob_position=_E(self,s$afb,_H(self,i$dg));
return _E(knob,s$q,VN.$h(_$gf,[(knob_position),"px"].join('')));
});
});
_I(self,s$aej,function(self,_){
return _H(self,i$eh);
});
_I(self,s$aek,function(self,_,a_double){
return self.$i_s(i$eh,a_double);
});
_I(self,s$ael,function(self,_){
return _H(self,i$ei);
});
_I(self,s$aem,function(self,_,a_double){
return self.$i_s(i$ei,a_double);
});
_I(self,s$aen,function(self,_,inc_value){
return self.$i_s(i$ej,inc_value);
});
_I(self,s$aeo,function(self,_){
return _H(self,i$ej);
});
_I(self,s$aes,function(self,_){
return false;
});
_I(self,s$aep,function(self,_,color){
return self.$i_s(i$ek,color);
});
_I(self,s$aeq,function(self,_,font){
return self.$i_s(i$el,font);
});
_I(self,s$aae,function(self,_,str){
return self.$i_s(i$cp,str);
});
_I(self,s$aer,function(self,_,a_float){
return self.$i_s(i$em,a_float);
});
_I(self,s$nc,function(self,_,img){
return self.$i_s(i$az,img);
});
_I(self,s$aet,function(self,_,count){
return self.$i_s(i$en,count);
});
_I(self,s$aeu,function(self,_,pos){
return self.$i_s(i$eo,pos);
});
_I(self,s$aev,function(self,_,flag){
return self.$i_s(i$ep,flag);
});
_I(self,s$aew,function(self,_){
return _H(self,i$ep);
});
_I(self,s$aex,function(self,_,index){
});
_I(self,s$aey,function(self,_,index){
});
_I(self,s$aez,function(self,_,point){
});
_I(self,s$afa,function(self,_,value){
});
_I(self,s$afb,function(self,_,a_value){
var x=_E((_E(_E(_H(self,i$eq),s$ae),s$ea,(_E((2),s$op,self.$klass.$c_g_full(c$az))))),s$op,(_E((_E(_H(self,i$dg),s$vb,(_E(_H(self,i$ei),s$ea,_H(self,i$eh))))),s$ef,_H(self,i$eh))));
return x;
});
_I(self,s$afc,function(self,_,a_point){
var value=_E((_E(_E(a_point,s$ab),s$ea,(_E(_E(_H(self,i$eq),s$ab),s$ef,self.$klass.$c_g_full(c$az))))),s$vb,(_E(_E(_H(self,i$eq),s$ae),s$ea,(_E((2),s$op,self.$klass.$c_g_full(c$az))))));
value=_E(value,s$op,(_E((_E(_H(self,i$ei),s$ea,_H(self,i$eh))),s$ef,_H(self,i$eh))));
return _E(self.$klass.$c_g_full(c$ba),s$afd,_E(self.$klass.$c_g_full(c$ba),s$afe,value,_H(self,i$eh)),_H(self,i$ei));
});
self.$def(s$abs,function(self,_,start_point,control_view){
_E(self,s$yo,_E(self,s$afc,start_point));
_E(self,s$abm,true,_H(self,i$eq),control_view);
return true;
});
self.$def(s$abt,function(self,_,last_point,current_point,control_view){
_E(self,s$yo,_E(self,s$afc,current_point));
_E(self,s$xa,_H(self,i$eq),control_view);
return true;
});
self.$def(s$abu,function(self,_,last_point,stop_point,control_view,flag){
return _E(self,s$abm,false,_H(self,i$eq),control_view);
});
})(_N(self,c$ax,self.$c_g_full(c$aq)));
})(_K(c$b));
