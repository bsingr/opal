(function(self) {
(function(self) {
self.$def_s('unarchive_object_with_data',function(self,_,data){
return rb_funcall(self,'new',data);
});
self.$def_s('unarchive_object_with_file',function(self,_,path){
});
rb_define_method(self,'initialize',function(self,_,data){
self.$i_s('@plist',rb_funcall(self.$klass.$c_g_full('PropertyListSerialization'),'property_list_from_data:format:error_description:',data,nil,nil));
self.$i_s('@context_stack',[rb_ivar_get(self,'@plist')]);
return self.$i_s('@uid_table',VN.$h());
});
rb_define_method(self,'delegate=',function(self,_,a_delegate){
return self.$i_s('@delegate',a_delegate);
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'push_context',function(self,_,context){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'<<',context);
});
rb_define_method(self,'pop_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'pop');
});
rb_define_method(self,'current_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'last');
});
rb_define_method(self,'finish_decoding',function(self,_){
});
self.$def('set_class:for_class_name:',function(self,_,klass,coded_name){
});
rb_define_method(self,'class_for_class_name',function(self,_,coded_name){
});
rb_define_method(self,'has_key?',function(self,_,key){
return true;
});
rb_define_method(self,'decode_current_object',function(self,_){
var ctx=rb_funcall(self,'current_context');
var id=rb_funcall(ctx,'[]','_id');
var class_str=rb_funcall(ctx,'[]','_class');
var obj_class=rb_funcall(self.$klass.$c_g_full('Object'),'full_const_get',class_str);
var obj=rb_funcall(obj_class,'alloc');
rb_funcall(obj,'init_with_coder',self);
obj=rb_funcall(obj,'awake_after_using_coder',self);
rb_funcall(rb_ivar_get(self,'@uid_table'),'[]=',id,obj);
return obj;
});
rb_define_method(self,'decode_object',function(self,_,key){
var ctx=rb_funcall(self,'current_context');
key=rb_funcall(key,'to_s');
var result=nil;
if(RTEST(rb_funcall(ctx,'has_key?',key))){
var prop=rb_funcall(ctx,'[]',key);
if(RTEST(rb_funcall(prop,'is_a?',self.$klass.$c_g_full('String')))){
return prop;
}
else if(RTEST(rb_funcall(prop,'is_a?',self.$klass.$c_g_full('Array')))){
result=[];
rb_funcall(prop,'each',function(array_item){
rb_funcall(self,'push_context',array_item);
rb_funcall(result,'<<',rb_funcall(self,'decode_current_object'));
return rb_funcall(self,'pop_context');
});
return result;
}
else if(RTEST(rb_funcall(prop,'is_a?',self.$klass.$c_g_full('Number')))){
return rb_funcall(rb_ivar_get(self,'@uid_table'),'[]',prop);
}
else{
rb_funcall(self,'push_context',prop);
result=rb_funcall(self,'decode_current_object');
rb_funcall(self,'pop_context');
return result;
}
}
else{
return nil;
}
return rb_funcall(self,'puts',["keyed_unarchiver: got here.......? ",(rb_funcall(key,'to_s'))].join(''));
});
rb_define_method(self,'decode_bool',function(self,_,key){
return rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s'));
});
rb_define_method(self,'decode_int',function(self,_,key){
return rb_funcall(rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s')),'to_i');
});
rb_define_method(self,'decode_float',function(self,_,key){
return rb_funcall(rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s')),'to_f');
});
rb_define_method(self,'decode_double',function(self,_,key){
return rb_funcall(rb_funcall(rb_funcall(self,'current_context'),'[]',rb_funcall(key,'to_s')),'to_f');
});
rb_define_method(self,'decode_rect',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Rect'),'from_string',rb_funcall(context,'[]',rb_funcall(key,'to_s')));
});
rb_define_method(self,'decode_point',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Point'),'from_string',rb_funcall(context,'[]',rb_funcall(key,'to_s')));
});
rb_define_method(self,'decode_size',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Size'),'from_string',rb_funcall(context,'[]',rb_funcall(key,'to_s')));
});
})(rb_define_class_under(self,'KeyedUnarchiver',cObject));
})(rb_define_module('Vienna'));
