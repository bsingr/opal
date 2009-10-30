var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TextFieldCell',$VN_2.$c_g_full('Cell'));
$VN_2.$def('init_text_cell',function(self,_cmd,str){
VN$sup(arguments.callee, self,_cmd,[str]);
self.$i_s('@editable',true);
self.$i_s('@selectable',true);
self.$i_s('@bezeled',true);
self.$i_s('@text_input_type','input');
self.$i_s('@value','');
return self;
});
$VN_2.$def('class_name',function(self,_cmd){
return 'vn-text-field';
});
$VN_2.$def('render_with_frame:in_view:',function(self,_cmd,cell_frame,control_view){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
if(RTEST(VN$(ctx,'first_time?'))){
VN$(ctx,'<<',"<div class='left'></div>");
VN$(ctx,'<<',"<div class='middle'></div>");
VN$(ctx,'<<',"<div class='right'></div>");
if(RTEST(VN$(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
VN$(ctx,'<<',"<input class='input'></input>");
}
else{
VN$(ctx,'<<',"<div class='input'></input>");
}
VN$(ctx,'first_time=',false);
}
VN$(ctx,'class_name=',VN$([VN$(self, 'class_name'),VN$(self, 'theme_name')],'join',' '));
if(RTEST(VN$(control_view,'is_a?',self.$klass.$c_g_full('TextField')))){
}
else{
VN$(ctx,'selector','input',function(input){
return VN$(input,'inner_text=',self.$i_g('@value'));
});
}
});
$VN_2.$def('background_color=',function(self,_cmd,color){
return self.$i_s('@background_color',color);
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draws_background=',function(self,_cmd,flag){
return self.$i_s('@draws_background',flag);
});
$VN_2.$def('draws_background?',function(self,_cmd){
return self.$i_g('@draws_background');
});
$VN_2.$def('text_color=',function(self,_cmd,color){
return self.$i_s('@text_color',color);
});
$VN_2.$def('text_color',function(self,_cmd){
return self.$i_g('@text_color');
});
$VN_2.$def('set_up_field_editor_attributes',function(self,_cmd,text_obj){
return text_obj;
});
$VN_2.$def('bezel_style=',function(self,_cmd,style){
return self.$i_s('@bezel_style',style);
});
$VN_2.$def('bezel_style',function(self,_cmd){
return self.$i_g('@bezel_style');
});
$VN_2.$def('placeholder_string=',function(self,_cmd,string){
return self.$i_s('@placeholder_string',string);
});
$VN_2.$def('placeholder_string',function(self,_cmd){
return self.$i_g('@placeholder_string');
});
$VN_2.$def('placeholder_attributed_string=',function(self,_cmd,str){
return self.$i_g('@placeholder_attributed_string');
});
$VN_2.$def('placeholder_attributed_string',function(self,_cmd){
return self.$i_g('@placeholder_attributed_string');
});
