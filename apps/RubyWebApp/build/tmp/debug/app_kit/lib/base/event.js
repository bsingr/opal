(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(_$ah, 1, _$aj, 2, _$ak, 3, _$al, 4, _$am, 5, _$aa, 6, _$an, 7, _$ao, 8, _$ap, 9, _$aq, 10, _$ar, 11, _$as, 12, _$at, 13, _$au, 14, _$av, 15, _$aw, 16, _$ax, 17, _$ay, 22, _$az, 25, _$ba, 26, _$bb, 27));
(function(self) {
self.$def_s(s$et,function(self,_,event,win,type){
var obj=_E(self,s$fj);
_E(obj,s$fk,event,win,type);
return obj;
});
self.$def(s$fk,function(self,_,event,win,type){
self.$i_s(i$ad,event);
self.$i_s(i$ae,win);
return self.$i_s(i$c,type);
});
_I(self,s$fl,function(self,_){
var event=_H(self,i$ad);
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
_I(self,s$fm,function(self,_){
return _H(self,i$ad)._vn_allow_event_propagation? true : false;});
_I(self,s$fn,function(self,_,flag){
_H(self,i$ad)._vn_allow_event_propagation = flag;});
_I(self,s$ew,function(self,_){
return _H(self,i$c);
});
_I(self,s$fo,function(self,_){
});
_I(self,s$fp,function(self,_){
});
_I(self,s$ex,function(self,_,a_window){
return self.$i_s(i$ae,a_window);
});
_I(self,s$er,function(self,_){
return _H(self,i$ae);
});
_I(self,s$fq,function(self,_){
return _E(_H(self,i$ae),s$fq);
});
_I(self,s$fr,function(self,_){
});
_I(self,s$fs,function(self,_){
});
_I(self,s$ft,function(self,_){
});
_I(self,s$fu,function(self,_){
});
_I(self,s$fv,function(self,_){
return _E(_H(self,i$ae),s$fw,_E(self.$klass.$c_g_full(c$y),s$ap,_H(self,i$ad).clientX,_H(self,i$ad).clientY));
});
_I(self,s$fx,function(self,_){
});
_I(self,s$fy,function(self,_){
});
_I(self,s$fz,function(self,_){
});
_I(self,s$ga,function(self,_){
});
_I(self,s$gb,function(self,_){
});
_I(self,s$gc,function(self,_){
});
_I(self,s$gd,function(self,_){
});
self.$def_s(s$ge,function(self,_){
});
})(_N(self,c$q,cObject));
})(_K(c$b));
