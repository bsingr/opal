var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'View',$VN_2.$c_g_full('Responder'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$(self,'puts','initialising view');
VN$sup(arguments.callee, self,_cmd,[]);
VN$(self, 'setup_display_context');
self.$i_s('@frame',VN$(self.$klass.$c_g_full('Rect'),'new',100,100,100,100));
self.$i_s('@bounds',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,100,100));
self.$i_s('@subviews',[]);
self.$i_s('@window',nil);
self.$i_s('@superview',nil);
self.$i_s('@posts_frame_changed_notifications',false);
self.$i_s('@autoresizes_subviews',true);
return self.$i_s('@tracking_areas',[]);
});
$VN_2.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_2.$def('display_mode',function(self,_cmd){
return VN$(self.$klass.$c_g_full('Vienna'),'display_mode');
});
$VN_2.$def('setup_display_context',function(self,_cmd){
return VN$(self, 'setup_drawing_context');
});
$VN_2.$def('setup_drawing_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@display_element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','canvas','',''));
return VN$(self.$i_g('@element'),'<<',self.$i_g('@display_element'));
});
$VN_2.$def('setup_render_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@display_element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
return VN$(self.$i_g('@element'),'<<',self.$i_g('@display_element'));
});
$VN_2.$def('graphics_port',function(self,_cmd){
return VN$(self.$i_g('@display_element'),'element').getContext('2d');});
$VN_2.$def('initialize_with_coder',function(self,_cmd,coder){
});
$VN_2.$def('initialize_with_builder',function(self,_cmd,builder){
});
$VN_2.$def_s('display_properties',function(self,_cmd){
return VN$(self,'puts','in display properties..');
});
VN$($VN_2,'display_properties','frame','frame_size');
$VN_2.$def('did_change_value_for_key',function(self,_cmd){
});
$VN_2.$def('window',function(self,_cmd){
});
$VN_2.$def('superview',function(self,_cmd){
});
$VN_2.$def('subviews',function(self,_cmd){
});
$VN_2.$def('descendant_of?',function(self,_cmd,a_view){
});
$VN_2.$def('ancestor_shared_with_view',function(self,_cmd,a_view){
});
$VN_2.$def('opaque_ancestor',function(self,_cmd){
});
$VN_2.$def('hidden=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'hidden');
VN$(self, 'did_change_value_for_key', 'hidden');
});
$VN_2.$def('hidden?',function(self,_cmd){
});
$VN_2.$def('hidden_or_has_hidden_ancestor?',function(self,_cmd){
});
$VN_2.$def('view_did_hide',function(self,_cmd){
});
$VN_2.$def('view_did_unhide',function(self,_cmd){
});
$VN_2.$def('subviews=',function(self,_cmd,new_subviews){
VN$(self, 'will_change_value_for_key', 'subviews');
VN$(self, 'did_change_value_for_key', 'subviews');
});
$VN_2.$def('add_subview',function(self,_cmd,a_view){
if((e=VN$(self.$i_g('@subviews'),'include?',a_view),e!==nil && e!==false)){
return ;
}
VN$(a_view,'remove_from_superview');
VN$(a_view,'view_will_move_to_superview',self);
VN$(a_view,'view_will_move_to_window',self.$i_g('@window'));
VN$(self.$i_g('@subviews'),'<<',a_view);
VN$(self.$i_g('@element'),'<<',VN$(a_view,'element'));
VN$(a_view,'next_responder=',self);
VN$(a_view,'view_did_move_to_superview');
VN$(a_view,'view_did_move_to_window');
return VN$(self,'did_add_subview',self);
});
$VN_2.$def('<<',function(self,_cmd,a_view){
return VN$(self,'add_subview',a_view);
});
$VN_2.$def('add_subview:positioned:relative_to:',function(self,_cmd,a_view,place,other_view){
});
$VN_2.$def('view_will_move_to_window',function(self,_cmd,win){
return self.$i_s('@window',win);
});
$VN_2.$def('view_did_move_to_window',function(self,_cmd){
});
$VN_2.$def('view_will_move_to_superview',function(self,_cmd,new_super){
return self.$i_s('@superview',new_super);
});
$VN_2.$def('view_did_move_to_superview',function(self,_cmd){
});
$VN_2.$def('did_add_subview',function(self,_cmd,subview){
});
$VN_2.$def('will_remove_subview',function(self,_cmd,subview){
});
$VN_2.$def('remove_from_superview',function(self,_cmd){
});
$VN_2.$def('replace_subview:with:',function(self,_cmd,old_view,new_view){
});
$VN_2.$def('posts_frame_changed_notifications=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'posts_frame_changed_notifications');
VN$(self, 'did_change_value_for_key', 'posts_frame_changed_notifications');
});
$VN_2.$def('posts_frame_changed_notifications?',function(self,_cmd){
});
$VN_2.$def('resize_subviews_with_old_size',function(self,_cmd,size){
});
$VN_2.$def('resize_with_old_superview_size',function(self,_cmd,old){
});
$VN_2.$def('autoresizes_subviews=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'autoresizes_subviews');
VN$(self, 'did_change_value_for_key', 'autoresizes_subviews');
});
$VN_2.$def('autoresizes_subviews?',function(self,_cmd){
});
$VN_2.$def('autoresizing_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'autoresizing_mask');
VN$(self, 'did_change_value_for_key', 'autoresizing_mask');
});
$VN_2.$def('autoresizing_mask',function(self,_cmd){
});
$VN_2.$def('frame_origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'frame_origin');
VN$(self.$i_g('@frame'),'x=',VN$(new_origin,'x'));
VN$(self.$i_g('@frame'),'y=',VN$(new_origin,'y'));
VN$(self.$i_g('@element'),'origin=',new_origin);
if((e=self.$i_g('@posts_frame_changed_notifications'),e!==nil && e!==false)){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:','frame chnage notification',self);
}
VN$(self, 'did_change_value_for_key', 'frame_origin');
});
$VN_2.$def('frame_size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'frame_size');
var old_size = VN$(self.$klass.$c_g_full('Size'),'new',VN$(self.$i_g('@frame'),'width'),VN$(self.$i_g('@frame'),'height'));
VN$(VN$(self.$i_g('@frame'),'size'),'width=',VN$(new_size,'width'));
VN$(VN$(self.$i_g('@frame'),'size'),'height=',VN$(new_size,'height'));
VN$(VN$(self.$i_g('@bounds'),'size'),'width=',VN$(new_size,'width'));
VN$(VN$(self.$i_g('@bounds'),'size'),'height=',VN$(new_size,'height'));
if((e=self.$i_g('@autoresizes_subviews'),e!==nil && e!==false)){
return VN$(self,'resize_subviews_with_old_size',old_size);
}
VN$(self,'needs_display=',true);
VN$(self.$i_g('@element'),'size=',new_size);
VN$(self.$i_g('@display_element'),'size=',new_size);
if((e=self.$i_g('@posts_frame_changed_notifications'),e!==nil && e!==false)){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:','frame chnage notification',self);
}
VN$(self, 'did_change_value_for_key', 'frame_size');
});
$VN_2.$def('frame=',function(self,_cmd,frame){
VN$(self, 'will_change_value_for_key', 'frame');
frame = VN$(self.$klass.$c_g_full('Rect'),'new',100,100,100,100);
VN$(self,'frame_origin=',VN$(frame,'origin'));
VN$(self,'frame_size=',VN$(frame,'size'));
if((e=self.$i_g('@posts_frame_changed_notifications'),e!==nil && e!==false)){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:','view chnages notification',self);
}
VN$(self, 'did_change_value_for_key', 'frame');
});
$VN_2.$def('frame',function(self,_cmd){
return self.$i_g('@frame');
});
$VN_2.$def('frame_rotation=',function(self,_cmd,angle){
VN$(self, 'will_change_value_for_key', 'frame_rotation');
VN$(self, 'did_change_value_for_key', 'frame_rotation');
});
$VN_2.$def('frame_rotation',function(self,_cmd){
return self.$i_g('@frame_rotation');
});
$VN_2.$def('frame_center_rotation=',function(self,_cmd,angle){
VN$(self, 'will_change_value_for_key', 'frame_center_rotation');
VN$(self, 'did_change_value_for_key', 'frame_center_rotation');
});
$VN_2.$def('frame_center_rotation',function(self,_cmd){
});
$VN_2.$def('bounds_origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'bounds_origin');
VN$(self, 'did_change_value_for_key', 'bounds_origin');
});
$VN_2.$def('bounds_size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'bounds_size');
VN$(self, 'did_change_value_for_key', 'bounds_size');
});
$VN_2.$def('bounds_rotation=',function(self,_cmd,angle){
VN$(self, 'will_change_value_for_key', 'bounds_rotation');
VN$(self, 'did_change_value_for_key', 'bounds_rotation');
});
$VN_2.$def('bounds_rotation',function(self,_cmd){
});
$VN_2.$def('translate_origin_to_point',function(self,_cmd,translation){
});
$VN_2.$def('rotate_by_angle',function(self,_cmd,angle){
});
$VN_2.$def('bounds=',function(self,_cmd,bounds){
VN$(self, 'will_change_value_for_key', 'bounds');
VN$(self, 'did_change_value_for_key', 'bounds');
});
$VN_2.$def('bounds',function(self,_cmd){
return self.$i_g('@bounds');
});
$VN_2.$def('flipped?',function(self,_cmd){
});
$VN_2.$def('rotated_from_base?',function(self,_cmd){
});
$VN_2.$def('rotated_or_scaled_from_base?',function(self,_cmd){
});
$VN_2.$def('opaque?',function(self,_cmd){
});
$VN_2.$def('convert_point:from_view:',function(self,_cmd,point,view){
});
$VN_2.$def('convert_point:to_view:',function(self,_cmd,point,view){
});
$VN_2.$def('convert_size:from_view:',function(self,_cmd,size,view){
});
$VN_2.$def('convert_size:to_view:',function(self,_cmd,size,view){
});
$VN_2.$def('convert_rect:from_view:',function(self,_cmd,rect,view){
});
$VN_2.$def('convert_rect:to_view:',function(self,_cmd,rect,view){
});
$VN_2.$def('convert_point_to_base',function(self,_cmd,point){
});
$VN_2.$def('convert_point_from_base',function(self,_cmd,point){
});
$VN_2.$def('convert_size_to_base',function(self,_cmd,size){
});
$VN_2.$def('convert_size_from_base',function(self,_cmd,size){
});
$VN_2.$def('convert_rect_to_base',function(self,_cmd,rect){
});
$VN_2.$def('convert_rect_from_base',function(self,_cmd,rect){
});
$VN_2.$def('can_draw?',function(self,_cmd){
});
$VN_2.$def('needs_display=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'needs_display');
self.$i_s('@needs_display',flag);
var graphics_context = VN$(self.$i_g('@window'),'graphics_context');
VN$(self.$klass.$c_g_full('GraphicsContext'),'current_context=',graphics_context);
VN$(graphics_context,'graphics_port=',VN$(self,'graphics_port'));
VN$(self,'puts','now showing graphics context');
VN$(self,'puts',graphics_context);
VN$(self,'draw_rect',VN$(self, 'bounds'));
VN$(self, 'did_change_value_for_key', 'needs_display');
});
$VN_2.$def('needs_display_in_rect',function(self,_cmd,invalid_rect){
return self.$i_g('@needs_display');
});
$VN_2.$def('needs_display?',function(self,_cmd){
return self.$i_g('@needs_display');
});
$VN_2.$def('lock_focus',function(self,_cmd){
});
$VN_2.$def('unlock_focus',function(self,_cmd){
});
$VN_2.$def_s('focus_view',function(self,_cmd){
});
$VN_2.$def('visible_rect',function(self,_cmd){
});
$VN_2.$def('display',function(self,_cmd){
if((e=self.$i_g('@needs_display'),e!==nil && e!==false)){
}
});
$VN_2.$def('draw_rect',function(self,_cmd,rect){
return VN$(self,'puts','drawing rect');
});
$VN_2.$def('view_will_draw',function(self,_cmd){
});
$VN_2.$def('hit_test',function(self,_cmd,point){
});
$VN_2.$def('mouse:in_rect:',function(self,_cmd,point,rect){
});
$VN_2.$def('add_tracking_area',function(self,_cmd,tracking_area){
if((e=VN$(self.$i_g('@tracking_areas'),'empty?'),e!==nil && e!==false)){
VN$(self.$i_g('@element'),'add_event_listener','mouseover',function() { console.log('OMG, mouse over!'); });
VN$(self.$i_g('@element'),'add_event_listener','mouseout',function() { console.log('OMG, mouse out of the element!'); });
}
return VN$(self.$i_g('@tracking_areas'),'<<',tracking_area);
});
$VN_2.$def('remove_tracking_area',function(self,_cmd,tracking_area){
});
$VN_2.$def('tracking_areas',function(self,_cmd){
return self.$i_g('@tracking_areas');
});
$VN_2.$def('update_tracking_areas',function(self,_cmd){
});
