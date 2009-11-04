(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,graphics_port,flip_state){
self.$i_s(i$ah,graphics_port);
return self.$i_s(i$ai,flip_state);
});
rb_define_method(self,s$ge,function(self,_cmd){
return rb_ivar_get(self, i$ah);
});
rb_define_method(self,s$gf,function(self,_cmd,graphics_port){
return self.$i_s(i$ah,graphics_port);
});
rb_define_method(self,s$gg,function(self,_cmd){
return rb_ivar_get(self, i$ai);
});
self.$def_s(s$gh,function(self,_cmd){
return self.$k_g('@@current_context');
});
self.$def_s(s$gi,function(self,_cmd,context){
return self.$k_s('@@current_context',context);
});
rb_define_method(self,s$gj,function(self,_cmd){
});
rb_define_method(self,s$gk,function(self,_cmd){
});
rb_define_method(self,s$gl,function(self,_cmd,width){
rb_ivar_get(self, i$ah).lineWidth = width});
rb_define_method(self,s$gm,function(self,_cmd,cap){
rb_ivar_get(self, i$ah).lineCap = cap});
rb_define_method(self,s$gn,function(self,_cmd,join){
rb_ivar_get(self, i$ah).lineJoin = join});
rb_define_method(self,s$go,function(self,_cmd,limit){
rb_ivar_get(self, i$ah).miterLimit = limit});
rb_define_method(self,s$gp,function(self,_cmd,alpha){
rb_ivar_get(self, i$ah).globalAlpha = alpha});
rb_define_method(self,s$gq,function(self,_cmd){
rb_ivar_get(self, i$ah).beginPath()});
rb_define_method(self,s$gr,function(self,_cmd,point){
rb_ivar_get(self, i$ah).moveTo(rb_funcall(point,s$y),rb_funcall(point,s$z))});
rb_define_method(self,s$gs,function(self,_cmd,point){
rb_ivar_get(self, i$ah).lineTo(rb_funcall(point,s$y),rb_funcall(point,s$z))});
rb_define_method(self,s$gt,function(self,_cmd,cp1,cp2,point){
rb_ivar_get(self, i$ah).bezierCurveTo(rb_funcall(cp1,s$y),rb_funcall(cp1,s$z),rb_funcall(cp2,s$y),rb_funcall(cp2,s$z),rb_funcall(point,s$y),rb_funcall(point,s$z))});
rb_define_method(self,s$gu,function(self,_cmd,points){
});
rb_define_method(self,s$gv,function(self,_cmd,sx,sy){
});
rb_define_method(self,s$gw,function(self,_cmd,tx,ty){
});
rb_define_method(self,s$gx,function(self,_cmd,angle){
});
rb_define_method(self,s$gy,function(self,_cmd,transform){
});
rb_define_method(self,s$gz,function(self,_cmd){
});
rb_define_method(self,s$ha,function(self,_cmd,rect){
});
rb_define_method(self,s$hb,function(self,_cmd,point,radius,start_angle,end_angle,clock_wise){
});
rb_define_method(self,s$hc,function(self,_cmd,point1,point2,radius){
});
rb_define_method(self,s$hd,function(self,_cmd,path){
});
rb_define_method(self,s$he,function(self,_cmd){
});
rb_define_method(self,s$hf,function(self,_cmd){
});
rb_define_method(self,s$hg,function(self,_cmd){
});
rb_define_method(self,s$hh,function(self,_cmd,point){
});
})(RClass.define_under(self,'GraphicsContext',cObject));
})(RModule.define('Vienna'));
