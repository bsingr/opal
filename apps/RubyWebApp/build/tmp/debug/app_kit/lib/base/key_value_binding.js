(function(self) {
(function(self) {
self.$def_s(s$fk,function(self,_cmd,binding){
});
rb_define_method(self,s$fl,function(self,_cmd){
return [];
});
rb_define_method(self,s$fm,function(self,_cmd,binding){
});
self.$def(s$fn,function(self,_cmd,binding,observable,key_path,options){
if(!RTEST(rb_funcall(rb_funcall(self, s$fl),s$dx,binding))){
rb_funcall(self,s$ak,["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!RTEST(ANDTEST(observable,key_path))){
rb_funcall(self,s$ak,["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
rb_funcall(self,s$fo,binding);
rb_funcall(observable,s$bn,self,key_path,options,binding);
rb_funcall(rb_ivar_get(self, i$ad),'[]=',binding,VN.$h(_$bd, observable, _$be, key_path, _$m, options, _$bf, binding));
return rb_funcall(self,s$fp,binding);
});
self.$def(s$bm,function(self,_cmd,path,object,change,context){
if(RTEST(rb_funcall(self,s$fq,context))){
rb_funcall(self,s$ak,['KVB: received notification for chnage of context ',(context)].join(''));
rb_funcall(self,s$fp,context);
}
});
rb_define_method(self,s$fp,function(self,_cmd,binding){
var dict = rb_funcall(self,s$fq,binding);
var obj = rb_funcall(dict,s$h,_$bd);
var path = rb_funcall(dict,s$h,_$be);
var key = rb_funcall(dict,s$h,_$bf);
var value = rb_funcall(obj,s$be,path);
return rb_funcall(self,s$ax,value,key);
});
rb_define_method(self,s$fr,function(self,_cmd,binding){
var binding_dict = rb_funcall(self,s$fq,binding);
if(!RTEST(binding_dict)){
return nil;
}
var obj = rb_funcall(rb_funcall(self, s$fs),s$h,_$bd);
var path = rb_funcall(rb_funcall(self, s$fs),s$h,_$be);
var value = rb_funcall(self,s$at,rb_funcall(rb_funcall(self, s$fs),s$h,_$bf));
return rb_funcall(obj,s$bf,value,path);
});
rb_define_method(self,s$fo,function(self,_cmd,binding){
});
rb_define_method(self,s$fq,function(self,_cmd,binding){
return rb_funcall(rb_ivar_get(self, i$ad),s$h,binding);
});
self.$def(s$ft,function(self,_cmd,info,binding){
return rb_funcall(rb_ivar_get(self, i$ad),'[]=',binding,info);
});
rb_define_method(self,s$fu,function(self,_cmd,binding){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def_s(s$fv,function(self,_cmd,placeholder,marker,binding){
});
self.$def(s$fw,function(self,_cmd,marker,binding){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,s$fx,function(self,_cmd,editor){
});
rb_define_method(self,s$fy,function(self,_cmd,editor){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
rb_define_method(self,s$fz,function(self,_cmd){
});
rb_define_method(self,s$ga,function(self,_cmd){
});
self.$def(s$gb,function(self,_cmd,editor,did_commit,context_info){
});
self.$def(s$gc,function(self,_cmd,delegate,did_commit_selector,context_info){
});
})(RClass.define_under(self,'Object',cObject));
self.$c_s('BINDING_NAMES',VN.$h(_$bg, '', _$bh, '', _$bi, '', _$bj, '', _$bk, '', _$bl, '', _$bm, '', _$bn, '', _$bo, '', _$bp, '', _$bq, '', _$br, '', _$bs, '', _$bt, '', _$bu, '', _$bv, '', _$bw, '', _$bx, '', _$by, '', _$bz, '', _$ca, '', _$cb, '', _$cc, '', _$cd, '', _$ce, '', _$cf, '', _$cg, '', _$ch, '', _$ci, '', _$cj, '', _$ck, '', _$cl, '', _$cm, '', _$cn, '', _$co, '', _$cp, '', _$cq, '', _$cr, '', _$cs, '', _$ct, '', _$cu, '', _$cv, '', _$cw, '', _$cx, '', _$cy, '', _$cz, '', _$da, '', _$db, '', _$dc, '', _$dd, '', _$de, '', _$df, '', _$dg, '', _$dh, '', _$di, '', _$dj, '', _$dk, '', _$dl, '', _$dm, '', _$dn, '', _$do, '', _$dp, '', _$dq, '', _$dr, '', _$ds, '', _$dt, '', _$du, '', _$dv, '', _$dw, '', _$dx, '', _$dy, '', _$dz, '', _$ea, '', _$eb, '', _$ec, '', _$ed, '', _$ee, '', _$ef, ''));
return self.$c_s('BINDING_OPTIONS',VN.$h(_$eg, '', _$eh, '', _$ei, '', _$ej, '', _$ek, '', _$el, '', _$em, '', _$en, '', _$eo, '', _$ep, '', _$eq, '', _$er, '', _$es, '', _$et, '', _$eu, '', _$ev, '', _$ew, '', _$ex, '', _$ey, '', _$ez, '', _$fa, '', _$fb, '', _$fc, '', _$fd, '', _$fe, '', _$ff, ''));
})(RModule.define('Vienna'));
