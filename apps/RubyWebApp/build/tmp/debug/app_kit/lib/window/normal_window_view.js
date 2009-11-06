(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[16,855,16,16]));
self.$c_s('MIN_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',_E(self.$c_g_full(c$af),s$kb,_$hg,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
_I(self,s$n,function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(_A(_E(_H(self,i$gn),s$dy,_$it))){
self.$i_s(i$gr,_E(self.$klass.$c_g_full(c$am),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$ad),s$ap,6,6,16,16),_$hr,false),function(close){
_E(close,s$si,false);
_E(close,s$ux,_$gm);
_E(close,s$kc,self.$klass.$c_g_full(c$bj));
_E(close,s$uw,self.$klass.$c_g_full(c$bk));
_E(self,s$e,close);
return _E(close,s$mw,true);
}));
}
if(_A(_E(_H(self,i$gn),s$dy,_$iu))){
self.$i_s(i$gs,_E(self.$klass.$c_g_full(c$am),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$ad),s$ap,10,10,300,300),_$hr,false),function(min){
return _E(self,s$e,min);
}));
}
});
_I(self,s$lx,function(self,_){
return 'vn-normal-window-view';
});
_I(self,s$ot,function(self,_,context){
if(_A(_E(context,s$lk))){
_E(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
_E(context,s$e,"<div class='body'></div>");
_E(context,s$ll,false);
}
return _E(context,s$p,_E(self,s$lx));
});
self.$def_s(s$age,function(self,_,rect,style){
return _E(self.$c_g_full(c$ad),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$agf,function(self,_,rect,style){
return _E(self.$c_g_full(c$ad),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
self.$def_s(s$agg,function(self,_,title,style){
});
_I(self,s$agh,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ad),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
_I(self,s$agi,function(self,_,rect){
return _E(self.$klass.$c_g_full(c$ad),s$ap,_E(rect,s$ab),_E(rect,s$ac),_E(rect,s$ae),_E(rect,s$af));
});
})(_N(self,c$bl,self.$c_g_full(c$bi)));
})(_K(c$b));
