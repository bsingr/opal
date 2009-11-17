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
      VN$(self, 'got_response', response);
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
