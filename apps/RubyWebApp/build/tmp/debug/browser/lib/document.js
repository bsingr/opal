(function(self) {
self.$def_s(s$d,function(self,_,block){
});
self.$def_s(s$e,function(self,_,elem){
var e=elem.$i_g('@element');
document.body.appendChild(e);});
self.$def_s(s$f,function(self,_,type,listener){
self.$i_s(i$a,ORTEST(_H(self,i$a),VN.$h()));
_E(_H(self,i$a),s$g,type,listener);
if (document.addEventListener) {
      console.log("binding " + _E(type,s$h));
      document.body.addEventListener(_E(type,s$h), listener, false);
    }
    else {
      document.body.attachEvent('on' + _E(type,s$h), listener);
    }});
self.$def_s(s$i,function(self,_,type){
var listener=_E(_H(self,i$a),s$j,type);
if (document.addEventListener) {
      document.body.removeEventListener(_E(type,s$h), listener, false);
    }
    else {
      document.body.detachEvent('on' + _E(type,s$h), listener);
    }});
self.$c_g_full(c$c).$def_s(s$k,function(self,_){
return 3;
});
})(_M(c$c,cObject));
