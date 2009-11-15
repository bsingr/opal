(function(self) {
(function(self) {
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@row_height',17.0);
self.$i_s('@intercell_spacing',rb_funcall(self.$klass.$c_g_full('Size'),'new',3.0,2.0));
self.$i_s('@number_of_rows',rb_funcall((1),'-@'));
self.$i_s('@table_columns',[]);
self.$i_s('@allows_multiple_selection',false);
self.$i_s('@selected_row_indexes',rb_funcall(self.$klass.$c_g_full('IndexSet'),'new'));
self.$i_s('@row_rects',[]);
self.$i_s('@column_rects',[]);
self.$i_s('@header_view',rb_funcall(self.$klass.$c_g_full('TableHeaderView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),17)));
rb_funcall(rb_ivar_get(self,'@header_view'),'table_view=',self);
return self.$i_s('@corner_view',rb_funcall(self.$klass.$c_g_full('TableCornerView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'),rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'))));
});
rb_define_method(self,'data_source=',function(self,_,a_source){
return self.$i_s('@data_source',a_source);
});
rb_define_method(self,'data_source',function(self,_){
return rb_ivar_get(self,'@data_source');
});
rb_define_method(self,'delegate=',function(self,_,a_delegate){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'header_view=',function(self,_,header_view){
return self.$i_s('@header_view',header_view);
});
rb_define_method(self,'header_view',function(self,_){
return rb_ivar_get(self,'@header_view');
});
rb_define_method(self,'corner_view=',function(self,_,corner_view){
return self.$i_s('@corner_view',corner_view);
});
rb_define_method(self,'corner_view',function(self,_){
return rb_ivar_get(self,'@corner_view');
});
rb_define_method(self,'allows_column_reordering=',function(self,_,flag){
return self.$i_s('@allows_column_reordering',flag);
});
rb_define_method(self,'allows_column_reordering?',function(self,_){
return rb_ivar_get(self,'@allows_column_reordering');
});
rb_define_method(self,'allows_column_resizing=',function(self,_,flag){
return self.$i_s('@allows_column_resizing',flag);
});
rb_define_method(self,'allows_column_resizing?',function(self,_){
return rb_ivar_get(self,'@allows_column_resizing');
});
rb_define_method(self,'column_autoresizing_style=',function(self,_,style){
return self.$i_s('@column_autoresizing_style',style);
});
rb_define_method(self,'column_autoresizing_style',function(self,_){
return rb_ivar_get(self,'@column_autoresizing_style');
});
rb_define_method(self,'grid_style_mask=',function(self,_,grid_type){
return self.$i_s('@grid_style_mask',grid_type);
});
rb_define_method(self,'grid_style_mask',function(self,_){
return rb_ivar_get(self,'@grid_style_mask');
});
rb_define_method(self,'intercell_spacing=',function(self,_,size){
return self.$i_s('@intercell_spacing',size);
});
rb_define_method(self,'intercell_spacing',function(self,_){
return rb_ivar_get(self,'@intercell_spacing');
});
rb_define_method(self,'uses_alternating_row_background_colors=',function(self,_,flag){
return self.$i_s('@uses_alternating_row_background_colors',flag);
});
rb_define_method(self,'uses_alternating_row_background_colors?',function(self,_){
return rb_ivar_get(self,'@uses_alternating_row_background_colors');
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'grid_color=',function(self,_,color){
return self.$i_s('@grid_color',color);
});
rb_define_method(self,'grid_color',function(self,_){
return rb_ivar_get(self,'@grid_color');
});
rb_define_method(self,'row_height=',function(self,_,height){
return self.$i_s('@row_height',height);
});
rb_define_method(self,'row_height',function(self,_){
return rb_ivar_get(self,'@row_height');
});
rb_define_method(self,'note_height_of_rows_with_indexes_changed',function(self,_,index_set){
});
rb_define_method(self,'table_columns',function(self,_){
return rb_ivar_get(self,'@table_columns');
});
rb_define_method(self,'number_of_columns',function(self,_){
return rb_funcall(rb_ivar_get(self,'@table_columns'),'length');
});
rb_define_method(self,'number_of_rows',function(self,_){
if(RTEST(rb_funcall(rb_ivar_get(self,'@number_of_rows'),'<',0))){
if(RTEST(rb_ivar_get(self,'@data_source'))){
if(RTEST(rb_funcall(rb_ivar_get(self,'@data_source'),'respond_to?',ID2SYM('number_of_rows_in_table_view')))){
self.$i_s('@number_of_rows',rb_funcall(rb_ivar_get(self,'@data_source'),'number_of_rows_in_table_view',self));
}
else{
rb_funcall(self,'puts',['ERROR: @data_source does not respond to ','#number_of_rows_in_table_view'].join(''));
self.$i_s('@number_of_rows',0);
}
}
else{
self.$i_s('@number_of_rows',0);
}
}
return rb_ivar_get(self,'@number_of_rows');
});
rb_define_method(self,'add_table_column',function(self,_,table_column){
rb_funcall(rb_ivar_get(self,'@table_columns'),'<<',table_column);
rb_funcall(table_column,'table_view=',self);
return rb_funcall(self,'reload_data');
});
rb_define_method(self,'remove_table_column',function(self,_,table_column){
});
self.$def('move_column:to_column:',function(self,_,old_index,new_index){
});
rb_define_method(self,'column_with_identifier',function(self,_){
});
rb_define_method(self,'table_column_with_identifier',function(self,_){
});
rb_define_method(self,'tile',function(self,_){
});
rb_define_method(self,'size_to_fit',function(self,_){
});
rb_define_method(self,'size_last_column_to_fit',function(self,_){
});
rb_define_method(self,'scroll_row_to_visible',function(self,_,row){
});
rb_define_method(self,'scroll_column_to_visible',function(self,_,column){
});
rb_define_method(self,'reload_data',function(self,_){
rb_funcall(self,'note_number_of_rows_changed');
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'note_number_of_rows_changed',function(self,_){
self.$i_s('@number_of_rows',rb_funcall((1),'-@'));
var rows=rb_funcall(self,'number_of_rows');
var size=rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_funcall(rb_ivar_get(self,'@frame'),'width'),rb_funcall(rb_ivar_get(self,'@frame'),'height'));
if(RTEST(rb_funcall(rows,'>',0))){
rb_funcall(size,'width=',rb_funcall(rb_funcall(self,'rect_of_row',0),'width'));
}
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'length'),'>',0))){
rb_funcall(size,'height=',rb_funcall(rb_funcall(self,'rect_of_column',0),'height'));
}
});
rb_define_method(self,'draw_rect',function(self,_,dirty_rect){
rb_funcall(self,'draw_background_in_clip_rect',rb_ivar_get(self,'@bounds'));
rb_funcall(self,'puts',["drawing ",(rb_funcall(self,'number_of_rows'))," rows"].join(''));
return rb_funcall(rb_funcall(self,'number_of_rows'),'times',function(row){
return rb_funcall(self,'draw_row:clip_rect:',row,rb_ivar_get(self,'@bounds'));
});
});
rb_define_method(self,'render',function(self,_,context){
rb_funcall(self,'_synchronize_render_context_with_row_data',context);
rb_funcall(self,'render_background_in_clip_rect',rb_ivar_get(self,'@bounds'),context);
return rb_funcall(rb_funcall(self,'number_of_rows'),'times',function(row){
return rb_funcall(context,'child_node',row,function(row_element){
return rb_funcall(self,'render_row',row,rb_ivar_get(self,'@bounds'),row_element);
});
});
});
rb_define_method(self,'_synchronize_render_context_with_row_data',function(self,_,context){
var children=rb_funcall(context,'child_nodes');
var rows=rb_funcall(self,'number_of_rows');
if(RTEST(rb_funcall(children,'<',rows))){
rb_funcall(children,'times',function(i){
var rect=rb_funcall(self,'rect_of_row',i);
return rb_funcall(context,'child_node',i,function(elem){
return rb_funcall(elem,'css',VN.$h(ID2SYM('width'),[(rb_funcall(rect,'width')),"px"].join('')));
});
});
rb_funcall((rb_funcall(rows,'-',children)),'times',function(i){
var rect=rb_funcall(self,'rect_of_row',rb_funcall(children,'+',i));
return rb_funcall(context,'<<',["<div style='top:",(rb_funcall(rect,'y')),"px;left:",(rb_funcall(rect,'x')),"px;width:",(rb_funcall(rect,'width')),"px;height:",(rb_funcall(rect,'height')),"px;'></div>"].join(''));
});
}
else if(RTEST(rb_funcall(rows,'<',children))){
}
else{
rb_funcall(children,'times',function(i){
var rect=rb_funcall(self,'rect_of_row',i);
return rb_funcall(context,'child_node',i,function(elem){
return rb_funcall(elem,'css',VN.$h(ID2SYM('width'),[(rb_funcall(rect,'width')),"px"].join('')));
});
});
}
});
rb_define_method(self,'render_background_in_clip_rect',function(self,_,clip_rect,context){
return rb_funcall(context,'css',VN.$h(ID2SYM('background_color'),'white'));
});
rb_define_method(self,'render_row',function(self,_,row,clip_rect,row_context){
return rb_funcall(row_context,'build',function(){
if(RTEST(rb_funcall(row,'odd?'))){
rb_funcall(row_context,'css',VN.$h(ID2SYM('background_color'),'rgb(240, 240, 240)'));
}
else{
rb_funcall(row_context,'css',VN.$h(ID2SYM('background'),'none'));
}
if(RTEST(rb_funcall(self,'row_selected?',row))){
rb_funcall(row_context,'css',VN.$h(ID2SYM('background_color'),rb_funcall(rb_funcall(self.$klass.$c_g_full('Color'),'selected_control_color'),'rgb_string')));
}
return rb_funcall(rb_funcall(self,'number_of_columns'),'times',function(column){
var data_cell=rb_funcall(self,'prepared_cell_at_column:row:',column,row);
var table_column=rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column);
if(RTEST(ANDTEST(rb_ivar_get(self,'@delegate'),rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?','table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self,'@delegate'),'table_view:will_display_cell:for_table_column:row:',self,data_cell,table_column,row);
}
var cell_frame=rb_funcall(self,'frame_of_cell_at_column:row:',column,row);
return rb_funcall(row_context,'append',ID2SYM('div'),function(column_context){
rb_funcall(column_context,'frame=',cell_frame);
return rb_funcall(data_cell,'render_with_frame:in_view:',cell_frame,self);
});
});
});
});
self.$def('reload_data_for_row_indexes:column_indexes:',function(self,_,row_indexes,column_indexes){
});
rb_define_method(self,'edited_column',function(self,_){
});
rb_define_method(self,'edited_row',function(self,_){
});
rb_define_method(self,'clicked_column',function(self,_){
});
rb_define_method(self,'clicked_row',function(self,_){
});
rb_define_method(self,'double_action=',function(self,_,selector){
return self.$i_s('@double_action',selector);
});
rb_define_method(self,'double_action',function(self,_){
return rb_ivar_get(self,'@double_action');
});
rb_define_method(self,'sort_descriptors=',function(self,_,array){
return self.$i_s('@sort_descriptors',array);
});
rb_define_method(self,'sort_descriptors',function(self,_){
return rb_ivar_get(self,'@sort_descriptors');
});
self.$def('set_indicator_image:in_table_column:',function(self,_,an_image,table_column){
});
rb_define_method(self,'indicator_image_in_table_column',function(self,_,table_column){
});
rb_define_method(self,'highlighted_table_column=',function(self,_,table_column){
return self.$i_s('@highlighted_table_column',table_column);
});
rb_define_method(self,'highlighted_table_column',function(self,_){
return rb_ivar_get(self,'@highlighted_table_column');
});
rb_define_method(self,'vertical_motion_can_begin_drag=',function(self,_,flag){
return self.$i_s('@vertical_motion_can_begin_drag',flag);
});
rb_define_method(self,'vertical_motion_can_begin_drag',function(self,_){
return rb_ivar_get(self,'@vertical_motion_can_begin_drag');
});
self.$def('can_drag_rows_with_indexes:at_point:',function(self,_,row_indexes,mouse_down_point){
});
self.$def('drag_image_for_rows_with_indexes:table_columns:event:offset:',function(self,_,drag_rows,table_columns,drag_event,drag_image_offset){
});
self.$def('set_dragging_source_operation_mask:for_local:',function(self,_,mask,is_local){
});
self.$def('set_drop_row:drop_operation:',function(self,_,row,drop_operation){
});
rb_define_method(self,'allows_multiple_selection=',function(self,_,flag){
return self.$i_s('@allows_multiple_selection',flag);
});
rb_define_method(self,'allows_multiple_selection?',function(self,_){
return rb_ivar_get(self,'@allows_multiple_selection');
});
rb_define_method(self,'allows_empty_selection=',function(self,_,flag){
return self.$i_s('@allows_empty_selection',flag);
});
rb_define_method(self,'allows_empty_selection?',function(self,_){
return rb_ivar_get(self,'@allows_empty_selection');
});
rb_define_method(self,'allows_column_selection=',function(self,_,flag){
return self.$i_s('@allows_column_selection',flag);
});
rb_define_method(self,'allows_column_selection?',function(self,_){
return rb_ivar_get(self,'@allows_column_selection');
});
rb_define_method(self,'select_all',function(self,_,sender){
});
rb_define_method(self,'deselect_all',function(self,_,sender){
});
self.$def('select_column_indexes:by_extending_selection:',function(self,_,indexes,extend_flag){
});
self.$def('select_row_indexes:by_extending_selection:',function(self,_,indexes,extend_flag){
if(RTEST(ORTEST((rb_funcall(rb_funcall(indexes,'first_index'),'<',0)),(rb_funcall(rb_funcall(indexes,'last_index'),'>=',rb_funcall(self,'number_of_rows')))))){
return ;
}
if(RTEST(extend_flag)){
rb_funcall(rb_ivar_get(self,'@selected_row_indexes'),'add_indexes',indexes);
}
else{
self.$i_s('@selected_row_indexes',indexes);
}
return rb_funcall(self,'needs_display=',true);
});
rb_define_method(self,'selected_column_indexes',function(self,_){
return rb_ivar_get(self,'@selected_column_indexes');
});
rb_define_method(self,'selected_row_indexes',function(self,_){
return rb_ivar_get(self,'@selected_row_indexes');
});
rb_define_method(self,'deselect_column',function(self,_,column){
});
rb_define_method(self,'deselect_row',function(self,_,row){
});
rb_define_method(self,'selected_column',function(self,_){
});
rb_define_method(self,'selected_row',function(self,_){
});
rb_define_method(self,'column_selected?',function(self,_,column){
});
rb_define_method(self,'row_selected?',function(self,_,row){
return RTEST(rb_funcall(rb_ivar_get(self,'@selected_row_indexes'),'include?',row)) ? true : false;
});
rb_define_method(self,'number_of_selected_columns',function(self,_){
});
rb_define_method(self,'number_of_selected_rows',function(self,_){
});
rb_define_method(self,'allows_type_select?',function(self,_){
return rb_ivar_get(self,'@allows_type_select');
});
rb_define_method(self,'allows_type_select=',function(self,_,value){
return self.$i_s('@allows_type_select',value);
});
rb_define_method(self,'selection_highlight_style=',function(self,_,style){
return self.$i_s('@selection_highlight_style',style);
});
rb_define_method(self,'selection_highlight_style',function(self,_){
return rb_ivar_get(self,'@selection_highlight_style');
});
rb_define_method(self,'dragging_destination_feedback_style=',function(self,_,style){
return self.$i_s('@dragging_destination_feedback_style',style);
});
rb_define_method(self,'dragging_destination_feedback_style',function(self,_){
return rb_ivar_get(self,'@dragging_destination_feedback_style');
});
rb_define_method(self,'rect_of_column',function(self,_,column){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,'<',0),rb_funcall(column,'>=',rb_funcall(rb_ivar_get(self,'@table_columns'),'length'))))){
return result;
}
var rows=rb_funcall(self,'number_of_rows');
var i=0;
for (i = 0; i < column; i++) {rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',i),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width'))));
}for (i = 0; i < rows; i++) {rb_funcall(result,'height=',rb_funcall(rb_funcall(result,'height'),'+',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height'))));
}rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width')));
return result;
});
rb_define_method(self,'rect_of_row',function(self,_,row){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(rb_funcall(row,'<',0),rb_funcall(row,'>=',rb_funcall(self,'number_of_rows'))))){
return result;
}
var i=0;
for (i = 0; i < row; i++) {rb_funcall(result,'y=',rb_funcall(rb_funcall(result,'y'),'+',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height'))));
}rb_funcall(result,'width=',rb_funcall(rb_ivar_get(self,'@bounds'),'width'));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height')));
return result;
});
rb_define_method(self,'column_indexes_in_rect',function(self,_,rect){
});
rb_define_method(self,'rows_in_rect',function(self,_,rect){
});
rb_define_method(self,'column_at_point',function(self,_,point){
var result=rb_funcall((1),'-@');
var i=0;
var columns=rb_funcall(self,'number_of_columns');
for (i = 0; i < columns; i++) {if(RTEST(rb_funcall(point,'in_rect?',rb_funcall(self,'rect_of_column',i)))){
return i;
}
}return result;
});
rb_define_method(self,'row_at_point',function(self,_,point){
var result=rb_funcall((1),'-@');
var i=0;
var rows=rb_funcall(self,'number_of_rows');
for (i = 0; i < rows; i++) {if(RTEST(rb_funcall(point,'in_rect?',rb_funcall(self,'rect_of_row',i)))){
return i;
}
}return result;
});
self.$def('frame_of_cell_at_column:row:',function(self,_,column,row){
var result=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
if(RTEST(ORTEST(rb_funcall(column,'<',0),rb_funcall(column,'>',rb_funcall(self,'number_of_columns'))))){
return result;
}
rb_funcall(column,'times',function(i){
return rb_funcall(result,'x=',rb_funcall(rb_funcall(result,'x'),'+',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',i),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width'))));
});
if(!RTEST(rb_funcall(rb_funcall(self,'display_mode'),'==',ID2SYM('render')))){
rb_funcall(row,'times',function(i){
return rb_funcall(result,'y=',rb_funcall(rb_funcall(result,'y'),'+',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height'))));
});
}
rb_funcall(result,'width=',rb_funcall(rb_funcall(rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column),'width'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'width')));
rb_funcall(result,'height=',rb_funcall(rb_ivar_get(self,'@row_height'),'+',rb_funcall(rb_ivar_get(self,'@intercell_spacing'),'height')));
return result;
});
self.$def('prepared_cell_at_column:row:',function(self,_,column,row){
var table_column=rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column);
var cell=rb_funcall(table_column,'data_cell_for_row',row);
rb_funcall(cell,'object_value=',rb_funcall(rb_ivar_get(self,'@data_source'),'table_view:object_value_for_table_column:row:',self,table_column,row));
return cell;
});
rb_define_method(self,'text_should_begin_editing?',function(self,_,text_obj){
});
rb_define_method(self,'text_should_end_editing?',function(self,_,text_obj){
});
rb_define_method(self,'text_did_begin_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_end_editing',function(self,_,notification){
});
rb_define_method(self,'text_did_change',function(self,_,notification){
});
rb_define_method(self,'autosave_name=',function(self,_,name){
return rb_ivar_get(self,'@autosave_name');
});
rb_define_method(self,'autosave_name',function(self,_){
return rb_ivar_get(self,'@autosave_name');
});
rb_define_method(self,'autosave_table_columns=',function(self,_,save){
return rb_ivar_get(self,'@autosave_table_columns');
});
rb_define_method(self,'autosave_table_columns?',function(self,_){
return rb_ivar_get(self,'@autosave_table_columns');
});
self.$def('should_focus_cell:at_column:row:',function(self,_,cell,column,row){
});
rb_define_method(self,'focused_column',function(self,_){
return rb_ivar_get(self,'@focused_column');
});
rb_define_method(self,'focused_column=',function(self,_,column){
return self.$i_s('@focused_column',column);
});
self.$def('perform_click_on_cell_at_column:row:',function(self,_,column,row){
});
rb_define_method(self,'mouse_down',function(self,_,the_event){
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
self.$i_s('@clicked_column',rb_funcall(self,'column_at_point',location));
self.$i_s('@clicked_row',rb_funcall(self,'row_at_point',location));
if(RTEST(rb_funcall(rb_ivar_get(self,'@clicked_row'),'==',rb_funcall((1),'-@')))){
rb_funcall(self,'select_row_indexes:by_extending_selection:',rb_funcall(self.$klass.$c_g_full('IndexSet'),'new'),false);
}
if(RTEST(true)){
if(RTEST(true)){
rb_funcall(self,'_track_selection_event',the_event);
}
}
});
rb_define_method(self,'_track_selection_event',function(self,_,the_event){
rb_funcall(self,'select_row_indexes:by_extending_selection:',rb_funcall(self.$klass.$c_g_full('IndexSet'),'index_set_with_index',rb_ivar_get(self,'@clicked_row')),false);
var mouse_down_row=rb_ivar_get(self,'@clicked_row');
var last_row=mouse_down_row;
if(RTEST(ORTEST(rb_funcall(self,'allows_multiple_selection?'),true))){
rb_funcall(self.$klass.$c_g_full('App'),'bind_events',[ID2SYM('left_mouse_up'),ID2SYM('left_mouse_dragged')],function(the_event){
var location=rb_funcall(self,'convert_point:from_view:',rb_funcall(the_event,'location_in_window'),nil);
self.$i_s('@clicked_row',rb_funcall(self,'row_at_point',location));
if(!RTEST(rb_funcall(last_row,'==',rb_ivar_get(self,'@clicked_row')))){
rb_funcall(self,'select_row_indexes:by_extending_selection:',rb_funcall(self.$klass.$c_g_full('IndexSet'),'index_set_with_indexes_in_range',VN.$r(mouse_down_row,(rb_funcall(rb_ivar_get(self,'@clicked_row'),'+',1)),false)),false);
}
last_row=rb_ivar_get(self,'@clicked_row');
if(RTEST(rb_funcall(rb_funcall(the_event,'type'),'==',ID2SYM('left_mouse_up')))){
rb_funcall(self.$klass.$c_g_full('App'),'unbind_events');
}
});
}
});
self.$def('edit_column:row:with_event:select:',function(self,_,column,row,the_event,select){
});
self.$def('draw_row:clip_rect:',function(self,_,row,clip_rect){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
var columns=rb_funcall(self,'number_of_columns');
if(RTEST(rb_funcall(row,'odd?'))){
var rect_of_row=rb_funcall(self,'rect_of_row',row);
rb_funcall(rb_funcall(self.$klass.$c_g_full('Color'),'control_alternating_row_background_colors'),'set');
rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'rect',rb_funcall(rect_of_row,'x'),rb_funcall(rect_of_row,'y'),rb_funcall(rect_of_row,'width'),rb_funcall(rect_of_row,'height'));
}
return rb_funcall(columns,'times',function(column){
var data_cell=rb_funcall(self,'prepared_cell_at_column:row:',column,row);
var table_column=rb_funcall(rb_ivar_get(self,'@table_columns'),'[]',column);
if(RTEST(ANDTEST(rb_ivar_get(self,'@delegate'),rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?','table_view:will_display_cell:for_table_column:row:')))){
rb_funcall(rb_ivar_get(self,'@delegate'),'table_view:will_display_cell:for_table_column:row:',self,data_cell,table_column,row);
}
var cell_frame=rb_funcall(self,'frame_of_cell_at_column:row:',column,row);
return rb_funcall(data_cell,'draw_with_frame:in_view:',cell_frame,self);
});
});
rb_define_method(self,'highlight_selection_in_clip_rect',function(self,_,clip_rect){
});
rb_define_method(self,'draw_grid_in_clip_rect',function(self,_,clip_rect){
});
rb_define_method(self,'draw_background_in_clip_rect',function(self,_,clip_rect){
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
rb_funcall(rb_funcall(self.$klass.$c_g_full('Color'),'white_color'),'set');
return rb_funcall(ctx,'rect',0,0,rb_funcall(clip_rect,'width'),rb_funcall(clip_rect,'height'));
});
})(rb_define_class_under(self,'TableView',self.$c_g_full('Control')));
(function(self) {
})(rb_define_module('TableViewDelegate'));
(function(self) {
})(rb_define_module('TableViewDataSource'));
})(rb_define_module('Vienna'));
