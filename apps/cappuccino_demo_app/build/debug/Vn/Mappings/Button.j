rb_funcall_block(rb_const_get(rb_const_get(rb_top_self, 'Vienna'),'Mappings'),'map:',rb_hash_new(ID2SYM('button'),ID2SYM('CPButton')),function(){
var self = rb_top_self;self = arguments.callee.self || self;
rb_funcall(self,'defaults:',rb_hash_new(ID2SYM('frame'),rb_funcall(rb_const_get_full(self.isa,'CPRect'),'new',0,0,100,24)));
rb_funcall(self,'constant',ID2SYM('state'),rb_hash_new(ID2SYM('on'), rb_const_get_full(self.isa,'CPOnState'), ID2SYM('off'), rb_const_get_full(self.isa,'CPOffState'), ID2SYM('mixed'), rb_const_get_full(self.isa,'CPMixedState')));
rb_define_method(self, 'init_with_options:',function(self,_cmd,options) {
return rb_funcall(self,'initWithFrame:',rb_funcall(rb_funcall(options,'delete:',ID2SYM('frame')),'to_rect'));
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
});
