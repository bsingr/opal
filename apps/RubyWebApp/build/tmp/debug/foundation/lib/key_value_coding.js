(function(self) {
self.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
(function(self) {
self.$def_s(s$as,function(self,_cmd){
return true;
});
rb_define_method(self,s$at,function(self,_cmd,key){
var accessor = key;
if(RTEST(rb_funcall(self,s$au,accessor))){
return rb_funcall(self,s$ar,accessor);
}
accessor = [(key),"?"].join('');
if(RTEST(rb_funcall(self,s$au,accessor))){
return rb_funcall(self,s$ar,accessor);
}
if(RTEST(rb_funcall(rb_funcall(self,s$av),s$as))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {return self.$iv_tbl['@' + key];
}}
return rb_funcall(self,s$aw,key);
});
self.$def(s$ax,function(self,_cmd,value,key){
var accessor = [(key),"="].join('');
if(RTEST(rb_funcall(self,s$au,accessor))){
rb_funcall(self,s$aq,accessor,value);
return value;
}
if(RTEST(rb_funcall(rb_funcall(self,s$av),s$as))){
if (typeof self.$iv_tbl['@' + key] != 'undefined') {rb_funcall(self,s$ay,key);
self.$iv_tbl['@' + key] = value;rb_funcall(self,s$az,key);
return value;
}}
return rb_funcall(self,s$ba,value,key);
});
self.$def(s$bb,function(self,_cmd,value,key,out_error){
});
rb_define_method(self,s$bc,function(self,_cmd,key){
});
rb_define_method(self,s$bd,function(self,_cmd,key){
});
rb_define_method(self,s$be,function(self,_cmd,path){
return rb_funcall(self,s$at,path);
});
self.$def(s$bf,function(self,_cmd,value,path){
return rb_funcall(self,s$ax,value,path);
});
self.$def(s$bg,function(self,_cmd,value,path,out_error){
});
rb_define_method(self,s$bh,function(self,_cmd,path){
});
rb_define_method(self,s$bi,function(self,_cmd,path){
});
rb_define_method(self,s$aw,function(self,_cmd,key){
});
self.$def(s$ba,function(self,_cmd,value,key){
});
rb_define_method(self,s$bj,function(self,_cmd,key){
});
rb_define_method(self,s$bk,function(self,_cmd,keys){
});
rb_define_method(self,s$bl,function(self,_cmd,keyed_values){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,s$at,function(self,_cmd,key){
});
self.$def(s$ax,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Array',cObject));
(function(self) {
rb_define_method(self,s$at,function(self,_cmd,key){
});
self.$def(s$ax,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Dictionary',cObject));
(function(self) {
rb_define_method(self,s$at,function(self,_cmd,key){
});
self.$def(s$ax,function(self,_cmd,value,key){
});
})(RClass.define_under(self,'Set',cObject));
})(RModule.define('Vienna'));
