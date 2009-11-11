(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$wk,function(self,_){
return true;
});
_I(self,s$n,function(self,_){
self.$i_s(i$dy,0);
self.$i_s(i$dz,100);
self.$i_s(i$cx,0);
self.$i_s(i$cr,true);
return rb_supcall(arguments.callee, self,_,[]);
});
_I(self,s$qq,function(self,_){
return 'vn-slider';
});
self.$def(s$tu,function(self,_,cell_frame,control_view){
self.$i_s(i$eh,cell_frame);
self.$i_s(i$cm,control_view);
var ctx=_E(self.$klass.$c_g_full(c$af),s$hd);
if(_A(_E(ctx,s$oy))){
_E(ctx,s$e,"<div class='track-left'></div>");
_E(ctx,s$e,"<div class='track-middle'></div>");
_E(ctx,s$e,"<div class='track-right'></div>");
_E(ctx,s$e,"<div class='knob'></div>");
_E(ctx,s$oz,false);
}
_E(ctx,s$p,_E(self,s$qq));
return _E(ctx,s$pe,_$io,function(knob){
var knob_position=_E(self,s$abt,_H(self,i$cx));
return _E(knob,s$q,VN.$h(_$fy,[(knob_position),"px"].join('')));
});
});
_I(self,s$abb,function(self,_){
return _H(self,i$dy);
});
_I(self,s$abc,function(self,_,a_double){
return self.$i_s(i$dy,a_double);
});
_I(self,s$abd,function(self,_){
return _H(self,i$dz);
});
_I(self,s$abe,function(self,_,a_double){
return self.$i_s(i$dz,a_double);
});
_I(self,s$abf,function(self,_,inc_value){
return self.$i_s(i$ea,inc_value);
});
_I(self,s$abg,function(self,_){
return _H(self,i$ea);
});
_I(self,s$abk,function(self,_){
return false;
});
_I(self,s$abh,function(self,_,color){
return self.$i_s(i$eb,color);
});
_I(self,s$abi,function(self,_,font){
return self.$i_s(i$ec,font);
});
_I(self,s$wv,function(self,_,str){
return self.$i_s(i$ch,str);
});
_I(self,s$abj,function(self,_,a_float){
return self.$i_s(i$ed,a_float);
});
_I(self,s$kv,function(self,_,img){
return self.$i_s(i$ax,img);
});
_I(self,s$abl,function(self,_,count){
return self.$i_s(i$ee,count);
});
_I(self,s$abm,function(self,_,pos){
return self.$i_s(i$ef,pos);
});
_I(self,s$abn,function(self,_,flag){
return self.$i_s(i$eg,flag);
});
_I(self,s$abo,function(self,_){
return _H(self,i$eg);
});
_I(self,s$abp,function(self,_,index){
});
_I(self,s$abq,function(self,_,index){
});
_I(self,s$abr,function(self,_,point){
});
_I(self,s$abs,function(self,_,value){
});
_I(self,s$abt,function(self,_,a_value){
var x=_E((_E(_E(_H(self,i$eh),s$ae),s$mg,(_E((2),s$mh,self.$klass.$c_g_full(c$au))))),s$mh,(_E((_E(_H(self,i$cx),s$abu,(_E(_H(self,i$dz),s$mg,_H(self,i$dy))))),s$km,_H(self,i$dy))));
return x;
});
_I(self,s$abv,function(self,_,a_point){
var value=_E((_E(_E(a_point,s$ab),s$mg,(_E(_E(_H(self,i$eh),s$ab),s$km,self.$klass.$c_g_full(c$au))))),s$abu,(_E(_E(_H(self,i$eh),s$ae),s$mg,(_E((2),s$mh,self.$klass.$c_g_full(c$au))))));
value=_E(value,s$mh,(_E((_E(_H(self,i$dz),s$mg,_H(self,i$dy))),s$km,_H(self,i$dy))));
return _E(self.$klass.$c_g_full(c$av),s$abw,_E(self.$klass.$c_g_full(c$av),s$abx,value,_H(self,i$dy)),_H(self,i$dz));
});
self.$def(s$yj,function(self,_,start_point,control_view){
_E(self,s$vf,_E(self,s$abv,start_point));
_E(self,s$yd,true,_H(self,i$eh),control_view);
return true;
});
self.$def(s$yk,function(self,_,last_point,current_point,control_view){
_E(self,s$vf,_E(self,s$abv,current_point));
_E(self,s$tu,_H(self,i$eh),control_view);
return true;
});
self.$def(s$yl,function(self,_,last_point,stop_point,control_view,flag){
return _E(self,s$yd,false,_H(self,i$eh),control_view);
});
})(_N(self,c$as,self.$c_g_full(c$am)));
})(_K(c$b));
