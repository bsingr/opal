var $VN_1 = RModule.define('RubyWebApp');
VN$($VN_1.$c_g_full('Vienna').$c_g('Builder'),'new','main_menu',function(builder){
var app_delegate = VN$($VN_1.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),'new');
VN$($VN_1.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',100,100,400,400),'title','My Window!'),function(win){
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,10,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Normal');
VN$(button,'alignment=','left');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,40,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Disabled');
VN$(button,'enabled=',false);
VN$(button,'alignment=','center');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,70,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Right');
VN$(button,'enabled=',false);
VN$(button,'alignment=','right');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,100,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Check');
VN$(button,'enabled=',true);
return VN$(button,'needs_display=',true);
});
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,130,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Checkon');
VN$(button,'state=','on');
return VN$(button,'needs_display=',true);
});
});
});
