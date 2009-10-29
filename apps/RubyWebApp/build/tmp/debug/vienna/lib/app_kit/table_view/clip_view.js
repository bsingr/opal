var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'ClipView',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def('setup_display_context',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return VN$(self.$i_g('@element'),'css',VN.$h('overflow','hidden'));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-clip-view';
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
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
$VN_2.$def('draws_background?',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('document_view=',function(self,_cmd,a_view){
VN$(self, 'will_change_value_for_key', 'document_view');
var default_center = VN$(self.$klass.$c_g_full('NotificationCenter'),'default_center');
if(RTEST(self.$i_g('@document_view'))){
VN$(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_FRAME_DID_CHANGE_NOTIFICATION'),self.$i_g('@document_view'));
VN$(default_center,'remove_observer:name:object:',self,self.$klass.$c_g_full('VIEW_BOUNDS_DID_CHANGE_NOTIFICATION'),self.$i_g('@document_view'));
VN$(self.$i_g('@document_view'),'remove_from_superview');
}
self.$i_s('@document_view',a_view);
VN$(self,'add_subview',a_view);
VN$(self, 'did_change_value_for_key', 'document_view');
});
$VN_2.$def('document_view',function(self,_cmd){
return self.$i_g('@document_view');
});
$VN_2.$def('document_rect',function(self,_cmd){
return VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
});
$VN_2.$def('document_cursor=',function(self,_cmd,an_obj){
VN$(self, 'will_change_value_for_key', 'document_cursor');
self.$i_s('@document_cursor',an_obj);
VN$(self, 'did_change_value_for_key', 'document_cursor');
});
$VN_2.$def('document_cursor',function(self,_cmd){
return self.$i_g('@document_cursor');
});
$VN_2.$def('document_visible_rect',function(self,_cmd){
return VN$(self,'convert_rect:to_view:',self.$i_g('@bounds'),self.$i_g('@document_view'));
});
$VN_2.$def('view_frame_changed',function(self,_cmd,notification){
});
$VN_2.$def('view_bounds_changed',function(self,_cmd,notification){
});
$VN_2.$def('copies_on_scroll=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'copies_on_scroll');
self.$i_s('@copies_on_scroll',flag);
VN$(self, 'did_change_value_for_key', 'copies_on_scroll');
});
$VN_2.$def('copies_on_scroll',function(self,_cmd){
return self.$i_g('@copies_on_scroll');
});
$VN_2.$def('auto_scroll?',function(self,_cmd,the_event){
return false;
});
$VN_2.$def('constrain_scroll_point',function(self,_cmd,new_origin){
return new_origin;
});
$VN_2.$def('scroll_to_point',function(self,_cmd,new_origin){
if(RTEST(VN$(VN$(self.$i_g('@subviews'),'length'),'>',0))){
VN$(VN$(self.$i_g('@subviews'),'[]',0),'frame_origin=',VN$(self.$klass.$c_g_full('Point'),'new',VN$((0),'-',VN$(new_origin,'x')),VN$((0),'-',VN$(new_origin,'y'))));
}
});
$VN_2.$def('scroll_x_y',function(self,_cmd,x,y){
return VN$(self,'scroll_to_point',VN$(self.$klass.$c_g_full('Point'),'new',x,y));
});
var $VN_2 = RClass.define_under($VN_1, 'View',$VN_2.$c_g_full('Responder'));
$VN_2.$def('reflect_scrolled_clip_view',function(self,_cmd,a_clip_view){
});
$VN_2.$def('scroll_clip_view:to_point:',function(self,_cmd,a_clip_view,a_point){
});
