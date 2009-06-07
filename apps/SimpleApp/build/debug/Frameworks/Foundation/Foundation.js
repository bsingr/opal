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
}
}, "void");

class_addMethod(the_class, "objectEnumerator", function(self, _cmd) {
with(self) {
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

class_addMethod(meta_class, "array", function(self, _cmd) {
with(self) {
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
}
}, "void");

class_addMethod(the_class, "insertObject:atIndex:", function(self, _cmd, anObject, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeLastObject", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeObjectAtIndex:", function(self, _cmd, index) {
with(self) {
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
}
}, "void");

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
return CFDictionaryCreateMutable();
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
}
}, "void");

class_addMethod(meta_class, "dictionaryWithDictionary:", function(self, _cmd, dict) {
with(self) {
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

function NSLog(format)
{
printf(format);
}
function NSClassFromString(aClassName)
{
return objc_getClass(aClassName);
}
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

