(function(self) {
(function(self) {
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame]);
return self.$i_s(i$hk,style_mask);
});
self.$def_s(s$ans,function(self,_,rect,style){
return _E(self.$c_g_full(c$ag),s$as,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$ant,function(self,_,rect,style){
return _E(self.$c_g_full(c$ag),s$as,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$anu,function(self,_,title,style){
});
_I(self,s$anv,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ag),s$as,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$anw,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ag),s$as,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$xb,function(self,_){
return 'vn-window-view';
});
_I(self,s$fv,function(self,_,win){
return self.$i_s(i$ag,win);
});
_I(self,s$anx,function(self,_){
return _E(self.$klass.$c_g_full(c$ag),s$as,_E(_E(_H(self,i$bz),s$ae),s$ea,14),_E(_E(_H(self,i$bz),s$af),s$ea,14),12,12);
});
_I(self,s$el,function(self,_,the_event){
var location=_E(the_event,s$gt);
if(_A(_E(location,s$ms,_E(self,s$anx)))){
_E(self,s$any,the_event);
}
else{
_E(self,s$anz,the_event);
}
});
_I(self,s$anz,function(self,_,the_event){
var mouse_down_point=_E(the_event,s$gt);
return _E(self.$klass.$c_g_full(c$y),s$fo,[_$aj,_$aa],function(the_event){
if(_A(_E(_E(the_event,s$fu),s$ad,_$aj))){
_E(self.$klass.$c_g_full(c$y),s$ft);
}
else{
var window_point=_E(the_event,s$gt);
self.$i_s(i$hl,_E(_E(_H(self,i$ag),s$va),s$y));
self.$i_s(i$hm,_E(_E(window_point,s$ab),s$ea,_E(mouse_down_point,s$ab)));
self.$i_s(i$hn,_E(_E(window_point,s$ac),s$ea,_E(mouse_down_point,s$ac)));
_E(_H(self,i$ag),s$vh,_E(self.$klass.$c_g_full(c$aa),s$as,_E(_E(_H(self,i$hl),s$ab),s$ef,_H(self,i$hm)),_E(_E(_H(self,i$hl),s$ac),s$ef,_H(self,i$hn))));
}
});
});
_I(self,s$any,function(self,_,the_event){
var mouse_down_point=_E(the_event,s$gt);
var original_frame=_E(_E(_H(self,i$ag),s$va),s$mf);
return _E(self.$klass.$c_g_full(c$y),s$fo,[_$aj,_$aa],function(the_event){
if(_A(_E(_E(the_event,s$fu),s$ad,_$aj))){
_E(self.$klass.$c_g_full(c$y),s$ft);
}
else{
var mouse_point=_E(the_event,s$gt);
var new_width=_E(_E(original_frame,s$ae),s$ef,(_E(_E(mouse_point,s$ab),s$ea,_E(mouse_down_point,s$ab))));
var new_height=_E(_E(original_frame,s$af),s$ef,(_E(_E(mouse_point,s$ac),s$ea,_E(mouse_down_point,s$ac))));
_E(_H(self,i$ag),s$w,_E(self.$klass.$c_g_full(c$ag),s$as,_E(original_frame,s$ab),_E(original_frame,s$ac),new_width,new_height));
}
});
});
_I(self,s$wr,function(self,_,context){
if(_A(_E(context,s$sa))){
_E(context,s$sb,false);
}
return _E(context,s$p,_E(['vn-window-view'],s$aoa,' '));
});
})(_N(self,c$bz,self.$c_g_full(c$ap)));
})(_K(c$b));
