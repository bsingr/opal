var the_class = objc_allocateClassPair(null, "NSObject");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "dealloc", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "finalize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "copy", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "mutableCopy", function(self, _cmd) {
with(self) {
return objc_msgSend(self, "copy");
}
}, "void");

class_addMethod(the_class, "methodForSelector:", function(self, _cmd, aSelector) {
with(self) {
return class_getMethodImplementation(self,aSelector);
}
}, "void");

class_addMethod(the_class, "doesNotRecognizeSelector:", function(self, _cmd, aSelector) {
with(self) {
}
}, "void");

class_addMethod(the_class, "forwardInvocation:", function(self, _cmd, anInvocation) {
with(self) {
}
}, "void");

class_addMethod(the_class, "methodSignatureForSelector:", function(self, _cmd, aSelector) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqual:", function(self, _cmd, object) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hash", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "self", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "performSelector:", function(self, _cmd, aSelector) {
with(self) {
return objc_msgSend(self,aSelector);
}
}, "void");

class_addMethod(the_class, "performSelector:withObject:", function(self, _cmd, aSelector, object) {
with(self) {
return objc_msgSend(self,aSelector,object);
}
}, "void");

class_addMethod(the_class, "performSelector:withObject:withObject:", function(self, _cmd, aSelector, object1, object2) {
with(self) {
return objc_msgSend(self,aSelector,object1,object2);
}
}, "void");

class_addMethod(the_class, "isProxy", function(self, _cmd) {
with(self) {
return NO;
}
}, "void");

class_addMethod(the_class, "isKindOfClass:", function(self, _cmd, aClass) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isMemberOfClass:", function(self, _cmd, aClass) {
with(self) {
}
}, "void");

class_addMethod(the_class, "conformsToProtocol:", function(self, _cmd, aProtocol) {
with(self) {
return class_conformsToProtocol(self,aProtocol);
}
}, "void");

class_addMethod(the_class, "respondsToSelector:", function(self, _cmd, aSelector) {
with(self) {
return class_respondsToSelector(self.isa,aSelector);
}
}, "void");

class_addMethod(the_class, "retain", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "release", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "autorelease", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "retainCount", function(self, _cmd) {
with(self) {
return 1;
}
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
return "NSObject class description";
}
}, "void");

class_addMethod(meta_class, "load", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "initialize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "new", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(self, "alloc"), "init");
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
return class_createInstance(self);
}
}, "void");

class_addMethod(meta_class, "superclass", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "class", function(self, _cmd) {
with(self) {
return isa;
}
}, "void");

class_addMethod(meta_class, "instancesRespondToSelector:", function(self, _cmd, aSelector) {
with(self) {
return class_respondToSelector(self,aSelector);
}
}, "void");

class_addMethod(meta_class, "conformsToProtocol:", function(self, _cmd, protocol) {
with(self) {
return class_conformsToProtocol(self,protocol);
}
}, "void");

class_addMethod(meta_class, "instanceMethodForSelector:", function(self, _cmd, aSelector) {
with(self) {
return class_getInstanceMethod(self,aSelector);
}
}, "void");

class_addMethod(meta_class, "instanceMethodSignatureForSelector:", function(self, _cmd, aSelector) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "isSubclassOfClass:", function(self, _cmd, aClass) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resolveClassMethod:", function(self, _cmd, sel) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resolveInstanceMethod:", function(self, _cmd, sel) {
with(self) {
}
}, "void");

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
return self;
}
}, "void");

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

var NSInconsistentArchiveException = "NSInconsistentArchiveException";
var the_class = objc_allocateClassPair(NSCoder, "NSArchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForWritingWithMutableData:", function(self, _cmd, mdata) {
with(self) {
}
}, "void");

