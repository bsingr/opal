(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,tag_name,options){
self.$i_s('@element_stack',[document.createElement(rb_funcall(tag_name,'to_s'))]);
self.$i_s('@build_stack',[]);
self.$i_s('@first_time',true);
return self.$i_s('@type',rb_funcall(tag_name,'to_s'));
});
self.$def_s('current_context=',function(self,_,current_context){
return self.$i_s('@current_context',current_context);
});
self.$def_s('current_context',function(self,_){
return rb_ivar_get(self,'@current_context');
});
rb_define_method(self,'first_time?',function(self,_){
return rb_ivar_get(self,'@first_time');
});
rb_define_method(self,'first_time=',function(self,_,first_time){
return self.$i_s('@first_time',first_time);
});
rb_define_method(self,'element',function(self,_){
return rb_funcall(rb_ivar_get(self,'@element_stack'),'last');
});
rb_define_method(self,'push_element_stack',function(self,_,element){
return rb_funcall(rb_ivar_get(self,'@element_stack'),'<<',element);
});
rb_define_method(self,'pop_element_stack',function(self,_){
return rb_funcall(rb_ivar_get(self,'@element_stack'),'pop');
});
rb_define_method(self,'selector',function(self,_,a_selector,block){
var element=rb_funcall(self,'find_selector',a_selector);
rb_funcall(self,'push_element_stack',element);
arguments[arguments.length -1](self);
return rb_funcall(self,'pop_element_stack');
});
rb_define_method(self,'append',function(self,_,tag_name,block){
var append_element=document.createElement(rb_funcall(tag_name,'to_s'));
rb_funcall(self,'element').appendChild(append_element);rb_funcall(self,'push_element_stack',append_element);
arguments[arguments.length -1](self);
return rb_funcall(self,'pop_element_stack',append_element);
});
rb_define_method(self,'build',function(self,_,block){
rb_funcall(rb_ivar_get(self,'@build_stack'),'<<','');
rb_funcall(self,'inner_html=','');
rb_funcall(block,'call',self);
return build_text=rb_funcall(rb_ivar_get(self,'@build_stack'),'pop');
});
rb_define_method(self,'begin',function(self,_,tag_name){
});
rb_define_method(self,'end',function(self,_){
});
rb_define_method(self,'child_nodes',function(self,_){
return rb_funcall(self,'element').childNodes.length;});
rb_define_method(self,'child_node',function(self,_,a_number,block){
var e=rb_funcall(self,'element').childNodes[a_number];
rb_funcall(self,'push_element_stack',e);
arguments[arguments.length -1](self);
return rb_funcall(self,'pop_element_stack');
});
rb_define_method(self,'find_selector',function(self,_,a_selector){
var nodes = rb_funcall(self,'element').childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == rb_funcall(a_selector,'to_s')) {
          return nodes[i];
        }
      }
      return rb_funcall(self,'element')});
})(rb_define_class_under(self,'RenderContext',self.$c_g_full('Element')));
})(rb_define_module('Vienna'));
