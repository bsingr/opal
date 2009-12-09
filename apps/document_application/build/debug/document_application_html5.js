vnlib$1.0$e49$h2$s9$image_dirs6$imagess12$display_modes6$renderc249$_I=rb_define_method;_C=ANDTEST;_J=rb_define_singleton_method;_E=rb_funcall;_B=ORTEST;_A=RTEST;_M=rb_define_class;_K=rb_define_module;_N=rb_define_class_under;_L=rb_define_module_under;_H=rb_ivar_get;_O=ID2SYM;_G=rb_ivar_set;_F=rb_supcall;_D=NOTTEST;b6456$vnfmwk$1.0$p8$/browserr261$8$info.yml247$vnplist$1.0$h7$s16$bundle_icon_files0$s17$bundle_identifiers23$com.yourcompany.browsers15$principal_classs15$VN::Applications13$main_vib_files9$main_menus19$bundle_package_types4$APPLs11$bundle_names7$browsers25$bundle_development_regions7$Englishc6162$
(function(self) {
self.$def_s('ready?',function(self,_,block){
});
self.$def_s('<<',function(self,_,elem){
var e=elem.$i_g('@element');
document.body.appendChild(e);});
self.$def_s('add_event_listener',function(self,_,type,listener){
self.$i_s('@event_listeners',ORTEST(rb_ivar_get(self,'@event_listeners'),VN.$h()));
rb_funcall(rb_ivar_get(self,'@event_listeners'),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(rb_funcall(type,'to_s'), listener, false);
    }
    else {
      document.body.attachEvent('on' + rb_funcall(type,'to_s'), listener);
    }});
self.$def_s('remove_event_listener',function(self,_,type){
var listener=rb_funcall(rb_ivar_get(self,'@event_listeners'),'[]',type);
if (document.addEventListener) {
      document.body.removeEventListener(rb_funcall(type,'to_s'), listener, false);
    }
    else {
      document.body.detachEvent('on' + rb_funcall(type,'to_s'), listener);
    }});
self.$c_g_full('Document').$def_s('age',function(self,_){
return 3;
});
})(rb_define_class('Document',cObject));

(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('element'));
(function(self) {
self.$def_s('find',function(self,_,the_id){
document.getElementById(the_id)});
self.$def_s('[]',function(self,_,id){
return rb_funcall(self,'find',id);
});
self.$def_s('body',function(self,_){
document.body});
})(self);
rb_define_method(self,'initialize',function(self,_,type,options){
self.$i_s('@element',document.createElement(rb_funcall(type,'to_s')));
return self.$i_s('@type',type);
});
rb_define_method(self,'element',function(self,_){
return rb_ivar_get(self,'@element');
});
rb_define_method(self,'class_name=',function(self,_,name){
rb_funcall(self,'element').className = name;});
rb_define_method(self,'css',function(self,_,options){
rb_funcall(options,'each',function(key,value){
rb_funcall(self,'element').style[rb_funcall(rb_funcall(key,'to_s'),'camelize')] = value; });
return self;
});
rb_define_method(self,'set_attribute',function(self,_,key,value){
rb_funcall(self,'element').setAttribute(rb_funcall(key,'to_s'), value);});
rb_define_method(self,'src=',function(self,_,obj){
rb_funcall(self,'element').src = obj;});
rb_define_method(self,'inner_text=',function(self,_,str){
rb_funcall(self,'element').innerHTML = str;});
rb_define_method(self,'frame=',function(self,_,new_frame){
rb_funcall(self,'origin=',rb_funcall(new_frame,'origin'));
return rb_funcall(self,'size=',rb_funcall(new_frame,'size'));
});
rb_define_method(self,'origin=',function(self,_,new_origin){
rb_funcall(self,'element').style.left = rb_funcall(new_origin,'x') + 'px';rb_funcall(self,'element').style.top = rb_funcall(new_origin,'y') + 'px';});
rb_define_method(self,'size=',function(self,_,new_size){
if(RTEST(rb_funcall(rb_ivar_get(self,'@type'),'==','canvas'))){
rb_funcall(self,'element').width = rb_funcall(new_size,'width');rb_funcall(self,'element').height = rb_funcall(new_size,'height');}
else{
rb_funcall(self,'element').style.width = rb_funcall(new_size,'width') + 'px';rb_funcall(self,'element').style.height = rb_funcall(new_size,'height') + 'px';}
});
rb_define_method(self,'remove',function(self,_,other){
rb_funcall(self,'element').removeChild(rb_funcall(other,'element'));});
rb_define_method(self,'<<',function(self,_,other){
if(RTEST(ORTEST(rb_funcall(other,'instance_of?',self.$klass.$c_g_full('String')),rb_funcall(other,'instance_of?',self.$klass.$c_g_full('Number'))))){
rb_funcall(self,'element').innerHTML += other;}
else if(RTEST(rb_funcall(other,'nil?'))){
}
else{
rb_funcall(self,'element').appendChild(rb_funcall(other,'element'));}
});
rb_define_method(self,'append_raw_element',function(self,_,raw_element){
rb_funcall(self,'element').appendChild(raw_element);});
rb_define_method(self,'inner_html=',function(self,_,str){
rb_funcall(self,'element').innerHTML = str;});
rb_define_method(self,'observe',function(self,_,type,block){
self.$i_s('@event_listeners',ORTEST(rb_ivar_get(self,'@event_listeners'),VN.$h()));
rb_funcall(rb_ivar_get(self,'@event_listeners'),'[]=',type,block);
if (document.addEventListener) {
      rb_funcall(self,'element').addEventListener(rb_funcall(type,'to_s'), rb_funcall(self,'listener'), false);
    }
    else {
      rb_funcall(self,'element').attachEvent('on' + rb_funcall(type,'to_s'), rb_funcall(self,'listener'));
    }});
rb_define_method(self,'add_event_listener',function(self,_,type,listener){
if (document.addEventListener) {
      rb_funcall(self,'element').addEventListener(rb_funcall(type,'to_s'), listener, false);
    }
    else {
      rb_funcall(self,'element').attachEvent('on' + rb_funcall(type,'to_s'), listener);
    }});
})(rb_define_class('Element',cObject));

