var the_class = objc_allocateClassPair(NSObject, "NSClipView");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_docView", "NSView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_docView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSDocView");
return self;
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frame) {
self = objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithFrame:", frame);
if (self)
{

}

return self;
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, aRect) {
}, "void");

