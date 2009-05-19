var the_class = objc_allocateClassPair(NSObject, "AppController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);

class_addMethod(the_class, "method:", function(self, _cmd, anArgument) {
return 234567;

}, "void");

