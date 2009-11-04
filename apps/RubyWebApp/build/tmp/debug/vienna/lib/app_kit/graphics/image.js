(function(self) {
(function(self) {
self.$def_s(s$ia,function(self,_cmd,name){
if(RTEST(rb_funcall(rb_funcall(self, s$ib),s$ic,name))){
return rb_funcall(rb_funcall(self, s$ib),s$e,name);
}
if(RTEST(rb_funcall(rb_funcall(self, s$id),s$ic,name))){
}
var img = rb_funcall(self,s$ie,["images/",(name),".png"].join(''));
rb_funcall(rb_funcall(self, s$ib),'[]=',name,img);
return img;
});
self.$def_s(s$ib,function(self,_cmd){
return self.$i_s(i$ap,ORTEST(rb_ivar_get(self, i$ap),VN.$h()));
});
self.$def_s(s$id,function(self,_cmd){
return self.$i_s(i$aq,ORTEST(rb_ivar_get(self, i$aq),VN.$h()));
});
self.$def_s(s$if,function(self,_cmd,name,block){
var img = rb_funcall(self,s$ia,name);
return arguments[arguments.length -1](img);
});
self.$def_s(s$ig,function(self,_cmd,name,rect){
var img = rb_funcall(self,s$ia,name);
var obj = rb_funcall(self,s$al);
rb_funcall(obj,'image=',rb_funcall(img,s$ih));
rb_funcall(obj,'filename=',rb_funcall(img,s$ii));
rb_funcall(obj,s$ij,_$u,rect);
return obj;
});
self.$def_s(s$ik,function(self,_cmd,image,normal,gray_mask,disabled){
var img = rb_funcall(self,s$ia,image);
var obj = rb_funcall(self,s$al);
rb_funcall(obj,'image=',rb_funcall(img,s$ih));
rb_funcall(obj,'filename=',rb_funcall(img,s$ii));
rb_funcall(obj,s$ij,_$u,normal);
rb_funcall(obj,s$ij,_$fg,gray_mask);
rb_funcall(obj,s$ij,_$fh,disabled);
return obj;
});
self.$def_s(s$il,function(self,_cmd,name,block){
var img = rb_funcall(self,s$ia,name);
var obj = rb_funcall(self,s$al);
rb_funcall(obj,'image=',rb_funcall(img,s$ih));
rb_funcall(obj,'filename=',rb_funcall(img,s$ii));
arguments[arguments.length -1](obj);
return obj;
});
self.$def(s$ij,function(self,_cmd,type,array_rect){
rb_funcall(rb_ivar_get(self, i$ar),'[]=',type,array_rect);
if(RTEST(rb_funcall(type,s$y,_$u))){
self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$p),s$al,rb_funcall(array_rect,s$e,2),rb_funcall(array_rect,s$e,3)));
}
});
rb_define_method(self,s$i,function(self,_cmd){
rb_supcall(arguments.callee, self,_cmd,[]);
return self.$i_s(i$ar,VN.$h());
});
rb_define_method(self,s$im,function(self,_cmd,size){
});
rb_define_method(self,s$in,function(self,_cmd,data){
});
self.$def_s(s$ie,function(self,_cmd,url){
var obj = rb_funcall(self, s$en);
rb_funcall(obj,s$io,url);
return obj;
});
rb_define_method(self,s$io,function(self,_cmd,url){
rb_funcall(self, s$i);
self.$i_s(i$as,url);
self.$i_s(i$at,nil);
return rb_funcall(self, s$ip);
});
rb_define_method(self,s$iq,function(self,_cmd){
return rb_ivar_get(self, i$au);
});
rb_define_method(self,s$ip,function(self,_cmd){
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self, i$au),s$y,_$fi),rb_funcall(rb_ivar_get(self, i$au),s$y,_$fj)))){
return ;
}
self.$i_s(i$au,_$fi);
self.$i_s('@image', new Image());
      
      rb_ivar_get(self, i$at).onload = function() {
        rb_funcall(self,s$ir)
      };
      
      rb_ivar_get(self, i$at).onerror = function() {
        rb_funcall(self,s$is)
      };
      
      rb_ivar_get(self, i$at).onabort = function() {
        rb_funcall(self,s$is)
      };
      
      rb_ivar_get(self, i$at).src = rb_ivar_get(self, i$as);
      });
