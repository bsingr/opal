var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Button',$VN_2.$c_g_full('Control'));
VN$($VN_2,'attr_reader','title','alternate_title','image','image_position');
$VN_2.$def('initialize',function(self,_cmd,frame){
return VN$sup(arguments.callee, self,_cmd,[frame]);
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
$VN_2.$def('type=',function(self,_cmd,type){
VN$(self, 'will_change_value_for_key', 'type');
self.$i_s('@type',type);
VN$(self, 'did_change_value_for_key', 'type');
});
$VN_2.$def('type',function(self,_cmd){
return self.$i_g('@type');
});
$VN_2.$def('state=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'state');
self.$i_s('@state',val);
VN$(self, 'did_change_value_for_key', 'state');
});
$VN_2.$def('state',function(self,_cmd){
return self.$i_g('@state');
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
return self.$i_g('@bordered');
});
$VN_2.$def('bordered=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'bordered');
self.$i_s('@bordered',flag);
VN$(self, 'did_change_value_for_key', 'bordered');
});
$VN_2.$def('transparent?',function(self,_cmd){
return self.$i_g('@transparent');
});
$VN_2.$def('transparent=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'transparent');
self.$i_s('@transparent',flag);
VN$(self, 'did_change_value_for_key', 'transparent');
});
$VN_2.$def('key_equivalent',function(self,_cmd){
return self.$i_g('@key_equivalent');
});
$VN_2.$def('key_equivalent=',function(self,_cmd,code){
VN$(self, 'will_change_value_for_key', 'key_equivalent');
self.$i_s('@key_equivalent',code);
VN$(self, 'did_change_value_for_key', 'key_equivalent');
});
$VN_2.$def('key_equivalent_modifier_mask',function(self,_cmd){
return self.$i_g('@key_equivalent_modifier_mask');
});
$VN_2.$def('key_equivalent_modifier_mask=',function(self,_cmd,mask){
VN$(self, 'will_change_value_for_key', 'key_equivalent_modifier_mask');
self.$i_s('@key_equivalent_modifier_mask',mask);
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
self.$i_s('@bezel',style);
VN$(self, 'did_change_value_for_key', 'bezel');
});
$VN_2.$def('bezel',function(self,_cmd){
return self.$i_g('@bezel');
});
$VN_2.$def('allows_mixed_state=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'allows_mixed_state');
self.$i_s('@allows_mixed_state',flag);
VN$(self, 'did_change_value_for_key', 'allows_mixed_state');
});
$VN_2.$def('allows_mixed_state?',function(self,_cmd){
return self.$i_g('@allows_mixed_state');
});
$VN_2.$def('next_state',function(self,_cmd){
});
$VN_2.$def('class_name',function(self,_cmd){
return ORTEST(self.$i_g('@class_name'),'vn-button');
});
$VN_2.$def('render',function(self,_cmd,context){
if(RTEST(VN$(context,'first_time?'))){
VN$(context,'<<',"<div class='left'></div>");
VN$(context,'<<',"<div class='middle'></div>");
VN$(context,'<<',"<div class='right'></div>");
VN$(context,'<<',"<div class='title'>Wow!</div>");
VN$(context,'first_time=',false);
}
VN$(context,'class_name=',VN$([VN$(self, 'class_name'),'bordered','bezel','regular','enabled'],'join',' '));
return VN$(context,'selector','title',function(title){
return VN$(title,'inner_html=','My Button!');
});
});
