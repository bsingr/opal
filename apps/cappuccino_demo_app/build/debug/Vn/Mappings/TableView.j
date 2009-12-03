rb_funcall_block(rb_const_get(rb_const_get(rb_cObject, 'Vienna'),'Mappings'),'map:',rb_hash_new(ID2SYM('table_view'),ID2SYM('CPTableView')),function(){
var self = rb_top_self;self = arguments.callee.self || self;
rb_funcall(self,'defaults:',rb_hash_new(ID2SYM('frame'),[0,0,0,0]));
rb_define_method(self, 'init_with_options:',function(self,_cmd,options,$b) {
return rb_funcall(self,'initWithFrame:',rb_funcall(rb_funcall(options,'delete:',ID2SYM('frame')),'to_rect'));
});
rb_define_method(self, 'setColumn:',function(self,_cmd,a_column,$b) {
return rb_funcall(self,'addTableColumn:',a_column);
});
rb_define_method(self, 'setData:',function(self,_cmd,data,$b) {
rb_funcall(self,'setDataSource:',data);
return (function($v){
if(($e = rb_funcall(rb_const_get_full(self.isa,'Array'), '===', $v),$e!==nil && $e!==false)){
}
})(data);
});
});
