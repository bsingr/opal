(function(self) {
(function(self) {
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame]);
return self.$i_s(i$hk,style_mask);
});
self.$def_s(s$anl,function(self,_,rect,style){
return _E(self.$c_g_full(c$ag),s$aq,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$anm,function(self,_,rect,style){
return _E(self.$c_g_full(c$ag),s$aq,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$ann,function(self,_,title,style){
});
_I(self,s$ano,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ag),s$aq,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$anp,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ag),s$aq,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$wu,function(self,_){
return 'vn-window-view';
});
_I(self,s$ft,function(self,_,win){
return self.$i_s(i$ag,win);
});
_I(self,s$anq,function(self,_){
return _E(self.$klass.$c_g_full(c$ag),s$aq,_E(_E(_H(self,i$bz),s$ae),s$dy,14),_E(_E(_H(self,i$bz),s$af),s$dy,14),12,12);
});
_I(self,s$ej,function(self,_,the_event){
var location=_E(the_event,s$gr);
if(_A(_E(location,s$mp,_E(self,s$anq)))){
_E(self,s$anr,the_event);
}
else{
_E(self,s$ans,the_event);
}
});
_I(self,s$ans,function(self,_,the_event){
var mouse_down_point=_E(the_event,s$gr);
return _E(self.$klass.$c_g_full(c$y),s$fm,[_$aj,_$aa],function(the_event){
if(_A(_E(_E(the_event,s$fs),s$ad,_$aj))){
_E(self.$klass.$c_g_full(c$y),s$fr);
}
else{
var window_point=_E(the_event,s$gr);
self.$i_s(i$hl,_E(_E(_H(self,i$ag),s$ut),s$y));
self.$i_s(i$hm,_E(_E(window_point,s$ab),s$dy,_E(mouse_down_point,s$ab)));
self.$i_s(i$hn,_E(_E(window_point,s$ac),s$dy,_E(mouse_down_point,s$ac)));
_E(_H(self,i$ag),s$va,_E(self.$klass.$c_g_full(c$aa),s$aq,_E(_E(_H(self,i$hl),s$ab),s$ed,_H(self,i$hm)),_E(_E(_H(self,i$hl),s$ac),s$ed,_H(self,i$hn))));
}
});
});
_I(self,s$anr,function(self,_,the_event){
var mouse_down_point=_E(the_event,s$gr);
var original_frame=_E(_E(_H(self,i$ag),s$ut),s$mc);
return _E(self.$klass.$c_g_full(c$y),s$fm,[_$aj,_$aa],function(the_event){
if(_A(_E(_E(the_event,s$fs),s$ad,_$aj))){
_E(self.$klass.$c_g_full(c$y),s$fr);
}
else{
var mouse_point=_E(the_event,s$gr);
var new_width=_E(_E(original_frame,s$ae),s$ed,(_E(_E(mouse_point,s$ab),s$dy,_E(mouse_down_point,s$ab))));
var new_height=_E(_E(original_frame,s$af),s$ed,(_E(_E(mouse_point,s$ac),s$dy,_E(mouse_down_point,s$ac))));
_E(_H(self,i$ag),s$w,_E(self.$klass.$c_g_full(c$ag),s$aq,_E(original_frame,s$ab),_E(original_frame,s$ac),new_width,new_height));
}
});
});
_I(self,s$wk,function(self,_,context){
if(_A(_E(context,s$rx))){
_E(context,s$ry,false);
}
return _E(context,s$p,_E(['vn-window-view'],s$ant,' '));
});
})(_N(self,c$bz,self.$c_g_full(c$ap)));
})(_K(c$b));
