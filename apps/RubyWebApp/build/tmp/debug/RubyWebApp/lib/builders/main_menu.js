(function(self) {
return _E(self.$c_g_full(c$b).$c_g('Builder'),s$ap,_$jv,function(builder){
_E(self,s$al,"well, got here in builder");
var app_delegate=_E(self.$klass.$c_g_full(c$cg).$c_g('AppController'),s$ap);
_E(self.$klass.$c_g_full(c$t).$c_g('App'),s$fz,app_delegate);
var app_observer=_E(self.$klass.$c_g_full(c$j),s$ap);
window.app_observer = app_observer;_E(app_delegate,s$bo,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window=_E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ap,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,800,100,400,250),[_$hn,_$jd]);
return _E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,50,100,700,400),_$dw,'My Window!'),function(win){
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,40,90,24),_$kb,_$ik),function(button){
_E(win,s$e,button);
_E(button,s$zt,'Disabled');
_E(button,s$xm,false);
_E(button,s$ta,_$gh);
return _E(button,s$un,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,70,90,24),_$kb,_$ik),function(button){
_E(win,s$e,button);
_E(button,s$zt,'Right');
_E(button,s$ta,_$gg);
return _E(button,s$un,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,100,90,24),_$kb,_$ik),function(button){
_E(win,s$e,button);
_E(button,s$zt,'Check');
_E(button,s$xm,true);
_E(button,s$xp,_$fz);
return _E(button,s$un,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,130,90,24),_$kb,_$ik),function(button){
_E(win,s$e,button);
_E(button,s$zt,'Checkon');
_E(button,s$zp,_$hd);
return _E(button,s$un,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,160,90,24),_$kb,_$ik),function(button){
_E(win,s$e,button);
_E(button,s$zt,'Checkon');
_E(button,s$zp,_$hd);
_E(button,s$xm,false);
return _E(button,s$un,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,190,90,24),_$kb,_$ik),function(slider){
_E(win,s$e,slider);
_E(slider,s$un,true);
return _E(slider,s$xc,function(sender){
return _E(self,s$al,"yeah!");
});
});
_E(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,50,310,180,24),_$cd,true),function(text){
_E(win,s$e,text);
return _E(text,s$un,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,10,240,90,24),_$kb,_$ik),function(button){
_E(win,s$e,button);
_E(button,s$zt,'Normal');
_E(button,s$ta,_$gf);
return _E(button,s$un,true);
});
return scroll_view=_E(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,300,100,250,150),_$kc,true),function(scroll_view){
_E(scroll_view,s$agc,true);
_E(_E(scroll_view,s$agh),s$un,true);
_E(scroll_view,s$age,true);
_E(_E(scroll_view,s$agj),s$un,true);
_E(win,s$e,scroll_view);
var table_view=_E(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$sc,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$ap,0,0,400,200),_$kc,true),function(table_view){
_E(table_view,s$aig,app_delegate);
_E(table_view,s$ajf,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'name'));
_E(table_view,s$ajf,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'age'));
_E(table_view,s$ajf,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ap,'band'));
return _E(table_view,s$ajg);
});
_E(scroll_view,s$afr,table_view);
return _E(scroll_view,s$afv);
});
});
});
})(_K(c$cg));
