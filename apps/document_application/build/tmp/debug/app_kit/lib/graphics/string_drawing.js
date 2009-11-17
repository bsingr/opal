(function(self) {
(function(self) {
rb_define_method(self,'size_with_attributes',function(self,_,attrs){
});
self.$def('draw_at_point:with_attributes:',function(self,_,point,attrs){
});
self.$def('draw_in_rect:with_attributes:',function(self,_,rect,attrs){
});
self.$def('draw_with_rect:options:attributes:',function(self,_,rect,options,attributes){
});
self.$def('bounding_rect_with_size:options:attributes:',function(self,_,size,options,attributes){
});
})(rb_define_class_under(self,'String',cObject));
(function(self) {
rb_define_method(self,'size',function(self,_){
});
rb_define_method(self,'draw_at_point',function(self,_,point){
});
rb_define_method(self,'draw_in_rect',function(self,_,rect){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
if(!window.opera){ctx.font = 'normal 12px Arial, sans-serif';ctx.fillStyle = rb_funcall(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('color')),'rgb_string');ctx.textBaseline = 'top';ctx.fillText(rb_ivar_get(self,'@string'), rb_funcall(rect,'x'), rb_funcall(rect,'y'));}});
self.$def('draw_with_rect:options:',function(self,_,rect,options){
});
rb_define_method(self,'render_in_rect',function(self,_,rect){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(ctx,'append',ID2SYM('div'),function(text){
rb_funcall(text,'frame=',rect);
rb_funcall(text,'css',VN.$h(ID2SYM('color'),rb_funcall(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('color')),'rgb_string'),ID2SYM('overflow_x'),'hidden',ID2SYM('overflow_y'),'hidden',ID2SYM('white_space'),'nowrap'));
if(RTEST(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('font')))){
rb_funcall(text,'css',VN.$h(ID2SYM('font'),rb_funcall(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('font')),'css_string')));
}
return rb_funcall(text,'<<',rb_ivar_get(self,'@string'));
});
});
self.$def('bounding_rect_with_size:options:',function(self,_,size,options){
});
})(rb_define_class_under(self,'AttributedString',cObject));
})(rb_define_module('Vienna'));
