var the_class = objc_allocateClassPair(NSObject, "NSController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "objectDidBeginEditing:", function(self, _cmd, editor) {

}, "void");

class_addMethod(the_class, "objectDidEndEditing:", function(self, _cmd, editor) {

}, "void");

class_addMethod(the_class, "commitEditing", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "commitEditingWithDelegate:didCommitSelector:contentInfo:", function(self, _cmd, delegate, didCommitSelector, contextInfo) {

}, "void");

class_addMethod(the_class, "discardEditing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isEditing", function(self, _cmd) {
return NO;

}, "void");

