var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'WindowView',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame]);
return self.$i_s('@style_mask',style_mask);
});
$VN_2.$def_s('frame_rect_for_content_rect:style_mask:',function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def_s('content_rect_for_frame_rect:style_mask:',function(self,_cmd,rect,style){
return VN$(self.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def_s('min_frame_width_with_title:style_mask:',function(self,_cmd,title,style){
});
$VN_2.$def('frame_rect_for_content_rect',function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def('content_rect_for_frame_rect',function(self,_cmd,rect){
return VN$(self.$klass.$c_g_full('Rect'),'new',VN$(rect,'x'),VN$(rect,'y'),VN$(rect,'width'),VN$(rect,'height'));
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-window-view';
});
$VN_2.$def('window=',function(self,_cmd,win){
return self.$i_s('@window',win);
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
self.$i_s('@mouse_down_point',VN$(the_event,'location_in_window'));
return VN$(self.$klass.$c_g_full('App'),'bind_events',['left_mouse_up','left_mouse_dragged'],function(the_event){
if(RTEST(VN$(VN$(the_event,'type'),'==','left_mouse_up'))){
VN$(self.$klass.$c_g_full('App'),'unbind_events');
}
else{
var window_point = VN$(the_event,'location_in_window');
self.$i_s('@window_origin',VN$(VN$(self.$i_g('@window'),'frame'),'origin'));
self.$i_s('@delta_x',VN$(VN$(window_point,'x'),'-',VN$(self.$i_g('@mouse_down_point'),'x')));
self.$i_s('@delta_y',VN$(VN$(window_point,'y'),'-',VN$(self.$i_g('@mouse_down_point'),'y')));
VN$(self.$i_g('@window'),'frame_origin=',VN$(self.$klass.$c_g_full('Point'),'new',VN$(VN$(self.$i_g('@window_origin'),'x'),'+',self.$i_g('@delta_x')),VN$(VN$(self.$i_g('@window_origin'),'y'),'+',self.$i_g('@delta_y'))));
}
});
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(['vn-window-view'],'join',' '));
});
