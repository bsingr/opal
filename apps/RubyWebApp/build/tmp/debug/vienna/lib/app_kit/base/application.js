var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
$VN_1.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
$VN_1.$c_s('RUN_LOOP_MODES',VN.$h('normal', 0, 'modal_panel', 1, 'event_tracking', 2));
var $VN_2 = RClass.define_under($VN_1, 'Application',cObject);
VN$($VN_2,'attr_accessor','windows','event_queue','views_needing_display');
VN$($VN_2,'attr_reader','delegate');
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@windows',[]);
self.$i_s('@event_queue',[]);
self.$i_s('@views_needing_display',[]);
self.$i_s('@delegate',nil);
return self.$i_s('@run_loop_mode','normal');
});
$VN_2.$def('run_loop_mode',function(self,_cmd){
return self.$i_g('@run_loop_mode');
});
$VN_2.$def('bind_events',function(self,_cmd,types,block){
self.$i_s('@run_loop_mode','event_tracking');
self.$i_s('@event_binding_mask',types);
self.$i_s('@event_binding_block',block);
self.$i_s('@event_binding_window',VN$(VN$(self,'current_event'),'window'));
if(RTEST(VN$(types,'include?','left_mouse_dragged'))){
VN$(self.$klass.$c_g_full('Document'),'add_event_listener','mousemove',function(evt){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,'left_mouse_dragged');
return VN$(self,'send_event',the_event);
});
}
});
$VN_2.$def('unbind_events',function(self,_cmd){
self.$i_s('@run_loop_mode','normal');
if(RTEST(VN$(self.$i_g('@event_binding_mask'),'include?','left_mouse_dragged'))){
VN$(self.$klass.$c_g_full('Document'),'remove_event_listener','mousemove');
}
});
$VN_2.$def('current_event',function(self,_cmd){
return self.$i_g('@current_event');
});
$VN_2.$def('send_event',function(self,_cmd,the_event){
self.$i_s('@current_event',the_event);
if(RTEST(VN$(self.$i_g('@run_loop_mode'),'==','event_tracking'))){
if(RTEST(VN$(self.$i_g('@event_binding_mask'),'include?',VN$(the_event,'type')))){
VN$(the_event,'window=',self.$i_g('@event_binding_window'));
VN$(self.$i_g('@event_binding_block'),'call',the_event);
}
return ;
}
return VN$(VN$(the_event,'window'),'send_event',the_event);
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
return self.$i_s('@app',ORTEST(self.$i_g('@app'),VN$(self,'new')));
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
if(RTEST(VN$(self.$i_g('@delegate'),'==',obj))){
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
});
$VN_2.$def('running?',function(self,_cmd){
return true;
});
$VN_2.$def('finish_launching',function(self,_cmd){
if(RTEST(self.$i_g('@run_block'))){
VN$(self.$i_g('@run_block'),'call',self);
}
VN$(self.$klass.$c_g_full('Document'),'add_event_listener','mousedown',function(evt){
if(RTEST(VN$(VN$(self.$klass.$c_g_full('App'),'run_loop_mode'),'==','event_tracking'))){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,'left_mouse_down');
VN$(self,'puts','sending event from here');
VN$(self,'send_event',the_event);
}
});
VN$(self.$klass.$c_g_full('Document'),'add_event_listener','mouseup',function(evt){
if(RTEST(VN$(VN$(self.$klass.$c_g_full('App'),'run_loop_mode'),'==','event_tracking'))){
var the_event = VN$(self.$klass.$c_g_full('Event'),'from_native_event:with_window:with_type:',evt,nil,'left_mouse_up');
VN$(self,'send_event',the_event);
}
});
var nc = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_WILL_FINISH_LAUNCHING'),self);
return VN$(nc,'post_notification_name:object:',self.$klass.$c_g_full('APP_DID_FINISH_LAUNCHING'),self);
});
$VN_2.$def('run',function(self,_cmd,block){
return self.$i_s('@run_block',block);
});
$VN_2.$def('send_action:to:from:',function(self,_cmd,action,target,sender){
});
$VN_1.$c_s('App',VN$($VN_1.$c_g_full('Application'),'shared_application'));
window.onload = function() {VN$(cObject.$c_g('VN').$c_g('App'),'finish_launching');
};