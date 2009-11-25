@import <Foundation>
@import <AppKit>
@import <ViennaVienna>
@import <AppController>
rb_define_singleton_method(rb_top_self,'main',function(self,_cmd,args,named_args) {
return rb_funcall(self,'CPApplicationMain',args,named_args);
});
