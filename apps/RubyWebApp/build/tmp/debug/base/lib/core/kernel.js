var $VN_1 = RModule.define('Kernel');
$VN_1.$def('nil?',function(){
var self=this;
return false;
});
$VN_1.$def('===',function(other){
var self=this;
});
$VN_1.$def('=~',function(obj){
var self=this;
return nil;
});
$VN_1.$def('!=',function(obj){
var self=this;
});
$VN_1.$def('eql?',function(obj){
var self=this;
});
$VN_1.$def('class',function(){
var self=this;
});
$VN_1.$def('clone',function(){
var self=this;
});
$VN_1.$def('dup',function(){
var self=this;
});
$VN_1.$def('initialize_copy',function(orig){
var self=this;
});
$VN_1.$def('taint',function(){
var self=this;
});
$VN_1.$def('tainted?',function(){
var self=this;
});
$VN_1.$def('untaint',function(){
var self=this;
});
$VN_1.$def('untrust',function(){
var self=this;
});
$VN_1.$def('untrusted?',function(){
var self=this;
});
$VN_1.$def('trust',function(){
var self=this;
});
$VN_1.$def('freeze',function(){
var self=this;
});
$VN_1.$def('frozen?',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;});
$VN_1.$def('inspect',function(){
var self=this;
return '';
});
$VN_1.$def('methods',function(){
var self=this;
});
$VN_1.$def('singleton_methods',function(){
var self=this;
});
$VN_1.$def('protected_methods',function(){
var self=this;
});
$VN_1.$def('private_methods',function(){
var self=this;
});
$VN_1.$def('public_methods',function(){
var self=this;
});
$VN_1.$def('instance_variables',function(){
var self=this;
});
$VN_1.$def('instance_variable_get',function(){
var self=this;
});
$VN_1.$def('instance_variable_set',function(){
var self=this;
});
$VN_1.$def('instance_variable_defined?',function(){
var self=this;
});
$VN_1.$def('remove_instance_variable',function(){
var self=this;
});
$VN_1.$def('instance_of?',function(){
var self=this;
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
      break ;
     default:
       VN.type_error('class or module required');
     }
     if (this.$klass == klass) return true ;
    return false ;});
$VN_1.$def('kind_of?',function(){
var self=this;
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
        break ;
      default:
        VN.type_error('class or module required');
    }
    var k = self.$klass ;
    while (k) {
      if (k == klass) {
        return true;
      }
      k = k.$super;
    }
    return false; });
$VN_1.$def('is_a?',function(){
var self=this;
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
        break ;
      default:
        VN.type_error('class or module required');
    }
    var k = self.$klass ;
    while (k) {
      if (k == klass) {
        return true;
      }
      k = k.$super;
    }
    return false;    });
$VN_1.$def('puts',function(){
var self=this;
});
$VN_1.$def('taps',function(){
var self=this;
});
