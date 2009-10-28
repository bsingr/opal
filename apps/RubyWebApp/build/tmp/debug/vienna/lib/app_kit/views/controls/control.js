var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Control',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@cell',VN$(VN$(VN$(self,'class'),'cell_class'),'new'));
return VN$(self.$i_g('@cell'),'render_context=',self.$i_g('@display_context'));
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('Cell');
});
$VN_2.$def('render',function(self,_cmd,context){
VN$(self.$klass.$c_g_full('RenderContext'),'current_context=',context);
return VN$(self.$i_g('@cell'),'render_with_frame:in_view:',VN$(self, 'bounds'),self);
});
$VN_2.$def('class_name=',function(self,_cmd,class_name){
VN$(self, 'will_change_value_for_key', 'class_name');
VN$(self.$i_g('@cell'),'class_name=',class_name);
VN$(self, 'did_change_value_for_key', 'class_name');
});
$VN_2.$def('class_name',function(self,_cmd){
return VN$(self.$i_g('@cell'),'class_name');
});
$VN_2.$def('theme_name=',function(self,_cmd,theme_name){
VN$(self, 'will_change_value_for_key', 'theme_name');
VN$(self.$i_g('@cell'),'theme_name=',theme_name);
VN$(self, 'did_change_value_for_key', 'theme_name');
});
$VN_2.$def('theme_name',function(self,_cmd){
return VN$(self.$i_g('@cell'),'theme_name');
});
$VN_2.$def('cell',function(self,_cmd){
return self.$i_g('@cell');
});
$VN_2.$def('cell=',function(self,_cmd,a_cell){
VN$(self, 'will_change_value_for_key', 'cell');
self.$i_g('@cell');
VN$(self, 'did_change_value_for_key', 'cell');
});
$VN_2.$def('selected_cell',function(self,_cmd){
return self.$i_g('@cell');
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('calc_size',function(self,_cmd){
});
$VN_2.$def('target',function(self,_cmd){
return VN$(self.$i_g('@cell'),'target');
});
$VN_2.$def('target=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'target');
VN$(self.$i_g('@cell'),'target=',obj);
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
return VN$(self.$i_g('@cell'),'action');
});
$VN_2.$def('action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'action');
VN$(self.$i_g('@cell'),'action=',selector);
VN$(self, 'did_change_value_for_key', 'action');
});
$VN_2.$def('tag',function(self,_cmd){
return VN$(self.$i_g('@cell'),'tag');
});
$VN_2.$def('tag=',function(self,_cmd,tag){
VN$(self, 'will_change_value_for_key', 'tag');
VN$(self.$i_g('@cell'),'tag=',tag);
VN$(self, 'did_change_value_for_key', 'tag');
});
$VN_2.$def('selected_tag',function(self,_cmd){
return VN$(self.$i_g('@cell'),'tag');
});
$VN_2.$def('ignores_multi_click=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'ignores_multi_click');
VN$(self.$i_g('@cell'),'ignores_multi_click=',flag);
VN$(self, 'did_change_value_for_key', 'ignores_multi_click');
});
$VN_2.$def('ignores_multi_click?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'ignores_multi_click?');
});
$VN_2.$def('send_action_on',function(self,_cmd,mask){
});
$VN_2.$def('continuous?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'continuous?');
});
$VN_2.$def('continuous=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'continuous');
VN$(self.$i_g('@cell'),'continuous=',flag);
VN$(self, 'did_change_value_for_key', 'continuous');
});
$VN_2.$def('enabled?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'enabled?');
});
$VN_2.$def('enabled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'enabled');
VN$(self.$i_g('@cell'),'enabled=',flag);
VN$(self,'needs_display=',true);
VN$(self, 'did_change_value_for_key', 'enabled');
});
$VN_2.$def('control_tint',function(self,_cmd){
return VN$(self.$i_g('@cell'),'control_tint');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
VN$(self, 'will_change_value_for_key', 'control_tint');
VN$(self.$i_g('@cell'),'control_tint=',control_tint);
VN$(self, 'did_change_value_for_key', 'control_tint');
});
$VN_2.$def('control_size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'control_size');
VN$(self.$i_g('@cell'),'control_size=',size);
VN$(self, 'did_change_value_for_key', 'control_size');
});
$VN_2.$def('control_size',function(self,_cmd){
return VN$(self.$i_g('@cell'),'control_size');
});
$VN_2.$def('alignment',function(self,_cmd){
return VN$(self.$i_g('@cell'),'alignment');
});
$VN_2.$def('alignment=',function(self,_cmd,mode){
VN$(self, 'will_change_value_for_key', 'alignment');
VN$(self.$i_g('@cell'),'alignment=',mode);
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('font',function(self,_cmd){
return VN$(self.$i_g('@cell'),'font');
});
$VN_2.$def('font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'font');
VN$(self.$i_g('@cell'),'font=',font);
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('formatter=',function(self,_cmd,new_formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
VN$(self.$i_g('@cell'),'formatter=',new_formatter);
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
return VN$(self.$i_g('@cell'),'formatter');
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
VN$(self, 'did_change_value_for_key', 'object_value');
});
$VN_2.$def('string_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'string_value');
VN$(self, 'did_change_value_for_key', 'string_value');
});
$VN_2.$def('text=',function(self,_cmd,text){
VN$(self, 'will_change_value_for_key', 'text');
var string_value = text;
VN$(self, 'did_change_value_for_key', 'text');
});
$VN_2.$def('int_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'int_value');
VN$(self, 'did_change_value_for_key', 'int_value');
});
$VN_2.$def('float_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'float_value');
VN$(self, 'did_change_value_for_key', 'float_value');
});
$VN_2.$def('double_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'double_value');
VN$(self, 'did_change_value_for_key', 'double_value');
});
$VN_2.$def('object_value',function(self,_cmd){
});
$VN_2.$def('string_value',function(self,_cmd){
});
$VN_2.$def('to_s',function(self,_cmd){
return VN$(self, 'string_value');
});
$VN_2.$def('int_value',function(self,_cmd){
});
$VN_2.$def('to_i',function(self,_cmd){
return VN$(self, 'int_value');
});
$VN_2.$def('float_value',function(self,_cmd){
});
$VN_2.$def('to_f',function(self,_cmd){
return VN$(self, 'float_value');
});
$VN_2.$def('double_value',function(self,_cmd){
});
$VN_2.$def('update_cell',function(self,_cmd,a_cell){
});
$VN_2.$def('update_cell_inside',function(self,_cmd,a_cell){
});
$VN_2.$def('draw_cell_inside',function(self,_cmd,a_cell){
});
$VN_2.$def('draw_cell',function(self,_cmd,a_cell){
});
$VN_2.$def('select_cell',function(self,_cmd,a_cell){
});
$VN_2.$def('send_action:to:',function(self,_cmd,action,target){
VN$(self,'puts','sending action on');
if(RTEST(VN$(self,'info_for_binding','value'))){
VN$(self,'propagate_binding','value');
}
return VN$(self.$klass.$c_g_full('App'),'send_action:to:from:',action,target,self);
});
$VN_2.$def('take_int_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_float_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_double_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_object_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_string_value_from',function(self,_cmd,sender){
});
$VN_2.$def('current_editor',function(self,_cmd){
});
$VN_2.$def('abort_editing?',function(self,_cmd){
});
$VN_2.$def('validate_editing',function(self,_cmd){
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
if(!RTEST(VN$(self, 'enabled?'))){
return ;
}
VN$(self,'lock_focus');
VN$(self.$i_g('@cell'),'track_mouse:in_rect:of_view:until_mouse_up:',the_event,VN$(self, 'frame'),self,true);
return VN$(self,'unlock_focus');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('refuses_first_responder=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'refuses_first_responder');
VN$(self.$i_g('@cell'),'refuses_first_responder=',flag);
VN$(self, 'did_change_value_for_key', 'refuses_first_responder');
});
$VN_2.$def('refuses_first_responder?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'refuses_first_responder?');
});
$VN_2.$def('control_text_did_begin_editing',function(self,_cmd,notification){
});
$VN_2.$def('control_text_did_end_editing',function(self,_cmd,notification){
});
$VN_2.$def('control_text_did_change',function(self,_cmd,notification){
});
$VN_2.$def('attributed_string_value',function(self,_cmd){
return VN$(self.$i_g('@cell'),'attributed_string_value');
});
$VN_2.$def('attributed_string_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'attributed_string_value');
VN$(self.$i_g('@cell'),'attributed_string_value=',val);
VN$(self, 'did_change_value_for_key', 'attributed_string_value');
});
$VN_2.$def('bind:to_object:with_key_path:options:',function(self,_cmd,binding,observable,key_path,options){
if(RTEST(VN$(binding,'==','value'))){
VN$(self,'unbind',binding);
VN$(observable,'add_observer:for_key_path:options:context:',self,key_path,options,binding);
var binding_dict = VN.$h('observed_object', observable, 'observed_key_path', key_path, 'options', options, 'key', 'object_value');
VN$(self,'set_info:for_binding:',binding_dict,binding);
VN$(self,'set_value_for_binding',binding);
}
else{
VN$sup(arguments.callee, self,_cmd,[binding,observable,key_path,options]);
}
});
