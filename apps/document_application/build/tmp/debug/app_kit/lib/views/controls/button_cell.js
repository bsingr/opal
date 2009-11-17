
VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/app_kit/lib/views/controls/button_cell_images.js');
(function(self) {
self.$c_s('BEZEL_STYLES',VN.$h(ID2SYM('rounded'), 1, ID2SYM('regular_square'), 2, ID2SYM('thick_square'), 3, ID2SYM('thicker_square'), 4, ID2SYM('disclosure'), 5, ID2SYM('shadowless_square'), 6, ID2SYM('circular'), 7, ID2SYM('textured_square'), 8, ID2SYM('help_button'), 9, ID2SYM('small_square'), 10, ID2SYM('textured_rounded'), 11, ID2SYM('round_rect'), 12, ID2SYM('recessed'), 13, ID2SYM('rounded_disclosure'), 14));
(function(self) {
rb_define_method(self,'init_text_cell',function(self,_,str){
rb_supcall(arguments.callee, self,_,[str]);
self.$i_s('@transparent',false);
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('none'));
self.$i_s('@alternate_title','');
self.$i_s('@alternate_image',nil);
self.$i_s('@image_dims_when_disabled',false);
self.$i_s('@bordered',true);
self.$i_s('@bezeled',true);
self.$i_s('@alignment',ID2SYM('center'));
self.$i_s('@control_tint',ID2SYM('blue'));
self.$i_s('@control_size',ID2SYM('regular'));
self.$i_s('@key_equivalent','');
self.$i_s('@key_equivalent_modifier_mask',0);
return self.$i_s('@font',rb_funcall(self.$klass.$c_g_full('Font'),'bold_system_font_of_size',12));
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
rb_supcall(arguments.callee, self,_,[coder]);
var flags=rb_funcall(coder,'decode_int',ID2SYM('button_flags'));
var flags2=rb_funcall(coder,'decode_int',ID2SYM('button_flags2'));
self.$i_s('@title',rb_funcall(coder,'decode_object',ID2SYM('contents')));
self.$i_s('@alternate_title',rb_funcall(coder,'decode_object',ID2SYM('alternate_contents')));
self.$i_s('@transparent',RTEST(rb_funcall((rb_funcall(flags,'&',0x00008000)),'nonzero?')) ? true : false);
self.$i_s('@bordered',RTEST(rb_funcall((rb_funcall(flags,'&',0x00800000)),'nonzero?')) ? true : false);
self.$i_s('@image_dims_when_disabled',RTEST(rb_funcall((rb_funcall(flags2,'&',0x00002000)),'nonzero?')) ? false : true);
var bezel_style=rb_funcall((rb_funcall(flags2,'&',0x7)),'|',(rb_funcall((rb_funcall(flags2,'&',0x20)),'>>',2)));
return self.$i_s('@bezel_style',(function($v){
if(($e = rb_funcall(1, '===', $v),$e!==nil && $e!==false)){
return ID2SYM('rounded');
}
else if(($e = rb_funcall(11, '===', $v),$e!==nil && $e!==false)){
return ID2SYM('textured_rounded');
}
else {
return ID2SYM('textured_rounded');
}
})(bezel_style));
});
rb_define_method(self,'init_image_cell',function(self,_,img){
});
rb_define_method(self,'initialize',function(self,_){
return rb_funcall(self,'init_text_cell','ButtonCell');
});
rb_define_method(self,'control_tint=',function(self,_,control_tint){
rb_supcall(arguments.callee, self,_,[control_tint]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('switch')),rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('radio'))))){
rb_funcall(self,'_update_button_images');
}
});
rb_define_method(self,'control_size=',function(self,_,size){
rb_supcall(arguments.callee, self,_,[size]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('switch')),rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('radio'))))){
rb_funcall(self,'_update_button_images');
}
});
rb_define_method(self,'_update_button_images',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('switch')))){
self.$i_s('@image',rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('SWITCH_IMAGES'),'[]',rb_ivar_get(self,'@control_tint')),'[]',rb_ivar_get(self,'@control_size')),'[]',ID2SYM('normal')));
self.$i_s('@alternate_image',rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('SWITCH_IMAGES'),'[]',rb_ivar_get(self,'@control_tint')),'[]',rb_ivar_get(self,'@control_size')),'[]',ID2SYM('alternate')));
}
else if(RTEST(rb_funcall(rb_ivar_get(self,'@type'),'==',ID2SYM('radio')))){
}
});
rb_define_method(self,'title',function(self,_){
return RTEST(rb_funcall(rb_ivar_get(self,'@title'),'is_a?',self.$klass.$c_g_full('AttributedString'))) ? rb_funcall(rb_ivar_get(self,'@title'),'string') : rb_ivar_get(self,'@title');
});
rb_define_method(self,'title=',function(self,_,str){
return self.$i_s('@title',str);
});
rb_define_method(self,'alternate_title',function(self,_){
return rb_ivar_get(self,'@alternate_title');
});
rb_define_method(self,'alternate_title=',function(self,_,str){
return self.$i_s('@alternate_title',str);
});
rb_define_method(self,'alternate_image',function(self,_){
return rb_ivar_get(self,'@alternate_image');
});
rb_define_method(self,'alternate_image=',function(self,_,img){
return self.$i_s('@alternate_image',img);
});
rb_define_method(self,'image_position',function(self,_){
return rb_ivar_get(self,'@image_position');
});
rb_define_method(self,'image_position=',function(self,_,position){
return self.$i_s('@image_position',position);
});
rb_define_method(self,'image_scaling',function(self,_){
return rb_ivar_get(self,'@image_scaling');
});
rb_define_method(self,'image_scaling=',function(self,_,image_scaling){
return self.$i_s('@image_scaling',image_scaling);
});
rb_define_method(self,'state=',function(self,_,val){
return self.$i_s('@state',val);
});
rb_define_method(self,'state',function(self,_){
return rb_ivar_get(self,'@state');
});
rb_define_method(self,'on?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('on'));
});
rb_define_method(self,'off?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('off'));
});
rb_define_method(self,'mixed?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@state'),'==',ID2SYM('mixed'));
});
rb_define_method(self,'highlights_by',function(self,_){
return rb_ivar_get(self,'@highlights_by');
});
rb_define_method(self,'highlights_by=',function(self,_,a_type){
return self.$i_s('@highlights_by',a_type);
});
rb_define_method(self,'shows_state_by=',function(self,_,a_type){
return self.$i_s('@shows_state_by',a_type);
});
rb_define_method(self,'shows_state_by',function(self,_){
return rb_ivar_get(self,'@shows_state_by');
});
rb_define_method(self,'type=',function(self,_,a_type){
self.$i_s('@type',a_type);
return (function($v){
if(($e = rb_funcall(ID2SYM('momentary_light'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('change_background'));
self.$i_s('@shows_state_by',ID2SYM('none'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('push_on_push_off'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('change_background'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('toggle'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('contents'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('switch'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('contents'));
self.$i_s('@shows_state_by',ID2SYM('contents'));
self.$i_s('@image_dims_when_disabled',true);
self.$i_s('@image_position',ID2SYM('left'));
rb_funcall(self,'_update_button_images');
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment',ID2SYM('left'));
}
else if(($e = rb_funcall(ID2SYM('radio'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('contents'));
self.$i_s('@shows_state_by',ID2SYM('contents'));
self.$i_s('@image_dims_when_disabled',true);
self.$i_s('@image_position',ID2SYM('left'));
rb_funcall(self,'_update_button_images');
self.$i_s('@bordered',false);
self.$i_s('@bezeled',false);
return self.$i_s('@alignment',ID2SYM('left'));
}
else if(($e = rb_funcall(ID2SYM('momentary_change'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('contents'));
self.$i_s('@shows_state_by',ID2SYM('none'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('on_off'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('change_background'));
self.$i_s('@shows_state_by',ID2SYM('change_background'));
return self.$i_s('@image_dims_when_disabled',true);
}
else if(($e = rb_funcall(ID2SYM('momentary_push_in'), '===', $v),$e!==nil && $e!==false)){
self.$i_s('@highlights_by',ID2SYM('push_in'));
self.$i_s('@shows_state_by',ID2SYM('none'));
return self.$i_s('@image_dims_when_disabled',true);
}
})(a_type);
});
rb_define_method(self,'type',function(self,_){
return rb_ivar_get(self,'@type');
});
rb_define_method(self,'opaque?',function(self,_){
return rb_ivar_get(self,'@opaue');
});
rb_define_method(self,'font=',function(self,_,font_obj){
return self.$i_s('@font',font_obj);
});
rb_define_method(self,'transparent?',function(self,_){
return rb_ivar_get(self,'@transparent');
});
rb_define_method(self,'transparent=',function(self,_,flag){
return self.$i_s('@transparent',flag);
});
self.$def('set_periodic_delay:interval:',function(self,_,delay,interval){
});
self.$def('get_periodic_delay:interval:',function(self,_,delay,interval){
});
rb_define_method(self,'key_equivalent',function(self,_){
return rb_ivar_get(self,'@key_equivalent');
});
rb_define_method(self,'key_equivalent=',function(self,_,equiv){
return self.$i_s('@key_equivalent',equiv);
});
rb_define_method(self,'key_equivalent_modifier_mask=',function(self,_,mask){
return self.$i_s('@key_equivalent_modifier_mask',mask);
});
rb_define_method(self,'key_equivalent_modifier_mask',function(self,_){
return rb_ivar_get(self,'@key_equivalent_modifier_mask');
});
rb_define_method(self,'key_equivalent_font=',function(self,_,font){
return self.$i_s('@key_equivalent_font',font);
});
rb_define_method(self,'key_equivalent_font',function(self,_){
return rb_ivar_get(self,'@key_equivalent_font');
});
self.$def('set_key_equivalent_font:size:',function(self,_,font_name,size){
});
rb_define_method(self,'perform_click',function(self,_,sender){
});
rb_define_method(self,'object_value=',function(self,_,obj){
if(RTEST(ORTEST(NOTTEST(obj),ORTEST(rb_funcall(obj,'==',0),rb_funcall(obj,'==',ID2SYM('off')))))){
obj=ID2SYM('off');
}
else{
obj=ID2SYM('on');
}
return rb_supcall(arguments.callee, self,_,[obj]);
});
self.$def('draw_with_frame:in_view:',function(self,_,cell_frame,control_view){
self.$i_s('@control_view',control_view);
if(RTEST(rb_funcall(self,'transparent?'))){
return ;
}
rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port').clearRect(0, 0, rb_funcall(cell_frame,'width'), rb_funcall(cell_frame,'height'));rb_funcall(self,'draw_bezel_with_frame:in_view:',cell_frame,control_view);
return rb_funcall(self,'draw_interior_with_frame:in_view:',cell_frame,control_view);
});
self.$def('draw_interior_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
if(!RTEST(rb_funcall(rb_ivar_get(self,'@image_position'),'==',ID2SYM('image_only')))){
rb_funcall(self,'draw_title:with_frame:in_view:',rb_funcall(self,'attributed_title'),cell_frame,control_view);
}
if(RTEST(rb_ivar_get(self,'@image'))){
(function($v){
if(($e = rb_funcall(ID2SYM('contents'), '===', $v),$e!==nil && $e!==false)){
if(RTEST(rb_funcall(self,'on?'))){
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@alternate_image'),cell_frame,control_view);
}
else{
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@image'),cell_frame,control_view);
}
}
else {
if(RTEST(rb_ivar_get(self,'@highlighted'))){
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@alternate_image'),cell_frame,control_view);
}
else{
rb_funcall(self,'draw_image:with_frame:in_view:',rb_ivar_get(self,'@image'),cell_frame,control_view);
}
}
})(rb_ivar_get(self,'@highlights_by'));
}
});
self.$def('draw_image:with_frame:in_view:',function(self,_,image,frame,control_view){
var enabled=RTEST(rb_ivar_get(self,'@enabled')) ? true : NOTTEST(rb_ivar_get(self,'@image_dims_when_disabled'));
var gray_mask=rb_ivar_get(self,'@highlighted');
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
return rb_funcall(image,'draw_in_rect:enabled:gray_mask:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(image,'size'),'width'),rb_funcall(rb_funcall(image,'size'),'height')),enabled,gray_mask);
});
self.$def('draw_title:with_frame:in_view:',function(self,_,title,frame,control_view){
return rb_funcall(title,'draw_in_rect',rb_funcall(self,'title_rect_for_bounds',frame));
});
self.$def('draw_bezel_with_frame:in_view:',function(self,_,frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
if(RTEST(rb_funcall(self,'bordered?'))){
var bezel_img=rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'[]',ID2SYM('regular')),'[]',RTEST(rb_ivar_get(self,'@enabled')) ? (RTEST(rb_ivar_get(self,'@highlighted')) ? ID2SYM('highlighted') : ID2SYM('normal')) : ID2SYM('disabled'));
rb_funcall(bezel_img,'draw_with_frame',frame);
}
});
self.$def('render_image:with_frame:in_view:',function(self,_,image,frame,control_view){
if(RTEST(rb_funcall(image,'is_a?',self.$klass.$c_g_full('ThreeStateImage')))){
rb_funcall(image,'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(image,'size'),'width'),rb_funcall(rb_funcall(image,'size'),'height')),(RTEST(rb_ivar_get(self,'@enabled')) ? (RTEST(rb_ivar_get(self,'@highlighted')) ? ID2SYM('highlighted') : ID2SYM('normal')) : ID2SYM('disabled')));
}
else{
rb_funcall(image,'render_with_frame',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_funcall(image,'size'),'width'),rb_funcall(rb_funcall(image,'size'),'height')));
}
});
rb_define_method(self,'title_rect_for_bounds',function(self,_,the_rect){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(the_rect,'x'),rb_funcall(the_rect,'y'),rb_funcall(the_rect,'width'),rb_funcall(the_rect,'height'));
var image_size=RTEST(rb_ivar_get(self,'@image')) ? rb_funcall(rb_ivar_get(self,'@image'),'size') : rb_funcall(self.$klass.$c_g_full('Size'),'new',0,0);
if(RTEST(rb_ivar_get(self,'@bordered'))){
rb_funcall(result,'width=',rb_funcall(rb_funcall(result,'width'),'-',4));
rb_funcall(result,'height=',rb_funcall(rb_funcall(result,'height'),'-',4));
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',2));
rb_funcall(result,'y=',rb_funcall(rb_funcall(result,'y'),'+',2));
}
(function($v){
if(($e = rb_funcall(ID2SYM('left'), '===', $v),$e!==nil && $e!==false)){
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',(rb_funcall(rb_funcall(image_size,'width'),'+',3))));
return rb_funcall(result,'width=',rb_funcall(rb_funcall(result,'width'),'-',(rb_funcall(rb_funcall(image_size,'width'),'+',3))));
}
else if(($e = rb_funcall(ID2SYM('right'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('below'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('above'), '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(ID2SYM('overlaps'), '===', $v),$e!==nil && $e!==false)){
}
})(rb_ivar_get(self,'@image_position'));
return result;
});
self.$def('render_title:with_frame:in_view:',function(self,_,title,frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(title,'render_in_rect',rb_funcall(self,'title_rect_for_bounds',frame));
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
self.$i_s('@control_view',control_view);
if(RTEST(rb_funcall(self,'transparent?'))){
return ;
}
return rb_funcall(rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context'),'build',function(){
rb_funcall(self,'render_bezel_with_frame:in_view:',cell_frame,control_view);
return rb_funcall(self,'render_interior_with_frame:in_view:',cell_frame,control_view);
});
});
self.$def('render_bezel_with_frame:in_view:',function(self,_,cell_frame,control_view){
if(RTEST(rb_ivar_get(self,'@bordered'))){
rb_funcall(rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context'),'append',ID2SYM('div'),function(bezel){
rb_funcall(bezel,'css',VN.$h(ID2SYM('top'),'0px',ID2SYM('left'),'0px',ID2SYM('right'),'0px',ID2SYM('bottom'),'0px'));
var bezel_img=rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'[]',ID2SYM('regular')),'[]',RTEST(rb_ivar_get(self,'@enabled')) ? (RTEST(rb_ivar_get(self,'@highlighted')) ? ID2SYM('highlighted') : ID2SYM('normal')) : ID2SYM('disabled'));
return rb_funcall(bezel_img,'render_with_frame',cell_frame);
});
}
});
self.$def('render_interior_with_frame:in_view:',function(self,_,cell_frame,control_view){
if(!RTEST(rb_funcall(rb_ivar_get(self,'@image_position'),'==',ID2SYM('image_only')))){
rb_funcall(self,'render_title:with_frame:in_view:',rb_funcall(self,'attributed_title'),cell_frame,control_view);
}
if(RTEST(rb_ivar_get(self,'@image'))){
if(RTEST(rb_funcall(self,'on?'))){
rb_funcall(self,'render_image:with_frame:in_view:',rb_ivar_get(self,'@alternate_image'),cell_frame,control_view);
}
else{
rb_funcall(self,'render_image:with_frame:in_view:',rb_ivar_get(self,'@image'),cell_frame,control_view);
}
}
});
rb_define_method(self,'mouse_entered',function(self,_,the_event){
});
rb_define_method(self,'mouse_exited',function(self,_,the_event){
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'attributed_title',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@title'),'is_a?',self.$klass.$c_g_full('AttributedString')))){
return rb_ivar_get(self,'@title');
}
var attributes=VN.$h();
if(RTEST(rb_ivar_get(self,'@font'))){
rb_funcall(attributes,'[]=',ID2SYM('font'),rb_ivar_get(self,'@font'));
}
rb_funcall(attributes,'[]=',ID2SYM('color'),(RTEST(rb_ivar_get(self,'@enabled')) ? rb_funcall(self.$klass.$c_g_full('Color'),'control_text_color') : rb_funcall(self.$klass.$c_g_full('Color'),'disabled_control_text_color')));
var paragraph_style=rb_funcall(self.$klass.$c_g_full('ParagraphStyle'),'default_paragraph_style');
rb_funcall(paragraph_style,'alignment=',rb_ivar_get(self,'@alignment'));
rb_funcall(attributes,'[]=',ID2SYM('paragraph_style'),paragraph_style);
return rb_funcall(self.$klass.$c_g_full('AttributedString'),'new',rb_ivar_get(self,'@title'),attributes);
});
rb_define_method(self,'attributed_title=',function(self,_,obj){
return self.$i_s('@title',obj);
});
rb_define_method(self,'attributed_alternate_title',function(self,_){
return rb_ivar_get(self,'@attributed_alternate_title');
});
rb_define_method(self,'attributed_alternate_title=',function(self,_,obj){
return self.$i_s('@attributed_alternate_title',obj);
});
rb_define_method(self,'bezel_style=',function(self,_,bezel_style){
return self.$i_s('@bezel_style',bezel_style);
});
rb_define_method(self,'bezel_style',function(self,_){
return rb_ivar_get(self,'@bezel_style');
});
rb_define_method(self,'sound=',function(self,_,a_sound){
return rb_ivar_get(self,'@sound');
});
rb_define_method(self,'sound',function(self,_){
return rb_ivar_get(self,'@sound');
});
})(rb_define_class_under(self,'ButtonCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));
