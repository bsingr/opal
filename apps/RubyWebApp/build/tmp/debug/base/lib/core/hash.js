var RHash = function() {
  this.$klass = cHash ;
  this.$type = VN.HASH ;
  this.$keys = [] ;
  this.$values = { } ;
  this.$ifnone = nil ;
  return this;
};

RHash.prototype.$ivar_set = RObject.prototype.$ivar_set;
RHash.prototype.$ivar_get = RObject.prototype.$ivar_get;
RHash.prototype.$call = RObject.prototype.$call;
RHash.prototype.$define_singleton_method = RObject.prototype.$define_singleton_method;
RHash.prototype.$make_metaclass = RObject.prototype.$make_metaclass;

VN.$h = function() {
  var hash = new RHash();
  for (var i = 0; i < arguments.length; i++) {
    VN$(hash, '[]=', arguments[i], arguments[i + 1]);
    i++;
  }
  return hash;
};

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
}); (function(self) {
self.$def_s(s$bo,function(self,_cmd){
});
self.$def_s(s$bi,function(self,_cmd){
});
self.$def(s$as,function(self,_cmd){
if (arguments.length > 0) {
      self.$ifnone = arguments[0] ;
    } });
self.$def(s$i,function(self,_cmd){
});
self.$def(s$ho,function(self,_cmd){
});
self.$def(s$hp,function(self,_cmd){
return self;
});
self.$def(s$fq,function(self,_cmd){
var ary = [];
    for (var i = 0; i < self.$keys.length; i++) {
      ary.push([self.$keys[i], self.$values[self.$keys[i]]]);
    }
    return ary; });
self.$def(s$r,function(self,_cmd){
if (self.$keys.length == 0) return '{...}';
  
    var str = '{' + self.$keys[0].$call('inspect', []) + '=>' + self.$values[self.$keys[0]].$call('inspect', []);
    for (var i = 1; i < self.$keys.length; i++) {
      str += (', ' + self.$keys[i].$call('inspect', []) + '=>' + self.$values[self.$keys[i]].$call('inspect', []))
    }
    str += '}';
    return str;});
self.$def(s$s,function(self,_cmd){
return VN$(self, s$r);
});
self.$def(s$ai,function(self,_cmd,obj){
});
self.$def(s$bo,function(self,_cmd,key){
if (!self.$values.hasOwnProperty(key)) {
      return VN$(self, 'default', [key]);
    }
    return self.$values[key] ;});
self.$def(s$bj,function(self,_cmd){
});
self.$def(s$e,function(self,_cmd){
});
self.$def(s$ft,function(self,_cmd){
});
self.$def(s$bp,function(self,_cmd,key,val){
return VN$(self,s$hq,key,val);
});
self.$def(s$hq,function(self,_cmd,key,val){
if (self.$values[key] === undefined) {
      self.$keys.push(key);
    }
  
    self.$values[key] = val ;
    return val ;});
self.$def(s$hr,function(self,_cmd){
return self.$ifnone});
self.$def(s$hs,function(self,_cmd,def_obj){
self.$ifnone = ifnone;
    return ifnone;});
self.$def(s$ht,function(self,_cmd){
});
self.$def(s$hu,function(self,_cmd,proc){
});
self.$def(s$hv,function(self,_cmd){
});
self.$def(s$by,function(self,_cmd){
});
self.$def(s$bs,function(self,_cmd){
});
self.$def(s$br,function(self,_cmd){
return VN$(self, s$bs);
});
self.$def(s$bt,function(self,_cmd){
});
self.$def(s$hw,function(self,_cmd){
});
self.$def(s$hx,function(self,_cmd){
});
self.$def(s$hy,function(self,_cmd){
});
self.$def(s$ga,function(self,_cmd,block){
for (var i = 0; i < self.$keys.length; i++) {arguments[arguments.length -1](self.$keys[i],self.$values[self.$keys[i]]);
}return self;
});
self.$def(s$hz,function(self,_cmd){
});
self.$def(s$ia,function(self,_cmd){
});
self.$def(s$gn,function(self,_cmd){
});
self.$def(s$fy,function(self,_cmd){
});
self.$def(s$dp,function(self,_cmd){
});
self.$def(s$gp,function(self,_cmd){
});
self.$def(s$gm,function(self,_cmd){
});
self.$def(s$gq,function(self,_cmd){
});
self.$def(s$gr,function(self,_cmd){
});
self.$def(s$cb,function(self,_cmd){
});
self.$def(s$ib,function(self,_cmd){
});
self.$def(s$ic,function(self,_cmd){
});
self.$def(s$ca,function(self,_cmd){
});
self.$def(s$id,function(self,_cmd){
});
self.$def(s$ie,function(self,_cmd){
});
self.$def(s$gv,function(self,_cmd){
});
self.$def(s$gw,function(self,_cmd){
});
self.$def(s$hb,function(self,_cmd){
});
self.$def(s$al,function(self,_cmd,obj){
});
self.$def(s$if,function(self,_cmd,obj){
return VN$(self,s$al,obj);
});
self.$def(s$ig,function(self,_cmd,key){
if (!self.$values.hasOwnProperty(key)) {
      return false;
    }
    return true ;});
self.$def(s$ih,function(self,_cmd,val){
});
self.$def(s$ii,function(self,_cmd,key){
return VN$(self,s$ig,key);
});
self.$def(s$ij,function(self,_cmd,val){
return VN$(self,s$ih,val);
});
self.$def(s$ik,function(self,_cmd){
});
self.$def(s$il,function(self,_cmd){
});
})(RClass.define('Hash',cObject));
