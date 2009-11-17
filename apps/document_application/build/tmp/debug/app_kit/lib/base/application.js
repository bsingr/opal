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
