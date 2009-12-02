(function(self) {
rb_define_singleton_method(self,'new:',function(self,_cmd,obj,$b) {
var o;
o=rb_funcall(self,'alloc');
rb_funcall(o,'initialize:',obj);
return o;
});
rb_define_method(self, 'initialize:',function(self,_cmd,obj,$b) {
return rb_ivar_set(self,'obj',obj);
});
rb_define_method(self, 'has_key?',function(self,_cmd,key,$b) {
return rb_ivar_get(self,'obj').hasOwnProperty(key);});
rb_define_method(self, '[]',function(self,_cmd,key,$b) {
});
rb_define_method(self, 'set[]:',function(self,_cmd,key,value,$b) {
});
rb_define_method(self, 'method_missing:',function(self,_cmd,id,$b) {
return rb_ivar_get(self,'obj')[id];});
rb_define_method(self, 'to_hash',function(self,_cmd,$b) {
return rb_hash_new();
});
})(rb_define_class('JSONObject',rb_const_get(rb_cObject, 'BasicObject')));
(function(self) {
rb_define_method(self, 'each_json',function(self,_cmd,$b) {

    var i, k;
    for (i = 0; i < self.length; i++) {
      k = self[i];
      rb_yield(arguments, rb_funcall(rb_const_get_full(self.isa,'JSONObject'),'new:',rb_funcall(self,'k')));
    }
    return self;
});
})(rb_define_class('Array',rb_cObject));
