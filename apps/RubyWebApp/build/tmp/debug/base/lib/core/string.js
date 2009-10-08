String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

String.prototype.$ = RObject.prototype.$;

cString.$define_alloc_func(function() {
  return new String();
}); var $VN_1 = RClass.define('String', cObject);
$VN_1.$def('try_convert',function(){
var self=this;
});
$VN_1.$def('initialize',function(){
var self=this;
});
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('<=>',function(obj){
var self=this;
});
$VN_1.$def('==',function(obj){
var self=this;
});
$VN_1.$def('eql?',function(obj){
var self=this;
});
$VN_1.$def('hash',function(obj){
var self=this;
});
$VN_1.$def('casecmp',function(obj){
var self=this;
});
$VN_1.$def('+',function(obj){
var self=this;
return self.$('puts',['wow']);
});
$VN_1.$def('(',function(obj){
var self=this;
});
$VN_1.$def('%',function(obj){
var self=this;
});
$VN_1.$def('[]',function(key){
var self=this;
});
$VN_1.$def('[]=',function(key,val){
var self=this;
});
$VN_1.$def('insert',function(){
var self=this;
});
$VN_1.$def('length',function(){
var self=this;
return this.length;});
$VN_1.$def('size',function(){
var self=this;
return this.length});
$VN_1.$def('empty?',function(){
var self=this;
});
$VN_1.$def('=~',function(match){
var self=this;
});
$VN_1.$def('match',function(match){
var self=this;
});
$VN_1.$def('succ',function(){
var self=this;
});
$VN_1.$def('next',function(){
var self=this;
});
$VN_1.$def('upto',function(){
var self=this;
});
$VN_1.$def('index',function(){
var self=this;
});
$VN_1.$def('rindex',function(){
var self=this;
});
$VN_1.$def('replace',function(){
var self=this;
});
$VN_1.$def('clear',function(){
var self=this;
});
$VN_1.$def('chr',function(){
var self=this;
});
$VN_1.$def('to_i',function(){
var self=this;
});
$VN_1.$def('to_f',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
return new String(this);});
$VN_1.$def('to_str',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('inspect',function(){
var self=this;
return new String('"' + this + '"');});
$VN_1.$def('dump',function(){
var self=this;
});
$VN_1.$def('upcase',function(){
var self=this;
});
$VN_1.$def('downcase',function(){
var self=this;
});
$VN_1.$def('capitalize',function(){
var self=this;
});
$VN_1.$def('swapcase',function(){
var self=this;
});
$VN_1.$def('hex',function(){
var self=this;
});
$VN_1.$def('oct',function(){
var self=this;
});
$VN_1.$def('split',function(){
var self=this;
});
$VN_1.$def('lines',function(){
var self=this;
});
$VN_1.$def('bytes',function(){
var self=this;
});
$VN_1.$def('chars',function(){
var self=this;
});
$VN_1.$def('codepoints',function(){
var self=this;
});
$VN_1.$def('reverse',function(){
var self=this;
});
$VN_1.$def('concat',function(){
var self=this;
});
$VN_1.$def('<<',function(){
var self=this;
});
$VN_1.$def('crypt',function(){
var self=this;
});
$VN_1.$def('intern',function(){
var self=this;
});
$VN_1.$def('to_sym',function(){
var self=this;
return new String(this);});
$VN_1.$def('ord',function(){
var self=this;
});
$VN_1.$def('include?',function(){
var self=this;
});
$VN_1.$def('start_with?',function(){
var self=this;
});
$VN_1.$def('end_with?',function(){
var self=this;
});
$VN_1.$def('scan',function(){
var self=this;
});
$VN_1.$def('ljust',function(){
var self=this;
});
$VN_1.$def('rjust',function(){
var self=this;
});
$VN_1.$def('center',function(){
var self=this;
});
$VN_1.$def('sub',function(){
var self=this;
});
$VN_1.$def('gsub',function(){
var self=this;
});
$VN_1.$def('chop',function(){
var self=this;
});
$VN_1.$def('chomp',function(){
var self=this;
});
$VN_1.$def('strip',function(){
var self=this;
});
$VN_1.$def('lstrip',function(){
var self=this;
});
$VN_1.$def('rstrip',function(){
var self=this;
});
$VN_1.$def('tr',function(){
var self=this;
});
$VN_1.$def('tr_s',function(){
var self=this;
});
$VN_1.$def('delete',function(){
var self=this;
});
$VN_1.$def('squeeze',function(){
var self=this;
});
$VN_1.$def('count',function(){
var self=this;
});
$VN_1.$def('each_line',function(){
var self=this;
});
$VN_1.$def('each_byte',function(){
var self=this;
});
$VN_1.$def('each_char',function(){
var self=this;
});
$VN_1.$def('each_codepoint',function(){
var self=this;
});
$VN_1.$def('sum',function(){
var self=this;
});
$VN_1.$def('slice!',function(){
var self=this;
});
$VN_1.$def('partition',function(){
var self=this;
});
$VN_1.$def('rpartition',function(){
var self=this;
});
