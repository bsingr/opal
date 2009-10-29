var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Rect',cObject);
$VN_2.$def('initialize',function(self,_cmd,x,y,w,h){
self.$i_s('@origin',VN$(self.$klass.$c_g_full('Point'),'new',x,y));
return self.$i_s('@size',VN$(self.$klass.$c_g_full('Size'),'new',w,h));
});
$VN_2.$def('to_rect',function(self,_cmd){
return self;
});
$VN_2.$def('size',function(self,_cmd){
return self.$i_g('@size');
});
$VN_2.$def('size=',function(self,_cmd,size){
VN$(self, 'will_change_value_for_key', 'size');
self.$i_s('@size',size);
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_2.$def('origin',function(self,_cmd){
return self.$i_g('@origin');
});
$VN_2.$def('origin=',function(self,_cmd,point){
VN$(self, 'will_change_value_for_key', 'origin');
self.$i_s('@origin',point);
VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_2.$def('x',function(self,_cmd){
return VN$(self.$i_g('@origin'),'x');
});
$VN_2.$def('y',function(self,_cmd){
return VN$(self.$i_g('@origin'),'y');
});
$VN_2.$def('width',function(self,_cmd){
return VN$(self.$i_g('@size'),'width');
});
$VN_2.$def('height',function(self,_cmd){
return VN$(self.$i_g('@size'),'height');
});
$VN_2.$def('x=',function(self,_cmd,x){
VN$(self, 'will_change_value_for_key', 'x');
VN$(self.$i_g('@origin'),'x=',x);
VN$(self, 'did_change_value_for_key', 'x');
});
$VN_2.$def('y=',function(self,_cmd,y){
VN$(self, 'will_change_value_for_key', 'y');
VN$(self.$i_g('@origin'),'y=',y);
VN$(self, 'did_change_value_for_key', 'y');
});
$VN_2.$def('width=',function(self,_cmd,w){
VN$(self, 'will_change_value_for_key', 'width');
VN$(self.$i_g('@size'),'width=',w);
VN$(self, 'did_change_value_for_key', 'width');
});
$VN_2.$def('height=',function(self,_cmd,h){
VN$(self, 'will_change_value_for_key', 'height');
VN$(self.$i_g('@size'),'height=',h);
VN$(self, 'did_change_value_for_key', 'height');
});
$VN_2.$def('to_a',function(self,_cmd){
return [VN$(self, 'x'),VN$(self, 'y'),VN$(self, 'w'),VN$(self, 'h')];
});
$VN_2.$def('center',function(self,_cmd){
});
$VN_2.$def('contain?',function(self,_cmd){
});
$VN_2.$def('to_s',function(self,_cmd){
return ["{{",(VN$(self, 'x')),", ",(VN$(self, 'y')),"}, {",(VN$(self, 'width')),", ",(VN$(self, 'height')),"}}"].join('');
});
$VN_2.$def('inspect',function(self,_cmd){
});
$VN_2.$def('eql?',function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g('@size'),'eql?',VN$(other,'size')),VN$(self.$i_g('@origin'),'eql?',VN$(other,'origin')));
});
var $VN_2 = RClass.define_under($VN_1, 'Point',cObject);
$VN_2.$def('initialize',function(self,_cmd,x,y){
self.$i_s('@x',x);
return self.$i_s('@y',y);
});
$VN_2.$def('to_point',function(self,_cmd){
return self;
});
$VN_2.$def('x',function(self,_cmd){
return self.$i_g('@x');
});
$VN_2.$def('x=',function(self,_cmd,x){
VN$(self, 'will_change_value_for_key', 'x');
self.$i_s('@x',x);
VN$(self, 'did_change_value_for_key', 'x');
});
$VN_2.$def('y',function(self,_cmd){
return self.$i_g('@y');
});
$VN_2.$def('y=',function(self,_cmd,y){
VN$(self, 'will_change_value_for_key', 'y');
self.$i_s('@y',y);
VN$(self, 'did_change_value_for_key', 'y');
});
$VN_2.$def('eql?',function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g('@x'),'==',VN$(other,'x')),VN$(self.$i_g('@y'),'==',VN$(other,'y')));
});
$VN_2.$def('in_rect?',function(self,_cmd,a_rect){
return ANDTEST(VN$(VN$(self, 'x'),'>=',VN$(a_rect,'x')),ANDTEST(VN$(VN$(self, 'y'),'>=',VN$(a_rect,'y')),ANDTEST(VN$(VN$(self, 'x'),'<',VN$(VN$(a_rect,'x'),'+',VN$(a_rect,'width'))),VN$(VN$(self, 'y'),'<',VN$(VN$(a_rect,'y'),'+',VN$(a_rect,'height'))))));
});
var $VN_2 = RClass.define_under($VN_1, 'Size',cObject);
$VN_2.$def('initialize',function(self,_cmd,w,h){
self.$i_s('@width',w);
return self.$i_s('@height',h);
});
$VN_2.$def('to_size',function(self,_cmd){
return self;
});
$VN_2.$def('width',function(self,_cmd){
return self.$i_g('@width');
});
$VN_2.$def('width=',function(self,_cmd,w){
VN$(self, 'will_change_value_for_key', 'width');
self.$i_s('@width',w);
VN$(self, 'did_change_value_for_key', 'width');
});
$VN_2.$def('height',function(self,_cmd){
return self.$i_g('@height');
});
$VN_2.$def('height=',function(self,_cmd,h){
VN$(self, 'will_change_value_for_key', 'height');
self.$i_s('@height',h);
VN$(self, 'did_change_value_for_key', 'height');
});
$VN_2.$def('eql?',function(self,_cmd,other){
return ANDTEST(VN$(self.$i_g('@width'),'==',VN$(other,'width')),VN$(self.$i_g('@height'),'==',VN$(other,'height')));
});
