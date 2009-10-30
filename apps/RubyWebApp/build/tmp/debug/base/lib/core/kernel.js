(function(self) {
self.$def(s$a,function(self,_cmd){
return false;
});
self.$def(s$b,function(self,_cmd,other){
});
self.$def(s$c,function(self,_cmd,obj){
return nil;
});
self.$def(s$d,function(self,_cmd,obj){
});
self.$def(s$e,function(self,_cmd,obj){
});
self.$def(s$f,function(self,_cmd){
});
self.$def(s$g,function(self,_cmd){
});
self.$def(s$h,function(self,_cmd){
});
self.$def(s$i,function(self,_cmd,orig){
});
self.$def(s$j,function(self,_cmd){
});
self.$def(s$k,function(self,_cmd){
});
self.$def(s$l,function(self,_cmd){
});
self.$def(s$m,function(self,_cmd){
});
self.$def(s$n,function(self,_cmd){
});
self.$def(s$o,function(self,_cmd){
});
self.$def(s$p,function(self,_cmd){
});
self.$def(s$q,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;});
self.$def(s$s,function(self,_cmd){
return '';
});
self.$def(s$t,function(self,_cmd){
});
self.$def(s$u,function(self,_cmd){
});
self.$def(s$v,function(self,_cmd){
});
self.$def(s$w,function(self,_cmd){
});
self.$def(s$x,function(self,_cmd){
});
self.$def(s$y,function(self,_cmd){
});
self.$def(s$z,function(self,_cmd){
});
self.$def(s$aa,function(self,_cmd){
});
self.$def(s$ab,function(self,_cmd){
});
self.$def(s$ac,function(self,_cmd){
});
self.$def(s$ad,function(self,_cmd){
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
      break ;
     default:
       VN.type_error('class or module required');
     }
     if (this.$klass == klass) return true ;
    return false ;});
self.$def(s$ae,function(self,_cmd){
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
        break ;
      default:
        VN.type_error('class or module required');
    }
    var k = self.$klass ;
    while (k) {
      if (k == klass) {
        return true;
      }
      k = k.$super;
    }
    return false; });
self.$def(s$af,function(self,_cmd){
switch (klass.$type) {
      case VN.MODULE:
      case VN.CLASS:
      case VN.ICLASS:
        break ;
      default:
        VN.type_error('class or module required');
    }
    var k = self.$klass ;
    while (k) {
      if (k == klass) {
        return true;
      }
      k = k.$super;
    }
    return false;    });
self.$def(s$ag,function(self,_cmd){
});
self.$def(s$ah,function(self,_cmd){
});
})(RModule.define('Kernel'));
