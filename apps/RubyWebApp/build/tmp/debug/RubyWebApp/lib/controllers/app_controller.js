(function(self) {
(function(self) {
self.$c_s('TABLE_VIEW_DATA',[VN.$h(_$o, 'Adam', _$ix, 23, _$iy, 'Led Zepplin'),VN.$h(_$o, 'Ben', _$ix, 20, _$iy, 'Pendulum'),VN.$h(_$o, 'Tom', _$ix, 30, _$iy, 'Tweenies'),VN.$h(_$o, 'Becky', _$ix, 12, _$iy, '50 pence'),VN.$h(_$o, 'Dad', _$ix, 24, _$iy, 'Take That'),VN.$h(_$o, 'Mum', _$ix, 25, _$iy, 'Rod Stewart')]);
self.$def(s$as,function(self,_cmd){
self.$i_s(i$if,10);
return self.$i_s(i$ig,false);
});
self.$def(s$aic,function(self,_cmd,table_view){
return VN$(self.$klass.$c_g_full('TABLE_VIEW_DATA'),s$br);
});
self.$def(s$akt,function(self,_cmd,table_view,table_column,row){
return VN$(VN$(self.$klass.$c_g_full('TABLE_VIEW_DATA'),s$bo,row),s$bo,VN$(table_column,s$ali));
});
self.$def(s$aqq,function(self,_cmd){
return self.$i_g(i$if);
});
self.$def(s$aqr,function(self,_cmd){
return self.$i_g(i$ig);
});
self.$def(s$aqs,function(self,_cmd,aValue){
return self.$i_s(i$ig,aValue);
});
self.$def(s$aqt,function(self,_cmd,notification){
});
self.$def(s$aqu,function(self,_cmd,notification){
});
})(RClass.define_under(self,'AppController',cObject));
})(RModule.define('RubyWebApp'));
