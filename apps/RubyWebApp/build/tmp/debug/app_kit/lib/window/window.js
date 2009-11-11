
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$jk, 0, _$jl, _E((1),s$e,0), _$jh, _E((1),s$e,1), _$jj, _E((1),s$e,2), _$jm, _E((1),s$e,3), _$jn, _E((1),s$e,8), _$jo, _E((1),s$e,12), _$jp, 1, _$jq, 1, _$jr, 1, _$js, 1, _$jt, 1, _$ju, _E((1),s$e,4), _$jv, _E((1),s$e,6), _$hp, _E((1),s$e,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$t, 0, _$jw, 0, _$jx, 0, _$jy, 0, _$jz, 0, _$ka, 0, _$u, 0, _$kb, 0, _$kc, 0));
(function(self) {
_I(self,s$n,function(self,_,content_rect,style_mask){
return _E(self,s$aks,content_rect,style_mask);
});
self.$def(s$aks,function(self,_,content_rect,style_mask){
_E(self,s$qn);
self.$i_s(i$bp,_E(self.$klass.$c_g_full(c$ae),s$ap,0,0,0,0));
self.$i_s(i$hf,_E(self.$klass.$c_g_full(c$w),s$fc,self));
self.$i_s(i$gz,style_mask);
_E(self,s$akt,_$t);
self.$i_s(i$hg,_E(self.$klass.$c_g_full(c$ad),s$ap,0.0,0.0));
self.$i_s(i$hh,_E(self.$klass.$c_g_full(c$ad),s$ap,9999.0,9999.0));
self.$i_s(i$hi,self);
self.$i_s(i$q,self.$klass.$c_g_full(c$w));
_E(self,s$aku);
_E(self,s$w,content_rect);
_E(_H(self,i$hj),s$rp,true);
_E(self,s$acv,_E(self.$klass.$c_g_full(c$al),s$ap,_E(self.$klass.$c_g_full(c$ae),s$ap,0,0,_E(_H(self,i$bp),s$ae),_E(_H(self,i$bp),s$af))));
return self;
});
self.$def_s(s$qo,function(self,_,options,block){
var win=_E(_E(self,s$pu),s$aks,_E(options,s$j,_$gq),[_$jl,_$jh]);
if(_A(block)){
arguments[arguments.length -1](win);
}
return win;
});
_I(self,s$qn,function(self,_){
if(_A(_E(_E(self.$klass.$c_g_full(c$v),s$j,_$ae),s$ad,_$af))){
}
self.$i_s(i$b,_E(self.$klass.$c_g_full(c$e),s$ap,_$gs));
self.$i_s(i$bw,_E(self.$klass.$c_g_full(c$af),s$ap,_$gs));
_E(_H(self,i$b),s$e,_H(self,i$bw));
return _E(self.$klass.$c_g_full(c$c),s$e,_H(self,i$b));
});
_I(self,s$aku,function(self,_){
var view_class=_E(self,s$akv,_H(self,i$gz));
self.$i_s(i$hj,_E(view_class,s$ap,_E(self.$klass.$c_g_full(c$ae),s$ap,0,0,100,100),_H(self,i$gz)));
_E(_H(self,i$hj),s$rk,self);
_E(_H(self,i$hj),s$di,self);
_E(_H(self,i$b),s$e,_E(_H(self,i$hj),s$o));
_E(_H(self,i$hj),s$rm);
_E(_H(self,i$hj),s$rp,true);
_E(_E(_H(self,i$hj),s$o),s$f,_$ag,function(event){
var the_event=_E(self.$klass.$c_g_full(c$q),s$et,event,self,_$ah);
_E(self.$klass.$c_g_full(c$w),s$eu,the_event);
if(!_A(_E(the_event,s$fm))){
_E(the_event,s$fl);
}
});
return _E(_E(_H(self,i$hj),s$o),s$f,_$ai,function(event){
var the_event=_E(self.$klass.$c_g_full(c$q),s$et,event,self,_$aj);
_E(self.$klass.$c_g_full(c$w),s$eu,the_event);
if(!_A(_E(the_event,s$fm))){
_E(the_event,s$fl);
}
});
});
_I(self,s$akv,function(self,_,style_mask){
if(_A(_E(style_mask,s$es,_$jk))){
return self.$klass.$c_g_full(c$bq);
}
else if(_A(_E(style_mask,s$es,_$hp))){
return self.$klass.$c_g_full(c$bp);
}
else{
return self.$klass.$c_g_full(c$bo);
}
});
self.$def_s(s$akm,function(self,_,rect,style){
});
self.$def_s(s$akn,function(self,_,rect,style){
});
self.$def_s(s$ako,function(self,_,title,style){
});
_I(self,s$akp,function(self,_,rect){
});
_I(self,s$akq,function(self,_,rect){
return rect;
});
_I(self,s$wu,function(self,_){
return _H(self,i$ch);
});
_I(self,s$wv,function(self,_,str){
return self.$i_s(i$ch,str);
});
_I(self,s$akw,function(self,_,str){
});
_I(self,s$akx,function(self,_){
});
_I(self,s$aky,function(self,_){
});
_I(self,s$akz,function(self,_,filename){
});
_I(self,s$ala,function(self,_,filename){
});
_I(self,s$alb,function(self,_,flag){
return self.$i_s(i$hk,flag);
});
_I(self,s$alc,function(self,_){
return _H(self,i$hk);
});
_I(self,s$acv,function(self,_,view){
_E(view,s$rk,self);
var bounds=_E(self.$klass.$c_g_full(c$ae),s$ap,0,0,_E(_E(_H(self,i$bp),s$aa),s$ae),_E(_E(_H(self,i$bp),s$aa),s$af));
self.$i_s(i$en,view);
_E(_H(self,i$en),s$w,_E(self,s$akq,bounds));
_E(view,s$rm);
return _E(_H(self,i$hj),s$e,_H(self,i$en));
});
_I(self,s$acx,function(self,_){
return _H(self,i$en);
});
_I(self,s$e,function(self,_,view){
return _E(_H(self,i$en),s$e,view);
});
_I(self,s$fe,function(self,_,obj){
return self.$i_s(i$v,obj);
});
_I(self,s$mb,function(self,_){
});
_I(self,s$fq,function(self,_){
return _H(self,i$hf);
});
_I(self,s$ald,function(self,_){
return _H(self,i$gz);
});
_I(self,s$ale,function(self,_,mask){
return self.$i_s(i$gz,mask);
});
self.$def(s$alf,function(self,_,create_flag,obj){
});
_I(self,s$alg,function(self,_,obj){
});
_I(self,s$alh,function(self,_,size){
});
_I(self,s$ali,function(self,_,point){
});
_I(self,s$alj,function(self,_,point){
});
_I(self,s$sc,function(self,_){
return _H(self,i$bp);
});
_I(self,s$w,function(self,_,frame){
return _E(self,s$alk,frame,true,false);
});
self.$def(s$all,function(self,_,frame_rect,flag){
return _E(self,s$alk,frame_rect,flag,false);
});
self.$def(s$alk,function(self,_,frame_rect,flag,animate_flag){
if(_A(animate_flag)){
}
else{
var origin=_E(_H(self,i$bp),s$y);
var size=_E(_H(self,i$bp),s$aa);
var new_origin=_E(frame_rect,s$y);
var new_size=_E(frame_rect,s$aa);
if(!_A(_E(origin,s$kh,new_origin))){
_E(origin,s$jx,_E(new_origin,s$ab));
_E(origin,s$jy,_E(new_origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$n),s$cd),s$ck,'window did move',self);
}
if(!_A(_E(size,s$kh,new_size))){
_E(size,s$jz,_E(new_size,s$ae));
_E(size,s$ka,_E(new_size,s$af));
_E(_H(self,i$hj),s$sb,size);
_E(_H(self,i$b),s$z,size);
_E(_E(self.$klass.$c_g_full(c$n),s$cd),s$ck,'window did resize',self);
}
}
});
_I(self,s$sa,function(self,_,origin){
if(!_A(_E(origin,s$kh,_E(_H(self,i$bp),s$y)))){
_E(_E(_H(self,i$bp),s$y),s$jx,_E(origin,s$ab));
_E(_E(_H(self,i$bp),s$y),s$jy,_E(origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$n),s$cd),s$ck,'window did move',self);
}
});
_I(self,s$alm,function(self,_,new_frame){
});
_I(self,s$aln,function(self,_){
});
_I(self,s$alo,function(self,_,show){
return self.$i_s(i$hl,show);
});
_I(self,s$alp,function(self,_){
return _H(self,i$hl);
});
_I(self,s$alq,function(self,_,increments){
return self.$i_s(i$hm,increments);
});
_I(self,s$alr,function(self,_){
return _H(self,i$hm);
});
_I(self,s$als,function(self,_,ratio){
return self.$i_s(i$hn,ratio);
});
_I(self,s$alt,function(self,_){
return _H(self,i$hn);
});
_I(self,s$tf,function(self,_){
});
_I(self,s$alu,function(self,_){
return _H(self,i$ho);
});
_I(self,s$alv,function(self,_,flag){
return self.$i_s(i$ho,flag);
});
_I(self,s$alw,function(self,_){
});
_I(self,s$alx,function(self,_,responder){
if(_A(_E(_H(self,i$hi),s$ad,responder))){
return true;
}
if(!_A(_E(_H(self,i$hi),s$eg))){
return false;
}
if(_A(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(_E(responder,s$ee)),NOTTEST(_E(responder,s$ef)))))){
self.$i_s(i$hi,self);
_E(self,s$al,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$hi,responder);
return true;
});
_I(self,s$aly,function(self,_){
});
_I(self,s$alz,function(self,_){
});
_I(self,s$dz,function(self,_,the_event){
});
_I(self,s$ama,function(self,_){
});
_I(self,s$amb,function(self,_,flag){
return self.$i_s(i$hp,flag);
});
_I(self,s$amc,function(self,_){
return _H(self,i$hp);
});
_I(self,s$amd,function(self,_,sender){
});
_I(self,s$ame,function(self,_,sender){
});
_I(self,s$amf,function(self,_){
return _H(self,i$hq);
});
_I(self,s$amg,function(self,_,sender){
});
_I(self,s$amh,function(self,_){
return _H(self,i$hr);
});
self.$def(s$dk,function(self,_,action,object){
});
_I(self,s$lm,function(self,_,color){
return self.$i_s(i$ba,color);
});
_I(self,s$ln,function(self,_){
return _H(self,i$ba);
});
_I(self,s$ami,function(self,_,flag){
return self.$i_s(i$hs,flag);
});
_I(self,s$amj,function(self,_){
return _H(self,i$hs);
});
_I(self,s$amk,function(self,_,flag){
return _H(self,i$ht);
});
_I(self,s$aml,function(self,_){
return _H(self,i$ht);
});
_I(self,s$amm,function(self,_,flag){
return self.$i_s(i$hu,flag);
});
_I(self,s$amn,function(self,_){
return _H(self,i$hu);
});
_I(self,s$ke,function(self,_){
});
_I(self,s$amo,function(self,_,sender){
_E(self,s$amp,self);
_E(self,s$amq);
return _E(self,s$amr);
});
_I(self,s$amp,function(self,_,sender){
});
_I(self,s$ams,function(self,_,sender){
});
_I(self,s$amt,function(self,_,sender){
});
self.$def(s$amu,function(self,_,place,other_win){
});
_I(self,s$amv,function(self,_){
});
_I(self,s$amw,function(self,_,flag){
return self.$i_s(i$hv,flag);
});
_I(self,s$amx,function(self,_){
return _H(self,i$hv);
});
_I(self,s$amy,function(self,_){
return _H(self,i$hw);
});
_I(self,s$amz,function(self,_){
return _H(self,i$hx);
});
_I(self,s$ana,function(self,_){
return _H(self,i$hy);
});
_I(self,s$anb,function(self,_){
});
_I(self,s$anc,function(self,_){
});
_I(self,s$amq,function(self,_){
});
_I(self,s$amr,function(self,_){
});
_I(self,s$and,function(self,_){
});
_I(self,s$ane,function(self,_){
});
_I(self,s$anf,function(self,_){
});
_I(self,s$ang,function(self,_){
});
_I(self,s$anh,function(self,_){
});
_I(self,s$ani,function(self,_,point){
return _E(self.$klass.$c_g_full(c$y),s$ap,_E(_E(point,s$ab),s$km,_E(_H(self,i$bp),s$ab)),_E(_E(point,s$ac),s$km,_E(_H(self,i$bp),s$ac)));
});
_I(self,s$fw,function(self,_,point){
var res=_E(self.$klass.$c_g_full(c$y),s$ap,_E(_E(point,s$ab),s$mg,_E(_H(self,i$bp),s$ab)),_E(_E(point,s$ac),s$mg,_E(_H(self,i$bp),s$ac)));
return res;
});
_I(self,s$anj,function(self,_,sender){
});
_I(self,s$ank,function(self,_,sender){
});
_I(self,s$anl,function(self,_,sender){
});
_I(self,s$akt,function(self,_,level){
self.$i_s(i$hz,level);
return _E(_H(self,i$b),s$q,VN.$h(_$kd,_E(self.$klass.$c_g_full(c$br),s$j,level)));
});
_I(self,s$anm,function(self,_){
return _H(self,i$hz);
});
_I(self,s$ann,function(self,_,flag){
return self.$i_s(i$ia,flag);
});
_I(self,s$ano,function(self,_){
return _H(self,i$ia);
});
_I(self,s$anp,function(self,_){
return _H(self,i$hg);
});
_I(self,s$anq,function(self,_){
return _H(self,i$hh);
});
_I(self,s$anr,function(self,_,size){
return self.$i_s(i$hg,size);
});
_I(self,s$ans,function(self,_,size){
return self.$i_s(i$hh,size);
});
_I(self,s$ant,function(self,_,mask){
});
self.$def(s$anu,function(self,_,event,flag){
});
_I(self,s$eq,function(self,_){
return _H(self,i$aa);
});
_I(self,s$anv,function(self,_,flag){
return self.$i_s(i$ib,flag);
});
_I(self,s$anw,function(self,_){
return _H(self,i$ib);
});
_I(self,s$anx,function(self,_,flag){
return self.$i_s(i$ic,flag);
});
_I(self,s$any,function(self,_){
return _H(self,i$ic);
});
_I(self,s$eu,function(self,_,event){
var point=_E(event,s$fv);
return (function($v){
if(($e = _E(_$ar, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'key_up');
}
else if(($e = _E(_$aq, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'key_down');
}
else if(($e = _E(_$ah, '===', $v),$e!==nil && $e!==false)){
var hit_test=_E(_H(self,i$hj),s$tm,point);
if(_A(ANDTEST(_E(hit_test,s$ye,_H(self,i$hi)),_E(hit_test,s$ee)))){
_E(self,s$alx,hit_test);
}
_E(self,s$amo,self);
if(_A(_E(hit_test,s$qp,event))){
return _E(hit_test,s$dm,event);
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
})(_E(event,s$ew));
});
_I(self,s$anz,function(self,_){
return _H(self,i$id);
});
_I(self,s$aoa,function(self,_,controller){
return self.$i_s(i$id,controller);
});
_I(self,s$aob,function(self,_){
return _H(self,i$ie);
});
_I(self,s$aoc,function(self,_){
return _H(self,i$if);
});
self.$def(s$aod,function(self,_,win,place){
});
_I(self,s$aoe,function(self,_,win){
});
_I(self,s$aof,function(self,_){
return _H(self,i$ig);
});
_I(self,s$aog,function(self,_){
return _H(self,i$ih);
});
_I(self,s$aoh,function(self,_,win){
return self.$i_s(i$ih,win);
});
_I(self,s$aoi,function(self,_){
return _H(self,i$ii);
});
_I(self,s$aoj,function(self,_,view){
return self.$i_s(i$ij,view);
});
_I(self,s$aok,function(self,_){
return _H(self,i$ij);
});
_I(self,s$aol,function(self,_,sender){
});
_I(self,s$aom,function(self,_,sender){
});
_I(self,s$aon,function(self,_,view){
});
_I(self,s$aoo,function(self,_,view){
});
_I(self,s$aop,function(self,_,flag){
return self.$i_s(i$ik,flag);
});
_I(self,s$aoq,function(self,_){
return _H(self,i$ik);
});
_I(self,s$aor,function(self,_){
});
_I(self,s$aos,function(self,_,toolbar){
if(_A(_E(_H(self,i$il),s$ad,toolbar))){
return ;
}
self.$i_s(i$il,toolbar);
return _E(_H(self,i$il),s$ex,self);
});
_I(self,s$aot,function(self,_){
return _H(self,i$il);
});
_I(self,s$aou,function(self,_,sender){
});
_I(self,s$aov,function(self,_,sender){
});
_I(self,s$aow,function(self,_,show){
return _H(self,i$im);
});
_I(self,s$aox,function(self,_){
return _H(self,i$im);
});
})(_N(self,c$bs,self.$c_g_full(c$p)));
})(_K(c$b));
