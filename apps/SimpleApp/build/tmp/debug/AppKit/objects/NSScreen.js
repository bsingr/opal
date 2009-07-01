var the_class = objc_allocateClassPair(NSObject, "NSScreen");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "frame", function(self, _cmd) {
with(self) {
return NSMakeRect(0,0,100,100);
}
}, "void");

class_addMethod(the_class, "visibleFrame", function(self, _cmd) {
with(self) {
return NSMakeRect(0,0,100,100);
}
}, "void");

class_addMethod(meta_class, "mainScreen", function(self, _cmd) {
with(self) {
var mainScreen = objc_msgSend(objc_msgSend(NSScreen, "alloc"), "init");
return mainScreen;
}
}, "void");

