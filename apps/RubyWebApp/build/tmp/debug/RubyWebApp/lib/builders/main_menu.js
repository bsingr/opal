(function(self) {
return VN$(self.$c_g_full('Vienna').$c_g('Builder'),s$is,_$iq,function(builder){
var app_delegate = VN$(self.$klass.$c_g_full('RubyWebApp').$c_g('AppController'),s$is);
VN$(self.$klass.$c_g_full('VN').$c_g('App'),'delegate=',app_delegate);
var app_observer = VN$(self.$klass.$c_g_full('Object'),s$is);
window.app_observer = app_observer;VN$(app_delegate,s$kx,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window = VN$(self.$klass.$c_g_full('Vienna').$c_g('Window'),s$is,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,800,100,400,250),[_$gu,_$hz]);
return VN$(self.$klass.$c_g_full('Vienna').$c_g('Window'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,50,100,700,400),_$dv,'My Window!'),function(win){
VN$(self.$klass.$c_g_full('Vienna').$c_g('Button'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,40,90,24),_$iv,_$ht),function(button){
VN$(win,s$cv,button);
VN$(button,'title=','Disabled');
VN$(button,'enabled=',false);
VN$(button,'alignment=',_$gz);
return VN$(button,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('Button'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,70,90,24),_$iv,_$ht),function(button){
VN$(win,s$cv,button);
VN$(button,'title=','Right');
VN$(button,'enabled=',false);
VN$(button,'alignment=',_$gf);
return VN$(button,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('CheckBox'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,100,90,24),_$iv,_$ht),function(button){
VN$(win,s$cv,button);
VN$(button,'title=','Check');
VN$(button,'enabled=',true);
VN$(button,'control_size=',_$gw);
return VN$(button,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('CheckBox'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,130,90,24),_$iv,_$ht),function(button){
VN$(win,s$cv,button);
VN$(button,'title=','Checkon');
VN$(button,'state=',_$gk);
return VN$(button,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('CheckBox'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,160,90,24),_$iv,_$ht),function(button){
VN$(win,s$cv,button);
VN$(button,'title=','Checkon');
VN$(button,'state=',_$gk);
VN$(button,'enabled=',false);
return VN$(button,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('Slider'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,190,90,24),_$iv,_$ht),function(slider){
VN$(win,s$cv,slider);
return VN$(slider,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('TextField'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,210,180,26),_$cc,true),function(text){
VN$(win,s$cv,text);
return VN$(text,'needs_display=',true);
});
VN$(self.$klass.$c_g_full('Vienna').$c_g('Button'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,10,240,90,24),_$iv,_$ht),function(button){
VN$(win,s$cv,button);
VN$(button,'title=','Normal');
VN$(button,'alignment=',_$fq);
return VN$(button,'needs_display=',true);
});
return scroll_view = VN$(self.$klass.$c_g_full('Vienna').$c_g('ScrollView'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,300,100,250,150),_$iw,true),function(scroll_view){
VN$(scroll_view,'has_vertical_scroller=',true);
VN$(VN$(scroll_view,s$afh),'needs_display=',true);
VN$(scroll_view,'has_horizontal_scroller=',true);
VN$(VN$(scroll_view,s$afj),'needs_display=',true);
VN$(win,s$cv,scroll_view);
var table_view = VN$(self.$klass.$c_g_full('Vienna').$c_g('TableView'),s$sw,VN.$h(_$ft,VN$(self.$klass.$c_g_full('VN').$c_g('Rect'),s$is,VN$((20),s$eg),VN$((20),s$eg),400,200),_$iw,true),function(table_view){
VN$(table_view,'data_source=',app_delegate);
var name_col = VN$(self.$klass.$c_g_full('Vienna').$c_g('TableColumn'),s$is,'name');
VN$(table_view,s$aid,name_col);
var age_col = VN$(self.$klass.$c_g_full('Vienna').$c_g('TableColumn'),s$is,'age');
VN$(table_view,s$aid,age_col);
var band_col = VN$(self.$klass.$c_g_full('Vienna').$c_g('TableColumn'),s$is,'band');
VN$(table_view,s$aid,band_col);
return VN$(table_view,s$aie);
});
VN$(scroll_view,'document_view=',table_view);
return VN$(scroll_view,s$aev);
});
});
});
})(RModule.define('RubyWebApp'));
