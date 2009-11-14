(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',_E(self.$c_g_full(c$ai),s$nb,_$jp,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ai),s$nb,_$jp,[16,855,16,16]));
self.$c_s('MIN_IMAGE',_E(self.$c_g_full(c$ai),s$nb,_$jp,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ai),s$nb,_$jp,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',_E(self.$c_g_full(c$ai),s$nb,_$jp,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ai),s$nb,_$jp,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
self.$c_s('TITLEBAR_IMAGE',_E(self.$c_g_full(c$aj),s$as,_E(self.$c_g_full(c$ai),s$mv,'normal_window_titlebar_left'),_E(self.$c_g_full(c$ai),s$mv,'normal_window_titlebar_middle'),_E(self.$c_g_full(c$ai),s$mv,'normal_window_titlebar_right')));
self.$c_s('SPLITTER_IMAGE',_E(self.$c_g_full(c$ai),s$mv,'normal_window_titlebar_splitter'));
self.$c_s('RESIZE_INDICATOR',_E(self.$c_g_full(c$ai),s$mv,'normal_window_resize_indicator'));
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(_A(_E(_H(self,i$hk),s$ed,_$jq))){
self.$i_s(i$ho,_E(self.$klass.$c_g_full(c$at),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$ag),s$as,6,6,16,16),_$jr,false),function(close){
_E(close,s$aak,false);
_E(close,s$acw,_$hf);
_E(close,s$nc,self.$klass.$c_g_full(c$ca));
_E(close,s$acv,self.$klass.$c_g_full(c$cb));
_E(self,s$e,close);
return _E(close,s$us,true);
}));
}
if(_A(_E(_H(self,i$hk),s$ed,_$js))){
self.$i_s(i$hp,_E(self.$klass.$c_g_full(c$at),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$ag),s$as,10,10,300,300),_$jr,false),function(min){
return _E(self,s$e,min);
}));
}
});
_I(self,s$wr,function(self,_,context){
return _E(context,s$sh,function(){
_E(context,s$ny,_$fu,function(titlebar){
_E(titlebar,s$w,_E(self.$klass.$c_g_full(c$ag),s$as,0,0,_E(_H(self,i$bz),s$ae),self.$klass.$c_g_full(c$cc)));
return _E(self.$klass.$c_g_full(c$cd),s$nz,_E(self.$klass.$c_g_full(c$ag),s$as,0,0,_E(_H(self,i$bz),s$ae),self.$klass.$c_g_full(c$cc)));
});
_E(context,s$ny,_$fu,function(splitter){
_E(splitter,s$w,_E(self.$klass.$c_g_full(c$ag),s$as,0,_E(self.$klass.$c_g_full(c$cc),s$ea,1),_E(_H(self,i$bz),s$ae),1));
return _E(self.$klass.$c_g_full(c$ce),s$nz,_E(self.$klass.$c_g_full(c$ag),s$as,0,0,_E(_H(self,i$bz),s$ae),1));
});
_E(context,s$ny,_$fu,function(body){
_E(body,s$w,_E(self.$klass.$c_g_full(c$ag),s$as,0,self.$klass.$c_g_full(c$cc),_E(_H(self,i$bz),s$ae),_E(_E(_H(self,i$bz),s$af),s$ea,self.$klass.$c_g_full(c$cc))));
return _E(body,s$q,VN.$h(_$iz,'rgb(245,245,245)'));
});
return _E(self.$klass.$c_g_full(c$cf),s$nz,_E(self,s$anx));
});
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
})(_N(self,c$cg,self.$c_g_full(c$bz)));
})(_K(c$b));
