(function(self) {
(function(self) {
_I(self,s$n,function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
_I(self,s$qq,function(self,_){
return 'vn-table-header-view';
});
_I(self,s$tl,function(self,_,context){
if(_A(_E(context,s$oy))){
_E(context,s$p,_E(self,s$qq));
_E(context,s$oz,false);
}
var children=_E(context,s$pg);
var table_columns=_E(_H(self,i$go),s$age);
var i=0;
var columns=_E(table_columns,s$cq);
var intercell_spacing=_E(_H(self,i$go),s$afx);
var cell_frame=_E(self.$klass.$c_g_full(c$ae),s$ap,0,0,_E(_E(self,s$so),s$ae),_E(_E(self,s$so),s$af));
if(_A(_E(children,s$kl,columns))){
_E((_E(columns,s$mg,children)),s$agw,function(i){
return _E(context,s$e,"<div></div>");
});
}
return _E(columns,s$agw,function(i){
var column=_E(table_columns,s$j,i);
var width=_E(_E(column,s$ae),s$km,_E(intercell_spacing,s$ae));
_E(cell_frame,s$jz,width);
_E(context,s$ph,i,function(column_context){
if(_A(_E(i,s$kl,children))){
_E(column_context,s$oz,false);
}
else{
_E(column_context,s$oz,true);
}
_E(column_context,s$w,cell_frame);
return _E(_E(column,s$ajw),s$tu,cell_frame,self);
});
return _E(cell_frame,s$jx,_E(_E(cell_frame,s$ab),s$km,width));
});
});
_I(self,s$afi,function(self,_,table_view){
return self.$i_s(i$go,table_view);
});
_I(self,s$ajq,function(self,_){
return _H(self,i$go);
});
_I(self,s$akf,function(self,_){
return _H(self,i$gw);
});
_I(self,s$akg,function(self,_){
return _H(self,i$gx);
});
_I(self,s$akh,function(self,_){
return _H(self,i$gy);
});
_I(self,s$aki,function(self,_,column){
});
_I(self,s$aix,function(self,_,point){
});
})(_N(self,c$bf,self.$c_g_full(c$al)));
})(_K(c$b));
