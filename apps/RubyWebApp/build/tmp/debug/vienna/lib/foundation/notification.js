var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Notification', cObject);
$VN_2.$('attr_reader',['name','object','user_info']);
$VN_2.$def('initialize',function(name,obj,info){
var self=this;
self.$i_s('@name',name);
self.$i_s('@object',obj);
return self.$i_s('@user_info',info);
});
$VN_2.$def_s('notification_with_name:object:',function(name,obj){
var self=this;
return self.$('notification_with_name:object:user_info:',[name,obj,nil]);
});
$VN_2.$def_s('notification_with_name:object:user_info:',function(name,obj,info){
var self=this;
return self.$('new',[name,obj,info]);
});
var $VN_2 = RClass.define_under($VN_1, 'NotificationCenter', cObject);
$VN_2.$def_s('default_center',function(){
var self=this;
return (self.$k_d('@@default_center') ? self.$k_g('@@default_center') : self.$k_s('@@default_center',self.$('new',[])));
});
$VN_2.$def('add_observer:selector:name:object:',function(observer,selector,name,obj){
var self=this;
});
$VN_2.$def('post_notification',function(notification){
var self=this;
});
$VN_2.$def('post_notification_name:object:',function(name,obj){
var self=this;
});
$VN_2.$def('post_notification_name:object:user_info:',function(name,obj,info){
var self=this;
});
$VN_2.$def('remove_observer',function(observer){
var self=this;
});
$VN_2.$def('remove_observer:name:object:',function(observer,name,obj){
var self=this;
});
$VN_2.$def('add_observer_for_name:object:queue:',function(name,obj,queue){
var self=this;
});