class_addMethod(the_class, "archiverData", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeRootObject:", function(self, _cmd, rootObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeConditionalObject:", function(self, _cmd, object) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeClassName:intoClassName:", function(self, _cmd, trueName, inArchiveName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNameEncodedForTrueClassName:", function(self, _cmd, trueName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {
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

var the_class = objc_allocateClassPair(NSCoder, "NSUnarchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForReadingWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isAtEnd", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSArray");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "count", function(self, _cmd) {
with(self) {
return CFArrayGetCount(self);
}
}, "void");

class_addMethod(the_class, "objectAtIndex:", function(self, _cmd, index) {
with(self) {
return CFArrayGetValueAtIndex(self,index);
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
return CFArrayCreateMutable(1);
}
}, "void");

var the_class = NSArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "arrayByAddingObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "arrayByAddingObjectsFromArray:", function(self, _cmd, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "componentsJoinedByString:", function(self, _cmd, separator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "containsObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "descriptionWithLocale:", function(self, _cmd, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "descriptionWithLocale:indent:", function(self, _cmd, locale, level) {
with(self) {
}
}, "void");

class_addMethod(the_class, "firstObjectCommonWithArray:", function(self, _cmd, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getObjects:", function(self, _cmd, objects) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getObjects:range:", function(self, _cmd, objects, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "indexOfObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "indexOfObject:inRange:", function(self, _cmd, anObject, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "indexOfObjectIdenticalTo:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "indexOfObjectIdenticalTo:inRange:", function(self, _cmd, anObject, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToArray:", function(self, _cmd, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lastObject", function(self, _cmd) {
with(self) {
return objc_msgSend(self, "objectAtIndex:", objc_msgSend(self, "count") - 1);
}
}, "void");

class_addMethod(the_class, "objectEnumerator", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(NSEnumerator, "alloc"), "initWithArray:", objc_msgSend(NSMutableArray, "arrayWithArray:", self));
}
}, "void");

class_addMethod(the_class, "reverseObjectEnumerator", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sortedArrayHint", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sortedArrayUsingFunction:context:", function(self, _cmd, comparator, context) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sortedArrayUsingFunction:context:hint:", function(self, _cmd, comparator, context, hint) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sortedArrayUsingSelector:", function(self, _cmd, comparator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "subarrayWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:atomically:", function(self, _cmd, path, useAuxiliaryFile) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:atomically:", function(self, _cmd, url, atomically) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeObjectsPerformSelector:", function(self, _cmd, aSelector) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeObjectsPerformSelector:withObject:", function(self, _cmd, aSelector, argument) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectsAtIndexes:", function(self, _cmd, indexes) {
with(self) {
}
}, "void");

var the_class = NSArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithObjects:count:", function(self, _cmd, objects, cnt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithObjects:", function(self, _cmd, firstObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithArray:", function(self, _cmd, array) {
with(self) {
return CFArrayCreateCopy(array);
}
}, "void");

class_addMethod(the_class, "initWithArray:copyItems:", function(self, _cmd, array, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
var newObjects = objc_msgSend(aCoder, "decodeObjectForKey:", "NS.objects");
var a = 0;
var e = objc_msgSend(newObjects,"objectEnumerator");
while(a = objc_msgSend(e,"nextObject"))
{
objc_msgSend(self, "addObject:", a);

}
return self;
}
}, "void");

class_addMethod(meta_class, "array", function(self, _cmd) {
with(self) {
return CFArrayCreateMutable();
}
}, "void");

class_addMethod(meta_class, "arrayWithObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "arrayWithObjects:count:", function(self, _cmd, objects, cnt) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "arrayWithObjects:", function(self, _cmd, firstObj) {
with(self) {
NSLog("Array with objects...");
}
}, "void");

class_addMethod(meta_class, "arrayWithArray:", function(self, _cmd, array) {
with(self) {
return CFArrayCreateCopy(array);
}
}, "void");

class_addMethod(meta_class, "arrayWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "arrayWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSArray, "NSMutableArray");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "addObject:", function(self, _cmd, anObject) {
with(self) {
CFArrayAppendValue(self,anObject);
}
}, "void");

class_addMethod(the_class, "insertObject:atIndex:", function(self, _cmd, anObject, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeLastObject", function(self, _cmd) {
with(self) {
CFArrayRemoveValueAtIndex(self,objc_msgSend(self, "count") - 1);
}
}, "void");

class_addMethod(the_class, "removeObjectAtIndex:", function(self, _cmd, index) {
with(self) {
CFArrayRemoveValueAtIndex(self,index);
}
}, "void");

class_addMethod(the_class, "replaceObjectAtIndex:withObject:", function(self, _cmd, index, anObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
return CFArrayCreateMutable(1);
}
}, "void");