(function(self) {
rb_define_method(self,'initialize',function(self,_,url,options,block){
});
self.$def_s('get',function(self,_,url,options,block){
return rb_funcall(self.$c_g_full('JSONP'),'get',url,options,block);
});
})(rb_define_class('JSON',cObject));
(function(self) {
self.$c_s('JSONP_CALLBACKS',[]);
rb_define_method(self,'initialize',function(self,_,url,options,block){
self.$i_s('@url',url);
self.$i_s('@callback',"vn_jsonp_callback_0");
self.$i_s('@block',block);
rb_funcall(self.$klass.$c_g_full('JSONP_CALLBACKS'),'<<',rb_ivar_get(self,'@callback'));
rb_funcall(self,'puts',["Initializing JSNOP connection with url: ",(rb_ivar_get(self,'@url'))].join(''));
return rb_funcall(self,'get!');
});
rb_define_method(self,'get!',function(self,_){
window[rb_ivar_get(self,'@callback')] = function(response) {
      rb_funcall(self, 'got_response', response);
    };self.$i_s('@script',document.createElement('script'));
rb_ivar_get(self,'@script').setAttribute('type', 'text/javascript');rb_ivar_get(self,'@script').setAttribute('src', rb_ivar_get(self,'@url'));document.body.appendChild(rb_ivar_get(self,'@script'));});
rb_define_method(self,'got_response',function(self,_,response){
rb_funcall(self,'puts','got response! toot!');
return rb_funcall(rb_ivar_get(self,'@block'),'call',JSONParserReformatter(response));
});
self.$def_s('get',function(self,_,url,options,block){
return rb_funcall(self,'new',url,options,block);
});
})(rb_define_class('JSONP',cObject));
b21848$vnfmwk$1.0$p11$/foundationr268$8$info.yml254$vnplist$1.0$h7$s16$bundle_icon_files0$s17$bundle_identifiers26$com.yourcompany.foundations15$principal_classs15$VN::Applications13$main_vib_files9$main_menus19$bundle_package_types4$APPLs11$bundle_names10$foundations25$bundle_development_regions7$Englishc21542$(function(self) {
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
b317195$vnfmwk$1.0$p8$/app_kitr261$8$info.yml247$vnplist$1.0$h7$s16$bundle_icon_files0$s17$bundle_identifiers23$com.yourcompany.app_kits15$principal_classs15$VN::Applications13$main_vib_files9$main_menus19$bundle_package_types4$APPLs11$bundle_names7$app_kits25$bundle_development_regions7$Englishu802$53$resources/button/rounded/regular/highlighted_left.png742$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAb5JREFUeNqMlD1PwlAUhm8/KIWKfLSELyMG4tDBBR38BbIYWVwciANhNg76s4yJg4MjbDoTF1IGAgshBNEQ21Lfg5aAoZSTnDQ39zz3vPeec8oVi0XmZfV6XQsGg1c8z5exzOF7JK4LrFarSiwWuxVF8U5V1V0YCwQCTJZl9h/garVaDgGPqVTqWNM0JknSSsAywEHCPoKbmUxmD8BamQugXC6HotHoQzab9QxeBnhd1+/T6XQJp7NNNgcqlUoyFArd0Ml4CV+Az+fzF7hgDBDzMwJERVEuE4mE7+kLQBCEw3A4vDUgoChJVJQB3Arg6WTXtwHIBo7j7GybYQYzLMs6oHv4GWmwh8Ph82QyYcvSvFzAc3K2bQ8KhcI1Ki2RLI7jPJ0Ap9frWaVSaTcej59SK9PGpgwOaWu32+/opzMUUYtEIr/t65GB9ma4g2Wa5iv66RwtQgPE8HKeAGWxO53OB6AmpuwE05ZEu88HyJVI5gIuZBqGMWq1Wi80bePxWEcWCfC8CyB3BXChbwR+NRqNt263+4Q5Ho5GI9bv96dwlfP4a1B+GmaqpAKX/9aC6FHQGXxK2eCfbs+R/wgwAH+8esjuXxrrAAAAAElFTkSuQmCCu320$55$resources/button/rounded/regular/highlighted_middle.png258$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFJJREFUeNpsh7sJwDAMBZ/sBbKDF8iuXsedNhEIYdS7fflB0uSK4w69d0JVWU5QRARPfaq1/u9d78LMCHcnIoKYcxKZSay1iDEG0VrbL22HAAMAmqEhGe5ndYgAAAAASUVORK5CYII=u855$54$resources/button/rounded/regular/highlighted_right.png794$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeVJREFUeNqMU01LAmEQns31CwUlCBWjiycvHuo/5NH+QEfpVrf+RFAHDwXiRQ+Bh6CDSDcTtItdDCQIlZAVbRVNW7923W1GdkVK3R0Y3q/nmXne951hY7GYJMvyGwBwOD5Np9P7eDzegQ3G5PN5ZTKZgCiKMBgMoNvtDiRJuur3+zepVEr4RygUCsrqxmw2g06nA+12+xUDnCQSCQ63l5gdhmFg1a1WK/j9fvIjt9v9Eo1GDyjwkoAG69zn8xFp3+VyPYTDYbsuQSN5vd7DYDB4SVhdArnH4wG73X4RiUT2iMCaTCbYZggmkns8Hp/i8lo3AzneA2w22zElYGlDz5xOJ1gslhBOzbqS1ItiaHYXpyZDGbBkiCTSfxjKgKUCiqJ8GXoljYBZ6pTMkKTRaATD4fDZEGE+n1Mh/uRyuTQuxa2SqBix3Kl6E6VSqU3qNmagQDzPQ71ef0+n07ekbK0kimo2m6HVakGtVuMzmcwZji1qlcUrad9PQIpKmjmOg2q1WkHwOWqvII46T14QHA4HCIIA2MvQ6/UILDSbzVQymbxrNBrUbd90d00BWywWAXv6A3saJfPFbDb7WC6XG3jWVyPPV1uUCQQCIXWTNE5U0Ehdy38fg0X/VA/IJXrrdUDNfgUYADXh4oUtmGf8AAAAAElFTkSuQmCCu821$48$resources/button/rounded/regular/normal_left.png766$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAc9JREFUeNqMlL9OwlAUxm//UGorRWgJIZR/IQ4OJkR9Bl2MkwsLr2AcdGOBkWfwFYyJJg6uLkQXwuLWsAABEUktKVCK5xAggkB7km+45Pvde8/Xc6HS6TTZVKVSSREEIcswzBksozRNH7LrjPl8XgyHw9csy95EIhEpEAgQjuOIKIpkFaAKhUJUluWHWCx2DGYCEBmPx2QymZB+v78EUMViMR4MBl8TiYSKZsuyyGAwWNpxAWSz2R1Jku7j8biqKMo/4ypAZzKZW1VVj+CE6c6bagrkcrkQNHWFZrzvtkKATiaTF9DoHv7gBmB5nr/0+XzEtm3iVOxM+x6PxzXAQMYhiqIcr7PoAXd2Y16kBDF+DofDXa/X6wqwTdPUDMNI4hg4FY1Jdjqd5263O23aSQhY5XL5qd1u/8BJ7oBqtdoE4K7ZbE6b3yYGxmGCd6vVah+pVOoUHouCc4/jvE4IoN+GWbcgqTdYn8PLEuGlbQXwlHGj0dBHo9ErjMkJrEMYM8BrgTk0qtfr35qmvfj9fqLr+gHcm0MjNoyx/wXm0BC+Sb9Sqby3Wq1HMH31ej0CoZggmdrwr4HpcSABJIL42ZrZ9GlxbE08DWTMZw71K8AAI+MrxtEeUScAAAAASUVORK5CYII=u295$50$resources/button/rounded/regular/normal_middle.png238$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAENJREFUeNpi2rt373/G79+//2f6+vUrA9P///8ZmP79+4dM/P37F4OLEMMmi2YA2NDz588zMN+8eXMjEwMDwwOAAAMAUZ9GPmG4zO4AAAAASUVORK5CYII=u850$49$resources/button/rounded/regular/normal_right.png794$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeNJREFUeNqMUz1PKlEQnYUVIgUxgDQQKOgN0f9g/VqKR/s6rbCkobSw1MbKwsTCxIZgQUEBJiSEgsS85CW8GNggLAQRd/nYhXXOZtcYP9adZLL33j1n5ty5M0K5XNbX63WLiKTVanWrquplLpcb0jcmMMBQFIWWyyWNx2Pq9XrPuq4f9/v9k0KhoHwiDIdDw+PxkCAI5PV6icEgUafTaYxGo1/5fF5inGETPIZhEEsxgYvFglgexWIxSiaTe+Fw+I6zJBD4jQDAewcZxEgkQolEIh4MBq8zmczmtwTbkTEUClE8Ht9Np9NHwDoS7Gwg+Xy+w2w2u20ScOjksGg0upVKpX4D75jB9kAgQKIo7jNBFHHwk/n9fpR8h5cbop3WyfBGHDjES68rgiVNA9eVJLyLpmkDrF1lQK/N5/P/SOYqw2QygVdcEdDF3Lkv1Wr1irfaj5IYTLIsn7darT5vdccMAHOb/y0Wi6e8VR0lDQYD6na7cqVS+cPfR6gzq/SRwOWDBJIk6b5Wqx00Go17FArRTQIGaDabmcDpdIrICk/aRalUOuM1pm3C/nZRsdlsohL/uP9lLl2tXq/ftNvtDv97siKv3o+owG27Yx1C49wCqdb+0wVF9gfrB1zHNb4C2vYqwADq1ImRYEMJhQAAAABJRU5ErkJggg==u520$59$resources/button/textured_rounded/regular/disabled_left.png454$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAYCAYAAADZEIyjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOZJREFUeNqskk0KgzAQhTMxGqkoreKuCOKu9+iuXqM3cem9vEaRLly4lQZ/0plQwaKFFjrwIr4vkxkyEVmWMQwoy/Lged4ZAI4oX5BZFEWI5jVNUxnHMXMchxng+/4lSRIZRREbhoH1fW+AhZGEYWjMOUSe5zvOuTVNE1uGUEoBmSswmyugtTbmOI7b4GPGJqBjPh71fY1595+6+qk4r6pK4f2PlLG8N45Qd113b5rmDVg4ILBtuw2C4ERzkVIy/BrA6rpWOL0bmvu2bV3MFoCvBKgWSqJcaoj+adEoaumB6l+b4CnAABDav1EiLyDcAAAAAElFTkSuQmCCu306$61$resources/button/textured_rounded/regular/disabled_middle.png238$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEJJREFUeNpi2Lt3bwPD9+/fG5i+fv3KwPT//38Gpn///iETf//+xeAixLDJohkANvT8+fMMDMrKyhJMDAwMHwACDADK3EKPoNn6DQAAAABJRU5ErkJggg==u517$60$resources/button/textured_rounded/regular/disabled_right.png450$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAYCAYAAADZEIyjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAONJREFUeNqkUTsKg0AQnY2mSGVjkdLgTXIpwcqr5BoBmxQBK7GzFASJohIJumrUzYwYCBghn4W3O7Nv3tvPMNu2LSHEDRHmeX40TbMAAME451bbtpAkCQRBwIuiOBiGEa/KsoSu60BVVdA0bYNjjwomowUQhmEARVFAkqQdEpJMG68Di9a4rGbElLMlAuS+798Ti4qPrZ75D2csWv1/q+8eSDE63GdEmqZQVVVIvz82ijqYZRlEUdT4vn8msey6Lsl5XdcXx3FOnufF9Bym6/qWKhAdokY0owKnK3lOZD/F4iHAAA+3yaWhqiKzAAAAAElFTkSuQmCCu543$62$resources/button/textured_rounded/regular/highlighted_left.png474$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAYCAYAAADZEIyjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPNJREFUeNqkkk2Kg0AQhfsnHR3BFhUE4yYgc4ZZeYs5gRvvkgvkMC5nNzmBB3DhzmQxIEE7ryRmEkwWSQreourrfk3ziqdpylC8KIrUsqyNEOIL/WpBwzzPPx3H2cVxrH3fZ0opRkC6rrtNkkRHUcSmIrDEiYyGnPN/kGVZCKCklOy6Fn3f4z3BSDfAGMPvAvKl4cxqAg9vzMBk87zV3RuvWb3/QVGW5X4YhuMELwIcuq77bdt2TI4sR+sgCKRt21UYht/IfKm1ZuhHYKqqOsDuBxGvm6bx6rq2ObaE8lSQhjzog/aAMjfQEWqhv/MeiJMAAwCXCDMiUGBUWQAAAABJRU5ErkJggg==u305$64$resources/button/textured_rounded/regular/highlighted_middle.png234$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD9JREFUeNpinDx58n8mAwMDBiYgYGBiZGSEshAEMzMzdi6YhVMWTjB8+/btP8uxY8cYGJWVlQ2YhYSEfgAEGAAQGgvqusZZvQAAAABJRU5ErkJggg==u548$63$resources/button/textured_rounded/regular/highlighted_right.png478$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAYCAYAAADZEIyjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPhJREFUeNq0kbFugzAQhn+DKRJMERMDEw+QZ+Cd+gZVtmyMSDwGMxKSOzE0mRnSoUJCIlGABBWKe67CUKlIbaVY+u07f/efZZuFYSgBvE3TJNq2fYzj+JVyybIsk8MwoK5rlGV5JBhEUbTTaMA0TbiuC8/zVpZlbciha4wxzHIcB5zzgMADV455qFjXdYtC/g3MUC1LAJysP4NFx69bzfk/Dv97qztdUEqpnv9yK/h6ahiGgaZp0Pf9M+1Pmm3b6nNQVRWKojjneb4lMHIhBMZxrLuue0mS5ClN0z2Bd+b7/pqCD9KVdCI1pIHTdFA9lV1V3orkpwADACjVVdnhin00AAAAAElFTkSuQmCCu542$57$resources/button/textured_rounded/regular/normal_left.png478$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAYCAYAAADZEIyjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNqskr1qhEAUhefHGRPEWVBsUkhE8gyp9hHs8ko2Aet9oG1k8wSprSyEJIUgo07OFYQNcWEX9sJh4Hxzf5g7PM9zhuBVVeVBELxzzl+hJ4/MsixfYH5kWWaSJGFaa0ZAhmF4SNPUxHHMxnFk1toFaCnlPoqixVzDK4oiFkKoeZ7ZeXjDMAgy/wEYfBM45xZzmqZtcDFjE1CZi6Wu77HevtNUNzUXdV1/4/0tZawXSAJw7vv+1LbtHyCxIKmU+jTGvGEv2vd9hnMBrmmaH2zvCPO567odsh84fglHOQUZaAc90j+gnTvIQl9QT5PSUL8CDACOZ8HDeoZCDQAAAABJRU5ErkJggg==u328$59$resources/button/textured_rounded/regular/normal_middle.png262$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeNpsx7EJwCAYBeHDCbKDC2R/cAY3+BFBRLS30heSNCnSfNwRQhBzTjHGEL130VoTtVZRShE5Z5FSEmYmt9biZe/9rb99kISLMYL3/rw5LgEGADhtSOP0JUTjAAAAAElFTkSuQmCCu523$58$resources/button/textured_rounded/regular/normal_right.png458$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAYCAYAAADZEIyjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOhJREFUeNqkUc0KgkAQHnUJ7CKBDyD4AD2D7xQIXqNbr+S18CTWxaN12IOoZeEP5k8zYRCY0M/At7uz3zff7jCCbdsdBkdskiRZWJZ1BIBOKIqiq6oKwjCEIAhOaZoapmnuxCzLoK5rUFUVNE2bybK8wgqJoQUQ2rYFRVFAkiQDiQmji9dA0RQ3NiD6XBwjgDVN854YrfjY6pn/8Mao1f+/+q5BOqNDPiCiKII8z7ekeQyKJhjHMXDOL77vr5Gomeu6VJ6UZek5jrP0PG+PRCXouj6nvhAF4oy4Im4MlwN5Ujkpe1F3F2AA0OXJKWmm9CcAAAAASUVORK5CYII=u212$35$resources/hud_window_background.png170$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpi1NPTewYQYAACjgFyr/seWgAAAABJRU5ErkJggg==u589$64$resources/scrollers/horizontal/scroller_horizontal_knob_left.png518$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAARCAYAAAAPFIbmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARZJREFUeNpi+v//PwMhzMRABGAxMLZAF2PasW2jtaCgYDkrC4sZExOTKAuSJGNbSyOvrY1VExcXV+7fv3+Zfv36BbYOWRGrna31QnZ29oCfP3+iWgelmVctXxzGysoaANKN4SYozSEkJJT++/dv7A6H0lwcHOwmIPtxKWI0NNAXBCrgwKeI4fyFi7+BbvnBzMzMgU0RLDD/vn795jq+EAfZ8f3U6TOb/v37x4ANw0z61jdh8qb7Dx6exmYSs4SkDEjRPxA+eer0LXk5WQlRURFFZJNgikBW/voKBHv27r/y5cuX5wL8/AJsbGzcjIyMbIz6RubwuIP6VgCIpYBYEspmR447kGmgIH8LxF+A+CkoJkBRBhBgAJSTr/gEzz3MAAAAAElFTkSuQmCCu327$66$resources/scrollers/horizontal/scroller_horizontal_knob_middle.png254$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAARCAYAAAAcw8YSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE9JREFUeNo0xLsJwzAAQMEHWcKB7BBw43W8uho1EpL1bV+qXHGo8E/23rLWkjmnjDGk9y6tNam1SilFcs6SUpIYo4QQ5Hte9+t4f56fAAMANTs5szn29v4AAAAASUVORK5CYII=u606$65$resources/scrollers/horizontal/scroller_horizontal_knob_right.png534$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAARCAYAAAAPFIbmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASJJREFUeNpi/P//PwMhwMRABGABYrBR//79e/rr168TL16+bAoICr8MEwcBxm/fvoE5jIyMDExMTAwsLCw/Pn781Oro4tEBFP4Dtg7kJhAGmsTw588fhh8/fnDw8vI079+zowdqE0IRMv758ycDFxdn7rw5M6xBarAqAuHfv38zSUlJZgIVsbHgCwI2VlYLIMWFVxHQM4JAioMF5GBcAOjzTyA34TXp5avXV0FBiNMkoOZ/+/cfXAdk/sBp0vkLF7cuXrr8KMhWFqBXUSSBJv89dfrM1q6eCf1A7gsg/gVX9O3b90/PX7y4s2bt+lVHj504BhS6A8Qgh/9j1DcyTwAxgPgnEL8D4mdA/Byq4A8sFRyAxvhfIP4OxF+hGuCOBQgwAD45sWMoVwySAAAAAElFTkSuQmCCu281$60$resources/scrollers/horizontal/scroller_horizontal_track.png214$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAARCAIAAACToVFFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNo8x1EKAEAIQkEyvf9BOmO12McKw0NUFUhC0udvmQnPjYizu6e7MTPuE2AAMrMRdXObRokAAAAASUVORK5CYII=u923$54$resources/scrollers/horizontal/scroller_left_arrow.png862$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAARCAYAAADOk8xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhhJREFUeNq0VUtLG1EUPvNISPOoLkMrZPoD3ATzA1oRpNC1YCTQf5BFVv4BS6Go4C4uRFsCElo01pq0C4PL0iAI2bV00RHbCaWTSMYxMeP5wq2o5CnOgQ/uPZw533nekUqlkkMuiSRJFAgErG+lw/lXr9/ssMpUoXSLLBgM1tfW383ndna/skqG3jXCUChEH7Zyq0z2k68tRhNQZVm+dzKv10snJ7+PNt5mDvl6zrAYZzjLIBwGkHw+T6qqdrXx+/20mX2/y6Z1Ro1xKs7DEVqWRZlMhsrlcjuLTjYIxLbP/+0XD36IrOoiQ2R6MVBJ0Wdd1ymbzbZJIR6Ph5rNZsdy/tKPv4uegcRmNEDGcPoSgoxXhwqFArVarSv99RJfF0VRqFqtmmJQLgRwdgqftvsTwgGPN92e5m6EsOOyKt2CV+Gwl8BpLBYjTdMonU6TaZpX+k7fQv+QRewdDFRxlqamX0h9hwZRNRoNCofDlEqlKBKJ3MjwNlD2scePnqDNaKmAR5APRggntm2Tz+ejZDJJ0Wi0KynseS1GJ589BamP4Wc8EMTKwGvhOE47U0xmPB7vmSVs5mZnnguyECMozl552KWHMxAjgF7BaVpkPDE3O8GfoJ+jjBEQ3/lpQ+l6vcMILJGIv/xjGPpe/jNemwAeAskwDNd+T2KtzrZyHxeWlle+8PWvVKlUXCX83+tqrbZfLB4sXgowADMYwd4obsQsAAAAAElFTkSuQmCCu976$55$resources/scrollers/horizontal/scroller_right_arrow.png914$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAARCAYAAADOk8xKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAj5JREFUeNpi1DcyF1dRVhLLyUpPkZSUyPr27RsLAw0Bs4SkDNe79+9Zd+zac4+RkfGGgb6e5b9//9hBkkA+1THIQpDhbEDMce3ajZ/fvn97YmFuZvPr1y8mWlnIDLSMCYhZQZbevn33l7KyEpuCvJz6nz9/qG4hyKKfQPwViD9B8ecJk6bu+Pfv/wcWFhYGJiYmnBgkf+TIEQZC6lAw0IK/QPwLiL8D8ReQ5cCE8/XylasnODg48GpmZWVlOH36NMPOnTshrifSQgaopb+hvv0BcsD5CxdvsrGx4dUMkgeBS5cuMaxfv54BmNgIW7hr+6b/QD3/kCwF4T83bt56yczMTNAAGLh79y7DypUrGX78+IFfDygooOA/FIMs///06bOvpFgIAk+ePGHYunUr3jhlQdLECE2tIMwoIy3FDU7GzMw4MzG6hXJycgzR0dFg8b9//2LVw+Ls5g2zCGQyCzR7sOjoaEv+//8fw1BcFmpoaDCkpKQwgLISMA/j1AcrxpihFoEKAU5QQWBmaqINSwS4ACw6zMzMGKKiosAWgSzE5ntkC5mhJQ3IIh4g5uLm4uLR1dEyIsZCBwcHhuDgYIbv378z/P79G69lMAtBvuIGYj4o5i0rLXQD5kEBkAFIiQoDgILc19cXnDJBcQYrTfABFiTfcYHowAA/NTtbG2+QZfhcCgMgi0AWE2MZzEJ4QomNiVRLiIvJBwYlMzGWIQctMZbBLGSSkZZmaWqsjVBUVEj/9/cvO3KCoDYACDAAq+DCrQAWwecAAAAASUVORK5CYII=u739$54$resources/scrollers/vertical/scroller_bottom_arrow.png678$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAcCAIAAAAIkcNzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAY5JREFUeNrsVEuKwkAQNZUMIQSyUFAx6MKFoExceQHBhXiAxBPkYi69ixcRRQkZYxK759mtbTvEgZnlMI/8qK5Xn+5XMdbrtWVZb3dYAqZpEhGehgAXuFwujDE8sUS8VuMcF94vwe/AN/m+zxn7nqDTms0m4XZdlwnaK6Zcgo9t21fO8XgcjUaO45RlqRfw5M15URTott/v53lOMB0OhyB4b7fboKFFroGJ1suiqNfrg8EADghk4YZ1u922Wq1ut7vb7dL0A255Xti2gWJQeaPRAD/LMrmNlqoB2ZDd8zxUjA9stOwBsU+n03W7iEC45VFAwiRJ0jQlAXlKCsqNaj/HP+d3nMf54Lz2+/1qtZICUcD5xnEM+Vfn6XQ6YRh+iQpLr9eTCqjgQAdBEMznc2WZzWaTyYQ9DxjpskdVEM50Oh2Px7AMh8PFYgFpglPdj6RhPKDI5XIJgUVRdD6fEUjK+dH5ZrORJqVF/EMwgpiC6+SI/dCV+pgFHahEhpda1hVdUZtOu7VL9Pf19inAADUkBScZRVI7AAAAAElFTkSuQmCCu788$51$resources/scrollers/vertical/scroller_top_arrow.png730$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAcCAIAAAAIkcNzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbVJREFUeNrsU8tOwkAUte10SqGwla3gD6hbn/8LIYE9CSyIoiG4QUJSDdQNQmVT6fTtaYfwDAb33Ekmk7nn3Lm554zQ6XSEJMSdkCRp9zJGnvw/jpx9HN/3y+Wy4ziHciBCrVbr9/uVSuUgDiRrtVog4DwYDOr1Om7+4iCt63qj0VjeNJvNXq+3RRPXCaZpVqvVraqlUmk8Hm+UXvoN7lJVNZfLYceZV4miyPM8DCMMQ+5J7GRrXJZlMcaWluVdgclLcNiKgwQ4qLfP10ePrsXGrG3bHo0M0/y2GYMm6Uy88vnT82JB07RtTTHo3lvfMD4JIZRSWSaJOCJGHyDCsFg4u7q8QHahqeu67ecXy/pJp9OqmkJQmUIbpIH2PN9x2HA4ms1mD/d3yBJU6nZfHcfNZvG+BlpKUWRZhqCCKERh5Ac+s9l8bqPbx6f27c01MQzDcV1Ny+CJjJaB2RSqJL3FNkDPeCrullJm257r6u8fZDo1gVYUBWh+AAJ9c+9EialITJeww6+TyRdBG0AocdBFS+uBKcFpiTsxFM8jfhBgSjGHM9eQq08Ve1wQAODfXgqCXwEGAKjx0WP8LLoUAAAAAElFTkSuQmCCu595$62$resources/scrollers/vertical/scroller_vertical_knob_bottom.png526$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARtJREFUeNpi/P//PwMU/Pn+/TsziI+O//37h0L//v2b4devX//9g8KTgPoOMMFMACp4zUAC+P79x2eQNiD+Dzfk27dvJxgZGYk25OmzZ/eB1E8g/gs35NHjJ3OYmJiINmT3nn1HgNQHIP4B1xUVk7Dv7bt3a4kx4PKVq2d27Nx9Dsh8AcRfka3+WV5Zm3/n7r2lwMD7h00zUPz/0WMnDjY0tS0Gch8A8XOQPkZY7BgYW4AoViAWS0qM83B2cswQFRFW5+Dg4P3y5euXJ0+fPly2fNXOAwcPXQaqAYXHHSB+BcS/0Q2BGcQPxJJALAXEglCx30D8HoifQV3wESrGwILF1SCJdyC/QhVzADEzKBZAgQgV/wmNXjAACDAAC2yTNVKnjCAAAAAASUVORK5CYII=u275$62$resources/scrollers/vertical/scroller_vertical_knob_middle.png206$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAABCAYAAAA4u0VhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACtJREFUeNpi/P//PwMU/P/+/TsDiI+O//37h0L//v0bjP0CwxKB+g4ABBgAo30pujUhEEwAAAAASUVORK5CYII=u540$59$resources/scrollers/vertical/scroller_vertical_knob_top.png474$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPVJREFUeNpi/P//PwOlgAWb4Pfv3/XZ2NjqGRkZLZiYmCT//fv34vuPH2evXLnamZ6Zexqo5BcQ/4OpZ0RzCdvfv3/LmZmZa4Aa2X7+/Mnw588fBqAYA9BAkPI/r1+/nl5YXNby+MnTd0CBPxiGADVOBdqc9fv3bwaQASA5EAaKo9CvX79ZFxmTkAPU8gaIfzPBDPj565cdyIBfv34xgDA+ICDAH5SZnhICYgIxE9wQZqABIJtAzicGaGlqRAMpKSBmhxsCdIUdsQaAgJiYqAaQkgBibmRDxEAuIRZwcHDwQr3DwYQkzkxKmgHGFkgvO0gfQIABAJ+edejlzrqkAAAAAElFTkSuQmCCu269$56$resources/scrollers/vertical/scroller_vertical_track.png206$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAABCAIAAAC32dI2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACxJREFUeNpiXL16NQsLCysMsIABMzMzExMTkGQEg/9g8Pfv33///gFJgAADAOtDEVS8zMtUAAAAAElFTkSuQmCCu949$32$resources/slider/normal_knob.png910$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjxJREFUeNqUVDuPElEYvcMwbHjIY4ThEQISG2OiRmMot6ORiFoaDQ3ZSPgJ1P4GjAUNBVbsRtTORC1oTXCTDTYEkFcgyyovec54PjIkC5s17JecSW7u/c6c78y5w7GLxeXz+YggCGGNRvOA5/k7y+XyWJbl7/P5/FMkEsnjjLLRcH6RTqfdHo/nrcPheCyKIjOZTMxoNLLRaMSGwyHr9Xqs2+1+aDabr2KxWGubhMtkMrfQ/NXv90ter5fh7QxvXwGKVoAqVq/XWbVa7QAP4/F4nVRpiSEUCu1ZrdZ3gUBAstvtbDweb8xHhOuSJIkpiiJNp9M3WD4FFho8NNFo9IXT6bxnNpsZNldNl4H2bTYbc7lcYah/SVOQEi1MfE7zLxYLtmtZLBam0+mIJEskAma9D6Irkage3aV+IuExo0gbVyGhgulW6icSDnOeATatVrszATLDZrPZn7UnCnJw3O/398nYXWswGFB+TtafeNlqtT663e59g8GwMwlCxxqNxiH18ySnWCxWg8FgGOZe1+v1lIP/ot1us3K5/CWZTL5G/5BIlMlkIoPgB4L2CGsDRf0yAqim1J7mcrmDSqXyC+cnvHqZ5FKpdNbpdD4jdDfh+o31Z+Q4bmUieUAEUPAtm80eFAqFn6SCerlzd0gArgFiIpF45vP5nsCj28iCFUn9jatwUqvV3qdSqSOcOSVvKRUkgtvyi4zWq2RGYI9yQOYBU2CkNv9VCS7+CrZUCSoBp45MRHMVG/+TfwIMACq+M8AVuiS0AAAAAElFTkSuQmCCu311$38$resources/slider/track_left_normal.png266$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFhJREFUeNpirKyslObm5p7GxsbmzcLCwswiLCw8H4hdeXl5GYCCDCxCQkKW4uLiDPz8/AysrKwMTOzs7Me5uLgYeHh4wJjp58+fKd++fdvx5csXBhAGCDAA+bUTGV5cOowAAAAASUVORK5CYII=u237$40$resources/slider/track_middle_normal.png190$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAFCAIAAAAL5hHIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB9JREFUeNpi6O/vZ1JRUWGSkJBg4uHhYfry5QtAgAEALdYFakaTDlAAAAAASUVORK5CYII=u312$39$resources/slider/track_right_normal.png266$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFlJREFUeNpi7Ovr+/8XCH7+/Ln169evWSwqKioMv379Yv78+bPf27dv+VkkJCQYfv/+zcDFxcUABJYsPDw8YIE/f/4wsLOzH2f58uULWODbt287gOakAwQYAOV0LiAu1KedAAAAAElFTkSuQmCCu923$50$resources/switch/switch_blue_regular_alternate.png866$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhpJREFUeNqUU01rE1EUPTNJE+lMJs6k2IBlampFFIyUWos2ahQbFXHtUl34A6QbC/4AXQmKLlRaW5cFP3Ah6spFTQt2YQqiUrBTZiEItaZh0r43mfHdSaaktBG8cGDee+fce89984D/iN1m5mKXmbkZriXCrTsPTd1I3ZPlyHmxjm0n/LOyjNdTz8AZg5LQLhc/vJ+Kiv2IqmqPDu3fWzjQa0KW5S1CzjlujIxgp96BdDqNg32D14X4OYljPnDS0DXYP3/B97dWnZwYw++VCnYJ4dVrV/BpfiFHOhK3eTV3h+Osbetz5uM0SqV5GB2dKAwPIx5vB/FJRz1K1BZ3a3j39g1s2w6+CZZl4eWrF0G7h7NZZHp662eCT7rAoEti7mJ2pogH9++iXC6jslrB5PgTqIkkOkW7x4dOBByCWxcjWh8IA3NdmHt68P3bVzwdewxFUVDzJehaEvnTZ8S3j5rghPwNMWVijKNw4RJ8cXtL1iKcahWqpuHIwFEoqhachxFWlpsrU/b82XPoMruRSOrC4z50C5901oyw8ibPBLqqY7lTSBkpZPv6N/absckzY2x9nfF4+INEojEM5vKgK6fpNofneQE/rOxXncqsvWTVswpyK9A58YhPOqrMP88VR4WP24s/FoZCKy3CW6s6019Kc6OkkxqtJwQMgXbq+h9i8uAILAusSo2XFWm8prbGulUEY6AxUaK/AgwAAfwoyqb4ogAAAAAASUVORK5CYII=u564$47$resources/switch/switch_blue_regular_normal.png510$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNrEk08KglAQxt/zqUXQQsGdhPcI2ggReAVv0Am8QeuWrb2Di3DZomuEGxHapEH+bT6xdlq5SfjA0e83M09neNM0bOzFId/3F4Zh7IUQG4rVAX9eVdUxSZKt67oXmR4ITdMOlmWtTdNknPNekrpUoyhyyrJUKHQAqwSsdF1nWZZ9bBU++MEBVuq6nlK2r88KPzjAnM7BfoHhBwe4BX+BX175lWlEZfauXBTFnyqPPjMFjzzPJ5IkffObWj/u4W7SND3HcdxmREt9wnv44AeHykUQBJ5t2zsavSVNjzQwnjWBpzAMPXC8a32OySPNMOtD34p0J11JN95tlui2Seni3uKoiO1CoqcAAwBrt6+oXBp+7QAAAABJRU5ErkJggg==u252$47$resources/table_view/header_view_background.png198$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAARCAIAAACToVFFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACZJREFUeNpiev/+PdO/f/9Q8N+/f8H4z58/cDY6H6b20qVLAAEGAK1aMesKVSoCAAAAAElFTkSuQmCCu231$38$resources/text_field/square/part_0.png186$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAIAAAA2iEnWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABxJREFUCB1jmTNnDicnJ4uMjIywsDALEEtKSgIALM0DDeT4y3sAAAAASUVORK5CYII=u219$38$resources/text_field/square/part_1.png174$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAIAAADdv/LVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABRJREFUCB1jWLVqFZOWlhbDx48fARyiBVLivNzsAAAAAElFTkSuQmCCu231$38$resources/text_field/square/part_2.png186$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAIAAAA2iEnWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB1JREFUCB1jWrp06Zw5c5jU1NRkZGSYJCUlhYWFAUybBRTduo1wAAAAAElFTkSuQmCCu215$38$resources/text_field/square/part_3.png170$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAIAAAB7QOjdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUCB1juHLlysePHwESGQVQhb5n0gAAAABJRU5ErkJggg==u211$38$resources/text_field/square/part_4.png166$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxJREFUCB1j+P//PwAF/gL+n8otEwAAAABJRU5ErkJggg==u215$38$resources/text_field/square/part_5.png170$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAIAAAB7QOjdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUCB1j/Pjx4+PHjwETfwV+HAwP5QAAAABJRU5ErkJggg==u223$38$resources/text_field/square/part_6.png178$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUCB1jvHLliqysLOPp06clJSUBLX0FglncIWUAAAAASUVORK5CYII=u215$38$resources/text_field/square/part_7.png170$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAIAAAAW4yFwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUCB1j+P//P9OnT58AF6oF1hwiRUMAAAAASUVORK5CYII=u223$38$resources/text_field/square/part_8.png178$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUCB1j/vjxY0xMDHNOTs779+8BN9MH/68NXLgAAAAASUVORK5CYII=u1009$40$resources/window/normal/close_button.png962$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmNJREFUeNpcU8uKWkEQ7ev7wWh8gIKMAQVFZtzIkO3Ex0JC/kEws/EDAoH8QCAf4CqC/xCii0ExSwluEhUXCslCDIxOEOL4vOacig4mDeVtq+qcrjrVre33e3WytHq97h8MBm9Wq1Vus9lc0mk2m79ZrdbbeDz+Lp/P38H1CNJOCEyVSuXldDot73a7oMFgUJqmSYA5uq4ro9E48fl8pWKx+BHu7SmBuVqtvppMJmUkKZPJxOR/CECqttutfIPBYKlQKHxAaEMCrdPpXDQajS8AWi0Wi6KRgFVw8XQC1+u1GIhWmUzmKpVKdZnh6Ha7b9Gn1W63K5vNpm5ublQ2m1VOp1Msl8uJjzHmMJcYYk348S+Xy2sGHQ6HlDsej1U4HJaTuc7Pz8XH1gAWHzHEksCH8gLH00lQq9VUOp1WkUhEkkejkWo2m+rs7Ex0ITGm5EfISwI7gDr6NrD3o/pHAUVp7F0ulxxAMMXElwl2EjC4QBUugikeT/f7/arf7wtBIpGQ09vt9t95oxW3272QPWwRCAS+Y4RJElBlgofDoWq1WgJgZdFoVGLUgHnEIPTAMT6dz+cljPE1ggbcPjWbzUQLls2FuLTh9XqFADk6xvge8TIruMOmlUwms71e74oJuG0COCqOayyELJ0aILdDDLHSAuwrSqxgEha8g0uUajgVkbqQAK3osVisGwqFKsQQ+3iVYWHYc4BfYGzX9/f3T1C68SDyzuPx/MJYP4PkE1xN2I/jVX58TLwYsAvYM4oPCxxiP2EcCcfQhU0J/v81yn/OlpfrQOY8+H+z3wPw4fQ5/xFgAAP4Gj/neDiUAAAAAElFTkSuQmCCu325$44$resources/window/normal/resize_indicator.png274$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAF9JREFUKJFj+P//PwOx2NjYOJIkxUDalSTFQMxPkmIQnyTF0tLSASQpBtLOJCkGYlmSFGP4gZBiBQWFIJIUw+OBWMVALMkABHZAhg1MMQcHhxeQtoMp5uLi8obyJUF8ACitf5AUaj8yAAAAAElFTkSuQmCCu213$36$resources/window/normal/splitter.png170$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpimD59OkCAAQADjgHGv2lW9AAAAABJRU5ErkJggg==u354$41$resources/window/normal/titlebar_left.png306$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAA3CAYAAAAv6jtAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHdJREFUeNpinD59OgMIxMTE5P3586fy79+/ov/+/WNmAQlGRUXt+P79uzsDEmD89OlTHlBwIgMaYHz+/PkXJiYmbnQJFqB53IyMjOjiDEzMzMwM2ADL////sUowMeAAOHXQw6gBtWNwWj7qwdHkM8izMz10AAQYAGlqkX5iq3OHAAAAAElFTkSuQmCCu248$43$resources/window/normal/titlebar_middle.png198$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAIAAABCVLduAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACZJREFUeNpifPXqFRMDAwPT////cdLobGx8XGLUUoPPfhzuBggwAAdIerS2W++4AAAAAElFTkSuQmCCu355$42$resources/window/normal/titlebar_right.png306$data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAA3CAYAAAAv6jtAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHdJREFUeNpifPXq1X8mJqa/zMzMr1lYWNqXLFkyiQEImEDEv3//mH///i3x/fv3iVFRUTtAYowvX778z4AGuLi4srFKAE34wvL/P4Y4SIKHiQELADqEAasOuKuwAZw66GHUgNoxOC0f9eBo8qGrHaQbRQ8dAAEGAOKPmEZdZmFTAAAAAElFTkSuQmCCc293418$
(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
return self.$i_s('@next_responder',nil);
});
rb_define_method(self,'next_responder=',function(self,_,a_responder){
return self.$i_s('@next_responder',a_responder);
});
rb_define_method(self,'next_responder',function(self,_){
return rb_ivar_get(self,'@next_responder');
});
self.$def('try_to_perform:with:',function(self,_,an_action,an_object){
});
rb_define_method(self,'perform_key_equivalent',function(self,_,the_event){
return false;
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'mouse_down',the_event);
});
rb_define_method(self,'right_mouse_down',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'right_mouse_down',the_event);
});
rb_define_method(self,'other_mouse_down',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'other_mouse_down',the_event);
});
rb_define_method(self,'mouse_up',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'mouse_up',the_event);
});
rb_define_method(self,'right_mouse_up',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'right_mouse_up',the_event);
});
rb_define_method(self,'other_mouse_up',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'other_mouse_up',the_event);
});
rb_define_method(self,'mouse_moved',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'mouse_moved',the_event);
});
rb_define_method(self,'mouse_dragged',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'mouse_dragged',the_event);
});
rb_define_method(self,'scroll_wheel',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'scroll_wheel',the_event);
});
rb_define_method(self,'right_mouse_dragged',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'right_mouse_dragged',the_event);
});
rb_define_method(self,'other_mouse_dragged',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'other_mouse_dragged',the_event);
});
rb_define_method(self,'mouse_entered',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'mouse_entered',the_event);
});
rb_define_method(self,'mouse_exited',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'mouse_exited',the_event);
});
rb_define_method(self,'key_down',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'key_down',the_event);
});
rb_define_method(self,'key_up',function(self,_,the_event){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'key_up',the_event);
});
rb_define_method(self,'flags_changed',function(self,_,the_event){
});
rb_define_method(self,'cursor_update',function(self,_,the_event){
});
rb_define_method(self,'no_responder_for',function(self,_,event_selector){
});
rb_define_method(self,'accepts_first_responder',function(self,_){
return false;
});
rb_define_method(self,'become_first_responder',function(self,_){
return true;
});
rb_define_method(self,'resign_first_responder',function(self,_){
return true;
});
rb_define_method(self,'interpret_key_events',function(self,_,event_array){
});
rb_define_method(self,'flush_buffered_key_events',function(self,_){
});
rb_define_method(self,'menu=',function(self,_,menu){
return self.$i_s('@menu',menu);
});
rb_define_method(self,'menu',function(self,_){
return rb_ivar_get(self,'@menu');
});
rb_define_method(self,'show_context_help',function(self,_,sender){
});
rb_define_method(self,'help_requested',function(self,_,the_event){
});
rb_define_method(self,'undo_manager',function(self,_){
return rb_funcall(rb_ivar_get(self,'@next_responder'),'undo_manager');
});
})(rb_define_class_under(self,'Responder',cObject));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(ID2SYM('normal'), 0, ID2SYM('modal_panel'), 1, ID2SYM('event_tracking'), 2));
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('windows'),ID2SYM('event_queue'),ID2SYM('views_needing_display'));
rb_funcall(self,'attr_reader',ID2SYM('delegate'));
rb_define_method(self,'initialize',function(self,_){
self.$i_s('@windows',[]);
self.$i_s('@event_queue',[]);
self.$i_s('@views_needing_display',[]);
self.$i_s('@delegate',nil);
return self.$i_s('@run_loop_mode',ID2SYM('normal'));
});
rb_define_method(self,'run_loop_mode',function(self,_){
return rb_ivar_get(self,'@run_loop_mode');
});
rb_define_method(self,'bind_events',function(self,_,types,block){
self.$i_s('@run_loop_mode',ID2SYM('event_tracking'));
self.$i_s('@event_binding_mask',types);
self.$i_s('@event_binding_block',block);
self.$i_s('@event_binding_window',rb_funcall(rb_funcall(self,'current_event'),'window'));
if(RTEST(rb_funcall(types,'include?',ID2SYM('left_mouse_dragged')))){
rb_funcall(self.$klass.$c_g_full('Document'),'add_event_listener',ID2SYM('mousemove'),function(evt){
var the_event=rb_funcall(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,ID2SYM('left_mouse_dragged'));
return rb_funcall(self,'send_event',the_event);
});
}
});
rb_define_method(self,'unbind_events',function(self,_){
self.$i_s('@run_loop_mode',ID2SYM('normal'));
if(RTEST(rb_funcall(rb_ivar_get(self,'@event_binding_mask'),'include?',ID2SYM('left_mouse_dragged')))){
rb_funcall(self.$klass.$c_g_full('Document'),'remove_event_listener',ID2SYM('mousemove'));
}
});
rb_define_method(self,'current_event',function(self,_){
return rb_ivar_get(self,'@current_event');
});
rb_define_method(self,'send_event',function(self,_,the_event){
self.$i_s('@current_event',the_event);
if(RTEST(rb_funcall(rb_ivar_get(self,'@run_loop_mode'),'==',ID2SYM('event_tracking')))){
if(RTEST(rb_funcall(rb_ivar_get(self,'@event_binding_mask'),'include?',rb_funcall(the_event,'type')))){
rb_funcall(the_event,'window=',rb_ivar_get(self,'@event_binding_window'));
rb_funcall(rb_ivar_get(self,'@event_binding_block'),'call',the_event);
}
return ;
}
return rb_funcall(rb_funcall(the_event,'window'),'send_event',the_event);
});
rb_define_method(self,'mark_view_for_display',function(self,_,view,flag){
if(!RTEST(rb_funcall(rb_ivar_get(self,'@views_needing_display'),'contains?',view))){
rb_funcall(rb_ivar_get(self,'@views_needing_display'),'<<',view);
}
});
rb_define_method(self,'display_required_views',function(self,_){
rb_funcall(rb_ivar_get(self,'@views_needing_display'),'each',function(view){
return rb_funcall(view,'draw_rect');
});
return self.$i_s('@views_needing_display',[]);
});
rb_define_method(self,'add_window',function(self,_,window){
return 0;
});
rb_define_method(self,'<<',function(self,_,window){
return rb_funcall(self,'add_window',window);
});
self.$def_s('shared_application',function(self,_){
return self.$i_s('@app',ORTEST(rb_ivar_get(self,'@app'),rb_funcall(self,'new')));
});
rb_define_method(self,'delegate=',function(self,_,obj){
if(RTEST(rb_funcall(rb_ivar_get(self,'@delegate'),'==',obj))){
return ;
}
var nc=rb_funcall(self.$klass.$c_g_full('VN').$c_g('NotificationCenter'),'default_center');
if(RTEST(rb_ivar_get(self,'@delegate'))){
rb_funcall(nc,'remove_observer:name:object:',rb_ivar_get(self,'@delegate'),self.$klass.$c_g_full('APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION'),self);
rb_funcall(nc,'remove_observer:name:object:',rb_ivar_get(self,'@delegate'),self.$klass.$c_g_full('APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION'),self);
rb_funcall(nc,'remove_observer:name:object:',rb_ivar_get(self,'@delegate'),self.$klass.$c_g_full('APP_DID_CHANGE_SCREEN_PARAMETERS'),self);
}
self.$i_s('@delegate',obj);
if(RTEST(rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?',ID2SYM('will_finish_launching')))){
rb_funcall(nc,'add_observer:selector:name:object:',rb_ivar_get(self,'@delegate'),'will_finish_launching',self.$klass.$c_g_full('APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION'),self);
}
if(RTEST(rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?',ID2SYM('did_finish_launching')))){
rb_funcall(nc,'add_observer:selector:name:object:',rb_ivar_get(self,'@delegate'),'did_finish_launching',self.$klass.$c_g_full('APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION'),self);
}
});
rb_define_method(self,'running?',function(self,_){
return true;
});
rb_define_method(self,'finish_launching',function(self,_){
rb_funcall(self.$klass.$c_g_full('ENV'),'[]=',ID2SYM('platform'),ID2SYM('browser'));
var bundle=rb_funcall(self.$klass.$c_g_full('Bundle'),'main_bundle');
var doc_types=rb_funcall(rb_funcall(bundle,'info_dictionary'),'[]','document_types');
if(RTEST(doc_types)){
rb_funcall(self,'puts',doc_types);
self.$i_s('@document_controller',rb_funcall(self.$klass.$c_g_full('DocumentController'),'shared_document_controller'));
}
rb_funcall(self.$klass.$c_g_full('Document'),'add_event_listener',ID2SYM('mousedown'),function(evt){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'run_loop_mode'),'==',ID2SYM('event_tracking')))){
var the_event=rb_funcall(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,ID2SYM('left_mouse_down'));
rb_funcall(self,'send_event',the_event);
}
});
rb_funcall(self.$klass.$c_g_full('Document'),'add_event_listener',ID2SYM('mouseup'),function(evt){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'run_loop_mode'),'==',ID2SYM('event_tracking')))){
var the_event=rb_funcall(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,ID2SYM('left_mouse_up'));
rb_funcall(self,'send_event',the_event);
}
});
var nc=rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center');
rb_funcall(nc,'post_notification_name:object:',self.$klass.$c_g_full('APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION'),self);
return rb_funcall(nc,'post_notification_name:object:',self.$klass.$c_g_full('APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION'),self);
});
rb_define_method(self,'run',function(self,_){
return rb_funcall(self,'finish_launching');
});
self.$def('send_action:to:from:',function(self,_,action,target,sender){
if(RTEST(ANDTEST(action,target))){
rb_funcall(target,'perform_selector:with_object:',action,sender);
}
});
})(rb_define_class_under(self,'Application',cObject));
self.$c_g_full('VN').$def_s('ApplicationMain',function(self,_){
rb_funcall(self.$c_g_full('VN'),'const_set','App',rb_funcall(self.$c_g_full('Application'),'shared_application'));
var main_bundle=rb_funcall(self.$c_g_full('Bundle'),'main_bundle');
var main_vib=rb_funcall(rb_funcall(main_bundle,'info_dictionary'),'[]','main_vib_file');
if(RTEST(main_vib)){
rb_funcall(main_bundle,'load_vib_named:external_name_table:load_delegate:',main_vib,nil,nil);
}
else{
rb_funcall(self,'puts','warning: no main vib to load.');
}
return rb_funcall(self.$c_g_full('App'),'run');
});
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(ID2SYM('left_mouse_down'), 1, ID2SYM('left_mouse_up'), 2, ID2SYM('right_mouse_down'), 3, ID2SYM('right_mouse_up'), 4, ID2SYM('mouse_moved'), 5, ID2SYM('left_mouse_dragged'), 6, ID2SYM('right_mouse_dragged'), 7, ID2SYM('mouse_entered'), 8, ID2SYM('mouse_exited'), 9, ID2SYM('key_down'), 10, ID2SYM('key_up'), 11, ID2SYM('flags_changed'), 12, ID2SYM('app_kit_defined'), 13, ID2SYM('system_defined'), 14, ID2SYM('application_defined'), 15, ID2SYM('periodic'), 16, ID2SYM('cursor_update'), 17, ID2SYM('scroll_wheel'), 22, ID2SYM('other_mouse_down'), 25, ID2SYM('other_mouse_up'), 26, ID2SYM('other_mouse_dragged'), 27));
(function(self) {
self.$def_s('from_native_event:with_window:with_type:',function(self,_,event,win,type){
var obj=rb_funcall(self,'allocate');
rb_funcall(obj,'initialize_with_native_event:with_window:with_type:',event,win,type);
return obj;
});
self.$def('initialize_with_native_event:with_window:with_type:',function(self,_,event,win,type){
self.$i_s('@event',event);
self.$i_s('@window',win);
return self.$i_s('@type',type);
});
rb_define_method(self,'stop_propagation',function(self,_){
var event=rb_ivar_get(self,'@event');
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
rb_define_method(self,'allows_propagation?',function(self,_){
return rb_ivar_get(self,'@event')._vn_allow_event_propagation? true : false;});
rb_define_method(self,'allows_propagation=',function(self,_,flag){
rb_ivar_get(self,'@event')._vn_allow_event_propagation = flag;});
rb_define_method(self,'type',function(self,_){
return rb_ivar_get(self,'@type');
});
rb_define_method(self,'modifier_flags',function(self,_){
});
rb_define_method(self,'timestamp',function(self,_){
});
rb_define_method(self,'window=',function(self,_,a_window){
return self.$i_s('@window',a_window);
});
rb_define_method(self,'window',function(self,_){
return rb_ivar_get(self,'@window');
});
rb_define_method(self,'window_number',function(self,_){
return rb_funcall(rb_ivar_get(self,'@window'),'window_number');
});
rb_define_method(self,'context',function(self,_){
});
rb_define_method(self,'click_count',function(self,_){
});
rb_define_method(self,'button_number',function(self,_){
});
rb_define_method(self,'event_number',function(self,_){
});
rb_define_method(self,'location_in_window',function(self,_){
return rb_funcall(rb_ivar_get(self,'@window'),'convert_screen_to_base',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_ivar_get(self,'@event').clientX,rb_ivar_get(self,'@event').clientY));
});
rb_define_method(self,'characters',function(self,_){
});
rb_define_method(self,'characters_ignoring_modifiers',function(self,_){
});
rb_define_method(self,'repeat?',function(self,_){
});
rb_define_method(self,'key_code',function(self,_){
});
rb_define_method(self,'tracking_number',function(self,_){
});
rb_define_method(self,'user_data',function(self,_){
});
rb_define_method(self,'tracking_area',function(self,_){
});
self.$def_s('mouse_location',function(self,_){
});
})(rb_define_class_under(self,'Event',cObject));
})(rb_define_module('Vienna'));

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

