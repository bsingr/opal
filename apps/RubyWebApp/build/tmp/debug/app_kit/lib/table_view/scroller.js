(function(self) {
(function(self) {
self.$c_s('SCROLLER_PARTS',VN.$h(_$gn, 0, _$ic, 1, _$id, 2, _$ie, 3, _$if, 4, _$hu, 5, _$ig, 6));
self.$c_s('SCROLLER_ARROWS',VN.$h(_$ih, 0, _$ii, 1));
self.$c_s('SCROLL_ARROW_POSITIONS',VN.$h(_$gn, 1, _$ij, 2, _$ik, 3));
self.$c_s('USABLE_SCROLLER_PARTS',VN.$h(_$gn, 0, _$il, 1, _$im, 2));
self.$def_s(s$xz,function(self,_cmd){
return 17;
});
self.$def_s(s$yd,function(self,_cmd,control_size){
return 17;
});
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$ck,0.0);
return self.$i_s(i$er,1);
});
rb_define_method(self,s$kc,function(self,_cmd){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$ac),s$hx,rb_funcall(rb_ivar_get(self, i$bb),s$ad))) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,s$e,"<div class='dec-line'></div>");
rb_funcall(context,s$e,"<div class='inc-line'></div>");
rb_funcall(context,s$e,"<div class='knob'><div class='start'</div><div class='middle'></div><div class='end'></div></div>");
rb_funcall(context,'first_time=',false);
}
rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
return rb_funcall(context,s$jv,_$hu,function(knob){
return rb_funcall(knob,'frame=',rb_funcall(self,s$ye,_$hu));
});
});
rb_define_method(self,s$yf,function(self,_cmd){
});
self.$c_s('DECREMENT_LINE_SIZE',22);
rb_define_method(self,s$ye,function(self,_cmd,part){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
var increment_line = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
var decrement_line = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
var knob = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
var knob_slot = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),rb_funcall(rb_ivar_get(self, i$bc),s$ad));
if(RTEST(rb_funcall(self, s$vf))){
rb_funcall(decrement_line,'height=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'height=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ad),s$mf,self.$klass.$c_g_full(c$am)));
rb_funcall(knob_slot,'height=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ad),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$am)))));
rb_funcall(knob_slot,'y=',self.$klass.$c_g_full(c$am));
rb_funcall(knob,'height=',rb_funcall(rb_funcall(knob_slot,s$ad),s$vp,rb_ivar_get(self, i$er)));
rb_funcall(knob,'y=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,s$ad),s$mf,rb_funcall(knob,s$ad))),s$vp,rb_ivar_get(self, i$ck))),s$hy,rb_funcall(knob_slot,s$z)));
}
else{
rb_funcall(decrement_line,'width=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'width=',self.$klass.$c_g_full(c$am));
rb_funcall(increment_line,'y=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ac),s$mf,self.$klass.$c_g_full(c$am)));
rb_funcall(knob_slot,'width=',rb_funcall(rb_funcall(rb_ivar_get(self, i$bc),s$ac),s$mf,(rb_funcall((2),s$vp,self.$klass.$c_g_full(c$am)))));
rb_funcall(knob_slot,'x=',self.$klass.$c_g_full(c$am));
rb_funcall(knob,'width=',rb_funcall(rb_funcall(knob_slot,s$ac),s$vp,rb_ivar_get(self, i$er)));
rb_funcall(knob,'x=',rb_funcall((rb_funcall((rb_funcall(rb_funcall(knob_slot,s$ac),s$mf,rb_funcall(knob,s$ac))),s$vp,rb_ivar_get(self, i$ck))),s$hy,rb_funcall(knob_slot,s$y)));
}
return (function($v){
if(($e = rb_funcall(_$gn, '===', $v),$e!==nil && $e!==false)){
return result;
}
else if(($e = rb_funcall(_$ic, '===', $v),$e!==nil && $e!==false)){
if(RTEST(rb_funcall(self, s$vf))){
}
else{
}
}
else if(($e = rb_funcall(_$id, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$ie, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$if, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$hu, '===', $v),$e!==nil && $e!==false)){
return knob;
}
else if(($e = rb_funcall(_$ig, '===', $v),$e!==nil && $e!==false)){
return knob_slot;
}
})(part);
});
rb_define_method(self,s$yg,function(self,_cmd){
});
rb_define_method(self,s$yh,function(self,_cmd){
});
rb_define_method(self,s$yi,function(self,_cmd,position){
return self.$i_s(i$es,position);
});
rb_define_method(self,s$yj,function(self,_cmd){
return rb_ivar_get(self, i$es);
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
self.$def(s$yk,function(self,_cmd,which_arrow,flag){
});
rb_define_method(self,s$yl,function(self,_cmd){
});
self.$def(s$ym,function(self,_cmd,slot_rect,flag){
});
rb_define_method(self,s$yn,function(self,_cmd,flag){
});
rb_define_method(self,s$yo,function(self,_cmd,the_point){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
if(!RTEST(rb_funcall(self, s$ob))){
return ;
}
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
return rb_funcall(self,s$yp,the_event);
});
rb_define_method(self,s$yp,function(self,_cmd,the_event){
var original_value = rb_ivar_get(self, i$ck);
var mouse_down_point = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
var slot_rect = rb_funcall(self,s$ye,_$ig);
var knob_rect = rb_funcall(self,s$ye,_$hu);
var size = RTEST(rb_funcall(self, s$vf)) ? rb_funcall(rb_funcall(slot_rect,s$ad),s$mf,rb_funcall(knob_rect,s$ad)) : rb_funcall(rb_funcall(slot_rect,s$ac),s$mf,rb_funcall(knob_rect,s$ac));
return rb_funcall(self.$klass.$c_g_full(c$m),s$du,[_$ak,_$ab],function(the_event){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$ab,_$ak))){
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
}
else{
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
var delta = RTEST(rb_funcall(self, s$vf)) ? rb_funcall(rb_funcall(location,s$z),s$mf,rb_funcall(mouse_down_point,s$z)) : rb_funcall(rb_funcall(location,s$y),s$mf,rb_funcall(mouse_down_point,s$y));
rb_funcall(self,'float_value=',rb_funcall(self.$klass.$c_g_full(c$ah),s$vs,rb_funcall(self.$klass.$c_g_full(c$ah),s$vt,0,rb_funcall(original_value,s$hy,(rb_funcall(delta,s$vq,size)))),1));
rb_funcall(self,'needs_display=',true);
rb_funcall(self,s$ph,rb_ivar_get(self, i$ca),rb_ivar_get(self, i$bz));
}
});
});
rb_define_method(self,s$yq,function(self,_cmd,the_event){
});
rb_define_method(self,s$yr,function(self,_cmd){
});
rb_define_method(self,s$ys,function(self,_cmd){
return rb_ivar_get(self, i$er);
});
rb_define_method(self,s$yt,function(self,_cmd,proportion){
self.$i_s(i$er,proportion);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$ou,function(self,_cmd,a_float){
return self.$i_s(i$ck,a_float);
});
rb_define_method(self,s$oz,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$pb,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$ov,function(self,_cmd,a_double){
return self.$i_s(i$ck,a_double);
});
rb_define_method(self,s$ns,function(self,_cmd,an_action){
return self.$i_s(i$ca,an_action);
});
rb_define_method(self,s$nq,function(self,_cmd,a_target){
return self.$i_s(i$bz,a_target);
});
rb_define_method(self,s$vf,function(self,_cmd){
return RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$ac),s$hx,rb_funcall(rb_ivar_get(self, i$bb),s$ad))) ? true : false;
});
})(RClass.define_under(self,'Scroller',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
