(function(self) {
self.$c_s('CELL_TYPES',VN.$h(_$ha, 0, _$hb, 1, _$cp, 2));
self.$c_s('IMAGE_POSITIONS',VN.$h(_$hc, 0, _$hd, 1, _$gf, 2, _$gg, 3, _$he, 4, _$hf, 5, _$hg, 6));
self.$c_s('CELL_STATES',VN.$h(_$hh, 0, _$hi, 1));
self.$c_s('CELL_MASKS',VN.$h(_$hj, 0, _$hk, 1, _$hl, 2, _$hm, 4, _$hn, 8));
self.$c_s('CONTROL_TINTS',VN.$h(_$ho, 0, _$hp, 1, _$hq, 6, _$hr, 7, _$hs, 10));
self.$c_s('CONTROL_SIZES',VN.$h(_$fy, 0, _$fz, 1, _$ga, 2));
(function(self) {
self.$def_s(s$zm,function(self,_){
});
_I(self,s$zn,function(self,_,str){
self.$i_s(i$ck,_$hb);
self.$i_s(i$cl,true);
self.$i_s(i$cm,false);
self.$i_s(i$cn,false);
self.$i_s(i$co,_$hh);
self.$i_s(i$cp,str);
self.$i_s(i$az,nil);
self.$i_s(i$cq,false);
self.$i_s(i$cr,false);
self.$i_s(i$bh,false);
return self.$i_s(i$cs,false);
});
_I(self,s$zo,function(self,_,img){
});
_I(self,s$n,function(self,_){
return _E(self,s$zn,'Cell');
});
_I(self,s$p,function(self,_,class_name){
return self.$i_s(i$ct,class_name);
});
_I(self,s$wu,function(self,_){
return ORTEST(_H(self,i$ct),'vn-control');
});
_I(self,s$wv,function(self,_,theme_name){
return self.$i_s(i$cu,theme_name);
});
_I(self,s$ww,function(self,_){
return ORTEST(_H(self,i$cu),'');
});
_I(self,s$zp,function(self,_){
return _H(self,i$cv);
});
_I(self,s$zq,function(self,_,view){
return self.$i_s(i$cv,view);
});
_I(self,s$fs,function(self,_){
return _H(self,i$c);
});
_I(self,s$zr,function(self,_,a_type){
return self.$i_s(i$c,a_type);
});
_I(self,s$zs,function(self,_){
return _H(self,i$co);
});
_I(self,s$zt,function(self,_,state){
return self.$i_s(i$co,state);
});
_I(self,s$xc,function(self,_){
return _H(self,i$cw);
});
_I(self,s$xd,function(self,_,target){
return self.$i_s(i$cw,target);
});
_I(self,s$xe,function(self,_){
return _H(self,i$cx);
});
_I(self,s$xf,function(self,_,action){
return self.$i_s(i$cx,action);
});
_I(self,s$xg,function(self,_,block){
var obj=_E(self.$klass.$c_g_full(c$j),s$aq);
_E(obj,s$zu,'@action',block);
obj.$def_s(s$zv,function(self,_,sender){
return _E(_H(self,i$cx),s$ap,sender);
});
_E(self,s$xf,_$ht);
return _E(self,s$xd,obj);
});
_I(self,s$xh,function(self,_){
return _H(self,i$cy);
});
_I(self,s$xi,function(self,_,tag){
return self.$i_s(i$cy,tag);
});
_I(self,s$zw,function(self,_){
return _H(self,i$cp);
});
_I(self,s$zx,function(self,_,title){
return self.$i_s(i$cp,title);
});
_I(self,s$vq,function(self,_){
return _H(self,i$cz);
});
_I(self,s$xp,function(self,_){
return _H(self,i$cl);
});
_I(self,s$xq,function(self,_,flag){
return self.$i_s(i$cl,flag);
});
_I(self,s$xm,function(self,_,mask){
});
_I(self,s$xn,function(self,_){
return _H(self,i$da);
});
_I(self,s$xo,function(self,_,flag){
return self.$i_s(i$da,flag);
});
_I(self,s$zy,function(self,_){
return _H(self,i$cm);
});
_I(self,s$zz,function(self,_,flag){
return self.$i_s(i$cm,flag);
});
_I(self,s$aaa,function(self,_){
return _H(self,i$cn);
});
_I(self,s$aab,function(self,_,flag){
return self.$i_s(i$cn,flag);
});
_I(self,s$aac,function(self,_){
return _H(self,i$cq);
});
_I(self,s$aad,function(self,_,flag){
return self.$i_s(i$cq,flag);
});
_I(self,s$aae,function(self,_){
return _H(self,i$cr);
});
_I(self,s$aaf,function(self,_,flag){
return self.$i_s(i$cr,flag);
});
_I(self,s$aag,function(self,_){
return _H(self,i$db);
});
_I(self,s$aah,function(self,_,flag){
self.$i_s(i$db,flag);
if(_A(flag)){
_E(self,s$aai,false);
}
});
_I(self,s$aaj,function(self,_){
return _H(self,i$bh);
});
_I(self,s$aak,function(self,_,flag){
return self.$i_s(i$bh,flag);
});
_I(self,s$tb,function(self,_){
return _H(self,i$bs);
});
_I(self,s$tc,function(self,_,align){
return self.$i_s(i$bs,align);
});
_I(self,s$aal,function(self,_){
return _H(self,i$dc);
});
_I(self,s$aai,function(self,_,flag){
self.$i_s(i$dc,flag);
if(_A(flag)){
_E(self,s$aah,false);
}
});
_I(self,s$xv,function(self,_){
return _H(self,i$dd);
});
_I(self,s$xw,function(self,_,obj){
return self.$i_s(i$dd,obj);
});
_I(self,s$aam,function(self,_,str){
return true;
});
_I(self,s$aan,function(self,_){
return _H(self,i$de);
});
_I(self,s$xx,function(self,_,formatter){
return self.$i_s(i$df,formatter);
});
_I(self,s$xy,function(self,_){
return _H(self,i$df);
});
_I(self,s$ya,function(self,_){
});
_I(self,s$xz,function(self,_,obj){
return self.$i_s(i$dg,obj);
});
_I(self,s$aao,function(self,_){
return true;
});
_I(self,s$yi,function(self,_){
return _H(self,i$dg);
});
_I(self,s$yc,function(self,_,str){
return self.$i_s(i$dg,_E(self,s$aap));
});
_I(self,s$yj,function(self,_){
return _H(self,i$dg);
});
_I(self,s$ye,function(self,_,val){
return self.$i_s(i$dg,val);
});
_I(self,s$yl,function(self,_){
return _H(self,i$dg);
});
_I(self,s$yg,function(self,_,val){
return self.$i_s(i$dg,val);
});
_I(self,s$yn,function(self,_){
return _H(self,i$dg);
});
_I(self,s$yh,function(self,_,val){
return self.$i_s(i$dg,val);
});
_I(self,s$aaq,function(self,_,other_cell){
});
_I(self,s$yv,function(self,_,sender){
});
_I(self,s$yw,function(self,_,sender){
});
_I(self,s$yx,function(self,_,sender){
});
_I(self,s$yz,function(self,_,sender){
});
_I(self,s$yy,function(self,_,sender){
});
_I(self,s$na,function(self,_){
return _H(self,i$az);
});
_I(self,s$mz,function(self,_,img){
return self.$i_s(i$az,img);
});
_I(self,s$xr,function(self,_){
return _H(self,i$dh);
});
_I(self,s$xs,function(self,_,control_tint){
return self.$i_s(i$dh,control_tint);
});
_I(self,s$xt,function(self,_,size){
return self.$i_s(i$di,size);
});
_I(self,s$xu,function(self,_){
return _H(self,i$di);
});
_I(self,s$aar,function(self,_){
return _H(self,i$dj);
});
_I(self,s$aas,function(self,_,obj){
return self.$i_s(i$dj,obj);
});
_I(self,s$aat,function(self,_,a_parameter){
});
self.$def(s$aau,function(self,_,a_parameter,value){
});
_I(self,s$aav,function(self,_,the_rect){
return the_rect;
});
_I(self,s$aaw,function(self,_,the_rect){
return the_rect;
});
_I(self,s$aax,function(self,_,the_rect){
return the_rect;
});
_I(self,s$aay,function(self,_){
});
_I(self,s$aaz,function(self,_,a_rect){
});
self.$def(s$aba,function(self,_,cell_frame,control_view){
});
_I(self,s$abb,function(self,_,a_rect){
});
_I(self,s$abc,function(self,_,text_obj){
return text_obj;
});
self.$def(s$abd,function(self,_,cell_frame,control_view){
});
self.$def(s$wt,function(self,_,cell_frame,control_view){
});
self.$def(s$abe,function(self,_,cell_frame,control_view){
});
self.$def(s$yo,function(self,_,cell_frame,control_view){
});
self.$def(s$abf,function(self,_,flag,cell_frame,control_view){
if(_A(_E(_H(self,i$bh),s$abg,flag))){
self.$i_s(i$bh,flag);
(function($v){
if(($e = _E(_$gq, '===', $v),$e!==nil && $e!==false)){
return _E(self,s$wt,cell_frame,control_view);
}
else {
return _E(self,s$yo,cell_frame,control_view);
}
})(_E(control_view,s$b));
}
});
_I(self,s$abh,function(self,_){
});
self.$def(s$abi,function(self,_,delay,interval){
});
_I(self,s$abj,function(self,_,a_context){
return self.$i_s(i$dk,a_context);
});
_I(self,s$abk,function(self,_){
return _H(self,i$dk);
});
self.$def(s$abl,function(self,_,start_point,control_view){
return true;
});
self.$def(s$abm,function(self,_,last_point,current_point,control_view){
return true;
});
self.$def(s$abn,function(self,_,last_point,stop_point,control_view,flag){
});
self.$def(s$zd,function(self,_,the_event,cell_frame,control_view,flag){
var location=_E(control_view,s$vr,_E(the_event,s$gr),nil);
if(!_A(_E(self,s$abl,location,control_view))){
return false;
}
_E(self,s$abf,true,cell_frame,control_view);
if(_A(_E(self,s$xn))){
_E(control_view,s$yu,_E(self,s$xe),_E(self,s$xc));
}
return _E(self.$klass.$c_g_full(c$y),s$fm,[_$aj,_$aa],function(the_event){
location=_E(control_view,s$vr,_E(the_event,s$gr),nil);
if(_A(flag)){
if(_A(_E(_E(the_event,s$fs),s$ad,_$aj))){
_E(self,s$abn,location,location,control_view,true);
_E(self.$klass.$c_g_full(c$y),s$fr);
if(_A(_E(location,s$mp,cell_frame))){
if(_A(_E(_H(self,i$co),s$ad,_$hi))){
self.$i_s(i$co,_$hh);
}
else{
self.$i_s(i$co,_$hi);
}
_E(control_view,s$yu,_H(self,i$cx),_H(self,i$cw));
}
_E(self,s$abf,false,cell_frame,control_view);
return ;
}
else{
if(!_A(_E(self,s$abm,location,location,control_view))){
_E(self.$klass.$c_g_full(c$y),s$fr);
}
if(_A(_E(self,s$xn))){
_E(control_view,s$yu,_E(self,s$xe),_E(self,s$xc));
}
_E(self,s$abf,_A(_E(location,s$mp,cell_frame)) ? true : false,cell_frame,control_view);
}
}
});
});
self.$def(s$abo,function(self,_,a_rect,control_view,text_obj,an_obj,the_event){
});
self.$def(s$abp,function(self,_,a_rect,control_view,text_obj,an_obj,sel_start,sel_length){
});
_I(self,s$di,function(self,_,text_obj){
});
self.$def(s$abq,function(self,_,cell_frame,control_view){
});
_I(self,s$fg,function(self,_,a_menu){
return self.$i_s(i$t,a_menu);
});
_I(self,s$fh,function(self,_){
return _H(self,i$t);
});
self.$def(s$abr,function(self,_,the_event,cell_frame,view){
});
self.$def_s(s$abs,function(self,_){
});
_I(self,s$abt,function(self,_,flag){
return self.$i_s(i$dl,flag);
});
_I(self,s$abu,function(self,_){
return _H(self,i$dl);
});
_I(self,s$abv,function(self,_){
return _H(self,i$dm);
});
_I(self,s$abw,function(self,_,direction){
return self.$i_s(i$dm,direction);
});
_I(self,s$abx,function(self,_,mode){
return self.$i_s(i$dn,mode);
});
_I(self,s$tm,function(self,_){
return _H(self,i$dn);
});
_I(self,s$aby,function(self,_,flag){
return self.$i_s(i$do,flag);
});
_I(self,s$abz,function(self,_){
return _H(self,i$do);
});
_I(self,s$zf,function(self,_,flag){
return self.$i_s(i$cs,flag);
});
_I(self,s$zg,function(self,_){
return _H(self,i$cs);
});
_I(self,s$aca,function(self,_){
return true;
});
_I(self,s$acb,function(self,_){
return _H(self,i$dp);
});
_I(self,s$acc,function(self,_,flag){
return self.$i_s(i$dp,flag);
});
_I(self,s$ze,function(self,_,sender){
});
_I(self,s$zk,function(self,_){
});
_I(self,s$zl,function(self,_,obj){
});
_I(self,s$acd,function(self,_){
return _H(self,i$dq);
});
_I(self,s$ace,function(self,_,flag){
self.$i_s(i$dq,flag);
if(!_A(flag)){
_E(self,s$acf,false);
}
});
_I(self,s$acg,function(self,_){
return _H(self,i$dr);
});
_I(self,s$acf,function(self,_,flag){
self.$i_s(i$dr,flag);
if(_A(flag)){
var allows_editing_text_attributes=true;
}
});
_I(self,s$ach,function(self,_,flag){
return self.$i_s(i$ds,flag);
});
_I(self,s$aci,function(self,_){
return _H(self,i$ds);
});
_I(self,s$acj,function(self,_){
});
_I(self,s$ack,function(self,_){
});
self.$def(s$acl,function(self,_,event,cell_frame,control_view){
});
})(_N(self,c$aq,cObject));
})(_K(c$b));
