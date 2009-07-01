var the_class = NSBundle;
var meta_class = the_class.isa;

class_addMethod(the_class, "loadNibFile:externalNameTable:", function(self, _cmd, fileName, context) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "loadNibFile:externalNameTable:", function(self, _cmd, fileName, context) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "loadNibNamed:owner:", function(self, _cmd, nibName, owner) {
with(self) {
NSLog("loading nib...");
var theBundle = objc_msgSend(NSBundle, "mainBundle");
var theNib = objc_msgSend(objc_msgSend(NSNib, "alloc"), "initWithNibNamed:bundle:", nibName, theBundle);
return objc_msgSend(theNib, "instantiateNibWithOwner:topLevelObjects:", owner, objc_msgSend(NSMutableArray, "array"));
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSCustomObject");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