(function(self) {
(function(self) {
rb_funcall(self,'attr_reader',ID2SYM('rect'),ID2SYM('options'),ID2SYM('owner'),ID2SYM('user_info'));
rb_define_method(self,'initialize',function(self,_,rect,options,owner,user_info){
self.$i_s('@rect',rect);
self.$i_s('@options',options);
self.$i_s('@owner',owner);
return self.$i_s('@user_info',user_info);
});
self.$def_s('tracking_area_with_rect:options:owner:user_info:',function(self,_,rect,options,owner,user_info){
return rb_funcall(self,'new',rect,options,owner,user_info);
});
})(rb_define_class_under(self,'TrackingArea',cObject));
})(rb_define_module('Vienna'));

(function(self) {
return rb_funcall(self.$c_g_full('ENV'),'[]=',ID2SYM('graphics_context_platform'),ID2SYM('canvas'));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'rect',function(self,_,x,y,w,h){
rb_ivar_get(self,'@ctx').fillRect(x, y, w, h);});
rb_define_method(self,'graphics_port',function(self,_){
return rb_ivar_get(self,'@ctx');
});
rb_define_method(self,'graphics_port=',function(self,_,graphics_port){
return self.$i_s('@ctx',graphics_port);
});
rb_define_method(self,'flipped?',function(self,_){
return rb_ivar_get(self,'@flip_state');
});
self.$def_s('current_context',function(self,_){
return rb_ivar_get(self,'@current_context');
});
self.$def_s('current_context=',function(self,_,context){
return self.$i_s('@current_context',context);
});
rb_define_method(self,'save_graphics_state',function(self,_){
});
rb_define_method(self,'restore_graphics_state',function(self,_){
});
rb_define_method(self,'line_width=',function(self,_,width){
rb_ivar_get(self,'@ctx').lineWidth = width});
rb_define_method(self,'line_cap=',function(self,_,cap){
rb_ivar_get(self,'@ctx').lineCap = cap});
rb_define_method(self,'line_join=',function(self,_,join){
rb_ivar_get(self,'@ctx').lineJoin = join});
rb_define_method(self,'miter_limit=',function(self,_,limit){
rb_ivar_get(self,'@ctx').miterLimit = limit});
rb_define_method(self,'alpha=',function(self,_,alpha){
rb_ivar_get(self,'@ctx').globalAlpha = alpha});
rb_define_method(self,'begin_path',function(self,_){
rb_ivar_get(self,'@ctx').beginPath()});
rb_define_method(self,'move_to_point',function(self,_,point){
rb_ivar_get(self,'@ctx').moveTo(rb_funcall(point,'x'),rb_funcall(point,'y'))});
rb_define_method(self,'add_line_to_point',function(self,_,point){
rb_ivar_get(self,'@ctx').lineTo(rb_funcall(point,'x'),rb_funcall(point,'y'))});
rb_define_method(self,'add_curve_to_point',function(self,_,cp1,cp2,point){
rb_ivar_get(self,'@ctx').bezierCurveTo(rb_funcall(cp1,'x'),rb_funcall(cp1,'y'),rb_funcall(cp2,'x'),rb_funcall(cp2,'y'),rb_funcall(point,'x'),rb_funcall(point,'y'))});
rb_define_method(self,'add_lines',function(self,_,points){
});
rb_define_method(self,'scale_ctm',function(self,_,sx,sy){
});
rb_define_method(self,'translate_ctm',function(self,_,tx,ty){
});
rb_define_method(self,'rotate_ctm',function(self,_,angle){
});
rb_define_method(self,'concat_ctm',function(self,_,transform){
});
rb_define_method(self,'ctm',function(self,_){
});
rb_define_method(self,'add_ellipse_in_rect',function(self,_,rect){
});
rb_define_method(self,'add_arc',function(self,_,point,radius,start_angle,end_angle,clock_wise){
});
rb_define_method(self,'arc_to_point',function(self,_,point1,point2,radius){
});
rb_define_method(self,'add_path',function(self,_,path){
});
rb_define_method(self,'path_empty?',function(self,_){
});
rb_define_method(self,'path_current_point',function(self,_){
});
rb_define_method(self,'path_bounding_box',function(self,_){
});
rb_define_method(self,'path_contains_point?',function(self,_,point){
});
})(rb_define_class_under(self,'GraphicsContext',self.$c_g_full('Element')));
})(rb_define_module('Vienna'));

(function(self) {
if(RTEST(rb_funcall(rb_funcall(self.$c_g_full('ENV'),'[]',ID2SYM('graphics_context_platform')),'==',ID2SYM('canvas')))){
self.$c_s('CANVAS_LINE_JOINS',VN.$h(ID2SYM('miter'), 'miter', ID2SYM('round'), 'round', ID2SYM('bevel'), 'bevel'));
self.$c_s('CANVAS_LINE_CAPS',VN.$h(ID2SYM('butt'), 'butt', ID2SYM('round'), 'round', ID2SYM('square'), 'square'));
(function(self) {
rb_define_method(self,'initialize',function(self,_){
var tag_name='canvas';
self.$i_s('@first_time',true);
self.$i_s('@element',document.createElement('canvas'));
self.$i_s('@ctx',rb_ivar_get(self,'@element').getContext('2d'));
return self.$i_s('@type',tag_name);
});
rb_define_method(self,'save_g_state',function(self,_){
rb_ivar_get(self,'@ctx').save();});
rb_define_method(self,'restore_g_state',function(self,_){
rb_ivar_get(self,'@ctx').restore();});
rb_define_method(self,'scale_ctm',function(self,_,sx,sy){
});
rb_define_method(self,'translate_ctm',function(self,_,tx,ty){
});
rb_define_method(self,'rotate_ctm',function(self,_,angle){
});
rb_define_method(self,'concat_ctm',function(self,_,transform){
});
rb_define_method(self,'line_width=',function(self,_,width){
rb_ivar_get(self,'@ctx').lineWidth = width;});
rb_define_method(self,'line_cap=',function(self,_,cap){
rb_ivar_get(self,'@ctx').lineCap = rb_funcall(self.$klass.$c_g_full('CANVAS_LINE_CAPS'),'[]',cap);});
rb_define_method(self,'line_join=',function(self,_,join){
rb_ivar_get(self,'@ctx').lineJoin = rb_funcall(self.$klass.$c_g_full('CANVAS_LINE_JOINS'),'[]',join);});
rb_define_method(self,'miter_limit=',function(self,_,limit){
});
rb_define_method(self,'alpha=',function(self,_,alpha){
});
rb_define_method(self,'blend_mode=',function(self,_,mode){
});
rb_define_method(self,'begin_path',function(self,_){
});
rb_define_method(self,'move_to_point',function(self,_,x,y){
});
rb_define_method(self,'add_line_to_point',function(self,_,x,y){
});
rb_define_method(self,'add_curve_to_point',function(self,_,cp1x,cp1y,cp2x,cp2y,x,y){
});
rb_define_method(self,'add_quad_curve_to_point',function(self,_,cpx,cpy,x,y){
});
rb_define_method(self,'close_path',function(self,_){
});
rb_define_method(self,'add_rect',function(self,_,rect){
});
rb_define_method(self,'add_rects',function(self,_,rects){
});
rb_define_method(self,'add_lines',function(self,_,points){
});
rb_define_method(self,'add_ellipse_in_rect',function(self,_,rect){
});
rb_define_method(self,'add_arc',function(self,_,x,y,radius,start_angle,end_angle,clockwise){
});
rb_define_method(self,'add_arc_to_point',function(self,_,x1,y1,x2,y2,radius){
});
rb_define_method(self,'add_path',function(self,_,path){
});
rb_define_method(self,'replace_path_with_stroked_path',function(self,_){
});
rb_define_method(self,'path_empty?',function(self,_){
});
rb_define_method(self,'current_point',function(self,_){
});
rb_define_method(self,'path_bounding_box',function(self,_){
});
rb_define_method(self,'copy_path',function(self,_){
});
rb_define_method(self,'path_contains_point?',function(self,_,point,mode){
});
rb_define_method(self,'draw_path',function(self,_,mode){
});
rb_define_method(self,'fill_path',function(self,_){
});
rb_define_method(self,'eofill_path',function(self,_){
});
rb_define_method(self,'stroke_path',function(self,_){
});
rb_define_method(self,'fill_rect',function(self,_,rect){
});
rb_define_method(self,'fill_rects',function(self,_,rects){
});
rb_define_method(self,'stroke_rect',function(self,_,rect){
});
rb_define_method(self,'stroke_rect_with_width',function(self,_,rect,width){
});
rb_define_method(self,'clear_rect',function(self,_,rect){
});
rb_define_method(self,'fill_ellipse_in_rect',function(self,_,rect){
});
rb_define_method(self,'stroke_ellipse_in_rect',function(self,_,rect){
});
rb_define_method(self,'stroke_line_segments',function(self,_,points){
});
rb_define_method(self,'clip',function(self,_){
});
rb_define_method(self,'eoclip',function(self,_){
});
rb_define_method(self,'clip_bounding_box',function(self,_){
});
rb_define_method(self,'clip_to_rect',function(self,_,rect){
});
rb_define_method(self,'clip_to_rects',function(self,_,rects){
});
rb_define_method(self,'set_fill_color_with_color',function(self,_,color){
});
rb_define_method(self,'set_stroke_color_with_color',function(self,_,color){
});
rb_define_method(self,'set_fill_color',function(self,_,components){
});
rb_define_method(self,'set_stroke_color',function(self,_,components){
});
rb_define_method(self,'set_gray_fill_color',function(self,_,gray,alpha){
});
rb_define_method(self,'set_gray_stroke_color',function(self,_,gray,alpha){
});
rb_define_method(self,'set_rgb_fill_color',function(self,_,r,g,b,a){
});
rb_define_method(self,'set_rgb_stroke_color',function(self,_,r,g,b,a){
});
rb_define_method(self,'set_cmyk_fill_color',function(self,_,c,m,y,b,a){
});
rb_define_method(self,'set_cmyk_stroke_color',function(self,_,c,m,y,b,a){
});
rb_define_method(self,'draw_image',function(self,_,rect,image){
});
rb_define_method(self,'draw_tiled_image',function(self,_,rect,image){
});
rb_define_method(self,'set_shadow_with_color',function(self,_,offset,blur,color){
});
rb_define_method(self,'set_shadow',function(self,_,offset,blur){
});
rb_define_method(self,'draw_linear_gradient',function(self,_,gradient,start_point,end_point,options){
});
rb_define_method(self,'draw_radial_gradient',function(self,_,gradient,start_center,start_radius,end_center,end_radius,options){
});
})(rb_define_class_under(self,'GraphicsContext',self.$c_g_full('Element')));
}
})(rb_define_module('Vienna'));


rb_define_method(rb_cObject,'CGContextSaveGState',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextRestoreGState',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextScaleCTM',function(self,_,ctx,sx,sy){
});
rb_define_method(rb_cObject,'CGContextTranslateCTM',function(self,_,ctx,sy,sy){
});
rb_define_method(rb_cObject,'CGContextRotateCTM',function(self,_,ctx,angle){
});
rb_define_method(rb_cObject,'CGContextConcatCTM',function(self,_,ctx,transform){
});
rb_define_method(rb_cObject,'CGContextGetCTM',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextSetLineWidth',function(self,_,ctx,width){
});
rb_define_method(rb_cObject,'CGContextSetLineCap',function(self,_,ctx,cap){
});
rb_define_method(rb_cObject,'CGContextSetLineJoin',function(self,_,ctx,join){
});
rb_define_method(rb_cObject,'CGContextSetMiterLimit',function(self,_,ctx,limit){
});
rb_define_method(rb_cObject,'CGContextSetLineDash',function(self,_,ctx,phase){
});
rb_define_method(rb_cObject,'CGContextSetFlatness',function(self,_,ctx,flatness){
});
rb_define_method(rb_cObject,'CGContextSetAlpha',function(self,_,ctx,alpha){
});
rb_define_method(rb_cObject,'CGContextSetBlendMode',function(self,_,ctx,mode){
});
rb_define_method(rb_cObject,'CGContextBeginPath',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextMoveToPoint',function(self,_,ctx,x,y){
});
rb_define_method(rb_cObject,'CGContextAddLineToPoint',function(self,_,ctx,x,y){
});
rb_define_method(rb_cObject,'CGContextAddCurveToPoint',function(self,_,ctx,cp1x,cp1y,cp2x,cp2y,x,y){
});
rb_define_method(rb_cObject,'CGContextAddQuadCurveToPoint',function(self,_,ctx,cpx,cpy,x,y){
});
rb_define_method(rb_cObject,'CGContextClosePath',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextAddRect',function(self,_,ctx,rect){
});
rb_define_method(rb_cObject,'CGContextAddRects',function(self,_,ctx,rects){
});
rb_define_method(rb_cObject,'CGContextAddLines',function(self,_,ctx,points){
});
rb_define_method(rb_cObject,'CGContextAddEllipseInRect',function(self,_,ctx,rect){
});
rb_define_method(rb_cObject,'CGContextAddArc',function(self,_,ctx,x,y,radius,start_angle,end_angle,clockwise){
});
rb_define_method(rb_cObject,'CGContextAddArcToPoint',function(self,_,c,x1,y1,x2,y2,radius){
});
rb_define_method(rb_cObject,'CGContextAddPath',function(self,_,ctx,path){
});
rb_define_method(rb_cObject,'CGContextReplacePathWithStrokedPath',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextIsPathEmpty',function(self,_,context){
});
rb_define_method(rb_cObject,'CGContextGetPathCurrentPoint',function(self,_,context){
});
rb_define_method(rb_cObject,'CGContextGetPathBoundingBox',function(self,_,ctx){
});
rb_define_method(rb_cObject,'CGContextSetFillColor',function(self,_,ctx,color){
ctx.fillStyle = rb_funcall(color,'rgb_string');});
rb_define_method(rb_cObject,'CGContextSetStrokeColor',function(self,_,ctx,color){
ctx.strokeStyle = rb_funcall(color,'rgb_string');});

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,x,y,w,h){
self.$i_s('@origin',rb_funcall(self.$klass.$c_g_full('Point'),'new',x,y));
return self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',w,h));
});
self.$def_s('from_string',function(self,_,string){
var point=rb_funcall(self.$c_g_full('Point'),'from_string',string.substr(1, string.indexOf("},") - 1));
var size=rb_funcall(self.$c_g_full('Size'),'from_string',string.substr(string.indexOf("},") + 3, string.length - 3));
return rb_funcall(self,'new',rb_funcall(point,'x'),rb_funcall(point,'y'),rb_funcall(size,'width'),rb_funcall(size,'height'));
});
rb_define_method(self,'to_rect',function(self,_){
return self;
});
rb_define_method(self,'copy',function(self,_){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(self,'x'),rb_funcall(self,'y'),rb_funcall(self,'width'),rb_funcall(self,'height'));
});
rb_define_method(self,'size',function(self,_){
return rb_ivar_get(self,'@size');
});
rb_define_method(self,'size=',function(self,_,size){
return self.$i_s('@size',size);
});
rb_define_method(self,'origin',function(self,_){
return rb_ivar_get(self,'@origin');
});
rb_define_method(self,'origin=',function(self,_,point){
return self.$i_s('@origin',point);
});
rb_define_method(self,'x',function(self,_){
return rb_funcall(rb_ivar_get(self,'@origin'),'x');
});
rb_define_method(self,'y',function(self,_){
return rb_funcall(rb_ivar_get(self,'@origin'),'y');
});
rb_define_method(self,'width',function(self,_){
return rb_funcall(rb_ivar_get(self,'@size'),'width');
});
rb_define_method(self,'height',function(self,_){
return rb_funcall(rb_ivar_get(self,'@size'),'height');
});
rb_define_method(self,'x=',function(self,_,x){
return rb_funcall(rb_ivar_get(self,'@origin'),'x=',x);
});
rb_define_method(self,'y=',function(self,_,y){
return rb_funcall(rb_ivar_get(self,'@origin'),'y=',y);
});
rb_define_method(self,'width=',function(self,_,w){
return rb_funcall(rb_ivar_get(self,'@size'),'width=',w);
});
rb_define_method(self,'height=',function(self,_,h){
return rb_funcall(rb_ivar_get(self,'@size'),'height=',h);
});
rb_define_method(self,'to_a',function(self,_){
return [rb_funcall(self,'x'),rb_funcall(self,'y'),rb_funcall(self,'w'),rb_funcall(self,'h')];
});
rb_define_method(self,'center',function(self,_){
});
rb_define_method(self,'contain?',function(self,_){
});
rb_define_method(self,'to_s',function(self,_){
return ["{{",(rb_funcall(self,'x')),", ",(rb_funcall(self,'y')),"}, {",(rb_funcall(self,'width')),", ",(rb_funcall(self,'height')),"}}"].join('');
});
rb_define_method(self,'inspect',function(self,_){
});
rb_define_method(self,'eql?',function(self,_,other){
return ANDTEST(rb_funcall(rb_ivar_get(self,'@size'),'eql?',rb_funcall(other,'size')),rb_funcall(rb_ivar_get(self,'@origin'),'eql?',rb_funcall(other,'origin')));
});
})(rb_define_class_under(self,'Rect',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,x,y){
self.$i_s('@x',x);
return self.$i_s('@y',y);
});
rb_define_method(self,'to_point',function(self,_){
return self;
});
self.$def_s('from_string',function(self,_,string){
return rb_funcall(self,'new',parseFloat(string.substr(1, string.indexOf(",") - 1)),parseFloat(string.substr(string.indexOf(",") + 1, string.length - 1)));
});
rb_define_method(self,'x',function(self,_){
return rb_ivar_get(self,'@x');
});
rb_define_method(self,'x=',function(self,_,x){
return self.$i_s('@x',x);
});
rb_define_method(self,'y',function(self,_){
return rb_ivar_get(self,'@y');
});
rb_define_method(self,'y=',function(self,_,y){
return self.$i_s('@y',y);
});
rb_define_method(self,'eql?',function(self,_,other){
return ANDTEST(rb_funcall(rb_ivar_get(self,'@x'),'==',rb_funcall(other,'x')),rb_funcall(rb_ivar_get(self,'@y'),'==',rb_funcall(other,'y')));
});
rb_define_method(self,'in_rect?',function(self,_,a_rect){
return ANDTEST(rb_funcall(rb_funcall(self,'x'),'>',rb_funcall(a_rect,'x')),ANDTEST(rb_funcall(rb_funcall(self,'y'),'>',rb_funcall(a_rect,'y')),ANDTEST(rb_funcall(rb_funcall(self,'x'),'<=',rb_funcall(rb_funcall(a_rect,'x'),'+',rb_funcall(a_rect,'width'))),rb_funcall(rb_funcall(self,'y'),'<=',rb_funcall(rb_funcall(a_rect,'y'),'+',rb_funcall(a_rect,'height'))))));
});
})(rb_define_class_under(self,'Point',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,w,h){
self.$i_s('@width',w);
return self.$i_s('@height',h);
});
self.$def_s('from_string',function(self,_,string){
return rb_funcall(self,'new',parseFloat(string.substr(1, string.indexOf(",") - 1)),parseFloat(string.substr(string.indexOf(",") + 1, string.length - 1)));
});
rb_define_method(self,'to_size',function(self,_){
return self;
});
rb_define_method(self,'width',function(self,_){
return rb_ivar_get(self,'@width');
});
rb_define_method(self,'width=',function(self,_,w){
return self.$i_s('@width',w);
});
rb_define_method(self,'height',function(self,_){
return rb_ivar_get(self,'@height');
});
rb_define_method(self,'height=',function(self,_,h){
return self.$i_s('@height',h);
});
rb_define_method(self,'eql?',function(self,_,other){
return ANDTEST(rb_funcall(rb_ivar_get(self,'@width'),'==',rb_funcall(other,'width')),rb_funcall(rb_ivar_get(self,'@height'),'==',rb_funcall(other,'height')));
});
})(rb_define_class_under(self,'Size',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$def_s('image_named',function(self,_,name){
name=rb_funcall(name,'to_s');
if(RTEST(rb_funcall(rb_funcall(self,'named_images'),'has_key?',name))){
return rb_funcall(rb_funcall(self,'named_images'),'[]',name);
}
if(RTEST(rb_funcall(rb_funcall(self,'sprite_images'),'has_key?',name))){
}
var url=["images/",(name),".png"].join('');
var image_name=[(name),".png"].join('');
if(vn_resource_stack.hasOwnProperty(image_name)) {url=vn_resource_stack[image_name];
var img=rb_funcall(self,'image_with_contents_of_url',url);
rb_funcall(rb_funcall(self,'named_images'),'[]=',name,img);
return img;
}img=rb_funcall(self,'image_with_contents_of_url',["images/",(name),".png"].join(''));
rb_funcall(rb_funcall(self,'named_images'),'[]=',name,img);
return img;
});
self.$def_s('named_images',function(self,_){
return self.$i_s('@named_images',ORTEST(rb_ivar_get(self,'@named_images'),VN.$h()));
});
self.$def_s('sprite_images',function(self,_){
return self.$i_s('@sprite_images',ORTEST(rb_ivar_get(self,'@sprite_images'),VN.$h()));
});
self.$def_s('resource',function(self,_,name,block){
var img=rb_funcall(self,'image_named',name);
return arguments[arguments.length -1](img);
});
self.$def_s('sprite',function(self,_,name,rect){
var img=rb_funcall(self,'image_named',name);
var obj=rb_funcall(self,'new');
rb_funcall(obj,'image=',rb_funcall(img,'image'));
rb_funcall(obj,'filename=',rb_funcall(img,'filename'));
rb_funcall(obj,'add_representation:rect:',ID2SYM('normal'),rect);
return obj;
});
self.$def_s('sprite:normal:gray_mask:disabled:',function(self,_,image,normal,gray_mask,disabled){
var img=rb_funcall(self,'image_named',image);
var obj=rb_funcall(self,'new');
rb_funcall(obj,'image=',rb_funcall(img,'image'));
rb_funcall(obj,'filename=',rb_funcall(img,'filename'));
rb_funcall(obj,'add_representation:rect:',ID2SYM('normal'),normal);
rb_funcall(obj,'add_representation:rect:',ID2SYM('gray_mask'),gray_mask);
rb_funcall(obj,'add_representation:rect:',ID2SYM('disabled'),disabled);
return obj;
});
self.$def_s('sprite_cell_masks',function(self,_,name,block){
var img=rb_funcall(self,'image_named',name);
var obj=rb_funcall(self,'new');
rb_funcall(obj,'image=',rb_funcall(img,'image'));
rb_funcall(obj,'filename=',rb_funcall(img,'filename'));
arguments[arguments.length -1](obj);
return obj;
});
self.$def('add_representation:rect:',function(self,_,type,array_rect){
rb_funcall(rb_ivar_get(self,'@representations'),'[]=',type,array_rect);
if(RTEST(rb_funcall(type,'==',ID2SYM('normal')))){
self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_funcall(array_rect,'[]',2),rb_funcall(array_rect,'[]',3)));
}
});
rb_define_method(self,'initialize',function(self,_,url,size){
self.$i_s('@representations',VN.$h());
self.$i_s('@filename',url);
if(RTEST(size)){
self.$i_s('@size',size);
}
return rb_funcall(self,'load');
});
rb_define_method(self,'init_with_size',function(self,_,size){
});
rb_define_method(self,'init_with_data',function(self,_,data){
});
self.$def_s('image_with_contents_of_url',function(self,_,url){
var obj=rb_funcall(self,'allocate');
rb_funcall(obj,'init_with_contents_of_url',url);
return obj;
});
rb_define_method(self,'init_with_contents_of_url',function(self,_,url){
return rb_funcall(self,'initialize',url);
});
rb_define_method(self,'status',function(self,_){
return rb_ivar_get(self,'@status');
});
rb_define_method(self,'load',function(self,_){
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self,'@status'),'==',ID2SYM('loading')),rb_funcall(rb_ivar_get(self,'@status'),'==',ID2SYM('completed'))))){
return ;
}
self.$i_s('@status',ID2SYM('loading'));
self.$i_s('@image', new Image());
      
      rb_ivar_get(self,'@image').onload = function() {
        rb_funcall(self,'_image_did_load')
      };
      
      rb_ivar_get(self,'@image').onerror = function() {
        rb_funcall(self,'_image_did_error')
      };
      
      rb_ivar_get(self,'@image').onabort = function() {
        rb_funcall(self,'_image_did_error')
      };
      
      rb_ivar_get(self,'@image').src = rb_ivar_get(self,'@filename');
      });
