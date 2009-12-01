rb_funcall_block(rb_const_get(rb_const_get(rb_top_self, 'Vienna'),'Mappings'),'map:',rb_hash_new(ID2SYM('column'),ID2SYM('CPTableColumn')),function(){
var self = rb_top_self;self = arguments.callee.self || self;
rb_funcall(self,'defaults:',rb_hash_new(ID2SYM('title'),'Column'));
rb_define_method(self, 'init_with_options:',function(self,_cmd,options) {
return rb_funcall(self,'initWithIdentifier:',rb_funcall(options,'delete:',ID2SYM('id')));
});
rb_define_method(self, 'title',function(self,_cmd) {
return rb_funcall(rb_funcall(self,'headerView'),'stringValue');
});
rb_define_method(self, 'setTitle:',function(self,_cmd,title) {
rb_funcall(self,'puts:',["setting title to: ",(title)].join(''));
return rb_funcall(rb_funcall(self,'headerView'),'setStringValue:',title);
});
});
