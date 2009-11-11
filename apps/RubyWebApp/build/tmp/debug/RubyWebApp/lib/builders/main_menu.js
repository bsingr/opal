(function(self) {
return _E(self.$c_g_full(c$b).$c_g('Builder'),s$ap,_$jz,function(builder){
_E(self,s$al,"well, got here in builder");
var app_delegate=_E(self.$klass.$c_g_full(c$bx).$c_g('AppController'),s$ap);
_E(self.$klass.$c_g_full(c$r).$c_g('App'),s$fe,app_delegate);
var app_observer=_E(self.$klass.$c_g_full(c$i),s$ap);
window.app_observer = app_observer;_E(app_delegate,s$bo,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window=_E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ap,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,800,100,400,250),[_$hp,_$jh]);
return _E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,50,100,700,400),_$dw,'My Window!'),function(win){
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,40,90,24),_$ke,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$wv,'Disabled');
_E(button,s$uo,false);
_E(button,s$qb,_$gi);
return _E(button,s$rp,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,70,90,24),_$ke,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$wv,'Right');
_E(button,s$qb,_$gh);
return _E(button,s$rp,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,100,90,24),_$ke,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$wv,'Check');
_E(button,s$uo,true);
_E(button,s$ur,_$hr);
return _E(button,s$rp,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,130,90,24),_$ke,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$wv,'Checkon');
_E(button,s$wr,_$hf);
return _E(button,s$rp,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,160,90,24),_$ke,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$wv,'Checkon');
_E(button,s$wr,_$hf);
_E(button,s$uo,false);
return _E(button,s$rp,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,190,90,24),_$ke,_$ip),function(slider){
_E(win,s$e,slider);
_E(slider,s$rp,true);
return _E(slider,s$ue,function(sender){
return _E(self,s$al,"yeah!");
});
});
_E(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,50,310,180,26),_$cd,true),function(text){
_E(win,s$e,text);
return _E(text,s$rp,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,10,240,90,24),_$ke,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$wv,'Normal');
_E(button,s$qb,_$fy);
return _E(button,s$rp,true);
});
var scroll_view=_E(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,300,100,250,150),_$kf,true),function(scroll_view){
_E(scroll_view,s$add,true);
_E(_E(scroll_view,s$adi),s$rp,true);
_E(scroll_view,s$adf,true);
_E(_E(scroll_view,s$adk),s$rp,true);
_E(win,s$e,scroll_view);
var table_view=_E(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,0,0,400,200),_$kf,true),function(table_view){
_E(table_view,s$afj,app_delegate);
_E(table_view,s$agi,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'name'));
_E(table_view,s$agi,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'age'));
_E(table_view,s$agi,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'band'));
return _E(table_view,s$agj);
});
_E(scroll_view,s$acs,table_view);
return _E(scroll_view,s$acw);
});
return gauge_view=_E(self.$klass.$c_g_full(c$b).$c_g('GaugeView'),s$qo,VN.$h(_$gq,_E(self.$klass.$c_g_full(c$r).$c_g('Rect'),s$ap,300,275,250,100),_$kg,true),function(gauge_view){
return _E(win,s$e,gauge_view);
});
});
});
})(_K(c$bx));
