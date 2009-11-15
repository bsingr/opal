(function(self) {
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('owner'));
self.$c_s('BUILDERS',VN.$h());
rb_define_method(self,'initialize',function(self,_,name,block){
self.$i_s('@name',name);
self.$i_s('@builder',block);
self.$i_s('@top_level_objects',[]);
return rb_funcall(self.$klass.$c_g_full('BUILDERS'),'[]=',name,self);
});
self.$def_s('build',function(self,_,name,options,block){
var builder=rb_funcall(self.$c_g_full('BUILDERS'),'[]',name);
return rb_funcall(builder,'build!',options,block);
});
rb_define_method(self,'build!',function(self,_,options,block){
rb_funcall(rb_ivar_get(self,'@builder'),'call',self);
return arguments[arguments.length -1](self);
});
rb_define_method(self,'top',function(self,_,obj){
return rb_funcall(rb_ivar_get(self,'@top_level_objects'),'<<',obj);
});
rb_define_method(self,'owner',function(self,_){
return rb_ivar_get(self,'@owner');
});
rb_define_method(self,'menu=',function(self,_,a_menu){
});
})(rb_define_class_under(self,'Builder',cObject));
})(rb_define_module('Vienna'));
