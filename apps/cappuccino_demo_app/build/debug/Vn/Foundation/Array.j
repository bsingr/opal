(function(self) {
rb_define_method(self, 'to_rect',function(self,_cmd) {
return rb_funcall(rb_const_get_full(self.isa,'CPRect'),'new',rb_funcall(self,'[]',0),rb_funcall(self,'[]',1),rb_funcall(self,'[]',2),rb_funcall(self,'[]',3));
});
rb_define_method(self, 'to_point',function(self,_cmd) {
return rb_funcall(rb_const_get_full(self.isa,'CGPoint'),'new',rb_funcall(self,'[]',0),rb_funcall(self,'[]',1));
});
rb_define_method(self, 'to_size',function(self,_cmd) {
return rb_funcall(rb_const_get_full(self.isa,'CGSize'),'new',rb_funcall(self,'[]',0),rb_funcall(self,'[]',1));
});
})(rb_define_class('Array',rb_cObject));
