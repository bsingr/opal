(function(self) {
(function(self) {
_I(self,s$n,function(self,_,x,y,w,h){
self.$i_s(i$ap,_E(self.$klass.$c_g_full(c$aa),s$as,x,y));
return self.$i_s(i$aq,_E(self.$klass.$c_g_full(c$af),s$as,w,h));
});
self.$def_s(s$md,function(self,_,string){
var point=_E(self.$c_g_full(c$aa),s$md,string.substr(1, string.indexOf("},") - 1));
var size=_E(self.$c_g_full(c$af),s$md,string.substr(string.indexOf("},") + 3, string.length - 3));
return _E(self,s$as,_E(point,s$ab),_E(point,s$ac),_E(size,s$ae),_E(size,s$af));
});
_I(self,s$me,function(self,_){
return self;
});
_I(self,s$mf,function(self,_){
return _E(self.$klass.$c_g_full(c$ag),s$as,_E(self,s$ab),_E(self,s$ac),_E(self,s$ae),_E(self,s$af));
});
_I(self,s$aa,function(self,_){
return _H(self,i$aq);
});
_I(self,s$z,function(self,_,size){
return self.$i_s(i$aq,size);
});
_I(self,s$y,function(self,_){
return _H(self,i$ap);
});
_I(self,s$x,function(self,_,point){
return self.$i_s(i$ap,point);
});
_I(self,s$ab,function(self,_){
return _E(_H(self,i$ap),s$ab);
});
_I(self,s$ac,function(self,_){
return _E(_H(self,i$ap),s$ac);
});
_I(self,s$ae,function(self,_){
return _E(_H(self,i$aq),s$ae);
});
_I(self,s$af,function(self,_){
return _E(_H(self,i$aq),s$af);
});
_I(self,s$mg,function(self,_,x){
return _E(_H(self,i$ap),s$mg,x);
});
_I(self,s$mh,function(self,_,y){
return _E(_H(self,i$ap),s$mh,y);
});
_I(self,s$mi,function(self,_,w){
return _E(_H(self,i$aq),s$mi,w);
});
_I(self,s$mj,function(self,_,h){
return _E(_H(self,i$aq),s$mj,h);
});
_I(self,s$mk,function(self,_){
return [_E(self,s$ab),_E(self,s$ac),_E(self,s$ml),_E(self,s$mm)];
});
_I(self,s$mn,function(self,_){
});
_I(self,s$mo,function(self,_){
});
_I(self,s$h,function(self,_){
return ["{{",(_E(self,s$ab)),", ",(_E(self,s$ac)),"}, {",(_E(self,s$ae)),", ",(_E(self,s$af)),"}}"].join('');
});
_I(self,s$mp,function(self,_){
});
_I(self,s$mq,function(self,_,other){
return ANDTEST(_E(_H(self,i$aq),s$mq,_E(other,s$aa)),_E(_H(self,i$ap),s$mq,_E(other,s$y)));
});
})(_N(self,c$ag,cObject));
(function(self) {
_I(self,s$n,function(self,_,x,y){
self.$i_s(i$ar,x);
return self.$i_s(i$as,y);
});
_I(self,s$mr,function(self,_){
return self;
});
self.$def_s(s$md,function(self,_,string){
return _E(self,s$as,parseFloat(string.substr(1, string.indexOf(",") - 1)),parseFloat(string.substr(string.indexOf(",") + 1, string.length - 1)));
});
_I(self,s$ab,function(self,_){
return _H(self,i$ar);
});
_I(self,s$mg,function(self,_,x){
return self.$i_s(i$ar,x);
});
_I(self,s$ac,function(self,_){
return _H(self,i$as);
});
_I(self,s$mh,function(self,_,y){
return self.$i_s(i$as,y);
});
_I(self,s$mq,function(self,_,other){
return ANDTEST(_E(_H(self,i$ar),s$ad,_E(other,s$ab)),_E(_H(self,i$as),s$ad,_E(other,s$ac)));
});
_I(self,s$ms,function(self,_,a_rect){
return ANDTEST(_E(_E(self,s$ab),s$eb,_E(a_rect,s$ab)),ANDTEST(_E(_E(self,s$ac),s$eb,_E(a_rect,s$ac)),ANDTEST(_E(_E(self,s$ab),s$mt,_E(_E(a_rect,s$ab),s$ef,_E(a_rect,s$ae))),_E(_E(self,s$ac),s$mt,_E(_E(a_rect,s$ac),s$ef,_E(a_rect,s$af))))));
});
})(_N(self,c$aa,cObject));
(function(self) {
_I(self,s$n,function(self,_,w,h){
self.$i_s(i$at,w);
return self.$i_s(i$au,h);
});
self.$def_s(s$md,function(self,_,string){
return _E(self,s$as,parseFloat(string.substr(1, string.indexOf(",") - 1)),parseFloat(string.substr(string.indexOf(",") + 1, string.length - 1)));
});
_I(self,s$mu,function(self,_){
return self;
});
_I(self,s$ae,function(self,_){
return _H(self,i$at);
});
_I(self,s$mi,function(self,_,w){
return self.$i_s(i$at,w);
});
_I(self,s$af,function(self,_){
return _H(self,i$au);
});
_I(self,s$mj,function(self,_,h){
return self.$i_s(i$au,h);
});
_I(self,s$mq,function(self,_,other){
return ANDTEST(_E(_H(self,i$at),s$ad,_E(other,s$ae)),_E(_H(self,i$au),s$ad,_E(other,s$af)));
});
})(_N(self,c$af,cObject));
})(_K(c$b));
