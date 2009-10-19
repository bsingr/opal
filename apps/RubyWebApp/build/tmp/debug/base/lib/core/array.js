
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
var $VN_1 = RClass.define('Array',cObject);
$VN_1.$def('initialize',function(self,_cmd){
for (var i = 0; i < arguments.length; i++) {
      self.push(arguments[i]);
    }});
$VN_1.$def('initialize_copy',function(self,_cmd){
});
$VN_1.$def('to_s',function(self,_cmd){
if (self.length == 0) return '[]';
    var str = '[';
    for (var i = 0; i < (self.length - 1); i++) {
      str += (self[i].$('inspect', []) + ', ');
    }
    str += (self[self.length - 1].$('inspect', []) + ']');
    return str ;});
$VN_1.$def('inspect',function(self,_cmd){
return VN$(self, 'to_s');
});
$VN_1.$def('to_a',function(self,_cmd){
return self;
});
$VN_1.$def('to_ary',function(self,_cmd){
return self;
});
$VN_1.$def('==',function(self,_cmd,ary){
if (ary == this) return true;
    if (ary.$type != VN.ARRAY) {
      if (ary.$('respond_to?', ['to_a'])) {
        return false;
      }
    }
    if (this.length != ary.length) return false ;
    return true;});
$VN_1.$def('eql?',function(self,_cmd,other){
});
$VN_1.$def('hash',function(self,_cmd){
});
$VN_1.$def('[]',function(self,_cmd,idx){
return self[idx];});
$VN_1.$def('[]=',function(self,_cmd,idx,value){
return self[idx] = value;});
$VN_1.$def('at',function(self,_cmd,index){
return self[index];});
$VN_1.$def('fetch',function(self,_cmd,index,the_default){
return self[index];});
$VN_1.$def('first',function(self,_cmd){
return self[0];});
$VN_1.$def('last',function(self,_cmd){
return self[self.length-1];});
$VN_1.$def('concat',function(self,_cmd){
});
$VN_1.$def('<<',function(self,_cmd,obj){
return self.push(obj);});
$VN_1.$def('push',function(self,_cmd,obj){
return self.push(obj);});
$VN_1.$def('pop',function(self,_cmd){
return self.pop();});
$VN_1.$def('shift',function(self,_cmd){
});
$VN_1.$def('unshift',function(self,_cmd){
});
$VN_1.$def('insert',function(self,_cmd){
});
$VN_1.$def('each',function(self,_cmd,block){
for (var i = 0; i < self.length; i++) {arguments[arguments.length -1](self[i]);
}return self;
});
$VN_1.$def('each_index',function(self,_cmd){
});
$VN_1.$def('reverse_each',function(self,_cmd){
});
$VN_1.$def('length',function(self,_cmd){
return self.length;});
$VN_1.$def('size',function(self,_cmd){
return self.length;});
$VN_1.$def('empty?',function(self,_cmd){
return (self.length == 0) ? true : false;});
$VN_1.$def('find_index',function(self,_cmd){
});
$VN_1.$def('rindex',function(self,_cmd){
});
$VN_1.$def('index',function(self,_cmd,obj){
var idx = self.indexOf(obj);
     return idx == -1 ? idx : nil;});
$VN_1.$def('join',function(self,_cmd,sep){
return self.join(sep);});
$VN_1.$def('reverse',function(self,_cmd){
});
$VN_1.$def('reverse!',function(self,_cmd){
});
$VN_1.$def('sort',function(self,_cmd){
});
$VN_1.$def('sort!',function(self,_cmd){
});
$VN_1.$def('collect',function(self,_cmd){
});
$VN_1.$def('collect!',function(self,_cmd){
});
$VN_1.$def('map',function(self,_cmd){
});
$VN_1.$def('map!',function(self,_cmd){
});
$VN_1.$def('select',function(self,_cmd){
});
$VN_1.$def('values_at',function(self,_cmd){
});
$VN_1.$def('delete',function(self,_cmd){
});
$VN_1.$def('delete_at',function(self,_cmd){
});
$VN_1.$def('delete_if',function(self,_cmd){
});
$VN_1.$def('reject',function(self,_cmd){
});
$VN_1.$def('reject!',function(self,_cmd){
});
$VN_1.$def('zip',function(self,_cmd){
});
$VN_1.$def('transpose',function(self,_cmd){
});
$VN_1.$def('replace',function(self,_cmd){
});
$VN_1.$def('clear',function(self,_cmd){
});
$VN_1.$def('fill',function(self,_cmd){
});
$VN_1.$def('include?',function(self,_cmd,obj){
return (self.indexOf(obj) == -1) ? false : true;});
$VN_1.$def('<=>',function(self,_cmd){
});
$VN_1.$def('slice',function(self,_cmd){
});
$VN_1.$def('slice!',function(self,_cmd){
});
$VN_1.$def('assoc',function(self,_cmd){
});
$VN_1.$def('rassoc',function(self,_cmd){
});
$VN_1.$def('uniq',function(self,_cmd){
});
$VN_1.$def('uniq!',function(self,_cmd){
});
$VN_1.$def('compact',function(self,_cmd){
});
$VN_1.$def('compact!',function(self,_cmd){
});
$VN_1.$def('flatten',function(self,_cmd){
});
$VN_1.$def('flatten!',function(self,_cmd){
});
$VN_1.$def('count',function(self,_cmd){
});
$VN_1.$def('shuffle',function(self,_cmd){
});
$VN_1.$def('shuffle!',function(self,_cmd){
});
$VN_1.$def('sample',function(self,_cmd){
});
$VN_1.$def('cycle',function(self,_cmd){
});
$VN_1.$def('permutation',function(self,_cmd){
});
$VN_1.$def('combination',function(self,_cmd){
});
$VN_1.$def('product',function(self,_cmd){
});
$VN_1.$def('take',function(self,_cmd){
});
$VN_1.$def('take_while',function(self,_cmd){
});
$VN_1.$def('drop',function(self,_cmd){
});
$VN_1.$def('drop_while',function(self,_cmd){
});
