(function(self) {
rb_define_method(self,s$l,function(self,_cmd,url,options,block){
});
self.$def_s(s$aj,function(self,_cmd,url,options,block){
return rb_funcall(self.$c_g_full(c$e),s$aj,url,options,block);
});
})(RClass.define('JSON',cObject));
(function(self) {
self.$c_s('JSONP_CALLBACKS',[]);
rb_define_method(self,s$l,function(self,_cmd,url,options,block){
self.$i_s(i$d,url);
self.$i_s(i$e,"vn_jsonp_callback_0");
self.$i_s(i$f,block);
rb_funcall(self.$klass.$c_g_full(c$f),s$e,rb_ivar_get(self, i$e));
rb_funcall(self,s$ak,["Initializing JSNOP connection with url: ",(rb_ivar_get(self, i$d))].join(''));
return rb_funcall(self, s$al);
});
rb_define_method(self,s$al,function(self,_cmd){
window[rb_ivar_get(self, i$e)] = function(response) {
      VN$(self, 'got_response', response);
    };self.$i_s(i$g,document.createElement('script'));
rb_ivar_get(self, i$g).setAttribute('type', 'text/javascript');rb_ivar_get(self, i$g).setAttribute('src', rb_ivar_get(self, i$d));document.body.appendChild(rb_ivar_get(self, i$g));});
rb_define_method(self,s$am,function(self,_cmd,response){
rb_funcall(self,s$ak,'got response! toot!');
return rb_funcall(rb_ivar_get(self, i$f),s$an,JSONParserReformatter(response));
});
self.$def_s(s$aj,function(self,_cmd,url,options,block){
return rb_funcall(self,s$ao,url,options,block);
});
})(RClass.define('JSONP',cObject));

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/parse.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/reformatter.js');
