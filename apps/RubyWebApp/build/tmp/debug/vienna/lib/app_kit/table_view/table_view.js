(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$eu,17.0);
self.$i_s(i$ev,rb_funcall(self.$klass.$c_g_full(c$p),s$al,3.0,2.0));
self.$i_s(i$ew,rb_funcall((1),s$yr));
self.$i_s(i$ex,[]);
self.$i_s(i$ey,[]);
self.$i_s(i$ez,[]);
self.$i_s(i$fa,rb_funcall(self.$klass.$c_g_full(c$ak),s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$z),17)));
rb_funcall(rb_ivar_get(self, i$fa),'table_view=',self);
return self.$i_s(i$fb,rb_funcall(self.$klass.$c_g_full(c$al),s$al,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,rb_funcall(self.$klass.$c_g_full(c$ah),s$xo),rb_funcall(self.$klass.$c_g_full(c$ah),s$xo))));
});
rb_define_method(self,s$ys,function(self,_cmd,a_source){
return self.$i_s(i$fc,a_source);
});
rb_define_method(self,s$yt,function(self,_cmd){
return rb_ivar_get(self, i$fc);
});
rb_define_method(self,s$ei,function(self,_cmd,a_delegate){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$yu,function(self,_cmd,header_view){
return self.$i_s(i$fa,header_view);
});
rb_define_method(self,s$yv,function(self,_cmd){
return rb_ivar_get(self, i$fa);
});
rb_define_method(self,s$yw,function(self,_cmd,corner_view){
return self.$i_s(i$fb,corner_view);
});
rb_define_method(self,s$yx,function(self,_cmd){
return rb_ivar_get(self, i$fb);
});
rb_define_method(self,s$yy,function(self,_cmd,flag){
return self.$i_s(i$fd,flag);
});
rb_define_method(self,s$yz,function(self,_cmd){
return rb_ivar_get(self, i$fd);
});
rb_define_method(self,s$za,function(self,_cmd,flag){
return self.$i_s(i$fe,flag);
});
rb_define_method(self,s$zb,function(self,_cmd){
return rb_ivar_get(self, i$fe);
});
rb_define_method(self,s$zc,function(self,_cmd,style){
return self.$i_s(i$ff,style);
});
rb_define_method(self,s$zd,function(self,_cmd){
return rb_ivar_get(self, i$ff);
});
rb_define_method(self,s$ze,function(self,_cmd,grid_type){
return self.$i_s(i$fg,grid_type);
});
rb_define_method(self,s$zf,function(self,_cmd){
return rb_ivar_get(self, i$fg);
});
rb_define_method(self,s$zg,function(self,_cmd,size){
return self.$i_s(i$ev,size);
});
rb_define_method(self,s$zh,function(self,_cmd){
return rb_ivar_get(self, i$ev);
});
rb_define_method(self,s$zi,function(self,_cmd,flag){
return self.$i_s(i$fh,flag);
});
rb_define_method(self,s$zj,function(self,_cmd){
return rb_ivar_get(self, i$fh);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$zk,function(self,_cmd,color){
return self.$i_s(i$fi,color);
});
rb_define_method(self,s$zl,function(self,_cmd){
return rb_ivar_get(self, i$fi);
});
rb_define_method(self,s$zm,function(self,_cmd,height){
return self.$i_s(i$eu,height);
});
rb_define_method(self,s$zn,function(self,_cmd){
return rb_ivar_get(self, i$eu);
});
rb_define_method(self,s$zo,function(self,_cmd,index_set){
});
rb_define_method(self,s$zp,function(self,_cmd){
return rb_ivar_get(self, i$ex);
});
rb_define_method(self,s$zq,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ex),s$nb);
});
rb_define_method(self,s$zr,function(self,_cmd){
if(RTEST(rb_funcall(rb_ivar_get(self, i$ew),s$hx,0))){
if(RTEST(rb_ivar_get(self, i$fc))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$fc),s$au,_$hy))){
self.$i_s(i$ew,rb_funcall(rb_ivar_get(self, i$fc),s$zs,self));
}
else{
rb_funcall(self,s$ah,['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s(i$ew,0);
}
}
else{
self.$i_s(i$ew,0);
}
}
return rb_ivar_get(self, i$ew);
});
rb_define_method(self,s$zt,function(self,_cmd,table_column){
rb_funcall(rb_ivar_get(self, i$ex),s$b,table_column);
rb_funcall(table_column,'table_view=',self);
return rb_funcall(self, s$zu);
});
rb_define_method(self,s$zv,function(self,_cmd,table_column){
});
self.$def(s$zw,function(self,_cmd,old_index,new_index){
});
rb_define_method(self,s$zx,function(self,_cmd){
});
rb_define_method(self,s$zy,function(self,_cmd){
});
rb_define_method(self,s$wj,function(self,_cmd){
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$zz,function(self,_cmd){
});
rb_define_method(self,s$aaa,function(self,_cmd,row){
});
rb_define_method(self,s$aab,function(self,_cmd,column){
});
rb_define_method(self,s$zu,function(self,_cmd){
rb_funcall(self, s$aac);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$aac,function(self,_cmd){
self.$i_s(i$ew,rb_funcall((1),s$yr));
var rows = rb_funcall(self,s$zr);
var size = rb_funcall(self.$klass.$c_g_full(c$p),s$al,rb_funcall(rb_ivar_get(self, i$bb),s$z),rb_funcall(rb_ivar_get(self, i$bb),s$aa));
if(RTEST(rb_funcall(rows,s$yo,0))){
rb_funcall(size,'width=',rb_funcall(rb_funcall(self,s$aad,0),s$z));
}
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$ex),s$nb),s$yo,0))){
rb_funcall(size,'height=',rb_funcall(rb_funcall(self,s$aae,0),s$aa));
}
});
rb_define_method(self,s$my,function(self,_cmd,context){
rb_funcall(self,s$aaf,context);
rb_funcall(self,s$aag,rb_ivar_get(self, i$bc),context);
return rb_funcall(rb_funcall(self, s$zr),s$aah,function(row){
return rb_funcall(context,s$jy,row,function(row_element){
return rb_funcall(self,s$aai,row,rb_ivar_get(self, i$bc),row_element);
});
});
});
rb_define_method(self,s$aaf,function(self,_cmd,context){
var children = rb_funcall(context,s$jx);
var rows = rb_funcall(self, s$zr);
if(RTEST(rb_funcall(children,s$hx,rows))){
rb_funcall(children,s$aah,function(i){
var rect = rb_funcall(self,s$aad,i);
return rb_funcall(context,s$jy,i,function(elem){
return rb_funcall(elem,s$l,VN.$h(_$ed,[(rb_funcall(rect,s$z)),"px"].join('')));
});
});
rb_funcall((rb_funcall(rows,s$mf,children)),s$aah,function(i){
var rect = rb_funcall(self,s$aad,rb_funcall(children,s$hy,i));
return rb_funcall(context,s$b,["<div style='top:",(rb_funcall(rect,s$w)),"px;left:",(rb_funcall(rect,s$v)),"px;width:",(rb_funcall(rect,s$z)),"px;height:",(rb_funcall(rect,s$aa)),"px;'></div>"].join(''));
});
}
else if(RTEST(rb_funcall(rows,s$hx,children))){
}
else{
rb_funcall(children,s$aah,function(i){
var rect = rb_funcall(self,s$aad,i);
return rb_funcall(context,s$jy,i,function(elem){
return rb_funcall(elem,s$l,VN.$h(_$ed,[(rb_funcall(rect,s$z)),"px"].join('')));
});
});
}
});
rb_define_method(self,s$aag,function(self,_cmd,clip_rect,context){
return rb_funcall(context,s$l,VN.$h(_$hv,'white'));
});
rb_define_method(self,s$aai,function(self,_cmd,row,clip_rect,context){
var color = rb_funcall((rb_funcall(row,s$vi,10)),s$hy,150);
var children = rb_funcall(context,s$jx);
var columns = rb_funcall(self, s$zq);
if(RTEST(rb_funcall(children,s$hx,columns))){
rb_funcall((rb_funcall(columns,s$mf,children)),s$aah,function(i){
return rb_funcall(context,s$b,"<div></div>");
});
}
else if(RTEST(rb_funcall(columns,s$hx,children))){
}
else{
}
if(RTEST(rb_funcall(row,s$aaj))){
rb_funcall(context,s$l,VN.$h(_$hv,'rgb(234, 234, 234)'));
}
return rb_funcall(columns,s$aah,function(column){
var data_cell = rb_funcall(self,s$aak,column,row);
var table_column = rb_funcall(rb_ivar_get(self, i$ex),s$e,column);
if(RTEST(ANDTEST(rb_ivar_get(self, i$t),rb_funcall(rb_ivar_get(self, i$t),s$au,'table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self, i$t),s$aal,self,data_cell,table_column,row);
}
var cell_frame = rb_funcall(self,s$aam,column,row);
return rb_funcall(context,s$jy,column,function(column_context){
if(RTEST(rb_funcall(column,s$hx,children))){
rb_funcall(column_context,'first_time=',false);
}
else{
rb_funcall(column_context,'first_time=',true);
}
rb_funcall(self.$klass.$c_g_full(c$q),'current_context=',column_context);
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(data_cell,s$nj,cell_frame,self);
});
});
});
self.$def(s$aan,function(self,_cmd,row_indexes,column_indexes){
});
rb_define_method(self,s$aao,function(self,_cmd){
});
rb_define_method(self,s$aap,function(self,_cmd){
});
rb_define_method(self,s$aaq,function(self,_cmd){
});
rb_define_method(self,s$aar,function(self,_cmd){
});
rb_define_method(self,s$aas,function(self,_cmd,selector){
return self.$i_s(i$fj,selector);
});
rb_define_method(self,s$aat,function(self,_cmd){
return rb_ivar_get(self, i$fj);
});
rb_define_method(self,s$aau,function(self,_cmd,array){
return self.$i_s(i$fk,array);
});
rb_define_method(self,s$aav,function(self,_cmd){
return rb_ivar_get(self, i$fk);
});
self.$def(s$aaw,function(self,_cmd,an_image,table_column){
});
rb_define_method(self,s$aax,function(self,_cmd,table_column){
});
rb_define_method(self,s$aay,function(self,_cmd,table_column){
return self.$i_s(i$fl,table_column);
});
rb_define_method(self,s$aaz,function(self,_cmd){
return rb_ivar_get(self, i$fl);
});
rb_define_method(self,s$aba,function(self,_cmd,flag){
return self.$i_s(i$fm,flag);
});
rb_define_method(self,s$abb,function(self,_cmd){
return rb_ivar_get(self, i$fm);
});
self.$def(s$abc,function(self,_cmd,row_indexes,mouse_down_point){
});
self.$def(s$abd,function(self,_cmd,drag_rows,table_columns,drag_event,drag_image_offset){
});
self.$def(s$abe,function(self,_cmd,mask,is_local){
});
self.$def(s$abf,function(self,_cmd,row,drop_operation){
});
rb_define_method(self,s$abg,function(self,_cmd,flag){
return self.$i_s(i$fn,flag);
});
rb_define_method(self,s$abh,function(self,_cmd){
return rb_ivar_get(self, i$fn);
});
rb_define_method(self,s$abi,function(self,_cmd,flag){
return self.$i_s(i$fo,flag);
});
rb_define_method(self,s$abj,function(self,_cmd){
return rb_ivar_get(self, i$fo);
});
rb_define_method(self,s$abk,function(self,_cmd,flag){
return self.$i_s(i$fp,flag);
});
rb_define_method(self,s$abl,function(self,_cmd){
return rb_ivar_get(self, i$fp);
});
rb_define_method(self,s$abm,function(self,_cmd,sender){
});
rb_define_method(self,s$abn,function(self,_cmd,sender){
});
self.$def(s$abo,function(self,_cmd,indexes,extend_flag){
});
self.$def(s$abp,function(self,_cmd,indexes,extend_flag){
});
rb_define_method(self,s$abq,function(self,_cmd){
return rb_ivar_get(self, i$fq);
});
rb_define_method(self,s$abr,function(self,_cmd){
return rb_ivar_get(self, i$fr);
});
rb_define_method(self,s$abs,function(self,_cmd,column){
});
rb_define_method(self,s$abt,function(self,_cmd,row){
});
rb_define_method(self,s$abu,function(self,_cmd){
});
rb_define_method(self,s$abv,function(self,_cmd){
});
rb_define_method(self,s$abw,function(self,_cmd,column){
});
rb_define_method(self,s$abx,function(self,_cmd,row){
});
rb_define_method(self,s$aby,function(self,_cmd){
});
rb_define_method(self,s$abz,function(self,_cmd){
});
rb_define_method(self,s$aca,function(self,_cmd){
return rb_ivar_get(self, i$fs);
});
rb_define_method(self,s$acb,function(self,_cmd,value){
return self.$i_s(i$fs,value);
});
rb_define_method(self,s$acc,function(self,_cmd,style){
return self.$i_s(i$ft,style);
});
rb_define_method(self,s$acd,function(self,_cmd){
return rb_ivar_get(self, i$ft);
});
rb_define_method(self,s$ace,function(self,_cmd,style){
return self.$i_s(i$fu,style);
});
rb_define_method(self,s$acf,function(self,_cmd){
return rb_ivar_get(self, i$fu);
});
rb_define_method(self,s$aae,function(self,_cmd,column){
var result = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,s$hx,0),rb_funcall(column,s$hw,rb_funcall(rb_ivar_get(self, i$ex),s$nb))))){
return result;
}
var rows = rb_funcall(self, s$zr);
var i = 0;
for (i = 0; i < column; i++) {rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$v),s$hy,rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ex),s$e,i),s$z),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$z))));
}for (i = 0; i < rows; i++) {rb_funcall(result,'height=',rb_funcall(rb_funcall(result,s$aa),s$hy,rb_funcall(rb_ivar_get(self, i$eu),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$aa))));
}return result;
});
rb_define_method(self,s$aad,function(self,_cmd,row){
var result = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(row,s$hx,0),rb_funcall(row,s$hw,rb_funcall(self,s$zr))))){
return result;
}
var i = 0;
for (i = 0; i < row; i++) {rb_funcall(result,'y=',rb_funcall(rb_funcall(result,s$w),s$hy,rb_funcall(rb_ivar_get(self, i$eu),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$aa))));
}rb_funcall(result,'width=',rb_funcall(rb_ivar_get(self, i$bc),s$z));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self, i$eu),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$aa)));
return result;
});
rb_define_method(self,s$acg,function(self,_cmd,rect){
});
rb_define_method(self,s$ach,function(self,_cmd,rect){
});
rb_define_method(self,s$aci,function(self,_cmd,point){
});
rb_define_method(self,s$acj,function(self,_cmd,point){
});
self.$def(s$aam,function(self,_cmd,column,row){
var result = rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,s$hx,0),rb_funcall(column,s$yo,rb_funcall(self, s$zq))))){
return result;
}
rb_funcall(column,s$aah,function(i){
return rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$v),s$hy,rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ex),s$e,i),s$z),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$z))));
});
rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ex),s$e,column),s$z),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$z)));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self, i$eu),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$aa)));
return result;
});
self.$def(s$aak,function(self,_cmd,column,row){
var table_column = rb_funcall(rb_ivar_get(self, i$ex),s$e,column);
var cell = rb_funcall(table_column,s$ack,row);
rb_funcall(cell,'object_value=',rb_funcall(rb_ivar_get(self, i$fc),s$acl,self,table_column,row));
return cell;
});
rb_define_method(self,s$vq,function(self,_cmd,text_obj){
});
rb_define_method(self,s$vr,function(self,_cmd,text_obj){
});
rb_define_method(self,s$vs,function(self,_cmd,notification){
});
rb_define_method(self,s$vt,function(self,_cmd,notification){
});
rb_define_method(self,s$vu,function(self,_cmd,notification){
});
rb_define_method(self,s$acm,function(self,_cmd,name){
return rb_ivar_get(self, i$fv);
});
rb_define_method(self,s$acn,function(self,_cmd){
return rb_ivar_get(self, i$fv);
});
rb_define_method(self,s$aco,function(self,_cmd,save){
return rb_ivar_get(self, i$fw);
});
rb_define_method(self,s$acp,function(self,_cmd){
return rb_ivar_get(self, i$fw);
});
self.$def(s$acq,function(self,_cmd,cell,column,row){
});
rb_define_method(self,s$acr,function(self,_cmd){
return rb_ivar_get(self, i$fx);
});
rb_define_method(self,s$acs,function(self,_cmd,column){
return self.$i_s(i$fx,column);
});
self.$def(s$act,function(self,_cmd,column,row){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
rb_funcall(self,s$ah,'mouse down');
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
return rb_funcall(self,s$ah,[(rb_funcall(location,s$v)),", ",(rb_funcall(location,s$w))].join(''));
});
self.$def(s$acu,function(self,_cmd,column,row,the_event,select){
});
self.$def(s$acv,function(self,_cmd,row,clip_rect){
});
rb_define_method(self,s$acw,function(self,_cmd,clip_rect){
});
rb_define_method(self,s$acx,function(self,_cmd,clip_rect){
});
rb_define_method(self,s$acy,function(self,_cmd,clip_rect){
});
})(RClass.define_under(self,'TableView',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
