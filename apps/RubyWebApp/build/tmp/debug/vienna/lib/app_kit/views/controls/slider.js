var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Slider',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('SliderCell');
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-slider';
});
$VN_2.$def('min_value',function(self,_cmd){
return self.$i_g('@min_value');
});
$VN_2.$def('min_value=',function(self,_cmd,a_double){
return self.$i_s('@min_value',a_double);
});
$VN_2.$def('max_value',function(self,_cmd){
return self.$i_g('@max_value');
});
$VN_2.$def('max_value=',function(self,_cmd,a_double){
return self.$i_s('@max_value',a_double);
});
$VN_2.$def('alt_increment_value=',function(self,_cmd,inc_value){
return self.$i_s('@alt_increment_value',inc_value);
});
$VN_2.$def('alt_increment_value',function(self,_cmd){
return self.$i_g('@alt_increment_value');
});
VN$($VN_2,'attr_reader','title_color','title_font','title','knob_thickness','image');
$VN_2.$def('title_color=',function(self,_cmd,color){
return self.$i_s('@title_color',color);
});
$VN_2.$def('title_font=',function(self,_cmd,font){
return self.$i_s('@title_font',font);
});
$VN_2.$def('title=',function(self,_cmd,str){
return self.$i_s('@title',str);
});
$VN_2.$def('knob_thickness=',function(self,_cmd,a_float){
return self.$i_s('@knob_thickness',a_float);
});
$VN_2.$def('image=',function(self,_cmd,img){
return self.$i_s('@image',img);
});
$VN_2.$def('vertical?',function(self,_cmd){
return self.$i_g('@vertical');
});
$VN_2.$def('accepts_first_mouse',function(self,_cmd,event){
return true;
});
VN$($VN_2,'attr_reader','number_of_tick_marks','tick_mark_position');
$VN_2.$def('number_of_tick_marks=',function(self,_cmd,count){
return self.$i_s('@number_of_tick_marks',count);
});
$VN_2.$def('tick_mark_position=',function(self,_cmd,pos){
return self.$i_s('@tick_mark_position',pos);
});
$VN_2.$def('allows_tick_mark_values_only=',function(self,_cmd,flag){
return self.$i_s('@allows_tick_mark_values_only',flag);
});
$VN_2.$def('allows_tick_mark_values_only?',function(self,_cmd){
return self.$i_g('@allows_tick_mark_values_only');
});
$VN_2.$def('tick_mark_value_at_index',function(self,_cmd,index){
});
$VN_2.$def('rect_of_tick_mark_at_index',function(self,_cmd,index){
});
$VN_2.$def('index_of_tick_mark_at_point',function(self,_cmd,point){
});
$VN_2.$def('closest_tick_mark_value_to_value',function(self,_cmd,value){
});
