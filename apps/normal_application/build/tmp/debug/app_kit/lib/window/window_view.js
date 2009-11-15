(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame]);
return self.$i_s('@style_mask',style_mask);
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
rb_define_method(self,'class_name',function(self,_){
return 'vn-window-view';
});
rb_define_method(self,'window=',function(self,_,win){
return self.$i_s('@window',win);
});
rb_define_method(self,'resize_indicator_frame',function(self,_){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',14),rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',14),12,12);
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
var location=rb_funcall(the_event,'location_in_window');
if(RTEST(rb_funcall(location,'in_rect?',rb_funcall(self,'resize_indicator_frame')))){
rb_funcall(self,'track_window_resize_with_event',the_event);
}
else{
rb_funcall(self,'track_window_move_with_event',the_event);
}
});
rb_define_method(self,'track_window_move_with_event',function(self,_,the_event){
var mouse_down_point=rb_funcall(the_event,'location_in_window');
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var window_point=rb_funcall(the_event,'location_in_window');
self.$i_s('@window_origin',rb_funcall(rb_funcall(rb_ivar_get(self,'@window'),'frame'),'origin'));
self.$i_s('@delta_x',rb_funcall(rb_funcall(window_point,'x'),'-',rb_funcall(mouse_down_point,'x')));
self.$i_s('@delta_y',rb_funcall(rb_funcall(window_point,'y'),'-',rb_funcall(mouse_down_point,'y')));
rb_funcall(rb_ivar_get(self,'@window'),'frame_origin=',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall(rb_funcall(rb_ivar_get(self,'@window_origin'),'x'),'+',rb_ivar_get(self,'@delta_x')),rb_funcall(rb_funcall(rb_ivar_get(self,'@window_origin'),'y'),'+',rb_ivar_get(self,'@delta_y'))));
}
});
});
rb_define_method(self,'track_window_resize_with_event',function(self,_,the_event){
var mouse_down_point=rb_funcall(the_event,'location_in_window');
var original_frame=rb_funcall(rb_funcall(rb_ivar_get(self,'@window'),'frame'),'copy');
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var mouse_point=rb_funcall(the_event,'location_in_window');
var new_width=rb_funcall(rb_funcall(original_frame,'width'),'+',(rb_funcall(rb_funcall(mouse_point,'x'),'-',rb_funcall(mouse_down_point,'x'))));
var new_height=rb_funcall(rb_funcall(original_frame,'height'),'+',(rb_funcall(rb_funcall(mouse_point,'y'),'-',rb_funcall(mouse_down_point,'y'))));
rb_funcall(rb_ivar_get(self,'@window'),'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(original_frame,'x'),rb_funcall(original_frame,'y'),new_width,new_height));
}
});
});
rb_define_method(self,'render',function(self,_,context){
if(RTEST(rb_funcall(context,'first_time?'))){
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(['vn-window-view'],'join',' '));
});
})(rb_define_class_under(self,'WindowView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));
