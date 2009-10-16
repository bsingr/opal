var $VN_1 = RModule.define('RubyWebApp');
var $VN_2 = RClass.define_under($VN_1, 'AppController',cObject);
$VN_2.$def('initialize',function(self,_cmd){
VN$(self,'puts','initialising app controller');
return self.$i_s('@adam',10);
});
$VN_2.$def('will_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application will finish launching!');
});
$VN_2.$def('did_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application did finish launching!!');
});
