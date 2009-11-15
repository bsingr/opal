(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,identifier){
rb_funcall(self,'identifier=',identifier);
self.$i_s('@header_cell',rb_funcall(self.$klass.$c_g_full('TableHeaderCell'),'new',''));
self.$i_s('@data_cell',rb_funcall(self.$klass.$c_g_full('TextFieldCell'),'new',''));
rb_funcall(rb_ivar_get(self,'@data_cell'),'bezel_style=',ID2SYM('none'));
rb_funcall(rb_ivar_get(self,'@data_cell'),'draws_background=',false);
return self.$i_s('@width',100);
});
rb_define_method(self,'identifier=',function(self,_,identifier){
return self.$i_s('@identifier',identifier);
});
rb_define_method(self,'identifier',function(self,_){
return rb_ivar_get(self,'@identifier');
});
rb_define_method(self,'table_view=',function(self,_,table_view){
return self.$i_s('@table_view',table_view);
});
rb_define_method(self,'table_view',function(self,_){
return rb_ivar_get(self,'@table_view');
});
rb_define_method(self,'width=',function(self,_,width){
return rb_ivar_get(self,'@width');
});
rb_define_method(self,'width',function(self,_){
return rb_ivar_get(self,'@width');
});
rb_define_method(self,'min_width=',function(self,_,min_width){
return self.$i_s('@min_width',min_width);
});
rb_define_method(self,'min_width',function(self,_){
return rb_ivar_get(self,'@min_width');
});
rb_define_method(self,'max_width=',function(self,_,max_width){
return self.$i_s('@max_width',max_width);
});
rb_define_method(self,'max_width',function(self,_){
return rb_ivar_get(self,'@max_width');
});
rb_define_method(self,'header_cell=',function(self,_,cell){
return self.$i_s('@header_cell',cell);
});
rb_define_method(self,'header_cell',function(self,_){
return rb_ivar_get(self,'@header_cell');
});
rb_define_method(self,'data_cell',function(self,_){
return rb_ivar_get(self,'@data_cell');
});
rb_define_method(self,'data_cell=',function(self,_,data_cell){
return self.$i_s('@data_cell',data_cell);
});
rb_define_method(self,'data_cell_for_row',function(self,_){
return rb_ivar_get(self,'@data_cell');
});
rb_define_method(self,'editable=',function(self,_,flag){
return rb_ivar_get(self,'@editable');
});
rb_define_method(self,'editable?',function(self,_){
return rb_ivar_get(self,'@editable');
});
rb_define_method(self,'size_to_fit',function(self,_){
});
rb_define_method(self,'sort_descriptor_prototype=',function(self,_,sort_descriptor){
return self.$i_s('@sort_descriptor_prototype',sort_descriptor);
});
rb_define_method(self,'sort_descriptor_prototype',function(self,_){
return rb_ivar_get(self,'@sort_descriptor_prototype');
});
rb_define_method(self,'resizing_mask=',function(self,_,resizing_mask){
return self.$i_s('@resizing_mask',resizing_mask);
});
rb_define_method(self,'resizing_mask',function(self,_){
return rb_ivar_get(self,'@resizing_mask');
});
rb_define_method(self,'header_tool_tip=',function(self,_,string){
return self.$i_s('@header_tool_tip',string);
});
rb_define_method(self,'header_tool_tip',function(self,_){
return rb_ivar_get(self,'@heder_tool_tip');
});
rb_define_method(self,'hidden?',function(self,_){
return rb_ivar_get(self,'@hidden');
});
rb_define_method(self,'hidden=',function(self,_,flag){
return self.$i_s('@hidden',flag);
});
})(rb_define_class_under(self,'TableColumn',cObject));
})(rb_define_module('Vienna'));
