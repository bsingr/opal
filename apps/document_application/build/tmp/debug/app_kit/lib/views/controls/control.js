(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
return self.$i_s('@cell',rb_funcall(rb_funcall(rb_funcall(self,'class'),'cell_class'),'new'));
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
return self.$i_s('@cell',rb_funcall(coder,'decode_object',ID2SYM('cell')));
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('Cell');
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(rb_ivar_get(self,'@cell'),'render_with_frame:in_view:',rb_funcall(self,'bounds'),self);
});
rb_define_method(self,'class_name=',function(self,_,class_name){
return rb_funcall(rb_ivar_get(self,'@cell'),'class_name=',class_name);
});
rb_define_method(self,'class_name',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'class_name');
});
rb_define_method(self,'theme_name=',function(self,_,theme_name){
return rb_funcall(rb_ivar_get(self,'@cell'),'theme_name=',theme_name);
});
rb_define_method(self,'theme_name',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'theme_name');
});
rb_define_method(self,'cell',function(self,_){
return rb_ivar_get(self,'@cell');
});
rb_define_method(self,'cell=',function(self,_,a_cell){
return rb_ivar_get(self,'@cell');
});
rb_define_method(self,'selected_cell',function(self,_){
return rb_ivar_get(self,'@cell');
});
rb_define_method(self,'size_to_fit',function(self,_){
});
rb_define_method(self,'calc_size',function(self,_){
});
rb_define_method(self,'target',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'target');
});
rb_define_method(self,'target=',function(self,_,obj){
return rb_funcall(rb_ivar_get(self,'@cell'),'target=',obj);
});
rb_define_method(self,'action',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'action');
});
rb_define_method(self,'action=',function(self,_,selector){
return rb_funcall(rb_ivar_get(self,'@cell'),'action=',selector);
});
rb_define_method(self,'on_action',function(self,_,block){
return rb_funcall(rb_ivar_get(self,'@cell'),'on_action',block);
});
rb_define_method(self,'tag',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'tag');
});
rb_define_method(self,'tag=',function(self,_,tag){
return rb_funcall(rb_ivar_get(self,'@cell'),'tag=',tag);
});
rb_define_method(self,'selected_tag',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'tag');
});
rb_define_method(self,'ignores_multi_click=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'ignores_multi_click=',flag);
});
rb_define_method(self,'ignores_multi_click?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'ignores_multi_click?');
});
rb_define_method(self,'send_action_on',function(self,_,mask){
});
rb_define_method(self,'continuous?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'continuous?');
});
rb_define_method(self,'continuous=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'continuous=',flag);
});
rb_define_method(self,'enabled?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'enabled?');
});
rb_define_method(self,'enabled=',function(self,_,flag){
rb_funcall(rb_ivar_get(self,'@cell'),'enabled=',flag);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'control_tint',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'control_tint');
});
rb_define_method(self,'control_tint=',function(self,_,control_tint){
return rb_funcall(rb_ivar_get(self,'@cell'),'control_tint=',control_tint);
});
rb_define_method(self,'control_size=',function(self,_,size){
return rb_funcall(rb_ivar_get(self,'@cell'),'control_size=',size);
});
rb_define_method(self,'control_size',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'control_size');
});
rb_define_method(self,'alignment',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'alignment');
});
rb_define_method(self,'alignment=',function(self,_,mode){
return rb_funcall(rb_ivar_get(self,'@cell'),'alignment=',mode);
});
rb_define_method(self,'font',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'font');
});
rb_define_method(self,'font=',function(self,_,font){
return rb_funcall(rb_ivar_get(self,'@cell'),'font=',font);
});
rb_define_method(self,'formatter=',function(self,_,new_formatter){
return rb_funcall(rb_ivar_get(self,'@cell'),'formatter=',new_formatter);
});
rb_define_method(self,'formatter',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'formatter');
});
rb_define_method(self,'object_value=',function(self,_,obj){
if(!RTEST(rb_funcall(obj,'==',rb_funcall(rb_ivar_get(self,'@cell'),'object_value')))){
rb_funcall(self,'abort_editing');
rb_funcall(rb_ivar_get(self,'@cell'),'object_value=',obj);
rb_funcall(self,'needs_display=',true);
}
});
rb_define_method(self,'string_value=',function(self,_,obj){
return rb_funcall(self,'object_value=',obj);
});
rb_define_method(self,'text=',function(self,_,text){
return string_value=text;
});
rb_define_method(self,'int_value=',function(self,_,val){
return rb_funcall(self,'object_value=',rb_funcall(self,'obj'));
});
rb_define_method(self,'float_value=',function(self,_,val){
return rb_funcall(self,'object_value=',rb_funcall(self,'obj'));
});
rb_define_method(self,'double_value=',function(self,_,val){
return rb_funcall(self,'object_value=',rb_funcall(self,'obj'));
});
rb_define_method(self,'object_value',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'object_value');
});
rb_define_method(self,'string_value',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'string_value');
});
rb_define_method(self,'to_s',function(self,_){
return rb_funcall(self,'string_value');
});
rb_define_method(self,'int_value',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'int_value');
});
rb_define_method(self,'to_i',function(self,_){
return rb_funcall(self,'int_value');
});
rb_define_method(self,'float_value',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'float_value');
});
rb_define_method(self,'to_f',function(self,_){
return rb_funcall(self,'float_value');
});
rb_define_method(self,'double_value',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'double_value');
});
rb_define_method(self,'draw_rect',function(self,_,the_rect){
return rb_funcall(rb_ivar_get(self,'@cell'),'draw_with_frame:in_view:',rb_funcall(self,'bounds'),self);
});
rb_define_method(self,'update_cell',function(self,_,a_cell){
});
rb_define_method(self,'update_cell_inside',function(self,_,a_cell){
});
rb_define_method(self,'draw_cell_inside',function(self,_,a_cell){
});
rb_define_method(self,'draw_cell',function(self,_,a_cell){
});
rb_define_method(self,'select_cell',function(self,_,a_cell){
});
self.$def('send_action:to:',function(self,_,action,target){
return rb_funcall(self.$klass.$c_g_full('App'),'send_action:to:from:',action,target,self);
});
rb_define_method(self,'take_int_value_from',function(self,_,sender){
});
rb_define_method(self,'take_float_value_from',function(self,_,sender){
});
rb_define_method(self,'take_double_value_from',function(self,_,sender){
});
rb_define_method(self,'take_object_value_from',function(self,_,sender){
});
rb_define_method(self,'take_string_value_from',function(self,_,sender){
});
rb_define_method(self,'current_editor',function(self,_){
});
rb_define_method(self,'abort_editing?',function(self,_){
});
rb_define_method(self,'validate_editing',function(self,_){
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
if(!RTEST(rb_funcall(self,'enabled?'))){
return ;
}
rb_funcall(self,'lock_focus');
rb_funcall(rb_ivar_get(self,'@cell'),'track_mouse:in_rect:of_view:until_mouse_up:',the_event,rb_funcall(self,'bounds'),self,true);
return rb_funcall(self,'unlock_focus');
});
rb_define_method(self,'perform_click',function(self,_,sender){
});
rb_define_method(self,'refuses_first_responder=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'refuses_first_responder=',flag);
});
rb_define_method(self,'refuses_first_responder?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'refuses_first_responder?');
});
rb_define_method(self,'control_text_did_begin_editing',function(self,_,notification){
});
rb_define_method(self,'control_text_did_end_editing',function(self,_,notification){
});
rb_define_method(self,'control_text_did_change',function(self,_,notification){
});
rb_define_method(self,'attributed_string_value',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'attributed_string_value');
});
rb_define_method(self,'attributed_string_value=',function(self,_,val){
return rb_funcall(rb_ivar_get(self,'@cell'),'attributed_string_value=',val);
});
self.$def('bind:to_object:with_key_path:options:',function(self,_,binding,observable,key_path,options){
if(RTEST(rb_funcall(binding,'==',ID2SYM('value')))){
rb_funcall(self,'unbind',binding);
rb_funcall(observable,'add_observer:for_key_path:options:context:',self,key_path,options,binding);
var binding_dict=VN.$h(ID2SYM('observed_object'), observable, ID2SYM('observed_key_path'), key_path, ID2SYM('options'), options, ID2SYM('key'), 'object_value');
rb_funcall(self,'set_info:for_binding:',binding_dict,binding);
rb_funcall(self,'set_value_for_binding',binding);
}
else{
rb_supcall(arguments.callee, self,_,[binding,observable,key_path,options]);
}
});
})(rb_define_class_under(self,'Control',self.$c_g_full('View')));
})(rb_define_module('Vienna'));
