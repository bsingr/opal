vnfmwk$1.0$p7$/viennar259$8$info.yml245$vnplist$1.0$h7$s16$bundle_icon_files0$s17$bundle_identifiers22$com.yourcompany.viennas15$principal_classs15$VN::Applications13$main_vib_files9$main_menus19$bundle_package_types4$APPLs11$bundle_names6$viennas25$bundle_development_regions7$Englishc804$(function(self) {
self.$c_s('VERSION','0.0.1');
self.$def_s('version',function(self,_){
return self.$c_g_full('VERSION');
});
self.$def_s('display_mode',function(self,_){
return 'render';});
rb_define_method(self,'app',function(self,_){
});
})(rb_define_module('Vienna'));

(function(self) {
(function(self) {
rb_define_method(self,'display_mode',function(self,_){
return ID2SYM('draw');
});
rb_define_method(self,'draw_rect',function(self,_,a_rect){
rb_funcall(self,'puts','drawing..');
var ctx=rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context');
return rb_funcall(ctx,'rect',0,0,rb_funcall(rb_ivar_get(self,'@bounds'),'width'),rb_funcall(rb_ivar_get(self,'@bounds'),'height'));
});
})(rb_define_class_under(self,'GaugeView',self.$c_g_full('View')));
})(rb_define_module('Vienna'));
