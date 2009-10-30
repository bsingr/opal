var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TableHeaderView',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def('table_view=',function(self,_cmd,table_view){
return self.$i_s('@table_view',table_view);
});
$VN_2.$def('table_view',function(self,_cmd){
return self.$i_g('@table_view');
});
$VN_2.$def('dragged_column',function(self,_cmd){
return self.$i_g('@dragged_column');
});
$VN_2.$def('dragged_distance',function(self,_cmd){
return self.$i_g('@dragged_distance');
});
$VN_2.$def('resized_column',function(self,_cmd){
return self.$i_g('@resized_column');
});
$VN_2.$def('header_rect_of_column',function(self,_cmd,column){
});
$VN_2.$def('column_at_point',function(self,_cmd,point){
});
