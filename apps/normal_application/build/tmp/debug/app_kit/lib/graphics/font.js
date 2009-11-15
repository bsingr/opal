(function(self) {
(function(self) {
(function(self) {
self.$def_s('font_with_name:size:',function(self,_,font_name,font_size){
return rb_funcall(self,'font_with_name:size:is_bold:',font_name,font_size,false);
});
self.$def_s('font_with_name:size:is_bold:',function(self,_,font_name,font_size,is_bold){
});
self.$def_s('user_font_of_size',function(self,_,size){
});
self.$def_s('system_font_of_size',function(self,_,size){
});
self.$def_s('bold_system_font_of_size',function(self,_,size){
return rb_funcall(self,'new','Arial',size,true);
});
self.$def_s('label_font_of_size',function(self,_,size){
});
self.$def_s('title_bar_font_of_size',function(self,_,size){
});
self.$def_s('menu_font_of_size',function(self,_,size){
});
self.$def_s('menu_bar_font_of_size',function(self,_,size){
});
self.$def_s('message_font_of_size',function(self,_,size){
});
self.$def_s('palette_font_of_size',function(self,_,size){
});
self.$def_s('tool_tips_font_of_size',function(self,_,size){
});
self.$def_s('control_content_font_of_size',function(self,_,size){
return self.$i_s('@control_content_font',ORTEST(rb_ivar_get(self,'@control_content_font'),rb_funcall(self,'new','Arial',size,false)));
});
self.$def_s('system_font_size',function(self,_){
return 12;
});
self.$def_s('small_system_font_size',function(self,_){
return 10;
});
self.$def_s('label_font_size',function(self,_){
return 12;
});
self.$def_s('system_font_size_for_control_size',function(self,_,control_size){
return (function($v){
if(($e = rb_funcall(ID2SYM('regular'), '===', $v),$e!==nil && $e!==false)){
return 12;
}
else if(($e = rb_funcall(ID2SYM('small'), '===', $v),$e!==nil && $e!==false)){
return 10;
}
else if(($e = rb_funcall(ID2SYM('mini'), '===', $v),$e!==nil && $e!==false)){
return 8;
}
else {
return 12;
}
})(control_size);
});
})(self.$c_g_full('Font'));
rb_define_method(self,'initialize',function(self,_,font_name,size,is_bold){
self.$i_s('@font_name',font_name);
self.$i_s('@size',size);
return self.$i_s('@bold',is_bold);
});
rb_define_method(self,'font_name',function(self,_){
return rb_ivar_get(self,'@font_name');
});
rb_define_method(self,'size',function(self,_){
return rb_ivar_get(self,'@size');
});
rb_define_method(self,'bold?',function(self,_){
return rb_ivar_get(self,'@bold');
});
rb_define_method(self,'css_string',function(self,_){
var bold_str=RTEST(rb_ivar_get(self,'@bold')) ? "bold " : '';
return [(bold_str)," ",(rb_ivar_get(self,'@size')),"px '",(rb_funcall(self,'font_name')),"'"].join('');
});
rb_define_method(self,'set',function(self,_){
});
rb_define_method(self,'cssFont',function(self,_){
});
})(rb_define_class_under(self,'Font',cObject));
})(rb_define_module('Vienna'));
