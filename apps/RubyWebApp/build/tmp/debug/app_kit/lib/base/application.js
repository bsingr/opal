(function(self) {
self.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(_$t, 0, _$u, 1, _$v, 2));
(function(self) {
_E(self,s$l,_$w,_$x,_$y);
_E(self,s$bz,_$z);
_I(self,s$n,function(self,_){
self.$i_s(i$s,[]);
self.$i_s(i$t,[]);
self.$i_s(i$u,[]);
self.$i_s(i$v,nil);
return self.$i_s(i$w,_$t);
});
_I(self,s$eo,function(self,_){
return _H(self,i$w);
});
_I(self,s$ep,function(self,_,types,block){
self.$i_s(i$w,_$v);
self.$i_s(i$x,types);
self.$i_s(i$y,block);
self.$i_s(i$z,_E(_E(self,s$eq),s$er));
if(_A(_E(types,s$es,_$aa))){
_E(self.$klass.$c_g_full(c$c),s$f,_$ab,function(evt){
var the_event=_E(self.$klass.$c_g_full(c$q),s$et,evt,nil,_$aa);
return _E(self,s$eu,the_event);
});
}
});
_I(self,s$ev,function(self,_){
self.$i_s(i$w,_$t);
if(_A(_E(_H(self,i$x),s$es,_$aa))){
_E(self.$klass.$c_g_full(c$c),s$i,_$ab);
}
});
_I(self,s$eq,function(self,_){
return _H(self,i$aa);
});
_I(self,s$eu,function(self,_,the_event){
self.$i_s(i$aa,the_event);
if(_A(_E(_H(self,i$w),s$ad,_$v))){
if(_A(_E(_H(self,i$x),s$es,_E(the_event,s$ew)))){
_E(the_event,s$ex,_H(self,i$z));
_E(_H(self,i$y),s$ao,the_event);
}
return ;
}
return _E(_E(the_event,s$er),s$eu,the_event);
});
_I(self,s$ey,function(self,_,view,flag){
if(!_A(_E(_H(self,i$u),s$ez,view))){
_E(_H(self,i$u),s$e,view);
}
});
_I(self,s$fa,function(self,_){
_E(_H(self,i$u),s$r,function(view){
return _E(view,s$fb);
});
return self.$i_s(i$u,[]);
});
_I(self,s$fc,function(self,_,window){
return 0;
});
_I(self,s$e,function(self,_,window){
return _E(self,s$fc,window);
});
self.$def_s(s$fd,function(self,_){
return self.$i_s(i$ab,ORTEST(_H(self,i$ab),_E(self,s$ap)));
});
_I(self,s$fe,function(self,_,obj){
if(_A(_E(_H(self,i$v),s$ad,obj))){
return ;
}
var nc=_E(self.$klass.$c_g_full(c$r).$c_g('NotificationCenter'),s$cd);
if(_A(_H(self,i$v))){
_E(nc,s$cm,_H(self,i$v),self.$klass.$c_g_full(c$s),self);
_E(nc,s$cm,_H(self,i$v),self.$klass.$c_g_full(c$t),self);
_E(nc,s$cm,_H(self,i$v),self.$klass.$c_g_full(c$u),self);
}
self.$i_s(i$v,obj);
if(_A(_E(_H(self,i$v),s$av,_$ac))){
_E(nc,s$ce,_H(self,i$v),'will_finish_launching',self.$klass.$c_g_full(c$s),self);
}
if(_A(_E(_H(self,i$v),s$av,_$ad))){
_E(nc,s$ce,_H(self,i$v),'did_finish_launching',self.$klass.$c_g_full(c$t),self);
}
});
_I(self,s$ff,function(self,_){
return true;
});
_I(self,s$fg,function(self,_){
_E(self.$klass.$c_g_full(c$v),s$g,_$ae,_$af);
if(_A(_H(self,i$ac))){
_E(_H(self,i$ac),s$ao,self);
}
_E(self.$klass.$c_g_full(c$c),s$f,_$ag,function(evt){
if(_A(_E(_E(self.$klass.$c_g_full(c$w),s$eo),s$ad,_$v))){
var the_event=_E(self.$klass.$c_g_full(c$q),s$et,evt,nil,_$ah);
_E(self,s$eu,the_event);
}
});
_E(self.$klass.$c_g_full(c$c),s$f,_$ai,function(evt){
if(_A(_E(_E(self.$klass.$c_g_full(c$w),s$eo),s$ad,_$v))){
var the_event=_E(self.$klass.$c_g_full(c$q),s$et,evt,nil,_$aj);
_E(self,s$eu,the_event);
}
});
var nc=_E(self.$klass.$c_g_full(c$n),s$cd);
_E(nc,s$ck,self.$klass.$c_g_full(c$s),self);
return _E(nc,s$ck,self.$klass.$c_g_full(c$t),self);
});
_I(self,s$fh,function(self,_,block){
return self.$i_s(i$ac,block);
});
self.$def(s$fi,function(self,_,action,target,sender){
if(_A(ANDTEST(action,target))){
_E(target,s$ar,action,sender);
}
});
})(_N(self,c$x,cObject));
console.log('this pare');self.$c_s('App',_E(self.$c_g_full(c$x),s$fd));
console.log('ermmm');})(_K(c$b));
window.onload = function() {_E(cObject.$c_g(c$r).$c_g('App'),s$fg);
};