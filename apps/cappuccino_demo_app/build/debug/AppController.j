rb_funcall(rb_top_self,'include:',rb_const_get(rb_const_get_full(rb_top_self.isa,'Vienna'),'Builder'));
(function(self) {
rb_const_set(self,'MY_NAME',"Adam Beynon");
rb_const_set(self,'TABLE_DATA',[rb_hash_new(ID2SYM('name'), 'Adam Beynon', ID2SYM('age'), 23),rb_hash_new(ID2SYM('name'), 'Spongebob Squarepants', ID2SYM('age'), 73),rb_hash_new(ID2SYM('name'), 'John Smith', ID2SYM('age'), 28)]);
rb_funcall(self,'attr_accessor:',ID2SYM('window'));
rb_define_method(self, 'applicationWillFinishLaunching:',function(self,_cmd,notification) {
var a=["adam","charles","beynon"];
rb_funcall(self,'puts:',"CPString block mapping:");
rb_funcall(self,'puts:',rb_funcall_block(a,'map',rb_funcall(ID2SYM('uppercaseString'),'to_proc')));
var h=rb_funcall(rb_const_get_full(self.isa,'Hash'),'new');
return rb_funcall_block(rb_const_get_full(self.isa,'TABLE_DATA'),'each',function(i){
self = arguments.callee.self || self;
return rb_funcall_block(i,'each',function(key,value){
self = arguments.callee.self || self;
return rb_funcall(self,'puts:',["I have ",(key)," for ",(value)].join(''));
});
});
});
rb_define_method(self, '_applicationDidFinishLaunching:',function(self,_cmd,notification) {
return rb_ivar_set(self,'window',rb_funcall_block(self,'window',rb_hash_new(ID2SYM('style'),ID2SYM('bridge')),function(win){
self = arguments.callee.self || self;
return rb_funcall(win,'<<',(rb_funcall(self,'label',rb_hash_new(ID2SYM('value'),["Hello from ",(rb_const_get_full(self.isa,'MY_NAME')),"!"].join('')))));
}));
});
rb_define_method(self, 'applicationDidFinishLaunching:',function(self,_cmd,notification) {
rb_ivar_set(self,'window',rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPWindow'),'alloc'),'initWithContentRect:styleMask:',CGRectMakeZero(),rb_const_get_full(self.isa,'CPBorderlessBridgeWindowMask')));
var content_view=rb_funcall(rb_ivar_get(self,'window'),'contentView');
var name=rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPTableColumn'),'alloc'),'initWithIdentifier:',"People");
rb_funcall(name,'setWidth:',145.0);
var table=rb_funcall(rb_funcall(rb_const_get_full(self.isa,'CPTableView'),'alloc'),'initWithFrame:',rb_funcall(content_view,'bounds'));
rb_funcall(table,'addTableColumn:',name);
rb_funcall(table,'setDelegate:',self);
rb_funcall(table,'setDataSource:',self);
rb_funcall(content_view,'<<',table);
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
