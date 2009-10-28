var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TableColumn',cObject);
$VN_2.$def('initialize',function(self,_cmd,identifier){
VN$(self,'identifier=',identifier);
self.$i_s('@data_cell',VN$(self.$klass.$c_g_full('TextFieldCell'),'new',''));
return self.$i_s('@width',100);
});
$VN_2.$def('identifier=',function(self,_cmd,identifier){
VN$(self, 'will_change_value_for_key', 'identifier');
self.$i_s('@identifier',identifier);
VN$(self, 'did_change_value_for_key', 'identifier');
});
$VN_2.$def('identifier',function(self,_cmd){
return self.$i_g('@identifier');
});
$VN_2.$def('table_view=',function(self,_cmd,table_view){
VN$(self, 'will_change_value_for_key', 'table_view');
self.$i_s('@table_view',table_view);
VN$(self, 'did_change_value_for_key', 'table_view');
});
$VN_2.$def('table_view',function(self,_cmd){
return self.$i_g('@table_view');
});
$VN_2.$def('width=',function(self,_cmd,width){
VN$(self, 'will_change_value_for_key', 'width');
self.$i_g('@width');
VN$(self, 'did_change_value_for_key', 'width');
});
$VN_2.$def('width',function(self,_cmd){
return self.$i_g('@width');
});
$VN_2.$def('min_width=',function(self,_cmd,min_width){
VN$(self, 'will_change_value_for_key', 'min_width');
self.$i_s('@min_width',min_width);
VN$(self, 'did_change_value_for_key', 'min_width');
});
$VN_2.$def('min_width',function(self,_cmd){
return self.$i_g('@min_width');
});
$VN_2.$def('max_width=',function(self,_cmd,max_width){
VN$(self, 'will_change_value_for_key', 'max_width');
self.$i_s('@max_width',max_width);
VN$(self, 'did_change_value_for_key', 'max_width');
});
$VN_2.$def('max_width',function(self,_cmd){
return self.$i_g('@max_width');
});
$VN_2.$def('header_cell=',function(self,_cmd,cell){
VN$(self, 'will_change_value_for_key', 'header_cell');
self.$i_s('@header_cell',cell);
VN$(self, 'did_change_value_for_key', 'header_cell');
});
$VN_2.$def('header_cell',function(self,_cmd){
return self.$i_g('@header_cell');
});
$VN_2.$def('data_cell',function(self,_cmd){
return self.$i_g('@data_cell');
});
$VN_2.$def('data_cell=',function(self,_cmd,data_cell){
VN$(self, 'will_change_value_for_key', 'data_cell');
self.$i_s('@data_cell',data_cell);
VN$(self, 'did_change_value_for_key', 'data_cell');
});
$VN_2.$def('data_cell_for_row',function(self,_cmd){
return self.$i_g('@data_cell_for_row');
});
$VN_2.$def('editable=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'editable');
self.$i_g('@editable');
VN$(self, 'did_change_value_for_key', 'editable');
});
$VN_2.$def('editable?',function(self,_cmd){
return self.$i_g('@editable');
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('sort_descriptor_prototype=',function(self,_cmd,sort_descriptor){
VN$(self, 'will_change_value_for_key', 'sort_descriptor_prototype');
self.$i_s('@sort_descriptor_prototype',sort_descriptor);
VN$(self, 'did_change_value_for_key', 'sort_descriptor_prototype');
});
$VN_2.$def('sort_descriptor_prototype',function(self,_cmd){
return self.$i_g('@sort_descriptor_prototype');
});
$VN_2.$def('resizing_mask=',function(self,_cmd,resizing_mask){
VN$(self, 'will_change_value_for_key', 'resizing_mask');
self.$i_s('@resizing_mask',resizing_mask);
VN$(self, 'did_change_value_for_key', 'resizing_mask');
});
$VN_2.$def('resizing_mask',function(self,_cmd){
return self.$i_g('@resizing_mask');
});
$VN_2.$def('header_tool_tip=',function(self,_cmd,string){
VN$(self, 'will_change_value_for_key', 'header_tool_tip');
self.$i_s('@header_tool_tip',string);
VN$(self, 'did_change_value_for_key', 'header_tool_tip');
});
$VN_2.$def('header_tool_tip',function(self,_cmd){
return self.$i_g('@heder_tool_tip');
});
$VN_2.$def('hidden?',function(self,_cmd){
return self.$i_g('@hidden');
});
$VN_2.$def('hidden=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'hidden');
self.$i_s('@hidden',flag);
VN$(self, 'did_change_value_for_key', 'hidden');
});