rb_define_method(self,'_image_did_error',function(self,_){
self.$i_s('@status',ID2SYM('read_error'));
if(RTEST(ANDTEST(rb_ivar_get(self,'@delegate'),rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?',ID2SYM('image_did_error'))))){
rb_funcall(rb_ivar_get(self,'@delegate'),'image_did_error',self);
}
});
rb_define_method(self,'_image_did_load',function(self,_){
return self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_ivar_get(self,'@image').width,rb_ivar_get(self,'@image').height));
});
rb_define_method(self,'sprite',function(self,_,name,rect){
return self;
});
rb_define_method(self,'image',function(self,_){
return rb_ivar_get(self,'@image');
});
rb_define_method(self,'image=',function(self,_,img){
return self.$i_s('@image',img);
});
rb_define_method(self,'filename=',function(self,_,name){
return self.$i_s('@filename',name);
});
rb_define_method(self,'filename',function(self,_){
return rb_ivar_get(self,'@filename');
});
rb_define_method(self,'sprite_origin=',function(self,_,point){
return self.$i_s('@sprite_origin',point);
});
rb_define_method(self,'size=',function(self,_,size){
return self.$i_s('@size',size);
});
rb_define_method(self,'size',function(self,_){
return ORTEST(rb_ivar_get(self,'@size'),rb_funcall(self.$klass.$c_g_full('Size'),'new',0,0));
});
rb_define_method(self,'name=',function(self,_,name){
return self.$i_s('@name',name);
});
rb_define_method(self,'name',function(self,_){
return rb_ivar_get(self,'@name');
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
self.$def('draw_at_point:from_rect:operation:fraction:',function(self,_,point,from_rect,op,delta){
});
self.$def('draw_in_rect:from_rect:operation:fraction:',function(self,_,rect,from_rect,op,delta){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
ctx.drawImage(rb_ivar_get(self,'@image'), rb_funcall(rect,'x'), rb_funcall(rect,'y'), rb_funcall(rect,'width'),rb_funcall(rect,'height'))});
self.$def('render_in_rect:from_rect:operation:fraction:',function(self,_,rect,from_rect,op,delta){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(ctx,'append',ID2SYM('div'),function(ctx){
rb_funcall(ctx,'frame=',rect);
return rb_funcall(ctx,'css',VN.$h(ID2SYM('background_image'),["url('",(rb_funcall(self,'filename')),"')"].join('')));
});
});
rb_define_method(self,'render_with_frame',function(self,_,rect){
return rb_funcall(self,'render_in_rect:from_rect:operation:fraction:',rect,rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
self.$def('draw_in_rect:enabled:gray_mask:',function(self,_,rect,enabled,gray_mask){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
var rep=RTEST(gray_mask) ? rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('gray_mask')) : rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('normal'));
if(!RTEST(enabled)){
rep=rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('disabled'));
}
if(!RTEST(rep)){
rep=rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('normal'));
}
ctx.drawImage(rb_ivar_get(self,'@image'), rb_funcall(rep,'[]',0), rb_funcall(rep,'[]',1), rb_funcall(rep,'[]',2),rb_funcall(rep,'[]',3), rb_funcall(rect,'x'), rb_funcall(rect,'y'), rb_funcall(rect,'width'),rb_funcall(rect,'height'))});
self.$def('render_in_rect:enabled:gray_mask:',function(self,_,rect,enabled,gray_mask){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(ctx,'append',ID2SYM('div'),function(ctx){
rb_funcall(ctx,'frame=',rect);
rb_funcall(ctx,'css',VN.$h(ID2SYM('background_image'),["url('",(rb_funcall(self,'filename')),"')"].join('')));
var rep=RTEST(gray_mask) ? rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('gray_mask')) : rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('normal'));
if(!RTEST(enabled)){
rep=rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('disabled'));
}
return rb_funcall(ctx,'css',VN.$h(ID2SYM('background_position'),["-",(rb_funcall(rep,'[]',0)),"px -",(rb_funcall(rep,'[]',1)),"px"].join('')));
});
});
rb_define_method(self,'render_in_rect',function(self,_,rect){
return rb_funcall(self,'render_in_rect:enabled:gray_mask:',rect,true,false);
});
self.$def('draw_representation:in_rect:',function(self,_,image_rep,rect){
});
rb_define_method(self,'representations',function(self,_){
return rb_ivar_get(self,'@representations');
});
rb_define_method(self,'add_representations',function(self,_,image_reps){
});
rb_define_method(self,'add_representation',function(self,_,image_rep){
});
rb_define_method(self,'remove_representation',function(self,_,image_rep){
});
rb_define_method(self,'valid?',function(self,_){
});
rb_define_method(self,'lock_focus',function(self,_){
});
rb_define_method(self,'unlock_focus',function(self,_){
});
rb_define_method(self,'delegate=',function(self,_,obj){
return self.$i_s('@delegate',obj);
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'alignment_rect',function(self,_){
return rb_ivar_get(self,'@alignment_rect');
});
rb_define_method(self,'alignment_rect=',function(self,_,rect){
return self.$i_s('@alignment_rect',rect);
});
})(rb_define_class_under(self,'Image',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,part1,part2,part3,vertical){
self.$i_s('@parts',[part1,part2,part3]);
return self.$i_s('@vertical',vertical);
});
rb_define_method(self,'render_with_frame',function(self,_,frame){
if(RTEST(rb_ivar_get(self,'@vertical'))){
var top_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var bottom_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(frame,'y'),rb_funcall(top_size,'width'),rb_funcall(top_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_size,'height')),rb_funcall(top_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_size,'height'),'+',rb_funcall(bottom_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_size,'height')),rb_funcall(top_size,'width'),rb_funcall(bottom_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
}
else{
var left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var right_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(frame,'y'),rb_funcall(left_size,'width'),rb_funcall(left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(left_size,'width')),rb_funcall(frame,'y'),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall(rb_funcall(left_size,'width'),'+',rb_funcall(right_size,'width')))),rb_funcall(left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(right_size,'width')),rb_funcall(frame,'y'),rb_funcall(right_size,'width'),rb_funcall(left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
}
});
rb_define_method(self,'draw_with_frame',function(self,_,frame){
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,6,24),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',6,0,rb_funcall(rb_funcall(frame,'width'),'-',12),24),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
return rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'width'),'-',6),0,6,24),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
})(rb_define_class_under(self,'ThreePartImage',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,part0,part1,part2,part3,part4,part5,part6,part7,part8,vertical){
self.$i_s('@parts',[part0,part1,part2,part3,part4,part5,part6,part7,part8]);
return self.$i_s('@vertical',vertical);
});
rb_define_method(self,'render_with_frame',function(self,_,frame){
var top_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var bottom_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',0),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(frame,'y'),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',3),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',4),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',5),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',7),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(bottom_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
return rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',8),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(bottom_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
rb_define_method(self,'draw_with_frame',function(self,_,frame){
var top_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var bottom_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',0),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(frame,'y'),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',3),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',4),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',5),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',7),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(bottom_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
return rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',8),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(bottom_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
})(rb_define_class_under(self,'NinePartImage',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,normal,highlighted,disabled){
self.$i_s('@normal',normal);
self.$i_s('@highlighted',highlighted);
return self.$i_s('@disabled',disabled);
});
rb_define_method(self,'size',function(self,_){
return rb_funcall(rb_ivar_get(self,'@normal'),'size');
});
rb_define_method(self,'filename',function(self,_){
return rb_funcall(rb_ivar_get(self,'@normal'),'filename');
});
rb_define_method(self,'render_with_frame',function(self,_,frame,state){
return (function($v){
if(($e = rb_funcall(ID2SYM('normal'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(rb_ivar_get(self,'@normal'),'render_with_frame',frame);
}
else if(($e = rb_funcall(ID2SYM('highlighted'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(rb_ivar_get(self,'@highlighted'),'render_with_frame',frame);
}
else if(($e = rb_funcall(ID2SYM('disabled'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(rb_ivar_get(self,'@disabled'),'render_with_frame',frame);
}
})(state);
});
})(rb_define_class_under(self,'ThreeStateImage',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
(function(self) {
self.$def_s('font_with_name:size:',function(self,_,font_name,font_size){
return rb_funcall(self,'font_with_name:size:is_bold:',font_name,font_size,false);
});
self.$def_s('font_with_name:size:is_bold:',function(self,_,font_name,font_size,is_bold){
});
self.$def_s('user_font_of_size',function(self,_,size){
});
self.$def_s('system_font_of_size',function(self,_,size){
});
self.$def_s('bold_system_font_of_size',function(self,_,size){
return rb_funcall(self,'new','Arial',size,true);
});
self.$def_s('label_font_of_size',function(self,_,size){
});
self.$def_s('title_bar_font_of_size',function(self,_,size){
});
self.$def_s('menu_font_of_size',function(self,_,size){
});
self.$def_s('menu_bar_font_of_size',function(self,_,size){
});
self.$def_s('message_font_of_size',function(self,_,size){
});
self.$def_s('palette_font_of_size',function(self,_,size){
});
self.$def_s('tool_tips_font_of_size',function(self,_,size){
});
self.$def_s('control_content_font_of_size',function(self,_,size){
return self.$i_s('@control_content_font',ORTEST(rb_ivar_get(self,'@control_content_font'),rb_funcall(self,'new','Arial',size,false)));
});
self.$def_s('system_font_size',function(self,_){
return 12;
});
self.$def_s('small_system_font_size',function(self,_){
return 10;
});
self.$def_s('label_font_size',function(self,_){
return 12;
});
self.$def_s('system_font_size_for_control_size',function(self,_,control_size){
return (function($v){
if(($e = rb_funcall(ID2SYM('regular'), '===', $v),$e!==nil && $e!==false)){
return 12;
}
else if(($e = rb_funcall(ID2SYM('small'), '===', $v),$e!==nil && $e!==false)){
return 10;
}
else if(($e = rb_funcall(ID2SYM('mini'), '===', $v),$e!==nil && $e!==false)){
return 8;
}
else {
return 12;
}
})(control_size);
});
})(self.$c_g_full('Font'));
rb_define_method(self,'initialize',function(self,_,font_name,size,is_bold){
self.$i_s('@font_name',font_name);
self.$i_s('@size',size);
return self.$i_s('@bold',is_bold);
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
self.$i_s('@font_name',rb_funcall(coder,'decode_object',ID2SYM('name')));
self.$i_s('@size',rb_funcall(coder,'decode_int',ID2SYM('size')));
return self.$i_s('@bold',rb_funcall(coder,'decode_bool',ID2SYM('bold')));
});
rb_define_method(self,'font_name',function(self,_){
return rb_ivar_get(self,'@font_name');
});
rb_define_method(self,'size',function(self,_){
return rb_ivar_get(self,'@size');
});
rb_define_method(self,'bold?',function(self,_){
return rb_ivar_get(self,'@bold');
});
rb_define_method(self,'css_string',function(self,_){
var bold_str=RTEST(rb_ivar_get(self,'@bold')) ? "bold " : '';
return [(bold_str)," ",(rb_ivar_get(self,'@size')),"px '",(rb_funcall(self,'font_name')),"'"].join('');
});
rb_define_method(self,'set',function(self,_){
});
rb_define_method(self,'cssFont',function(self,_){
});
})(rb_define_class_under(self,'Font',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$def_s('color_with_calibrated_white:alpha:',function(self,_,white,alpha){
});
self.$def_s('color_with_calibrated_hue:saturation:brightness:alpha:',function(self,_,hue,saturation,brightness,alpha){
});
self.$def_s('color_with_calibrated_red:green:blue:alpha:',function(self,_,red,green,blue,alpha){
return rb_funcall(self,'new',red,green,blue,alpha);
});
self.$def_s('black_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,1.0);
});
self.$def_s('dark_gray_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.333,0.333,0.333,1.0);
});
self.$def_s('light_gray_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.667,0.667,0.667,1.0);
});
self.$def_s('white_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',255.0,255.0,255.0,1.0);
});
self.$def_s('gray_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.5,0.5,0.5,1.0);
});
self.$def_s('red_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,0.0,0.0,1.0);
});
self.$def_s('green_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,1.0,0.0,1.0);
});
self.$def_s('blue_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,1.0,1.0);
});
self.$def_s('cyan_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,1.0,1.0,1.0);
});
self.$def_s('yellow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,1.0,0.0,1.0);
});
self.$def_s('magenta_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,0.0,1.0,1.0);
});
self.$def_s('orange_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,0.5,0.0,1.0);
});
self.$def_s('purple_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.5,0.0,0.5,1.0);
});
self.$def_s('brown_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.6,0.4,0.2,1.0);
});
self.$def_s('clear_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
(function(self) {
self.$def_s('control_shadow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_dark_shadow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_highlight_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_light_highlight_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',79,79,79,1.0);
});
self.$def_s('control_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',119,141,168,1.0);
});
self.$def_s('secondary_selected_control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('disabled_control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',164,164,164,1.0);
});
self.$def_s('text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('text_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_text_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('grid_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('keyboard_focus_indicator_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('window_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('scroll_bar_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('knob_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_knob_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('window_frame_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('window_frame_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_menu_item_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_menu_item_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('highlight_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('shadow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('header_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('header_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('alternate_selected_control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('alternarte_selected_control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_alternating_row_background_colors',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',234.0,234.0,234.0,0.0);
});
self.$def_s('color_for_control_tint',function(self,_,control_tint){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('current_control_tint',function(self,_){
});
})(self.$c_g_full('Color'));
rb_define_method(self,'initialize',function(self,_,r,g,b,a){
self.$i_s('@red',r);
self.$i_s('@green',g);
self.$i_s('@blue',b);
return self.$i_s('@alpha',a);
});
rb_define_method(self,'highlight_with_level',function(self,_,val){
});
rb_define_method(self,'shadow_with_level',function(self,_,val){
});
rb_define_method(self,'rgb_string',function(self,_){
return ["rgb(",(rb_ivar_get(self,'@red')),",",(rb_ivar_get(self,'@green')),",",(rb_ivar_get(self,'@blue')),")"].join('');
});
rb_define_method(self,'rgba_string',function(self,_){
return ["rgb(",(rb_ivar_get(self,'@red')),",",(rb_ivar_get(self,'@green')),",",(rb_ivar_get(self,'@blue')),",",(rb_ivar_get(self,'@alpha')),")"].join('');
});
rb_define_method(self,'set',function(self,_){
rb_funcall(self,'set_fill');
return rb_funcall(self,'set_stroke');
});
rb_define_method(self,'set_fill',function(self,_){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
return rb_funcall(self,'CGContextSetFillColor',ctx,self);
});
rb_define_method(self,'set_stroke',function(self,_){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
return rb_funcall(self,'CGContextSetStrokeColor',ctx,self);
});
})(rb_define_class_under(self,'Color',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'size_with_attributes',function(self,_,attrs){
});
self.$def('draw_at_point:with_attributes:',function(self,_,point,attrs){
});
self.$def('draw_in_rect:with_attributes:',function(self,_,rect,attrs){
});
self.$def('draw_with_rect:options:attributes:',function(self,_,rect,options,attributes){
});
self.$def('bounding_rect_with_size:options:attributes:',function(self,_,size,options,attributes){
});
})(rb_define_class_under(self,'String',cObject));
(function(self) {
rb_define_method(self,'size',function(self,_){
});
rb_define_method(self,'draw_at_point',function(self,_,point){
});
rb_define_method(self,'draw_in_rect',function(self,_,rect){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
if(!window.opera){ctx.font = 'normal 12px Arial, sans-serif';ctx.fillStyle = rb_funcall(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('color')),'rgb_string');ctx.textBaseline = 'top';ctx.fillText(rb_ivar_get(self,'@string'), rb_funcall(rect,'x'), rb_funcall(rect,'y'));}});
self.$def('draw_with_rect:options:',function(self,_,rect,options){
});
rb_define_method(self,'render_in_rect',function(self,_,rect){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(ctx,'append',ID2SYM('div'),function(text){
rb_funcall(text,'frame=',rect);
rb_funcall(text,'css',VN.$h(ID2SYM('color'),rb_funcall(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('color')),'rgb_string'),ID2SYM('overflow_x'),'hidden',ID2SYM('overflow_y'),'hidden',ID2SYM('white_space'),'nowrap'));
if(RTEST(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('font')))){
rb_funcall(text,'css',VN.$h(ID2SYM('font'),rb_funcall(rb_funcall(rb_ivar_get(self,'@attributes'),'[]',ID2SYM('font')),'css_string')));
}
return rb_funcall(text,'<<',rb_ivar_get(self,'@string'));
});
});
self.$def('bounding_rect_with_size:options:',function(self,_,size,options){
});
})(rb_define_class_under(self,'AttributedString',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,tag_name,options){
self.$i_s('@element_stack',[document.createElement(rb_funcall(tag_name,'to_s'))]);
self.$i_s('@build_stack',[]);
self.$i_s('@first_time',true);
return self.$i_s('@type',rb_funcall(tag_name,'to_s'));
});
self.$def_s('current_context=',function(self,_,current_context){
return self.$i_s('@current_context',current_context);
});
self.$def_s('current_context',function(self,_){
return rb_ivar_get(self,'@current_context');
});
rb_define_method(self,'first_time?',function(self,_){
return rb_ivar_get(self,'@first_time');
});
rb_define_method(self,'first_time=',function(self,_,first_time){
return self.$i_s('@first_time',first_time);
});
rb_define_method(self,'element',function(self,_){
return rb_funcall(rb_ivar_get(self,'@element_stack'),'last');
});
rb_define_method(self,'push_element_stack',function(self,_,element){
return rb_funcall(rb_ivar_get(self,'@element_stack'),'<<',element);
});
rb_define_method(self,'pop_element_stack',function(self,_){
return rb_funcall(rb_ivar_get(self,'@element_stack'),'pop');
});
rb_define_method(self,'selector',function(self,_,a_selector,block){
var element=rb_funcall(self,'find_selector',a_selector);
rb_funcall(self,'push_element_stack',element);
arguments[arguments.length -1](self);
return rb_funcall(self,'pop_element_stack');
});
rb_define_method(self,'append',function(self,_,tag_name,block){
var append_element=document.createElement(rb_funcall(tag_name,'to_s'));
rb_funcall(self,'element').appendChild(append_element);rb_funcall(self,'push_element_stack',append_element);
arguments[arguments.length -1](self);
return rb_funcall(self,'pop_element_stack',append_element);
});
rb_define_method(self,'build',function(self,_,block){
rb_funcall(rb_ivar_get(self,'@build_stack'),'<<','');
rb_funcall(self,'inner_html=','');
rb_funcall(block,'call',self);
return build_text=rb_funcall(rb_ivar_get(self,'@build_stack'),'pop');
});
rb_define_method(self,'begin',function(self,_,tag_name){
});
rb_define_method(self,'end',function(self,_){
});
rb_define_method(self,'child_nodes',function(self,_){
return rb_funcall(self,'element').childNodes.length;});
rb_define_method(self,'child_node',function(self,_,a_number,block){
var e=rb_funcall(self,'element').childNodes[a_number];
rb_funcall(self,'push_element_stack',e);
arguments[arguments.length -1](self);
return rb_funcall(self,'pop_element_stack');
});
rb_define_method(self,'find_selector',function(self,_,a_selector){
var nodes = rb_funcall(self,'element').childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == rb_funcall(a_selector,'to_s')) {
          return nodes[i];
        }
      }
      return rb_funcall(self,'element')});
})(rb_define_class_under(self,'RenderContext',self.$c_g_full('Element')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'font_attributes_in_range',function(self,_,range){
});
rb_define_method(self,'contains_attachments?',function(self,_){
});
self.$def('line_break_before_index:within_range:',function(self,_,location,a_range){
});
self.$def('line_break_by_hyphenating_before_index:within_range:',function(self,_,location,a_range){
});
rb_define_method(self,'double_click_at_index',function(self,_,location){
});
self.$def('next_word_from_index:forward:',function(self,_,location,is_forward){
});
self.$def('url_at_index:effective_range:',function(self,_,location,effective_range){
});
rb_define_method(self,'superscript_range',function(self,_,range){
});
rb_define_method(self,'subscript_range',function(self,_,range){
});
rb_define_method(self,'unscript_range',function(self,_,range){
});
self.$def('set_alignment:range:',function(self,_,alignment,range){
});
})(rb_define_class_under(self,'AttributedString',cObject));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('TEXT_TAB_TYPES',VN.$h(ID2SYM('left'), 0, ID2SYM('right'), 1, ID2SYM('center'), 2, ID2SYM('decimal'), 3));
self.$c_s('LINE_BREAK_MODES',VN.$h(ID2SYM('word_wrapping'), 0, ID2SYM('char_wrapping'), 1, ID2SYM('clipping'), 2, ID2SYM('truncating_head'), 3, ID2SYM('truncating_tail'), 4, ID2SYM('truncating_middle'), 5));
(function(self) {
self.$c_g_full('ParagraphStyle').$def_s('default_paragraph_style',function(self,_){
var obj=rb_funcall(self,'alloc');
rb_funcall(obj,'init_default_style');
return obj;
});
rb_define_method(self,'init_default_style',function(self,_){
self.$i_s('@alignment',ID2SYM('left'));
return self;
});
rb_define_method(self,'line_spacing',function(self,_){
return rb_ivar_get(self,'@line_spacing');
});
rb_define_method(self,'line_spacing=',function(self,_,a_float){
return self.$i_s('@line_spacing',a_float);
});
rb_define_method(self,'paragraph_spacing',function(self,_){
return rb_ivar_get(self,'@paragraph_spacing');
});
rb_define_method(self,'paragraph_spacing=',function(self,_,a_float){
return self.$i_s('@paragraph_spacing',a_float);
});
rb_define_method(self,'alignment',function(self,_){
return rb_ivar_get(self,'@alignment');
});
rb_define_method(self,'alignment=',function(self,_,an_alignment){
return self.$i_s('@alignment',an_alignment);
});
rb_define_method(self,'head_indent',function(self,_){
return rb_ivar_get(self,'@head_indent');
});
rb_define_method(self,'head_indent=',function(self,_,a_float){
return self.$i_s('@head_indent',a_float);
});
rb_define_method(self,'tail_indent',function(self,_){
return rb_ivar_get(self,'@tail_indent');
});
rb_define_method(self,'tail_indent=',function(self,_,a_float){
return self.$i_s('@tail_indent',a_float);
});
rb_define_method(self,'first_line_head_indent',function(self,_){
return rb_ivar_get(self,'@first_line_head_indent');
});
rb_define_method(self,'first_line_head_indent=',function(self,_,a_float){
return self.$i_s('@first_line_head_indent',a_float);
});
rb_define_method(self,'tab_stops',function(self,_){
});
rb_define_method(self,'minimum_line_height',function(self,_){
});
rb_define_method(self,'maximum_line_height',function(self,_){
});
rb_define_method(self,'line_break_mode',function(self,_){
});
rb_define_method(self,'header_level',function(self,_){
});
})(rb_define_class_under(self,'ParagraphStyle',cObject));
})(rb_define_module('Vienna'));

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

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('ButtonCell');
});
rb_define_method(self,'title=',function(self,_,str){
return rb_funcall(rb_ivar_get(self,'@cell'),'title=',str);
});
rb_define_method(self,'alternate_title=',function(self,_,str){
return rb_funcall(rb_ivar_get(self,'@cell'),'alternate_title=',str);
});
rb_define_method(self,'alternate_image',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'alternate_image');
});
rb_define_method(self,'alternate_image=',function(self,_,img){
return rb_funcall(rb_ivar_get(self,'@cell'),'alternate_image=',img);
});
rb_define_method(self,'image=',function(self,_,image){
return rb_funcall(rb_ivar_get(self,'@cell'),'image=',image);
});
rb_define_method(self,'image_position=',function(self,_,position){
return rb_funcall(rb_ivar_get(self,'@cell'),'image_position=',position);
});
rb_define_method(self,'type=',function(self,_,type){
return rb_funcall(rb_ivar_get(self,'@cell'),'type=',type);
});
rb_define_method(self,'type',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'type');
});
rb_define_method(self,'state=',function(self,_,val){
return rb_funcall(rb_ivar_get(self,'@cell'),'state=',val);
});
rb_define_method(self,'state',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'state');
});
rb_define_method(self,'on?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'on?');
});
rb_define_method(self,'off?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'off?');
});
rb_define_method(self,'mixed?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'mixed?');
});
rb_define_method(self,'bordered?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'bordered?');
});
rb_define_method(self,'bordered=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'bordered=',flag);
});
rb_define_method(self,'transparent?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'transparent?');
});
rb_define_method(self,'transparent=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'transparent=',flag);
});
rb_define_method(self,'key_equivalent',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent');
});
rb_define_method(self,'key_equivalent=',function(self,_,code){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent=',code);
});
rb_define_method(self,'key_equivalent_modifier_mask',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent_modifier_mask');
});
rb_define_method(self,'key_equivalent_modifier_mask=',function(self,_,mask){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent_modifier_mask=',mask);
});
rb_define_method(self,'highlight=',function(self,_,flag){
});
rb_define_method(self,'perform_key_equivalent',function(self,_,key){
});
rb_define_method(self,'bezel=',function(self,_,style){
return rb_funcall(rb_ivar_get(self,'@cell'),'bezel=',style);
});
rb_define_method(self,'bezel',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'bezel');
});
rb_define_method(self,'allows_mixed_state=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'allows_mixed_state=',flag);
});
rb_define_method(self,'allows_mixed_state?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'allows_mixed_state?');
});
rb_define_method(self,'next_state',function(self,_){
});
})(rb_define_class_under(self,'Button',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));


