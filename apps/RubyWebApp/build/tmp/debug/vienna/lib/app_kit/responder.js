var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Responder',$VN_2.$c_g_full('Object'));
$VN_2.$def('initialize',function(self,_cmd){
VN$(self,'puts','initialising responder');
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@next_responder',nil);
});
$VN_2.$def('next_responder=',function(self,_cmd,a_responder){
VN$(self, 'will_change_value_for_key', 'next_responder');
self.$i_s('@next_responder',a_responder);
VN$(self, 'did_change_value_for_key', 'next_responder');
});
$VN_2.$def('next_responder',function(self,_cmd){
return self.$i_g('@next_responder');
});
$VN_2.$def('try_to_perform:with:',function(self,_cmd,an_action,an_object){
});
