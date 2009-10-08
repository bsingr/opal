var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Object', cObject);
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(path,object,change,context){
var self=this;
});
$VN_2.$def('add_observer:for_key_path:options:context:',function(observer,key_path,options,context){
var self=this;
});
$VN_2.$def('remove_observer:for_key_path:',function(observer,key_path){
var self=this;
});
