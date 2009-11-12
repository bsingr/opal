(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(_$ah, 1, _$aj, 2, _$ak, 3, _$al, 4, _$am, 5, _$aa, 6, _$an, 7, _$ao, 8, _$ap, 9, _$aq, 10, _$ar, 11, _$as, 12, _$at, 13, _$au, 14, _$av, 15, _$aw, 16, _$ax, 17, _$ay, 22, _$az, 25, _$ba, 26, _$bb, 27));
(function(self) {
self.$def_s(s$fo,function(self,_,event,win,type){
var obj=_E(self,s$ge);
_E(obj,s$gf,event,win,type);
return obj;
});
self.$def(s$gf,function(self,_,event,win,type){
self.$i_s(i$af,event);
self.$i_s(i$ag,win);
return self.$i_s(i$c,type);
});
_I(self,s$gg,function(self,_){
var event=_H(self,i$af);
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
_I(self,s$gh,function(self,_){
return _H(self,i$af)._vn_allow_event_propagation? true : false;});
_I(self,s$gi,function(self,_,flag){
_H(self,i$af)._vn_allow_event_propagation = flag;});
_I(self,s$fr,function(self,_){
return _H(self,i$c);
});
_I(self,s$gj,function(self,_){
});
_I(self,s$gk,function(self,_){
});
_I(self,s$fs,function(self,_,a_window){
return self.$i_s(i$ag,a_window);
});
_I(self,s$fn,function(self,_){
return _H(self,i$ag);
});
_I(self,s$gl,function(self,_){
return _E(_H(self,i$ag),s$gl);
});
_I(self,s$gm,function(self,_){
});
_I(self,s$gn,function(self,_){
});
_I(self,s$go,function(self,_){
});
_I(self,s$gp,function(self,_){
});
_I(self,s$gq,function(self,_){
return _E(_H(self,i$ag),s$gr,_E(self.$klass.$c_g_full(c$aa),s$ap,_H(self,i$af).clientX,_H(self,i$af).clientY));
});
_I(self,s$gs,function(self,_){
});
_I(self,s$gt,function(self,_){
});
_I(self,s$gu,function(self,_){
});
_I(self,s$gv,function(self,_){
});
_I(self,s$gw,function(self,_){
});
_I(self,s$gx,function(self,_){
});
_I(self,s$gy,function(self,_){
});
self.$def_s(s$gz,function(self,_){
});
})(_N(self,c$s,cObject));
})(_K(c$b));
