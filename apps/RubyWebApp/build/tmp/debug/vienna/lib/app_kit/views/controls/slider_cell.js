var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'SliderCell',$VN_2.$c_g_full('Cell'));
$VN_2.$c_s('TRACK_PADDING',2.0);
$VN_2.$c_s('KNOB_PADDING_REGULAR',9.5);
$VN_2.$c_s('KNOB_PADDING_SMALL',8);
$VN_2.$c_s('KNOB_PADDING_MINI',6.5);
$VN_2.$def_s('prefers_tracking_until_mouse_up',function(self,_cmd){
return true;
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$sup(arguments.callee, self,_cmd,[]);
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-slider';
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(RTEST(VN$(ctx,'first_time?'))){
VN$(ctx,'<<',"<div class='track-left'></div>");
VN$(ctx,'<<',"<div class='track-middle'></div>");
VN$(ctx,'<<',"<div class='track-right'></div>");
VN$(ctx,'<<',"<div class='knob'></div>");
VN$(ctx,'first_time=',false);
}
VN$(ctx,'class_name=',VN$(self, 'class_name'));
return VN$(ctx,'selector','knob',function(knob){
var min = 0;
var max = 100;
var value = 0;
var knob_position = VN$((VN$(value,'/',(VN$(max,'-',min)))),'*',((VN$(VN$(cell_frame,'width'),'-',(VN$((2),'*',self.$klass.$c_g_full('KNOB_PADDING_REGULAR')))))));
return VN$(knob,'css',VN.$h('left',[(knob_position),"px"].join('')));
});
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
$VN_2.$def('vertical?',function(self,_cmd){
return false;
});
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
$VN_2.$def('start_tracking_at:in_view:',function(self,_cmd,start_point,control_view){
VN$(self,'highlight:with_frame:in_view:',true,nil,control_view);
return true;
});
$VN_2.$def('continue_tracking:at:in_view:',function(self,_cmd,last_point,current_point,control_view){
return true;
});
$VN_2.$def('stop_tracking:at:in_view:mouse_is_up:',function(self,_cmd,last_point,stop_point,control_view,flag){
return VN$(self,'highlight:with_frame:in_view:',false,nil,control_view);
});
