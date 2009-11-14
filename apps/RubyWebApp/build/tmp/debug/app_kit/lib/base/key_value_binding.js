(function(self) {
(function(self) {
self.$def_s(s$hd,function(self,_,binding){
});
_I(self,s$he,function(self,_){
return [];
});
_I(self,s$hf,function(self,_,binding){
});
self.$def(s$hg,function(self,_,binding,observable,key_path,options){
if(!_A(_E(_E(self,s$he),s$ed,binding))){
_E(self,s$ao,["KVB: '",(binding),"' is not exposed on object."].join(''));
}
if(!_A(ANDTEST(observable,key_path))){
_E(self,s$ao,["KVB: bad path/object for binding '",(binding),"' to '",(key_path),"'"].join(''));
}
_E(self,s$hh,binding);
_E(observable,s$br,self,key_path,options,binding);
_E(_H(self,i$ah),s$g,binding,VN.$h(_$bc, observable, _$bd, key_path, _$l, options, _$be, binding));
return _E(self,s$hi,binding);
});
self.$def(s$bq,function(self,_,path,object,change,context){
if(_A(_E(self,s$hj,context))){
_E(self,s$ao,['KVB: received notification for chnage of context ',(context)].join(''));
_E(self,s$hi,context);
}
});
_I(self,s$hi,function(self,_,binding){
var dict=_E(self,s$hj,binding);
var obj=_E(dict,s$j,_$bc);
var path=_E(dict,s$j,_$bd);
var key=_E(dict,s$j,_$be);
var value=_E(obj,s$bi,path);
return _E(self,s$bb,value,key);
});
_I(self,s$hk,function(self,_,binding){
var binding_dict=_E(self,s$hj,binding);
if(!_A(binding_dict)){
return nil;
}
var obj=_E(_E(self,s$hl),s$j,_$bc);
var path=_E(_E(self,s$hl),s$j,_$bd);
var value=_E(self,s$ax,_E(_E(self,s$hl),s$j,_$be));
return _E(obj,s$bj,value,path);
});
_I(self,s$hh,function(self,_,binding){
});
_I(self,s$hj,function(self,_,binding){
return _E(_H(self,i$ah),s$j,binding);
});
self.$def(s$hm,function(self,_,info,binding){
return _E(_H(self,i$ah),s$g,binding,info);
});
_I(self,s$hn,function(self,_,binding){
});
})(_N(self,c$j,cObject));
(function(self) {
self.$def_s(s$ho,function(self,_,placeholder,marker,binding){
});
self.$def(s$hp,function(self,_,marker,binding){
});
})(_N(self,c$j,cObject));
(function(self) {
_I(self,s$hq,function(self,_,editor){
});
_I(self,s$hr,function(self,_,editor){
});
})(_N(self,c$j,cObject));
(function(self) {
_I(self,s$hs,function(self,_){
});
_I(self,s$ht,function(self,_){
});
self.$def(s$hu,function(self,_,editor,did_commit,context_info){
});
self.$def(s$hv,function(self,_,delegate,did_commit_selector,context_info){
});
})(_N(self,c$j,cObject));
self.$c_s('BINDING_NAMES',VN.$h(_$bf, '', _$bg, '', _$bh, '', _$bi, '', _$bj, '', _$bk, '', _$bl, '', _$bm, '', _$bn, '', _$bo, '', _$bp, '', _$bq, '', _$br, '', _$bs, '', _$bt, '', _$bu, '', _$bv, '', _$bw, '', _$bx, '', _$by, '', _$bz, '', _$ca, '', _$cb, '', _$cc, '', _$cd, '', _$ce, '', _$cf, '', _$cg, '', _$ch, '', _$ci, '', _$cj, '', _$ck, '', _$cl, '', _$cm, '', _$cn, '', _$co, '', _$cp, '', _$cq, '', _$cr, '', _$cs, '', _$ct, '', _$cu, '', _$cv, '', _$cw, '', _$cx, '', _$cy, '', _$cz, '', _$da, '', _$db, '', _$dc, '', _$dd, '', _$de, '', _$df, '', _$dg, '', _$dh, '', _$di, '', _$dj, '', _$dk, '', _$dl, '', _$dm, '', _$dn, '', _$do, '', _$dp, '', _$dq, '', _$dr, '', _$ds, '', _$dt, '', _$du, '', _$dv, '', _$dw, '', _$dx, '', _$dy, '', _$dz, '', _$ea, '', _$eb, '', _$ec, '', _$ed, '', _$ee, ''));
return self.$c_s('BINDING_OPTIONS',VN.$h(_$ef, '', _$eg, '', _$eh, '', _$ei, '', _$ej, '', _$ek, '', _$el, '', _$em, '', _$en, '', _$eo, '', _$ep, '', _$eq, '', _$er, '', _$es, '', _$et, '', _$eu, '', _$ev, '', _$ew, '', _$ex, '', _$ey, '', _$ez, '', _$fa, '', _$fb, '', _$fc, '', _$fd, '', _$fe, ''));
})(_K(c$b));
