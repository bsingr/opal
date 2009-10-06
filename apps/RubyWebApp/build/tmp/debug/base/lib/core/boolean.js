Boolean.prototype.$klass = cBoolean;
Boolean.prototype.$type = VN.T_BOOLEAN;
Boolean.prototype.$ = RObject.prototype.$;var $VN_1 = RClass.define('Boolean', cObject);
$VN_1.$def('to_s',function(){
var self=this;
return this ? 'true' : 'false';});
$VN_1.$def('&',function(obj){
var self=this;
if (this) {
      return obj ? true : false ;
    }
    else {
      return false;
    }});
$VN_1.$def('|',function(obj){
var self=this;
if (this) {
      return true ;
    }
    else {
      return obj ? true : false ;
    }});
$VN_1.$def('^',function(obj){
var self=this;
if (this) {
      return obj ? false : true ;
    }
    else {
      return obj ? true : false ;
    }});
