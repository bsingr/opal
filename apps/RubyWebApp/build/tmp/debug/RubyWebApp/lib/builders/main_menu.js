(function(self) {
return _E(self.$c_g_full(c$b).$c_g('Builder'),s$aq,_$kg,function(builder){
_E(self,s$am,"well, got here in builder");
var app_delegate=_E(self.$klass.$c_g_full(c$cp).$c_g('AppController'),s$aq);
_E(self.$klass.$c_g_full(c$t).$c_g('App'),s$ga,app_delegate);
var app_observer=_E(self.$klass.$c_g_full(c$j),s$aq);
window.app_observer = app_observer;_E(app_delegate,s$bp,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window=_E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$aq,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,800,100,400,250),[_$hs,_$jo]);
return _E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,50,100,700,400),_$dw,'My Window!'),function(win){
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,40,90,24),_$kl,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$zx,'Disabled');
_E(button,s$xq,false);
_E(button,s$tc,_$gh);
return _E(button,s$um,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,70,90,24),_$kl,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$zx,'Right');
_E(button,s$ux,[_$ee,_$gu]);
_E(button,s$tc,_$gg);
return _E(button,s$um,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,100,90,24),_$kl,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$zx,'Check');
_E(button,s$xq,true);
_E(button,s$xt,_$fz);
return _E(button,s$um,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,130,90,24),_$kl,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$zx,'Checkon');
_E(button,s$zt,_$hi);
return _E(button,s$um,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,160,90,24),_$kl,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$zx,'Checkon');
_E(button,s$zt,_$hi);
_E(button,s$xq,false);
return _E(button,s$um,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,190,90,24),_$kl,_$ip),function(slider){
_E(win,s$e,slider);
_E(slider,s$um,true);
return _E(slider,s$xg,function(sender){
return _E(self,s$am,"yeah!");
});
});
_E(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,50,310,180,24),_$cd,true),function(text){
_E(win,s$e,text);
return _E(text,s$um,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,10,240,90,24),_$kl,_$ip),function(button){
_E(win,s$e,button);
_E(button,s$zx,'Normal');
_E(button,s$tc,_$gf);
return _E(button,s$um,true);
});
return scroll_view=_E(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,300,100,250,150),_$km,true),function(scroll_view){
_E(scroll_view,s$age,true);
_E(_E(scroll_view,s$agj),s$um,true);
_E(scroll_view,s$agg,true);
_E(_E(scroll_view,s$agl),s$um,true);
_E(scroll_view,s$ux,[_$ee,_$gw]);
_E(win,s$e,scroll_view);
var table_view=_E(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$se,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$aq,0,0,400,200),_$km,true),function(table_view){
_E(table_view,s$aii,app_delegate);
_E(table_view,s$ajh,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$aq,'name'));
_E(table_view,s$ajh,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$aq,'age'));
_E(table_view,s$ajh,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$aq,'band'));
return _E(table_view,s$aji);
});
_E(scroll_view,s$aft,table_view);
return _E(scroll_view,s$afx);
});
});
});
})(_K(c$cp));
