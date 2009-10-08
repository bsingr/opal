
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/base.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/browser.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/vienna.js');
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION','0.0.1');
var $VN_2 = RClass.define_under($VN_1, 'AppDelegate', cObject);
$VN_2.$def('initialize_with:john:assign:key:',function(bob,adam,fors,adam){
var self=this;
self.$i_s('@adam',10);
return self.$('bob',[10,34,self.$i_g('@benny')]);
});
$VN_2.$def('will_finish_launching',function(notification){
var self=this;
self.$('puts',['Application will finish launching!']);
return self.$klass.$c_g_full('VN').$c_g('Application');
});
$VN_2.$def('did_finish_launching',function(notification){
var self=this;
return self.$('puts',['Application did finish launching!!']);
});
VN.self.$('set_value:for_key:',[10,'bob']);
VN.self.$('set_value:for_key:',[100,'adam']);
if((e=true,e!==nil && e!==false)){
VN.self.$('puts',[3]);
}
else{
VN.self.$('puts',[5]);
}
var dave = 34;
