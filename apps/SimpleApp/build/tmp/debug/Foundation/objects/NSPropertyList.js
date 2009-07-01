var the_class = objc_allocateClassPair(NSObject, "NSPropertyListSerialization");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(meta_class, "propertyList:isValidForFormat:", function(self, _cmd, plist, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataFromPropertyList:format:errorDescription:", function(self, _cmd, plist, format, errorString) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "propertyListFromData:mutabilityOption:format:errorDescription:", function(self, _cmd, data, opt, format, errorString) {
with(self) {
}
}, "void");

