(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[16,855,16,16]));
self.$c_s('MIN_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',VN$(self.$c_g_full(c$ab),s$re,_$gy,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
self.$def(s$as,function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(VN$(self.$i_g(i$go),s$al,_$hz))){
self.$i_s(i$gt,VN$(self.$klass.$c_g_full(c$ac),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full(c$t),s$is,6,6,16,16),_$hj,false),function(close){
VN$(close,'bordered=',false);
VN$(close,'image_position=',_$ge);
VN$(close,'image=',self.$klass.$c_g_full(c$an));
VN$(close,'alternate_image=',self.$klass.$c_g_full(c$ao));
VN$(self,s$cv,close);
return VN$(close,'needs_display=',true);
}));
}
if(RTEST(VN$(self.$i_g(i$go),s$al,_$ia))){
self.$i_s(i$gu,VN$(self.$klass.$c_g_full(c$ac),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full(c$t),s$is,10,10,300,300),_$hj,false),function(min){
return VN$(self,s$cv,min);
}));
}
});
self.$def(s$sy,function(self,_cmd){
return 'vn-normal-window-view';
});
self.$def(s$vt,function(self,_cmd,context){
if(RTEST(VN$(context,s$sn))){
VN$(context,s$cv,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
VN$(context,s$cv,"<div class='body'></div>");
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(self, s$sy));
});
self.$def_s(s$amd,function(self,_cmd,rect,style){
return VN$(self.$c_g_full(c$t),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def_s(s$ame,function(self,_cmd,rect,style){
return VN$(self.$c_g_full(c$t),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def_s(s$amf,function(self,_cmd,title,style){
});
self.$def(s$amg,function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full(c$t),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def(s$amh,function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full(c$t),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
})(RClass.define_under(self,'NormalWindowView',self.$c_g_full(c$ap)));
})(RModule.define('Vienna'));
