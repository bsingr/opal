var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Button',$VN_2.$c_g_full('Control'));
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return self.$c_g_full('ButtonCell');
});
$VN_2.$def('title=',function(self,_cmd,str){
return VN$(self.$i_g('@cell'),'title=',str);
});
$VN_2.$def('alternate_title=',function(self,_cmd,str){
return VN$(self.$i_g('@cell'),'alternate_title=',str);
});
$VN_2.$def('alternate_image',function(self,_cmd){
return VN$(self.$i_g('@cell'),'alternate_image');
});
$VN_2.$def('alternate_image=',function(self,_cmd,img){
return VN$(self.$i_g('@cell'),'alternate_image=',img);
});
$VN_2.$def('image=',function(self,_cmd,image){
return VN$(self.$i_g('@cell'),'image=',image);
});
$VN_2.$def('image_position=',function(self,_cmd,position){
return VN$(self.$i_g('@cell'),'image_position=',position);
});
$VN_2.$def('type=',function(self,_cmd,type){
return VN$(self.$i_g('@cell'),'type=',type);
});
$VN_2.$def('type',function(self,_cmd){
return VN$(self.$i_g('@cell'),'type');
});
$VN_2.$def('state=',function(self,_cmd,val){
return VN$(self.$i_g('@cell'),'state=',val);
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
return VN$(self.$i_g('@cell'),'bordered=',flag);
});
$VN_2.$def('transparent?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'transparent?');
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
return VN$(self.$i_g('@cell'),'transparent=',flag);
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return VN$(self.$i_g('@cell'),'key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,code){
return VN$(self.$i_g('@cell'),'key_equivalent=',code);
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return VN$(self.$i_g('@cell'),'key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
return VN$(self.$i_g('@cell'),'key_equivalent_modifier_mask=',mask);
});
$VN_2.$def('highlight=',function(self,_cmd,flag){
});
$VN_2.$def('perform_key_equivalent',function(self,_cmd,key){
});
$VN_2.$def('bezel=',function(self,_cmd,style){
return VN$(self.$i_g('@cell'),'bezel=',style);
});
$VN_2.$def('bezel',function(self,_cmd){
return VN$(self.$i_g('@cell'),'bezel');
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
return VN$(self.$i_g('@cell'),'allows_mixed_state=',flag);
});
$VN_2.$def('allows_mixed_state?',function(self,_cmd){
return VN$(self.$i_g('@cell'),'allows_mixed_state?');
});
$VN_2.$def('next_state',function(self,_cmd){
});
