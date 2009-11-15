(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[0,855,16,16]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[16,855,16,16]));
self.$c_s('MIN_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[0,872,16,16]));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[16,872,16,16]));
self.$c_s('ZOOM_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[0,889,16,16]));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[16,889,16,16]));
self.$c_s('TITLEBAR_HEIGHT',24.0);
self.$c_s('TITLEBAR_IMAGE',rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','normal_window_titlebar_left'),rb_funcall(self.$c_g_full('Image'),'image_named','normal_window_titlebar_middle'),rb_funcall(self.$c_g_full('Image'),'image_named','normal_window_titlebar_right')));
self.$c_s('SPLITTER_IMAGE',rb_funcall(self.$c_g_full('Image'),'image_named','normal_window_titlebar_splitter'));
self.$c_s('RESIZE_INDICATOR',rb_funcall(self.$c_g_full('Image'),'image_named','normal_window_resize_indicator'));
rb_define_method(self,'initialize',function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self,'@style_mask'),'include?',ID2SYM('closable')))){
self.$i_s('@close_button',rb_funcall(self.$klass.$c_g_full('Button'),'build',VN.$h(ID2SYM('frame'),rb_funcall(self.$klass.$c_g_full('Rect'),'new',6,6,16,16),ID2SYM('bordered'),false),function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',ID2SYM('image_only'));
rb_funcall(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
rb_funcall(self,'<<',close);
return rb_funcall(close,'needs_display=',true);
}));
}
if(RTEST(rb_funcall(rb_ivar_get(self,'@style_mask'),'include?',ID2SYM('miniaturizable')))){
self.$i_s('@min_button',rb_funcall(self.$klass.$c_g_full('Button'),'build',VN.$h(ID2SYM('frame'),rb_funcall(self.$klass.$c_g_full('Rect'),'new',10,10,300,300),ID2SYM('bordered'),false),function(min){
return rb_funcall(self,'<<',min);
}));
}
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
rb_funcall(context,'append',ID2SYM('div'),function(titlebar){
rb_funcall(titlebar,'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),self.$klass.$c_g_full('TITLEBAR_HEIGHT')));
return rb_funcall(self.$klass.$c_g_full('TITLEBAR_IMAGE'),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),self.$klass.$c_g_full('TITLEBAR_HEIGHT')));
});
rb_funcall(context,'append',ID2SYM('div'),function(splitter){
rb_funcall(splitter,'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,rb_funcall(self.$klass.$c_g_full('TITLEBAR_HEIGHT'),'-',1),rb_funcall(rb_ivar_get(self,'@bounds'),'width'),1));
return rb_funcall(self.$klass.$c_g_full('SPLITTER_IMAGE'),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),1));
});
rb_funcall(context,'append',ID2SYM('div'),function(body){
rb_funcall(body,'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,self.$klass.$c_g_full('TITLEBAR_HEIGHT'),rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',self.$klass.$c_g_full('TITLEBAR_HEIGHT'))));
return rb_funcall(body,'css',VN.$h(ID2SYM('background_color'),'rgb(245,245,245)'));
});
return rb_funcall(self.$klass.$c_g_full('RESIZE_INDICATOR'),'render_with_frame',rb_funcall(self,'resize_indicator_frame'));
});
});
self.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_,rect,style){
return rb_funcall(self.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
self.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_,rect,style){
return rb_funcall(self.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
self.$def_s('min_frame_width_with_title:style_mask:',function(self,_,title,style){
});
rb_define_method(self,'frame_rect_for_content_rect',function(self,_,rect){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
rb_define_method(self,'content_rect_for_frame_rect',function(self,_,rect){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
})(rb_define_class_under(self,'NormalWindowView',self.$c_g_full('WindowView')));
})(rb_define_module('Vienna'));
