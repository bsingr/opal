(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(_$hs, 0, _$ht, 1));
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$bq,true);
return self.$i_s(i$br,true);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$ae);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-text-field';
});
rb_define_method(self,s$vj,function(self,_cmd){
rb_funcall(self,s$ah,'resign first responder....');
return true;
});
rb_define_method(self,s$vk,function(self,_cmd){
rb_funcall(self,s$ah,'becoming first responder!!');
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$l),s$dv),'allows_propagation=',true);
return true;
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
return rb_funcall(rb_funcall(self.$klass.$c_g_full(c$l),s$dv),'allows_propagation=',true);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vl,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vm,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$vn,function(self,_cmd,color){
return self.$i_s(i$dx,color);
});
rb_define_method(self,s$vo,function(self,_cmd){
return rb_ivar_get(self, i$dx);
});
rb_define_method(self,s$ql,function(self,_cmd){
return rb_ivar_get(self, i$bu);
});
rb_define_method(self,s$qm,function(self,_cmd,flag){
return self.$i_s(i$bu,flag);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_ivar_get(self, i$bv);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return self.$i_s(i$bv,flag);
});
rb_define_method(self,s$qh,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qi,function(self,_cmd,flag){
return self.$i_s(i$bq,flag);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$br);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return self.$i_s(i$br,flag);
});
rb_define_method(self,s$vp,function(self,_cmd,sender){
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$ei,function(self,_cmd,an_obj){
return self.$i_s(i$t,an_obj);
});
rb_define_method(self,s$vq,function(self,_cmd,text_object){
return true;
});
rb_define_method(self,s$vr,function(self,_cmd,text_object){
return true;
});
rb_define_method(self,s$vs,function(self,_cmd,notification){
});
rb_define_method(self,s$vt,function(self,_cmd,notification){
});
rb_define_method(self,s$vu,function(self,_cmd,notification){
});
rb_define_method(self,s$ul,function(self,_cmd,stlye){
return self.$i_s(i$dk,rb_funcall(self, s$vv));
});
rb_define_method(self,s$um,function(self,_cmd){
return rb_ivar_get(self, i$dk);
});
})(RClass.define_under(self,'TextField',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
