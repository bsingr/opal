var mMath = RModule.define('Math');

mMath.$define_const('PI', 3.142);
mMath.$define_const('E', 0.000001);(function(self) {
self.$def_s(s$io,function(self,_cmd,a,b){
return VN$(a,s$fj,b) ? a : b;
});
self.$def_s(s$ip,function(self,_cmd,a,b){
return VN$(a,s$fh,b) ? a : b;
});
})(RModule.define('Math'));
