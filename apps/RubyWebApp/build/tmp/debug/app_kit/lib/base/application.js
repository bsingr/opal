(function(self) {
self.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(_$t, 0, _$u, 1, _$v, 2));
(function(self) {
_E(self,s$l,_$w,_$x,_$y);
_E(self,s$bz,_$z);
_I(self,s$n,function(self,_){
self.$i_s(i$q,[]);
self.$i_s(i$r,[]);
self.$i_s(i$s,[]);
self.$i_s(i$t,nil);
return self.$i_s(i$u,_$t);
});
_I(self,s$du,function(self,_){
return _H(self,i$u);
});
_I(self,s$dv,function(self,_,types,block){
self.$i_s(i$u,_$v);
self.$i_s(i$v,types);
self.$i_s(i$w,block);
self.$i_s(i$x,_E(_E(self,s$dw),s$dx));
if(_A(_E(types,s$dy,_$aa))){
_E(self.$klass.$c_g_full(c$c),s$f,_$ab,function(evt){
var the_event=_E(self.$klass.$c_g_full(c$p),s$dz,evt,nil,_$aa);
return _E(self,s$ea,the_event);
});
}
});
_I(self,s$eb,function(self,_){
self.$i_s(i$u,_$t);
if(_A(_E(_H(self,i$v),s$dy,_$aa))){
_E(self.$klass.$c_g_full(c$c),s$i,_$ab);
}
});
_I(self,s$dw,function(self,_){
return _H(self,i$y);
});
_I(self,s$ea,function(self,_,the_event){
self.$i_s(i$y,the_event);
if(_A(_E(_H(self,i$u),s$ad,_$v))){
if(_A(_E(_H(self,i$v),s$dy,_E(the_event,s$ec)))){
_E(the_event,s$ed,_H(self,i$x));
_E(_H(self,i$w),s$ao,the_event);
}
return ;
}
return _E(_E(the_event,s$dx),s$ea,the_event);
});
_I(self,s$ee,function(self,_,view,flag){
if(!_A(_E(_H(self,i$s),s$ef,view))){
_E(_H(self,i$s),s$e,view);
}
});
_I(self,s$eg,function(self,_){
_E(_H(self,i$s),s$r,function(view){
return _E(view,s$eh);
});
return self.$i_s(i$s,[]);
});
_I(self,s$ei,function(self,_,window){
return 0;
});
_I(self,s$e,function(self,_,window){
return _E(self,s$ei,window);
});
self.$def_s(s$ej,function(self,_){
return self.$i_s(i$z,ORTEST(_H(self,i$z),_E(self,s$ap)));
});
_I(self,s$ek,function(self,_,obj){
if(_A(_E(_H(self,i$t),s$ad,obj))){
return ;
}
var nc=_E(self.$klass.$c_g_full(c$q).$c_g('NotificationCenter'),s$cd);
if(_A(_H(self,i$t))){
_E(nc,s$cm,_H(self,i$t),self.$klass.$c_g_full(c$r),self);
_E(nc,s$cm,_H(self,i$t),self.$klass.$c_g_full(c$s),self);
_E(nc,s$cm,_H(self,i$t),self.$klass.$c_g_full(c$t),self);
}
self.$i_s(i$t,obj);
if(_A(_E(_H(self,i$t),s$av,_$ac))){
_E(nc,s$ce,_H(self,i$t),'will_finish_launching',self.$klass.$c_g_full(c$r),self);
}
if(_A(_E(_H(self,i$t),s$av,_$ad))){
_E(nc,s$ce,_H(self,i$t),'did_finish_launching',self.$klass.$c_g_full(c$s),self);
}
});
_I(self,s$el,function(self,_){
return true;
});
_I(self,s$em,function(self,_){
_E(self.$klass.$c_g_full(c$u),s$g,_$ae,_$af);
if(_A(_H(self,i$aa))){
_E(_H(self,i$aa),s$ao,self);
}
_E(self.$klass.$c_g_full(c$c),s$f,_$ag,function(evt){
if(_A(_E(_E(self.$klass.$c_g_full(c$v),s$du),s$ad,_$v))){
var the_event=_E(self.$klass.$c_g_full(c$p),s$dz,evt,nil,_$ah);
_E(self,s$ea,the_event);
}
});
_E(self.$klass.$c_g_full(c$c),s$f,_$ai,function(evt){
if(_A(_E(_E(self.$klass.$c_g_full(c$v),s$du),s$ad,_$v))){
var the_event=_E(self.$klass.$c_g_full(c$p),s$dz,evt,nil,_$aj);
_E(self,s$ea,the_event);
}
});
var nc=_E(self.$klass.$c_g_full(c$n),s$cd);
_E(nc,s$ck,self.$klass.$c_g_full(c$r),self);
return _E(nc,s$ck,self.$klass.$c_g_full(c$s),self);
});
_I(self,s$en,function(self,_,block){
return self.$i_s(i$aa,block);
});
self.$def(s$eo,function(self,_,action,target,sender){
if(_A(ANDTEST(action,target))){
_E(target,s$ar,action,sender);
}
});
})(_N(self,c$w,cObject));
console.log('this pare');self.$c_s('App',_E(self.$c_g_full(c$w),s$ej));
console.log('ermmm');})(_K(c$b));
window.onload = function() {_E(cObject.$c_g(c$q).$c_g('App'),s$em);
};