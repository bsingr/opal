var NSInvalidArchiveOperationException = "NSInvalidArchiveOperationException";
var NSInvalidUnarchiveOperationException = "NSInvalidUnarchiveOperationException";
var the_class = objc_allocateClassPair(NSCoder, "NSKeyedArchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForWritingWithMutableData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, delegate) {
with(self) {
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setOutputFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "outputFormat", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "finishEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setClassName:forClass:", function(self, _cmd, codedName, cls) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNameForClass:", function(self, _cmd, cls) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeObject:forKey:", function(self, _cmd, objv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeConditionalObject:forKey:", function(self, _cmd, objv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeBool:forKey:", function(self, _cmd, boolv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeInt:forKey:", function(self, _cmd, intv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeInt32:forKey:", function(self, _cmd, intv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeInt64:forKey:", function(self, _cmd, intv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeFloat:forKey:", function(self, _cmd, realv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeDouble:forKey:", function(self, _cmd, realv, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeBytes:length:forKey:", function(self, _cmd, bytesp, lenv, key) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "archivedDataWithRootObject:", function(self, _cmd, rootObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "archiveRootObject:toFile:", function(self, _cmd, rootObject, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "setClassName:forClass:", function(self, _cmd, codedName, cls) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "classNameForClass:", function(self, _cmd, cls) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSCoder, "NSKeyedUnarchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_data", "id");
class_addIvar(the_class, "_rootDict", "NSMutableDictionary");
class_addIvar(the_class, "_contextStack", "NSMutableArray");
class_addIvar(the_class, "_unarchivedObjects", "NSMutableDictionary");

class_addMethod(the_class, "initForReadingWithData:", function(self, _cmd, data) {
with(self) {
self = objc_msgSend(self, "init");
if (self)
{
_data = data;
_rootDict = CFPropertyListCreateFromJSONData(objc_msgSend(_data, "bytes"),0,"");
_contextStack = objc_msgSend(NSMutableArray, "array");
objc_msgSend(_contextStack, "addObject:", _rootDict);
_unarchivedObjects = objc_msgSend(NSMutableDictionary, "dictionary");

}

return self;
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, delegate) {
with(self) {
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "finishDecoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setClass:forClassName:", function(self, _cmd, cls, codedName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classForClassName:", function(self, _cmd, codedName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "containsValueForKey:", function(self, _cmd, key) {
with(self) {
var theContext = objc_msgSend(_contextStack, "lastObject");
if (CFDictionaryContainsKey(theContext,key))
return YES;

return NO;
}
}, "void");

class_addMethod(the_class, "decodeObjectForKey:", function(self, _cmd, key) {
with(self) {
var theContext = objc_msgSend(_contextStack, "lastObject");
if (theContext.isa == NSClassFromString("NSMutableArray"))
{
var array = objc_msgSend(NSMutableArray, "array");
var a = 0;
var e = objc_msgSend(theContext,"objectEnumerator");
while(a = objc_msgSend(e,"nextObject"))
{
objc_msgSend(_contextStack, "addObject:", a);
objc_msgSend(array, "addObject:", objc_msgSend(self, "_decodeObject:", a));
objc_msgSend(_contextStack, "removeLastObject");

}
return array;

}

var theObject = objc_msgSend(theContext, "objectForKey:", key);
return objc_msgSend(self, "_decodeObject:", theObject);
}
}, "void");

class_addMethod(the_class, "_decodeObject:", function(self, _cmd, theObject) {
with(self) {
if (!theObject)
return null;

if (CFDictionaryContainsKey(theObject,"string"))
return objc_msgSend(theObject, "objectForKey:", "string");

if (CFDictionaryContainsKey(theObject,"nil"))
return null;

var theClass = NSClassFromString(objc_msgSend(theObject, "objectForKey:", "class"));
if (!theClass)
{
if (CFDictionaryContainsKey(_unarchivedObjects,objc_msgSend(theObject, "objectForKey:", "id")))
return objc_msgSend(_unarchivedObjects, "objectForKey:", objc_msgSend(theObject, "objectForKey:", "id"));
else
return null;


}

var newObject = objc_msgSend(theClass, "alloc");
if (objc_msgSend(theObject, "objectForKey:", "class") == "NSCustomObject")
{
objc_msgSend(newObject, "init");

}
else
{
objc_msgSend(_contextStack, "addObject:", objc_msgSend(theObject, "objectForKey:", "objects"));
objc_msgSend(newObject, "initWithCoder:", self);
objc_msgSend(_contextStack, "removeLastObject");

}

objc_msgSend(_unarchivedObjects, "setObject:forKey:", newObject, objc_msgSend(theObject, "objectForKey:", "id"));
return objc_msgSend(newObject, "awakeAfterUsingCoder:", self);
}
}, "void");

class_addMethod(the_class, "decodeBoolForKey:", function(self, _cmd, key) {
with(self) {
var theContext = objc_msgSend(_contextStack, "lastObject");
var theObject = objc_msgSend(theContext, "objectForKey:", key);
if (!theObject)
return NO;

return (objc_msgSend(theObject, "objectForKey:", "bool") == "YES") ? YES : NO;
}
}, "void");

class_addMethod(the_class, "decodeIntForKey:", function(self, _cmd, key) {
with(self) {
var theContext = objc_msgSend(_contextStack, "lastObject");
var theObject = objc_msgSend(theContext, "objectForKey:", key);
return parseInt(objc_msgSend(theObject, "objectForKey:", "int"));
}
}, "void");

class_addMethod(the_class, "decodeInt32ForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeInt64ForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeFloatForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeDoubleForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeBytesForKey:returnedLength:", function(self, _cmd, key, lengthp) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithData:", function(self, _cmd, data) {
with(self) {
return objc_msgSend(objc_msgSend(self, "alloc"), "initForReadingWithData:", data);
}
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "setClass:forClassName:", function(self, _cmd, cls, codedName) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "classForClassName:", function(self, _cmd, codedName) {
with(self) {
}
}, "void");

var the_class = NSCoder;
var meta_class = the_class.isa;

class_addMethod(the_class, "encodePoint:forKey:", function(self, _cmd, point, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeSize:forKey:", function(self, _cmd, size, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeRect:forKey:", function(self, _cmd, rect, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodePointForKey:", function(self, _cmd, key) {
with(self) {
var thePoint = objc_msgSend(self, "decodeObjectForKey:", key);
return NSPointFromString(thePoint);
}
}, "void");

class_addMethod(the_class, "decodeSizeForKey:", function(self, _cmd, key) {
with(self) {
var theSize = objc_msgSend(self, "decodeObjectForKey:", key);
return NSSizeFromString(theSize);
}
}, "void");

class_addMethod(the_class, "decodeRectForKey:", function(self, _cmd, key) {
with(self) {
var theRect = objc_msgSend(self, "decodeObjectForKey:", key);
return NSRectFromString(theRect);
}
}, "void");

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "awakeAfterUsingCoder:", function(self, _cmd, aCoder) {
with(self) {
return self;
}
}, "void");

