(function(self) {
(function(self) {
(function(self) {
self.$def_s('main_bundle',function(self,_){
return rb_funcall(rb_ivar_get(self,'@all_bundles'),'[]','');
});
self.$def_s('bundle_with_path',function(self,_,path){
});
self.$def_s('bundle_with_url',function(self,_,url){
});
self.$def_s('bundle_for_class',function(self,_,a_class){
return rb_ivar_get(a_class, '__bundle__');});
self.$def_s('bundle_with_identifier',function(self,_,identifier){
});
self.$def_s('all_bundles',function(self,_){
});
self.$def_s('all_frameworks',function(self,_){
});
})(self);
rb_define_method(self,'init_with_path',function(self,_,path){
return self;
});
rb_define_method(self,'init_with_url',function(self,_,url){
});
rb_define_method(self,'load',function(self,_){
});
rb_define_method(self,'loaded?',function(self,_){
return true;
});
rb_define_method(self,'unload',function(self,_){
});
rb_define_method(self,'bundle_url',function(self,_){
});
rb_define_method(self,'resource_url',function(self,_){
});
rb_define_method(self,'executable_url',function(self,_){
});
rb_define_method(self,'bundle_path',function(self,_){
return rb_ivar_get(self,'@bundle_path');
});
rb_define_method(self,'resource_path',function(self,_){
});
rb_define_method(self,'executable_path',function(self,_){
});
self.$def('url_for_resource:with_extension:',function(self,_,name,ext){
});
rb_define_method(self,'path_for_resource',function(self,_,name){
return rb_funcall(rb_ivar_get(self,'@url_map'),'[]',["resources/",(name)].join(''));
});
self.$def('path_for_resource:of_type:',function(self,_,name,ext){
return ["resources/",(name),".",(ext)].join('');
});
self.$def('load_vib_named:external_name_table:load_delegate:',function(self,_,name,name_table,delegate){
var vib=rb_funcall(self.$klass.$c_g_full('VN').$c_g('Vib'),'new',name,self,delegate);
rb_funcall(vib,'instantiate_vib_with_external_name_table',name_table);
return vib;
});
self.$def('resource_contents_for_file:of_type:',function(self,_,name,ext){
return rb_funcall(rb_ivar_get(self,'@resources'),'[]',["resources/",(name),".",(ext)].join(''));
});
rb_define_method(self,'info_dictionary',function(self,_){
return rb_ivar_get(self,'@info_dictionary');
});
})(rb_define_class_under(self,'Bundle',cObject));
})(rb_define_module('Vienna'));
