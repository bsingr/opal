var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Responder',cObject);
$VN_2.$def('initialize',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@next_responder',nil);
});
$VN_2.$def('next_responder=',function(self,_cmd,a_responder){
VN$(self, 'will_change_value_for_key', 'next_responder');
self.$i_s('@next_responder',a_responder);
VN$(self, 'did_change_value_for_key', 'next_responder');
});
$VN_2.$def('next_responder',function(self,_cmd){
return self.$i_g('@next_responder');
});
$VN_2.$def('try_to_perform:with:',function(self,_cmd,an_action,an_object){
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,the_event){
return false;
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_down',the_event);
});
$VN_2.$def('right_mouse_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'right_mouse_down',the_event);
});
$VN_2.$def('other_mouse_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'other_mouse_down',the_event);
});
$VN_2.$def('mouse_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_up',the_event);
});
$VN_2.$def('right_mouse_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'right_mouse_up',the_event);
});
$VN_2.$def('other_mouse_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'other_mouse_up',the_event);
});
$VN_2.$def('mouse_moved',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_moved',the_event);
});
$VN_2.$def('mouse_dragged',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_dragged',the_event);
});
$VN_2.$def('scroll_wheel',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'scroll_wheel',the_event);
});
$VN_2.$def('right_mouse_dragged',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'right_mouse_dragged',the_event);
});
$VN_2.$def('other_mouse_dragged',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'other_mouse_dragged',the_event);
});
$VN_2.$def('mouse_entered',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_entered',the_event);
});
$VN_2.$def('mouse_exited',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'mouse_exited',the_event);
});
$VN_2.$def('key_down',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'key_down',the_event);
});
$VN_2.$def('key_up',function(self,_cmd,the_event){
return VN$(self.$i_g('@next_responder'),'key_up',the_event);
});
$VN_2.$def('flags_changed',function(self,_cmd,the_event){
});
$VN_2.$def('cursor_update',function(self,_cmd,the_event){
});
$VN_2.$def('no_responder_for',function(self,_cmd,event_selector){
});
$VN_2.$def('accepts_first_responder',function(self,_cmd){
return false;
});
$VN_2.$def('become_first_responder',function(self,_cmd){
return true;
});
$VN_2.$def('resign_first_responder',function(self,_cmd){
return true;
});
$VN_2.$def('interpret_key_events',function(self,_cmd,event_array){
});
$VN_2.$def('flush_buffered_key_events',function(self,_cmd){
});
$VN_2.$def('menu=',function(self,_cmd,menu){
VN$(self, 'will_change_value_for_key', 'menu');
self.$i_s('@menu',menu);
VN$(self, 'did_change_value_for_key', 'menu');
});
$VN_2.$def('menu',function(self,_cmd){
return self.$i_g('@menu');
});
$VN_2.$def('show_context_help',function(self,_cmd,sender){
});
$VN_2.$def('help_requested',function(self,_cmd,the_event){
});
$VN_2.$def('undo_manager',function(self,_cmd){
return VN$(self.$i_g('@next_responder'),'undo_manager');
});
