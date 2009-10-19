var $VN_1 = RModule.define('RubyWebApp');
VN$($VN_1.$c_g_full('Vienna').$c_g('Builder'),'new','main_menu',function(builder){
var app_delegate = VN$($VN_1.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),'new');
VN$($VN_1.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',100,100,400,400),'title','My Window!'),function(win){
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,10,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Slider'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,50,90,24),'bezel','rounded'),function(slider){
VN$(win,'<<',slider);
return VN$(slider,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TextField'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,70,180,32),'editable',true),function(text){
VN$(win,'<<',text);
return VN$(text,'needs_display=',true);
});
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,100,90,24),'bezel','rounded'),function(check){
VN$(win,'<<',check);
return VN$(check,'needs_display=',true);
});
});
});
