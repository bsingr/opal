(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[16,855,16,16]));
self.$c_s('MIN_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(_A(_E(_H(self,i$gz),s$es,_$jh))){
self.$i_s(i$hd,_E(self.$klass.$c_g_full(c$ap),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$ae),s$ap,6,6,16,16),_$ji,false),function(close){
_E(close,s$xb,false);
_E(close,s$zn,_$ha);
_E(close,s$kv,self.$klass.$c_g_full(c$bm));
_E(close,s$zm,self.$klass.$c_g_full(c$bn));
_E(self,s$e,close);
return _E(close,s$rp,true);
}));
}
if(_A(_E(_H(self,i$gz),s$es,_$jj))){
self.$i_s(i$he,_E(self.$klass.$c_g_full(c$ap),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$ae),s$ap,10,10,300,300),_$ji,false),function(min){
return _E(self,s$e,min);
}));
}
});
_I(self,s$qq,function(self,_){
return 'vn-normal-window-view';
});
_I(self,s$tl,function(self,_,context){
if(_A(_E(context,s$oy))){
_E(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
_E(context,s$e,"<div class='body'></div>");
_E(context,s$oz,false);
}
return _E(context,s$p,_E(self,s$qq));
});
self.$def_s(s$akm,function(self,_,rect,style){
return _E(self.$c_g_full(c$ae),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$akn,function(self,_,rect,style){
return _E(self.$c_g_full(c$ae),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$ako,function(self,_,title,style){
});
_I(self,s$akp,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ae),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$akq,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ae),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
})(_N(self,c$bo,self.$c_g_full(c$bl)));
})(_K(c$b));
