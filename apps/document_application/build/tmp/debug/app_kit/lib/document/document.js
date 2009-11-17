(function(self) {
self.$c_s('DOCUMENT_CHANGE_TYPES',VN.$h(ID2SYM('done'), 0, ID2SYM('undone'), 1, ID2SYM('cleared'), 2, ID2SYM('redone'), 5, ID2SYM('read_other_contents'), 3, ID2SYM('autosaved'), 4));
self.$c_s('SAVE_OPERATION_TYPES',VN.$h(ID2SYM('save_operation'), 0, ID2SYM('save_as_operation'), 1, ID2SYM('save_to_operation'), 2, ID2SYM('autosave_operation'), 3));
(function(self) {
rb_define_method(self,'initialize',function(self,_){
return rb_supcall(arguments.callee, self,_,[]);
});
self.$def('init_with_type:error:',function(self,_,type_name,out_error){
return rb_funcall(self,'initialize');
});
self.$def('init_with_contents_of_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
rb_define_method(self,'file_type=',function(self,_,type_name){
return self.$i_s('@file_type',type_name);
});
rb_define_method(self,'file_type',function(self,_){
return rb_ivar_get(self,'@file_type');
});
rb_define_method(self,'file_url=',function(self,_,absolute_url){
return self.$i_s('@file_url',absolute_url);
});
rb_define_method(self,'file_url',function(self,_){
return rb_ivar_get(self,'@file_url');
});
rb_define_method(self,'file_modification_date=',function(self,_,modification_date){
return self.$i_s('@file_modification_date',modification_date);
});
rb_define_method(self,'modification_date',function(self,_){
return rb_ivar_get(self,'@modification_date');
});
rb_define_method(self,'revert_document_to_saved',function(self,_,sender){
});
self.$def('revert_to_contents_of_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
self.$def('read_from_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
self.$def('read_from_file_wrapper:of_type:error:',function(self,_,file_wrapper,type_name,out_error){
});
self.$def('read_from_data:of_type:error:',function(self,_,data,type_name,out_error){
});
self.$def('write_to_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
self.$def('file_wrapper_of_type:error:',function(self,_,type_name,out_error){
});
self.$def('data_of_type:error:',function(self,_,type_name,out_error){
});
rb_define_method(self,'save_document',function(self,_,sender){
});
rb_define_method(self,'save_document_as',function(self,_,sender){
});
rb_define_method(self,'save_document_to',function(self,_,sender){
});
self.$def('document:did_save:context_info:',function(self,_,document,did_save_successfully,context_info){
});
self.$def('save_document_with_delegate:did_save_selector:context_info:',function(self,_,delegate,did_save_selector,context_info){
});
self.$def('document:did_save:context_info:',function(self,_,document,did_save_successfully,context_info){
});
self.$def('run_modal_save_panel_for_save_operation:delegate:did_save_selector:context_info:',function(self,_,save_operation,delegate,did_save_selector,context_info){
});
rb_define_method(self,'should_run_save_panel_with_accessory_view?',function(self,_){
return true;
});
rb_define_method(self,'prepare_save_panel',function(self,_,save_panel){
});
self.$def('can_close_document_with_delegate:should_close_selector:context_info:',function(self,_,delegate,should_close_selector,context_info){
});
rb_define_method(self,'close',function(self,_){
});
rb_define_method(self,'document_edited?',function(self,_){
});
rb_define_method(self,'update_change_count',function(self,_,change){
});
rb_define_method(self,'undo_manager=',function(self,_,undo_manager){
return self.$i_s('@undo_manager',undo_manager);
});
rb_define_method(self,'undo_manager',function(self,_){
return rb_ivar_get(self,'@undo_manager');
});
rb_define_method(self,'has_undo_manager?',function(self,_){
return RTEST(rb_ivar_get(self,'@undo_manager')) ? true : false;
});
self.$def('present_error:modal_for_window:delegate:did_present_selector:context_info:',function(self,_,error,window,delegate,did_present_selector,context_info){
});
rb_define_method(self,'present_error',function(self,_,error){
});
rb_define_method(self,'will_present_error',function(self,_,error){
});
rb_define_method(self,'make_window_controllers',function(self,_){
});
rb_define_method(self,'window_vib_name',function(self,_){
});
rb_define_method(self,'window_controller_will_load_vib',function(self,_,window_controller){
});
rb_define_method(self,'window_controller_did_load_vib',function(self,_,window_controller){
});
rb_define_method(self,'window=',function(self,_,a_window){
return self.$i_s('@window',a_window);
});
rb_define_method(self,'add_window_controller',function(self,_,window_controller){
});
rb_define_method(self,'remove_window_controller',function(self,_,window_controller){
});
rb_define_method(self,'show_windows',function(self,_){
});
rb_define_method(self,'window_controllers',function(self,_){
return rb_ivar_get(self,'@window_controllers');
});
self.$def('should_close_window_controller:delegate:should_close_selector:context_info:',function(self,_,window_controller,delegate,should_close_selector,context_info){
});
rb_define_method(self,'display_name',function(self,_){
});
rb_define_method(self,'window_for_sheet',function(self,_){
});
self.$c_g_full('Document').$def_s('readable_types',function(self,_){
return [];
});
self.$c_g_full('Document').$def_s('writable_types',function(self,_){
return [];
});
self.$c_g_full('Document').$def_s('native_type?',function(self,_,type){
});
rb_define_method(self,'writable_types_for_save_operation',function(self,_,save_operation){
});
self.$def('file_name_extensions_for_type:save_operation:',function(self,_,type_name,save_operation){
});
rb_define_method(self,'validate_user_interface_item?',function(self,_,an_item){
});
})(rb_define_class_under(self,'Document',cObject));
})(rb_define_module('Vienna'));
