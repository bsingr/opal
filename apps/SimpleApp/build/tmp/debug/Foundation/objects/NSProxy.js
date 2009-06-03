var the_class = objc_allocateClassPair(NSObject, "NSProxy");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "forwardInvocation:", function(self, _cmd, invocation) {
}, "void");

class_addMethod(the_class, "methodSignatureForSelector:", function(self, _cmd, sel) {
}, "void");

class_addMethod(the_class, "dealloc", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "finalize", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
}, "void");

class_addMethod(meta_class, "class", function(self, _cmd) {
}, "void");

class_addMethod(meta_class, "respondsToSelector:", function(self, _cmd, aSelector) {
}, "void");

