(function(self) {
(function(self) {
self.$def_s('color_with_calibrated_white:alpha:',function(self,_,white,alpha){
});
self.$def_s('color_with_calibrated_hue:saturation:brightness:alpha:',function(self,_,hue,saturation,brightness,alpha){
});
self.$def_s('color_with_calibrated_red:green:blue:alpha:',function(self,_,red,green,blue,alpha){
return rb_funcall(self,'new',red,green,blue,alpha);
});
self.$def_s('black_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,1.0);
});
self.$def_s('dark_gray_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.333,0.333,0.333,1.0);
});
self.$def_s('light_gray_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.667,0.667,0.667,1.0);
});
self.$def_s('white_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',255.0,255.0,255.0,1.0);
});
self.$def_s('gray_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.5,0.5,0.5,1.0);
});
self.$def_s('red_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,0.0,0.0,1.0);
});
self.$def_s('green_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,1.0,0.0,1.0);
});
self.$def_s('blue_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,1.0,1.0);
});
self.$def_s('cyan_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,1.0,1.0,1.0);
});
self.$def_s('yellow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,1.0,0.0,1.0);
});
self.$def_s('magenta_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,0.0,1.0,1.0);
});
self.$def_s('orange_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',1.0,0.5,0.0,1.0);
});
self.$def_s('purple_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.5,0.0,0.5,1.0);
});
self.$def_s('brown_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.6,0.4,0.2,1.0);
});
self.$def_s('clear_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
(function(self) {
self.$def_s('control_shadow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_dark_shadow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_highlight_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_light_highlight_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',79,79,79,1.0);
});
self.$def_s('control_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',119,141,168,1.0);
});
self.$def_s('secondary_selected_control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('disabled_control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',164,164,164,1.0);
});
self.$def_s('text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('text_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_text_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('grid_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('keyboard_focus_indicator_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('window_background_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('scroll_bar_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('knob_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_knob_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('window_frame_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('window_frame_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_menu_item_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('selected_menu_item_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('highlight_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('shadow_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('header_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('header_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('alternate_selected_control_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('alternarte_selected_control_text_color',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('control_alternating_row_background_colors',function(self,_){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',234.0,234.0,234.0,0.0);
});
self.$def_s('color_for_control_tint',function(self,_,control_tint){
return rb_funcall(self,'color_with_calibrated_red:green:blue:alpha:',0.0,0.0,0.0,0.0);
});
self.$def_s('current_control_tint',function(self,_){
});
})(self.$c_g_full('Color'));
rb_define_method(self,'initialize',function(self,_,r,g,b,a){
self.$i_s('@red',r);
self.$i_s('@green',g);
self.$i_s('@blue',b);
return self.$i_s('@alpha',a);
});
rb_define_method(self,'highlight_with_level',function(self,_,val){
});
rb_define_method(self,'shadow_with_level',function(self,_,val){
});
rb_define_method(self,'rgb_string',function(self,_){
return ["rgb(",(rb_ivar_get(self,'@red')),",",(rb_ivar_get(self,'@green')),",",(rb_ivar_get(self,'@blue')),")"].join('');
});
rb_define_method(self,'rgba_string',function(self,_){
return ["rgb(",(rb_ivar_get(self,'@red')),",",(rb_ivar_get(self,'@green')),",",(rb_ivar_get(self,'@blue')),",",(rb_ivar_get(self,'@alpha')),")"].join('');
});
rb_define_method(self,'set',function(self,_){
rb_funcall(self,'set_fill');
return rb_funcall(self,'set_stroke');
});
rb_define_method(self,'set_fill',function(self,_){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
return rb_funcall(self,'CGContextSetFillColor',ctx,self);
});
rb_define_method(self,'set_stroke',function(self,_){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
return rb_funcall(self,'CGContextSetStrokeColor',ctx,self);
});
})(rb_define_class_under(self,'Color',cObject));
})(rb_define_module('Vienna'));
