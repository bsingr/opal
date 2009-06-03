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

