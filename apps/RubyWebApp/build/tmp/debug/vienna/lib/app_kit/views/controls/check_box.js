var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'CheckBox',$VN_2.$c_g_full('Button'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
return VN$(self,'type=','switch');
});
