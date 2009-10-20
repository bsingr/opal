var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('EVENT_TYPES',VN.$h('left_mouse_down', 1, 'left_mouse_up', 2, 'right_mouse_down', 3, 'right_mouse_up', 4, 'mouse_moved', 5, 'left_mouse_dragged', 6, 'right_mouse_dragged', 7, 'mouse_entered', 8, 'mouse_exited', 9, 'key_down', 10, 'key_up', 11, 'flags_changed', 12, 'app_kit_defined', 13, 'system_defined', 14, 'application_defined', 15, 'periodic', 16, 'cursor_update', 17, 'scroll_wheel', 22, 'other_mouse_down', 25, 'other_mouse_up', 26, 'other_mouse_dragged', 27));
var $VN_2 = RClass.define_under($VN_1, 'Event',cObject);
$VN_2.$def_s('from_native_event:with_window:with_type:',function(self,_cmd,event,win,type){
var obj = VN$(self,'allocate');
VN$(obj,'initialize_with_native_event:with_window:with_type:',event,win,type);
return obj;
});
$VN_2.$def('initialize_with_native_event:with_window:with_type:',function(self,_cmd,event,win,type){
self.$i_s('@event',event);
self.$i_s('@window',win);
return self.$i_s('@type',type);
});
$VN_2.$def('stop_propagation',function(self,_cmd){
var event = self.$i_g('@event');
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
$VN_2.$def('allows_propagation?',function(self,_cmd){
return self.$i_g('@event')._vn_allow_event_propagation? true : false;});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('modifier_flags',function(self,_cmd){
});
$VN_2.$def('timestamp',function(self,_cmd){
});
$VN_2.$def('window',function(self,_cmd){
return self.$i_g('@window');
});
$VN_2.$def('window_number',function(self,_cmd){
return VN$(self.$i_g('@window'),'window_number');
});
$VN_2.$def('context',function(self,_cmd){
});
$VN_2.$def('click_count',function(self,_cmd){
});
$VN_2.$def('button_number',function(self,_cmd){
});
$VN_2.$def('event_number',function(self,_cmd){
});
$VN_2.$def('location_in_window',function(self,_cmd){
return VN$(self.$i_g('@window'),'convert_screen_to_base',VN$(self.$klass.$c_g_full('Point'),'new',self.$i_g('@event').clientX,self.$i_g('@event').clientY));
});
$VN_2.$def('characters',function(self,_cmd){
});
$VN_2.$def('characters_ignoring_modifiers',function(self,_cmd){
});
$VN_2.$def('repeat?',function(self,_cmd){
});
$VN_2.$def('key_code',function(self,_cmd){
});
$VN_2.$def('tracking_number',function(self,_cmd){
});
$VN_2.$def('user_data',function(self,_cmd){
});
$VN_2.$def('tracking_area',function(self,_cmd){
});
$VN_2.$def_s('mouse_location',function(self,_cmd){
});
