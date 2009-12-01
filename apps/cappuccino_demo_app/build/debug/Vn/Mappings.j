(function(self) {
(function(self) {
rb_define_singleton_method(self,'map:',function(self,_cmd,options,block) {
var mname=rb_funcall(rb_funcall(rb_funcall(options,'keys'),'first'),'to_s');
rb_funcall(self,'puts:',["mapping ",(mname)].join(''));
rb_funcall(self,'puts:',self);
var mclass=rb_const_get(rb_cObject, rb_funcall(rb_funcall(rb_funcall(options,'values'),'first'),'to_s'));
rb_define_method(self, mname + ':', function(self, _cmd, options, block) {
        return rb_funcall(mclass, 'alloc_with_options:', options, block);
      });rb_funcall_block(mclass,'class_eval',function(){
self = arguments.callee.self || self;
rb_define_singleton_method(self,'alloc_with_options:',function(self,_cmd,options,block) {
var o=rb_funcall(self,'alloc');
var opt=rb_hash_new();
rb_funcall(opt,'merge:',rb_funcall(self,'map_defaults'));
rb_funcall(opt,'merge:',options);
rb_funcall(o,'init_with_options:',opt);
rb_funcall_block(opt,'each',function(key,value){
self = arguments.callee.self || self;
var k=rb_funcall(key,'to_s');
if(RTEST(rb_funcall(rb_ivar_get(self,'map_constants'),'[]',key))){
rb_funcall(self,'puts:',[(rb_funcall(key,'to_s'))," is a constant"].join(''));
}
else{
rb_funcall(o, 'set' + k.charAt(0).toUpperCase() + k.substr(1) + ':', value);}
});
if(RTEST(block)){
arguments[arguments.length -1](o);
}
return o;
});
rb_define_method(self, 'init_with_options:',function(self,_cmd,options) {
});
rb_define_singleton_method(self,'defaults:',function(self,_cmd,defaults) {
return rb_ivar_set(self,'map_defaults',defaults);
});
rb_define_singleton_method(self,'map_defaults',function(self,_cmd) {
return ORTEST(function(){return rb_ivar_get(self,'map_defaults');
},function(){return rb_hash_new();
});
});
rb_ivar_set(self,'map_constants',rb_hash_new());
rb_define_singleton_method(self,'constant',function(self,_cmd,id,hash) {
return rb_funcall(rb_ivar_get(self,'map_constants'),'[]=',id,hash);
});
});
return rb_funcall(mclass,'class_eval:',block);
});
})(rb_define_module_under(self,'Mappings'));
})(rb_define_module('Vienna'));
@import "Mappings/Column.j"
@import "Mappings/Button.j"
