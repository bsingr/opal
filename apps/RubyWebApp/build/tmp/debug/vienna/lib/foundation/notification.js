var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Notification',cObject);
VN$($VN_2,'attr_reader','name','object','user_info');
VN$($VN_2,'attr_writer','name','object','user_info');
$VN_2.$def('initialize',function(self,_cmd,name,obj,info){
VN$sup(arguments.callee, self,_cmd,[]);
self.$i_s('@name',name);
self.$i_s('@object',obj);
return self.$i_s('@user_info',info);
});
$VN_2.$def_s('notification_with_name:object:',function(self,_cmd,name,obj){
return VN$(self,'notification_with_name:object:user_info:',name,obj,nil);
});
$VN_2.$def_s('notification_with_name:object:user_info:',function(self,_cmd,name,obj,info){
return VN$(self,'new',name,obj,info);
});
var $VN_2 = RClass.define_under($VN_1, 'NotificationCenter',cObject);
$VN_2.$def_s('default_center',function(self,_cmd){
return self.$i_s('@default_center',ORTEST(self.$i_g('@default_center'),VN$(self,'new')));
});
$VN_2.$def('initialize',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@dispatch_table',[]);
});
$VN_2.$def('add_observer:selector:name:object:',function(self,_cmd,observer,selector,name,obj){
return VN$(self.$i_g('@dispatch_table'),'<<',VN.$h('observer', observer, 'selector', selector, 'name', name, 'sender', obj, 'active', true));
});
$VN_2.$def('post_notification',function(self,_cmd,notification){
return VN$(self,'post_notification_name:object:user_info:',VN$(notification,'name'),VN$(notification,'object'),VN$(notification,'user_info'));
});
$VN_2.$def('post_notification_name:object:',function(self,_cmd,name,obj){
return VN$(self,'post_notification_name:object:user_info:',name,obj,nil);
});
$VN_2.$def('post_notification_name:object:user_info:',function(self,_cmd,name,obj,info){
return VN$(self.$i_g('@dispatch_table'),'each',function(the_obj){
if(RTEST(VN$(VN$(the_obj,'[]','name'),'==',name))){
VN$(VN$(the_obj,'[]','observer'),'perform_selector:with_object:with_object:',VN$(the_obj,'[]','selector'),obj,info);
}
});
});
$VN_2.$def('remove_observer',function(self,_cmd,observer){
});
$VN_2.$def('remove_observer:name:object:',function(self,_cmd,observer,name,obj){
});
$VN_2.$def('add_observer_for_name:object:queue:',function(self,_cmd,name,obj,queue){
});
