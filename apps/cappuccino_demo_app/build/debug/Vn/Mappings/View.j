rb_funcall_block(rb_const_get(rb_const_get(rb_cObject, 'Vienna'),'Mappings'),'map:',rb_hash_new(ID2SYM('view'),ID2SYM('CPView')),function(){
var self = rb_top_self;self = arguments.callee.self || self;
rb_define_method(self, '<<',function(self,_cmd,view,$b) {
return rb_funcall(self,'addSubview:',view);
});
});
