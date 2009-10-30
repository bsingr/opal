var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Image',cObject);
$VN_2.$def_s('image_named',function(self,_cmd,name){
if(RTEST(VN$(VN$(self, 'named_images'),'has_key?',name))){
return VN$(VN$(self, 'named_images'),'[]',name);
}
if(RTEST(VN$(VN$(self, 'sprite_images'),'has_key?',name))){
}
var img = VN$(self,'image_with_contents_of_url',["images/",(name),".png"].join(''));
VN$(VN$(self, 'named_images'),'[]=',name,img);
return img;
});
$VN_2.$def_s('named_images',function(self,_cmd){
return self.$i_s('@named_images',ORTEST(self.$i_g('@named_images'),VN.$h()));
});
$VN_2.$def_s('sprite_images',function(self,_cmd){
return self.$i_s('@sprite_images',ORTEST(self.$i_g('@sprite_images'),VN.$h()));
});
$VN_2.$def_s('resource',function(self,_cmd,name,block){
var img = VN$(self,'image_named',name);
return arguments[arguments.length -1](img);
});
$VN_2.$def_s('sprite',function(self,_cmd,name,rect){
var img = VN$(self,'image_named',name);
var obj = VN$(self,'new');
VN$(obj,'image=',VN$(img,'image'));
VN$(obj,'filename=',VN$(img,'filename'));
VN$(obj,'add_representation:rect:','normal',rect);
return obj;
});
$VN_2.$def_s('sprite:normal:gray_mask:disabled:',function(self,_cmd,image,normal,gray_mask,disabled){
var img = VN$(self,'image_named',image);
var obj = VN$(self,'new');
VN$(obj,'image=',VN$(img,'image'));
VN$(obj,'filename=',VN$(img,'filename'));
VN$(obj,'add_representation:rect:','normal',normal);
VN$(obj,'add_representation:rect:','gray_mask',gray_mask);
VN$(obj,'add_representation:rect:','disabled',disabled);
return obj;
});
$VN_2.$def_s('sprite_cell_masks',function(self,_cmd,name,block){
var img = VN$(self,'image_named',name);
var obj = VN$(self,'new');
VN$(obj,'image=',VN$(img,'image'));
VN$(obj,'filename=',VN$(img,'filename'));
arguments[arguments.length -1](obj);
return obj;
});
$VN_2.$def('add_representation:rect:',function(self,_cmd,type,array_rect){
VN$(self.$i_g('@representations'),'[]=',type,array_rect);
if(RTEST(VN$(type,'==','normal'))){
self.$i_s('@size',VN$(self.$klass.$c_g_full('Size'),'new',VN$(array_rect,'[]',2),VN$(array_rect,'[]',3)));
}
});
$VN_2.$def('initialize',function(self,_cmd){
VN$sup(arguments.callee, self,_cmd,[]);
return self.$i_s('@representations',VN.$h());
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
self.$i_s('@image',nil);
return VN$(self, 'load');
});
$VN_2.$def('status',function(self,_cmd){
return self.$i_g('@status');
});
$VN_2.$def('load',function(self,_cmd){
if(RTEST(ORTEST(VN$(self.$i_g('@status'),'==','loading'),VN$(self.$i_g('@status'),'==','completed')))){
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
return self.$i_s('@size',VN$(self.$klass.$c_g_full('Size'),'new',self.$i_g('@image').width,self.$i_g('@image').height));
});
$VN_2.$def('sprite',function(self,_cmd,name,rect){
return self;
});
$VN_2.$def('image',function(self,_cmd){
return self.$i_g('@image');
});
$VN_2.$def('image=',function(self,_cmd,img){
return self.$i_s('@image',img);
});
$VN_2.$def('filename=',function(self,_cmd,name){
return self.$i_s('@filename',name);
});
$VN_2.$def('filename',function(self,_cmd){
return self.$i_g('@filename');
});
$VN_2.$def('sprite_origin=',function(self,_cmd,point){
return self.$i_s('@sprite_origin',point);
});
$VN_2.$def('size=',function(self,_cmd,size){
return self.$i_s('@size',size);
});
$VN_2.$def('size',function(self,_cmd){
return ORTEST(self.$i_g('@size'),VN$(self.$klass.$c_g_full('Size'),'new',0,0));
});
$VN_2.$def('name=',function(self,_cmd,name){
return self.$i_s('@name',name);
});
$VN_2.$def('name',function(self,_cmd){
return self.$i_g('@name');
});
$VN_2.$def('background_color=',function(self,_cmd,color){
return self.$i_s('@background_color',color);
});
$VN_2.$def('background_color',function(self,_cmd){
return self.$i_g('@background_color');
});
$VN_2.$def('draw_at_point:from_rect:operation:fraction:',function(self,_cmd,point,from_rect,op,delta){
});
$VN_2.$def('draw_in_rect:from_rect:operation:fraction:',function(self,_cmd,rect,from_rect,op,delta){
});
$VN_2.$def('render_in_rect:enabled:gray_mask:',function(self,_cmd,rect,enabled,gray_mask){
var ctx = VN$(self.$klass.$c_g_full('RenderContext'),'current_context');
VN$(ctx,'css',VN.$h('display','block','background_image',["url('",(VN$(self, 'filename')),"')"].join('')));
VN$(ctx,'css',VN.$h('width',[(VN$(rect,'width')),"px"].join(''),'height',[(VN$(rect,'height')),"px"].join('')));
VN$(ctx,'css',VN.$h('left',[(VN$(rect,'x')),"px"].join(''),'top',[(VN$(rect,'y')),"px"].join('')));
var rep = gray_mask ? VN$(self.$i_g('@representations'),'[]','gray_mask') : VN$(self.$i_g('@representations'),'[]','normal');
if(!RTEST(enabled)){
rep = VN$(self.$i_g('@representations'),'[]','disabled');
}
return VN$(ctx,'css',VN.$h('background_position',["-",(VN$(rep,'[]',0)),"px -",(VN$(rep,'[]',1)),"px"].join('')));
});
$VN_2.$def('render_in_rect',function(self,_cmd,rect){
return VN$(self,'render_in_rect:enabled:gray_mask:',rect,true,false);
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
return self.$i_s('@delegate',obj);
});
$VN_2.$def('delegate',function(self,_cmd){
return self.$i_g('@delegate');
});
$VN_2.$def('alignment_rect',function(self,_cmd){
return self.$i_g('@alignment_rect');
});
$VN_2.$def('alignment_rect=',function(self,_cmd,rect){
return self.$i_s('@alignment_rect',rect);
});
