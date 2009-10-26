Number.prototype.$klass = cNumber ;
Number.prototype.$type = VN.NUMBER ;
Number.prototype.$ = RObject.prototype.$;

// VN.include_module(VN.cNumber, VN.mComparable);
RModule.include(cNumber, mComparable);var $VN_1 = RClass.define('Number',cObject);
$VN_1.$def('coerce',function(self,_cmd){
});
$VN_1.$def('+@',function(self,_cmd){
});
$VN_1.$def('-@',function(self,_cmd){
});
$VN_1.$def('<=>',function(self,_cmd){
});
$VN_1.$def('eql?',function(self,_cmd){
});
$VN_1.$def('quo',function(self,_cmd){
});
$VN_1.$def('fdiv',function(self,_cmd){
});
$VN_1.$def('div',function(self,_cmd){
});
$VN_1.$def('divmod',function(self,_cmd){
});
$VN_1.$def('modulo',function(self,_cmd){
});
$VN_1.$def('remainder',function(self,_cmd){
});
$VN_1.$def('abs',function(self,_cmd){
});
$VN_1.$def('magnitude',function(self,_cmd){
});
$VN_1.$def('to_int',function(self,_cmd){
});
$VN_1.$def('real?',function(self,_cmd){
});
$VN_1.$def('integer?',function(self,_cmd){
});
$VN_1.$def('zero?',function(self,_cmd){
});
$VN_1.$def('nonzero?',function(self,_cmd){
});
$VN_1.$def('floor',function(self,_cmd){
});
$VN_1.$def('ceil',function(self,_cmd){
});
$VN_1.$def('round',function(self,_cmd){
});
$VN_1.$def('truncate',function(self,_cmd){
});
$VN_1.$def('step',function(self,_cmd){
});
$VN_1.$def('odd?',function(self,_cmd){
});
$VN_1.$def('even?',function(self,_cmd){
});
$VN_1.$def('upto',function(self,_cmd){
});
$VN_1.$def('downto',function(self,_cmd){
});
$VN_1.$def('times',function(self,_cmd){
});
$VN_1.$def('succ',function(self,_cmd){
});
$VN_1.$def('next',function(self,_cmd){
});
$VN_1.$def('pred',function(self,_cmd){
});
$VN_1.$def('chr',function(self,_cmd){
});
$VN_1.$def('ord',function(self,_cmd){
});
$VN_1.$def('to_i',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
});
$VN_1.$def('+',function(self,_cmd,i){
return self + i;});
$VN_1.$def('-',function(self,_cmd,i){
return self - i;});
$VN_1.$def('*',function(self,_cmd,i){
return self * i;});
$VN_1.$def('/',function(self,_cmd,i){
return self / i;});
$VN_1.$def('%',function(self,_cmd){
});
$VN_1.$def('**',function(self,_cmd){
});
$VN_1.$def('==',function(self,_cmd,other){
return self == other ? true : false;});
$VN_1.$def('>',function(self,_cmd,other){
return self > other;});
$VN_1.$def('>=',function(self,_cmd,other){
return self >= other;});
$VN_1.$def('<',function(self,_cmd,other){
return self < other;});
$VN_1.$def('<=',function(self,_cmd,other){
return self <= other;});
$VN_1.$def('~',function(self,_cmd){
});
$VN_1.$def('&',function(self,_cmd,other){
return self & other;});
$VN_1.$def('|',function(self,_cmd,other){
return self | other;});
$VN_1.$def('^',function(self,_cmd){
});
$VN_1.$def('[]',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd,other){
return self << other});
$VN_1.$def('>>',function(self,_cmd){
});
$VN_1.$def('to_f',function(self,_cmd){
});
