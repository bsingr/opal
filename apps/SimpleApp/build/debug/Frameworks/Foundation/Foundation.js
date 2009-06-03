var the_class = objc_allocateClassPair(null, "NSObject");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
return self;

}, "void");

class_addMethod(the_class, "dealloc", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "finalize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "copy", function(self, _cmd) {
return self;

}, "void");

class_addMethod(the_class, "mutableCopy", function(self, _cmd) {
return objc_msgSend(self, "copy");

}, "void");

class_addMethod(the_class, "methodForSelector:", function(self, _cmd, aSelector) {
return class_getMethodImplementation(selfaSelector);

}, "void");

class_addMethod(the_class, "doesNotRecognizeSelector:", function(self, _cmd, aSelector) {

}, "void");

class_addMethod(the_class, "forwardInvocation:", function(self, _cmd, anInvocation) {

}, "void");

class_addMethod(the_class, "methodSignatureForSelector:", function(self, _cmd, aSelector) {

}, "void");

class_addMethod(the_class, "isEqual:", function(self, _cmd, object) {

}, "void");

class_addMethod(the_class, "hash", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "self", function(self, _cmd) {
return self;

}, "void");

class_addMethod(the_class, "performSelector:", function(self, _cmd, aSelector) {
return objc_msgSend(selfaSelector);

}, "void");

class_addMethod(the_class, "performSelector:withObject:", function(self, _cmd, aSelector, object) {
return objc_msgSend(selfaSelectorobject);

}, "void");

class_addMethod(the_class, "performSelector:withObject:withObject:", function(self, _cmd, aSelector, object1, object2) {
return objc_msgSend(selfaSelectorobject1object2);

}, "void");

class_addMethod(the_class, "isProxy", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "isKindOfClass:", function(self, _cmd, aClass) {

}, "void");

class_addMethod(the_class, "isMemberOfClass:", function(self, _cmd, aClass) {

}, "void");

class_addMethod(the_class, "conformsToProtocol:", function(self, _cmd, aProtocol) {
return class_conformsToProtocol(selfaProtocol);

}, "void");

class_addMethod(the_class, "respondsToSelector:", function(self, _cmd, aSelector) {

}, "void");

class_addMethod(the_class, "retain", function(self, _cmd) {
return self;

}, "void");

class_addMethod(the_class, "release", function(self, _cmd) {
return self;

}, "void");

class_addMethod(the_class, "autorelease", function(self, _cmd) {
return self;

}, "void");

class_addMethod(the_class, "retainCount", function(self, _cmd) {
return 1;

}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
return "NSObject class description";

}, "void");

class_addMethod(meta_class, "load", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "initialize", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "new", function(self, _cmd) {
return objc_msgSend(objc_msgSend(self, "alloc"), "init");

}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
return class_createInstance(self);

}, "void");

class_addMethod(meta_class, "superclass", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "class", function(self, _cmd) {
return isa;

}, "void");

class_addMethod(meta_class, "instancesRespondToSelector:", function(self, _cmd, aSelector) {
return class_respondToSelector(selfaSelector);

}, "void");

class_addMethod(meta_class, "conformsToProtocol:", function(self, _cmd, protocol) {
return class_conformsToProtocol(selfprotocol);

}, "void");

class_addMethod(meta_class, "instanceMethodForSelector:", function(self, _cmd, aSelector) {
return class_getInstanceMethod(selfaSelector);

}, "void");

class_addMethod(meta_class, "instanceMethodSignatureForSelector:", function(self, _cmd, aSelector) {

}, "void");

class_addMethod(meta_class, "isSubclassOfClass:", function(self, _cmd, aClass) {

}, "void");

class_addMethod(meta_class, "resolveClassMethod:", function(self, _cmd, sel) {

}, "void");

class_addMethod(meta_class, "resolveInstanceMethod:", function(self, _cmd, sel) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSCoder");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "encodeValueOfObjCType:at:", function(self, _cmd, type, addr) {

}, "void");

class_addMethod(the_class, "encodeDataObject:", function(self, _cmd, data) {

}, "void");

class_addMethod(the_class, "decodeValueOfObjCType:at:", function(self, _cmd, type, data) {

}, "void");

class_addMethod(the_class, "decodeDataObject", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "versionForClassName:", function(self, _cmd, className) {

}, "void");

var the_class = objc_allocateClassPair(NSCoder, "NSArchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForWritingWithMutableData:", function(self, _cmd, mdata) {

}, "void");

class_addMethod(the_class, "archiverData", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "encodeRootObject:", function(self, _cmd, rootObject) {

}, "void");

