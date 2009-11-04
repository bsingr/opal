(function(self) {
(function(self) {
rb_define_method(self,s$i,function(self,_cmd,tag_name,options){
self.$i_s(i$ay,[document.createElement(tag_name)]);
self.$i_s(i$az,true);
return self.$i_s(i$c,tag_name);
});
self.$def_s(s$gi,function(self,_cmd,current_context){
return self.$i_s(i$ba,current_context);
});
self.$def_s(s$gh,function(self,_cmd){
return rb_ivar_get(self, i$ba);
});
rb_define_method(self,s$jp,function(self,_cmd){
return rb_ivar_get(self, i$az);
});
rb_define_method(self,s$jq,function(self,_cmd,first_time){
return self.$i_s(i$az,first_time);
});
rb_define_method(self,s$j,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ay),s$jr);
});
rb_define_method(self,s$js,function(self,_cmd,element){
return rb_funcall(rb_ivar_get(self, i$ay),s$b,element);
});
rb_define_method(self,s$jt,function(self,_cmd){
return rb_funcall(rb_ivar_get(self, i$ay),s$ju);
});
rb_define_method(self,s$jv,function(self,_cmd,a_selector,block){
var element = rb_funcall(self,s$jw,a_selector);
rb_funcall(self,s$js,element);
arguments[arguments.length -1](self);
return rb_funcall(self, s$jt);
});
rb_define_method(self,s$jx,function(self,_cmd){
return rb_funcall(self, s$j).childNodes.length;});
rb_define_method(self,s$jy,function(self,_cmd,a_number,block){
var e = rb_funcall(self, s$j).childNodes[a_number];
rb_funcall(self,s$js,e);
arguments[arguments.length -1](self);
return rb_funcall(self, s$jt);
});
rb_define_method(self,s$jw,function(self,_cmd,a_selector){
var nodes = rb_funcall(self, s$j).childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == a_selector) {
          return nodes[i];
        }
      }
      return rb_funcall(self, s$j)});
})(RClass.define_under(self,'RenderContext',self.$c_g_full(c$r)));
})(RModule.define('Vienna'));
