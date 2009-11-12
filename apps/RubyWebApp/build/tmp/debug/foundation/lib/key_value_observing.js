(function(self) {
self.$c_s('KEY_VALUE_CHANGE_KIND_KEY','KEY_VALUE_CHANGE_KIND_KEY');
self.$c_s('KEY_VALUE_CHANGE_NEW_KEY','KEY_VALUE_CHANGE_NEW_KEY');
self.$c_s('KEY_VALUE_CHANGE_OLD_KEY','KEY_VALUE_CHANGE_OLD_KEY');
self.$c_s('KEY_VALUE_CHANGE_INDEXES_KEY','KEY_VALUE_CHANGE_INDEXES_KEY');
self.$c_s('KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY','KEY_VALUE_CHANGE_NOTIFICATION_IS_PRIOR_KEY');
self.$c_s('KEY_VALUE_OBSERVING_OPTIONS',VN.$h(_$b, 1, _$c, 2, _$d, 4, _$e, 8));
self.$c_s('KEY_VALUE_CHANGE',VN.$h(_$f, 0, _$g, 1, _$h, 2, _$i, 3));
(function(self) {
self.$def(s$bn,function(self,_,path,object,change,context){
});
self.$def(s$bo,function(self,_,observer,key_path,options,context){
_E(self,s$bp);
var key_observers=_E(_H(self,i$h),s$j,key_path);
if(!_A(key_observers)){
key_observers=VN.$h();
_E(_H(self,i$h),s$g,key_path,key_observers);
}
return _E(key_observers,s$g,observer,VN.$h(_$j, observer, _$k, key_path, _$l, options, _$m, context));
});
self.$def(s$bq,function(self,_,observer,key_path){
});
_I(self,s$bp,function(self,_){
if(_A(_H(self,i$h))){
return ;
}
(function(self) {
self.$def_s(s$az,function(self,_,a_key){
return rb_supcall(arguments.callee, self,_,[a_key]);
});
self.$def_s(s$ba,function(self,_,a_key){
});
self.$def_s(s$br,function(self,_,change,indexes,a_key){
});
self.$def_s(s$bs,function(self,_,change,indexes,a_key){
});
})(self);
return self.$i_s(i$h,VN.$h());
});
})(_N(self,c$j,cObject));
(function(self) {
self.$def(s$bt,function(self,_,observer,indexes,key_path,options,context){
});
self.$def(s$bu,function(self,_,observer,indexes,keyPath){
});
self.$def(s$bo,function(self,_,observer,key_path,options,context){
});
self.$def(s$bq,function(self,_,observer,key_path){
});
})(_N(self,c$k,cObject));
(function(self) {
_I(self,s$az,function(self,_,key){
return _E(self,s$al,key);
});
_I(self,s$ba,function(self,_,key){
});
self.$def(s$br,function(self,_,changeKind,indexes,key){
});
self.$def(s$bs,function(self,_,changeKind,indexes,key){
});
self.$def_s(s$bv,function(self,_,key){
});
_I(self,s$bw,function(self,_,key){
return true;
});
_I(self,s$bx,function(self,_,info){
return self.$i_s(i$i,info);
});
_I(self,s$by,function(self,_){
return _H(self,i$i);
});
})(_N(self,c$j,cObject));
})(_K(c$b));
