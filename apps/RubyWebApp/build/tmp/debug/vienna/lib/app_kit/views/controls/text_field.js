var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TextField',$VN_2.$c_g_full('Control'));
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='left'></div>");
VN$(context,'<<',"<div class='middle'></div>");
VN$(context,'<<',"<div class='right'></div>");
VN$(context,'<<',"<input class='text_field'></div>");
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
});
