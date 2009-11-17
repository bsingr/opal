(function(self) {
self.$c_s('AUTO_RESIZING_MASKS',VN.$h(ID2SYM('none'), 0x00, ID2SYM('min_x'), 0x01, ID2SYM('width'), 0x02, ID2SYM('max_x'), 0x04, ID2SYM('min_y'), 0x08, ID2SYM('height'), 0x10, ID2SYM('max_y'), 0x20));
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[]);
rb_funcall(self,'setup_display_context');
self.$i_s('@frame',frame);
self.$i_s('@bounds',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(frame,'width'),rb_funcall(frame,'height')));
rb_funcall(self,'frame=',frame);
self.$i_s('@subviews',[]);
self.$i_s('@window',nil);
self.$i_s('@superview',nil);
self.$i_s('@posts_frame_changed_notifications',false);
self.$i_s('@autoresizes_subviews',true);
self.$i_s('@autoresizing_mask',[]);
return self.$i_s('@tracking_areas',[]);
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
rb_funcall(self,'setup_display_context');
var view_flags=rb_funcall(coder,'decode_int',ID2SYM('view_flags'));
self.$i_s('@autoresizing_mask',[]);
var resize_mask=rb_funcall(view_flags,'&',0x3F);
rb_funcall(self.$klass.$c_g_full('AUTO_RESIZING_MASKS'),'each',function(sym,mask){
if(RTEST(rb_funcall((rb_funcall(resize_mask,'&',mask)),'nonzero?'))){
rb_funcall(rb_ivar_get(self,'@autoresizing_mask'),'<<',sym);
}
});
self.$i_s('@autoresizes_subviews',RTEST(rb_funcall((rb_funcall(view_flags,'&',0x100)),'nonzero?')) ? true : false);
self.$i_s('@frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0));
if(RTEST(rb_funcall(coder,'has_key?',ID2SYM('frame')))){
self.$i_s('@frame',rb_funcall(coder,'decode_rect',ID2SYM('frame')));
}
self.$i_s('@bounds',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@frame'),'width'),rb_funcall(rb_ivar_get(self,'@frame'),'height')));
self.$i_s('@posts_frame_changed_notifications',false);
self.$i_s('@tracking_areas',[]);
self.$i_s('@subviews',[]);
var subviews=rb_funcall(coder,'decode_object',ID2SYM('subviews'));
if(RTEST(subviews)){
rb_funcall(subviews,'each',function(subview){
return rb_funcall(self,'<<',subview);
});
}
return rb_funcall(self,'frame=',rb_ivar_get(self,'@frame'));
});
self.$def_s('build',function(self,_,options,block){
var view=rb_funcall(self,'new',rb_funcall(options,'[]',ID2SYM('frame')));
if(RTEST(block)){
arguments[arguments.length -1](view);
}
return view;
});
rb_define_method(self,'element',function(self,_){
return rb_ivar_get(self,'@element');
});
rb_define_method(self,'display_mode',function(self,_){
return ID2SYM('render');
});
rb_define_method(self,'setup_display_context',function(self,_){
if(RTEST(rb_funcall(rb_funcall(self,'display_mode'),'==',ID2SYM('render')))){
self.$i_s('@element',rb_funcall(self.$klass.$c_g_full('Element'),'new',ID2SYM('div'),nil));
rb_funcall(rb_ivar_get(self,'@element'),'css',VN.$h(ID2SYM('overflow'),'hidden'));
self.$i_s('@display_context',rb_funcall(self.$klass.$c_g_full('RenderContext'),'new',ID2SYM('div'),nil));
rb_funcall(rb_ivar_get(self,'@element'),'<<',rb_ivar_get(self,'@display_context'));
}
else{
self.$i_s('@element',rb_funcall(self.$klass.$c_g_full('Element'),'new',ID2SYM('div')));
self.$i_s('@display_context',rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'new'));
rb_funcall(rb_ivar_get(self,'@element'),'<<',rb_ivar_get(self,'@display_context'));
}
});
rb_define_method(self,'accepts_first_mouse',function(self,_,the_event){
return true;
});
rb_define_method(self,'accepts_first_responder',function(self,_){
return true;
});
rb_define_method(self,'graphics_port',function(self,_){
return rb_funcall(rb_ivar_get(self,'@display_context'),'element').getContext('2d');});
rb_define_method(self,'initialize_with_coder',function(self,_,coder){
});
rb_define_method(self,'initialize_with_builder',function(self,_,builder){
});
self.$def_s('display_properties',function(self,_){
});
rb_funcall(self,'display_properties',ID2SYM('frame'),ID2SYM('frame_size'));
rb_define_method(self,'did_change_value_for_key',function(self,_){
});
rb_define_method(self,'window',function(self,_){
});
rb_define_method(self,'superview',function(self,_){
});
rb_define_method(self,'subviews',function(self,_){
return rb_ivar_get(self,'@subviews');
});
rb_define_method(self,'descendant_of?',function(self,_,a_view){
});
rb_define_method(self,'ancestor_shared_with_view',function(self,_,a_view){
});
rb_define_method(self,'opaque_ancestor',function(self,_){
});
rb_define_method(self,'hidden=',function(self,_,flag){
});
rb_define_method(self,'hidden?',function(self,_){
});
rb_define_method(self,'hidden_or_has_hidden_ancestor?',function(self,_){
});
rb_define_method(self,'view_did_hide',function(self,_){
});
rb_define_method(self,'view_did_unhide',function(self,_){
});
rb_define_method(self,'subviews=',function(self,_,new_subviews){
});
rb_define_method(self,'add_subview',function(self,_,a_view){
if(RTEST(rb_funcall(rb_ivar_get(self,'@subviews'),'include?',a_view))){
return ;
}
rb_funcall(a_view,'remove_from_superview');
rb_funcall(a_view,'view_will_move_to_superview',self);
rb_funcall(a_view,'view_will_move_to_window',rb_ivar_get(self,'@window'));
rb_funcall(rb_ivar_get(self,'@subviews'),'<<',a_view);
rb_funcall(rb_ivar_get(self,'@element'),'<<',rb_funcall(a_view,'element'));
rb_funcall(a_view,'next_responder=',self);
rb_funcall(a_view,'view_did_move_to_superview');
rb_funcall(a_view,'view_did_move_to_window');
return rb_funcall(self,'did_add_subview',self);
});
rb_define_method(self,'<<',function(self,_,a_view){
return rb_funcall(self,'add_subview',a_view);
});
self.$def('add_subview:positioned:relative_to:',function(self,_,a_view,place,other_view){
});
rb_define_method(self,'view_will_move_to_window',function(self,_,win){
self.$i_s('@window',win);
return rb_funcall(rb_ivar_get(self,'@subviews'),'each',function(s){
return rb_funcall(s,'view_will_move_to_window',win);
});
});
rb_define_method(self,'view_did_move_to_window',function(self,_){
rb_funcall(rb_ivar_get(self,'@subviews'),'each',function(s){
return rb_funcall(s,'view_did_move_to_window');
});
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'view_will_move_to_superview',function(self,_,new_super){
return self.$i_s('@superview',new_super);
});
rb_define_method(self,'view_did_move_to_superview',function(self,_){
});
rb_define_method(self,'did_add_subview',function(self,_,subview){
});
rb_define_method(self,'will_remove_subview',function(self,_,subview){
});
rb_define_method(self,'remove_from_superview',function(self,_){
if(RTEST(rb_ivar_get(self,'@superview'))){
rb_funcall(rb_funcall(rb_ivar_get(self,'@superview'),'subviews'),'delete',self);
rb_funcall(rb_funcall(rb_ivar_get(self,'@superview'),'element'),'remove',rb_ivar_get(self,'@element'));
}
});
self.$def('replace_subview:with:',function(self,_,old_view,new_view){
});
rb_define_method(self,'posts_frame_changed_notifications=',function(self,_,flag){
});
rb_define_method(self,'posts_frame_changed_notifications?',function(self,_){
});
rb_define_method(self,'resize_subviews_with_old_size',function(self,_,size){
return rb_funcall(rb_ivar_get(self,'@subviews'),'each',function(subview){
return rb_funcall(subview,'resize_with_old_superview_size',size);
});
});
rb_define_method(self,'resize_with_old_superview_size',function(self,_,old){
var super_frame=rb_funcall(rb_ivar_get(self,'@superview'),'frame');
var this_frame=rb_funcall(rb_ivar_get(self,'@frame'),'copy');
var origin_changed=false;
var size_changed=false;
var mask=rb_ivar_get(self,'@autoresizing_mask');
if(RTEST(rb_funcall(mask,'include?',ID2SYM('min_x')))){
if(RTEST(rb_funcall(mask,'include?',ID2SYM('width')))){
if(RTEST(rb_funcall(mask,'include?',ID2SYM('max_x')))){
rb_funcall(this_frame,'x=',rb_funcall(rb_funcall(this_frame,'x'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',3))));
rb_funcall(this_frame,'width=',rb_funcall(rb_funcall(this_frame,'width'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',3))));
}
else{
rb_funcall(this_frame,'x=',rb_funcall(rb_funcall(this_frame,'x'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',2))));
rb_funcall(this_frame,'width=',rb_funcall(rb_funcall(this_frame,'width'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',2))));
}
size_changed=true;
origin_changed=true;
}
else if(RTEST(rb_funcall(mask,'include?',ID2SYM('max_x')))){
rb_funcall(this_frame,'x=',rb_funcall(rb_funcall(this_frame,'x'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',2))));
origin_changed=true;
}
else{
rb_funcall(this_frame,'x=',rb_funcall(rb_funcall(this_frame,'x'),'+',rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',2)));
origin_changed=true;
}
}
else if(RTEST(rb_funcall(mask,'include?',ID2SYM('width')))){
if(RTEST(rb_funcall(mask,'include?',ID2SYM('max_x')))){
rb_funcall(this_frame,'width=',rb_funcall(rb_funcall(this_frame,'width'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width'))),'/',2))));
}
else{
rb_funcall(this_frame,'width=',rb_funcall(rb_funcall(this_frame,'width'),'+',(rb_funcall(rb_funcall(super_frame,'width'),'-',rb_funcall(old,'width')))));
}
size_changed=true;
}
if(RTEST(rb_funcall(mask,'include?',ID2SYM('min_y')))){
if(RTEST(rb_funcall(mask,'include?',ID2SYM('height')))){
if(RTEST(rb_funcall(mask,'include?',ID2SYM('max_y')))){
rb_funcall(this_frame,'y=',rb_funcall(rb_funcall(this_frame,'y'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',3))));
rb_funcall(this_frame,'height=',rb_funcall(rb_funcall(this_frame,'height'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',3))));
}
else{
rb_funcall(this_frame,'y=',rb_funcall(rb_funcall(this_frame,'y'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',2))));
rb_funcall(this_frame,'height=',rb_funcall(rb_funcall(this_frame,'height'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',2))));
}
size_changed=true;
origin_changed=true;
}
else if(RTEST(rb_funcall(mask,'include?',ID2SYM('max_y')))){
rb_funcall(this_frame,'y=',rb_funcall(rb_funcall(this_frame,'y'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',2))));
origin_changed=true;
}
else{
rb_funcall(this_frame,'y=',rb_funcall(rb_funcall(this_frame,'y'),'+',rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',2)));
origin_changed=true;
}
}
else if(RTEST(rb_funcall(mask,'include?',ID2SYM('height')))){
if(RTEST(rb_funcall(mask,'include?',ID2SYM('max_y')))){
rb_funcall(this_frame,'height=',rb_funcall(rb_funcall(this_frame,'height'),'+',(rb_funcall((rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height'))),'/',2))));
}
else{
rb_funcall(this_frame,'height=',rb_funcall(rb_funcall(this_frame,'height'),'+',(rb_funcall(rb_funcall(super_frame,'height'),'-',rb_funcall(old,'height')))));
}
size_changed=true;
}
if(RTEST(ORTEST(size_changed,origin_changed))){
rb_funcall(self,'frame=',this_frame);
}
});
rb_define_method(self,'autoresizes_subviews=',function(self,_,flag){
return self.$i_s('@autoresizes_subviews',flag);
});
rb_define_method(self,'autoresizes_subviews?',function(self,_){
return rb_ivar_get(self,'@autoresizes_subviews');
});
rb_define_method(self,'autoresizing_mask=',function(self,_,mask){
if(RTEST(rb_funcall(mask,'is_a?',self.$klass.$c_g_full('Array')))){
self.$i_s('@autoresizing_mask',mask);
}
else{
self.$i_s('@autoresizing_mask',[mask]);
}
});
rb_define_method(self,'autoresizing_mask',function(self,_){
return rb_ivar_get(self,'@autoresizing_mask');
});
rb_define_method(self,'frame_origin=',function(self,_,new_origin){
rb_funcall(rb_ivar_get(self,'@frame'),'x=',rb_funcall(new_origin,'x'));
rb_funcall(rb_ivar_get(self,'@frame'),'y=',rb_funcall(new_origin,'y'));
rb_funcall(rb_ivar_get(self,'@element'),'origin=',new_origin);
if(RTEST(rb_ivar_get(self,'@posts_frame_changed_notifications'))){
var nc=rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center');
rb_funcall(nc,'post_notification_name:object:','frame chnage notification',self);
}
});
rb_define_method(self,'frame_size=',function(self,_,new_size){
var old_size=rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_funcall(rb_ivar_get(self,'@frame'),'width'),rb_funcall(rb_ivar_get(self,'@frame'),'height'));
rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'size'),'width=',rb_funcall(new_size,'width'));
rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'size'),'height=',rb_funcall(new_size,'height'));
rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'size'),'width=',rb_funcall(new_size,'width'));
rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'size'),'height=',rb_funcall(new_size,'height'));
rb_funcall(self,'needs_display=',true);
rb_funcall(rb_ivar_get(self,'@element'),'size=',new_size);
rb_funcall(rb_ivar_get(self,'@display_context'),'size=',new_size);
if(RTEST(rb_ivar_get(self,'@autoresizes_subviews'))){
rb_funcall(self,'resize_subviews_with_old_size',old_size);
}
if(RTEST(rb_ivar_get(self,'@posts_frame_changed_notifications'))){
var nc=rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center');
rb_funcall(nc,'post_notification_name:object:','frame chnage notification',self);
}
});
rb_define_method(self,'frame=',function(self,_,frame){
rb_funcall(self,'frame_origin=',rb_funcall(frame,'origin'));
rb_funcall(self,'frame_size=',rb_funcall(frame,'size'));
if(RTEST(rb_ivar_get(self,'@posts_frame_changed_notifications'))){
var nc=rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center');
rb_funcall(nc,'post_notification_name:object:','view chnages notification',self);
}
});
rb_define_method(self,'frame',function(self,_){
return rb_ivar_get(self,'@frame');
});
rb_define_method(self,'frame_rotation=',function(self,_,angle){
});
rb_define_method(self,'frame_rotation',function(self,_){
return rb_ivar_get(self,'@frame_rotation');
});
rb_define_method(self,'frame_center_rotation=',function(self,_,angle){
});
rb_define_method(self,'frame_center_rotation',function(self,_){
});
rb_define_method(self,'bounds_origin=',function(self,_,new_origin){
});
rb_define_method(self,'bounds_size=',function(self,_,new_size){
});
rb_define_method(self,'bounds_rotation=',function(self,_,angle){
});
rb_define_method(self,'bounds_rotation',function(self,_){
});
rb_define_method(self,'translate_origin_to_point',function(self,_,translation){
});
rb_define_method(self,'rotate_by_angle',function(self,_,angle){
});
rb_define_method(self,'bounds=',function(self,_,bounds){
});
rb_define_method(self,'bounds',function(self,_){
return rb_ivar_get(self,'@bounds');
});
rb_define_method(self,'flipped?',function(self,_){
});
rb_define_method(self,'rotated_from_base?',function(self,_){
});
rb_define_method(self,'rotated_or_scaled_from_base?',function(self,_){
});
rb_define_method(self,'opaque?',function(self,_){
});
self.$def('convert_point:from_view:',function(self,_,point,view){
if(!RTEST(view)){
return rb_funcall(self,'convert_point_from_base',point);
}
return rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall(rb_funcall(point,'x'),'-',rb_funcall(rb_ivar_get(self,'@frame'),'x')),rb_funcall(rb_funcall(point,'y'),'-',rb_funcall(rb_ivar_get(self,'@frame'),'y')));
});
self.$def('convert_point:to_view:',function(self,_,point,view){
});
self.$def('convert_size:from_view:',function(self,_,size,view){
});
self.$def('convert_size:to_view:',function(self,_,size,view){
});
self.$def('convert_rect:from_view:',function(self,_,rect,view){
});
self.$def('convert_rect:to_view:',function(self,_,rect,view){
});
rb_define_method(self,'convert_point_to_base',function(self,_,point){
});
rb_define_method(self,'convert_point_from_base',function(self,_,point){
if(RTEST(rb_ivar_get(self,'@superview'))){
return rb_funcall(rb_ivar_get(self,'@superview'),'convert_point_from_base',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall(rb_funcall(point,'x'),'-',rb_funcall(rb_ivar_get(self,'@frame'),'x')),rb_funcall(rb_funcall(point,'y'),'-',rb_funcall(rb_ivar_get(self,'@frame'),'y'))));
}
else{
return point;
}
});
rb_define_method(self,'convert_size_to_base',function(self,_,size){
});
rb_define_method(self,'convert_size_from_base',function(self,_,size){
});
rb_define_method(self,'convert_rect_to_base',function(self,_,rect){
});
rb_define_method(self,'convert_rect_from_base',function(self,_,rect){
});
rb_define_method(self,'can_draw?',function(self,_){
});
rb_define_method(self,'needs_display=',function(self,_,flag){
if(!RTEST(rb_ivar_get(self,'@window'))){
return ;
}
return rb_funcall(self,'display');
});
rb_define_method(self,'needs_display_in_rect',function(self,_,invalid_rect){
return rb_ivar_get(self,'@needs_display');
});
rb_define_method(self,'needs_display?',function(self,_){
return rb_ivar_get(self,'@needs_display');
});
rb_define_method(self,'lock_focus',function(self,_){
rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context=',rb_ivar_get(self,'@display_context'));
rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context=',rb_ivar_get(self,'@display_context'));
if(!RTEST(rb_funcall(rb_funcall(self,'display_mode'),'==',ID2SYM('render')))){
rb_funcall(rb_ivar_get(self,'@display_context'),'graphics_port').clearRect(0, 0, rb_funcall(rb_funcall(self,'bounds'),'width'), rb_funcall(rb_funcall(self,'bounds'),'height'));}
else{
}
});
rb_define_method(self,'unlock_focus',function(self,_){
});
self.$def_s('focus_view',function(self,_){
});
rb_define_method(self,'visible_rect',function(self,_){
});
rb_define_method(self,'display',function(self,_){
if(!RTEST(rb_ivar_get(self,'@window'))){
return ;
}
rb_funcall(self,'view_will_draw');
if(RTEST(rb_funcall(rb_funcall(self,'display_mode'),'==',ID2SYM('render')))){
rb_funcall(self,'lock_focus');
rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context=',rb_ivar_get(self,'@display_context'));
rb_funcall(self,'render',rb_ivar_get(self,'@display_context'));
rb_funcall(rb_ivar_get(self,'@display_context'),'first_time=',false);
rb_funcall(self,'unlock_focus');
}
else{
rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context=',rb_ivar_get(self,'@display_context'));
rb_funcall(self,'draw_rect',rb_funcall(self,'bounds'));
}
});
rb_define_method(self,'render',function(self,_,context){
});
rb_define_method(self,'draw_rect',function(self,_,rect){
});
rb_define_method(self,'view_will_draw',function(self,_){
});
rb_define_method(self,'hit_test',function(self,_,point){
point=rb_funcall(self,'convert_point:from_view:',point,rb_ivar_get(self,'@superview'));
if(!RTEST(rb_funcall(point,'in_rect?',rb_funcall(self,'bounds')))){
return nil;
}
var count=rb_funcall(rb_ivar_get(self,'@subviews'),'length');
var i=0;
for (i = 0; i < count; i++) {var view_to_check=rb_funcall(rb_ivar_get(self,'@subviews'),'[]',i);
var hit_test=rb_funcall(view_to_check,'hit_test',point);
if(RTEST(hit_test)){
return hit_test;
}
}return self;
});
self.$def('mouse:in_rect:',function(self,_,point,rect){
});
rb_define_method(self,'add_tracking_area',function(self,_,tracking_area){
if(RTEST(rb_funcall(rb_ivar_get(self,'@tracking_areas'),'empty?'))){
rb_funcall(rb_ivar_get(self,'@element'),'add_event_listener',ID2SYM('mouseover'),function(evt){
});
rb_funcall(rb_ivar_get(self,'@element'),'add_event_listener',ID2SYM('mouseout'),function(evt){
});
}
return rb_funcall(rb_ivar_get(self,'@tracking_areas'),'<<',tracking_area);
});
rb_define_method(self,'remove_tracking_area',function(self,_,tracking_area){
});
rb_define_method(self,'tracking_areas',function(self,_){
return rb_ivar_get(self,'@tracking_areas');
});
rb_define_method(self,'update_tracking_areas',function(self,_){
});
})(rb_define_class_under(self,'View',self.$c_g_full('Responder')));
})(rb_define_module('Vienna'));
