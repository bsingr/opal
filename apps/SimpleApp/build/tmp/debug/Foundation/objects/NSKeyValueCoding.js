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

