(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$ev,17.0);
self.$i_s(i$ew,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,3.0,2.0));
self.$i_s(i$ex,rb_funcall((1),s$ze));
self.$i_s(i$ey,[]);
self.$i_s(i$ez,[]);
self.$i_s(i$fa,[]);
self.$i_s(i$fb,rb_funcall(self.$klass.$c_g_full(c$ap),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_ivar_get(self, i$bc),s$ac),17)));
rb_funcall(rb_ivar_get(self, i$fb),'table_view=',self);
return self.$i_s(i$fc,rb_funcall(self.$klass.$c_g_full(c$aq),s$ao,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(self.$klass.$c_g_full(c$al),s$xz),rb_funcall(self.$klass.$c_g_full(c$al),s$xz))));
});
rb_define_method(self,s$zf,function(self,_cmd,a_source){
return self.$i_s(i$fd,a_source);
});
rb_define_method(self,s$zg,function(self,_cmd){
return rb_ivar_get(self, i$fd);
});
rb_define_method(self,s$ei,function(self,_cmd,a_delegate){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$zh,function(self,_cmd,header_view){
return self.$i_s(i$fb,header_view);
});
rb_define_method(self,s$xy,function(self,_cmd){
return rb_ivar_get(self, i$fb);
});
rb_define_method(self,s$zi,function(self,_cmd,corner_view){
return self.$i_s(i$fc,corner_view);
});
rb_define_method(self,s$zj,function(self,_cmd){
return rb_ivar_get(self, i$fc);
});
rb_define_method(self,s$zk,function(self,_cmd,flag){
return self.$i_s(i$fe,flag);
});
rb_define_method(self,s$zl,function(self,_cmd){
return rb_ivar_get(self, i$fe);
});
rb_define_method(self,s$zm,function(self,_cmd,flag){
return self.$i_s(i$ff,flag);
});
rb_define_method(self,s$zn,function(self,_cmd){
return rb_ivar_get(self, i$ff);
});
rb_define_method(self,s$zo,function(self,_cmd,style){
return self.$i_s(i$fg,style);
});
rb_define_method(self,s$zp,function(self,_cmd){
return rb_ivar_get(self, i$fg);
});
rb_define_method(self,s$zq,function(self,_cmd,grid_type){
return self.$i_s(i$fh,grid_type);
});
rb_define_method(self,s$zr,function(self,_cmd){
return rb_ivar_get(self, i$fh);
});
rb_define_method(self,s$zs,function(self,_cmd,size){
return self.$i_s(i$ew,size);
});
rb_define_method(self,s$zt,function(self,_cmd){
return rb_ivar_get(self, i$ew);
});
rb_define_method(self,s$zu,function(self,_cmd,flag){
return self.$i_s(i$fi,flag);
});
rb_define_method(self,s$zv,function(self,_cmd){
return rb_ivar_get(self, i$fi);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$zw,function(self,_cmd,color){
return self.$i_s(i$fj,color);
});
rb_define_method(self,s$zx,function(self,_cmd){
return rb_ivar_get(self, i$fj);
});
rb_define_method(self,s$zy,function(self,_cmd,height){
return self.$i_s(i$ev,height);
});
rb_define_method(self,s$zz,function(self,_cmd){
return rb_ivar_get(self, i$ev);
});
rb_define_method(self,s$aaa,function(self,_cmd,index_set){
});
rb_define_method(self,s$aab,function(self,_cmd){
return rb_ivar_get(self, i$ey);
});
rb_define_method(self,s$aac,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ey),s$nb);
});
rb_define_method(self,s$aad,function(self,_cmd){
if(RTEST(rb_funcall(rb_ivar_get(self, i$ex),s$hx,0))){
if(RTEST(rb_ivar_get(self, i$fd))){
if(RTEST(rb_funcall(rb_ivar_get(self, i$fd),s$au,_$in))){
self.$i_s(i$ex,rb_funcall(rb_ivar_get(self, i$fd),s$aae,self));
}
else{
rb_funcall(self,s$ak,['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s(i$ex,0);
}
}
else{
self.$i_s(i$ex,0);
}
}
return rb_ivar_get(self, i$ex);
});
rb_define_method(self,s$aaf,function(self,_cmd,table_column){
rb_funcall(rb_ivar_get(self, i$ey),s$e,table_column);
rb_funcall(table_column,'table_view=',self);
return rb_funcall(self, s$aag);
});
rb_define_method(self,s$aah,function(self,_cmd,table_column){
});
self.$def(s$aai,function(self,_cmd,old_index,new_index){
});
rb_define_method(self,s$aaj,function(self,_cmd){
});
rb_define_method(self,s$aak,function(self,_cmd){
});
rb_define_method(self,s$wt,function(self,_cmd){
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$aal,function(self,_cmd){
});
rb_define_method(self,s$aam,function(self,_cmd,row){
});
rb_define_method(self,s$aan,function(self,_cmd,column){
});
rb_define_method(self,s$aag,function(self,_cmd){
rb_funcall(self, s$aao);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$aao,function(self,_cmd){
self.$i_s(i$ex,rb_funcall((1),s$ze));
var rows = rb_funcall(self,s$aad);
var size = rb_funcall(self.$klass.$c_g_full(c$q),s$ao,rb_funcall(rb_ivar_get(self, i$bb),s$ac),rb_funcall(rb_ivar_get(self, i$bb),s$ad));
if(RTEST(rb_funcall(rows,s$zb,0))){
rb_funcall(size,'width=',rb_funcall(rb_funcall(self,s$aap,0),s$ac));
}
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$nb),s$zb,0))){
rb_funcall(size,'height=',rb_funcall(rb_funcall(self,s$aaq,0),s$ad));
}
});
rb_define_method(self,s$my,function(self,_cmd,context){
rb_funcall(self,s$aar,context);
rb_funcall(self,s$aas,rb_ivar_get(self, i$bc),context);
return rb_funcall(rb_funcall(self, s$aad),s$aat,function(row){
return rb_funcall(context,s$jy,row,function(row_element){
return rb_funcall(self,s$aau,row,rb_ivar_get(self, i$bc),row_element);
});
});
});
rb_define_method(self,s$aar,function(self,_cmd,context){
var children = rb_funcall(context,s$jx);
var rows = rb_funcall(self, s$aad);
if(RTEST(rb_funcall(children,s$hx,rows))){
rb_funcall(children,s$aat,function(i){
var rect = rb_funcall(self,s$aap,i);
return rb_funcall(context,s$jy,i,function(elem){
return rb_funcall(elem,s$o,VN.$h(_$ef,[(rb_funcall(rect,s$ac)),"px"].join('')));
});
});
rb_funcall((rb_funcall(rows,s$mf,children)),s$aat,function(i){
var rect = rb_funcall(self,s$aap,rb_funcall(children,s$hy,i));
return rb_funcall(context,s$e,["<div style='top:",(rb_funcall(rect,s$z)),"px;left:",(rb_funcall(rect,s$y)),"px;width:",(rb_funcall(rect,s$ac)),"px;height:",(rb_funcall(rect,s$ad)),"px;'></div>"].join(''));
});
}
else if(RTEST(rb_funcall(rows,s$hx,children))){
}
else{
rb_funcall(children,s$aat,function(i){
var rect = rb_funcall(self,s$aap,i);
return rb_funcall(context,s$jy,i,function(elem){
return rb_funcall(elem,s$o,VN.$h(_$ef,[(rb_funcall(rect,s$ac)),"px"].join('')));
});
});
}
});
rb_define_method(self,s$aas,function(self,_cmd,clip_rect,context){
return rb_funcall(context,s$o,VN.$h(_$hy,'white'));
});
rb_define_method(self,s$aau,function(self,_cmd,row,clip_rect,context){
var color = rb_funcall((rb_funcall(row,s$vp,10)),s$hy,150);
var children = rb_funcall(context,s$jx);
var columns = rb_funcall(self, s$aac);
if(RTEST(rb_funcall(children,s$hx,columns))){
rb_funcall((rb_funcall(columns,s$mf,children)),s$aat,function(i){
return rb_funcall(context,s$e,"<div></div>");
});
}
else if(RTEST(rb_funcall(columns,s$hx,children))){
}
else{
}
if(RTEST(rb_funcall(row,s$aav))){
rb_funcall(context,s$o,VN.$h(_$hy,'rgb(234, 234, 234)'));
}
return rb_funcall(columns,s$aat,function(column){
var data_cell = rb_funcall(self,s$aaw,column,row);
var table_column = rb_funcall(rb_ivar_get(self, i$ey),s$h,column);
if(RTEST(ANDTEST(rb_ivar_get(self, i$t),rb_funcall(rb_ivar_get(self, i$t),s$au,'table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self, i$t),s$aax,self,data_cell,table_column,row);
}
var cell_frame = rb_funcall(self,s$aay,column,row);
return rb_funcall(context,s$jy,column,function(column_context){
if(RTEST(rb_funcall(column,s$hx,children))){
rb_funcall(column_context,'first_time=',false);
}
else{
rb_funcall(column_context,'first_time=',true);
}
rb_funcall(self.$klass.$c_g_full(c$r),'current_context=',column_context);
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(data_cell,s$nj,cell_frame,self);
});
});
});
self.$def(s$aaz,function(self,_cmd,row_indexes,column_indexes){
});
rb_define_method(self,s$aba,function(self,_cmd){
});
rb_define_method(self,s$abb,function(self,_cmd){
});
rb_define_method(self,s$abc,function(self,_cmd){
});
rb_define_method(self,s$abd,function(self,_cmd){
});
rb_define_method(self,s$abe,function(self,_cmd,selector){
return self.$i_s(i$fk,selector);
});
rb_define_method(self,s$abf,function(self,_cmd){
return rb_ivar_get(self, i$fk);
});
rb_define_method(self,s$abg,function(self,_cmd,array){
return self.$i_s(i$fl,array);
});
rb_define_method(self,s$abh,function(self,_cmd){
return rb_ivar_get(self, i$fl);
});
self.$def(s$abi,function(self,_cmd,an_image,table_column){
});
rb_define_method(self,s$abj,function(self,_cmd,table_column){
});
rb_define_method(self,s$abk,function(self,_cmd,table_column){
return self.$i_s(i$fm,table_column);
});
rb_define_method(self,s$abl,function(self,_cmd){
return rb_ivar_get(self, i$fm);
});
rb_define_method(self,s$abm,function(self,_cmd,flag){
return self.$i_s(i$fn,flag);
});
rb_define_method(self,s$abn,function(self,_cmd){
return rb_ivar_get(self, i$fn);
});
self.$def(s$abo,function(self,_cmd,row_indexes,mouse_down_point){
});
self.$def(s$abp,function(self,_cmd,drag_rows,table_columns,drag_event,drag_image_offset){
});
self.$def(s$abq,function(self,_cmd,mask,is_local){
});
self.$def(s$abr,function(self,_cmd,row,drop_operation){
});
rb_define_method(self,s$abs,function(self,_cmd,flag){
return self.$i_s(i$fo,flag);
});
rb_define_method(self,s$abt,function(self,_cmd){
return rb_ivar_get(self, i$fo);
});
rb_define_method(self,s$abu,function(self,_cmd,flag){
return self.$i_s(i$fp,flag);
});
rb_define_method(self,s$abv,function(self,_cmd){
return rb_ivar_get(self, i$fp);
});
rb_define_method(self,s$abw,function(self,_cmd,flag){
return self.$i_s(i$fq,flag);
});
rb_define_method(self,s$abx,function(self,_cmd){
return rb_ivar_get(self, i$fq);
});
rb_define_method(self,s$aby,function(self,_cmd,sender){
});
rb_define_method(self,s$abz,function(self,_cmd,sender){
});
self.$def(s$aca,function(self,_cmd,indexes,extend_flag){
});
self.$def(s$acb,function(self,_cmd,indexes,extend_flag){
});
rb_define_method(self,s$acc,function(self,_cmd){
return rb_ivar_get(self, i$fr);
});
rb_define_method(self,s$acd,function(self,_cmd){
return rb_ivar_get(self, i$fs);
});
rb_define_method(self,s$ace,function(self,_cmd,column){
});
rb_define_method(self,s$acf,function(self,_cmd,row){
});
rb_define_method(self,s$acg,function(self,_cmd){
});
rb_define_method(self,s$ach,function(self,_cmd){
});
rb_define_method(self,s$aci,function(self,_cmd,column){
});
rb_define_method(self,s$acj,function(self,_cmd,row){
});
rb_define_method(self,s$ack,function(self,_cmd){
});
rb_define_method(self,s$acl,function(self,_cmd){
});
rb_define_method(self,s$acm,function(self,_cmd){
return rb_ivar_get(self, i$ft);
});
rb_define_method(self,s$acn,function(self,_cmd,value){
return self.$i_s(i$ft,value);
});
rb_define_method(self,s$aco,function(self,_cmd,style){
return self.$i_s(i$fu,style);
});
rb_define_method(self,s$acp,function(self,_cmd){
return rb_ivar_get(self, i$fu);
});
rb_define_method(self,s$acq,function(self,_cmd,style){
return self.$i_s(i$fv,style);
});
rb_define_method(self,s$acr,function(self,_cmd){
return rb_ivar_get(self, i$fv);
});
rb_define_method(self,s$aaq,function(self,_cmd,column){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,s$hx,0),rb_funcall(column,s$hw,rb_funcall(rb_ivar_get(self, i$ey),s$nb))))){
return result;
}
var rows = rb_funcall(self, s$aad);
var i = 0;
for (i = 0; i < column; i++) {rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$h,i),s$ac),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ac))));
}for (i = 0; i < rows; i++) {rb_funcall(result,'height=',rb_funcall(rb_funcall(result,s$ad),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad))));
}return result;
});
rb_define_method(self,s$aap,function(self,_cmd,row){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(row,s$hx,0),rb_funcall(row,s$hw,rb_funcall(self,s$aad))))){
return result;
}
var i = 0;
for (i = 0; i < row; i++) {rb_funcall(result,'y=',rb_funcall(rb_funcall(result,s$z),s$hy,rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad))));
}rb_funcall(result,'width=',rb_funcall(rb_ivar_get(self, i$bc),s$ac));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad)));
return result;
});
rb_define_method(self,s$acs,function(self,_cmd,rect){
});
rb_define_method(self,s$act,function(self,_cmd,rect){
});
rb_define_method(self,s$acu,function(self,_cmd,point){
});
rb_define_method(self,s$acv,function(self,_cmd,point){
});
self.$def(s$aay,function(self,_cmd,column,row){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,s$hx,0),rb_funcall(column,s$zb,rb_funcall(self, s$aac))))){
return result;
}
rb_funcall(column,s$aat,function(i){
return rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$h,i),s$ac),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ac))));
});
rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self, i$ey),s$h,column),s$ac),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ac)));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self, i$ev),s$hy,rb_funcall(rb_ivar_get(self, i$ew),s$ad)));
return result;
});
self.$def(s$aaw,function(self,_cmd,column,row){
var table_column = rb_funcall(rb_ivar_get(self, i$ey),s$h,column);
var cell = rb_funcall(table_column,s$acw,row);
rb_funcall(cell,'object_value=',rb_funcall(rb_ivar_get(self, i$fd),s$acx,self,table_column,row));
return cell;
});
rb_define_method(self,s$wb,function(self,_cmd,text_obj){
});
rb_define_method(self,s$wc,function(self,_cmd,text_obj){
});
rb_define_method(self,s$wd,function(self,_cmd,notification){
});
rb_define_method(self,s$we,function(self,_cmd,notification){
});
rb_define_method(self,s$wf,function(self,_cmd,notification){
});
rb_define_method(self,s$acy,function(self,_cmd,name){
return rb_ivar_get(self, i$fw);
});
rb_define_method(self,s$acz,function(self,_cmd){
return rb_ivar_get(self, i$fw);
});
rb_define_method(self,s$ada,function(self,_cmd,save){
return rb_ivar_get(self, i$fx);
});
rb_define_method(self,s$adb,function(self,_cmd){
return rb_ivar_get(self, i$fx);
});
self.$def(s$adc,function(self,_cmd,cell,column,row){
});
rb_define_method(self,s$add,function(self,_cmd){
return rb_ivar_get(self, i$fy);
});
rb_define_method(self,s$ade,function(self,_cmd,column){
return self.$i_s(i$fy,column);
});
self.$def(s$adf,function(self,_cmd,column,row){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
rb_funcall(self,s$ak,'mouse down');
var location = rb_funcall(self,s$md,rb_funcall(the_event,s$fa),nil);
return rb_funcall(self,s$ak,[(rb_funcall(location,s$y)),", ",(rb_funcall(location,s$z))].join(''));
});
self.$def(s$adg,function(self,_cmd,column,row,the_event,select){
});
self.$def(s$adh,function(self,_cmd,row,clip_rect){
});
rb_define_method(self,s$adi,function(self,_cmd,clip_rect){
});
rb_define_method(self,s$adj,function(self,_cmd,clip_rect){
});
rb_define_method(self,s$adk,function(self,_cmd,clip_rect){
});
})(RClass.define_under(self,'TableView',self.$c_g_full(c$z)));
})(RModule.define('Vienna'));
