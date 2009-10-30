(function(self) {
self.$c_s('Object',cObject.$c_g('Object'));
self.$c_s('Array',cObject.$c_g('Array'));
self.$c_s('Dictionary',cObject.$c_g('Hash'));
(function(self) {
self.$def(s$as,function(self,_cmd){
});
self.$def(s$ka,function(self,_cmd,selector,obj1,obj2){
return VN$(self, selector, obj1, obj2);});
self.$def(s$kb,function(self,_cmd,selector,obj){
return VN$(self, selector, obj);});
self.$def(s$kc,function(self,_cmd,selector){
return VN$(self, selector);});
})(RClass.define_under(self,'Object',cObject));
})(RModule.define('Vienna'));

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/key_value_coding.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/key_value_observing.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/foundation/notification.js');
