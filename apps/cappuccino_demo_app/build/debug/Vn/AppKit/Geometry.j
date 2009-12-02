(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('origin'),ID2SYM('size'));
rb_define_singleton_method(self,'new',function(self,_cmd,x,y,w,h,$b) {
return {
      origin:  rb_funcall(rb_const_get_full(self.isa,'CPPoint'),'new',x,y),
      size:    rb_funcall(rb_const_get_full(self.isa,'CPSize'),'new',w,h),
      isa:     rb_const_get_full(self.isa,'CPRect')
    };});
rb_define_method(self, 'x',function(self,_cmd,$b) {
return rb_funcall(rb_ivar_get(self,'origin'),'x');
});
rb_define_method(self, 'y',function(self,_cmd,$b) {
return rb_funcall(rb_ivar_get(self,'origin'),'y');
});
rb_define_method(self, 'width',function(self,_cmd,$b) {
return rb_funcall(rb_ivar_get(self,'size'),'width');
});
rb_define_method(self, 'height',function(self,_cmd,$b) {
return rb_funcall(rb_ivar_get(self,'size'),'height');
});
rb_define_method(self, 'setX:',function(self,_cmd,x,$b) {
return rb_funcall(rb_ivar_get(self,'origin'),'setX:',x);
});
rb_define_method(self, 'setY:',function(self,_cmd,y,$b) {
return rb_funcall(rb_ivar_get(self,'origin'),'setY:',y);
});
rb_define_method(self, 'setWidth:',function(self,_cmd,w,$b) {
return rb_funcall(rb_ivar_get(self,'size'),'setWidth:',w);
});
rb_define_method(self, 'setHeight:',function(self,_cmd,h,$b) {
return rb_funcall(rb_ivar_get(self,'size'),'setHeight:',h);
});
rb_define_method(self, 'contains_point?',function(self,_cmd,point,$b) {
return ANDTEST(function(){return (rb_funcall(rb_funcall(point,'x'),'>',rb_funcall(rb_ivar_get(self,'origin'),'x')));
},function(){return ANDTEST(function(){return (rb_funcall(rb_funcall(point,'y'),'>',rb_funcall(rb_ivar_get(self,'origin'),'y')));
},function(){return ANDTEST(function(){return (rb_funcall(rb_funcall(point,'x'),'<',(rb_funcall(rb_funcall(rb_ivar_get(self,'origin'),'x'),'+',rb_funcall(rb_ivar_get(self,'size'),'width')))));
},function(){return (rb_funcall(rb_funcall(point,'y'),'<',(rb_funcall(rb_funcall(rb_ivar_get(self,'origin'),'y'),'+',rb_funcall(rb_ivar_get(self,'size'),'height')))));
});
});
});
});
rb_define_method(self, 'to_rect',function(self,_cmd,$b) {
return self;
});
})(rb_define_class('CPRect',rb_cObject));
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('x'),ID2SYM('y'));
rb_define_singleton_method(self,'new',function(self,_cmd,x,y,$b) {
return {
      x:    x,
      y:    y,
      isa:  rb_const_get_full(self.isa,'CPPoint')
    };});
rb_define_method(self, 'in_rect?',function(self,_cmd,rect,$b) {
return rb_funcall(rect,'contains_point?',self);
});
})(rb_define_class('CPPoint',rb_cObject));
(function(self) {
rb_funcall(self,'attr_accessor',ID2SYM('width'),ID2SYM('height'));
rb_define_singleton_method(self,'new',function(self,_cmd,w,h,$b) {
return {
      width:  w,
      height: h,
      isa:    rb_const_get_full(self.isa,'CPSize')
    };});
})(rb_define_class('CPSize',rb_cObject));
(function(self) {
rb_define_method(self, 'to_rect',function(self,_cmd,$b) {
return rb_funcall(rb_const_get_full(self.isa,'CPRect'),'new',rb_funcall(self,'[]',0),rb_funcall(self,'[]',1),rb_funcall(self,'[]',2),rb_funcall(self,'[]',3));
});
rb_define_method(self, 'to_point',function(self,_cmd,$b) {
return rb_funcall(rb_const_get_full(self.isa,'CGPoint'),'new',rb_funcall(self,'[]',0),rb_funcall(self,'[]',1));
});
rb_define_method(self, 'to_size',function(self,_cmd,$b) {
return rb_funcall(rb_const_get_full(self.isa,'CGSize'),'new',rb_funcall(self,'[]',0),rb_funcall(self,'[]',1));
});
})(rb_define_class('Array',rb_cObject));
