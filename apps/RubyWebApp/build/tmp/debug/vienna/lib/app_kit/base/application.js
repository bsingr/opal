(function(self) {
self.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(_$u, 0, _$v, 1, _$w, 2));
(function(self) {
VN$(self,s$ar,_$x,_$y,_$z);
VN$(self,s$ap,_$aa);
self.$def(s$as,function(self,_cmd){
self.$i_s(i$s,[]);
self.$i_s(i$t,[]);
self.$i_s(i$u,[]);
self.$i_s(i$v,nil);
return self.$i_s(i$w,_$u);
});
self.$def(s$na,function(self,_cmd){
return self.$i_g(i$w);
});
self.$def(s$nb,function(self,_cmd,types,block){
self.$i_s(i$w,_$w);
self.$i_s(i$x,types);
self.$i_s(i$y,block);
self.$i_s(i$z,VN$(VN$(self,s$nc),s$nd));
if(RTEST(VN$(types,s$al,_$ab))){
VN$(self.$klass.$c_g_full(c$b),s$jb,_$ac,function(evt){
var the_event = VN$(self.$klass.$c_g_full(c$h),s$ne,evt,nil,'left_mouse_dragged');
return VN$(self,s$nf,the_event);
});
}
});
self.$def(s$ng,function(self,_cmd){
self.$i_s(i$w,_$u);
if(RTEST(VN$(self.$i_g(i$x),s$al,_$ab))){
VN$(self.$klass.$c_g_full(c$b),s$jc,_$ac);
}
});
self.$def(s$nc,function(self,_cmd){
return self.$i_g(i$aa);
});
self.$def(s$nf,function(self,_cmd,the_event){
self.$i_s(i$aa,the_event);
if(RTEST(VN$(self.$i_g(i$w),s$ai,_$w))){
if(RTEST(VN$(self.$i_g(i$x),s$al,VN$(the_event,s$nh)))){
VN$(the_event,'window=',self.$i_g(i$z));
VN$(self.$i_g(i$y),s$it,the_event);
}
return ;
}
return VN$(VN$(the_event,s$nd),s$nf,the_event);
});
self.$def(s$ni,function(self,_cmd,view,flag){
if(!RTEST(VN$(self.$i_g(i$u),s$nj,view))){
VN$(self.$i_g(i$u),s$cv,view);
}
});
self.$def(s$nk,function(self,_cmd){
VN$(self.$i_g(i$u),s$ga,function(view){
return VN$(view,s$nl);
});
return self.$i_s(i$u,[]);
});
self.$def(s$nm,function(self,_cmd,window){
return 0;
});
self.$def(s$cv,function(self,_cmd,window){
return VN$(self,s$nm,window);
});
self.$def_s(s$nn,function(self,_cmd){
return self.$i_s(i$ab,ORTEST(self.$i_g(i$ab),VN$(self,s$is)));
});
self.$def(s$no,function(self,_cmd,obj){
if(RTEST(VN$(self.$i_g(i$v),s$ai,obj))){
return ;
}
var nc = VN$(self.$klass.$c_g_full(c$i).$c_g('NotificationCenter'),s$lk);
if(RTEST(self.$i_g(i$v))){
VN$(nc,s$ls,self.$i_g(i$v),self.$klass.$c_g_full(c$j),self);
VN$(nc,s$ls,self.$i_g(i$v),self.$klass.$c_g_full(c$k),self);
VN$(nc,s$ls,self.$i_g(i$v),self.$klass.$c_g_full(c$l),self);
}
self.$i_s(i$v,obj);
if(RTEST(VN$(self.$i_g(i$v),s$kf,_$ad))){
VN$(nc,s$ll,self.$i_g(i$v),'will_finish_launching',self.$klass.$c_g_full(c$j),self);
}
if(RTEST(VN$(self.$i_g(i$v),s$kf,_$ae))){
VN$(nc,s$ll,self.$i_g(i$v),'did_finish_launching',self.$klass.$c_g_full(c$k),self);
}
});
self.$def(s$np,function(self,_cmd){
return true;
});
self.$def(s$nq,function(self,_cmd){
if(RTEST(self.$i_g(i$ac))){
VN$(self.$i_g(i$ac),s$it,self);
}
VN$(self.$klass.$c_g_full(c$b),s$jb,_$af,function(evt){
if(RTEST(VN$(VN$(self.$klass.$c_g_full(c$m),s$na),s$ai,_$w))){
var the_event = VN$(self.$klass.$c_g_full(c$h),s$ne,evt,nil,'left_mouse_down');
VN$(self,s$ag,'sending event from here');
VN$(self,s$nf,the_event);
}
});
VN$(self.$klass.$c_g_full(c$b),s$jb,_$ag,function(evt){
if(RTEST(VN$(VN$(self.$klass.$c_g_full(c$m),s$na),s$ai,_$w))){
var the_event = VN$(self.$klass.$c_g_full(c$h),s$ne,evt,nil,'left_mouse_up');
VN$(self,s$nf,the_event);
}
});
var nc = VN$(self.$klass.$c_g_full(c$n),s$lk);
VN$(nc,s$lq,self.$klass.$c_g_full(c$j),self);
return VN$(nc,s$lq,self.$klass.$c_g_full(c$k),self);
});
self.$def(s$nr,function(self,_cmd,block){
return self.$i_s(i$ac,block);
});
self.$def(s$ns,function(self,_cmd,action,target,sender){
});
})(RClass.define_under(self,'Application',cObject));
console.log('this pare');self.$c_s('App',VN$(self.$c_g_full(c$o),s$nn));
console.log('ermmm');})(RModule.define('Vienna'));
window.onload = function() {VN$(cObject.$c_g(c$i).$c_g('App'),s$nq);
};