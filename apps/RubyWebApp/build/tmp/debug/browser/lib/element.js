var $VN_1 = RClass.define('Element',cObject);
VN$($VN_1,'attr_accessor','element');
$VN_1.$def_s('find',function(self,_cmd,the_id){
document.getElementById(the_id)});
$VN_1.$def('initialize',function(self,_cmd,type,class_name,the_id){
self.$i_s('@element',document.createElement(type));
self.$i_s('@type',type);
self.$i_s('@class_name',class_name);
return self.$i_s('@id',the_id);
});
$VN_1.$def_s('element_with_type:class_name:id:',function(self,_cmd,type,class_name,the_id){
return VN$(self,'new',type,class_name,the_id);
});
$VN_1.$def('element',function(self,_cmd){
return self.$i_g('@element');
});
$VN_1.$def('origin=',function(self,_cmd,new_origin){
VN$(self, 'will_change_value_for_key', 'origin');
VN$(self, 'element').style.x = VN$(new_origin,'x');VN$(self, 'element').style.y = VN$(new_origin,'y');VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_1.$def('size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'size');
if(RTEST(VN$(self.$i_g('@type'),'==','canvas'))){
VN$(self, 'element').width = VN$(new_size,'width');VN$(self, 'element').height = VN$(new_size,'height');}
else{
VN$(self, 'element').style.width = VN$(new_size,'width');VN$(self, 'element').style.height = VN$(new_size,'height');}
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_1.$def('<<',function(self,_cmd,other){
if(RTEST(VN$(other,'instance_of?',self.$klass.$c_g_full('String')))){
VN$(self, 'element').innerHTML += other}
else{
VN$(self, 'element').appendChild(VN$(other,'element'))}
});
$VN_1.$def('add_event_listener',function(self,_cmd,type,listener){
if (document.addEventListener) {
      VN$(self, 'element').addEventListener(type, listener, false);
    }
    else {
      VN$(self, 'element').attachEvent(type, listener);
    }});
