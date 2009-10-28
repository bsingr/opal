var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'NormalWindowView',$VN_2.$c_g_full('WindowView'));
$VN_2.$c_s('CLOSE_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,855,16,16]));
$VN_2.$c_s('CLOSE_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,855,16,16]));
$VN_2.$c_s('MIN_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,872,16,16]));
$VN_2.$c_s('MIN_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,872,16,16]));
$VN_2.$c_s('ZOOM_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,889,16,16]));
$VN_2.$c_s('ZOOM_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[16,889,16,16]));
$VN_2.$c_s('TITLEBAR_HEIGHT',24.0);
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(VN$(self.$i_g('@style_mask'),'include?','closable'))){
self.$i_s('@close_button',VN$(self.$klass.$c_g_full('Button'),'build',VN.$h('frame',VN$(self.$klass.$c_g_full('Rect'),'new',6,6,16,16),'bordered',false),function(close){
VN$(close,'bordered=',false);
VN$(close,'image_position=','image_only');
VN$(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
VN$(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
VN$(self,'<<',close);
return VN$(close,'needs_display=',true);
}));
}
if(RTEST(VN$(self.$i_g('@style_mask'),'include?','miniaturizable'))){
self.$i_s('@min_button',VN$(self.$klass.$c_g_full('Button'),'build',VN.$h('frame',VN$(self.$klass.$c_g_full('Rect'),'new',10,10,300,300),'bordered',false),function(min){
return VN$(self,'<<',min);
}));
}
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-normal-window-view';
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
VN$(context,'<<',"<div class='body'></div>");
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
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
