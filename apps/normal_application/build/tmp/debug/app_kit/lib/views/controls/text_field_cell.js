(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(ID2SYM('none'), rb_funcall((1),'-@'), ID2SYM('square'), 0, ID2SYM('rounded'), 1));
(function(self) {
self.$c_s('BEZEL_IMAGES',VN.$h(ID2SYM('square'), rb_funcall(self.$c_g_full('NinePartImage'),'new',rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_0'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_1'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_2'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_3'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_4'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_5'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_6'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_7'),rb_funcall(self.$c_g_full('Image'),'image_named','text_field_square_bezel_8')), ID2SYM('rounded'), rb_funcall(self.$c_g_full('ThreePartImage'),'new')));
rb_define_method(self,'init_text_cell',function(self,_,str){
rb_supcall(arguments.callee, self,_,[str]);
self.$i_s('@editable',true);
self.$i_s('@selectable',true);
self.$i_s('@bezeled',true);
self.$i_s('@bezel_style',ID2SYM('square'));
self.$i_s('@font',rb_funcall(self.$klass.$c_g_full('Font'),'control_content_font_of_size',12));
self.$i_s('@input_element',nil);
self.$i_s('@value',"Hey there!");
return self;
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-text-field';
});
self.$def('draw_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
(function($v){
if(($e = rb_funcall(ID2SYM('none'), '===', $v),$e!==nil && $e!==false)){
}
else {
return rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'draw_with_frame',cell_frame);
}
})(rb_ivar_get(self,'@bezel_style'));
if(RTEST(rb_funcall(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
}
else{
rb_funcall(rb_funcall(self,'attributed_value'),'draw_in_rect',cell_frame);
}
});
self.$def('render_with_frame:in_view:',function(self,_,cell_frame,control_view){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
self.$i_s('@control_view',control_view);
if(RTEST(rb_funcall(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
if(!RTEST(rb_ivar_get(self,'@input_element'))){
self.$i_s('@input_element',rb_funcall(self.$klass.$c_g_full('Element'),'new',ID2SYM('input')));
rb_funcall(rb_ivar_get(self,'@input_element'),'set_attribute',ID2SYM('type'),'text');
rb_funcall(rb_ivar_get(self,'@input_element'),'css',VN.$h(ID2SYM('z_index'),1000,ID2SYM('position'),'absolute',ID2SYM('outline'),'none',ID2SYM('border'),0,ID2SYM('background'),'none'));
rb_funcall(rb_ivar_get(self,'@input_element'),'frame=',cell_frame);
rb_funcall(rb_ivar_get(self,'@input_element'),'element').value = "wtf!!!!!";rb_funcall(rb_funcall(control_view,'element'),'<<',rb_ivar_get(self,'@input_element'));
}
}
return rb_funcall(ctx,'build',function(){
(function($v){
if(($e = rb_funcall(ID2SYM('none'), '===', $v),$e!==nil && $e!==false)){
}
else {
return rb_funcall(rb_funcall(self.$klass.$c_g_full('BEZEL_IMAGES'),'[]',rb_ivar_get(self,'@bezel_style')),'render_with_frame',cell_frame);
}
})(rb_ivar_get(self,'@bezel_style'));
if(!RTEST(rb_ivar_get(self,'@input_element'))){
rb_funcall(rb_funcall(self,'attributed_value'),'render_in_rect',rb_funcall(self.$klass.$c_g_full('Rect'),'new',2,2,rb_funcall(cell_frame,'width'),rb_funcall(cell_frame,'height')));
}
});
});
rb_define_method(self,'attributed_value',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@value'),'is_a?',self.$klass.$c_g_full('AttributedString')))){
return rb_ivar_get(self,'@value');
}
var attributes=VN.$h();
if(RTEST(rb_ivar_get(self,'@font'))){
rb_funcall(attributes,'[]=',ID2SYM('font'),rb_ivar_get(self,'@font'));
}
rb_funcall(attributes,'[]=',ID2SYM('color'),(RTEST(rb_ivar_get(self,'@enabled')) ? rb_funcall(self.$klass.$c_g_full('Color'),'text_color') : rb_funcall(self.$klass.$c_g_full('Color'),'disabled_control_text_color')));
var paragraph_style=rb_funcall(self.$klass.$c_g_full('ParagraphStyle'),'default_paragraph_style');
rb_funcall(paragraph_style,'alignment=',rb_ivar_get(self,'@alignment'));
rb_funcall(attributes,'[]=',ID2SYM('paragraph_style'),paragraph_style);
return rb_funcall(self.$klass.$c_g_full('AttributedString'),'new',rb_ivar_get(self,'@value'),attributes);
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background?',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'text_color=',function(self,_,color){
return self.$i_s('@text_color',color);
});
rb_define_method(self,'text_color',function(self,_){
return rb_ivar_get(self,'@text_color');
});
rb_define_method(self,'set_up_field_editor_attributes',function(self,_,text_obj){
return text_obj;
});
rb_define_method(self,'bezel_style=',function(self,_,style){
return self.$i_s('@bezel_style',style);
});
rb_define_method(self,'bezel_style',function(self,_){
return rb_ivar_get(self,'@bezel_style');
});
rb_define_method(self,'placeholder_string=',function(self,_,string){
return self.$i_s('@placeholder_string',string);
});
rb_define_method(self,'placeholder_string',function(self,_){
return rb_ivar_get(self,'@placeholder_string');
});
rb_define_method(self,'placeholder_attributed_string=',function(self,_,str){
return rb_ivar_get(self,'@placeholder_attributed_string');
});
rb_define_method(self,'placeholder_attributed_string',function(self,_){
return rb_ivar_get(self,'@placeholder_attributed_string');
});
})(rb_define_class_under(self,'TextFieldCell',self.$c_g_full('Cell')));
})(rb_define_module('Vienna'));