(function(self) {
(function(self) {
var bundle=rb_funcall(self.$c_g_full('Bundle'),'bundle_for_class',self);
self.$c_s('BEZEL_IMAGES',VN.$h(ID2SYM('textured_rounded'), VN.$h(ID2SYM('regular'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/normal_left.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/normal_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/normal_right.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24))), ID2SYM('highlighted'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/highlighted_left.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/highlighted_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/highlighted_right.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24))), ID2SYM('disabled'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/disabled_left.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/disabled_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/disabled_right.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24)))), ID2SYM('small'), VN.$h(), ID2SYM('mini'), VN.$h()), ID2SYM('rounded'), VN.$h(ID2SYM('regular'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/rounded/regular/normal_left.png'),rb_funcall(self.$c_g_full('Size'),'new',12,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/rounded/regular/normal_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/rounded/regular/normal_right.png'),rb_funcall(self.$c_g_full('Size'),'new',12,24))), ID2SYM('highlighted'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/rounded/regular/highlighted_left.png'),rb_funcall(self.$c_g_full('Size'),'new',12,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/rounded/regular/highlighted_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/rounded/regular/highlighted_right.png'),rb_funcall(self.$c_g_full('Size'),'new',12,24))), ID2SYM('disabled'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/disabled_left.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/disabled_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,24)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','button/textured_rounded/regular/disabled_right.png'),rb_funcall(self.$c_g_full('Size'),'new',6,24)))), ID2SYM('small'), VN.$h(), ID2SYM('mini'), VN.$h())));
return self.$c_s('SWITCH_IMAGES',VN.$h(ID2SYM('blue'), VN.$h(ID2SYM('regular'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate_disabled'))), ID2SYM('small'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate_disabled'))), ID2SYM('mini'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate_disabled')))), ID2SYM('graphite'), VN.$h(ID2SYM('regular'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate_disabled'))), ID2SYM('small'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate_disabled'))), ID2SYM('mini'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate_disabled')))), ID2SYM('hud'), VN.$h(ID2SYM('regular'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_regular_alternate_disabled'))), ID2SYM('small'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_small_alternate_disabled'))), ID2SYM('mini'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_normal'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_disabled')), ID2SYM('alternate'), rb_funcall(self.$c_g_full('ThreeStateImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate_highlighted'),rb_funcall(self.$c_g_full('Image'),'image_named','switch_blue_mini_alternate_disabled'))))));
})(rb_define_class_under(self,'ButtonCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));
(function(self) {
self.$c_s('BEZEL_STYLES',VN.$h(ID2SYM('rounded'), 1, ID2SYM('regular_square'), 2, ID2SYM('thick_square'), 3, ID2SYM('thicker_square'), 4, ID2SYM('disclosure'), 5, ID2SYM('shadowless_square'), 6, ID2SYM('circular'), 7, ID2SYM('textured_square'), 8, ID2SYM('help_button'), 9, ID2SYM('small_square'), 10, ID2SYM('textured_rounded'), 11, ID2SYM('round_rect'), 12, ID2SYM('recessed'), 13, ID2SYM('rounded_disclosure'), 14));
(function(self) {
rb_define_method(self,'init_text_cell',function(self,_,str){
rb_supcall(arguments.callee, self,_,[str]);
self.$i_s('@transparent',false);
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('none'));
self.$i_s('@alternate_title','');
self.$i_s('@alternate_image',nil);
self.$i_s('@image_dims_when_disabled',false);
self.$i_s('@bordered',true);
self.$i_s('@bezeled',true);
self.$i_s('@alignment',ID2SYM('center'));
self.$i_s('@control_tint',ID2SYM('blue'));
self.$i_s('@control_size',ID2SYM('regular'));
self.$i_s('@key_equivalent','');
self.$i_s('@key_equivalent_modifier_mask',0);
return self.$i_s('@font',rb_funcall(self.$klass.$c_g_full('Font'),'bold_system_font_of_size',12));
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
var flags=rb_funcall(coder,'decode_int',ID2SYM('button_flags'));
var flags2=rb_funcall(coder,'decode_int',ID2SYM('button_flags2'));
self.$i_s('@title',rb_funcall(coder,'decode_object',ID2SYM('contents')));
self.$i_s('@alternate_title',rb_funcall(coder,'decode_object',ID2SYM('alternate_contents')));
self.$i_s('@transparent',RTEST(rb_funcall((rb_funcall(flags,'&',0x00008000)),'nonzero?')) ? true : false);
self.$i_s('@bordered',RTEST(rb_funcall((rb_funcall(flags,'&',0x00800000)),'nonzero?')) ? true : false);
self.$i_s('@image_dims_when_disabled',RTEST(rb_funcall((rb_funcall(flags2,'&',0x00002000)),'nonzero?')) ? false : true);
var bezel_style=rb_funcall((rb_funcall(flags2,'&',0x7)),'|',(rb_funcall((rb_funcall(flags2,'&',0x20)),'>>',2)));
return self.$i_s('@bezel_style',(function($v){
if(($e = rb_funcall(1, '===', $v),$e!==nil && $e!==false)){
return ID2SYM('rounded');
}
else if(($e = rb_funcall(11, '===', $v),$e!==nil && $e!==false)){
return ID2SYM('textured_rounded');
}
else {
return ID2SYM('textured_rounded');
}
})(bezel_style));
});
rb_define_method(self,'init_image_cell',function(self,_,img){
});
rb_define_method(self,'initialize',function(self,_){
return rb_funcall(self,'init_text_cell','ButtonCell');
});
rb_define_method(self,'control_tint=',function(self,_,control_tint){
rb_supcall(arguments.callee, self,_,[control_tint]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('switch')),rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('radio'))))){
rb_funcall(self,'_update_button_images');
}
});
rb_define_method(self,'control_size=',function(self,_,size){
rb_supcall(arguments.callee, self,_,[size]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('switch')),rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('radio'))))){
rb_funcall(self,'_update_button_images');
}
});
rb_define_method(self,'_update_button_images',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('switch')))){
self.$i_s('@image',rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('SWITCH_IMAGES'),'[]',rb_ivar_get(self,'@control_tint')),'[]',rb_ivar_get(self,'@control_size')),'[]',ID2SYM('normal')));
self.$i_s('@alternate_image',rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('SWITCH_IMAGES'),'[]',rb_ivar_get(self,'@control_tint')),'[]',rb_ivar_get(self,'@control_size')),'[]',ID2SYM('alternate')));
}
else if(RTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('radio')))){
}
});
rb_define_method(self,'title',function(self,_){
return RTEST(rb_funcall(rb_ivar_get(self,'@title'),'is_a?',self.$klass.$c_g_full('AttributedString'))) ? rb_funcall(rb_ivar_get(self,'@title'),'string') : rb_ivar_get(self,'@title');
});
rb_define_method(self,'title=',function(self,_,str){
return self.$i_s('@title',str);
});
rb_define_method(self,'alternate_title',function(self,_){
return rb_ivar_get(self,'@alternate_title');
});
rb_define_method(self,'alternate_title=',function(self,_,str){
return self.$i_s('@alternate_title',str);
});
rb_define_method(self,'alternate_image',function(self,_){
return rb_ivar_get(self,'@alternate_image');
});
rb_define_method(self,'alternate_image=',function(self,_,img){
return self.$i_s('@alternate_image',img);
});
rb_define_method(self,'image_position',function(self,_){
return rb_ivar_get(self,'@image_position');
});
rb_define_method(self,'image_position=',function(self,_,position){
return self.$i_s('@image_position',position);
});
rb_define_method(self,'image_scaling',function(self,_){
return rb_ivar_get(self,'@image_scaling');
});
rb_define_method(self,'image_scaling=',function(self,_,image_scaling){
return self.$i_s('@image_scaling',image_scaling);
});
rb_define_method(self,'state=',function(self,_,val){
return self.$i_s('@state',val);
});
rb_define_method(self,'state',function(self,_){
return rb_ivar_get(self,'@state');
});
rb_define_method(self,'on?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('on'));
});
rb_define_method(self,'off?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('off'));
});
rb_define_method(self,'mixed?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('mixed'));
});
rb_define_method(self,'highlights_by',function(self,_){
return rb_ivar_get(self,'@highlights_by');
});
rb_define_method(self,'highlights_by=',function(self,_,a_type){
return self.$i_s('@highlights_by',a_type);
});
rb_define_method(self,'shows_state_by=',function(self,_,a_type){
return self.$i_s('@shows_state_by',a_type);
});
rb_define_method(self,'shows_state_by',function(self,_){
return rb_ivar_get(self,'@shows_state_by');
});
rb_define_method(self,'type=',function(self,_,a_type){
self.$i_s('@type',a_type);
return (function($v){
if(($e = rb_funcall(ID2SYM('momentary_light'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('change_background'));
self.$i_s('@shows_state_by',ID2SYM('none'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('push_on_push_off'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('change_background'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('toggle'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('contents'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('switch'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('contents'));
self.$i_s('@shows_state_by',ID2SYM('contents'));
self.$i_s('@image_dims_when_disabled',true);
self.$i_s('@image_position',ID2SYM('left'));
rb_funcall(self,'_update_button_images');
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment',ID2SYM('left'));
}
else if(($e = rb_funcall(ID2SYM('radio'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('contents'));
self.$i_s('@shows_state_by',ID2SYM('contents'));
self.$i_s('@image_dims_when_disabled',true);
self.$i_s('@image_position',ID2SYM('left'));
rb_funcall(self,'_update_button_images');
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment',ID2SYM('left'));
}
else if(($e = rb_funcall(ID2SYM('momentary_change'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('contents'));
self.$i_s('@shows_state_by',ID2SYM('none'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('on_off'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('change_background'));
self.$i_s('@shows_state_by',ID2SYM('change_background'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('momentary_push_in'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('none'));
return self.$i_s('@image_dims_when_disabled',true);
}
})(a_type);
});
rb_define_method(self,'type',function(self,_){
return rb_ivar_get(self,'@type');
});
rb_define_method(self,'opaque?',function(self,_){
return rb_ivar_get(self,'@opaue');
});
rb_define_method(self,'font=',function(self,_,font_obj){
return self.$i_s('@font',font_obj);
});
rb_define_method(self,'transparent?',function(self,_){
return rb_ivar_get(self,'@transparent');
});
rb_define_method(self,'transparent=',function(self,_,flag){
return self.$i_s('@transparent',flag);
});
self.$def('set_periodic_delay:interval:',function(self,_,delay,interval){
});
self.$def('get_periodic_delay:interval:',function(self,_,delay,interval){
});
rb_define_method(self,'key_equivalent',function(self,_){
return rb_ivar_get(self,'@key_equivalent');
});
rb_define_method(self,'key_equivalent=',function(self,_,equiv){
return self.$i_s('@key_equivalent',equiv);
});
rb_define_method(self,'key_equivalent_modifier_mask=',function(self,_,mask){
return self.$i_s('@key_equivalent_modifier_mask',mask);
});
rb_define_method(self,'key_equivalent_modifier_mask',function(self,_){
return rb_ivar_get(self,'@key_equivalent_modifier_mask');
});
rb_define_method(self,'key_equivalent_font=',function(self,_,font){
return self.$i_s('@key_equivalent_font',font);
});
rb_define_method(self,'key_equivalent_font',function(self,_){
return rb_ivar_get(self,'@key_equivalent_font');
});
self.$def('set_key_equivalent_font:size:',function(self,_,font_name,size){
});
rb_define_method(self,'perform_click',function(self,_,sender){
});
rb_define_method(self,'object_value=',function(self,_,obj){
if(RTEST(ORTEST(NOTTEST(obj),ORTEST(rb_funcall(obj,'==',0),rb_funcall(obj,'==',ID2SYM('off')))))){
obj=ID2SYM('off');
}
else{
obj=ID2SYM('on');
}
return rb_supcall(arguments.callee, self,_,[obj]);
});
self.$def('draw_with_frame:in_view:',function(self,_,cell_frame,control_view){
self.$i_s('@control_view',control_view);
if(RTEST(rb_funcall(self,'transparent?'))){
return ;
}
rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port').clearRect(0, 0, rb_funcall(cell_frame,'width'), rb_funcall(cell_frame,'height'));rb_funcall(self,'draw_bezel_with_frame:in_view:',cell_frame,control_view);
return rb_funcall(self,'draw_interior_with_frame:in_view:',cell_frame,control_view);
});
self.$def('draw_interior_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
if(!RTEST(rb_funcall(rb_ivar_get(self,'@image_position'),'==',ID2SYM('image_only')))){
rb_funcall(self,'draw_title:with_frame:in_view:',rb_funcall(self,'attributed_title'),cell_frame,control_view);
}
if(RTEST(rb_ivar_get(self,'@image'))){
(function($v){
if(($e = rb_funcall(ID2SYM('contents'), '===', $v),$e!==nil && $e!==false)){
if(RTEST(rb_funcall(self,'on?'))){
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@alternate_image'),cell_frame,control_view);
}
else{
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@image'),cell_frame,control_view);
}
}
else {
if(RTEST(rb_ivar_get(self,'@highlighted'))){
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@alternate_image'),cell_frame,control_view);
}
else{
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@image'),cell_frame,control_view);
}
}
})(rb_ivar_get(self,'@highlights_by'));
}
});
self.$def('draw_image:with_frame:in_view:',function(self,_,image,frame,control_view){
var enabled=RTEST(rb_ivar_get(self,'@enabled')) ? true : NOTTEST(rb_ivar_get(self,'@image_dims_when_disabled'));
var gray_mask=rb_ivar_get(self,'@highlighted');
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
return rb_funcall(image,'draw_in_rect:enabled:gray_mask:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(image,'size'),'width'),rb_funcall(rb_funcall(image,'size'),'height')),enabled,gray_mask);
});
self.$def('draw_title:with_frame:in_view:',function(self,_,title,frame,control_view){
return rb_funcall(title,'draw_in_rect',rb_funcall(self,'title_rect_for_bounds',frame));
});
self.$def('draw_bezel_with_frame:in_view:',function(self,_,frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
if(RTEST(rb_funcall(self,'bordered?'))){
var bezel_img=rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'[]',ID2SYM('regular')),'[]',RTEST(rb_ivar_get(self,'@enabled')) ? (RTEST(rb_ivar_get(self,'@highlighted')) ? ID2SYM('highlighted') : ID2SYM('normal')) : ID2SYM('disabled'));
rb_funcall(bezel_img,'draw_with_frame',frame);
}
});
self.$def('render_image:with_frame:in_view:',function(self,_,image,frame,control_view){
if(RTEST(rb_funcall(image,'is_a?',self.$klass.$c_g_full('ThreeStateImage')))){
rb_funcall(image,'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(image,'size'),'width'),rb_funcall(rb_funcall(image,'size'),'height')),(RTEST(rb_ivar_get(self,'@enabled')) ? (RTEST(rb_ivar_get(self,'@highlighted')) ? ID2SYM('highlighted') : ID2SYM('normal')) : ID2SYM('disabled')));
}
else{
rb_funcall(image,'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(image,'size'),'width'),rb_funcall(rb_funcall(image,'size'),'height')));
}
});
rb_define_method(self,'title_rect_for_bounds',function(self,_,the_rect){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(the_rect,'x'),rb_funcall(the_rect,'y'),rb_funcall(the_rect,'width'),rb_funcall(the_rect,'height'));
var image_size=RTEST(rb_ivar_get(self,'@image')) ? rb_funcall(rb_ivar_get(self,'@image'),'size') : rb_funcall(self.$klass.$c_g_full('Size'),'new',0,0);
if(RTEST(rb_ivar_get(self,'@bordered'))){
rb_funcall(result,'width=',rb_funcall(rb_funcall(result,'width'),'-',4));
rb_funcall(result,'height=',rb_funcall(rb_funcall(result,'height'),'-',4));
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',2));
rb_funcall(result,'y=',rb_funcall(rb_funcall(result,'y'),'+',2));
}
(function($v){
if(($e = rb_funcall(ID2SYM('left'), '===', $v),$e!==nil && $e!==false)){
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',(rb_funcall(rb_funcall(image_size,'width'),'+',3))));
return rb_funcall(result,'width=',rb_funcall(rb_funcall(result,'width'),'-',(rb_funcall(rb_funcall(image_size,'width'),'+',3))));
}
else if(($e = rb_funcall(ID2SYM('right'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('below'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('above'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('overlaps'), '===', $v),$e!==nil && $e!==false)){
}
})(rb_ivar_get(self,'@image_position'));
return result;
});
self.$def('render_title:with_frame:in_view:',function(self,_,title,frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(title,'render_in_rect',rb_funcall(self,'title_rect_for_bounds',frame));
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
self.$i_s('@control_view',control_view);
if(RTEST(rb_funcall(self,'transparent?'))){
return ;
}
return rb_funcall(rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context'),'build',function(){
rb_funcall(self,'render_bezel_with_frame:in_view:',cell_frame,control_view);
return rb_funcall(self,'render_interior_with_frame:in_view:',cell_frame,control_view);
});
});
self.$def('render_bezel_with_frame:in_view:',function(self,_,cell_frame,control_view){
if(RTEST(rb_ivar_get(self,'@bordered'))){
rb_funcall(rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context'),'append',ID2SYM('div'),function(bezel){
rb_funcall(bezel,'css',VN.$h(ID2SYM('top'),'0px',ID2SYM('left'),'0px',ID2SYM('right'),'0px',ID2SYM('bottom'),'0px'));
var bezel_img=rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'[]',ID2SYM('regular')),'[]',RTEST(rb_ivar_get(self,'@enabled')) ? (RTEST(rb_ivar_get(self,'@highlighted')) ? ID2SYM('highlighted') : ID2SYM('normal')) : ID2SYM('disabled'));
return rb_funcall(bezel_img,'render_with_frame',cell_frame);
});
}
});
self.$def('render_interior_with_frame:in_view:',function(self,_,cell_frame,control_view){
if(!RTEST(rb_funcall(rb_ivar_get(self,'@image_position'),'==',ID2SYM('image_only')))){
rb_funcall(self,'render_title:with_frame:in_view:',rb_funcall(self,'attributed_title'),cell_frame,control_view);
}
if(RTEST(rb_ivar_get(self,'@image'))){
if(RTEST(rb_funcall(self,'on?'))){
rb_funcall(self,'render_image:with_frame:in_view:',rb_ivar_get(self,'@alternate_image'),cell_frame,control_view);
}
else{
rb_funcall(self,'render_image:with_frame:in_view:',rb_ivar_get(self,'@image'),cell_frame,control_view);
}
}
});
rb_define_method(self,'mouse_entered',function(self,_,the_event){
});
rb_define_method(self,'mouse_exited',function(self,_,the_event){
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'attributed_title',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@title'),'is_a?',self.$klass.$c_g_full('AttributedString')))){
return rb_ivar_get(self,'@title');
}
var attributes=VN.$h();
if(RTEST(rb_ivar_get(self,'@font'))){
rb_funcall(attributes,'[]=',ID2SYM('font'),rb_ivar_get(self,'@font'));
}
rb_funcall(attributes,'[]=',ID2SYM('color'),(RTEST(rb_ivar_get(self,'@enabled')) ? rb_funcall(self.$klass.$c_g_full('Color'),'control_text_color') : rb_funcall(self.$klass.$c_g_full('Color'),'disabled_control_text_color')));
var paragraph_style=rb_funcall(self.$klass.$c_g_full('ParagraphStyle'),'default_paragraph_style');
rb_funcall(paragraph_style,'alignment=',rb_ivar_get(self,'@alignment'));
rb_funcall(attributes,'[]=',ID2SYM('paragraph_style'),paragraph_style);
return rb_funcall(self.$klass.$c_g_full('AttributedString'),'new',rb_ivar_get(self,'@title'),attributes);
});
rb_define_method(self,'attributed_title=',function(self,_,obj){
return self.$i_s('@title',obj);
});
rb_define_method(self,'attributed_alternate_title',function(self,_){
return rb_ivar_get(self,'@attributed_alternate_title');
});
rb_define_method(self,'attributed_alternate_title=',function(self,_,obj){
return self.$i_s('@attributed_alternate_title',obj);
});
rb_define_method(self,'bezel_style=',function(self,_,bezel_style){
return self.$i_s('@bezel_style',bezel_style);
});
rb_define_method(self,'bezel_style',function(self,_){
return rb_ivar_get(self,'@bezel_style');
});
rb_define_method(self,'sound=',function(self,_,a_sound){
return rb_ivar_get(self,'@sound');
});
rb_define_method(self,'sound',function(self,_){
return rb_ivar_get(self,'@sound');
});
})(rb_define_class_under(self,'ButtonCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
return rb_funcall(self,'type=',ID2SYM('switch'));
});
})(rb_define_class_under(self,'CheckBox',self.$c_g_full('Button')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('SliderCell');
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-slider';
});
rb_define_method(self,'min_value',function(self,_){
return rb_ivar_get(self,'@min_value');
});
rb_define_method(self,'min_value=',function(self,_,a_double){
return self.$i_s('@min_value',a_double);
});
rb_define_method(self,'max_value',function(self,_){
return rb_ivar_get(self,'@max_value');
});
rb_define_method(self,'max_value=',function(self,_,a_double){
return self.$i_s('@max_value',a_double);
});
rb_define_method(self,'alt_increment_value=',function(self,_,inc_value){
return self.$i_s('@alt_increment_value',inc_value);
});
rb_define_method(self,'alt_increment_value',function(self,_){
return rb_ivar_get(self,'@alt_increment_value');
});
rb_funcall(self,'attr_reader',ID2SYM('title_color'),ID2SYM('title_font'),ID2SYM('title'),ID2SYM('knob_thickness'),ID2SYM('image'));
rb_define_method(self,'title_color=',function(self,_,color){
return self.$i_s('@title_color',color);
});
rb_define_method(self,'title_font=',function(self,_,font){
return self.$i_s('@title_font',font);
});
rb_define_method(self,'title=',function(self,_,str){
return self.$i_s('@title',str);
});
rb_define_method(self,'knob_thickness=',function(self,_,a_float){
return self.$i_s('@knob_thickness',a_float);
});
rb_define_method(self,'image=',function(self,_,img){
return self.$i_s('@image',img);
});
rb_define_method(self,'vertical?',function(self,_){
return rb_ivar_get(self,'@vertical');
});
rb_define_method(self,'accepts_first_mouse',function(self,_,event){
return true;
});
rb_funcall(self,'attr_reader',ID2SYM('number_of_tick_marks'),ID2SYM('tick_mark_position'));
rb_define_method(self,'number_of_tick_marks=',function(self,_,count){
return self.$i_s('@number_of_tick_marks',count);
});
rb_define_method(self,'tick_mark_position=',function(self,_,pos){
return self.$i_s('@tick_mark_position',pos);
});
rb_define_method(self,'allows_tick_mark_values_only=',function(self,_,flag){
return self.$i_s('@allows_tick_mark_values_only',flag);
});
rb_define_method(self,'allows_tick_mark_values_only?',function(self,_){
return rb_ivar_get(self,'@allows_tick_mark_values_only');
});
rb_define_method(self,'tick_mark_value_at_index',function(self,_,index){
});
rb_define_method(self,'rect_of_tick_mark_at_index',function(self,_,index){
});
rb_define_method(self,'index_of_tick_mark_at_point',function(self,_,point){
});
rb_define_method(self,'closest_tick_mark_value_to_value',function(self,_,value){
});
})(rb_define_class_under(self,'Slider',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
var bundle=rb_funcall(self.$c_g_full('Bundle'),'bundle_for_class',self);
self.$c_s('TRACK_IMAGES',VN.$h(ID2SYM('vertical'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/track_left_normal.png'),rb_funcall(self.$c_g_full('Size'),'new',4,5)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/track_middle_normal.png'),rb_funcall(self.$c_g_full('Size'),'new',1,5)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/track_right_normal.png'),rb_funcall(self.$c_g_full('Size'),'new',4,5))))));
self.$c_s('KNOB_IMAGES',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/normal_knob.png'),rb_funcall(self.$c_g_full('Size'),'new',17,17))));
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s('prefers_tracking_until_mouse_up',function(self,_){
return true;
});
rb_define_method(self,'initialize',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
self.$i_s('@min_value',0);
self.$i_s('@max_value',100);
self.$i_s('@value',0);
return self.$i_s('@continuous',true);
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
self.$i_s('@min_value',rb_funcall(coder,'decode_double',ID2SYM('min_value')));
self.$i_s('@max_value',rb_funcall(coder,'decode_double',ID2SYM('max_value')));
self.$i_s('@value',0);
return self.$i_s('@continuous',true);
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
self.$i_s('@cell_frame',cell_frame);
self.$i_s('@control_view',control_view);
return rb_funcall(ctx,'build',function(){
rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('TRACK_IMAGES'),'[]',ID2SYM('vertical')),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',self.$klass.$c_g_full('TRACK_PADDING'),rb_funcall((rb_funcall(rb_funcall(cell_frame,'height'),'-',5)),'/',2),rb_funcall(rb_funcall(cell_frame,'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('TRACK_PADDING')))),5));
return rb_funcall(rb_funcall(self.$klass.$c_g_full('KNOB_IMAGES'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self,'_knob_rect_for_value',rb_ivar_get(self,'@value')));
});
});
rb_define_method(self,'min_value',function(self,_){
return rb_ivar_get(self,'@min_value');
});
rb_define_method(self,'min_value=',function(self,_,a_double){
return self.$i_s('@min_value',a_double);
});
rb_define_method(self,'max_value',function(self,_){
return rb_ivar_get(self,'@max_value');
});
rb_define_method(self,'max_value=',function(self,_,a_double){
return self.$i_s('@max_value',a_double);
});
rb_define_method(self,'alt_increment_value=',function(self,_,inc_value){
return self.$i_s('@alt_increment_value',inc_value);
});
rb_define_method(self,'alt_increment_value',function(self,_){
return rb_ivar_get(self,'@alt_increment_value');
});
rb_define_method(self,'vertical?',function(self,_){
return false;
});
rb_define_method(self,'title_color=',function(self,_,color){
return self.$i_s('@title_color',color);
});
rb_define_method(self,'title_font=',function(self,_,font){
return self.$i_s('@title_font',font);
});
rb_define_method(self,'title=',function(self,_,str){
return self.$i_s('@title',str);
});
rb_define_method(self,'knob_thickness=',function(self,_,a_float){
return self.$i_s('@knob_thickness',a_float);
});
rb_define_method(self,'image=',function(self,_,img){
return self.$i_s('@image',img);
});
rb_define_method(self,'number_of_tick_marks=',function(self,_,count){
return self.$i_s('@number_of_tick_marks',count);
});
rb_define_method(self,'tick_mark_position=',function(self,_,pos){
return self.$i_s('@tick_mark_position',pos);
});
rb_define_method(self,'allows_tick_mark_values_only=',function(self,_,flag){
return self.$i_s('@allows_tick_mark_values_only',flag);
});
rb_define_method(self,'allows_tick_mark_values_only?',function(self,_){
return rb_ivar_get(self,'@allows_tick_mark_values_only');
});
rb_define_method(self,'tick_mark_value_at_index',function(self,_,index){
});
rb_define_method(self,'rect_of_tick_mark_at_index',function(self,_,index){
});
rb_define_method(self,'index_of_tick_mark_at_point',function(self,_,point){
});
rb_define_method(self,'closest_tick_mark_value_to_value',function(self,_,value){
});
rb_define_method(self,'_knob_rect_for_value',function(self,_,a_value){
var x=rb_funcall((rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('KNOB_PADDING_REGULAR'))))),'*',(rb_funcall((rb_funcall(rb_ivar_get(self,'@value'),'/',(rb_funcall(rb_ivar_get(self,'@max_value'),'-',rb_ivar_get(self,'@min_value'))))),'+',rb_ivar_get(self,'@min_value'))));
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',x,rb_funcall((rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'height'),'-',17)),'/',2),17,17);
});
rb_define_method(self,'_value_for_mouse_point',function(self,_,a_point){
var value=rb_funcall((rb_funcall(rb_funcall(a_point,'x'),'-',(rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'x'),'+',self.$klass.$c_g_full('KNOB_PADDING_REGULAR'))))),'/',(rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('KNOB_PADDING_REGULAR'))))));
value=rb_funcall(value,'*',(rb_funcall((rb_funcall(rb_ivar_get(self,'@max_value'),'-',rb_ivar_get(self,'@min_value'))),'+',rb_ivar_get(self,'@min_value'))));
return rb_funcall(self.$klass.$c_g_full('Math'),'min',rb_funcall(self.$klass.$c_g_full('Math'),'max',value,rb_ivar_get(self,'@min_value')),rb_ivar_get(self,'@max_value'));
});
self.$def('start_tracking_at:in_view:',function(self,_,start_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,'_value_for_mouse_point',start_point));
rb_funcall(self,'highlight:with_frame:in_view:',true,rb_ivar_get(self,'@cell_frame'),control_view);
return true;
});
self.$def('continue_tracking:at:in_view:',function(self,_,last_point,current_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,'_value_for_mouse_point',current_point));
rb_funcall(self,'render_with_frame:in_view:',rb_ivar_get(self,'@cell_frame'),control_view);
return true;
});
self.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_,last_point,stop_point,control_view,flag){
return rb_funcall(self,'highlight:with_frame:in_view:',false,rb_ivar_get(self,'@cell_frame'),control_view);
});
})(rb_define_class_under(self,'SliderCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@editable',true);
return self.$i_s('@selectable',true);
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('TextFieldCell');
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-text-field';
});
rb_define_method(self,'resign_first_responder?',function(self,_){
rb_funcall(self,'puts','resign first responder....');
return true;
});
rb_define_method(self,'become_first_responder?',function(self,_){
rb_funcall(self,'puts','becoming first responder!!');
rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
return true;
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
return rb_funcall(self,'puts',"mouse down in text field");
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background?',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'text_color=',function(self,_,color){
return self.$i_s('@text_color',color);
});
rb_define_method(self,'text_color',function(self,_){
return rb_ivar_get(self,'@text_color');
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
rb_define_method(self,'select_text',function(self,_,sender){
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'delegate=',function(self,_,an_obj){
return self.$i_s('@delegate',an_obj);
});
rb_define_method(self,'text_should_begin_editing?',function(self,_,text_object){
return true;
});
rb_define_method(self,'text_should_end_editing?',function(self,_,text_object){
return true;
});
rb_define_method(self,'text_did_begin_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_end_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_change',function(self,_,notification){
});
rb_define_method(self,'bezel_style=',function(self,_,stlye){
return self.$i_s('@bezel_style',rb_funcall(self,'style'));
});
rb_define_method(self,'bezel_style',function(self,_){
return rb_ivar_get(self,'@bezel_style');
});
})(rb_define_class_under(self,'TextField',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(ID2SYM('none'), rb_funcall((1),'-@'), ID2SYM('square'), 0, ID2SYM('rounded'), 1));
(function(self) {
var bundle=rb_funcall(self.$c_g_full('Bundle'),'bundle_for_class',self);
self.$c_s('BEZEL_IMAGES',VN.$h(ID2SYM('square'), rb_funcall(self.$c_g_full('NinePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_0.png'),rb_funcall(self.$c_g_full('Size'),'new',2,3)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_1.png'),rb_funcall(self.$c_g_full('Size'),'new',1,3)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_2.png'),rb_funcall(self.$c_g_full('Size'),'new',2,3)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_3.png'),rb_funcall(self.$c_g_full('Size'),'new',2,1)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_4.png'),rb_funcall(self.$c_g_full('Size'),'new',1,1)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_5.png'),rb_funcall(self.$c_g_full('Size'),'new',2,1)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_6.png'),rb_funcall(self.$c_g_full('Size'),'new',2,2)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_7.png'),rb_funcall(self.$c_g_full('Size'),'new',1,2)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','text_field/square/part_8.png'),rb_funcall(self.$c_g_full('Size'),'new',2,2))), ID2SYM('rounded'), rb_funcall(self.$c_g_full('ThreePartImage'),'new')));
rb_define_method(self,'init_text_cell',function(self,_,str){
rb_supcall(arguments.callee, self,_,[str]);
self.$i_s('@editable',true);
self.$i_s('@selectable',true);
self.$i_s('@bezeled',true);
self.$i_s('@bezel_style',ID2SYM('square'));
self.$i_s('@font',rb_funcall(self.$klass.$c_g_full('Font'),'control_content_font_of_size',12));
self.$i_s('@input_element',nil);
self.$i_s('@value',"Hey there!");
return self;
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
self.$i_s('@draws_background',rb_funcall(coder,'decode_bool',ID2SYM('draws_background')));
if(RTEST(rb_ivar_get(self,'@draws_background'))){
self.$i_s('@bezel_style',ID2SYM('square'));
}
else{
self.$i_s('@bezel_style',ID2SYM('none'));
}
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-text-field';
});
self.$def('draw_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
(function($v){
if(($e = rb_funcall(ID2SYM('none'), '===', $v),$e!==nil && $e!==false)){
}
else {
return rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'draw_with_frame',cell_frame);
}
})(rb_ivar_get(self,'@bezel_style'));
if(RTEST(rb_funcall(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
}
else{
rb_funcall(rb_funcall(self,'attributed_value'),'draw_in_rect',cell_frame);
}
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
self.$i_s('@control_view',control_view);
if(RTEST(rb_funcall(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
if(!RTEST(rb_ivar_get(self,'@input_element'))){
self.$i_s('@input_element',rb_funcall(self.$klass.$c_g_full('Element'),'new',ID2SYM('input')));
rb_funcall(rb_ivar_get(self,'@input_element'),'set_attribute',ID2SYM('type'),'text');
rb_funcall(rb_ivar_get(self,'@input_element'),'css',VN.$h(ID2SYM('z_index'),1000,ID2SYM('position'),'absolute',ID2SYM('outline'),'none',ID2SYM('border'),0,ID2SYM('background'),'none'));
rb_funcall(rb_ivar_get(self,'@input_element'),'frame=',cell_frame);
rb_funcall(rb_ivar_get(self,'@input_element'),'element').value = "wtf!!!!!";rb_funcall(rb_funcall(control_view,'element'),'<<',rb_ivar_get(self,'@input_element'));
}
}
return rb_funcall(ctx,'build',function(){
(function($v){
if(($e = rb_funcall(ID2SYM('none'), '===', $v),$e!==nil && $e!==false)){
}
else {
return rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'render_with_frame',cell_frame);
}
})(rb_ivar_get(self,'@bezel_style'));
if(!RTEST(rb_ivar_get(self,'@input_element'))){
rb_funcall(rb_funcall(self,'attributed_value'),'render_in_rect',rb_funcall(self.$klass.$c_g_full('Rect'),'new',2,2,rb_funcall(cell_frame,'width'),rb_funcall(cell_frame,'height')));
}
});
});
rb_define_method(self,'attributed_value',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@value'),'is_a?',self.$klass.$c_g_full('AttributedString')))){
return rb_ivar_get(self,'@value');
}
var attributes=VN.$h();
if(RTEST(rb_ivar_get(self,'@font'))){
rb_funcall(attributes,'[]=',ID2SYM('font'),rb_ivar_get(self,'@font'));
}
rb_funcall(attributes,'[]=',ID2SYM('color'),(RTEST(rb_ivar_get(self,'@enabled')) ? rb_funcall(self.$klass.$c_g_full('Color'),'text_color') : rb_funcall(self.$klass.$c_g_full('Color'),'disabled_control_text_color')));
var paragraph_style=rb_funcall(self.$klass.$c_g_full('ParagraphStyle'),'default_paragraph_style');
rb_funcall(paragraph_style,'alignment=',rb_ivar_get(self,'@alignment'));
rb_funcall(attributes,'[]=',ID2SYM('paragraph_style'),paragraph_style);
return rb_funcall(self.$klass.$c_g_full('AttributedString'),'new',rb_ivar_get(self,'@value'),attributes);
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background?',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'text_color=',function(self,_,color){
return self.$i_s('@text_color',color);
});
rb_define_method(self,'text_color',function(self,_){
return rb_ivar_get(self,'@text_color');
});
rb_define_method(self,'set_up_field_editor_attributes',function(self,_,text_obj){
return text_obj;
});
rb_define_method(self,'bezel_style=',function(self,_,style){
return self.$i_s('@bezel_style',style);
});
rb_define_method(self,'bezel_style',function(self,_){
return rb_ivar_get(self,'@bezel_style');
});
rb_define_method(self,'placeholder_string=',function(self,_,string){
return self.$i_s('@placeholder_string',string);
});
rb_define_method(self,'placeholder_string',function(self,_){
return rb_ivar_get(self,'@placeholder_string');
});
rb_define_method(self,'placeholder_attributed_string=',function(self,_,str){
return rb_ivar_get(self,'@placeholder_attributed_string');
});
rb_define_method(self,'placeholder_attributed_string',function(self,_){
return rb_ivar_get(self,'@placeholder_attributed_string');
});
})(rb_define_class_under(self,'TextFieldCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$def_s('frame_size_for_content_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_,content_size,h_flag,v_flag,a_type){
});
self.$def_s('content_size_for_frame_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_,content_size,h_flag,v_flag,a_type){
});
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@content_view',rb_funcall(self.$klass.$c_g_full('ClipView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,100,100)));
self.$i_s('@border_type',ID2SYM('none'));
return rb_funcall(self,'add_subview',rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-scroll-view';
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'css',VN.$h(ID2SYM('background_color'),'rgb(190, 190, 190)'));
});
rb_define_method(self,'document_visible_rect',function(self,_){
});
rb_define_method(self,'content_size',function(self,_){
});
rb_define_method(self,'document_view=',function(self,_,a_view){
rb_funcall(rb_ivar_get(self,'@content_view'),'document_view=',a_view);
return rb_funcall(self,'reflect_scrolled_clip_view',rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'document_view',function(self,_){
return rb_funcall(rb_ivar_get(self,'@content_view'),'document_view');
});
rb_define_method(self,'content_view=',function(self,_,content_view){
rb_funcall(rb_ivar_get(self,'@content_view'),'remove_from_superview');
self.$i_s('@content_view',content_view);
rb_funcall(self,'add_subview',rb_ivar_get(self,'@content_view'));
return rb_funcall(self,'tile');
});
rb_define_method(self,'content_view',function(self,_){
return rb_ivar_get(self,'@content_view');
});
rb_define_method(self,'document_cursor=',function(self,_,an_obj){
return self.$i_s('@document_cursor',an_obj);
});
rb_define_method(self,'document_cursor',function(self,_){
return rb_ivar_get(self,'@document_cursor');
});
rb_define_method(self,'border_type=',function(self,_,a_type){
return self.$i_s('@border_type',a_type);
});
rb_define_method(self,'border_type',function(self,_){
return rb_ivar_get(self,'@border_type');
});
rb_define_method(self,'background_color=',function(self,_,a_color){
return self.$i_s('@background_color',a_color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'has_vertical_scroller=',function(self,_,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',true);
if(!RTEST(rb_ivar_get(self,'@vertical_scroller'))){
self.$i_s('@vertical_scroller',rb_funcall(self.$klass.$c_g_full('Scroller'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',150,40,40,15)));
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'target=',self);
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'action=',ID2SYM('scroll_v'));
}
rb_funcall(self,'add_subview',rb_ivar_get(self,'@vertical_scroller'));
}
}
else{
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',false);
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'remove_from_superview');
}
}
return rb_funcall(self,'tile');
});
rb_define_method(self,'has_vertical_scroller?',function(self,_){
return rb_ivar_get(self,'@has_vertical_scroller');
});
rb_define_method(self,'has_horizontal_scroller=',function(self,_,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',true);
if(!RTEST(rb_ivar_get(self,'@horizontal_scroller'))){
self.$i_s('@horizontal_scroller',rb_funcall(self.$klass.$c_g_full('Scroller'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',150,20,40,15)));
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'target=',self);
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'action=',ID2SYM('scroll_h'));
}
rb_funcall(self,'add_subview',rb_ivar_get(self,'@horizontal_scroller'));
}
}
else{
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',false);
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'remove_from_superview');
}
}
return rb_funcall(self,'tile');
});
rb_define_method(self,'has_horizontal_scroller?',function(self,_){
return rb_ivar_get(self,'@has_horizontal_scroller');
});
rb_define_method(self,'vertical_scroller=',function(self,_,a_scroller){
return self.$i_s('@vertical_scroller',a_scroller);
});
rb_define_method(self,'vertical_scroller',function(self,_){
return rb_ivar_get(self,'@vertical_scroller');
});
rb_define_method(self,'horizontal_scroller=',function(self,_,a_scroller){
return self.$i_s('@horizontal_scroller',a_scroller);
});
rb_define_method(self,'horizontal_scroller',function(self,_){
return rb_ivar_get(self,'@horizontal_scroller');
});
rb_define_method(self,'autohides_scrollers?',function(self,_){
return rb_ivar_get(self,'@autohides_scrollers');
});
rb_define_method(self,'autohides_scrollers=',function(self,_,flag){
return self.$i_s('@autohides_scrollers',flag);
});
rb_define_method(self,'horizontal_line_scroll=',function(self,_,value){
return self.$i_s('@horizontal_line_scroll',value);
});
rb_define_method(self,'horizontal_line_scroll',function(self,_){
return rb_ivar_get(self,'@horizontal_line_scroll');
});
rb_define_method(self,'vertical_line_scroll=',function(self,_,value){
return self.$i_s('@vertical_line_scroll',value);
});
rb_define_method(self,'vertical_line_scroll',function(self,_){
return rb_ivar_get(self,'@vertical_line_scroll');
});
rb_define_method(self,'line_scroll=',function(self,_,value){
return self.$i_s('@line_scroll',value);
});
rb_define_method(self,'line_scroll',function(self,_){
return rb_ivar_get(self,'@line_scroll');
});
rb_define_method(self,'horizontal_page_scroll=',function(self,_,value){
return self.$i_s('@horizontal_page_scroll',value);
});
rb_define_method(self,'horizontal_page_scroll',function(self,_){
return rb_ivar_get(self,'@horizontal_page_scroll');
});
rb_define_method(self,'vertical_page_scroll=',function(self,_,value){
return self.$i_s('@vertical_page_scroll',value);
});
rb_define_method(self,'vertical_page_scroll',function(self,_){
return rb_ivar_get(self,'@vertical_page_scroll');
});
rb_define_method(self,'page_scroll=',function(self,_,value){
return self.$i_s('@page_scroll',value);
});
rb_define_method(self,'page_scroll',function(self,_){
return rb_ivar_get(self,'@page_scroll');
});
rb_define_method(self,'scrolls_dynamically=',function(self,_,flag){
return self.$i_s('@scrolls_dynamically',flag);
});
rb_define_method(self,'scrolls_dynamically?',function(self,_){
return rb_ivar_get(self,'@scrolls_dynamically');
});
rb_define_method(self,'tile',function(self,_){
var header_frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
var header_view=nil;
if(RTEST(rb_funcall(rb_funcall(self,'document_view'),'respond_to?',ID2SYM('header_view')))){
header_view=rb_funcall(rb_funcall(self,'document_view'),'header_view');
header_frame=rb_funcall(header_view,'bounds');
}
var bounds=rb_funcall(self.$klass.$c_g_full('Rect'),'new',1,1,rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',2),rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',2));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
var frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'x=',rb_funcall((rb_funcall(rb_funcall(bounds,'x'),'+',rb_funcall(bounds,'width'))),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
rb_funcall(frame,'y=',rb_funcall(bounds,'y'));
rb_funcall(frame,'width=',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'));
rb_funcall(frame,'height=',rb_funcall(bounds,'height'));
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(header_frame,'height')));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(header_frame,'height')));
}
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'frame=',frame);
}
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'y=',rb_funcall((rb_funcall(rb_funcall(bounds,'y'),'+',rb_funcall(bounds,'height'))),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
rb_funcall(frame,'x=',rb_funcall(bounds,'x'));
rb_funcall(frame,'width=',rb_funcall(bounds,'width'));
rb_funcall(frame,'height=',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'frame=',frame);
}
if(RTEST(rb_ivar_get(self,'@content_view'))){
frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,'x'));
rb_funcall(frame,'y=',rb_funcall(bounds,'y'));
rb_funcall(frame,'width=',rb_funcall(bounds,'width'));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
rb_funcall(frame,'height=',rb_funcall(bounds,'height'));
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(header_frame,'height')));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(header_frame,'height')));
}
rb_funcall(rb_ivar_get(self,'@content_view'),'frame=',frame);
}
if(RTEST(header_view)){
if(!RTEST(rb_ivar_get(self,'@header_clip_view'))){
self.$i_s('@header_clip_view',rb_funcall(self.$klass.$c_g_full('ClipView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,100,100)));
rb_funcall(self,'<<',rb_ivar_get(self,'@header_clip_view'));
rb_funcall(rb_ivar_get(self,'@header_clip_view'),'<<',header_view);
rb_funcall(header_view,'needs_display=',true);
}
frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,'x'));
rb_funcall(frame,'y=',rb_funcall(bounds,'y'));
rb_funcall(frame,'width=',rb_funcall(bounds,'width'));
rb_funcall(frame,'height=',rb_funcall(header_frame,'height'));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
rb_funcall(rb_ivar_get(self,'@header_clip_view'),'frame=',frame);
}
return rb_funcall(self,'reflect_scrolled_clip_view',rb_funcall(self,'content_view'));
});
rb_define_method(self,'reflect_scrolled_clip_view',function(self,_,clip_view){
if(RTEST(rb_funcall(self,'document_view'))){
var document_rect=rb_funcall(rb_funcall(self,'document_view'),'frame');
var content_rect=rb_funcall(clip_view,'bounds');
var height_delta=rb_funcall(rb_funcall(document_rect,'height'),'-',rb_funcall(content_rect,'height'));
var width_delta=rb_funcall(rb_funcall(document_rect,'width'),'-',rb_funcall(content_rect,'width'));
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,'y'),'-',rb_funcall(document_rect,'y'))),'/',height_delta));
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'knob_proportion=',rb_funcall(rb_funcall(content_rect,'height'),'/',rb_funcall(document_rect,'height')));
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,'x'),'-',rb_funcall(document_rect,'x'))),'/',width_delta));
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'knob_proportion=',rb_funcall(rb_funcall(content_rect,'width'),'/',rb_funcall(document_rect,'width')));
}
});
rb_define_method(self,'resize_subviews_with_old_size',function(self,_,size){
return rb_funcall(self,'tile');
});
rb_define_method(self,'scroll_wheel',function(self,_,the_event){
});
rb_define_method(self,'scroll_v',function(self,_,sender){
var value=rb_funcall(rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'float_value'),'*',(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'height'),'-',rb_funcall(rb_funcall(rb_ivar_get(self,'@content_view'),'frame'),'height'))));
return rb_funcall(rb_ivar_get(self,'@content_view'),'scroll_to_point',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall((0),'-',rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'x')),value));
});
rb_define_method(self,'scroll_h',function(self,_,sender){
var value=rb_funcall(rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'float_value'),'*',(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'width'),'-',rb_funcall(rb_funcall(rb_ivar_get(self,'@content_view'),'frame'),'width'))));
return rb_funcall(rb_ivar_get(self,'@content_view'),'scroll_to_point',rb_funcall(self.$klass.$c_g_full('Point'),'new',value,rb_funcall((0),'-',rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'y'))));
});
})(rb_define_class_under(self,'ScrollView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('SCROLLER_PARTS',VN.$h(ID2SYM('none'), 0, ID2SYM('increment_line'), 1, ID2SYM('decrement_line'), 2, ID2SYM('increment_page'), 3, ID2SYM('decrement_page'), 4, ID2SYM('knob'), 5, ID2SYM('knob_slot'), 6));
self.$c_s('SCROLLER_ARROWS',VN.$h(ID2SYM('increment_arrow'), 0, ID2SYM('decrement_arrow'), 1));
self.$c_s('SCROLL_ARROW_POSITIONS',VN.$h(ID2SYM('none'), 1, ID2SYM('min_end'), 2, ID2SYM('max_end'), 3));
self.$c_s('USABLE_SCROLLER_PARTS',VN.$h(ID2SYM('none'), 0, ID2SYM('all'), 1, ID2SYM('only_arrows'), 2));
(function(self) {
self.$c_s('V_KNOB_IMAGE',rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_knob_top'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_knob_middle'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_knob_bottom'),true));
self.$c_s('H_KNOB_IMAGE',rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_knob_left'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_knob_middle'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_knob_right')));
self.$c_s('LEFT_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_left_arrow')));
self.$c_s('RIGHT_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_right_arrow')));
self.$c_s('H_TRACK',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_track')));
self.$c_s('V_TRACK',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_track')));
self.$c_s('TOP_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_top_arrow')));
self.$c_s('BOTTOM_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_bottom_arrow')));
self.$def_s('scroller_width',function(self,_){
return 17;
});
self.$def_s('scroller_width_for_control_size',function(self,_,control_size){
return 17;
});
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@value',0.0);
return self.$i_s('@knob_proportion',1);
});
rb_define_method(self,'class_name',function(self,_){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'width'),'<',rb_funcall(rb_ivar_get(self,'@frame'),'height'))) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
if(RTEST(rb_funcall(self,'vertical?'))){
rb_funcall(rb_funcall(self.$klass.$c_g_full('V_TRACK'),'[]',ID2SYM('normal')),'render_with_frame',rb_ivar_get(self,'@bounds'));
rb_funcall(rb_funcall(self.$klass.$c_g_full('TOP_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,17,28));
rb_funcall(rb_funcall(self.$klass.$c_g_full('BOTTOM_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',28),17,28));
}
else{
rb_funcall(rb_funcall(self.$klass.$c_g_full('H_TRACK'),'[]',ID2SYM('normal')),'render_with_frame',rb_ivar_get(self,'@bounds'));
rb_funcall(rb_funcall(self.$klass.$c_g_full('LEFT_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,28,17));
rb_funcall(rb_funcall(self.$klass.$c_g_full('RIGHT_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',28),0,28,17));
}
return rb_funcall(context,'append',ID2SYM('div'),function(knob){
var knob_rect=rb_funcall(self,'rect_for_part',ID2SYM('knob'));
rb_funcall(knob,'frame=',knob_rect);
var knob_bounds=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(knob_rect,'width'),rb_funcall(knob_rect,'height'));
if(RTEST(rb_funcall(self,'vertical?'))){
rb_funcall(self.$klass.$c_g_full('V_KNOB_IMAGE'),'render_with_frame',knob_bounds);
}
else{
rb_funcall(self.$klass.$c_g_full('H_KNOB_IMAGE'),'render_with_frame',knob_bounds);
}
});
});
});
rb_define_method(self,'draw_parts',function(self,_){
});
self.$c_s('DECREMENT_LINE_SIZE',22);
rb_define_method(self,'rect_for_part',function(self,_,part){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
var increment_line=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
var decrement_line=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
var knob=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
var knob_slot=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
if(RTEST(rb_funcall(self,'vertical?'))){
rb_funcall(decrement_line,'height=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'height=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')));
rb_funcall(knob_slot,'height=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')))));
rb_funcall(knob_slot,'y=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(knob,'height=',rb_funcall(rb_funcall(knob_slot,'height'),'*',rb_ivar_get(self,'@knob_proportion')));
rb_funcall(knob,'y=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,'height'),'-',rb_funcall(knob,'height'))),'*',rb_ivar_get(self,'@value'))),'+',rb_funcall(knob_slot,'y')));
}
else{
rb_funcall(decrement_line,'width=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'width=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')));
rb_funcall(knob_slot,'width=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')))));
rb_funcall(knob_slot,'x=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(knob,'width=',rb_funcall(rb_funcall(knob_slot,'width'),'*',rb_ivar_get(self,'@knob_proportion')));
rb_funcall(knob,'x=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,'width'),'-',rb_funcall(knob,'width'))),'*',rb_ivar_get(self,'@value'))),'+',rb_funcall(knob_slot,'x')));
}
return (function($v){
if(($e = rb_funcall(ID2SYM('none'), '===', $v),$e!==nil && $e!==false)){
return result;
}
else if(($e = rb_funcall(ID2SYM('increment_line'), '===', $v),$e!==nil && $e!==false)){
if(RTEST(rb_funcall(self,'vertical?'))){
}
else{
}
}
else if(($e = rb_funcall(ID2SYM('decrement_line'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('increment_page'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('decrement_page'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('knob'), '===', $v),$e!==nil && $e!==false)){
return knob;
}
else if(($e = rb_funcall(ID2SYM('knob_slot'), '===', $v),$e!==nil && $e!==false)){
return knob_slot;
}
})(part);
});
rb_define_method(self,'check_space_for_parts',function(self,_){
});
rb_define_method(self,'usable_parts',function(self,_){
});
rb_define_method(self,'arrows_position=',function(self,_,position){
return self.$i_s('@arrows_position',position);
});
rb_define_method(self,'arrows_position',function(self,_){
return rb_ivar_get(self,'@arrows_position');
});
rb_define_method(self,'control_tint=',function(self,_,control_tint){
return self.$i_s('@control_tint',control_tint);
});
rb_define_method(self,'control_tint',function(self,_){
return rb_ivar_get(self,'@control_tint');
});
rb_define_method(self,'control_size=',function(self,_,control_size){
return self.$i_s('@control_size',control_size);
});
rb_define_method(self,'control_size',function(self,_){
return rb_ivar_get(self,'@control_size');
});
self.$def('draw_arrow:highlight:',function(self,_,which_arrow,flag){
});
rb_define_method(self,'draw_knob',function(self,_){
});
self.$def('draw_knob_slot_in_rect:highlight:',function(self,_,slot_rect,flag){
});
rb_define_method(self,'highlight',function(self,_,flag){
});
rb_define_method(self,'test_part',function(self,_,the_point){
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
if(!RTEST(rb_funcall(self,'enabled?'))){
return ;
}
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
return rb_funcall(self,'track_knob',the_event);
});
rb_define_method(self,'track_knob',function(self,_,the_event){
var original_value=rb_ivar_get(self,'@value');
var mouse_down_point=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
var slot_rect=rb_funcall(self,'rect_for_part',ID2SYM('knob_slot'));
var knob_rect=rb_funcall(self,'rect_for_part',ID2SYM('knob'));
var size=RTEST(rb_funcall(self,'vertical?')) ? rb_funcall(rb_funcall(slot_rect,'height'),'-',rb_funcall(knob_rect,'height')) : rb_funcall(rb_funcall(slot_rect,'width'),'-',rb_funcall(knob_rect,'width'));
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
var delta=RTEST(rb_funcall(self,'vertical?')) ? rb_funcall(rb_funcall(location,'y'),'-',rb_funcall(mouse_down_point,'y')) : rb_funcall(rb_funcall(location,'x'),'-',rb_funcall(mouse_down_point,'x'));
rb_funcall(self,'float_value=',rb_funcall(self.$klass.$c_g_full('Math'),'min',rb_funcall(self.$klass.$c_g_full('Math'),'max',0,rb_funcall(original_value,'+',(rb_funcall(delta,'/',size)))),1));
rb_funcall(self,'needs_display=',true);
rb_funcall(self,'send_action:to:',rb_ivar_get(self,'@action'),rb_ivar_get(self,'@target'));
}
});
});
rb_define_method(self,'track_scroll_buttons',function(self,_,the_event){
});
rb_define_method(self,'hit_part',function(self,_){
});
rb_define_method(self,'knob_proportion',function(self,_){
return rb_ivar_get(self,'@knob_proportion');
});
rb_define_method(self,'knob_proportion=',function(self,_,proportion){
self.$i_s('@knob_proportion',proportion);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'float_value=',function(self,_,a_float){
return self.$i_s('@value',a_float);
});
rb_define_method(self,'float_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'double_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'double_value=',function(self,_,a_double){
return self.$i_s('@value',a_double);
});
rb_define_method(self,'action=',function(self,_,an_action){
return self.$i_s('@action',an_action);
});
rb_define_method(self,'target=',function(self,_,a_target){
return self.$i_s('@target',a_target);
});
rb_define_method(self,'vertical?',function(self,_){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'width'),'<',rb_funcall(rb_ivar_get(self,'@frame'),'height'))) ? true : false;
});
})(rb_define_class_under(self,'Scroller',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
rb_define_method(self,'setup_display_context',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
return rb_funcall(rb_ivar_get(self,'@element'),'css',VN.$h(ID2SYM('overflow'),'hidden'));
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-clip-view';
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background?',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'document_view=',function(self,_,a_view){
var default_center=rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center');
if(RTEST(rb_ivar_get(self,'@document_view'))){
rb_funcall(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_FRAME_DID_CHANGE_NOTIFICATION'),rb_ivar_get(self,'@document_view'));
rb_funcall(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_BOUNDS_DID_CHANGE_NOTIFICATION'),rb_ivar_get(self,'@document_view'));
rb_funcall(rb_ivar_get(self,'@document_view'),'remove_from_superview');
}
self.$i_s('@document_view',a_view);
return rb_funcall(self,'add_subview',a_view);
});
rb_define_method(self,'document_view',function(self,_){
return rb_ivar_get(self,'@document_view');
});
rb_define_method(self,'document_rect',function(self,_){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
});
rb_define_method(self,'document_cursor=',function(self,_,an_obj){
return self.$i_s('@document_cursor',an_obj);
});
rb_define_method(self,'document_cursor',function(self,_){
return rb_ivar_get(self,'@document_cursor');
});
rb_define_method(self,'document_visible_rect',function(self,_){
return rb_funcall(self,'convert_rect:to_view:',rb_ivar_get(self,'@bounds'),rb_ivar_get(self,'@document_view'));
});
rb_define_method(self,'view_frame_changed',function(self,_,notification){
});
rb_define_method(self,'view_bounds_changed',function(self,_,notification){
});
rb_define_method(self,'copies_on_scroll=',function(self,_,flag){
return self.$i_s('@copies_on_scroll',flag);
});
rb_define_method(self,'copies_on_scroll',function(self,_){
return rb_ivar_get(self,'@copies_on_scroll');
});
rb_define_method(self,'auto_scroll?',function(self,_,the_event){
return false;
});
rb_define_method(self,'constrain_scroll_point',function(self,_,new_origin){
return new_origin;
});
rb_define_method(self,'scroll_to_point',function(self,_,new_origin){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@subviews'),'length'),'>',0))){
rb_funcall(rb_funcall(rb_ivar_get(self,'@subviews'),'[]',0),'frame_origin=',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall((0),'-',rb_funcall(new_origin,'x')),rb_funcall((0),'-',rb_funcall(new_origin,'y'))));
}
});
rb_define_method(self,'scroll_x_y',function(self,_,x,y){
return rb_funcall(self,'scroll_to_point',rb_funcall(self.$klass.$c_g_full('Point'),'new',x,y));
});
})(rb_define_class_under(self,'ClipView',self.$c_g_full('View')));
(function(self) {
rb_define_method(self,'reflect_scrolled_clip_view',function(self,_,a_clip_view){
});
self.$def('scroll_clip_view:to_point:',function(self,_,a_clip_view,a_point){
});
})(rb_define_class_under(self,'View',self.$c_g_full('Responder')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
})(rb_define_class_under(self,'TableCornerView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@row_height',17.0);
self.$i_s('@intercell_spacing',rb_funcall(self.$klass.$c_g_full('Size'),'new',3.0,2.0));
self.$i_s('@number_of_rows',rb_funcall((1),'-@'));
self.$i_s('@table_columns',[]);
self.$i_s('@allows_multiple_selection',false);
self.$i_s('@selected_row_indexes',rb_funcall(self.$klass.$c_g_full('IndexSet'),'new'));
self.$i_s('@row_rects',[]);
self.$i_s('@column_rects',[]);
self.$i_s('@header_view',rb_funcall(self.$klass.$c_g_full('TableHeaderView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),17)));
rb_funcall(rb_ivar_get(self,'@header_view'),'table_view=',self);
return self.$i_s('@corner_view',rb_funcall(self.$klass.$c_g_full('TableCornerView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'),rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'))));
});
rb_define_method(self,'data_source=',function(self,_,a_source){
return self.$i_s('@data_source',a_source);
});
rb_define_method(self,'data_source',function(self,_){
return rb_ivar_get(self,'@data_source');
});
rb_define_method(self,'delegate=',function(self,_,a_delegate){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'header_view=',function(self,_,header_view){
return self.$i_s('@header_view',header_view);
});
rb_define_method(self,'header_view',function(self,_){
return rb_ivar_get(self,'@header_view');
});
rb_define_method(self,'corner_view=',function(self,_,corner_view){
return self.$i_s('@corner_view',corner_view);
});
rb_define_method(self,'corner_view',function(self,_){
return rb_ivar_get(self,'@corner_view');
});
rb_define_method(self,'allows_column_reordering=',function(self,_,flag){
return self.$i_s('@allows_column_reordering',flag);
});
rb_define_method(self,'allows_column_reordering?',function(self,_){
return rb_ivar_get(self,'@allows_column_reordering');
});
rb_define_method(self,'allows_column_resizing=',function(self,_,flag){
return self.$i_s('@allows_column_resizing',flag);
});
rb_define_method(self,'allows_column_resizing?',function(self,_){
return rb_ivar_get(self,'@allows_column_resizing');
});
rb_define_method(self,'column_autoresizing_style=',function(self,_,style){
return self.$i_s('@column_autoresizing_style',style);
});
rb_define_method(self,'column_autoresizing_style',function(self,_){
return rb_ivar_get(self,'@column_autoresizing_style');
});
rb_define_method(self,'grid_style_mask=',function(self,_,grid_type){
return self.$i_s('@grid_style_mask',grid_type);
});
rb_define_method(self,'grid_style_mask',function(self,_){
return rb_ivar_get(self,'@grid_style_mask');
});
rb_define_method(self,'intercell_spacing=',function(self,_,size){
return self.$i_s('@intercell_spacing',size);
});
rb_define_method(self,'intercell_spacing',function(self,_){
return rb_ivar_get(self,'@intercell_spacing');
});
rb_define_method(self,'uses_alternating_row_background_colors=',function(self,_,flag){
return self.$i_s('@uses_alternating_row_background_colors',flag);
});
rb_define_method(self,'uses_alternating_row_background_colors?',function(self,_){
return rb_ivar_get(self,'@uses_alternating_row_background_colors');
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'grid_color=',function(self,_,color){
return self.$i_s('@grid_color',color);
});
rb_define_method(self,'grid_color',function(self,_){
return rb_ivar_get(self,'@grid_color');
});
rb_define_method(self,'row_height=',function(self,_,height){
return self.$i_s('@row_height',height);
});
rb_define_method(self,'row_height',function(self,_){
return rb_ivar_get(self,'@row_height');
});
rb_define_method(self,'note_height_of_rows_with_indexes_changed',function(self,_,index_set){
});
rb_define_method(self,'table_columns',function(self,_){
return rb_ivar_get(self,'@table_columns');
});
rb_define_method(self,'number_of_columns',function(self,_){
return rb_funcall(rb_ivar_get(self,'@table_columns'),'length');
});
rb_define_method(self,'number_of_rows',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@number_of_rows'),'<',0))){
if(RTEST(rb_ivar_get(self,'@data_source'))){
if(RTEST(rb_funcall(rb_ivar_get(self,'@data_source'),'respond_to?',ID2SYM('number_of_rows_in_table_view')))){
self.$i_s('@number_of_rows',rb_funcall(rb_ivar_get(self,'@data_source'),'number_of_rows_in_table_view',self));
}
else{
rb_funcall(self,'puts',['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s('@number_of_rows',0);
}
}
else{
self.$i_s('@number_of_rows',0);
}
}
return rb_ivar_get(self,'@number_of_rows');
});
rb_define_method(self,'add_table_column',function(self,_,table_column){
rb_funcall(rb_ivar_get(self,'@table_columns'),'<<',table_column);
rb_funcall(table_column,'table_view=',self);
return rb_funcall(self,'reload_data');
});
rb_define_method(self,'remove_table_column',function(self,_,table_column){
});
self.$def('move_column:to_column:',function(self,_,old_index,new_index){
});
rb_define_method(self,'column_with_identifier',function(self,_){
});
rb_define_method(self,'table_column_with_identifier',function(self,_){
});
rb_define_method(self,'tile',function(self,_){
});
rb_define_method(self,'size_to_fit',function(self,_){
});
rb_define_method(self,'size_last_column_to_fit',function(self,_){
});
rb_define_method(self,'scroll_row_to_visible',function(self,_,row){
});
rb_define_method(self,'scroll_column_to_visible',function(self,_,column){
});
rb_define_method(self,'reload_data',function(self,_){
rb_funcall(self,'note_number_of_rows_changed');
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'note_number_of_rows_changed',function(self,_){
self.$i_s('@number_of_rows',rb_funcall((1),'-@'));
var rows=rb_funcall(self,'number_of_rows');
var size=rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_funcall(rb_ivar_get(self,'@frame'),'width'),rb_funcall(rb_ivar_get(self,'@frame'),'height'));
if(RTEST(rb_funcall(rows,'>',0))){
rb_funcall(size,'width=',rb_funcall(rb_funcall(self,'rect_of_row',0),'width'));
}
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'length'),'>',0))){
rb_funcall(size,'height=',rb_funcall(rb_funcall(self,'rect_of_column',0),'height'));
}
});
rb_define_method(self,'draw_rect',function(self,_,dirty_rect){
rb_funcall(self,'draw_background_in_clip_rect',rb_ivar_get(self,'@bounds'));
rb_funcall(self,'puts',["drawing ",(rb_funcall(self,'number_of_rows'))," rows"].join(''));
return rb_funcall(rb_funcall(self,'number_of_rows'),'times',function(row){
return rb_funcall(self,'draw_row:clip_rect:',row,rb_ivar_get(self,'@bounds'));
});
});
rb_define_method(self,'render',function(self,_,context){
rb_funcall(self,'_synchronize_render_context_with_row_data',context);
rb_funcall(self,'render_background_in_clip_rect',rb_ivar_get(self,'@bounds'),context);
return rb_funcall(rb_funcall(self,'number_of_rows'),'times',function(row){
return rb_funcall(context,'child_node',row,function(row_element){
return rb_funcall(self,'render_row',row,rb_ivar_get(self,'@bounds'),row_element);
});
});
});
rb_define_method(self,'_synchronize_render_context_with_row_data',function(self,_,context){
var children=rb_funcall(context,'child_nodes');
var rows=rb_funcall(self,'number_of_rows');
if(RTEST(rb_funcall(children,'<',rows))){
rb_funcall(children,'times',function(i){
var rect=rb_funcall(self,'rect_of_row',i);
return rb_funcall(context,'child_node',i,function(elem){
return rb_funcall(elem,'css',VN.$h(ID2SYM('width'),[(rb_funcall(rect,'width')),"px"].join('')));
});
});
rb_funcall((rb_funcall(rows,'-',children)),'times',function(i){
var rect=rb_funcall(self,'rect_of_row',rb_funcall(children,'+',i));
return rb_funcall(context,'<<',["<div style='top:",(rb_funcall(rect,'y')),"px;left:",(rb_funcall(rect,'x')),"px;width:",(rb_funcall(rect,'width')),"px;height:",(rb_funcall(rect,'height')),"px;'></div>"].join(''));
});
}
else if(RTEST(rb_funcall(rows,'<',children))){
}
else{
rb_funcall(children,'times',function(i){
var rect=rb_funcall(self,'rect_of_row',i);
return rb_funcall(context,'child_node',i,function(elem){
return rb_funcall(elem,'css',VN.$h(ID2SYM('width'),[(rb_funcall(rect,'width')),"px"].join('')));
});
});
}
});
rb_define_method(self,'render_background_in_clip_rect',function(self,_,clip_rect,context){
return rb_funcall(context,'css',VN.$h(ID2SYM('background_color'),'white'));
});
rb_define_method(self,'render_row',function(self,_,row,clip_rect,row_context){
return rb_funcall(row_context,'build',function(){
if(RTEST(rb_funcall(row,'odd?'))){
rb_funcall(row_context,'css',VN.$h(ID2SYM('background_color'),'rgb(240, 240, 240)'));
}
else{
rb_funcall(row_context,'css',VN.$h(ID2SYM('background'),'none'));
}
if(RTEST(rb_funcall(self,'row_selected?',row))){
rb_funcall(row_context,'css',VN.$h(ID2SYM('background_color'),rb_funcall(rb_funcall(self.$klass.$c_g_full('Color'),'selected_control_color'),'rgb_string')));
}
return rb_funcall(rb_funcall(self,'number_of_columns'),'times',function(column){
var data_cell=rb_funcall(self,'prepared_cell_at_column:row:',column,row);
var table_column=rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column);
if(RTEST(ANDTEST(rb_ivar_get(self,'@delegate'),rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?','table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self,'@delegate'),'table_view:will_display_cell:for_table_column:row:',self,data_cell,table_column,row);
}
var cell_frame=rb_funcall(self,'frame_of_cell_at_column:row:',column,row);
return rb_funcall(row_context,'append',ID2SYM('div'),function(column_context){
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(data_cell,'render_with_frame:in_view:',cell_frame,self);
});
});
});
});
self.$def('reload_data_for_row_indexes:column_indexes:',function(self,_,row_indexes,column_indexes){
});
rb_define_method(self,'edited_column',function(self,_){
});
rb_define_method(self,'edited_row',function(self,_){
});
rb_define_method(self,'clicked_column',function(self,_){
});
rb_define_method(self,'clicked_row',function(self,_){
});
rb_define_method(self,'double_action=',function(self,_,selector){
return self.$i_s('@double_action',selector);
});
rb_define_method(self,'double_action',function(self,_){
return rb_ivar_get(self,'@double_action');
});
rb_define_method(self,'sort_descriptors=',function(self,_,array){
return self.$i_s('@sort_descriptors',array);
});
rb_define_method(self,'sort_descriptors',function(self,_){
return rb_ivar_get(self,'@sort_descriptors');
});
self.$def('set_indicator_image:in_table_column:',function(self,_,an_image,table_column){
});
rb_define_method(self,'indicator_image_in_table_column',function(self,_,table_column){
});
rb_define_method(self,'highlighted_table_column=',function(self,_,table_column){
return self.$i_s('@highlighted_table_column',table_column);
});
rb_define_method(self,'highlighted_table_column',function(self,_){
return rb_ivar_get(self,'@highlighted_table_column');
});
rb_define_method(self,'vertical_motion_can_begin_drag=',function(self,_,flag){
return self.$i_s('@vertical_motion_can_begin_drag',flag);
});
rb_define_method(self,'vertical_motion_can_begin_drag',function(self,_){
return rb_ivar_get(self,'@vertical_motion_can_begin_drag');
});
self.$def('can_drag_rows_with_indexes:at_point:',function(self,_,row_indexes,mouse_down_point){
});
self.$def('drag_image_for_rows_with_indexes:table_columns:event:offset:',function(self,_,drag_rows,table_columns,drag_event,drag_image_offset){
});
self.$def('set_dragging_source_operation_mask:for_local:',function(self,_,mask,is_local){
});
self.$def('set_drop_row:drop_operation:',function(self,_,row,drop_operation){
});
rb_define_method(self,'allows_multiple_selection=',function(self,_,flag){
return self.$i_s('@allows_multiple_selection',flag);
});
rb_define_method(self,'allows_multiple_selection?',function(self,_){
return rb_ivar_get(self,'@allows_multiple_selection');
});
rb_define_method(self,'allows_empty_selection=',function(self,_,flag){
return self.$i_s('@allows_empty_selection',flag);
});
rb_define_method(self,'allows_empty_selection?',function(self,_){
return rb_ivar_get(self,'@allows_empty_selection');
});
rb_define_method(self,'allows_column_selection=',function(self,_,flag){
return self.$i_s('@allows_column_selection',flag);
});
rb_define_method(self,'allows_column_selection?',function(self,_){
return rb_ivar_get(self,'@allows_column_selection');
});
rb_define_method(self,'select_all',function(self,_,sender){
});
rb_define_method(self,'deselect_all',function(self,_,sender){
});
self.$def('select_column_indexes:by_extending_selection:',function(self,_,indexes,extend_flag){
});
self.$def('select_row_indexes:by_extending_selection:',function(self,_,indexes,extend_flag){
if(RTEST(ORTEST((rb_funcall(rb_funcall(indexes,'first_index'),'<',0)),(rb_funcall(rb_funcall(indexes,'last_index'),'>=',rb_funcall(self,'number_of_rows')))))){
return ;
}
if(RTEST(extend_flag)){
rb_funcall(rb_ivar_get(self,'@selected_row_indexes'),'add_indexes',indexes);
}
else{
self.$i_s('@selected_row_indexes',indexes);
}
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'selected_column_indexes',function(self,_){
return rb_ivar_get(self,'@selected_column_indexes');
});
rb_define_method(self,'selected_row_indexes',function(self,_){
return rb_ivar_get(self,'@selected_row_indexes');
});
rb_define_method(self,'deselect_column',function(self,_,column){
});
rb_define_method(self,'deselect_row',function(self,_,row){
});
rb_define_method(self,'selected_column',function(self,_){
});
rb_define_method(self,'selected_row',function(self,_){
});
rb_define_method(self,'column_selected?',function(self,_,column){
});
rb_define_method(self,'row_selected?',function(self,_,row){
return RTEST(rb_funcall(rb_ivar_get(self,'@selected_row_indexes'),'include?',row)) ? true : false;
});
rb_define_method(self,'number_of_selected_columns',function(self,_){
});
rb_define_method(self,'number_of_selected_rows',function(self,_){
});
rb_define_method(self,'allows_type_select?',function(self,_){
return rb_ivar_get(self,'@allows_type_select');
});
rb_define_method(self,'allows_type_select=',function(self,_,value){
return self.$i_s('@allows_type_select',value);
});
rb_define_method(self,'selection_highlight_style=',function(self,_,style){
return self.$i_s('@selection_highlight_style',style);
});
rb_define_method(self,'selection_highlight_style',function(self,_){
return rb_ivar_get(self,'@selection_highlight_style');
});
rb_define_method(self,'dragging_destination_feedback_style=',function(self,_,style){
return self.$i_s('@dragging_destination_feedback_style',style);
});
rb_define_method(self,'dragging_destination_feedback_style',function(self,_){
return rb_ivar_get(self,'@dragging_destination_feedback_style');
});
rb_define_method(self,'rect_of_column',function(self,_,column){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,'<',0),rb_funcall(column,'>=',rb_funcall(rb_ivar_get(self,'@table_columns'),'length'))))){
return result;
}
var rows=rb_funcall(self,'number_of_rows');
var i=0;
for (i = 0; i < column; i++) {rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',i),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width'))));
}for (i = 0; i < rows; i++) {rb_funcall(result,'height=',rb_funcall(rb_funcall(result,'height'),'+',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height'))));
}rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width')));
return result;
});
rb_define_method(self,'rect_of_row',function(self,_,row){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(rb_funcall(row,'<',0),rb_funcall(row,'>=',rb_funcall(self,'number_of_rows'))))){
return result;
}
var i=0;
for (i = 0; i < row; i++) {rb_funcall(result,'y=',rb_funcall(rb_funcall(result,'y'),'+',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height'))));
}rb_funcall(result,'width=',rb_funcall(rb_ivar_get(self,'@bounds'),'width'));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height')));
return result;
});
rb_define_method(self,'column_indexes_in_rect',function(self,_,rect){
});
rb_define_method(self,'rows_in_rect',function(self,_,rect){
});
rb_define_method(self,'column_at_point',function(self,_,point){
var result=rb_funcall((1),'-@');
var i=0;
var columns=rb_funcall(self,'number_of_columns');
for (i = 0; i < columns; i++) {if(RTEST(rb_funcall(point,'in_rect?',rb_funcall(self,'rect_of_column',i)))){
return i;
}
}return result;
});
rb_define_method(self,'row_at_point',function(self,_,point){
var result=rb_funcall((1),'-@');
var i=0;
var rows=rb_funcall(self,'number_of_rows');
for (i = 0; i < rows; i++) {if(RTEST(rb_funcall(point,'in_rect?',rb_funcall(self,'rect_of_row',i)))){
return i;
}
}return result;
});
self.$def('frame_of_cell_at_column:row:',function(self,_,column,row){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,'<',0),rb_funcall(column,'>',rb_funcall(self,'number_of_columns'))))){
return result;
}
rb_funcall(column,'times',function(i){
return rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',i),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width'))));
});
if(!RTEST(rb_funcall(rb_funcall(self,'display_mode'),'==',ID2SYM('render')))){
rb_funcall(row,'times',function(i){
return rb_funcall(result,'y=',rb_funcall(rb_funcall(result,'y'),'+',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height'))));
});
}
rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width')));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height')));
return result;
});
self.$def('prepared_cell_at_column:row:',function(self,_,column,row){
var table_column=rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column);
var cell=rb_funcall(table_column,'data_cell_for_row',row);
rb_funcall(cell,'object_value=',rb_funcall(rb_ivar_get(self,'@data_source'),'table_view:object_value_for_table_column:row:',self,table_column,row));
return cell;
});
rb_define_method(self,'text_should_begin_editing?',function(self,_,text_obj){
});
rb_define_method(self,'text_should_end_editing?',function(self,_,text_obj){
});
rb_define_method(self,'text_did_begin_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_end_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_change',function(self,_,notification){
});
rb_define_method(self,'autosave_name=',function(self,_,name){
return rb_ivar_get(self,'@autosave_name');
});
rb_define_method(self,'autosave_name',function(self,_){
return rb_ivar_get(self,'@autosave_name');
});
rb_define_method(self,'autosave_table_columns=',function(self,_,save){
return rb_ivar_get(self,'@autosave_table_columns');
});
rb_define_method(self,'autosave_table_columns?',function(self,_){
return rb_ivar_get(self,'@autosave_table_columns');
});
self.$def('should_focus_cell:at_column:row:',function(self,_,cell,column,row){
});
rb_define_method(self,'focused_column',function(self,_){
return rb_ivar_get(self,'@focused_column');
});
rb_define_method(self,'focused_column=',function(self,_,column){
return self.$i_s('@focused_column',column);
});
self.$def('perform_click_on_cell_at_column:row:',function(self,_,column,row){
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
self.$i_s('@clicked_column',rb_funcall(self,'column_at_point',location));
self.$i_s('@clicked_row',rb_funcall(self,'row_at_point',location));
if(RTEST(rb_funcall(rb_ivar_get(self,'@clicked_row'),'==',rb_funcall((1),'-@')))){
rb_funcall(self,'select_row_indexes:by_extending_selection:',rb_funcall(self.$klass.$c_g_full('IndexSet'),'new'),false);
}
if(RTEST(true)){
if(RTEST(true)){
rb_funcall(self,'_track_selection_event',the_event);
}
}
});
rb_define_method(self,'_track_selection_event',function(self,_,the_event){
rb_funcall(self,'select_row_indexes:by_extending_selection:',rb_funcall(self.$klass.$c_g_full('IndexSet'),'index_set_with_index',rb_ivar_get(self,'@clicked_row')),false);
var mouse_down_row=rb_ivar_get(self,'@clicked_row');
var last_row=mouse_down_row;
if(RTEST(ORTEST(rb_funcall(self,'allows_multiple_selection?'),true))){
rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
self.$i_s('@clicked_row',rb_funcall(self,'row_at_point',location));
if(!RTEST(rb_funcall(last_row,'==',rb_ivar_get(self,'@clicked_row')))){
rb_funcall(self,'select_row_indexes:by_extending_selection:',rb_funcall(self.$klass.$c_g_full('IndexSet'),'index_set_with_indexes_in_range',VN.$r(mouse_down_row,(rb_funcall(rb_ivar_get(self,'@clicked_row'),'+',1)),false)),false);
}
last_row=rb_ivar_get(self,'@clicked_row');
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
});
}
});
self.$def('edit_column:row:with_event:select:',function(self,_,column,row,the_event,select){
});
self.$def('draw_row:clip_rect:',function(self,_,row,clip_rect){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
var columns=rb_funcall(self,'number_of_columns');
if(RTEST(rb_funcall(row,'odd?'))){
var rect_of_row=rb_funcall(self,'rect_of_row',row);
rb_funcall(rb_funcall(self.$klass.$c_g_full('Color'),'control_alternating_row_background_colors'),'set');
rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'rect',rb_funcall(rect_of_row,'x'),rb_funcall(rect_of_row,'y'),rb_funcall(rect_of_row,'width'),rb_funcall(rect_of_row,'height'));
}
return rb_funcall(columns,'times',function(column){
var data_cell=rb_funcall(self,'prepared_cell_at_column:row:',column,row);
var table_column=rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column);
if(RTEST(ANDTEST(rb_ivar_get(self,'@delegate'),rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?','table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self,'@delegate'),'table_view:will_display_cell:for_table_column:row:',self,data_cell,table_column,row);
}
var cell_frame=rb_funcall(self,'frame_of_cell_at_column:row:',column,row);
return rb_funcall(data_cell,'draw_with_frame:in_view:',cell_frame,self);
});
});
rb_define_method(self,'highlight_selection_in_clip_rect',function(self,_,clip_rect){
});
rb_define_method(self,'draw_grid_in_clip_rect',function(self,_,clip_rect){
});
rb_define_method(self,'draw_background_in_clip_rect',function(self,_,clip_rect){
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
rb_funcall(rb_funcall(self.$klass.$c_g_full('Color'),'white_color'),'set');
return rb_funcall(ctx,'rect',0,0,rb_funcall(clip_rect,'width'),rb_funcall(clip_rect,'height'));
});
})(rb_define_class_under(self,'TableView',self.$c_g_full('Control')));
(function(self) {
})(rb_define_module('TableViewDelegate'));
(function(self) {
})(rb_define_module('TableViewDataSource'));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,identifier){
rb_funcall(self,'identifier=',identifier);
self.$i_s('@header_cell',rb_funcall(self.$klass.$c_g_full('TableHeaderCell'),'new',''));
self.$i_s('@data_cell',rb_funcall(self.$klass.$c_g_full('TextFieldCell'),'new',''));
rb_funcall(rb_ivar_get(self,'@data_cell'),'bezel_style=',ID2SYM('none'));
rb_funcall(rb_ivar_get(self,'@data_cell'),'draws_background=',false);
return self.$i_s('@width',100);
});
rb_define_method(self,'identifier=',function(self,_,identifier){
return self.$i_s('@identifier',identifier);
});
rb_define_method(self,'identifier',function(self,_){
return rb_ivar_get(self,'@identifier');
});
rb_define_method(self,'table_view=',function(self,_,table_view){
return self.$i_s('@table_view',table_view);
});
rb_define_method(self,'table_view',function(self,_){
return rb_ivar_get(self,'@table_view');
});
rb_define_method(self,'width=',function(self,_,width){
return rb_ivar_get(self,'@width');
});
rb_define_method(self,'width',function(self,_){
return rb_ivar_get(self,'@width');
});
rb_define_method(self,'min_width=',function(self,_,min_width){
return self.$i_s('@min_width',min_width);
});
rb_define_method(self,'min_width',function(self,_){
return rb_ivar_get(self,'@min_width');
});
rb_define_method(self,'max_width=',function(self,_,max_width){
return self.$i_s('@max_width',max_width);
});
rb_define_method(self,'max_width',function(self,_){
return rb_ivar_get(self,'@max_width');
});
rb_define_method(self,'header_cell=',function(self,_,cell){
return self.$i_s('@header_cell',cell);
});
rb_define_method(self,'header_cell',function(self,_){
return rb_ivar_get(self,'@header_cell');
});
rb_define_method(self,'data_cell',function(self,_){
return rb_ivar_get(self,'@data_cell');
});
rb_define_method(self,'data_cell=',function(self,_,data_cell){
return self.$i_s('@data_cell',data_cell);
});
rb_define_method(self,'data_cell_for_row',function(self,_){
return rb_ivar_get(self,'@data_cell');
});
rb_define_method(self,'editable=',function(self,_,flag){
return rb_ivar_get(self,'@editable');
});
rb_define_method(self,'editable?',function(self,_){
return rb_ivar_get(self,'@editable');
});
rb_define_method(self,'size_to_fit',function(self,_){
});
rb_define_method(self,'sort_descriptor_prototype=',function(self,_,sort_descriptor){
return self.$i_s('@sort_descriptor_prototype',sort_descriptor);
});
rb_define_method(self,'sort_descriptor_prototype',function(self,_){
return rb_ivar_get(self,'@sort_descriptor_prototype');
});
rb_define_method(self,'resizing_mask=',function(self,_,resizing_mask){
return self.$i_s('@resizing_mask',resizing_mask);
});
rb_define_method(self,'resizing_mask',function(self,_){
return rb_ivar_get(self,'@resizing_mask');
});
rb_define_method(self,'header_tool_tip=',function(self,_,string){
return self.$i_s('@header_tool_tip',string);
});
rb_define_method(self,'header_tool_tip',function(self,_){
return rb_ivar_get(self,'@heder_tool_tip');
});
rb_define_method(self,'hidden?',function(self,_){
return rb_ivar_get(self,'@hidden');
});
rb_define_method(self,'hidden=',function(self,_,flag){
return self.$i_s('@hidden',flag);
});
})(rb_define_class_under(self,'TableColumn',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$c_s('HEADER_BACKGROUND',rb_funcall(self.$c_g_full('Image'),'image_named','header_view_background'));
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-table-header-view';
});
rb_define_method(self,'draw_rect',function(self,_,dirty_rect){
var background_image=self.$klass.$c_g_full('HEADER_BACKGROUND');
return rb_funcall(background_image,'draw_in_rect:from_rect:operation:fraction:',dirty_rect,rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
return rb_funcall(self.$klass.$c_g_full('HEADER_BACKGROUND'),'render_with_frame',rb_ivar_get(self,'@bounds'));
});
});
rb_define_method(self,'table_view=',function(self,_,table_view){
return self.$i_s('@table_view',table_view);
});
rb_define_method(self,'table_view',function(self,_){
return rb_ivar_get(self,'@table_view');
});
rb_define_method(self,'dragged_column',function(self,_){
return rb_ivar_get(self,'@dragged_column');
});
rb_define_method(self,'dragged_distance',function(self,_){
return rb_ivar_get(self,'@dragged_distance');
});
rb_define_method(self,'resized_column',function(self,_){
return rb_ivar_get(self,'@resized_column');
});
rb_define_method(self,'header_rect_of_column',function(self,_,column){
});
rb_define_method(self,'column_at_point',function(self,_,point){
});
})(rb_define_class_under(self,'TableHeaderView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$def('draw_sort_indicator_with_frame:in_view:ascending:priority:',function(self,_,cell_frame,control_view,ascending,priority){
});
self.$def('render_sort_indicator_with_frame:in_view:ascending:priority:',function(self,_,cell_frame,control_view,ascending,priority){
});
rb_define_method(self,'sort_indicator_rect_for_bounds',function(self,_,the_rect){
});
})(rb_define_class_under(self,'TableHeaderCell',self.$c_g_full('TextFieldCell')));
})(rb_define_module('Vienna'));


