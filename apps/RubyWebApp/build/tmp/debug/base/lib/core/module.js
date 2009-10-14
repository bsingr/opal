cModule.$define_alloc_func(function(module_s_alloc) {
  
});var $VN_1 = RClass.define('Module',cObject);
$VN_1.$def('freeze',function(self,_cmd){
});
$VN_1.$def('===',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd){
});
$VN_1.$def('<=>',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('included_modules',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('name',function(self,_cmd){
});
$VN_1.$def('ancestors',function(self,_cmd){
});
$VN_1.$def('attr',function(self,_cmd){
});
$VN_1.$def('attr_reader',function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'return self.$i_g("@' + args[i] + '");')
      self.$def(args[i], body);
    }});
$VN_1.$def('attr_writer',function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'val', 'VN$(self, "will_change_value_for_key","' + args[i] + '"); var ret = self.$i_s("@' + args[i] + '",val); VN$(self, "did_change_value_for_key","' + args[i] + '"); return ret;');
      self.$def(args[i] + '=', body);
    }});
$VN_1.$def('attr_accessor',function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      VN$(self, 'attr_reader', args[i]);
      VN$(self, 'attr_writer', args[i]);
    }});
$VN_1.$def('initialize',function(self,_cmd){
});
$VN_1.$def('instance_methods',function(self,_cmd){
});
$VN_1.$def('public_instance_methods',function(self,_cmd){
});
$VN_1.$def('protected_instance_methods',function(self,_cmd){
});
$VN_1.$def('private_instance_methods',function(self,_cmd){
});
$VN_1.$def('constants',function(self,_cmd){
});
$VN_1.$def('const_get',function(self,_cmd){
});
$VN_1.$def('const_set',function(self,_cmd){
});
$VN_1.$def('const_defined?',function(self,_cmd){
});
$VN_1.$def('remove_const',function(self,_cmd){
});
$VN_1.$def('const_missing',function(self,_cmd){
});
$VN_1.$def('class_variables',function(self,_cmd){
});
$VN_1.$def('remove_class_variable',function(self,_cmd){
});
$VN_1.$def('class_variable_get',function(self,_cmd){
});
$VN_1.$def('class_variable_set',function(self,_cmd){
});
$VN_1.$def('class_variable_defined?',function(self,_cmd){
});
