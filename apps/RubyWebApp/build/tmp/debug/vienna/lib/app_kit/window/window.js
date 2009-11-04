
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$ib, 0, _$ic, rb_funcall((1),s$b,0), _$hz, rb_funcall((1),s$b,1), _$ia, rb_funcall((1),s$b,2), _$id, rb_funcall((1),s$b,3), _$ie, rb_funcall((1),s$b,8), _$if, rb_funcall((1),s$b,12), _$ig, 1, _$ih, 1, _$ii, 1, _$ij, 1, _$ik, 1, _$il, rb_funcall((1),s$b,4), _$im, rb_funcall((1),s$b,6), _$gu, rb_funcall((1),s$b,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$u, 0, _$in, 0, _$io, 0, _$ip, 0, _$iq, 0, _$ir, 0, _$v, 0, _$is, 0, _$it, 0));
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,content_rect,style_mask){
return rb_funcall(self,s$aea,content_rect,style_mask);
});
self.$def(s$aea,function(self,_cmd,content_rect,style_mask){
rb_funcall(self, s$jz);
self.$i_s(i$bb,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0));
self.$i_s(i$gt,rb_funcall(self.$klass.$c_g_full(c$l),s$eg,self));
self.$i_s(i$gm,style_mask);
rb_funcall(self,'level=',_$u);
self.$i_s(i$gu,rb_funcall(self.$klass.$c_g_full(c$p),s$al,0.0,0.0));
self.$i_s(i$gv,rb_funcall(self.$klass.$c_g_full(c$p),s$al,9999.0,9999.0));
self.$i_s(i$gw,self);
self.$i_s(i$o,self.$klass.$c_g_full(c$l));
rb_funcall(self,s$aeb);
rb_funcall(self,'frame=',content_rect);
rb_funcall(rb_ivar_get(self, i$gx),'needs_display=',true);
rb_funcall(self,'content_view=',rb_funcall(self.$klass.$c_g_full(c$x),s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,rb_funcall(rb_ivar_get(self, i$bb),s$z),rb_funcall(rb_ivar_get(self, i$bb),s$aa))));
return self;
});
self.$def_s(s$ka,function(self,_cmd,options,block){
var win = rb_funcall(rb_funcall(self,s$aec),s$aea,rb_funcall(options,s$e,_$ft),[_$ic,_$hz]);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
rb_define_method(self,s$jz,function(self,_cmd){
self.$i_s(i$b,rb_funcall(self.$klass.$c_g_full(c$r),s$al,_$fw));
self.$i_s(i$bi,rb_funcall(self.$klass.$c_g_full(c$q),s$al,_$fw));
rb_funcall(rb_ivar_get(self, i$b),s$b,rb_ivar_get(self, i$bi));
return rb_funcall(self.$klass.$c_g_full(c$a),s$b,rb_ivar_get(self, i$b));
});
rb_define_method(self,s$aeb,function(self,_cmd){
var view_class = rb_funcall(self,s$aed,rb_ivar_get(self, i$gm));
self.$i_s(i$gx,rb_funcall(view_class,s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,100,100),rb_ivar_get(self, i$gm)));
rb_funcall(rb_ivar_get(self, i$gx),s$kw,self);
rb_funcall(rb_ivar_get(self, i$gx),'next_responder=',self);
rb_funcall(rb_ivar_get(self, i$b),s$b,rb_funcall(rb_ivar_get(self, i$gx),s$j));
rb_funcall(rb_ivar_get(self, i$gx),s$ky);
rb_funcall(rb_ivar_get(self, i$gx),'needs_display=',true);
rb_funcall(rb_funcall(rb_ivar_get(self, i$gx),s$j),s$c,_$af,function(event){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,event,self,'left_mouse_down');
rb_funcall(self.$klass.$c_g_full(c$l),s$dz,the_event);
if(!RTEST(rb_funcall(the_event,s$eq))){
rb_funcall(the_event,s$ep);
}
});
return rb_funcall(rb_funcall(rb_ivar_get(self, i$gx),s$j),s$c,_$ag,function(event){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,event,self,'left_mouse_up');
rb_funcall(self.$klass.$c_g_full(c$l),s$dz,the_event);
if(!RTEST(rb_funcall(the_event,s$eq))){
rb_funcall(the_event,s$ep);
}
});
});
rb_define_method(self,s$aed,function(self,_cmd,style_mask){
if(RTEST(rb_funcall(style_mask,s$dx,_$ib))){
return self.$klass.$c_g_full(c$ap);
}
else if(RTEST(rb_funcall(style_mask,s$dx,_$gu))){
return self.$klass.$c_g_full(c$aq);
}
else{
return self.$klass.$c_g_full(c$ar);
}
});
self.$def_s(s$adv,function(self,_cmd,rect,style){
});
self.$def_s(s$adw,function(self,_cmd,rect,style){
});
self.$def_s(s$adx,function(self,_cmd,title,style){
});
rb_define_method(self,s$ady,function(self,_cmd,rect){
});
rb_define_method(self,s$adz,function(self,_cmd,rect){
return rect;
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qg,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$aee,function(self,_cmd,str){
});
rb_define_method(self,s$aef,function(self,_cmd){
});
rb_define_method(self,s$aeg,function(self,_cmd){
});
rb_define_method(self,s$aeh,function(self,_cmd,filename){
});
rb_define_method(self,s$aei,function(self,_cmd,filename){
});
rb_define_method(self,s$aej,function(self,_cmd,flag){
return self.$i_s(i$gy,flag);
});
rb_define_method(self,s$aek,function(self,_cmd){
return rb_ivar_get(self, i$gy);
});
rb_define_method(self,s$wi,function(self,_cmd,view){
rb_funcall(view,s$kw,self);
var bounds = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$t),s$z),rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$t),s$aa));
self.$i_s(i$eb,view);
rb_funcall(rb_ivar_get(self, i$eb),'frame=',rb_funcall(self,s$adz,bounds));
rb_funcall(view,s$ky);
return rb_funcall(rb_ivar_get(self, i$gx),s$b,rb_ivar_get(self, i$eb));
});
rb_define_method(self,s$wk,function(self,_cmd){
return rb_ivar_get(self, i$eb);
});
rb_define_method(self,s$b,function(self,_cmd,view){
return rb_funcall(rb_ivar_get(self, i$eb),s$b,view);
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
return self.$i_s(i$t,obj);
});
rb_define_method(self,s$jm,function(self,_cmd){
});
rb_define_method(self,s$ev,function(self,_cmd){
return rb_ivar_get(self, i$gt);
});
rb_define_method(self,s$ael,function(self,_cmd){
return rb_ivar_get(self, i$gm);
});
rb_define_method(self,s$aem,function(self,_cmd,mask){
return self.$i_s(i$gm,mask);
});
self.$def(s$aen,function(self,_cmd,create_flag,obj){
});
rb_define_method(self,s$aeo,function(self,_cmd,obj){
});
rb_define_method(self,s$aep,function(self,_cmd,size){
});
rb_define_method(self,s$aeq,function(self,_cmd,point){
});
rb_define_method(self,s$aer,function(self,_cmd,point){
});
rb_define_method(self,s$ln,function(self,_cmd){
return rb_ivar_get(self, i$bb);
});
rb_define_method(self,s$r,function(self,_cmd,frame){
return rb_funcall(self,s$aes,frame,true,false);
});
self.$def(s$aet,function(self,_cmd,frame_rect,flag){
return rb_funcall(self,s$aes,frame_rect,flag,false);
});
self.$def(s$aes,function(self,_cmd,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin = rb_funcall(rb_ivar_get(self, i$bb),s$s);
var size = rb_funcall(rb_ivar_get(self, i$bb),s$t);
var new_origin = rb_funcall(frame_rect,s$s);
var new_size = rb_funcall(frame_rect,s$t);
if(!RTEST(rb_funcall(origin,s$ht,new_origin))){
rb_funcall(origin,'x=',rb_funcall(new_origin,s$v));
rb_funcall(origin,'y=',rb_funcall(new_origin,s$w));
rb_funcall(rb_ivar_get(self, i$b),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$cc),s$cj,'window did move',self);
}
if(!RTEST(rb_funcall(size,s$ht,new_size))){
rb_funcall(size,'width=',rb_funcall(new_size,s$z));
rb_funcall(size,'height=',rb_funcall(new_size,s$aa));
rb_funcall(rb_ivar_get(self, i$gx),'frame_size=',size);
rb_funcall(rb_ivar_get(self, i$b),'size=',size);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$cc),s$cj,'window did resize',self);
}
}
});
rb_define_method(self,s$ll,function(self,_cmd,origin){
if(!RTEST(rb_funcall(origin,s$ht,rb_funcall(rb_ivar_get(self, i$bb),s$s)))){
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$s),'x=',rb_funcall(origin,s$v));
rb_funcall(rb_funcall(rb_ivar_get(self, i$bb),s$s),'y=',rb_funcall(origin,s$w));
rb_funcall(rb_ivar_get(self, i$b),'origin=',origin);
rb_funcall(rb_funcall(self.$klass.$c_g_full(c$m),s$cc),s$cj,'window did move',self);
}
});
rb_define_method(self,s$aeu,function(self,_cmd,new_frame){
});
rb_define_method(self,s$aev,function(self,_cmd){
});
rb_define_method(self,s$aew,function(self,_cmd,show){
return self.$i_s(i$gz,show);
});
rb_define_method(self,s$aex,function(self,_cmd){
return rb_ivar_get(self, i$gz);
});
rb_define_method(self,s$aey,function(self,_cmd,increments){
return self.$i_s(i$ha,increments);
});
rb_define_method(self,s$aez,function(self,_cmd){
return rb_ivar_get(self, i$ha);
});
rb_define_method(self,s$afa,function(self,_cmd,ratio){
return self.$i_s(i$hb,ratio);
});
rb_define_method(self,s$afb,function(self,_cmd){
return rb_ivar_get(self, i$hb);
});
rb_define_method(self,s$ms,function(self,_cmd){
});
rb_define_method(self,s$afc,function(self,_cmd){
return rb_ivar_get(self, i$hc);
});
rb_define_method(self,s$afd,function(self,_cmd,flag){
return self.$i_s(i$hc,flag);
});
rb_define_method(self,s$afe,function(self,_cmd){
});
rb_define_method(self,s$aff,function(self,_cmd,responder){
if(RTEST(rb_funcall(rb_ivar_get(self, i$gw),s$y,responder))){
return true;
}
if(!RTEST(rb_funcall(rb_ivar_get(self, i$gw),s$dl))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(rb_funcall(responder,s$dj)),NOTTEST(rb_funcall(responder,s$dk)))))){
self.$i_s(i$gw,self);
rb_funcall(self,s$ah,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$gw,responder);
return true;
});
rb_define_method(self,s$afg,function(self,_cmd){
});
rb_define_method(self,s$afh,function(self,_cmd){
});
rb_define_method(self,s$de,function(self,_cmd,the_event){
});
rb_define_method(self,s$afi,function(self,_cmd){
});
rb_define_method(self,s$afj,function(self,_cmd,flag){
return self.$i_s(i$hd,flag);
});
rb_define_method(self,s$afk,function(self,_cmd){
return rb_ivar_get(self, i$hd);
});
rb_define_method(self,s$afl,function(self,_cmd,sender){
});
rb_define_method(self,s$afm,function(self,_cmd,sender){
});
rb_define_method(self,s$afn,function(self,_cmd){
return rb_ivar_get(self, i$he);
});
rb_define_method(self,s$afo,function(self,_cmd,sender){
});
rb_define_method(self,s$afp,function(self,_cmd){
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
rb_define_method(self,s$afq,function(self,_cmd,flag){
return self.$i_s(i$hg,flag);
});
rb_define_method(self,s$afr,function(self,_cmd){
return rb_ivar_get(self, i$hg);
});
rb_define_method(self,s$afs,function(self,_cmd,flag){
return rb_ivar_get(self, i$hh);
});
rb_define_method(self,s$aft,function(self,_cmd){
return rb_ivar_get(self, i$hh);
});
rb_define_method(self,s$afu,function(self,_cmd,flag){
return self.$i_s(i$hi,flag);
});
rb_define_method(self,s$afv,function(self,_cmd){
return rb_ivar_get(self, i$hi);
});
rb_define_method(self,s$hq,function(self,_cmd){
});
rb_define_method(self,s$afw,function(self,_cmd,sender){
rb_funcall(self,s$afx,self);
rb_funcall(self, s$afy);
return rb_funcall(self, s$afz);
});
rb_define_method(self,s$afx,function(self,_cmd,sender){
});
rb_define_method(self,s$aga,function(self,_cmd,sender){
});
rb_define_method(self,s$agb,function(self,_cmd,sender){
});
self.$def(s$agc,function(self,_cmd,place,other_win){
});
rb_define_method(self,s$agd,function(self,_cmd){
});
rb_define_method(self,s$age,function(self,_cmd,flag){
return self.$i_s(i$hj,flag);
});
rb_define_method(self,s$agf,function(self,_cmd){
return rb_ivar_get(self, i$hj);
});
rb_define_method(self,s$agg,function(self,_cmd){
return rb_ivar_get(self, i$hk);
});
rb_define_method(self,s$agh,function(self,_cmd){
return rb_ivar_get(self, i$hl);
});
rb_define_method(self,s$agi,function(self,_cmd){
return rb_ivar_get(self, i$hm);
});
rb_define_method(self,s$agj,function(self,_cmd){
});
rb_define_method(self,s$agk,function(self,_cmd){
});
rb_define_method(self,s$afy,function(self,_cmd){
});
rb_define_method(self,s$afz,function(self,_cmd){
});
rb_define_method(self,s$agl,function(self,_cmd){
});
rb_define_method(self,s$agm,function(self,_cmd){
});
rb_define_method(self,s$agn,function(self,_cmd){
});
rb_define_method(self,s$ago,function(self,_cmd){
});
rb_define_method(self,s$agp,function(self,_cmd){
});
rb_define_method(self,s$agq,function(self,_cmd,point){
return rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_funcall(rb_funcall(point,s$v),s$hy,rb_funcall(rb_ivar_get(self, i$bb),s$v)),rb_funcall(rb_funcall(point,s$w),s$hy,rb_funcall(rb_ivar_get(self, i$bb),s$w)));
});
rb_define_method(self,s$fb,function(self,_cmd,point){
var res = rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_funcall(rb_funcall(point,s$v),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$v)),rb_funcall(rb_funcall(point,s$w),s$mf,rb_funcall(rb_ivar_get(self, i$bb),s$w)));
return res;
});
rb_define_method(self,s$agr,function(self,_cmd,sender){
});
rb_define_method(self,s$ags,function(self,_cmd,sender){
});
rb_define_method(self,s$agt,function(self,_cmd,sender){
});
rb_define_method(self,s$agu,function(self,_cmd,level){
self.$i_s(i$hn,level);
return rb_funcall(rb_ivar_get(self, i$b),s$l,VN.$h(_$iu,rb_funcall(self.$klass.$c_g_full(c$as),s$e,level)));
});
rb_define_method(self,s$agv,function(self,_cmd){
return rb_ivar_get(self, i$hn);
});
rb_define_method(self,s$agw,function(self,_cmd,flag){
return self.$i_s(i$ho,flag);
});
rb_define_method(self,s$agx,function(self,_cmd){
return rb_ivar_get(self, i$ho);
});
rb_define_method(self,s$agy,function(self,_cmd){
return rb_ivar_get(self, i$gu);
});
rb_define_method(self,s$agz,function(self,_cmd){
return rb_ivar_get(self, i$gv);
});
rb_define_method(self,s$aha,function(self,_cmd,size){
return self.$i_s(i$gu,size);
});
rb_define_method(self,s$ahb,function(self,_cmd,size){
return self.$i_s(i$gv,size);
});
rb_define_method(self,s$ahc,function(self,_cmd,mask){
});
self.$def(s$ahd,function(self,_cmd,event,flag){
});
rb_define_method(self,s$dv,function(self,_cmd){
return rb_ivar_get(self, i$y);
});
rb_define_method(self,s$ahe,function(self,_cmd,flag){
return self.$i_s(i$hp,flag);
});
rb_define_method(self,s$ahf,function(self,_cmd){
return rb_ivar_get(self, i$hp);
});
rb_define_method(self,s$ahg,function(self,_cmd,flag){
return self.$i_s(i$hq,flag);
});
rb_define_method(self,s$ahh,function(self,_cmd){
return rb_ivar_get(self, i$hq);
});
rb_define_method(self,s$dz,function(self,_cmd,event){
var point = rb_funcall(event,s$fa);
return (function($v){
if(($e = rb_funcall(_$aq, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'key_up');
}
else if(($e = rb_funcall(_$ap, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'key_down');
}
else if(($e = rb_funcall(_$ah, '===', $v),$e!==nil && $e!==false)){
var hit_test = rb_funcall(rb_ivar_get(self, i$gx),s$na,point);
if(RTEST(ANDTEST(rb_funcall(hit_test,s$rp,rb_ivar_get(self, i$gw)),rb_funcall(hit_test,s$dj)))){
rb_funcall(self,s$aff,hit_test);
}
rb_funcall(self,s$afw,self);
if(RTEST(rb_funcall(hit_test,s$kb,event))){
return rb_funcall(hit_test,s$cr,event);
}
}
else if(($e = rb_funcall(_$ai, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'left_mouse_up');
}
else if(($e = rb_funcall(_$ab, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'left_mouse_dragged');
}
else if(($e = rb_funcall(_$ax, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'scroll_wheel');
}
else if(($e = rb_funcall(_$aj, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'right_mouse_down');
}
else if(($e = rb_funcall(_$ak, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'right_mouse_up');
}
else if(($e = rb_funcall(_$am, '===', $v),$e!==nil && $e!==false)){
return rb_funcall(self,s$ah,'right_mouse_dragged');
}
})(rb_funcall(event,s$eb));
});
rb_define_method(self,s$ahi,function(self,_cmd){
return rb_ivar_get(self, i$hr);
});
rb_define_method(self,s$ahj,function(self,_cmd,controller){
return self.$i_s(i$hr,controller);
});
rb_define_method(self,s$ahk,function(self,_cmd){
return rb_ivar_get(self, i$hs);
});
rb_define_method(self,s$ahl,function(self,_cmd){
return rb_ivar_get(self, i$ht);
});
self.$def(s$ahm,function(self,_cmd,win,place){
});
rb_define_method(self,s$ahn,function(self,_cmd,win){
});
rb_define_method(self,s$aho,function(self,_cmd){
return rb_ivar_get(self, i$hu);
});
rb_define_method(self,s$ahp,function(self,_cmd){
return rb_ivar_get(self, i$hv);
});
rb_define_method(self,s$ahq,function(self,_cmd,win){
return self.$i_s(i$hv,win);
});
rb_define_method(self,s$mz,function(self,_cmd){
return rb_ivar_get(self, i$hw);
});
rb_define_method(self,s$ahr,function(self,_cmd,view){
return self.$i_s(i$hx,view);
});
rb_define_method(self,s$ahs,function(self,_cmd){
return rb_ivar_get(self, i$hx);
});
rb_define_method(self,s$aht,function(self,_cmd,sender){
});
rb_define_method(self,s$ahu,function(self,_cmd,sender){
});
rb_define_method(self,s$ahv,function(self,_cmd,view){
});
rb_define_method(self,s$ahw,function(self,_cmd,view){
});
rb_define_method(self,s$ahx,function(self,_cmd,flag){
return self.$i_s(i$hy,flag);
});
rb_define_method(self,s$ahy,function(self,_cmd){
return rb_ivar_get(self, i$hy);
});
rb_define_method(self,s$ahz,function(self,_cmd){
});
rb_define_method(self,s$aia,function(self,_cmd,toolbar){
return self.$i_s(i$hz,toolbar);
});
rb_define_method(self,s$aib,function(self,_cmd){
return rb_ivar_get(self, i$hz);
});
rb_define_method(self,s$aic,function(self,_cmd,sender){
});
rb_define_method(self,s$aid,function(self,_cmd,sender){
});
rb_define_method(self,s$aie,function(self,_cmd,show){
return rb_ivar_get(self, i$ia);
});
rb_define_method(self,s$aif,function(self,_cmd){
return rb_ivar_get(self, i$ia);
});
})(RClass.define_under(self,'Window',self.$c_g_full(c$v)));
})(RModule.define('Vienna'));
