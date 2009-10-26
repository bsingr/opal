var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('access_instance_variables_directly?',function(self,_cmd){
return true;
});
$VN_2.$def('value_for_key',function(self,_cmd,key){
var accessor = key;
if(RTEST(VN$(self,'respond_to?',accessor))){
return VN$(self,'perform_selector',accessor);
}
accessor = [(key),"?"].join('');
if(RTEST(VN$(self,'respond_to?',accessor))){
return VN$(self,'perform_selector',accessor);
}
if(RTEST(VN$(VN$(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return VN$(self,'value_for_undefined_key',key);
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
var accessor = [(key),"="].join('');
if(RTEST(VN$(self,'respond_to?',accessor))){
return value;
}
if(RTEST(VN$(VN$(self,'class'),'access_instance_variables_directly?'))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {VN$(self,'will_change_value_for_key',key);
self.$iv_tbl['@' + key] = value;VN$(self,'did_change_value_for_key',key);
return value;
}}
return VN$(self,'set_value:for_undefined_key:',value,key);
});
$VN_2.$def('validate_value:for_key:error:',function(self,_cmd,value,key,out_error){
});
$VN_2.$def('array_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('value_for_key_path',function(self,_cmd,path){
return VN$(self,'value_for_key',path);
});
$VN_2.$def('set_value:for_key_path:',function(self,_cmd,value,path){
return VN$(self,'set_value:for_key:',value,path);
});
$VN_2.$def('validate_value:for_key_path:error:',function(self,_cmd,value,path,out_error){
});
$VN_2.$def('array_value_for_key_path',function(self,_cmd,path){
});
$VN_2.$def('set_value_for_key_path',function(self,_cmd,path){
});
$VN_2.$def('value_for_undefined_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_undefined_key:',function(self,_cmd,value,key){
});
$VN_2.$def('set_nil_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('dictionary_with_values_for_keys',function(self,_cmd,keys){
});
$VN_2.$def('set_values_for_keys_with_dictionary',function(self,_cmd,keyed_values){
});
var $VN_2 = RClass.define_under($VN_1, 'Array',cObject);
$VN_2.$def('value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
});
var $VN_2 = RClass.define_under($VN_1, 'Dictionary',cObject);
$VN_2.$def('value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
});
var $VN_2 = RClass.define_under($VN_1, 'Set',cObject);
$VN_2.$def('value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
});
