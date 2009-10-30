Boolean.prototype.$klass = cBoolean;
Boolean.prototype.$type = VN.BOOLEAN; (function(self) {
self.$def(s$r,function(self,_cmd){
return self ? 'true' : 'false';});
self.$def(s$fm,function(self,_cmd,obj){
if (self) {
      return obj ? true : false ;
    }
    else {
      return false;
    }});
self.$def(s$fn,function(self,_cmd,obj){
if (self) {
      return true ;
    }
    else {
      return obj ? true : false ;
    }});
self.$def(s$fo,function(self,_cmd,obj){
if (self) {
      return obj ? false : true ;
    }
    else {
      return obj ? true : false ;
    }});
})(RClass.define('Boolean',cObject));
