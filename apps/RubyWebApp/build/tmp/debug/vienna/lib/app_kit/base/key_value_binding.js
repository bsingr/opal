var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('expose_binding',function(self,_cmd,binding){
});
$VN_2.$def('exposed_bindings',function(self,_cmd){
return [];
});
$VN_2.$def('value_class_for_binding',function(self,_cmd,binding){
});
$VN_2.$def('bind:to_object:with_key_path:options:',function(self,_cmd,binding,observable,key_path,options){
if(!RTEST(VN$(VN$(self, 'exposed_bindings'),'include?',binding))){
VN$(self,'puts',["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!RTEST(ANDTEST(observable,key_path))){
VN$(self,'puts',["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
VN$(self,'unbind',binding);
VN$(observable,'add_observer:for_key_path:options:context:',self,key_path,options,binding);
VN$(self.$i_g('@kvb_info'),'[]=',binding,VN.$h('observed_object', observable, 'observed_key_path', key_path, 'options', options, 'key', binding));
return VN$(self,'set_value_for_binding',binding);
});
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(self,_cmd,path,object,change,context){
if(RTEST(VN$(self,'info_for_binding',context))){
VN$(self,'puts',['KVB: received notification for chnage of context ',(context)].join(''));
VN$(self,'set_value_for_binding',context);
}
});
$VN_2.$def('set_value_for_binding',function(self,_cmd,binding){
var dict = VN$(self,'info_for_binding',binding);
var obj = VN$(dict,'[]','observed_object');
var path = VN$(dict,'[]','observed_key_path');
var key = VN$(dict,'[]','key');
var value = VN$(obj,'value_for_key_path',path);
return VN$(self,'set_value:for_key:',value,key);
});
$VN_2.$def('propagate_binding',function(self,_cmd,binding){
var binding_dict = VN$(self,'info_for_binding',binding);
if(!RTEST(binding_dict)){
return nil;
}
var obj = VN$(VN$(self, 'dict'),'[]','observed_object');
var path = VN$(VN$(self, 'dict'),'[]','observed_key_path');
var value = VN$(self,'value_for_key',VN$(VN$(self, 'dict'),'[]','key'));
return VN$(obj,'set_value:for_key_path:',value,path);
});
$VN_2.$def('unbind',function(self,_cmd,binding){
});
$VN_2.$def('info_for_binding',function(self,_cmd,binding){
return VN$(self.$i_g('@kvb_info'),'[]',binding);
});
$VN_2.$def('set_info:for_binding:',function(self,_cmd,info,binding){
return VN$(self.$i_g('@kvb_info'),'[]=',binding,info);
});
$VN_2.$def('option_descriptions_for_binding',function(self,_cmd,binding){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('set_default_placeholder:for_marker:with_binding:',function(self,_cmd,placeholder,marker,binding){
});
$VN_2.$def('default_placeholder_for_marker:with_binding:',function(self,_cmd,marker,binding){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('object_did_begin_editing',function(self,_cmd,editor){
});
$VN_2.$def('object_did_end_editing',function(self,_cmd,editor){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('discard_editing',function(self,_cmd){
});
$VN_2.$def('commit_editing?',function(self,_cmd){
});
$VN_2.$def('editor:did_commit:context_info:',function(self,_cmd,editor,did_commit,context_info){
});
$VN_2.$def('commit_editing_with_delegate:did_commit_selector:context_info:',function(self,_cmd,delegate,did_commit_selector,context_info){
});
$VN_1.$c_s('BINDING_NAMES',VN.$h('alignment', '', 'alternate_image', '', 'alternate_title', '', 'animate_binding', '', 'animation_delay', '', 'argument', '', 'attributed_string', '', 'content_array', '', 'content_array_for_multiple_selection', '', 'content', '', 'content_dictionary', '', 'content_height', '', 'content_object', '', 'content_objects', '', 'content_set', '', 'content_values', '', 'content_width', '', 'critical_value', '', 'data', '', 'display_pattern_title', '', 'display_pattern_value', '', 'document_edited', '', 'double_click_argument', '', 'double_click_target', '', 'editable', '', 'enabled', '', 'excluded_keys', '', 'filter_predicate', '', 'font', '', 'font_bold', '', 'font_family_name', '', 'font_italic', '', 'font_name', '', 'font_size', '', 'header_title', '', 'hidden', '', 'image', '', 'included_keys', '', 'initial_key', '', 'initial_value', '', 'is_intermediate', '', 'label', '', 'localized_key_dictionary', '', 'managed_object_context', '', 'maximum_recents', '', 'max_value', '', 'max_width', '', 'min_value', '', 'min_width', '', 'mixed_state_image', '', 'off_state_image', '', 'on_state_image', '', 'predicate', '', 'recent_searches', '', 'represented_filename', '', 'row_height', '', 'selected_identifier', '', 'selected_index', '', 'selected_label', '', 'selected_object', '', 'selected_objects', '', 'selected_tag', '', 'selected_value', '', 'selected_values', '', 'selection_indexes', '', 'selection_index_paths', '', 'sort_descriptors', '', 'target', '', 'text_color', '', 'title', '', 'tool_tip', '', 'transparent', '', 'value', '', 'value_path', '', 'value_url', '', 'visible', '', 'warning_value', '', 'width', ''));
$VN_1.$c_s('BINDING_OPTIONS',VN.$h('allows_editing_multiple_values_selection', '', 'allows_null_argument', '', 'always_presents_application_modal_alerts', '', 'conditionally_sets_editable', '', 'conditionally_sets_enabled', '', 'conditionally_sets_hidden', '', 'continuously_updates_value', '', 'creates_sort_descriptor', '', 'deletes_objects_on_remove', '', 'display_name', '', 'display_pattern', '', 'content_placement_tag', '', 'handles_content_as_compound_value', '', 'inserts_null_placeholder', '', 'invokes_separately_with_array_objects', '', 'multiple_values_placeholder', '', 'no_selection_placeholder', '', 'not_applicable_placeholder', '', 'null_placeholder', '', 'raises_for_not_applicable_keys', '', 'predicate_format', '', 'selector_name', '', 'selects_all_when_setting_content', '', 'validates_immediately', '', 'value_transformer_name', '', 'value_transformer', ''));
