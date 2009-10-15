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
VN$(self, 'did_change_value_for_key', 'origin');
});
$VN_1.$def('size=',function(self,_cmd,new_size){
VN$(self, 'will_change_value_for_key', 'size');
VN$(self, 'did_change_value_for_key', 'size');
});
$VN_1.$def('<<',function(self,_cmd,other){
self.$i_g('@element').appendChild(VN$(other,'element'))});
$VN_1.$def('add_event_listener',function(self,_cmd,type,listener){
if (document.addEventListener) {
      self.$i_g('@element').addEventListener(type, listener, false);
    }
    else {
      self.$i_g('@element').attachEvent(type, listener);
    }});
