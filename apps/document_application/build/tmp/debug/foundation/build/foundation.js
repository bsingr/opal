(function(self) {
self.$c_s('Object',cObject.$c_g('Object'));
self.$c_s('Array',cObject.$c_g('Array'));
self.$c_s('Dictionary',cObject.$c_g('Hash'));
self.$c_s('Bundle',cObject.$c_g('Bundle'));
(function(self) {
self.$def('perform_selector:with_object:with_object:',function(self,_,selector,obj1,obj2){
return VN$(self, selector, obj1, obj2);});
self.$def('perform_selector:with_object:',function(self,_,selector,obj){
return VN$(self, selector, obj);});
rb_define_method(self,'perform_selector',function(self,_,selector){
return VN$(self, selector);});
})(rb_define_class_under(self,'Object',cObject));
})(rb_define_module('Vienna'));
cObject.$c_s('VN',cObject.$c_g('Vienna'));

(function(self) {
self.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
(function(self) {
self.$def_s('access_instance_variables_directly?',function(self,_){
return true;
});
rb_define_method(self,'value_for_key',function(self,_,key){
var accessor=key;
if(RTEST(rb_funcall(self,'respond_to?',accessor))){
return rb_funcall(self,'perform_selector',accessor);
}
accessor=[(key),"?"].join('');
if(RTEST(rb_funcall(self,'respond_to?',accessor))){
return rb_funcall(self,'perform_selector',accessor);
}
if(RTEST(rb_funcall(rb_funcall(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return rb_funcall(self,'value_for_undefined_key',key);
});
self.$def('set_value:for_key:',function(self,_,value,key){
var accessor=[(key),"="].join('');
if(RTEST(rb_funcall(self,'respond_to?',accessor))){
rb_funcall(self,'perform_selector:with_object:',accessor,value);
return value;
}
if(RTEST(rb_funcall(rb_funcall(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {rb_funcall(self,'will_change_value_for_key',key);
self.$iv_tbl['@' + key] = value;rb_funcall(self,'did_change_value_for_key',key);
return value;
}}
return rb_funcall(self,'set_value:for_undefined_key:',value,key);
});
self.$def('validate_value:for_key:error:',function(self,_,value,key,out_error){
});
rb_define_method(self,'array_value_for_key',function(self,_,key){
});
rb_define_method(self,'set_value_for_key',function(self,_,key){
});
rb_define_method(self,'value_for_key_path',function(self,_,path){
return rb_funcall(self,'value_for_key',path);
});
self.$def('set_value:for_key_path:',function(self,_,value,path){
return rb_funcall(self,'set_value:for_key:',value,path);
});
self.$def('validate_value:for_key_path:error:',function(self,_,value,path,out_error){
});
rb_define_method(self,'array_value_for_key_path',function(self,_,path){
});
rb_define_method(self,'set_value_for_key_path',function(self,_,path){
});
rb_define_method(self,'value_for_undefined_key',function(self,_,key){
});
self.$def('set_value:for_undefined_key:',function(self,_,value,key){
});
rb_define_method(self,'set_nil_value_for_key',function(self,_,key){
});
rb_define_method(self,'dictionary_with_values_for_keys',function(self,_,keys){
});
rb_define_method(self,'set_values_for_keys_with_dictionary',function(self,_,keyed_values){
});
})(rb_define_class_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,'value_for_key',function(self,_,key){
});
self.$def('set_value:for_key:',function(self,_,value,key){
});
})(rb_define_class_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,'value_for_key',function(self,_,key){
});
self.$def('set_value:for_key:',function(self,_,value,key){
});
})(rb_define_class_under(self,'Dictionary',cObject));
(function(self) {
rb_define_method(self,'value_for_key',function(self,_,key){
});
self.$def('set_value:for_key:',function(self,_,value,key){
});
})(rb_define_class_under(self,'Set',cObject));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('KEY_VALUE_CHANGE_KIND_KEY','KEY_VALUE_CHANGE_KIND_KEY');
self.$c_s('KEY_VALUE_CHANGE_NEW_KEY','KEY_VALUE_CHANGE_NEW_KEY');
self.$c_s('KEY_VALUE_CHANGE_OLD_KEY','KEY_VALUE_CHANGE_OLD_KEY');
self.$c_s('KEY_VALUE_CHANGE_INDEXES_KEY','KEY_VALUE_CHANGE_INDEXES_KEY');
self.$c_s('KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY','KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY');
self.$c_s('KEY_VALUE_OBSERVING_OPTIONS',VN.$h(ID2SYM('new'), 1, ID2SYM('old'), 2, ID2SYM('initial'), 4, ID2SYM('prior'), 8));
self.$c_s('KEY_VALUE_CHANGE',VN.$h(ID2SYM('setting'), 0, ID2SYM('insertion'), 1, ID2SYM('removal'), 2, ID2SYM('replacement'), 3));
(function(self) {
self.$def('observe_value_for_key_path:of_object:change:context:',function(self,_,path,object,change,context){
});
self.$def('add_observer:for_key_path:options:context:',function(self,_,observer,key_path,options,context){
rb_funcall(self,'_kvo_setup');
var key_observers=rb_funcall(rb_ivar_get(self,'@_kvo_observers'),'[]',key_path);
if(!RTEST(key_observers)){
key_observers=VN.$h();
rb_funcall(rb_ivar_get(self,'@_kvo_observers'),'[]=',key_path,key_observers);
}
return rb_funcall(key_observers,'[]=',observer,VN.$h(ID2SYM('observer'), observer, ID2SYM('key_path'), key_path, ID2SYM('options'), options, ID2SYM('context'), context));
});
self.$def('remove_observer:for_key_path:',function(self,_,observer,key_path){
});
rb_define_method(self,'_kvo_setup',function(self,_){
if(RTEST(rb_ivar_get(self,'@_kvo_observers'))){
return ;
}
(function(self) {
self.$def_s('will_change_value_for_key',function(self,_,a_key){
return rb_supcall(arguments.callee, self,_,[a_key]);
});
self.$def_s('did_change_value_for_key',function(self,_,a_key){
});
self.$def_s('will_change:values_at_indexes:for_key:',function(self,_,change,indexes,a_key){
});
self.$def_s('did_change:values_at_indexes:for_key:',function(self,_,change,indexes,a_key){
});
})(self);
return self.$i_s('@_kvo_observers',VN.$h());
});
})(rb_define_class_under(self,'Object',cObject));
(function(self) {
self.$def('add_observer:to_objects_at_indexes:for_key_path:options:context:',function(self,_,observer,indexes,key_path,options,context){
});
self.$def('remove_observer:from_objects_at_indexes:for_key_path:',function(self,_,observer,indexes,keyPath){
});
self.$def('add_observer:for_key_path:options:context:',function(self,_,observer,key_path,options,context){
});
self.$def('remove_observer:for_key_path:',function(self,_,observer,key_path){
});
})(rb_define_class_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,'will_change_value_for_key',function(self,_,key){
return rb_funcall(self,'puts',key);
});
rb_define_method(self,'did_change_value_for_key',function(self,_,key){
});
self.$def('will_change:values_at_indexes:for_key:',function(self,_,changeKind,indexes,key){
});
self.$def('did_change:values_at_indexes:for_key:',function(self,_,changeKind,indexes,key){
});
self.$def_s('key_paths_for_values_affecting_value_for_key',function(self,_,key){
});
rb_define_method(self,'automatically_notifies_observers_for_key',function(self,_,key){
return true;
});
rb_define_method(self,'observation_info=',function(self,_,info){
return self.$i_s('@observation_info',info);
});
rb_define_method(self,'observation_info',function(self,_){
return rb_ivar_get(self,'@observation_info');
});
})(rb_define_class_under(self,'Object',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('name'),ID2SYM('object'),ID2SYM('user_info'));
rb_define_method(self,'initialize',function(self,_,name,obj,info){
rb_supcall(arguments.callee, self,_,[]);
self.$i_s('@name',name);
self.$i_s('@object',obj);
return self.$i_s('@user_info',info);
});
self.$def_s('notification_with_name:object:',function(self,_,name,obj){
return rb_funcall(self,'notification_with_name:object:user_info:',name,obj,nil);
});
self.$def_s('notification_with_name:object:user_info:',function(self,_,name,obj,info){
return rb_funcall(self,'new',name,obj,info);
});
})(rb_define_class_under(self,'Notification',cObject));
(function(self) {
self.$def_s('default_center',function(self,_){
return self.$i_s('@default_center',ORTEST(rb_ivar_get(self,'@default_center'),rb_funcall(self,'new')));
});
rb_define_method(self,'initialize',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
return self.$i_s('@dispatch_table',[]);
});
self.$def('add_observer:selector:name:object:',function(self,_,observer,selector,name,obj){
return rb_funcall(rb_ivar_get(self,'@dispatch_table'),'<<',VN.$h(ID2SYM('observer'), observer, ID2SYM('selector'), selector, ID2SYM('name'), name, ID2SYM('sender'), obj, ID2SYM('active'), true));
});
rb_define_method(self,'post_notification',function(self,_,notification){
return rb_funcall(self,'post_notification_name:object:user_info:',rb_funcall(notification,'name'),rb_funcall(notification,'object'),rb_funcall(notification,'user_info'));
});
self.$def('post_notification_name:object:',function(self,_,name,obj){
return rb_funcall(self,'post_notification_name:object:user_info:',name,obj,nil);
});
self.$def('post_notification_name:object:user_info:',function(self,_,name,obj,info){
return rb_funcall(rb_ivar_get(self,'@dispatch_table'),'each',function(the_obj){
if(RTEST(rb_funcall(rb_funcall(the_obj,'[]',ID2SYM('name')),'==',name))){
rb_funcall(rb_funcall(the_obj,'[]',ID2SYM('observer')),'perform_selector:with_object:with_object:',rb_funcall(the_obj,'[]',ID2SYM('selector')),obj,info);
}
});
});
rb_define_method(self,'remove_observer',function(self,_,observer){
});
self.$def('remove_observer:name:object:',function(self,_,observer,name,obj){
});
self.$def('add_observer_for_name:object:queue:',function(self,_,name,obj,queue){
});
})(rb_define_class_under(self,'NotificationCenter',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,str,attributes){
self.$i_s('@string',str);
return self.$i_s('@attributes',attributes);
});
rb_define_method(self,'string',function(self,_){
return rb_ivar_get(self,'@string');
});
self.$def('attributes_at_index:effective_range:',function(self,_,location,range){
});
rb_define_method(self,'length',function(self,_){
});
self.$def('attribute:at_index:effective_range:',function(self,_,attr_name,location,range){
});
rb_define_method(self,'attributed_substring_from_range',function(self,_,range){
});
self.$def('attributes_at_index:longest_effective_range:in_range:',function(self,_,location,range,range_limit){
});
self.$def('attribute:at_index:longest_effective_range:in_range:',function(self,_,attr_name,location,range,range_limit){
});
rb_define_method(self,'equal_to_attribted_sring?',function(self,_,other){
return false;
});
self.$def('replace_characters_in_range:with_string:',function(self,_,range,str){
});
self.$def('set_attributes:range:',function(self,_,attrs,range){
});
self.$def('add_attribute:value:range:',function(self,_,name,valye,range){
});
self.$def('add_attributes:range:',function(self,_,attrs,range){
});
self.$def('remove_attribute:range:',function(self,_,name,range){
});
self.$def('replace_characters_in_range:with_attributed_string:',function(self,_,range,attr_string){
});
self.$def('insert_attributed_string:at_index:',function(self,_,attr_string,loc){
});
rb_define_method(self,'append_attributed_string',function(self,_,attr_string){
});
rb_define_method(self,'delete_characters_in_range',function(self,_,range){
});
rb_define_method(self,'set_attributed_string',function(self,_,attr_string){
});
rb_define_method(self,'begin_editing',function(self,_){
});
rb_define_method(self,'end_editing',function(self,_){
});
})(rb_define_class_under(self,'AttributedString',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,obj){
self.$i_s('@count',0);
return self.$i_s('@ranges',[]);
});
self.$def_s('index_set',function(self,_){
return rb_funcall(self,'new');
});
self.$def_s('index_set_with_index',function(self,_,value){
var obj=rb_funcall(self,'new');
rb_funcall(obj,'add_index',value);
return obj;
});
self.$def_s('index_set_with_indexes_in_range',function(self,_,range){
var obj=rb_funcall(self,'new');
rb_funcall(obj,'add_indexes_in_range',range);
return obj;
});
rb_define_method(self,'equal_to_index_set?',function(self,_,index_set){
return false;
});
rb_define_method(self,'count',function(self,_){
return rb_ivar_get(self,'@count');
});
rb_define_method(self,'ranges',function(self,_){
return rb_ivar_get(self,'@ranges');
});
rb_define_method(self,'first_index',function(self,_){
if(RTEST((rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'==',0)))){
return rb_funcall((1),'-@');
}
var first_index=rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',0),'first');
rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'times',function(range){
if(RTEST(rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'first'),'<',first_index))){
first_index=rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'first');
}
});
return first_index;
});
rb_define_method(self,'last_index',function(self,_){
if(RTEST((rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'==',0)))){
return rb_funcall((1),'-@');
}
var last_index=rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',0),'last'),'-',1);
rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'times',function(range){
if(RTEST(rb_funcall((rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'last'),'-',1)),'>',last_index))){
last_index=rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'last'),'-',1);
}
});
return last_index;
});
rb_define_method(self,'member?',function(self,_,index){
return rb_funcall(self,'include?',index);
});
rb_define_method(self,'include?',function(self,_,index){
var result=false;
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'==',0))){
return result;
}
rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'times',function(range){
if(RTEST(ANDTEST((rb_funcall(index,'>=',rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'first'))),(rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'last'),'>',index))))){
result=true;
}
});
return result;
});
rb_define_method(self,'add_index',function(self,_,index){
return rb_funcall(self,'add_indexes_in_range',VN.$r(index,rb_funcall(index,'+',1),false));
});
rb_define_method(self,'add_indexes_in_range',function(self,_,range){
return rb_funcall(rb_ivar_get(self,'@ranges'),'<<',range);
});
rb_define_method(self,'add_indexes',function(self,_,indexes){
});
})(rb_define_class_under(self,'IndexSet',cObject));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('PROPERTY_LIST_FORMATS',VN.$h());
(function(self) {
(function(self) {
self.$def_s('property_list:is_valid_for_format:',function(self,_,plist,format){
return true;
});
self.$def_s('property_list_from_data:format:error_description:',function(self,_,data,format,error_description){
return vn_binary_plist_parse(data);});
})(self);
})(rb_define_class_under(self,'PropertyListSerialization',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
(function(self) {
self.$def_s('main_bundle',function(self,_){
return rb_funcall(rb_ivar_get(self,'@all_bundles'),'[]','');
});
self.$def_s('bundle_with_path',function(self,_,path){
});
self.$def_s('bundle_with_url',function(self,_,url){
});
self.$def_s('bundle_for_class',function(self,_,a_class){
return rb_ivar_get(a_class, '__bundle__');});
self.$def_s('bundle_with_identifier',function(self,_,identifier){
});
self.$def_s('all_bundles',function(self,_){
});
self.$def_s('all_frameworks',function(self,_){
});
})(self);
rb_define_method(self,'init_with_path',function(self,_,path){
return self;
});
rb_define_method(self,'init_with_url',function(self,_,url){
});
rb_define_method(self,'load',function(self,_){
});
rb_define_method(self,'loaded?',function(self,_){
return true;
});
rb_define_method(self,'unload',function(self,_){
});
rb_define_method(self,'bundle_url',function(self,_){
});
rb_define_method(self,'resource_url',function(self,_){
});
rb_define_method(self,'executable_url',function(self,_){
});
rb_define_method(self,'bundle_path',function(self,_){
return rb_ivar_get(self,'@bundle_path');
});
rb_define_method(self,'resource_path',function(self,_){
});
rb_define_method(self,'executable_path',function(self,_){
});
self.$def('url_for_resource:with_extension:',function(self,_,name,ext){
});
rb_define_method(self,'path_for_resource',function(self,_,name){
return rb_funcall(rb_ivar_get(self,'@url_map'),'[]',["resources/",(name)].join(''));
});
self.$def('path_for_resource:of_type:',function(self,_,name,ext){
return ["resources/",(name),".",(ext)].join('');
});
self.$def('load_vib_named:external_name_table:load_delegate:',function(self,_,name,name_table,delegate){
var vib=rb_funcall(self.$klass.$c_g_full('VN').$c_g('Vib'),'new',name,self,delegate);
rb_funcall(vib,'instantiate_vib_with_external_name_table',name_table);
return vib;
});
self.$def('resource_contents_for_file:of_type:',function(self,_,name,ext){
return rb_funcall(rb_ivar_get(self,'@resources'),'[]',["resources/",(name),".",(ext)].join(''));
});
rb_define_method(self,'info_dictionary',function(self,_){
return rb_ivar_get(self,'@info_dictionary');
});
})(rb_define_class_under(self,'Bundle',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$def_s('unarchive_object_with_data',function(self,_,data){
return rb_funcall(self,'new',data);
});
self.$def_s('unarchive_object_with_file',function(self,_,path){
});
rb_define_method(self,'initialize',function(self,_,data){
self.$i_s('@plist',rb_funcall(self.$klass.$c_g_full('PropertyListSerialization'),'property_list_from_data:format:error_description:',data,nil,nil));
self.$i_s('@context_stack',[rb_ivar_get(self,'@plist')]);
return self.$i_s('@uid_table',VN.$h());
});
rb_define_method(self,'delegate=',function(self,_,a_delegate){
return self.$i_s('@delegate',a_delegate);
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'push_context',function(self,_,context){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'<<',context);
});
rb_define_method(self,'pop_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'pop');
});
rb_define_method(self,'current_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'last');
});
rb_define_method(self,'finish_decoding',function(self,_){
});
self.$def('set_class:for_class_name:',function(self,_,klass,coded_name){
});
rb_define_method(self,'class_for_class_name',function(self,_,coded_name){
});
rb_define_method(self,'has_key?',function(self,_,key){
return true;
});
rb_define_method(self,'decode_current_object',function(self,_){
var ctx=rb_funcall(self,'current_context');
var id=rb_funcall(ctx,'[]','_id');
var class_str=rb_funcall(ctx,'[]','_class');
var obj_class=rb_funcall(self.$klass.$c_g_full('Object'),'full_const_get',class_str);
var obj=rb_funcall(obj_class,'alloc');
rb_funcall(obj,'init_with_coder',self);
obj=rb_funcall(obj,'awake_after_using_coder',self);
rb_funcall(rb_ivar_get(self,'@uid_table'),'[]=',id,obj);
return obj;
});
rb_define_method(self,'decode_object',function(self,_,key){
var ctx=rb_funcall(self,'current_context');
key=rb_funcall(key,'to_s');
var result=nil;
if(RTEST(rb_funcall(ctx,'has_key?',key))){
var prop=rb_funcall(ctx,'[]',key);
if(RTEST(rb_funcall(prop,'is_a?',self.$klass.$c_g_full('String')))){
return prop;
}
else if(RTEST(rb_funcall(prop,'is_a?',self.$klass.$c_g_full('Array')))){
result=[];
rb_funcall(prop,'each',function(array_item){
rb_funcall(self,'push_context',array_item);
rb_funcall(result,'<<',rb_funcall(self,'decode_current_object'));
return rb_funcall(self,'pop_context');
});
return result;
}
else if(RTEST(rb_funcall(prop,'is_a?',self.$klass.$c_g_full('Number')))){
return rb_funcall(rb_ivar_get(self,'@uid_table'),'[]',prop);
}
else{
rb_funcall(self,'push_context',prop);
result=rb_funcall(self,'decode_current_object');
rb_funcall(self,'pop_context');
return result;
}
}
else{
return nil;
}
return rb_funcall(self,'puts',["keyed_unarchiver: got here.......? ",(rb_funcall(key,'to_s'))].join(''));
});
rb_define_method(self,'decode_bool',function(self,_,key){
return rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s'));
});
rb_define_method(self,'decode_int',function(self,_,key){
return rb_funcall(rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s')),'to_i');
});
rb_define_method(self,'decode_float',function(self,_,key){
return rb_funcall(rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s')),'to_f');
});
rb_define_method(self,'decode_double',function(self,_,key){
return rb_funcall(rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s')),'to_f');
});
rb_define_method(self,'decode_rect',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Rect'),'from_string',rb_funcall(context,'[]',rb_funcall(key,'to_s')));
});
rb_define_method(self,'decode_point',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Point'),'from_string',rb_funcall(context,'[]',rb_funcall(key,'to_s')));
});
rb_define_method(self,'decode_size',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Size'),'from_string',rb_funcall(context,'[]',rb_funcall(key,'to_s')));
});
})(rb_define_class_under(self,'KeyedUnarchiver',cObject));
})(rb_define_module('Vienna'));
