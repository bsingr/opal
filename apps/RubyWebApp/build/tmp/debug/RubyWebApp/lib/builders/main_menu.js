(function(self) {
return rb_funcall(self.$c_g_full(c$b).$c_g('Builder'),s$ao,_$jf,function(builder){
var app_delegate = rb_funcall(self.$klass.$c_g_full(c$bb).$c_g('AppController'),s$ao);
rb_funcall(self.$klass.$c_g_full(c$h).$c_g('App'),'delegate=',app_delegate);
var app_observer = rb_funcall(self.$klass.$c_g_full(c$bc),s$ao);
window.app_observer = app_observer;rb_funcall(app_delegate,s$bn,app_observer,'adam',nil,'adams context');
window.app_delegate = app_delegate;
    var hud_window = rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ao,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,800,100,400,250),[_$gw,_$io]);
return rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Window'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,50,100,700,400),_$dx,'My Window!'),function(win){
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Button'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,40,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Disabled');
rb_funcall(button,'enabled=',false);
rb_funcall(button,'alignment=',_$hb);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Button'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,70,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Right');
rb_funcall(button,'enabled=',false);
rb_funcall(button,'alignment=',_$gh);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,100,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Check');
rb_funcall(button,'enabled=',true);
rb_funcall(button,'control_size=',_$gy);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,130,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Checkon');
rb_funcall(button,'state=',_$gm);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('CheckBox'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,160,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Checkon');
rb_funcall(button,'state=',_$gm);
rb_funcall(button,'enabled=',false);
return rb_funcall(button,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Slider'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,190,90,24),_$jk,_$hw),function(slider){
rb_funcall(win,s$e,slider);
return rb_funcall(slider,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TextField'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,210,180,26),_$ce,true),function(text){
rb_funcall(win,s$e,text);
return rb_funcall(text,'needs_display=',true);
});
rb_funcall(self.$klass.$c_g_full(c$b).$c_g('Button'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,10,240,90,24),_$jk,_$hw),function(button){
rb_funcall(win,s$e,button);
rb_funcall(button,'title=','Normal');
rb_funcall(button,'alignment=',_$fs);
return rb_funcall(button,'needs_display=',true);
});
return scroll_view = rb_funcall(self.$klass.$c_g_full(c$b).$c_g('ScrollView'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,300,100,250,150),_$jl,true),function(scroll_view){
rb_funcall(scroll_view,'has_vertical_scroller=',true);
rb_funcall(rb_funcall(scroll_view,s$xf),'needs_display=',true);
rb_funcall(scroll_view,'has_horizontal_scroller=',true);
rb_funcall(rb_funcall(scroll_view,s$xh),'needs_display=',true);
rb_funcall(win,s$e,scroll_view);
var table_view = rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableView'),s$ka,VN.$h(_$fv,rb_funcall(self.$klass.$c_g_full(c$h).$c_g('Rect'),s$ao,0,0,400,200),_$jl,true),function(table_view){
rb_funcall(table_view,'data_source=',app_delegate);
rb_funcall(table_view,s$aaf,rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ao,'name'));
rb_funcall(table_view,s$aaf,rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ao,'age'));
rb_funcall(table_view,s$aaf,rb_funcall(self.$klass.$c_g_full(c$b).$c_g('TableColumn'),s$ao,'band'));
return rb_funcall(table_view,s$aag);
});
rb_funcall(scroll_view,'document_view=',table_view);
return rb_funcall(scroll_view,s$wt);
});
});
});
})(RModule.define('RubyWebApp'));
