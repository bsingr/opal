(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,frame){
rb_supcall(arguments.callee, self,_cmd,[frame]);
self.$i_s(i$bn,rb_funcall(rb_funcall(rb_funcall(self,s$av),s$ni),s$al));
return rb_funcall(rb_ivar_get(self, i$bn),'render_context=',rb_ivar_get(self, i$bi));
});
self.$def_s(s$ni,function(self,_cmd){
return self.$c_g_full(c$w);
});
rb_define_method(self,s$my,function(self,_cmd,context){
rb_funcall(self.$klass.$c_g_full(c$q),'current_context=',context);
return rb_funcall(rb_ivar_get(self, i$bn),s$nj,rb_funcall(self, s$lz),self);
});
rb_define_method(self,s$k,function(self,_cmd,class_name){
return rb_funcall(rb_ivar_get(self, i$bn),'class_name=',class_name);
});
rb_define_method(self,s$kc,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$kc);
});
rb_define_method(self,s$ke,function(self,_cmd,theme_name){
return rb_funcall(rb_ivar_get(self, i$bn),'theme_name=',theme_name);
});
rb_define_method(self,s$kd,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$kd);
});
rb_define_method(self,s$nk,function(self,_cmd){
return rb_ivar_get(self, i$bn);
});
rb_define_method(self,s$nl,function(self,_cmd,a_cell){
return rb_ivar_get(self, i$bn);
});
rb_define_method(self,s$nm,function(self,_cmd){
return rb_ivar_get(self, i$bn);
});
rb_define_method(self,s$nn,function(self,_cmd){
});
rb_define_method(self,s$no,function(self,_cmd){
});
rb_define_method(self,s$np,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$np);
});
rb_define_method(self,s$nq,function(self,_cmd,obj){
return rb_funcall(rb_ivar_get(self, i$bn),'target=',obj);
});
rb_define_method(self,s$nr,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nr);
});
rb_define_method(self,s$ns,function(self,_cmd,selector){
return rb_funcall(rb_ivar_get(self, i$bn),'action=',selector);
});
rb_define_method(self,s$nt,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nt);
});
rb_define_method(self,s$nu,function(self,_cmd,tag){
return rb_funcall(rb_ivar_get(self, i$bn),'tag=',tag);
});
rb_define_method(self,s$nv,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nt);
});
rb_define_method(self,s$nw,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'ignores_multi_click=',flag);
});
rb_define_method(self,s$nx,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nx);
});
rb_define_method(self,s$ny,function(self,_cmd,mask){
});
rb_define_method(self,s$nz,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$nz);
});
rb_define_method(self,s$oa,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'continuous=',flag);
});
rb_define_method(self,s$ob,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$ob);
});
rb_define_method(self,s$oc,function(self,_cmd,flag){
rb_funcall(rb_ivar_get(self, i$bn),'enabled=',flag);
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,s$od,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$od);
});
rb_define_method(self,s$oe,function(self,_cmd,control_tint){
return rb_funcall(rb_ivar_get(self, i$bn),'control_tint=',control_tint);
});
rb_define_method(self,s$of,function(self,_cmd,size){
return rb_funcall(rb_ivar_get(self, i$bn),'control_size=',size);
});
rb_define_method(self,s$og,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$og);
});
rb_define_method(self,s$oh,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$oh);
});
rb_define_method(self,s$oi,function(self,_cmd,mode){
return rb_funcall(rb_ivar_get(self, i$bn),'alignment=',mode);
});
rb_define_method(self,s$oj,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$oj);
});
rb_define_method(self,s$ok,function(self,_cmd,font){
return rb_funcall(rb_ivar_get(self, i$bn),'font=',font);
});
rb_define_method(self,s$ol,function(self,_cmd,new_formatter){
return rb_funcall(rb_ivar_get(self, i$bn),'formatter=',new_formatter);
});
rb_define_method(self,s$om,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$om);
});
rb_define_method(self,s$on,function(self,_cmd,obj){
});
rb_define_method(self,s$oo,function(self,_cmd,obj){
});
rb_define_method(self,s$op,function(self,_cmd,text){
return string_value = text;
});
rb_define_method(self,s$oq,function(self,_cmd,val){
});
rb_define_method(self,s$or,function(self,_cmd,val){
});
rb_define_method(self,s$os,function(self,_cmd,val){
});
rb_define_method(self,s$ot,function(self,_cmd){
});
rb_define_method(self,s$ou,function(self,_cmd){
});
rb_define_method(self,s$ae,function(self,_cmd){
return rb_funcall(self, s$ou);
});
rb_define_method(self,s$ov,function(self,_cmd){
});
rb_define_method(self,s$ow,function(self,_cmd){
return rb_funcall(self, s$ov);
});
rb_define_method(self,s$ox,function(self,_cmd){
});
rb_define_method(self,s$oy,function(self,_cmd){
return rb_funcall(self, s$ox);
});
rb_define_method(self,s$oz,function(self,_cmd){
});
rb_define_method(self,s$pa,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pb,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pc,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pd,function(self,_cmd,a_cell){
});
rb_define_method(self,s$pe,function(self,_cmd,a_cell){
});
self.$def(s$pf,function(self,_cmd,action,target){
rb_funcall(self,s$ah,'sending action on');
if(RTEST(rb_funcall(self,s$fq,_$dy))){
rb_funcall(self,s$fr,_$dy);
}
return rb_funcall(self.$klass.$c_g_full(c$l),s$em,action,target,self);
});
rb_define_method(self,s$pg,function(self,_cmd,sender){
});
rb_define_method(self,s$ph,function(self,_cmd,sender){
});
rb_define_method(self,s$pi,function(self,_cmd,sender){
});
rb_define_method(self,s$pj,function(self,_cmd,sender){
});
rb_define_method(self,s$pk,function(self,_cmd,sender){
});
rb_define_method(self,s$pl,function(self,_cmd){
});
rb_define_method(self,s$pm,function(self,_cmd){
});
rb_define_method(self,s$pn,function(self,_cmd){
});
rb_define_method(self,s$cr,function(self,_cmd,the_event){
if(!RTEST(rb_funcall(self, s$ob))){
return ;
}
rb_funcall(self,s$jk);
rb_funcall(rb_ivar_get(self, i$bn),s$po,the_event,rb_funcall(self, s$ln),self,true);
return rb_funcall(self,s$jl);
});
rb_define_method(self,s$pp,function(self,_cmd,sender){
});
rb_define_method(self,s$pq,function(self,_cmd,flag){
return rb_funcall(rb_ivar_get(self, i$bn),'refuses_first_responder=',flag);
});
rb_define_method(self,s$pr,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$pr);
});
rb_define_method(self,s$ps,function(self,_cmd,notification){
});
rb_define_method(self,s$pt,function(self,_cmd,notification){
});
rb_define_method(self,s$pu,function(self,_cmd,notification){
});
rb_define_method(self,s$pv,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$bn),s$pv);
});
rb_define_method(self,s$pw,function(self,_cmd,val){
return rb_funcall(rb_ivar_get(self, i$bn),'attributed_string_value=',val);
});
self.$def(s$fn,function(self,_cmd,binding,observable,key_path,options){
if(RTEST(rb_funcall(binding,s$y,_$dy))){
rb_funcall(self,s$fo,binding);
rb_funcall(observable,s$bn,self,key_path,options,binding);
var binding_dict = VN.$h(_$bb, observable, _$bc, key_path, _$m, options, _$bd, 'object_value');
rb_funcall(self,s$ft,binding_dict,binding);
rb_funcall(self,s$fp,binding);
}
else{
rb_supcall(arguments.callee, self,_cmd,[binding,observable,key_path,options]);
}
});
})(RClass.define_under(self,'Control',self.$c_g_full(c$x)));
})(RModule.define('Vienna'));
