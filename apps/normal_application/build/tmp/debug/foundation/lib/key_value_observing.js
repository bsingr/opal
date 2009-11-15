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
