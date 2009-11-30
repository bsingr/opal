(function(self) {
rb_define_method(self, 'init_with_options:',function(self,_cmd,frame) {
return b=rb_funcall(self,'initWithFrame:',rb_funcall(rb_funcall(self,'options'),'delete:',ID2SYM('frame')));
});
rb_define_method(self, 'on?',function(self,_cmd) {
return rb_funcall(rb_funcall(self,'state'),'==',rb_const_get_full(self.isa,'CPOnState'));
});
rb_define_method(self, 'off?',function(self,_cmd) {
return rb_funcall(rb_funcall(self,'state'),'==',rb_const_get_full(self.isa,'CPOffState'));
});
rb_define_method(self, 'mixed?',function(self,_cmd) {
return rb_funcall(rb_funcall(self,'state'),'==',rb_const_get_full(self.isa,'CPMixedState'));
});
})(rb_define_class('CPButton',rb_const_get_full(self,'CPControl')));
