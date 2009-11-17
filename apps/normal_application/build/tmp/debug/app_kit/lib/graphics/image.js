(function(self) {
(function(self) {
self.$def_s('image_named',function(self,_,name){
name=rb_funcall(name,'to_s');
if(RTEST(rb_funcall(rb_funcall(self,'named_images'),'has_key?',name))){
return rb_funcall(rb_funcall(self,'named_images'),'[]',name);
}
if(RTEST(rb_funcall(rb_funcall(self,'sprite_images'),'has_key?',name))){
}
var url=["images/",(name),".png"].join('');
var image_name=[(name),".png"].join('');
if(vn_resource_stack.hasOwnProperty(image_name)) {url=vn_resource_stack[image_name];
var img=rb_funcall(self,'image_with_contents_of_url',url);
rb_funcall(rb_funcall(self,'named_images'),'[]=',name,img);
return img;
}img=rb_funcall(self,'image_with_contents_of_url',["images/",(name),".png"].join(''));
rb_funcall(rb_funcall(self,'named_images'),'[]=',name,img);
return img;
});
self.$def_s('named_images',function(self,_){
return self.$i_s('@named_images',ORTEST(rb_ivar_get(self,'@named_images'),VN.$h()));
});
self.$def_s('sprite_images',function(self,_){
return self.$i_s('@sprite_images',ORTEST(rb_ivar_get(self,'@sprite_images'),VN.$h()));
});
self.$def_s('resource',function(self,_,name,block){
var img=rb_funcall(self,'image_named',name);
return arguments[arguments.length -1](img);
});
self.$def_s('sprite',function(self,_,name,rect){
var img=rb_funcall(self,'image_named',name);
var obj=rb_funcall(self,'new');
rb_funcall(obj,'image=',rb_funcall(img,'image'));
rb_funcall(obj,'filename=',rb_funcall(img,'filename'));
rb_funcall(obj,'add_representation:rect:',ID2SYM('normal'),rect);
return obj;
});
self.$def_s('sprite:normal:gray_mask:disabled:',function(self,_,image,normal,gray_mask,disabled){
var img=rb_funcall(self,'image_named',image);
var obj=rb_funcall(self,'new');
rb_funcall(obj,'image=',rb_funcall(img,'image'));
rb_funcall(obj,'filename=',rb_funcall(img,'filename'));
rb_funcall(obj,'add_representation:rect:',ID2SYM('normal'),normal);
rb_funcall(obj,'add_representation:rect:',ID2SYM('gray_mask'),gray_mask);
rb_funcall(obj,'add_representation:rect:',ID2SYM('disabled'),disabled);
return obj;
});
self.$def_s('sprite_cell_masks',function(self,_,name,block){
var img=rb_funcall(self,'image_named',name);
var obj=rb_funcall(self,'new');
rb_funcall(obj,'image=',rb_funcall(img,'image'));
rb_funcall(obj,'filename=',rb_funcall(img,'filename'));
arguments[arguments.length -1](obj);
return obj;
});
self.$def('add_representation:rect:',function(self,_,type,array_rect){
rb_funcall(rb_ivar_get(self,'@representations'),'[]=',type,array_rect);
if(RTEST(rb_funcall(type,'==',ID2SYM('normal')))){
self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_funcall(array_rect,'[]',2),rb_funcall(array_rect,'[]',3)));
}
});
rb_define_method(self,'initialize',function(self,_,url,width,height){
self.$i_s('@representations',VN.$h());
self.$i_s('@filename',url);
if(RTEST(width)){
self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',width,height));
}
return rb_funcall(self,'load');
});
rb_define_method(self,'init_with_size',function(self,_,size){
});
rb_define_method(self,'init_with_data',function(self,_,data){
});
self.$def_s('image_with_contents_of_url',function(self,_,url){
var obj=rb_funcall(self,'allocate');
rb_funcall(obj,'init_with_contents_of_url',url);
return obj;
});
rb_define_method(self,'init_with_contents_of_url',function(self,_,url){
return rb_funcall(self,'initialize',url);
});
rb_define_method(self,'status',function(self,_){
return rb_ivar_get(self,'@status');
});
rb_define_method(self,'load',function(self,_){
if(RTEST(ORTEST(rb_funcall(rb_ivar_get(self,'@status'),'==',ID2SYM('loading')),rb_funcall(rb_ivar_get(self,'@status'),'==',ID2SYM('completed'))))){
return ;
}
self.$i_s('@status',ID2SYM('loading'));
self.$i_s('@image', new Image());
      
      rb_ivar_get(self,'@image').onload = function() {
        rb_funcall(self,'_image_did_load')
      };
      
      rb_ivar_get(self,'@image').onerror = function() {
        rb_funcall(self,'_image_did_error')
      };
      
      rb_ivar_get(self,'@image').onabort = function() {
        rb_funcall(self,'_image_did_error')
      };
      
      rb_ivar_get(self,'@image').src = rb_ivar_get(self,'@filename');
      });
rb_define_method(self,'_image_did_error',function(self,_){
self.$i_s('@status',ID2SYM('read_error'));
if(RTEST(ANDTEST(rb_ivar_get(self,'@delegate'),rb_funcall(rb_ivar_get(self,'@delegate'),'respond_to?',ID2SYM('image_did_error'))))){
rb_funcall(rb_ivar_get(self,'@delegate'),'image_did_error',self);
}
});
rb_define_method(self,'_image_did_load',function(self,_){
return self.$i_s('@size',rb_funcall(self.$klass.$c_g_full('Size'),'new',rb_ivar_get(self,'@image').width,rb_ivar_get(self,'@image').height));
});
rb_define_method(self,'sprite',function(self,_,name,rect){
return self;
});
rb_define_method(self,'image',function(self,_){
return rb_ivar_get(self,'@image');
});
rb_define_method(self,'image=',function(self,_,img){
return self.$i_s('@image',img);
});
rb_define_method(self,'filename=',function(self,_,name){
return self.$i_s('@filename',name);
});
rb_define_method(self,'filename',function(self,_){
return rb_ivar_get(self,'@filename');
});
rb_define_method(self,'sprite_origin=',function(self,_,point){
return self.$i_s('@sprite_origin',point);
});
rb_define_method(self,'size=',function(self,_,size){
return self.$i_s('@size',size);
});
rb_define_method(self,'size',function(self,_){
return ORTEST(rb_ivar_get(self,'@size'),rb_funcall(self.$klass.$c_g_full('Size'),'new',0,0));
});
rb_define_method(self,'name=',function(self,_,name){
return self.$i_s('@name',name);
});
rb_define_method(self,'name',function(self,_){
return rb_ivar_get(self,'@name');
});
rb_define_method(self,'background_color=',function(self,_,color){
return self.$i_s('@background_color',color);
});
rb_define_method(self,'background_color',function(self,_){
return rb_ivar_get(self,'@background_color');
});
self.$def('draw_at_point:from_rect:operation:fraction:',function(self,_,point,from_rect,op,delta){
});
self.$def('draw_in_rect:from_rect:operation:fraction:',function(self,_,rect,from_rect,op,delta){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
ctx.drawImage(rb_ivar_get(self,'@image'), rb_funcall(rect,'x'), rb_funcall(rect,'y'), rb_funcall(rect,'width'),rb_funcall(rect,'height'))});
self.$def('render_in_rect:from_rect:operation:fraction:',function(self,_,rect,from_rect,op,delta){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(ctx,'append',ID2SYM('div'),function(ctx){
rb_funcall(ctx,'frame=',rect);
return rb_funcall(ctx,'css',VN.$h(ID2SYM('background_image'),["url('",(rb_funcall(self,'filename')),"')"].join('')));
});
});
rb_define_method(self,'render_with_frame',function(self,_,rect){
return rb_funcall(self,'render_in_rect:from_rect:operation:fraction:',rect,rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
self.$def('draw_in_rect:enabled:gray_mask:',function(self,_,rect,enabled,gray_mask){
var ctx=rb_funcall(rb_funcall(self.$klass.$c_g_full('GraphicsContext'),'current_context'),'graphics_port');
var rep=RTEST(gray_mask) ? rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('gray_mask')) : rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('normal'));
if(!RTEST(enabled)){
rep=rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('disabled'));
}
if(!RTEST(rep)){
rep=rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('normal'));
}
ctx.drawImage(rb_ivar_get(self,'@image'), rb_funcall(rep,'[]',0), rb_funcall(rep,'[]',1), rb_funcall(rep,'[]',2),rb_funcall(rep,'[]',3), rb_funcall(rect,'x'), rb_funcall(rect,'y'), rb_funcall(rect,'width'),rb_funcall(rect,'height'))});
self.$def('render_in_rect:enabled:gray_mask:',function(self,_,rect,enabled,gray_mask){
var ctx=rb_funcall(self.$klass.$c_g_full('RenderContext'),'current_context');
return rb_funcall(ctx,'append',ID2SYM('div'),function(ctx){
rb_funcall(ctx,'frame=',rect);
rb_funcall(ctx,'css',VN.$h(ID2SYM('background_image'),["url('",(rb_funcall(self,'filename')),"')"].join('')));
var rep=RTEST(gray_mask) ? rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('gray_mask')) : rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('normal'));
if(!RTEST(enabled)){
rep=rb_funcall(rb_ivar_get(self,'@representations'),'[]',ID2SYM('disabled'));
}
return rb_funcall(ctx,'css',VN.$h(ID2SYM('background_position'),["-",(rb_funcall(rep,'[]',0)),"px -",(rb_funcall(rep,'[]',1)),"px"].join('')));
});
});
rb_define_method(self,'render_in_rect',function(self,_,rect){
return rb_funcall(self,'render_in_rect:enabled:gray_mask:',rect,true,false);
});
self.$def('draw_representation:in_rect:',function(self,_,image_rep,rect){
});
rb_define_method(self,'representations',function(self,_){
return rb_ivar_get(self,'@representations');
});
rb_define_method(self,'add_representations',function(self,_,image_reps){
});
rb_define_method(self,'add_representation',function(self,_,image_rep){
});
rb_define_method(self,'remove_representation',function(self,_,image_rep){
});
rb_define_method(self,'valid?',function(self,_){
});
rb_define_method(self,'lock_focus',function(self,_){
});
rb_define_method(self,'unlock_focus',function(self,_){
});
rb_define_method(self,'delegate=',function(self,_,obj){
return self.$i_s('@delegate',obj);
});
rb_define_method(self,'delegate',function(self,_){
return rb_ivar_get(self,'@delegate');
});
rb_define_method(self,'alignment_rect',function(self,_){
return rb_ivar_get(self,'@alignment_rect');
});
rb_define_method(self,'alignment_rect=',function(self,_,rect){
return self.$i_s('@alignment_rect',rect);
});
})(rb_define_class_under(self,'Image',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,part1,part2,part3,vertical){
self.$i_s('@parts',[part1,part2,part3]);
return self.$i_s('@vertical',vertical);
});
rb_define_method(self,'render_with_frame',function(self,_,frame){
if(RTEST(rb_ivar_get(self,'@vertical'))){
var top_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var bottom_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(frame,'y'),rb_funcall(top_size,'width'),rb_funcall(top_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_size,'height')),rb_funcall(top_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_size,'height'),'+',rb_funcall(bottom_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_size,'height')),rb_funcall(top_size,'width'),rb_funcall(bottom_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
}
else{
var left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var right_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(frame,'y'),rb_funcall(left_size,'width'),rb_funcall(left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(left_size,'width')),rb_funcall(frame,'y'),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall(rb_funcall(left_size,'width'),'+',rb_funcall(right_size,'width')))),rb_funcall(left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(right_size,'width')),rb_funcall(frame,'y'),rb_funcall(right_size,'width'),rb_funcall(left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
}
});
rb_define_method(self,'draw_with_frame',function(self,_,frame){
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,6,24),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',6,0,rb_funcall(rb_funcall(frame,'width'),'-',12),24),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
return rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'width'),'-',6),0,6,24),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
})(rb_define_class_under(self,'ThreePartImage',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,part0,part1,part2,part3,part4,part5,part6,part7,part8,vertical){
self.$i_s('@parts',[part0,part1,part2,part3,part4,part5,part6,part7,part8]);
return self.$i_s('@vertical',vertical);
});
rb_define_method(self,'render_with_frame',function(self,_,frame){
var top_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var bottom_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',0),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(frame,'y'),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',3),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',4),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',5),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',7),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(bottom_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
return rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',8),'render_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(bottom_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
rb_define_method(self,'draw_with_frame',function(self,_,frame){
var top_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'size');
var bottom_left_size=rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'size');
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',0),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',0),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',1),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(frame,'y'),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',2),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(frame,'y'),rb_funcall(top_left_size,'width'),rb_funcall(top_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',3),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',4),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(top_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',5),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(top_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',rb_funcall(top_left_size,'height')),rb_funcall(top_left_size,'width'),rb_funcall(rb_funcall(frame,'height'),'-',(rb_funcall(rb_funcall(top_left_size,'height'),'+',rb_funcall(bottom_left_size,'height'))))),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',6),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(frame,'x'),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',7),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',rb_funcall(bottom_left_size,'width')),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(rb_funcall(frame,'width'),'-',(rb_funcall((2),'*',rb_funcall(top_left_size,'width')))),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
return rb_funcall(rb_funcall(rb_ivar_get(self,'@parts'),'[]',8),'draw_in_rect:from_rect:operation:fraction:',rb_funcall(self.$klass.$c_g_full('Rect'),'new',rb_funcall(rb_funcall(frame,'x'),'+',(rb_funcall(rb_funcall(frame,'width'),'-',rb_funcall(bottom_left_size,'width')))),rb_funcall(rb_funcall(frame,'y'),'+',(rb_funcall(rb_funcall(frame,'height'),'-',rb_funcall(bottom_left_size,'height')))),rb_funcall(bottom_left_size,'width'),rb_funcall(bottom_left_size,'height')),rb_funcall(self.$klass.$c_g_full('Rect'),'new',0,0,0,0),nil,1.0);
});
})(rb_define_class_under(self,'NinePartImage',cObject));
(function(self) {
rb_define_method(self,'initialize',function(self,_,normal,highlighted,disabled){
self.$i_s('@normal',normal);
self.$i_s('@highlighted',highlighted);
return self.$i_s('@disabled',disabled);
});
rb_define_method(self,'size',function(self,_){
return rb_funcall(rb_ivar_get(self,'@normal'),'size');
});
rb_define_method(self,'filename',function(self,_){
return rb_funcall(rb_ivar_get(self,'@normal'),'filename');
});
rb_define_method(self,'render_with_frame',function(self,_,frame,state){
return (function($v){
if(($e = rb_funcall(ID2SYM('normal'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(rb_ivar_get(self,'@normal'),'render_with_frame',frame);
}
else if(($e = rb_funcall(ID2SYM('highlighted'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(rb_ivar_get(self,'@highlighted'),'render_with_frame',frame);
}
else if(($e = rb_funcall(ID2SYM('disabled'), '===', $v),$e!==nil && $e!==false)){
return rb_funcall(rb_ivar_get(self,'@disabled'),'render_with_frame',frame);
}
})(state);
});
})(rb_define_class_under(self,'ThreeStateImage',cObject));
})(rb_define_module('Vienna'));
