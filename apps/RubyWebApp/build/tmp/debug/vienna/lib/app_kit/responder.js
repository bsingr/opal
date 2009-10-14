var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Responder',$VN_2.$c_g_full('Object'));
$VN_2.$def('initialize',function(self,_cmd){
VN$(self,'puts','initialising responder');
return VN$sup(arguments.callee, self,_cmd,[]);
});
