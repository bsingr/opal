(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@editable',true);
return self.$i_s('@selectable',true);
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('TextFieldCell');
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-text-field';
});
rb_define_method(self,'resign_first_responder?',function(self,_){
rb_funcall(self,'puts','resign first responder....');
return true;
});
rb_define_method(self,'become_first_responder?',function(self,_){
rb_funcall(self,'puts','becoming first responder!!');
rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
return true;
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'current_event'),'allows_propagation=',true);
return rb_funcall(self,'puts',"mouse down in text field");
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background?',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'text_color=',function(self,_,color){
return self.$i_s('@text_color',color);
});
rb_define_method(self,'text_color',function(self,_){
return rb_ivar_get(self,'@text_color');
});
rb_define_method(self,'bordered?',function(self,_){
return rb_ivar_get(self,'@bordered');
});
rb_define_method(self,'bordered=',function(self,_,flag){
return self.$i_s('@bordered',flag);
});
rb_define_method(self,'bezeled?',function(self,_){
return rb_ivar_get(self,'@bezeled');
});
rb_define_method(self,'bezeled=',function(self,_,flag){
return self.$i_s('@bezeled',flag);
});
rb_define_method(self,'editable?',function(self,_){
return rb_ivar_get(self,'@editable');
});
rb_define_method(self,'editable=',function(self,_,flag){
return self.$i_s('@editable',flag);
});
rb_define_method(self,'selectable?',function(self,_){
return rb_ivar_get(self,'@selectable');
});
rb_define_method(self,'selectable=',function(self,_,flag){
return self.$i_s('@selectable',flag);
});
rb_define_method(self,'select_text',function(self,_,sender){
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'delegate=',function(self,_,an_obj){
return self.$i_s('@delegate',an_obj);
});
rb_define_method(self,'text_should_begin_editing?',function(self,_,text_object){
return true;
});
rb_define_method(self,'text_should_end_editing?',function(self,_,text_object){
return true;
});
rb_define_method(self,'text_did_begin_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_end_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_change',function(self,_,notification){
});
rb_define_method(self,'bezel_style=',function(self,_,stlye){
return self.$i_s('@bezel_style',rb_funcall(self,'style'));
});
rb_define_method(self,'bezel_style',function(self,_){
return rb_ivar_get(self,'@bezel_style');
});
})(rb_define_class_under(self,'TextField',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));
