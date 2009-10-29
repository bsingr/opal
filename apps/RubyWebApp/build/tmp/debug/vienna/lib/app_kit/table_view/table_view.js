var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TableView',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@row_height',17.0);
self.$i_s('@intercell_spacing',VN$(self.$klass.$c_g_full('Size'),'new',3.0,2.0));
self.$i_s('@number_of_rows',VN$((1),'-@'));
self.$i_s('@table_columns',[]);
self.$i_s('@row_rects',[]);
self.$i_s('@column_rects',[]);
self.$i_s('@header_view',VN$(self.$klass.$c_g_full('TableHeaderView'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(self.$i_g('@bounds'),'width'),17)));
VN$(self.$i_g('@header_view'),'table_view=',self);
return self.$i_s('@corner_view',VN$(self.$klass.$c_g_full('TableCornerView'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'),VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'))));
});
$VN_2.$def('data_source=',function(self,_cmd,a_source){
VN$(self, 'will_change_value_for_key', 'data_source');
self.$i_s('@data_source',a_source);
VN$(self, 'did_change_value_for_key', 'data_source');
});
$VN_2.$def('data_source',function(self,_cmd){
return self.$i_g('@data_source');
});
$VN_2.$def('delegate=',function(self,_cmd,a_delegate){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_g('@delegate');
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('header_view=',function(self,_cmd,header_view){
VN$(self, 'will_change_value_for_key', 'header_view');
self.$i_s('@header_view',header_view);
VN$(self, 'did_change_value_for_key', 'header_view');
});
$VN_2.$def('header_view',function(self,_cmd){
return self.$i_g('@header_view');
});
$VN_2.$def('corner_view=',function(self,_cmd,corner_view){
VN$(self, 'will_change_value_for_key', 'corner_view');
self.$i_s('@corner_view',corner_view);
VN$(self, 'did_change_value_for_key', 'corner_view');
});
$VN_2.$def('corner_view',function(self,_cmd){
return self.$i_g('@corner_view');
});
$VN_2.$def('allows_column_reordering=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_column_reordering');
self.$i_s('@allows_column_reordering',flag);
VN$(self, 'did_change_value_for_key', 'allows_column_reordering');
});
$VN_2.$def('allows_column_reordering?',function(self,_cmd){
return self.$i_g('@allows_column_reordering');
});
$VN_2.$def('allows_column_resizing=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_column_resizing');
self.$i_s('@allows_column_resizing',flag);
VN$(self, 'did_change_value_for_key', 'allows_column_resizing');
});
$VN_2.$def('allows_column_resizing?',function(self,_cmd){
return self.$i_g('@allows_column_resizing');
});
$VN_2.$def('column_autoresizing_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'column_autoresizing_style');
self.$i_s('@column_autoresizing_style',style);
VN$(self, 'did_change_value_for_key', 'column_autoresizing_style');
});
$VN_2.$def('column_autoresizing_style',function(self,_cmd){
return self.$i_g('@column_autoresizing_style');
});
$VN_2.$def('grid_style_mask=',function(self,_cmd,grid_type){
VN$(self, 'will_change_value_for_key', 'grid_style_mask');
self.$i_s('@grid_style_mask',grid_type);
VN$(self, 'did_change_value_for_key', 'grid_style_mask');
});
$VN_2.$def('grid_style_mask',function(self,_cmd){
return self.$i_g('@grid_style_mask');
});
$VN_2.$def('intercell_spacing=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'intercell_spacing');
self.$i_s('@intercell_spacing',size);
VN$(self, 'did_change_value_for_key', 'intercell_spacing');
});
$VN_2.$def('intercell_spacing',function(self,_cmd){
return self.$i_g('@intercell_spacing');
});
$VN_2.$def('uses_alternating_row_background_colors=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'uses_alternating_row_background_colors');
self.$i_s('@uses_alternating_row_background_colors',flag);
VN$(self, 'did_change_value_for_key', 'uses_alternating_row_background_colors');
});
$VN_2.$def('uses_alternating_row_background_colors?',function(self,_cmd){
return self.$i_g('@uses_alternating_row_background_colors');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('grid_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'grid_color');
self.$i_s('@grid_color',color);
VN$(self, 'did_change_value_for_key', 'grid_color');
});
$VN_2.$def('grid_color',function(self,_cmd){
return self.$i_g('@grid_color');
});
$VN_2.$def('row_height=',function(self,_cmd,height){
VN$(self, 'will_change_value_for_key', 'row_height');
self.$i_s('@row_height',height);
VN$(self, 'did_change_value_for_key', 'row_height');
});
$VN_2.$def('row_height',function(self,_cmd){
return self.$i_g('@row_height');
});
$VN_2.$def('note_height_of_rows_with_indexes_changed',function(self,_cmd,index_set){
});
$VN_2.$def('table_columns',function(self,_cmd){
return self.$i_g('@table_columns');
});
$VN_2.$def('number_of_columns',function(self,_cmd){
return VN$(self.$i_g('@table_columns'),'length');
});
$VN_2.$def('number_of_rows',function(self,_cmd){
if(RTEST(VN$(self.$i_g('@number_of_rows'),'<',0))){
if(RTEST(self.$i_g('@data_source'))){
if(RTEST(VN$(self.$i_g('@data_source'),'respond_to?','number_of_rows_in_table_view'))){
self.$i_s('@number_of_rows',VN$(self.$i_g('@data_source'),'number_of_rows_in_table_view',self));
}
else{
VN$(self,'puts',['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s('@number_of_rows',0);
}
}
else{
self.$i_s('@number_of_rows',0);
}
}
return self.$i_g('@number_of_rows');
});
$VN_2.$def('add_table_column',function(self,_cmd,table_column){
VN$(self.$i_g('@table_columns'),'<<',table_column);
VN$(table_column,'table_view=',self);
return VN$(self, 'reload_data');
});
$VN_2.$def('remove_table_column',function(self,_cmd,table_column){
});
$VN_2.$def('move_column:to_column:',function(self,_cmd,old_index,new_index){
});
$VN_2.$def('column_with_identifier',function(self,_cmd){
});
$VN_2.$def('table_column_with_identifier',function(self,_cmd){
});
$VN_2.$def('tile',function(self,_cmd){
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('size_last_column_to_fit',function(self,_cmd){
});
$VN_2.$def('scroll_row_to_visible',function(self,_cmd,row){
});
$VN_2.$def('scroll_column_to_visible',function(self,_cmd,column){
});
$VN_2.$def('reload_data',function(self,_cmd){
VN$(self, 'note_number_of_rows_changed');
return VN$(self,'needs_display=',true);
});
$VN_2.$def('note_number_of_rows_changed',function(self,_cmd){
self.$i_s('@number_of_rows',VN$((1),'-@'));
var rows = VN$(self,'number_of_rows');
var size = VN$(self.$klass.$c_g_full('Size'),'new',VN$(self.$i_g('@frame'),'width'),VN$(self.$i_g('@frame'),'height'));
if(RTEST(VN$(rows,'>',0))){
VN$(size,'width=',VN$(VN$(self,'rect_of_row',0),'width'));
}
if(RTEST(VN$(VN$(self.$i_g('@table_columns'),'length'),'>',0))){
VN$(size,'height=',VN$(VN$(self,'rect_of_column',0),'height'));
}
});
$VN_2.$def('render',function(self,_cmd,context){
VN$(self,'_synchronize_render_context_with_row_data',context);
VN$(self,'render_background_in_clip_rect',self.$i_g('@bounds'),context);
return VN$(VN$(self, 'number_of_rows'),'times',function(row){
return VN$(context,'child_node',row,function(row_element){
return VN$(self,'render_row',row,self.$i_g('@bounds'),row_element);
});
});
});
$VN_2.$def('_synchronize_render_context_with_row_data',function(self,_cmd,context){
var children = VN$(context,'child_nodes');
var rows = VN$(self, 'number_of_rows');
if(RTEST(VN$(children,'<',rows))){
VN$(children,'times',function(i){
var rect = VN$(self,'rect_of_row',i);
return VN$(context,'child_node',i,function(elem){
return VN$(elem,'css',VN.$h('width',[(VN$(rect,'width')),"px"].join('')));
});
});
VN$((VN$(rows,'-',children)),'times',function(i){
var rect = VN$(self,'rect_of_row',VN$(children,'+',i));
return VN$(context,'<<',["<div style='top:",(VN$(rect,'y')),"px;left:",(VN$(rect,'x')),"px;width:",(VN$(rect,'width')),"px;height:",(VN$(rect,'height')),"px;'></div>"].join(''));
});
}
else if(RTEST(VN$(rows,'<',children))){
}
else{
VN$(children,'times',function(i){
var rect = VN$(self,'rect_of_row',i);
return VN$(context,'child_node',i,function(elem){
return VN$(elem,'css',VN.$h('width',[(VN$(rect,'width')),"px"].join('')));
});
});
}
});
$VN_2.$def('render_background_in_clip_rect',function(self,_cmd,clip_rect,context){
return VN$(context,'css',VN.$h('background_color','white'));
});
$VN_2.$def('render_row',function(self,_cmd,row,clip_rect,context){
var color = VN$((VN$(row,'*',10)),'+',150);
var children = VN$(context,'child_nodes');
var columns = VN$(self, 'number_of_columns');
if(RTEST(VN$(children,'<',columns))){
VN$((VN$(columns,'-',children)),'times',function(i){
return VN$(context,'<<',"<div></div>");
});
}
else if(RTEST(VN$(columns,'<',children))){
}
else{
}
if(RTEST(VN$(row,'odd?'))){
VN$(context,'css',VN.$h('background_color','rgb(234, 234, 234)'));
}
return VN$(columns,'times',function(column){
var data_cell = VN$(self,'prepared_cell_at_column:row:',column,row);
var table_column = VN$(self.$i_g('@table_columns'),'[]',column);
if(RTEST(ANDTEST(self.$i_g('@delegate'),VN$(self.$i_g('@delegate'),'respond_to?','table_view:will_display_cell:for_table_column:row:')))){
VN$(self.$i_g('@delegate'),'table_view:will_display_cell:for_table_column:row:',self,data_cell,table_column,row);
}
var cell_frame = VN$(self,'frame_of_cell_at_column:row:',column,row);
return VN$(context,'child_node',column,function(column_context){
if(RTEST(VN$(column,'<',children))){
VN$(column_context,'first_time=',false);
}
else{
VN$(column_context,'first_time=',true);
}
VN$(self.$klass.$c_g_full('RenderContext'),'current_context=',column_context);
VN$(column_context,'frame=',cell_frame);
return VN$(data_cell,'render_with_frame:in_view:',cell_frame,self);
});
});
});
$VN_2.$def('reload_data_for_row_indexes:column_indexes:',function(self,_cmd,row_indexes,column_indexes){
});
$VN_2.$def('edited_column',function(self,_cmd){
});
$VN_2.$def('edited_row',function(self,_cmd){
});
$VN_2.$def('clicked_column',function(self,_cmd){
});
$VN_2.$def('clicked_row',function(self,_cmd){
});
$VN_2.$def('double_action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'double_action');
self.$i_s('@double_action',selector);
VN$(self, 'did_change_value_for_key', 'double_action');
});
$VN_2.$def('double_action',function(self,_cmd){
return self.$i_g('@double_action');
});
$VN_2.$def('sort_descriptors=',function(self,_cmd,array){
VN$(self, 'will_change_value_for_key', 'sort_descriptors');
self.$i_s('@sort_descriptors',array);
VN$(self, 'did_change_value_for_key', 'sort_descriptors');
});
$VN_2.$def('sort_descriptors',function(self,_cmd){
return self.$i_g('@sort_descriptors');
});
$VN_2.$def('set_indicator_image:in_table_column:',function(self,_cmd,an_image,table_column){
});
$VN_2.$def('indicator_image_in_table_column',function(self,_cmd,table_column){
});
$VN_2.$def('highlighted_table_column=',function(self,_cmd,table_column){
VN$(self, 'will_change_value_for_key', 'highlighted_table_column');
self.$i_s('@highlighted_table_column',table_column);
VN$(self, 'did_change_value_for_key', 'highlighted_table_column');
});
$VN_2.$def('highlighted_table_column',function(self,_cmd){
return self.$i_g('@highlighted_table_column');
});
$VN_2.$def('vertical_motion_can_begin_drag=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'vertical_motion_can_begin_drag');
self.$i_s('@vertical_motion_can_begin_drag',flag);
VN$(self, 'did_change_value_for_key', 'vertical_motion_can_begin_drag');
});
$VN_2.$def('vertical_motion_can_begin_drag',function(self,_cmd){
return self.$i_g('@vertical_motion_can_begin_drag');
});
$VN_2.$def('can_drag_rows_with_indexes:at_point:',function(self,_cmd,row_indexes,mouse_down_point){
});
$VN_2.$def('drag_image_for_rows_with_indexes:table_columns:event:offset:',function(self,_cmd,drag_rows,table_columns,drag_event,drag_image_offset){
});
$VN_2.$def('set_dragging_source_operation_mask:for_local:',function(self,_cmd,mask,is_local){
});
$VN_2.$def('set_drop_row:drop_operation:',function(self,_cmd,row,drop_operation){
});
$VN_2.$def('allows_multiple_selection=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_multiple_selection');
self.$i_s('@allows_multiple_selection',flag);
VN$(self, 'did_change_value_for_key', 'allows_multiple_selection');
});
$VN_2.$def('allows_multiple_selection?',function(self,_cmd){
return self.$i_g('@allows_multiple_selection');
});
$VN_2.$def('allows_empty_selection=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_empty_selection');
self.$i_s('@allows_empty_selection',flag);
VN$(self, 'did_change_value_for_key', 'allows_empty_selection');
});
$VN_2.$def('allows_empty_selection?',function(self,_cmd){
return self.$i_g('@allows_empty_selection');
});
$VN_2.$def('allows_column_selection=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_column_selection');
self.$i_s('@allows_column_selection',flag);
VN$(self, 'did_change_value_for_key', 'allows_column_selection');
});
$VN_2.$def('allows_column_selection?',function(self,_cmd){
return self.$i_g('@allows_column_selection');
});
$VN_2.$def('select_all',function(self,_cmd,sender){
});
$VN_2.$def('deselect_all',function(self,_cmd,sender){
});
$VN_2.$def('select_column_indexes:by_extending_selection:',function(self,_cmd,indexes,extend_flag){
});
$VN_2.$def('select_row_indexes:by_extending_selection:',function(self,_cmd,indexes,extend_flag){
});
$VN_2.$def('selected_column_indexes',function(self,_cmd){
return self.$i_g('@selected_column_indexes');
});
$VN_2.$def('selected_row_indexes',function(self,_cmd){
return self.$i_g('@selected_row_indexes');
});
$VN_2.$def('deselect_column',function(self,_cmd,column){
});
$VN_2.$def('deselect_row',function(self,_cmd,row){
});
$VN_2.$def('selected_column',function(self,_cmd){
});
$VN_2.$def('selected_row',function(self,_cmd){
});
$VN_2.$def('column_selected?',function(self,_cmd,column){
});
$VN_2.$def('row_selected?',function(self,_cmd,row){
});
$VN_2.$def('number_of_selected_columns',function(self,_cmd){
});
$VN_2.$def('number_of_selected_rows',function(self,_cmd){
});
$VN_2.$def('allows_type_select?',function(self,_cmd){
return self.$i_g('@allows_type_select');
});
$VN_2.$def('allows_type_select=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'allows_type_select');
self.$i_s('@allows_type_select',value);
VN$(self, 'did_change_value_for_key', 'allows_type_select');
});
$VN_2.$def('selection_highlight_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'selection_highlight_style');
self.$i_s('@selection_highlight_style',style);
VN$(self, 'did_change_value_for_key', 'selection_highlight_style');
});
$VN_2.$def('selection_highlight_style',function(self,_cmd){
return self.$i_g('@selection_highlight_style');
});
$VN_2.$def('dragging_destination_feedback_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'dragging_destination_feedback_style');
self.$i_s('@dragging_destination_feedback_style',style);
VN$(self, 'did_change_value_for_key', 'dragging_destination_feedback_style');
});
$VN_2.$def('dragging_destination_feedback_style',function(self,_cmd){
return self.$i_g('@dragging_destination_feedback_style');
});
$VN_2.$def('rect_of_column',function(self,_cmd,column){
var result = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(VN$(column,'<',0),VN$(column,'>=',VN$(self.$i_g('@table_columns'),'length'))))){
return result;
}
var rows = VN$(self, 'number_of_rows');
var i = 0;
for (i = 0; i < column; i++) {VN$(result,'x=',VN$(VN$(result,'x'),'+',VN$(VN$(VN$(self.$i_g('@table_columns'),'[]',i),'width'),'+',VN$(self.$i_g('@intercell_spacing'),'width'))));
}for (i = 0; i < rows; i++) {VN$(result,'height=',VN$(VN$(result,'height'),'+',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height'))));
}return result;
});
$VN_2.$def('rect_of_row',function(self,_cmd,row){
var result = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(VN$(row,'<',0),VN$(row,'>=',VN$(self,'number_of_rows'))))){
return result;
}
var i = 0;
for (i = 0; i < row; i++) {VN$(result,'y=',VN$(VN$(result,'y'),'+',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height'))));
}VN$(result,'width=',VN$(self.$i_g('@bounds'),'width'));
VN$(result,'height=',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height')));
return result;
});
$VN_2.$def('column_indexes_in_rect',function(self,_cmd,rect){
});
$VN_2.$def('rows_in_rect',function(self,_cmd,rect){
});
$VN_2.$def('column_at_point',function(self,_cmd,point){
});
$VN_2.$def('row_at_point',function(self,_cmd,point){
});
$VN_2.$def('frame_of_cell_at_column:row:',function(self,_cmd,column,row){
var result = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(VN$(column,'<',0),VN$(column,'>',VN$(self, 'number_of_columns'))))){
return result;
}
VN$(column,'times',function(i){
return VN$(result,'x=',VN$(VN$(result,'x'),'+',VN$(VN$(VN$(self.$i_g('@table_columns'),'[]',i),'width'),'+',VN$(self.$i_g('@intercell_spacing'),'width'))));
});
VN$(result,'width=',VN$(VN$(VN$(self.$i_g('@table_columns'),'[]',column),'width'),'+',VN$(self.$i_g('@intercell_spacing'),'width')));
VN$(result,'height=',VN$(self.$i_g('@row_height'),'+',VN$(self.$i_g('@intercell_spacing'),'height')));
return result;
});
$VN_2.$def('prepared_cell_at_column:row:',function(self,_cmd,column,row){
var table_column = VN$(self.$i_g('@table_columns'),'[]',column);
var cell = VN$(table_column,'data_cell_for_row',row);
VN$(cell,'object_value=',VN$(self.$i_g('@data_source'),'table_view:object_value_for_table_column:row:',self,table_column,row));
return cell;
});
$VN_2.$def('text_should_begin_editing?',function(self,_cmd,text_obj){
});
$VN_2.$def('text_should_end_editing?',function(self,_cmd,text_obj){
});
$VN_2.$def('text_did_begin_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_end_editing',function(self,_cmd,notification){
});
$VN_2.$def('text_did_change',function(self,_cmd,notification){
});
$VN_2.$def('autosave_name=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'autosave_name');
self.$i_g('@autosave_name');
VN$(self, 'did_change_value_for_key', 'autosave_name');
});
$VN_2.$def('autosave_name',function(self,_cmd){
return self.$i_g('@autosave_name');
});
$VN_2.$def('autosave_table_columns=',function(self,_cmd,save){
VN$(self, 'will_change_value_for_key', 'autosave_table_columns');
self.$i_g('@autosave_table_columns');
VN$(self, 'did_change_value_for_key', 'autosave_table_columns');
});
$VN_2.$def('autosave_table_columns?',function(self,_cmd){
return self.$i_g('@autosave_table_columns');
});
$VN_2.$def('should_focus_cell:at_column:row:',function(self,_cmd,cell,column,row){
});
$VN_2.$def('focused_column',function(self,_cmd){
return self.$i_g('@focused_column');
});
$VN_2.$def('focused_column=',function(self,_cmd,column){
VN$(self, 'will_change_value_for_key', 'focused_column');
self.$i_s('@focused_column',column);
VN$(self, 'did_change_value_for_key', 'focused_column');
});
$VN_2.$def('perform_click_on_cell_at_column:row:',function(self,_cmd,column,row){
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
VN$(self,'puts','mouse down');
var location = VN$(self,'convert_point:from_view:',VN$(the_event,'location_in_window'),nil);
return VN$(self,'puts',[(VN$(location,'x')),", ",(VN$(location,'y'))].join(''));
});
$VN_2.$def('edit_column:row:with_event:select:',function(self,_cmd,column,row,the_event,select){
});
$VN_2.$def('draw_row:clip_rect:',function(self,_cmd,row,clip_rect){
});
$VN_2.$def('highlight_selection_in_clip_rect',function(self,_cmd,clip_rect){
});
$VN_2.$def('draw_grid_in_clip_rect',function(self,_cmd,clip_rect){
});
$VN_2.$def('draw_background_in_clip_rect',function(self,_cmd,clip_rect){
});
