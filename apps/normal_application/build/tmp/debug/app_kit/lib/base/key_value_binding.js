(function(self) {
(function(self) {
self.$def_s('expose_binding',function(self,_,binding){
});
rb_define_method(self,'exposed_bindings',function(self,_){
return [];
});
rb_define_method(self,'value_class_for_binding',function(self,_,binding){
});
self.$def('bind:to_object:with_key_path:options:',function(self,_,binding,observable,key_path,options){
if(!RTEST(rb_funcall(rb_funcall(self,'exposed_bindings'),'include?',binding))){
rb_funcall(self,'puts',["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!RTEST(ANDTEST(observable,key_path))){
rb_funcall(self,'puts',["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
rb_funcall(self,'unbind',binding);
rb_funcall(observable,'add_observer:for_key_path:options:context:',self,key_path,options,binding);
rb_funcall(rb_ivar_get(self,'@kvb_info'),'[]=',binding,VN.$h(ID2SYM('observed_object'), observable, ID2SYM('observed_key_path'), key_path, ID2SYM('options'), options, ID2SYM('key'), binding));
return rb_funcall(self,'set_value_for_binding',binding);
});
self.$def('observe_value_for_key_path:of_object:change:context:',function(self,_,path,object,change,context){
if(RTEST(rb_funcall(self,'info_for_binding',context))){
rb_funcall(self,'puts',['KVB: received notification for chnage of context ',(context)].join(''));
rb_funcall(self,'set_value_for_binding',context);
}
});
rb_define_method(self,'set_value_for_binding',function(self,_,binding){
var dict=rb_funcall(self,'info_for_binding',binding);
var obj=rb_funcall(dict,'[]',ID2SYM('observed_object'));
var path=rb_funcall(dict,'[]',ID2SYM('observed_key_path'));
var key=rb_funcall(dict,'[]',ID2SYM('key'));
var value=rb_funcall(obj,'value_for_key_path',path);
return rb_funcall(self,'set_value:for_key:',value,key);
});
rb_define_method(self,'propagate_binding',function(self,_,binding){
var binding_dict=rb_funcall(self,'info_for_binding',binding);
if(!RTEST(binding_dict)){
return nil;
}
var obj=rb_funcall(rb_funcall(self,'dict'),'[]',ID2SYM('observed_object'));
var path=rb_funcall(rb_funcall(self,'dict'),'[]',ID2SYM('observed_key_path'));
var value=rb_funcall(self,'value_for_key',rb_funcall(rb_funcall(self,'dict'),'[]',ID2SYM('key')));
return rb_funcall(obj,'set_value:for_key_path:',value,path);
});
rb_define_method(self,'unbind',function(self,_,binding){
});
rb_define_method(self,'info_for_binding',function(self,_,binding){
return rb_funcall(rb_ivar_get(self,'@kvb_info'),'[]',binding);
});
self.$def('set_info:for_binding:',function(self,_,info,binding){
return rb_funcall(rb_ivar_get(self,'@kvb_info'),'[]=',binding,info);
});
rb_define_method(self,'option_descriptions_for_binding',function(self,_,binding){
});
})(rb_define_class_under(self,'Object',cObject));
(function(self) {
self.$def_s('set_default_placeholder:for_marker:with_binding:',function(self,_,placeholder,marker,binding){
});
self.$def('default_placeholder_for_marker:with_binding:',function(self,_,marker,binding){
});
})(rb_define_class_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,'object_did_begin_editing',function(self,_,editor){
});
rb_define_method(self,'object_did_end_editing',function(self,_,editor){
});
})(rb_define_class_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,'discard_editing',function(self,_){
});
rb_define_method(self,'commit_editing?',function(self,_){
});
self.$def('editor:did_commit:context_info:',function(self,_,editor,did_commit,context_info){
});
self.$def('commit_editing_with_delegate:did_commit_selector:context_info:',function(self,_,delegate,did_commit_selector,context_info){
});
})(rb_define_class_under(self,'Object',cObject));
self.$c_s('BINDING_NAMES',VN.$h(ID2SYM('alignment'), '', ID2SYM('alternate_image'), '', ID2SYM('alternate_title'), '', ID2SYM('animate_binding'), '', ID2SYM('animation_delay'), '', ID2SYM('argument'), '', ID2SYM('attributed_string'), '', ID2SYM('content_array'), '', ID2SYM('content_array_for_multiple_selection'), '', ID2SYM('content'), '', ID2SYM('content_dictionary'), '', ID2SYM('content_height'), '', ID2SYM('content_object'), '', ID2SYM('content_objects'), '', ID2SYM('content_set'), '', ID2SYM('content_values'), '', ID2SYM('content_width'), '', ID2SYM('critical_value'), '', ID2SYM('data'), '', ID2SYM('display_pattern_title'), '', ID2SYM('display_pattern_value'), '', ID2SYM('document_edited'), '', ID2SYM('double_click_argument'), '', ID2SYM('double_click_target'), '', ID2SYM('editable'), '', ID2SYM('enabled'), '', ID2SYM('excluded_keys'), '', ID2SYM('filter_predicate'), '', ID2SYM('font'), '', ID2SYM('font_bold'), '', ID2SYM('font_family_name'), '', ID2SYM('font_italic'), '', ID2SYM('font_name'), '', ID2SYM('font_size'), '', ID2SYM('header_title'), '', ID2SYM('hidden'), '', ID2SYM('image'), '', ID2SYM('included_keys'), '', ID2SYM('initial_key'), '', ID2SYM('initial_value'), '', ID2SYM('is_intermediate'), '', ID2SYM('label'), '', ID2SYM('localized_key_dictionary'), '', ID2SYM('managed_object_context'), '', ID2SYM('maximum_recents'), '', ID2SYM('max_value'), '', ID2SYM('max_width'), '', ID2SYM('min_value'), '', ID2SYM('min_width'), '', ID2SYM('mixed_state_image'), '', ID2SYM('off_state_image'), '', ID2SYM('on_state_image'), '', ID2SYM('predicate'), '', ID2SYM('recent_searches'), '', ID2SYM('represented_filename'), '', ID2SYM('row_height'), '', ID2SYM('selected_identifier'), '', ID2SYM('selected_index'), '', ID2SYM('selected_label'), '', ID2SYM('selected_object'), '', ID2SYM('selected_objects'), '', ID2SYM('selected_tag'), '', ID2SYM('selected_value'), '', ID2SYM('selected_values'), '', ID2SYM('selection_indexes'), '', ID2SYM('selection_index_paths'), '', ID2SYM('sort_descriptors'), '', ID2SYM('target'), '', ID2SYM('text_color'), '', ID2SYM('title'), '', ID2SYM('tool_tip'), '', ID2SYM('transparent'), '', ID2SYM('value'), '', ID2SYM('value_path'), '', ID2SYM('value_url'), '', ID2SYM('visible'), '', ID2SYM('warning_value'), '', ID2SYM('width'), ''));
return self.$c_s('BINDING_OPTIONS',VN.$h(ID2SYM('allows_editing_multiple_values_selection'), '', ID2SYM('allows_null_argument'), '', ID2SYM('always_presents_application_modal_alerts'), '', ID2SYM('conditionally_sets_editable'), '', ID2SYM('conditionally_sets_enabled'), '', ID2SYM('conditionally_sets_hidden'), '', ID2SYM('continuously_updates_value'), '', ID2SYM('creates_sort_descriptor'), '', ID2SYM('deletes_objects_on_remove'), '', ID2SYM('display_name'), '', ID2SYM('display_pattern'), '', ID2SYM('content_placement_tag'), '', ID2SYM('handles_content_as_compound_value'), '', ID2SYM('inserts_null_placeholder'), '', ID2SYM('invokes_separately_with_array_objects'), '', ID2SYM('multiple_values_placeholder'), '', ID2SYM('no_selection_placeholder'), '', ID2SYM('not_applicable_placeholder'), '', ID2SYM('null_placeholder'), '', ID2SYM('raises_for_not_applicable_keys'), '', ID2SYM('predicate_format'), '', ID2SYM('selector_name'), '', ID2SYM('selects_all_when_setting_content'), '', ID2SYM('validates_immediately'), '', ID2SYM('value_transformer_name'), '', ID2SYM('value_transformer'), ''));
})(rb_define_module('Vienna'));
