(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(_A(_E(_H(self,i$gn),s$dy,_$it))){
self.$i_s(i$gr,_E(self.$klass.$c_g_full(c$am),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$ad),s$ap,5,3,13,13),_$hr,false),function(close){
_E(close,s$si,false);
_E(close,s$ux,_$gm);
_E(close,s$kc,self.$klass.$c_g_full(c$bj));
_E(close,s$uw,self.$klass.$c_g_full(c$bk));
_E(self,s$e,close);
return _E(close,s$mw,true);
}));
}
});
_I(self,s$lx,function(self,_){
return 'vn-hud-window-view';
});
_I(self,s$ot,function(self,_,context){
if(_A(_E(context,s$lk))){
_E(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
_E(context,s$e,"<div class='body'></div>");
_E(context,s$e,"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
_E(context,s$ll,false);
}
return _E(context,s$p,_E(self,s$lx));
});
})(_N(self,c$bm,self.$c_g_full(c$bi)));
})(_K(c$b));
