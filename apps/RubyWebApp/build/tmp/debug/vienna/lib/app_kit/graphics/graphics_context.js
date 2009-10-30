(function(self) {
(function(self) {
self.$def(s$as,function(self,_cmd,graphics_port,flip_state){
self.$i_s(i$aj,graphics_port);
return self.$i_s(i$ak,flip_state);
});
self.$def(s$pk,function(self,_cmd){
return self.$i_g(i$aj);
});
self.$def(s$pl,function(self,_cmd,graphics_port){
return self.$i_s(i$aj,graphics_port);
});
self.$def(s$pm,function(self,_cmd){
return self.$i_g(i$ak);
});
self.$def_s(s$pn,function(self,_cmd){
return self.$k_g('@@current_context');
});
self.$def_s(s$po,function(self,_cmd,context){
return self.$k_s('@@current_context',context);
});
self.$def(s$pp,function(self,_cmd){
});
self.$def(s$pq,function(self,_cmd){
});
self.$def(s$pr,function(self,_cmd,width){
self.$i_g(i$aj).lineWidth = width});
self.$def(s$ps,function(self,_cmd,cap){
self.$i_g(i$aj).lineCap = cap});
self.$def(s$pt,function(self,_cmd,join){
self.$i_g(i$aj).lineJoin = join});
self.$def(s$pu,function(self,_cmd,limit){
self.$i_g(i$aj).miterLimit = limit});
self.$def(s$pv,function(self,_cmd,alpha){
self.$i_g(i$aj).globalAlpha = alpha});
self.$def(s$pw,function(self,_cmd){
self.$i_g(i$aj).beginPath()});
self.$def(s$px,function(self,_cmd,point){
self.$i_g(i$aj).moveTo(VN$(point,s$jo),VN$(point,s$jp))});
self.$def(s$py,function(self,_cmd,point){
self.$i_g(i$aj).lineTo(VN$(point,s$jo),VN$(point,s$jp))});
self.$def(s$pz,function(self,_cmd,cp1,cp2,point){
self.$i_g(i$aj).bezierCurveTo(VN$(cp1,s$jo),VN$(cp1,s$jp),VN$(cp2,s$jo),VN$(cp2,s$jp),VN$(point,s$jo),VN$(point,s$jp))});
self.$def(s$qa,function(self,_cmd,points){
});
self.$def(s$qb,function(self,_cmd,sx,sy){
});
self.$def(s$qc,function(self,_cmd,tx,ty){
});
self.$def(s$qd,function(self,_cmd,angle){
});
self.$def(s$qe,function(self,_cmd,transform){
});
self.$def(s$qf,function(self,_cmd){
});
self.$def(s$qg,function(self,_cmd,rect){
});
self.$def(s$qh,function(self,_cmd,point,radius,start_angle,end_angle,clock_wise){
});
self.$def(s$qi,function(self,_cmd,point1,point2,radius){
});
self.$def(s$qj,function(self,_cmd,path){
});
self.$def(s$qk,function(self,_cmd){
});
self.$def(s$ql,function(self,_cmd){
});
self.$def(s$qm,function(self,_cmd){
});
self.$def(s$qn,function(self,_cmd,point){
});
})(RClass.define_under(self,'GraphicsContext',cObject));
})(RModule.define('Vienna'));
