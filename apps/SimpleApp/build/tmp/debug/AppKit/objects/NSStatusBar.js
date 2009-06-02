var the_class = objc_allocateClassPair(NSObject, "NSStatusBar");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

