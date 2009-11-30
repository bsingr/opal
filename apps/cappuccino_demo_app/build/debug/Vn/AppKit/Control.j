(function(self) {
rb_define_method(self, 'to_s',function(self,_cmd) {
return rb_funcall(self,'stringValue');
});
rb_define_method(self, 'to_i',function(self,_cmd) {
return rb_funcall(self,'intValue');
});
rb_define_method(self, 'to_f',function(self,_cmd) {
return rb_funcall(self,'doubleValue');
});
rb_define_method(self, 'on_action',function(self,_cmd,block) {
rb_funcall(self,'puts:',"In on action... my target is:");
if(RTEST(rb_funcall(self,'target'))){
}
else{
var o=rb_funcall(rb_const_get_full(self.isa,'Object'),'new');
rb_funcall(o,'instance_variable_set',"@action_behavior",block);
rb_funcall(self,'setTarget:',o);
rb_funcall(self,'puts:',o);
}
rb_define_singleton_method(o,'perform_action:',function(self,_cmd,sender) {
return rb_funcall(rb_ivar_get(self,'action_behavior'),'call');
});
return rb_funcall(self,'setAction:',"perform_action:");
});
})(rb_define_class('CPControl',rb_const_get_full(self,'CPView')));
