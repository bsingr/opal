(function(self) {
rb_define_method(self,s$a,function(self,_cmd){
return false;
});
rb_define_method(self,s$b,function(self,_cmd,other){
});
rb_define_method(self,s$c,function(self,_cmd,obj){
return nil;
});
rb_define_method(self,s$d,function(self,_cmd,obj){
});
rb_define_method(self,s$e,function(self,_cmd,obj){
});
rb_define_method(self,s$f,function(self,_cmd){
});
rb_define_method(self,s$g,function(self,_cmd){
});
rb_define_method(self,s$h,function(self,_cmd){
});
rb_define_method(self,s$i,function(self,_cmd,orig){
});
rb_define_method(self,s$j,function(self,_cmd){
});
rb_define_method(self,s$k,function(self,_cmd){
});
rb_define_method(self,s$l,function(self,_cmd){
});
rb_define_method(self,s$m,function(self,_cmd){
});
rb_define_method(self,s$n,function(self,_cmd){
});
rb_define_method(self,s$o,function(self,_cmd){
});
rb_define_method(self,s$p,function(self,_cmd){
});
rb_define_method(self,s$q,function(self,_cmd){
});
rb_define_method(self,s$r,function(self,_cmd){
return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;});
rb_define_method(self,s$s,function(self,_cmd){
return '';
});
rb_define_method(self,s$t,function(self,_cmd){
});
rb_define_method(self,s$u,function(self,_cmd){
});
rb_define_method(self,s$v,function(self,_cmd){
});
rb_define_method(self,s$w,function(self,_cmd){
});
rb_define_method(self,s$x,function(self,_cmd){
});
rb_define_method(self,s$y,function(self,_cmd){
});
rb_define_method(self,s$z,function(self,_cmd){
});
rb_define_method(self,s$aa,function(self,_cmd){
});
rb_define_method(self,s$ab,function(self,_cmd){
});
rb_define_method(self,s$ac,function(self,_cmd){
});
rb_define_method(self,s$ad,function(self,_cmd){
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
rb_define_method(self,s$ae,function(self,_cmd){
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
rb_define_method(self,s$af,function(self,_cmd){
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
rb_define_method(self,s$ag,function(self,_cmd){
});
rb_define_method(self,s$ah,function(self,_cmd){
});
})(RModule.define('Kernel'));
