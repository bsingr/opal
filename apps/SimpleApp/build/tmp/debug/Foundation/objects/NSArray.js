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

