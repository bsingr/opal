var the_class = objc_allocateClassPair(NSObject, "NSCursor");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_cursor", "NSString");

class_addMethod(the_class, "initWithCursorString:", function(self, _cmd, cursor) {
with(self) {
objc_msgSend(self, "init");
if (self)
{
_cursor = cursor;

}

return self;
}
}, "void");

class_addMethod(the_class, "set", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "currentCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "arrowCursor", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(NSCursor, "alloc"), "initWithCursorString:", "default");
}
}, "void");

class_addMethod(meta_class, "closedHandCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "crosshairCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "disappearingItemCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "IBeamCursor", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(NSCursor, "alloc"), "initWithCursorString:", "text");
}
}, "void");

class_addMethod(meta_class, "openHandCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "pointingHandCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resizeDownCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resizeLeftCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resizeLeftRightCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resizeRightCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resizeUpCursor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "resizeUpDownCursor", function(self, _cmd) {
with(self) {
}
}, "void");

