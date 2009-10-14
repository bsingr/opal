var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('Object',cObject.$c_g('Object'));
$VN_1.$c_s('Array',cObject.$c_g('Array'));
$VN_1.$c_s('Dictionary',cObject.$c_g('Hash'));
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@kvo_observers',[]);
return self.$i_s('@kvo_old_values',VN.$h());
});

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/key_value_coding.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/key_value_observing.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/notification.js');
