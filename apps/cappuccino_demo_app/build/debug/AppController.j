(function(self) {
rb_define_method(self, '<<',function(self,_cmd,view) {
return rb_funcall(rb_funcall(self,'contentView'),'<<',view);
});
})(rb_define_class('CPWindow',rb_const_get_full(self,'CPResponder')));
(function(self) {
rb_define_method(self, '<<',function(self,_cmd,view) {
return rb_funcall(self,'addSubview:',view);
});
})(rb_define_class('CPView',rb_const_get_full(self,'CPResponder')));
(function(self) {
rb_const_set(self,'MY_NAME',"Adam Beynon");
rb_const_set(self,'TABLE_DATA',[rb_hash_new(ID2SYM('name'), 'Adam Beynon', ID2SYM('age'), 23),rb_hash_new(ID2SYM('name'), 'Spongebob Squarepants', ID2SYM('age'), 73),rb_hash_new(ID2SYM('name'), 'John Smith', ID2SYM('age'), 28)]);
rb_funcall(self,'attr_accessor:',ID2SYM('window'));
rb_define_method(self, 'applicationWillFinishLaunching:',function(self,_cmd,notification) {
var a=["adam","charles","beynon"];
rb_funcall(self,'puts:',"CPString block mapping:");
return rb_funcall(self,'puts:',rb_funcall_block(a,'map',rb_funcall(ID2SYM('uppercaseString'),'to_proc')));
});
rb_define_method(self, 'applicationDidFinishLaunching:',function(self,_cmd,notification) {
rb_ivar_set(self,'window',rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPWindow'),'alloc'),'initWithContentRect:styleMask:',CGRectMakeZero(),rb_const_get_full(self.isa,'CPBorderlessBridgeWindowMask')));
var content_view=rb_funcall(rb_ivar_get(self,'window'),'contentView');
var label=rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPTextField'),'alloc'),'initWithFrame:',CGRectMakeZero());
rb_funcall(label,'setStringValue:',["Hello from ",(rb_const_get_full(self.isa,'MY_NAME')),"!"].join(''));
rb_funcall(label,'setFont:',rb_funcall(rb_const_get_full(self.isa,'CPFont'),'boldSystemFontOfSize:',22.0));
rb_funcall(label,'sizeToFit');
rb_funcall(rb_ivar_get(self,'window'),'<<',label);
rb_funcall(rb_ivar_get(self,'window'),'orderFront:',self);
[CPMenu setMenuBarVisible:true];var f=rb_funcall(rb_const_get_full(self.isa,'CPPoint'),'new',100,100);
return rb_funcall(f,'in_rect?',rb_funcall(rb_ivar_get(self,'window'),'frame'));
});
rb_define_method(self, 'numberOfRowsInTableView:',function(self,_cmd,table_view) {
return rb_funcall(rb_const_get_full(self.isa,'TABLE_DATA'),'length');
});
rb_define_method(self,'tableView:objectValueForTableColumn:row:',function(self,_cmd,table_view,table_column,row){
return rb_funcall(rb_funcall(rb_const_get_full(self.isa,'TABLE_DATA'),'[]',row),'[]',rb_funcall(rb_funcall(table_column,'identifier'),'to_sym'));
});
})(rb_define_class('AppController',rb_cObject));