Array.prototype.isa = NSMutableArray;
var the_class = NSMutableArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "addObjectsFromArray:", function(self, _cmd, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "exchangeObjectAtIndex:withObjectAtIndex:", function(self, _cmd, idx1, idx2) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeAllObjects", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObject:inRange:", function(self, _cmd, anObject, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectIdenticalTo:inRange:", function(self, _cmd, anObject, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectIdenticalTo:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectsFromIndices:numIndices:", function(self, _cmd, indices, cnt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectsInArray:", function(self, _cmd, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectsInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObjectsInRange:withObjectsFromArray:range:", function(self, _cmd, range, otherArray, otherRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObjectsInRange:withObjectsFromArray:", function(self, _cmd, range, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setArray:", function(self, _cmd, otherArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sortUsingFunction:context:", function(self, _cmd, compare, context) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sortUsingSelector:", function(self, _cmd, comparator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "insertObjects:atIndexes:", function(self, _cmd, objects, indexes) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectsAtIndexes:", function(self, _cmd, indexes) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObjectsAtIndexes:withObjects:", function(self, _cmd, indexes, objects) {
with(self) {
}
}, "void");

var the_class = NSMutableArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, numItems) {
with(self) {
return self;
}
}, "void");

class_addMethod(meta_class, "arrayWithCapacity:", function(self, _cmd, numItems) {
with(self) {
return objc_msgSend(objc_msgSend(self, "alloc"), "initWithCapacity:", numItems);
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSBundle");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initWithPath:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "load", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isLoaded", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "unload", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "preflightAndReturnError:", function(self, _cmd, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "loadAndReturnError:", function(self, _cmd, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bundlePath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resourcePath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "executablePath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "privateFrameworksPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sharedFrameworksPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sharedSupportPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "builtInPlugInsPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bundleIdentifier", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNamed:", function(self, _cmd, className) {
with(self) {
}
}, "void");

class_addMethod(the_class, "principalClass", function(self, _cmd) {
with(self) {
return NSApplication;
}
}, "void");

class_addMethod(the_class, "pathForResource:ofType:", function(self, _cmd, name, ext) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathForResource:ofType:inDirectory:", function(self, _cmd, name, ext, subpath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathForResource:ofType:inDirectory:forLocalization:", function(self, _cmd, name, ext, subpath, localizationName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathsForResourcesOfType:inDirectory:", function(self, _cmd, ext, subpath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathsForResourcesOfType:inDirectory:forLocalization:", function(self, _cmd, ext, subpath, localizationName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedStringForKey:value:table:", function(self, _cmd, key, value, tableName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "infoDictionary", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedInfoDictionary", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectForInfoDictionaryKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizations", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "preferredLocalizations", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "developmentLocalization", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "mainBundle", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(NSBundle, "alloc"), "init");
}
}, "void");

class_addMethod(meta_class, "bundleWithPath:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "bundleForClass:", function(self, _cmd, aClass) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "bundleWithIdentifier:", function(self, _cmd, identifier) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "allBundles", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "allFrameworks", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "pathForResource:ofType:inDirectory:", function(self, _cmd, name, ext, bundlePath) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "pathsForResourcesOfType:inDirectory:", function(self, _cmd, ext, bundlePath) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "preferredLocalizationsFromArray:", function(self, _cmd, localizationsArray) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "preferredLocalizationsFromArray:forPreferences:", function(self, _cmd, localizationsArray, preferencesArray) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSData");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "length", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bytes", function(self, _cmd) {
with(self) {
return _bytes;
}
}, "void");

CFDataRef.prototype.isa = NSData;
var the_class = NSData;
var meta_class = the_class.isa;

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:", function(self, _cmd, buffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:length:", function(self, _cmd, buffer, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:range:", function(self, _cmd, buffer, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToData:", function(self, _cmd, other) {
with(self) {
}
}, "void");

class_addMethod(the_class, "subdataWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:atomically:", function(self, _cmd, path, useAuxiliaryFile) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:atomically:", function(self, _cmd, url, atomically) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:options:error:", function(self, _cmd, path, writeOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:options:error:", function(self, _cmd, url, writeOptionsMask, errorPtr) {
with(self) {
}
}, "void");

var the_class = NSData;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithBytes:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytesNoCopy:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytesNoCopy:length:freeWhenDone:", function(self, _cmd, bytes, length, b) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:options:error:", function(self, _cmd, path, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:options:error:", function(self, _cmd, url, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:didLoadBlock:", function(self, _cmd, url, block) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfMappedFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "data", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithBytes:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithBytesNoCopy:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithBytesNoCopy:length:freeWhenDone:", function(self, _cmd, bytes, length, b) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfFile:options:error:", function(self, _cmd, path, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfURL:options:error:", function(self, _cmd, url, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfURL:didLoadBlock:", function(self, _cmd, url, block) {
with(self) {
return CFDataCreateFromURL(url,block);
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfMappedFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSData, "NSMutableData");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "mutableBytes", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLength:", function(self, _cmd, length) {
with(self) {
}
}, "void");

var the_class = NSMutableData;
var meta_class = the_class.isa;

class_addMethod(the_class, "appendBytes:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendData:", function(self, _cmd, other) {
with(self) {
}
}, "void");

class_addMethod(the_class, "increaseLengthBy:", function(self, _cmd, extraLength) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceBytesInRange:withBytes:", function(self, _cmd, range, bytes) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resetBytesInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceBytesInRange:withBytes:length:", function(self, _cmd, range, replacementBytes, replacementLength) {
with(self) {
}
}, "void");

var the_class = NSMutableData;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, capacity) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithLength:", function(self, _cmd, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithCapacity:", function(self, _cmd, aNumItems) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithLength:", function(self, _cmd, length) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSDictionary");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
return self;
}
}, "void");

