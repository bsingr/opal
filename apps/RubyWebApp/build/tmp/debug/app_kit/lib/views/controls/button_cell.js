
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/views/controls/button_cell_images.js');
(function(self) {
(function(self) {
rb_define_method(self,s$qa,function(self,_cmd,str){
rb_supcall(arguments.callee, self,_cmd,[str]);
self.$i_s(i$cx,false);
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gn);
self.$i_s(i$da,'');
self.$i_s(i$db,nil);
self.$i_s(i$dc,false);
self.$i_s(i$bu,true);
self.$i_s(i$bv,true);
self.$i_s(i$cf,_$hb);
self.$i_s(i$ci,'');
return self.$i_s(i$dd,0);
});
rb_define_method(self,s$qb,function(self,_cmd,img){
});
rb_define_method(self,s$l,function(self,_cmd){
return rb_funcall(self,s$qa,'ButtonCell');
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
rb_supcall(arguments.callee, self,_cmd,[control_tint]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hc),rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hd)))){
rb_funcall(self, s$tp);
}
});
rb_define_method(self,s$of,function(self,_cmd,size){
rb_supcall(arguments.callee, self,_cmd,[size]);
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hc),rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hd)))){
rb_funcall(self, s$tp);
}
});
rb_define_method(self,s$tp,function(self,_cmd){
var size_str = (function($v){
if(($e = rb_funcall(_$gy, '===', $v),$e!==nil && $e!==false)){
return '_SMALL';
}
else if(($e = rb_funcall(_$gz, '===', $v),$e!==nil && $e!==false)){
return '_MINI';
}
else {
return '_REGULAR';
}
})(rb_ivar_get(self, i$cm));
var tint_str = (function($v){
if(($e = rb_funcall(_$gu, '===', $v),$e!==nil && $e!==false)){
return '_GRAPHITE';
}
else if(($e = rb_funcall(_$gw, '===', $v),$e!==nil && $e!==false)){
return '_HUD';
}
else {
return '';
}
})(rb_ivar_get(self, i$cl));
if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hc))){
var img_name = ["SWITCH_IMAGE",(size_str),(tint_str)].join('');
var alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
else if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$hd))){
img_name = ["RADIO_IMAGE",(size_str),(tint_str)].join('');
alt_img_name = ["SWITCH_HIGHLIGHTED_IMAGE",(size_str),(tint_str)].join('');
}
self.$i_s(i$at,self.$klass.$c_g(img_name));
return self.$i_s(i$db,self.$klass.$c_g(alt_img_name));
});
rb_define_method(self,s$kc,function(self,_cmd){
return 'vn-button';
});
rb_define_method(self,s$qh,function(self,_cmd){
return RTEST(rb_funcall(rb_ivar_get(self, i$bt),s$tq,self.$klass.$c_g_full(c$ab))) ? rb_funcall(rb_ivar_get(self, i$bt),s$tr) : rb_ivar_get(self, i$bt);
});
rb_define_method(self,s$qi,function(self,_cmd,str){
return self.$i_s(i$bt,str);
});
rb_define_method(self,s$ts,function(self,_cmd){
return rb_ivar_get(self, i$da);
});
rb_define_method(self,s$ta,function(self,_cmd,str){
return self.$i_s(i$da,str);
});
rb_define_method(self,s$tb,function(self,_cmd){
return rb_ivar_get(self, i$db);
});
rb_define_method(self,s$tc,function(self,_cmd,img){
return self.$i_s(i$db,img);
});
rb_define_method(self,s$tt,function(self,_cmd){
return rb_ivar_get(self, i$de);
});
rb_define_method(self,s$td,function(self,_cmd,position){
return self.$i_s(i$de,position);
});
rb_define_method(self,s$tu,function(self,_cmd){
return rb_ivar_get(self, i$df);
});
rb_define_method(self,s$tv,function(self,_cmd,image_scaling){
return self.$i_s(i$df,image_scaling);
});
rb_define_method(self,s$qg,function(self,_cmd,val){
return self.$i_s(i$bs,val);
});
rb_define_method(self,s$qf,function(self,_cmd){
return rb_ivar_get(self, i$bs);
});
rb_define_method(self,s$te,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$gm);
});
rb_define_method(self,s$tf,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$gl);
});
rb_define_method(self,s$tg,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bs),s$ab,_$he);
});
rb_define_method(self,s$tw,function(self,_cmd){
return rb_ivar_get(self, i$cy);
});
rb_define_method(self,s$tx,function(self,_cmd,a_type){
return self.$i_s(i$cy,a_type);
});
rb_define_method(self,s$ty,function(self,_cmd,a_type){
return self.$i_s(i$cz,a_type);
});
rb_define_method(self,s$tz,function(self,_cmd){
return rb_ivar_get(self, i$cz);
});
rb_define_method(self,s$qe,function(self,_cmd,a_type){
self.$i_s(i$c,a_type);
return (function($v){
if(($e = rb_funcall(_$hf, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gr);
self.$i_s(i$cz,_$gn);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hg, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gr);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hh, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$go);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hc, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$go);
self.$i_s(i$cz,_$go);
self.$i_s(i$dc,true);
self.$i_s(i$de,_$fs);
rb_funcall(self, s$tp);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
return self.$i_s(i$cf,_$fs);
}
else if(($e = rb_funcall(_$hd, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$go);
self.$i_s(i$cz,_$go);
self.$i_s(i$dc,true);
self.$i_s(i$de,_$fs);
rb_funcall(self, s$tp);
self.$i_s(i$bu,false);
self.$i_s(i$bv,false);
return self.$i_s(i$cf,_$fs);
}
else if(($e = rb_funcall(_$hi, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$go);
self.$i_s(i$cz,_$gn);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hj, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gr);
self.$i_s(i$cz,_$gr);
return self.$i_s(i$dc,true);
}
else if(($e = rb_funcall(_$hk, '===', $v),$e!==nil && $e!==false)){
self.$i_s(i$cy,_$gp);
self.$i_s(i$cz,_$gn);
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
rb_define_method(self,s$th,function(self,_cmd){
return rb_ivar_get(self, i$cx);
});
rb_define_method(self,s$ti,function(self,_cmd,flag){
return self.$i_s(i$cx,flag);
});
self.$def(s$ua,function(self,_cmd,delay,interval){
});
self.$def(s$ru,function(self,_cmd,delay,interval){
});
rb_define_method(self,s$qy,function(self,_cmd){
return rb_ivar_get(self, i$ci);
});
rb_define_method(self,s$tj,function(self,_cmd,equiv){
return self.$i_s(i$ci,equiv);
});
rb_define_method(self,s$tl,function(self,_cmd,mask){
return self.$i_s(i$dd,mask);
});
rb_define_method(self,s$tk,function(self,_cmd){
return rb_ivar_get(self, i$dd);
});
rb_define_method(self,s$ub,function(self,_cmd,font){
return self.$i_s(i$dh,font);
});
rb_define_method(self,s$uc,function(self,_cmd){
return rb_ivar_get(self, i$dh);
});
self.$def(s$ud,function(self,_cmd,font_name,size){
});
rb_define_method(self,s$pr,function(self,_cmd,sender){
});
rb_define_method(self,s$on,function(self,_cmd,obj){
if(RTEST(ORTEST(NOTTEST(obj),ORTEST(rb_funcall(obj,s$ab,0),rb_funcall(obj,s$ab,_$gl))))){
obj = _$gl;
}
else{
obj = _$gm;
}
return rb_supcall(arguments.callee, self,_cmd,[obj]);
});
self.$def(s$ue,function(self,_cmd,images,frame,control_view){
});
self.$def(s$uf,function(self,_cmd,title,frame,control_view){
});
self.$def(s$ug,function(self,_cmd,frame,control_view){
});
self.$def(s$uh,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(RTEST(rb_funcall(ctx,s$jp))){
rb_funcall(ctx,s$e,"<div class='left'></div>");
rb_funcall(ctx,s$e,"<div class='middle'></div>");
rb_funcall(ctx,s$e,"<div class='right'></div>");
rb_funcall(ctx,s$e,"<div class='title'></div>");
rb_funcall(ctx,s$e,"<div class='image'></div>");
rb_funcall(ctx,'first_time=',false);
}
var class_name_array = [rb_funcall(self, s$kc),rb_funcall(self, s$kd)];
if(!RTEST(rb_funcall(self, s$ob))){
rb_funcall(class_name_array,s$e,_$fj);
}
if(RTEST(rb_funcall(self, s$qn))){
rb_funcall(class_name_array,s$e,_$hl);
if(RTEST(ANDTEST(rb_funcall(self, s$qt),rb_funcall(rb_ivar_get(self, i$cy),s$ab,_$gp)))){
rb_funcall(class_name_array,s$e,_$hm);
}
else{
}
}
return rb_funcall(ctx,'class_name=',rb_funcall(class_name_array,s$ui,' '));
});
self.$def(s$ro,function(self,_cmd,cell_frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
if(!RTEST(rb_funcall(rb_ivar_get(self, i$de),s$ab,_$gg))){
rb_funcall(self,s$uj,rb_ivar_get(self, i$bt),cell_frame,control_view);
}
if(RTEST(rb_ivar_get(self, i$at))){
if(RTEST(rb_funcall(self, s$te))){
rb_funcall(self,s$uk,rb_ivar_get(self, i$db),cell_frame,control_view);
}
else{
rb_funcall(self,s$uk,rb_ivar_get(self, i$at),cell_frame,control_view);
}
}
});
self.$def(s$uk,function(self,_cmd,image,frame,control_view){
var enabled = RTEST(rb_ivar_get(self, i$bp)) ? true : NOTTEST(rb_ivar_get(self, i$dc));
var gray_mask = rb_ivar_get(self, i$bw);
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
return rb_funcall(ctx,s$jv,'image',function(img){
return rb_funcall(image,s$jc,rb_funcall(self.$klass.$c_g_full(c$t),s$ao,0,0,rb_funcall(rb_funcall(image,s$w),s$ac),rb_funcall(rb_funcall(image,s$w),s$ad)),enabled,gray_mask);
});
});
rb_define_method(self,s$rh,function(self,_cmd,the_rect){
var result = rb_funcall(self.$klass.$c_g_full(c$t),s$ao,rb_funcall(the_rect,s$y),rb_funcall(the_rect,s$z),rb_funcall(the_rect,s$ac),rb_funcall(the_rect,s$ad));
var image_size = RTEST(rb_ivar_get(self, i$at)) ? rb_funcall(rb_ivar_get(self, i$at),s$w) : rb_funcall(self.$klass.$c_g_full(c$q),s$ao,0,0);
if(RTEST(rb_ivar_get(self, i$bu))){
rb_funcall(result,'width=',rb_funcall(rb_funcall(result,s$ac),s$mf,4));
rb_funcall(result,'height=',rb_funcall(rb_funcall(result,s$ad),s$mf,4));
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,2));
rb_funcall(result,'y=',rb_funcall(rb_funcall(result,s$z),s$hy,2));
}
(function($v){
if(($e = rb_funcall(_$fs, '===', $v),$e!==nil && $e!==false)){
rb_funcall(result,'x=',rb_funcall(rb_funcall(result,s$y),s$hy,(rb_funcall(rb_funcall(image_size,s$ac),s$hy,3))));
return rb_funcall(result,'width=',rb_funcall(rb_funcall(result,s$ac),s$mf,(rb_funcall(rb_funcall(image_size,s$ac),s$hy,3))));
}
else if(($e = rb_funcall(_$gh, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$gi, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$gj, '===', $v),$e!==nil && $e!==false)){
}
else if(($e = rb_funcall(_$gk, '===', $v),$e!==nil && $e!==false)){
}
})(rb_ivar_get(self, i$de));
return result;
});
self.$def(s$uj,function(self,_cmd,title,frame,control_view){
var ctx = rb_funcall(self.$klass.$c_g_full(c$r),s$gh);
return rb_funcall(ctx,s$jv,_$dx,function(title_div){
rb_funcall(title_div,'inner_html=',title);
return rb_funcall(title_div,'frame=',rb_funcall(self,s$rh,frame));
});
});
self.$def(s$nj,function(self,_cmd,cell_frame,control_view){
self.$i_s(i$by,control_view);
if(RTEST(rb_funcall(self, s$th))){
return ;
}
rb_funcall(self,s$uh,cell_frame,control_view);
return rb_funcall(self,s$ro,cell_frame,control_view);
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
rb_define_method(self,s$ul,function(self,_cmd){
if(RTEST(rb_funcall(rb_ivar_get(self, i$bt),s$tq,self.$c_g_full(c$ab)))){
return rb_ivar_get(self, i$bt);
}
var attributes = VN.$h();
if(RTEST(rb_ivar_get(self, i$ch))){
rb_funcall(attributes,'[]=',_$ci,rb_ivar_get(self, i$ch));
}
rb_funcall(attributes,'[]=',_$hn,(RTEST(rb_ivar_get(self, i$bp)) ? rb_funcall(self.$klass.$c_g_full(c$ac),s$um) : rb_funcall(self.$klass.$c_g_full(c$ac),s$un)));
var paragraph_style = rb_funcall(self.$klass.$c_g_full(c$ad),s$uo);
rb_funcall(paragraph_style,'line_break_mode=',rb_ivar_get(self, i$cr));
rb_funcall(paragraph_style,'alignment=',rb_ivar_get(self, i$cf));
rb_funcall(attributes,'[]=',_$ho,paragraph_style);
return rb_funcall(self.$klass.$c_g_full(c$ab),s$ao,rb_ivar_get(self, i$bt),attributes);
});
rb_define_method(self,s$up,function(self,_cmd,obj){
return self.$i_s(i$bt,obj);
});
rb_define_method(self,s$uq,function(self,_cmd){
return rb_ivar_get(self, i$di);
});
rb_define_method(self,s$ur,function(self,_cmd,obj){
return self.$i_s(i$di,obj);
});
rb_define_method(self,s$us,function(self,_cmd,bezel_style){
return self.$i_s(i$dj,bezel_style);
});
rb_define_method(self,s$ut,function(self,_cmd){
return rb_ivar_get(self, i$dj);
});
rb_define_method(self,s$uu,function(self,_cmd,a_sound){
return rb_ivar_get(self, i$dk);
});
rb_define_method(self,s$uv,function(self,_cmd){
return rb_ivar_get(self, i$dk);
});
})(RClass.define_under(self,'ButtonCell',self.$c_g_full(c$w)));
})(RModule.define('Vienna'));
