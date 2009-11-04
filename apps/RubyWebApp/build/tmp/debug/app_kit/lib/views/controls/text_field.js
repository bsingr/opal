(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(_$hv, 0, _$hw, 1));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$bq,true);
return self.$i_s(i$br,true);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$ai);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-text-field';
});
rb_define_method(self,s$vu,function(self,_cmd){
rb_funcall(self,s$ak,'resign first responder....');
return true;
});
rb_define_method(self,s$vv,function(self,_cmd){
rb_funcall(self,s$ak,'becoming first responder!!');
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$dv),'allows_propagation=',true);
return true;
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
return rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$dv),'allows_propagation=',true);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$vw,function(self,_cmd,flag){
return self.$i_s(i$dw,flag);
});
rb_define_method(self,s$vx,function(self,_cmd){
return rb_ivar_get(self, i$dw);
});
rb_define_method(self,s$vy,function(self,_cmd,color){
return self.$i_s(i$dx,color);
});
rb_define_method(self,s$vz,function(self,_cmd){
return rb_ivar_get(self, i$dx);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_ivar_get(self, i$bu);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return self.$i_s(i$bu,flag);
});
rb_define_method(self,s$qp,function(self,_cmd){
return rb_ivar_get(self, i$bv);
});
rb_define_method(self,s$qq,function(self,_cmd,flag){
return self.$i_s(i$bv,flag);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return self.$i_s(i$bq,flag);
});
rb_define_method(self,s$ql,function(self,_cmd){
return rb_ivar_get(self, i$br);
});
rb_define_method(self,s$qm,function(self,_cmd,flag){
return self.$i_s(i$br,flag);
});
rb_define_method(self,s$wa,function(self,_cmd,sender){
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$ei,function(self,_cmd,an_obj){
return self.$i_s(i$t,an_obj);
});
rb_define_method(self,s$wb,function(self,_cmd,text_object){
return true;
});
rb_define_method(self,s$wc,function(self,_cmd,text_object){
return true;
});
rb_define_method(self,s$wd,function(self,_cmd,notification){
});
rb_define_method(self,s$we,function(self,_cmd,notification){
});
rb_define_method(self,s$wf,function(self,_cmd,notification){
});
rb_define_method(self,s$us,function(self,_cmd,stlye){
return self.$i_s(i$dj,rb_funcall(self, s$wg));
});
rb_define_method(self,s$ut,function(self,_cmd){
return rb_ivar_get(self, i$dj);
});
})(RClass.define_under(self,'TextField',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
