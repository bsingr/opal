var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('VERSION','0.0.1');
$VN_1.$def_s('version',function(self,_cmd){
return self.$c_g_full('VERSION');
});
$VN_1.$def_s('display_mode',function(self,_cmd){
return 'render';});
$VN_1.$def('app',function(self,_cmd){
});
cObject.$c_s('VN',cObject.$c_g('Vienna'));
cObject.$c_s('YES',true);
cObject.$c_s('NO',false);

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/foundation.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/app_kit.js');
