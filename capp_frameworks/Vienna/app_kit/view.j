rb_define_method(CPView, '<<', function(self, _cmd, other) {
    return rb_funcall(self, 'addSubview:', other);
});