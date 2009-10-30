(function(self) {
self.$def(s$as,function(self,_cmd,url,options,block){
});
self.$def_s(s$ju,function(self,_cmd,url,options,block){
return VN$(self.$c_g_full('JSONP'),s$ju,url,options,block);
});
})(RClass.define('JSON',cObject));
(function(self) {
self.$c_s('JSONP_CALLBACKS',[]);
self.$def(s$as,function(self,_cmd,url,options,block){
self.$i_s(i$f,url);
self.$i_s(i$g,"vn_jsonp_callback_0");
self.$i_s(i$h,block);
VN$(self.$klass.$c_g_full('JSONP_CALLBACKS'),s$cv,self.$i_g(i$g));
VN$(self,s$ag,["Initializing JSNOP connection with url: ",(self.$i_g(i$f))].join(''));
return VN$(self, s$jv);
});
self.$def(s$jv,function(self,_cmd){
window[self.$i_g(i$g)] = function(response) {
      VN$(self, 'got_response', response);
    };self.$i_s(i$i,document.createElement('script'));
self.$i_g(i$i).setAttribute('type', 'text/javascript');self.$i_g(i$i).setAttribute('src', self.$i_g(i$f));document.body.appendChild(self.$i_g(i$i));});
self.$def(s$jw,function(self,_cmd,response){
VN$(self,s$ag,'got response! toot!');
return VN$(self.$i_g(i$h),s$it,JSONParserReformatter(response));
});
self.$def_s(s$ju,function(self,_cmd,url,options,block){
return VN$(self,s$is,url,options,block);
});
})(RClass.define('JSONP',cObject));

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/parse.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/reformatter.js');
