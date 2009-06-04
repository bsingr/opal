var the_class = objc_allocateClassPair(NSObject, "AppController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "init");
if (self)
{
var myWindow = objc_msgSend(objc_msgSend(NSWindow, "alloc"), "initWithContentRect:styleMask:backing:defer:", NSMakeRect(100,100,100,100), 10, null, false);

}

return self;
}
}, "void");

