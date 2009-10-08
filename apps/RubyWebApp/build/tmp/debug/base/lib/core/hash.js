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
  var hash = cHash.$call('new', []) ;
  for (var i = 0; i < arguments.length; i++) {
    hash.$call('[]=', [arguments[i][0], arguments[i][1]]);
  }
  return hash;
};

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
}); var $VN_1 = RClass.define('Hash', cObject);
$VN_1.$def_s('[]',function(){
var self=this;
});
$VN_1.$def_s('try_convert',function(){
var self=this;
});
$VN_1.$def('initialize',function(){
var self=this;
if (arguments.length > 0) {
      this.$ifnone = arguments[0] ;
    } });
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('rehash',function(){
var self=this;
});
$VN_1.$def('to_hash',function(){
var self=this;
return self;
});
$VN_1.$def('to_a',function(){
var self=this;
var ary = [];
    for (var i = 0; i < this.$keys.length; i++) {
      ary.push([this.$keys[i], this.$values[this.$keys[i]]]);
    }
    return ary; });
$VN_1.$def('to_s',function(){
var self=this;
if (this.$keys.length == 0) return '{...}';
  
    var str = '{' + this.$keys[0].$call('inspect', []) + '=>' + this.$values[this.$keys[0]].$call('inspect', []);
    for (var i = 1; i < this.$keys.length; i++) {
      str += (', ' + this.$keys[i].$call('inspect', []) + '=>' + this.$values[this.$keys[i]].$call('inspect', []))
    }
    str += '}';
    return str;});
$VN_1.$def('inspect',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('==',function(obj){
var self=this;
});
$VN_1.$def('[]',function(key){
var self=this;
if (!this.$values.hasOwnProperty(key)) {
      return this.$call('default', [key]);
    }
    return this.$values[key] ;});
$VN_1.$def('hash',function(){
var self=this;
});
$VN_1.$def('eql?',function(){
var self=this;
});
$VN_1.$def('fetch',function(){
var self=this;
});
$VN_1.$def('[]=',function(key,val){
var self=this;
return self.$('store',[key,val]);
});
$VN_1.$def('store',function(key,val){
var self=this;
if (!this.$values.hasOwnProperty(key)) {
      this.$keys.push(key);
    }
  
    this.$values[key] = val ;
    return val ;});
$VN_1.$def('default',function(){
var self=this;
return self.$ifnone});
$VN_1.$def('default=',function(def_obj){
var self=this;
this.$ifnone = ifnone;
    return ifnone;});
$VN_1.$def('default_proc',function(){
var self=this;
});
$VN_1.$def('default_proc=',function(proc){
var self=this;
});
$VN_1.$def('key',function(){
var self=this;
});
$VN_1.$def('index',function(){
var self=this;
});
$VN_1.$def('size',function(){
var self=this;
});
$VN_1.$def('length',function(){
var self=this;
return self.$('size', []);
});
$VN_1.$def('empty?',function(){
var self=this;
});
$VN_1.$def('each_value',function(){
var self=this;
});
$VN_1.$def('each_key',function(){
var self=this;
});
$VN_1.$def('each_pair',function(){
var self=this;
});
$VN_1.$def('each',function(){
var self=this;
});
$VN_1.$def('keys',function(){
var self=this;
});
$VN_1.$def('values',function(){
var self=this;
});
$VN_1.$def('values_at',function(){
var self=this;
});
$VN_1.$def('shift',function(){
var self=this;
});
$VN_1.$def('delete',function(){
var self=this;
});
$VN_1.$def('delete_if',function(){
var self=this;
});
$VN_1.$def('select',function(){
var self=this;
});
$VN_1.$def('reject',function(){
var self=this;
});
$VN_1.$def('reject!',function(){
var self=this;
});
$VN_1.$def('clear',function(){
var self=this;
});
$VN_1.$def('invert',function(){
var self=this;
});
$VN_1.$def('update',function(){
var self=this;
});
$VN_1.$def('replace',function(){
var self=this;
});
$VN_1.$def('merge!',function(){
var self=this;
});
$VN_1.$def('merge',function(){
var self=this;
});
$VN_1.$def('assoc',function(){
var self=this;
});
$VN_1.$def('rassoc',function(){
var self=this;
});
$VN_1.$def('flatten',function(){
var self=this;
});
$VN_1.$def('include?',function(obj){
var self=this;
});
$VN_1.$def('member?',function(obj){
var self=this;
return self.$('include?',[obj]);
});
$VN_1.$def('has_key?',function(key){
var self=this;
});
$VN_1.$def('has_value?',function(val){
var self=this;
});
$VN_1.$def('key?',function(key){
var self=this;
return self.$('has_key?',[key]);
});
$VN_1.$def('value?',function(val){
var self=this;
return self.$('has_value?',[val]);
});
$VN_1.$def('compare_by_identity',function(){
var self=this;
});
$VN_1.$def('compare_by_identity?',function(){
var self=this;
});
