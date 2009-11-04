(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[16,855,16,16]));
self.$c_s('MIN_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full(c$aa),s$ig,_$gy,[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
rb_define_method(self,s$i,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self, i$gm),s$dx,_$hz))){
self.$i_s(i$gr,rb_funcall(self.$klass.$c_g_full(c$ab),s$ka,VN.$h(_$ft,rb_funcall(self.$klass.$c_g_full(c$s),s$al,6,6,16,16),_$hj,false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',_$ge);
rb_funcall(close,'image=',self.$klass.$c_g_full(c$am));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full(c$an));
rb_funcall(self,s$b,close);
return rb_funcall(close,'needs_display=',true);
}));
}
if(RTEST(rb_funcall(rb_ivar_get(self, i$gm),s$dx,_$ia))){
self.$i_s(i$gs,rb_funcall(self.$klass.$c_g_full(c$ab),s$ka,VN.$h(_$ft,rb_funcall(self.$klass.$c_g_full(c$s),s$al,10,10,300,300),_$hj,false),function(min){
return rb_funcall(self,s$b,min);
}));
}
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-normal-window-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$b,"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
rb_funcall(context,s$b,"<div class='body'></div>");
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
});
self.$def_s(s$adv,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
self.$def_s(s$adw,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
self.$def_s(s$adx,function(self,_cmd,title,style){
});
rb_define_method(self,s$ady,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
rb_define_method(self,s$adz,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
})(RClass.define_under(self,'NormalWindowView',self.$c_g_full(c$ao)));
})(RModule.define('Vienna'));
