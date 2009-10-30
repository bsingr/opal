(function(self) {
(function(self) {
self.$def(s$as,function(self,_cmd,x,y,w,h){
self.$i_s(i$al,VN$(self.$klass.$c_g_full('Point'),s$is,x,y));
return self.$i_s(i$am,VN$(self.$klass.$c_g_full('Size'),s$is,w,h));
});
self.$def(s$qo,function(self,_cmd){
return self;
});
self.$def(s$bs,function(self,_cmd){
return self.$i_g(i$am);
});
self.$def(s$jq,function(self,_cmd,size){
return self.$i_s(i$am,size);
});
self.$def(s$jm,function(self,_cmd){
return self.$i_g(i$al);
});
self.$def(s$jn,function(self,_cmd,point){
return self.$i_s(i$al,point);
});
self.$def(s$jo,function(self,_cmd){
return VN$(self.$i_g(i$al),s$jo);
});
self.$def(s$jp,function(self,_cmd){
return VN$(self.$i_g(i$al),s$jp);
});
self.$def(s$jr,function(self,_cmd){
return VN$(self.$i_g(i$am),s$jr);
});
self.$def(s$js,function(self,_cmd){
return VN$(self.$i_g(i$am),s$js);
});
self.$def(s$qp,function(self,_cmd,x){
return VN$(self.$i_g(i$al),'x=',x);
});
self.$def(s$qq,function(self,_cmd,y){
return VN$(self.$i_g(i$al),'y=',y);
});
self.$def(s$qr,function(self,_cmd,w){
return VN$(self.$i_g(i$am),'width=',w);
});
self.$def(s$qs,function(self,_cmd,h){
return VN$(self.$i_g(i$am),'height=',h);
});
self.$def(s$fq,function(self,_cmd){
return [VN$(self, s$jo),VN$(self, s$jp),VN$(self, s$qt),VN$(self, s$qu)];
});
self.$def(s$df,function(self,_cmd){
});
self.$def(s$qv,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
return ["{{",(VN$(self, s$jo)),", ",(VN$(self, s$jp)),"}, {",(VN$(self, s$jr)),", ",(VN$(self, s$js)),"}}"].join('');
});
self.$def(s$s,function(self,_cmd){
});
self.$def(s$e,function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g(i$am),s$e,VN$(other,s$bs)),VN$(self.$i_g(i$al),s$e,VN$(other,s$jm)));
});
})(RClass.define_under(self,'Rect',cObject));
(function(self) {
self.$def(s$as,function(self,_cmd,x,y){
self.$i_s(i$an,x);
return self.$i_s(i$ao,y);
});
self.$def(s$qw,function(self,_cmd){
return self;
});
self.$def(s$jo,function(self,_cmd){
return self.$i_g(i$an);
});
self.$def(s$qp,function(self,_cmd,x){
return self.$i_s(i$an,x);
});
self.$def(s$jp,function(self,_cmd){
return self.$i_g(i$ao);
});
self.$def(s$qq,function(self,_cmd,y){
return self.$i_s(i$ao,y);
});
self.$def(s$e,function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g(i$an),s$ai,VN$(other,s$jo)),VN$(self.$i_g(i$ao),s$ai,VN$(other,s$jp)));
});
self.$def(s$qx,function(self,_cmd,a_rect){
return ANDTEST(VN$(VN$(self, s$jo),s$fi,VN$(a_rect,s$jo)),ANDTEST(VN$(VN$(self, s$jp),s$fi,VN$(a_rect,s$jp)),ANDTEST(VN$(VN$(self, s$jo),s$fj,VN$(VN$(a_rect,s$jo),s$bl,VN$(a_rect,s$jr))),VN$(VN$(self, s$jp),s$fj,VN$(VN$(a_rect,s$jp),s$bl,VN$(a_rect,s$js))))));
});
})(RClass.define_under(self,'Point',cObject));
(function(self) {
self.$def(s$as,function(self,_cmd,w,h){
self.$i_s(i$ap,w);
return self.$i_s(i$aq,h);
});
self.$def(s$qy,function(self,_cmd){
return self;
});
self.$def(s$jr,function(self,_cmd){
return self.$i_g(i$ap);
});
self.$def(s$qr,function(self,_cmd,w){
return self.$i_s(i$ap,w);
});
self.$def(s$js,function(self,_cmd){
return self.$i_g(i$aq);
});
self.$def(s$qs,function(self,_cmd,h){
return self.$i_s(i$aq,h);
});
self.$def(s$e,function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g(i$ap),s$ai,VN$(other,s$jr)),VN$(self.$i_g(i$aq),s$ai,VN$(other,s$js)));
});
})(RClass.define_under(self,'Size',cObject));
})(RModule.define('Vienna'));