class_addMethod(the_class, "encodeConditionalObject:", function(self, _cmd, object) {

}, "void");

class_addMethod(the_class, "encodeClassName:intoClassName:", function(self, _cmd, trueName, inArchiveName) {

}, "void");

class_addMethod(the_class, "classNameEncodedForTrueClassName:", function(self, _cmd, trueName) {

}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {

}, "void");

class_addMethod(meta_class, "archivedDataWithRootObject:", function(self, _cmd, rootObject) {

}, "void");

class_addMethod(meta_class, "archiveRootObject:toFile:", function(self, _cmd, rootObject, path) {

}, "void");

var the_class = objc_allocateClassPair(NSCoder, "NSUnarchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForReadingWithData:", function(self, _cmd, data) {

}, "void");

class_addMethod(the_class, "isAtEnd", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {

}, "void");

class_addMethod(the_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {

}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {

}, "void");

class_addMethod(meta_class, "unarchiveObjectWithData:", function(self, _cmd, data) {

}, "void");

class_addMethod(meta_class, "unarchiveObjectWithFile:", function(self, _cmd, path) {

}, "void");

class_addMethod(meta_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {

}, "void");

class_addMethod(meta_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSArray");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "count", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "objectAtIndex:", function(self, _cmd, index) {

}, "void");

var the_class = NSArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "arrayByAddingObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "arrayByAddingObjectsFromArray:", function(self, _cmd, otherArray) {

}, "void");

class_addMethod(the_class, "componentsJoinedByString:", function(self, _cmd, separator) {

}, "void");

class_addMethod(the_class, "containsObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "descriptionWithLocale:", function(self, _cmd, locale) {

}, "void");

class_addMethod(the_class, "descriptionWithLocale:indent:", function(self, _cmd, locale, level) {

}, "void");

class_addMethod(the_class, "firstObjectCommonWithArray:", function(self, _cmd, otherArray) {

}, "void");

class_addMethod(the_class, "getObjects:", function(self, _cmd, objects) {

}, "void");

class_addMethod(the_class, "getObjects:range:", function(self, _cmd, objects, range) {

}, "void");

class_addMethod(the_class, "indexOfObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "indexOfObject:inRange:", function(self, _cmd, anObject, range) {

}, "void");

class_addMethod(the_class, "indexOfObjectIdenticalTo:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "indexOfObjectIdenticalTo:inRange:", function(self, _cmd, anObject, range) {

}, "void");

class_addMethod(the_class, "isEqualToArray:", function(self, _cmd, otherArray) {

}, "void");

class_addMethod(the_class, "lastObject", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "objectEnumerator", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "reverseObjectEnumerator", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sortedArrayHint", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sortedArrayUsingFunction:context:", function(self, _cmd, comparator, context) {

}, "void");

class_addMethod(the_class, "sortedArrayUsingFunction:context:hint:", function(self, _cmd, comparator, context, hint) {

}, "void");

class_addMethod(the_class, "sortedArrayUsingSelector:", function(self, _cmd, comparator) {

}, "void");

class_addMethod(the_class, "subarrayWithRange:", function(self, _cmd, range) {

}, "void");

class_addMethod(the_class, "writeToFile:atomically:", function(self, _cmd, path, useAuxiliaryFile) {

}, "void");

class_addMethod(the_class, "writeToURL:atomically:", function(self, _cmd, url, atomically) {

}, "void");

class_addMethod(the_class, "makeObjectsPerformSelector:", function(self, _cmd, aSelector) {

}, "void");

class_addMethod(the_class, "makeObjectsPerformSelector:withObject:", function(self, _cmd, aSelector, argument) {

}, "void");

class_addMethod(the_class, "objectsAtIndexes:", function(self, _cmd, indexes) {

}, "void");

var the_class = NSArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithObjects:count:", function(self, _cmd, objects, cnt) {

}, "void");

class_addMethod(the_class, "initWithObjects:", function(self, _cmd, firstObj) {

}, "void");

class_addMethod(the_class, "initWithArray:", function(self, _cmd, array) {

}, "void");

class_addMethod(the_class, "initWithArray:copyItems:", function(self, _cmd, array, flag) {

}, "void");

class_addMethod(the_class, "initWithContentsOfFile:", function(self, _cmd, path) {

}, "void");

class_addMethod(the_class, "initWithContentsOfURL:", function(self, _cmd, url) {

}, "void");

class_addMethod(meta_class, "array", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "arrayWithObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(meta_class, "arrayWithObjects:count:", function(self, _cmd, objects, cnt) {

}, "void");

