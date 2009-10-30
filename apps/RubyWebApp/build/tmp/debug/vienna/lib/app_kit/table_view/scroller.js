var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Scroller',$VN_2.$c_g_full('Control'));
$VN_2.$def_s('scroller_width',function(self,_cmd){
return 15;
});
$VN_2.$def_s('scroller_width_for_control_size',function(self,_cmd,control_size){
return 15;
});
$VN_2.$def('class_name',function(self,_cmd){
return VN$(VN$(self.$i_g('@frame'),'width'),'<',VN$(self.$i_g('@frame'),'height')) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
$VN_2.$def('render',function(self,_cmd,context){
return VN$(context,'css',VN.$h('background_color','rgb(220,220,220)'));
});
$VN_2.$def('draw_parts',function(self,_cmd){
});
$VN_2.$def('rect_for_part',function(self,_cmd,part){
});
$VN_2.$def('check_space_for_parts',function(self,_cmd){
});
$VN_2.$def('usable_parts',function(self,_cmd){
});
$VN_2.$def('arrows_position=',function(self,_cmd,position){
return self.$i_s('@arrows_position',position);
});
$VN_2.$def('arrows_position',function(self,_cmd){
return self.$i_g('@arrows_position');
});
$VN_2.$def('control_tint=',function(self,_cmd,control_tint){
return self.$i_s('@control_tint',control_tint);
});
$VN_2.$def('control_tint',function(self,_cmd){
return self.$i_g('@control_tint');
});
$VN_2.$def('control_size=',function(self,_cmd,control_size){
return self.$i_s('@control_size',control_size);
});
$VN_2.$def('control_size',function(self,_cmd){
return self.$i_g('@control_size');
});
$VN_2.$def('draw_arrow:highlight:',function(self,_cmd,which_arrow,flag){
});
$VN_2.$def('draw_knob',function(self,_cmd){
});
$VN_2.$def('draw_knob_slot_in_rect:highlight:',function(self,_cmd,slot_rect,flag){
});
$VN_2.$def('highlight',function(self,_cmd,flag){
});
$VN_2.$def('test_part',function(self,_cmd,the_point){
});
$VN_2.$def('track_knob',function(self,_cmd,the_event){
});
$VN_2.$def('track_scroll_buttons',function(self,_cmd,the_event){
});
$VN_2.$def('hit_part',function(self,_cmd){
});
$VN_2.$def('knob_proportion',function(self,_cmd){
return self.$i_g('@knob_proportion');
});
$VN_2.$def('knob_proportion=',function(self,_cmd,proportion){
return self.$i_s('@knob_proportion',proportion);
});
