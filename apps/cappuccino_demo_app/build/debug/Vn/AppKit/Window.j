(function(self) {
rb_define_method(self, '<<',function(self,_cmd,view) {
return rb_funcall(rb_funcall(self,'contentView'),'<<',view);
});
})(rb_define_class('CPWindow',rb_const_get(rb_cObject, 'CPResponder')));
