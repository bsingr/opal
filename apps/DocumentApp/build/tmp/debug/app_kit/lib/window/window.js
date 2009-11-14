
VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/app_kit/lib/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/app_kit/lib/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/app_kit/lib/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/app_kit/lib/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$jt, 0, _$ju, _E((1),s$e,0), _$jq, _E((1),s$e,1), _$js, _E((1),s$e,2), _$jv, _E((1),s$e,3), _$jw, _E((1),s$e,8), _$jx, _E((1),s$e,12), _$jy, 1, _$jz, 1, _$ka, 1, _$kb, 1, _$kc, 1, _$kd, _E((1),s$e,4), _$ke, _E((1),s$e,6), _$hu, _E((1),s$e,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$t, 0, _$kf, 0, _$kg, 0, _$kh, 0, _$ki, 0, _$kj, 0, _$u, 0, _$kk, 0, _$kl, 0));
(function(self) {
_I(self,s$n,function(self,_,content_rect,style_mask){
return _E(self,s$aob,content_rect,style_mask);
});
self.$def(s$aob,function(self,_,content_rect,style_mask){
_E(self,s$tr);
self.$i_s(i$by,_E(self.$klass.$c_g_full(c$ag),s$as,0,0,0,0));
self.$i_s(i$hq,_E(self.$klass.$c_g_full(c$y),s$ga,self));
self.$i_s(i$hk,style_mask);
_E(self,s$aoc,_$t);
self.$i_s(i$hr,_E(self.$klass.$c_g_full(c$af),s$as,0.0,0.0));
self.$i_s(i$hs,_E(self.$klass.$c_g_full(c$af),s$as,9999.0,9999.0));
self.$i_s(i$ht,self);
self.$i_s(i$s,self.$klass.$c_g_full(c$y));
_E(self,s$aod);
_E(self,s$w,content_rect);
_E(_H(self,i$hu),s$us,true);
_E(self,s$agd,_E(self.$klass.$c_g_full(c$ap),s$as,_E(self.$klass.$c_g_full(c$ag),s$as,0,0,_E(_H(self,i$by),s$ae),_E(_H(self,i$by),s$af))));
return self;
});
self.$def_s(s$sh,function(self,_,options,block){
var win=_E(_E(self,s$sy),s$aob,_E(options,s$j,_$gp),[_$ju,_$jq]);
if(_A(block)){
arguments[arguments.length -1](win);
}
return win;
});
_I(self,s$tr,function(self,_){
if(_A(_E(_E(self.$klass.$c_g_full(c$x),s$j,_$ae),s$ad,_$af))){
}
self.$i_s(i$b,_E(self.$klass.$c_g_full(c$f),s$as,_$fu));
self.$i_s(i$cg,_E(self.$klass.$c_g_full(c$ah),s$as,_$fu));
_E(_H(self,i$b),s$e,_H(self,i$cg));
return _E(self.$klass.$c_g_full(c$c),s$e,_H(self,i$b));
});
_I(self,s$aod,function(self,_){
var view_class=_E(self,s$aoe,_H(self,i$hk));
self.$i_s(i$hu,_E(view_class,s$as,_E(self.$klass.$c_g_full(c$ag),s$as,0,0,100,100),_H(self,i$hk)));
_E(_H(self,i$hu),s$un,self);
_E(_H(self,i$hu),s$eh,self);
_E(_H(self,i$b),s$e,_E(_H(self,i$hu),s$o));
_E(_H(self,i$hu),s$up);
_E(_H(self,i$hu),s$us,true);
_E(_E(_H(self,i$hu),s$o),s$f,_$ag,function(event){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fr,event,self,_$ah);
_E(self.$klass.$c_g_full(c$y),s$fs,the_event);
if(!_A(_E(the_event,s$gk))){
}
});
return _E(_E(_H(self,i$hu),s$o),s$f,_$ai,function(event){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fr,event,self,_$aj);
_E(self.$klass.$c_g_full(c$y),s$fs,the_event);
if(!_A(_E(the_event,s$gk))){
}
});
});
_I(self,s$aoe,function(self,_,style_mask){
if(_A(_E(style_mask,s$ed,_$jt))){
return self.$klass.$c_g_full(c$ci);
}
else if(_A(_E(style_mask,s$ed,_$hu))){
return self.$klass.$c_g_full(c$ch);
}
else{
return self.$klass.$c_g_full(c$cg);
}
});
self.$def_s(s$ans,function(self,_,rect,style){
});
self.$def_s(s$ant,function(self,_,rect,style){
});
self.$def_s(s$anu,function(self,_,title,style){
});
_I(self,s$anv,function(self,_,rect){
});
_I(self,s$anw,function(self,_,rect){
return rect;
});
_I(self,s$aad,function(self,_){
return _H(self,i$cp);
});
_I(self,s$aae,function(self,_,str){
return self.$i_s(i$cp,str);
});
_I(self,s$aof,function(self,_,str){
});
_I(self,s$aog,function(self,_){
});
_I(self,s$aoh,function(self,_){
});
_I(self,s$aoi,function(self,_,filename){
});
_I(self,s$aoj,function(self,_,filename){
});
_I(self,s$aok,function(self,_,flag){
return self.$i_s(i$hv,flag);
});
_I(self,s$aol,function(self,_){
return _H(self,i$hv);
});
_I(self,s$agd,function(self,_,view){
if(_A(_H(self,i$ew))){
_E(_H(self,i$ew),s$ul);
}
_E(view,s$un,self);
var bounds=_E(self.$klass.$c_g_full(c$ag),s$as,0,0,_E(_E(_H(self,i$by),s$aa),s$ae),_E(_E(_H(self,i$by),s$aa),s$af));
self.$i_s(i$ew,view);
_E(_H(self,i$ew),s$w,_E(self,s$anw,bounds));
_E(_H(self,i$ew),s$ve,[_$ee,_$gx]);
_E(view,s$up);
return _E(_H(self,i$hu),s$e,_H(self,i$ew));
});
_I(self,s$agf,function(self,_){
return _H(self,i$ew);
});
_I(self,s$e,function(self,_,view){
return _E(_H(self,i$ew),s$e,view);
});
_I(self,s$gc,function(self,_,obj){
return self.$i_s(i$x,obj);
});
_I(self,s$ol,function(self,_){
});
_I(self,s$go,function(self,_){
return _H(self,i$hq);
});
_I(self,s$aom,function(self,_){
return _H(self,i$hk);
});
_I(self,s$aon,function(self,_,mask){
return self.$i_s(i$hk,mask);
});
self.$def(s$aoo,function(self,_,create_flag,obj){
});
_I(self,s$aop,function(self,_,obj){
});
_I(self,s$aoq,function(self,_,size){
});
_I(self,s$aor,function(self,_,point){
});
_I(self,s$aos,function(self,_,point){
});
_I(self,s$va,function(self,_){
return _H(self,i$by);
});
_I(self,s$w,function(self,_,frame){
return _E(self,s$aot,frame,true,false);
});
self.$def(s$aou,function(self,_,frame_rect,flag){
return _E(self,s$aot,frame_rect,flag,false);
});
self.$def(s$aot,function(self,_,frame_rect,flag,animate_flag){
if(_A(animate_flag)){
}
else{
var origin=_E(_H(self,i$by),s$y);
var size=_E(_H(self,i$by),s$aa);
var new_origin=_E(frame_rect,s$y);
var new_size=_E(frame_rect,s$aa);
if(!_A(_E(origin,s$mq,new_origin))){
_E(origin,s$mg,_E(new_origin,s$ab));
_E(origin,s$mh,_E(new_origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$o),s$cg),s$cn,'window did move',self);
}
if(!_A(_E(size,s$mq,new_size))){
_E(size,s$mi,_E(new_size,s$ae));
_E(size,s$mj,_E(new_size,s$af));
_E(_H(self,i$hu),s$vi,size);
_E(_H(self,i$b),s$z,size);
_E(_E(self.$klass.$c_g_full(c$o),s$cg),s$cn,'window did resize',self);
}
}
});
_I(self,s$vh,function(self,_,origin){
if(!_A(_E(origin,s$mq,_E(_H(self,i$by),s$y)))){
_E(_E(_H(self,i$by),s$y),s$mg,_E(origin,s$ab));
_E(_E(_H(self,i$by),s$y),s$mh,_E(origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$o),s$cg),s$cn,'window did move',self);
}
});
_I(self,s$aov,function(self,_,new_frame){
});
_I(self,s$aow,function(self,_){
});
_I(self,s$aox,function(self,_,show){
return self.$i_s(i$hw,show);
});
_I(self,s$aoy,function(self,_){
return _H(self,i$hw);
});
_I(self,s$aoz,function(self,_,increments){
return self.$i_s(i$hx,increments);
});
_I(self,s$apa,function(self,_){
return _H(self,i$hx);
});
_I(self,s$apb,function(self,_,ratio){
return self.$i_s(i$hy,ratio);
});
_I(self,s$apc,function(self,_){
return _H(self,i$hy);
});
_I(self,s$wl,function(self,_){
});
_I(self,s$apd,function(self,_){
return _H(self,i$hz);
});
_I(self,s$ape,function(self,_,flag){
return self.$i_s(i$hz,flag);
});
_I(self,s$apf,function(self,_){
});
_I(self,s$apg,function(self,_,responder){
if(_A(_E(_H(self,i$ht),s$ad,responder))){
return true;
}
if(!_A(_E(_H(self,i$ht),s$ff))){
return false;
}
if(_A(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(_E(responder,s$fd)),NOTTEST(_E(responder,s$fe)))))){
self.$i_s(i$ht,self);
_E(self,s$ao,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$ht,responder);
return true;
});
_I(self,s$aph,function(self,_){
});
_I(self,s$api,function(self,_){
});
_I(self,s$ey,function(self,_,the_event){
});
_I(self,s$apj,function(self,_){
});
_I(self,s$apk,function(self,_,flag){
return self.$i_s(i$ia,flag);
});
_I(self,s$apl,function(self,_){
return _H(self,i$ia);
});
_I(self,s$apm,function(self,_,sender){
});
_I(self,s$apn,function(self,_,sender){
});
_I(self,s$apo,function(self,_){
return _H(self,i$ib);
});
_I(self,s$app,function(self,_,sender){
});
_I(self,s$apq,function(self,_){
return _H(self,i$ic);
});
self.$def(s$ej,function(self,_,action,object){
});
_I(self,s$nt,function(self,_,color){
return self.$i_s(i$bc,color);
});
_I(self,s$nu,function(self,_){
return _H(self,i$bc);
});
_I(self,s$apr,function(self,_,flag){
return self.$i_s(i$id,flag);
});
_I(self,s$aps,function(self,_){
return _H(self,i$id);
});
_I(self,s$apt,function(self,_,flag){
return _H(self,i$ie);
});
_I(self,s$apu,function(self,_){
return _H(self,i$ie);
});
_I(self,s$apv,function(self,_,flag){
return self.$i_s(i$if,flag);
});
_I(self,s$apw,function(self,_){
return _H(self,i$if);
});
_I(self,s$mn,function(self,_){
});
_I(self,s$apx,function(self,_,sender){
_E(self,s$apy,self);
_E(self,s$apz);
return _E(self,s$aqa);
});
_I(self,s$apy,function(self,_,sender){
});
_I(self,s$aqb,function(self,_,sender){
});
_I(self,s$aqc,function(self,_,sender){
});
self.$def(s$aqd,function(self,_,place,other_win){
});
_I(self,s$aqe,function(self,_){
});
_I(self,s$aqf,function(self,_,flag){
return self.$i_s(i$ig,flag);
});
_I(self,s$aqg,function(self,_){
return _H(self,i$ig);
});
_I(self,s$aqh,function(self,_){
return _H(self,i$ih);
});
_I(self,s$aqi,function(self,_){
return _H(self,i$ii);
});
_I(self,s$aqj,function(self,_){
return _H(self,i$ij);
});
_I(self,s$aqk,function(self,_){
});
_I(self,s$aql,function(self,_){
});
_I(self,s$apz,function(self,_){
});
_I(self,s$aqa,function(self,_){
});
_I(self,s$aqm,function(self,_){
});
_I(self,s$aqn,function(self,_){
});
_I(self,s$aqo,function(self,_){
});
_I(self,s$aqp,function(self,_){
});
_I(self,s$aqq,function(self,_){
});
_I(self,s$aqr,function(self,_,point){
return _E(self.$klass.$c_g_full(c$aa),s$as,_E(_E(point,s$ab),s$ef,_E(_H(self,i$by),s$ab)),_E(_E(point,s$ac),s$ef,_E(_H(self,i$by),s$ac)));
});
_I(self,s$gu,function(self,_,point){
var res=_E(self.$klass.$c_g_full(c$aa),s$as,_E(_E(point,s$ab),s$ea,_E(_H(self,i$by),s$ab)),_E(_E(point,s$ac),s$ea,_E(_H(self,i$by),s$ac)));
return res;
});
_I(self,s$aqs,function(self,_,sender){
});
_I(self,s$aqt,function(self,_,sender){
});
_I(self,s$aqu,function(self,_,sender){
});
_I(self,s$aoc,function(self,_,level){
self.$i_s(i$ik,level);
return _E(_H(self,i$b),s$q,VN.$h(_$iu,_E(self.$klass.$c_g_full(c$cj),s$j,level)));
});
_I(self,s$aqv,function(self,_){
return _H(self,i$ik);
});
_I(self,s$aqw,function(self,_,flag){
return self.$i_s(i$il,flag);
});
_I(self,s$aqx,function(self,_){
return _H(self,i$il);
});
_I(self,s$aqy,function(self,_){
return _H(self,i$hr);
});
_I(self,s$aqz,function(self,_){
return _H(self,i$hs);
});
_I(self,s$ara,function(self,_,size){
return self.$i_s(i$hr,size);
});
_I(self,s$arb,function(self,_,size){
return self.$i_s(i$hs,size);
});
_I(self,s$arc,function(self,_,mask){
});
self.$def(s$ard,function(self,_,event,flag){
});
_I(self,s$fp,function(self,_){
return _H(self,i$ac);
});
_I(self,s$are,function(self,_,flag){
return self.$i_s(i$im,flag);
});
_I(self,s$arf,function(self,_){
return _H(self,i$im);
});
_I(self,s$arg,function(self,_,flag){
return self.$i_s(i$in,flag);
});
_I(self,s$arh,function(self,_){
return _H(self,i$in);
});
_I(self,s$fs,function(self,_,event){
var point=_E(event,s$gt);
return (function($v){
if(($e = _E(_$ar, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'key_up');
}
else if(($e = _E(_$aq, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'key_down');
}
else if(($e = _E(_$ah, '===', $v),$e!==nil && $e!==false)){
var hit_test=_E(_H(self,i$hu),s$ws,point);
if(_A(ANDTEST(_E(hit_test,s$abn,_H(self,i$ht)),_E(hit_test,s$fd)))){
_E(self,s$apg,hit_test);
}
_E(self,s$apx,self);
if(_A(_E(hit_test,s$tv,event))){
return _E(hit_test,s$el,event);
}
}
else if(($e = _E(_$aj, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'left_mouse_up');
}
else if(($e = _E(_$aa, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'left_mouse_dragged');
}
else if(($e = _E(_$ay, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'scroll_wheel');
}
else if(($e = _E(_$ak, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'right_mouse_down');
}
else if(($e = _E(_$al, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'right_mouse_up');
}
else if(($e = _E(_$an, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$ao,'right_mouse_dragged');
}
})(_E(event,s$fu));
});
_I(self,s$ari,function(self,_){
return _H(self,i$io);
});
_I(self,s$arj,function(self,_,controller){
return self.$i_s(i$io,controller);
});
_I(self,s$ark,function(self,_){
return _H(self,i$ip);
});
_I(self,s$arl,function(self,_){
return _H(self,i$iq);
});
self.$def(s$arm,function(self,_,win,place){
});
_I(self,s$arn,function(self,_,win){
});
_I(self,s$aro,function(self,_){
return _H(self,i$ir);
});
_I(self,s$arp,function(self,_){
return _H(self,i$is);
});
_I(self,s$arq,function(self,_,win){
return self.$i_s(i$is,win);
});
_I(self,s$arr,function(self,_){
return _H(self,i$it);
});
_I(self,s$ars,function(self,_,view){
return self.$i_s(i$iu,view);
});
_I(self,s$art,function(self,_){
return _H(self,i$iu);
});
_I(self,s$aru,function(self,_,sender){
});
_I(self,s$arv,function(self,_,sender){
});
_I(self,s$arw,function(self,_,view){
});
_I(self,s$arx,function(self,_,view){
});
_I(self,s$ary,function(self,_,flag){
return self.$i_s(i$iv,flag);
});
_I(self,s$arz,function(self,_){
return _H(self,i$iv);
});
_I(self,s$asa,function(self,_){
});
_I(self,s$asb,function(self,_,toolbar){
if(_A(_E(_H(self,i$iw),s$ad,toolbar))){
return ;
}
self.$i_s(i$iw,toolbar);
return _E(_H(self,i$iw),s$fv,self);
});
_I(self,s$asc,function(self,_){
return _H(self,i$iw);
});
_I(self,s$asd,function(self,_,sender){
});
_I(self,s$ase,function(self,_,sender){
});
_I(self,s$asf,function(self,_,show){
return _H(self,i$ix);
});
_I(self,s$asg,function(self,_){
return _H(self,i$ix);
});
})(_N(self,c$ck,self.$c_g_full(c$r)));
})(_K(c$b));
