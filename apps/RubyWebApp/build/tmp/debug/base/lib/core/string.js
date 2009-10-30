String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

cString.$define_alloc_func(function() {
  return new String();
}); (function(self) {
self.$def(s$bi,function(self,_cmd){
});
self.$def(s$as,function(self,_cmd){
});
self.$def(s$i,function(self,_cmd){
});
self.$def(s$aj,function(self,_cmd,obj){
});
self.$def(s$ai,function(self,_cmd,obj){
return (self == obj) ? true : false;});
self.$def(s$e,function(self,_cmd,obj){
});
self.$def(s$bj,function(self,_cmd,obj){
});
self.$def(s$bk,function(self,_cmd,obj){
});
self.$def(s$bl,function(self,_cmd,obj){
return self + obj;});
self.$def(s$bm,function(self,_cmd,obj){
});
self.$def(s$bn,function(self,_cmd,obj){
});
self.$def(s$bo,function(self,_cmd,key){
});
self.$def(s$bp,function(self,_cmd,key,val){
});
self.$def(s$bq,function(self,_cmd){
});
self.$def(s$br,function(self,_cmd){
return self.length;});
self.$def(s$bs,function(self,_cmd){
return self.length});
self.$def(s$bt,function(self,_cmd){
});
self.$def(s$c,function(self,_cmd,match){
});
self.$def(s$bu,function(self,_cmd,match){
});
self.$def(s$bv,function(self,_cmd){
});
self.$def(s$bw,function(self,_cmd){
});
self.$def(s$bx,function(self,_cmd){
});
self.$def(s$by,function(self,_cmd){
});
self.$def(s$bz,function(self,_cmd){
});
self.$def(s$ca,function(self,_cmd){
});
self.$def(s$cb,function(self,_cmd){
});
self.$def(s$cc,function(self,_cmd){
});
self.$def(s$cd,function(self,_cmd){
});
self.$def(s$ce,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
return new String(self);});
self.$def(s$cf,function(self,_cmd){
return VN$(self, s$r);
});
self.$def(s$s,function(self,_cmd){
return new String('"' + self + '"');});
self.$def(s$cg,function(self,_cmd){
});
self.$def(s$ch,function(self,_cmd){
});
self.$def(s$ci,function(self,_cmd){
});
self.$def(s$cj,function(self,_cmd){
});
self.$def(s$ck,function(self,_cmd){
});
self.$def(s$cl,function(self,_cmd){
var parts = self.split('_');
    var length = parts.length;

    if (length == 1) return parts[0];

    var camelized = self.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;});
self.$def(s$cm,function(self,_cmd){
});
self.$def(s$cn,function(self,_cmd){
});
self.$def(s$co,function(self,_cmd){
});
self.$def(s$cp,function(self,_cmd){
});
self.$def(s$cq,function(self,_cmd){
});
self.$def(s$cr,function(self,_cmd){
});
self.$def(s$cs,function(self,_cmd){
});
self.$def(s$ct,function(self,_cmd){
});
self.$def(s$cu,function(self,_cmd){
});
self.$def(s$cv,function(self,_cmd){
});
self.$def(s$cw,function(self,_cmd){
});
self.$def(s$cx,function(self,_cmd){
});
self.$def(s$cy,function(self,_cmd){
return new String(self);});
self.$def(s$cz,function(self,_cmd){
});
self.$def(s$al,function(self,_cmd){
});
self.$def(s$da,function(self,_cmd){
});
self.$def(s$db,function(self,_cmd){
});
self.$def(s$dc,function(self,_cmd){
});
self.$def(s$dd,function(self,_cmd){
});
self.$def(s$de,function(self,_cmd){
});
self.$def(s$df,function(self,_cmd){
});
self.$def(s$dg,function(self,_cmd){
});
self.$def(s$dh,function(self,_cmd){
});
self.$def(s$di,function(self,_cmd){
});
self.$def(s$dj,function(self,_cmd){
});
self.$def(s$dk,function(self,_cmd){
});
self.$def(s$dl,function(self,_cmd){
});
self.$def(s$dm,function(self,_cmd){
});
self.$def(s$dn,function(self,_cmd){
});
self.$def(s$do,function(self,_cmd){
});
self.$def(s$dp,function(self,_cmd){
});
self.$def(s$dq,function(self,_cmd){
});
self.$def(s$dr,function(self,_cmd){
});
self.$def(s$ds,function(self,_cmd){
});
self.$def(s$dt,function(self,_cmd){
});
self.$def(s$du,function(self,_cmd){
});
self.$def(s$dv,function(self,_cmd){
});
self.$def(s$dw,function(self,_cmd){
});
self.$def(s$dx,function(self,_cmd){
});
self.$def(s$dy,function(self,_cmd){
});
self.$def(s$dz,function(self,_cmd){
});
})(RClass.define('String',cObject));
