(function(self) {
rb_const_set(self,'MY_NAME',"Adam");
rb_const_set(self,'TABLE_DATA',[rb_hash_new(ID2SYM('name'), 'Adam Beynon', ID2SYM('age'), 23),rb_hash_new(ID2SYM('name'), 'Spongebob Squarepants', ID2SYM('age'), 73),rb_hash_new(ID2SYM('name'), 'John Smith', ID2SYM('age'), 28)]);
rb_funcall(self,'attrAccessor:',ID2SYM('window'));
rb_define_method(self,'applicationDidFinishLaunching:',function(self,_cmd,notification) {
rb_ivar_set(self,'window'rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPWindow'),'alloc'),'initWithContentRect:styleMask:',rb_funcall(self,'CGRectMakeZero'),rb_const_get_full(self.isa,'CPBorderlessBridgeWindowMask')));
var content_view=rb_funcall(rb_ivar_get(self,'window'),'contentView');
var label=rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPTextField'),'alloc'),'initWithFrame:',rb_funcall(self,'CGRectMakeZero'));
rb_funcall(label,'setStringValue:',["Hello from ",(rb_const_get_full(self.isa,'MY_NAME')),"!"].join(''));
rb_funcall(label,'setFont:',rb_funcall(rb_const_get_full(self.isa,'CPFont'),'boldSystemFontOfSize:',22.0));
rb_funcall(label,'sizeToFit');
rb_funcall(content_view,'<<',label);
rb_funcall(rb_ivar_get(self,'window'),'orderFront:',self);
rb_funcall(rb_const_get_full(self.isa,'CPMenu'),'setMenuBarVisible:',true);
return rb_funcall(self,'puts:',"App finished launching!!");
});
rb_define_method(self,'numberOfRowsInTableView:',function(self,_cmd,table_view) {
return rb_funcall(rb_const_get_full(self.isa,'TABLE_DATA'),'length');
});
rb_define_method(self,'tableView:objectValueForTableColumn:row:',function(self,_cmd,table_view,table_column,row){
return rb_funcall(rb_funcall(rb_const_get_full(self.isa,'TABLE_DATA'),'[]',row),'[]',rb_funcall(rb_funcall(table_column,'identifier'),'toSym'));
});
})(rb_define_class('AppController',cObject));
