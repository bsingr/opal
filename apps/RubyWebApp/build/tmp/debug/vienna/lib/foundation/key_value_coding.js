(function(self) {
self.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
(function(self) {
self.$def_s(s$kd,function(self,_cmd){
return true;
});
self.$def(s$ke,function(self,_cmd,key){
var accessor = key;
if(RTEST(VN$(self,s$kf,accessor))){
return VN$(self,s$kc,accessor);
}
accessor = [(key),"?"].join('');
if(RTEST(VN$(self,s$kf,accessor))){
return VN$(self,s$kc,accessor);
}
if(RTEST(VN$(VN$(self,s$f),s$kd))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return VN$(self,s$kg,key);
});
self.$def(s$kh,function(self,_cmd,value,key){
var accessor = [(key),"="].join('');
if(RTEST(VN$(self,s$kf,accessor))){
VN$(self,s$kb,accessor,value);
return value;
}
if(RTEST(VN$(VN$(self,s$f),s$kd))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {VN$(self,s$ki,key);
self.$iv_tbl['@' + key] = value;VN$(self,s$kj,key);
return value;
}}
return VN$(self,s$kk,value,key);
});
self.$def(s$kl,function(self,_cmd,value,key,out_error){
});
self.$def(s$km,function(self,_cmd,key){
});
self.$def(s$kn,function(self,_cmd,key){
});
self.$def(s$ko,function(self,_cmd,path){
return VN$(self,s$ke,path);
});
self.$def(s$kp,function(self,_cmd,value,path){
return VN$(self,s$kh,value,path);
});
self.$def(s$kq,function(self,_cmd,value,path,out_error){
});
self.$def(s$kr,function(self,_cmd,path){
});
self.$def(s$ks,function(self,_cmd,path){
});
self.$def(s$kg,function(self,_cmd,key){
});
self.$def(s$kk,function(self,_cmd,value,key){
});
self.$def(s$kt,function(self,_cmd,key){
});
self.$def(s$ku,function(self,_cmd,keys){
});
self.$def(s$kv,function(self,_cmd,keyed_values){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def(s$ke,function(self,_cmd,key){
});
self.$def(s$kh,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Array',cObject));
(function(self) {
self.$def(s$ke,function(self,_cmd,key){
});
self.$def(s$kh,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Dictionary',cObject));
(function(self) {
self.$def(s$ke,function(self,_cmd,key){
});
self.$def(s$kh,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Set',cObject));
})(RModule.define('Vienna'));
