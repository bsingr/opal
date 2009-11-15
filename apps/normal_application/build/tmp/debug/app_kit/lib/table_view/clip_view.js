(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
rb_define_method(self,'setup_display_context',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
return rb_funcall(rb_ivar_get(self,'@element'),'css',VN.$h(ID2SYM('overflow'),'hidden'));
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-clip-view';
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
rb_define_method(self,'document_view=',function(self,_,a_view){
var default_center=rb_funcall(self.$klass.$c_g_full('NotificationCenter'),'default_center');
if(RTEST(rb_ivar_get(self,'@document_view'))){
rb_funcall(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_FRAME_DID_CHANGE_NOTIFICATION'),rb_ivar_get(self,'@document_view'));
rb_funcall(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_BOUNDS_DID_CHANGE_NOTIFICATION'),rb_ivar_get(self,'@document_view'));
rb_funcall(rb_ivar_get(self,'@document_view'),'remove_from_superview');
}
self.$i_s('@document_view',a_view);
return rb_funcall(self,'add_subview',a_view);
});
rb_define_method(self,'document_view',function(self,_){
return rb_ivar_get(self,'@document_view');
});
rb_define_method(self,'document_rect',function(self,_){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
});
rb_define_method(self,'document_cursor=',function(self,_,an_obj){
return self.$i_s('@document_cursor',an_obj);
});
rb_define_method(self,'document_cursor',function(self,_){
return rb_ivar_get(self,'@document_cursor');
});
rb_define_method(self,'document_visible_rect',function(self,_){
return rb_funcall(self,'convert_rect:to_view:',rb_ivar_get(self,'@bounds'),rb_ivar_get(self,'@document_view'));
});
rb_define_method(self,'view_frame_changed',function(self,_,notification){
});
rb_define_method(self,'view_bounds_changed',function(self,_,notification){
});
rb_define_method(self,'copies_on_scroll=',function(self,_,flag){
return self.$i_s('@copies_on_scroll',flag);
});
rb_define_method(self,'copies_on_scroll',function(self,_){
return rb_ivar_get(self,'@copies_on_scroll');
});
rb_define_method(self,'auto_scroll?',function(self,_,the_event){
return false;
});
rb_define_method(self,'constrain_scroll_point',function(self,_,new_origin){
return new_origin;
});
rb_define_method(self,'scroll_to_point',function(self,_,new_origin){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@subviews'),'length'),'>',0))){
rb_funcall(rb_funcall(rb_ivar_get(self,'@subviews'),'[]',0),'frame_origin=',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall((0),'-',rb_funcall(new_origin,'x')),rb_funcall((0),'-',rb_funcall(new_origin,'y'))));
}
});
rb_define_method(self,'scroll_x_y',function(self,_,x,y){
return rb_funcall(self,'scroll_to_point',rb_funcall(self.$klass.$c_g_full('Point'),'new',x,y));
});
})(rb_define_class_under(self,'ClipView',self.$c_g_full('View')));
(function(self) {
rb_define_method(self,'reflect_scrolled_clip_view',function(self,_,a_clip_view){
});
self.$def('scroll_clip_view:to_point:',function(self,_,a_clip_view,a_point){
});
})(rb_define_class_under(self,'View',self.$c_g_full('Responder')));
})(rb_define_module('Vienna'));
