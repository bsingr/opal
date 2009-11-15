(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,obj){
self.$i_s('@count',0);
return self.$i_s('@ranges',[]);
});
self.$def_s('index_set',function(self,_){
return rb_funcall(self,'new');
});
self.$def_s('index_set_with_index',function(self,_,value){
var obj=rb_funcall(self,'new');
rb_funcall(obj,'add_index',value);
return obj;
});
self.$def_s('index_set_with_indexes_in_range',function(self,_,range){
var obj=rb_funcall(self,'new');
rb_funcall(obj,'add_indexes_in_range',range);
return obj;
});
rb_define_method(self,'equal_to_index_set?',function(self,_,index_set){
return false;
});
rb_define_method(self,'count',function(self,_){
return rb_ivar_get(self,'@count');
});
rb_define_method(self,'ranges',function(self,_){
return rb_ivar_get(self,'@ranges');
});
rb_define_method(self,'first_index',function(self,_){
if(RTEST((rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'==',0)))){
return rb_funcall((1),'-@');
}
var first_index=rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',0),'first');
rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'times',function(range){
if(RTEST(rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'first'),'<',first_index))){
first_index=rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'first');
}
});
return first_index;
});
rb_define_method(self,'last_index',function(self,_){
if(RTEST((rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'==',0)))){
return rb_funcall((1),'-@');
}
var last_index=rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',0),'last'),'-',1);
rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'times',function(range){
if(RTEST(rb_funcall((rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'last'),'-',1)),'>',last_index))){
last_index=rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'last'),'-',1);
}
});
return last_index;
});
rb_define_method(self,'member?',function(self,_,index){
return rb_funcall(self,'include?',index);
});
rb_define_method(self,'include?',function(self,_,index){
var result=false;
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'==',0))){
return result;
}
rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'length'),'times',function(range){
if(RTEST(ANDTEST((rb_funcall(index,'>=',rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'first'))),(rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@ranges'),'[]',range),'last'),'>',index))))){
result=true;
}
});
return result;
});
rb_define_method(self,'add_index',function(self,_,index){
return rb_funcall(self,'add_indexes_in_range',VN.$r(index,rb_funcall(index,'+',1),false));
});
rb_define_method(self,'add_indexes_in_range',function(self,_,range){
return rb_funcall(rb_ivar_get(self,'@ranges'),'<<',range);
});
rb_define_method(self,'add_indexes',function(self,_,indexes){
});
})(rb_define_class_under(self,'IndexSet',cObject));
})(rb_define_module('Vienna'));
