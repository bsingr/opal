(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame,style_mask){
rb_supcall(arguments.callee, self,_cmd,[frame]);
return self.$i_s(i$gn,style_mask);
});
self.$def_s(s$aek,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$ael,function(self,_cmd,rect,style){
return rb_funcall(self.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
self.$def_s(s$aem,function(self,_cmd,title,style){
});
rb_define_method(self,s$aen,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
rb_define_method(self,s$aeo,function(self,_cmd,rect){
return rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(rect,s$y),rb_funcall(rect,s$z),rb_funcall(rect,s$ac),rb_funcall(rect,s$ad));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-window-view';
});
rb_define_method(self,s$eu,function(self,_cmd,win){
return self.$i_s(i$ac,win);
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
var mouse_down_point = rb_funcall(the_event,s$fa);
return rb_funcall(self.$klass.$c_g_full(c$m),s$du,[_$ak,_$ab],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$ab,_$ak))){
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
}
else{
var window_point = rb_funcall(the_event,s$fa);
self.$i_s(i$go,rb_funcall(rb_funcall(rb_ivar_get(self, i$ac),s$ln),s$v));
self.$i_s(i$gp,rb_funcall(rb_funcall(window_point,s$y),s$mf,rb_funcall(mouse_down_point,s$y)));
self.$i_s(i$gq,rb_funcall(rb_funcall(window_point,s$z),s$mf,rb_funcall(mouse_down_point,s$z)));
rb_funcall(rb_ivar_get(self, i$ac),'frame_origin=',rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(rb_ivar_get(self, i$go),s$y),s$hy,rb_ivar_get(self, i$gp)),rb_funcall(rb_funcall(rb_ivar_get(self, i$go),s$z),s$hy,rb_ivar_get(self, i$gq))));
}
});
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'first_time=',false);
}
return rb_funcall(context,'class_name=',rb_funcall(['vn-window-view'],s$ui,' '));
});
})(RClass.define_under(self,'WindowView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