(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame]);
return self.$i_s('@style_mask',style_mask);
});
self.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_,rect,style){
return rb_funcall(self.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
self.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_,rect,style){
return rb_funcall(self.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
self.$def_s('min_frame_width_with_title:style_mask:',function(self,_,title,style){
});
rb_define_method(self,'frame_rect_for_content_rect',function(self,_,rect){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
rb_define_method(self,'content_rect_for_frame_rect',function(self,_,rect){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-window-view';
});
rb_define_method(self,'window=',function(self,_,win){
return self.$i_s('@window',win);
});
rb_define_method(self,'resize_indicator_frame',function(self,_){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',14),rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',14),12,12);
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
var location=rb_funcall(the_event,'location_in_window');
if(RTEST(rb_funcall(location,'in_rect?',rb_funcall(self,'resize_indicator_frame')))){
rb_funcall(self,'track_window_resize_with_event',the_event);
}
else{
rb_funcall(self,'track_window_move_with_event',the_event);
}
});
rb_define_method(self,'track_window_move_with_event',function(self,_,the_event){
var mouse_down_point=rb_funcall(the_event,'location_in_window');
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var window_point=rb_funcall(the_event,'location_in_window');
self.$i_s('@window_origin',rb_funcall(rb_funcall(rb_ivar_get(self,'@window'),'frame'),'origin'));
self.$i_s('@delta_x',rb_funcall(rb_funcall(window_point,'x'),'-',rb_funcall(mouse_down_point,'x')));
self.$i_s('@delta_y',rb_funcall(rb_funcall(window_point,'y'),'-',rb_funcall(mouse_down_point,'y')));
rb_funcall(rb_ivar_get(self,'@window'),'frame_origin=',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall(rb_funcall(rb_ivar_get(self,'@window_origin'),'x'),'+',rb_ivar_get(self,'@delta_x')),rb_funcall(rb_funcall(rb_ivar_get(self,'@window_origin'),'y'),'+',rb_ivar_get(self,'@delta_y'))));
}
});
});
rb_define_method(self,'track_window_resize_with_event',function(self,_,the_event){
var mouse_down_point=rb_funcall(the_event,'location_in_window');
var original_frame=rb_funcall(rb_funcall(rb_ivar_get(self,'@window'),'frame'),'copy');
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var mouse_point=rb_funcall(the_event,'location_in_window');
var new_width=rb_funcall(rb_funcall(original_frame,'width'),'+',(rb_funcall(rb_funcall(mouse_point,'x'),'-',rb_funcall(mouse_down_point,'x'))));
var new_height=rb_funcall(rb_funcall(original_frame,'height'),'+',(rb_funcall(rb_funcall(mouse_point,'y'),'-',rb_funcall(mouse_down_point,'y'))));
rb_funcall(rb_ivar_get(self,'@window'),'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(original_frame,'x'),rb_funcall(original_frame,'y'),new_width,new_height));
}
});
});
rb_define_method(self,'render',function(self,_,context){
if(RTEST(rb_funcall(context,'first_time?'))){
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(['vn-window-view'],'join',' '));
});
})(rb_define_class_under(self,'WindowView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
var bundle=rb_funcall(self.$c_g_full('Bundle'),'bundle_for_class',self);
self.$c_s('TITLEBAR_IMAGE',rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/titlebar_left.png'),rb_funcall(self.$c_g_full('Size'),'new',6,55)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/titlebar_middle.png'),rb_funcall(self.$c_g_full('Size'),'new',1,55)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/titlebar_right.png'),rb_funcall(self.$c_g_full('Size'),'new',6,55))));
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/close_button.png')));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/close_button_highlighted.png')));
self.$c_s('MIN_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/normal_window_titlebar_left.png')));
self.$c_s('MIN_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/normal_window_titlebar_left.png')));
self.$c_s('ZOOM_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/normal_window_titlebar_left.png')));
self.$c_s('ZOOM_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/normal_window_titlebar_left.png')));
self.$c_s('SPLITTER_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/splitter.png'),rb_funcall(self.$c_g_full('Size'),'new',1,1)));
self.$c_s('RESIZE_IMAGE',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','window/normal/resize_indicator.png'),rb_funcall(self.$c_g_full('Size'),'new',12,12)));
self.$c_s('TITLEBAR_HEIGHT',24.0);
rb_define_method(self,'initialize',function(self,_,frame,style_mask){
return rb_supcall(arguments.callee, self,_,[frame,style_mask]);
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
rb_funcall(context,'append',ID2SYM('div'),function(titlebar){
rb_funcall(titlebar,'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),self.$klass.$c_g_full('TITLEBAR_HEIGHT')));
return rb_funcall(self.$klass.$c_g_full('TITLEBAR_IMAGE'),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),self.$klass.$c_g_full('TITLEBAR_HEIGHT')));
});
rb_funcall(context,'append',ID2SYM('div'),function(splitter){
rb_funcall(splitter,'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,rb_funcall(self.$klass.$c_g_full('TITLEBAR_HEIGHT'),'-',1),rb_funcall(rb_ivar_get(self,'@bounds'),'width'),1));
return rb_funcall(self.$klass.$c_g_full('SPLITTER_IMAGE'),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),1));
});
rb_funcall(context,'append',ID2SYM('div'),function(body){
rb_funcall(body,'frame=',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,self.$klass.$c_g_full('TITLEBAR_HEIGHT'),rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',self.$klass.$c_g_full('TITLEBAR_HEIGHT'))));
return rb_funcall(body,'css',VN.$h(ID2SYM('background_color'),'rgb(245,245,245)'));
});
return rb_funcall(self.$klass.$c_g_full('RESIZE_IMAGE'),'render_with_frame',rb_funcall(self,'resize_indicator_frame'));
});
});
self.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_,rect,style){
return rb_funcall(self.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
self.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_,rect,style){
return rb_funcall(self.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
self.$def_s('min_frame_width_with_title:style_mask:',function(self,_,title,style){
});
rb_define_method(self,'frame_rect_for_content_rect',function(self,_,rect){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
rb_define_method(self,'content_rect_for_frame_rect',function(self,_,rect){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rect,'x'),rb_funcall(rect,'y'),rb_funcall(rect,'width'),rb_funcall(rect,'height'));
});
})(rb_define_class_under(self,'NormalWindowView',self.$c_g_full('WindowView')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$c_s('CLOSE_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[0,1280,13,13]));
self.$c_s('CLOSE_HIGHLIGHTED_IMAGE',rb_funcall(self.$c_g_full('Image'),'sprite',ID2SYM('controls'),[14,1280,13,13]));
self.$c_s('TITLEBAR_HEIGHT',19.0);
rb_define_method(self,'initialize',function(self,_,frame,style_mask){
rb_supcall(arguments.callee, self,_,[frame,style_mask]);
if(RTEST(rb_funcall(rb_ivar_get(self,'@style_mask'),'include?',ID2SYM('closable')))){
self.$i_s('@close_button',rb_funcall(self.$klass.$c_g_full('Button'),'build',VN.$h(ID2SYM('frame'),rb_funcall(self.$klass.$c_g_full('Rect'),'new',5,3,13,13),ID2SYM('bordered'),rb_funcall(self,'false',function(close){
rb_funcall(close,'bordered=',false);
rb_funcall(close,'image_position=',ID2SYM('image_only'));
rb_funcall(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
rb_funcall(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
rb_funcall(self,'<<',close);
return rb_funcall(close,'needs_display=',true);
}))));
}
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
return rb_funcall(context,'css',VN.$h(ID2SYM('background_color'),'rgb(35,35,35)'));
});
});
})(rb_define_class_under(self,'HUDWindowView',self.$c_g_full('WindowView')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
})(rb_define_class_under(self,'BorderlessWindowView',self.$c_g_full('WindowView')));
})(rb_define_module('Vienna'));
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

