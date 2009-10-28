var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'HUDWindowView',$VN_2.$c_g_full('WindowView'));
$VN_2.$c_s('CLOSE_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[0,1280,13,13]));
$VN_2.$c_s('CLOSE_HIGHLIGHTED_IMAGE',VN$($VN_2.$c_g_full('Image'),'sprite','controls',[14,1280,13,13]));
$VN_2.$c_s('TITLEBAR_HEIGHT',19.0);
$VN_2.$def('initialize',function(self,_cmd,frame,style_mask){
VN$sup(arguments.callee, self,_cmd,[frame,style_mask]);
if(RTEST(VN$(self.$i_g('@style_mask'),'include?','closable'))){
self.$i_s('@close_button',VN$(self.$klass.$c_g_full('Button'),'build',VN.$h('frame',VN$(self.$klass.$c_g_full('Rect'),'new',5,3,13,13),'bordered',false),function(close){
VN$(close,'bordered=',false);
VN$(close,'image_position=','image_only');
VN$(close,'image=',self.$klass.$c_g_full('CLOSE_IMAGE'));
VN$(close,'alternate_image=',self.$klass.$c_g_full('CLOSE_HIGHLIGHTED_IMAGE'));
VN$(self,'<<',close);
return VN$(close,'needs_display=',true);
}));
}
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-hud-window-view';
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='titlebar'><div class='left'></div><div class='middle'></div><div class='right'></div><div class='splitter'></div></div>");
VN$(context,'<<',"<div class='body'></div>");
VN$(context,'<<',"<div class='bottom'><div class='left'></div><div class='middle'></div><div class='right'></div></div>");
VN$(context,'first_time=',false);
}
return VN$(context,'class_name=',VN$(self, 'class_name'));
});
