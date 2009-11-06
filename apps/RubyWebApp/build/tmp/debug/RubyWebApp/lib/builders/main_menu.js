(function(self) {
return _E(self.$c_g_full(c$b).$c_g('Builder'),s$ap,_$jk,function(builder){
var app_delegate=_E(self.$klass.$c_g_full(c$bu).$c_g('AppController'),s$ap);
_E(self.$klass.$c_g_full(c$q).$c_g('App'),s$ek,app_delegate);
var app_observer=_E(self.$klass.$c_g_full(c$i),s$ap);
window.app_observer = app_observer;_E(app_delegate,s$bo,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window=_E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ap,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,800,100,400,250),[_$hc,_$it]);
return _E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,50,100,700,400),_$dw,'My Window!'),function(win){
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,40,90,24),_$jq,_$ib),function(button){
_E(win,s$e,button);
_E(button,s$sc,'Disabled');
_E(button,s$pw,false);
_E(button,s$qc,_$hh);
return _E(button,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,70,90,24),_$jq,_$ib),function(button){
_E(win,s$e,button);
_E(button,s$sc,'Right');
_E(button,s$pw,false);
_E(button,s$qc,_$gn);
return _E(button,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,100,90,24),_$jq,_$ib),function(button){
_E(win,s$e,button);
_E(button,s$sc,'Check');
_E(button,s$pw,true);
_E(button,s$pz,_$he);
return _E(button,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,130,90,24),_$jq,_$ib),function(button){
_E(win,s$e,button);
_E(button,s$sc,'Checkon');
_E(button,s$sa,_$gs);
return _E(button,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,160,90,24),_$jq,_$ib),function(button){
_E(win,s$e,button);
_E(button,s$sc,'Checkon');
_E(button,s$sa,_$gs);
_E(button,s$pw,false);
return _E(button,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,190,90,24),_$jq,_$ib),function(slider){
_E(win,s$e,slider);
return _E(slider,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,210,180,26),_$cd,true),function(text){
_E(win,s$e,text);
return _E(text,s$mw,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,10,240,90,24),_$jq,_$ib),function(button){
_E(win,s$e,button);
_E(button,s$sc,'Normal');
_E(button,s$qc,_$fz);
return _E(button,s$mw,true);
});
var scroll_view=_E(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,300,100,250,150),_$jr,true),function(scroll_view){
_E(scroll_view,s$yu,true);
_E(_E(scroll_view,s$yz),s$mw,true);
_E(scroll_view,s$yw,true);
_E(_E(scroll_view,s$zb),s$mw,true);
_E(win,s$e,scroll_view);
var table_view=_E(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,0,0,400,200),_$jr,true),function(table_view){
_E(table_view,s$aba,app_delegate);
_E(table_view,s$aca,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'name'));
_E(table_view,s$aca,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'age'));
_E(table_view,s$aca,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'band'));
return _E(table_view,s$acb);
});
_E(scroll_view,s$yj,table_view);
return _E(scroll_view,s$yn);
});
return gauge_view=_E(self.$klass.$c_g_full(c$b).$c_g('GaugeView'),s$lv,VN.$h(_$gc,_E(self.$klass.$c_g_full(c$q).$c_g('Rect'),s$ap,300,275,250,100),_$js,true),function(gauge_view){
return _E(win,s$e,gauge_view);
});
});
});
})(_K(c$bu));
