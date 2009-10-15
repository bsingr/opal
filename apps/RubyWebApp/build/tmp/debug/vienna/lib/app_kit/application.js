var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
var $VN_2 = RClass.define_under($VN_1, 'Application',cObject);
VN$($VN_2,'attr_accessor','windows','event_queue','views_needing_display');
VN$($VN_2,'attr_reader','delegate');
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@windows',[]);
self.$i_s('@event_queue',[]);
self.$i_s('@views_needing_display',[]);
return self.$i_s('@delegate',nil);
});
$VN_2.$def('run',function(self,_cmd){
return VN$(self, 'finish_launching');
});
$VN_2.$def('finish_launching',function(self,_cmd){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
return VN$(self, 'display_required_views');
});
$VN_2.$def('mark_view_for_display',function(self,_cmd,view,flag){
if(!RTEST(VN$(self.$i_g('@views_needing_display'),'contains?',view))){
VN$(self.$i_g('@views_needing_display'),'<<',view);
}
});
$VN_2.$def('display_required_views',function(self,_cmd){
VN$(self.$i_g('@views_needing_display'),'each',function(view){
return VN$(view,'draw_rect');
});
return self.$i_s('@views_needing_display',[]);
});
$VN_2.$def('add_window',function(self,_cmd,window){
return 0;
});
$VN_2.$def('<<',function(self,_cmd,window){
return VN$(self,'add_window',window);
});
$VN_2.$def_s('shared_application',function(self,_cmd){
return (self.$k_d('@@app') ? self.$k_g('@@app') : self.$k_s('@@app',VN$(self,'new')));
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'delegate');
VN$(self,'puts',self.$i_g('@delegate'));
if(!RTEST(VN$(self.$i_g('@delegate'),'==',obj))){
return ;
}
var nc = VN$(self.$klass.$c_g_full('VN').$c_g('NotificationCenter'),'default_center');
if(RTEST(self.$i_g('@delegate'))){
VN$(nc,'remove_observer:name:object:',self.$i_g('@delegate'),self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
VN$(nc,'remove_observer:name:object:',self.$i_g('@delegate'),self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
VN$(nc,'remove_observer:name:object:',self.$i_g('@delegate'),self.$klass.$c_g_full('APP_DID_CHANGE_SCREEN_PARAMETERS'),self);
}
self.$i_s('@delegate',obj);
if(RTEST(VN$(self.$i_g('@delegate'),'respond_to?','will_finish_launching'))){
VN$(nc,'add_observer:selector:name:object:',self.$i_g('@delegate'),'will_finish_launching',self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
}
if(RTEST(VN$(self.$i_g('@delegate'),'respond_to?','did_finish_launching'))){
VN$(nc,'add_observer:selector:name:object:',self.$i_g('@delegate'),'did_finish_launching',self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
}
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('running?',function(self,_cmd){
return true;
});
$VN_2.$def('finish_launching',function(self,_cmd){
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
return VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
});
$VN_2.$def('run',function(self,_cmd){
return VN$(self, 'finish_launching');
});
$VN_1.$c_s('App',VN$($VN_1.$c_g_full('Application'),'shared_application'));
