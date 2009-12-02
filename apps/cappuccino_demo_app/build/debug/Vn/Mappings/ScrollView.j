rb_funcall_block(rb_const_get(rb_const_get(rb_cObject, 'Vienna'),'Mappings'),'map:',rb_hash_new(ID2SYM('scroll_view'),ID2SYM('CPScrollView')),function(){
var self = rb_top_self;self = arguments.callee.self || self;
rb_funcall(self,'defaults:',rb_hash_new(ID2SYM('vertical_scroller'),true,ID2SYM('horizontal_scroller'),true));
rb_define_method(self, 'init_with_options:',function(self,_cmd,options,$b) {
return rb_funcall(self,'initWithFrame:',rb_funcall(rb_funcall(options,'delete:',ID2SYM('frame')),'to_rect'));
});
rb_define_method(self, '<<',function(self,_cmd,view,$b) {
return rb_funcall(self,'setDocumentView:',view);
});
rb_define_method(self, 'setBackground:',function(self,_cmd,value,$b) {
return rb_funcall(self,'setDrawsBackground:',value);
});
rb_define_method(self, 'setVertical_scroller:',function(self,_cmd,value,$b) {
return rb_funcall(self,'setHasVerticalScroller:',value);
});
rb_define_method(self, 'setHorizontal_scroller:',function(self,_cmd,value,$b) {
return rb_funcall(self,'setHasHorizontalScroller:',value);
});
});
