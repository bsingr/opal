(function(self) {
(function(self) {
(function(self) {
self.$def_s(s$oq,function(self,_,font_name,font_size){
return _E(self,s$or,font_name,font_size,false);
});
self.$def_s(s$or,function(self,_,font_name,font_size,is_bold){
});
self.$def_s(s$os,function(self,_,size){
});
self.$def_s(s$ot,function(self,_,size){
});
self.$def_s(s$ou,function(self,_,size){
return _E(self,s$as,'Arial',size,true);
});
self.$def_s(s$ov,function(self,_,size){
});
self.$def_s(s$ow,function(self,_,size){
});
self.$def_s(s$ox,function(self,_,size){
});
self.$def_s(s$oy,function(self,_,size){
});
self.$def_s(s$oz,function(self,_,size){
});
self.$def_s(s$pa,function(self,_,size){
});
self.$def_s(s$pb,function(self,_,size){
});
self.$def_s(s$pc,function(self,_,size){
return self.$i_s(i$bj,ORTEST(_H(self,i$bj),_E(self,s$as,'Arial',size,false)));
});
self.$def_s(s$pd,function(self,_){
return 12;
});
self.$def_s(s$pe,function(self,_){
return 10;
});
self.$def_s(s$pf,function(self,_){
return 12;
});
self.$def_s(s$pg,function(self,_,control_size){
return (function($v){
if(($e = _E(_$fy, '===', $v),$e!==nil && $e!==false)){
return 12;
}
else if(($e = _E(_$fz, '===', $v),$e!==nil && $e!==false)){
return 10;
}
else if(($e = _E(_$ga, '===', $v),$e!==nil && $e!==false)){
return 8;
}
else {
return 12;
}
})(control_size);
});
})(self.$c_g_full(c$am));
_I(self,s$n,function(self,_,font_name,size,is_bold){
self.$i_s(i$bk,font_name);
self.$i_s(i$aq,size);
return self.$i_s(i$bl,is_bold);
});
_I(self,s$ph,function(self,_){
return _H(self,i$bk);
});
_I(self,s$aa,function(self,_){
return _H(self,i$aq);
});
_I(self,s$pi,function(self,_){
return _H(self,i$bl);
});
_I(self,s$pj,function(self,_){
var bold_str=_A(_H(self,i$bl)) ? "bold " : '';
return [(bold_str)," ",(_H(self,i$aq)),"px '",(_E(self,s$ph)),"'"].join('');
});
_I(self,s$pk,function(self,_){
});
_I(self,s$pl,function(self,_){
});
})(_N(self,c$am,cObject));
})(_K(c$b));
