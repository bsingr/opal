String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

cString.$define_alloc_func(function() {
  return new String();
}); var $VN_1 = RClass.define('String',cObject);
$VN_1.$def('try_convert',function(self,_cmd){
});
$VN_1.$def('initialize',function(self,_cmd){
});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('<=>',function(self,_cmd,obj){
});
$VN_1.$def('==',function(self,_cmd,obj){
return (self == obj) ? true : false;});
$VN_1.$def('eql?',function(self,_cmd,obj){
});
$VN_1.$def('hash',function(self,_cmd,obj){
});
$VN_1.$def('casecmp',function(self,_cmd,obj){
});
$VN_1.$def('+',function(self,_cmd,obj){
return VN$(self,'puts','wow');
});
$VN_1.$def('(',function(self,_cmd,obj){
});
$VN_1.$def('%',function(self,_cmd,obj){
});
$VN_1.$def('[]',function(self,_cmd,key){
});
$VN_1.$def('[]=',function(self,_cmd,key,val){
});
$VN_1.$def('insert',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return self.length;});
$VN_1.$def('size',function(self,_cmd){
return self.length});
$VN_1.$def('empty?',function(self,_cmd){
});
$VN_1.$def('=~',function(self,_cmd,match){
});
$VN_1.$def('match',function(self,_cmd,match){
});
$VN_1.$def('succ',function(self,_cmd){
});
$VN_1.$def('next',function(self,_cmd){
});
$VN_1.$def('upto',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd){
});
$VN_1.$def('rindex',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('chr',function(self,_cmd){
});
$VN_1.$def('to_i',function(self,_cmd){
});
$VN_1.$def('to_f',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
return new String(self);});
$VN_1.$def('to_str',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('inspect',function(self,_cmd){
return new String('"' + self + '"');});
$VN_1.$def('dump',function(self,_cmd){
});
$VN_1.$def('upcase',function(self,_cmd){
});
$VN_1.$def('downcase',function(self,_cmd){
});
$VN_1.$def('capitalize',function(self,_cmd){
});
$VN_1.$def('swapcase',function(self,_cmd){
});
$VN_1.$def('camelize',function(self,_cmd){
var parts = self.split('_');
    var length = parts.length;

    if (length == 1) return parts[0];

    var camelized = self.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;});
$VN_1.$def('hex',function(self,_cmd){
});
$VN_1.$def('oct',function(self,_cmd){
});
$VN_1.$def('split',function(self,_cmd){
});
$VN_1.$def('lines',function(self,_cmd){
});
$VN_1.$def('bytes',function(self,_cmd){
});
$VN_1.$def('chars',function(self,_cmd){
});
$VN_1.$def('codepoints',function(self,_cmd){
});
$VN_1.$def('reverse',function(self,_cmd){
});
$VN_1.$def('concat',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd){
});
$VN_1.$def('crypt',function(self,_cmd){
});
$VN_1.$def('intern',function(self,_cmd){
});
$VN_1.$def('to_sym',function(self,_cmd){
return new String(self);});
$VN_1.$def('ord',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd){
});
$VN_1.$def('start_with?',function(self,_cmd){
});
$VN_1.$def('end_with?',function(self,_cmd){
});
$VN_1.$def('scan',function(self,_cmd){
});
$VN_1.$def('ljust',function(self,_cmd){
});
$VN_1.$def('rjust',function(self,_cmd){
});
$VN_1.$def('center',function(self,_cmd){
});
$VN_1.$def('sub',function(self,_cmd){
});
$VN_1.$def('gsub',function(self,_cmd){
});
$VN_1.$def('chop',function(self,_cmd){
});
$VN_1.$def('chomp',function(self,_cmd){
});
$VN_1.$def('strip',function(self,_cmd){
});
$VN_1.$def('lstrip',function(self,_cmd){
});
$VN_1.$def('rstrip',function(self,_cmd){
});
$VN_1.$def('tr',function(self,_cmd){
});
$VN_1.$def('tr_s',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('squeeze',function(self,_cmd){
});
$VN_1.$def('count',function(self,_cmd){
});
$VN_1.$def('each_line',function(self,_cmd){
});
$VN_1.$def('each_byte',function(self,_cmd){
});
$VN_1.$def('each_char',function(self,_cmd){
});
$VN_1.$def('each_codepoint',function(self,_cmd){
});
$VN_1.$def('sum',function(self,_cmd){
});
$VN_1.$def('slice!',function(self,_cmd){
});
$VN_1.$def('partition',function(self,_cmd){
});
$VN_1.$def('rpartition',function(self,_cmd){
});