class_addMethod(the_class, "count", function(self, _cmd) {
with(self) {
return CFDictionaryGetCount(self);
}
}, "void");

class_addMethod(the_class, "objectForKey:", function(self, _cmd, aKey) {
with(self) {
return CFDictionaryGetValue(self,aKey);
}
}, "void");

class_addMethod(the_class, "keyEnumerator", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
return CFDictionaryCreateMutable();
}
}, "void");

CFDictionaryRef.prototype.isa = NSDictionary;
var the_class = NSDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "allKeys", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allKeysForObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allValues", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "descriptionInStringsFileFormat", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "descriptionWithLocale:", function(self, _cmd, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "descriptionWithLocale:indent:", function(self, _cmd, locale, level) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToDictionary:", function(self, _cmd, otherDictionary) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectEnumerator", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectsForKeys:notFoundMarker:", function(self, _cmd, keys, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:atomically:", function(self, _cmd, path, useAuxiliaryFile) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:atomically:", function(self, _cmd, url, atomically) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keysSortedByValueUsingSelector:", function(self, _cmd, comparator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getObjects:andKeys:", function(self, _cmd, objects, keys) {
with(self) {
}
}, "void");

var the_class = NSDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithObjects:forKeys:count:", function(self, _cmd, objects, keys, cnt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithObjectsAndKeys:", function(self, _cmd, firstObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithDictionary:", function(self, _cmd, otherDictionary) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithDictionary:copyItems:", function(self, _cmd, otherDictionary, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithObjects:forKeys:", function(self, _cmd, objects, keys) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dictionary", function(self, _cmd) {
with(self) {
return objc_msgSend(self, "alloc");
}
}, "void");

class_addMethod(meta_class, "dictionaryWithObject:forKey:", function(self, _cmd, object, key) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dictionaryWithObjects:forKeys:count:", function(self, _cmd, objects, keys, cnt) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dictionaryWithObjectsAndKeys:", function(self, _cmd, firstObject) {
with(self) {
var the_dict = objc_msgSend(self, "alloc");
var eachKey = 0;
var eachObject = 0;
var argumentList = {all:arguments, trailing:[]};
if (firstObject)
{
va_start(argumentList,_cmd);
while(eachObject = va_arg(argumentList,YES)){
eachKey = va_arg(argumentList,YES);
CFDictionarySetValue(the_dict,eachKey,eachObject);

}

va_end(argumentList);

}

return the_dict;
}
}, "void");

class_addMethod(meta_class, "dictionaryWithDictionary:", function(self, _cmd, dict) {
with(self) {
return CFDictionaryCreateMutableCopy(dict);
}
}, "void");

class_addMethod(meta_class, "dictionaryWithObjects:forKeys:", function(self, _cmd, objects, keys) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dictionaryWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dictionaryWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSDictionary, "NSMutableDictionary");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "removeObjectForKey:", function(self, _cmd, aKey) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setObject:forKey:", function(self, _cmd, anObject, aKey) {
with(self) {
CFDictionarySetValue(self,aKey,anObject);
}
}, "void");

CFMutableDictionaryRef.prototype.isa = NSMutableDictionary;
var the_class = NSMutableDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "addEntriesFromDictionary:", function(self, _cmd, otherDictionary) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeAllObjects", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectsForKeys:", function(self, _cmd, keyArray) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDictionary:", function(self, _cmd, otherDictionary) {
with(self) {
}
}, "void");

var the_class = NSMutableDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, numItems) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dictionaryWithCapacity:", function(self, _cmd, numItems) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSEnumerator");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_array", "NSArray");
class_addIvar(the_class, "_currentIndex", "NSUInteger");

class_addMethod(the_class, "initWithArray:", function(self, _cmd, array) {
with(self) {
_array = array;
_currentIndex = 0;
return self;
}
}, "void");

