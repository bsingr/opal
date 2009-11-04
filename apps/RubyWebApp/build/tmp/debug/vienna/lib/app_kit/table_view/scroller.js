(function(self) {
(function(self) {
self.$def_s(s$xo,function(self,_cmd){
return 15;
});
self.$def_s(s$xp,function(self,_cmd,control_size){
return 15;
});
rb_define_method(self,s$kc,function(self,_cmd){
return rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$z),s$hx,rb_funcall(rb_ivar_get(self, i$bb),s$aa)) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
rb_define_method(self,s$my,function(self,_cmd,context){
return rb_funcall(context,s$l,VN.$h(_$hv,'rgb(220,220,220)'));
});
rb_define_method(self,s$xq,function(self,_cmd){
});
rb_define_method(self,s$xr,function(self,_cmd,part){
});
rb_define_method(self,s$xs,function(self,_cmd){
});
rb_define_method(self,s$xt,function(self,_cmd){
});
rb_define_method(self,s$xu,function(self,_cmd,position){
return self.$i_s(i$eq,position);
});
rb_define_method(self,s$xv,function(self,_cmd){
return rb_ivar_get(self, i$eq);
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
return self.$i_s(i$cl,control_tint);
});
rb_define_method(self,s$od,function(self,_cmd){
return rb_ivar_get(self, i$cl);
});
rb_define_method(self,s$of,function(self,_cmd,control_size){
return self.$i_s(i$cm,control_size);
});
rb_define_method(self,s$og,function(self,_cmd){
return rb_ivar_get(self, i$cm);
});
self.$def(s$xw,function(self,_cmd,which_arrow,flag){
});
rb_define_method(self,s$xx,function(self,_cmd){
});
self.$def(s$xy,function(self,_cmd,slot_rect,flag){
});
rb_define_method(self,s$xz,function(self,_cmd,flag){
});
rb_define_method(self,s$ya,function(self,_cmd,the_point){
});
rb_define_method(self,s$yb,function(self,_cmd,the_event){
});
rb_define_method(self,s$yc,function(self,_cmd,the_event){
});
rb_define_method(self,s$yd,function(self,_cmd){
});
rb_define_method(self,s$ye,function(self,_cmd){
return rb_ivar_get(self, i$er);
});
rb_define_method(self,s$yf,function(self,_cmd,proportion){
return self.$i_s(i$er,proportion);
});
})(RClass.define_under(self,'Scroller',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
