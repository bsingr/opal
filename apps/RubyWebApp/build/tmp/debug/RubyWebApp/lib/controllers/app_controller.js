var $VN_1 = RModule.define('RubyWebApp');
var $VN_2 = RClass.define_under($VN_1, 'AppController',cObject);
$VN_2.$def('initialize',function(self,_cmd){
VN$(self,'puts','initialising app controller');
self.$i_s('@adam',10);
return self.$i_s('@test_binding',false);
});
$VN_2.$def('adam?',function(self,_cmd){
return self.$i_g('@adam');
});
$VN_2.$def('test_binding',function(self,_cmd){
return self.$i_g('@test_binding');
});
$VN_2.$def('test_binding=',function(self,_cmd,aValue){
VN$(self, 'will_change_value_for_key', 'test_binding');
self.$i_s('@test_binding',aValue);
VN$(self, 'did_change_value_for_key', 'test_binding');
});
$VN_2.$def('will_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application will finish launching!');
});
$VN_2.$def('did_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application did finish launching!!');
});
