(function(self) {
self.$c_s('PROPERTY_LIST_FORMATS',VN.$h());
(function(self) {
(function(self) {
self.$def_s('property_list:is_valid_for_format:',function(self,_,plist,format){
return true;
});
self.$def_s('property_list_from_data:format:error_description:',function(self,_,data,format,error_description){
return vn_binary_plist_parse(data);});
})(self);
})(rb_define_class_under(self,'PropertyListSerialization',cObject));
})(rb_define_module('Vienna'));
