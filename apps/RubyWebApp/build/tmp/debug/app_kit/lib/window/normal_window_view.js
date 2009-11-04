(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[16,855,16,16]));
self.$c_s('MIN_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$ha,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
rb_define_method(self,s$l,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self, i$gn),s$dx,_$io))){
self.$i_s(i$gr,rb_funcall(self.$klass.$c_g_full(c$ae),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,6,6,16,16),_$hl,false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',_$gg);
rb_funcall(close,'image=',self.$klass.$c_g_full(c$as));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full(c$at));
rb_funcall(self,s$e,close);
return rb_funcall(close,'needs_display=',true);
}));
}
if(RTEST(rb_funcall(rb_ivar_get(self, i$gn),s$dx,_$ip))){
self.$i_s(i$gs,rb_funcall(self.$klass.$c_g_full(c$ae),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,10,10,300,300),_$hl,false),function(min){
return rb_funcall(self,s$e,min);
}));
}
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-normal-window-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$e,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
rb_funcall(context,s$e,"<div class='body'></div>");
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
});
self.$def_s(s$aek,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$ael,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$aem,function(self,_cmd,title,style){
});
rb_define_method(self,s$aen,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
rb_define_method(self,s$aeo,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
})(RClass.define_under(self,'NormalWindowView',self.$c_g_full(c$au)));
})(RModule.define('Vienna'));
