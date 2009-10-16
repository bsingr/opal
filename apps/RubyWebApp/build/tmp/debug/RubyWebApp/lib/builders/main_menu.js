var $VN_1 = RModule.define('RubyWebApp');
VN$($VN_1.$c_g_full('Vienna').$c_g('Builder'),'new','main_menu',function(builder){
var app_delegate = VN$($VN_1.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),'new');
VN$($VN_1.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',[0,0,100,100],'title','My Window!'),function(win){
var my_button = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',[0,0,100,100],'bezel','rounded'));
VN$(win,'<<',my_button);
VN$(my_button,'needs_display=',true);
var my_buttons = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',[0,0,100,100],'bezel','rounded'));
VN$(win,'<<',my_buttons);
return VN$(my_button,'needs_display=',true);
});
});
