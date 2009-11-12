
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$jg, 0, _$jh, _E((1),s$e,0), _$jd, _E((1),s$e,1), _$jf, _E((1),s$e,2), _$ji, _E((1),s$e,3), _$jj, _E((1),s$e,8), _$jk, _E((1),s$e,12), _$jl, 1, _$jm, 1, _$jn, 1, _$jo, 1, _$jp, 1, _$jq, _E((1),s$e,4), _$jr, _E((1),s$e,6), _$hn, _E((1),s$e,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$t, 0, _$js, 0, _$jt, 0, _$ju, 0, _$jv, 0, _$jw, 0, _$u, 0, _$jx, 0, _$jy, 0));
(function(self) {
_I(self,s$n,function(self,_,content_rect,style_mask){
return _E(self,s$anp,content_rect,style_mask);
});
self.$def(s$anp,function(self,_,content_rect,style_mask){
_E(self,s$tm);
self.$i_s(i$by,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,0,0));
self.$i_s(i$hp,_E(self.$klass.$c_g_full(c$y),s$fx,self));
self.$i_s(i$hj,style_mask);
_E(self,s$anq,_$t);
self.$i_s(i$hq,_E(self.$klass.$c_g_full(c$af),s$ap,0.0,0.0));
self.$i_s(i$hr,_E(self.$klass.$c_g_full(c$af),s$ap,9999.0,9999.0));
self.$i_s(i$hs,self);
self.$i_s(i$s,self.$klass.$c_g_full(c$y));
_E(self,s$anr);
_E(self,s$w,content_rect);
_E(_H(self,i$ht),s$un,true);
_E(self,s$afu,_E(self.$klass.$c_g_full(c$ap),s$ap,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,_E(_H(self,i$by),s$ae),_E(_H(self,i$by),s$af))));
return self;
});
self.$def_s(s$sc,function(self,_,options,block){
var win=_E(_E(self,s$st),s$anp,_E(options,s$j,_$gp),[_$jh,_$jd]);
if(_A(block)){
arguments[arguments.length -1](win);
}
return win;
});
_I(self,s$tm,function(self,_){
if(_A(_E(_E(self.$klass.$c_g_full(c$x),s$j,_$ae),s$ad,_$af))){
}
self.$i_s(i$b,_E(self.$klass.$c_g_full(c$f),s$ap,_$fu));
self.$i_s(i$cf,_E(self.$klass.$c_g_full(c$ah),s$ap,_$fu));
_E(_H(self,i$b),s$e,_H(self,i$cf));
return _E(self.$klass.$c_g_full(c$c),s$e,_H(self,i$b));
});
_I(self,s$anr,function(self,_){
var view_class=_E(self,s$ans,_H(self,i$hj));
self.$i_s(i$ht,_E(view_class,s$ap,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,100,100),_H(self,i$hj)));
_E(_H(self,i$ht),s$ui,self);
_E(_H(self,i$ht),s$ee,self);
_E(_H(self,i$b),s$e,_E(_H(self,i$ht),s$o));
_E(_H(self,i$ht),s$uk);
_E(_H(self,i$ht),s$un,true);
_E(_E(_H(self,i$ht),s$o),s$f,_$ag,function(event){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fo,event,self,_$ah);
_E(self.$klass.$c_g_full(c$y),s$fp,the_event);
if(!_A(_E(the_event,s$gh))){
_E(the_event,s$gg);
}
});
return _E(_E(_H(self,i$ht),s$o),s$f,_$ai,function(event){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fo,event,self,_$aj);
_E(self.$klass.$c_g_full(c$y),s$fp,the_event);
if(!_A(_E(the_event,s$gh))){
_E(the_event,s$gg);
}
});
});
_I(self,s$ans,function(self,_,style_mask){
if(_A(_E(style_mask,s$ea,_$jg))){
return self.$klass.$c_g_full(c$bz);
}
else if(_A(_E(style_mask,s$ea,_$hn))){
return self.$klass.$c_g_full(c$by);
}
else{
return self.$klass.$c_g_full(c$bx);
}
});
self.$def_s(s$anj,function(self,_,rect,style){
});
self.$def_s(s$ank,function(self,_,rect,style){
});
self.$def_s(s$anl,function(self,_,title,style){
});
_I(self,s$anm,function(self,_,rect){
});
_I(self,s$ann,function(self,_,rect){
return rect;
});
_I(self,s$zs,function(self,_){
return _H(self,i$cq);
});
_I(self,s$zt,function(self,_,str){
return self.$i_s(i$cq,str);
});
_I(self,s$ant,function(self,_,str){
});
_I(self,s$anu,function(self,_){
});
_I(self,s$anv,function(self,_){
});
_I(self,s$anw,function(self,_,filename){
});
_I(self,s$anx,function(self,_,filename){
});
_I(self,s$any,function(self,_,flag){
return self.$i_s(i$hu,flag);
});
_I(self,s$anz,function(self,_){
return _H(self,i$hu);
});
_I(self,s$afu,function(self,_,view){
_E(view,s$ui,self);
var bounds=_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,_E(_E(_H(self,i$by),s$aa),s$ae),_E(_E(_H(self,i$by),s$aa),s$af));
self.$i_s(i$ev,view);
_E(_H(self,i$ev),s$w,_E(self,s$ann,bounds));
_E(view,s$uk);
return _E(_H(self,i$ht),s$e,_H(self,i$ev));
});
_I(self,s$afw,function(self,_){
return _H(self,i$ev);
});
_I(self,s$e,function(self,_,view){
return _E(_H(self,i$ev),s$e,view);
});
_I(self,s$fz,function(self,_,obj){
return self.$i_s(i$x,obj);
});
_I(self,s$og,function(self,_){
});
_I(self,s$gl,function(self,_){
return _H(self,i$hp);
});
_I(self,s$aoa,function(self,_){
return _H(self,i$hj);
});
_I(self,s$aob,function(self,_,mask){
return self.$i_s(i$hj,mask);
});
self.$def(s$aoc,function(self,_,create_flag,obj){
});
_I(self,s$aod,function(self,_,obj){
});
_I(self,s$aoe,function(self,_,size){
});
_I(self,s$aof,function(self,_,point){
});
_I(self,s$aog,function(self,_,point){
});
_I(self,s$va,function(self,_){
return _H(self,i$by);
});
_I(self,s$w,function(self,_,frame){
return _E(self,s$aoh,frame,true,false);
});
self.$def(s$aoi,function(self,_,frame_rect,flag){
return _E(self,s$aoh,frame_rect,flag,false);
});
self.$def(s$aoh,function(self,_,frame_rect,flag,animate_flag){
if(_A(animate_flag)){
}
else{
var origin=_E(_H(self,i$by),s$y);
var size=_E(_H(self,i$by),s$aa);
var new_origin=_E(frame_rect,s$y);
var new_size=_E(frame_rect,s$aa);
if(!_A(_E(origin,s$ml,new_origin))){
_E(origin,s$mb,_E(new_origin,s$ab));
_E(origin,s$mc,_E(new_origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$o),s$cd),s$ck,'window did move',self);
}
if(!_A(_E(size,s$ml,new_size))){
_E(size,s$md,_E(new_size,s$ae));
_E(size,s$me,_E(new_size,s$af));
_E(_H(self,i$ht),s$uz,size);
_E(_H(self,i$b),s$z,size);
_E(_E(self.$klass.$c_g_full(c$o),s$cd),s$ck,'window did resize',self);
}
}
});
_I(self,s$uy,function(self,_,origin){
if(!_A(_E(origin,s$ml,_E(_H(self,i$by),s$y)))){
_E(_E(_H(self,i$by),s$y),s$mb,_E(origin,s$ab));
_E(_E(_H(self,i$by),s$y),s$mc,_E(origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$o),s$cd),s$ck,'window did move',self);
}
});
_I(self,s$aoj,function(self,_,new_frame){
});
_I(self,s$aok,function(self,_){
});
_I(self,s$aol,function(self,_,show){
return self.$i_s(i$hv,show);
});
_I(self,s$aom,function(self,_){
return _H(self,i$hv);
});
_I(self,s$aon,function(self,_,increments){
return self.$i_s(i$hw,increments);
});
_I(self,s$aoo,function(self,_){
return _H(self,i$hw);
});
_I(self,s$aop,function(self,_,ratio){
return self.$i_s(i$hx,ratio);
});
_I(self,s$aoq,function(self,_){
return _H(self,i$hx);
});
_I(self,s$wd,function(self,_){
});
_I(self,s$aor,function(self,_){
return _H(self,i$hy);
});
_I(self,s$aos,function(self,_,flag){
return self.$i_s(i$hy,flag);
});
_I(self,s$aot,function(self,_){
});
_I(self,s$aou,function(self,_,responder){
if(_A(_E(_H(self,i$hs),s$ad,responder))){
return true;
}
if(!_A(_E(_H(self,i$hs),s$fc))){
return false;
}
if(_A(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(_E(responder,s$fa)),NOTTEST(_E(responder,s$fb)))))){
self.$i_s(i$hs,self);
_E(self,s$al,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$hs,responder);
return true;
});
_I(self,s$aov,function(self,_){
});
_I(self,s$aow,function(self,_){
});
_I(self,s$ev,function(self,_,the_event){
});
_I(self,s$aox,function(self,_){
});
_I(self,s$aoy,function(self,_,flag){
return self.$i_s(i$hz,flag);
});
_I(self,s$aoz,function(self,_){
return _H(self,i$hz);
});
_I(self,s$apa,function(self,_,sender){
});
_I(self,s$apb,function(self,_,sender){
});
_I(self,s$apc,function(self,_){
return _H(self,i$ia);
});
_I(self,s$apd,function(self,_,sender){
});
_I(self,s$ape,function(self,_){
return _H(self,i$ib);
});
self.$def(s$eg,function(self,_,action,object){
});
_I(self,s$no,function(self,_,color){
return self.$i_s(i$bc,color);
});
_I(self,s$np,function(self,_){
return _H(self,i$bc);
});
_I(self,s$apf,function(self,_,flag){
return self.$i_s(i$ic,flag);
});
_I(self,s$apg,function(self,_){
return _H(self,i$ic);
});
_I(self,s$aph,function(self,_,flag){
return _H(self,i$id);
});
_I(self,s$api,function(self,_){
return _H(self,i$id);
});
_I(self,s$apj,function(self,_,flag){
return self.$i_s(i$ie,flag);
});
_I(self,s$apk,function(self,_){
return _H(self,i$ie);
});
_I(self,s$mi,function(self,_){
});
_I(self,s$apl,function(self,_,sender){
_E(self,s$apm,self);
_E(self,s$apn);
return _E(self,s$apo);
});
_I(self,s$apm,function(self,_,sender){
});
_I(self,s$app,function(self,_,sender){
});
_I(self,s$apq,function(self,_,sender){
});
self.$def(s$apr,function(self,_,place,other_win){
});
_I(self,s$aps,function(self,_){
});
_I(self,s$apt,function(self,_,flag){
return self.$i_s(i$if,flag);
});
_I(self,s$apu,function(self,_){
return _H(self,i$if);
});
_I(self,s$apv,function(self,_){
return _H(self,i$ig);
});
_I(self,s$apw,function(self,_){
return _H(self,i$ih);
});
_I(self,s$apx,function(self,_){
return _H(self,i$ii);
});
_I(self,s$apy,function(self,_){
});
_I(self,s$apz,function(self,_){
});
_I(self,s$apn,function(self,_){
});
_I(self,s$apo,function(self,_){
});
_I(self,s$aqa,function(self,_){
});
_I(self,s$aqb,function(self,_){
});
_I(self,s$aqc,function(self,_){
});
_I(self,s$aqd,function(self,_){
});
_I(self,s$aqe,function(self,_){
});
_I(self,s$aqf,function(self,_,point){
return _E(self.$klass.$c_g_full(c$aa),s$ap,_E(_E(point,s$ab),s$ec,_E(_H(self,i$by),s$ab)),_E(_E(point,s$ac),s$ec,_E(_H(self,i$by),s$ac)));
});
_I(self,s$gr,function(self,_,point){
var res=_E(self.$klass.$c_g_full(c$aa),s$ap,_E(_E(point,s$ab),s$dx,_E(_H(self,i$by),s$ab)),_E(_E(point,s$ac),s$dx,_E(_H(self,i$by),s$ac)));
return res;
});
_I(self,s$aqg,function(self,_,sender){
});
_I(self,s$aqh,function(self,_,sender){
});
_I(self,s$aqi,function(self,_,sender){
});
_I(self,s$anq,function(self,_,level){
self.$i_s(i$ij,level);
return _E(_H(self,i$b),s$q,VN.$h(_$jz,_E(self.$klass.$c_g_full(c$ca),s$j,level)));
});
_I(self,s$aqj,function(self,_){
return _H(self,i$ij);
});
_I(self,s$aqk,function(self,_,flag){
return self.$i_s(i$ik,flag);
});
_I(self,s$aql,function(self,_){
return _H(self,i$ik);
});
_I(self,s$aqm,function(self,_){
return _H(self,i$hq);
});
_I(self,s$aqn,function(self,_){
return _H(self,i$hr);
});
_I(self,s$aqo,function(self,_,size){
return self.$i_s(i$hq,size);
});
_I(self,s$aqp,function(self,_,size){
return self.$i_s(i$hr,size);
});
_I(self,s$aqq,function(self,_,mask){
});
self.$def(s$aqr,function(self,_,event,flag){
});
_I(self,s$fm,function(self,_){
return _H(self,i$ac);
});
_I(self,s$aqs,function(self,_,flag){
return self.$i_s(i$il,flag);
});
_I(self,s$aqt,function(self,_){
return _H(self,i$il);
});
_I(self,s$aqu,function(self,_,flag){
return self.$i_s(i$im,flag);
});
_I(self,s$aqv,function(self,_){
return _H(self,i$im);
});
_I(self,s$fp,function(self,_,event){
var point=_E(event,s$gq);
return (function($v){
if(($e = _E(_$ar, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'key_up');
}
else if(($e = _E(_$aq, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'key_down');
}
else if(($e = _E(_$ah, '===', $v),$e!==nil && $e!==false)){
var hit_test=_E(_H(self,i$ht),s$wk,point);
if(_A(ANDTEST(_E(hit_test,s$abc,_H(self,i$hs)),_E(hit_test,s$fa)))){
_E(self,s$aou,hit_test);
}
_E(self,s$apl,self);
if(_A(_E(hit_test,s$tn,event))){
return _E(hit_test,s$ei,event);
}
}
else if(($e = _E(_$aj, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'left_mouse_up');
}
else if(($e = _E(_$aa, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'left_mouse_dragged');
}
else if(($e = _E(_$ay, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'scroll_wheel');
}
else if(($e = _E(_$ak, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'right_mouse_down');
}
else if(($e = _E(_$al, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'right_mouse_up');
}
else if(($e = _E(_$an, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'right_mouse_dragged');
}
})(_E(event,s$fr));
});
_I(self,s$aqw,function(self,_){
return _H(self,i$in);
});
_I(self,s$aqx,function(self,_,controller){
return self.$i_s(i$in,controller);
});
_I(self,s$aqy,function(self,_){
return _H(self,i$io);
});
_I(self,s$aqz,function(self,_){
return _H(self,i$ip);
});
self.$def(s$ara,function(self,_,win,place){
});
_I(self,s$arb,function(self,_,win){
});
_I(self,s$arc,function(self,_){
return _H(self,i$iq);
});
_I(self,s$ard,function(self,_){
return _H(self,i$ir);
});
_I(self,s$are,function(self,_,win){
return self.$i_s(i$ir,win);
});
_I(self,s$arf,function(self,_){
return _H(self,i$is);
});
_I(self,s$arg,function(self,_,view){
return self.$i_s(i$it,view);
});
_I(self,s$arh,function(self,_){
return _H(self,i$it);
});
_I(self,s$ari,function(self,_,sender){
});
_I(self,s$arj,function(self,_,sender){
});
_I(self,s$ark,function(self,_,view){
});
_I(self,s$arl,function(self,_,view){
});
_I(self,s$arm,function(self,_,flag){
return self.$i_s(i$iu,flag);
});
_I(self,s$arn,function(self,_){
return _H(self,i$iu);
});
_I(self,s$aro,function(self,_){
});
_I(self,s$arp,function(self,_,toolbar){
if(_A(_E(_H(self,i$iv),s$ad,toolbar))){
return ;
}
self.$i_s(i$iv,toolbar);
return _E(_H(self,i$iv),s$fs,self);
});
_I(self,s$arq,function(self,_){
return _H(self,i$iv);
});
_I(self,s$arr,function(self,_,sender){
});
_I(self,s$ars,function(self,_,sender){
});
_I(self,s$art,function(self,_,show){
return _H(self,i$iw);
});
_I(self,s$aru,function(self,_){
return _H(self,i$iw);
});
})(_N(self,c$cb,self.$c_g_full(c$r)));
})(_K(c$b));
