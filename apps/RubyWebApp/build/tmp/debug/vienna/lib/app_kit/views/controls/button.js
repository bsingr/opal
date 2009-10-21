var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Button',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('ButtonCell');
});
$VN_2.$def('title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'title');
VN$(self.$i_g('@cell'),'title=',str);
VN$(self, 'did_change_value_for_key', 'title');
});
$VN_2.$def('alternate_title=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'alternate_title');
VN$(self.$i_g('@cell'),'alternate_title=',str);
VN$(self, 'did_change_value_for_key', 'alternate_title');
});
$VN_2.$def('alternate_image',function(self,_cmd){
return VN$(self.$i_g('@cell'),'alternate_image');
});
$VN_2.$def('alternate_image=',function(self,_cmd,img){
VN$(self, 'will_change_value_for_key', 'alternate_image');
VN$(self.$i_g('@cell'),'alternate_image=',img);
VN$(self, 'did_change_value_for_key', 'alternate_image');
});
$VN_2.$def('image=',function(self,_cmd,image){
VN$(self, 'will_change_value_for_key', 'image');
VN$(self.$i_g('@cell'),'image=',image);
VN$(self, 'did_change_value_for_key', 'image');
});
$VN_2.$def('image_position=',function(self,_cmd,position){
VN$(self, 'will_change_value_for_key', 'image_position');
VN$(self.$i_g('@cell'),'image_position=',position);
VN$(self, 'did_change_value_for_key', 'image_position');
});
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
VN$(self.$i_g('@cell'),'type=',type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('type',function(self,_cmd){
return VN$(self.$i_g('@cell'),'type');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
VN$(self.$i_g('@cell'),'state=',val);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('state',function(self,_cmd){
return VN$(self.$i_g('@cell'),'state');
});
$VN_2.$def('on?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'on?');
});
$VN_2.$def('off?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'off?');
});
$VN_2.$def('mixed?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'mixed?');
});
$VN_2.$def('bordered?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'bordered?');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
VN$(self.$i_g('@cell'),'bordered=',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('transparent?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'transparent?');
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
VN$(self.$i_g('@cell'),'transparent=',flag);
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return VN$(self.$i_g('@cell'),'key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,code){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
VN$(self.$i_g('@cell'),'key_equivalent=',code);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return VN$(self.$i_g('@cell'),'key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
VN$(self.$i_g('@cell'),'key_equivalent_modifier_mask=',mask);
VN$(self, 'did_change_value_for_key', 'key_equivalent_modifier_mask');
});
$VN_2.$def('highlight=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'highlight');
VN$(self, 'did_change_value_for_key', 'highlight');
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,key){
});
$VN_2.$def('bezel=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel');
VN$(self.$i_g('@cell'),'bezel=',style);
VN$(self, 'did_change_value_for_key', 'bezel');
});
$VN_2.$def('bezel',function(self,_cmd){
return VN$(self.$i_g('@cell'),'bezel');
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
VN$(self.$i_g('@cell'),'allows_mixed_state=',flag);
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'allows_mixed_state?');
});
$VN_2.$def('next_state',function(self,_cmd){
});
