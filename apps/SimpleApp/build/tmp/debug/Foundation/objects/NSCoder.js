var the_class = objc_allocateClassPair(NSObject, "NSCoder");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "encodeValueOfObjCType:at:", function(self, _cmd, type, addr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeDataObject:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeValueOfObjCType:at:", function(self, _cmd, type, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeDataObject", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "versionForClassName:", function(self, _cmd, className) {
with(self) {
}
}, "void");

