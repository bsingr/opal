(function(self) {
self.$c_s('SCROLLER_PARTS',VN.$h(_$hj, 0, _$jb, 1, _$jc, 2, _$jd, 3, _$je, 4, _$io, 5, _$jf, 6));
self.$c_s('SCROLLER_ARROWS',VN.$h(_$jg, 0, _$jh, 1));
self.$c_s('SCROLL_ARROW_POSITIONS',VN.$h(_$hj, 1, _$ji, 2, _$jj, 3));
self.$c_s('USABLE_SCROLLER_PARTS',VN.$h(_$hj, 0, _$jk, 1, _$jl, 2));
(function(self) {
self.$c_s('V_KNOB_IMAGE',_E(self.$c_g_full(c$aj),s$aq,_E(self.$c_g_full(c$ai),s$ms,'scroller_vertical_knob_top'),_E(self.$c_g_full(c$ai),s$ms,'scroller_vertical_knob_middle'),_E(self.$c_g_full(c$ai),s$ms,'scroller_vertical_knob_bottom'),true));
self.$c_s('H_KNOB_IMAGE',_E(self.$c_g_full(c$aj),s$aq,_E(self.$c_g_full(c$ai),s$ms,'scroller_horizontal_knob_left'),_E(self.$c_g_full(c$ai),s$ms,'scroller_horizontal_knob_middle'),_E(self.$c_g_full(c$ai),s$ms,'scroller_horizontal_knob_right')));
self.$c_s('LEFT_ARROW',VN.$h(_$t, _E(self.$c_g_full(c$ai),s$ms,'scroller_left_arrow')));
self.$c_s('RIGHT_ARROW',VN.$h(_$t, _E(self.$c_g_full(c$ai),s$ms,'scroller_right_arrow')));
self.$c_s('H_TRACK',VN.$h(_$t, _E(self.$c_g_full(c$ai),s$ms,'scroller_horizontal_track')));
self.$c_s('V_TRACK',VN.$h(_$t, _E(self.$c_g_full(c$ai),s$ms,'scroller_vertical_track')));
self.$c_s('TOP_ARROW',VN.$h(_$t, _E(self.$c_g_full(c$ai),s$ms,'scroller_top_arrow')));
self.$c_s('BOTTOM_ARROW',VN.$h(_$t, _E(self.$c_g_full(c$ai),s$ms,'scroller_bottom_arrow')));
self.$def_s(s$ahd,function(self,_){
return 17;
});
self.$def_s(s$ahi,function(self,_,control_size){
return 17;
});
_I(self,s$n,function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s(i$dg,0.0);
return self.$i_s(i$fm,1);
});
_I(self,s$wu,function(self,_){
return _A(_E(_E(_H(self,i$by),s$ae),s$dv,_E(_H(self,i$by),s$af))) ? 'vn-vertical-scroller' : 'vn-horizontal-scroller';
});
_I(self,s$wk,function(self,_,context){
return _E(context,s$se,function(){
if(_A(_E(self,s$ael))){
_E(_E(self.$klass.$c_g_full(c$bg),s$j,_$t),s$nw,_H(self,i$bz));
_E(_E(self.$klass.$c_g_full(c$bh),s$j,_$t),s$nw,_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,17,28));
_E(_E(self.$klass.$c_g_full(c$bi),s$j,_$t),s$nw,_E(self.$klass.$c_g_full(c$ag),s$aq,0,_E(_E(_H(self,i$bz),s$af),s$dy,28),17,28));
}
else{
_E(_E(self.$klass.$c_g_full(c$bj),s$j,_$t),s$nw,_H(self,i$bz));
_E(_E(self.$klass.$c_g_full(c$bk),s$j,_$t),s$nw,_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,28,17));
_E(_E(self.$klass.$c_g_full(c$bl),s$j,_$t),s$nw,_E(self.$klass.$c_g_full(c$ag),s$aq,_E(_E(_H(self,i$bz),s$ae),s$dy,28),0,28,17));
}
return _E(context,s$nv,_$fu,function(knob){
var knob_rect=_E(self,s$ahj,_$io);
_E(knob,s$w,knob_rect);
var knob_bounds=_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,_E(knob_rect,s$ae),_E(knob_rect,s$af));
if(_A(_E(self,s$ael))){
_E(self.$klass.$c_g_full(c$bm),s$nw,knob_bounds);
}
else{
_E(self.$klass.$c_g_full(c$bn),s$nw,knob_bounds);
}
});
});
});
_I(self,s$ahk,function(self,_){
});
self.$c_s('DECREMENT_LINE_SIZE',22);
_I(self,s$ahj,function(self,_,part){
var result=_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,0,0);
var increment_line=_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,_E(_H(self,i$bz),s$ae),_E(_H(self,i$bz),s$af));
var decrement_line=_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,_E(_H(self,i$bz),s$ae),_E(_H(self,i$bz),s$af));
var knob=_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,_E(_H(self,i$bz),s$ae),_E(_H(self,i$bz),s$af));
var knob_slot=_E(self.$klass.$c_g_full(c$ag),s$aq,0,0,_E(_H(self,i$bz),s$ae),_E(_H(self,i$bz),s$af));
if(_A(_E(self,s$ael))){
_E(decrement_line,s$mg,self.$klass.$c_g_full(c$bo));
_E(increment_line,s$mg,self.$klass.$c_g_full(c$bo));
_E(increment_line,s$me,_E(_E(_H(self,i$bz),s$af),s$dy,self.$klass.$c_g_full(c$bo)));
_E(knob_slot,s$mg,_E(_E(_H(self,i$bz),s$af),s$dy,(_E((2),s$om,self.$klass.$c_g_full(c$bo)))));
_E(knob_slot,s$me,self.$klass.$c_g_full(c$bo));
_E(knob,s$mg,_E(_E(knob_slot,s$af),s$om,_H(self,i$fm)));
_E(knob,s$me,_E((_E((_E(_E(knob_slot,s$af),s$dy,_E(knob,s$af))),s$om,_H(self,i$dg))),s$ed,_E(knob_slot,s$ac)));
}
else{
_E(decrement_line,s$mf,self.$klass.$c_g_full(c$bo));
_E(increment_line,s$mf,self.$klass.$c_g_full(c$bo));
_E(increment_line,s$me,_E(_E(_H(self,i$bz),s$ae),s$dy,self.$klass.$c_g_full(c$bo)));
_E(knob_slot,s$mf,_E(_E(_H(self,i$bz),s$ae),s$dy,(_E((2),s$om,self.$klass.$c_g_full(c$bo)))));
_E(knob_slot,s$md,self.$klass.$c_g_full(c$bo));
_E(knob,s$mf,_E(_E(knob_slot,s$ae),s$om,_H(self,i$fm)));
_E(knob,s$md,_E((_E((_E(_E(knob_slot,s$ae),s$dy,_E(knob,s$ae))),s$om,_H(self,i$dg))),s$ed,_E(knob_slot,s$ab)));
}
return (function($v){
if(($e = _E(_$hj, '===', $v),$e!==nil && $e!==false)){
return result;
}
else if(($e = _E(_$jb, '===', $v),$e!==nil && $e!==false)){
if(_A(_E(self,s$ael))){
}
else{
}
}
else if(($e = _E(_$jc, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = _E(_$jd, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = _E(_$je, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = _E(_$io, '===', $v),$e!==nil && $e!==false)){
return knob;
}
else if(($e = _E(_$jf, '===', $v),$e!==nil && $e!==false)){
return knob_slot;
}
})(part);
});
_I(self,s$ahl,function(self,_){
});
_I(self,s$ahm,function(self,_){
});
_I(self,s$ahn,function(self,_,position){
return self.$i_s(i$fn,position);
});
_I(self,s$aho,function(self,_){
return _H(self,i$fn);
});
_I(self,s$xs,function(self,_,control_tint){
return self.$i_s(i$dh,control_tint);
});
_I(self,s$xr,function(self,_){
return _H(self,i$dh);
});
_I(self,s$xt,function(self,_,control_size){
return self.$i_s(i$di,control_size);
});
_I(self,s$xu,function(self,_){
return _H(self,i$di);
});
self.$def(s$ahp,function(self,_,which_arrow,flag){
});
_I(self,s$ahq,function(self,_){
});
self.$def(s$ahr,function(self,_,slot_rect,flag){
});
_I(self,s$ahs,function(self,_,flag){
});
_I(self,s$aht,function(self,_,the_point){
});
_I(self,s$ej,function(self,_,the_event){
if(!_A(_E(self,s$xp))){
return ;
}
var location=_E(self,s$vr,_E(the_event,s$gr),nil);
return _E(self,s$ahu,the_event);
});
_I(self,s$ahu,function(self,_,the_event){
var original_value=_H(self,i$dg);
var mouse_down_point=_E(self,s$vr,_E(the_event,s$gr),nil);
var slot_rect=_E(self,s$ahj,_$jf);
var knob_rect=_E(self,s$ahj,_$io);
var size=_A(_E(self,s$ael)) ? _E(_E(slot_rect,s$af),s$dy,_E(knob_rect,s$af)) : _E(_E(slot_rect,s$ae),s$dy,_E(knob_rect,s$ae));
return _E(self.$klass.$c_g_full(c$y),s$fm,[_$aj,_$aa],function(the_event){
if(_A(_E(_E(the_event,s$fs),s$ad,_$aj))){
_E(self.$klass.$c_g_full(c$y),s$fr);
}
else{
var location=_E(self,s$vr,_E(the_event,s$gr),nil);
var delta=_A(_E(self,s$ael)) ? _E(_E(location,s$ac),s$dy,_E(mouse_down_point,s$ac)) : _E(_E(location,s$ab),s$dy,_E(mouse_down_point,s$ab));
_E(self,s$yg,_E(self.$klass.$c_g_full(c$ba),s$aew,_E(self.$klass.$c_g_full(c$ba),s$aex,0,_E(original_value,s$ed,(_E(delta,s$uu,size)))),1));
_E(self,s$um,true);
_E(self,s$yu,_H(self,i$cx),_H(self,i$cw));
}
});
});
_I(self,s$ahv,function(self,_,the_event){
});
_I(self,s$ahw,function(self,_){
});
_I(self,s$ahx,function(self,_){
return _H(self,i$fm);
});
_I(self,s$ahe,function(self,_,proportion){
self.$i_s(i$fm,proportion);
return _E(self,s$um,true);
});
_I(self,s$yg,function(self,_,a_float){
return self.$i_s(i$dg,a_float);
});
_I(self,s$yl,function(self,_){
return _H(self,i$dg);
});
_I(self,s$yn,function(self,_){
return _H(self,i$dg);
});
_I(self,s$yh,function(self,_,a_double){
return self.$i_s(i$dg,a_double);
});
_I(self,s$xf,function(self,_,an_action){
return self.$i_s(i$cx,an_action);
});
_I(self,s$xd,function(self,_,a_target){
return self.$i_s(i$cw,a_target);
});
_I(self,s$ael,function(self,_){
return _A(_E(_E(_H(self,i$by),s$ae),s$dv,_E(_H(self,i$by),s$af))) ? true : false;
});
})(_N(self,c$be,self.$c_g_full(c$ar)));
})(_K(c$b));
