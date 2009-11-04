(function(self) {
self.$c_s('APP_WILL_FINISH_LAUNCHING','APP_WILL_FINISH_LAUNCHING');
self.$c_s('APP_DID_FINISH_LAUNCHING','APP_DID_FINISH_LAUNCHING');
self.$c_s('APP_DID_CHANGE_SCREEN_PARAMETERS','APP_DID_CHANGE_SCREEN_PARAMETERS');
self.$c_s('RUN_LOOP_MODES',VN.$h(_$u, 0, _$v, 1, _$w, 2));
(function(self) {
rb_funcall(self,s$g,_$x,_$y,_$z);
rb_funcall(self,s$by,_$aa);
rb_define_method(self,s$i,function(self,_cmd){
self.$i_s(i$q,[]);
self.$i_s(i$r,[]);
self.$i_s(i$s,[]);
self.$i_s(i$t,nil);
return self.$i_s(i$u,_$u);
});
rb_define_method(self,s$dt,function(self,_cmd){
return rb_ivar_get(self, i$u);
});
rb_define_method(self,s$du,function(self,_cmd,types,block){
self.$i_s(i$u,_$w);
self.$i_s(i$v,types);
self.$i_s(i$w,block);
self.$i_s(i$x,rb_funcall(rb_funcall(self,s$dv),s$dw));
if(RTEST(rb_funcall(types,s$dx,_$ab))){
rb_funcall(self.$klass.$c_g_full(c$a),s$c,_$ac,function(evt){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,evt,nil,'left_mouse_dragged');
return rb_funcall(self,s$dz,the_event);
});
}
});
rb_define_method(self,s$ea,function(self,_cmd){
self.$i_s(i$u,_$u);
if(RTEST(rb_funcall(rb_ivar_get(self, i$v),s$dx,_$ab))){
rb_funcall(self.$klass.$c_g_full(c$a),s$d,_$ac);
}
});
rb_define_method(self,s$dv,function(self,_cmd){
return rb_ivar_get(self, i$y);
});
rb_define_method(self,s$dz,function(self,_cmd,the_event){
self.$i_s(i$y,the_event);
if(RTEST(rb_funcall(rb_ivar_get(self, i$u),s$y,_$w))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$v),s$dx,rb_funcall(the_event,s$eb)))){
rb_funcall(the_event,'window=',rb_ivar_get(self, i$x));
rb_funcall(rb_ivar_get(self, i$w),s$ak,the_event);
}
return ;
}
return rb_funcall(rb_funcall(the_event,s$dw),s$dz,the_event);
});
rb_define_method(self,s$ec,function(self,_cmd,view,flag){
if(!RTEST(rb_funcall(rb_ivar_get(self, i$s),s$ed,view))){
rb_funcall(rb_ivar_get(self, i$s),s$b,view);
}
});
rb_define_method(self,s$ee,function(self,_cmd){
rb_funcall(rb_ivar_get(self, i$s),s$m,function(view){
return rb_funcall(view,s$ef);
});
return self.$i_s(i$s,[]);
});
rb_define_method(self,s$eg,function(self,_cmd,window){
return 0;
});
rb_define_method(self,s$b,function(self,_cmd,window){
return rb_funcall(self,s$eg,window);
});
self.$def_s(s$eh,function(self,_cmd){
return self.$i_s(i$z,ORTEST(rb_ivar_get(self, i$z),rb_funcall(self,s$al)));
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
if(RTEST(rb_funcall(rb_ivar_get(self, i$t),s$y,obj))){
return ;
}
var nc = rb_funcall(self.$klass.$c_g_full(c$h).$c_g('NotificationCenter'),s$cc);
if(RTEST(rb_ivar_get(self, i$t))){
rb_funcall(nc,s$cl,rb_ivar_get(self, i$t),self.$klass.$c_g_full(c$i),self);
rb_funcall(nc,s$cl,rb_ivar_get(self, i$t),self.$klass.$c_g_full(c$j),self);
rb_funcall(nc,s$cl,rb_ivar_get(self, i$t),self.$klass.$c_g_full(c$k),self);
}
self.$i_s(i$t,obj);
if(RTEST(rb_funcall(rb_ivar_get(self, i$t),s$au,_$ad))){
rb_funcall(nc,s$cd,rb_ivar_get(self, i$t),'will_finish_launching',self.$klass.$c_g_full(c$i),self);
}
if(RTEST(rb_funcall(rb_ivar_get(self, i$t),s$au,_$ae))){
rb_funcall(nc,s$cd,rb_ivar_get(self, i$t),'did_finish_launching',self.$klass.$c_g_full(c$j),self);
}
});
rb_define_method(self,s$ej,function(self,_cmd){
return true;
});
rb_define_method(self,s$ek,function(self,_cmd){
if(RTEST(rb_ivar_get(self, i$aa))){
rb_funcall(rb_ivar_get(self, i$aa),s$ak,self);
}
rb_funcall(self.$klass.$c_g_full(c$a),s$c,_$af,function(evt){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full(c$l),s$dt),s$y,_$w))){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,evt,nil,'left_mouse_down');
rb_funcall(self,s$ah,'sending event from here');
rb_funcall(self,s$dz,the_event);
}
});
rb_funcall(self.$klass.$c_g_full(c$a),s$c,_$ag,function(evt){
if(RTEST(rb_funcall(rb_funcall(self.$klass.$c_g_full(c$l),s$dt),s$y,_$w))){
var the_event = rb_funcall(self.$klass.$c_g_full(c$g),s$dy,evt,nil,'left_mouse_up');
rb_funcall(self,s$dz,the_event);
}
});
var nc = rb_funcall(self.$klass.$c_g_full(c$m),s$cc);
rb_funcall(nc,s$cj,self.$klass.$c_g_full(c$i),self);
return rb_funcall(nc,s$cj,self.$klass.$c_g_full(c$j),self);
});
rb_define_method(self,s$el,function(self,_cmd,block){
return self.$i_s(i$aa,block);
});
self.$def(s$em,function(self,_cmd,action,target,sender){
});
})(RClass.define_under(self,'Application',cObject));
console.log('this pare');self.$c_s('App',rb_funcall(self.$c_g_full(c$n),s$eh));
console.log('ermmm');})(RModule.define('Vienna'));
window.onload = function() {rb_funcall(cObject.$c_g(c$h).$c_g('App'),s$ek);
};