var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Image',cObject);
$VN_2.$def_s('image_named',function(self,_cmd,name){
if(RTEST(VN$(VN$(self, 'named_images'),'has_key?',name))){
return VN$(VN$(self, 'named_images'),'[]',name);
}
if(RTEST(VN$(VN$(self, 'sprite_images'),'has_key?',name))){
}
var img = VN$(self,'image_with_contents_of_url',name);
VN$(VN$(self, 'named_images'),'[]=',name,img);
return img;
});
$VN_2.$def_s('named_images',function(self,_cmd){
return (self.$k_d('@@named_images') ? self.$k_g('@@named_images') : self.$k_s('@@named_images',VN.$h()));
});
$VN_2.$def_s('sprite_images',function(self,_cmd){
return (self.$k_d('@@sprite_images') ? self.$k_g('@@sprite_images') : self.$k_s('@@sprite_images',VN.$h()));
});
$VN_2.$def_s('define_sprite_image_named:in_image:with_rect:',function(self,_cmd,name,image,rect){
return VN$(VN$(self, 'sprite_images'),'[]=',name,[image,rect]);
});
$VN_2.$def_s('resource',function(self,_cmd,name,block){
var img = VN$(self,'image_named',name);
return arguments[arguments.length -1](img);
});
$VN_2.$def('initialize',function(self,_cmd){
return VN$sup(arguments.callee, self,_cmd,[]);
});
$VN_2.$def('init_with_size',function(self,_cmd,size){
});
$VN_2.$def('init_with_data',function(self,_cmd,data){
});
$VN_2.$def_s('image_with_contents_of_url',function(self,_cmd,url){
var obj = VN$(self, 'allocate');
VN$(obj,'init_with_contents_of_url',url);
return obj;
});
$VN_2.$def('init_with_contents_of_url',function(self,_cmd,url){
VN$(self, 'initialize');
self.$i_s('@filename',url);
self.$i_s('@status','loading');
self.$i_s('@image',nil);
return VN$(self, 'load');
});
$VN_2.$def('status',function(self,_cmd){
return self.$i_g('@status');
});
$VN_2.$def('load',function(self,_cmd){
if(!RTEST(VN$(ORTEST(VN$(self.$i_g('@status'),'==','loading'),self.$i_g('@status')),'==','completed'))){
return ;
}
self.$i_s('@status','loading');
self.$i_s('@image', new Image());
      
      self.$i_g('@image').onload = function() {
        VN$(self,'_image_did_load')
      };
      
      self.$i_g('@image').onerror = function() {
        VN$(self,'_image_did_error')
      };
      
      self.$i_g('@image').onabort = function() {
        VN$(self,'_image_did_error')
      };
      
      self.$i_g('@image').src = self.$i_g('@filename');
      });
$VN_2.$def('_image_did_error',function(self,_cmd){
self.$i_s('@status','read_error');
if(RTEST(ANDTEST(self.$i_g('@delegate'),VN$(self.$i_g('@delegate'),'respond_to?','image_did_error')))){
VN$(self.$i_g('@delegate'),'image_did_error',self);
}
});
$VN_2.$def('_image_did_load',function(self,_cmd){
return VN$(self,'puts','WAYYY');
});
$VN_2.$def('sprite',function(self,_cmd,name,rect){
return VN$(self,'puts',['Making sprite named ',(name)].join(''));
});
$VN_2.$def('size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'size');
self.$i_s('@size',size);
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_2.$def('size',function(self,_cmd){
return self.$i_g('@size');
});
$VN_2.$def('name=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'name');
self.$i_s('@name',name);
VN$(self, 'did_change_value_for_key', 'name');
});
$VN_2.$def('name',function(self,_cmd){
return self.$i_g('@name');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
VN$(self, 'will_change_value_for_key', 'background_color');
self.$i_s('@background_color',color);
VN$(self, 'did_change_value_for_key', 'background_color');
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draw_at_point:from_rect:operation:fraction:',function(self,_cmd,point,from_rect,op,delta){
});
$VN_2.$def('draw_in_rect:from_rect:operation:fraction:',function(self,_cmd,rect,from_rect,op,delta){
});
$VN_2.$def('draw_representation:in_rect:',function(self,_cmd,image_rep,rect){
});
$VN_2.$def('representations',function(self,_cmd){
return self.$i_g('@representations');
});
$VN_2.$def('add_representations',function(self,_cmd,image_reps){
});
$VN_2.$def('add_representation',function(self,_cmd,image_rep){
});
$VN_2.$def('remove_representation',function(self,_cmd,image_rep){
});
$VN_2.$def('valid?',function(self,_cmd){
});
$VN_2.$def('lock_focus',function(self,_cmd){
});
$VN_2.$def('unlock_focus',function(self,_cmd){
});
$VN_2.$def('delegate=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'delegate');
self.$i_s('@delegate',obj);
VN$(self, 'did_change_value_for_key', 'delegate');
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('alignment_rect',function(self,_cmd){
return self.$i_g('@alignment_rect');
});
$VN_2.$def('alignment_rect=',function(self,_cmd,rect){
VN$(self, 'will_change_value_for_key', 'alignment_rect');
self.$i_s('@alignment_rect',rect);
VN$(self, 'did_change_value_for_key', 'alignment_rect');
});
