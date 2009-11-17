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
