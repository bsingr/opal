var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(self,_cmd,path,object,change,context){
});
$VN_2.$def('add_observer:for_key_path:options:context:',function(self,_cmd,observer,key_path,options,context){
return VN$(self.$i_g('@kvo_observers'),'<<',VN.$h('observer', observer, 'key_path', key_path, 'options', options, 'context', context));
});
$VN_2.$def('remove_observer:for_key_path:',function(self,_cmd,observer,key_path){
});
var $VN_2 = RClass.define_under($VN_1, 'Array',cObject);
$VN_2.$def('add_observer:to_objects_at_indexes:for_key_path:options:context:',function(self,_cmd,observer,indexes,key_path,options,context){
});
$VN_2.$def('remove_observer:from_objects_at_indexes:for_key_path:',function(self,_cmd,observer,indexes,keyPath){
});
$VN_2.$def('add_observer:for_key_path:options:context:',function(self,_cmd,observer,key_path,options,context){
});
$VN_2.$def('remove_observer:for_key_path:',function(self,_cmd,observer,key_path){
});
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('will_change_value_for_key',function(self,_cmd,key){
return VN$(self.$i_g('@kvo_old_values'),'[]=',VN$(self,'value_for_key',key));
});
$VN_2.$def('did_change_value_for_key',function(self,_cmd,key){
return VN$(self.$i_g('@kvo_observers'),'each',function(current){
if((e=VN$(VN$(current,'[]','key_path'),'==',key),e!==nil && e!==false)){
var change_dict = VN.$h('old', VN$(self.$i_g('@kvo_old_values'),'[]',key), 'new', VN$(self,'value_for_key',key));
VN$(VN$(current,'[]','observer'),'observe_value_for_key_path:of_object:change:context:',key,self,change_dict,VN$(current,'[]','context'));
}
});
});
$VN_2.$def('will_change:values_at_indexes:for_key:',function(self,_cmd,changeKind,indexes,key){
});
$VN_2.$def('did_change:values_at_indexes:for_key:',function(self,_cmd,changeKind,indexes,key){
});
$VN_2.$def_s('key_paths_for_values_affecting_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('automatically_notifies_observers_for_key',function(self,_cmd,key){
return true;
});
$VN_2.$def('observation_info=',function(self,_cmd,info){
VN$(self, 'will_change_value_for_key', 'observation_info');
self.$i_s('@observation_info',info);
VN$(self, 'did_change_value_for_key', 'observation_info');
});
$VN_2.$def('observation_info',function(self,_cmd){
return self.$i_g('@observation_info');
});
