
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/base.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/browser.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/vienna.js');
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION','0.0.1');
var $VN_2 = RClass.define_under($VN_1, 'AppDelegate',cObject);
$VN_2.$def('initialize_with:john:assign:key:',function(self,_cmd,bob,adam,fors,adam){
self.$i_s('@adam',10);
return VN$(self,'bob',10,34,self.$i_g('@benny'));
});
$VN_2.$def('will_finish_launching',function(self,_cmd,notification){
VN$(self,'puts','Application will finish launching!');
return self.$klass.$c_g_full('VN').$c_g('Application');
});
$VN_2.$def('did_finish_launching',function(self,_cmd,notification){
return VN$(self,'puts','Application did finish launching!!');
});
$VN_2.$def('adam=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'adam');
VN$(self, 'did_change_value_for_key', 'adam');
});
$VN_2.$def('other_object=',function(self,_cmd,now){
VN$(self, 'will_change_value_for_key', 'other_object');
VN$(self,'puts',now);
VN$(self, 'did_change_value_for_key', 'other_object');
});
VN.self.$def_s('main',function(self,_cmd){
var app_delegate = VN$(self.$klass.$c_g_full('RubyWebApp').$c_g('AppDelegate'),'new');
VN$(self.$klass.$c_g_full('Vienna').$c_g('App'),'run');
return my_win = VN$(self.$klass.$c_g_full('Vienna').$c_g('Window'),'new',VN$(self.$klass.$c_g_full('Vienna').$c_g('Rect'),'new',100,100),[]);
});
