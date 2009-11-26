
(function(self) {
self.$def_s('ready?',function(self,_,block){
});
self.$def_s('<<',function(self,_,elem){
var e=elem.$i_g('@element');
document.body.appendChild(e);});
self.$def_s('add_event_listener',function(self,_,type,listener){
self.$i_s('@event_listeners',ORTEST(rb_ivar_get(self,'@event_listeners'),VN.$h()));
rb_funcall(rb_ivar_get(self,'@event_listeners'),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(rb_funcall(type,'to_s'), listener, false);
    }
    else {
      document.body.attachEvent('on' + rb_funcall(type,'to_s'), listener);
    }});
self.$def_s('remove_event_listener',function(self,_,type){
var listener=rb_funcall(rb_ivar_get(self,'@event_listeners'),'[]',type);
if (document.addEventListener) {
      document.body.removeEventListener(rb_funcall(type,'to_s'), listener, false);
    }
    else {
      document.body.detachEvent('on' + rb_funcall(type,'to_s'), listener);
    }});
self.$c_g_full('Document').$def_s('age',function(self,_){
return 3;
});
})(rb_define_class('Document',cObject));

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

(function(self) {
rb_define_method(self,'initialize',function(self,_,url,options,block){
});
self.$def_s('get',function(self,_,url,options,block){
return rb_funcall(self.$c_g_full('JSONP'),'get',url,options,block);
});
})(rb_define_class('JSON',cObject));
(function(self) {
self.$c_s('JSONP_CALLBACKS',[]);
rb_define_method(self,'initialize',function(self,_,url,options,block){
self.$i_s('@url',url);
self.$i_s('@callback',"vn_jsonp_callback_0");
self.$i_s('@block',block);
rb_funcall(self.$klass.$c_g_full('JSONP_CALLBACKS'),'<<',rb_ivar_get(self,'@callback'));
rb_funcall(self,'puts',["Initializing JSNOP connection with url: ",(rb_ivar_get(self,'@url'))].join(''));
return rb_funcall(self,'get!');
});
rb_define_method(self,'get!',function(self,_){
window[rb_ivar_get(self,'@callback')] = function(response) {
      rb_funcall(self, 'got_response', response);
    };self.$i_s('@script',document.createElement('script'));
rb_ivar_get(self,'@script').setAttribute('type', 'text/javascript');rb_ivar_get(self,'@script').setAttribute('src', rb_ivar_get(self,'@url'));document.body.appendChild(rb_ivar_get(self,'@script'));});
rb_define_method(self,'got_response',function(self,_,response){
rb_funcall(self,'puts','got response! toot!');
return rb_funcall(rb_ivar_get(self,'@block'),'call',JSONParserReformatter(response));
});
self.$def_s('get',function(self,_,url,options,block){
return rb_funcall(self,'new',url,options,block);
});
})(rb_define_class('JSONP',cObject));
