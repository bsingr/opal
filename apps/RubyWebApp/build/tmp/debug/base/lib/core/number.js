Number.prototype.$klass = cNumber ;
Number.prototype.$type = VN.NUMBER ;
Number.prototype.$ = RObject.prototype.$;

// VN.include_module(VN.cNumber, VN.mComparable);
RModule.include(cNumber, mComparable);(function(self) {
self.$def(s$ee,function(self,_cmd){
});
self.$def(s$ef,function(self,_cmd){
});
self.$def(s$eg,function(self,_cmd){
return self * -1;});
self.$def(s$aj,function(self,_cmd){
});
self.$def(s$e,function(self,_cmd){
});
self.$def(s$eh,function(self,_cmd){
});
self.$def(s$ei,function(self,_cmd){
});
self.$def(s$ej,function(self,_cmd){
});
self.$def(s$ek,function(self,_cmd){
});
self.$def(s$el,function(self,_cmd){
});
self.$def(s$em,function(self,_cmd){
});
self.$def(s$en,function(self,_cmd){
});
self.$def(s$eo,function(self,_cmd){
});
self.$def(s$ep,function(self,_cmd){
});
self.$def(s$eq,function(self,_cmd){
});
self.$def(s$er,function(self,_cmd){
});
self.$def(s$es,function(self,_cmd){
});
self.$def(s$et,function(self,_cmd){
});
self.$def(s$eu,function(self,_cmd){
});
self.$def(s$ev,function(self,_cmd){
});
self.$def(s$ew,function(self,_cmd){
});
self.$def(s$ex,function(self,_cmd){
});
self.$def(s$ey,function(self,_cmd){
});
self.$def(s$ez,function(self,_cmd){
return (self %2 == 0) ? false : true;});
self.$def(s$fa,function(self,_cmd){
return (self %2 == 0) ? true : false;});
self.$def(s$bx,function(self,_cmd){
});
self.$def(s$fb,function(self,_cmd){
});
self.$def(s$fc,function(self,_cmd,block){
for (var i = 0; i < self; i++) {
      VN$(block, 'call', i);
    }return self;
});
self.$def(s$bv,function(self,_cmd){
});
self.$def(s$bw,function(self,_cmd){
});
self.$def(s$fd,function(self,_cmd){
});
self.$def(s$cc,function(self,_cmd){
});
self.$def(s$cz,function(self,_cmd){
});
self.$def(s$cd,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
});
self.$def(s$bl,function(self,_cmd,i){
return self + i;});
self.$def(s$fe,function(self,_cmd,i){
return self - i;});
self.$def(s$bm,function(self,_cmd,i){
return self * i;});
self.$def(s$ff,function(self,_cmd,i){
return self / i;});
self.$def(s$bn,function(self,_cmd){
});
self.$def(s$fg,function(self,_cmd){
});
self.$def(s$ai,function(self,_cmd,other){
return self == other ? true : false;});
self.$def(s$fh,function(self,_cmd,other){
return self > other;});
self.$def(s$fi,function(self,_cmd,other){
return self >= other;});
self.$def(s$fj,function(self,_cmd,other){
return self < other;});
self.$def(s$fk,function(self,_cmd,other){
return self <= other;});
self.$def(s$fl,function(self,_cmd){
});
self.$def(s$fm,function(self,_cmd,other){
return self & other;});
self.$def(s$fn,function(self,_cmd,other){
return self | other;});
self.$def(s$fo,function(self,_cmd){
});
self.$def(s$bo,function(self,_cmd){
});
self.$def(s$cv,function(self,_cmd,other){
return self << other});
self.$def(s$fp,function(self,_cmd){
});
self.$def(s$ce,function(self,_cmd){
});
})(RClass.define('Number',cObject));
