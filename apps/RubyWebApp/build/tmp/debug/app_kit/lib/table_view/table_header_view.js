(function(self) {
(function(self) {
self.$c_s('HEADER_BACKGROUND',_E(self.$c_g_full(c$ai),s$mq,'header_view_background'));
_I(self,s$n,function(self,_,frame){
return rb_supcall(arguments.callee, self,_,[frame]);
});
_I(self,s$to,function(self,_){
return 'vn-table-header-view';
});
_I(self,s$fw,function(self,_,dirty_rect){
var background_image=self.$klass.$c_g_full(c$bq);
return _E(background_image,s$nr,dirty_rect,_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,0,0),nil,1.0);
});
_I(self,s$wj,function(self,_,context){
if(_A(_E(context,s$rv))){
_E(context,s$p,_E(self,s$to));
_E(context,s$rw,false);
}
var children=_E(context,s$sf);
var table_columns=_E(_H(self,i$gy),s$ajb);
var i=0;
var columns=_E(table_columns,s$cq);
var intercell_spacing=_E(_H(self,i$gy),s$aiu);
var cell_frame=_E(self.$klass.$c_g_full(c$ag),s$ap,0,0,_E(_E(self,s$vm),s$ae),_E(_E(self,s$vm),s$af));
if(_A(_E(children,s$du,columns))){
_E((_E(columns,s$dx,children)),s$dt,function(i){
return _E(context,s$e,"<div></div>");
});
}
return _E(columns,s$dt,function(i){
var column=_E(table_columns,s$j,i);
var width=_E(_E(column,s$ae),s$ec,_E(intercell_spacing,s$ae));
_E(cell_frame,s$md,width);
_E(context,s$sg,i,function(column_context){
if(_A(_E(i,s$du,children))){
_E(column_context,s$rw,false);
}
else{
_E(column_context,s$rw,true);
}
_E(column_context,s$w,cell_frame);
return _E(_E(column,s$amt),s$ws,cell_frame,self);
});
return _E(cell_frame,s$mb,_E(_E(cell_frame,s$ab),s$ec,width));
});
});
_I(self,s$aif,function(self,_,table_view){
return self.$i_s(i$gy,table_view);
});
_I(self,s$amn,function(self,_){
return _H(self,i$gy);
});
_I(self,s$anc,function(self,_){
return _H(self,i$hg);
});
_I(self,s$and,function(self,_){
return _H(self,i$hh);
});
_I(self,s$ane,function(self,_){
return _H(self,i$hi);
});
_I(self,s$anf,function(self,_,column){
});
_I(self,s$alv,function(self,_,point){
});
})(_N(self,c$bk,self.$c_g_full(c$ap)));
})(_K(c$b));
