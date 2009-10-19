var $VN_1 = RModule.define('RubyWebApp');
VN$($VN_1.$c_g_full('Vienna').$c_g('Builder'),'new','main_menu',function(builder){
var app_delegate = VN$($VN_1.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),'new');
VN$($VN_1.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',100,100,400,400),'title','My Window!'),function(win){
var my_button = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,10,90,24),'bezel','rounded'));
VN$(win,'<<',my_button);
VN$(my_button,'needs_display=',true);
var my_slider = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Slider'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,50,90,24),'bezel','rounded'));
VN$(win,'<<',my_slider);
VN$(my_slider,'needs_display=',true);
var my_text_field = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TextField'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,70,180,32)));
VN$(win,'<<',my_text_field);
VN$(my_text_field,'needs_display=',true);
var my_check = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,100,90,24),'bezel','rounded'));
VN$(win,'<<',my_check);
return VN$(my_check,'needs_display=',true);
});
});
