(function(self) {
return rb_define_method(self, '<<', function(self, _cmd, view) {
    return rb_funcall(rb_funcall(self, 'contentView'), '<<', view);
});
})(rb_define_class('CPWindow', CPResponder));