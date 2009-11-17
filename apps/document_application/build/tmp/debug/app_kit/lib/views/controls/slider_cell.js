(function(self) {
(function(self) {
var bundle=rb_funcall(self.$c_g_full('Bundle'),'bundle_for_class',self);
self.$c_s('TRACK_IMAGES',VN.$h(ID2SYM('vertical'), VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/track_left_normal.png'),rb_funcall(self.$c_g_full('Size'),'new',4,5)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/track_middle_normal.png'),rb_funcall(self.$c_g_full('Size'),'new',1,5)),rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/track_right_normal.png'),rb_funcall(self.$c_g_full('Size'),'new',4,5))))));
self.$c_s('KNOB_IMAGES',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'new',rb_funcall(bundle,'path_for_resource','slider/normal_knob.png'),rb_funcall(self.$c_g_full('Size'),'new',17,17))));
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s('prefers_tracking_until_mouse_up',function(self,_){
return true;
});
rb_define_method(self,'initialize',function(self,_){
rb_supcall(arguments.callee, self,_,[]);
self.$i_s('@min_value',0);
self.$i_s('@max_value',100);
self.$i_s('@value',0);
return self.$i_s('@continuous',true);
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
self.$i_s('@min_value',rb_funcall(coder,'decode_double',ID2SYM('min_value')));
self.$i_s('@max_value',rb_funcall(coder,'decode_double',ID2SYM('max_value')));
self.$i_s('@value',0);
return self.$i_s('@continuous',true);
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
self.$i_s('@cell_frame',cell_frame);
self.$i_s('@control_view',control_view);
return rb_funcall(ctx,'build',function(){
rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('TRACK_IMAGES'),'[]',ID2SYM('vertical')),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',self.$klass.$c_g_full('TRACK_PADDING'),rb_funcall((rb_funcall(rb_funcall(cell_frame,'height'),'-',5)),'/',2),rb_funcall(rb_funcall(cell_frame,'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('TRACK_PADDING')))),5));
return rb_funcall(rb_funcall(self.$klass.$c_g_full('KNOB_IMAGES'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self,'_knob_rect_for_value',rb_ivar_get(self,'@value')));
});
});
rb_define_method(self,'min_value',function(self,_){
return rb_ivar_get(self,'@min_value');
});
rb_define_method(self,'min_value=',function(self,_,a_double){
return self.$i_s('@min_value',a_double);
});
rb_define_method(self,'max_value',function(self,_){
return rb_ivar_get(self,'@max_value');
});
rb_define_method(self,'max_value=',function(self,_,a_double){
return self.$i_s('@max_value',a_double);
});
rb_define_method(self,'alt_increment_value=',function(self,_,inc_value){
return self.$i_s('@alt_increment_value',inc_value);
});
rb_define_method(self,'alt_increment_value',function(self,_){
return rb_ivar_get(self,'@alt_increment_value');
});
rb_define_method(self,'vertical?',function(self,_){
return false;
});
rb_define_method(self,'title_color=',function(self,_,color){
return self.$i_s('@title_color',color);
});
rb_define_method(self,'title_font=',function(self,_,font){
return self.$i_s('@title_font',font);
});
rb_define_method(self,'title=',function(self,_,str){
return self.$i_s('@title',str);
});
rb_define_method(self,'knob_thickness=',function(self,_,a_float){
return self.$i_s('@knob_thickness',a_float);
});
rb_define_method(self,'image=',function(self,_,img){
return self.$i_s('@image',img);
});
rb_define_method(self,'number_of_tick_marks=',function(self,_,count){
return self.$i_s('@number_of_tick_marks',count);
});
rb_define_method(self,'tick_mark_position=',function(self,_,pos){
return self.$i_s('@tick_mark_position',pos);
});
rb_define_method(self,'allows_tick_mark_values_only=',function(self,_,flag){
return self.$i_s('@allows_tick_mark_values_only',flag);
});
rb_define_method(self,'allows_tick_mark_values_only?',function(self,_){
return rb_ivar_get(self,'@allows_tick_mark_values_only');
});
rb_define_method(self,'tick_mark_value_at_index',function(self,_,index){
});
rb_define_method(self,'rect_of_tick_mark_at_index',function(self,_,index){
});
rb_define_method(self,'index_of_tick_mark_at_point',function(self,_,point){
});
rb_define_method(self,'closest_tick_mark_value_to_value',function(self,_,value){
});
rb_define_method(self,'_knob_rect_for_value',function(self,_,a_value){
var x=rb_funcall((rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('KNOB_PADDING_REGULAR'))))),'*',(rb_funcall((rb_funcall(rb_ivar_get(self,'@value'),'/',(rb_funcall(rb_ivar_get(self,'@max_value'),'-',rb_ivar_get(self,'@min_value'))))),'+',rb_ivar_get(self,'@min_value'))));
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',x,rb_funcall((rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'height'),'-',17)),'/',2),17,17);
});
rb_define_method(self,'_value_for_mouse_point',function(self,_,a_point){
var value=rb_funcall((rb_funcall(rb_funcall(a_point,'x'),'-',(rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'x'),'+',self.$klass.$c_g_full('KNOB_PADDING_REGULAR'))))),'/',(rb_funcall(rb_funcall(rb_ivar_get(self,'@cell_frame'),'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('KNOB_PADDING_REGULAR'))))));
value=rb_funcall(value,'*',(rb_funcall((rb_funcall(rb_ivar_get(self,'@max_value'),'-',rb_ivar_get(self,'@min_value'))),'+',rb_ivar_get(self,'@min_value'))));
return rb_funcall(self.$klass.$c_g_full('Math'),'min',rb_funcall(self.$klass.$c_g_full('Math'),'max',value,rb_ivar_get(self,'@min_value')),rb_ivar_get(self,'@max_value'));
});
self.$def('start_tracking_at:in_view:',function(self,_,start_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,'_value_for_mouse_point',start_point));
rb_funcall(self,'highlight:with_frame:in_view:',true,rb_ivar_get(self,'@cell_frame'),control_view);
return true;
});
self.$def('continue_tracking:at:in_view:',function(self,_,last_point,current_point,control_view){
rb_funcall(self,'double_value=',rb_funcall(self,'_value_for_mouse_point',current_point));
rb_funcall(self,'render_with_frame:in_view:',rb_ivar_get(self,'@cell_frame'),control_view);
return true;
});
self.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_,last_point,stop_point,control_view,flag){
return rb_funcall(self,'highlight:with_frame:in_view:',false,rb_ivar_get(self,'@cell_frame'),control_view);
});
})(rb_define_class_under(self,'SliderCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));
