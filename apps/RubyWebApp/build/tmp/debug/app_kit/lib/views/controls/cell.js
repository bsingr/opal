(function(self) {
self.$c_s('CELL_TYPES',VN.$h(_$gj, 0, _$gk, 1, _$cp, 2));
self.$c_s('IMAGE_POSITIONS',VN.$h(_$gl, 0, _$gm, 1, _$fz, 2, _$gn, 3, _$go, 4, _$gp, 5, _$gq, 6));
self.$c_s('CELL_STATES',VN.$h(_$gr, 0, _$gs, 1));
self.$c_s('CELL_MASKS',VN.$h(_$gt, 0, _$gu, 1, _$gv, 2, _$gw, 4, _$gx, 8));
self.$c_s('CONTROL_TINTS',VN.$h(_$gy, 0, _$gz, 1, _$ha, 6, _$hb, 7, _$hc, 10));
self.$c_s('CONTROL_SIZES',VN.$h(_$hd, 0, _$he, 1, _$hf, 2));
(function(self) {
self.$def_s(s$rt,function(self,_){
});
_I(self,s$ru,function(self,_,str){
self.$i_s(i$bo,_$gk);
self.$i_s(i$bp,true);
self.$i_s(i$bq,false);
self.$i_s(i$br,false);
self.$i_s(i$bs,_$gr);
self.$i_s(i$bt,str);
self.$i_s(i$av,nil);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
self.$i_s(i$bw,false);
return self.$i_s(i$bx,false);
});
_I(self,s$rv,function(self,_,img){
});
_I(self,s$n,function(self,_){
return _E(self,s$ru,'Cell');
});
_I(self,s$p,function(self,_,class_name){
return self.$i_s(i$bj,class_name);
});
_I(self,s$lx,function(self,_){
return ORTEST(_H(self,i$bj),'vn-control');
});
_I(self,s$lz,function(self,_,theme_name){
return self.$i_s(i$bk,theme_name);
});
_I(self,s$ly,function(self,_){
return ORTEST(_H(self,i$bk),'');
});
_I(self,s$rw,function(self,_){
return _H(self,i$by);
});
_I(self,s$rx,function(self,_,view){
return self.$i_s(i$by,view);
});
_I(self,s$ec,function(self,_){
return _H(self,i$c);
});
_I(self,s$ry,function(self,_,a_type){
return self.$i_s(i$c,a_type);
});
_I(self,s$rz,function(self,_){
return _H(self,i$bs);
});
_I(self,s$sa,function(self,_,state){
return self.$i_s(i$bs,state);
});
_I(self,s$pj,function(self,_){
return _H(self,i$bz);
});
_I(self,s$pk,function(self,_,target){
return self.$i_s(i$bz,target);
});
_I(self,s$pl,function(self,_){
return _H(self,i$ca);
});
_I(self,s$pm,function(self,_,action){
return self.$i_s(i$ca,action);
});
_I(self,s$pn,function(self,_){
return _H(self,i$cb);
});
_I(self,s$po,function(self,_,tag){
return self.$i_s(i$cb,tag);
});
_I(self,s$sb,function(self,_){
return _H(self,i$bt);
});
_I(self,s$sc,function(self,_,title){
return self.$i_s(i$bt,title);
});
_I(self,s$ny,function(self,_){
return _H(self,i$cc);
});
_I(self,s$pv,function(self,_){
return _H(self,i$bp);
});
_I(self,s$pw,function(self,_,flag){
return self.$i_s(i$bp,flag);
});
_I(self,s$ps,function(self,_,mask){
});
_I(self,s$pt,function(self,_){
return _H(self,i$cd);
});
_I(self,s$pu,function(self,_,flag){
return self.$i_s(i$cd,flag);
});
_I(self,s$sd,function(self,_){
return _H(self,i$bq);
});
_I(self,s$se,function(self,_,flag){
return self.$i_s(i$bq,flag);
});
_I(self,s$sf,function(self,_){
return _H(self,i$br);
});
_I(self,s$sg,function(self,_,flag){
return self.$i_s(i$br,flag);
});
_I(self,s$sh,function(self,_){
return _H(self,i$bu);
});
_I(self,s$si,function(self,_,flag){
return self.$i_s(i$bu,flag);
});
_I(self,s$sj,function(self,_){
return _H(self,i$bv);
});
_I(self,s$sk,function(self,_,flag){
return self.$i_s(i$bv,flag);
});
_I(self,s$sl,function(self,_){
return _H(self,i$ce);
});
_I(self,s$sm,function(self,_,flag){
self.$i_s(i$ce,flag);
if(_A(flag)){
_E(self,s$sn,false);
}
});
_I(self,s$so,function(self,_){
return _H(self,i$bw);
});
_I(self,s$sp,function(self,_,flag){
return self.$i_s(i$bw,flag);
});
_I(self,s$qb,function(self,_){
return _H(self,i$cf);
});
_I(self,s$qc,function(self,_,align){
return self.$i_s(i$cf,align);
});
_I(self,s$sq,function(self,_){
return _H(self,i$cg);
});
_I(self,s$sn,function(self,_,flag){
self.$i_s(i$cg,flag);
if(_A(flag)){
_E(self,s$sm,false);
}
});
_I(self,s$qd,function(self,_){
return _H(self,i$ch);
});
_I(self,s$qe,function(self,_,obj){
return self.$i_s(i$ch,obj);
});
_I(self,s$sr,function(self,_,str){
return true;
});
_I(self,s$ss,function(self,_){
return _H(self,i$ci);
});
_I(self,s$qf,function(self,_,formatter){
return self.$i_s(i$cj,formatter);
});
_I(self,s$qg,function(self,_){
return _H(self,i$cj);
});
_I(self,s$qi,function(self,_){
});
_I(self,s$qh,function(self,_,obj){
return self.$i_s(i$ck,obj);
});
_I(self,s$st,function(self,_){
return true;
});
_I(self,s$qq,function(self,_){
return _H(self,i$ck);
});
_I(self,s$qk,function(self,_,str){
return self.$i_s(i$ck,_E(self,s$su));
});
_I(self,s$qr,function(self,_){
return _H(self,i$ck);
});
_I(self,s$qm,function(self,_,val){
return self.$i_s(i$ck,val);
});
_I(self,s$qt,function(self,_){
return _H(self,i$ck);
});
_I(self,s$qo,function(self,_,val){
return self.$i_s(i$ck,val);
});
_I(self,s$qv,function(self,_){
return _H(self,i$ck);
});
_I(self,s$qp,function(self,_,val){
return self.$i_s(i$ck,val);
});
_I(self,s$sv,function(self,_,other_cell){
});
_I(self,s$rc,function(self,_,sender){
});
_I(self,s$rd,function(self,_,sender){
});
_I(self,s$re,function(self,_,sender){
});
_I(self,s$rg,function(self,_,sender){
});
_I(self,s$rf,function(self,_,sender){
});
_I(self,s$kd,function(self,_){
return _H(self,i$av);
});
_I(self,s$kc,function(self,_,img){
return self.$i_s(i$av,img);
});
_I(self,s$px,function(self,_){
return _H(self,i$cl);
});
_I(self,s$py,function(self,_,control_tint){
return self.$i_s(i$cl,control_tint);
});
_I(self,s$pz,function(self,_,size){
return self.$i_s(i$cm,size);
});
_I(self,s$qa,function(self,_){
return _H(self,i$cm);
});
_I(self,s$sw,function(self,_){
return _H(self,i$cn);
});
_I(self,s$sx,function(self,_,obj){
return self.$i_s(i$cn,obj);
});
_I(self,s$sy,function(self,_,a_parameter){
});
self.$def(s$sz,function(self,_,a_parameter,value){
});
_I(self,s$ta,function(self,_,the_rect){
return the_rect;
});
_I(self,s$tb,function(self,_,the_rect){
return the_rect;
});
_I(self,s$tc,function(self,_,the_rect){
return the_rect;
});
_I(self,s$td,function(self,_){
});
_I(self,s$te,function(self,_,a_rect){
});
self.$def(s$tf,function(self,_,cell_frame,control_view){
});
_I(self,s$tg,function(self,_,a_rect){
});
_I(self,s$th,function(self,_,text_obj){
return text_obj;
});
self.$def(s$ti,function(self,_,cell_frame,control_view){
});
self.$def(s$pd,function(self,_,cell_frame,control_view){
});
self.$def(s$tj,function(self,_,cell_frame,control_view){
});
self.$def(s$tk,function(self,_,cell_frame,control_view){
});
self.$def(s$tl,function(self,_,flag,cell_frame,control_view){
if(_A(_E(_H(self,i$bw),s$tm,flag))){
self.$i_s(i$bw,flag);
_E(self,s$pd,cell_frame,control_view);
}
});
_I(self,s$tn,function(self,_){
});
self.$def(s$to,function(self,_,delay,interval){
});
_I(self,s$tp,function(self,_,a_context){
return self.$i_s(i$co,a_context);
});
_I(self,s$tq,function(self,_){
return _H(self,i$co);
});
self.$def(s$tr,function(self,_,start_point,control_view){
return true;
});
self.$def(s$ts,function(self,_,last_point,current_point,control_view){
return true;
});
self.$def(s$tt,function(self,_,last_point,stop_point,control_view,flag){
});
self.$def(s$rk,function(self,_,the_event,cell_frame,control_view,flag){
var location=_E(control_view,s$nz,_E(the_event,s$fb),nil);
if(!_A(_E(self,s$tr,location,control_view))){
return false;
}
_E(self,s$tl,true,cell_frame,control_view);
if(_A(_E(self,s$pt))){
_E(control_view,s$rb,_E(self,s$pl),_E(self,s$pj));
}
return _E(self.$klass.$c_g_full(c$v),s$dv,[_$aj,_$aa],function(the_event){
location=_E(control_view,s$nz,_E(the_event,s$fb),nil);
if(_A(flag)){
if(_A(_E(_E(the_event,s$ec),s$ad,_$aj))){
_E(self,s$tt,location,location,control_view,true);
_E(self.$klass.$c_g_full(c$v),s$eb);
if(_A(_E(location,s$jq,cell_frame))){
if(_A(_E(_H(self,i$bs),s$ad,_$gs))){
self.$i_s(i$bs,_$gr);
}
else{
self.$i_s(i$bs,_$gs);
}
_E(control_view,s$rb,_H(self,i$ca),_H(self,i$bz));
}
_E(self,s$tl,false,cell_frame,control_view);
return ;
}
else{
if(!_A(_E(self,s$ts,location,location,control_view))){
_E(self.$klass.$c_g_full(c$v),s$eb);
}
_E(self,s$tl,_A(_E(location,s$jq,cell_frame)) ? true : false,cell_frame,control_view);
}
}
});
});
self.$def(s$tu,function(self,_,a_rect,control_view,text_obj,an_obj,the_event){
});
self.$def(s$tv,function(self,_,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
_I(self,s$tw,function(self,_,text_obj){
});
self.$def(s$tx,function(self,_,cell_frame,control_view){
});
_I(self,s$dp,function(self,_,a_menu){
return self.$i_s(i$p,a_menu);
});
_I(self,s$dq,function(self,_){
return _H(self,i$p);
});
self.$def(s$ty,function(self,_,the_event,cell_frame,view){
});
self.$def_s(s$tz,function(self,_){
});
_I(self,s$ua,function(self,_,flag){
return self.$i_s(i$cp,flag);
});
_I(self,s$ub,function(self,_){
return _H(self,i$cp);
});
_I(self,s$uc,function(self,_){
return _H(self,i$cq);
});
_I(self,s$ud,function(self,_,direction){
return self.$i_s(i$cq,direction);
});
_I(self,s$ue,function(self,_,mode){
return self.$i_s(i$cr,mode);
});
_I(self,s$uf,function(self,_){
return _H(self,i$cr);
});
_I(self,s$ug,function(self,_,flag){
return self.$i_s(i$cs,flag);
});
_I(self,s$uh,function(self,_){
return _H(self,i$cs);
});
_I(self,s$rm,function(self,_,flag){
return self.$i_s(i$bx,flag);
});
_I(self,s$rn,function(self,_){
return _H(self,i$bx);
});
_I(self,s$ui,function(self,_){
return true;
});
_I(self,s$uj,function(self,_){
return _H(self,i$ct);
});
_I(self,s$uk,function(self,_,flag){
return self.$i_s(i$ct,flag);
});
_I(self,s$rl,function(self,_,sender){
});
_I(self,s$rr,function(self,_){
});
_I(self,s$rs,function(self,_,obj){
});
_I(self,s$ul,function(self,_){
return _H(self,i$cu);
});
_I(self,s$um,function(self,_,flag){
self.$i_s(i$cu,flag);
if(!_A(flag)){
_E(self,s$un,false);
}
});
_I(self,s$uo,function(self,_){
return _H(self,i$cv);
});
_I(self,s$un,function(self,_,flag){
self.$i_s(i$cv,flag);
if(_A(flag)){
var allows_editing_text_attributes=true;
}
});
_I(self,s$up,function(self,_,flag){
return self.$i_s(i$cw,flag);
});
_I(self,s$uq,function(self,_){
return _H(self,i$cw);
});
_I(self,s$ur,function(self,_){
});
_I(self,s$us,function(self,_){
});
self.$def(s$ut,function(self,_,event,cell_frame,control_view){
});
})(_N(self,c$aj,cObject));
})(_K(c$b));
