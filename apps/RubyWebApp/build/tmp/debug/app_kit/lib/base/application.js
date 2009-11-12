(function(self) {
self.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(_$t, 0, _$u, 1, _$v, 2));
(function(self) {
_E(self,s$l,_$w,_$x,_$y);
_E(self,s$bz,_$z);
_I(self,s$n,function(self,_){
self.$i_s(i$u,[]);
self.$i_s(i$v,[]);
self.$i_s(i$w,[]);
self.$i_s(i$x,nil);
return self.$i_s(i$y,_$t);
});
_I(self,s$fk,function(self,_){
return _H(self,i$y);
});
_I(self,s$fl,function(self,_,types,block){
self.$i_s(i$y,_$v);
self.$i_s(i$z,types);
self.$i_s(i$aa,block);
self.$i_s(i$ab,_E(_E(self,s$fm),s$fn));
if(_A(_E(types,s$ea,_$aa))){
_E(self.$klass.$c_g_full(c$c),s$f,_$ab,function(evt){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fo,evt,nil,_$aa);
return _E(self,s$fp,the_event);
});
}
});
_I(self,s$fq,function(self,_){
self.$i_s(i$y,_$t);
if(_A(_E(_H(self,i$z),s$ea,_$aa))){
_E(self.$klass.$c_g_full(c$c),s$i,_$ab);
}
});
_I(self,s$fm,function(self,_){
return _H(self,i$ac);
});
_I(self,s$fp,function(self,_,the_event){
self.$i_s(i$ac,the_event);
if(_A(_E(_H(self,i$y),s$ad,_$v))){
if(_A(_E(_H(self,i$z),s$ea,_E(the_event,s$fr)))){
_E(the_event,s$fs,_H(self,i$ab));
_E(_H(self,i$aa),s$ao,the_event);
}
return ;
}
return _E(_E(the_event,s$fn),s$fp,the_event);
});
_I(self,s$ft,function(self,_,view,flag){
if(!_A(_E(_H(self,i$w),s$fu,view))){
_E(_H(self,i$w),s$e,view);
}
});
_I(self,s$fv,function(self,_){
_E(_H(self,i$w),s$r,function(view){
return _E(view,s$fw);
});
return self.$i_s(i$w,[]);
});
_I(self,s$fx,function(self,_,window){
return 0;
});
_I(self,s$e,function(self,_,window){
return _E(self,s$fx,window);
});
self.$def_s(s$fy,function(self,_){
return self.$i_s(i$ad,ORTEST(_H(self,i$ad),_E(self,s$ap)));
});
_I(self,s$fz,function(self,_,obj){
if(_A(_E(_H(self,i$x),s$ad,obj))){
return ;
}
var nc=_E(self.$klass.$c_g_full(c$t).$c_g('NotificationCenter'),s$cd);
if(_A(_H(self,i$x))){
_E(nc,s$cm,_H(self,i$x),self.$klass.$c_g_full(c$u),self);
_E(nc,s$cm,_H(self,i$x),self.$klass.$c_g_full(c$v),self);
_E(nc,s$cm,_H(self,i$x),self.$klass.$c_g_full(c$w),self);
}
self.$i_s(i$x,obj);
if(_A(_E(_H(self,i$x),s$av,_$ac))){
_E(nc,s$ce,_H(self,i$x),'will_finish_launching',self.$klass.$c_g_full(c$u),self);
}
if(_A(_E(_H(self,i$x),s$av,_$ad))){
_E(nc,s$ce,_H(self,i$x),'did_finish_launching',self.$klass.$c_g_full(c$v),self);
}
});
_I(self,s$ga,function(self,_){
return true;
});
_I(self,s$gb,function(self,_){
_E(self.$klass.$c_g_full(c$x),s$g,_$ae,_$af);
if(_A(_H(self,i$ae))){
_E(_H(self,i$ae),s$ao,self);
}
_E(self.$klass.$c_g_full(c$c),s$f,_$ag,function(evt){
if(_A(_E(_E(self.$klass.$c_g_full(c$y),s$fk),s$ad,_$v))){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fo,evt,nil,_$ah);
_E(self,s$fp,the_event);
}
});
_E(self.$klass.$c_g_full(c$c),s$f,_$ai,function(evt){
if(_A(_E(_E(self.$klass.$c_g_full(c$y),s$fk),s$ad,_$v))){
var the_event=_E(self.$klass.$c_g_full(c$s),s$fo,evt,nil,_$aj);
_E(self,s$fp,the_event);
}
});
var nc=_E(self.$klass.$c_g_full(c$o),s$cd);
_E(nc,s$ck,self.$klass.$c_g_full(c$u),self);
return _E(nc,s$ck,self.$klass.$c_g_full(c$v),self);
});
_I(self,s$gc,function(self,_,block){
return self.$i_s(i$ae,block);
});
self.$def(s$gd,function(self,_,action,target,sender){
if(_A(ANDTEST(action,target))){
_E(target,s$ar,action,sender);
}
});
})(_N(self,c$z,cObject));
console.log('this pare');self.$c_s('App',_E(self.$c_g_full(c$z),s$fy));
console.log('ermmm');})(_K(c$b));
window.onload = function() {_E(cObject.$c_g(c$t).$c_g('App'),s$gb);
};