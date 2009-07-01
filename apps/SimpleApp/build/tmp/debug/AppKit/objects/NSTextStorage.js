var NSTextStorageWillProcessEditingNotification = "NSTextStorageWillProcessEditingNotification";
var NSTextStorageDidProcessEditingNotification = "NSTextStorageDidProcessEditingNotification";
var the_class = objc_allocateClassPair(NSAttributedString, "NSTextStorage");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_editedRange", "NSRange");
class_addIvar(the_class, "_editedDelta", "NSInteger");
class_addIvar(the_class, "_layoutManagers", "NSMutableArray");
class_addIvar(the_class, "_sideData", "id");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
self = objc_msgSendSuper({super_class:NSAttributedString, receiver:self}, "init");
_layoutManagers = objc_msgSend(NSMutableArray, "array");
return self;
}
}, "void");

class_addMethod(the_class, "addLayoutManager:", function(self, _cmd, aLayoutManager) {
with(self) {
objc_msgSend(_layoutManagers, "addObject:", aLayoutManager);
objc_msgSend(aLayoutManager, "setTextStorage:", self);
}
}, "void");

class_addMethod(the_class, "removeLayoutManager:", function(self, _cmd, aLayoutManager) {
with(self) {
objc_msgSend(_layoutManagers, "removeObject:", aLayoutManager);
}
}, "void");

class_addMethod(the_class, "layoutManagers", function(self, _cmd) {
with(self) {
return _layoutManagers;
}
}, "void");

class_addMethod(the_class, "edited:range:changeInLength:", function(self, _cmd, editedMask, range, delta) {
with(self) {
}
}, "void");

class_addMethod(the_class, "processEditing", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateAttributesInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureAttributesAreFixedInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "fixesAttributesLazily", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "editedMask", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "editedRange", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "changeInLength", function(self, _cmd) {
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

