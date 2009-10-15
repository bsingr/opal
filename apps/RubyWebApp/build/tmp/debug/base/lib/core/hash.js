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
}); var $VN_1 = RClass.define('Hash',cObject);
$VN_1.$def_s('[]',function(self,_cmd){
});
$VN_1.$def_s('try_convert',function(self,_cmd){
});
$VN_1.$def('initialize',function(self,_cmd){
if (arguments.length > 0) {
      self.$ifnone = arguments[0] ;
    } });
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('rehash',function(self,_cmd){
});
$VN_1.$def('to_hash',function(self,_cmd){
return self;
});
$VN_1.$def('to_a',function(self,_cmd){
var ary = [];
    for (var i = 0; i < self.$keys.length; i++) {
      ary.push([self.$keys[i], self.$values[self.$keys[i]]]);
    }
    return ary; });
$VN_1.$def('to_s',function(self,_cmd){
if (self.$keys.length == 0) return '{...}';
  
    var str = '{' + self.$keys[0].$call('inspect', []) + '=>' + self.$values[self.$keys[0]].$call('inspect', []);
    for (var i = 1; i < self.$keys.length; i++) {
      str += (', ' + self.$keys[i].$call('inspect', []) + '=>' + self.$values[self.$keys[i]].$call('inspect', []))
    }
    str += '}';
    return str;});
$VN_1.$def('inspect',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('==',function(self,_cmd,obj){
});
$VN_1.$def('[]',function(self,_cmd,key){
if (!self.$values.hasOwnProperty(key)) {
      return VN$(self, 'default', [key]);
    }
    return self.$values[key] ;});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('eql?',function(self,_cmd){
});
$VN_1.$def('fetch',function(self,_cmd){
});
$VN_1.$def('[]=',function(self,_cmd,key,val){
return VN$(self,'store',key,val);
});
$VN_1.$def('store',function(self,_cmd,key,val){
if (self.$values[key] === undefined) {
      self.$keys.push(key);
    }
  
    self.$values[key] = val ;
    return val ;});
$VN_1.$def('default',function(self,_cmd){
return self.$ifnone});
$VN_1.$def('default=',function(self,_cmd,def_obj){
VN$(self, 'will_change_value_for_key', 'default');
self.$ifnone = ifnone;
    return ifnone;VN$(self, 'did_change_value_for_key', 'default');
});
$VN_1.$def('default_proc',function(self,_cmd){
});
$VN_1.$def('default_proc=',function(self,_cmd,proc){
VN$(self, 'will_change_value_for_key', 'default_proc');
VN$(self, 'did_change_value_for_key', 'default_proc');
});
$VN_1.$def('key',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd){
});
$VN_1.$def('size',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return VN$(self, 'size');
});
$VN_1.$def('empty?',function(self,_cmd){
});
$VN_1.$def('each_value',function(self,_cmd){
});
$VN_1.$def('each_key',function(self,_cmd){
});
$VN_1.$def('each_pair',function(self,_cmd){
});
$VN_1.$def('each',function(self,_cmd){
});
$VN_1.$def('keys',function(self,_cmd){
});
$VN_1.$def('values',function(self,_cmd){
});
$VN_1.$def('values_at',function(self,_cmd){
});
$VN_1.$def('shift',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('delete_if',function(self,_cmd){
});
$VN_1.$def('select',function(self,_cmd){
});
$VN_1.$def('reject',function(self,_cmd){
});
$VN_1.$def('reject!',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('invert',function(self,_cmd){
});
$VN_1.$def('update',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('merge!',function(self,_cmd){
});
$VN_1.$def('merge',function(self,_cmd){
});
$VN_1.$def('assoc',function(self,_cmd){
});
$VN_1.$def('rassoc',function(self,_cmd){
});
$VN_1.$def('flatten',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd,obj){
});
$VN_1.$def('member?',function(self,_cmd,obj){
return VN$(self,'include?',obj);
});
$VN_1.$def('has_key?',function(self,_cmd,key){
});
$VN_1.$def('has_value?',function(self,_cmd,val){
});
$VN_1.$def('key?',function(self,_cmd,key){
return VN$(self,'has_key?',key);
});
$VN_1.$def('value?',function(self,_cmd,val){
return VN$(self,'has_value?',val);
});
$VN_1.$def('compare_by_identity',function(self,_cmd){
});
$VN_1.$def('compare_by_identity?',function(self,_cmd){
});
