var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h('square', 0, 'rounded', 1));
var $VN_2 = RClass.define_under($VN_1, 'TextField',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@editable',true);
return self.$i_s('@selectable',true);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('TextFieldCell');
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
});
$VN_2.$def('resign_first_responder',function(self,_cmd){
VN$(self,'puts','resign first responder....');
return true;
});
$VN_2.$def('become_first_responder',function(self,_cmd){
VN$(self,'puts','becoming first responder!!');
VN$(VN$(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
return true;
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
return VN$(VN$(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'draws_background');
self.$i_s('@draws_background',flag);
VN$(self, 'did_change_value_for_key', 'draws_background');
});
$VN_2.$def('draws_background?',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('text_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'text_color');
self.$i_s('@text_color',color);
VN$(self, 'did_change_value_for_key', 'text_color');
});
$VN_2.$def('text_color',function(self,_cmd){
return self.$i_g('@text_color');
});
$VN_2.$def('bordered?',function(self,_cmd){
return self.$i_g('@bordered');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
self.$i_s('@bordered',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('bezeled?',function(self,_cmd){
return self.$i_g('@bezeled');
});
$VN_2.$def('bezeled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bezeled');
self.$i_s('@bezeled',flag);
VN$(self, 'did_change_value_for_key', 'bezeled');
});
$VN_2.$def('editable?',function(self,_cmd){
return self.$i_g('@editable');
});
$VN_2.$def('editable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'editable');
self.$i_s('@editable',flag);
VN$(self, 'did_change_value_for_key', 'editable');
});
$VN_2.$def('selectable?',function(self,_cmd){
return self.$i_g('@selectable');
});
$VN_2.$def('selectable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'selectable');
self.$i_s('@selectable',flag);
VN$(self, 'did_change_value_for_key', 'selectable');
});
$VN_2.$def('select_text',function(self,_cmd,sender){
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('delegate=',function(self,_cmd,an_obj){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_s('@delegate',an_obj);
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('text_should_begin_editing?',function(self,_cmd,text_object){
return true;
});
$VN_2.$def('text_should_end_editing?',function(self,_cmd,text_object){
return true;
});
$VN_2.$def('text_did_begin_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_end_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_change',function(self,_cmd,notification){
});
$VN_2.$def('bezel_style=',function(self,_cmd,stlye){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',VN$(self, 'style'));
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
