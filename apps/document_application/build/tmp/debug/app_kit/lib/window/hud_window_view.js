(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
rb_define_method(self,'initialize',function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self,'@style_mask'),'include?',ID2SYM('closable')))){
self.$i_s('@close_button',rb_funcall(self.$klass.$c_g_full('Button'),'build',VN.$h(ID2SYM('frame'),rb_funcall(self.$klass.$c_g_full('Rect'),'new',5,3,13,13),ID2SYM('bordered'),false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',ID2SYM('image_only'));
rb_funcall(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
rb_funcall(self,'<<',close);
return rb_funcall(close,'needs_display=',true);
}));
}
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
return rb_funcall(context,'css',VN.$h(ID2SYM('background_color'),'rgb(35,35,35)'));
});
});
})(rb_define_class_under(self,'HUDWindowView',self.$c_g_full('WindowView')));
})(rb_define_module('Vienna'));
