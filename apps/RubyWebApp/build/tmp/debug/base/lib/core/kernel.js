var $VN_1 = RModule.define('Kernel');
$VN_1.$def('nil?',function(self,_cmd){
return false;
});
$VN_1.$def('===',function(self,_cmd,other){
});
$VN_1.$def('=~',function(self,_cmd,obj){
return nil;
});
$VN_1.$def('!=',function(self,_cmd,obj){
});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('class',function(self,_cmd){
});
$VN_1.$def('clone',function(self,_cmd){
});
$VN_1.$def('dup',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd,orig){
});
$VN_1.$def('taint',function(self,_cmd){
});
$VN_1.$def('tainted?',function(self,_cmd){
});
$VN_1.$def('untaint',function(self,_cmd){
});
$VN_1.$def('untrust',function(self,_cmd){
});
$VN_1.$def('untrusted?',function(self,_cmd){
});
$VN_1.$def('trust',function(self,_cmd){
});
$VN_1.$def('freeze',function(self,_cmd){
});
$VN_1.$def('frozen?',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;});
$VN_1.$def('inspect',function(self,_cmd){
return '';
});
$VN_1.$def('methods',function(self,_cmd){
});
$VN_1.$def('singleton_methods',function(self,_cmd){
});
$VN_1.$def('protected_methods',function(self,_cmd){
});
$VN_1.$def('private_methods',function(self,_cmd){
});
$VN_1.$def('public_methods',function(self,_cmd){
});
$VN_1.$def('instance_variables',function(self,_cmd){
});
$VN_1.$def('instance_variable_get',function(self,_cmd){
});
$VN_1.$def('instance_variable_set',function(self,_cmd){
});
$VN_1.$def('instance_variable_defined?',function(self,_cmd){
});
$VN_1.$def('remove_instance_variable',function(self,_cmd){
});
$VN_1.$def('instance_of?',function(self,_cmd){
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
$VN_1.$def('kind_of?',function(self,_cmd){
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
$VN_1.$def('is_a?',function(self,_cmd){
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
$VN_1.$def('puts',function(self,_cmd){
});
$VN_1.$def('taps',function(self,_cmd){
});
