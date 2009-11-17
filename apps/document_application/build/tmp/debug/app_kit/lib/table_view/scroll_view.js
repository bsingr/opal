(function(self) {
(function(self) {
self.$def_s('frame_size_for_content_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_,content_size,h_flag,v_flag,a_type){
});
self.$def_s('content_size_for_frame_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_,content_size,h_flag,v_flag,a_type){
});
rb_define_method(self,'initialize',function(self,_,frame){
rb_supcall(arguments.callee, self,_,[frame]);
self.$i_s('@content_view',rb_funcall(self.$klass.$c_g_full('ClipView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,100,100)));
self.$i_s('@border_type',ID2SYM('none'));
return rb_funcall(self,'add_subview',rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'class_name',function(self,_){
return 'vn-scroll-view';
});
rb_define_method(self,'render',function(self,_,context){
return rb_funcall(context,'css',VN.$h(ID2SYM('background_color'),'rgb(190, 190, 190)'));
});
rb_define_method(self,'document_visible_rect',function(self,_){
});
rb_define_method(self,'content_size',function(self,_){
});
rb_define_method(self,'document_view=',function(self,_,a_view){
rb_funcall(rb_ivar_get(self,'@content_view'),'document_view=',a_view);
return rb_funcall(self,'reflect_scrolled_clip_view',rb_ivar_get(self,'@content_view'));
});
rb_define_method(self,'document_view',function(self,_){
return rb_funcall(rb_ivar_get(self,'@content_view'),'document_view');
});
rb_define_method(self,'content_view=',function(self,_,content_view){
rb_funcall(rb_ivar_get(self,'@content_view'),'remove_from_superview');
self.$i_s('@content_view',content_view);
rb_funcall(self,'add_subview',rb_ivar_get(self,'@content_view'));
return rb_funcall(self,'tile');
});
rb_define_method(self,'content_view',function(self,_){
return rb_ivar_get(self,'@content_view');
});
rb_define_method(self,'document_cursor=',function(self,_,an_obj){
return self.$i_s('@document_cursor',an_obj);
});
rb_define_method(self,'document_cursor',function(self,_){
return rb_ivar_get(self,'@document_cursor');
});
rb_define_method(self,'border_type=',function(self,_,a_type){
return self.$i_s('@border_type',a_type);
});
rb_define_method(self,'border_type',function(self,_){
return rb_ivar_get(self,'@border_type');
});
rb_define_method(self,'background_color=',function(self,_,a_color){
return self.$i_s('@background_color',a_color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
rb_define_method(self,'draws_background=',function(self,_,flag){
return self.$i_s('@draws_background',flag);
});
rb_define_method(self,'draws_background',function(self,_){
return rb_ivar_get(self,'@draws_background');
});
rb_define_method(self,'has_vertical_scroller=',function(self,_,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',true);
if(!RTEST(rb_ivar_get(self,'@vertical_scroller'))){
self.$i_s('@vertical_scroller',rb_funcall(self.$klass.$c_g_full('Scroller'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',150,40,40,15)));
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'target=',self);
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'action=',ID2SYM('scroll_v'));
}
rb_funcall(self,'add_subview',rb_ivar_get(self,'@vertical_scroller'));
}
}
else{
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',false);
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'remove_from_superview');
}
}
return rb_funcall(self,'tile');
});
rb_define_method(self,'has_vertical_scroller?',function(self,_){
return rb_ivar_get(self,'@has_vertical_scroller');
});
rb_define_method(self,'has_horizontal_scroller=',function(self,_,flag){
if(RTEST(flag)){
if(!RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',true);
if(!RTEST(rb_ivar_get(self,'@horizontal_scroller'))){
self.$i_s('@horizontal_scroller',rb_funcall(self.$klass.$c_g_full('Scroller'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',150,20,40,15)));
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'target=',self);
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'action=',ID2SYM('scroll_h'));
}
rb_funcall(self,'add_subview',rb_ivar_get(self,'@horizontal_scroller'));
}
}
else{
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',false);
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'remove_from_superview');
}
}
return rb_funcall(self,'tile');
});
rb_define_method(self,'has_horizontal_scroller?',function(self,_){
return rb_ivar_get(self,'@has_horizontal_scroller');
});
rb_define_method(self,'vertical_scroller=',function(self,_,a_scroller){
return self.$i_s('@vertical_scroller',a_scroller);
});
rb_define_method(self,'vertical_scroller',function(self,_){
return rb_ivar_get(self,'@vertical_scroller');
});
rb_define_method(self,'horizontal_scroller=',function(self,_,a_scroller){
return self.$i_s('@horizontal_scroller',a_scroller);
});
rb_define_method(self,'horizontal_scroller',function(self,_){
return rb_ivar_get(self,'@horizontal_scroller');
});
rb_define_method(self,'autohides_scrollers?',function(self,_){
return rb_ivar_get(self,'@autohides_scrollers');
});
rb_define_method(self,'autohides_scrollers=',function(self,_,flag){
return self.$i_s('@autohides_scrollers',flag);
});
rb_define_method(self,'horizontal_line_scroll=',function(self,_,value){
return self.$i_s('@horizontal_line_scroll',value);
});
rb_define_method(self,'horizontal_line_scroll',function(self,_){
return rb_ivar_get(self,'@horizontal_line_scroll');
});
rb_define_method(self,'vertical_line_scroll=',function(self,_,value){
return self.$i_s('@vertical_line_scroll',value);
});
rb_define_method(self,'vertical_line_scroll',function(self,_){
return rb_ivar_get(self,'@vertical_line_scroll');
});
rb_define_method(self,'line_scroll=',function(self,_,value){
return self.$i_s('@line_scroll',value);
});
rb_define_method(self,'line_scroll',function(self,_){
return rb_ivar_get(self,'@line_scroll');
});
rb_define_method(self,'horizontal_page_scroll=',function(self,_,value){
return self.$i_s('@horizontal_page_scroll',value);
});
rb_define_method(self,'horizontal_page_scroll',function(self,_){
return rb_ivar_get(self,'@horizontal_page_scroll');
});
rb_define_method(self,'vertical_page_scroll=',function(self,_,value){
return self.$i_s('@vertical_page_scroll',value);
});
rb_define_method(self,'vertical_page_scroll',function(self,_){
return rb_ivar_get(self,'@vertical_page_scroll');
});
rb_define_method(self,'page_scroll=',function(self,_,value){
return self.$i_s('@page_scroll',value);
});
rb_define_method(self,'page_scroll',function(self,_){
return rb_ivar_get(self,'@page_scroll');
});
rb_define_method(self,'scrolls_dynamically=',function(self,_,flag){
return self.$i_s('@scrolls_dynamically',flag);
});
rb_define_method(self,'scrolls_dynamically?',function(self,_){
return rb_ivar_get(self,'@scrolls_dynamically');
});
rb_define_method(self,'tile',function(self,_){
var header_frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
var header_view=nil;
if(RTEST(rb_funcall(rb_funcall(self,'document_view'),'respond_to?',ID2SYM('header_view')))){
header_view=rb_funcall(rb_funcall(self,'document_view'),'header_view');
header_frame=rb_funcall(header_view,'bounds');
}
var bounds=rb_funcall(self.$klass.$c_g_full('Rect'),'new',1,1,rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'width'),'-',2),rb_funcall(rb_funcall(rb_ivar_get(self,'@bounds'),'height'),'-',2));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
var frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'x=',rb_funcall((rb_funcall(rb_funcall(bounds,'x'),'+',rb_funcall(bounds,'width'))),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
rb_funcall(frame,'y=',rb_funcall(bounds,'y'));
rb_funcall(frame,'width=',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'));
rb_funcall(frame,'height=',rb_funcall(bounds,'height'));
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(header_frame,'height')));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(header_frame,'height')));
}
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'frame=',frame);
}
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'y=',rb_funcall((rb_funcall(rb_funcall(bounds,'y'),'+',rb_funcall(bounds,'height'))),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
rb_funcall(frame,'x=',rb_funcall(bounds,'x'));
rb_funcall(frame,'width=',rb_funcall(bounds,'width'));
rb_funcall(frame,'height=',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width'));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'frame=',frame);
}
if(RTEST(rb_ivar_get(self,'@content_view'))){
frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,'x'));
rb_funcall(frame,'y=',rb_funcall(bounds,'y'));
rb_funcall(frame,'width=',rb_funcall(bounds,'width'));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
rb_funcall(frame,'height=',rb_funcall(bounds,'height'));
if(RTEST(rb_ivar_get(self,'@has_horizontal_scroller'))){
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
if(RTEST(header_view)){
rb_funcall(frame,'y=',rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(header_frame,'height')));
rb_funcall(frame,'height=',rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(header_frame,'height')));
}
rb_funcall(rb_ivar_get(self,'@content_view'),'frame=',frame);
}
if(RTEST(header_view)){
if(!RTEST(rb_ivar_get(self,'@header_clip_view'))){
self.$i_s('@header_clip_view',rb_funcall(self.$klass.$c_g_full('ClipView'),'new',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,100,100)));
rb_funcall(self,'<<',rb_ivar_get(self,'@header_clip_view'));
rb_funcall(rb_ivar_get(self,'@header_clip_view'),'<<',header_view);
rb_funcall(header_view,'needs_display=',true);
}
frame=rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
rb_funcall(frame,'x=',rb_funcall(bounds,'x'));
rb_funcall(frame,'y=',rb_funcall(bounds,'y'));
rb_funcall(frame,'width=',rb_funcall(bounds,'width'));
rb_funcall(frame,'height=',rb_funcall(header_frame,'height'));
if(RTEST(rb_ivar_get(self,'@has_vertical_scroller'))){
rb_funcall(frame,'width=',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
rb_funcall(rb_ivar_get(self,'@header_clip_view'),'frame=',frame);
}
return rb_funcall(self,'reflect_scrolled_clip_view',rb_funcall(self,'content_view'));
});
rb_define_method(self,'reflect_scrolled_clip_view',function(self,_,clip_view){
if(RTEST(rb_funcall(self,'document_view'))){
var document_rect=rb_funcall(rb_funcall(self,'document_view'),'frame');
var content_rect=rb_funcall(clip_view,'bounds');
var height_delta=rb_funcall(rb_funcall(document_rect,'height'),'-',rb_funcall(content_rect,'height'));
var width_delta=rb_funcall(rb_funcall(document_rect,'width'),'-',rb_funcall(content_rect,'width'));
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,'y'),'-',rb_funcall(document_rect,'y'))),'/',height_delta));
rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'knob_proportion=',rb_funcall(rb_funcall(content_rect,'height'),'/',rb_funcall(document_rect,'height')));
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'float_value=',rb_funcall((rb_funcall(rb_funcall(content_rect,'x'),'-',rb_funcall(document_rect,'x'))),'/',width_delta));
rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'knob_proportion=',rb_funcall(rb_funcall(content_rect,'width'),'/',rb_funcall(document_rect,'width')));
}
});
rb_define_method(self,'resize_subviews_with_old_size',function(self,_,size){
return rb_funcall(self,'tile');
});
rb_define_method(self,'scroll_wheel',function(self,_,the_event){
});
rb_define_method(self,'scroll_v',function(self,_,sender){
var value=rb_funcall(rb_funcall(rb_ivar_get(self,'@vertical_scroller'),'float_value'),'*',(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'height'),'-',rb_funcall(rb_funcall(rb_ivar_get(self,'@content_view'),'frame'),'height'))));
return rb_funcall(rb_ivar_get(self,'@content_view'),'scroll_to_point',rb_funcall(self.$klass.$c_g_full('Point'),'new',rb_funcall((0),'-',rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'x')),value));
});
rb_define_method(self,'scroll_h',function(self,_,sender){
var value=rb_funcall(rb_funcall(rb_ivar_get(self,'@horizontal_scroller'),'float_value'),'*',(rb_funcall(rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'width'),'-',rb_funcall(rb_funcall(rb_ivar_get(self,'@content_view'),'frame'),'width'))));
return rb_funcall(rb_ivar_get(self,'@content_view'),'scroll_to_point',rb_funcall(self.$klass.$c_g_full('Point'),'new',value,rb_funcall((0),'-',rb_funcall(rb_funcall(rb_funcall(self,'document_view'),'frame'),'y'))));
});
})(rb_define_class_under(self,'ScrollView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));