rb_define_method(self,s$is,function(self,_cmd){
self.$i_s(i$au,_$fk);
if(RTEST(ANDTEST(rb_ivar_get(self, i$t),rb_funcall(rb_ivar_get(self, i$t),s$au,_$fl)))){
rb_funcall(rb_ivar_get(self, i$t),s$it,self);
}
});
rb_define_method(self,s$ir,function(self,_cmd){
return self.$i_s(i$ak,rb_funcall(self.$klass.$c_g_full(c$p),s$al,rb_ivar_get(self, i$at).width,rb_ivar_get(self, i$at).height));
});
rb_define_method(self,s$ig,function(self,_cmd,name,rect){
return self;
});
rb_define_method(self,s$ih,function(self,_cmd){
return rb_ivar_get(self, i$at);
});
rb_define_method(self,s$iu,function(self,_cmd,img){
return self.$i_s(i$at,img);
});
rb_define_method(self,s$iv,function(self,_cmd,name){
return self.$i_s(i$as,name);
});
rb_define_method(self,s$ii,function(self,_cmd){
return rb_ivar_get(self, i$as);
});
rb_define_method(self,s$iw,function(self,_cmd,point){
return self.$i_s(i$av,point);
});
rb_define_method(self,s$x,function(self,_cmd,size){
return self.$i_s(i$ak,size);
});
rb_define_method(self,s$t,function(self,_cmd){
return ORTEST(rb_ivar_get(self, i$ak),rb_funcall(self.$klass.$c_g_full(c$p),s$al,0,0));
});
rb_define_method(self,s$ix,function(self,_cmd,name){
return self.$i_s(i$j,name);
});
rb_define_method(self,s$cg,function(self,_cmd){
return rb_ivar_get(self, i$j);
});
rb_define_method(self,s$iy,function(self,_cmd,color){
return self.$i_s(i$aw,color);
});
rb_define_method(self,s$iz,function(self,_cmd){
return rb_ivar_get(self, i$aw);
});
self.$def(s$ja,function(self,_cmd,point,from_rect,op,delta){
});
self.$def(s$jb,function(self,_cmd,rect,from_rect,op,delta){
});
self.$def(s$jc,function(self,_cmd,rect,enabled,gray_mask){
var ctx = rb_funcall(self.$klass.$c_g_full(c$q),s$gh);
rb_funcall(ctx,s$l,VN.$h(_$fm,_$fn,_$fo,["url('",(rb_funcall(self, s$ii)),"')"].join('')));
rb_funcall(ctx,s$l,VN.$h(_$ed,[(rb_funcall(rect,s$z)),"px"].join(''),_$fp,[(rb_funcall(rect,s$aa)),"px"].join('')));
rb_funcall(ctx,s$l,VN.$h(_$fq,[(rb_funcall(rect,s$v)),"px"].join(''),_$fr,[(rb_funcall(rect,s$w)),"px"].join('')));
var rep = gray_mask ? rb_funcall(rb_ivar_get(self, i$ar),s$e,_$fg) : rb_funcall(rb_ivar_get(self, i$ar),s$e,_$u);
if(!RTEST(enabled)){
rep = rb_funcall(rb_ivar_get(self, i$ar),s$e,_$fh);
}
return rb_funcall(ctx,s$l,VN.$h(_$fs,["-",(rb_funcall(rep,s$e,0)),"px -",(rb_funcall(rep,s$e,1)),"px"].join('')));
});
rb_define_method(self,s$jd,function(self,_cmd,rect){
return rb_funcall(self,s$jc,rect,true,false);
});
self.$def(s$je,function(self,_cmd,image_rep,rect){
});
rb_define_method(self,s$jf,function(self,_cmd){
return rb_ivar_get(self, i$ar);
});
rb_define_method(self,s$jg,function(self,_cmd,image_reps){
});
rb_define_method(self,s$jh,function(self,_cmd,image_rep){
});
rb_define_method(self,s$ji,function(self,_cmd,image_rep){
});
rb_define_method(self,s$jj,function(self,_cmd){
});
rb_define_method(self,s$jk,function(self,_cmd){
});
rb_define_method(self,s$jl,function(self,_cmd){
});
rb_define_method(self,s$ei,function(self,_cmd,obj){
return self.$i_s(i$t,obj);
});
rb_define_method(self,s$jm,function(self,_cmd){
return rb_ivar_get(self, i$t);
});
rb_define_method(self,s$jn,function(self,_cmd){
return rb_ivar_get(self, i$ax);
});
rb_define_method(self,s$jo,function(self,_cmd,rect){
return self.$i_s(i$ax,rect);
});
})(RClass.define_under(self,'Image',cObject));
})(RModule.define('Vienna'));
