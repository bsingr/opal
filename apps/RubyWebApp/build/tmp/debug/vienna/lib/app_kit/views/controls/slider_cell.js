(function(self) {
(function(self) {
self.$c_s('TRACK_PADDING',2.0);
self.$c_s('KNOB_PADDING_REGULAR',9.5);
self.$c_s('KNOB_PADDING_SMALL',8);
self.$c_s('KNOB_PADDING_MINI',6.5);
self.$def_s(s$yo,function(self,_cmd){
return true;
});
self.$def(s$as,function(self,_cmd){
return VN$sup(arguments.callee, self,_cmd,[]);
});
self.$def(s$sy,function(self,_cmd){
return 'vn-slider';
});
self.$def(s$wc,function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full(c$r),s$pn);
if(RTEST(VN$(ctx,s$sn))){
VN$(ctx,s$cv,"<div class='track-left'></div>");
VN$(ctx,s$cv,"<div class='track-middle'></div>");
VN$(ctx,s$cv,"<div class='track-right'></div>");
VN$(ctx,s$cv,"<div class='knob'></div>");
VN$(ctx,'first_time=',false);
}
VN$(ctx,'class_name=',VN$(self, s$sy));
return VN$(ctx,s$sr,_$hr,function(knob){
var min = 0;
var max = 100;
var value = 0;
var knob_position = VN$((VN$(value,s$ff,(VN$(max,s$fe,min)))),s$bm,((VN$(VN$(cell_frame,s$jr),s$fe,(VN$((2),s$bm,self.$klass.$c_g_full(c$ae)))))));
return VN$(knob,s$jh,VN.$h(_$fq,[(knob_position),"px"].join('')));
});
});
self.$def(s$ade,function(self,_cmd){
return self.$i_g(i$do);
});
self.$def(s$adf,function(self,_cmd,a_double){
return self.$i_s(i$do,a_double);
});
self.$def(s$adg,function(self,_cmd){
return self.$i_g(i$dp);
});
self.$def(s$adh,function(self,_cmd,a_double){
return self.$i_s(i$dp,a_double);
});
self.$def(s$adi,function(self,_cmd,inc_value){
return self.$i_s(i$dq,inc_value);
});
self.$def(s$adj,function(self,_cmd){
return self.$i_g(i$dq);
});
self.$def(s$adn,function(self,_cmd){
return false;
});
self.$def(s$adk,function(self,_cmd,color){
return self.$i_s(i$dr,color);
});
self.$def(s$adl,function(self,_cmd,font){
return self.$i_s(i$ds,font);
});
self.$def(s$yx,function(self,_cmd,str){
return self.$i_s(i$bv,str);
});
self.$def(s$adm,function(self,_cmd,a_float){
return self.$i_s(i$dt,a_float);
});
self.$def(s$rs,function(self,_cmd,img){
return self.$i_s(i$av,img);
});
self.$def(s$ado,function(self,_cmd,count){
return self.$i_s(i$dv,count);
});
self.$def(s$adp,function(self,_cmd,pos){
return self.$i_s(i$dw,pos);
});
self.$def(s$adq,function(self,_cmd,flag){
return self.$i_s(i$dx,flag);
});
self.$def(s$adr,function(self,_cmd){
return self.$i_g(i$dx);
});
self.$def(s$ads,function(self,_cmd,index){
});
self.$def(s$adt,function(self,_cmd,index){
});
self.$def(s$adu,function(self,_cmd,point){
});
self.$def(s$adv,function(self,_cmd,value){
});
self.$def(s$aak,function(self,_cmd,start_point,control_view){
VN$(self,s$aaf,true,nil,control_view);
return true;
});
self.$def(s$aal,function(self,_cmd,last_point,current_point,control_view){
return true;
});
self.$def(s$aam,function(self,_cmd,last_point,stop_point,control_view,flag){
return VN$(self,s$aaf,false,nil,control_view);
});
})(RClass.define_under(self,'SliderCell',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
