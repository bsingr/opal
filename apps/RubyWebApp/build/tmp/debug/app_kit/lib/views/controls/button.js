(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$y);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return rb_funcall(rb_ivar_get(self, i$bn),'title=',str);
});
rb_define_method(self,s$ta,function(self,_cmd,str){
return rb_funcall(rb_ivar_get(self, i$bn),'alternate_title=',str);
});
rb_define_method(self,s$tb,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tb);
});
rb_define_method(self,s$tc,function(self,_cmd,img){
return rb_funcall(rb_ivar_get(self, i$bn),'alternate_image=',img);
});
rb_define_method(self,s$iu,function(self,_cmd,image){
return rb_funcall(rb_ivar_get(self, i$bn),'image=',image);
});
rb_define_method(self,s$td,function(self,_cmd,position){
return rb_funcall(rb_ivar_get(self, i$bn),'image_position=',position);
});
rb_define_method(self,s$qe,function(self,_cmd,type){
return rb_funcall(rb_ivar_get(self, i$bn),'type=',type);
});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$eb);
});
rb_define_method(self,s$qg,function(self,_cmd,val){
return rb_funcall(rb_ivar_get(self, i$bn),'state=',val);
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$qf);
});
rb_define_method(self,s$te,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$te);
});
rb_define_method(self,s$tf,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tf);
});
rb_define_method(self,s$tg,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tg);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$qn);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'bordered=',flag);
});
rb_define_method(self,s$th,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$th);
});
rb_define_method(self,s$ti,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'transparent=',flag);
});
rb_define_method(self,s$qy,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$qy);
});
rb_define_method(self,s$tj,function(self,_cmd,code){
return rb_funcall(rb_ivar_get(self, i$bn),'key_equivalent=',code);
});
rb_define_method(self,s$tk,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$tk);
});
rb_define_method(self,s$tl,function(self,_cmd,mask){
return rb_funcall(rb_ivar_get(self, i$bn),'key_equivalent_modifier_mask=',mask);
});
rb_define_method(self,s$tm,function(self,_cmd,flag){
});
rb_define_method(self,s$cq,function(self,_cmd,key){
});
rb_define_method(self,s$tn,function(self,_cmd,style){
return rb_funcall(rb_ivar_get(self, i$bn),'bezel=',style);
});
rb_define_method(self,s$to,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$to);
});
rb_define_method(self,s$sv,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'allows_mixed_state=',flag);
});
rb_define_method(self,s$sw,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$sw);
});
rb_define_method(self,s$sx,function(self,_cmd){
});
})(RClass.define_under(self,'Button',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
