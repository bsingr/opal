(function(self) {
(function(self) {
self.$def_s(s$oq,function(self,_cmd,binding){
});
self.$def(s$or,function(self,_cmd){
return [];
});
self.$def(s$os,function(self,_cmd,binding){
});
self.$def(s$ot,function(self,_cmd,binding,observable,key_path,options){
if(!RTEST(VN$(VN$(self, s$or),s$al,binding))){
VN$(self,s$ag,["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!RTEST(ANDTEST(observable,key_path))){
VN$(self,s$ag,["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
VN$(self,s$ou,binding);
VN$(observable,s$kx,self,key_path,options,binding);
VN$(self.$i_g(i$af),'[]=',binding,VN.$h(_$bb, observable, _$bc, key_path, _$m, options, _$bd, binding));
return VN$(self,s$ov,binding);
});
self.$def(s$kw,function(self,_cmd,path,object,change,context){
if(RTEST(VN$(self,s$ow,context))){
VN$(self,s$ag,['KVB: received notification for chnage of context ',(context)].join(''));
VN$(self,s$ov,context);
}
});
self.$def(s$ov,function(self,_cmd,binding){
var dict = VN$(self,s$ow,binding);
var obj = VN$(dict,s$bo,_$bb);
var path = VN$(dict,s$bo,_$bc);
var key = VN$(dict,s$bo,_$bd);
var value = VN$(obj,s$ko,path);
return VN$(self,s$kh,value,key);
});
self.$def(s$ox,function(self,_cmd,binding){
var binding_dict = VN$(self,s$ow,binding);
if(!RTEST(binding_dict)){
return nil;
}
var obj = VN$(VN$(self, s$oy),s$bo,_$bb);
var path = VN$(VN$(self, s$oy),s$bo,_$bc);
var value = VN$(self,s$ke,VN$(VN$(self, s$oy),s$bo,_$bd));
return VN$(obj,s$kp,value,path);
});
self.$def(s$ou,function(self,_cmd,binding){
});
self.$def(s$ow,function(self,_cmd,binding){
return VN$(self.$i_g(i$af),s$bo,binding);
});
self.$def(s$oz,function(self,_cmd,info,binding){
return VN$(self.$i_g(i$af),'[]=',binding,info);
});
self.$def(s$pa,function(self,_cmd,binding){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def_s(s$pb,function(self,_cmd,placeholder,marker,binding){
});
self.$def(s$pc,function(self,_cmd,marker,binding){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def(s$pd,function(self,_cmd,editor){
});
self.$def(s$pe,function(self,_cmd,editor){
});
})(RClass.define_under(self,'Object',cObject));
(function(self) {
self.$def(s$pf,function(self,_cmd){
});
self.$def(s$pg,function(self,_cmd){
});
self.$def(s$ph,function(self,_cmd,editor,did_commit,context_info){
});
self.$def(s$pi,function(self,_cmd,delegate,did_commit_selector,context_info){
});
})(RClass.define_under(self,'Object',cObject));
self.$c_s('BINDING_NAMES',VN.$h(_$be, '', _$bf, '', _$bg, '', _$bh, '', _$bi, '', _$bj, '', _$bk, '', _$bl, '', _$bm, '', _$bn, '', _$bo, '', _$bp, '', _$bq, '', _$br, '', _$bs, '', _$bt, '', _$bu, '', _$bv, '', _$bw, '', _$bx, '', _$by, '', _$bz, '', _$ca, '', _$cb, '', _$cc, '', _$cd, '', _$ce, '', _$cf, '', _$cg, '', _$ch, '', _$ci, '', _$cj, '', _$ck, '', _$cl, '', _$cm, '', _$cn, '', _$co, '', _$cp, '', _$cq, '', _$cr, '', _$cs, '', _$ct, '', _$cu, '', _$cv, '', _$cw, '', _$cx, '', _$cy, '', _$cz, '', _$da, '', _$db, '', _$dc, '', _$dd, '', _$de, '', _$df, '', _$dg, '', _$dh, '', _$di, '', _$dj, '', _$dk, '', _$dl, '', _$dm, '', _$dn, '', _$do, '', _$dp, '', _$dq, '', _$dr, '', _$ds, '', _$dt, '', _$du, '', _$dv, '', _$dw, '', _$dx, '', _$dy, '', _$dz, '', _$ea, '', _$eb, '', _$ec, '', _$ed, ''));
return self.$c_s('BINDING_OPTIONS',VN.$h(_$ee, '', _$ef, '', _$eg, '', _$eh, '', _$ei, '', _$ej, '', _$ek, '', _$el, '', _$em, '', _$en, '', _$eo, '', _$ep, '', _$eq, '', _$er, '', _$es, '', _$et, '', _$eu, '', _$ev, '', _$ew, '', _$ex, '', _$ey, '', _$ez, '', _$fa, '', _$fb, '', _$fc, '', _$fd, ''));
})(RModule.define('Vienna'));
