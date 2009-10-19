var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Slider',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-slider';
});
$VN_2.$def('min_value',function(self,_cmd){
return self.$i_g('@min_value');
});
$VN_2.$def('min_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'min_value');
self.$i_s('@min_value',a_double);
VN$(self, 'did_change_value_for_key', 'min_value');
});
$VN_2.$def('max_value',function(self,_cmd){
return self.$i_g('@max_value');
});
$VN_2.$def('max_value=',function(self,_cmd,a_double){
VN$(self, 'will_change_value_for_key', 'max_value');
self.$i_s('@max_value',a_double);
VN$(self, 'did_change_value_for_key', 'max_value');
});
$VN_2.$def('alt_increment_value=',function(self,_cmd,inc_value){
VN$(self, 'will_change_value_for_key', 'alt_increment_value');
self.$i_s('@alt_increment_value',inc_value);
VN$(self, 'did_change_value_for_key', 'alt_increment_value');
});
$VN_2.$def('alt_increment_value',function(self,_cmd){
return self.$i_g('@alt_increment_value');
});
VN$($VN_2,'attr_reader','title_color','title_font','title','knob_thickness','image');
$VN_2.$def('title_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'title_color');
self.$i_s('@title_color',color);
VN$(self, 'did_change_value_for_key', 'title_color');
});
$VN_2.$def('title_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'title_font');
self.$i_s('@title_font',font);
VN$(self, 'did_change_value_for_key', 'title_font');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('knob_thickness=',function(self,_cmd,a_float){
VN$(self, 'will_change_value_for_key', 'knob_thickness');
self.$i_s('@knob_thickness',a_float);
VN$(self, 'did_change_value_for_key', 'knob_thickness');
});
$VN_2.$def('image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'image');
self.$i_s('@image',img);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('vertical?',function(self,_cmd){
return self.$i_g('@vertical');
});
$VN_2.$def('accepts_first_mouse',function(self,_cmd,event){
return true;
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='track-left'></div>");
VN$(context,'<<',"<div class='track-middle'></div>");
VN$(context,'<<',"<div class='track-right'></div>");
VN$(context,'<<',"<div class='knob'></div>");
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
});
VN$($VN_2,'attr_reader','number_of_tick_marks','tick_mark_position');
$VN_2.$def('number_of_tick_marks=',function(self,_cmd,count){
VN$(self, 'will_change_value_for_key', 'number_of_tick_marks');
self.$i_s('@number_of_tick_marks',count);
VN$(self, 'did_change_value_for_key', 'number_of_tick_marks');
});
$VN_2.$def('tick_mark_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'tick_mark_position');
self.$i_s('@tick_mark_position',pos);
VN$(self, 'did_change_value_for_key', 'tick_mark_position');
});
$VN_2.$def('allows_tick_mark_values_only=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_tick_mark_values_only');
self.$i_s('@allows_tick_mark_values_only',flag);
VN$(self, 'did_change_value_for_key', 'allows_tick_mark_values_only');
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
