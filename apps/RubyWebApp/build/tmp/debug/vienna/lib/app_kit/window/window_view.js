(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame]);
return self.$i_s(i$gm,style_mask);
});
self.$def_s(s$adv,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
self.$def_s(s$adw,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
self.$def_s(s$adx,function(self,_cmd,title,style){
});
rb_define_method(self,s$ady,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
rb_define_method(self,s$adz,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$s),s$al,rb_funcall(rect,s$v),rb_funcall(rect,s$w),rb_funcall(rect,s$z),rb_funcall(rect,s$aa));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-window-view';
});
rb_define_method(self,s$eu,function(self,_cmd,win){
return self.$i_s(i$ac,win);
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
self.$i_s(i$gn,rb_funcall(the_event,s$fa));
return rb_funcall(self.$klass.$c_g_full(c$l),s$du,[_$ai,_$ab],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$y,_$ai))){
rb_funcall(self.$klass.$c_g_full(c$l),s$ea);
}
else{
var window_point = rb_funcall(the_event,s$fa);
self.$i_s(i$go,rb_funcall(rb_funcall(rb_ivar_get(self, i$ac),s$ln),s$s));
self.$i_s(i$gp,rb_funcall(rb_funcall(window_point,s$v),s$mf,rb_funcall(rb_ivar_get(self, i$gn),s$v)));
self.$i_s(i$gq,rb_funcall(rb_funcall(window_point,s$w),s$mf,rb_funcall(rb_ivar_get(self, i$gn),s$w)));
rb_funcall(rb_ivar_get(self, i$ac),'frame_origin=',rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_funcall(rb_funcall(rb_ivar_get(self, i$go),s$v),s$hy,rb_ivar_get(self, i$gp)),rb_funcall(rb_funcall(rb_ivar_get(self, i$go),s$w),s$hy,rb_ivar_get(self, i$gq))));
}
});
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(['vn-window-view'],s$ue,' '));
});
})(RClass.define_under(self,'WindowView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
