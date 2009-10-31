(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(_$ah, 1, _$ai, 2, _$aj, 3, _$ak, 4, _$al, 5, _$ab, 6, _$am, 7, _$an, 8, _$ao, 9, _$ap, 10, _$aq, 11, _$ar, 12, _$as, 13, _$at, 14, _$au, 15, _$av, 16, _$aw, 17, _$ax, 22, _$ay, 25, _$az, 26, _$ba, 27));
(function(self) {
self.$def_s(s$ne,function(self,_cmd,event,win,type){
var obj = VN$(self,s$nt);
VN$(obj,s$nu,event,win,type);
return obj;
});
self.$def(s$nu,function(self,_cmd,event,win,type){
self.$i_s(i$ad,event);
self.$i_s(i$ae,win);
return self.$i_s(i$e,type);
});
self.$def(s$nv,function(self,_cmd){
var event = self.$i_g(i$ad);
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
self.$def(s$nw,function(self,_cmd){
return self.$i_g(i$ad)._vn_allow_event_propagation? true : false;});
self.$def(s$nx,function(self,_cmd,flag){
self.$i_g(i$ad)._vn_allow_event_propagation = flag;});
self.$def(s$nh,function(self,_cmd){
return self.$i_g(i$e);
});
self.$def(s$ny,function(self,_cmd){
});
self.$def(s$nz,function(self,_cmd){
});
self.$def(s$oa,function(self,_cmd,a_window){
return self.$i_s(i$ae,a_window);
});
self.$def(s$nd,function(self,_cmd){
return self.$i_g(i$ae);
});
self.$def(s$ob,function(self,_cmd){
return VN$(self.$i_g(i$ae),s$ob);
});
self.$def(s$oc,function(self,_cmd){
});
self.$def(s$od,function(self,_cmd){
});
self.$def(s$oe,function(self,_cmd){
});
self.$def(s$of,function(self,_cmd){
});
self.$def(s$og,function(self,_cmd){
return VN$(self.$i_g(i$ae),s$oh,VN$(self.$klass.$c_g_full(c$p),s$is,self.$i_g(i$ad).clientX,self.$i_g(i$ad).clientY));
});
self.$def(s$oi,function(self,_cmd){
});
self.$def(s$oj,function(self,_cmd){
});
self.$def(s$ok,function(self,_cmd){
});
self.$def(s$ol,function(self,_cmd){
});
self.$def(s$om,function(self,_cmd){
});
self.$def(s$on,function(self,_cmd){
});
self.$def(s$oo,function(self,_cmd){
});
self.$def_s(s$op,function(self,_cmd){
});
})(RClass.define_under(self,'Event',cObject));
})(RModule.define('Vienna'));
