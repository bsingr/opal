(function(self) {
self.$c_s('EVENT_TYPES',VN.$h(_$ah, 1, _$ai, 2, _$aj, 3, _$ak, 4, _$al, 5, _$ab, 6, _$am, 7, _$an, 8, _$ao, 9, _$ap, 10, _$aq, 11, _$ar, 12, _$as, 13, _$at, 14, _$au, 15, _$av, 16, _$aw, 17, _$ax, 22, _$ay, 25, _$az, 26, _$ba, 27));
(function(self) {
self.$def_s(s$dy,function(self,_cmd,event,win,type){
var obj = rb_funcall(self,s$en);
rb_funcall(obj,s$eo,event,win,type);
return obj;
});
self.$def(s$eo,function(self,_cmd,event,win,type){
self.$i_s(i$ab,event);
self.$i_s(i$ac,win);
return self.$i_s(i$c,type);
});
rb_define_method(self,s$ep,function(self,_cmd){
var event = rb_ivar_get(self, i$ab);
if (event.stopPropagation) {
        event.stopPropagation()
        event.preventDefault();
      } else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }});
rb_define_method(self,s$eq,function(self,_cmd){
return rb_ivar_get(self, i$ab)._vn_allow_event_propagation? true : false;});
rb_define_method(self,s$er,function(self,_cmd,flag){
rb_ivar_get(self, i$ab)._vn_allow_event_propagation = flag;});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_ivar_get(self, i$c);
});
rb_define_method(self,s$es,function(self,_cmd){
});
rb_define_method(self,s$et,function(self,_cmd){
});
rb_define_method(self,s$eu,function(self,_cmd,a_window){
return self.$i_s(i$ac,a_window);
});
rb_define_method(self,s$dw,function(self,_cmd){
return rb_ivar_get(self, i$ac);
});
rb_define_method(self,s$ev,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ac),s$ev);
});
rb_define_method(self,s$ew,function(self,_cmd){
});
rb_define_method(self,s$ex,function(self,_cmd){
});
rb_define_method(self,s$ey,function(self,_cmd){
});
rb_define_method(self,s$ez,function(self,_cmd){
});
rb_define_method(self,s$fa,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ac),s$fb,rb_funcall(self.$klass.$c_g_full(c$o),s$al,rb_ivar_get(self, i$ab).clientX,rb_ivar_get(self, i$ab).clientY));
});
rb_define_method(self,s$fc,function(self,_cmd){
});
rb_define_method(self,s$fd,function(self,_cmd){
});
rb_define_method(self,s$fe,function(self,_cmd){
});
rb_define_method(self,s$ff,function(self,_cmd){
});
rb_define_method(self,s$fg,function(self,_cmd){
});
rb_define_method(self,s$fh,function(self,_cmd){
});
rb_define_method(self,s$fi,function(self,_cmd){
});
self.$def_s(s$fj,function(self,_cmd){
});
})(RClass.define_under(self,'Event',cObject));
})(RModule.define('Vienna'));
