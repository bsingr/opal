(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
self.$def_s('cell_class',function(self,_){
return self.$c_g_full('ButtonCell');
});
rb_define_method(self,'title=',function(self,_,str){
return rb_funcall(rb_ivar_get(self,'@cell'),'title=',str);
});
rb_define_method(self,'alternate_title=',function(self,_,str){
return rb_funcall(rb_ivar_get(self,'@cell'),'alternate_title=',str);
});
rb_define_method(self,'alternate_image',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'alternate_image');
});
rb_define_method(self,'alternate_image=',function(self,_,img){
return rb_funcall(rb_ivar_get(self,'@cell'),'alternate_image=',img);
});
rb_define_method(self,'image=',function(self,_,image){
return rb_funcall(rb_ivar_get(self,'@cell'),'image=',image);
});
rb_define_method(self,'image_position=',function(self,_,position){
return rb_funcall(rb_ivar_get(self,'@cell'),'image_position=',position);
});
rb_define_method(self,'type=',function(self,_,type){
return rb_funcall(rb_ivar_get(self,'@cell'),'type=',type);
});
rb_define_method(self,'type',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'type');
});
rb_define_method(self,'state=',function(self,_,val){
return rb_funcall(rb_ivar_get(self,'@cell'),'state=',val);
});
rb_define_method(self,'state',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'state');
});
rb_define_method(self,'on?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'on?');
});
rb_define_method(self,'off?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'off?');
});
rb_define_method(self,'mixed?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'mixed?');
});
rb_define_method(self,'bordered?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'bordered?');
});
rb_define_method(self,'bordered=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'bordered=',flag);
});
rb_define_method(self,'transparent?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'transparent?');
});
rb_define_method(self,'transparent=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'transparent=',flag);
});
rb_define_method(self,'key_equivalent',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent');
});
rb_define_method(self,'key_equivalent=',function(self,_,code){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent=',code);
});
rb_define_method(self,'key_equivalent_modifier_mask',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent_modifier_mask');
});
rb_define_method(self,'key_equivalent_modifier_mask=',function(self,_,mask){
return rb_funcall(rb_ivar_get(self,'@cell'),'key_equivalent_modifier_mask=',mask);
});
rb_define_method(self,'highlight=',function(self,_,flag){
});
rb_define_method(self,'perform_key_equivalent',function(self,_,key){
});
rb_define_method(self,'bezel=',function(self,_,style){
return rb_funcall(rb_ivar_get(self,'@cell'),'bezel=',style);
});
rb_define_method(self,'bezel',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'bezel');
});
rb_define_method(self,'allows_mixed_state=',function(self,_,flag){
return rb_funcall(rb_ivar_get(self,'@cell'),'allows_mixed_state=',flag);
});
rb_define_method(self,'allows_mixed_state?',function(self,_){
return rb_funcall(rb_ivar_get(self,'@cell'),'allows_mixed_state?');
});
rb_define_method(self,'next_state',function(self,_){
});
})(rb_define_class_under(self,'Button',self.$c_g_full('Control')));
})(rb_define_module('Vienna'));
