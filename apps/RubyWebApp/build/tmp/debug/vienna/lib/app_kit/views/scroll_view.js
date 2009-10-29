var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ScrollView',$VN_2.$c_g_full('View'));
$VN_2.$def_s('frame_size_for_content_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
$VN_2.$def_s('content_size_for_frame_size:has_horizontal_scroller:has_vertical_scroller:border_type:',function(self,_cmd,content_size,h_flag,v_flag,a_type){
});
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
self.$i_s('@content_view',VN$(self.$klass.$c_g_full('ClipView'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',0,0,100,100)));
self.$i_s('@border_type','none');
return VN$(self,'add_subview',self.$i_g('@content_view'));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-scroll-view';
});
$VN_2.$def('document_visible_rect',function(self,_cmd){
});
$VN_2.$def('content_size',function(self,_cmd){
});
$VN_2.$def('document_view=',function(self,_cmd,a_view){
VN$(self, 'will_change_value_for_key', 'document_view');
VN$(self.$i_g('@content_view'),'document_view=',a_view);
VN$(self,'reflect_scrolled_clip_view',self.$i_g('@content_view'));
VN$(self, 'did_change_value_for_key', 'document_view');
});
$VN_2.$def('document_view',function(self,_cmd){
return VN$(self.$i_g('@content_view'),'document_view');
});
$VN_2.$def('content_view=',function(self,_cmd,content_view){
VN$(self, 'will_change_value_for_key', 'content_view');
VN$(self.$i_g('@content_view'),'remove_from_superview');
self.$i_s('@content_view',content_view);
VN$(self,'add_subview',self.$i_g('@content_view'));
VN$(self, 'tile');
VN$(self, 'did_change_value_for_key', 'content_view');
});
$VN_2.$def('content_view',function(self,_cmd){
return self.$i_g('@content_view');
});
$VN_2.$def('document_cursor=',function(self,_cmd,an_obj){
VN$(self, 'will_change_value_for_key', 'document_cursor');
self.$i_s('@document_cursor',an_obj);
VN$(self, 'did_change_value_for_key', 'document_cursor');
});
$VN_2.$def('document_cursor',function(self,_cmd){
return self.$i_g('@document_cursor');
});
$VN_2.$def('border_type=',function(self,_cmd,a_type){
VN$(self, 'will_change_value_for_key', 'border_type');
self.$i_s('@border_type',a_type);
VN$(self, 'did_change_value_for_key', 'border_type');
});
$VN_2.$def('border_type',function(self,_cmd){
return self.$i_g('@border_type');
});
$VN_2.$def('background_color=',function(self,_cmd,a_color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',a_color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'draws_background');
self.$i_s('@draws_background',flag);
VN$(self, 'did_change_value_for_key', 'draws_background');
});
$VN_2.$def('draws_background',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('has_vertical_scroller=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'has_vertical_scroller');
if(RTEST(flag)){
if(!RTEST(self.$i_g('@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',true);
if(!RTEST(self.$i_g('@vertical_scroller'))){
self.$i_s('@vertical_scroller',VN$(self.$klass.$c_g_full('Scroller'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',150,40,40,15)));
VN$(self.$i_g('@vertical_scroller'),'target=',self);
VN$(self.$i_g('@vertical_scroller'),'action=','scroll_v');
}
VN$(self,'add_subview',self.$i_g('@vertical_scroller'));
}
}
else{
if(RTEST(self.$i_g('@has_vertical_scroller'))){
self.$i_s('@has_vertical_scroller',false);
VN$(self.$i_g('@vertical_scroller'),'remove_from_superview');
}
}
VN$(self, 'tile');
VN$(self, 'did_change_value_for_key', 'has_vertical_scroller');
});
$VN_2.$def('has_vertical_scroller?',function(self,_cmd){
return self.$i_g('@has_vertical_scroller');
});
$VN_2.$def('has_horizontal_scroller=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'has_horizontal_scroller');
if(RTEST(flag)){
if(!RTEST(self.$i_g('@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',true);
if(!RTEST(self.$i_g('@horizontal_scroller'))){
self.$i_s('@horizontal_scroller',VN$(self.$klass.$c_g_full('Scroller'),'new',VN$(self.$klass.$c_g_full('Rect'),'new',150,20,40,15)));
VN$(self.$i_g('@horizontal_scroller'),'target=',self);
VN$(self.$i_g('@horizontal_scroller'),'action=','scroll_h');
}
VN$(self,'add_subview',self.$i_g('@horizontal_scroller'));
}
}
else{
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
self.$i_s('@has_horizontal_scroller',false);
VN$(self.$i_g('@horizontal_scroller'),'remove_from_superview');
}
}
VN$(self, 'tile');
VN$(self, 'did_change_value_for_key', 'has_horizontal_scroller');
});
$VN_2.$def('has_horizontal_scroller?',function(self,_cmd){
return self.$i_g('@has_horizontal_scroller');
});
$VN_2.$def('vertical_scroller=',function(self,_cmd,a_scroller){
VN$(self, 'will_change_value_for_key', 'vertical_scroller');
self.$i_s('@vertical_scroller',a_scroller);
VN$(self, 'did_change_value_for_key', 'vertical_scroller');
});
$VN_2.$def('vertical_scroller',function(self,_cmd){
return self.$i_g('@vertical_scroller');
});
$VN_2.$def('horizontal_scroller=',function(self,_cmd,a_scroller){
VN$(self, 'will_change_value_for_key', 'horizontal_scroller');
self.$i_s('@horizontal_scroller',a_scroller);
VN$(self, 'did_change_value_for_key', 'horizontal_scroller');
});
$VN_2.$def('horizontal_scroller',function(self,_cmd){
return self.$i_g('@horizontal_scroller');
});
$VN_2.$def('autohides_scrollers?',function(self,_cmd){
return self.$i_g('@autohides_scrollers');
});
$VN_2.$def('autohides_scrollers=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'autohides_scrollers');
self.$i_s('@autohides_scrollers',flag);
VN$(self, 'did_change_value_for_key', 'autohides_scrollers');
});
$VN_2.$def('horizontal_line_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'horizontal_line_scroll');
self.$i_s('@horizontal_line_scroll',value);
VN$(self, 'did_change_value_for_key', 'horizontal_line_scroll');
});
$VN_2.$def('horizontal_line_scroll',function(self,_cmd){
return self.$i_g('@horizontal_line_scroll');
});
$VN_2.$def('vertical_line_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'vertical_line_scroll');
self.$i_s('@vertical_line_scroll',value);
VN$(self, 'did_change_value_for_key', 'vertical_line_scroll');
});
$VN_2.$def('vertical_line_scroll',function(self,_cmd){
return self.$i_g('@vertical_line_scroll');
});
$VN_2.$def('line_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'line_scroll');
self.$i_s('@line_scroll',value);
VN$(self, 'did_change_value_for_key', 'line_scroll');
});
$VN_2.$def('line_scroll',function(self,_cmd){
return self.$i_g('@line_scroll');
});
$VN_2.$def('horizontal_page_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'horizontal_page_scroll');
self.$i_s('@horizontal_page_scroll',value);
VN$(self, 'did_change_value_for_key', 'horizontal_page_scroll');
});
$VN_2.$def('horizontal_page_scroll',function(self,_cmd){
return self.$i_g('@horizontal_page_scroll');
});
$VN_2.$def('vertical_page_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'vertical_page_scroll');
self.$i_s('@vertical_page_scroll',value);
VN$(self, 'did_change_value_for_key', 'vertical_page_scroll');
});
$VN_2.$def('vertical_page_scroll',function(self,_cmd){
return self.$i_g('@vertical_page_scroll');
});
$VN_2.$def('page_scroll=',function(self,_cmd,value){
VN$(self, 'will_change_value_for_key', 'page_scroll');
self.$i_s('@page_scroll',value);
VN$(self, 'did_change_value_for_key', 'page_scroll');
});
$VN_2.$def('page_scroll',function(self,_cmd){
return self.$i_g('@page_scroll');
});
$VN_2.$def('scrolls_dynamically=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'scrolls_dynamically');
self.$i_s('@scrolls_dynamically',flag);
VN$(self, 'did_change_value_for_key', 'scrolls_dynamically');
});
$VN_2.$def('scrolls_dynamically?',function(self,_cmd){
return self.$i_g('@scrolls_dynamically');
});
$VN_2.$def('tile',function(self,_cmd){
if(RTEST(self.$i_g('@has_vertical_scroller'))){
var frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'x=',VN$(VN$(self.$i_g('@bounds'),'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
VN$(frame,'width=',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'));
VN$(frame,'height=',VN$(self.$i_g('@bounds'),'height'));
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
VN$(frame,'height=',VN$(VN$(frame,'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@vertical_scroller'),'frame=',frame);
}
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'y=',VN$(VN$(self.$i_g('@bounds'),'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
VN$(frame,'width=',VN$(self.$i_g('@bounds'),'width'));
VN$(frame,'height=',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
VN$(frame,'width=',VN$(VN$(frame,'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@horizontal_scroller'),'frame=',frame);
}
if(RTEST(self.$i_g('@content_view'))){
frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'width=',VN$(self.$i_g('@bounds'),'width'));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
VN$(frame,'width=',VN$(VN$(frame,'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(frame,'height=',VN$(self.$i_g('@bounds'),'height'));
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
VN$(frame,'height=',VN$(VN$(frame,'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@content_view'),'frame=',frame);
}
});
$VN_2.$def('reflect_scrolled_clip_view',function(self,_cmd,clip_view){
});
$VN_2.$def('scroll_wheel',function(self,_cmd,the_event){
});
