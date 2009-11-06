(function(self) {
(function(self) {
self.$def_s(s$jv,function(self,_,name){
name=_E(name,s$h);
if(_A(_E(_E(self,s$jw),s$jx,name))){
return _E(_E(self,s$jw),s$j,name);
}
if(_A(_E(_E(self,s$jy),s$jx,name))){
}
var url=["images/",(name),".png"].join('');
if(_A(_E(name,s$ad,'controls'))){
var image_name=[(name),".png"].join('');
if(vn_resource_stack.hasOwnProperty(image_name)) {url=vn_resource_stack[image_name];
}}
var img=_E(self,s$jz,["images/",(name),".png"].join(''));
_E(_E(self,s$jw),s$g,name,img);
return img;
});
self.$def_s(s$jw,function(self,_){
return self.$i_s(i$ar,ORTEST(_H(self,i$ar),VN.$h()));
});
self.$def_s(s$jy,function(self,_){
return self.$i_s(i$as,ORTEST(_H(self,i$as),VN.$h()));
});
self.$def_s(s$ka,function(self,_,name,block){
var img=_E(self,s$jv,name);
return arguments[arguments.length -1](img);
});
self.$def_s(s$kb,function(self,_,name,rect){
var img=_E(self,s$jv,name);
var obj=_E(self,s$ap);
_E(obj,s$kc,_E(img,s$kd));
_E(obj,s$ke,_E(img,s$kf));
_E(obj,s$kg,_$t,rect);
return obj;
});
self.$def_s(s$kh,function(self,_,image,normal,gray_mask,disabled){
var img=_E(self,s$jv,image);
var obj=_E(self,s$ap);
_E(obj,s$kc,_E(img,s$kd));
_E(obj,s$ke,_E(img,s$kf));
_E(obj,s$kg,_$t,normal);
_E(obj,s$kg,_$fp,gray_mask);
_E(obj,s$kg,_$fq,disabled);
return obj;
});
self.$def_s(s$ki,function(self,_,name,block){
var img=_E(self,s$jv,name);
var obj=_E(self,s$ap);
_E(obj,s$kc,_E(img,s$kd));
_E(obj,s$ke,_E(img,s$kf));
arguments[arguments.length -1](obj);
return obj;
});
self.$def(s$kg,function(self,_,type,array_rect){
_E(_H(self,i$at),s$g,type,array_rect);
if(_A(_E(type,s$ad,_$t))){
self.$i_s(i$am,_E(self.$klass.$c_g_full(c$ac),s$ap,_E(array_rect,s$j,2),_E(array_rect,s$j,3)));
}
});
_I(self,s$n,function(self,_){
rb_supcall(arguments.callee, self,_,[]);
return self.$i_s(i$at,VN.$h());
});
_I(self,s$kj,function(self,_,size){
});
_I(self,s$kk,function(self,_,data){
});
self.$def_s(s$jz,function(self,_,url){
var obj=_E(self,s$ep);
_E(obj,s$kl,url);
return obj;
});
_I(self,s$kl,function(self,_,url){
_E(self,s$n);
self.$i_s(i$au,url);
self.$i_s(i$av,nil);
return _E(self,s$km);
});
_I(self,s$kn,function(self,_){
return _H(self,i$aw);
});
_I(self,s$km,function(self,_){
if(_A(ORTEST(_E(_H(self,i$aw),s$ad,_$fr),_E(_H(self,i$aw),s$ad,_$fs)))){
return ;
}
self.$i_s(i$aw,_$fr);
self.$i_s('@image', new Image());
      
      _H(self,i$av).onload = function() {
        _E(self,s$ko)
      };
      
      _H(self,i$av).onerror = function() {
        _E(self,s$kp)
      };
      
      _H(self,i$av).onabort = function() {
        _E(self,s$kp)
      };
      
      _H(self,i$av).src = _H(self,i$au);
      });
_I(self,s$kp,function(self,_){
self.$i_s(i$aw,_$ft);
if(_A(ANDTEST(_H(self,i$t),_E(_H(self,i$t),s$av,_$fu)))){
_E(_H(self,i$t),s$kq,self);
}
});
_I(self,s$ko,function(self,_){
return self.$i_s(i$am,_E(self.$klass.$c_g_full(c$ac),s$ap,_H(self,i$av).width,_H(self,i$av).height));
});
_I(self,s$kb,function(self,_,name,rect){
return self;
});
_I(self,s$kd,function(self,_){
return _H(self,i$av);
});
_I(self,s$kc,function(self,_,img){
return self.$i_s(i$av,img);
});
_I(self,s$ke,function(self,_,name){
return self.$i_s(i$au,name);
});
_I(self,s$kf,function(self,_){
return _H(self,i$au);
});
_I(self,s$kr,function(self,_,point){
return self.$i_s(i$ax,point);
});
_I(self,s$z,function(self,_,size){
return self.$i_s(i$am,size);
});
_I(self,s$aa,function(self,_){
return ORTEST(_H(self,i$am),_E(self.$klass.$c_g_full(c$ac),s$ap,0,0));
});
_I(self,s$ks,function(self,_,name){
return self.$i_s(i$j,name);
});
_I(self,s$ch,function(self,_){
return _H(self,i$j);
});
_I(self,s$kt,function(self,_,color){
return self.$i_s(i$ay,color);
});
_I(self,s$ku,function(self,_){
return _H(self,i$ay);
});
self.$def(s$kv,function(self,_,point,from_rect,op,delta){
});
self.$def(s$kw,function(self,_,rect,from_rect,op,delta){
});
self.$def(s$kx,function(self,_,rect,enabled,gray_mask){
var ctx=_E(self.$klass.$c_g_full(c$ae),s$gj);
_E(ctx,s$q,VN.$h(_$fv,_$fw,_$fx,["url('",(_E(self,s$kf)),"')"].join('')));
_E(ctx,s$q,VN.$h(_$ee,[(_E(rect,s$ae)),"px"].join(''),_$fy,[(_E(rect,s$af)),"px"].join('')));
_E(ctx,s$q,VN.$h(_$fz,[(_E(rect,s$ab)),"px"].join(''),_$ga,[(_E(rect,s$ac)),"px"].join('')));
var rep=_A(gray_mask) ? _E(_H(self,i$at),s$j,_$fp) : _E(_H(self,i$at),s$j,_$t);
if(!_A(enabled)){
rep=_E(_H(self,i$at),s$j,_$fq);
}
return _E(ctx,s$q,VN.$h(_$gb,["-",(_E(rep,s$j,0)),"px -",(_E(rep,s$j,1)),"px"].join('')));
});
_I(self,s$ky,function(self,_,rect){
return _E(self,s$kx,rect,true,false);
});
self.$def(s$kz,function(self,_,image_rep,rect){
});
_I(self,s$la,function(self,_){
return _H(self,i$at);
});
_I(self,s$lb,function(self,_,image_reps){
});
_I(self,s$lc,function(self,_,image_rep){
});
_I(self,s$ld,function(self,_,image_rep){
});
_I(self,s$le,function(self,_){
});
_I(self,s$lf,function(self,_){
});
_I(self,s$lg,function(self,_){
});
_I(self,s$ek,function(self,_,obj){
return self.$i_s(i$t,obj);
});
_I(self,s$lh,function(self,_){
return _H(self,i$t);
});
_I(self,s$li,function(self,_){
return _H(self,i$az);
});
_I(self,s$lj,function(self,_,rect){
return self.$i_s(i$az,rect);
});
})(_N(self,c$af,cObject));
(function(self) {
_I(self,s$n,function(self,_,parts,vertical){
});
})(_N(self,c$ag,cObject));
(function(self) {
_I(self,s$n,function(self,_,parts){
});
})(_N(self,c$ah,cObject));
})(_K(c$b));
