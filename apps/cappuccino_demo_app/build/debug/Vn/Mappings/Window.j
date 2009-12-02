rb_funcall_block(rb_const_get(rb_const_get(rb_cObject, 'Vienna'),'Mappings'),'map:',rb_hash_new(ID2SYM('window'),ID2SYM('CPWindow')),function(){
var self = rb_top_self;self = arguments.callee.self || self;
rb_funcall(self,'defaults:',rb_hash_new(ID2SYM('frame'),rb_funcall(rb_const_get_full(self.isa,'CPRect'),'new',0,0,0,0),ID2SYM('style'),[ID2SYM('titled'),ID2SYM('closable'),ID2SYM('miniaturizable'),ID2SYM('resizable')]));
rb_funcall(self,'constant',ID2SYM('style'),rb_hash_new(ID2SYM('borderless'), rb_const_get_full(self.isa,'CPBorderlessWindowMask'), ID2SYM('titled'), rb_const_get_full(self.isa,'CPTitledWindowMask'), ID2SYM('closable'), rb_const_get_full(self.isa,'CPClosableWindowMask'), ID2SYM('miniaturizable'), rb_const_get_full(self.isa,'CPMiniaturizableWindowMask'), ID2SYM('resizable'), rb_const_get_full(self.isa,'CPResizableWindowMask'), ID2SYM('textured'), rb_const_get_full(self.isa,'CPTexturedBackgroundWindowMask'), ID2SYM('bridge'), rb_const_get_full(self.isa,'CPBorderlessBridgeWindowMask'), ID2SYM('hud'), rb_const_get_full(self.isa,'CPHUDBackgroundWindowMask')));
rb_define_method(self, 'init_with_options:',function(self,_cmd,options,$b) {
var a_style=rb_funcall(options,'delete:',ID2SYM('style'));
var style=0;
rb_funcall_block(a_style,'each',function(s){
self = arguments.callee.self || self;
return style=rb_funcall(style,'|',rb_funcall(rb_funcall(rb_funcall(rb_funcall(self,'class'),'map_constants'),'[]',ID2SYM('style')),'[]',s));
});
return rb_funcall(self,'initWithContentRect:styleMask:',rb_funcall(rb_funcall(options,'delete:',ID2SYM('frame')),'to_rect'),style);
});
rb_define_method(self, '<<',function(self,_cmd,view,$b) {
return rb_funcall(rb_funcall(self,'contentView'),'<<',view);
});
});
