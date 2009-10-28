var $VN_1 = RClass.define('JSON',cObject);
$VN_1.$def('initialize',function(self,_cmd,url,options,block){
});
$VN_1.$def_s('get',function(self,_cmd,url,options,block){
return VN$(self.$c_g_full('JSONP'),'get',url,options,block);
});
var $VN_1 = RClass.define('JSONP',cObject);
$VN_1.$c_s('JSONP_CALLBACKS',[]);
$VN_1.$def('initialize',function(self,_cmd,url,options,block){
self.$i_s('@url',url);
self.$i_s('@callback',"vn_jsonp_callback_0");
self.$i_s('@block',block);
VN$(self.$klass.$c_g_full('JSONP_CALLBACKS'),'<<',self.$i_g('@callback'));
VN$(self,'puts',["Initializing JSNOP connection with url: ",(self.$i_g('@url'))].join(''));
return VN$(self, 'get!');
});
$VN_1.$def('get!',function(self,_cmd){
window[self.$i_g('@callback')] = function(response) {
      VN$(self, 'got_response', response);
    };self.$i_s('@script',document.createElement('script'));
self.$i_g('@script').setAttribute('type', 'text/javascript');self.$i_g('@script').setAttribute('src', self.$i_g('@url'));document.body.appendChild(self.$i_g('@script'));});
$VN_1.$def('got_response',function(self,_cmd,response){
VN$(self,'puts','got response! toot!');
return VN$(self.$i_g('@block'),'call',JSONParserReformatter(response));
});
$VN_1.$def_s('get',function(self,_cmd,url,options,block){
return VN$(self,'new',url,options,block);
});

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/parse.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/reformatter.js');
