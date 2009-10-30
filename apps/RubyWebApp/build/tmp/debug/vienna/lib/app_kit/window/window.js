
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/normal_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/hud_window_view.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/window/borderless_window_view.js');
(function(self) {
self.$c_s('WINDOW_MASKS',VN.$h(_$ib, 0, _$ic, VN$((1),s$cv,0), _$hz, VN$((1),s$cv,1), _$ia, VN$((1),s$cv,2), _$id, VN$((1),s$cv,3), _$ie, VN$((1),s$cv,8), _$if, VN$((1),s$cv,12), _$ig, 1, _$ih, 1, _$ii, 1, _$ij, 1, _$ik, 1, _$il, VN$((1),s$cv,4), _$im, VN$((1),s$cv,6), _$gu, VN$((1),s$cv,13)));
self.$c_s('WINDOW_LEVELS',VN.$h(_$u, 0, _$in, 0, _$io, 0, _$ip, 0, _$iq, 0, _$ir, 0, _$v, 0, _$is, 0, _$it, 0));
(function(self) {
self.$def(s$as,function(self,_cmd,content_rect,style_mask){
return VN$(self,s$ami,content_rect,style_mask);
});
self.$def(s$ami,function(self,_cmd,content_rect,style_mask){
VN$(self, s$sv);
self.$i_s(i$bd,VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,0,0));
self.$i_s(i$gv,VN$(self.$klass.$c_g_full('App'),s$nm,self));
self.$i_s(i$go,style_mask);
VN$(self,'level=',_$u);
self.$i_s(i$gw,VN$(self.$klass.$c_g_full('Size'),s$is,0.0,0.0));
self.$i_s(i$gx,VN$(self.$klass.$c_g_full('Size'),s$is,9999.0,9999.0));
self.$i_s(i$gy,self);
self.$i_s(i$q,self.$klass.$c_g_full('App'));
VN$(self,s$amj);
VN$(self,'frame=',content_rect);
VN$(self.$i_g(i$gz),'needs_display=',true);
VN$(self,'content_view=',VN$(self.$klass.$c_g_full('View'),s$is,VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,VN$(self.$i_g(i$bd),s$jr),VN$(self.$i_g(i$bd),s$js))));
return self;
});
self.$def_s(s$sw,function(self,_cmd,options,block){
var win = VN$(VN$(self,s$amk),s$ami,VN$(options,s$bo,_$ft),[_$ic,_$hz]);
if(RTEST(block)){
arguments[arguments.length -1](win);
}
return win;
});
self.$def(s$sv,function(self,_cmd){
self.$i_s(i$d,VN$(self.$klass.$c_g_full('Element'),s$is,_$fw));
self.$i_s(i$bk,VN$(self.$klass.$c_g_full('RenderContext'),s$is,_$fw));
VN$(self.$i_g(i$d),s$cv,self.$i_g(i$bk));
return VN$(self.$klass.$c_g_full('Document'),s$cv,self.$i_g(i$d));
});
self.$def(s$amj,function(self,_cmd){
var view_class = VN$(self,s$aml,self.$i_g(i$go));
self.$i_s(i$gz,VN$(view_class,s$is,VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,100,100),self.$i_g(i$go)));
VN$(self.$i_g(i$gz),s$ts,self);
VN$(self.$i_g(i$gz),'next_responder=',self);
VN$(self.$i_g(i$d),s$cv,VN$(self.$i_g(i$gz),s$jf));
VN$(self.$i_g(i$gz),s$tu);
VN$(self.$i_g(i$gz),'needs_display=',true);
VN$(VN$(self.$i_g(i$gz),s$jf),s$jb,_$af,function(event){
var the_event = VN$(self.$klass.$c_g_full('Event'),s$ne,event,self,'left_mouse_down');
VN$(self.$klass.$c_g_full('App'),s$nf,the_event);
if(!RTEST(VN$(the_event,s$nw))){
VN$(the_event,s$nv);
}
});
return VN$(VN$(self.$i_g(i$gz),s$jf),s$jb,_$ag,function(event){
var the_event = VN$(self.$klass.$c_g_full('Event'),s$ne,event,self,'left_mouse_up');
VN$(self.$klass.$c_g_full('App'),s$nf,the_event);
if(!RTEST(VN$(the_event,s$nw))){
VN$(the_event,s$nv);
}
});
});
self.$def(s$aml,function(self,_cmd,style_mask){
if(RTEST(VN$(style_mask,s$al,_$ib))){
return self.$klass.$c_g_full('BorderlessWindowView');
}
else if(RTEST(VN$(style_mask,s$al,_$gu))){
return self.$klass.$c_g_full('HUDWindowView');
}
else{
return self.$klass.$c_g_full('NormalWindowView');
}
});
self.$def_s(s$amd,function(self,_cmd,rect,style){
});
self.$def_s(s$ame,function(self,_cmd,rect,style){
});
self.$def_s(s$amf,function(self,_cmd,title,style){
});
self.$def(s$amg,function(self,_cmd,rect){
});
self.$def(s$amh,function(self,_cmd,rect){
return rect;
});
self.$def(s$yw,function(self,_cmd){
return self.$i_g(i$bv);
});
self.$def(s$yx,function(self,_cmd,str){
return self.$i_s(i$bv,str);
});
self.$def(s$amm,function(self,_cmd,str){
});
self.$def(s$amn,function(self,_cmd){
});
self.$def(s$amo,function(self,_cmd){
});
self.$def(s$amp,function(self,_cmd,filename){
});
self.$def(s$amq,function(self,_cmd,filename){
});
self.$def(s$amr,function(self,_cmd,flag){
return self.$i_s(i$ha,flag);
});
self.$def(s$ams,function(self,_cmd){
return self.$i_g(i$ha);
});
self.$def(s$aeu,function(self,_cmd,view){
VN$(view,s$ts,self);
var bounds = VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,VN$(VN$(self.$i_g(i$bd),s$bs),s$jr),VN$(VN$(self.$i_g(i$bd),s$bs),s$js));
self.$i_s(i$ed,view);
VN$(self.$i_g(i$ed),'frame=',VN$(self,s$amh,bounds));
VN$(view,s$tu);
return VN$(self.$i_g(i$gz),s$cv,self.$i_g(i$ed));
});
self.$def(s$aew,function(self,_cmd){
return self.$i_g(i$ed);
});
self.$def(s$cv,function(self,_cmd,view){
return VN$(self.$i_g(i$ed),s$cv,view);
});
self.$def(s$no,function(self,_cmd,obj){
return self.$i_s(i$v,obj);
});
self.$def(s$sk,function(self,_cmd){
});
self.$def(s$ob,function(self,_cmd){
return self.$i_g(i$gv);
});
self.$def(s$amt,function(self,_cmd){
return self.$i_g(i$go);
});
self.$def(s$amu,function(self,_cmd,mask){
return self.$i_s(i$go,mask);
});
self.$def(s$amv,function(self,_cmd,create_flag,obj){
});
self.$def(s$amw,function(self,_cmd,obj){
});
self.$def(s$amx,function(self,_cmd,size){
});
self.$def(s$amy,function(self,_cmd,point){
});
self.$def(s$amz,function(self,_cmd,point){
});
self.$def(s$uj,function(self,_cmd){
return self.$i_g(i$bd);
});
self.$def(s$jl,function(self,_cmd,frame){
return VN$(self,s$ana,frame,true,false);
});
self.$def(s$anb,function(self,_cmd,frame_rect,flag){
return VN$(self,s$ana,frame_rect,flag,false);
});
self.$def(s$ana,function(self,_cmd,frame_rect,flag,animate_flag){
if(RTEST(animate_flag)){
}
else{
var origin = VN$(self.$i_g(i$bd),s$jm);
var size = VN$(self.$i_g(i$bd),s$bs);
var new_origin = VN$(frame_rect,s$jm);
var new_size = VN$(frame_rect,s$bs);
if(!RTEST(VN$(origin,s$e,new_origin))){
VN$(origin,'x=',VN$(new_origin,s$jo));
VN$(origin,'y=',VN$(new_origin,s$jp));
VN$(self.$i_g(i$d),'origin=',origin);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),s$lk),s$lq,'window did move',self);
}
if(!RTEST(VN$(size,s$e,new_size))){
VN$(size,'width=',VN$(new_size,s$jr));
VN$(size,'height=',VN$(new_size,s$js));
VN$(self.$i_g(i$gz),'frame_size=',size);
VN$(self.$i_g(i$d),'size=',size);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),s$lk),s$lq,'window did resize',self);
}
}
});
self.$def(s$uh,function(self,_cmd,origin){
if(!RTEST(VN$(origin,s$e,VN$(self.$i_g(i$bd),s$jm)))){
VN$(VN$(self.$i_g(i$bd),s$jm),'x=',VN$(origin,s$jo));
VN$(VN$(self.$i_g(i$bd),s$jm),'y=',VN$(origin,s$jp));
VN$(self.$i_g(i$d),'origin=',origin);
VN$(VN$(self.$klass.$c_g_full('NotificationCenter'),s$lk),s$lq,'window did move',self);
}
});
self.$def(s$anc,function(self,_cmd,new_frame){
});
self.$def(s$and,function(self,_cmd){
});
self.$def(s$ane,function(self,_cmd,show){
return self.$i_s(i$hb,show);
});
self.$def(s$anf,function(self,_cmd){
return self.$i_g(i$hb);
});
self.$def(s$ang,function(self,_cmd,increments){
return self.$i_s(i$hc,increments);
});
self.$def(s$anh,function(self,_cmd){
return self.$i_g(i$hc);
});
self.$def(s$ani,function(self,_cmd,ratio){
return self.$i_s(i$hd,ratio);
});
self.$def(s$anj,function(self,_cmd){
return self.$i_g(i$hd);
});
self.$def(s$vn,function(self,_cmd){
});
self.$def(s$ank,function(self,_cmd){
return self.$i_g(i$he);
});
self.$def(s$anl,function(self,_cmd,flag){
return self.$i_s(i$he,flag);
});
self.$def(s$ic,function(self,_cmd){
});
self.$def(s$anm,function(self,_cmd,responder){
if(RTEST(VN$(self.$i_g(i$gy),s$ai,responder))){
return true;
}
if(!RTEST(VN$(self.$i_g(i$gy),s$ms))){
return false;
}
if(RTEST(ORTEST(NOTTEST(responder),ORTEST(NOTTEST(VN$(responder,s$mq)),NOTTEST(VN$(responder,s$mr)))))){
self.$i_s(i$gy,self);
VN$(self,s$ag,'Cant make responder the first responder :(');
return false;
}
self.$i_s(i$gy,responder);
return true;
});
self.$def(s$ann,function(self,_cmd){
});
self.$def(s$ano,function(self,_cmd){
});
self.$def(s$ml,function(self,_cmd,the_event){
});
self.$def(s$anp,function(self,_cmd){
});
self.$def(s$anq,function(self,_cmd,flag){
return self.$i_s(i$hf,flag);
});
self.$def(s$anr,function(self,_cmd){
return self.$i_g(i$hf);
});
self.$def(s$ans,function(self,_cmd,sender){
});
self.$def(s$ant,function(self,_cmd,sender){
});
self.$def(s$anu,function(self,_cmd){
return self.$i_g(i$hg);
});
self.$def(s$anv,function(self,_cmd,sender){
});
self.$def(s$anw,function(self,_cmd){
return self.$i_g(i$hh);
});
self.$def(s$lw,function(self,_cmd,action,object){
});
self.$def(s$rw,function(self,_cmd,color){
return self.$i_s(i$ay,color);
});
self.$def(s$rx,function(self,_cmd){
return self.$i_g(i$ay);
});
self.$def(s$anx,function(self,_cmd,flag){
return self.$i_s(i$hi,flag);
});
self.$def(s$any,function(self,_cmd){
return self.$i_g(i$hi);
});
self.$def(s$anz,function(self,_cmd,flag){
return self.$i_g(i$hj);
});
self.$def(s$aoa,function(self,_cmd){
return self.$i_g(i$hj);
});
self.$def(s$aob,function(self,_cmd,flag){
return self.$i_s(i$hk,flag);
});
self.$def(s$aoc,function(self,_cmd){
return self.$i_g(i$hk);
});
self.$def(s$df,function(self,_cmd){
});
self.$def(s$aod,function(self,_cmd,sender){
VN$(self,s$aoe,self);
VN$(self, s$aof);
return VN$(self, s$aog);
});
self.$def(s$aoe,function(self,_cmd,sender){
});
self.$def(s$aoh,function(self,_cmd,sender){
});
self.$def(s$aoi,function(self,_cmd,sender){
});
self.$def(s$aoj,function(self,_cmd,place,other_win){
});
self.$def(s$aok,function(self,_cmd){
});
self.$def(s$aol,function(self,_cmd,flag){
return self.$i_s(i$hl,flag);
});
self.$def(s$aom,function(self,_cmd){
return self.$i_g(i$hl);
});
self.$def(s$aon,function(self,_cmd){
return self.$i_g(i$hm);
});
self.$def(s$aoo,function(self,_cmd){
return self.$i_g(i$hn);
});
self.$def(s$aop,function(self,_cmd){
return self.$i_g(i$ho);
});
self.$def(s$aoq,function(self,_cmd){
});
self.$def(s$aor,function(self,_cmd){
});
self.$def(s$aof,function(self,_cmd){
});
self.$def(s$aog,function(self,_cmd){
});
self.$def(s$aos,function(self,_cmd){
});
self.$def(s$aot,function(self,_cmd){
});
self.$def(s$aou,function(self,_cmd){
});
self.$def(s$aov,function(self,_cmd){
});
self.$def(s$aow,function(self,_cmd){
});
self.$def(s$aox,function(self,_cmd,point){
return VN$(self.$klass.$c_g_full('Point'),s$is,VN$(VN$(point,s$jo),s$bl,VN$(self.$i_g(i$bd),s$jo)),VN$(VN$(point,s$jp),s$bl,VN$(self.$i_g(i$bd),s$jp)));
});
self.$def(s$oh,function(self,_cmd,point){
var res = VN$(self.$klass.$c_g_full('Point'),s$is,VN$(VN$(point,s$jo),s$fe,VN$(self.$i_g(i$bd),s$jo)),VN$(VN$(point,s$jp),s$fe,VN$(self.$i_g(i$bd),s$jp)));
return res;
});
self.$def(s$aoy,function(self,_cmd,sender){
});
self.$def(s$aoz,function(self,_cmd,sender){
});
self.$def(s$apa,function(self,_cmd,sender){
});
self.$def(s$apb,function(self,_cmd,level){
self.$i_s(i$hp,level);
return VN$(self.$i_g(i$d),s$jh,VN.$h(_$iu,VN$(self.$klass.$c_g_full('WINDOW_LEVELS'),s$bo,level)));
});
self.$def(s$apc,function(self,_cmd){
return self.$i_g(i$hp);
});
self.$def(s$apd,function(self,_cmd,flag){
return self.$i_s(i$hq,flag);
});
self.$def(s$ape,function(self,_cmd){
return self.$i_g(i$hq);
});
self.$def(s$apf,function(self,_cmd){
return self.$i_g(i$gw);
});
self.$def(s$apg,function(self,_cmd){
return self.$i_g(i$gx);
});
self.$def(s$aph,function(self,_cmd,size){
return self.$i_s(i$gw,size);
});
self.$def(s$api,function(self,_cmd,size){
return self.$i_s(i$gx,size);
});
self.$def(s$apj,function(self,_cmd,mask){
});
self.$def(s$apk,function(self,_cmd,event,flag){
});
self.$def(s$nc,function(self,_cmd){
return self.$i_g(i$aa);
});
self.$def(s$apl,function(self,_cmd,flag){
return self.$i_s(i$hr,flag);
});
self.$def(s$apm,function(self,_cmd){
return self.$i_g(i$hr);
});
self.$def(s$apn,function(self,_cmd,flag){
return self.$i_s(i$hs,flag);
});
self.$def(s$apo,function(self,_cmd){
return self.$i_g(i$hs);
});
self.$def(s$nf,function(self,_cmd,event){
var point = VN$(event,s$og);
return (function($v){
if(($e = VN$(_$aq, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'key_up');
}
else if(($e = VN$(_$ap, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'key_down');
}
else if(($e = VN$(_$ah, '===', $v),$e!==nil && $e!==false)){
var hit_test = VN$(self.$i_g(i$gz),s$vv,point);
if(RTEST(ANDTEST(VN$(hit_test,s$d,self.$i_g(i$gy)),VN$(hit_test,s$mq)))){
VN$(self,s$anm,hit_test);
}
VN$(self,s$aod,self);
if(RTEST(VN$(hit_test,s$sx,event))){
return VN$(hit_test,s$ly,event);
}
}
else if(($e = VN$(_$ai, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'left_mouse_up');
}
else if(($e = VN$(_$ab, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'left_mouse_dragged');
}
else if(($e = VN$(_$ax, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'scroll_wheel');
}
else if(($e = VN$(_$aj, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'right_mouse_down');
}
else if(($e = VN$(_$ak, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'right_mouse_up');
}
else if(($e = VN$(_$am, '===', $v),$e!==nil && $e!==false)){
return VN$(self,s$ag,'right_mouse_dragged');
}
})(VN$(event,s$nh));
});
self.$def(s$app,function(self,_cmd){
return self.$i_g(i$ht);
});
self.$def(s$apq,function(self,_cmd,controller){
return self.$i_s(i$ht,controller);
});
self.$def(s$apr,function(self,_cmd){
return self.$i_g(i$hu);
});
self.$def(s$aps,function(self,_cmd){
return self.$i_g(i$hv);
});
self.$def(s$apt,function(self,_cmd,win,place){
});
self.$def(s$apu,function(self,_cmd,win){
});
self.$def(s$apv,function(self,_cmd){
return self.$i_g(i$hw);
});
self.$def(s$apw,function(self,_cmd){
return self.$i_g(i$hx);
});
self.$def(s$apx,function(self,_cmd,win){
return self.$i_s(i$hx,win);
});
self.$def(s$vu,function(self,_cmd){
return self.$i_g(i$hy);
});
self.$def(s$apy,function(self,_cmd,view){
return self.$i_s(i$hz,view);
});
self.$def(s$apz,function(self,_cmd){
return self.$i_g(i$hz);
});
self.$def(s$aqa,function(self,_cmd,sender){
});
self.$def(s$aqb,function(self,_cmd,sender){
});
self.$def(s$aqc,function(self,_cmd,view){
});
self.$def(s$aqd,function(self,_cmd,view){
});
self.$def(s$aqe,function(self,_cmd,flag){
return self.$i_s(i$ia,flag);
});
self.$def(s$aqf,function(self,_cmd){
return self.$i_g(i$ia);
});
self.$def(s$aqg,function(self,_cmd){
});
self.$def(s$aqh,function(self,_cmd,toolbar){
return self.$i_s(i$ib,toolbar);
});
self.$def(s$aqi,function(self,_cmd){
return self.$i_g(i$ib);
});
self.$def(s$aqj,function(self,_cmd,sender){
});
self.$def(s$aqk,function(self,_cmd,sender){
});
self.$def(s$aql,function(self,_cmd,show){
return self.$i_g(i$ic);
});
self.$def(s$aqm,function(self,_cmd){
return self.$i_g(i$ic);
});
})(RClass.define_under(self,'Window',self.$c_g_full('Responder')));
})(RModule.define('Vienna'));
