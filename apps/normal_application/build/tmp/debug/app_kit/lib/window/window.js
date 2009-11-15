
VN.require('/Users/adam/Development/vienna/apps/normal_application/build/tmp/debug/app_kit/lib/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/normal_application/build/tmp/debug/app_kit/lib/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/normal_application/build/tmp/debug/app_kit/lib/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/normal_application/build/tmp/debug/app_kit/lib/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(ID2SYM('borderless'), 0, ID2SYM('titled'), rb_funcall((1),'<<',0), ID2SYM('closable'), rb_funcall((1),'<<',1), ID2SYM('miniaturizable'), rb_funcall((1),'<<',2), ID2SYM('resizable'), rb_funcall((1),'<<',3), ID2SYM('textured_background'), rb_funcall((1),'<<',8), ID2SYM('unified_title_and_toolbar'), rb_funcall((1),'<<',12), ID2SYM('close_button'), 1, ID2SYM('miniaturize_button'), 1, ID2SYM('zoom_button'), 1, ID2SYM('toolbar_button'), 1, ID2SYM('document_icon_button'), 1, ID2SYM('utility'), rb_funcall((1),'<<',4), ID2SYM('doc_modal'), rb_funcall((1),'<<',6), ID2SYM('hud'), rb_funcall((1),'<<',13)));
self.$c_s('WINDOW_LEVELS',VN.$h(ID2SYM('normal'), 0, ID2SYM('floating'), 0, ID2SYM('submenu'), 0, ID2SYM('torn_off_menu'), 0, ID2SYM('main_menu'), 0, ID2SYM('status'), 0, ID2SYM('modal_panel'), 0, ID2SYM('pop_up_menu'), 0, ID2SYM('screen_saver'), 0));
(function(self) {
rb_define_method(self,'initialize',function(self,_,content_rect,style_mask){
return rb_funcall(self,'init_with_content_rect:style_mask:',content_rect,style_mask);
});
self.$def('init_with_content_rect:style_mask:',function(self,_,content_rect,style_mask){
rb_funcall(self,'setup_display_context');
self.$i_s('@frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0));
self.$i_s('@window_number',rb_funcall(self.$klass.$c_g_full('App'),'add_window',self));
self.$i_s('@style_mask',style_mask);
rb_funcall(self,'level=',ID2SYM('normal'));
self.$i_s('@min_size',rb_funcall(self.$klass.$c_g_full('Size'),'new',0.0,0.0));
self.$i_s('@max_size',rb_funcall(self.$klass.$c_g_full('Size'),'new',9999.0,9999.0));
self.$i_s('@first_responder',self);
self.$i_s('@next_responder',self.$klass.$c_g_full('App'));
rb_funcall(self,'setup_window_view');
rb_funcall(self,'frame=',content_rect);
rb_funcall(rb_ivar_get(self,'@window_view'),'needs_display=',true);
rb_funcall(self,'content_view=',rb_funcall(self.$klass.$c_g_full('View'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@frame'),'width'),rb_funcall(rb_ivar_get(self,'@frame'),'height'))));
return self;
});
self.$def_s('build',function(self,_,options,block){
var win=rb_funcall(rb_funcall(self,'alloc'),'init_with_content_rect:style_mask:',rb_funcall(options,'[]',ID2SYM('frame')),[ID2SYM('titled'),ID2SYM('closable')]);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
rb_define_method(self,'setup_display_context',function(self,_){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full('ENV'),'[]',ID2SYM('platform')),'==',ID2SYM('browser')))){
}
self.$i_s('@element',rb_funcall(self.$klass.$c_g_full('Element'),'new',ID2SYM('div')));
self.$i_s('@display_context',rb_funcall(self.$klass.$c_g_full('RenderContext'),'new',ID2SYM('div')));
rb_funcall(rb_ivar_get(self,'@element'),'<<',rb_ivar_get(self,'@display_context'));
return rb_funcall(self.$klass.$c_g_full('Document'),'<<',rb_ivar_get(self,'@element'));
});
rb_define_method(self,'setup_window_view',function(self,_){
var view_class=rb_funcall(self,'_window_view_class_for_style_mask',rb_ivar_get(self,'@style_mask'));
self.$i_s('@window_view',rb_funcall(view_class,'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,100,100),rb_ivar_get(self,'@style_mask')));
rb_funcall(rb_ivar_get(self,'@window_view'),'view_will_move_to_window',self);
rb_funcall(rb_ivar_get(self,'@window_view'),'next_responder=',self);
rb_funcall(rb_ivar_get(self,'@element'),'<<',rb_funcall(rb_ivar_get(self,'@window_view'),'element'));
rb_funcall(rb_ivar_get(self,'@window_view'),'view_did_move_to_window');
rb_funcall(rb_ivar_get(self,'@window_view'),'needs_display=',true);
rb_funcall(rb_funcall(rb_ivar_get(self,'@window_view'),'element'),'add_event_listener',ID2SYM('mousedown'),function(event){
var the_event=rb_funcall(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',event,self,ID2SYM('left_mouse_down'));
rb_funcall(self.$klass.$c_g_full('App'),'send_event',the_event);
if(!RTEST(rb_funcall(the_event,'allows_propagation?'))){
}
});
return rb_funcall(rb_funcall(rb_ivar_get(self,'@window_view'),'element'),'add_event_listener',ID2SYM('mouseup'),function(event){
var the_event=rb_funcall(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',event,self,ID2SYM('left_mouse_up'));
rb_funcall(self.$klass.$c_g_full('App'),'send_event',the_event);
if(!RTEST(rb_funcall(the_event,'allows_propagation?'))){
}
});
});
rb_define_method(self,'_window_view_class_for_style_mask',function(self,_,style_mask){
if(RTEST(rb_funcall(style_mask,'include?',ID2SYM('borderless')))){
return self.$klass.$c_g_full('BorderlessWindowView');
}
else if(RTEST(rb_funcall(style_mask,'include?',ID2SYM('hud')))){
return self.$klass.$c_g_full('HUDWindowView');
}
else{
return self.$klass.$c_g_full('NormalWindowView');
}
});
self.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_,rect,style){
});
self.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_,rect,style){
});
self.$def_s('min_frame_width_with_title:style_mask:',function(self,_,title,style){
});
rb_define_method(self,'frame_rect_for_content_rect',function(self,_,rect){
});
rb_define_method(self,'content_rect_for_frame_rect',function(self,_,rect){
return rect;
});
rb_define_method(self,'title',function(self,_){
return rb_ivar_get(self,'@title');
});
rb_define_method(self,'title=',function(self,_,str){
return self.$i_s('@title',str);
});
rb_define_method(self,'represnted_url=',function(self,_,str){
});
rb_define_method(self,'represented_url',function(self,_){
});
rb_define_method(self,'represented_filename',function(self,_){
});
rb_define_method(self,'represented_filename=',function(self,_,filename){
});
rb_define_method(self,'set_title_with_represented_filename',function(self,_,filename){
});
rb_define_method(self,'excluded_from_windows_menu=',function(self,_,flag){
return self.$i_s('@excluded_from_windows_menu',flag);
});
rb_define_method(self,'excluded_from_windows_menu?',function(self,_){
return rb_ivar_get(self,'@excluded_from_windows_menu');
});
rb_define_method(self,'content_view=',function(self,_,view){
if(RTEST(rb_ivar_get(self,'@content_view'))){
rb_funcall(rb_ivar_get(self,'@content_view'),'remove_from_superview');
}
rb_funcall(view,'view_will_move_to_window',self);
var bounds=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'size'),'width'),rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'size'),'height'));
self.$i_s('@content_view',view);
rb_funcall(rb_ivar_get(self,'@content_view'),'frame=',rb_funcall(self,'content_rect_for_frame_rect',bounds));
rb_funcall(rb_ivar_get(self,'@content_view'),'autoresizing_mask=',[ID2SYM('width'),ID2SYM('height')]);
rb_funcall(view,'view_did_move_to_window');
return rb_funcall(rb_ivar_get(self,'@window_view'),'<<',rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'content_view',function(self,_){
return rb_ivar_get(self,'@content_view');
});
rb_define_method(self,'<<',function(self,_,view){
return rb_funcall(rb_ivar_get(self,'@content_view'),'<<',view);
});
rb_define_method(self,'delegate=',function(self,_,obj){
return self.$i_s('@delegate',obj);
});
rb_define_method(self,'delegate',function(self,_){
});
rb_define_method(self,'window_number',function(self,_){
return rb_ivar_get(self,'@window_number');
});
rb_define_method(self,'style_mask',function(self,_){
return rb_ivar_get(self,'@style_mask');
});
rb_define_method(self,'style_mask=',function(self,_,mask){
return self.$i_s('@style_mask',mask);
});
self.$def('field_editor:for_object:',function(self,_,create_flag,obj){
});
rb_define_method(self,'end_editing_for',function(self,_,obj){
});
rb_define_method(self,'content_size=',function(self,_,size){
});
rb_define_method(self,'frame_top_left_point=',function(self,_,point){
});
rb_define_method(self,'cascade_top_left_from_point',function(self,_,point){
});
rb_define_method(self,'frame',function(self,_){
return rb_ivar_get(self,'@frame');
});
rb_define_method(self,'frame=',function(self,_,frame){
return rb_funcall(self,'set_frame:display:animate:',frame,true,false);
});
self.$def('set_frame:display:',function(self,_,frame_rect,flag){
return rb_funcall(self,'set_frame:display:animate:',frame_rect,flag,false);
});
self.$def('set_frame:display:animate:',function(self,_,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin=rb_funcall(rb_ivar_get(self,'@frame'),'origin');
var size=rb_funcall(rb_ivar_get(self,'@frame'),'size');
var new_origin=rb_funcall(frame_rect,'origin');
var new_size=rb_funcall(frame_rect,'size');
if(!RTEST(rb_funcall(origin,'eql?',new_origin))){
rb_funcall(origin,'x=',rb_funcall(new_origin,'x'));
rb_funcall(origin,'y=',rb_funcall(new_origin,'y'));
rb_funcall(rb_ivar_get(self,'@element'),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did move',self);
}
if(!RTEST(rb_funcall(size,'eql?',new_size))){
rb_funcall(size,'width=',rb_funcall(new_size,'width'));
rb_funcall(size,'height=',rb_funcall(new_size,'height'));
rb_funcall(rb_ivar_get(self,'@window_view'),'frame_size=',size);
rb_funcall(rb_ivar_get(self,'@element'),'size=',size);
rb_funcall(rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did resize',self);
}
}
});
rb_define_method(self,'frame_origin=',function(self,_,origin){
if(!RTEST(rb_funcall(origin,'eql?',rb_funcall(rb_ivar_get(self,'@frame'),'origin')))){
rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'origin'),'x=',rb_funcall(origin,'x'));
rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'origin'),'y=',rb_funcall(origin,'y'));
rb_funcall(rb_ivar_get(self,'@element'),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did move',self);
}
});
rb_define_method(self,'animation_resize_time',function(self,_,new_frame){
});
rb_define_method(self,'in_live_resize?',function(self,_){
});
rb_define_method(self,'shows_resize_indicator=',function(self,_,show){
return self.$i_s('@shows_resize_indicator',show);
});
rb_define_method(self,'shows_resize_indicator?',function(self,_){
return rb_ivar_get(self,'@shows_resize_indicator');
});
rb_define_method(self,'resize_increments=',function(self,_,increments){
return self.$i_s('@resize_increments',increments);
});
rb_define_method(self,'resize_incremenets',function(self,_){
return rb_ivar_get(self,'@resize_increments');
});
rb_define_method(self,'aspect_ratio=',function(self,_,ratio){
return self.$i_s('@aspect_ratio',ratio);
});
rb_define_method(self,'aspect_ratio',function(self,_){
return rb_ivar_get(self,'@aspect_ratio');
});
rb_define_method(self,'display',function(self,_){
});
rb_define_method(self,'preserves_content_during_live_resize?',function(self,_){
return rb_ivar_get(self,'@preserves_content_during_live_resize');
});
rb_define_method(self,'preserves_content_during_live_resize=',function(self,_,flag){
return self.$i_s('@preserves_content_during_live_resize',flag);
});
rb_define_method(self,'update',function(self,_){
});
rb_define_method(self,'make_first_responder',function(self,_,responder){
if(RTEST(rb_funcall(rb_ivar_get(self,'@first_responder'),'==',responder))){
return true;
}
if(!RTEST(rb_funcall(rb_ivar_get(self,'@first_responder'),'resign_first_responder'))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(rb_funcall(responder,'accepts_first_responder')),NOTTEST(rb_funcall(responder,'become_first_responder')))))){
self.$i_s('@first_responder',self);
rb_funcall(self,'puts','Cant make responder the first responder :(');
return false;
}
self.$i_s('@first_responder',responder);
return true;
});
rb_define_method(self,'first_responder',function(self,_){
});
rb_define_method(self,'resize_flags',function(self,_){
});
rb_define_method(self,'key_down',function(self,_,the_event){
});
rb_define_method(self,'close',function(self,_){
});
rb_define_method(self,'released_when_closed=',function(self,_,flag){
return self.$i_s('@released_when_closed',flag);
});
rb_define_method(self,'released_when_closed?',function(self,_){
return rb_ivar_get(self,'@released_when_closed');
});
rb_define_method(self,'miniaturize',function(self,_,sender){
});
rb_define_method(self,'deminiaturize',function(self,_,sender){
});
rb_define_method(self,'zoomed?',function(self,_){
return rb_ivar_get(self,'@zoomed');
});
rb_define_method(self,'zoom',function(self,_,sender){
});
rb_define_method(self,'miniaturized?',function(self,_){
return rb_ivar_get(self,'@miniaturized');
});
self.$def('try_to_perform:with:',function(self,_,action,object){
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'movable=',function(self,_,flag){
return self.$i_s('@movable',flag);
});
rb_define_method(self,'movable?',function(self,_){
return rb_ivar_get(self,'@movable');
});
rb_define_method(self,'movable_by_window_background=',function(self,_,flag){
return rb_ivar_get(self,'@movable_by_window_background');
});
rb_define_method(self,'movable_by_window_background?',function(self,_){
return rb_ivar_get(self,'@movable_by_window_background');
});
rb_define_method(self,'hides_on_deactivate=',function(self,_,flag){
return self.$i_s('@hides_on_deactivate',flag);
});
rb_define_method(self,'hides_on_deactivate?',function(self,_){
return rb_ivar_get(self,'@hides_on_deactivate');
});
rb_define_method(self,'center',function(self,_){
});
rb_define_method(self,'make_key_and_order_front',function(self,_,sender){
rb_funcall(self,'order_front',self);
rb_funcall(self,'make_key_window');
return rb_funcall(self,'make_main_window');
});
rb_define_method(self,'order_front',function(self,_,sender){
});
rb_define_method(self,'order_back',function(self,_,sender){
});
rb_define_method(self,'order_out',function(self,_,sender){
});
self.$def('order_window:relative_to:',function(self,_,place,other_win){
});
rb_define_method(self,'order_front_regardless',function(self,_){
});
rb_define_method(self,'document_edited=',function(self,_,flag){
return self.$i_s('@document_edited',flag);
});
rb_define_method(self,'document_edited?',function(self,_){
return rb_ivar_get(self,'@document_edited');
});
rb_define_method(self,'visible?',function(self,_){
return rb_ivar_get(self,'@visible');
});
rb_define_method(self,'key_window?',function(self,_){
return rb_ivar_get(self,'@key_window');
});
rb_define_method(self,'main_window?',function(self,_){
return rb_ivar_get(self,'@main_window');
});
rb_define_method(self,'can_become_key_window?',function(self,_){
});
rb_define_method(self,'can_become_main_window?',function(self,_){
});
rb_define_method(self,'make_key_window',function(self,_){
});
rb_define_method(self,'make_main_window',function(self,_){
});
rb_define_method(self,'become_key_window',function(self,_){
});
rb_define_method(self,'become_main_window',function(self,_){
});
rb_define_method(self,'resign_key_window',function(self,_){
});
rb_define_method(self,'resign_main_window',function(self,_){
});
rb_define_method(self,'works_when_modal?',function(self,_){
});
rb_define_method(self,'convert_base_to_screen',function(self,_,point){
return rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall(rb_funcall(point,'x'),'+',rb_funcall(rb_ivar_get(self,'@frame'),'x')),rb_funcall(rb_funcall(point,'y'),'+',rb_funcall(rb_ivar_get(self,'@frame'),'y')));
});
rb_define_method(self,'convert_screen_to_base',function(self,_,point){
var res=rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall(rb_funcall(point,'x'),'-',rb_funcall(rb_ivar_get(self,'@frame'),'x')),rb_funcall(rb_funcall(point,'y'),'-',rb_funcall(rb_ivar_get(self,'@frame'),'y')));
return res;
});
rb_define_method(self,'perform_close',function(self,_,sender){
});
rb_define_method(self,'perform_miniaturize',function(self,_,sender){
});
rb_define_method(self,'perform_zoom',function(self,_,sender){
});
rb_define_method(self,'level=',function(self,_,level){
self.$i_s('@level',level);
return rb_funcall(rb_ivar_get(self,'@element'),'css',VN.$h(ID2SYM('z_index'),rb_funcall(self.$klass.$c_g_full('WINDOW_LEVELS'),'[]',level)));
});
rb_define_method(self,'level',function(self,_){
return rb_ivar_get(self,'@level');
});
rb_define_method(self,'has_shadow=',function(self,_,flag){
return self.$i_s('@has_shadow',flag);
});
rb_define_method(self,'has_shadow?',function(self,_){
return rb_ivar_get(self,'@has_shadow');
});
rb_define_method(self,'min_size',function(self,_){
return rb_ivar_get(self,'@min_size');
});
rb_define_method(self,'max_size',function(self,_){
return rb_ivar_get(self,'@max_size');
});
rb_define_method(self,'min_size=',function(self,_,size){
return self.$i_s('@min_size',size);
});
rb_define_method(self,'max_size=',function(self,_,size){
return self.$i_s('@max_size',size);
});
rb_define_method(self,'next_event_matching_mask',function(self,_,mask){
});
self.$def('post_event:at_start:',function(self,_,event,flag){
});
rb_define_method(self,'current_event',function(self,_){
return rb_ivar_get(self,'@current_event');
});
rb_define_method(self,'accepts_mouse_moved_events=',function(self,_,flag){
return self.$i_s('@accepts_mouse_moved_events',flag);
});
rb_define_method(self,'accepts_mouse_moved_events?',function(self,_){
return rb_ivar_get(self,'@accepts_mouse_moved_events');
});
rb_define_method(self,'ignores_mouse_events=',function(self,_,flag){
return self.$i_s('@ignores_mouse_events',flag);
});
rb_define_method(self,'ignores_mouse_events?',function(self,_){
return rb_ivar_get(self,'@ignores_mouse_events');
});
rb_define_method(self,'send_event',function(self,_,event){
var point=rb_funcall(event,'location_in_window');
return (function($v){
if(($e = rb_funcall(ID2SYM('key_up'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','key_up');
}
else if(($e = rb_funcall(ID2SYM('key_down'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','key_down');
}
else if(($e = rb_funcall(ID2SYM('left_mouse_down'), '===', $v),$e!==nil && $e!==false)){
var hit_test=rb_funcall(rb_ivar_get(self,'@window_view'),'hit_test',point);
if(RTEST(ANDTEST(rb_funcall(hit_test,'!=',rb_ivar_get(self,'@first_responder')),rb_funcall(hit_test,'accepts_first_responder')))){
rb_funcall(self,'make_first_responder',hit_test);
}
rb_funcall(self,'make_key_and_order_front',self);
if(RTEST(rb_funcall(hit_test,'accepts_first_mouse',event))){
return rb_funcall(hit_test,'mouse_down',event);
}
}
else if(($e = rb_funcall(ID2SYM('left_mouse_up'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','left_mouse_up');
}
else if(($e = rb_funcall(ID2SYM('left_mouse_dragged'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','left_mouse_dragged');
}
else if(($e = rb_funcall(ID2SYM('scroll_wheel'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','scroll_wheel');
}
else if(($e = rb_funcall(ID2SYM('right_mouse_down'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','right_mouse_down');
}
else if(($e = rb_funcall(ID2SYM('right_mouse_up'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','right_mouse_up');
}
else if(($e = rb_funcall(ID2SYM('right_mouse_dragged'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'puts','right_mouse_dragged');
}
})(rb_funcall(event,'type'));
});
rb_define_method(self,'window_controller',function(self,_){
return rb_ivar_get(self,'@window_controller');
});
rb_define_method(self,'window_controller=',function(self,_,controller){
return self.$i_s('@window_controller',controller);
});
rb_define_method(self,'sheet?',function(self,_){
return rb_ivar_get(self,'@sheet');
});
rb_define_method(self,'attatched_sheet',function(self,_){
return rb_ivar_get(self,'@attached_sheet');
});
self.$def('add_child_window:ordered:',function(self,_,win,place){
});
rb_define_method(self,'remove_child_window',function(self,_,win){
});
rb_define_method(self,'child_windows',function(self,_){
return rb_ivar_get(self,'@child_windows');
});
rb_define_method(self,'parent_window',function(self,_){
return rb_ivar_get(self,'@parent_window');
});
rb_define_method(self,'parent_window=',function(self,_,win){
return self.$i_s('@parent_window',win);
});
rb_define_method(self,'graphics_context',function(self,_){
return rb_ivar_get(self,'@graphics_context');
});
rb_define_method(self,'initial_first_responder=',function(self,_,view){
return self.$i_s('@initial_first_responder',view);
});
rb_define_method(self,'initial_first_responder',function(self,_){
return rb_ivar_get(self,'@initial_first_responder');
});
rb_define_method(self,'select_next_key_view',function(self,_,sender){
});
rb_define_method(self,'select_previous_key_view',function(self,_,sender){
});
rb_define_method(self,'select_key_view_following_view',function(self,_,view){
});
rb_define_method(self,'select_key_view_preceding_view',function(self,_,view){
});
rb_define_method(self,'autorecalculates_key_view_loop',function(self,_,flag){
return self.$i_s('@autorecalculates_key_view_loop',flag);
});
rb_define_method(self,'autorecalculates_key_view_loop?',function(self,_){
return rb_ivar_get(self,'@autorecalculates_key_view_loop');
});
rb_define_method(self,'recalculate_key_view_loop',function(self,_){
});
rb_define_method(self,'toolbar=',function(self,_,toolbar){
if(RTEST(rb_funcall(rb_ivar_get(self,'@toolbar'),'==',toolbar))){
return ;
}
self.$i_s('@toolbar',toolbar);
return rb_funcall(rb_ivar_get(self,'@toolbar'),'window=',self);
});
rb_define_method(self,'toolbar',function(self,_){
return rb_ivar_get(self,'@toolbar');
});
rb_define_method(self,'toggle_toolbar_shown',function(self,_,sender){
});
rb_define_method(self,'run_toolbar_customization_palette',function(self,_,sender){
});
rb_define_method(self,'shows_toolbar_button=',function(self,_,show){
return rb_ivar_get(self,'@shows_toolbar_button');
});
rb_define_method(self,'shows_toolbar_button?',function(self,_){
return rb_ivar_get(self,'@shows_toolbar_button');
});
})(rb_define_class_under(self,'Window',self.$c_g_full('Responder')));
})(rb_define_module('Vienna'));