(function(self) {
(function(self) {
})(rb_define_class_under(self,'Panel',self.$c_g_full('Window')));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('owner'));
self.$c_s('BUILDERS',VN.$h());
rb_define_method(self,'initialize',function(self,_,name,block){
self.$i_s('@name',name);
self.$i_s('@builder',block);
self.$i_s('@top_level_objects',[]);
return rb_funcall(self.$klass.$c_g_full('BUILDERS'),'[]=',name,self);
});
self.$def_s('build',function(self,_,name,options,block){
var builder=rb_funcall(self.$c_g_full('BUILDERS'),'[]',name);
return rb_funcall(builder,'build!',options,block);
});
rb_define_method(self,'build!',function(self,_,options,block){
rb_funcall(rb_ivar_get(self,'@builder'),'call',self);
return arguments[arguments.length -1](self);
});
rb_define_method(self,'top',function(self,_,obj){
return rb_funcall(rb_ivar_get(self,'@top_level_objects'),'<<',obj);
});
rb_define_method(self,'owner',function(self,_){
return rb_ivar_get(self,'@owner');
});
rb_define_method(self,'menu=',function(self,_,a_menu){
});
})(rb_define_class_under(self,'Builder',cObject));
})(rb_define_module('Vienna'));


(function(self) {
(function(self) {
rb_define_method(self,'init_with_coder',function(self,_,coder){
self.$i_s('@frame',rb_funcall(coder,'decode_rect',ID2SYM('frame')));
self.$i_s('@title',rb_funcall(coder,'decode_object',ID2SYM('title')));
self.$i_s('@class',rb_funcall(coder,'decode_object',ID2SYM('class')));
return self.$i_s('@content_view',rb_funcall(coder,'decode_object',ID2SYM('content_view')));
});
rb_define_method(self,'encode_with_coder',function(self,_,coder){
rb_funcall(coder,'encode_rect',ID2SYM('frame'),rb_ivar_get(self,'@frame'));
rb_funcall(coder,'encode_object',ID2SYM('title'),rb_ivar_get(self,'@title'));
rb_funcall(coder,'encode_object',ID2SYM('class'),rb_ivar_get(self,'@class'));
return rb_funcall(coder,'encode_object',ID2SYM('content_view'),rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'awake_after_using_coder',function(self,_,coder){
var win=rb_funcall(self.$klass.$c_g_full('Window'),'new',rb_ivar_get(self,'@frame'),[ID2SYM('closable')]);
rb_funcall(win,'title=',rb_ivar_get(self,'@title'));
rb_funcall(win,'content_view=',rb_ivar_get(self,'@content_view'));
if(RTEST(rb_ivar_get(self,'@min_size'))){
rb_funcall(win,'min_size=',rb_ivar_get(self,'@min_size'));
}
if(RTEST(rb_ivar_get(self,'@max_size'))){
rb_funcall(win,'max_size=',rb_ivar_get(self,'@max_size'));
}
return win;
});
})(rb_define_class_under(self,'WindowTemplate',cObject));
})(rb_define_module('Vienna'));
(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,name,bundle,load_delegate){
self.$i_s('@bundle',bundle);
self.$i_s('@load_delegate',load_delegate);
return self.$i_s('@contents',rb_funcall(bundle,'resource_contents_for_file:of_type:',name,"vib"));
});
rb_define_method(self,'instantiate_vib_with_external_name_table',function(self,_,name_table){
self.$i_s('@unarchiver',rb_funcall(self.$klass.$c_g_full('KeyedUnarchiver'),'new',rb_ivar_get(self,'@contents')));
var root_objects=rb_funcall(rb_ivar_get(self,'@unarchiver'),'decode_object',ID2SYM('root_objects'));
var connections=rb_funcall(rb_ivar_get(self,'@unarchiver'),'decode_object',ID2SYM('connections'));
var classes=rb_funcall(rb_ivar_get(self,'@unarchiver'),'decode_object',ID2SYM('classes'));
return rb_funcall(self,'puts',rb_funcall(rb_ivar_get(self,'@unarchiver'),'current_context'));
});
rb_define_method(self,'load!',function(self,_){
var top_level=rb_funcall(self,'decode_object',ID2SYM('root_objects'));
self.$i_s('@version',rb_funcall(self,'decode_object',ID2SYM('version')));
rb_funcall(self,'puts',["version is ",(rb_ivar_get(self,'@version'))].join(''));
rb_funcall(self,'puts',"top level is:");
return rb_funcall(self,'puts',top_level);
});
rb_define_method(self,'current_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'last');
});
rb_define_method(self,'push_context',function(self,_,context){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'<<',context);
});
rb_define_method(self,'pop_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'pop');
});
rb_define_method(self,'has_key?',function(self,_,key){
if(RTEST(rb_funcall(self,'current_context').hasOwnProperty(rb_funcall(key,'to_s')))){
return true;
}
return false;
});
rb_define_method(self,'decode_object',function(self,_,key){
var context=rb_funcall(self,'current_context');
if(RTEST(context.hasOwnProperty(rb_funcall(key,'to_s')))){
var prop=context[rb_funcall(key,'to_s')];
if(!RTEST(prop.$klass)){
rb_funcall(self,'push_context',prop);
var result=rb_funcall(self,'decode_current_object');
rb_funcall(self,'pop_context');
return result;
}
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
else{
rb_funcall(self,'puch_context',prop);
result=rb_funcall(self,'decode_current_object');
rb_funcall(self,'pop_context');
return result;
}
return '';
}
return nil;
});
rb_define_method(self,'decode_current_object',function(self,_){
var context=rb_funcall(self,'current_context');
var id=context['id'];
var class_str=context['class'];
var obj_class=rb_funcall(self.$klass.$c_g_full('Object'),'full_const_get',class_str);
var keys=context['keys'];
var obj=rb_funcall(obj_class,'alloc');
rb_funcall(self,'push_context',keys);
rb_funcall(obj,'init_with_coder',self);
rb_funcall(self,'pop_context');
obj=rb_funcall(obj,'awake_after_using_coder',self);
rb_funcall(rb_ivar_get(self,'@object_table'),'[]=',id,obj);
return obj;
});
rb_define_method(self,'decode_rect',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Rect'),'from_string',context[key]);
});
rb_define_method(self,'decode_size',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Size'),'from_string',context[key]);
});
rb_define_method(self,'decode_point',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Point'),'from_string',context[key]);
});
})(rb_define_class_under(self,'Vib',cObject));
(function(self) {
rb_define_method(self,'awake_after_using_coder',function(self,_,coder){
return self;
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
return self;
});
})(rb_define_class_under(self,'Object',cObject));
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
self.$c_g_full('DocumentController').$def_s('shared_document_controller',function(self,_){
return self.$i_s('@shared_document_controller',ORTEST(rb_ivar_get(self,'@shared_document_controller'),rb_funcall(self,'new')));
});
rb_define_method(self,'initialize',function(self,_){
self.$i_s('@autosaving_delay',0);
self.$i_s('@documents',[]);
return self.$i_s('@document_types',rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('Bundle'),'main_bundle'),'info_dictionary'),'[]','document_types'));
});
rb_define_method(self,'documents',function(self,_){
return rb_ivar_get(self,'@documents');
});
rb_define_method(self,'current_document',function(self,_){
return rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'main_window'),'window_controller'),'document');
});
rb_define_method(self,'current_directory',function(self,_){
return rb_funcall(self,'puts',["self ",(rb_funcall(self,'_cmd'))," not implemented."].join(''));
});
rb_define_method(self,'document_for_url',function(self,_,absolute_url){
});
rb_define_method(self,'document_for_window',function(self,_,window){
return rb_funcall(rb_funcall(window,'window_controller'),'document');
});
rb_define_method(self,'add_document',function(self,_,document){
return rb_funcall(rb_ivar_get(self,'@documents'),'<<',document);
});
rb_define_method(self,'remove_document',function(self,_,document){
return rb_funcall(rb_ivar_get(self,'@documents'),'delete',document);
});
rb_define_method(self,'new_document',function(self,_,sender){
return type=rb_funcall(rb_funcall(rb_ivar_get(self,'@document_types'),'[]',0),'[]','type_name');
});
self.$def('open_untitled_document_and_display:error:',function(self,_,display_document,out_error){
var doc=rb_funcall(self,'make_untitled_document_of_type:error:',rb_funcall(self,'default_type'),nil);
if(!RTEST(rb_funcall(doc,'nil?'))){
rb_funcall(self,'add_document',doc);
}
rb_funcall(doc,'make_window_controllers');
if(RTEST(display_document)){
rb_funcall(doc,'show_windows');
}
return doc;
});
self.$def('make_untitled_document_of_type:error:',function(self,_,type_name,out_error){
var doc_class=rb_funcall(self,'document_class_for_type',type_name);
var doc=rb_funcall(doc_class,'new',type_name,out_error);
if(!RTEST(doc)){
rb_funcall(self,'puts',["Error creating document of type ",(type_name)].join(''));
}
return doc;
});
rb_define_method(self,'open_document',function(self,_,sender){
});
rb_define_method(self,'urls_from_running_open_panel',function(self,_){
});
self.$def('run_modal_open_panel:for_types:',function(self,_,open_panel,types){
});
self.$def('open_document_with_contents_of_url:display:error:',function(self,_,absolute_url,display_document,out_error){
});
self.$def('make_document_with_contents_of_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
rb_define_method(self,'autosaving_delay=',function(self,_,autosaving_delay){
return self.$i_s('@autosaving_delay',autosaving_delay);
});
rb_define_method(self,'autosaving_delay',function(self,_){
return rb_ivar_get(self,'@autosaving_delay');
});
rb_define_method(self,'save_all_documents',function(self,_,sender){
});
rb_define_method(self,'has_edited_documents?',function(self,_){
return false;
});
self.$def('review_unsaved_documents_with_alert_title:cancellable:delegate:did_review_all_selector:context_info:',function(self,_,title,cancellable,delegate,did_review_all_selector,context_info){
});
self.$def('close_all_documents_with_delegate:did_close_all_selector:context_info:',function(self,_,delegate,did_close_all_selector,context_info){
});
self.$def('present_error:modal_for_window:delegate:did_present_selector:context_info:',function(self,_,error,window,delegate,did_present_selector,context_info){
});
rb_define_method(self,'present_error?',function(self,_,error){
});
rb_define_method(self,'will_present_error',function(self,_,error){
});
rb_define_method(self,'maximum_recent_document_count',function(self,_){
});
rb_define_method(self,'clear_recent_documents',function(self,_,sender){
});
rb_define_method(self,'note_new_recent_document',function(self,_,document){
});
rb_define_method(self,'note_new_recent_document_url',function(self,_,absolute_url){
});
rb_define_method(self,'recent_document_urls',function(self,_){
});
rb_define_method(self,'default_type',function(self,_){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@document_types'),'length'),'==',0))){
return nil;
}
return rb_funcall(rb_funcall(rb_ivar_get(self,'@document_types'),'[]',0),'[]','type_name');
});
self.$def('type_for_contents_of_url:error:',function(self,_,in_absolute_url,out_error){
});
rb_define_method(self,'document_class_names',function(self,_){
});
rb_define_method(self,'document_class_for_type',function(self,_,type_name){
});
rb_define_method(self,'display_name_for_type',function(self,_,type_name){
});
rb_define_method(self,'validate_user_interface_item?',function(self,_,an_item){
});
})(rb_define_class_under(self,'DocumentController',cObject));
})(rb_define_module('Vienna'));

