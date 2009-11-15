(function(self) {
self.$c_s('TEXT_TAB_TYPES',VN.$h(ID2SYM('left'), 0, ID2SYM('right'), 1, ID2SYM('center'), 2, ID2SYM('decimal'), 3));
self.$c_s('LINE_BREAK_MODES',VN.$h(ID2SYM('word_wrapping'), 0, ID2SYM('char_wrapping'), 1, ID2SYM('clipping'), 2, ID2SYM('truncating_head'), 3, ID2SYM('truncating_tail'), 4, ID2SYM('truncating_middle'), 5));
(function(self) {
self.$c_g_full('ParagraphStyle').$def_s('default_paragraph_style',function(self,_){
var obj=rb_funcall(self,'alloc');
rb_funcall(obj,'init_default_style');
return obj;
});
rb_define_method(self,'init_default_style',function(self,_){
self.$i_s('@alignment',ID2SYM('left'));
return self;
});
rb_define_method(self,'line_spacing',function(self,_){
return rb_ivar_get(self,'@line_spacing');
});
rb_define_method(self,'line_spacing=',function(self,_,a_float){
return self.$i_s('@line_spacing',a_float);
});
rb_define_method(self,'paragraph_spacing',function(self,_){
return rb_ivar_get(self,'@paragraph_spacing');
});
rb_define_method(self,'paragraph_spacing=',function(self,_,a_float){
return self.$i_s('@paragraph_spacing',a_float);
});
rb_define_method(self,'alignment',function(self,_){
return rb_ivar_get(self,'@alignment');
});
rb_define_method(self,'alignment=',function(self,_,an_alignment){
return self.$i_s('@alignment',an_alignment);
});
rb_define_method(self,'head_indent',function(self,_){
return rb_ivar_get(self,'@head_indent');
});
rb_define_method(self,'head_indent=',function(self,_,a_float){
return self.$i_s('@head_indent',a_float);
});
rb_define_method(self,'tail_indent',function(self,_){
return rb_ivar_get(self,'@tail_indent');
});
rb_define_method(self,'tail_indent=',function(self,_,a_float){
return self.$i_s('@tail_indent',a_float);
});
rb_define_method(self,'first_line_head_indent',function(self,_){
return rb_ivar_get(self,'@first_line_head_indent');
});
rb_define_method(self,'first_line_head_indent=',function(self,_,a_float){
return self.$i_s('@first_line_head_indent',a_float);
});
rb_define_method(self,'tab_stops',function(self,_){
});
rb_define_method(self,'minimum_line_height',function(self,_){
});
rb_define_method(self,'maximum_line_height',function(self,_){
});
rb_define_method(self,'line_break_mode',function(self,_){
});
rb_define_method(self,'header_level',function(self,_){
});
})(rb_define_class_under(self,'ParagraphStyle',cObject));
})(rb_define_module('Vienna'));
