(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
self.$def(s$as,function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(VN$(self.$i_g(i$go),s$al,_$hz))){
self.$i_s(i$gt,VN$(self.$klass.$c_g_full(c$ac),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full(c$t),s$is,5,3,13,13),_$hj,false),function(close){
VN$(close,'bordered=',false);
VN$(close,'image_position=',_$ge);
VN$(close,'image=',self.$klass.$c_g_full(c$an));
VN$(close,'alternate_image=',self.$klass.$c_g_full(c$ao));
VN$(self,s$cv,close);
return VN$(close,'needs_display=',true);
}));
}
});
self.$def(s$sy,function(self,_cmd){
return 'vn-hud-window-view';
});
self.$def(s$vt,function(self,_cmd,context){
if(RTEST(VN$(context,s$sn))){
VN$(context,s$cv,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
VN$(context,s$cv,"<div class='body'></div>");
VN$(context,s$cv,"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(self, s$sy));
});
})(RClass.define_under(self,'HUDWindowView',self.$c_g_full(c$ap)));
})(RModule.define('Vienna'));
