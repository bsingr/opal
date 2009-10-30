var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'RenderContext',$VN_2.$c_g_full('Element'));
$VN_2.$def('initialize',function(self,_cmd,tag_name,options){
self.$i_s('@element_stack',[document.createElement(tag_name)]);
self.$i_s('@first_time',true);
return self.$i_s('@type',tag_name);
});
$VN_2.$def_s('current_context=',function(self,_cmd,current_context){
return self.$i_s('@current_context',current_context);
});
$VN_2.$def_s('current_context',function(self,_cmd){
return self.$i_g('@current_context');
});
$VN_2.$def('first_time?',function(self,_cmd){
return self.$i_g('@first_time');
});
$VN_2.$def('first_time=',function(self,_cmd,first_time){
return self.$i_s('@first_time',first_time);
});
$VN_2.$def('element',function(self,_cmd){
return VN$(self.$i_g('@element_stack'),'last');
});
$VN_2.$def('push_element_stack',function(self,_cmd,element){
return VN$(self.$i_g('@element_stack'),'<<',element);
});
$VN_2.$def('pop_element_stack',function(self,_cmd){
return VN$(self.$i_g('@element_stack'),'pop');
});
$VN_2.$def('selector',function(self,_cmd,a_selector,block){
var element = VN$(self,'find_selector',a_selector);
VN$(self,'push_element_stack',element);
arguments[arguments.length -1](self);
return VN$(self, 'pop_element_stack');
});
$VN_2.$def('child_nodes',function(self,_cmd){
return VN$(self, 'element').childNodes.length;});
$VN_2.$def('child_node',function(self,_cmd,a_number,block){
var e = VN$(self, 'element').childNodes[a_number];
VN$(self,'push_element_stack',e);
arguments[arguments.length -1](self);
return VN$(self, 'pop_element_stack');
});
$VN_2.$def('find_selector',function(self,_cmd,a_selector){
var nodes = VN$(self, 'element').childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == a_selector) {
          return nodes[i];
        }
      }
      return VN$(self, 'element')});
