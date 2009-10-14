Boolean.prototype.$klass = cBoolean;
Boolean.prototype.$type = VN.BOOLEAN; var $VN_1 = RClass.define('Boolean',cObject);
$VN_1.$def('to_s',function(self,_cmd){
return self ? 'true' : 'false';});
$VN_1.$def('&',function(self,_cmd,obj){
if (self) {
      return obj ? true : false ;
    }
    else {
      return false;
    }});
$VN_1.$def('|',function(self,_cmd,obj){
if (self) {
      return true ;
    }
    else {
      return obj ? true : false ;
    }});
$VN_1.$def('^',function(self,_cmd,obj){
if (self) {
      return obj ? false : true ;
    }
    else {
      return obj ? true : false ;
    }});
