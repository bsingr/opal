(function(self) {
(function(self) {
rb_define_method(self,'font_attributes_in_range',function(self,_,range){
});
rb_define_method(self,'contains_attachments?',function(self,_){
});
self.$def('line_break_before_index:within_range:',function(self,_,location,a_range){
});
self.$def('line_break_by_hyphenating_before_index:within_range:',function(self,_,location,a_range){
});
rb_define_method(self,'double_click_at_index',function(self,_,location){
});
self.$def('next_word_from_index:forward:',function(self,_,location,is_forward){
});
self.$def('url_at_index:effective_range:',function(self,_,location,effective_range){
});
rb_define_method(self,'superscript_range',function(self,_,range){
});
rb_define_method(self,'subscript_range',function(self,_,range){
});
rb_define_method(self,'unscript_range',function(self,_,range){
});
self.$def('set_alignment:range:',function(self,_,alignment,range){
});
})(rb_define_class_under(self,'AttributedString',cObject));
})(rb_define_module('Vienna'));
