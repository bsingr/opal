var the_class = objc_allocateClassPair(NSObject, "NSCustomView");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "theView", "NSView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
var className = objc_msgSend(aCoder, "decodeObjectForKey:", "NSClassName");
var theClass = NSClassFromString(className);
NSLog("Allocing custom class:" + className);
theView = objc_msgSend(objc_msgSend(theClass, "alloc"), "initWithFrame:", objc_msgSend(aCoder, "decodeRectForKey:", "NSFrame"));
return theView;
}
}, "void");

class_addMethod(the_class, "awakeAfterUsingCoder:", function(self, _cmd, aCoder) {
with(self) {
return theView;
}
}, "void");

