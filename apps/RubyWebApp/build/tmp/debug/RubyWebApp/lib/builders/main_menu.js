(function(self) {
return _E(self.$c_g_full(c$b).$c_g('Builder'),s$as,_$ki,function(builder){
_E(self,s$ao,"well, got here in builder");
var app_delegate=_E(self.$klass.$c_g_full(c$cr).$c_g('AppController'),s$as);
_E(self.$klass.$c_g_full(c$t).$c_g('App'),s$gc,app_delegate);
var app_observer=_E(self.$klass.$c_g_full(c$j),s$as);
window.app_observer = app_observer;_E(app_delegate,s$br,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window=_E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$as,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,800,100,400,250),[_$hu,_$jq]);
return _E(self.$klass.$c_g_full(c$b).$c_g('Window'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,50,100,700,400),_$dw,'My Window!'),function(win){
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,40,90,24),_$kr,_$ir),function(button){
_E(win,s$e,button);
_E(button,s$aae,'Disabled');
_E(button,s$xx,false);
_E(button,s$tf,_$gh);
return _E(button,s$us,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,70,90,24),_$kr,_$ir),function(button){
_E(win,s$e,button);
_E(button,s$aae,'Right');
_E(button,s$ve,[_$ee,_$gv]);
_E(button,s$tf,_$gg);
return _E(button,s$us,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,100,90,24),_$kr,_$ir),function(button){
_E(win,s$e,button);
_E(button,s$aae,'Check');
_E(button,s$xx,true);
_E(button,s$ya,_$fz);
return _E(button,s$us,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,130,90,24),_$kr,_$ir),function(button){
_E(win,s$e,button);
_E(button,s$aae,'Checkon');
_E(button,s$aaa,_$hk);
return _E(button,s$us,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,160,90,24),_$kr,_$ir),function(button){
_E(win,s$e,button);
_E(button,s$aae,'Checkon');
_E(button,s$aaa,_$hk);
_E(button,s$xx,false);
return _E(button,s$us,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,190,90,24),_$kr,_$ir),function(slider){
_E(win,s$e,slider);
_E(slider,s$us,true);
return _E(slider,s$xn,function(sender){
return _E(self,s$ao,"yeah!");
});
});
_E(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,50,310,180,24),_$cd,true),function(text){
_E(win,s$e,text);
return _E(text,s$us,true);
});
_E(self.$klass.$c_g_full(c$b).$c_g('Button'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,10,240,90,24),_$kr,_$ir),function(button){
_E(win,s$e,button);
_E(button,s$aae,'Normal');
_E(button,s$tf,_$gf);
return _E(button,s$us,true);
});
return scroll_view=_E(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,300,100,250,150),_$ks,true),function(scroll_view){
_E(scroll_view,s$agl,true);
_E(_E(scroll_view,s$agq),s$us,true);
_E(scroll_view,s$agn,true);
_E(_E(scroll_view,s$ags),s$us,true);
_E(scroll_view,s$ve,[_$ee,_$gx]);
_E(win,s$e,scroll_view);
var table_view=_E(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$sh,VN.$h(_$gp,_E(self.$klass.$c_g_full(c$t).$c_g('Rect'),s$as,0,0,400,200),_$ks,true),function(table_view){
_E(table_view,s$aip,app_delegate);
_E(table_view,s$ajo,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$as,'name'));
_E(table_view,s$ajo,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$as,'age'));
_E(table_view,s$ajo,_E(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$as,'band'));
return _E(table_view,s$ajp);
});
_E(scroll_view,s$aga,table_view);
return _E(scroll_view,s$age);
});
});
});
})(_K(c$cr));
