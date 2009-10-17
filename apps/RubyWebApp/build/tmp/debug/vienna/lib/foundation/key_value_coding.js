var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
var $VN_2 = RClass.define_under($VN_1, 'Object',cObject);
$VN_2.$def_s('access_instance_variables_directly?',function(self,_cmd){
return true;
});
$VN_2.$def('value_for_key',function(self,_cmd,key){
return self.$i_g('@' + key);});
$VN_2.$def('set_value:for_key:',function(self,_cmd,value,key){
return VN$(self,'puts',["Setting value for ",(key)].join(''));
});
$VN_2.$def('validate_value:for_key:error:',function(self,_cmd,value,key,out_error){
});
$VN_2.$def('array_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('set_value_for_key',function(self,_cmd,key){
});
$VN_2.$def('value_for_key_path',function(self,_cmd,path){
});
$VN_2.$def('set_value:for_key_path:',function(self,_cmd,value,path){
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
