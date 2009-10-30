(function(self) {
(function(self) {
self.$def(s$as,function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
self.$def(s$sv,function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return VN$(self.$i_g(i$d),s$jh,VN.$h(_$fx,'hidden'));
});
self.$def(s$sy,function(self,_cmd){
return 'vn-clip-view';
});
self.$def(s$rw,function(self,_cmd,color){
return self.$i_s(i$ay,color);
});
self.$def(s$rx,function(self,_cmd){
return self.$i_g(i$ay);
});
self.$def(s$ady,function(self,_cmd,flag){
return self.$i_s(i$dy,flag);
});
self.$def(s$adz,function(self,_cmd){
return self.$i_g(i$dy);
});
self.$def(s$aer,function(self,_cmd,a_view){
var default_center = VN$(self.$klass.$c_g_full('NotificationCenter'),s$lk);
if(RTEST(self.$i_g(i$eu))){
VN$(default_center,s$ls,self,self.$klass.$c_g_full('VIEW_FRAME_DID_CHANGE_NOTIFICATION'),self.$i_g(i$eu));
VN$(default_center,s$ls,self,self.$klass.$c_g_full('VIEW_BOUNDS_DID_CHANGE_NOTIFICATION'),self.$i_g(i$eu));
VN$(self.$i_g(i$eu),s$tq);
}
self.$i_s(i$eu,a_view);
return VN$(self,s$tp,a_view);
});
self.$def(s$aet,function(self,_cmd){
return self.$i_g(i$eu);
});
self.$def(s$ags,function(self,_cmd){
return VN$(self.$klass.$c_g_full('Rect'),s$is,0,0,0,0);
});
self.$def(s$aex,function(self,_cmd,an_obj){
return self.$i_s(i$ef,an_obj);
});
self.$def(s$aey,function(self,_cmd){
return self.$i_g(i$ef);
});
self.$def(s$aep,function(self,_cmd){
return VN$(self,s$vf,self.$i_g(i$be),self.$i_g(i$eu));
});
self.$def(s$agt,function(self,_cmd,notification){
});
self.$def(s$agu,function(self,_cmd,notification){
});
self.$def(s$agv,function(self,_cmd,flag){
return self.$i_s(i$ev,flag);
});
self.$def(s$agw,function(self,_cmd){
return self.$i_g(i$ev);
});
self.$def(s$agx,function(self,_cmd,the_event){
return false;
});
self.$def(s$agy,function(self,_cmd,new_origin){
return new_origin;
});
self.$def(s$agz,function(self,_cmd,new_origin){
if(RTEST(VN$(VN$(self.$i_g(i$bf),s$br),s$fh,0))){
VN$(VN$(self.$i_g(i$bf),s$bo,0),'frame_origin=',VN$(self.$klass.$c_g_full('Point'),s$is,VN$((0),s$fe,VN$(new_origin,s$jo)),VN$((0),s$fe,VN$(new_origin,s$jp))));
}
});
self.$def(s$aha,function(self,_cmd,x,y){
return VN$(self,s$agz,VN$(self.$klass.$c_g_full('Point'),s$is,x,y));
});
})(RClass.define_under(self,'ClipView',self.$c_g_full('View')));
(function(self) {
self.$def(s$aes,function(self,_cmd,a_clip_view){
});
self.$def(s$ahb,function(self,_cmd,a_clip_view,a_point){
});
})(RClass.define_under(self,'View',self.$c_g_full('Responder')));
})(RModule.define('Vienna'));
