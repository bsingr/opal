
Array.prototype.$klass = cArray
Array.prototype.$type = VN.T_ARRAY;

Array.prototype.$ = RObject.prototype.$;

RModule.include(cArray, mEnumerable);

cArray.$define_alloc_func(function() {
  return new Array();
});

cArray.$def_s('[]', function() {
  
});

cArray.$def_s('try_convert', function() {
  
});
var $VN_1 = RClass.define('Array', cObject);
$VN_1.$def('initialize',function(){
var self=this;
for (var i = 0; i < arguments.length; i++) {
      this.push(arguments[i]);
    }});
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
if (this.length == 0) return '[]';
    var str = '[';
    for (var i = 0; i < (this.length - 1); i++) {
      str += (this[i].$('inspect', []) + ', ');
    }
    str += (this[this.length - 1].$('inspect', []) + ']');
    return str ;});
$VN_1.$def('inspect',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('to_a',function(){
var self=this;
return self;
});
$VN_1.$def('to_ary',function(){
var self=this;
return self;
});
$VN_1.$def('==',function(ary){
var self=this;
if (ary == this) return true;
    if (ary.$type != VN.T_ARRAY) {
      if (ary.$('respond_to?', ['to_a'])) {
        return false;
      }
    }
    if (this.length != ary.length) return false ;
    return true;});
$VN_1.$def('eql?',function(other){
var self=this;
});
$VN_1.$def('hash',function(){
var self=this;
});
