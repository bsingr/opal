var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'GraphicsContext',cObject);
$VN_2.$def('initialize',function(self,_cmd,graphics_port,flip_state){
self.$i_s('@ctx',graphics_port);
return self.$i_s('@flip_state',flip_state);
});
$VN_2.$def('graphics_port',function(self,_cmd){
return self.$i_g('@ctx');
});
$VN_2.$def('flipped?',function(self,_cmd){
return self.$i_g('@flip_state');
});
$VN_2.$def_s('current_context',function(self,_cmd){
});
$VN_2.$def_s('current_context=',function(self,_cmd,context){
VN$(self, 'will_change_value_for_key', 'current_context');
VN$(self, 'did_change_value_for_key', 'current_context');
});
$VN_2.$def('save_graphics_state',function(self,_cmd){
});
$VN_2.$def('line_width=',function(self,_cmd,width){
VN$(self, 'will_change_value_for_key', 'line_width');
self.$i_g('@ctx').lineWidth = widthVN$(self, 'did_change_value_for_key', 'line_width');
});
$VN_2.$def('line_cap=',function(self,_cmd,cap){
VN$(self, 'will_change_value_for_key', 'line_cap');
self.$i_g('@ctx').lineCap = capVN$(self, 'did_change_value_for_key', 'line_cap');
});
$VN_2.$def('line_join=',function(self,_cmd,join){
VN$(self, 'will_change_value_for_key', 'line_join');
self.$i_g('@ctx').lineJoin = joinVN$(self, 'did_change_value_for_key', 'line_join');
});
$VN_2.$def('miter_limit=',function(self,_cmd,limit){
VN$(self, 'will_change_value_for_key', 'miter_limit');
self.$i_g('@ctx').miterLimit = limitVN$(self, 'did_change_value_for_key', 'miter_limit');
});
$VN_2.$def('alpha=',function(self,_cmd,alpha){
VN$(self, 'will_change_value_for_key', 'alpha');
self.$i_g('@ctx').globalAlpha = alphaVN$(self, 'did_change_value_for_key', 'alpha');
});
$VN_2.$def('begin_path',function(self,_cmd){
self.$i_g('@ctx').beginPath()});
$VN_2.$def('move_to_point',function(self,_cmd,point){
self.$i_g('@ctx').moveTo(VN$(point,'x'),VN$(point,'y'))});
$VN_2.$def('add_line_to_point',function(self,_cmd,point){
self.$i_g('@ctx').lineTo(VN$(point,'x'),VN$(point,'y'))});
$VN_2.$def('add_curve_to_point',function(self,_cmd,cp1,cp2,point){
self.$i_g('@ctx').bezierCurveTo(VN$(cp1,'x'),VN$(cp1,'y'),VN$(cp2,'x'),VN$(cp2,'y'),VN$(point,'x'),VN$(point,'y'))});
$VN_2.$def('add_lines',function(self,_cmd,points){
});
