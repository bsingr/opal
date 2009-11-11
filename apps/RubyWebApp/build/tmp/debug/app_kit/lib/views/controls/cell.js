(function(self) {
self.$c_s('CELL_TYPES',VN.$h(_$gx, 0, _$gy, 1, _$cp, 2));
self.$c_s('IMAGE_POSITIONS',VN.$h(_$gz, 0, _$ha, 1, _$fy, 2, _$gh, 3, _$hb, 4, _$hc, 5, _$hd, 6));
self.$c_s('CELL_STATES',VN.$h(_$he, 0, _$hf, 1));
self.$c_s('CELL_MASKS',VN.$h(_$hg, 0, _$hh, 1, _$hi, 2, _$hj, 4, _$hk, 8));
self.$c_s('CONTROL_TINTS',VN.$h(_$hl, 0, _$hm, 1, _$hn, 6, _$ho, 7, _$hp, 10));
self.$c_s('CONTROL_SIZES',VN.$h(_$hq, 0, _$hr, 1, _$hs, 2));
(function(self) {
self.$def_s(s$wk,function(self,_){
});
_I(self,s$wl,function(self,_,str){
self.$i_s(i$cc,_$gy);
self.$i_s(i$cd,true);
self.$i_s(i$ce,false);
self.$i_s(i$cf,false);
self.$i_s(i$cg,_$he);
self.$i_s(i$ch,str);
self.$i_s(i$ax,nil);
self.$i_s(i$ci,false);
self.$i_s(i$cj,false);
self.$i_s(i$ck,false);
return self.$i_s(i$cl,false);
});
_I(self,s$wm,function(self,_,img){
});
_I(self,s$n,function(self,_){
return _E(self,s$wl,'Cell');
});
_I(self,s$p,function(self,_,class_name){
return self.$i_s(i$bx,class_name);
});
_I(self,s$qq,function(self,_){
return ORTEST(_H(self,i$bx),'vn-control');
});
_I(self,s$qs,function(self,_,theme_name){
return self.$i_s(i$by,theme_name);
});
_I(self,s$qr,function(self,_){
return ORTEST(_H(self,i$by),'');
});
_I(self,s$wn,function(self,_){
return _H(self,i$cm);
});
_I(self,s$wo,function(self,_,view){
return self.$i_s(i$cm,view);
});
_I(self,s$ew,function(self,_){
return _H(self,i$c);
});
_I(self,s$wp,function(self,_,a_type){
return self.$i_s(i$c,a_type);
});
_I(self,s$wq,function(self,_){
return _H(self,i$cg);
});
_I(self,s$wr,function(self,_,state){
return self.$i_s(i$cg,state);
});
_I(self,s$ua,function(self,_){
return _H(self,i$cn);
});
_I(self,s$ub,function(self,_,target){
return self.$i_s(i$cn,target);
});
_I(self,s$uc,function(self,_){
return _H(self,i$co);
});
_I(self,s$ud,function(self,_,action){
return self.$i_s(i$co,action);
});
_I(self,s$ue,function(self,_,block){
var obj=_E(self.$klass.$c_g_full(c$i),s$ap);
_E(obj,s$ws,'@action',block);
obj.$def_s(s$wt,function(self,_,sender){
return _E(_H(self,i$co),s$ao,sender);
});
_E(self,s$ud,_$ht);
return _E(self,s$ub,obj);
});
_I(self,s$uf,function(self,_){
return _H(self,i$cp);
});
_I(self,s$ug,function(self,_,tag){
return self.$i_s(i$cp,tag);
});
_I(self,s$wu,function(self,_){
return _H(self,i$ch);
});
_I(self,s$wv,function(self,_,title){
return self.$i_s(i$ch,title);
});
_I(self,s$sr,function(self,_){
return _H(self,i$cq);
});
_I(self,s$un,function(self,_){
return _H(self,i$cd);
});
_I(self,s$uo,function(self,_,flag){
return self.$i_s(i$cd,flag);
});
_I(self,s$uk,function(self,_,mask){
});
_I(self,s$ul,function(self,_){
return _H(self,i$cr);
});
_I(self,s$um,function(self,_,flag){
return self.$i_s(i$cr,flag);
});
_I(self,s$ww,function(self,_){
return _H(self,i$ce);
});
_I(self,s$wx,function(self,_,flag){
return self.$i_s(i$ce,flag);
});
_I(self,s$wy,function(self,_){
return _H(self,i$cf);
});
_I(self,s$wz,function(self,_,flag){
return self.$i_s(i$cf,flag);
});
_I(self,s$xa,function(self,_){
return _H(self,i$ci);
});
_I(self,s$xb,function(self,_,flag){
return self.$i_s(i$ci,flag);
});
_I(self,s$xc,function(self,_){
return _H(self,i$cj);
});
_I(self,s$xd,function(self,_,flag){
return self.$i_s(i$cj,flag);
});
_I(self,s$xe,function(self,_){
return _H(self,i$cs);
});
_I(self,s$xf,function(self,_,flag){
self.$i_s(i$cs,flag);
if(_A(flag)){
_E(self,s$xg,false);
}
});
_I(self,s$xh,function(self,_){
return _H(self,i$ck);
});
_I(self,s$xi,function(self,_,flag){
return self.$i_s(i$ck,flag);
});
_I(self,s$qa,function(self,_){
return _H(self,i$bj);
});
_I(self,s$qb,function(self,_,align){
return self.$i_s(i$bj,align);
});
_I(self,s$xj,function(self,_){
return _H(self,i$ct);
});
_I(self,s$xg,function(self,_,flag){
self.$i_s(i$ct,flag);
if(_A(flag)){
_E(self,s$xf,false);
}
});
_I(self,s$ut,function(self,_){
return _H(self,i$cu);
});
_I(self,s$uu,function(self,_,obj){
return self.$i_s(i$cu,obj);
});
_I(self,s$xk,function(self,_,str){
return true;
});
_I(self,s$xl,function(self,_){
return _H(self,i$cv);
});
_I(self,s$uv,function(self,_,formatter){
return self.$i_s(i$cw,formatter);
});
_I(self,s$uw,function(self,_){
return _H(self,i$cw);
});
_I(self,s$uy,function(self,_){
});
_I(self,s$ux,function(self,_,obj){
return self.$i_s(i$cx,obj);
});
_I(self,s$xm,function(self,_){
return true;
});
_I(self,s$vg,function(self,_){
return _H(self,i$cx);
});
_I(self,s$va,function(self,_,str){
return self.$i_s(i$cx,_E(self,s$xn));
});
_I(self,s$vh,function(self,_){
return _H(self,i$cx);
});
_I(self,s$vc,function(self,_,val){
return self.$i_s(i$cx,val);
});
_I(self,s$vj,function(self,_){
return _H(self,i$cx);
});
_I(self,s$ve,function(self,_,val){
return self.$i_s(i$cx,val);
});
_I(self,s$vl,function(self,_){
return _H(self,i$cx);
});
_I(self,s$vf,function(self,_,val){
return self.$i_s(i$cx,val);
});
_I(self,s$xo,function(self,_,other_cell){
});
_I(self,s$vt,function(self,_,sender){
});
_I(self,s$vu,function(self,_,sender){
});
_I(self,s$vv,function(self,_,sender){
});
_I(self,s$vx,function(self,_,sender){
});
_I(self,s$vw,function(self,_,sender){
});
_I(self,s$kw,function(self,_){
return _H(self,i$ax);
});
_I(self,s$kv,function(self,_,img){
return self.$i_s(i$ax,img);
});
_I(self,s$up,function(self,_){
return _H(self,i$cy);
});
_I(self,s$uq,function(self,_,control_tint){
return self.$i_s(i$cy,control_tint);
});
_I(self,s$ur,function(self,_,size){
return self.$i_s(i$cz,size);
});
_I(self,s$us,function(self,_){
return _H(self,i$cz);
});
_I(self,s$xp,function(self,_){
return _H(self,i$da);
});
_I(self,s$xq,function(self,_,obj){
return self.$i_s(i$da,obj);
});
_I(self,s$xr,function(self,_,a_parameter){
});
self.$def(s$xs,function(self,_,a_parameter,value){
});
_I(self,s$xt,function(self,_,the_rect){
return the_rect;
});
_I(self,s$xu,function(self,_,the_rect){
return the_rect;
});
_I(self,s$xv,function(self,_,the_rect){
return the_rect;
});
_I(self,s$xw,function(self,_){
});
_I(self,s$xx,function(self,_,a_rect){
});
self.$def(s$xy,function(self,_,cell_frame,control_view){
});
_I(self,s$xz,function(self,_,a_rect){
});
_I(self,s$ya,function(self,_,text_obj){
return text_obj;
});
self.$def(s$yb,function(self,_,cell_frame,control_view){
});
self.$def(s$tu,function(self,_,cell_frame,control_view){
});
self.$def(s$yc,function(self,_,cell_frame,control_view){
});
self.$def(s$vm,function(self,_,cell_frame,control_view){
});
self.$def(s$yd,function(self,_,flag,cell_frame,control_view){
if(_A(_E(_H(self,i$ck),s$ye,flag))){
self.$i_s(i$ck,flag);
(function($v){
if(($e = _E(_$gr, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$tu,cell_frame,control_view);
}
else {
return _E(self,s$vm,cell_frame,control_view);
}
})(_E(control_view,s$b));
}
});
_I(self,s$yf,function(self,_){
});
self.$def(s$yg,function(self,_,delay,interval){
});
_I(self,s$yh,function(self,_,a_context){
return self.$i_s(i$db,a_context);
});
_I(self,s$yi,function(self,_){
return _H(self,i$db);
});
self.$def(s$yj,function(self,_,start_point,control_view){
return true;
});
self.$def(s$yk,function(self,_,last_point,current_point,control_view){
return true;
});
self.$def(s$yl,function(self,_,last_point,stop_point,control_view,flag){
});
self.$def(s$wb,function(self,_,the_event,cell_frame,control_view,flag){
var location=_E(control_view,s$ss,_E(the_event,s$fv),nil);
if(!_A(_E(self,s$yj,location,control_view))){
return false;
}
_E(self,s$yd,true,cell_frame,control_view);
if(_A(_E(self,s$ul))){
_E(control_view,s$vs,_E(self,s$uc),_E(self,s$ua));
}
return _E(self.$klass.$c_g_full(c$w),s$ep,[_$aj,_$aa],function(the_event){
location=_E(control_view,s$ss,_E(the_event,s$fv),nil);
if(_A(flag)){
if(_A(_E(_E(the_event,s$ew),s$ad,_$aj))){
_E(self,s$yl,location,location,control_view,true);
_E(self.$klass.$c_g_full(c$w),s$ev);
if(_A(_E(location,s$kj,cell_frame))){
if(_A(_E(_H(self,i$cg),s$ad,_$hf))){
self.$i_s(i$cg,_$he);
}
else{
self.$i_s(i$cg,_$hf);
}
_E(control_view,s$vs,_H(self,i$co),_H(self,i$cn));
}
_E(self,s$yd,false,cell_frame,control_view);
return ;
}
else{
if(!_A(_E(self,s$yk,location,location,control_view))){
_E(self.$klass.$c_g_full(c$w),s$ev);
}
if(_A(_E(self,s$ul))){
_E(control_view,s$vs,_E(self,s$uc),_E(self,s$ua));
}
_E(self,s$yd,_A(_E(location,s$kj,cell_frame)) ? true : false,cell_frame,control_view);
}
}
});
});
self.$def(s$ym,function(self,_,a_rect,control_view,text_obj,an_obj,the_event){
});
self.$def(s$yn,function(self,_,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
_I(self,s$dh,function(self,_,text_obj){
});
self.$def(s$yo,function(self,_,cell_frame,control_view){
});
_I(self,s$ej,function(self,_,a_menu){
return self.$i_s(i$r,a_menu);
});
_I(self,s$ek,function(self,_){
return _H(self,i$r);
});
self.$def(s$yp,function(self,_,the_event,cell_frame,view){
});
self.$def_s(s$yq,function(self,_){
});
_I(self,s$yr,function(self,_,flag){
return self.$i_s(i$dc,flag);
});
_I(self,s$ys,function(self,_){
return _H(self,i$dc);
});
_I(self,s$yt,function(self,_){
return _H(self,i$dd);
});
_I(self,s$yu,function(self,_,direction){
return self.$i_s(i$dd,direction);
});
_I(self,s$yv,function(self,_,mode){
return self.$i_s(i$de,mode);
});
_I(self,s$ql,function(self,_){
return _H(self,i$de);
});
_I(self,s$yw,function(self,_,flag){
return self.$i_s(i$df,flag);
});
_I(self,s$yx,function(self,_){
return _H(self,i$df);
});
_I(self,s$wd,function(self,_,flag){
return self.$i_s(i$cl,flag);
});
_I(self,s$we,function(self,_){
return _H(self,i$cl);
});
_I(self,s$yy,function(self,_){
return true;
});
_I(self,s$yz,function(self,_){
return _H(self,i$dg);
});
_I(self,s$za,function(self,_,flag){
return self.$i_s(i$dg,flag);
});
_I(self,s$wc,function(self,_,sender){
});
_I(self,s$wi,function(self,_){
});
_I(self,s$wj,function(self,_,obj){
});
_I(self,s$zb,function(self,_){
return _H(self,i$dh);
});
_I(self,s$zc,function(self,_,flag){
self.$i_s(i$dh,flag);
if(!_A(flag)){
_E(self,s$zd,false);
}
});
_I(self,s$ze,function(self,_){
return _H(self,i$di);
});
_I(self,s$zd,function(self,_,flag){
self.$i_s(i$di,flag);
if(_A(flag)){
var allows_editing_text_attributes=true;
}
});
_I(self,s$zf,function(self,_,flag){
return self.$i_s(i$dj,flag);
});
_I(self,s$zg,function(self,_){
return _H(self,i$dj);
});
_I(self,s$zh,function(self,_){
});
_I(self,s$zi,function(self,_){
});
self.$def(s$zj,function(self,_,event,cell_frame,control_view){
});
})(_N(self,c$am,cObject));
})(_K(c$b));
