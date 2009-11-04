(function(self) {
rb_funcall(self,s$j,_$a);
self.$def_s(s$k,function(self,_cmd,the_id){
document.getElementById(the_id)});
rb_define_method(self,s$l,function(self,_cmd,type,options){
self.$i_s(i$b,document.createElement(type));
return self.$i_s(i$c,type);
});
rb_define_method(self,s$m,function(self,_cmd){
return rb_ivar_get(self, i$b);
});
rb_define_method(self,s$n,function(self,_cmd,name){
rb_funcall(self, s$m).className = name;});
rb_define_method(self,s$o,function(self,_cmd,options){
rb_funcall(options,s$p,function(key,value){
rb_funcall(self, s$m).style[rb_funcall(key,s$q)] = value;});
return self;
});
rb_define_method(self,s$r,function(self,_cmd,key,value){
rb_funcall(self, s$m).setAttribute(key, value);});
rb_define_method(self,s$s,function(self,_cmd,obj){
rb_funcall(self, s$m).src = obj;});
rb_define_method(self,s$t,function(self,_cmd,str){
rb_funcall(self, s$m).innerHTML = str;});
rb_define_method(self,s$u,function(self,_cmd,new_frame){
rb_funcall(self,'origin=',rb_funcall(new_frame,s$v));
return rb_funcall(self,'size=',rb_funcall(new_frame,s$w));
});
rb_define_method(self,s$x,function(self,_cmd,new_origin){
rb_funcall(self, s$m).style.left = rb_funcall(new_origin,s$y) + 'px';rb_funcall(self, s$m).style.top = rb_funcall(new_origin,s$z) + 'px';});
rb_define_method(self,s$aa,function(self,_cmd,new_size){
if(RTEST(rb_funcall(rb_ivar_get(self, i$c),s$ab,_$b))){
rb_funcall(self, s$m).width = rb_funcall(new_size,s$ac);rb_funcall(self, s$m).height = rb_funcall(new_size,s$ad);}
else{
rb_funcall(self, s$m).style.width = rb_funcall(new_size,s$ac) + 'px';rb_funcall(self, s$m).style.height = rb_funcall(new_size,s$ad) + 'px';}
});
rb_define_method(self,s$e,function(self,_cmd,other){
if(RTEST(rb_funcall(other,s$ae,self.$klass.$c_g_full(c$d)))){
rb_funcall(self, s$m).innerHTML += other;}
else{
rb_funcall(self, s$m).appendChild(rb_funcall(other,s$m));}
});
rb_define_method(self,s$af,function(self,_cmd,str){
rb_funcall(self, s$m).innerHTML = str;});
rb_define_method(self,s$ag,function(self,_cmd,type,block){
self.$i_s(i$a,ORTEST(rb_ivar_get(self, i$a),VN.$h()));
rb_funcall(rb_ivar_get(self, i$a),'[]=',type,block);
if (document.addEventListener) {
      rb_funcall(self, s$m).addEventListener(rb_funcall(type,s$ah), rb_funcall(self, s$ai), false);
    }
    else {
      rb_funcall(self, s$m).attachEvent('on' + rb_funcall(type,s$ah), rb_funcall(self, s$ai));
    }});
rb_define_method(self,s$f,function(self,_cmd,type,listener){
if (document.addEventListener) {
      rb_funcall(self, s$m).addEventListener(type, listener, false);
    }
    else {
      rb_funcall(self, s$m).attachEvent('on' + type, listener);
    }});
})(RClass.define('Element',cObject));
