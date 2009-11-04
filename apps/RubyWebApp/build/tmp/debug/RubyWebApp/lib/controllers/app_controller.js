(function(self) {
(function(self) {
self.$c_s('TABLE_VIEW_DATA',[VN.$h(_$o, 'Adam', _$jm, 23, _$jn, 'Led Zepplin'),VN.$h(_$o, 'Ben', _$jm, 20, _$jn, 'Pendulum'),VN.$h(_$o, 'Tom', _$jm, 30, _$jn, 'Tweenies'),VN.$h(_$o, 'Becky', _$jm, 12, _$jn, '50 pence'),VN.$h(_$o, 'Dad', _$jm, 24, _$jn, 'Take That'),VN.$h(_$o, 'Mum', _$jm, 25, _$jn, 'Rod Stewart')]);
rb_define_method(self,s$l,function(self,_cmd){
self.$i_s(i$id,10);
return self.$i_s(i$ie,false);
});
rb_define_method(self,s$aae,function(self,_cmd,table_view){
return rb_funcall(self.$klass.$c_g_full(c$bd),s$nb);
});
self.$def(s$acx,function(self,_cmd,table_view,table_column,row){
return rb_funcall(rb_funcall(self.$klass.$c_g_full(c$bd),s$h,row),s$h,rb_funcall(table_column,s$adm));
});
rb_define_method(self,s$aiy,function(self,_cmd){
return rb_ivar_get(self, i$id);
});
rb_define_method(self,s$aiz,function(self,_cmd){
return rb_ivar_get(self, i$ie);
});
rb_define_method(self,s$aja,function(self,_cmd,aValue){
return self.$i_s(i$ie,aValue);
});
rb_define_method(self,s$ajb,function(self,_cmd,notification){
});
rb_define_method(self,s$ajc,function(self,_cmd,notification){
});
})(RClass.define_under(self,'AppController',cObject));
})(RModule.define('RubyWebApp'));
