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

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
return self;
}
}, "void");

