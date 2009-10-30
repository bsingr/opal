(function(self) {
(function(self) {
self.$def_s(s$aen,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
self.$def_s(s$aeo,function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
self.$def(s$as,function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$ed,VN$(self.$klass.$c_g_full('ClipView'),s$is,VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,100,100)));
self.$i_s(i$ee,_$gl);
return VN$(self,s$tp,self.$i_g(i$ed));
});
self.$def(s$sy,function(self,_cmd){
return 'vn-scroll-view';
});
self.$def(s$vt,function(self,_cmd,context){
return VN$(context,s$jh,VN.$h(_$hv,'rgb(190, 190, 190)'));
});
self.$def(s$aep,function(self,_cmd){
});
self.$def(s$aeq,function(self,_cmd){
});
self.$def(s$aer,function(self,_cmd,a_view){
VN$(self.$i_g(i$ed),'document_view=',a_view);
return VN$(self,s$aes,self.$i_g(i$ed));
});
self.$def(s$aet,function(self,_cmd){
return VN$(self.$i_g(i$ed),s$aet);
});
self.$def(s$aeu,function(self,_cmd,content_view){
VN$(self.$i_g(i$ed),s$tq);
self.$i_s(i$ed,content_view);
VN$(self,s$tp,self.$i_g(i$ed));
return VN$(self, s$aev);
});
self.$def(s$aew,function(self,_cmd){
return self.$i_g(i$ed);
});
self.$def(s$aex,function(self,_cmd,an_obj){
return self.$i_s(i$ef,an_obj);
});
self.$def(s$aey,function(self,_cmd){
return self.$i_g(i$ef);
});
self.$def(s$aez,function(self,_cmd,a_type){
return self.$i_s(i$ee,a_type);
});
self.$def(s$afa,function(self,_cmd){
return self.$i_g(i$ee);
});
self.$def(s$rw,function(self,_cmd,a_color){
return self.$i_s(i$ay,a_color);
});
self.$def(s$rx,function(self,_cmd){
return self.$i_g(i$ay);
});
self.$def(s$ady,function(self,_cmd,flag){
return self.$i_s(i$dy,flag);
});
self.$def(s$afb,function(self,_cmd){
return self.$i_g(i$dy);
});
self.$def(s$afc,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(self.$i_g(i$eg))){
self.$i_s(i$eg,true);
if(!RTEST(self.$i_g(i$eh))){
self.$i_s(i$eh,VN$(self.$klass.$c_g_full('Scroller'),s$is,VN$(self.$klass.$c_g_full('Rect'),s$is,150,40,40,15)));
VN$(self.$i_g(i$eh),'target=',self);
VN$(self.$i_g(i$eh),'action=',_$hw);
}
VN$(self,s$tp,self.$i_g(i$eh));
}
}
else{
if(RTEST(self.$i_g(i$eg))){
self.$i_s(i$eg,false);
VN$(self.$i_g(i$eh),s$tq);
}
}
return VN$(self, s$aev);
});
self.$def(s$afd,function(self,_cmd){
return self.$i_g(i$eg);
});
self.$def(s$afe,function(self,_cmd,flag){
if(RTEST(flag)){
if(!RTEST(self.$i_g(i$ei))){
self.$i_s(i$ei,true);
if(!RTEST(self.$i_g(i$ej))){
self.$i_s(i$ej,VN$(self.$klass.$c_g_full('Scroller'),s$is,VN$(self.$klass.$c_g_full('Rect'),s$is,150,20,40,15)));
VN$(self.$i_g(i$ej),'target=',self);
VN$(self.$i_g(i$ej),'action=',_$hx);
}
VN$(self,s$tp,self.$i_g(i$ej));
}
}
else{
if(RTEST(self.$i_g(i$ei))){
self.$i_s(i$ei,false);
VN$(self.$i_g(i$ej),s$tq);
}
}
return VN$(self, s$aev);
});
self.$def(s$aff,function(self,_cmd){
return self.$i_g(i$ei);
});
self.$def(s$afg,function(self,_cmd,a_scroller){
return self.$i_s(i$eh,a_scroller);
});
self.$def(s$afh,function(self,_cmd){
return self.$i_g(i$eh);
});
self.$def(s$afi,function(self,_cmd,a_scroller){
return self.$i_s(i$ej,a_scroller);
});
self.$def(s$afj,function(self,_cmd){
return self.$i_g(i$ej);
});
self.$def(s$afk,function(self,_cmd){
return self.$i_g(i$ek);
});
self.$def(s$afl,function(self,_cmd,flag){
return self.$i_s(i$ek,flag);
});
self.$def(s$afm,function(self,_cmd,value){
return self.$i_s(i$el,value);
});
self.$def(s$afn,function(self,_cmd){
return self.$i_g(i$el);
});
self.$def(s$afo,function(self,_cmd,value){
return self.$i_s(i$em,value);
});
self.$def(s$afp,function(self,_cmd){
return self.$i_g(i$em);
});
self.$def(s$afq,function(self,_cmd,value){
return self.$i_s(i$en,value);
});
self.$def(s$afr,function(self,_cmd){
return self.$i_g(i$en);
});
self.$def(s$afs,function(self,_cmd,value){
return self.$i_s(i$eo,value);
});
self.$def(s$aft,function(self,_cmd){
return self.$i_g(i$eo);
});
self.$def(s$afu,function(self,_cmd,value){
return self.$i_s(i$ep,value);
});
self.$def(s$afv,function(self,_cmd){
return self.$i_g(i$ep);
});
self.$def(s$afw,function(self,_cmd,value){
return self.$i_s(i$eq,value);
});
self.$def(s$afx,function(self,_cmd){
return self.$i_g(i$eq);
});
self.$def(s$afy,function(self,_cmd,flag){
return self.$i_s(i$er,flag);
});
self.$def(s$afz,function(self,_cmd){
return self.$i_g(i$er);
});
self.$def(s$aev,function(self,_cmd){
var bounds = VN$(self.$klass.$c_g_full('Rect'),s$is,1,1,VN$(VN$(self.$i_g(i$be),s$jr),s$fe,2),VN$(VN$(self.$i_g(i$be),s$js),s$fe,2));
if(RTEST(self.$i_g(i$eg))){
var frame = VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,0,0);
VN$(frame,'x=',VN$((VN$(VN$(bounds,s$jo),s$bl,VN$(bounds,s$jr))),s$fe,VN$(self.$klass.$c_g_full('Scroller'),s$aga)));
VN$(frame,'y=',VN$(bounds,s$jp));
VN$(frame,'width=',VN$(self.$klass.$c_g_full('Scroller'),s$aga));
VN$(frame,'height=',VN$(bounds,s$js));
if(RTEST(self.$i_g(i$ei))){
VN$(frame,'height=',VN$(VN$(frame,s$js),s$fe,VN$(self.$klass.$c_g_full('Scroller'),s$aga)));
}
VN$(self.$i_g(i$eh),'frame=',frame);
}
if(RTEST(self.$i_g(i$ei))){
frame = VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,0,0);
VN$(frame,'y=',VN$((VN$(VN$(bounds,s$jp),s$bl,VN$(bounds,s$js))),s$fe,VN$(self.$klass.$c_g_full('Scroller'),s$aga)));
VN$(frame,'x=',VN$(bounds,s$jo));
VN$(frame,'width=',VN$(bounds,s$jr));
VN$(frame,'height=',VN$(self.$klass.$c_g_full('Scroller'),s$aga));
if(RTEST(self.$i_g(i$eg))){
VN$(frame,'width=',VN$(VN$(frame,s$jr),s$fe,VN$(self.$klass.$c_g_full('Scroller'),s$aga)));
}
VN$(self.$i_g(i$ej),'frame=',frame);
}
if(RTEST(self.$i_g(i$ed))){
frame = VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,0,0);
VN$(frame,'x=',VN$(bounds,s$jo));
VN$(frame,'y=',VN$(bounds,s$jp));
VN$(frame,'width=',VN$(bounds,s$jr));
if(RTEST(self.$i_g(i$eg))){
VN$(frame,'width=',VN$(VN$(frame,s$jr),s$fe,VN$(self.$klass.$c_g_full('Scroller'),s$aga)));
}
VN$(frame,'height=',VN$(bounds,s$js));
if(RTEST(self.$i_g(i$ei))){
VN$(frame,'height=',VN$(VN$(frame,s$js),s$fe,VN$(self.$klass.$c_g_full('Scroller'),s$aga)));
}
VN$(self.$i_g(i$ed),'frame=',frame);
}
});
self.$def(s$aes,function(self,_cmd,clip_view){
});
self.$def(s$mg,function(self,_cmd,the_event){
});
})(RClass.define_under(self,'ScrollView',self.$c_g_full('View')));
})(RModule.define('Vienna'));
