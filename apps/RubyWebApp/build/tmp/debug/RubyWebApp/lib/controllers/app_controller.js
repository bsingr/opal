var $VN_1 = RModule.define('RubyWebApp');
var $VN_2 = RClass.define_under($VN_1, 'AppController',cObject);
$VN_2.$c_s('TABLE_VIEW_DATA',[VN.$h('name', 'Adam', 'age', 23, 'band', 'Led Zepplin'),VN.$h('name', 'Ben', 'age', 20, 'band', 'Pendulum'),VN.$h('name', 'Tom', 'age', 30, 'band', 'Tweenies'),VN.$h('name', 'Becky', 'age', 12, 'band', '50 pence'),VN.$h('name', 'Dad', 'age', 24, 'band', 'Take That'),VN.$h('name', 'Mum', 'age', 25, 'band', 'Rod Stewart')]);
$VN_2.$def('initialize',function(self,_cmd){
self.$i_s('@adam',10);
return self.$i_s('@test_binding',false);
});
$VN_2.$def('number_of_rows_in_table_view',function(self,_cmd,table_view){
return VN$(self.$klass.$c_g_full('TABLE_VIEW_DATA'),'length');
});
$VN_2.$def('table_view:object_value_for_table_column:row:',function(self,_cmd,table_view,table_column,row){
});
$VN_2.$def('adam?',function(self,_cmd){
return self.$i_g('@adam');
});
$VN_2.$def('test_binding',function(self,_cmd){
return self.$i_g('@test_binding');
});
$VN_2.$def('test_binding=',function(self,_cmd,aValue){
VN$(self, 'will_change_value_for_key', 'test_binding');
self.$i_s('@test_binding',aValue);
VN$(self, 'did_change_value_for_key', 'test_binding');
});
$VN_2.$def('will_finish_launching',function(self,_cmd,notification){
});
$VN_2.$def('did_finish_launching',function(self,_cmd,notification){
});
