var $VN_1 = RClass.define('NilClass',cObject);
$VN_1.$def('nil?',function(self,_cmd){
return true;
});
$VN_1.$def('to_i',function(self,_cmd){
return 0;
});
$VN_1.$def('to_f',function(self,_cmd){
return 0.0;
});
$VN_1.$def('to_s',function(self,_cmd){
return 'nil';
});
$VN_1.$def('to_a',function(self,_cmd){
return [];
});
$VN_1.$def('inspect',function(self,_cmd){
return 'nil';
});
$VN_1.$def('&',function(self,_cmd,other){
return false;
});
$VN_1.$def('|',function(self,_cmd,other){
});
$VN_1.$def('^',function(self,_cmd,other){
});
