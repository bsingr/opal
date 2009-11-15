(function(self) {
self.$c_s('SCROLLER_PARTS',VN.$h(ID2SYM('none'), 0, ID2SYM('increment_line'), 1, ID2SYM('decrement_line'), 2, ID2SYM('increment_page'), 3, ID2SYM('decrement_page'), 4, ID2SYM('knob'), 5, ID2SYM('knob_slot'), 6));
self.$c_s('SCROLLER_ARROWS',VN.$h(ID2SYM('increment_arrow'), 0, ID2SYM('decrement_arrow'), 1));
self.$c_s('SCROLL_ARROW_POSITIONS',VN.$h(ID2SYM('none'), 1, ID2SYM('min_end'), 2, ID2SYM('max_end'), 3));
self.$c_s('USABLE_SCROLLER_PARTS',VN.$h(ID2SYM('none'), 0, ID2SYM('all'), 1, ID2SYM('only_arrows'), 2));
(function(self) {
self.$c_s('V_KNOB_IMAGE',rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_knob_top'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_knob_middle'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_knob_bottom'),true));
self.$c_s('H_KNOB_IMAGE',rb_funcall(self.$c_g_full('ThreePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_knob_left'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_knob_middle'),rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_knob_right')));
self.$c_s('LEFT_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_left_arrow')));
self.$c_s('RIGHT_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_right_arrow')));
self.$c_s('H_TRACK',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_horizontal_track')));
self.$c_s('V_TRACK',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_vertical_track')));
self.$c_s('TOP_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_top_arrow')));
self.$c_s('BOTTOM_ARROW',VN.$h(ID2SYM('normal'), rb_funcall(self.$c_g_full('Image'),'image_named','scroller_bottom_arrow')));
self.$def_s('scroller_width',function(self,_){
return 17;
});
self.$def_s('scroller_width_for_control_size',function(self,_,control_size){
return 17;
});
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@value',0.0);
return self.$i_s('@knob_proportion',1);
});
rb_define_method(self,'class_name',function(self,_){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'width'),'<',rb_funcall(rb_ivar_get(self,'@frame'),'height'))) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'build',function(){
if(RTEST(rb_funcall(self,'vertical?'))){
rb_funcall(rb_funcall(self.$klass.$c_g_full('V_TRACK'),'[]',ID2SYM('normal')),'render_with_frame',rb_ivar_get(self,'@bounds'));
rb_funcall(rb_funcall(self.$klass.$c_g_full('TOP_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,17,28));
rb_funcall(rb_funcall(self.$klass.$c_g_full('BOTTOM_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',28),17,28));
}
else{
rb_funcall(rb_funcall(self.$klass.$c_g_full('H_TRACK'),'[]',ID2SYM('normal')),'render_with_frame',rb_ivar_get(self,'@bounds'));
rb_funcall(rb_funcall(self.$klass.$c_g_full('LEFT_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,28,17));
rb_funcall(rb_funcall(self.$klass.$c_g_full('RIGHT_ARROW'),'[]',ID2SYM('normal')),'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',28),0,28,17));
}
return rb_funcall(context,'append',ID2SYM('div'),function(knob){
var knob_rect=rb_funcall(self,'rect_for_part',ID2SYM('knob'));
rb_funcall(knob,'frame=',knob_rect);
var knob_bounds=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(knob_rect,'width'),rb_funcall(knob_rect,'height'));
if(RTEST(rb_funcall(self,'vertical?'))){
rb_funcall(self.$klass.$c_g_full('V_KNOB_IMAGE'),'render_with_frame',knob_bounds);
}
else{
rb_funcall(self.$klass.$c_g_full('H_KNOB_IMAGE'),'render_with_frame',knob_bounds);
}
});
});
});
rb_define_method(self,'draw_parts',function(self,_){
});
self.$c_s('DECREMENT_LINE_SIZE',22);
rb_define_method(self,'rect_for_part',function(self,_,part){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
var increment_line=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
var decrement_line=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
var knob=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
var knob_slot=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
if(RTEST(rb_funcall(self,'vertical?'))){
rb_funcall(decrement_line,'height=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'height=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')));
rb_funcall(knob_slot,'height=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')))));
rb_funcall(knob_slot,'y=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(knob,'height=',rb_funcall(rb_funcall(knob_slot,'height'),'*',rb_ivar_get(self,'@knob_proportion')));
rb_funcall(knob,'y=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,'height'),'-',rb_funcall(knob,'height'))),'*',rb_ivar_get(self,'@value'))),'+',rb_funcall(knob_slot,'y')));
}
else{
rb_funcall(decrement_line,'width=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'width=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')));
rb_funcall(knob_slot,'width=',rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',(rb_funcall((2),'*',self.$klass.$c_g_full('DECREMENT_LINE_SIZE')))));
rb_funcall(knob_slot,'x=',self.$klass.$c_g_full('DECREMENT_LINE_SIZE'));
rb_funcall(knob,'width=',rb_funcall(rb_funcall(knob_slot,'width'),'*',rb_ivar_get(self,'@knob_proportion')));
rb_funcall(knob,'x=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,'width'),'-',rb_funcall(knob,'width'))),'*',rb_ivar_get(self,'@value'))),'+',rb_funcall(knob_slot,'x')));
}
return (function($v){
if(($e = rb_funcall(ID2SYM('none'), '===', $v),$e!==nil && $e!==false)){
return result;
}
else if(($e = rb_funcall(ID2SYM('increment_line'), '===', $v),$e!==nil && $e!==false)){
if(RTEST(rb_funcall(self,'vertical?'))){
}
else{
}
}
else if(($e = rb_funcall(ID2SYM('decrement_line'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('increment_page'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('decrement_page'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('knob'), '===', $v),$e!==nil && $e!==false)){
return knob;
}
else if(($e = rb_funcall(ID2SYM('knob_slot'), '===', $v),$e!==nil && $e!==false)){
return knob_slot;
}
})(part);
});
rb_define_method(self,'check_space_for_parts',function(self,_){
});
rb_define_method(self,'usable_parts',function(self,_){
});
rb_define_method(self,'arrows_position=',function(self,_,position){
return self.$i_s('@arrows_position',position);
});
rb_define_method(self,'arrows_position',function(self,_){
return rb_ivar_get(self,'@arrows_position');
});
rb_define_method(self,'control_tint=',function(self,_,control_tint){
return self.$i_s('@control_tint',control_tint);
});
rb_define_method(self,'control_tint',function(self,_){
return rb_ivar_get(self,'@control_tint');
});
rb_define_method(self,'control_size=',function(self,_,control_size){
return self.$i_s('@control_size',control_size);
});
rb_define_method(self,'control_size',function(self,_){
return rb_ivar_get(self,'@control_size');
});
self.$def('draw_arrow:highlight:',function(self,_,which_arrow,flag){
});
rb_define_method(self,'draw_knob',function(self,_){
});
self.$def('draw_knob_slot_in_rect:highlight:',function(self,_,slot_rect,flag){
});
rb_define_method(self,'highlight',function(self,_,flag){
});
rb_define_method(self,'test_part',function(self,_,the_point){
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
if(!RTEST(rb_funcall(self,'enabled?'))){
return ;
}
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
return rb_funcall(self,'track_knob',the_event);
});
rb_define_method(self,'track_knob',function(self,_,the_event){
var original_value=rb_ivar_get(self,'@value');
var mouse_down_point=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
var slot_rect=rb_funcall(self,'rect_for_part',ID2SYM('knob_slot'));
var knob_rect=rb_funcall(self,'rect_for_part',ID2SYM('knob'));
var size=RTEST(rb_funcall(self,'vertical?')) ? rb_funcall(rb_funcall(slot_rect,'height'),'-',rb_funcall(knob_rect,'height')) : rb_funcall(rb_funcall(slot_rect,'width'),'-',rb_funcall(knob_rect,'width'));
return rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
var delta=RTEST(rb_funcall(self,'vertical?')) ? rb_funcall(rb_funcall(location,'y'),'-',rb_funcall(mouse_down_point,'y')) : rb_funcall(rb_funcall(location,'x'),'-',rb_funcall(mouse_down_point,'x'));
rb_funcall(self,'float_value=',rb_funcall(self.$klass.$c_g_full('Math'),'min',rb_funcall(self.$klass.$c_g_full('Math'),'max',0,rb_funcall(original_value,'+',(rb_funcall(delta,'/',size)))),1));
rb_funcall(self,'needs_display=',true);
rb_funcall(self,'send_action:to:',rb_ivar_get(self,'@action'),rb_ivar_get(self,'@target'));
}
});
});
rb_define_method(self,'track_scroll_buttons',function(self,_,the_event){
});
rb_define_method(self,'hit_part',function(self,_){
});
rb_define_method(self,'knob_proportion',function(self,_){
return rb_ivar_get(self,'@knob_proportion');
});
rb_define_method(self,'knob_proportion=',function(self,_,proportion){
self.$i_s('@knob_proportion',proportion);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'float_value=',function(self,_,a_float){
return self.$i_s('@value',a_float);
});
rb_define_method(self,'float_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'double_value',function(self,_){
return rb_ivar_get(self,'@value');
});
rb_define_method(self,'double_value=',function(self,_,a_double){
return self.$i_s('@value',a_double);
});
rb_define_method(self,'action=',function(self,_,an_action){
return self.$i_s('@action',an_action);
});
rb_define_method(self,'target=',function(self,_,a_target){
return self.$i_s('@target',a_target);
});
rb_define_method(self,'vertical?',function(self,_){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@frame'),'width'),'<',rb_funcall(rb_ivar_get(self,'@frame'),'height'))) ? true : false;
});
})(rb_define_class_under(self,'Scroller',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));
