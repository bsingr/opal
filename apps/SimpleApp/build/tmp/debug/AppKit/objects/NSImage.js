var the_class = objc_allocateClassPair(NSObject, "NSImage");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
if ((self = objc_msgSendSuper({super_class:NSObject, receiver:self}, "init")))
{

}

return self;
}
}, "void");

