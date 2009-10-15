var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('Object',cObject.$c_g('Object'));
$VN_1.$c_s('Array',cObject.$c_g('Array'));
$VN_1.$c_s('Dictionary',cObject.$c_g('Hash'));
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def('initialize',function(self,_cmd){
});
$VN_2.$def('perform_selector:with_object:with_object:',function(self,_cmd,selector,obj1,obj2){
return VN$(self, selector, obj1, obj2);});

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/key_value_coding.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/key_value_observing.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/notification.js');
