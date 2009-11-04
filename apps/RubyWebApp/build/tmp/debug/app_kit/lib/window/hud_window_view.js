(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
rb_define_method(self,s$l,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self, i$gn),s$dx,_$io))){
self.$i_s(i$gr,rb_funcall(self.$klass.$c_g_full(c$ae),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,5,3,13,13),_$hl,false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',_$gg);
rb_funcall(close,'image=',self.$klass.$c_g_full(c$as));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full(c$at));
rb_funcall(self,s$e,close);
return rb_funcall(close,'needs_display=',true);
}));
}
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-hud-window-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
rb_funcall(context,s$e,"<div class='body'></div>");
rb_funcall(context,s$e,"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
});
})(RClass.define_under(self,'HUDWindowView',self.$c_g_full(c$au)));
})(RModule.define('Vienna'));
