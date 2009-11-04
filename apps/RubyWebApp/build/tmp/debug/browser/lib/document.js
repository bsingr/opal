(function(self) {
self.$def_s(s$d,function(self,_cmd,block){
});
self.$def_s(s$e,function(self,_cmd,elem){
var e = elem.$i_g('@element');
document.body.appendChild(e);});
self.$def_s(s$f,function(self,_cmd,type,listener){
self.$i_s(i$a,ORTEST(rb_ivar_get(self, i$a),VN.$h()));
rb_funcall(rb_ivar_get(self, i$a),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(type, listener, false);
    }
    else {
      document.body.attachEvent('on' + type, listener);
    }});
self.$def_s(s$g,function(self,_cmd,type){
var listener = rb_funcall(rb_ivar_get(self, i$a),s$h,type);
if (document.addEventListener) {
      document.body.removeEventListener(type, listener, false);
    }
    else {
      document.body.detachEvent('on' + type, listener);
    }});
self.$c_g_full(c$c).$def_s(s$i,function(self,_cmd){
return 3;
});
})(RClass.define('Document',cObject));
