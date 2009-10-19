var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'CheckBox',$VN_2.$c_g_full('Button'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@allows_mixed_state',true);
return self.$i_s('@bordered',false);
});
$VN_2.$def('class_name',function(self,_cmd){
return ORTEST(self.$i_g('@class_name'),'vn-check-box');
});
