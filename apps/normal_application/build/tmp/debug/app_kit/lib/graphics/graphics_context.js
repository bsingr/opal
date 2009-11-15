(function(self) {
(function(self) {
rb_define_method(self,'rect',function(self,_,x,y,w,h){
rb_ivar_get(self,'@ctx').fillRect(x, y, w, h);});
rb_define_method(self,'graphics_port',function(self,_){
return rb_ivar_get(self,'@ctx');
});
rb_define_method(self,'graphics_port=',function(self,_,graphics_port){
return self.$i_s('@ctx',graphics_port);
});
rb_define_method(self,'flipped?',function(self,_){
return rb_ivar_get(self,'@flip_state');
});
self.$def_s('current_context',function(self,_){
return rb_ivar_get(self,'@current_context');
});
self.$def_s('current_context=',function(self,_,context){
return self.$i_s('@current_context',context);
});
rb_define_method(self,'save_graphics_state',function(self,_){
});
rb_define_method(self,'restore_graphics_state',function(self,_){
});
rb_define_method(self,'line_width=',function(self,_,width){
rb_ivar_get(self,'@ctx').lineWidth = width});
rb_define_method(self,'line_cap=',function(self,_,cap){
rb_ivar_get(self,'@ctx').lineCap = cap});
rb_define_method(self,'line_join=',function(self,_,join){
rb_ivar_get(self,'@ctx').lineJoin = join});
rb_define_method(self,'miter_limit=',function(self,_,limit){
rb_ivar_get(self,'@ctx').miterLimit = limit});
rb_define_method(self,'alpha=',function(self,_,alpha){
rb_ivar_get(self,'@ctx').globalAlpha = alpha});
rb_define_method(self,'begin_path',function(self,_){
rb_ivar_get(self,'@ctx').beginPath()});
rb_define_method(self,'move_to_point',function(self,_,point){
rb_ivar_get(self,'@ctx').moveTo(rb_funcall(point,'x'),rb_funcall(point,'y'))});
rb_define_method(self,'add_line_to_point',function(self,_,point){
rb_ivar_get(self,'@ctx').lineTo(rb_funcall(point,'x'),rb_funcall(point,'y'))});
rb_define_method(self,'add_curve_to_point',function(self,_,cp1,cp2,point){
rb_ivar_get(self,'@ctx').bezierCurveTo(rb_funcall(cp1,'x'),rb_funcall(cp1,'y'),rb_funcall(cp2,'x'),rb_funcall(cp2,'y'),rb_funcall(point,'x'),rb_funcall(point,'y'))});
rb_define_method(self,'add_lines',function(self,_,points){
});
rb_define_method(self,'scale_ctm',function(self,_,sx,sy){
});
rb_define_method(self,'translate_ctm',function(self,_,tx,ty){
});
rb_define_method(self,'rotate_ctm',function(self,_,angle){
});
rb_define_method(self,'concat_ctm',function(self,_,transform){
});
rb_define_method(self,'ctm',function(self,_){
});
rb_define_method(self,'add_ellipse_in_rect',function(self,_,rect){
});
rb_define_method(self,'add_arc',function(self,_,point,radius,start_angle,end_angle,clock_wise){
});
rb_define_method(self,'arc_to_point',function(self,_,point1,point2,radius){
});
rb_define_method(self,'add_path',function(self,_,path){
});
rb_define_method(self,'path_empty?',function(self,_){
});
rb_define_method(self,'path_current_point',function(self,_){
});
rb_define_method(self,'path_bounding_box',function(self,_){
});
rb_define_method(self,'path_contains_point?',function(self,_,point){
});
})(rb_define_class_under(self,'GraphicsContext',self.$c_g_full('Element')));
})(rb_define_module('Vienna'));
