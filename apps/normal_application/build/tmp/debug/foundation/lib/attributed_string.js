(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,str,attributes){
self.$i_s('@string',str);
return self.$i_s('@attributes',attributes);
});
rb_define_method(self,'string',function(self,_){
return rb_ivar_get(self,'@string');
});
self.$def('attributes_at_index:effective_range:',function(self,_,location,range){
});
rb_define_method(self,'length',function(self,_){
});
self.$def('attribute:at_index:effective_range:',function(self,_,attr_name,location,range){
});
rb_define_method(self,'attributed_substring_from_range',function(self,_,range){
});
self.$def('attributes_at_index:longest_effective_range:in_range:',function(self,_,location,range,range_limit){
});
self.$def('attribute:at_index:longest_effective_range:in_range:',function(self,_,attr_name,location,range,range_limit){
});
rb_define_method(self,'equal_to_attribted_sring?',function(self,_,other){
return false;
});
self.$def('replace_characters_in_range:with_string:',function(self,_,range,str){
});
self.$def('set_attributes:range:',function(self,_,attrs,range){
});
self.$def('add_attribute:value:range:',function(self,_,name,valye,range){
});
self.$def('add_attributes:range:',function(self,_,attrs,range){
});
self.$def('remove_attribute:range:',function(self,_,name,range){
});
self.$def('replace_characters_in_range:with_attributed_string:',function(self,_,range,attr_string){
});
self.$def('insert_attributed_string:at_index:',function(self,_,attr_string,loc){
});
rb_define_method(self,'append_attributed_string',function(self,_,attr_string){
});
rb_define_method(self,'delete_characters_in_range',function(self,_,range){
});
rb_define_method(self,'set_attributed_string',function(self,_,attr_string){
});
rb_define_method(self,'begin_editing',function(self,_){
});
rb_define_method(self,'end_editing',function(self,_){
});
})(rb_define_class_under(self,'AttributedString',cObject));
})(rb_define_module('Vienna'));
