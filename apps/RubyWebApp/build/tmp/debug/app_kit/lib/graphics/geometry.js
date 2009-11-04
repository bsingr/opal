(function(self) {
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,x,y,w,h){
self.$i_s(i$aj,rb_funcall(self.$klass.$c_g_full(c$p),s$ao,x,y));
return self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$q),s$ao,w,h));
});
rb_define_method(self,s$hi,function(self,_cmd){
return self;
});
rb_define_method(self,s$w,function(self,_cmd){
return rb_ivar_get(self, i$ak);
});
rb_define_method(self,s$aa,function(self,_cmd,size){
return self.$i_s(i$ak,size);
});
rb_define_method(self,s$v,function(self,_cmd){
return rb_ivar_get(self, i$aj);
});
rb_define_method(self,s$x,function(self,_cmd,point){
return self.$i_s(i$aj,point);
});
rb_define_method(self,s$y,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$aj),s$y);
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$aj),s$z);
});
rb_define_method(self,s$ac,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ak),s$ac);
});
rb_define_method(self,s$ad,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ak),s$ad);
});
rb_define_method(self,s$hj,function(self,_cmd,x){
return rb_funcall(rb_ivar_get(self, i$aj),'x=',x);
});
rb_define_method(self,s$hk,function(self,_cmd,y){
return rb_funcall(rb_ivar_get(self, i$aj),'y=',y);
});
rb_define_method(self,s$hl,function(self,_cmd,w){
return rb_funcall(rb_ivar_get(self, i$ak),'width=',w);
});
rb_define_method(self,s$hm,function(self,_cmd,h){
return rb_funcall(rb_ivar_get(self, i$ak),'height=',h);
});
rb_define_method(self,s$hn,function(self,_cmd){
return [rb_funcall(self, s$y),rb_funcall(self, s$z),rb_funcall(self, s$ho),rb_funcall(self, s$hp)];
});
rb_define_method(self,s$hq,function(self,_cmd){
});
rb_define_method(self,s$hr,function(self,_cmd){
});
rb_define_method(self,s$ah,function(self,_cmd){
return ["{{",(rb_funcall(self, s$y)),", ",(rb_funcall(self, s$z)),"}, {",(rb_funcall(self, s$ac)),", ",(rb_funcall(self, s$ad)),"}}"].join('');
});
rb_define_method(self,s$hs,function(self,_cmd){
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$ak),s$ht,rb_funcall(other,s$w)),rb_funcall(rb_ivar_get(self, i$aj),s$ht,rb_funcall(other,s$v)));
});
})(RClass.define_under(self,'Rect',cObject));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,x,y){
self.$i_s(i$al,x);
return self.$i_s(i$am,y);
});
rb_define_method(self,s$hu,function(self,_cmd){
return self;
});
rb_define_method(self,s$y,function(self,_cmd){
return rb_ivar_get(self, i$al);
});
rb_define_method(self,s$hj,function(self,_cmd,x){
return self.$i_s(i$al,x);
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_ivar_get(self, i$am);
});
rb_define_method(self,s$hk,function(self,_cmd,y){
return self.$i_s(i$am,y);
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$al),s$ab,rb_funcall(other,s$y)),rb_funcall(rb_ivar_get(self, i$am),s$ab,rb_funcall(other,s$z)));
});
rb_define_method(self,s$hv,function(self,_cmd,a_rect){
return ANDTEST(rb_funcall(rb_funcall(self, s$y),s$hw,rb_funcall(a_rect,s$y)),ANDTEST(rb_funcall(rb_funcall(self, s$z),s$hw,rb_funcall(a_rect,s$z)),ANDTEST(rb_funcall(rb_funcall(self, s$y),s$hx,rb_funcall(rb_funcall(a_rect,s$y),s$hy,rb_funcall(a_rect,s$ac))),rb_funcall(rb_funcall(self, s$z),s$hx,rb_funcall(rb_funcall(a_rect,s$z),s$hy,rb_funcall(a_rect,s$ad))))));
});
})(RClass.define_under(self,'Point',cObject));
(function(self) {
rb_define_method(self,s$l,function(self,_cmd,w,h){
self.$i_s(i$an,w);
return self.$i_s(i$ao,h);
});
rb_define_method(self,s$hz,function(self,_cmd){
return self;
});
rb_define_method(self,s$ac,function(self,_cmd){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$hl,function(self,_cmd,w){
return self.$i_s(i$an,w);
});
rb_define_method(self,s$ad,function(self,_cmd){
return rb_ivar_get(self, i$ao);
});
rb_define_method(self,s$hm,function(self,_cmd,h){
return self.$i_s(i$ao,h);
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$an),s$ab,rb_funcall(other,s$ac)),rb_funcall(rb_ivar_get(self, i$ao),s$ab,rb_funcall(other,s$ad)));
});
})(RClass.define_under(self,'Size',cObject));
})(RModule.define('Vienna'));
