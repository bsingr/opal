var the_class = objc_allocateClassPair(NSObject, "NSValue");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "getValue:", function(self, _cmd, value) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objCType", function(self, _cmd) {
with(self) {
}
}, "void");

