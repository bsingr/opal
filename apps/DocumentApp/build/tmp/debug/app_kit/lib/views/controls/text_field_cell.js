(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(_$hl, _E((1),s$du), _$fn, 0, _$ir, 1));
(function(self) {
self.$c_s('BEZEL_IMAGES',VN.$h(_$fn, _E(self.$c_g_full(c$ak),s$as,_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_0'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_1'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_2'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_3'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_4'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_5'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_6'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_7'),_E(self.$c_g_full(c$ai),s$mv,'text_field_square_bezel_8')), _$ir, _E(self.$c_g_full(c$aj),s$as)));
_I(self,s$zu,function(self,_,str){
rb_supcall(arguments.callee, self,_,[str]);
self.$i_s(i$cm,true);
self.$i_s(i$cn,true);
self.$i_s(i$cr,true);
self.$i_s(i$ef,_$fn);
self.$i_s(i$dd,_E(self.$klass.$c_g_full(c$am),s$pc,12));
self.$i_s(i$et,nil);
self.$i_s(i$dg,"Hey there!");
return self;
});
_I(self,s$xb,function(self,_){
return 'vn-text-field';
});
self.$def(s$yv,function(self,_,cell_frame,control_view){
var ctx=_E(_E(self.$klass.$c_g_full(c$ac),s$ib),s$hy);
(function($v){
if(($e = _E(_$hl, '===', $v),$e!==nil && $e!==false)){
}
else {
return _E(_E(self.$klass.$c_g_full(c$av),s$j,_H(self,i$ef)),s$oo,cell_frame);
}
})(_H(self,i$ef));
if(_A(_E(control_view,s$vf,self.$klass.$c_g_full(c$bc)))){
}
else{
_E(_E(self,s$afr),s$rx,cell_frame);
}
});
self.$def(s$xa,function(self,_,cell_frame,control_view){
var ctx=_E(self.$klass.$c_g_full(c$ah),s$ib);
self.$i_s(i$cv,control_view);
if(_A(_E(control_view,s$vf,self.$klass.$c_g_full(c$bc)))){
if(!_A(_H(self,i$et))){
self.$i_s(i$et,_E(self.$klass.$c_g_full(c$f),s$as,_$is));
_E(_H(self,i$et),s$t,_$it,'text');
_E(_H(self,i$et),s$q,VN.$h(_$iu,1000,_$iv,'absolute',_$iw,'none',_$ix,0,_$iy,'none'));
_E(_H(self,i$et),s$w,cell_frame);
_E(_H(self,i$et),s$o).value = "wtf!!!!!";_E(_E(control_view,s$o),s$e,_H(self,i$et));
}
}
return _E(ctx,s$sh,function(){
(function($v){
if(($e = _E(_$hl, '===', $v),$e!==nil && $e!==false)){
}
else {
return _E(_E(self.$klass.$c_g_full(c$av),s$j,_H(self,i$ef)),s$nz,cell_frame);
}
})(_H(self,i$ef));
if(!_A(_H(self,i$et))){
_E(_E(self,s$afr),s$oc,_E(self.$klass.$c_g_full(c$ag),s$as,2,2,_E(cell_frame,s$ae),_E(cell_frame,s$af)));
}
});
});
_I(self,s$afr,function(self,_){
if(_A(_E(_H(self,i$dg),s$vf,self.$klass.$c_g_full(c$p)))){
return _H(self,i$dg);
}
var attributes=VN.$h();
if(_A(_H(self,i$dd))){
_E(attributes,s$g,_$ch,_H(self,i$dd));
}
_E(attributes,s$g,_$gb,(_A(_H(self,i$cl)) ? _E(self.$klass.$c_g_full(c$an),s$qp) : _E(self.$klass.$c_g_full(c$an),s$qo)));
var paragraph_style=_E(self.$klass.$c_g_full(c$ao),s$sx);
_E(paragraph_style,s$tf,_H(self,i$bs));
_E(attributes,s$g,_$ik,paragraph_style);
return _E(self.$klass.$c_g_full(c$p),s$as,_H(self,i$dg),attributes);
});
_I(self,s$nt,function(self,_,color){
return self.$i_s(i$bc,color);
});
_I(self,s$nu,function(self,_){
return _H(self,i$bc);
});
_I(self,s$afh,function(self,_,flag){
return self.$i_s(i$er,flag);
});
_I(self,s$afi,function(self,_){
return _H(self,i$er);
});
_I(self,s$afj,function(self,_,color){
return self.$i_s(i$es,color);
});
_I(self,s$qp,function(self,_){
return _H(self,i$es);
});
_I(self,s$abj,function(self,_,text_obj){
return text_obj;
});
_I(self,s$aef,function(self,_,style){
return self.$i_s(i$ef,style);
});
_I(self,s$aeg,function(self,_){
return _H(self,i$ef);
});
_I(self,s$afs,function(self,_,string){
return self.$i_s(i$eu,string);
});
_I(self,s$aft,function(self,_){
return _H(self,i$eu);
});
_I(self,s$afu,function(self,_,str){
return _H(self,i$ev);
});
_I(self,s$afv,function(self,_){
return _H(self,i$ev);
});
})(_N(self,c$bb,self.$c_g_full(c$aq)));
})(_K(c$b));