class_addMethod(the_class, "nextObject", function(self, _cmd) {
with(self) {
_currentIndex += 1;
return objc_msgSend(_array, "objectAtIndex:", _currentIndex - 1);
}
}, "void");

var the_class = NSEnumerator;
var meta_class = the_class.isa;

class_addMethod(the_class, "allObjects", function(self, _cmd) {
with(self) {
return _array;
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSException");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initWithName:reason:userInfo:", function(self, _cmd, aName, aReason, aUserInfo) {
with(self) {
_name = aName;
_reason = aReason;
_userInfo = aUserInfo;
return self;
}
}, "void");

class_addMethod(the_class, "name", function(self, _cmd) {
with(self) {
return _name;
}
}, "void");

class_addMethod(the_class, "reason", function(self, _cmd) {
with(self) {
return _reason;
}
}, "void");

class_addMethod(the_class, "userInfo", function(self, _cmd) {
with(self) {
return _userInfo;
}
}, "void");

class_addMethod(the_class, "raise", function(self, _cmd) {
with(self) {
objc_exception_throw(self);
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
return objc_exception_create();
}
}, "void");

class_addMethod(meta_class, "exceptionWithName:reason:userInfo:", function(self, _cmd, name, reason, userInfo) {
with(self) {
return objc_msgSend(objc_msgSend(self, "alloc"), "initWithName:reason:userInfo:", name, reason, userInfo);
}
}, "void");

objc_exception.prototype.isa = NSException;
var the_class = NSException;
var meta_class = the_class.isa;

class_addMethod(meta_class, "raise:format:", function(self, _cmd, name, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "raise:format:arguments:", function(self, _cmd, name, format, argList) {
with(self) {
}
}, "void");

function NSMakePoint(x,y)
{
var p = {x:0,y:0,};
p.x = x;
p.y = y;
return p;
}
function NSMakeSize(w,h)
{
var s = {width:0,height:0,};
s.width = w;
s.height = h;
return s;
}
function NSMakeRect(x,y,w,h)
{
var r = {origin:{x:0,y:0,},size:{width:0,height:0,},};
r.origin.x = x;
r.origin.y = y;
r.size.width = w;
r.size.height = h;
return r;
}
function NSMaxX(aRect)
{
}
function NSMaxY(aRect)
{
}
function NSMidX(aRect)
{
}
function NSMidY(aRect)
{
}
function NSMinX(aRect)
{
}
function NSMinY(aRect)
{
}
function NSWidth(aRect)
{
}
function NSHeight(aRect)
{
}
function NSRectFromCGRect(cgrect)
{
}
function NSRectToCGRect(nsrect)
{
}
function NSPointFromCGPoint(cgpoint)
{
}
function NSPointToCGPoint(nspoint)
{
}
function NSSizeFromCGSize(cgsize)
{
}
function NSSizeToCGSize(nssize)
{
}
function NSEqualPoints(aPoint,bPoint)
{
}
function NSEqualSizes(aSize,bSize)
{
}
function NSEqualRects(aRect,bRect)
{
}
function NSIsEmptyRect(aRect)
{
}
function NSInsetRect(aRect,dX,dY)
{
}
function NSIntegralRect(aRect)
{
}
function NSUnionRect(aRect,bRect)
{
}
function NSIntersectionRect(aRect,bRect)
{
}
function NSOffsetRect(aRect,dX,dY)
{
}
function NSDivideRect(inRect,slice,rem,amount,edge)
{
}
function NSPointInRect(aPoint,aRect)
{
return CGRectContainsPoint(aRect,aPoint);
}
function NSMouseInRect(aPoint,aRect,flipped)
{
}
function NSContainsRect(aRect,bRect)
{
}
function NSIntersectsRect(aRect,bRect)
{
}
function d()
{
}
function d()
{
}
function d()
{
}
function NSPointFromString(aString)
{
if (!aString)
return NSMakePoint(0,0);

return CGPointFromString(aString);
}
function NSSizeFromString(aString)
{
if (!aString)
return NSMakeSize(0,0);

return CGSizeFromString(aString);
}
function NSRectFromString(aString)
{
if (!aString)
return NSMakeRect(0,0,0,0);

return CGRectFromString(aString);
}
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
objc_msgSend(_unarchivedObjects, "setObject:forKey:", newObject, objc_msgSend(theObject, "objectForKey:", "id"));
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

newObject = objc_msgSend(newObject, "awakeAfterUsingCoder:", self);
objc_msgSend(_unarchivedObjects, "setObject:forKey:", newObject, objc_msgSend(theObject, "objectForKey:", "id"));
return newObject;
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
var theContext = objc_msgSend(_contextStack, "lastObject");
var theObject = objc_msgSend(theContext, "objectForKey:", key);
return parseFloat(objc_msgSend(theObject, "objectForKey:", "float"));
}
}, "void");

