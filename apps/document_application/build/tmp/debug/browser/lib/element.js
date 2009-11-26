(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('element'));
(function(self) {
self.$def_s('find',function(self,_,the_id){
document.getElementById(the_id)});
self.$def_s('[]',function(self,_,id){
return rb_funcall(self,'find',id);
});
self.$def_s('body',function(self,_){
document.body});
})(self);
rb_define_method(self,'initialize',function(self,_,type,options){
self.$i_s('@element',document.createElement(rb_funcall(type,'to_s')));
return self.$i_s('@type',type);
});
rb_define_method(self,'element',function(self,_){
return rb_ivar_get(self,'@element');
});
rb_define_method(self,'class_name=',function(self,_,name){
rb_funcall(self,'element').className = name;});
rb_define_method(self,'css',function(self,_,options){
rb_funcall(options,'each',function(key,value){
rb_funcall(self,'element').style[rb_funcall(rb_funcall(key,'to_s'),'camelize')] = value; });
return self;
});
rb_define_method(self,'set_attribute',function(self,_,key,value){
rb_funcall(self,'element').setAttribute(rb_funcall(key,'to_s'), value);});
rb_define_method(self,'src=',function(self,_,obj){
rb_funcall(self,'element').src = obj;});
rb_define_method(self,'inner_text=',function(self,_,str){
rb_funcall(self,'element').innerHTML = str;});
rb_define_method(self,'frame=',function(self,_,new_frame){
rb_funcall(self,'origin=',rb_funcall(new_frame,'origin'));
return rb_funcall(self,'size=',rb_funcall(new_frame,'size'));
});
rb_define_method(self,'origin=',function(self,_,new_origin){
rb_funcall(self,'element').style.left = rb_funcall(new_origin,'x') + 'px';rb_funcall(self,'element').style.top = rb_funcall(new_origin,'y') + 'px';});
rb_define_method(self,'size=',function(self,_,new_size){
if(RTEST(rb_funcall(rb_ivar_get(self,'@type'),'==','canvas'))){
rb_funcall(self,'element').width = rb_funcall(new_size,'width');rb_funcall(self,'element').height = rb_funcall(new_size,'height');}
else{
rb_funcall(self,'element').style.width = rb_funcall(new_size,'width') + 'px';rb_funcall(self,'element').style.height = rb_funcall(new_size,'height') + 'px';}
});
rb_define_method(self,'remove',function(self,_,other){
rb_funcall(self,'element').removeChild(rb_funcall(other,'element'));});
rb_define_method(self,'<<',function(self,_,other){
if(RTEST(ORTEST(rb_funcall(other,'instance_of?',self.$klass.$c_g_full('String')),rb_funcall(other,'instance_of?',self.$klass.$c_g_full('Number'))))){
rb_funcall(self,'element').innerHTML += other;}
else if(RTEST(rb_funcall(other,'nil?'))){
}
else{
rb_funcall(self,'element').appendChild(rb_funcall(other,'element'));}
});
rb_define_method(self,'append_raw_element',function(self,_,raw_element){
rb_funcall(self,'element').appendChild(raw_element);});
rb_define_method(self,'inner_html=',function(self,_,str){
rb_funcall(self,'element').innerHTML = str;});
rb_define_method(self,'observe',function(self,_,type,block){
self.$i_s('@event_listeners',ORTEST(rb_ivar_get(self,'@event_listeners'),VN.$h()));
rb_funcall(rb_ivar_get(self,'@event_listeners'),'[]=',type,block);
if (document.addEventListener) {
      rb_funcall(self,'element').addEventListener(rb_funcall(type,'to_s'), rb_funcall(self,'listener'), false);
    }
    else {
      rb_funcall(self,'element').attachEvent('on' + rb_funcall(type,'to_s'), rb_funcall(self,'listener'));
    }});
rb_define_method(self,'add_event_listener',function(self,_,type,listener){
if (document.addEventListener) {
      rb_funcall(self,'element').addEventListener(rb_funcall(type,'to_s'), listener, false);
    }
    else {
      rb_funcall(self,'element').attachEvent('on' + rb_funcall(type,'to_s'), listener);
    }});
})(rb_define_class('Element',cObject));
