(function(self) {
(function(self) {
self.$c_s('HEADER_BACKGROUND',rb_funcall(self.$c_g_full('Image'),'image_named','header_view_background'));
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-table-header-view';
});
rb_define_method(self,'draw_rect',function(self,_,dirty_rect){
var background_image=self.$klass.$c_g_full('HEADER_BACKGROUND');
return rb_funcall(background_image,'draw_in_rect:from_rect:operation:fraction:',dirty_rect,rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
return rb_funcall(self.$klass.$c_g_full('HEADER_BACKGROUND'),'render_with_frame',rb_ivar_get(self,'@bounds'));
});
});
rb_define_method(self,'table_view=',function(self,_,table_view){
return self.$i_s('@table_view',table_view);
});
rb_define_method(self,'table_view',function(self,_){
return rb_ivar_get(self,'@table_view');
});
rb_define_method(self,'dragged_column',function(self,_){
return rb_ivar_get(self,'@dragged_column');
});
rb_define_method(self,'dragged_distance',function(self,_){
return rb_ivar_get(self,'@dragged_distance');
});
rb_define_method(self,'resized_column',function(self,_){
return rb_ivar_get(self,'@resized_column');
});
rb_define_method(self,'header_rect_of_column',function(self,_,column){
});
rb_define_method(self,'column_at_point',function(self,_,point){
});
})(rb_define_class_under(self,'TableHeaderView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));
