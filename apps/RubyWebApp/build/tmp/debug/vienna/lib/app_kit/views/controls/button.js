var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Button',$VN_2.$c_g_full('Control'));
VN$($VN_2,'attr_reader','title','alternate_title','image','image_position');
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('ButtonCell');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('alternate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alternate_title');
VN$(self, 'did_change_value_for_key', 'alternate_title');
});
$VN_2.$def('image=',function(self,_cmd,image){
VN$(self, 'will_change_value_for_key', 'image');
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('image_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'image_position');
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('button_type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'button_type');
VN$(self, 'did_change_value_for_key', 'button_type');
});
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
var button_type = type;
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',val);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('on?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','on');
});
$VN_2.$def('off?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','off');
});
$VN_2.$def('mixed?',function(self,_cmd){
return VN$(self.$i_g('@state'),'==','mixed');
});
$VN_2.$def('bordered?',function(self,_cmd){
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('transparent?',function(self,_cmd){
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('key_equivalent',function(self,_cmd){
});
$VN_2.$def('key_equivalent=',function(self,_cmd,code){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('highlight=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'highlight');
VN$(self, 'did_change_value_for_key', 'highlight');
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,key){
});
$VN_2.$def('bezel_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel');
var bezel_style = style;
VN$(self, 'did_change_value_for_key', 'bezel');
});
$VN_2.$def('bezel_style',function(self,_cmd){
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state',function(self,_cmd){
});
$VN_2.$def('next_state',function(self,_cmd){
});
