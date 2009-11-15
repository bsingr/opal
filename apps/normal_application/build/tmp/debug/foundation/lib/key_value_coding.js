(function(self) {
self.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
(function(self) {
self.$def_s('access_instance_variables_directly?',function(self,_){
return true;
});
rb_define_method(self,'value_for_key',function(self,_,key){
var accessor=key;
if(RTEST(rb_funcall(self,'respond_to?',accessor))){
return rb_funcall(self,'perform_selector',accessor);
}
accessor=[(key),"?"].join('');
if(RTEST(rb_funcall(self,'respond_to?',accessor))){
return rb_funcall(self,'perform_selector',accessor);
}
if(RTEST(rb_funcall(rb_funcall(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return rb_funcall(self,'value_for_undefined_key',key);
});
self.$def('set_value:for_key:',function(self,_,value,key){
var accessor=[(key),"="].join('');
if(RTEST(rb_funcall(self,'respond_to?',accessor))){
rb_funcall(self,'perform_selector:with_object:',accessor,value);
return value;
}
if(RTEST(rb_funcall(rb_funcall(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {rb_funcall(self,'will_change_value_for_key',key);
self.$iv_tbl['@' + key] = value;rb_funcall(self,'did_change_value_for_key',key);
return value;
}}
return rb_funcall(self,'set_value:for_undefined_key:',value,key);
});
self.$def('validate_value:for_key:error:',function(self,_,value,key,out_error){
});
rb_define_method(self,'array_value_for_key',function(self,_,key){
});
rb_define_method(self,'set_value_for_key',function(self,_,key){
});
rb_define_method(self,'value_for_key_path',function(self,_,path){
return rb_funcall(self,'value_for_key',path);
});
self.$def('set_value:for_key_path:',function(self,_,value,path){
return rb_funcall(self,'set_value:for_key:',value,path);
});
self.$def('validate_value:for_key_path:error:',function(self,_,value,path,out_error){
});
rb_define_method(self,'array_value_for_key_path',function(self,_,path){
});
rb_define_method(self,'set_value_for_key_path',function(self,_,path){
});
rb_define_method(self,'value_for_undefined_key',function(self,_,key){
});
self.$def('set_value:for_undefined_key:',function(self,_,value,key){
});
rb_define_method(self,'set_nil_value_for_key',function(self,_,key){
});
rb_define_method(self,'dictionary_with_values_for_keys',function(self,_,keys){
});
rb_define_method(self,'set_values_for_keys_with_dictionary',function(self,_,keyed_values){
});
})(rb_define_class_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,'value_for_key',function(self,_,key){
});
self.$def('set_value:for_key:',function(self,_,value,key){
});
})(rb_define_class_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,'value_for_key',function(self,_,key){
});
self.$def('set_value:for_key:',function(self,_,value,key){
});
})(rb_define_class_under(self,'Dictionary',cObject));
(function(self) {
rb_define_method(self,'value_for_key',function(self,_,key){
});
self.$def('set_value:for_key:',function(self,_,value,key){
});
})(rb_define_class_under(self,'Set',cObject));
})(rb_define_module('Vienna'));
