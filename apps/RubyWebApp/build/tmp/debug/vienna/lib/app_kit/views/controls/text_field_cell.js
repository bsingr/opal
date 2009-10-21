var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TextFieldCell',$VN_2.$c_g_full('Cell'));
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
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
$VN_2.$def('text_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'text_color');
self.$i_s('@text_color',color);
VN$(self, 'did_change_value_for_key', 'text_color');
});
$VN_2.$def('text_color',function(self,_cmd){
return self.$i_g('@text_color');
});
$VN_2.$def('set_up_field_editor_attributes',function(self,_cmd,text_obj){
return text_obj;
});
$VN_2.$def('bezel_style=',function(self,_cmd,style){
VN$(self, 'will_change_value_for_key', 'bezel_style');
self.$i_s('@bezel_style',style);
VN$(self, 'did_change_value_for_key', 'bezel_style');
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
$VN_2.$def('placeholder_string=',function(self,_cmd,string){
VN$(self, 'will_change_value_for_key', 'placeholder_string');
self.$i_s('@placeholder_string',string);
VN$(self, 'did_change_value_for_key', 'placeholder_string');
});
$VN_2.$def('placeholder_string',function(self,_cmd){
return self.$i_g('@placeholder_string');
});
$VN_2.$def('placeholder_attributed_string=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'placeholder_attributed_string');
self.$i_g('@placeholder_attributed_string');
VN$(self, 'did_change_value_for_key', 'placeholder_attributed_string');
});
$VN_2.$def('placeholder_attributed_string',function(self,_cmd){
return self.$i_g('@placeholder_attributed_string');
});
