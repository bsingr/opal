(function(self) {
self.$c_s('CELL_TYPES',VN.$h(_$gd, 0, _$ge, 1, _$cq, 2));
self.$c_s('IMAGE_POSITIONS',VN.$h(_$gf, 0, _$gg, 1, _$fs, 2, _$gh, 3, _$gi, 4, _$gj, 5, _$gk, 6));
self.$c_s('CELL_STATES',VN.$h(_$gl, 0, _$gm, 1));
self.$c_s('CELL_MASKS',VN.$h(_$gn, 0, _$go, 1, _$gp, 2, _$gq, 4, _$gr, 8));
self.$c_s('CONTROL_TINTS',VN.$h(_$gs, 0, _$gt, 1, _$gu, 6, _$gv, 7, _$gw, 10));
self.$c_s('CONTROL_SIZES',VN.$h(_$gx, 0, _$gy, 1, _$gz, 2));
(function(self) {
self.$def_s(s$pz,function(self,_cmd){
});
rb_define_method(self,s$qa,function(self,_cmd,str){
self.$i_s(i$bo,_$ge);
self.$i_s(i$bp,true);
self.$i_s(i$bq,false);
self.$i_s(i$br,false);
self.$i_s(i$bs,_$gl);
self.$i_s(i$bt,str);
self.$i_s(i$at,nil);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
self.$i_s(i$bw,false);
return self.$i_s(i$bx,false);
});
rb_define_method(self,s$qb,function(self,_cmd,img){
});
rb_define_method(self,s$l,function(self,_cmd){
return rb_funcall(self,s$qa,'Cell');
});
rb_define_method(self,s$n,function(self,_cmd,class_name){
return self.$i_s(i$bj,class_name);
});
rb_define_method(self,s$kc,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bj),'vn-control');
});
rb_define_method(self,s$ke,function(self,_cmd,theme_name){
return self.$i_s(i$bk,theme_name);
});
rb_define_method(self,s$kd,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$bk),'');
});
rb_define_method(self,s$qc,function(self,_cmd){
return rb_ivar_get(self, i$by);
});
rb_define_method(self,s$qd,function(self,_cmd,view){
return self.$i_s(i$by,view);
});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_ivar_get(self, i$c);
});
rb_define_method(self,s$qe,function(self,_cmd,a_type){
return self.$i_s(i$c,a_type);
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_ivar_get(self, i$bs);
});
rb_define_method(self,s$qg,function(self,_cmd,state){
return self.$i_s(i$bs,state);
});
rb_define_method(self,s$np,function(self,_cmd){
return rb_ivar_get(self, i$bz);
});
rb_define_method(self,s$nq,function(self,_cmd,target){
return self.$i_s(i$bz,target);
});
rb_define_method(self,s$nr,function(self,_cmd){
return rb_ivar_get(self, i$ca);
});
rb_define_method(self,s$ns,function(self,_cmd,action){
return self.$i_s(i$ca,action);
});
rb_define_method(self,s$nt,function(self,_cmd){
return rb_ivar_get(self, i$cb);
});
rb_define_method(self,s$nu,function(self,_cmd,tag){
return self.$i_s(i$cb,tag);
});
rb_define_method(self,s$qh,function(self,_cmd){
return rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qi,function(self,_cmd,title){
return self.$i_s(i$bt,title);
});
rb_define_method(self,s$mc,function(self,_cmd){
return rb_ivar_get(self, i$cc);
});
rb_define_method(self,s$ob,function(self,_cmd){
return rb_ivar_get(self, i$bp);
});
rb_define_method(self,s$oc,function(self,_cmd,flag){
return self.$i_s(i$bp,flag);
});
rb_define_method(self,s$ny,function(self,_cmd,mask){
});
rb_define_method(self,s$nz,function(self,_cmd){
return rb_ivar_get(self, i$cd);
});
rb_define_method(self,s$oa,function(self,_cmd,flag){
return self.$i_s(i$cd,flag);
});
rb_define_method(self,s$qj,function(self,_cmd){
return rb_ivar_get(self, i$bq);
});
rb_define_method(self,s$qk,function(self,_cmd,flag){
return self.$i_s(i$bq,flag);
});
rb_define_method(self,s$ql,function(self,_cmd){
return rb_ivar_get(self, i$br);
});
rb_define_method(self,s$qm,function(self,_cmd,flag){
return self.$i_s(i$br,flag);
});
rb_define_method(self,s$qn,function(self,_cmd){
return rb_ivar_get(self, i$bu);
});
rb_define_method(self,s$qo,function(self,_cmd,flag){
return self.$i_s(i$bu,flag);
});
rb_define_method(self,s$qp,function(self,_cmd){
return rb_ivar_get(self, i$bv);
});
rb_define_method(self,s$qq,function(self,_cmd,flag){
return self.$i_s(i$bv,flag);
});
rb_define_method(self,s$qr,function(self,_cmd){
return rb_ivar_get(self, i$ce);
});
rb_define_method(self,s$qs,function(self,_cmd,flag){
self.$i_s(i$ce,flag);
if(RTEST(flag)){
rb_funcall(self,'wraps=',false);
}
});
rb_define_method(self,s$qt,function(self,_cmd){
return rb_ivar_get(self, i$bw);
});
rb_define_method(self,s$qu,function(self,_cmd,flag){
return self.$i_s(i$bw,flag);
});
rb_define_method(self,s$oh,function(self,_cmd){
return rb_ivar_get(self, i$cf);
});
rb_define_method(self,s$oi,function(self,_cmd,align){
return self.$i_s(i$cf,align);
});
rb_define_method(self,s$qv,function(self,_cmd){
return rb_ivar_get(self, i$cg);
});
rb_define_method(self,s$qw,function(self,_cmd,flag){
self.$i_s(i$cg,flag);
if(RTEST(flag)){
rb_funcall(self,'scrollable=',false);
}
});
rb_define_method(self,s$oj,function(self,_cmd){
return rb_ivar_get(self, i$ch);
});
rb_define_method(self,s$ok,function(self,_cmd,obj){
return self.$i_s(i$ch,obj);
});
rb_define_method(self,s$qx,function(self,_cmd,str){
return true;
});
rb_define_method(self,s$qy,function(self,_cmd){
return rb_ivar_get(self, i$ci);
});
rb_define_method(self,s$ol,function(self,_cmd,formatter){
return self.$i_s(i$cj,formatter);
});
rb_define_method(self,s$om,function(self,_cmd){
return rb_ivar_get(self, i$cj);
});
rb_define_method(self,s$oo,function(self,_cmd){
});
rb_define_method(self,s$on,function(self,_cmd,obj){
return self.$i_s(i$ck,obj);
});
rb_define_method(self,s$qz,function(self,_cmd){
return true;
});
rb_define_method(self,s$ow,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$oq,function(self,_cmd,str){
return self.$i_s(i$ck,rb_funcall(self, s$ra));
});
rb_define_method(self,s$ox,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$os,function(self,_cmd,val){
return self.$i_s(i$ck,val);
});
rb_define_method(self,s$oz,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$ou,function(self,_cmd,val){
return self.$i_s(i$ck,val);
});
rb_define_method(self,s$pb,function(self,_cmd){
return rb_ivar_get(self, i$ck);
});
rb_define_method(self,s$ov,function(self,_cmd,val){
return self.$i_s(i$ck,val);
});
rb_define_method(self,s$rb,function(self,_cmd,other_cell){
});
rb_define_method(self,s$pi,function(self,_cmd,sender){
});
rb_define_method(self,s$pj,function(self,_cmd,sender){
});
rb_define_method(self,s$pk,function(self,_cmd,sender){
});
rb_define_method(self,s$pm,function(self,_cmd,sender){
});
rb_define_method(self,s$pl,function(self,_cmd,sender){
});
rb_define_method(self,s$ih,function(self,_cmd){
return rb_ivar_get(self, i$at);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$od,function(self,_cmd){
return rb_ivar_get(self, i$cl);
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
return self.$i_s(i$cl,control_tint);
});
rb_define_method(self,s$of,function(self,_cmd,size){
return self.$i_s(i$cm,size);
});
rb_define_method(self,s$og,function(self,_cmd){
return rb_ivar_get(self, i$cm);
});
rb_define_method(self,s$rc,function(self,_cmd){
return rb_ivar_get(self, i$cn);
});
rb_define_method(self,s$rd,function(self,_cmd,obj){
return self.$i_s(i$cn,obj);
});
rb_define_method(self,s$re,function(self,_cmd,a_parameter){
});
self.$def(s$rf,function(self,_cmd,a_parameter,value){
});
rb_define_method(self,s$rg,function(self,_cmd,the_rect){
return the_rect;
});
rb_define_method(self,s$rh,function(self,_cmd,the_rect){
return the_rect;
});
rb_define_method(self,s$ri,function(self,_cmd,the_rect){
return the_rect;
});
rb_define_method(self,s$rj,function(self,_cmd){
});
rb_define_method(self,s$rk,function(self,_cmd,a_rect){
});
self.$def(s$rl,function(self,_cmd,cell_frame,control_view){
});
rb_define_method(self,s$rm,function(self,_cmd,a_rect){
});
rb_define_method(self,s$rn,function(self,_cmd,text_obj){
return text_obj;
});
self.$def(s$ro,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$rp,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$rq,function(self,_cmd,cell_frame,control_view){
});
self.$def(s$rr,function(self,_cmd,flag,cell_frame,control_view){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bw),s$rs,flag))){
self.$i_s(i$bw,flag);
rb_funcall(self,s$nj,cell_frame,control_view);
}
});
rb_define_method(self,s$rt,function(self,_cmd){
});
self.$def(s$ru,function(self,_cmd,delay,interval){
});
rb_define_method(self,s$rv,function(self,_cmd,a_context){
return self.$i_s(i$co,a_context);
});
rb_define_method(self,s$rw,function(self,_cmd){
return rb_ivar_get(self, i$co);
});
self.$def(s$rx,function(self,_cmd,start_point,control_view){
return true;
});
self.$def(s$ry,function(self,_cmd,last_point,current_point,control_view){
return true;
});
self.$def(s$rz,function(self,_cmd,last_point,stop_point,control_view,flag){
});
self.$def(s$pq,function(self,_cmd,the_event,cell_frame,control_view,flag){
var location = rb_funcall(control_view,s$md,rb_funcall(the_event,s$fa),nil);
if(!RTEST(rb_funcall(self,s$rx,location,control_view))){
return false;
}
rb_funcall(self,s$rr,true,cell_frame,control_view);
if(RTEST(rb_funcall(self, s$nz))){
rb_funcall(control_view,s$ph,rb_funcall(self, s$nr),rb_funcall(self, s$np));
}
return rb_funcall(self.$klass.$c_g_full(c$m),s$du,[_$ak,_$ab],function(the_event){
location = rb_funcall(control_view,s$md,rb_funcall(the_event,s$fa),nil);
if(RTEST(flag)){
if(RTEST(rb_funcall(rb_funcall(the_event,s$eb),s$ab,_$ak))){
rb_funcall(self,s$rz,location,location,control_view,true);
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
if(RTEST(rb_funcall(location,s$hv,cell_frame))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$gm))){
self.$i_s(i$bs,_$gl);
}
else{
self.$i_s(i$bs,_$gm);
}
rb_funcall(control_view,s$ph,rb_ivar_get(self, i$ca),rb_ivar_get(self, i$bz));
}
rb_funcall(self,s$rr,false,cell_frame,control_view);
return ;
}
else{
if(!RTEST(rb_funcall(self,s$ry,location,location,control_view))){
rb_funcall(self.$klass.$c_g_full(c$m),s$ea);
}
rb_funcall(self,s$rr,RTEST(rb_funcall(location,s$hv,cell_frame)) ? true : false,cell_frame,control_view);
}
}
});
});
self.$def(s$sa,function(self,_cmd,a_rect,control_view,text_obj,an_obj,the_event){
});
self.$def(s$sb,function(self,_cmd,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
rb_define_method(self,s$sc,function(self,_cmd,text_obj){
});
self.$def(s$sd,function(self,_cmd,cell_frame,control_view){
});
rb_define_method(self,s$do,function(self,_cmd,a_menu){
return self.$i_s(i$p,a_menu);
});
rb_define_method(self,s$dp,function(self,_cmd){
return rb_ivar_get(self, i$p);
});
self.$def(s$se,function(self,_cmd,the_event,cell_frame,view){
});
self.$def_s(s$sf,function(self,_cmd){
});
rb_define_method(self,s$sg,function(self,_cmd,flag){
return self.$i_s(i$cp,flag);
});
rb_define_method(self,s$sh,function(self,_cmd){
return rb_ivar_get(self, i$cp);
});
rb_define_method(self,s$si,function(self,_cmd){
return rb_ivar_get(self, i$cq);
});
rb_define_method(self,s$sj,function(self,_cmd,direction){
return self.$i_s(i$cq,direction);
});
rb_define_method(self,s$sk,function(self,_cmd,mode){
return self.$i_s(i$cr,mode);
});
rb_define_method(self,s$sl,function(self,_cmd){
return rb_ivar_get(self, i$cr);
});
rb_define_method(self,s$sm,function(self,_cmd,flag){
return self.$i_s(i$cs,flag);
});
rb_define_method(self,s$sn,function(self,_cmd){
return rb_ivar_get(self, i$cs);
});
rb_define_method(self,s$ps,function(self,_cmd,flag){
return self.$i_s(i$bx,flag);
});
rb_define_method(self,s$pt,function(self,_cmd){
return rb_ivar_get(self, i$bx);
});
rb_define_method(self,s$so,function(self,_cmd){
return true;
});
rb_define_method(self,s$sp,function(self,_cmd){
return rb_ivar_get(self, i$ct);
});
rb_define_method(self,s$sq,function(self,_cmd,flag){
return self.$i_s(i$ct,flag);
});
rb_define_method(self,s$pr,function(self,_cmd,sender){
});
rb_define_method(self,s$px,function(self,_cmd){
});
rb_define_method(self,s$py,function(self,_cmd,obj){
});
rb_define_method(self,s$sr,function(self,_cmd){
return rb_ivar_get(self, i$cu);
});
rb_define_method(self,s$ss,function(self,_cmd,flag){
self.$i_s(i$cu,flag);
if(!RTEST(flag)){
rb_funcall(self,'imports_graphics=',false);
}
});
rb_define_method(self,s$st,function(self,_cmd){
return rb_ivar_get(self, i$cv);
});
rb_define_method(self,s$su,function(self,_cmd,flag){
self.$i_s(i$cv,flag);
if(RTEST(flag)){
var allows_editing_text_attributes = true;
}
});
rb_define_method(self,s$sv,function(self,_cmd,flag){
return self.$i_s(i$cw,flag);
});
rb_define_method(self,s$sw,function(self,_cmd){
return rb_ivar_get(self, i$cw);
});
rb_define_method(self,s$sx,function(self,_cmd){
});
rb_define_method(self,s$sy,function(self,_cmd){
});
self.$def(s$sz,function(self,_cmd,event,cell_frame,control_view){
});
})(RClass.define_under(self,'Cell',cObject));
})(RModule.define('Vienna'));
