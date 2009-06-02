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
var fullPathURL = Unhandled output_expression: [+(), nibName (IDENTIFIER), @".xib" (AT_STRING_LITERAL)];
_data = objc_msgSend(objc_msgSend(NSData, "alloc"), "initWithContentsOfFile:", fullPathURL);
return self;

}, "void");

class_addMethod(the_class, "instantiateNibWithOwner:topLevelObjects:", function(self, _cmd, owner, topLevelObjects) {
var nameTable = objc_msgSend(NSMutableDictionary, "dictionaryWithCapacity:", 2);
objc_msgSend(nameTable, "setObject:forKey:", owner, "NSNibOwner");
objc_msgSend(nameTable, "setObject:forKey:", topLevelObjects, "NSTopLevelObjects");
_topLevelObjects = topLevelObjects;
return objc_msgSend(self, "instantiateNibWithExternalNameTable:", nameTable);

}, "void");

class_addMethod(the_class, "instantiateNibWithExternalNameTable:", function(self, _cmd, externalNameTable) {
var unarchiver = objc_msgSend(objc_msgSend(NSKeyedUnarchiver, "alloc"), "initForReadingWithData:", _data);
_data = unarchiver.data;
_objects = objc_msgSend(NSMutableDictionary, "dictionaryWithCapacity:", 0);
_topLevelObjects = objc_msgSend(unarchiver, "decodeObjectForKey:", "IBDocument.RootObjects");
_connections = objc_msgSend(unarchiver, "decodeConnectionObjects");
Unhandled output_statement_list: FOR (FOR)return YES;

}, "void");

