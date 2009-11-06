(function(self) {
(function(self) {
_I(self,s$n,function(self,_,frame){
rb_supcall(arguments.callee, self,_,[]);
_E(self,s$lu);
self.$i_s(i$bb,frame);
self.$i_s(i$bc,_E(self.$klass.$c_g_full(c$ad),s$ap,0,0,_E(frame,s$ae),_E(frame,s$af)));
_E(self,s$w,frame);
self.$i_s(i$bd,[]);
self.$i_s(i$ac,nil);
self.$i_s(i$be,nil);
self.$i_s(i$bf,false);
self.$i_s(i$bg,true);
return self.$i_s(i$bh,[]);
});
self.$def_s(s$lv,function(self,_,options,block){
var view=_E(self,s$ap,_E(options,s$j,_$gc));
if(_A(block)){
arguments[arguments.length -1](view);
}
return view;
});
_I(self,s$o,function(self,_){
return _H(self,i$b);
});
_I(self,s$b,function(self,_){
return _$gd;
});
_I(self,s$lu,function(self,_){
if(_A(_E(_E(self,s$b),s$ad,_$gd))){
self.$i_s(i$b,_E(self.$klass.$c_g_full(c$e),s$ap,_$ge,nil));
_E(_H(self,i$b),s$q,VN.$h(_$gf,'hidden'));
self.$i_s(i$bi,_E(self.$klass.$c_g_full(c$ae),s$ap,_$ge,nil));
_E(_H(self,i$b),s$e,_H(self,i$bi));
}
else{
self.$i_s(i$b,_E(self.$klass.$c_g_full(c$e),s$ap,_$ge));
self.$i_s(i$bi,_E(self.$klass.$c_g_full(c$z),s$ap));
_E(_H(self,i$b),s$e,_H(self,i$bi));
}
});
_I(self,s$lw,function(self,_,the_event){
return true;
});
_I(self,s$dk,function(self,_){
return true;
});
_I(self,s$lx,function(self,_){
return ORTEST(_H(self,i$bj),'vn-view');
});
_I(self,s$p,function(self,_,a_class){
return self.$i_s(i$bj,a_class);
});
_I(self,s$ly,function(self,_){
return ORTEST(_H(self,i$bk),'');
});
_I(self,s$lz,function(self,_,a_theme){
return self.$i_s(i$bk,a_theme);
});
_I(self,s$gg,function(self,_){
return _E(_H(self,i$bi),s$o).getContext('2d');});
_I(self,s$ma,function(self,_,coder){
});
_I(self,s$mb,function(self,_,builder){
});
self.$def_s(s$mc,function(self,_){
});
_E(self,s$mc,_$gc,_$gg);
_I(self,s$ba,function(self,_){
});
_I(self,s$dx,function(self,_){
});
_I(self,s$md,function(self,_){
});
_I(self,s$me,function(self,_){
});
_I(self,s$mf,function(self,_,a_view){
});
_I(self,s$mg,function(self,_,a_view){
});
_I(self,s$mh,function(self,_){
});
_I(self,s$mi,function(self,_,flag){
});
_I(self,s$mj,function(self,_){
});
_I(self,s$mk,function(self,_){
});
_I(self,s$ml,function(self,_){
});
_I(self,s$mm,function(self,_){
});
_I(self,s$mn,function(self,_,new_subviews){
});
_I(self,s$mo,function(self,_,a_view){
if(_A(_E(_H(self,i$bd),s$dy,a_view))){
return ;
}
_E(a_view,s$mp);
_E(a_view,s$mq,self);
_E(a_view,s$mr,_H(self,i$ac));
_E(_H(self,i$bd),s$e,a_view);
_E(_H(self,i$b),s$e,_E(a_view,s$o));
_E(a_view,s$co,self);
_E(a_view,s$ms);
_E(a_view,s$mt);
return _E(self,s$mu,self);
});
_I(self,s$e,function(self,_,a_view){
return _E(self,s$mo,a_view);
});
self.$def(s$mv,function(self,_,a_view,place,other_view){
});
_I(self,s$mr,function(self,_,win){
self.$i_s(i$ac,win);
return _E(_H(self,i$bd),s$r,function(s){
return _E(s,s$mr,win);
});
});
_I(self,s$mt,function(self,_){
_E(_H(self,i$bd),s$r,function(s){
return _E(s,s$mt);
});
return _E(self,s$mw,true);
});
_I(self,s$mq,function(self,_,new_super){
return self.$i_s(i$be,new_super);
});
_I(self,s$ms,function(self,_){
});
_I(self,s$mu,function(self,_,subview){
});
_I(self,s$mx,function(self,_,subview){
});
_I(self,s$mp,function(self,_){
});
self.$def(s$my,function(self,_,old_view,new_view){
});
_I(self,s$mz,function(self,_,flag){
});
_I(self,s$na,function(self,_){
});
_I(self,s$nb,function(self,_,size){
});
_I(self,s$nc,function(self,_,old){
});
_I(self,s$nd,function(self,_,flag){
});
_I(self,s$ne,function(self,_){
});
_I(self,s$nf,function(self,_,mask){
});
_I(self,s$ng,function(self,_){
});
_I(self,s$nh,function(self,_,new_origin){
_E(_H(self,i$bb),s$je,_E(new_origin,s$ab));
_E(_H(self,i$bb),s$jf,_E(new_origin,s$ac));
_E(_H(self,i$b),s$x,new_origin);
if(_A(_H(self,i$bf))){
var nc=_E(self.$klass.$c_g_full(c$n),s$cd);
_E(nc,s$ck,'frame chnage notification',self);
}
});
_I(self,s$ni,function(self,_,new_size){
var old_size=_E(self.$klass.$c_g_full(c$ac),s$ap,_E(_H(self,i$bb),s$ae),_E(_H(self,i$bb),s$af));
_E(_E(_H(self,i$bb),s$aa),s$jg,_E(new_size,s$ae));
_E(_E(_H(self,i$bb),s$aa),s$jh,_E(new_size,s$af));
_E(_E(_H(self,i$bc),s$aa),s$jg,_E(new_size,s$ae));
_E(_E(_H(self,i$bc),s$aa),s$jh,_E(new_size,s$af));
_E(self,s$mw,true);
_E(_H(self,i$b),s$z,new_size);
_E(_H(self,i$bi),s$z,new_size);
if(_A(_H(self,i$bf))){
var nc=_E(self.$klass.$c_g_full(c$n),s$cd);
_E(nc,s$ck,'frame chnage notification',self);
}
});
_I(self,s$w,function(self,_,frame){
_E(self,s$nh,_E(frame,s$y));
_E(self,s$ni,_E(frame,s$aa));
if(_A(_H(self,i$bf))){
var nc=_E(self.$klass.$c_g_full(c$n),s$cd);
_E(nc,s$ck,'view chnages notification',self);
}
});
_I(self,s$nj,function(self,_){
return _H(self,i$bb);
});
_I(self,s$nk,function(self,_,angle){
});
_I(self,s$nl,function(self,_){
return _H(self,i$bl);
});
_I(self,s$nm,function(self,_,angle){
});
_I(self,s$nn,function(self,_){
});
_I(self,s$no,function(self,_,new_origin){
});
_I(self,s$np,function(self,_,new_size){
});
_I(self,s$nq,function(self,_,angle){
});
_I(self,s$nr,function(self,_){
});
_I(self,s$ns,function(self,_,translation){
});
_I(self,s$nt,function(self,_,angle){
});
_I(self,s$nu,function(self,_,bounds){
});
_I(self,s$nv,function(self,_){
return _H(self,i$bc);
});
_I(self,s$gi,function(self,_){
});
_I(self,s$nw,function(self,_){
});
_I(self,s$nx,function(self,_){
});
_I(self,s$ny,function(self,_){
});
self.$def(s$nz,function(self,_,point,view){
if(!_A(view)){
return _E(self,s$oa,point);
}
return _E(self.$klass.$c_g_full(c$x),s$ap,_E(_E(point,s$ab),s$ob,_E(_H(self,i$bb),s$ab)),_E(_E(point,s$ac),s$ob,_E(_H(self,i$bb),s$ac)));
});
self.$def(s$oc,function(self,_,point,view){
});
self.$def(s$od,function(self,_,size,view){
});
self.$def(s$oe,function(self,_,size,view){
});
self.$def(s$of,function(self,_,rect,view){
});
self.$def(s$og,function(self,_,rect,view){
});
_I(self,s$oh,function(self,_,point){
});
_I(self,s$oa,function(self,_,point){
if(_A(_H(self,i$be))){
return _E(_H(self,i$be),s$oa,_E(self.$klass.$c_g_full(c$x),s$ap,_E(_E(point,s$ab),s$ob,_E(_H(self,i$bb),s$ab)),_E(_E(point,s$ac),s$ob,_E(_H(self,i$bb),s$ac))));
}
else{
return point;
}
});
_I(self,s$oi,function(self,_,size){
});
_I(self,s$oj,function(self,_,size){
});
_I(self,s$ok,function(self,_,rect){
});
_I(self,s$ol,function(self,_,rect){
});
_I(self,s$om,function(self,_){
});
_I(self,s$mw,function(self,_,flag){
if(!_A(_H(self,i$ac))){
return ;
}
return _E(self,s$on);
});
_I(self,s$oo,function(self,_,invalid_rect){
return _H(self,i$bm);
});
_I(self,s$op,function(self,_){
return _H(self,i$bm);
});
_I(self,s$lf,function(self,_){
return _E(self.$klass.$c_g_full(c$ae),s$gk,_H(self,i$bi));
});
_I(self,s$lg,function(self,_){
});
self.$def_s(s$oq,function(self,_){
});
_I(self,s$or,function(self,_){
});
_I(self,s$on,function(self,_){
if(!_A(_H(self,i$ac))){
return ;
}
_E(self,s$os);
if(_A(_E(_E(self,s$b),s$ad,_$gd))){
_E(self,s$lf);
_E(self.$klass.$c_g_full(c$ae),s$gk,_H(self,i$bi));
_E(self,s$ot,_H(self,i$bi));
_E(_H(self,i$bi),s$ll,false);
_E(self,s$lg);
}
else{
_E(self.$klass.$c_g_full(c$z),s$gk,_H(self,i$bi));
_E(self,s$eh,_E(self,s$nv));
}
});
_I(self,s$ot,function(self,_,context){
if(_A(_E(context,s$lk))){
_E(context,s$p,_E(self,s$lx));
_E(context,s$ll,false);
}
});
_I(self,s$eh,function(self,_,rect){
});
_I(self,s$os,function(self,_){
});
_I(self,s$ou,function(self,_,point){
point=_E(self,s$nz,point,_H(self,i$be));
if(!_A(_E(point,s$jq,_E(self,s$nv)))){
return nil;
}
var count=_E(_H(self,i$bd),s$ov);
var i=0;
for (i = 0; i < count; i++) {var view_to_check=_E(_H(self,i$bd),s$j,i);
var hit_test=_E(view_to_check,s$ou,point);
if(_A(hit_test)){
return hit_test;
}
}return self;
});
self.$def(s$ow,function(self,_,point,rect){
});
_I(self,s$ox,function(self,_,tracking_area){
if(_A(_E(_H(self,i$bh),s$oy))){
_E(_H(self,i$b),s$f,_$gh,function(evt){
});
_E(_H(self,i$b),s$f,_$gi,function(evt){
});
}
return _E(_H(self,i$bh),s$e,tracking_area);
});
_I(self,s$oz,function(self,_,tracking_area){
});
_I(self,s$pa,function(self,_){
return _H(self,i$bh);
});
_I(self,s$pb,function(self,_){
});
})(_N(self,c$ai,self.$c_g_full(c$o)));
})(_K(c$b));
