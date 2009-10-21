var $VN_1 = RClass.define('Element',cObject);
VN$($VN_1,'attr_accessor','element');
$VN_1.$def_s('find',function(self,_cmd,the_id){
document.getElementById(the_id)});
$VN_1.$def('initialize',function(self,_cmd,type,options){
self.$i_s('@element',document.createElement(type));
return self.$i_s('@type',type);
});
$VN_1.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_1.$def('class_name=',function(self,_cmd,name){
VN$(self, 'will_change_value_for_key', 'class_name');
VN$(self, 'element').className = name;VN$(self, 'did_change_value_for_key', 'class_name');
});
$VN_1.$def('css',function(self,_cmd,options){
VN$(options,'each',function(key,value){
VN$(self, 'element').style[VN$(key,'camelize')] = value;});
return self;
});
$VN_1.$def('src=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'src');
VN$(self, 'element').src = obj;VN$(self, 'did_change_value_for_key', 'src');
});
$VN_1.$def('frame=',function(self,_cmd,new_frame){
VN$(self, 'will_change_value_for_key', 'frame');
VN$(self,'puts','Setting element frame to');
VN$(self,'puts',new_frame);
VN$(self,'origin=',VN$(new_frame,'origin'));
VN$(self,'size=',VN$(new_frame,'size'));
VN$(self, 'did_change_value_for_key', 'frame');
});
$VN_1.$def('origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'origin');
VN$(self, 'element').style.left = VN$(new_origin,'x') + 'px';VN$(self, 'element').style.top = VN$(new_origin,'y') + 'px';VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_1.$def('size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'size');
if(RTEST(VN$(self.$i_g('@type'),'==','canvas'))){
VN$(self, 'element').width = VN$(new_size,'width');VN$(self, 'element').height = VN$(new_size,'height');}
else{
VN$(self, 'element').style.width = VN$(new_size,'width') + 'px';VN$(self, 'element').style.height = VN$(new_size,'height') + 'px';}
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_1.$def('<<',function(self,_cmd,other){
if(RTEST(VN$(other,'instance_of?',self.$klass.$c_g_full('String')))){
VN$(self, 'element').innerHTML += other;}
else{
VN$(self, 'element').appendChild(VN$(other,'element'));}
});
$VN_1.$def('inner_html=',function(self,_cmd,str){
VN$(self, 'will_change_value_for_key', 'inner_html');
VN$(self, 'element').innerHTML = str;VN$(self, 'did_change_value_for_key', 'inner_html');
});
$VN_1.$def('add_event_listener',function(self,_cmd,type,listener){
if (document.addEventListener) {
      VN$(self, 'element').addEventListener(type, listener, false);
    }
    else {
      VN$(self, 'element').attachEvent('on' + type, listener);
    }});
