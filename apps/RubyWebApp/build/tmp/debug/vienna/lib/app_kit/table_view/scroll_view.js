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
$VN_2.$def('render',function(self,_cmd,context){
return VN$(context,'css',VN.$h('background_color','rgb(190, 190, 190)'));
});
$VN_2.$def('document_visible_rect',function(self,_cmd){
});
$VN_2.$def('content_size',function(self,_cmd){
});
$VN_2.$def('document_view=',function(self,_cmd,a_view){
VN$(self.$i_g('@content_view'),'document_view=',a_view);
return VN$(self,'reflect_scrolled_clip_view',self.$i_g('@content_view'));
});
$VN_2.$def('document_view',function(self,_cmd){
return VN$(self.$i_g('@content_view'),'document_view');
});
$VN_2.$def('content_view=',function(self,_cmd,content_view){
VN$(self.$i_g('@content_view'),'remove_from_superview');
self.$i_s('@content_view',content_view);
VN$(self,'add_subview',self.$i_g('@content_view'));
return VN$(self, 'tile');
});
$VN_2.$def('content_view',function(self,_cmd){
return self.$i_g('@content_view');
});
$VN_2.$def('document_cursor=',function(self,_cmd,an_obj){
return self.$i_s('@document_cursor',an_obj);
});
$VN_2.$def('document_cursor',function(self,_cmd){
return self.$i_g('@document_cursor');
});
$VN_2.$def('border_type=',function(self,_cmd,a_type){
return self.$i_s('@border_type',a_type);
});
$VN_2.$def('border_type',function(self,_cmd){
return self.$i_g('@border_type');
});
$VN_2.$def('background_color=',function(self,_cmd,a_color){
return self.$i_s('@background_color',a_color);
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
return self.$i_s('@draws_background',flag);
});
$VN_2.$def('draws_background',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('has_vertical_scroller=',function(self,_cmd,flag){
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
return VN$(self, 'tile');
});
$VN_2.$def('has_vertical_scroller?',function(self,_cmd){
return self.$i_g('@has_vertical_scroller');
});
$VN_2.$def('has_horizontal_scroller=',function(self,_cmd,flag){
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
return VN$(self, 'tile');
});
$VN_2.$def('has_horizontal_scroller?',function(self,_cmd){
return self.$i_g('@has_horizontal_scroller');
});
$VN_2.$def('vertical_scroller=',function(self,_cmd,a_scroller){
return self.$i_s('@vertical_scroller',a_scroller);
});
$VN_2.$def('vertical_scroller',function(self,_cmd){
return self.$i_g('@vertical_scroller');
});
$VN_2.$def('horizontal_scroller=',function(self,_cmd,a_scroller){
return self.$i_s('@horizontal_scroller',a_scroller);
});
$VN_2.$def('horizontal_scroller',function(self,_cmd){
return self.$i_g('@horizontal_scroller');
});
$VN_2.$def('autohides_scrollers?',function(self,_cmd){
return self.$i_g('@autohides_scrollers');
});
$VN_2.$def('autohides_scrollers=',function(self,_cmd,flag){
return self.$i_s('@autohides_scrollers',flag);
});
$VN_2.$def('horizontal_line_scroll=',function(self,_cmd,value){
return self.$i_s('@horizontal_line_scroll',value);
});
$VN_2.$def('horizontal_line_scroll',function(self,_cmd){
return self.$i_g('@horizontal_line_scroll');
});
$VN_2.$def('vertical_line_scroll=',function(self,_cmd,value){
return self.$i_s('@vertical_line_scroll',value);
});
$VN_2.$def('vertical_line_scroll',function(self,_cmd){
return self.$i_g('@vertical_line_scroll');
});
$VN_2.$def('line_scroll=',function(self,_cmd,value){
return self.$i_s('@line_scroll',value);
});
$VN_2.$def('line_scroll',function(self,_cmd){
return self.$i_g('@line_scroll');
});
$VN_2.$def('horizontal_page_scroll=',function(self,_cmd,value){
return self.$i_s('@horizontal_page_scroll',value);
});
$VN_2.$def('horizontal_page_scroll',function(self,_cmd){
return self.$i_g('@horizontal_page_scroll');
});
$VN_2.$def('vertical_page_scroll=',function(self,_cmd,value){
return self.$i_s('@vertical_page_scroll',value);
});
$VN_2.$def('vertical_page_scroll',function(self,_cmd){
return self.$i_g('@vertical_page_scroll');
});
$VN_2.$def('page_scroll=',function(self,_cmd,value){
return self.$i_s('@page_scroll',value);
});
$VN_2.$def('page_scroll',function(self,_cmd){
return self.$i_g('@page_scroll');
});
$VN_2.$def('scrolls_dynamically=',function(self,_cmd,flag){
return self.$i_s('@scrolls_dynamically',flag);
});
$VN_2.$def('scrolls_dynamically?',function(self,_cmd){
return self.$i_g('@scrolls_dynamically');
});
$VN_2.$def('tile',function(self,_cmd){
var bounds = VN$(self.$klass.$c_g_full('Rect'),'new',1,1,VN$(VN$(self.$i_g('@bounds'),'width'),'-',2),VN$(VN$(self.$i_g('@bounds'),'height'),'-',2));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
var frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'x=',VN$((VN$(VN$(bounds,'x'),'+',VN$(bounds,'width'))),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
VN$(frame,'y=',VN$(bounds,'y'));
VN$(frame,'width=',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'));
VN$(frame,'height=',VN$(bounds,'height'));
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
VN$(frame,'height=',VN$(VN$(frame,'height'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@vertical_scroller'),'frame=',frame);
}
if(RTEST(self.$i_g('@has_horizontal_scroller'))){
frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'y=',VN$((VN$(VN$(bounds,'y'),'+',VN$(bounds,'height'))),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
VN$(frame,'x=',VN$(bounds,'x'));
VN$(frame,'width=',VN$(bounds,'width'));
VN$(frame,'height=',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width'));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
VN$(frame,'width=',VN$(VN$(frame,'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(self.$i_g('@horizontal_scroller'),'frame=',frame);
}
if(RTEST(self.$i_g('@content_view'))){
frame = VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
VN$(frame,'x=',VN$(bounds,'x'));
VN$(frame,'y=',VN$(bounds,'y'));
VN$(frame,'width=',VN$(bounds,'width'));
if(RTEST(self.$i_g('@has_vertical_scroller'))){
VN$(frame,'width=',VN$(VN$(frame,'width'),'-',VN$(self.$klass.$c_g_full('Scroller'),'scroller_width')));
}
VN$(frame,'height=',VN$(bounds,'height'));
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
