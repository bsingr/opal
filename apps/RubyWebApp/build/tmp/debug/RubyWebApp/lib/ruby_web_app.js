
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/base.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/browser.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/vienna.js');
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION','0.0.1');
var $VN_2 = RClass.define_under($VN_1, 'AppDelegate',cObject);
$VN_2.$def('initialize',function(self,_cmd){
return self.$i_s('@adam',10);
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
var $VN_2 = RClass.define_under($VN_1, 'TempObserver',cObject);
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(self,_cmd,path,object,change,context){
VN$(self,'puts','holy macaranieieejjcjcjkjkjnjnwkejndwjednjwej');
VN$(self,'puts',['old value is ',(VN$(change,'[]','old'))].join(''));
return VN$(self,'puts',['new value is ',(VN$(change,'[]','new'))].join(''));
});
VN.self.$def_s('main',function(self,_cmd){
var app_delegate = VN$(self.$klass.$c_g_full('RubyWebApp').$c_g('AppDelegate'),'new');
VN$(self.$klass.$c_g_full('Vienna').$c_g('App'),'delegate=',app_delegate);
VN$(self.$klass.$c_g_full('Vienna').$c_g('App'),'run');
var my_win = VN$(self.$klass.$c_g_full('Vienna').$c_g('Window'),'new',VN$(self.$klass.$c_g_full('Vienna').$c_g('Rect'),'new',100,100,100,100),[]);
var my_button = VN$(self.$klass.$c_g_full('Vienna').$c_g('Button'),'new',VN$(self.$klass.$c_g_full('Vienna').$c_g('Rect'),'new',100,100,100,100));
VN$(my_win,'<<',my_button);
VN$(my_button,'needs_display=',true);
VN$(self,'puts','done');
VN$(self,'puts',my_button);
var tracking_area = VN$(self.$klass.$c_g_full('VN').$c_g('TrackingArea'),'tracking_area_with_rect:options:owner:user_info:',nil,nil,nil,nil);
VN$(my_button,'add_tracking_area',tracking_area);
VN$(self,'puts','==================================');
var temp = VN$(self.$klass.$c_g_full('RubyWebApp').$c_g('TempObserver'),'new');
VN$(app_delegate,'add_observer:for_key_path:options:context:',temp,'adam',nil,nil);
VN$(self,'puts','setting value to 10...');
return VN$(app_delegate,'adam=',10);
});
