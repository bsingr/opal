cModule.$define_alloc_func(function(module_s_alloc) {
  
});var $VN_1 = RClass.define('Module', cObject);
$VN_1.$def('freeze',function(){
var self=this;
});
$VN_1.$def('===',function(){
var self=this;
});
$VN_1.$def('==',function(){
var self=this;
});
$VN_1.$def('<=>',function(){
var self=this;
});
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
});
$VN_1.$def('included_modules',function(){
var self=this;
});
$VN_1.$def('include?',function(){
var self=this;
});
$VN_1.$def('name',function(){
var self=this;
});
$VN_1.$def('ancestors',function(){
var self=this;
});
$VN_1.$def('attr',function(){
var self=this;
});
$VN_1.$def('attr_reader',function(){
var self=this;
console.log(this);var argname = arguments[0];
    this.$def(arguments[0], function() {
      return this.$i_g('@' + argname);
    });});
$VN_1.$def('attr_writer',function(){
var self=this;
console.log("calling writer!");});
$VN_1.$def('attr_accessor',function(){
var self=this;
for (var i = 0; i < arguments.length; i++) {
      this.$('attr_reader', [arguments[i]]);
      this.$('attr_writer', [arguments[i]]);
    }});
$VN_1.$def('initialize',function(){
var self=this;
});
$VN_1.$def('instance_methods',function(){
var self=this;
});
$VN_1.$def('public_instance_methods',function(){
var self=this;
});
$VN_1.$def('protected_instance_methods',function(){
var self=this;
});
$VN_1.$def('private_instance_methods',function(){
var self=this;
});
$VN_1.$def('constants',function(){
var self=this;
});
$VN_1.$def('const_get',function(){
var self=this;
});
$VN_1.$def('const_set',function(){
var self=this;
});
$VN_1.$def('const_defined?',function(){
var self=this;
});
$VN_1.$def('remove_const',function(){
var self=this;
});
$VN_1.$def('const_missing',function(){
var self=this;
});
$VN_1.$def('class_variables',function(){
var self=this;
});
$VN_1.$def('remove_class_variable',function(){
var self=this;
});
$VN_1.$def('class_variable_get',function(){
var self=this;
});
$VN_1.$def('class_variable_set',function(){
var self=this;
});
$VN_1.$def('class_variable_defined?',function(){
var self=this;
});
