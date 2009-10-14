var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'View',$VN_2.$c_g_full('Responder'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$(self,'puts','initialising view');
VN$sup(arguments.callee, self,_cmd,[]);
return VN$(self,'setup_drawing_context');
});
$VN_2.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_2.$def('display_mode',function(self,_cmd){
return VN$(self.$klass.$c_g_full('Vienna'),'display_mode');
});
$VN_2.$def('setup_display_context',function(self,_cmd){
if((e=VN$(VN$(self, 'drawing_mode'),'==','render'),e!==nil && e!==false)){
VN$(self, 'setup_render_context');
}
else{
VN$(self, 'setup_drawing_context');
}
});
$VN_2.$def('setup_drawing_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@draw_element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','canvas','',''));
VN$(self.$i_g('@element'),'<<',self.$i_g('@draw_element'));
return VN$(self.$klass.$c_g_full('Document'),'<<',self.$i_g('@element'));
});
$VN_2.$def('setup_render_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
self.$i_s('@draw_element',VN$(self.$klass.$c_g_full('Element'),'element_with_type:class_name:id:','div','',''));
VN$(self.$i_g('@element'),'<<',self.$i_g('@draw_element'));
return VN$(self.$klass.$c_g_full('Document'),'<<',self.$i_g('@element'));
});
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
return VN$(self.$i_g('@element'),'<<',VN$(a_view,'element'));
});
$VN_2.$def('<<',function(self,_cmd,a_view){
return VN$(self,'add_subview',a_view);
});
$VN_2.$def('add_subview:positioned:relative_to:',function(self,_cmd,a_view,place,other_view){
});
$VN_2.$def('view_will_move_to_window',function(self,_cmd,win){
});
$VN_2.$def('view_did_move_to_window',function(self,_cmd){
});
$VN_2.$def('view_will_move_to_superview',function(self,_cmd,new_super){
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
VN$(self, 'did_change_value_for_key', 'frame_origin');
});
$VN_2.$def('frame_size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'frame_size');
VN$(self, 'did_change_value_for_key', 'frame_size');
});
$VN_2.$def('frame=',function(self,_cmd,frame){
VN$(self, 'will_change_value_for_key', 'frame');
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
});
$VN_2.$def('view_will_draw',function(self,_cmd){
});
$VN_2.$def('hit_test',function(self,_cmd,point){
});
$VN_2.$def('mouse:in_rect:',function(self,_cmd,point,rect){
});
