(function(self) {
(function(self) {
VN$(self,s$ar,_$ff);
self.$c_s('BUILDERS',VN.$h());
self.$def(s$as,function(self,_cmd,name,block){
self.$i_s(i$l,name);
self.$i_s(i$id,block);
self.$i_s(i$ie,[]);
return VN$(self.$klass.$c_g_full(c$av),'[]=',name,self);
});
self.$def_s(s$sw,function(self,_cmd,name,options,block){
var builder = VN$(self.$c_g_full(c$av),s$bo,name);
return VN$(builder,s$aqn,options,block);
});
self.$def(s$aqn,function(self,_cmd,options,block){
VN$(self.$i_g(i$id),s$it,self);
return arguments[arguments.length -1](self);
});
self.$def(s$aqo,function(self,_cmd,obj){
return VN$(self.$i_g(i$ie),s$cv,obj);
});
self.$def(s$aqp,function(self,_cmd){
return self.$i_g(i$ai);
});
self.$def(s$mv,function(self,_cmd,a_menu){
});
})(RClass.define_under(self,'Builder',cObject));
})(RModule.define('Vienna'));
