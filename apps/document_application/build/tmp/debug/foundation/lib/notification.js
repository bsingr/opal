(function(self) {
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('name'),ID2SYM('object'),ID2SYM('user_info'));
rb_define_method(self,'initialize',function(self,_,name,obj,info){
rb_supcall(arguments.callee, self,_,[]);
self.$i_s('@name',name);
self.$i_s('@object',obj);
return self.$i_s('@user_info',info);
});
self.$def_s('notification_with_name:object:',function(self,_,name,obj){
return rb_funcall(self,'notification_with_name:object:user_info:',name,obj,nil);
});
self.$def_s('notification_with_name:object:user_info:',function(self,_,name,obj,info){
return rb_funcall(self,'new',name,obj,info);
});
})(rb_define_class_under(self,'Notification',cObject));
(function(self) {
self.$def_s('default_center',function(self,_){
return self.$i_s('@default_center',ORTEST(rb_ivar_get(self,'@default_center'),rb_funcall(self,'new')));
});
rb_define_method(self,'initialize',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
return self.$i_s('@dispatch_table',[]);
});
self.$def('add_observer:selector:name:object:',function(self,_,observer,selector,name,obj){
return rb_funcall(rb_ivar_get(self,'@dispatch_table'),'<<',VN.$h(ID2SYM('observer'), observer, ID2SYM('selector'), selector, ID2SYM('name'), name, ID2SYM('sender'), obj, ID2SYM('active'), true));
});
rb_define_method(self,'post_notification',function(self,_,notification){
return rb_funcall(self,'post_notification_name:object:user_info:',rb_funcall(notification,'name'),rb_funcall(notification,'object'),rb_funcall(notification,'user_info'));
});
self.$def('post_notification_name:object:',function(self,_,name,obj){
return rb_funcall(self,'post_notification_name:object:user_info:',name,obj,nil);
});
self.$def('post_notification_name:object:user_info:',function(self,_,name,obj,info){
return rb_funcall(rb_ivar_get(self,'@dispatch_table'),'each',function(the_obj){
if(RTEST(rb_funcall(rb_funcall(the_obj,'[]',ID2SYM('name')),'==',name))){
rb_funcall(rb_funcall(the_obj,'[]',ID2SYM('observer')),'perform_selector:with_object:with_object:',rb_funcall(the_obj,'[]',ID2SYM('selector')),obj,info);
}
});
});
rb_define_method(self,'remove_observer',function(self,_,observer){
});
self.$def('remove_observer:name:object:',function(self,_,observer,name,obj){
});
self.$def('add_observer_for_name:object:queue:',function(self,_,name,obj,queue){
});
})(rb_define_class_under(self,'NotificationCenter',cObject));
})(rb_define_module('Vienna'));
