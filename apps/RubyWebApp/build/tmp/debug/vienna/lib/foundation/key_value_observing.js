(function(self) {
self.$c_s('KEY_VALUE_CHANGE_KIND_KEY','KEY_VALUE_CHANGE_KIND_KEY');
self.$c_s('KEY_VALUE_CHANGE_NEW_KEY','KEY_VALUE_CHANGE_NEW_KEY');
self.$c_s('KEY_VALUE_CHANGE_OLD_KEY','KEY_VALUE_CHANGE_OLD_KEY');
self.$c_s('KEY_VALUE_CHANGE_INDEXES_KEY','KEY_VALUE_CHANGE_INDEXES_KEY');
self.$c_s('KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY','KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY');
self.$c_s('KEY_VALUE_OBSERVING_OPTIONS',VN.$h(_$c, 1, _$d, 2, _$e, 4, _$f, 8));
self.$c_s('KEY_VALUE_CHANGE',VN.$h(_$g, 0, _$h, 1, _$i, 2, _$j, 3));
(function(self) {
self.$def(s$kw,function(self,_cmd,path,object,change,context){
});
self.$def(s$kx,function(self,_cmd,observer,key_path,options,context){
VN$(self, s$ky);
var key_observers = VN$(self.$i_g(i$j),s$bo,key_path);
if(!RTEST(key_observers)){
key_observers = VN.$h();
VN$(self.$i_g(i$j),'[]=',key_path,key_observers);
}
return VN$(key_observers,'[]=',observer,VN.$h(_$k, observer, _$l, key_path, _$m, options, _$n, context));
});
self.$def(s$kz,function(self,_cmd,observer,key_path){
});
self.$def(s$ky,function(self,_cmd){
if(RTEST(self.$i_g(i$j))){
return ;
}
(function(self) {
self.$def_s(s$ki,function(self,_cmd,a_key){
return VN$sup(arguments.callee, self,_cmd,[a_key]);
});
self.$def_s(s$kj,function(self,_cmd,a_key){
});
self.$def_s(s$la,function(self,_cmd,change,indexes,a_key){
});
self.$def_s(s$lb,function(self,_cmd,change,indexes,a_key){
});
})(self);
return self.$i_s(i$j,VN.$h());
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def(s$lc,function(self,_cmd,observer,indexes,key_path,options,context){
});
self.$def(s$ld,function(self,_cmd,observer,indexes,keyPath){
});
self.$def(s$kx,function(self,_cmd,observer,key_path,options,context){
});
self.$def(s$kz,function(self,_cmd,observer,key_path){
});
})(RClass.define_under(self,'Array',cObject));
(function(self) {
self.$def(s$ki,function(self,_cmd,key){
return VN$(self,s$ag,key);
});
self.$def(s$kj,function(self,_cmd,key){
});
self.$def(s$la,function(self,_cmd,changeKind,indexes,key){
});
self.$def(s$lb,function(self,_cmd,changeKind,indexes,key){
});
self.$def_s(s$le,function(self,_cmd,key){
});
self.$def(s$lf,function(self,_cmd,key){
return true;
});
self.$def(s$lg,function(self,_cmd,info){
return self.$i_s(i$k,info);
});
self.$def(s$lh,function(self,_cmd){
return self.$i_g(i$k);
});
})(RClass.define_under(self,'Object',cObject));
})(RModule.define('Vienna'));
