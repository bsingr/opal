(function(self) {
(function(self) {
self.$def(s$as,function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame]);
return self.$i_s(i$go,style_mask);
});
self.$def_s(s$amd,function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def_s(s$ame,function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def_s(s$amf,function(self,_cmd,title,style){
});
self.$def(s$amg,function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def(s$amh,function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),s$is,VN$(rect,s$jo),VN$(rect,s$jp),VN$(rect,s$jr),VN$(rect,s$js));
});
self.$def(s$sy,function(self,_cmd){
return 'vn-window-view';
});
self.$def(s$oa,function(self,_cmd,win){
return self.$i_s(i$ae,win);
});
self.$def(s$ly,function(self,_cmd,the_event){
self.$i_s(i$gp,VN$(the_event,s$og));
return VN$(self.$klass.$c_g_full('App'),s$nb,[_$ai,_$ab],function(the_event){
if(RTEST(VN$(VN$(the_event,s$nh),s$ai,_$ai))){
VN$(self.$klass.$c_g_full('App'),s$ng);
}
else{
var window_point = VN$(the_event,s$og);
self.$i_s(i$gq,VN$(VN$(self.$i_g(i$ae),s$uj),s$jm));
self.$i_s(i$gr,VN$(VN$(window_point,s$jo),s$fe,VN$(self.$i_g(i$gp),s$jo)));
self.$i_s(i$gs,VN$(VN$(window_point,s$jp),s$fe,VN$(self.$i_g(i$gp),s$jp)));
VN$(self.$i_g(i$ae),'frame_origin=',VN$(self.$klass.$c_g_full('Point'),s$is,VN$(VN$(self.$i_g(i$gq),s$jo),s$bl,self.$i_g(i$gr)),VN$(VN$(self.$i_g(i$gq),s$jp),s$bl,self.$i_g(i$gs))));
}
});
});
self.$def(s$vt,function(self,_cmd,context){
if(RTEST(VN$(context,s$sn))){
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(['vn-window-view'],s$ge,' '));
});
})(RClass.define_under(self,'WindowView',self.$c_g_full('View')));
})(RModule.define('Vienna'));
