
VN.$r = function(start, ending, exclusive) {
  return VN$(cRange, 'new', start, ending, exclusive);
}
var $VN_1 = RClass.define('Range',cObject);
$VN_1.$def('initialize',function(self,_cmd,start,ending,exclusive){
self.$i_s('@start',start);
return self.$i_s('@ending',ending);
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd,obj){
});
$VN_1.$def('===',function(self,_cmd,obj){
});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('each',function(self,_cmd,block){
for (var i = self.$i_g('@start'); i <= self.$i_g('@ending'); i++) {
      VN$(block, 'call', i);
    }return self;
});
$VN_1.$def('step',function(self,_cmd){
});
$VN_1.$def('begin',function(self,_cmd){
});
$VN_1.$def('end',function(self,_cmd){
});
$VN_1.$def('first',function(self,_cmd){
});
$VN_1.$def('last',function(self,_cmd){
});
$VN_1.$def('min',function(self,_cmd){
});
$VN_1.$def('max',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('inspect',function(self,_cmd){
});
$VN_1.$def('exclude_end?',function(self,_cmd){
});
$VN_1.$def('member?',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('cover?',function(self,_cmd){
});
