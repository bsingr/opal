(function(self) {
(function(self) {
rb_define_singleton_method(self,'map:',function(self,_cmd,options,$b) {
var block = $b;
var mname,mclass;
mname=rb_funcall(rb_funcall(rb_funcall(options,'keys'),'first'),'to_s');
mclass=rb_const_get(rb_cObject, rb_funcall(rb_funcall(rb_funcall(options,'values'),'first'),'to_s'));
rb_define_method(self, mname + ':', function(self, _cmd, options, block) {
        return rb_funcall(mclass, 'alloc_with_options:', options, block);
      });rb_funcall_block(mclass,'class_eval',function(){
self = arguments.callee.self || self;
rb_define_singleton_method(self,'alloc_with_options:',function(self,_cmd,options,$b) {
var block = $b;
var o,opt;
o=rb_funcall(self,'alloc');
opt=rb_hash_new();
rb_funcall(opt,'merge:',rb_funcall(self,'map_defaults'));
rb_funcall(opt,'merge:',options);
rb_funcall(o,'init_with_options:',opt);
rb_funcall_block(opt,'each',function(key,value){
self = arguments.callee.self || self;
k=rb_funcall(key,'to_s');
return (function(){if(RTEST(rb_funcall(rb_ivar_get(self,'map_constants'),'[]',key))){
rb_funcall(self,'puts:',[(rb_funcall(key,'to_s'))," is a constant"].join(''));
}
else{
rb_funcall(o, 'set' + k.charAt(0).toUpperCase() + k.substr(1) + ':', value);}
})();
});
(function(){if(RTEST(block)){
rb_yield($b,o);
}
})();
return o;
});
rb_define_method(self, 'init_with_options:',function(self,_cmd,options,$b) {
});
rb_define_singleton_method(self,'defaults:',function(self,_cmd,defaults,$b) {
return rb_ivar_set(self,'map_defaults',defaults);
});
rb_define_singleton_method(self,'map_defaults',function(self,_cmd,$b) {
return ORTEST(function(){return rb_ivar_get(self,'map_defaults');
},function(){return rb_hash_new();
});
});
rb_define_singleton_method(self,'map_constants',function(self,_cmd,$b) {
return rb_ivar_get(self,'map_constants');
});
rb_ivar_set(self,'map_constants',rb_hash_new());
rb_define_singleton_method(self,'constant',function(self,_cmd,id,hash,$b) {
return rb_funcall(rb_ivar_get(self,'map_constants'),'[]=',id,hash);
});
});
return rb_funcall(mclass,'class_eval:',block);
});
})(rb_define_module_under(self,'Mappings'));
})(rb_define_module('Vienna'));
@import "Mappings/Window.j"
@import "Mappings/View.j"
@import "Mappings/ScrollView.j"
@import "Mappings/TableView.j"
@import "Mappings/Control.j"
@import "Mappings/Button.j"
@import "Mappings/Column.j"
