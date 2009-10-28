var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Builder',cObject);
VN$($VN_2,'attr_accessor','owner');
$VN_2.$c_s('BUILDERS',VN.$h());
$VN_2.$def('initialize',function(self,_cmd,name,block){
self.$i_s('@name',name);
self.$i_s('@builder',block);
self.$i_s('@top_level_objects',[]);
return VN$(self.$klass.$c_g_full('BUILDERS'),'[]=',name,self);
});
$VN_2.$def_s('build',function(self,_cmd,name,options,block){
var builder = VN$(self.$c_g_full('BUILDERS'),'[]',name);
return VN$(builder,'build!',options,block);
});
$VN_2.$def('build!',function(self,_cmd,options,block){
VN$(self.$i_g('@builder'),'call',self);
return arguments[arguments.length -1](self);
});
$VN_2.$def('top',function(self,_cmd,obj){
return VN$(self.$i_g('@top_level_objects'),'<<',obj);
});
$VN_2.$def('owner',function(self,_cmd){
return self.$i_g('@owner');
});
$VN_2.$def('menu=',function(self,_cmd,a_menu){
VN$(self, 'will_change_value_for_key', 'menu');
VN$(self, 'did_change_value_for_key', 'menu');
});
