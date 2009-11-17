(function(self) {
(function(self) {
rb_define_method(self,'init_with_coder',function(self,_,coder){
self.$i_s('@frame',rb_funcall(coder,'decode_rect',ID2SYM('frame')));
self.$i_s('@title',rb_funcall(coder,'decode_object',ID2SYM('title')));
self.$i_s('@class',rb_funcall(coder,'decode_object',ID2SYM('class')));
return self.$i_s('@content_view',rb_funcall(coder,'decode_object',ID2SYM('content_view')));
});
rb_define_method(self,'encode_with_coder',function(self,_,coder){
rb_funcall(coder,'encode_rect',ID2SYM('frame'),rb_ivar_get(self,'@frame'));
rb_funcall(coder,'encode_object',ID2SYM('title'),rb_ivar_get(self,'@title'));
rb_funcall(coder,'encode_object',ID2SYM('class'),rb_ivar_get(self,'@class'));
return rb_funcall(coder,'encode_object',ID2SYM('content_view'),rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'awake_after_using_coder',function(self,_,coder){
var win=rb_funcall(self.$klass.$c_g_full('Window'),'new',rb_ivar_get(self,'@frame'),[ID2SYM('closable')]);
rb_funcall(win,'title=',rb_ivar_get(self,'@title'));
rb_funcall(win,'content_view=',rb_ivar_get(self,'@content_view'));
if(RTEST(rb_ivar_get(self,'@min_size'))){
rb_funcall(win,'min_size=',rb_ivar_get(self,'@min_size'));
}
if(RTEST(rb_ivar_get(self,'@max_size'))){
rb_funcall(win,'max_size=',rb_ivar_get(self,'@max_size'));
}
return win;
});
})(rb_define_class_under(self,'WindowTemplate',cObject));
})(rb_define_module('Vienna'));