(function(self) {
self.$c_s('DOCUMENT_CHANGE_TYPES',VN.$h(ID2SYM('done'), 0, ID2SYM('undone'), 1, ID2SYM('cleared'), 2, ID2SYM('redone'), 5, ID2SYM('read_other_contents'), 3, ID2SYM('autosaved'), 4));
self.$c_s('SAVE_OPERATION_TYPES',VN.$h(ID2SYM('save_operation'), 0, ID2SYM('save_as_operation'), 1, ID2SYM('save_to_operation'), 2, ID2SYM('autosave_operation'), 3));
(function(self) {
rb_define_method(self,'initialize',function(self,_){
return rb_supcall(arguments.callee, self,_,[]);
});
self.$def('init_with_type:error:',function(self,_,type_name,out_error){
return rb_funcall(self,'initialize');
});
self.$def('init_with_contents_of_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
rb_define_method(self,'file_type=',function(self,_,type_name){
return self.$i_s('@file_type',type_name);
});
rb_define_method(self,'file_type',function(self,_){
return rb_ivar_get(self,'@file_type');
});
rb_define_method(self,'file_url=',function(self,_,absolute_url){
return self.$i_s('@file_url',absolute_url);
});
rb_define_method(self,'file_url',function(self,_){
return rb_ivar_get(self,'@file_url');
});
rb_define_method(self,'file_modification_date=',function(self,_,modification_date){
return self.$i_s('@file_modification_date',modification_date);
});
rb_define_method(self,'modification_date',function(self,_){
return rb_ivar_get(self,'@modification_date');
});
rb_define_method(self,'revert_document_to_saved',function(self,_,sender){
});
self.$def('revert_to_contents_of_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
self.$def('read_from_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
self.$def('read_from_file_wrapper:of_type:error:',function(self,_,file_wrapper,type_name,out_error){
});
self.$def('read_from_data:of_type:error:',function(self,_,data,type_name,out_error){
});
self.$def('write_to_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
self.$def('file_wrapper_of_type:error:',function(self,_,type_name,out_error){
});
self.$def('data_of_type:error:',function(self,_,type_name,out_error){
});
rb_define_method(self,'save_document',function(self,_,sender){
});
rb_define_method(self,'save_document_as',function(self,_,sender){
});
rb_define_method(self,'save_document_to',function(self,_,sender){
});
self.$def('document:did_save:context_info:',function(self,_,document,did_save_successfully,context_info){
});
self.$def('save_document_with_delegate:did_save_selector:context_info:',function(self,_,delegate,did_save_selector,context_info){
});
self.$def('document:did_save:context_info:',function(self,_,document,did_save_successfully,context_info){
});
self.$def('run_modal_save_panel_for_save_operation:delegate:did_save_selector:context_info:',function(self,_,save_operation,delegate,did_save_selector,context_info){
});
rb_define_method(self,'should_run_save_panel_with_accessory_view?',function(self,_){
return true;
});
rb_define_method(self,'prepare_save_panel',function(self,_,save_panel){
});
self.$def('can_close_document_with_delegate:should_close_selector:context_info:',function(self,_,delegate,should_close_selector,context_info){
});
rb_define_method(self,'close',function(self,_){
});
rb_define_method(self,'document_edited?',function(self,_){
});
rb_define_method(self,'update_change_count',function(self,_,change){
});
rb_define_method(self,'undo_manager=',function(self,_,undo_manager){
return self.$i_s('@undo_manager',undo_manager);
});
rb_define_method(self,'undo_manager',function(self,_){
return rb_ivar_get(self,'@undo_manager');
});
rb_define_method(self,'has_undo_manager?',function(self,_){
return RTEST(rb_ivar_get(self,'@undo_manager')) ? true : false;
});
self.$def('present_error:modal_for_window:delegate:did_present_selector:context_info:',function(self,_,error,window,delegate,did_present_selector,context_info){
});
rb_define_method(self,'present_error',function(self,_,error){
});
rb_define_method(self,'will_present_error',function(self,_,error){
});
rb_define_method(self,'make_window_controllers',function(self,_){
});
rb_define_method(self,'window_vib_name',function(self,_){
});
rb_define_method(self,'window_controller_will_load_vib',function(self,_,window_controller){
});
rb_define_method(self,'window_controller_did_load_vib',function(self,_,window_controller){
});
rb_define_method(self,'window=',function(self,_,a_window){
return self.$i_s('@window',a_window);
});
rb_define_method(self,'add_window_controller',function(self,_,window_controller){
});
rb_define_method(self,'remove_window_controller',function(self,_,window_controller){
});
rb_define_method(self,'show_windows',function(self,_){
});
rb_define_method(self,'window_controllers',function(self,_){
return rb_ivar_get(self,'@window_controllers');
});
self.$def('should_close_window_controller:delegate:should_close_selector:context_info:',function(self,_,window_controller,delegate,should_close_selector,context_info){
});
rb_define_method(self,'display_name',function(self,_){
});
rb_define_method(self,'window_for_sheet',function(self,_){
});
self.$c_g_full('Document').$def_s('readable_types',function(self,_){
return [];
});
self.$c_g_full('Document').$def_s('writable_types',function(self,_){
return [];
});
self.$c_g_full('Document').$def_s('native_type?',function(self,_,type){
});
rb_define_method(self,'writable_types_for_save_operation',function(self,_,save_operation){
});
self.$def('file_name_extensions_for_type:save_operation:',function(self,_,type_name,save_operation){
});
rb_define_method(self,'validate_user_interface_item?',function(self,_,an_item){
});
})(rb_define_class_under(self,'Document',cObject));
})(rb_define_module('Vienna'));
b1094$vnfmwk$1.0$p7$/viennar259$8$info.yml245$vnplist$1.0$h7$s16$bundle_icon_files0$s17$bundle_identifiers22$com.yourcompany.viennas15$principal_classs15$VN::Applications13$main_vib_files9$main_menus19$bundle_package_types4$APPLs11$bundle_names6$viennas25$bundle_development_regions7$Englishc804$(function(self) {
self.$c_s('VERSION','0.0.1');
self.$def_s('version',function(self,_){
return self.$c_g_full('VERSION');
});
self.$def_s('display_mode',function(self,_){
return 'render';});
rb_define_method(self,'app',function(self,_){
});
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'display_mode',function(self,_){
return ID2SYM('draw');
});
rb_define_method(self,'draw_rect',function(self,_,a_rect){
rb_funcall(self,'puts','drawing..');
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
return rb_funcall(ctx,'rect',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
});
})(rb_define_class_under(self,'GaugeView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));
b4108$vnfmwk$1.0$p0$r549$8$info.yml535$vnplist$1.0$h8$s16$bundle_icon_file~$s17$bundle_identifiers34$com.adambeynon.DocumentApplications15$principal_classs15$VN::Applications13$main_vib_files9$main_menus19$bundle_package_types4$APPLs14$document_typesa2$h4$s14$document_classs13$FirstDocuments15$type_extensionsa1$s4$doc1s9$type_roles6$Editors9$type_names17$DocApp First Typeh4$s14$document_classs14$SecondDocuments15$type_extensionsa1$s4$doc2s9$type_roles6$Editors9$type_names18$DocApp Second Types11$bundle_names19$DocumentApplications25$bundle_development_regions7$Englishr369$28$resources/first_document.vib334$vnplist$1.0$h3$s12$root_objectsa1$h7$s17$visible_at_launcht$s12$content_viewh5$s8$subviewsa0$s10$view_flagsd3$256s3$_idd4$1002s6$_classs8$VN::Views5$frames20${{0, 0}, {422, 270}}s5$classs10$VN::Windows5$titles11$Main Windows3$_idd4$1001s6$_classs18$VN::WindowTemplates5$frames24${{250, 226}, {422, 270}}s7$classesa0$s11$connectionsa0$r2810$23$resources/main_menu.vib2779$vnplist$1.0$h3$s12$root_objectsa1$h7$s17$visible_at_launcht$s12$content_viewh5$s8$subviewsa5$h8$s14$next_responderd4$1002s4$cellh13$s17$periodic_intervald2$75s18$alternate_contentss0$s13$button_flags2d3$163s3$_idd4$1005s6$_classs14$VN::ButtonCells4$fonth5$s4$names5$Arials4$sized2$12s3$_idd4$1006s4$boldt$s6$_classs8$VN::Fonts12$control_viewd4$1004s12$button_flagsd11$-2038152961s8$contentss13$New Document!s14$periodic_delayd3$400s14$key_equivalents0$s11$cell_flags2d9$134217728s10$cell_flagsd11$-2080244224s9$superviewd4$1002s10$view_flagsd3$268s3$_idd4$1004s7$enabledt$s6$_classs10$VN::Buttons5$frames21${{92, 40}, {116, 24}}h8$s14$next_responderd4$1002s4$cellh13$s17$periodic_intervald2$75s18$alternate_contentss0$s13$button_flags2d3$129s3$_idd4$1005s6$_classs14$VN::ButtonCells4$fontd4$1006s12$control_viewd4$1004s12$button_flagsd11$-2038284033s8$contentss11$Push Buttons14$periodic_delayd3$400s14$key_equivalents0$s11$cell_flags2d9$134217728s10$cell_flagsd8$67239424s9$superviewd4$1002s10$view_flagsd3$270s3$_idd4$1004s7$enabledt$s6$_classs10$VN::Buttons5$frames22${{222, 40}, {116, 24}}h8$s14$next_responderd4$1002s4$cellh10$s3$_idd4$1011s6$_classs17$VN::TextFieldCells10$text_colorh4$s3$_idd4$1014s6$_classs9$VN::Colors10$color_names10$text_colors12$catalog_names6$Systems4$fonth5$s4$names5$Arials4$sized2$12s3$_idd4$1012s4$boldf$s6$_classs8$VN::Fonts12$control_viewd4$1010s8$contentss9$Textfields16$background_colorh4$s3$_idd4$1013s6$_classs9$VN::Colors10$color_names21$text_background_colors12$catalog_names6$Systems16$draws_backgroundt$s11$cell_flags2d9$272630784s10$cell_flagsd11$-1804468671s9$superviewd4$1002s10$view_flagsd3$268s3$_idd4$1010s7$enabledt$s6$_classs13$VN::TextFields5$frames21${{92, 80}, {116, 24}}h8$s14$next_responderd4$1002s4$cellh9$s3$_idd4$1016s6$_classs17$VN::TextFieldCells10$text_colorh4$s3$_idd4$1014s6$_classs9$VN::Colors10$color_names18$control_text_colors12$catalog_names6$Systems4$fontd4$1012s12$control_viewd4$1015s8$contentss5$Labels16$draws_backgroundf$s11$cell_flags2d9$272630784s10$cell_flagsd8$68288064s9$superviewd4$1002s10$view_flagsd3$268s3$_idd4$1015s7$enabledt$s6$_classs13$VN::TextFields5$frames21${{222, 80}, {38, 17}}h8$s14$next_responderd4$1002s4$cellh11$s8$verticalf$s9$max_valued3$100s13$alt_inc_valued1$0s9$min_valued1$0s3$_idd4$1018s6$_classs14$VN::SliderCells5$valued2$50s12$control_viewd4$1017s8$contentss0$s11$cell_flags2d1$0s10$cell_flagsd11$-2080244224s9$superviewd4$1002s10$view_flagsd3$268s3$_idd4$1017s7$enabledt$s6$_classs10$VN::Sliders5$frames22${{136, 168}, {96, 21}}s10$view_flagsd3$256s3$_idd4$1002s6$_classs8$VN::Views5$frames20${{0, 0}, {852, 270}}s5$classs10$VN::Windows5$titles11$Main Windows3$_idd4$1001s6$_classs18$VN::WindowTemplates5$frames24${{240, 196}, {852, 270}}s7$classesa0$s11$connectionsa0$c345$(function(self) {
rb_funcall(self,'include',self.$c_g_full('Vienna'));
(function(self) {
rb_define_method(self,'application_will_finish_launching',function(self,_,notification){
return rb_funcall(self,'puts',"app will finish launching!");
});
})(rb_define_class_under(self,'AppController',cObject));
})(rb_define_module('DocumentApplication'));
