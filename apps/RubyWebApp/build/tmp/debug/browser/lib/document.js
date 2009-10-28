var $VN_1 = RClass.define('Document',cObject);
$VN_1.$def_s('ready?',function(self,_cmd,block){
});
$VN_1.$def_s('<<',function(self,_cmd,elem){
var e = elem.$i_g('@element');
document.body.appendChild(e);});
$VN_1.$def_s('add_event_listener',function(self,_cmd,type,listener){
self.$i_s('@event_listeners',ORTEST(self.$i_g('@event_listeners'),VN.$h()));
VN$(self.$i_g('@event_listeners'),'[]=',type,listener);
if (document.addEventListener) {
      document.body.addEventListener(type, listener, false);
    }
    else {
      document.body.attachEvent('on' + type, listener);
    }});
$VN_1.$def_s('remove_event_listener',function(self,_cmd,type){
var listener = VN$(self.$i_g('@event_listeners'),'[]',type);
if (document.addEventListener) {
      document.body.removeEventListener(type, listener, false);
    }
    else {
      document.body.detachEvent('on' + type, listener);
    }});
$VN_1.$c_g_full('Document').$def_s('age',function(self,_cmd){
return 3;
});