class_addMethod(meta_class, "arrayWithObjects:", function(self, _cmd, firstObj) {

}, "void");

class_addMethod(meta_class, "arrayWithArray:", function(self, _cmd, array) {

}, "void");

class_addMethod(meta_class, "arrayWithContentsOfFile:", function(self, _cmd, path) {

}, "void");

class_addMethod(meta_class, "arrayWithContentsOfURL:", function(self, _cmd, url) {

}, "void");

var the_class = objc_allocateClassPair(NSArray, "NSMutableArray");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "addObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "insertObject:atIndex:", function(self, _cmd, anObject, index) {

}, "void");

class_addMethod(the_class, "removeLastObject", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "removeObjectAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "replaceObjectAtIndex:withObject:", function(self, _cmd, index, anObject) {

}, "void");

var the_class = NSMutableArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "addObjectsFromArray:", function(self, _cmd, otherArray) {

}, "void");

class_addMethod(the_class, "exchangeObjectAtIndex:withObjectAtIndex:", function(self, _cmd, idx1, idx2) {

}, "void");

class_addMethod(the_class, "removeAllObjects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "removeObject:inRange:", function(self, _cmd, anObject, range) {

}, "void");

class_addMethod(the_class, "removeObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "removeObjectIdenticalTo:inRange:", function(self, _cmd, anObject, range) {

}, "void");

class_addMethod(the_class, "removeObjectIdenticalTo:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "removeObjectsFromIndices:numIndices:", function(self, _cmd, indices, cnt) {

}, "void");

class_addMethod(the_class, "removeObjectsInArray:", function(self, _cmd, otherArray) {

}, "void");

class_addMethod(the_class, "removeObjectsInRange:", function(self, _cmd, range) {

}, "void");

class_addMethod(the_class, "replaceObjectsInRange:withObjectsFromArray:range:", function(self, _cmd, range, otherArray, otherRange) {

}, "void");

class_addMethod(the_class, "replaceObjectsInRange:withObjectsFromArray:", function(self, _cmd, range, otherArray) {

}, "void");

class_addMethod(the_class, "setArray:", function(self, _cmd, otherArray) {

}, "void");

class_addMethod(the_class, "sortUsingFunction:context:", function(self, _cmd, compare, context) {

}, "void");

class_addMethod(the_class, "sortUsingSelector:", function(self, _cmd, comparator) {

}, "void");

class_addMethod(the_class, "insertObjects:atIndexes:", function(self, _cmd, objects, indexes) {

}, "void");

class_addMethod(the_class, "removeObjectsAtIndexes:", function(self, _cmd, indexes) {

}, "void");

class_addMethod(the_class, "replaceObjectsAtIndexes:withObjects:", function(self, _cmd, indexes, objects) {

}, "void");

var the_class = NSMutableArray;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, numItems) {

}, "void");

class_addMethod(meta_class, "arrayWithCapacity:", function(self, _cmd, numItems) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSNotification");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "name", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "object", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "userInfo", function(self, _cmd) {

}, "void");

var the_class = NSNotification;
var meta_class = the_class.isa;

class_addMethod(meta_class, "notificationWithName:object:", function(self, _cmd, aName, anObject) {

}, "void");

class_addMethod(meta_class, "notificationWithName:object:userInfo:", function(self, _cmd, aName, anObject, aUserInfo) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSNotificationCenter");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "addObserver:selector:name:object:", function(self, _cmd, observer, aSelector, aName, anObject) {

}, "void");

class_addMethod(the_class, "postNotification:", function(self, _cmd, notification) {

}, "void");

class_addMethod(the_class, "postNotificationName:object:", function(self, _cmd, aName, anObject) {

}, "void");

class_addMethod(the_class, "postNotificationName:object:userInfo:", function(self, _cmd, aName, anObject, aUserInfo) {

}, "void");

class_addMethod(the_class, "removeObserver:", function(self, _cmd, observer) {

}, "void");

class_addMethod(the_class, "removeObserver:name:object:", function(self, _cmd, observer, aName, anObject) {

}, "void");

class_addMethod(meta_class, "defaultCenter", function(self, _cmd) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSProxy");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "forwardInvocation:", function(self, _cmd, invocation) {

}, "void");

class_addMethod(the_class, "methodSignatureForSelector:", function(self, _cmd, sel) {

}, "void");

class_addMethod(the_class, "dealloc", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "finalize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "class", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "respondsToSelector:", function(self, _cmd, aSelector) {

}, "void");

