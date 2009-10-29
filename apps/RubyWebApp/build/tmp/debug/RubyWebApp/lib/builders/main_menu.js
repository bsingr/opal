var $VN_1 = RModule.define('RubyWebApp');
VN$($VN_1.$c_g_full('Vienna').$c_g('Builder'),'new','main_menu',function(builder){
var app_delegate = VN$($VN_1.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),'new');
VN$($VN_1.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
var hud_window = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'new',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',800,100,400,250),['hud','closable']);
return VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Window'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',50,100,700,400),'title','My Window!'),function(win){
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
VN$(button,'control_size=','small');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,130,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Checkon');
VN$(button,'state=','on');
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('CheckBox'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,160,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Checkon');
VN$(button,'state=','on');
VN$(button,'enabled=',false);
return VN$(button,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Slider'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,190,90,24),'bezel','rounded'),function(slider){
VN$(win,'<<',slider);
return VN$(slider,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TextField'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,210,180,26),'editable',true),function(text){
VN$(win,'<<',text);
return VN$(text,'needs_display=',true);
});
VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('Button'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',10,240,90,24),'bezel','rounded'),function(button){
VN$(win,'<<',button);
VN$(button,'title=','Normal');
VN$(button,'alignment=','left');
VN$(button,'bind:to_object:with_key_path:options:','enabled',app_delegate,'test_binding',nil);
return VN$(button,'needs_display=',true);
});
return scroll_view = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('ScrollView'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',300,100,250,150),'something',true),function(scroll_view){
VN$(win,'<<',scroll_view);
var table_view = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableView'),'build',VN.$h('frame',VN$($VN_1.$klass.$c_g_full('VN').$c_g('Rect'),'new',VN$((20),'-@'),VN$((20),'-@'),400,200),'something',true),function(table_view){
VN$(table_view,'data_source=',app_delegate);
var name_col = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableColumn'),'new','name');
VN$(table_view,'add_table_column',name_col);
var age_col = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableColumn'),'new','age');
VN$(table_view,'add_table_column',age_col);
var band_col = VN$($VN_1.$klass.$c_g_full('Vienna').$c_g('TableColumn'),'new','band');
VN$(table_view,'add_table_column',band_col);
return VN$(table_view,'reload_data');
});
VN$(scroll_view,'document_view=',table_view);
return VN$(scroll_view,'tile');
});
});
});
