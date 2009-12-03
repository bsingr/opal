(function(self) {
rb_define_method(self, 'drawRect:',function(self,_cmd,dirty_rect,$b) {
return rb_funcall(self,'puts:',"in draw rect!");
});
})(rb_define_class('AdamsView',rb_const_get(rb_cObject, 'CPView')));
