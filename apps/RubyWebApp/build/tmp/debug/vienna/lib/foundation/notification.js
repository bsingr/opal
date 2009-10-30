(function(self) {
(function(self) {
VN$(self,s$ap,_$o,_$p,_$q);
VN$(self,s$aq,_$o,_$p,_$q);
self.$def(s$as,function(self,_cmd,name,obj,info){
VN$sup(arguments.callee, self,_cmd,[]);
self.$i_s(i$l,name);
self.$i_s(i$m,obj);
return self.$i_s(i$n,info);
});
self.$def_s(s$li,function(self,_cmd,name,obj){
return VN$(self,s$lj,name,obj,nil);
});
self.$def_s(s$lj,function(self,_cmd,name,obj,info){
return VN$(self,s$is,name,obj,info);
});
})(RClass.define_under(self,'Notification',cObject));
(function(self) {
self.$def_s(s$lk,function(self,_cmd){
return self.$i_s(i$o,ORTEST(self.$i_g(i$o),VN$(self,s$is)));
});
self.$def(s$as,function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s(i$p,[]);
});
self.$def(s$ll,function(self,_cmd,observer,selector,name,obj){
return VN$(self.$i_g(i$p),s$cv,VN.$h(_$k, observer, _$r, selector, _$o, name, _$s, obj, _$t, true));
});
self.$def(s$lm,function(self,_cmd,notification){
return VN$(self,s$ln,VN$(notification,s$am),VN$(notification,s$lo),VN$(notification,s$lp));
});
self.$def(s$lq,function(self,_cmd,name,obj){
return VN$(self,s$ln,name,obj,nil);
});
self.$def(s$ln,function(self,_cmd,name,obj,info){
return VN$(self.$i_g(i$p),s$ga,function(the_obj){
if(RTEST(VN$(VN$(the_obj,s$bo,_$o),s$ai,name))){
VN$(VN$(the_obj,s$bo,_$k),s$ka,VN$(the_obj,s$bo,_$r),obj,info);
}
});
});
self.$def(s$lr,function(self,_cmd,observer){
});
self.$def(s$ls,function(self,_cmd,observer,name,obj){
});
self.$def(s$lt,function(self,_cmd,name,obj,queue){
});
})(RClass.define_under(self,'NotificationCenter',cObject));
})(RModule.define('Vienna'));
