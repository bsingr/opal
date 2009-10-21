
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/normal_window_view.js');
var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('WINDOW_MASKS',VN.$h('borderless', 0, 'titled', VN$((1),'<<',0), 'closable', VN$((1),'<<',1), 'miniaturizable', VN$((1),'<<',2), 'resizable', VN$((1),'<<',3), 'textured_background', VN$((1),'<<',8), 'unified_title_and_toolbar', VN$((1),'<<',12), 'close_button', 1, 'miniaturize_button', 1, 'zoom_button', 1, 'toolbar_button', 1, 'document_icon_button', 1, 'utility', VN$((1),'<<',4), 'doc_modal', VN$((1),'<<',6), 'hud', VN$((1),'<<',13)));
$VN_1.$c_s('WINDOW_LEVELS',VN.$h('normal', 0, 'floating', 0, 'submenu', 0, 'torn_off_menu', 0, 'main_menu', 0, 'status', 0, 'modal_panel', 0, 'pop_up_menu', 0, 'screen_saver', 0));
var $VN_2 = RClass.define_under($VN_1, 'Window',$VN_2.$c_g_full('Responder'));
$VN_2.$def('initialize',function(self,_cmd,content_rect,style_mask){
VN$sup(arguments.callee, self,_cmd,[]);
VN$(self, 'setup_display_context');
self.$i_s('@frame',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0));
self.$i_s('@window_number',VN$(self.$klass.$c_g_full('App'),'add_window',self));
self.$i_s('@style_mask',style_mask);
VN$(self,'level=','normal');
self.$i_s('@min_size',VN$(self.$klass.$c_g_full('Size'),'new',0.0,0.0));
self.$i_s('@max_size',VN$(self.$klass.$c_g_full('Size'),'new',9999.0,9999.0));
self.$i_s('@first_responder',self);
self.$i_s('@next_responder',self.$klass.$c_g_full('App'));
VN$(self,'setup_window_view');
VN$(self,'frame=',content_rect);
VN$(self.$i_g('@window_view'),'needs_display=',true);
return VN$(self,'content_view=',VN$(self.$klass.$c_g_full('View'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(self.$i_g('@frame'),'width'),VN$(self.$i_g('@frame'),'height'))));
});
$VN_2.$def_s('build',function(self,_cmd,options,block){
var win = VN$(self,'new',VN$(options,'[]','frame'),['titled','closable']);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
$VN_2.$def('setup_display_context',function(self,_cmd){
self.$i_s('@element',VN$(self.$klass.$c_g_full('Element'),'new','div'));
self.$i_s('@display_context',VN$(self.$klass.$c_g_full('RenderContext'),'new','div'));
VN$(self.$i_g('@element'),'<<',self.$i_g('@display_context'));
return VN$(self.$klass.$c_g_full('Document'),'<<',self.$i_g('@element'));
});
$VN_2.$def('setup_window_view',function(self,_cmd){
self.$i_s('@window_view',VN$(self.$klass.$c_g_full('NormalWindowView'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,100,100),self.$i_g('@style_mask')));
VN$(self.$i_g('@window_view'),'view_will_move_to_window',self);
VN$(self.$i_g('@window_view'),'next_responder=',self);
VN$(self.$i_g('@element'),'<<',VN$(self.$i_g('@window_view'),'element'));
VN$(self.$i_g('@window_view'),'view_did_move_to_window');
VN$(VN$(self.$i_g('@window_view'),'element'),'add_event_listener','mousedown',function(event){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',event,self,'left_mouse_down');
VN$(self.$klass.$c_g_full('App'),'send_event',the_event);
if(!RTEST(VN$(the_event,'allows_propagation?'))){
VN$(the_event,'stop_propagation');
}
});
return VN$(VN$(self.$i_g('@window_view'),'element'),'add_event_listener','mouseup',function(event){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',event,self,'left_mouse_up');
VN$(self.$klass.$c_g_full('App'),'send_event',the_event);
if(!RTEST(VN$(the_event,'allows_propagation?'))){
VN$(the_event,'stop_propagation');
}
});
});
$VN_2.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_cmd,rect,style){
});
$VN_2.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_cmd,rect,style){
});
$VN_2.$def_s('min_frame_width_with_title:style_mask:',function(self,_cmd,title,style){
});
$VN_2.$def('frame_rect_for_content_rect',function(self,_cmd,rect){
});
$VN_2.$def('content_rect_for_frame_rect',function(self,_cmd,rect){
return rect;
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('represnted_url=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'represnted_url');
VN$(self, 'did_change_value_for_key', 'represnted_url');
});
$VN_2.$def('represented_url',function(self,_cmd){
});
$VN_2.$def('represented_filename',function(self,_cmd){
});
$VN_2.$def('represented_filename=',function(self,_cmd,filename){
VN$(self, 'will_change_value_for_key', 'represented_filename');
VN$(self, 'did_change_value_for_key', 'represented_filename');
});
$VN_2.$def('set_title_with_represented_filename',function(self,_cmd,filename){
});
$VN_2.$def('excluded_from_windows_menu=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'excluded_from_windows_menu');
self.$i_s('@excluded_from_windows_menu',flag);
VN$(self, 'did_change_value_for_key', 'excluded_from_windows_menu');
});
$VN_2.$def('excluded_from_windows_menu?',function(self,_cmd){
return self.$i_g('@excluded_from_windows_menu');
});
$VN_2.$def('content_view=',function(self,_cmd,view){
VN$(self, 'will_change_value_for_key', 'content_view');
VN$(view,'view_will_move_to_window',self);
var bounds = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(VN$(self.$i_g('@frame'),'size'),'width'),VN$(VN$(self.$i_g('@frame'),'size'),'height'));
self.$i_s('@content_view',view);
VN$(self.$i_g('@content_view'),'frame=',VN$(self,'content_rect_for_frame_rect',bounds));
VN$(view,'view_did_move_to_window');
VN$(self.$i_g('@window_view'),'<<',self.$i_g('@content_view'));
VN$(self, 'did_change_value_for_key', 'content_view');
});
$VN_2.$def('content_view',function(self,_cmd){
return self.$i_g('@content_view');
});
$VN_2.$def('<<',function(self,_cmd,view){
return VN$(self.$i_g('@content_view'),'<<',view);
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_s('@delegate',obj);
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('delegate',function(self,_cmd){
});
$VN_2.$def('window_number',function(self,_cmd){
return self.$i_g('@window_number');
});
$VN_2.$def('style_mask',function(self,_cmd){
return self.$i_g('@style_mask');
});
$VN_2.$def('style_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'style_mask');
self.$i_s('@style_mask',mask);
VN$(self, 'did_change_value_for_key', 'style_mask');
});
$VN_2.$def('field_editor:for_object:',function(self,_cmd,create_flag,obj){
});
$VN_2.$def('end_editing_for',function(self,_cmd,obj){
});
$VN_2.$def('content_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'content_size');
VN$(self, 'did_change_value_for_key', 'content_size');
});
$VN_2.$def('frame_top_left_point=',function(self,_cmd,point){
VN$(self, 'will_change_value_for_key', 'frame_top_left_point');
VN$(self, 'did_change_value_for_key', 'frame_top_left_point');
});
$VN_2.$def('cascade_top_left_from_point',function(self,_cmd,point){
});
$VN_2.$def('frame',function(self,_cmd){
return self.$i_g('@frame');
});
$VN_2.$def('frame=',function(self,_cmd,frame){
VN$(self, 'will_change_value_for_key', 'frame');
VN$(self,'set_frame:display:animate:',frame,true,false);
VN$(self, 'did_change_value_for_key', 'frame');
});
$VN_2.$def('set_frame:display:',function(self,_cmd,frame_rect,flag){
return VN$(self,'set_frame:display:animate:',frame_rect,flag,false);
});
$VN_2.$def('set_frame:display:animate:',function(self,_cmd,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin = VN$(self.$i_g('@frame'),'origin');
var size = VN$(self.$i_g('@frame'),'size');
var new_origin = VN$(frame_rect,'origin');
var new_size = VN$(frame_rect,'size');
VN$(self,'puts','about to check!!!!!!!!!!!!!');
VN$(self,'puts',origin.$iv_tbl);
VN$(self,'puts','..');
VN$(self,'puts',new_origin.$iv_tbl);
if(!RTEST(VN$(origin,'eql?',new_origin))){
VN$(self,'puts','Origins are not the same!');
VN$(origin,'x=',VN$(new_origin,'x'));
VN$(origin,'y=',VN$(new_origin,'y'));
VN$(self.$i_g('@element'),'origin=',origin);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did move',self);
}
if(!RTEST(VN$(size,'eql?',new_size))){
VN$(self,'puts','Sizes are not the same!');
VN$(size,'width=',VN$(new_size,'width'));
VN$(size,'height=',VN$(new_size,'height'));
VN$(self.$i_g('@window_view'),'frame_size=',size);
VN$(self.$i_g('@element'),'size=',size);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center'),'post_notification_name:object:','window did resize',self);
}
}
});
$VN_2.$def('frame_origin=',function(self,_cmd,origin){
VN$(self, 'will_change_value_for_key', 'frame_origin');
VN$(self, 'did_change_value_for_key', 'frame_origin');
});
$VN_2.$def('animation_resize_time',function(self,_cmd,new_frame){
});
$VN_2.$def('in_live_resize?',function(self,_cmd){
});
$VN_2.$def('shows_resize_indicator=',function(self,_cmd,show){
VN$(self, 'will_change_value_for_key', 'shows_resize_indicator');
self.$i_s('@shows_resize_indicator',show);
VN$(self, 'did_change_value_for_key', 'shows_resize_indicator');
});
$VN_2.$def('shows_resize_indicator?',function(self,_cmd){
return self.$i_g('@shows_resize_indicator');
});
$VN_2.$def('resize_increments=',function(self,_cmd,increments){
VN$(self, 'will_change_value_for_key', 'resize_increments');
self.$i_s('@resize_increments',increments);
VN$(self, 'did_change_value_for_key', 'resize_increments');
});
$VN_2.$def('resize_incremenets',function(self,_cmd){
return self.$i_g('@resize_increments');
});
$VN_2.$def('aspect_ratio=',function(self,_cmd,ratio){
VN$(self, 'will_change_value_for_key', 'aspect_ratio');
self.$i_s('@aspect_ratio',ratio);
VN$(self, 'did_change_value_for_key', 'aspect_ratio');
});
$VN_2.$def('aspect_ratio',function(self,_cmd){
return self.$i_g('@aspect_ratio');
});
$VN_2.$def('display',function(self,_cmd){
});
$VN_2.$def('preserves_content_during_live_resize?',function(self,_cmd){
return self.$i_g('@preserves_content_during_live_resize');
});
$VN_2.$def('preserves_content_during_live_resize=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'preserves_content_during_live_resize');
self.$i_s('@preserves_content_during_live_resize',flag);
VN$(self, 'did_change_value_for_key', 'preserves_content_during_live_resize');
});
$VN_2.$def('update',function(self,_cmd){
});
$VN_2.$def('make_first_responder',function(self,_cmd,responder){
if(RTEST(VN$(self.$i_g('@first_responder'),'==',responder))){
return true;
}
if(!RTEST(VN$(self.$i_g('@first_responder'),'resign_first_responder'))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(VN$(responder,'accepts_first_responder')),NOTTEST(VN$(responder,'become_first_responder')))))){
self.$i_s('@first_responder',self);
VN$(self,'puts','Cant make responder the first responder :(');
return false;
}
self.$i_s('@first_responder',responder);
return true;
});
$VN_2.$def('first_responder',function(self,_cmd){
});
$VN_2.$def('resize_flags',function(self,_cmd){
});
$VN_2.$def('key_down',function(self,_cmd,the_event){
});
$VN_2.$def('close',function(self,_cmd){
});
$VN_2.$def('released_when_closed=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'released_when_closed');
self.$i_s('@released_when_closed',flag);
VN$(self, 'did_change_value_for_key', 'released_when_closed');
});
$VN_2.$def('released_when_closed?',function(self,_cmd){
return self.$i_g('@released_when_closed');
});
$VN_2.$def('miniaturize',function(self,_cmd,sender){
});
$VN_2.$def('deminiaturize',function(self,_cmd,sender){
});
$VN_2.$def('zoomed?',function(self,_cmd){
return self.$i_g('@zoomed');
});
$VN_2.$def('zoom',function(self,_cmd,sender){
});
$VN_2.$def('miniaturized?',function(self,_cmd){
return self.$i_g('@miniaturized');
});
$VN_2.$def('try_to_perform:with:',function(self,_cmd,action,object){
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('movable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'movable');
self.$i_s('@movable',flag);
VN$(self, 'did_change_value_for_key', 'movable');
});
$VN_2.$def('movable?',function(self,_cmd){
return self.$i_g('@movable');
});
$VN_2.$def('movable_by_window_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'movable_by_window_background');
self.$i_g('@movable_by_window_background');
VN$(self, 'did_change_value_for_key', 'movable_by_window_background');
});
$VN_2.$def('movable_by_window_background?',function(self,_cmd){
return self.$i_g('@movable_by_window_background');
});
$VN_2.$def('hides_on_deactivate=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'hides_on_deactivate');
self.$i_s('@hides_on_deactivate',flag);
VN$(self, 'did_change_value_for_key', 'hides_on_deactivate');
});
$VN_2.$def('hides_on_deactivate?',function(self,_cmd){
return self.$i_g('@hides_on_deactivate');
});
$VN_2.$def('center',function(self,_cmd){
});
$VN_2.$def('make_key_and_order_front',function(self,_cmd,sender){
});
$VN_2.$def('order_front',function(self,_cmd,sender){
});
$VN_2.$def('order_back',function(self,_cmd,sender){
});
$VN_2.$def('order_out',function(self,_cmd,sender){
});
$VN_2.$def('order_window:relative_to:',function(self,_cmd,place,other_win){
});
$VN_2.$def('order_front_regardless',function(self,_cmd){
});
$VN_2.$def('document_edited=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'document_edited');
self.$i_s('@document_edited',flag);
VN$(self, 'did_change_value_for_key', 'document_edited');
});
$VN_2.$def('document_edited?',function(self,_cmd){
return self.$i_g('@document_edited');
});
$VN_2.$def('visible?',function(self,_cmd){
return self.$i_g('@visible');
});
$VN_2.$def('key_window?',function(self,_cmd){
return self.$i_g('@key_window');
});
$VN_2.$def('main_window?',function(self,_cmd){
return self.$i_g('@main_window');
});
$VN_2.$def('can_become_key_window?',function(self,_cmd){
});
$VN_2.$def('can_become_main_window?',function(self,_cmd){
});
$VN_2.$def('make_key_window',function(self,_cmd){
});
$VN_2.$def('make_main_window',function(self,_cmd){
});
$VN_2.$def('become_key_window',function(self,_cmd){
});
$VN_2.$def('become_main_window',function(self,_cmd){
});
$VN_2.$def('resign_key_window',function(self,_cmd){
});
$VN_2.$def('resign_main_window',function(self,_cmd){
});
$VN_2.$def('works_when_modal?',function(self,_cmd){
});
$VN_2.$def('convert_base_to_screen',function(self,_cmd,point){
});
$VN_2.$def('convert_screen_to_base',function(self,_cmd,point){
var res = VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(point,'x'),'-',VN$(self.$i_g('@frame'),'x')),VN$(VN$(point,'y'),'-',VN$(self.$i_g('@frame'),'y')));
return res;
});
$VN_2.$def('perform_close',function(self,_cmd,sender){
});
$VN_2.$def('perform_miniaturize',function(self,_cmd,sender){
});
$VN_2.$def('perform_zoom',function(self,_cmd,sender){
});
$VN_2.$def('level=',function(self,_cmd,level){
VN$(self, 'will_change_value_for_key', 'level');
self.$i_s('@level',level);
VN$(self.$i_g('@element'),'css',VN.$h('z_index',VN$(self.$klass.$c_g_full('WINDOW_LEVELS'),'[]',level)));
VN$(self, 'did_change_value_for_key', 'level');
});
$VN_2.$def('level',function(self,_cmd){
return self.$i_g('@level');
});
$VN_2.$def('has_shadow=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'has_shadow');
self.$i_s('@has_shadow',flag);
VN$(self, 'did_change_value_for_key', 'has_shadow');
});
$VN_2.$def('has_shadow?',function(self,_cmd){
return self.$i_g('@has_shadow');
});
$VN_2.$def('min_size',function(self,_cmd){
return self.$i_g('@min_size');
});
$VN_2.$def('max_size',function(self,_cmd){
return self.$i_g('@max_size');
});
$VN_2.$def('min_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'min_size');
self.$i_s('@min_size',size);
VN$(self, 'did_change_value_for_key', 'min_size');
});
$VN_2.$def('max_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'max_size');
self.$i_s('@max_size',size);
VN$(self, 'did_change_value_for_key', 'max_size');
});
$VN_2.$def('next_event_matching_mask',function(self,_cmd,mask){
});
$VN_2.$def('post_event:at_start:',function(self,_cmd,event,flag){
});
$VN_2.$def('current_event',function(self,_cmd){
return self.$i_g('@current_event');
});
$VN_2.$def('accepts_mouse_moved_events=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'accepts_mouse_moved_events');
self.$i_s('@accepts_mouse_moved_events',flag);
VN$(self, 'did_change_value_for_key', 'accepts_mouse_moved_events');
});
$VN_2.$def('accepts_mouse_moved_events?',function(self,_cmd){
return self.$i_g('@accepts_mouse_moved_events');
});
$VN_2.$def('ignores_mouse_events=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'ignores_mouse_events');
self.$i_s('@ignores_mouse_events',flag);
VN$(self, 'did_change_value_for_key', 'ignores_mouse_events');
});
$VN_2.$def('ignores_mouse_events?',function(self,_cmd){
return self.$i_g('@ignores_mouse_events');
});
$VN_2.$def('send_event',function(self,_cmd,event){
var point = VN$(event,'location_in_window');
return (function($v){
if(($e = VN$('key_up', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','key_up');
}
else if(($e = VN$('key_down', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','key_down');
}
else if(($e = VN$('left_mouse_down', '===', $v),$e!==nil && $e!==false)){
var hit_test = VN$(self.$i_g('@window_view'),'hit_test',point);
if(RTEST(ANDTEST(VN$(hit_test,'!=',self.$i_g('@first_responder')),VN$(hit_test,'accepts_first_responder')))){
VN$(self,'make_first_responder',hit_test);
}
if(RTEST(VN$(hit_test,'accepts_first_mouse',event))){
return VN$(hit_test,'mouse_down',event);
}
}
else if(($e = VN$('left_mouse_up', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','left_mouse_up');
}
else if(($e = VN$('left_mouse_dragged', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','left_mouse_dragged');
}
else if(($e = VN$('scroll_wheel', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','scroll_wheel');
}
else if(($e = VN$('right_mouse_down', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','right_mouse_down');
}
else if(($e = VN$('right_mouse_up', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','right_mouse_up');
}
else if(($e = VN$('right_mouse_dragged', '===', $v),$e!==nil && $e!==false)){
return VN$(self,'puts','right_mouse_dragged');
}
})(VN$(event,'type'));
});
$VN_2.$def('window_controller',function(self,_cmd){
return self.$i_g('@window_controller');
});
$VN_2.$def('window_controller=',function(self,_cmd,controller){
VN$(self, 'will_change_value_for_key', 'window_controller');
self.$i_s('@window_controller',controller);
VN$(self, 'did_change_value_for_key', 'window_controller');
});
$VN_2.$def('sheet?',function(self,_cmd){
return self.$i_g('@sheet');
});
$VN_2.$def('attatched_sheet',function(self,_cmd){
return self.$i_g('@attached_sheet');
});
$VN_2.$def('add_child_window:ordered:',function(self,_cmd,win,place){
});
$VN_2.$def('remove_child_window',function(self,_cmd,win){
});
$VN_2.$def('child_windows',function(self,_cmd){
return self.$i_g('@child_windows');
});
$VN_2.$def('parent_window',function(self,_cmd){
return self.$i_g('@parent_window');
});
$VN_2.$def('parent_window=',function(self,_cmd,win){
VN$(self, 'will_change_value_for_key', 'parent_window');
self.$i_s('@parent_window',win);
VN$(self, 'did_change_value_for_key', 'parent_window');
});
$VN_2.$def('graphics_context',function(self,_cmd){
return self.$i_g('@graphics_context');
});
$VN_2.$def('initial_first_responder=',function(self,_cmd,view){
VN$(self, 'will_change_value_for_key', 'initial_first_responder');
self.$i_s('@initial_first_responder',view);
VN$(self, 'did_change_value_for_key', 'initial_first_responder');
});
$VN_2.$def('initial_first_responder',function(self,_cmd){
return self.$i_g('@initial_first_responder');
});
$VN_2.$def('select_next_key_view',function(self,_cmd,sender){
});
$VN_2.$def('select_previous_key_view',function(self,_cmd,sender){
});
$VN_2.$def('select_key_view_following_view',function(self,_cmd,view){
});
$VN_2.$def('select_key_view_preceding_view',function(self,_cmd,view){
});
$VN_2.$def('autorecalculates_key_view_loop',function(self,_cmd,flag){
return self.$i_s('@autorecalculates_key_view_loop',flag);
});
$VN_2.$def('autorecalculates_key_view_loop?',function(self,_cmd){
return self.$i_g('@autorecalculates_key_view_loop');
});
$VN_2.$def('recalculate_key_view_loop',function(self,_cmd){
});
$VN_2.$def('toolbar=',function(self,_cmd,toolbar){
VN$(self, 'will_change_value_for_key', 'toolbar');
self.$i_s('@toolbar',toolbar);
VN$(self, 'did_change_value_for_key', 'toolbar');
});
$VN_2.$def('toolbar',function(self,_cmd){
return self.$i_g('@toolbar');
});
$VN_2.$def('toggle_toolbar_shown',function(self,_cmd,sender){
});
$VN_2.$def('run_toolbar_customization_palette',function(self,_cmd,sender){
});
$VN_2.$def('shows_toolbar_button=',function(self,_cmd,show){
VN$(self, 'will_change_value_for_key', 'shows_toolbar_button');
self.$i_g('@shows_toolbar_button');
VN$(self, 'did_change_value_for_key', 'shows_toolbar_button');
});
$VN_2.$def('shows_toolbar_button?',function(self,_cmd){
return self.$i_g('@shows_toolbar_button');
});
