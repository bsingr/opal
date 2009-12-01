rb_funcall(rb_top_self,'include:',rb_const_get(rb_const_get_full(rb_top_self.isa,'Vienna'),'Mappings'));
(function(self) {
rb_const_set(self,'MY_NAME',"Adam Beynon");
rb_const_set(self,'TABLE_DATA',[rb_hash_new(ID2SYM('name'), 'Adam Beynon', ID2SYM('age'), 23),rb_hash_new(ID2SYM('name'), 'Spongebob Squarepants', ID2SYM('age'), 73),rb_hash_new(ID2SYM('name'), 'John Smith', ID2SYM('age'), 28)]);
rb_funcall(self,'attr_accessor:',ID2SYM('window'));
rb_define_method(self, 'applicationWillFinishLaunching:',function(self,_cmd,notification) {
var a=["adam","charles","beynon"];
return rb_funcall_block(a,'map',rb_funcall(ID2SYM('uppercaseString'),'to_proc'));
});
rb_define_method(self, 'applicationDidFinishLaunching:',function(self,_cmd,notification) {
rb_ivar_set(self,'window',rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPWindow'),'alloc'),'initWithContentRect:styleMask:',CGRectMakeZero(),rb_const_get_full(self.isa,'CPBorderlessBridgeWindowMask')));
var content_view=rb_funcall(rb_ivar_get(self,'window'),'contentView');
var table=rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPTableView'),'alloc'),'initWithFrame:',rb_funcall(content_view,'bounds'));
rb_funcall(table,'addTableColumn:',rb_funcall(self,'column:',rb_hash_new(ID2SYM('id'),'Person',ID2SYM('title'),"People")));
rb_funcall(table,'setDelegate:',self);
rb_funcall(table,'setDataSource:',self);
rb_funcall(content_view,'<<',table);
rb_funcall(rb_ivar_get(self,'window'),'<<',rb_funcall_block(self,'button:',rb_hash_new(ID2SYM('title'),"adam",ID2SYM('frame'),[50,50,300,24]),function(b){
self = arguments.callee.self || self;
return rb_funcall_block(b,'on_action',function(){
self = arguments.callee.self || self;
return rb_funcall(self,'puts:',"button clicked!");
});
}));
rb_funcall(rb_ivar_get(self,'window'),'orderFront:',self);
[CPMenu setMenuBarVisible:true];var f=rb_funcall(rb_const_get_full(self.isa,'CPPoint'),'new',100,100);
return rb_funcall(f,'in_rect?',rb_funcall(rb_ivar_get(self,'window'),'frame'));
});
rb_define_method(self, 'numberOfRowsInTableView:',function(self,_cmd,table_view) {
return 5;
});
rb_define_method(self,'tableView:objectValueForTableColumn:row:',function(self,_cmd,table_view,table_column,row){
return "adam";
});
})(rb_define_class('AppController',rb_cObject));
