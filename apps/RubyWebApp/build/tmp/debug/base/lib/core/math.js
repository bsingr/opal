var mMath = RModule.define('Math');

mMath.$define_const('PI', 3.142);
mMath.$define_const('E', 0.000001);var $VN_1 = RModule.define('Math');
$VN_1.$def_s('min',function(self,_cmd,a,b){
return VN$(a,'<',b) ? a : b;
});
$VN_1.$def_s('max',function(self,_cmd,a,b){
return VN$(a,'>',b) ? a : b;
});
