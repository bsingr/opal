(function(self) {
(function(self) {
rb_funcall(self,s$by,_$fe,_$m,_$ff,_$q);
rb_define_method(self,s$i,function(self,_cmd,rect,options,owner,user_info){
self.$i_s(i$ae,rect);
self.$i_s(i$af,options);
self.$i_s(i$ag,owner);
return self.$i_s(i$l,user_info);
});
self.$def_s(s$gd,function(self,_cmd,rect,options,owner,user_info){
return rb_funcall(self,s$al,rect,options,owner,user_info);
});
})(RClass.define_under(self,'TrackingArea',cObject));
})(RModule.define('Vienna'));
