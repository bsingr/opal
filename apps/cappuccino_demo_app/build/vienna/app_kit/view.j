(function(self) {
return rb_define_method(self, '<<', function(self, _cmd, other) {
    return rb_funcall(self, 'addSubview:', other);
});
})(rb_define_class('CPView', CPResponder));