(function(self) {
rb_define_method(self, '<<',function(self,_cmd,view) {
return rb_funcall(self,'addSubview:',view);
});
})(rb_define_class('CPView',rb_const_get_full(self,'CPResponder')));
