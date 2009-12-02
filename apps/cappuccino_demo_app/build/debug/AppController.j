rb_funcall(rb_top_self,'include:',rb_const_get(rb_const_get_full(rb_top_self.isa,'Vienna'),'Mappings'));
(function(self) {
rb_define_method(self, 'something',function(self,_cmd,$b) {
var a;
a=[1,2,3];
rb_funcall_block(a,'each',function(i){
self = arguments.callee.self || self;
return RTEST(rb_funcall(i,'==',2)) ? rb_next(nil) : rb_funcall(self,'puts:',i);
});
rb_return(4);
});
rb_const_set(self,'MY_NAME',"Adam Beynon");
rb_const_set(self,'TABLE_DATA',[rb_hash_new(ID2SYM('name'), 'Adam Beynon', ID2SYM('age'), 23),rb_hash_new(ID2SYM('name'), 'Spongebob Squarepants', ID2SYM('age'), 73),rb_hash_new(ID2SYM('name'), 'John Smith', ID2SYM('age'), 28)]);
rb_funcall(self,'attr_accessor:',ID2SYM('window'));
rb_define_method(self, 'applicationWillFinishLaunching:',function(self,_cmd,notification,$b) {
var a,d;
a=["adam","charles","beynon"];
rb_funcall_block(a,'map',rb_funcall(ID2SYM('uppercaseString'),'to_proc'));
return d={
      name: "Adam Beynon",
      age: 23
    };
});
rb_define_method(self, 'applicationDidFinishLaunching:',function(self,_cmd,notification,$b) {
rb_ivar_set(self,'window',rb_funcall_block(self,'window:',rb_hash_new(ID2SYM('title'),"My Window",ID2SYM('style'),[ID2SYM('bridge')]),function(win){
self = arguments.callee.self || self;
rb_funcall(win,'<<',rb_funcall(self,'button:',rb_hash_new(ID2SYM('title'),"Adam's Button",ID2SYM('frame'),[50,50,300,24],ID2SYM('on_action'),rb_funcall_block(rb_const_get_full(self.isa,'Proc'),'new',function(){
self = arguments.callee.self || self;
return rb_funcall(self,'puts:',"Button Clicked!");
}))));
rb_funcall(win,'<<',rb_funcall_block(self,'scroll_view:',rb_hash_new(ID2SYM('frame'),[400,50,300,250]),function(s){
self = arguments.callee.self || self;
return rb_funcall(s,'<<',rb_funcall(self,'table_view:',rb_hash_new(ID2SYM('column'),rb_funcall(self,'column:',rb_hash_new(ID2SYM('id'),"name",ID2SYM('title'),"Name")),ID2SYM('data'),self)));
}));
return rb_funcall(win,'orderFront:',self);
}));
return rb_funcall(rb_const_get_full(self.isa,'CPMenu'),'setMenuBarVisible:',true);
});
rb_define_method(self, 'numberOfRowsInTableView:',function(self,_cmd,table_view,$b) {
return 26;
});
rb_define_method(self,'tableView:objectValueForTableColumn:row:',function(self,_cmd,table_view,table_column,row){
return "adam";
});
})(rb_define_class('AppController',rb_cObject));
