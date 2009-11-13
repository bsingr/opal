(function(self) {
self.$c_s('TEXTFIELD_BEZEL_STYLES',VN.$h(_$hj, _E((1),s$ds), _$fn, 0, _$ip, 1));
(function(self) {
self.$c_s('BEZEL_IMAGES',VN.$h(_$fn, _E(self.$c_g_full(c$ak),s$aq,_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_0'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_1'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_2'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_3'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_4'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_5'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_6'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_7'),_E(self.$c_g_full(c$ai),s$ms,'text_field_square_bezel_8')), _$ip, _E(self.$c_g_full(c$aj),s$aq)));
_I(self,s$zn,function(self,_,str){
rb_supcall(arguments.callee, self,_,[str]);
self.$i_s(i$cm,true);
self.$i_s(i$cn,true);
self.$i_s(i$cr,true);
self.$i_s(i$ef,_$fn);
self.$i_s(i$dd,_E(self.$klass.$c_g_full(c$am),s$oz,12));
self.$i_s(i$et,nil);
self.$i_s(i$dg,"Hey there!");
return self;
});
_I(self,s$wu,function(self,_){
return 'vn-text-field';
});
self.$def(s$yo,function(self,_,cell_frame,control_view){
var ctx=_E(_E(self.$klass.$c_g_full(c$ac),s$hz),s$hw);
(function($v){
if(($e = _E(_$hj, '===', $v),$e!==nil && $e!==false)){
}
else {
return _E(_E(self.$klass.$c_g_full(c$av),s$j,_H(self,i$ef)),s$ol,cell_frame);
}
})(_H(self,i$ef));
if(_A(_E(control_view,s$uy,self.$klass.$c_g_full(c$bc)))){
}
else{
_E(_E(self,s$afk),s$ru,cell_frame);
}
});
self.$def(s$wt,function(self,_,cell_frame,control_view){
var ctx=_E(self.$klass.$c_g_full(c$ah),s$hz);
self.$i_s(i$cv,control_view);
if(_A(_E(control_view,s$uy,self.$klass.$c_g_full(c$bc)))){
if(!_A(_H(self,i$et))){
self.$i_s(i$et,_E(self.$klass.$c_g_full(c$f),s$aq,_$iq));
_E(_H(self,i$et),s$t,_$ir,'text');
_E(_H(self,i$et),s$q,VN.$h(_$is,1000,_$it,'absolute',_$iu,'none',_$iv,0,_$iw,'none'));
_E(_H(self,i$et),s$w,cell_frame);
_E(_H(self,i$et),s$o).value = "wtf!!!!!";_E(_E(control_view,s$o),s$e,_H(self,i$et));
}
}
return _E(ctx,s$se,function(){
(function($v){
if(($e = _E(_$hj, '===', $v),$e!==nil && $e!==false)){
}
else {
return _E(_E(self.$klass.$c_g_full(c$av),s$j,_H(self,i$ef)),s$nw,cell_frame);
}
})(_H(self,i$ef));
if(!_A(_H(self,i$et))){
_E(_E(self,s$afk),s$nz,_E(self.$klass.$c_g_full(c$ag),s$aq,2,2,_E(cell_frame,s$ae),_E(cell_frame,s$af)));
}
});
});
_I(self,s$afk,function(self,_){
if(_A(_E(_H(self,i$dg),s$uy,self.$klass.$c_g_full(c$p)))){
return _H(self,i$dg);
}
var attributes=VN.$h();
if(_A(_H(self,i$dd))){
_E(attributes,s$g,_$ch,_H(self,i$dd));
}
_E(attributes,s$g,_$gb,(_A(_H(self,i$cl)) ? _E(self.$klass.$c_g_full(c$an),s$qm) : _E(self.$klass.$c_g_full(c$an),s$ql)));
var paragraph_style=_E(self.$klass.$c_g_full(c$ao),s$su);
_E(paragraph_style,s$tc,_H(self,i$bs));
_E(attributes,s$g,_$ii,paragraph_style);
return _E(self.$klass.$c_g_full(c$p),s$aq,_H(self,i$dg),attributes);
});
_I(self,s$nq,function(self,_,color){
return self.$i_s(i$bc,color);
});
_I(self,s$nr,function(self,_){
return _H(self,i$bc);
});
_I(self,s$afa,function(self,_,flag){
return self.$i_s(i$er,flag);
});
_I(self,s$afb,function(self,_){
return _H(self,i$er);
});
_I(self,s$afc,function(self,_,color){
return self.$i_s(i$es,color);
});
_I(self,s$qm,function(self,_){
return _H(self,i$es);
});
_I(self,s$abc,function(self,_,text_obj){
return text_obj;
});
_I(self,s$ady,function(self,_,style){
return self.$i_s(i$ef,style);
});
_I(self,s$adz,function(self,_){
return _H(self,i$ef);
});
_I(self,s$afl,function(self,_,string){
return self.$i_s(i$eu,string);
});
_I(self,s$afm,function(self,_){
return _H(self,i$eu);
});
_I(self,s$afn,function(self,_,str){
return _H(self,i$ev);
});
_I(self,s$afo,function(self,_){
return _H(self,i$ev);
});
})(_N(self,c$bb,self.$c_g_full(c$aq)));
})(_K(c$b));
