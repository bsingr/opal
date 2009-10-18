var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ButtonCell',$VN_2.$c_g_full('Cell'));
$VN_2.$def('title',function(self,_cmd){
return self.$i_g('@title');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
self.$i_s('@title',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('alternate_title',function(self,_cmd){
return self.$i_g('@alternate_title');
});
$VN_2.$def('alternate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alternate_title');
self.$i_s('@alternate_title',str);
VN$(self, 'did_change_value_for_key', 'alternate_title');
});
$VN_2.$def('alternate_image',function(self,_cmd){
return self.$i_g('@alternate_image');
});
$VN_2.$def('alternate_image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'alternate_image');
self.$i_s('@alternate_image',img);
VN$(self, 'did_change_value_for_key', 'alternate_image');
});
$VN_2.$def('image_position',function(self,_cmd){
return self.$i_g('@image_position');
});
$VN_2.$def('image_position=',function(self,_cmd,pos){
VN$(self, 'will_change_value_for_key', 'image_position');
self.$i_s('@image_position',pos);
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('image_scaling',function(self,_cmd){
return self.$i_g('@image_scaling');
});
$VN_2.$def('image_scaling=',function(self,_cmd,scaling){
VN$(self, 'will_change_value_for_key', 'image_scaling');
self.$i_s('@image_scaling',scaling);
VN$(self, 'did_change_value_for_key', 'image_scaling');
});
$VN_2.$def('highlights_by',function(self,_cmd){
return self.$i_g('@highlights_by');
});
$VN_2.$def('highlights_by=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'highlights_by');
self.$i_s('@highlights_by',type);
VN$(self, 'did_change_value_for_key', 'highlights_by');
});
$VN_2.$def('shows_state_by',function(self,_cmd){
return self.$i_g('@shows_state_by');
});
$VN_2.$def('shows_state_by=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'shows_state_by');
self.$i_s('@shows_state_by',type);
VN$(self, 'did_change_value_for_key', 'shows_state_by');
});
$VN_2.$def('button_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'button_type');
VN$(self, 'did_change_value_for_key', 'button_type');
});
$VN_2.$def('opaque?',function(self,_cmd){
});
$VN_2.$def('font=',function(self,_cmd,font_obj){
VN$(self, 'will_change_value_for_key', 'font');
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('transparent?',function(self,_cmd){
return self.$i_g('@transparent');
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
self.$i_s('@transparent',flag);
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,keys){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
self.$i_s('@key_equivalent',keys);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return self.$i_g('@key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
self.$i_s('@key_equivalent_modifier_mask',mask);
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('render_with_context:in_view:',function(self,_cmd,context,control_view){
});
$VN_2.$def('draw_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
VN$(self,'puts','current context is:');
var ctx = VN$(self.$klass.$c_g_full('GraphicsContext'),'current_context');
VN$(ctx,'graphics_port').fillRect(20, 20, 100, 100);VN$(ctx,'graphics_port').clearRect(40, 40, 60, 60);});
$VN_2.$def('title_rect_for_bounds',function(self,_cmd,bounds){
return VN$(self.$klass.$c_g_full('Rect'),'new',5,3,100,23);
});
$VN_2.$def('draw_image:with_frame:in_view:',function(self,_cmd,image,frame,control_view){
});
$VN_2.$def('draw_title:with_frame:in_view:',function(self,_cmd,title,frame,control_view){
});
$VN_2.$def('draw_bezel_with_frame:in_view:',function(self,_cmd,frame,control_view){
});
$VN_2.$def('mouse_entered',function(self,_cmd,event){
});
$VN_2.$def('mouse_exited',function(self,_cmd,event){
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('attributed_title',function(self,_cmd){
return self.$i_g('@attributed_title');
});
$VN_2.$def('attributed_title=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'attributed_title');
self.$i_s('@attributed_title',obj);
VN$(self, 'did_change_value_for_key', 'attributed_title');
});
$VN_2.$def('attributed_alternate_title',function(self,_cmd){
return self.$i_g('@attributed_alternate_title');
});
$VN_2.$def('attributed_alternate_title=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'attributed_alternate_title');
self.$i_s('@attributed_alternate_title',obj);
VN$(self, 'did_change_value_for_key', 'attributed_alternate_title');
});
$VN_2.$def('bezel_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',style);
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
