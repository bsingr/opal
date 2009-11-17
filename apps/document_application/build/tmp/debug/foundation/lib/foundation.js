(function(self) {
self.$c_s('Object',cObject.$c_g('Object'));
self.$c_s('Array',cObject.$c_g('Array'));
self.$c_s('Dictionary',cObject.$c_g('Hash'));
self.$c_s('Bundle',cObject.$c_g('Bundle'));
(function(self) {
self.$def('perform_selector:with_object:with_object:',function(self,_,selector,obj1,obj2){
return VN$(self, selector, obj1, obj2);});
self.$def('perform_selector:with_object:',function(self,_,selector,obj){
return VN$(self, selector, obj);});
rb_define_method(self,'perform_selector',function(self,_,selector){
return VN$(self, selector);});
})(rb_define_class_under(self,'Object',cObject));
})(rb_define_module('Vienna'));
cObject.$c_s('VN',cObject.$c_g('Vienna'));

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/key_value_coding.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/key_value_observing.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/notification.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/attributed_string.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/index_set.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/property_list.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/bundle.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/foundation/lib/keyed_unarchiver.js');
