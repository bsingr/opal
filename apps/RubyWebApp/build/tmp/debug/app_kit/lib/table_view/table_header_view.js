(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
return rb_supcall(arguments.callee, self,_cmd,[frame]);
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-table-header-view';
});
rb_define_method(self,s$my,function(self,_cmd,context){
if(RTEST(rb_funcall(context,s$jp))){
rb_funcall(context,'class_name=',rb_funcall(self, s$kc));
rb_funcall(context,'first_time=',false);
}
var children = rb_funcall(context,s$jx);
var table_columns = rb_funcall(rb_ivar_get(self, i$gc),s$aab);
var i = 0;
var columns = rb_funcall(table_columns,s$nb);
var intercell_spacing = rb_funcall(rb_ivar_get(self, i$gc),s$zt);
var cell_frame = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_funcall(self, s$lz),s$ac),rb_funcall(rb_funcall(self, s$lz),s$ad));
if(RTEST(rb_funcall(children,s$hx,columns))){
rb_funcall((rb_funcall(columns,s$mf,children)),s$aat,function(i){
return rb_funcall(context,s$e,"<div></div>");
});
}
return rb_funcall(columns,s$aat,function(i){
var column = rb_funcall(table_columns,s$h,i);
var width = rb_funcall(rb_funcall(column,s$ac),s$hy,rb_funcall(intercell_spacing,s$ac));
rb_funcall(cell_frame,'width=',width);
rb_funcall(context,s$jy,i,function(column_context){
if(RTEST(rb_funcall(i,s$hx,children))){
rb_funcall(column_context,'first_time=',false);
}
else{
rb_funcall(column_context,'first_time=',true);
}
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(rb_funcall(column,s$adu),s$nj,cell_frame,self);
});
return rb_funcall(cell_frame,'x=',rb_funcall(rb_funcall(cell_frame,s$y),s$hy,width));
});
});
rb_define_method(self,s$adn,function(self,_cmd,table_view){
return self.$i_s(i$gc,table_view);
});
rb_define_method(self,s$ado,function(self,_cmd){
return rb_ivar_get(self, i$gc);
});
rb_define_method(self,s$aed,function(self,_cmd){
return rb_ivar_get(self, i$gk);
});
rb_define_method(self,s$aee,function(self,_cmd){
return rb_ivar_get(self, i$gl);
});
rb_define_method(self,s$aef,function(self,_cmd){
return rb_ivar_get(self, i$gm);
});
rb_define_method(self,s$aeg,function(self,_cmd,column){
});
rb_define_method(self,s$acu,function(self,_cmd,point){
});
})(RClass.define_under(self,'TableHeaderView',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
