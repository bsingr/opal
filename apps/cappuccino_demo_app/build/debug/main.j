@import <Foundation/Foundation.j>
@import <AppKit/AppKit.j>
@import "vienna/vienna.j"
@import "AppController.j"
rb_define_singleton_method(rb_top_self,'main',function(self,_cmd,args,named_args) {
return rb_funcall(self,'CPApplicationMain:',args,named_args);
});
(function(self) {
rb_define_method(self,'mySelector:bob:',function(self,_cmd,wow,something){
rb_funcall(self,'mySelector:bob:',100,92830);
rb_ivar_get(self,'adam');
rb_ivar_get(self,'_adam');
rb_ivar_get(self,'_adamBeynon');
return rb_ivar_get(self,'adamBeynon');
});
rb_define_method(self,'_myReallyLongSelector',function(self,_cmd) {
});
rb_define_method(self,'myMethodToDoSomethingWith:',function(self,_cmd,obj) {
});
rb_define_method(self,'applicationWillFinishLaunching:',function(self,_cmd,notification) {
});
rb_define_method(self,'applicationDidFinishLaunching:',function(self,_cmd,notification) {
return rb_funcall(self,'puts:',"Woop!");
});
})(rb_define_class('AppController',cObject));
