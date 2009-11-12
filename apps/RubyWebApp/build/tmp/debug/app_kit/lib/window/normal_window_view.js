(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',_E(self.$c_g_full(c$ai),s$mw,_$jc,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ai),s$mw,_$jc,[16,855,16,16]));
self.$c_s('MIN_IMAGE',_E(self.$c_g_full(c$ai),s$mw,_$jc,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ai),s$mw,_$jc,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',_E(self.$c_g_full(c$ai),s$mw,_$jc,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ai),s$mw,_$jc,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',26.0);
self.$c_s('TITLEBAR_IMAGE',_E(self.$c_g_full(c$aj),s$ap,_E(self.$c_g_full(c$ai),s$mq,'normal_window_titlebar_left'),_E(self.$c_g_full(c$ai),s$mq,'normal_window_titlebar_middle'),_E(self.$c_g_full(c$ai),s$mq,'normal_window_titlebar_right')));
self.$c_s('SPLITTER_IMAGE',_E(self.$c_g_full(c$ai),s$mq,'normal_window_titlebar_splitter'));
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(_A(_E(_H(self,i$hj),s$ea,_$jd))){
self.$i_s(i$hn,_E(self.$klass.$c_g_full(c$at),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$ag),s$ap,6,6,16,16),_$je,false),function(close){
_E(close,s$zz,false);
_E(close,s$acl,_$gy);
_E(close,s$mx,self.$klass.$c_g_full(c$bs));
_E(close,s$ack,self.$klass.$c_g_full(c$bt));
_E(self,s$e,close);
return _E(close,s$un,true);
}));
}
if(_A(_E(_H(self,i$hj),s$ea,_$jf))){
self.$i_s(i$ho,_E(self.$klass.$c_g_full(c$at),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$ag),s$ap,10,10,300,300),_$je,false),function(min){
return _E(self,s$e,min);
}));
}
});
_I(self,s$wj,function(self,_,context){
return _E(context,s$sc,function(){
_E(context,s$nt,_$fu,function(titlebar){
_E(titlebar,s$w,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,_E(_H(self,i$bz),s$ae),self.$klass.$c_g_full(c$bu)));
return _E(self.$klass.$c_g_full(c$bv),s$nu,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,_E(_H(self,i$bz),s$ae),self.$klass.$c_g_full(c$bu)));
});
_E(context,s$nt,_$fu,function(splitter){
_E(splitter,s$w,_E(self.$klass.$c_g_full(c$ag),s$ap,0,_E(self.$klass.$c_g_full(c$bu),s$dx,1),_E(_H(self,i$bz),s$ae),1));
return _E(self.$klass.$c_g_full(c$bw),s$nu,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,_E(_H(self,i$bz),s$ae),1));
});
return _E(context,s$nt,_$fu,function(body){
_E(body,s$w,_E(self.$klass.$c_g_full(c$ag),s$ap,0,self.$klass.$c_g_full(c$bu),_E(_H(self,i$bz),s$ae),_E(_E(_H(self,i$bz),s$af),s$dx,self.$klass.$c_g_full(c$bu))));
return _E(body,s$q,VN.$h(_$il,'rgb(245,245,245)'));
});
});
});
self.$def_s(s$anj,function(self,_,rect,style){
return _E(self.$c_g_full(c$ag),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$ank,function(self,_,rect,style){
return _E(self.$c_g_full(c$ag),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$anl,function(self,_,title,style){
});
_I(self,s$anm,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ag),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$ann,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ag),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
})(_N(self,c$bx,self.$c_g_full(c$br)));
})(_K(c$b));
