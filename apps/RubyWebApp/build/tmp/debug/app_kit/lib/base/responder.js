(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return self.$i_s(i$o,nil);
});
rb_define_method(self,s$cn,function(self,_cmd,a_responder){
return self.$i_s(i$o,a_responder);
});
rb_define_method(self,s$co,function(self,_cmd){
return rb_ivar_get(self, i$o);
});
self.$def(s$cp,function(self,_cmd,an_action,an_object){
});
rb_define_method(self,s$cq,function(self,_cmd,the_event){
return false;
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cr,the_event);
});
rb_define_method(self,s$cs,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cs,the_event);
});
rb_define_method(self,s$ct,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$ct,the_event);
});
rb_define_method(self,s$cu,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cu,the_event);
});
rb_define_method(self,s$cv,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cv,the_event);
});
rb_define_method(self,s$cw,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cw,the_event);
});
rb_define_method(self,s$cx,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cx,the_event);
});
rb_define_method(self,s$cy,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cy,the_event);
});
rb_define_method(self,s$cz,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$cz,the_event);
});
rb_define_method(self,s$da,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$da,the_event);
});
rb_define_method(self,s$db,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$db,the_event);
});
rb_define_method(self,s$dc,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$dc,the_event);
});
rb_define_method(self,s$dd,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$dd,the_event);
});
rb_define_method(self,s$de,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$de,the_event);
});
rb_define_method(self,s$df,function(self,_cmd,the_event){
return rb_funcall(rb_ivar_get(self, i$o),s$df,the_event);
});
rb_define_method(self,s$dg,function(self,_cmd,the_event){
});
rb_define_method(self,s$dh,function(self,_cmd,the_event){
});
rb_define_method(self,s$di,function(self,_cmd,event_selector){
});
rb_define_method(self,s$dj,function(self,_cmd){
return false;
});
rb_define_method(self,s$dk,function(self,_cmd){
return true;
});
rb_define_method(self,s$dl,function(self,_cmd){
return true;
});
rb_define_method(self,s$dm,function(self,_cmd,event_array){
});
rb_define_method(self,s$dn,function(self,_cmd){
});
rb_define_method(self,s$do,function(self,_cmd,menu){
return self.$i_s(i$p,menu);
});
rb_define_method(self,s$dp,function(self,_cmd){
return rb_ivar_get(self, i$p);
});
rb_define_method(self,s$dq,function(self,_cmd,sender){
});
rb_define_method(self,s$dr,function(self,_cmd,the_event){
});
rb_define_method(self,s$ds,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$o),s$ds);
});
})(RClass.define_under(self,'Responder',cObject));
})(RModule.define('Vienna'));
