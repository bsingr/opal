
VN.require('/Users/adam/Development/vienna/apps/normal_application/build/tmp/debug/app_kit/lib/vib/window_template.js');
(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,name,bundle,load_delegate){
self.$i_s('@bundle',bundle);
self.$i_s('@load_delegate',load_delegate);
return self.$i_s('@contents',rb_funcall(bundle,'resource_contents_for_file:of_type:',name,"vib"));
});
rb_define_method(self,'instantiate_vib_with_external_name_table',function(self,_,name_table){
self.$i_s('@unarchiver',rb_funcall(self.$klass.$c_g_full('KeyedUnarchiver'),'new',rb_ivar_get(self,'@contents')));
var root_objects=rb_funcall(rb_ivar_get(self,'@unarchiver'),'decode_object',ID2SYM('root_objects'));
var connections=rb_funcall(rb_ivar_get(self,'@unarchiver'),'decode_object',ID2SYM('connections'));
var classes=rb_funcall(rb_ivar_get(self,'@unarchiver'),'decode_object',ID2SYM('classes'));
return rb_funcall(self,'puts',rb_funcall(rb_ivar_get(self,'@unarchiver'),'current_context'));
});
rb_define_method(self,'load!',function(self,_){
var top_level=rb_funcall(self,'decode_object',ID2SYM('root_objects'));
self.$i_s('@version',rb_funcall(self,'decode_object',ID2SYM('version')));
rb_funcall(self,'puts',["version is ",(rb_ivar_get(self,'@version'))].join(''));
rb_funcall(self,'puts',"top level is:");
return rb_funcall(self,'puts',top_level);
});
rb_define_method(self,'current_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'last');
});
rb_define_method(self,'push_context',function(self,_,context){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'<<',context);
});
rb_define_method(self,'pop_context',function(self,_){
return rb_funcall(rb_ivar_get(self,'@context_stack'),'pop');
});
rb_define_method(self,'has_key?',function(self,_,key){
if(RTEST(rb_funcall(self,'current_context').hasOwnProperty(rb_funcall(key,'to_s')))){
return true;
}
return false;
});
rb_define_method(self,'decode_object',function(self,_,key){
var context=rb_funcall(self,'current_context');
if(RTEST(context.hasOwnProperty(rb_funcall(key,'to_s')))){
var prop=context[rb_funcall(key,'to_s')];
if(!RTEST(prop.$klass)){
rb_funcall(self,'push_context',prop);
var result=rb_funcall(self,'decode_current_object');
rb_funcall(self,'pop_context');
return result;
}
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
else{
rb_funcall(self,'puch_context',prop);
result=rb_funcall(self,'decode_current_object');
rb_funcall(self,'pop_context');
return result;
}
return '';
}
return nil;
});
rb_define_method(self,'decode_current_object',function(self,_){
var context=rb_funcall(self,'current_context');
var id=context['id'];
var class_str=context['class'];
var obj_class=rb_funcall(self.$klass.$c_g_full('Object'),'full_const_get',class_str);
var keys=context['keys'];
var obj=rb_funcall(obj_class,'alloc');
rb_funcall(self,'push_context',keys);
rb_funcall(obj,'init_with_coder',self);
rb_funcall(self,'pop_context');
obj=rb_funcall(obj,'awake_after_using_coder',self);
rb_funcall(rb_ivar_get(self,'@object_table'),'[]=',id,obj);
return obj;
});
rb_define_method(self,'decode_rect',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Rect'),'from_string',context[key]);
});
rb_define_method(self,'decode_size',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Size'),'from_string',context[key]);
});
rb_define_method(self,'decode_point',function(self,_,key){
var context=rb_funcall(self,'current_context');
return rb_funcall(self.$klass.$c_g_full('Point'),'from_string',context[key]);
});
})(rb_define_class_under(self,'Vib',cObject));
(function(self) {
rb_define_method(self,'awake_after_using_coder',function(self,_,coder){
return self;
});
rb_define_method(self,'init_with_coder',function(self,_,coder){
return self;
});
})(rb_define_class_under(self,'Object',cObject));
})(rb_define_module('Vienna'));
