(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$ag),s$ku,_$hy,[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(_A(_E(_H(self,i$gz),s$es,_$jh))){
self.$i_s(i$hd,_E(self.$klass.$c_g_full(c$ap),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$ae),s$ap,5,3,13,13),_$ji,false),function(close){
_E(close,s$xb,false);
_E(close,s$zn,_$ha);
_E(close,s$kv,self.$klass.$c_g_full(c$bm));
_E(close,s$zm,self.$klass.$c_g_full(c$bn));
_E(self,s$e,close);
return _E(close,s$rp,true);
}));
}
});
_I(self,s$qq,function(self,_){
return 'vn-hud-window-view';
});
_I(self,s$tl,function(self,_,context){
if(_A(_E(context,s$oy))){
_E(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
_E(context,s$e,"<div class='body'></div>");
_E(context,s$e,"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
_E(context,s$oz,false);
}
return _E(context,s$p,_E(self,s$qq));
});
})(_N(self,c$bp,self.$c_g_full(c$bl)));
})(_K(c$b));
