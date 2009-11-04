(function(self) {
self.$c_s('KEY_VALUE_CHANGE_KIND_KEY','KEY_VALUE_CHANGE_KIND_KEY');
self.$c_s('KEY_VALUE_CHANGE_NEW_KEY','KEY_VALUE_CHANGE_NEW_KEY');
self.$c_s('KEY_VALUE_CHANGE_OLD_KEY','KEY_VALUE_CHANGE_OLD_KEY');
self.$c_s('KEY_VALUE_CHANGE_INDEXES_KEY','KEY_VALUE_CHANGE_INDEXES_KEY');
self.$c_s('KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY','KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY');
self.$c_s('KEY_VALUE_OBSERVING_OPTIONS',VN.$h(_$c, 1, _$d, 2, _$e, 4, _$f, 8));
self.$c_s('KEY_VALUE_CHANGE',VN.$h(_$g, 0, _$h, 1, _$i, 2, _$j, 3));
(function(self) {
self.$def(s$bm,function(self,_cmd,path,object,change,context){
});
self.$def(s$bn,function(self,_cmd,observer,key_path,options,context){
rb_funcall(self, s$bo);
var key_observers = rb_funcall(rb_ivar_get(self, i$h),s$h,key_path);
if(!RTEST(key_observers)){
key_observers = VN.$h();
rb_funcall(rb_ivar_get(self, i$h),'[]=',key_path,key_observers);
}
return rb_funcall(key_observers,'[]=',observer,VN.$h(_$k, observer, _$l, key_path, _$m, options, _$n, context));
});
self.$def(s$bp,function(self,_cmd,observer,key_path){
});
rb_define_method(self,s$bo,function(self,_cmd){
if(RTEST(rb_ivar_get(self, i$h))){
return ;
}
(function(self) {
self.$def_s(s$ay,function(self,_cmd,a_key){
return rb_supcall(arguments.callee, self,_cmd,[a_key]);
});
self.$def_s(s$az,function(self,_cmd,a_key){
});
self.$def_s(s$bq,function(self,_cmd,change,indexes,a_key){
});
self.$def_s(s$br,function(self,_cmd,change,indexes,a_key){
});
})(self);
return self.$i_s(i$h,VN.$h());
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def(s$bs,function(self,_cmd,observer,indexes,key_path,options,context){
});
self.$def(s$bt,function(self,_cmd,observer,indexes,keyPath){
});
self.$def(s$bn,function(self,_cmd,observer,key_path,options,context){
});
self.$def(s$bp,function(self,_cmd,observer,key_path){
});
})(RClass.define_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,s$ay,function(self,_cmd,key){
return rb_funcall(self,s$ak,key);
});
rb_define_method(self,s$az,function(self,_cmd,key){
});
self.$def(s$bq,function(self,_cmd,changeKind,indexes,key){
});
self.$def(s$br,function(self,_cmd,changeKind,indexes,key){
});
self.$def_s(s$bu,function(self,_cmd,key){
});
rb_define_method(self,s$bv,function(self,_cmd,key){
return true;
});
rb_define_method(self,s$bw,function(self,_cmd,info){
return self.$i_s(i$i,info);
});
rb_define_method(self,s$bx,function(self,_cmd){
return rb_ivar_get(self, i$i);
});
})(RClass.define_under(self,'Object',cObject));
})(RModule.define('Vienna'));
