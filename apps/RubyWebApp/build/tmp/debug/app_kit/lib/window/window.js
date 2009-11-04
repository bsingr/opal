
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$iq, 0, _$ir, rb_funcall((1),s$e,0), _$io, rb_funcall((1),s$e,1), _$ip, rb_funcall((1),s$e,2), _$is, rb_funcall((1),s$e,3), _$it, rb_funcall((1),s$e,8), _$iu, rb_funcall((1),s$e,12), _$iv, 1, _$iw, 1, _$ix, 1, _$iy, 1, _$iz, 1, _$ja, rb_funcall((1),s$e,4), _$jb, rb_funcall((1),s$e,6), _$gw, rb_funcall((1),s$e,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$u, 0, _$jc, 0, _$jd, 0, _$je, 0, _$jf, 0, _$jg, 0, _$v, 0, _$jh, 0, _$ji, 0));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,content_rect,style_mask){
return rb_funcall(self,s$aep,content_rect,style_mask);
});
self.$def(s$aep,function(self,_cmd,content_rect,style_mask){
rb_funcall(self, s$jz);
self.$i_s(i$bb,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0));
self.$i_s(i$gt,rb_funcall(self.$klass.$c_g_full(c$m),s$eg,self));
self.$i_s(i$gn,style_mask);
rb_funcall(self,'level=',_$u);
self.$i_s(i$gu,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,0.0,0.0));
self.$i_s(i$gv,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,9999.0,9999.0));
self.$i_s(i$gw,self);
self.$i_s(i$o,self.$klass.$c_g_full(c$m));
rb_funcall(self,s$aeq);
rb_funcall(self,'frame=',content_rect);
rb_funcall(rb_ivar_get(self, i$gx),'needs_display=',true);
rb_funcall(self,'content_view=',rb_funcall(self.$klass.$c_g_full(c$x),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bb),s$ac),rb_funcall(rb_ivar_get(self, i$bb),s$ad))));
return self;
});
self.$def_s(s$ka,function(self,_cmd,options,block){
var win = rb_funcall(rb_funcall(self,s$aer),s$aep,rb_funcall(options,s$h,_$fv),[_$ir,_$io]);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
rb_define_method(self,s$jz,function(self,_cmd){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full(c$l),s$h,_$af),s$ab,_$ag))){
}
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$s),s$ao,_$fy));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$r),s$ao,_$fy));
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_ivar_get(self, i$bi));
return rb_funcall(self.$klass.$c_g_full(c$c),s$e,rb_ivar_get(self, i$b));
});
rb_define_method(self,s$aeq,function(self,_cmd){
var view_class = rb_funcall(self,s$aes,rb_ivar_get(self, i$gn));
self.$i_s(i$gx,rb_funcall(view_class,s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,100,100),rb_ivar_get(self, i$gn)));
rb_funcall(rb_ivar_get(self, i$gx),s$kw,self);
rb_funcall(rb_ivar_get(self, i$gx),'next_responder=',self);
rb_funcall(rb_ivar_get(self, i$b),s$e,rb_funcall(rb_ivar_get(self, i$gx),s$m));
rb_funcall(rb_ivar_get(self, i$gx),s$ky);
rb_funcall(rb_ivar_get(self, i$gx),'needs_display=',true);
rb_funcall(rb_funcall(rb_ivar_get(self, i$gx),s$m),s$f,_$ah,function(event){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,event,self,'left_mouse_down');
rb_funcall(self.$klass.$c_g_full(c$m),s$dz,the_event);
if(!RTEST(rb_funcall(the_event,s$eq))){
rb_funcall(the_event,s$ep);
}
});
return rb_funcall(rb_funcall(rb_ivar_get(self, i$gx),s$m),s$f,_$ai,function(event){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,event,self,'left_mouse_up');
rb_funcall(self.$klass.$c_g_full(c$m),s$dz,the_event);
if(!RTEST(rb_funcall(the_event,s$eq))){
rb_funcall(the_event,s$ep);
}
});
});
rb_define_method(self,s$aes,function(self,_cmd,style_mask){
if(RTEST(rb_funcall(style_mask,s$dx,_$iq))){
return self.$klass.$c_g_full(c$av);
}
else if(RTEST(rb_funcall(style_mask,s$dx,_$gw))){
return self.$klass.$c_g_full(c$aw);
}
else{
return self.$klass.$c_g_full(c$ax);
}
});
self.$def_s(s$aek,function(self,_cmd,rect,style){
});
self.$def_s(s$ael,function(self,_cmd,rect,style){
});
self.$def_s(s$aem,function(self,_cmd,title,style){
});
rb_define_method(self,s$aen,function(self,_cmd,rect){
});
rb_define_method(self,s$aeo,function(self,_cmd,rect){
return rect;
});
rb_define_method(self,s$qh,function(self,_cmd){
return rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$aet,function(self,_cmd,str){
});
rb_define_method(self,s$aeu,function(self,_cmd){
});
rb_define_method(self,s$aev,function(self,_cmd){
});
rb_define_method(self,s$aew,function(self,_cmd,filename){
});
rb_define_method(self,s$aex,function(self,_cmd,filename){
});
rb_define_method(self,s$aey,function(self,_cmd,flag){
return self.$i_s(i$gy,flag);
});
rb_define_method(self,s$aez,function(self,_cmd){
return rb_ivar_get(self, i$gy);
});
rb_define_method(self,s$ws,function(self,_cmd,view){
rb_funcall(view,s$kw,self);
var bounds = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$w),s$ac),rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$w),s$ad));
self.$i_s(i$eb,view);
rb_funcall(rb_ivar_get(self, i$eb),'frame=',rb_funcall(self,s$aeo,bounds));
rb_funcall(view,s$ky);
return rb_funcall(rb_ivar_get(self, i$gx),s$e,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$wu,function(self,_cmd){
return rb_ivar_get(self, i$eb);
});
rb_define_method(self,s$e,function(self,_cmd,view){
return rb_funcall(rb_ivar_get(self, i$eb),s$e,view);
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
return self.$i_s(i$t,obj);
});
rb_define_method(self,s$jm,function(self,_cmd){
});
rb_define_method(self,s$ev,function(self,_cmd){
return rb_ivar_get(self, i$gt);
});
rb_define_method(self,s$afa,function(self,_cmd){
return rb_ivar_get(self, i$gn);
});
rb_define_method(self,s$afb,function(self,_cmd,mask){
return self.$i_s(i$gn,mask);
});
self.$def(s$afc,function(self,_cmd,create_flag,obj){
});
rb_define_method(self,s$afd,function(self,_cmd,obj){
});
rb_define_method(self,s$afe,function(self,_cmd,size){
});
rb_define_method(self,s$aff,function(self,_cmd,point){
});
rb_define_method(self,s$afg,function(self,_cmd,point){
});
rb_define_method(self,s$ln,function(self,_cmd){
return rb_ivar_get(self, i$bb);
});
rb_define_method(self,s$u,function(self,_cmd,frame){
return rb_funcall(self,s$afh,frame,true,false);
});
self.$def(s$afi,function(self,_cmd,frame_rect,flag){
return rb_funcall(self,s$afh,frame_rect,flag,false);
});
self.$def(s$afh,function(self,_cmd,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin = rb_funcall(rb_ivar_get(self, i$bb),s$v);
var size = rb_funcall(rb_ivar_get(self, i$bb),s$w);
var new_origin = rb_funcall(frame_rect,s$v);
var new_size = rb_funcall(frame_rect,s$w);
if(!RTEST(rb_funcall(origin,s$ht,new_origin))){
rb_funcall(origin,'x=',rb_funcall(new_origin,s$y));
rb_funcall(origin,'y=',rb_funcall(new_origin,s$z));
rb_funcall(rb_ivar_get(self, i$b),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$n),s$cc),s$cj,'window did move',self);
}
if(!RTEST(rb_funcall(size,s$ht,new_size))){
rb_funcall(size,'width=',rb_funcall(new_size,s$ac));
rb_funcall(size,'height=',rb_funcall(new_size,s$ad));
rb_funcall(rb_ivar_get(self, i$gx),'frame_size=',size);
rb_funcall(rb_ivar_get(self, i$b),'size=',size);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$n),s$cc),s$cj,'window did resize',self);
}
}
});
rb_define_method(self,s$ll,function(self,_cmd,origin){
if(!RTEST(rb_funcall(origin,s$ht,rb_funcall(rb_ivar_get(self, i$bb),s$v)))){
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$v),'x=',rb_funcall(origin,s$y));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$v),'y=',rb_funcall(origin,s$z));
rb_funcall(rb_ivar_get(self, i$b),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$n),s$cc),s$cj,'window did move',self);
}
});
rb_define_method(self,s$afj,function(self,_cmd,new_frame){
});
rb_define_method(self,s$afk,function(self,_cmd){
});
rb_define_method(self,s$afl,function(self,_cmd,show){
return self.$i_s(i$gz,show);
});
rb_define_method(self,s$afm,function(self,_cmd){
return rb_ivar_get(self, i$gz);
});
rb_define_method(self,s$afn,function(self,_cmd,increments){
return self.$i_s(i$ha,increments);
});
rb_define_method(self,s$afo,function(self,_cmd){
return rb_ivar_get(self, i$ha);
});
rb_define_method(self,s$afp,function(self,_cmd,ratio){
return self.$i_s(i$hb,ratio);
});
rb_define_method(self,s$afq,function(self,_cmd){
return rb_ivar_get(self, i$hb);
});
rb_define_method(self,s$ms,function(self,_cmd){
});
rb_define_method(self,s$afr,function(self,_cmd){
return rb_ivar_get(self, i$hc);
});
rb_define_method(self,s$afs,function(self,_cmd,flag){
return self.$i_s(i$hc,flag);
});
rb_define_method(self,s$aft,function(self,_cmd){
});
rb_define_method(self,s$afu,function(self,_cmd,responder){
if(RTEST(rb_funcall(rb_ivar_get(self, i$gw),s$ab,responder))){
return true;
}
if(!RTEST(rb_funcall(rb_ivar_get(self, i$gw),s$dl))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(rb_funcall(responder,s$dj)),NOTTEST(rb_funcall(responder,s$dk)))))){
self.$i_s(i$gw,self);
rb_funcall(self,s$ak,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$gw,responder);
return true;
});
rb_define_method(self,s$afv,function(self,_cmd){
});
rb_define_method(self,s$afw,function(self,_cmd){
});
rb_define_method(self,s$de,function(self,_cmd,the_event){
});
rb_define_method(self,s$afx,function(self,_cmd){
});
rb_define_method(self,s$afy,function(self,_cmd,flag){
return self.$i_s(i$hd,flag);
});
rb_define_method(self,s$afz,function(self,_cmd){
return rb_ivar_get(self, i$hd);
});
rb_define_method(self,s$aga,function(self,_cmd,sender){
});
rb_define_method(self,s$agb,function(self,_cmd,sender){
});
rb_define_method(self,s$agc,function(self,_cmd){
return rb_ivar_get(self, i$he);
});
rb_define_method(self,s$agd,function(self,_cmd,sender){
});
rb_define_method(self,s$age,function(self,_cmd){
return rb_ivar_get(self, i$hf);
});
self.$def(s$cp,function(self,_cmd,action,object){
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$agf,function(self,_cmd,flag){
return self.$i_s(i$hg,flag);
});
rb_define_method(self,s$agg,function(self,_cmd){
return rb_ivar_get(self, i$hg);
});
rb_define_method(self,s$agh,function(self,_cmd,flag){
return rb_ivar_get(self, i$hh);
});
rb_define_method(self,s$agi,function(self,_cmd){
return rb_ivar_get(self, i$hh);
});
rb_define_method(self,s$agj,function(self,_cmd,flag){
return self.$i_s(i$hi,flag);
});
rb_define_method(self,s$agk,function(self,_cmd){
return rb_ivar_get(self, i$hi);
});
rb_define_method(self,s$hq,function(self,_cmd){
});
rb_define_method(self,s$agl,function(self,_cmd,sender){
rb_funcall(self,s$agm,self);
rb_funcall(self, s$agn);
return rb_funcall(self, s$ago);
});
rb_define_method(self,s$agm,function(self,_cmd,sender){
});
rb_define_method(self,s$agp,function(self,_cmd,sender){
});
rb_define_method(self,s$agq,function(self,_cmd,sender){
});
self.$def(s$agr,function(self,_cmd,place,other_win){
});
rb_define_method(self,s$ags,function(self,_cmd){
});
rb_define_method(self,s$agt,function(self,_cmd,flag){
return self.$i_s(i$hj,flag);
});
rb_define_method(self,s$agu,function(self,_cmd){
return rb_ivar_get(self, i$hj);
});
rb_define_method(self,s$agv,function(self,_cmd){
return rb_ivar_get(self, i$hk);
});
rb_define_method(self,s$agw,function(self,_cmd){
return rb_ivar_get(self, i$hl);
});
rb_define_method(self,s$agx,function(self,_cmd){
return rb_ivar_get(self, i$hm);
});
rb_define_method(self,s$agy,function(self,_cmd){
});
rb_define_method(self,s$agz,function(self,_cmd){
});
rb_define_method(self,s$agn,function(self,_cmd){
});
rb_define_method(self,s$ago,function(self,_cmd){
});
rb_define_method(self,s$aha,function(self,_cmd){
});
rb_define_method(self,s$ahb,function(self,_cmd){
});
rb_define_method(self,s$ahc,function(self,_cmd){
});
rb_define_method(self,s$ahd,function(self,_cmd){
});
rb_define_method(self,s$ahe,function(self,_cmd){
});
rb_define_method(self,s$ahf,function(self,_cmd,point){
return rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(point,s$y),s$hy,rb_funcall(rb_ivar_get(self, i$bb),s$y)),rb_funcall(rb_funcall(point,s$z),s$hy,rb_funcall(rb_ivar_get(self, i$bb),s$z)));
});
rb_define_method(self,s$fb,function(self,_cmd,point){
var res = rb_funcall(self.$klass.$c_g_full(c$p),s$ao,rb_funcall(rb_funcall(point,s$y),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$y)),rb_funcall(rb_funcall(point,s$z),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$z)));
return res;
});
rb_define_method(self,s$ahg,function(self,_cmd,sender){
});
rb_define_method(self,s$ahh,function(self,_cmd,sender){
});
rb_define_method(self,s$ahi,function(self,_cmd,sender){
});
rb_define_method(self,s$ahj,function(self,_cmd,level){
self.$i_s(i$hn,level);
return rb_funcall(rb_ivar_get(self, i$b),s$o,VN.$h(_$jj,rb_funcall(self.$klass.$c_g_full(c$ay),s$h,level)));
});
rb_define_method(self,s$ahk,function(self,_cmd){
return rb_ivar_get(self, i$hn);
});
rb_define_method(self,s$ahl,function(self,_cmd,flag){
return self.$i_s(i$ho,flag);
});
rb_define_method(self,s$ahm,function(self,_cmd){
return rb_ivar_get(self, i$ho);
});
rb_define_method(self,s$ahn,function(self,_cmd){
return rb_ivar_get(self, i$gu);
});
rb_define_method(self,s$aho,function(self,_cmd){
return rb_ivar_get(self, i$gv);
});
rb_define_method(self,s$ahp,function(self,_cmd,size){
return self.$i_s(i$gu,size);
});
rb_define_method(self,s$ahq,function(self,_cmd,size){
return self.$i_s(i$gv,size);
});
rb_define_method(self,s$ahr,function(self,_cmd,mask){
});
self.$def(s$ahs,function(self,_cmd,event,flag){
});
rb_define_method(self,s$dv,function(self,_cmd){
return rb_ivar_get(self, i$y);
});
rb_define_method(self,s$aht,function(self,_cmd,flag){
return self.$i_s(i$hp,flag);
});
rb_define_method(self,s$ahu,function(self,_cmd){
return rb_ivar_get(self, i$hp);
});
rb_define_method(self,s$ahv,function(self,_cmd,flag){
return self.$i_s(i$hq,flag);
});
rb_define_method(self,s$ahw,function(self,_cmd){
return rb_ivar_get(self, i$hq);
});
rb_define_method(self,s$dz,function(self,_cmd,event){
var point = rb_funcall(event,s$fa);
return (function($v){
if(($e = rb_funcall(_$as, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'key_up');
}
else if(($e = rb_funcall(_$ar, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'key_down');
}
else if(($e = rb_funcall(_$aj, '===', $v),$e!==nil && $e!==false)){
var hit_test = rb_funcall(rb_ivar_get(self, i$gx),s$na,point);
if(RTEST(ANDTEST(rb_funcall(hit_test,s$rs,rb_ivar_get(self, i$gw)),rb_funcall(hit_test,s$dj)))){
rb_funcall(self,s$afu,hit_test);
}
rb_funcall(self,s$agl,self);
if(RTEST(rb_funcall(hit_test,s$kb,event))){
return rb_funcall(hit_test,s$cr,event);
}
}
else if(($e = rb_funcall(_$ak, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'left_mouse_up');
}
else if(($e = rb_funcall(_$ab, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'left_mouse_dragged');
}
else if(($e = rb_funcall(_$az, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'scroll_wheel');
}
else if(($e = rb_funcall(_$al, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'right_mouse_down');
}
else if(($e = rb_funcall(_$am, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'right_mouse_up');
}
else if(($e = rb_funcall(_$ao, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ak,'right_mouse_dragged');
}
})(rb_funcall(event,s$eb));
});
rb_define_method(self,s$ahx,function(self,_cmd){
return rb_ivar_get(self, i$hr);
});
rb_define_method(self,s$ahy,function(self,_cmd,controller){
return self.$i_s(i$hr,controller);
});
rb_define_method(self,s$ahz,function(self,_cmd){
return rb_ivar_get(self, i$hs);
});
rb_define_method(self,s$aia,function(self,_cmd){
return rb_ivar_get(self, i$ht);
});
self.$def(s$aib,function(self,_cmd,win,place){
});
rb_define_method(self,s$aic,function(self,_cmd,win){
});
rb_define_method(self,s$aid,function(self,_cmd){
return rb_ivar_get(self, i$hu);
});
rb_define_method(self,s$aie,function(self,_cmd){
return rb_ivar_get(self, i$hv);
});
rb_define_method(self,s$aif,function(self,_cmd,win){
return self.$i_s(i$hv,win);
});
rb_define_method(self,s$mz,function(self,_cmd){
return rb_ivar_get(self, i$hw);
});
rb_define_method(self,s$aig,function(self,_cmd,view){
return self.$i_s(i$hx,view);
});
rb_define_method(self,s$aih,function(self,_cmd){
return rb_ivar_get(self, i$hx);
});
rb_define_method(self,s$aii,function(self,_cmd,sender){
});
rb_define_method(self,s$aij,function(self,_cmd,sender){
});
rb_define_method(self,s$aik,function(self,_cmd,view){
});
rb_define_method(self,s$ail,function(self,_cmd,view){
});
rb_define_method(self,s$aim,function(self,_cmd,flag){
return self.$i_s(i$hy,flag);
});
rb_define_method(self,s$ain,function(self,_cmd){
return rb_ivar_get(self, i$hy);
});
rb_define_method(self,s$aio,function(self,_cmd){
});
rb_define_method(self,s$aip,function(self,_cmd,toolbar){
return self.$i_s(i$hz,toolbar);
});
rb_define_method(self,s$aiq,function(self,_cmd){
return rb_ivar_get(self, i$hz);
});
rb_define_method(self,s$air,function(self,_cmd,sender){
});
rb_define_method(self,s$ais,function(self,_cmd,sender){
});
rb_define_method(self,s$ait,function(self,_cmd,show){
return rb_ivar_get(self, i$ia);
});
rb_define_method(self,s$aiu,function(self,_cmd){
return rb_ivar_get(self, i$ia);
});
})(RClass.define_under(self,'Window',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));
