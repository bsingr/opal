
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$iv, 0, _$iw, _E((1),s$e,0), _$it, _E((1),s$e,1), _$iu, _E((1),s$e,2), _$ix, _E((1),s$e,3), _$iy, _E((1),s$e,8), _$iz, _E((1),s$e,12), _$ja, 1, _$jb, 1, _$jc, 1, _$jd, 1, _$je, 1, _$jf, _E((1),s$e,4), _$jg, _E((1),s$e,6), _$hc, _E((1),s$e,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$t, 0, _$jh, 0, _$ji, 0, _$jj, 0, _$jk, 0, _$jl, 0, _$u, 0, _$jm, 0, _$jn, 0));
(function(self) {
_I(self,s$n,function(self,_,content_rect,style_mask){
return _E(self,s$agj,content_rect,style_mask);
});
self.$def(s$agj,function(self,_,content_rect,style_mask){
_E(self,s$lu);
self.$i_s(i$bb,_E(self.$klass.$c_g_full(c$ad),s$ap,0,0,0,0));
self.$i_s(i$gt,_E(self.$klass.$c_g_full(c$v),s$ei,self));
self.$i_s(i$gn,style_mask);
_E(self,s$agk,_$t);
self.$i_s(i$gu,_E(self.$klass.$c_g_full(c$ac),s$ap,0.0,0.0));
self.$i_s(i$gv,_E(self.$klass.$c_g_full(c$ac),s$ap,9999.0,9999.0));
self.$i_s(i$gw,self);
self.$i_s(i$o,self.$klass.$c_g_full(c$v));
_E(self,s$agl);
_E(self,s$w,content_rect);
_E(_H(self,i$gx),s$mw,true);
_E(self,s$ym,_E(self.$klass.$c_g_full(c$ai),s$ap,_E(self.$klass.$c_g_full(c$ad),s$ap,0,0,_E(_H(self,i$bb),s$ae),_E(_H(self,i$bb),s$af))));
return self;
});
self.$def_s(s$lv,function(self,_,options,block){
var win=_E(_E(self,s$agm),s$agj,_E(options,s$j,_$gc),[_$iw,_$it]);
if(_A(block)){
arguments[arguments.length -1](win);
}
return win;
});
_I(self,s$lu,function(self,_){
if(_A(_E(_E(self.$klass.$c_g_full(c$u),s$j,_$ae),s$ad,_$af))){
}
self.$i_s(i$b,_E(self.$klass.$c_g_full(c$e),s$ap,_$ge));
self.$i_s(i$bi,_E(self.$klass.$c_g_full(c$ae),s$ap,_$ge));
_E(_H(self,i$b),s$e,_H(self,i$bi));
return _E(self.$klass.$c_g_full(c$c),s$e,_H(self,i$b));
});
_I(self,s$agl,function(self,_){
var view_class=_E(self,s$agn,_H(self,i$gn));
self.$i_s(i$gx,_E(view_class,s$ap,_E(self.$klass.$c_g_full(c$ad),s$ap,0,0,100,100),_H(self,i$gn)));
_E(_H(self,i$gx),s$mr,self);
_E(_H(self,i$gx),s$co,self);
_E(_H(self,i$b),s$e,_E(_H(self,i$gx),s$o));
_E(_H(self,i$gx),s$mt);
_E(_H(self,i$gx),s$mw,true);
_E(_E(_H(self,i$gx),s$o),s$f,_$ag,function(event){
var the_event=_E(self.$klass.$c_g_full(c$p),s$dz,event,self,_$ah);
_E(self.$klass.$c_g_full(c$v),s$ea,the_event);
if(!_A(_E(the_event,s$es))){
_E(the_event,s$er);
}
});
return _E(_E(_H(self,i$gx),s$o),s$f,_$ai,function(event){
var the_event=_E(self.$klass.$c_g_full(c$p),s$dz,event,self,_$aj);
_E(self.$klass.$c_g_full(c$v),s$ea,the_event);
if(!_A(_E(the_event,s$es))){
_E(the_event,s$er);
}
});
});
_I(self,s$agn,function(self,_,style_mask){
if(_A(_E(style_mask,s$dy,_$iv))){
return self.$klass.$c_g_full(c$bn);
}
else if(_A(_E(style_mask,s$dy,_$hc))){
return self.$klass.$c_g_full(c$bm);
}
else{
return self.$klass.$c_g_full(c$bl);
}
});
self.$def_s(s$age,function(self,_,rect,style){
});
self.$def_s(s$agf,function(self,_,rect,style){
});
self.$def_s(s$agg,function(self,_,title,style){
});
_I(self,s$agh,function(self,_,rect){
});
_I(self,s$agi,function(self,_,rect){
return rect;
});
_I(self,s$sb,function(self,_){
return _H(self,i$bt);
});
_I(self,s$sc,function(self,_,str){
return self.$i_s(i$bt,str);
});
_I(self,s$ago,function(self,_,str){
});
_I(self,s$agp,function(self,_){
});
_I(self,s$agq,function(self,_){
});
_I(self,s$agr,function(self,_,filename){
});
_I(self,s$ags,function(self,_,filename){
});
_I(self,s$agt,function(self,_,flag){
return self.$i_s(i$gy,flag);
});
_I(self,s$agu,function(self,_){
return _H(self,i$gy);
});
_I(self,s$ym,function(self,_,view){
_E(view,s$mr,self);
var bounds=_E(self.$klass.$c_g_full(c$ad),s$ap,0,0,_E(_E(_H(self,i$bb),s$aa),s$ae),_E(_E(_H(self,i$bb),s$aa),s$af));
self.$i_s(i$eb,view);
_E(_H(self,i$eb),s$w,_E(self,s$agi,bounds));
_E(view,s$mt);
return _E(_H(self,i$gx),s$e,_H(self,i$eb));
});
_I(self,s$yo,function(self,_){
return _H(self,i$eb);
});
_I(self,s$e,function(self,_,view){
return _E(_H(self,i$eb),s$e,view);
});
_I(self,s$ek,function(self,_,obj){
return self.$i_s(i$t,obj);
});
_I(self,s$lh,function(self,_){
});
_I(self,s$ew,function(self,_){
return _H(self,i$gt);
});
_I(self,s$agv,function(self,_){
return _H(self,i$gn);
});
_I(self,s$agw,function(self,_,mask){
return self.$i_s(i$gn,mask);
});
self.$def(s$agx,function(self,_,create_flag,obj){
});
_I(self,s$agy,function(self,_,obj){
});
_I(self,s$agz,function(self,_,size){
});
_I(self,s$aha,function(self,_,point){
});
_I(self,s$ahb,function(self,_,point){
});
_I(self,s$nj,function(self,_){
return _H(self,i$bb);
});
_I(self,s$w,function(self,_,frame){
return _E(self,s$ahc,frame,true,false);
});
self.$def(s$ahd,function(self,_,frame_rect,flag){
return _E(self,s$ahc,frame_rect,flag,false);
});
self.$def(s$ahc,function(self,_,frame_rect,flag,animate_flag){
if(_A(animate_flag)){
}
else{
var origin=_E(_H(self,i$bb),s$y);
var size=_E(_H(self,i$bb),s$aa);
var new_origin=_E(frame_rect,s$y);
var new_size=_E(frame_rect,s$aa);
if(!_A(_E(origin,s$jo,new_origin))){
_E(origin,s$je,_E(new_origin,s$ab));
_E(origin,s$jf,_E(new_origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$n),s$cd),s$ck,'window did move',self);
}
if(!_A(_E(size,s$jo,new_size))){
_E(size,s$jg,_E(new_size,s$ae));
_E(size,s$jh,_E(new_size,s$af));
_E(_H(self,i$gx),s$ni,size);
_E(_H(self,i$b),s$z,size);
_E(_E(self.$klass.$c_g_full(c$n),s$cd),s$ck,'window did resize',self);
}
}
});
_I(self,s$nh,function(self,_,origin){
if(!_A(_E(origin,s$jo,_E(_H(self,i$bb),s$y)))){
_E(_E(_H(self,i$bb),s$y),s$je,_E(origin,s$ab));
_E(_E(_H(self,i$bb),s$y),s$jf,_E(origin,s$ac));
_E(_H(self,i$b),s$x,origin);
_E(_E(self.$klass.$c_g_full(c$n),s$cd),s$ck,'window did move',self);
}
});
_I(self,s$ahe,function(self,_,new_frame){
});
_I(self,s$ahf,function(self,_){
});
_I(self,s$ahg,function(self,_,show){
return self.$i_s(i$gz,show);
});
_I(self,s$ahh,function(self,_){
return _H(self,i$gz);
});
_I(self,s$ahi,function(self,_,increments){
return self.$i_s(i$ha,increments);
});
_I(self,s$ahj,function(self,_){
return _H(self,i$ha);
});
_I(self,s$ahk,function(self,_,ratio){
return self.$i_s(i$hb,ratio);
});
_I(self,s$ahl,function(self,_){
return _H(self,i$hb);
});
_I(self,s$on,function(self,_){
});
_I(self,s$ahm,function(self,_){
return _H(self,i$hc);
});
_I(self,s$ahn,function(self,_,flag){
return self.$i_s(i$hc,flag);
});
_I(self,s$aho,function(self,_){
});
_I(self,s$ahp,function(self,_,responder){
if(_A(_E(_H(self,i$gw),s$ad,responder))){
return true;
}
if(!_A(_E(_H(self,i$gw),s$dm))){
return false;
}
if(_A(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(_E(responder,s$dk)),NOTTEST(_E(responder,s$dl)))))){
self.$i_s(i$gw,self);
_E(self,s$al,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$gw,responder);
return true;
});
_I(self,s$ahq,function(self,_){
});
_I(self,s$ahr,function(self,_){
});
_I(self,s$df,function(self,_,the_event){
});
_I(self,s$ahs,function(self,_){
});
_I(self,s$aht,function(self,_,flag){
return self.$i_s(i$hd,flag);
});
_I(self,s$ahu,function(self,_){
return _H(self,i$hd);
});
_I(self,s$ahv,function(self,_,sender){
});
_I(self,s$ahw,function(self,_,sender){
});
_I(self,s$ahx,function(self,_){
return _H(self,i$he);
});
_I(self,s$ahy,function(self,_,sender){
});
_I(self,s$ahz,function(self,_){
return _H(self,i$hf);
});
self.$def(s$cq,function(self,_,action,object){
});
_I(self,s$kt,function(self,_,color){
return self.$i_s(i$ay,color);
});
_I(self,s$ku,function(self,_){
return _H(self,i$ay);
});
_I(self,s$aia,function(self,_,flag){
return self.$i_s(i$hg,flag);
});
_I(self,s$aib,function(self,_){
return _H(self,i$hg);
});
_I(self,s$aic,function(self,_,flag){
return _H(self,i$hh);
});
_I(self,s$aid,function(self,_){
return _H(self,i$hh);
});
_I(self,s$aie,function(self,_,flag){
return self.$i_s(i$hi,flag);
});
_I(self,s$aif,function(self,_){
return _H(self,i$hi);
});
_I(self,s$jl,function(self,_){
});
_I(self,s$aig,function(self,_,sender){
_E(self,s$aih,self);
_E(self,s$aii);
return _E(self,s$aij);
});
_I(self,s$aih,function(self,_,sender){
});
_I(self,s$aik,function(self,_,sender){
});
_I(self,s$ail,function(self,_,sender){
});
self.$def(s$aim,function(self,_,place,other_win){
});
_I(self,s$ain,function(self,_){
});
_I(self,s$aio,function(self,_,flag){
return self.$i_s(i$hj,flag);
});
_I(self,s$aip,function(self,_){
return _H(self,i$hj);
});
_I(self,s$aiq,function(self,_){
return _H(self,i$hk);
});
_I(self,s$air,function(self,_){
return _H(self,i$hl);
});
_I(self,s$ais,function(self,_){
return _H(self,i$hm);
});
_I(self,s$ait,function(self,_){
});
_I(self,s$aiu,function(self,_){
});
_I(self,s$aii,function(self,_){
});
_I(self,s$aij,function(self,_){
});
_I(self,s$aiv,function(self,_){
});
_I(self,s$aiw,function(self,_){
});
_I(self,s$aix,function(self,_){
});
_I(self,s$aiy,function(self,_){
});
_I(self,s$aiz,function(self,_){
});
_I(self,s$aja,function(self,_,point){
return _E(self.$klass.$c_g_full(c$x),s$ap,_E(_E(point,s$ab),s$jt,_E(_H(self,i$bb),s$ab)),_E(_E(point,s$ac),s$jt,_E(_H(self,i$bb),s$ac)));
});
_I(self,s$fc,function(self,_,point){
var res=_E(self.$klass.$c_g_full(c$x),s$ap,_E(_E(point,s$ab),s$ob,_E(_H(self,i$bb),s$ab)),_E(_E(point,s$ac),s$ob,_E(_H(self,i$bb),s$ac)));
return res;
});
_I(self,s$ajb,function(self,_,sender){
});
_I(self,s$ajc,function(self,_,sender){
});
_I(self,s$ajd,function(self,_,sender){
});
_I(self,s$agk,function(self,_,level){
self.$i_s(i$hn,level);
return _E(_H(self,i$b),s$q,VN.$h(_$jo,_E(self.$klass.$c_g_full(c$bo),s$j,level)));
});
_I(self,s$aje,function(self,_){
return _H(self,i$hn);
});
_I(self,s$ajf,function(self,_,flag){
return self.$i_s(i$ho,flag);
});
_I(self,s$ajg,function(self,_){
return _H(self,i$ho);
});
_I(self,s$ajh,function(self,_){
return _H(self,i$gu);
});
_I(self,s$aji,function(self,_){
return _H(self,i$gv);
});
_I(self,s$ajj,function(self,_,size){
return self.$i_s(i$gu,size);
});
_I(self,s$ajk,function(self,_,size){
return self.$i_s(i$gv,size);
});
_I(self,s$ajl,function(self,_,mask){
});
self.$def(s$ajm,function(self,_,event,flag){
});
_I(self,s$dw,function(self,_){
return _H(self,i$y);
});
_I(self,s$ajn,function(self,_,flag){
return self.$i_s(i$hp,flag);
});
_I(self,s$ajo,function(self,_){
return _H(self,i$hp);
});
_I(self,s$ajp,function(self,_,flag){
return self.$i_s(i$hq,flag);
});
_I(self,s$ajq,function(self,_){
return _H(self,i$hq);
});
_I(self,s$ea,function(self,_,event){
var point=_E(event,s$fb);
return (function($v){
if(($e = _E(_$ar, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'key_up');
}
else if(($e = _E(_$aq, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$al,'key_down');
}
else if(($e = _E(_$ah, '===', $v),$e!==nil && $e!==false)){
var hit_test=_E(_H(self,i$gx),s$ou,point);
if(_A(ANDTEST(_E(hit_test,s$tm,_H(self,i$gw)),_E(hit_test,s$dk)))){
_E(self,s$ahp,hit_test);
}
_E(self,s$aig,self);
if(_A(_E(hit_test,s$lw,event))){
return _E(hit_test,s$cs,event);
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
})(_E(event,s$ec));
});
_I(self,s$ajr,function(self,_){
return _H(self,i$hr);
});
_I(self,s$ajs,function(self,_,controller){
return self.$i_s(i$hr,controller);
});
_I(self,s$ajt,function(self,_){
return _H(self,i$hs);
});
_I(self,s$aju,function(self,_){
return _H(self,i$ht);
});
self.$def(s$ajv,function(self,_,win,place){
});
_I(self,s$ajw,function(self,_,win){
});
_I(self,s$ajx,function(self,_){
return _H(self,i$hu);
});
_I(self,s$ajy,function(self,_){
return _H(self,i$hv);
});
_I(self,s$ajz,function(self,_,win){
return self.$i_s(i$hv,win);
});
_I(self,s$aka,function(self,_){
return _H(self,i$hw);
});
_I(self,s$akb,function(self,_,view){
return self.$i_s(i$hx,view);
});
_I(self,s$akc,function(self,_){
return _H(self,i$hx);
});
_I(self,s$akd,function(self,_,sender){
});
_I(self,s$ake,function(self,_,sender){
});
_I(self,s$akf,function(self,_,view){
});
_I(self,s$akg,function(self,_,view){
});
_I(self,s$akh,function(self,_,flag){
return self.$i_s(i$hy,flag);
});
_I(self,s$aki,function(self,_){
return _H(self,i$hy);
});
_I(self,s$akj,function(self,_){
});
_I(self,s$akk,function(self,_,toolbar){
return self.$i_s(i$hz,toolbar);
});
_I(self,s$akl,function(self,_){
return _H(self,i$hz);
});
_I(self,s$akm,function(self,_,sender){
});
_I(self,s$akn,function(self,_,sender){
});
_I(self,s$ako,function(self,_,show){
return _H(self,i$ia);
});
_I(self,s$akp,function(self,_){
return _H(self,i$ia);
});
})(_N(self,c$bp,self.$c_g_full(c$o)));
})(_K(c$b));
