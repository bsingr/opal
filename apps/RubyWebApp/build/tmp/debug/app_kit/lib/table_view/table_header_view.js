(function(self) {
(function(self) {
_I(self,s$n,function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
_I(self,s$lx,function(self,_){
return 'vn-table-header-view';
});
_I(self,s$ot,function(self,_,context){
if(_A(_E(context,s$lk))){
_E(context,s$p,_E(self,s$lx));
_E(context,s$ll,false);
}
var children=_E(context,s$ls);
var table_columns=_E(_H(self,i$gc),s$abw);
var i=0;
var columns=_E(table_columns,s$ov);
var intercell_spacing=_E(_H(self,i$gc),s$abo);
var cell_frame=_E(self.$klass.$c_g_full(c$ad),s$ap,0,0,_E(_E(self,s$nv),s$ae),_E(_E(self,s$nv),s$af));
if(_A(_E(children,s$js,columns))){
_E((_E(columns,s$ob,children)),s$aco,function(i){
return _E(context,s$e,"<div></div>");
});
}
return _E(columns,s$aco,function(i){
var column=_E(table_columns,s$j,i);
var width=_E(_E(column,s$ae),s$jt,_E(intercell_spacing,s$ae));
_E(cell_frame,s$jg,width);
_E(context,s$lt,i,function(column_context){
if(_A(_E(i,s$js,children))){
_E(column_context,s$ll,false);
}
else{
_E(column_context,s$ll,true);
}
_E(column_context,s$w,cell_frame);
return _E(_E(column,s$afo),s$pd,cell_frame,self);
});
return _E(cell_frame,s$je,_E(_E(cell_frame,s$ab),s$jt,width));
});
});
_I(self,s$aaz,function(self,_,table_view){
return self.$i_s(i$gc,table_view);
});
_I(self,s$afi,function(self,_){
return _H(self,i$gc);
});
_I(self,s$afx,function(self,_){
return _H(self,i$gk);
});
_I(self,s$afy,function(self,_){
return _H(self,i$gl);
});
_I(self,s$afz,function(self,_){
return _H(self,i$gm);
});
_I(self,s$aga,function(self,_,column){
});
_I(self,s$aep,function(self,_,point){
});
})(_N(self,c$be,self.$c_g_full(c$ai)));
})(_K(c$b));
