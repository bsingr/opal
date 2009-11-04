(function(self) {
(function(self) {
rb_funcall(self,s$by,_$o,_$p,_$q);
rb_funcall(self,s$bz,_$o,_$p,_$q);
rb_define_method(self,s$i,function(self,_cmd,name,obj,info){
rb_supcall(arguments.callee, self,_cmd,[]);
self.$i_s(i$j,name);
self.$i_s(i$k,obj);
return self.$i_s(i$l,info);
});
self.$def_s(s$ca,function(self,_cmd,name,obj){
return rb_funcall(self,s$cb,name,obj,nil);
});
self.$def_s(s$cb,function(self,_cmd,name,obj,info){
return rb_funcall(self,s$al,name,obj,info);
});
})(RClass.define_under(self,'Notification',cObject));
(function(self) {
self.$def_s(s$cc,function(self,_cmd){
return self.$i_s(i$m,ORTEST(rb_ivar_get(self, i$m),rb_funcall(self,s$al)));
});
rb_define_method(self,s$i,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return self.$i_s(i$n,[]);
});
self.$def(s$cd,function(self,_cmd,observer,selector,name,obj){
return rb_funcall(rb_ivar_get(self, i$n),s$b,VN.$h(_$k, observer, _$r, selector, _$o, name, _$s, obj, _$t, true));
});
rb_define_method(self,s$ce,function(self,_cmd,notification){
return rb_funcall(self,s$cf,rb_funcall(notification,s$cg),rb_funcall(notification,s$ch),rb_funcall(notification,s$ci));
});
self.$def(s$cj,function(self,_cmd,name,obj){
return rb_funcall(self,s$cf,name,obj,nil);
});
self.$def(s$cf,function(self,_cmd,name,obj,info){
return rb_funcall(rb_ivar_get(self, i$n),s$m,function(the_obj){
if(RTEST(rb_funcall(rb_funcall(the_obj,s$e,_$o),s$y,name))){
rb_funcall(rb_funcall(the_obj,s$e,_$k),s$ap,rb_funcall(the_obj,s$e,_$r),obj,info);
}
});
});
rb_define_method(self,s$ck,function(self,_cmd,observer){
});
self.$def(s$cl,function(self,_cmd,observer,name,obj){
});
self.$def(s$cm,function(self,_cmd,name,obj,queue){
});
})(RClass.define_under(self,'NotificationCenter',cObject));
})(RModule.define('Vienna'));
