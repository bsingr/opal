(function(self) {
self.$def_s(s$ja,function(self,_cmd,block){
});
self.$def_s(s$cv,function(self,_cmd,elem){
var e = elem.$i_g('@element');
document.body.appendChild(e);});
self.$def_s(s$jb,function(self,_cmd,type,listener){
self.$i_s(i$c,ORTEST(self.$i_g(i$c),VN.$h()));
VN$(self.$i_g(i$c),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(type, listener, false);
    }
    else {
      document.body.attachEvent('on' + type, listener);
    }});
self.$def_s(s$jc,function(self,_cmd,type){
var listener = VN$(self.$i_g(i$c),s$bo,type);
if (document.addEventListener) {
      document.body.removeEventListener(type, listener, false);
    }
    else {
      document.body.detachEvent('on' + type, listener);
    }});
self.$c_g_full(c$b).$def_s(s$jd,function(self,_cmd){
return 3;
});
})(RClass.define('Document',cObject));
