var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'TrackingArea',cObject);
VN$($VN_2,'attr_reader','rect','options','owner','user_info');
$VN_2.$def('initialize',function(self,_cmd,rect,options,owner,user_info){
self.$i_s('@rect',rect);
self.$i_s('@options',options);
self.$i_s('@owner',owner);
return self.$i_s('@user_info',user_info);
});
$VN_2.$def_s('tracking_area_with_rect:options:owner:user_info:',function(self,_cmd,rect,options,owner,user_info){
return VN$(self,'new',rect,options,owner,user_info);
});
