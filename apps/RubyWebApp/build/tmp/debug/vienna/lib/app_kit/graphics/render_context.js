(function(self) {
(function(self) {
self.$def(s$as,function(self,_cmd,tag_name,options){
self.$i_s(i$ba,[document.createElement(tag_name)]);
self.$i_s(i$bb,true);
return self.$i_s(i$e,tag_name);
});
self.$def_s(s$po,function(self,_cmd,current_context){
return self.$i_s(i$bc,current_context);
});
self.$def_s(s$pn,function(self,_cmd){
return self.$i_g(i$bc);
});
self.$def(s$sn,function(self,_cmd){
return self.$i_g(i$bb);
});
self.$def(s$so,function(self,_cmd,first_time){
return self.$i_s(i$bb,first_time);
});
self.$def(s$jf,function(self,_cmd){
return VN$(self.$i_g(i$ba),s$fv);
});
self.$def(s$sp,function(self,_cmd,element){
return VN$(self.$i_g(i$ba),s$cv,element);
});
self.$def(s$sq,function(self,_cmd){
return VN$(self.$i_g(i$ba),s$fx);
});
self.$def(s$sr,function(self,_cmd,a_selector,block){
var element = VN$(self,s$ss,a_selector);
VN$(self,s$sp,element);
arguments[arguments.length -1](self);
return VN$(self, s$sq);
});
self.$def(s$st,function(self,_cmd){
return VN$(self, s$jf).childNodes.length;});
self.$def(s$su,function(self,_cmd,a_number,block){
var e = VN$(self, s$jf).childNodes[a_number];
VN$(self,s$sp,e);
arguments[arguments.length -1](self);
return VN$(self, s$sq);
});
self.$def(s$ss,function(self,_cmd,a_selector){
var nodes = VN$(self, s$jf).childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == a_selector) {
          return nodes[i];
        }
      }
      return VN$(self, s$jf)});
})(RClass.define_under(self,'RenderContext',self.$c_g_full('Element')));
})(RModule.define('Vienna'));
