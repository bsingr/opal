var $VN_1 = RClass.define('Document',cObject);
$VN_1.$def_s('ready?',function(self,_cmd,block){
});
$VN_1.$def_s('<<',function(self,_cmd,elem){
var e = elem.$i_g('@element');
document.body.appendChild(e);});
