var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Cell',cObject);
$VN_2.$def_s('prefers_tracking_until_mouse_up',function(self,_cmd){
return true;
});
$VN_2.$def('init_text_cell',function(self,_cmd,string){
});
$VN_2.$def('init_image_cell',function(self,_cmd,image){
});
$VN_2.$def('control_view',function(self,_cmd){
return self.$i_g('@control_view');
});
$VN_2.$def('control_view=',function(self,_cmd,view){
VN$(self, 'will_change_value_for_key', 'control_view');
self.$i_s('@control_view',view);
VN$(self, 'did_change_value_for_key', 'control_view');
});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
self.$i_s('@type',type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
});
$VN_2.$def('state=',function(self,_cmd,state){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',state);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('target',function(self,_cmd){
return self.$i_g('@target');
});
$VN_2.$def('target=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'target');
self.$i_s('@target',obj);
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
return self.$i_g('@action');
});
$VN_2.$def('action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'action');
self.$i_s('@action',selector);
VN$(self, 'did_change_value_for_key', 'action');
});
$VN_2.$def('tag',function(self,_cmd){
return self.$i_g('@tag');
});
$VN_2.$def('tag=',function(self,_cmd,tag){
VN$(self, 'will_change_value_for_key', 'tag');
self.$i_s('@tag',tag);
VN$(self, 'did_change_value_for_key', 'tag');
});
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('opaque?',function(self,_cmd){
return self.$i_g('@opaque');
});
$VN_2.$def('enabled?',function(self,_cmd){
return self.$i_g('@enabled');
});
$VN_2.$def('enabled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'enabled');
self.$i_s('@enabled',flag);
VN$(self, 'did_change_value_for_key', 'enabled');
});
$VN_2.$def('continuous?',function(self,_cmd){
return self.$i_g('@continuous');
});
$VN_2.$def('continuous=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'continuous');
self.$i_s('@continuous',flag);
VN$(self, 'did_change_value_for_key', 'continuous');
});
$VN_2.$def('editable?',function(self,_cmd){
return self.$i_g('@editable');
});
$VN_2.$def('editable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'editable');
self.$i_s('@editable',flag);
VN$(self, 'did_change_value_for_key', 'editable');
});
$VN_2.$def('selectable?',function(self,_cmd){
return self.$i_g('@selectable');
});
$VN_2.$def('selectable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'selectable');
self.$i_s('@selectable',flag);
VN$(self, 'did_change_value_for_key', 'selectable');
});
$VN_2.$def('bordered?',function(self,_cmd){
return self.$i_g('@bordered');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
self.$i_s('@bordered',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('bezeled?',function(self,_cmd){
return self.$i_g('@bezeled');
});
$VN_2.$def('bezeled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bezeled');
self.$i_s('@bezeled',flag);
VN$(self, 'did_change_value_for_key', 'bezeled');
});
$VN_2.$def('scrollable?',function(self,_cmd){
return self.$i_g('@scrollable');
});
$VN_2.$def('scrollable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'scrollable');
self.$i_s('@scrollable',flag);
if((e=flag,e!==nil && e!==false)){
return wraps = false;
}
VN$(self, 'did_change_value_for_key', 'scrollable');
});
$VN_2.$def('highlighted?',function(self,_cmd){
return self.$i_g('@highlighted');
});
$VN_2.$def('highlighted=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'highlighted');
self.$i_s('@highlighted',flag);
VN$(self, 'did_change_value_for_key', 'highlighted');
});
$VN_2.$def('alignment',function(self,_cmd){
return self.$i_g('@alignment');
});
$VN_2.$def('alignment=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'alignment');
self.$i_s('@alignment',flag);
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('wraps?',function(self,_cmd){
return self.$i_g('@wraps');
});
$VN_2.$def('wraps=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'wraps');
self.$i_s('@wraps',flag);
if((e=flag,e!==nil && e!==false)){
return scrollable = false;
}
VN$(self, 'did_change_value_for_key', 'wraps');
});
$VN_2.$def('font',function(self,_cmd){
return self.$i_g('@font');
});
$VN_2.$def('font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'font');
self.$i_s('@font',font);
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('entry_acceptable?',function(self,_cmd,str){
return true;
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('formatter=',function(self,_cmd,new_formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
self.$i_s('@formatter',new_formatter);
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
return self.$i_g('@formatter');
});
$VN_2.$def('object_value',function(self,_cmd){
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
VN$(self, 'did_change_value_for_key', 'object_value');
});
$VN_2.$def('valid_object_value?',function(self,_cmd){
return true;
});
$VN_2.$def('string_value',function(self,_cmd){
});
$VN_2.$def('string_value=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'string_value');
VN$(self, 'did_change_value_for_key', 'string_value');
});
$VN_2.$def('compare',function(self,_cmd,other_cell){
});
$VN_2.$def('int_value',function(self,_cmd){
});
$VN_2.$def('int_value=',function(self,_cmd,an_int){
VN$(self, 'will_change_value_for_key', 'int_value');
VN$(self, 'did_change_value_for_key', 'int_value');
});
$VN_2.$def('float_value',function(self,_cmd){
});
$VN_2.$def('float_value=',function(self,_cmd,a_float){
VN$(self, 'will_change_value_for_key', 'float_value');
VN$(self, 'did_change_value_for_key', 'float_value');
});
$VN_2.$def('double_value',function(self,_cmd){
});
$VN_2.$def('double_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'double_value');
VN$(self, 'did_change_value_for_key', 'double_value');
});
$VN_2.$def('take_int_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_float_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_double_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_string_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_object_value_from',function(self,_cmd,sender){
});
$VN_2.$def('image',function(self,_cmd){
return self.$i_g('@image');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
self.$i_s('@control_tint',control_tint);
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_tint',function(self,_cmd){
return self.$i_g('@control_tint');
});
$VN_2.$def('control_size',function(self,_cmd){
return self.$i_g('@control_size');
});
$VN_2.$def('control_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'control_size');
self.$i_s('@control_size',size);
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('represented_object',function(self,_cmd){
return self.$i_g('@represented_object');
});
$VN_2.$def('represented_object=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'represented_object');
self.$i_s('@represented_object',obj);
VN$(self, 'did_change_value_for_key', 'represented_object');
});
$VN_2.$def('cell_attribute',function(self,_cmd,param){
});
$VN_2.$def('set_cell_attribute:to:',function(self,_cmd,param,value){
});
$VN_2.$def('image_rect_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('title_rect_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('drawing_rect_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('cell_size',function(self,_cmd){
});
$VN_2.$def('cell_size_for_bounds',function(self,_cmd,rect){
});
$VN_2.$def('highlight_color_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('calc_draw_info',function(self,_cmd){
});
$VN_2.$def('setup_field_editor_attributes',function(self,_cmd,text_obj){
});
$VN_2.$def('draw_interior_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('draw_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
VN$(self,'puts','current context is:');
var ctx = VN$(self.$klass.$c_g_full('GraphicsContext'),'current_context');
VN$(ctx,'graphics_port').fillRect(20, 20, 100, 100);VN$(ctx,'graphics_port').clearRect(40, 40, 60, 60);});
$VN_2.$def('highlight:with_frame:in_view:',function(self,_cmd,flag,cell_frame,control_view){
});
$VN_2.$def('mouse_down_flags',function(self,_cmd){
});
$VN_2.$def('get_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('start_tracking_at:in_view:',function(self,_cmd,start_point,control_view){
});
$VN_2.$def('continue_tracking:at:in_view:',function(self,_cmd,last_point,current_point,control_view){
});
$VN_2.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_cmd,last_point,stop_point,control_view,flag){
});
$VN_2.$def('track_mouse:in_rect:of_view:until_mouse_up:',function(self,_cmd,the_event,cell_frame,control_view,flag){
});
$VN_2.$def('edit_with_frame:in_view:editor:delegate:event:',function(self,_cmd,rect,control_view,text_obj,an_obj,the_event){
});
$VN_2.$def('select_with_frame:in_view:editor:delegate:start:length:',function(self,_cmd,rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
$VN_2.$def('end_editing',function(self,_cmd,text_obj){
});
$VN_2.$def('reset_cursor_rect:in_view:',function(self,_cmd,cell_frame,control_view){
});
$VN_2.$def('menu=',function(self,_cmd,menu){
VN$(self, 'will_change_value_for_key', 'menu');
self.$i_s('@menu',menu);
VN$(self, 'did_change_value_for_key', 'menu');
});
$VN_2.$def('menu',function(self,_cmd){
return self.$i_g('@menu');
});
$VN_2.$def('menu_for_event:in_rect:of_view:',function(self,_cmd,event,cell_frame,view){
});
$VN_2.$def_s('default_menu',function(self,_cmd){
});
$VN_2.$def('sends_action_on_end_editing=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'sends_action_on_end_editing');
self.$i_s('@sends_action_on_end_editing',flag);
VN$(self, 'did_change_value_for_key', 'sends_action_on_end_editing');
});
$VN_2.$def('sends_action_on_end_editing?',function(self,_cmd){
return self.$i_g('@sends_action_on_end_editing');
});
$VN_2.$def('base_writing_direction',function(self,_cmd){
return self.$i_g('@base_writing_direction');
});
$VN_2.$def('base_writing_direction=',function(self,_cmd,direction){
VN$(self, 'will_change_value_for_key', 'base_writing_direction');
self.$i_s('@base_writing_direction',direction);
VN$(self, 'did_change_value_for_key', 'base_writing_direction');
});
$VN_2.$def('line_break_mode=',function(self,_cmd,mode){
VN$(self, 'will_change_value_for_key', 'line_break_mode');
self.$i_s('@line_break_mode',mode);
VN$(self, 'did_change_value_for_key', 'line_break_mode');
});
$VN_2.$def('line_break_mode',function(self,_cmd){
return self.$i_g('@line_break_mode');
});
$VN_2.$def('allows_undo=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_undo');
self.$i_s('@allows_undo',flag);
VN$(self, 'did_change_value_for_key', 'allows_undo');
});
$VN_2.$def('allows_undo?',function(self,_cmd){
return self.$i_g('@allows_undo');
});
$VN_2.$def('truncates_last_visible_line?',function(self,_cmd){
return self.$i_g('@truncates_last_visible_line');
});
$VN_2.$def('truncates_last_visible_line=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'truncates_last_visible_line');
self.$i_s('@truncates_last_visible_line',flag);
VN$(self, 'did_change_value_for_key', 'truncates_last_visible_line');
});
$VN_2.$def('refuses_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'refuses_first_responder');
self.$i_s('@refuses_first_responder',flag);
VN$(self, 'did_change_value_for_key', 'refuses_first_responder');
});
$VN_2.$def('refuses_first_responder?',function(self,_cmd){
return self.$i_g('@refuses_first_responder');
});
$VN_2.$def('accepts_first_responder?',function(self,_cmd){
return self.$i_g('@accepts_first_responder');
});
$VN_2.$def('shows_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'shows_first_responder');
self.$i_s('@shows_first_responder',flag);
VN$(self, 'did_change_value_for_key', 'shows_first_responder');
});
$VN_2.$def('shows_first_responder?',function(self,_cmd){
return self.$i_g('@shows_first_responder');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('focus_ring_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'focus_ring_type');
self.$i_s('@focus_ring_type',type);
VN$(self, 'did_change_value_for_key', 'focus_ring_type');
});
$VN_2.$def('focus_ring_type',function(self,_cmd){
return self.$i_g('@focus_ring_type');
});
$VN_2.$def_s('default_focus_ring_type',function(self,_cmd){
});
$VN_2.$def('attributed_string_value',function(self,_cmd){
});
$VN_2.$def('attributed_string_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'attributed_string_value');
VN$(self, 'did_change_value_for_key', 'attributed_string_value');
});
$VN_2.$def('allows_editing_text_attributes?',function(self,_cmd){
return self.$i_g('@allows_editing_text_attributes');
});
$VN_2.$def('allows_editing_text_attributes=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_editing_text_attributes');
self.$i_s('@allows_editing_text_attributes',flag);
if((e=flag,e==nil || e==false)){
return imports_graphics = false;
}
VN$(self, 'did_change_value_for_key', 'allows_editing_text_attributes');
});
$VN_2.$def('imports_graphics?',function(self,_cmd){
return self.$i_g('@imports_graphics');
});
$VN_2.$def('imports_graphics=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'imports_graphics');
self.$i_s('@imports_graphics',flag);
if((e=flag,e!==nil && e!==false)){
return self.$i_s('@allows_editing_text_attributes',true);
}
VN$(self, 'did_change_value_for_key', 'imports_graphics');
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
self.$i_s('@allows_mixed_state',flag);
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state?',function(self,_cmd){
return self.$i_g('@allows_mixed_state');
});
$VN_2.$def('next_state',function(self,_cmd){
});
$VN_2.$def('set_next_state',function(self,_cmd){
});
$VN_2.$def('hit_test_for_event:in_rect:of_view:',function(self,_cmd,event,cell_frame,control_view){
});
$VN_2.$def('background_style',function(self,_cmd){
return self.$i_g('@background_style');
});
$VN_2.$def('background_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'background_style');
self.$i_s('@background_style',style);
VN$(self, 'did_change_value_for_key', 'background_style');
});
