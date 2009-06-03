var the_class = objc_allocateClassPair(NSObject, "NSDictionary");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
return CFDictionaryCreateMutable();
}, "void");

class_addMethod(the_class, "count", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "objectForKey:", function(self, _cmd, aKey) {
}, "void");

class_addMethod(the_class, "keyEnumerator", function(self, _cmd) {
}, "void");

var the_class = NSDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "allKeys", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "allKeysForObject:", function(self, _cmd, anObject) {
}, "void");

class_addMethod(the_class, "allValues", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "descriptionInStringsFileFormat", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "descriptionWithLocale:", function(self, _cmd, locale) {
}, "void");

class_addMethod(the_class, "descriptionWithLocale:indent:", function(self, _cmd, locale, level) {
}, "void");

class_addMethod(the_class, "isEqualToDictionary:", function(self, _cmd, otherDictionary) {
}, "void");

class_addMethod(the_class, "objectEnumerator", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "objectsForKeys:notFoundMarker:", function(self, _cmd, keys, marker) {
}, "void");

class_addMethod(the_class, "writeToFile:atomically:", function(self, _cmd, path, useAuxiliaryFile) {
}, "void");

class_addMethod(the_class, "writeToURL:atomically:", function(self, _cmd, url, atomically) {
}, "void");

class_addMethod(the_class, "keysSortedByValueUsingSelector:", function(self, _cmd, comparator) {
}, "void");

class_addMethod(the_class, "getObjects:andKeys:", function(self, _cmd, objects, keys) {
}, "void");

var the_class = NSDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithObjects:forKeys:count:", function(self, _cmd, objects, keys, cnt) {
}, "void");

class_addMethod(the_class, "initWithObjectsAndKeys:", function(self, _cmd, firstObject) {
}, "void");

class_addMethod(the_class, "initWithDictionary:", function(self, _cmd, otherDictionary) {
}, "void");

class_addMethod(the_class, "initWithDictionary:copyItems:", function(self, _cmd, otherDictionary, flag) {
}, "void");

class_addMethod(the_class, "initWithObjects:forKeys:", function(self, _cmd, objects, keys) {
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:", function(self, _cmd, path) {
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:", function(self, _cmd, url) {
}, "void");

class_addMethod(meta_class, "dictionary", function(self, _cmd) {
}, "void");

class_addMethod(meta_class, "dictionaryWithObject:forKey:", function(self, _cmd, object, key) {
}, "void");

class_addMethod(meta_class, "dictionaryWithObjects:forKeys:count:", function(self, _cmd, objects, keys, cnt) {
}, "void");

class_addMethod(meta_class, "dictionaryWithObjectsAndKeys:", function(self, _cmd, firstObject) {
}, "void");

class_addMethod(meta_class, "dictionaryWithDictionary:", function(self, _cmd, dict) {
}, "void");

class_addMethod(meta_class, "dictionaryWithObjects:forKeys:", function(self, _cmd, objects, keys) {
}, "void");

class_addMethod(meta_class, "dictionaryWithContentsOfFile:", function(self, _cmd, path) {
}, "void");

class_addMethod(meta_class, "dictionaryWithContentsOfURL:", function(self, _cmd, url) {
}, "void");

var the_class = objc_allocateClassPair(NSDictionary, "NSMutableDictionary");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "removeObjectForKey:", function(self, _cmd, aKey) {
}, "void");

class_addMethod(the_class, "setObject:forKey:", function(self, _cmd, anObject, aKey) {
}, "void");

var the_class = NSMutableDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "addEntriesFromDictionary:", function(self, _cmd, otherDictionary) {
}, "void");

class_addMethod(the_class, "removeAllObjects", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "removeObjectsForKeys:", function(self, _cmd, keyArray) {
}, "void");

class_addMethod(the_class, "setDictionary:", function(self, _cmd, otherDictionary) {
}, "void");

var the_class = NSMutableDictionary;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, numItems) {
}, "void");

class_addMethod(meta_class, "dictionaryWithCapacity:", function(self, _cmd, numItems) {
}, "void");

