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

