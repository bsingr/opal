(function(self) {
(function(self) {
self.$c_g_full('DocumentController').$def_s('shared_document_controller',function(self,_){
return self.$i_s('@shared_document_controller',ORTEST(rb_ivar_get(self,'@shared_document_controller'),rb_funcall(self,'new')));
});
rb_define_method(self,'initialize',function(self,_){
self.$i_s('@autosaving_delay',0);
self.$i_s('@documents',[]);
return self.$i_s('@document_types',rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('Bundle'),'main_bundle'),'info_dictionary'),'[]','document_types'));
});
rb_define_method(self,'documents',function(self,_){
return rb_ivar_get(self,'@documents');
});
rb_define_method(self,'current_document',function(self,_){
return rb_funcall(rb_funcall(rb_funcall(self.$klass.$c_g_full('App'),'main_window'),'window_controller'),'document');
});
rb_define_method(self,'current_directory',function(self,_){
return rb_funcall(self,'puts',["self ",(rb_funcall(self,'_cmd'))," not implemented."].join(''));
});
rb_define_method(self,'document_for_url',function(self,_,absolute_url){
});
rb_define_method(self,'document_for_window',function(self,_,window){
return rb_funcall(rb_funcall(window,'window_controller'),'document');
});
rb_define_method(self,'add_document',function(self,_,document){
return rb_funcall(rb_ivar_get(self,'@documents'),'<<',document);
});
rb_define_method(self,'remove_document',function(self,_,document){
return rb_funcall(rb_ivar_get(self,'@documents'),'delete',document);
});
rb_define_method(self,'new_document',function(self,_,sender){
return type=rb_funcall(rb_funcall(rb_ivar_get(self,'@document_types'),'[]',0),'[]','type_name');
});
self.$def('open_untitled_document_and_display:error:',function(self,_,display_document,out_error){
var doc=rb_funcall(self,'make_untitled_document_of_type:error:',rb_funcall(self,'default_type'),nil);
if(!RTEST(rb_funcall(doc,'nil?'))){
rb_funcall(self,'add_document',doc);
}
rb_funcall(doc,'make_window_controllers');
if(RTEST(display_document)){
rb_funcall(doc,'show_windows');
}
return doc;
});
self.$def('make_untitled_document_of_type:error:',function(self,_,type_name,out_error){
var doc_class=rb_funcall(self,'document_class_for_type',type_name);
var doc=rb_funcall(doc_class,'new',type_name,out_error);
if(!RTEST(doc)){
rb_funcall(self,'puts',["Error creating document of type ",(type_name)].join(''));
}
return doc;
});
rb_define_method(self,'open_document',function(self,_,sender){
});
rb_define_method(self,'urls_from_running_open_panel',function(self,_){
});
self.$def('run_modal_open_panel:for_types:',function(self,_,open_panel,types){
});
self.$def('open_document_with_contents_of_url:display:error:',function(self,_,absolute_url,display_document,out_error){
});
self.$def('make_document_with_contents_of_url:of_type:error:',function(self,_,absolute_url,type_name,out_error){
});
rb_define_method(self,'autosaving_delay=',function(self,_,autosaving_delay){
return self.$i_s('@autosaving_delay',autosaving_delay);
});
rb_define_method(self,'autosaving_delay',function(self,_){
return rb_ivar_get(self,'@autosaving_delay');
});
rb_define_method(self,'save_all_documents',function(self,_,sender){
});
rb_define_method(self,'has_edited_documents?',function(self,_){
return false;
});
self.$def('review_unsaved_documents_with_alert_title:cancellable:delegate:did_review_all_selector:context_info:',function(self,_,title,cancellable,delegate,did_review_all_selector,context_info){
});
self.$def('close_all_documents_with_delegate:did_close_all_selector:context_info:',function(self,_,delegate,did_close_all_selector,context_info){
});
self.$def('present_error:modal_for_window:delegate:did_present_selector:context_info:',function(self,_,error,window,delegate,did_present_selector,context_info){
});
rb_define_method(self,'present_error?',function(self,_,error){
});
rb_define_method(self,'will_present_error',function(self,_,error){
});
rb_define_method(self,'maximum_recent_document_count',function(self,_){
});
rb_define_method(self,'clear_recent_documents',function(self,_,sender){
});
rb_define_method(self,'note_new_recent_document',function(self,_,document){
});
rb_define_method(self,'note_new_recent_document_url',function(self,_,absolute_url){
});
rb_define_method(self,'recent_document_urls',function(self,_){
});
rb_define_method(self,'default_type',function(self,_){
if(RTEST(rb_funcall(rb_funcall(rb_ivar_get(self,'@document_types'),'length'),'==',0))){
return nil;
}
return rb_funcall(rb_funcall(rb_ivar_get(self,'@document_types'),'[]',0),'[]','type_name');
});
self.$def('type_for_contents_of_url:error:',function(self,_,in_absolute_url,out_error){
});
rb_define_method(self,'document_class_names',function(self,_){
});
rb_define_method(self,'document_class_for_type',function(self,_,type_name){
});
rb_define_method(self,'display_name_for_type',function(self,_,type_name){
});
rb_define_method(self,'validate_user_interface_item?',function(self,_,an_item){
});
})(rb_define_class_under(self,'DocumentController',cObject));
})(rb_define_module('Vienna'));
