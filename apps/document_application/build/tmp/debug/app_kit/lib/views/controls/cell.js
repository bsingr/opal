(function(self) {
self.$c_s('CELL_TYPES',VN.$h(ID2SYM('null'), 0, ID2SYM('text'), 1, ID2SYM('image'), 2));
self.$c_s('IMAGE_POSITIONS',VN.$h(ID2SYM('text_only'), 0, ID2SYM('image_only'), 1, ID2SYM('left'), 2, ID2SYM('right'), 3, ID2SYM('below'), 4, ID2SYM('above'), 5, ID2SYM('overlaps'), 6));
self.$c_s('CELL_STATES',VN.$h(ID2SYM('off'), 0, ID2SYM('on'), 1));
self.$c_s('CELL_MASKS',VN.$h(ID2SYM('none'), 0, ID2SYM('contents'), 1, ID2SYM('push_in'), 2, ID2SYM('change_gray'), 4, ID2SYM('change_background'), 8));
self.$c_s('CONTROL_TINTS',VN.$h(ID2SYM('default'), 0, ID2SYM('blue'), 1, ID2SYM('graphite'), 6, ID2SYM('clear'), 7, ID2SYM('hud'), 10));
self.$c_s('CONTROL_SIZES',VN.$h(ID2SYM('regular'), 0, ID2SYM('small'), 1, ID2SYM('mini'), 2));
(function(self) {
self.$def_s('prefers_tracking_until_mouse_up',function(self,_){
});
rb_define_method(self,'init_text_cell',function(self,_,str){
self.$i_s('@cell_type',ID2SYM('text'));
self.$i_s('@enabled',true);
self.$i_s('@editable',false);
self.$i_s('@selectable',false);
self.$i_s('@state',ID2SYM('off'));
self.$i_s('@title',str);
self.$i_s('@image',nil);
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
self.$i_s('@highlighted',false);
return self.$i_s('@refuses_first_responder',false);
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
var flags=rb_funcall(coder,'decode_int',ID2SYM('cell_flags'));
var flags2=rb_funcall(coder,'decode_int',ID2SYM('cell_flags2'));
self.$i_s('@enabled',RTEST(rb_funcall((rb_funcall(flags,'&',0x20000000)),'nonzero?')) ? false : true);
self.$i_s('@editable',RTEST(rb_funcall((rb_funcall(flags,'&',0x10000000)),'nonzero?')) ? true : false);
self.$i_s('@selectable',RTEST(rb_funcall((rb_funcall(flags,'&',0x00200000)),'nonzero?')) ? true : false);
self.$i_s('@state',RTEST(rb_funcall((rb_funcall(flags,'&',0x80000000)),'nonzero?')) ? ID2SYM('on') : ID2SYM('off'));
self.$i_s('@title','');
self.$i_s('@bordered',RTEST(rb_funcall((rb_funcall(flags,'&',0x00800000)),'nonzero?')) ? true : false);
self.$i_s('@bezeled',RTEST(rb_funcall((rb_funcall(flags,'&',0x00400000)),'nonzero?')) ? true : false);
self.$i_s('@highlighted',RTEST(rb_funcall((rb_funcall(flags,'&',0x40000000)),'nonzero?')) ? true : false);
self.$i_s('@refuses_first_responder',false);
return self.$i_s('@font',rb_funcall(coder,'decode_object',ID2SYM('font')));
});
rb_define_method(self,'init_image_cell',function(self,_,img){
});
rb_define_method(self,'initialize',function(self,_){
return rb_funcall(self,'init_text_cell','Cell');
});
rb_define_method(self,'class_name=',function(self,_,class_name){
return self.$i_s('@class_name',class_name);
});
rb_define_method(self,'class_name',function(self,_){
return ORTEST(rb_ivar_get(self,'@class_name'),'vn-control');
});
rb_define_method(self,'theme_name=',function(self,_,theme_name){
return self.$i_s('@theme_name',theme_name);
});
rb_define_method(self,'theme_name',function(self,_){
return ORTEST(rb_ivar_get(self,'@theme_name'),'');
});
rb_define_method(self,'control_view',function(self,_){
return rb_ivar_get(self,'@control_view');
});
rb_define_method(self,'control_view=',function(self,_,view){
return self.$i_s('@control_view',view);
});
rb_define_method(self,'type',function(self,_){
return rb_ivar_get(self,'@type');
});
rb_define_method(self,'type=',function(self,_,a_type){
return self.$i_s('@type',a_type);
});
rb_define_method(self,'state',function(self,_){
return rb_ivar_get(self,'@state');
});
rb_define_method(self,'state=',function(self,_,state){
return self.$i_s('@state',state);
});
rb_define_method(self,'target',function(self,_){
return rb_ivar_get(self,'@target');
});
rb_define_method(self,'target=',function(self,_,target){
return self.$i_s('@target',target);
});
rb_define_method(self,'action',function(self,_){
return rb_ivar_get(self,'@action');
});
rb_define_method(self,'action=',function(self,_,action){
return self.$i_s('@action',action);
});
rb_define_method(self,'on_action',function(self,_,block){
var obj=rb_funcall(self.$klass.$c_g_full('Object'),'new');
rb_funcall(obj,'instance_variable_set','@action',block);
obj.$def_s('menu_item_action',function(self,_,sender){
return rb_funcall(rb_ivar_get(self,'@action'),'call',sender);
});
rb_funcall(self,'action=',ID2SYM('menu_item_action'));
return rb_funcall(self,'target=',obj);
});
rb_define_method(self,'tag',function(self,_){
return rb_ivar_get(self,'@tag');
});
rb_define_method(self,'tag=',function(self,_,tag){
return self.$i_s('@tag',tag);
});
rb_define_method(self,'title',function(self,_){
return rb_ivar_get(self,'@title');
});
rb_define_method(self,'title=',function(self,_,title){
return self.$i_s('@title',title);
});
rb_define_method(self,'opaque?',function(self,_){
return rb_ivar_get(self,'@opaque');
});
rb_define_method(self,'enabled?',function(self,_){
return rb_ivar_get(self,'@enabled');
});
rb_define_method(self,'enabled=',function(self,_,flag){
return self.$i_s('@enabled',flag);
});
rb_define_method(self,'send_action_on',function(self,_,mask){
});
rb_define_method(self,'continuous?',function(self,_){
return rb_ivar_get(self,'@continuous');
});
rb_define_method(self,'continuous=',function(self,_,flag){
return self.$i_s('@continuous',flag);
});
rb_define_method(self,'editable?',function(self,_){
return rb_ivar_get(self,'@editable');
});
rb_define_method(self,'editable=',function(self,_,flag){
return self.$i_s('@editable',flag);
});
rb_define_method(self,'selectable?',function(self,_){
return rb_ivar_get(self,'@selectable');
});
rb_define_method(self,'selectable=',function(self,_,flag){
return self.$i_s('@selectable',flag);
});
rb_define_method(self,'bordered?',function(self,_){
return rb_ivar_get(self,'@bordered');
});
rb_define_method(self,'bordered=',function(self,_,flag){
return self.$i_s('@bordered',flag);
});
rb_define_method(self,'bezeled?',function(self,_){
return rb_ivar_get(self,'@bezeled');
});
rb_define_method(self,'bezeled=',function(self,_,flag){
return self.$i_s('@bezeled',flag);
});
rb_define_method(self,'scrollable?',function(self,_){
return rb_ivar_get(self,'@scrollable');
});
rb_define_method(self,'scrollable=',function(self,_,flag){
self.$i_s('@scrollable',flag);
if(RTEST(flag)){
rb_funcall(self,'wraps=',false);
}
});
rb_define_method(self,'highlighted?',function(self,_){
return rb_ivar_get(self,'@highlighted');
});
rb_define_method(self,'highlighted=',function(self,_,flag){
return self.$i_s('@highlighted',flag);
});
rb_define_method(self,'alignment',function(self,_){
return rb_ivar_get(self,'@alignment');
});
rb_define_method(self,'alignment=',function(self,_,align){
return self.$i_s('@alignment',align);
});
rb_define_method(self,'wraps?',function(self,_){
return rb_ivar_get(self,'@wraps');
});
rb_define_method(self,'wraps=',function(self,_,flag){
self.$i_s('@wraps',flag);
if(RTEST(flag)){
rb_funcall(self,'scrollable=',false);
}
});
rb_define_method(self,'font',function(self,_){
return rb_ivar_get(self,'@font');
});
rb_define_method(self,'font=',function(self,_,obj){
return self.$i_s('@font',obj);
});
rb_define_method(self,'entry_acceptable?',function(self,_,str){
return true;
});
rb_define_method(self,'key_equivalent',function(self,_){
return rb_ivar_get(self,'@key_equivalent');
});
rb_define_method(self,'formatter=',function(self,_,formatter){
return self.$i_s('@formatter',formatter);
});
rb_define_method(self,'formatter',function(self,_){
return rb_ivar_get(self,'@formatter');
});
rb_define_method(self,'object_value',function(self,_){
});
rb_define_method(self,'object_value=',function(self,_,obj){
return self.$i_s('@value',obj);
});
rb_define_method(self,'valid_object_value?',function(self,_){
return true;
});
rb_define_method(self,'string_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'string_value=',function(self,_,str){
return self.$i_s('@value',rb_funcall(self,'val'));
});
rb_define_method(self,'int_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'int_value=',function(self,_,val){
return self.$i_s('@value',val);
});
rb_define_method(self,'float_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'float_value=',function(self,_,val){
return self.$i_s('@value',val);
});
rb_define_method(self,'double_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'double_value=',function(self,_,val){
return self.$i_s('@value',val);
});
rb_define_method(self,'compare',function(self,_,other_cell){
});
rb_define_method(self,'take_int_value_from',function(self,_,sender){
});
rb_define_method(self,'take_float_value_from',function(self,_,sender){
});
rb_define_method(self,'take_double_value_from',function(self,_,sender){
});
rb_define_method(self,'take_string_value_from',function(self,_,sender){
});
rb_define_method(self,'take_object_value_from',function(self,_,sender){
});
rb_define_method(self,'image',function(self,_){
return rb_ivar_get(self,'@image');
});
rb_define_method(self,'image=',function(self,_,img){
return self.$i_s('@image',img);
});
rb_define_method(self,'control_tint',function(self,_){
return rb_ivar_get(self,'@control_tint');
});
rb_define_method(self,'control_tint=',function(self,_,control_tint){
return self.$i_s('@control_tint',control_tint);
});
rb_define_method(self,'control_size=',function(self,_,size){
return self.$i_s('@control_size',size);
});
rb_define_method(self,'control_size',function(self,_){
return rb_ivar_get(self,'@control_size');
});
rb_define_method(self,'represented_object',function(self,_){
return rb_ivar_get(self,'@represented_object');
});
rb_define_method(self,'represented_object=',function(self,_,obj){
return self.$i_s('@represented_object',obj);
});
rb_define_method(self,'cell_attribute',function(self,_,a_parameter){
});
self.$def('set_cell_attribute:to:',function(self,_,a_parameter,value){
});
rb_define_method(self,'image_rect_for_bounds',function(self,_,the_rect){
return the_rect;
});
rb_define_method(self,'title_rect_for_bounds',function(self,_,the_rect){
return the_rect;
});
rb_define_method(self,'drawing_rect_for_bounds',function(self,_,the_rect){
return the_rect;
});
rb_define_method(self,'cell_size',function(self,_){
});
rb_define_method(self,'cell_size_for_bounds',function(self,_,a_rect){
});
self.$def('highlight_color_with_frame:in_view:',function(self,_,cell_frame,control_view){
});
rb_define_method(self,'calc_draw_info',function(self,_,a_rect){
});
rb_define_method(self,'set_up_field_editor_attributes',function(self,_,text_obj){
return text_obj;
});
self.$def('render_interior_with_frame:in_view:',function(self,_,cell_frame,control_view){
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
});
self.$def('draw_interior_with_frame:in_view:',function(self,_,cell_frame,control_view){
});
self.$def('draw_with_frame:in_view:',function(self,_,cell_frame,control_view){
});
self.$def('highlight:with_frame:in_view:',function(self,_,flag,cell_frame,control_view){
if(RTEST(rb_funcall(rb_ivar_get(self,'@highlighted'),'!=',flag))){
self.$i_s('@highlighted',flag);
(function($v){
if(($e = rb_funcall(ID2SYM('render'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,'render_with_frame:in_view:',cell_frame,control_view);
}
else {
return rb_funcall(self,'draw_with_frame:in_view:',cell_frame,control_view);
}
})(rb_funcall(control_view,'display_mode'));
}
});
rb_define_method(self,'mouse_down_flags',function(self,_){
});
self.$def('get_periodic_delay:interval:',function(self,_,delay,interval){
});
rb_define_method(self,'render_context=',function(self,_,a_context){
return self.$i_s('@render_context',a_context);
});
rb_define_method(self,'render_context',function(self,_){
return rb_ivar_get(self,'@render_context');
});
self.$def('start_tracking_at:in_view:',function(self,_,start_point,control_view){
return true;
});
self.$def('continue_tracking:at:in_view:',function(self,_,last_point,current_point,control_view){
return true;
});
self.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_,last_point,stop_point,control_view,flag){
});
self.$def('track_mouse:in_rect:of_view:until_mouse_up:',function(self,_,the_event,cell_frame,control_view,flag){
var location=rb_funcall(control_view,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
if(!RTEST(rb_funcall(self,'start_tracking_at:in_view:',location,control_view))){
return false;
}
rb_funcall(self,'highlight:with_frame:in_view:',true,cell_frame,control_view);
if(RTEST(rb_funcall(self,'continuous?'))){
rb_funcall(control_view,'send_action:to:',rb_funcall(self,'action'),rb_funcall(self,'target'));
}
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
location=rb_funcall(control_view,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
if(RTEST(flag)){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self,'stop_tracking:at:in_view:mouse_is_up:',location,location,control_view,true);
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
if(RTEST(rb_funcall(location,'in_rect?',cell_frame))){
if(RTEST(rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('on')))){
self.$i_s('@state',ID2SYM('off'));
}
else{
self.$i_s('@state',ID2SYM('on'));
}
rb_funcall(control_view,'send_action:to:',rb_ivar_get(self,'@action'),rb_ivar_get(self,'@target'));
}
rb_funcall(self,'highlight:with_frame:in_view:',false,cell_frame,control_view);
return ;
}
else{
if(!RTEST(rb_funcall(self,'continue_tracking:at:in_view:',location,location,control_view))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
if(RTEST(rb_funcall(self,'continuous?'))){
rb_funcall(control_view,'send_action:to:',rb_funcall(self,'action'),rb_funcall(self,'target'));
}
rb_funcall(self,'highlight:with_frame:in_view:',RTEST(rb_funcall(location,'in_rect?',cell_frame)) ? true : false,cell_frame,control_view);
}
}
});
});
self.$def('edit_with_frame:in_view:editor:delegate:event:',function(self,_,a_rect,control_view,text_obj,an_obj,the_event){
});
self.$def('select_with_frame:in_view:editor:delegate:start:length:',function(self,_,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
rb_define_method(self,'end_editing',function(self,_,text_obj){
});
self.$def('reset_cursor_rect:in_view:',function(self,_,cell_frame,control_view){
});
rb_define_method(self,'menu=',function(self,_,a_menu){
return self.$i_s('@menu',a_menu);
});
rb_define_method(self,'menu',function(self,_){
return rb_ivar_get(self,'@menu');
});
self.$def('menu_for_event:in_rect:of_view:',function(self,_,the_event,cell_frame,view){
});
self.$def_s('default_menu',function(self,_){
});
rb_define_method(self,'sends_action_on_end_editing=',function(self,_,flag){
return self.$i_s('@sends_action_on_end_editing',flag);
});
rb_define_method(self,'sends_action_on_end_editing?',function(self,_){
return rb_ivar_get(self,'@sends_action_on_end_editing');
});
rb_define_method(self,'base_writing_direction',function(self,_){
return rb_ivar_get(self,'@base_writing_direction');
});
rb_define_method(self,'base_writing_direction=',function(self,_,direction){
return self.$i_s('@base_writing_direction',direction);
});
rb_define_method(self,'line_break_mode=',function(self,_,mode){
return self.$i_s('@line_break_mode',mode);
});
rb_define_method(self,'line_break_mode',function(self,_){
return rb_ivar_get(self,'@line_break_mode');
});
rb_define_method(self,'allows_undo=',function(self,_,flag){
return self.$i_s('@allows_undo',flag);
});
rb_define_method(self,'allows_undo?',function(self,_){
return rb_ivar_get(self,'@allows_undo');
});
rb_define_method(self,'refuses_first_responder=',function(self,_,flag){
return self.$i_s('@refuses_first_responder',flag);
});
rb_define_method(self,'refuses_first_responder?',function(self,_){
return rb_ivar_get(self,'@refuses_first_responder');
});
rb_define_method(self,'accepts_first_responder?',function(self,_){
return true;
});
rb_define_method(self,'shows_first_responder?',function(self,_){
return rb_ivar_get(self,'@shows_first_responder');
});
rb_define_method(self,'shows_first_responder=',function(self,_,flag){
return self.$i_s('@shows_first_responder',flag);
});
rb_define_method(self,'perform_click',function(self,_,sender){
});
rb_define_method(self,'attributed_string_value',function(self,_){
});
rb_define_method(self,'attributed_string_value=',function(self,_,obj){
});
rb_define_method(self,'allows_editing_text_attributes?',function(self,_){
return rb_ivar_get(self,'@allows_editing_text_attributes');
});
rb_define_method(self,'allows_editing_text_attributes=',function(self,_,flag){
self.$i_s('@allows_editing_text_attributes',flag);
if(!RTEST(flag)){
rb_funcall(self,'imports_graphics=',false);
}
});
rb_define_method(self,'imports_graphics?',function(self,_){
return rb_ivar_get(self,'@imports_graphics');
});
rb_define_method(self,'imports_graphics=',function(self,_,flag){
self.$i_s('@imports_graphics',flag);
if(RTEST(flag)){
var allows_editing_text_attributes=true;
}
});
rb_define_method(self,'allows_mixed_state=',function(self,_,flag){
return self.$i_s('@allows_mixed_state',flag);
});
rb_define_method(self,'allows_mixed_state?',function(self,_){
return rb_ivar_get(self,'@allows_mixed_state');
});
rb_define_method(self,'next_state',function(self,_){
});
rb_define_method(self,'set_next_state',function(self,_){
});
self.$def('hit_test_for_event:in_rect:of_view:',function(self,_,event,cell_frame,control_view){
});
})(rb_define_class_under(self,'Cell',cObject));
})(rb_define_module('Vienna'));
