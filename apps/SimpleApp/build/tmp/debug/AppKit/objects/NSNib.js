var the_class = objc_allocateClassPair(NSObject, "NSNib");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_data", "NSData");
class_addIvar(the_class, "_connections", "NSDictionary");
class_addIvar(the_class, "_hierarchy", "NSDictionary");
class_addIvar(the_class, "_objects", "NSDictionary");
class_addIvar(the_class, "_topLevelObjects", "NSArray");

class_addMethod(the_class, "initWithNibNamed:bundle:", function(self, _cmd, nibName, bundle) {
with(self) {
var fullPathURL = "Resources/" + nibName + ".xib";
NSLog("Tryign to open: " + fullPathURL);
_data = objc_msgSend(objc_msgSend(NSData, "alloc"), "initWithContentsOfFile:", fullPathURL);
return self;
}
}, "void");

class_addMethod(the_class, "instantiateNibWithOwner:topLevelObjects:", function(self, _cmd, owner, topLevelObjects) {
with(self) {
var nameTable = objc_msgSend(NSMutableDictionary, "dictionaryWithCapacity:", 2);
_topLevelObjects = topLevelObjects;
return objc_msgSend(self, "instantiateNibWithExternalNameTable:", nameTable);
}
}, "void");

class_addMethod(the_class, "instantiateNibWithExternalNameTable:", function(self, _cmd, externalNameTable) {
with(self) {
return YES;
}
}, "void");

