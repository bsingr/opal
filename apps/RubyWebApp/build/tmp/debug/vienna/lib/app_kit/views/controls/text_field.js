var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TextField',$VN_2.$c_g_full('Control'));
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
});
$VN_2.$def('setup_display_context',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
VN$(self.$i_g('@display_context'),'add_event_listener','mousedown',function(event){
event._vn_allow_event_propagation = true;});
return VN$(self.$i_g('@display_context'),'add_event_listener','mouseup',function(event){
event._vn_allow_event_propagation = true;});
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='left'></div>");
VN$(context,'<<',"<div class='middle'></div>");
VN$(context,'<<',"<div class='right'></div>");
VN$(context,'<<',"<input class='input'></div>");
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
});
