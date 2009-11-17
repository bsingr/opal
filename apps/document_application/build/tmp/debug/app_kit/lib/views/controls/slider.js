(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('SliderCell');
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-slider';
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
rb_funcall(self,'attr_reader',ID2SYM('title_color'),ID2SYM('title_font'),ID2SYM('title'),ID2SYM('knob_thickness'),ID2SYM('image'));
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
rb_define_method(self,'vertical?',function(self,_){
return rb_ivar_get(self,'@vertical');
});
rb_define_method(self,'accepts_first_mouse',function(self,_,event){
return true;
});
rb_funcall(self,'attr_reader',ID2SYM('number_of_tick_marks'),ID2SYM('tick_mark_position'));
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
})(rb_define_class_under(self,'Slider',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));
