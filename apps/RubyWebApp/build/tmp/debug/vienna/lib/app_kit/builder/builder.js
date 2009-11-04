(function(self) {
(function(self) {
rb_funcall(self,s$g,_$ff);
self.$c_s('BUILDERS',VN.$h());
rb_define_method(self,s$i,function(self,_cmd,name,block){
self.$i_s(i$j,name);
self.$i_s(i$ib,block);
self.$i_s(i$ic,[]);
return rb_funcall(self.$klass.$c_g_full(c$au),'[]=',name,self);
});
self.$def_s(s$ka,function(self,_cmd,name,options,block){
var builder = rb_funcall(self.$c_g_full(c$au),s$e,name);
return rb_funcall(builder,s$aig,options,block);
});
rb_define_method(self,s$aig,function(self,_cmd,options,block){
rb_funcall(rb_ivar_get(self, i$ib),s$ak,self);
return arguments[arguments.length -1](self);
});
rb_define_method(self,s$aih,function(self,_cmd,obj){
return rb_funcall(rb_ivar_get(self, i$ic),s$b,obj);
});
rb_define_method(self,s$aii,function(self,_cmd){
return rb_ivar_get(self, i$ag);
});
rb_define_method(self,s$do,function(self,_cmd,a_menu){
});
})(RClass.define_under(self,'Builder',cObject));
})(RModule.define('Vienna'));
