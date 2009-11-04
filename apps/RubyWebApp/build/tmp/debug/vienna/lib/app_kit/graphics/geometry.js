(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,x,y,w,h){
self.$i_s(i$aj,rb_funcall(self.$klass.$c_g_full(c$o),s$al,x,y));
return self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$p),s$al,w,h));
});
rb_define_method(self,s$hi,function(self,_cmd){
return self;
});
rb_define_method(self,s$t,function(self,_cmd){
return rb_ivar_get(self, i$ak);
});
rb_define_method(self,s$x,function(self,_cmd,size){
return self.$i_s(i$ak,size);
});
rb_define_method(self,s$s,function(self,_cmd){
return rb_ivar_get(self, i$aj);
});
rb_define_method(self,s$u,function(self,_cmd,point){
return self.$i_s(i$aj,point);
});
rb_define_method(self,s$v,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$aj),s$v);
});
rb_define_method(self,s$w,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$aj),s$w);
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ak),s$z);
});
rb_define_method(self,s$aa,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ak),s$aa);
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
return [rb_funcall(self, s$v),rb_funcall(self, s$w),rb_funcall(self, s$ho),rb_funcall(self, s$hp)];
});
rb_define_method(self,s$hq,function(self,_cmd){
});
rb_define_method(self,s$hr,function(self,_cmd){
});
rb_define_method(self,s$ae,function(self,_cmd){
return ["{{",(rb_funcall(self, s$v)),", ",(rb_funcall(self, s$w)),"}, {",(rb_funcall(self, s$z)),", ",(rb_funcall(self, s$aa)),"}}"].join('');
});
rb_define_method(self,s$hs,function(self,_cmd){
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$ak),s$ht,rb_funcall(other,s$t)),rb_funcall(rb_ivar_get(self, i$aj),s$ht,rb_funcall(other,s$s)));
});
})(RClass.define_under(self,'Rect',cObject));
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,x,y){
self.$i_s(i$al,x);
return self.$i_s(i$am,y);
});
rb_define_method(self,s$hu,function(self,_cmd){
return self;
});
rb_define_method(self,s$v,function(self,_cmd){
return rb_ivar_get(self, i$al);
});
rb_define_method(self,s$hj,function(self,_cmd,x){
return self.$i_s(i$al,x);
});
rb_define_method(self,s$w,function(self,_cmd){
return rb_ivar_get(self, i$am);
});
rb_define_method(self,s$hk,function(self,_cmd,y){
return self.$i_s(i$am,y);
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$al),s$y,rb_funcall(other,s$v)),rb_funcall(rb_ivar_get(self, i$am),s$y,rb_funcall(other,s$w)));
});
rb_define_method(self,s$hv,function(self,_cmd,a_rect){
return ANDTEST(rb_funcall(rb_funcall(self, s$v),s$hw,rb_funcall(a_rect,s$v)),ANDTEST(rb_funcall(rb_funcall(self, s$w),s$hw,rb_funcall(a_rect,s$w)),ANDTEST(rb_funcall(rb_funcall(self, s$v),s$hx,rb_funcall(rb_funcall(a_rect,s$v),s$hy,rb_funcall(a_rect,s$z))),rb_funcall(rb_funcall(self, s$w),s$hx,rb_funcall(rb_funcall(a_rect,s$w),s$hy,rb_funcall(a_rect,s$aa))))));
});
})(RClass.define_under(self,'Point',cObject));
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,w,h){
self.$i_s(i$an,w);
return self.$i_s(i$ao,h);
});
rb_define_method(self,s$hz,function(self,_cmd){
return self;
});
rb_define_method(self,s$z,function(self,_cmd){
return rb_ivar_get(self, i$an);
});
rb_define_method(self,s$hl,function(self,_cmd,w){
return self.$i_s(i$an,w);
});
rb_define_method(self,s$aa,function(self,_cmd){
return rb_ivar_get(self, i$ao);
});
rb_define_method(self,s$hm,function(self,_cmd,h){
return self.$i_s(i$ao,h);
});
rb_define_method(self,s$ht,function(self,_cmd,other){
return ANDTEST(rb_funcall(rb_ivar_get(self, i$an),s$y,rb_funcall(other,s$z)),rb_funcall(rb_ivar_get(self, i$ao),s$y,rb_funcall(other,s$aa)));
});
})(RClass.define_under(self,'Size',cObject));
})(RModule.define('Vienna'));
