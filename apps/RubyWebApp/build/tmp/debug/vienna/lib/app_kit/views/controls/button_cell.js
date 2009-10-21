var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ButtonCell',$VN_2.$c_g_full('Cell'));
$VN_2.$c_s('SWITCH_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,357,16,16]));
$VN_2.$c_s('SWITCH_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,357,16,16]));
$VN_2.$c_s('ASWITCH_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite_cell_masks','controls',function(s){
VN$(s,'add_representation:size:rect:','normal','regular',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','gray_mask','regular',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','disabled','regular',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','normal','small',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','gray_mask','small',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','disabled','small',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','normal','mini',[0,357,16,16]);
VN$(s,'add_representation:size:rect:','gray_mask','mini',[0,357,16,16]);
return VN$(s,'add_representation:size:rect:','disabled','mini',[0,357,16,16]);
}));
VN$($VN_2,'puts','DONE ASWITCH_IMAGE');
VN$($VN_2,'puts',$VN_2.$c_g_full('ASWITCH_IMAGE'));
$VN_2.$c_s('ASWITCH_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite_cell_masks','controls',function(s){
VN$(s,'add_representation:size:rect:','normal','regular',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','gray_mask','regular',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','disabled','regular',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','normal','small',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','gray_mask','small',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','disabled','small',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','normal','mini',[16,357,16,16]);
VN$(s,'add_representation:size:rect:','gray_mask','mini',[16,357,16,16]);
return VN$(s,'add_representation:size:rect:','disabled','mini',[16,357,16,16]);
}));
$VN_2.$def('init_text_cell',function(self,_cmd,str){
VN$sup(arguments.callee, self,_cmd,[str]);
self.$i_s('@transparent',false);
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','none');
self.$i_s('@alternate_title','');
self.$i_s('@alternate_image',nil);
self.$i_s('@image_dims_when_disabled',false);
self.$i_s('@bordered',true);
self.$i_s('@bezeled',true);
self.$i_s('@alignment','center');
self.$i_s('@key_equivalent','');
return self.$i_s('@key_equivalent_modifier_mask',0);
});
$VN_2.$def('init_image_cell',function(self,_cmd,img){
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$(self,'init_text_cell','ButtonCell');
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-button';
});
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
$VN_2.$def('alteernate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alteernate_title');
self.$i_s('@alternate_title',str);
VN$(self, 'did_change_value_for_key', 'alteernate_title');
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
$VN_2.$def('image_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'image_position');
self.$i_s('@image_position',position);
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('image_scaling',function(self,_cmd){
return self.$i_g('@image_scaling');
});
$VN_2.$def('image_scaling=',function(self,_cmd,image_scaling){
VN$(self, 'will_change_value_for_key', 'image_scaling');
self.$i_s('@image_scaling',image_scaling);
VN$(self, 'did_change_value_for_key', 'image_scaling');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',val);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
});
$VN_2.$def('on?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','on');
});
$VN_2.$def('off?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','off');
});
$VN_2.$def('mixed?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','mixed');
});
$VN_2.$def('highlights_by',function(self,_cmd){
return self.$i_g('@highlights_by');
});
$VN_2.$def('highlights_by=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'highlights_by');
self.$i_s('@highlights_by',a_type);
VN$(self, 'did_change_value_for_key', 'highlights_by');
});
$VN_2.$def('shows_state_by=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'shows_state_by');
self.$i_s('@shows_state_by',a_type);
VN$(self, 'did_change_value_for_key', 'shows_state_by');
});
$VN_2.$def('shows_state_by',function(self,_cmd){
return self.$i_g('@shows_state_by');
});
$VN_2.$def('type=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'type');
self.$i_s('@type',a_type);
(function($v){
if(($e = VN$('momentary_light', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','change_background');
self.$i_s('@shows_state_by','none');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('push_on_push_off', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','change_background');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('toggle', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','contents');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('switch', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','contents');
self.$i_s('@shows_state_by','contents');
self.$i_s('@image_dims_when_disabled',false);
self.$i_s('@image_position','left');
self.$i_s('@image',self.$klass.$c_g_full('SWITCH_IMAGE'));
self.$i_s('@alternate_image',self.$klass.$c_g_full('SWITCH_HIGHLIGHTED_IMAGE'));
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment','left');
}
else if(($e = VN$('radio', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','contents');
self.$i_s('@shows_state_by','contents');
self.$i_s('@image_dims_when_disabled',false);
self.$i_s('@image_position','left');
self.$i_s('@image',VN$(self.$klass.$c_g_full('Image'),'image_named','vn_radio'));
self.$i_s('@alternate_image',VN$(self.$klass.$c_g_full('Image'),'image_named','vn_highlighted_radio'));
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment','left');
}
else if(($e = VN$('momentary_change', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','contents');
self.$i_s('@shows_state_by','none');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('on_off', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','change_background');
self.$i_s('@shows_state_by','change_background');
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = VN$('momentary_push_in', '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by','push_in');
self.$i_s('@shows_state_by','none');
return self.$i_s('@image_dims_when_disabled',true);
}
})(a_type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('opaque?',function(self,_cmd){
return self.$i_g('@opaue');
});
$VN_2.$def('font=',function(self,_cmd,font_obj){
VN$(self, 'will_change_value_for_key', 'font');
self.$i_s('@font',font_obj);
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
$VN_2.$def('set_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('get_periodic_delay:interval:',function(self,_cmd,delay,interval){
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,equiv){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
self.$i_s('@key_equivalent',equiv);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
self.$i_s('@key_equivalent_modifier_mask',mask);
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return self.$i_g('@key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'key_equivalent_font');
self.$i_s('@key_equivalent_font',font);
VN$(self, 'did_change_value_for_key', 'key_equivalent_font');
});
$VN_2.$def('key_equivalent_font',function(self,_cmd){
return self.$i_g('@key_equivalent_font');
});
$VN_2.$def('set_key_equivalent_font:size:',function(self,_cmd,font_name,size){
});
$VN_2.$def('perform_click',function(self,_cmd,sender){
});
$VN_2.$def('draw_image:with_frame:in_view:',function(self,_cmd,images,frame,control_view){
});
$VN_2.$def('draw_title:with_frame:in_view:',function(self,_cmd,title,frame,control_view){
});
$VN_2.$def('draw_bezel_with_frame:in_view:',function(self,_cmd,frame,control_view){
});
$VN_2.$def('render_bezel_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(RTEST(VN$(ctx,'first_time?'))){
VN$(ctx,'<<',"<div class='left'></div>");
VN$(ctx,'<<',"<div class='middle'></div>");
VN$(ctx,'<<',"<div class='right'></div>");
VN$(ctx,'<<',"<div class='title'>Wow!</div>");
VN$(ctx,'<<',"<div class='image'></div>");
VN$(ctx,'first_time=',false);
}
var class_name_array = [VN$(self, 'class_name'),VN$(self, 'theme_name')];
if(!RTEST(VN$(self, 'enabled?'))){
VN$(class_name_array,'<<','disabled');
}
if(RTEST(VN$(self, 'bordered?'))){
VN$(class_name_array,'<<','bordered');
if(RTEST(ANDTEST(VN$(self, 'highlighted?'),VN$(self.$i_g('@highlights_by'),'==','push_in')))){
VN$(class_name_array,'<<','highlighted');
}
else{
}
}
return VN$(ctx,'class_name=',VN$(class_name_array,'join',' '));
});
$VN_2.$def('render_interior_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
VN$(ctx,'selector','title',function(title){
VN$(title,'inner_html=',self.$i_g('@title'));
return VN$(title,'css',VN.$h('text_align',VN$(self, 'alignment')));
});
if(RTEST(self.$i_g('@image'))){
if(RTEST(VN$(self, 'on?'))){
VN$(self,'render_image:with_frame:in_view:',self.$i_g('@alternate_image'),cell_frame,control_view);
}
else{
VN$(self,'render_image:with_frame:in_view:',self.$i_g('@image'),cell_frame,control_view);
}
}
});
$VN_2.$def('render_image:with_frame:in_view:',function(self,_cmd,image,frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
return VN$(ctx,'selector','image',function(img){
return VN$(image,'render_in_rect',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(VN$(image,'size'),'width'),VN$(VN$(image,'size'),'height')));
});
});
$VN_2.$def('render_title:with_frame:in_view:',function(self,_cmd,title,frame,control_view){
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
self.$i_s('@control_view',control_view);
if(RTEST(VN$(self, 'transparent?'))){
return ;
}
VN$(self,'render_bezel_with_frame:in_view:',cell_frame,control_view);
return VN$(self,'render_interior_with_frame:in_view:',cell_frame,control_view);
});
$VN_2.$def('mouse_entered',function(self,_cmd,the_event){
});
$VN_2.$def('mouse_exited',function(self,_cmd,the_event){
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
$VN_2.$def('bezel_style=',function(self,_cmd,bezel_style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',bezel_style);
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
$VN_2.$def('sound=',function(self,_cmd,a_sound){
VN$(self, 'will_change_value_for_key', 'sound');
self.$i_g('@sound');
VN$(self, 'did_change_value_for_key', 'sound');
});
$VN_2.$def('sound',function(self,_cmd){
return self.$i_g('@sound');
});