class_addMethod(the_class, "decodeDoubleForKey:", function(self, _cmd, key) {
with(self) {
var theContext = objc_msgSend(_contextStack, "lastObject");
var theObject = objc_msgSend(theContext, "objectForKey:", key);
return parseFloat(objc_msgSend(theObject, "objectForKey:", "double"));
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

var NSUndefinedKeyException = "NSUndefinedKeyException";
var NSAverageKeyValueOperator = "NSAverageKeyValueOperator";
var NSCountKeyValueOperator = "NSCountKeyValueOperator";
var NSDistinctUnionOfArraysKeyValueOperator = "NSDistinctUnionOfArraysKeyValueOperator";
var NSDistinctUnionOfObjectsKeyValueOperator = "NSDistinctUnionOfObjectsKeyValueOperator";
var NSDistinctUnionOfSetsKeyValueOperator = "NSDistinctUnionOfSetsKeyValueOperator";
var NSMaximumKeyValueOperator = "NSMaximumKeyValueOperator";
var NSMinimumKeyValueOperator = "NSMinimumKeyValueOperator";
var NSSumKeyValueOperator = "NSSumKeyValueOperator";
var NSUnionOfArraysKeyValueOperator = "NSUnionOfArraysKeyValueOperator";
var NSUnionOfObjectsKeyValueOperator = "NSUnionOfObjectsKeyValueOperator";
var NSUnionOfSetsKeyValueOperator = "NSUnionOfSetsKeyValueOperator";
var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "valueForKey:", function(self, _cmd, key) {
with(self) {
var accessorName = objc_msgSend("get", "stringByAppendingString:", objc_msgSend(key, "capitalizedString"));
if (objc_msgSend(self, "respondsToSelector:", NSSelectorFromString(accessorName)))
return objc_msgSend(self, "performSelector:", NSSelectorFromString(accessorName));

accessorName = key;
if (objc_msgSend(self, "respondsToSelector:", NSSelectorFromString(accessorName)))
return objc_msgSend(self, "performSelector:", NSSelectorFromString(accessorName));

accessorName = objc_msgSend("is", "stringByAppendingString:", objc_msgSend(key, "capitalizedString"));
if (objc_msgSend(self, "respondsToSelector:", NSSelectorFromString(accessorName)))
return objc_msgSend(self, "performSelector:", NSSelectorFromString(accessorName));

if (objc_msgSend(self.isa, "accessInstanceVariablesDirectly"))
{
var theIvar = 0;
accessorName = objc_msgSend("_", "stringByAppendingString:", key);
if (theIvar = object_getInstanceVariable(self,accessorName))
return theIvar;

accessorName = objc_msgSend("_", "stringByAppendingString:", objc_msgSend("is", "stringByAppendingString:", objc_msgSend(key, "capitalizedString")));
if (theIvar = object_getInstanceVariable(self,accessorName))
return theIvar;

accessorName = key;
if (theIvar = object_getInstanceVariable(self,accessorName))
return theIvar;

accessorName = objc_msgSend("is", "stringByAppendingString:", objc_msgSend(key, "capitalizedString"));
if (theIvar = object_getInstanceVariable(self,accessorName))
return theIvar;


}

return objc_msgSend(self, "valueForUndefinedKey:", key);
}
}, "void");

class_addMethod(the_class, "setValue:forKey:", function(self, _cmd, value, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "validateValue:forKey:error:", function(self, _cmd, ioValue, inKey, outError) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mutableArrayValueForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "valueForKeyPath:", function(self, _cmd, keyPath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setValue:forKeyPath:", function(self, _cmd, value, keyPath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "validateValue:forKeyPath:error:", function(self, _cmd, ioValue, inKeyPath, outError) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mutableArrayValueForKeyPath:", function(self, _cmd, keyPath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "valueForUndefinedKey:", function(self, _cmd, key) {
with(self) {
objc_msgSend(objc_msgSend(NSException, "exceptionWithName:reason:userInfo:", NSUndefinedKeyException, objc_msgSend("Undefined key was requested from object: ", "stringByAppendingString:", key), null), "raise");
return null;
}
}, "void");

class_addMethod(the_class, "setValue:forUndefinedKey:", function(self, _cmd, value, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNilValueForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "dictionaryWithValuesForKeys:", function(self, _cmd, keys) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setValuesForKeysWithDictionary:", function(self, _cmd, keyedValues) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "accessInstanceVariablesDirectly", function(self, _cmd) {
with(self) {
return YES;
}
}, "void");

var the_class = NSArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "valueForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setValue:forKey:", function(self, _cmd, value, key) {
with(self) {
}
}, "void");

var the_class = NSDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "valueForKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

var the_class = NSMutableDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "setValue:forKey:", function(self, _cmd, value, key) {
with(self) {
}
}, "void");

var NSKeyValueChangeKindKey = "NSKeyValueChangeKindKey";
var NSKeyValueChangeNewKey = "NSKeyValueChangeNewKey";
var NSKeyValueChangeOldKey = "NSKeyValueChangeOldKey";
var NSKeyValueChangeIndexesKey = "NSKeyValueChangeIndexesKey";
var NSKeyValueChangeNotificationIsPriorKey = "NSKeyValueChangeNotificationIsPriorKey";
var NSNotificationCenterDefault = null;
var the_class = objc_allocateClassPair(NSObject, "NSNotification");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "name", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "object", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "userInfo", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSNotification;
var meta_class = the_class.isa;

class_addMethod(meta_class, "notificationWithName:object:", function(self, _cmd, aName, anObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "notificationWithName:object:userInfo:", function(self, _cmd, aName, anObject, aUserInfo) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSNotificationCenter");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "addObserver:selector:name:object:", function(self, _cmd, observer, aSelector, aName, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "postNotification:", function(self, _cmd, notification) {
with(self) {
}
}, "void");

class_addMethod(the_class, "postNotificationName:object:", function(self, _cmd, aName, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "postNotificationName:object:userInfo:", function(self, _cmd, aName, anObject, aUserInfo) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObserver:", function(self, _cmd, observer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObserver:name:object:", function(self, _cmd, observer, aName, anObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "defaultCenter", function(self, _cmd) {
with(self) {
}
}, "void");

function d()
{
return aSelector;
}
function NSSelectorFromString(aSelectorName)
{
return aSelectorName;
}
function NSLog(format)
{
printf(format);
}
function NSClassFromString(aClassName)
{
return objc_getClass(aClassName);
}
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

var the_class = objc_allocateClassPair(NSObject, "NSProxy");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "forwardInvocation:", function(self, _cmd, invocation) {
with(self) {
}
}, "void");

class_addMethod(the_class, "methodSignatureForSelector:", function(self, _cmd, sel) {
with(self) {
}
}, "void");

class_addMethod(the_class, "dealloc", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "finalize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "class", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "respondsToSelector:", function(self, _cmd, aSelector) {
with(self) {
}
}, "void");

function NSMakeRange(loc,len)
{
var r = {location:0,length:0,};
r.location = loc;
r.length = len;
return r;
}
function NSMaxRange(range)
{
return (range.location + range.length);
}
function NSLocationInRange(loc,range)
{
return (loc - range.location < range.length);
}
function NSEqualRanges(range1,range2)
{
return (range1.location == range2.location && range1.length == range2.length);
}
function NSUnionRange(range1,range2)
{
}
function NSIntersectionRange(range1,range2)
{
}
function d()
{
}
function NSRangeFromString(aString)
{
}
var the_class = NSValue;
var meta_class = the_class.isa;

class_addMethod(the_class, "rangeValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "valueWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSString");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "length", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "characterAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

String.prototype.isa = NSString;
var the_class = NSString;
var meta_class = the_class.isa;

class_addMethod(the_class, "getCharacters:", function(self, _cmd, buffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getCharacters:range:", function(self, _cmd, buffer, aRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substringFromIndex:", function(self, _cmd, from) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substringToIndex:", function(self, _cmd, to) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substringWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:options:", function(self, _cmd, string, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:options:range:", function(self, _cmd, string, mask, compareRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:options:range:locale:", function(self, _cmd, string, mask, compareRange, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "caseInsensitiveCompare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedCompare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedCaseInsensitiveCompare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasPrefix:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasSuffix:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:options:", function(self, _cmd, aString, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:options:range:", function(self, _cmd, aString, mask, searchRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:options:range:locale:", function(self, _cmd, aString, mask, searchRange, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfCharacterFromSet:", function(self, _cmd, aSet) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfCharacterFromSet:options:", function(self, _cmd, aSet, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfCharacterFromSet:options:range:", function(self, _cmd, aSet, mask, searchRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfComposedCharacterSequenceAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfComposedCharacterSequencesForRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByAppendingString:", function(self, _cmd, aString) {
with(self) {
return CFStringByAppendingStrings(self,aString);
}
}, "void");

class_addMethod(the_class, "stringByAppendingFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "longLongValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "boolValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "componentsSeparatedByString:", function(self, _cmd, separator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "componentsSeparatedByCharactersInSet:", function(self, _cmd, separator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "commonPrefixWithString:options:", function(self, _cmd, aString, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "uppercaseString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lowercaseString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "capitalizedString", function(self, _cmd) {
with(self) {
return CFStringCapitalize(self,null);
}
}, "void");

class_addMethod(the_class, "stringByTrimmingCharactersInSet:", function(self, _cmd, set) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByPaddingToLength:withString:startingAtIndex:", function(self, _cmd, newLength, padString, padIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getLineStart:end:contentsEnd:forRange:", function(self, _cmd, startPtr, lineEndPtr, contentsEndPtr, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineRangeForRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getParagraphStart:end:contentsEnd:forRange:", function(self, _cmd, startPtr, parEndPtr, contentsEndPtr, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "paragraphRangeForRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hash", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "fastestEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "smallestEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "dataUsingEncoding:allowLossyConversion:", function(self, _cmd, encoding, lossy) {
with(self) {
}
}, "void");

class_addMethod(the_class, "dataUsingEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "canBeConvertedToEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cStringUsingEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getCString:maxLength:encoding:", function(self, _cmd, buffer, maxBufferCount, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:maxLength:usedLength:encoding:options:range:remainingRange:", function(self, _cmd, buffer, maxBufferCount, usedBufferCount, encoding, options, range, leftover) {
with(self) {
}
}, "void");

class_addMethod(the_class, "maximumLengthOfBytesUsingEncoding:", function(self, _cmd, enc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lengthOfBytesUsingEncoding:", function(self, _cmd, enc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decomposedStringWithCanonicalMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "precomposedStringWithCanonicalMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decomposedStringWithCompatibilityMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "precomposedStringWithCompatibilityMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByFoldingWithOptions:locale:", function(self, _cmd, options, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByReplacingOccurrencesOfString:withString:options:range:", function(self, _cmd, target, replacement, options, searchRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByReplacingOccurrencesOfString:withString:", function(self, _cmd, target, replacement) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByReplacingCharactersInRange:withString:", function(self, _cmd, range, replacement) {
with(self) {
}
}, "void");

class_addMethod(the_class, "UTF8String", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCharactersNoCopy:length:freeWhenDone:", function(self, _cmd, characters, length, freeBuffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCharacters:length:", function(self, _cmd, characters, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithUTF8String:", function(self, _cmd, nullTerminatedCString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:arguments:", function(self, _cmd, format, argList) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:locale:", function(self, _cmd, format, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:locale:arguments:", function(self, _cmd, format, locale, argList) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithData:encoding:", function(self, _cmd, data, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytes:length:encoding:", function(self, _cmd, bytes, len, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytesNoCopy:length:encoding:freeWhenDone:", function(self, _cmd, bytes, len, encoding, freeBuffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCString:encoding:", function(self, _cmd, nullTerminatedCString, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:encoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:encoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:usedEncoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:usedEncoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:atomically:encoding:error:", function(self, _cmd, url, useAuxiliaryFile, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:atomically:encoding:error:", function(self, _cmd, path, useAuxiliaryFile, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "defaultCStringEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "availableStringEncodings", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "localizedNameOfStringEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "string", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithString:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithCharacters:length:", function(self, _cmd, characters, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithUTF8String:", function(self, _cmd, nullTerminatedCString) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "localizedStringWithFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithCString:encoding:", function(self, _cmd, cString, enc) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfURL:encoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfFile:encoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfURL:usedEncoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfFile:usedEncoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSString, "NSMutableString");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "replaceCharactersInRange:withString:", function(self, _cmd, range, aString) {
with(self) {
}
}, "void");

var the_class = NSMutableString;
var meta_class = the_class.isa;

class_addMethod(the_class, "insertString:atIndex:", function(self, _cmd, aString, loc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deleteCharactersInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, capacity) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceOccurrencesOfString:withString:options:range:", function(self, _cmd, target, replacement, options, searchRange) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithCapacity:", function(self, _cmd, capacity) {
with(self) {
}
}, "void");

var the_class = NSString;
var meta_class = the_class.isa;

class_addMethod(the_class, "propertyList", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "propertyListFromStringsFileFormat", function(self, _cmd) {
with(self) {
}
}, "void");

