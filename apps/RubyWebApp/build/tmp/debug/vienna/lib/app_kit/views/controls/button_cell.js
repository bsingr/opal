
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/app_kit/views/controls/button_cell_images.js');
(function(self) {
(function(self) {
rb_define_method(self,s$py,function(self,_cmd,str){
rb_supcall(arguments.callee, self,_cmd,[str]);
self.$i_s(i$cx,false);
self.$i_s(i$cy,_$gn);
self.$i_s(i$cz,_$gl);
self.$i_s(i$da,'');
self.$i_s(i$db,nil);
self.$i_s(i$dc,false);
self.$i_s(i$bu,true);
self.$i_s(i$bv,true);
self.$i_s(i$cf,_$gz);
self.$i_s(i$ci,'');
return self.$i_s(i$dd,0);
});
rb_define_method(self,s$pz,function(self,_cmd,img){
});
rb_define_method(self,s$i,function(self,_cmd){
return rb_funcall(self,s$py,'ButtonCell');
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
rb_supcall(arguments.callee, self,_cmd,[control_tint]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$c),s$y,_$ha),rb_funcall(rb_ivar_get(self, i$c),s$y,_$hb)))){
rb_funcall(self, s$tm);
}
});
rb_define_method(self,s$of,function(self,_cmd,size){
rb_supcall(arguments.callee, self,_cmd,[size]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$c),s$y,_$ha),rb_funcall(rb_ivar_get(self, i$c),s$y,_$hb)))){
rb_funcall(self, s$tm);
}
});
rb_define_method(self,s$tm,function(self,_cmd){
var size_str = (function($v){
if(($e = rb_funcall(_$gw, '===', $v),$e!==nil && $e!==false)){
return '_SMALL';
}
else if(($e = rb_funcall(_$gx, '===', $v),$e!==nil && $e!==false)){
return '_MINI';
}
else {
return '_REGULAR';
}
})(rb_ivar_get(self, i$cm));
var tint_str = (function($v){
if(($e = rb_funcall(_$gs, '===', $v),$e!==nil && $e!==false)){
return '_GRAPHITE';
}
else if(($e = rb_funcall(_$gu, '===', $v),$e!==nil && $e!==false)){
return '_HUD';
}
else {
return '';
}
})(rb_ivar_get(self, i$cl));
if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$y,_$ha))){
var img_name = ["SWITCH_IMAGE",(size_str),(tint_str)].join('');
var alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
else if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$y,_$hb))){
img_name = ["RADIO_IMAGE",(size_str),(tint_str)].join('');
alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
self.$i_s(i$at,self.$klass.$c_g(img_name));
return self.$i_s(i$db,self.$klass.$c_g(alt_img_name));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-button';
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qg,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$tn,function(self,_cmd){
return rb_ivar_get(self, i$da);
});
rb_define_method(self,s$to,function(self,_cmd,str){
return self.$i_s(i$da,str);
});
rb_define_method(self,s$sy,function(self,_cmd){
return rb_ivar_get(self, i$db);
});
rb_define_method(self,s$sz,function(self,_cmd,img){
return self.$i_s(i$db,img);
});
rb_define_method(self,s$tp,function(self,_cmd){
return rb_ivar_get(self, i$de);
});
rb_define_method(self,s$ta,function(self,_cmd,position){
return self.$i_s(i$de,position);
});
rb_define_method(self,s$tq,function(self,_cmd){
return rb_ivar_get(self, i$df);
});
rb_define_method(self,s$tr,function(self,_cmd,image_scaling){
return self.$i_s(i$df,image_scaling);
});
rb_define_method(self,s$qe,function(self,_cmd,val){
return self.$i_s(i$bs,val);
});
rb_define_method(self,s$qd,function(self,_cmd){
return rb_ivar_get(self, i$bs);
});
rb_define_method(self,s$tb,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$y,_$gk);
});
rb_define_method(self,s$tc,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$y,_$gj);
});
rb_define_method(self,s$td,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$y,_$hc);
});
rb_define_method(self,s$ts,function(self,_cmd){
return rb_ivar_get(self, i$cy);
});
rb_define_method(self,s$tt,function(self,_cmd,a_type){
return self.$i_s(i$cy,a_type);
});
rb_define_method(self,s$tu,function(self,_cmd,a_type){
return self.$i_s(i$cz,a_type);
});
rb_define_method(self,s$tv,function(self,_cmd){
return rb_ivar_get(self, i$cz);
});
rb_define_method(self,s$qc,function(self,_cmd,a_type){
self.$i_s(i$c,a_type);
return (function($v){
if(($e = rb_funcall(_$hd, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gl);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$he, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gn);
self.$i_s(i$cz,_$gp);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hf, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gn);
self.$i_s(i$cz,_$gm);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$ha, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gm);
self.$i_s(i$cz,_$gm);
self.$i_s(i$dc,true);
self.$i_s(i$de,_$fq);
rb_funcall(self, s$tm);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
return self.$i_s(i$cf,_$fq);
}
else if(($e = rb_funcall(_$hb, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gm);
self.$i_s(i$cz,_$gm);
self.$i_s(i$dc,true);
self.$i_s(i$de,_$fq);
rb_funcall(self, s$tm);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
return self.$i_s(i$cf,_$fq);
}
else if(($e = rb_funcall(_$hg, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gm);
self.$i_s(i$cz,_$gl);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hh, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gp);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hi, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gn);
self.$i_s(i$cz,_$gl);
return self.$i_s(i$dc,true);
}
})(a_type);
});
rb_define_method(self,s$eb,function(self,_cmd){
return rb_ivar_get(self, i$c);
});
rb_define_method(self,s$mc,function(self,_cmd){
return rb_ivar_get(self, i$dg);
});
rb_define_method(self,s$ok,function(self,_cmd,font_obj){
return self.$i_s(i$ch,font_obj);
});
rb_define_method(self,s$te,function(self,_cmd){
return rb_ivar_get(self, i$cx);
});
rb_define_method(self,s$tf,function(self,_cmd,flag){
return self.$i_s(i$cx,flag);
});
self.$def(s$tw,function(self,_cmd,delay,interval){
});
self.$def(s$rr,function(self,_cmd,delay,interval){
});
rb_define_method(self,s$qw,function(self,_cmd){
return rb_ivar_get(self, i$ci);
});
rb_define_method(self,s$tg,function(self,_cmd,equiv){
return self.$i_s(i$ci,equiv);
});
rb_define_method(self,s$ti,function(self,_cmd,mask){
return self.$i_s(i$dd,mask);
});
rb_define_method(self,s$th,function(self,_cmd){
return rb_ivar_get(self, i$dd);
});
rb_define_method(self,s$tx,function(self,_cmd,font){
return self.$i_s(i$dh,font);
});
rb_define_method(self,s$ty,function(self,_cmd){
return rb_ivar_get(self, i$dh);
});
self.$def(s$tz,function(self,_cmd,font_name,size){
});
rb_define_method(self,s$pp,function(self,_cmd,sender){
});
rb_define_method(self,s$on,function(self,_cmd,obj){
if(RTEST(ORTEST(NOTTEST(obj),ORTEST(rb_funcall(obj,s$y,0),rb_funcall(obj,s$y,_$gj))))){
obj = _$gj;
}
else{
obj = _$gk;
}
return rb_supcall(arguments.callee, self,_cmd,[obj]);
});
self.$def(s$ua,function(self,_cmd,images,frame,control_view){
});
self.$def(s$ub,function(self,_cmd,title,frame,control_view){
});
self.$def(s$uc,function(self,_cmd,frame,control_view){
});
self.$def(s$ud,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$q),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$b,"<div class='left'></div>");
rb_funcall(ctx,s$b,"<div class='middle'></div>");
rb_funcall(ctx,s$b,"<div class='right'></div>");
rb_funcall(ctx,s$b,"<div class='title'></div>");
rb_funcall(ctx,s$b,"<div class='image'></div>");
rb_funcall(ctx,'first_time=',false);
}
var class_name_array = [rb_funcall(self, s$kc),rb_funcall(self, s$kd)];
if(!RTEST(rb_funcall(self, s$ob))){
rb_funcall(class_name_array,s$b,_$fh);
}
if(RTEST(rb_funcall(self, s$ql))){
rb_funcall(class_name_array,s$b,_$hj);
if(RTEST(ANDTEST(rb_funcall(self, s$qr),rb_funcall(rb_ivar_get(self, i$cy),s$y,_$gn)))){
rb_funcall(class_name_array,s$b,_$hk);
}
else{
}
}
return rb_funcall(ctx,'class_name=',rb_funcall(class_name_array,s$ue,' '));
});
self.$def(s$rl,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$q),s$gh);
if(!RTEST(rb_funcall(rb_funcall(self, s$tp),s$y,_$ge))){
rb_funcall(ctx,s$jv,'title',function(title){
rb_funcall(title,'inner_html=',rb_ivar_get(self, i$bt));
return rb_funcall(title,s$l,VN.$h(_$hl,rb_funcall(self, s$oh)));
});
}
if(RTEST(rb_ivar_get(self, i$at))){
if(RTEST(rb_funcall(self, s$tb))){
rb_funcall(self,s$uf,rb_ivar_get(self, i$db),cell_frame,control_view);
}
else{
rb_funcall(self,s$uf,rb_ivar_get(self, i$at),cell_frame,control_view);
}
}
});
self.$def(s$uf,function(self,_cmd,image,frame,control_view){
var enabled = rb_ivar_get(self, i$bp) ? true : NOTTEST(rb_ivar_get(self, i$dc));
var gray_mask = rb_ivar_get(self, i$bw);
var ctx = rb_funcall(self.$klass.$c_g_full(c$q),s$gh);
return rb_funcall(ctx,s$jv,'image',function(img){
return rb_funcall(image,s$jc,rb_funcall(self.$klass.$c_g_full(c$s),s$al,0,0,rb_funcall(rb_funcall(image,s$t),s$z),rb_funcall(rb_funcall(image,s$t),s$aa)),enabled,gray_mask);
});
});
self.$def(s$ug,function(self,_cmd,title,frame,control_view){
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
self.$i_s(i$by,control_view);
if(RTEST(rb_funcall(self, s$te))){
return ;
}
rb_funcall(self,s$ud,cell_frame,control_view);
return rb_funcall(self,s$rl,cell_frame,control_view);
});
rb_define_method(self,s$dc,function(self,_cmd,the_event){
});
rb_define_method(self,s$dd,function(self,_cmd,the_event){
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$uh,function(self,_cmd){
return rb_ivar_get(self, i$di);
});
rb_define_method(self,s$ui,function(self,_cmd,obj){
return self.$i_s(i$di,obj);
});
rb_define_method(self,s$uj,function(self,_cmd){
return rb_ivar_get(self, i$dj);
});
rb_define_method(self,s$uk,function(self,_cmd,obj){
return self.$i_s(i$dj,obj);
});
rb_define_method(self,s$ul,function(self,_cmd,bezel_style){
return self.$i_s(i$dk,bezel_style);
});
rb_define_method(self,s$um,function(self,_cmd){
return rb_ivar_get(self, i$dk);
});
rb_define_method(self,s$un,function(self,_cmd,a_sound){
return rb_ivar_get(self, i$dl);
});
rb_define_method(self,s$uo,function(self,_cmd){
return rb_ivar_get(self, i$dl);
});
})(RClass.define_under(self,'ButtonCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));
