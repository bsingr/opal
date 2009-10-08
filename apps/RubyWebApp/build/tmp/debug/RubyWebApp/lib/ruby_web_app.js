
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/base.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/browser.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/vienna.js');
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION','0.0.1');
var $VN_2 = RClass.define_under($VN_1, 'AppDelegate', cObject);
$VN_2.$def('initialize:john:assign:key:',function(bob,adam,fors,adam){
var self=this;
self.$i_s('@adam',10);
self.$('bob',[10,34,self.$i_g('@benny')]);
});
$VN_2.$def('will_finish_launching',function(notification){
var self=this;
self.$('puts',['Application will finish launching!']);
});
$VN_2.$def('did_finish_launching',function(notification){
var self=this;
self.$('puts',['Application did finish launching!!']);
});
