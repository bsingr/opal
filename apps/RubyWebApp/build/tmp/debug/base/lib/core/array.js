
Array.prototype.$klass = cArray
Array.prototype.$type = VN.ARRAY;

RModule.include(cArray, mEnumerable);

cArray.$define_alloc_func(function() {
  return new Array();
});

cArray.$def_s('[]', function() {
  
});

cArray.$def_s('try_convert', function() {
  
});

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item, i) {
    i || (i = 0);
    var len = this.length;
    if (i < 0) i = len + i;
    for (; i < len; i++)
      if (this[i] === item) return i;
      return -1;
  };
}
(function(self) {
self.$def(s$as,function(self,_cmd){
for (var i = 0; i < arguments.length; i++) {
      self.push(arguments[i]);
    }});
self.$def(s$i,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
if (self.length == 0) return '[]';
    var str = '[';
    for (var i = 0; i < (self.length - 1); i++) {
      str += (self[i].$('inspect', []) + ', ');
    }
    str += (self[self.length - 1].$('inspect', []) + ']');
    return str ;});
self.$def(s$s,function(self,_cmd){
return VN$(self, s$r);
});
self.$def(s$fq,function(self,_cmd){
return self;
});
self.$def(s$fr,function(self,_cmd){
return self;
});
self.$def(s$ai,function(self,_cmd,ary){
if (ary == this) return true;
    if (ary.$type != VN.ARRAY) {
      if (ary.$('respond_to?', ['to_a'])) {
        return false;
      }
    }
    if (this.length != ary.length) return false ;
    return true;});
self.$def(s$e,function(self,_cmd,other){
});
self.$def(s$bj,function(self,_cmd){
});
self.$def(s$bo,function(self,_cmd,idx){
return self[idx];});
self.$def(s$bp,function(self,_cmd,idx,value){
return self[idx] = value;});
self.$def(s$fs,function(self,_cmd,index){
return self[index];});
self.$def(s$ft,function(self,_cmd,index,the_default){
return self[index];});
self.$def(s$fu,function(self,_cmd){
return self[0];});
self.$def(s$fv,function(self,_cmd){
return self[self.length-1];});
self.$def(s$cu,function(self,_cmd){
});
self.$def(s$cv,function(self,_cmd,obj){
return self.push(obj);});
self.$def(s$fw,function(self,_cmd,obj){
return self.push(obj);});
self.$def(s$fx,function(self,_cmd){
return self.pop();});
self.$def(s$fy,function(self,_cmd){
});
self.$def(s$fz,function(self,_cmd){
});
self.$def(s$bq,function(self,_cmd){
});
self.$def(s$ga,function(self,_cmd,block){
for (var i = 0; i < self.length; i++) {arguments[arguments.length -1](self[i]);
}return self;
});
self.$def(s$gb,function(self,_cmd){
});
self.$def(s$gc,function(self,_cmd){
});
self.$def(s$br,function(self,_cmd){
return self.length;});
self.$def(s$bs,function(self,_cmd){
return self.length;});
self.$def(s$bt,function(self,_cmd){
return (self.length == 0) ? true : false;});
self.$def(s$gd,function(self,_cmd){
});
self.$def(s$bz,function(self,_cmd){
});
self.$def(s$by,function(self,_cmd,obj){
var idx = self.indexOf(obj);
     return idx == -1 ? idx : nil;});
self.$def(s$ge,function(self,_cmd,sep){
return self.join(sep);});
self.$def(s$ct,function(self,_cmd){
});
self.$def(s$gf,function(self,_cmd){
});
self.$def(s$gg,function(self,_cmd){
});
self.$def(s$gh,function(self,_cmd){
});
self.$def(s$gi,function(self,_cmd){
});
self.$def(s$gj,function(self,_cmd){
});
self.$def(s$gk,function(self,_cmd){
});
self.$def(s$gl,function(self,_cmd){
});
self.$def(s$gm,function(self,_cmd){
});
self.$def(s$gn,function(self,_cmd){
});
self.$def(s$dp,function(self,_cmd){
});
self.$def(s$go,function(self,_cmd){
});
self.$def(s$gp,function(self,_cmd){
});
self.$def(s$gq,function(self,_cmd){
});
self.$def(s$gr,function(self,_cmd){
});
self.$def(s$gs,function(self,_cmd){
});
self.$def(s$gt,function(self,_cmd){
});
self.$def(s$ca,function(self,_cmd){
});
self.$def(s$cb,function(self,_cmd){
});
self.$def(s$gu,function(self,_cmd){
});
self.$def(s$al,function(self,_cmd,obj){
return (self.indexOf(obj) == -1) ? false : true;});
self.$def(s$aj,function(self,_cmd){
});
self.$def(s$ed,function(self,_cmd){
});
self.$def(s$dx,function(self,_cmd){
});
self.$def(s$gv,function(self,_cmd){
});
self.$def(s$gw,function(self,_cmd){
});
self.$def(s$gx,function(self,_cmd){
});
self.$def(s$gy,function(self,_cmd){
});
self.$def(s$gz,function(self,_cmd){
});
self.$def(s$ha,function(self,_cmd){
});
self.$def(s$hb,function(self,_cmd){
});
self.$def(s$hc,function(self,_cmd){
});
self.$def(s$dr,function(self,_cmd){
});
self.$def(s$hd,function(self,_cmd){
});
self.$def(s$he,function(self,_cmd){
});
self.$def(s$hf,function(self,_cmd){
});
self.$def(s$hg,function(self,_cmd){
});
self.$def(s$hh,function(self,_cmd){
});
self.$def(s$hi,function(self,_cmd){
});
self.$def(s$hj,function(self,_cmd){
});
self.$def(s$hk,function(self,_cmd){
});
self.$def(s$hl,function(self,_cmd){
});
self.$def(s$hm,function(self,_cmd){
});
self.$def(s$hn,function(self,_cmd){
});
})(RClass.define('Array',cObject));
