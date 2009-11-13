(function(self) {
_I(self,s$n,function(self,_,url,options,block){
});
self.$def_s(s$al,function(self,_,url,options,block){
return _E(self.$c_g_full(c$g),s$al,url,options,block);
});
})(_M(c$h,cObject));
(function(self) {
self.$c_s('JSONP_CALLBACKS',[]);
_I(self,s$n,function(self,_,url,options,block){
self.$i_s(i$d,url);
self.$i_s(i$e,"vn_jsonp_callback_0");
self.$i_s(i$f,block);
_E(self.$klass.$c_g_full(c$i),s$e,_H(self,i$e));
_E(self,s$am,["Initializing JSNOP connection with url: ",(_H(self,i$d))].join(''));
return _E(self,s$an);
});
_I(self,s$an,function(self,_){
window[_H(self,i$e)] = function(response) {
      VN$(self, 'got_response', response);
    };self.$i_s(i$g,document.createElement('script'));
_H(self,i$g).setAttribute('type', 'text/javascript');_H(self,i$g).setAttribute('src', _H(self,i$d));document.body.appendChild(_H(self,i$g));});
_I(self,s$ao,function(self,_,response){
_E(self,s$am,'got response! toot!');
return _E(_H(self,i$f),s$ap,JSONParserReformatter(response));
});
self.$def_s(s$al,function(self,_,url,options,block){
return _E(self,s$aq,url,options,block);
});
})(_M(c$g,cObject));

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/parse.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/json/reformatter.js');
