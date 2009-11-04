(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
rb_define_method(self,s$i,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self, i$gm),s$dx,_$hz))){
self.$i_s(i$gr,rb_funcall(self.$klass.$c_g_full(c$ab),s$ka,VN.$h(_$ft,rb_funcall(self.$klass.$c_g_full(c$s),s$al,5,3,13,13),_$hj,false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',_$ge);
rb_funcall(close,'image=',self.$klass.$c_g_full(c$am));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full(c$an));
rb_funcall(self,s$b,close);
return rb_funcall(close,'needs_display=',true);
}));
}
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-hud-window-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$b,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
rb_funcall(context,s$b,"<div class='body'></div>");
rb_funcall(context,s$b,"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
});
})(RClass.define_under(self,'HUDWindowView',self.$c_g_full(c$ao)));
})(RModule.define('Vienna'));
