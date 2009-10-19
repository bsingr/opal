var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'WindowView',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-window-view';
});
$VN_2.$def('window=',function(self,_cmd,win){
VN$(self, 'will_change_value_for_key', 'window');
self.$i_s('@window',win);
VN$(self, 'did_change_value_for_key', 'window');
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(['vn-window-view'],'join',' '));
});
