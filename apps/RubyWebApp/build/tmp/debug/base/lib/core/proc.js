
Function.prototype.$klass = cProc
Function.prototype.$type = VN.PROC;
var $VN_1 = RClass.define('Proc',cObject);
$VN_1.$def_s('new',function(self,_cmd){
});
$VN_1.$def('call',function(self,_cmd){
return self.apply(self, [arguments[2]]);;
});
$VN_1.$def('[]',function(self,_cmd){
});
$VN_1.$def('===',function(self,_cmd){
});
$VN_1.$def('yield',function(self,_cmd){
});
$VN_1.$def('to_proc',function(self,_cmd){
});
$VN_1.$def('arity',function(self,_cmd){
});
$VN_1.$def('clone',function(self,_cmd){
});
$VN_1.$def('dup',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd){
});
$VN_1.$def('eql?',function(self,_cmd){
});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('lambda?',function(self,_cmd){
});
$VN_1.$def('binding',function(self,_cmd){
});
$VN_1.$def('curry',function(self,_cmd){
});
$VN_1.$def('source_location',function(self,_cmd){
});
