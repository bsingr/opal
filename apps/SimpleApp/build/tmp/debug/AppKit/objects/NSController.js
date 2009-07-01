var the_class = objc_allocateClassPair(NSObject, "NSController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "objectDidBeginEditing:", function(self, _cmd, editor) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectDidEndEditing:", function(self, _cmd, editor) {
with(self) {
}
}, "void");

class_addMethod(the_class, "commitEditing", function(self, _cmd) {
with(self) {
return NO;
}
}, "void");

class_addMethod(the_class, "commitEditingWithDelegate:didCommitSelector:contentInfo:", function(self, _cmd, delegate, didCommitSelector, contextInfo) {
with(self) {
}
}, "void");

class_addMethod(the_class, "discardEditing", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEditing", function(self, _cmd) {
with(self) {
return NO;
}
}, "void");

