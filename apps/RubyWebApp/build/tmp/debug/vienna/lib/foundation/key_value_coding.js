var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
var $VN_2 = RClass.define_under($VN_1, 'Object', cObject);
$VN_2.$def_s('access_instance_variables_directly?',function(){
var self=this;
return true;
});
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
return self.$('puts',[['Setting value for ',(key)].join('')]);
});
$VN_2.$def('validate_value:for_key:error:',function(value,key,out_error){
var self=this;
});
$VN_2.$def('array_value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value_for_key',function(key){
var self=this;
});
$VN_2.$def('value_for_key_path',function(path){
var self=this;
});
$VN_2.$def('set_value:for_key_path:',function(value,path){
var self=this;
});
$VN_2.$def('validate_value:for_key_path:error:',function(value,path,out_error){
var self=this;
});
$VN_2.$def('array_value_for_key_path',function(path){
var self=this;
});
$VN_2.$def('set_value_for_key_path',function(path){
var self=this;
});
$VN_2.$def('value_for_undefined_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_undefined_key:',function(value,key){
var self=this;
});
$VN_2.$def('set_nil_value_for_key',function(key){
var self=this;
});
$VN_2.$def('dictionary_with_values_for_keys',function(keys){
var self=this;
});
$VN_2.$def('set_values_for_keys_with_dictionary',function(keyed_values){
var self=this;
});
var $VN_2 = RClass.define_under($VN_1, 'Array', cObject);
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
});
var $VN_2 = RClass.define_under($VN_1, 'Dictionary', cObject);
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
});
var $VN_2 = RClass.define_under($VN_1, 'Set', cObject);
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
});
