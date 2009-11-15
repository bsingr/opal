(function(self) {
(function(self) {
rb_funcall(self,'attr_reader',ID2SYM('rect'),ID2SYM('options'),ID2SYM('owner'),ID2SYM('user_info'));
rb_define_method(self,'initialize',function(self,_,rect,options,owner,user_info){
self.$i_s('@rect',rect);
self.$i_s('@options',options);
self.$i_s('@owner',owner);
return self.$i_s('@user_info',user_info);
});
self.$def_s('tracking_area_with_rect:options:owner:user_info:',function(self,_,rect,options,owner,user_info){
return rb_funcall(self,'new',rect,options,owner,user_info);
});
})(rb_define_class_under(self,'TrackingArea',cObject));
})(rb_define_module('Vienna'));
