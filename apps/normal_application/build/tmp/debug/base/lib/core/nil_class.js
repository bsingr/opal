
var rb_cNilClass=cNilClass;rb_define_method(rb_cNilClass,'nil?',function(self,_cmd){return true;});rb_define_method(rb_cNilClass,'to_i',function(self,_cmd){return 0;});rb_define_method(rb_cNilClass,'to_f',function(self,_cmd){return 0.0;});rb_define_method(rb_cNilClass,'to_s',function(self,_cmd){return'nil';});rb_define_method(rb_cNilClass,'to_a',function(self,_cmd){return[];});rb_define_method(rb_cNilClass,'inspect',function(self,_cmd){return nil;});rb_define_method(rb_cNilClass,'&',function(self,_cmd,obj){return false;});rb_define_method(rb_cNilClass,'|',function(self,_cmd,obj){});rb_define_method(rb_cNilClass,'^',function(self,_cmd,obj){});