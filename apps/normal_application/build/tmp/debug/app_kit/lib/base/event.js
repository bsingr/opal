(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(ID2SYM('left_mouse_down'), 1, ID2SYM('left_mouse_up'), 2, ID2SYM('right_mouse_down'), 3, ID2SYM('right_mouse_up'), 4, ID2SYM('mouse_moved'), 5, ID2SYM('left_mouse_dragged'), 6, ID2SYM('right_mouse_dragged'), 7, ID2SYM('mouse_entered'), 8, ID2SYM('mouse_exited'), 9, ID2SYM('key_down'), 10, ID2SYM('key_up'), 11, ID2SYM('flags_changed'), 12, ID2SYM('app_kit_defined'), 13, ID2SYM('system_defined'), 14, ID2SYM('application_defined'), 15, ID2SYM('periodic'), 16, ID2SYM('cursor_update'), 17, ID2SYM('scroll_wheel'), 22, ID2SYM('other_mouse_down'), 25, ID2SYM('other_mouse_up'), 26, ID2SYM('other_mouse_dragged'), 27));
(function(self) {
self.$def_s('from_native_event:with_window:with_type:',function(self,_,event,win,type){
var obj=rb_funcall(self,'allocate');
rb_funcall(obj,'initialize_with_native_event:with_window:with_type:',event,win,type);
return obj;
});
self.$def('initialize_with_native_event:with_window:with_type:',function(self,_,event,win,type){
self.$i_s('@event',event);
self.$i_s('@window',win);
return self.$i_s('@type',type);
});
rb_define_method(self,'stop_propagation',function(self,_){
var event=rb_ivar_get(self,'@event');
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
rb_define_method(self,'allows_propagation?',function(self,_){
return rb_ivar_get(self,'@event')._vn_allow_event_propagation? true : false;});
rb_define_method(self,'allows_propagation=',function(self,_,flag){
rb_ivar_get(self,'@event')._vn_allow_event_propagation = flag;});
rb_define_method(self,'type',function(self,_){
return rb_ivar_get(self,'@type');
});
rb_define_method(self,'modifier_flags',function(self,_){
});
rb_define_method(self,'timestamp',function(self,_){
});
rb_define_method(self,'window=',function(self,_,a_window){
return self.$i_s('@window',a_window);
});
rb_define_method(self,'window',function(self,_){
return rb_ivar_get(self,'@window');
});
rb_define_method(self,'window_number',function(self,_){
return rb_funcall(rb_ivar_get(self,'@window'),'window_number');
});
rb_define_method(self,'context',function(self,_){
});
rb_define_method(self,'click_count',function(self,_){
});
rb_define_method(self,'button_number',function(self,_){
});
rb_define_method(self,'event_number',function(self,_){
});
rb_define_method(self,'location_in_window',function(self,_){
return rb_funcall(rb_ivar_get(self,'@window'),'convert_screen_to_base',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_ivar_get(self,'@event').clientX,rb_ivar_get(self,'@event').clientY));
});
rb_define_method(self,'characters',function(self,_){
});
rb_define_method(self,'characters_ignoring_modifiers',function(self,_){
});
rb_define_method(self,'repeat?',function(self,_){
});
rb_define_method(self,'key_code',function(self,_){
});
rb_define_method(self,'tracking_number',function(self,_){
});
rb_define_method(self,'user_data',function(self,_){
});
rb_define_method(self,'tracking_area',function(self,_){
});
self.$def_s('mouse_location',function(self,_){
});
})(rb_define_class_under(self,'Event',cObject));
})(rb_define_module('Vienna'));
