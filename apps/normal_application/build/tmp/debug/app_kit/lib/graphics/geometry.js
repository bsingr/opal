(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,x,y,w,h){
self.$i_s('@origin',rb_funcall(self.$klass.$c_g_full('Point'),'new',x,y));
return self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',w,h));
});
self.$def_s('from_string',function(self,_,string){
var point=rb_funcall(self.$c_g_full('Point'),'from_string',string.substr(1, string.indexOf("},") - 1));
var size=rb_funcall(self.$c_g_full('Size'),'from_string',string.substr(string.indexOf("},") + 3, string.length - 3));
return rb_funcall(self,'new',rb_funcall(point,'x'),rb_funcall(point,'y'),rb_funcall(size,'width'),rb_funcall(size,'height'));
});
rb_define_method(self,'to_rect',function(self,_){
return self;
});
rb_define_method(self,'copy',function(self,_){
return rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(self,'x'),rb_funcall(self,'y'),rb_funcall(self,'width'),rb_funcall(self,'height'));
});
rb_define_method(self,'size',function(self,_){
return rb_ivar_get(self,'@size');
});
rb_define_method(self,'size=',function(self,_,size){
return self.$i_s('@size',size);
});
rb_define_method(self,'origin',function(self,_){
return rb_ivar_get(self,'@origin');
});
rb_define_method(self,'origin=',function(self,_,point){
return self.$i_s('@origin',point);
});
rb_define_method(self,'x',function(self,_){
return rb_funcall(rb_ivar_get(self,'@origin'),'x');
});
rb_define_method(self,'y',function(self,_){
return rb_funcall(rb_ivar_get(self,'@origin'),'y');
});
rb_define_method(self,'width',function(self,_){
return rb_funcall(rb_ivar_get(self,'@size'),'width');
});
rb_define_method(self,'height',function(self,_){
return rb_funcall(rb_ivar_get(self,'@size'),'height');
});
rb_define_method(self,'x=',function(self,_,x){
return rb_funcall(rb_ivar_get(self,'@origin'),'x=',x);
});
rb_define_method(self,'y=',function(self,_,y){
return rb_funcall(rb_ivar_get(self,'@origin'),'y=',y);
});
rb_define_method(self,'width=',function(self,_,w){
return rb_funcall(rb_ivar_get(self,'@size'),'width=',w);
});
rb_define_method(self,'height=',function(self,_,h){
return rb_funcall(rb_ivar_get(self,'@size'),'height=',h);
});
rb_define_method(self,'to_a',function(self,_){
return [rb_funcall(self,'x'),rb_funcall(self,'y'),rb_funcall(self,'w'),rb_funcall(self,'h')];
});
rb_define_method(self,'center',function(self,_){
});
rb_define_method(self,'contain?',function(self,_){
});
rb_define_method(self,'to_s',function(self,_){
return ["{{",(rb_funcall(self,'x')),", ",(rb_funcall(self,'y')),"}, {",(rb_funcall(self,'width')),", ",(rb_funcall(self,'height')),"}}"].join('');
});
rb_define_method(self,'inspect',function(self,_){
});
rb_define_method(self,'eql?',function(self,_,other){
return ANDTEST(rb_funcall(rb_ivar_get(self,'@size'),'eql?',rb_funcall(other,'size')),rb_funcall(rb_ivar_get(self,'@origin'),'eql?',rb_funcall(other,'origin')));
});
})(rb_define_class_under(self,'Rect',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,x,y){
self.$i_s('@x',x);
return self.$i_s('@y',y);
});
rb_define_method(self,'to_point',function(self,_){
return self;
});
self.$def_s('from_string',function(self,_,string){
return rb_funcall(self,'new',parseFloat(string.substr(1, string.indexOf(",") - 1)),parseFloat(string.substr(string.indexOf(",") + 1, string.length - 1)));
});
rb_define_method(self,'x',function(self,_){
return rb_ivar_get(self,'@x');
});
rb_define_method(self,'x=',function(self,_,x){
return self.$i_s('@x',x);
});
rb_define_method(self,'y',function(self,_){
return rb_ivar_get(self,'@y');
});
rb_define_method(self,'y=',function(self,_,y){
return self.$i_s('@y',y);
});
rb_define_method(self,'eql?',function(self,_,other){
return ANDTEST(rb_funcall(rb_ivar_get(self,'@x'),'==',rb_funcall(other,'x')),rb_funcall(rb_ivar_get(self,'@y'),'==',rb_funcall(other,'y')));
});
rb_define_method(self,'in_rect?',function(self,_,a_rect){
return ANDTEST(rb_funcall(rb_funcall(self,'x'),'>',rb_funcall(a_rect,'x')),ANDTEST(rb_funcall(rb_funcall(self,'y'),'>',rb_funcall(a_rect,'y')),ANDTEST(rb_funcall(rb_funcall(self,'x'),'<=',rb_funcall(rb_funcall(a_rect,'x'),'+',rb_funcall(a_rect,'width'))),rb_funcall(rb_funcall(self,'y'),'<=',rb_funcall(rb_funcall(a_rect,'y'),'+',rb_funcall(a_rect,'height'))))));
});
})(rb_define_class_under(self,'Point',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,w,h){
self.$i_s('@width',w);
return self.$i_s('@height',h);
});
self.$def_s('from_string',function(self,_,string){
return rb_funcall(self,'new',parseFloat(string.substr(1, string.indexOf(",") - 1)),parseFloat(string.substr(string.indexOf(",") + 1, string.length - 1)));
});
rb_define_method(self,'to_size',function(self,_){
return self;
});
rb_define_method(self,'width',function(self,_){
return rb_ivar_get(self,'@width');
});
rb_define_method(self,'width=',function(self,_,w){
return self.$i_s('@width',w);
});
rb_define_method(self,'height',function(self,_){
return rb_ivar_get(self,'@height');
});
rb_define_method(self,'height=',function(self,_,h){
return self.$i_s('@height',h);
});
rb_define_method(self,'eql?',function(self,_,other){
return ANDTEST(rb_funcall(rb_ivar_get(self,'@width'),'==',rb_funcall(other,'width')),rb_funcall(rb_ivar_get(self,'@height'),'==',rb_funcall(other,'height')));
});
})(rb_define_class_under(self,'Size',cObject));
})(rb_define_module('Vienna'));
