var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Array',cObject);
$VN_2.$def('to_rect',function(self,_cmd){
if(RTEST(VN$(VN$(self, 'length'),'==',4))){
VN$(self.$klass.$c_g_full('Rect'),'new',self[0],self[1],self[2],self[3]);
}
else{
VN$(self.$klass.$c_g_full('Rect'),'new',0,0,0,0);
}
});
$VN_2.$def('to_size',function(self,_cmd){
if(RTEST(VN$(VN$(self, 'length'),'==',2))){
VN$(self.$klass.$c_g_full('Size'),'new',self[0],self[1]);
}
else if(RTEST(VN$(VN$(self, 'length'),'==',4))){
VN$(self.$klass.$c_g_full('Size'),'new',self[2],self[3]);
}
else{
VN$(self.$klass.$c_g_full('Size'),'new',0,0);
}
});
$VN_2.$def('to_point',function(self,_cmd){
if(RTEST(VN$(VN$(self, 'length'),'==',2))){
VN$(self.$klass.$c_g_full('Point'),'new',self[0],self[1]);
}
else if(RTEST(VN$(VN$(self, 'length'),'==',4))){
VN$(self.$klass.$c_g_full('Point'),'new',self[0],self[1]);
}
else{
VN$(self.$klass.$c_g_full('Point'),'new',0,0);
}
});
