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
