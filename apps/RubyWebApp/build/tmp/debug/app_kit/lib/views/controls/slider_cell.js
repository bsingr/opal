(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$zi,function(self,_){
return true;
});
_I(self,s$n,function(self,_){
self.$i_s(i$eg,0);
self.$i_s(i$eh,100);
self.$i_s(i$df,0);
self.$i_s(i$cz,true);
return rb_supcall(arguments.callee, self,_,[]);
});
_I(self,s$to,function(self,_){
return 'vn-slider';
});
self.$def(s$ws,function(self,_,cell_frame,control_view){
var ctx=_E(self.$klass.$c_g_full(c$ah),s$hy);
self.$i_s(i$ep,cell_frame);
self.$i_s(i$cu,control_view);
if(_A(_E(ctx,s$rv))){
_E(ctx,s$nt,_$fu,function(track){
return _E(track,s$p,"track");
});
_E(ctx,s$nt,_$fu,function(knob){
return _E(knob,s$p,"knob");
});
}
return _E(ctx,s$sa,_$ij,function(knob){
var knob_position=_E(self,s$aer,_H(self,i$df));
return _E(knob,s$q,VN.$h(_$gf,[(knob_position),"px"].join('')));
});
});
_I(self,s$adz,function(self,_){
return _H(self,i$eg);
});
_I(self,s$aea,function(self,_,a_double){
return self.$i_s(i$eg,a_double);
});
_I(self,s$aeb,function(self,_){
return _H(self,i$eh);
});
_I(self,s$aec,function(self,_,a_double){
return self.$i_s(i$eh,a_double);
});
_I(self,s$aed,function(self,_,inc_value){
return self.$i_s(i$ei,inc_value);
});
_I(self,s$aee,function(self,_){
return _H(self,i$ei);
});
_I(self,s$aei,function(self,_){
return false;
});
_I(self,s$aef,function(self,_,color){
return self.$i_s(i$ej,color);
});
_I(self,s$aeg,function(self,_,font){
return self.$i_s(i$ek,font);
});
_I(self,s$zt,function(self,_,str){
return self.$i_s(i$cq,str);
});
_I(self,s$aeh,function(self,_,a_float){
return self.$i_s(i$el,a_float);
});
_I(self,s$mx,function(self,_,img){
return self.$i_s(i$az,img);
});
_I(self,s$aej,function(self,_,count){
return self.$i_s(i$em,count);
});
_I(self,s$aek,function(self,_,pos){
return self.$i_s(i$en,pos);
});
_I(self,s$ael,function(self,_,flag){
return self.$i_s(i$eo,flag);
});
_I(self,s$aem,function(self,_){
return _H(self,i$eo);
});
_I(self,s$aen,function(self,_,index){
});
_I(self,s$aeo,function(self,_,index){
});
_I(self,s$aep,function(self,_,point){
});
_I(self,s$aeq,function(self,_,value){
});
_I(self,s$aer,function(self,_,a_value){
var x=_E((_E(_E(_H(self,i$ep),s$ae),s$dx,(_E((2),s$ok,self.$klass.$c_g_full(c$az))))),s$ok,(_E((_E(_H(self,i$df),s$aes,(_E(_H(self,i$eh),s$dx,_H(self,i$eg))))),s$ec,_H(self,i$eg))));
return x;
});
_I(self,s$aet,function(self,_,a_point){
var value=_E((_E(_E(a_point,s$ab),s$dx,(_E(_E(_H(self,i$ep),s$ab),s$ec,self.$klass.$c_g_full(c$az))))),s$aes,(_E(_E(_H(self,i$ep),s$ae),s$dx,(_E((2),s$ok,self.$klass.$c_g_full(c$az))))));
value=_E(value,s$ok,(_E((_E(_H(self,i$eh),s$dx,_H(self,i$eg))),s$ec,_H(self,i$eg))));
return _E(self.$klass.$c_g_full(c$ba),s$aeu,_E(self.$klass.$c_g_full(c$ba),s$aev,value,_H(self,i$eg)),_H(self,i$eh));
});
self.$def(s$abh,function(self,_,start_point,control_view){
_E(self,s$yd,_E(self,s$aet,start_point));
_E(self,s$abb,true,_H(self,i$ep),control_view);
return true;
});
self.$def(s$abi,function(self,_,last_point,current_point,control_view){
_E(self,s$yd,_E(self,s$aet,current_point));
_E(self,s$ws,_H(self,i$ep),control_view);
return true;
});
self.$def(s$abj,function(self,_,last_point,stop_point,control_view,flag){
return _E(self,s$abb,false,_H(self,i$ep),control_view);
});
})(_N(self,c$ax,self.$c_g_full(c$aq)));
})(_K(c$b));
