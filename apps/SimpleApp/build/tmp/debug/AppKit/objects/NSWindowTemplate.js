var the_class = objc_allocateClassPair(NSObject, "NSWindowTemplate");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_screenRect", "NSRect");
class_addIvar(the_class, "_viewClass", "id");
class_addIvar(the_class, "_wtFlags", "NSUInteger");
class_addIvar(the_class, "_windowBacking", "NSUInteger");
class_addIvar(the_class, "_windowClass", "NSString");
class_addIvar(the_class, "_windowRect", "NSRect");
class_addIvar(the_class, "_windowTitle", "NSString");
class_addIvar(the_class, "_windowView", "NSView");
class_addIvar(the_class, "_styleMask", "int");
class_addIvar(the_class, "_windowAutosave", "NSString");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
_maxSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSMaxSize");
_minSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSMinSize");
_screenRect = objc_msgSend(aCoder, "decodeRectForKey:", "NSScreenRect");
_viewClass = objc_msgSend(aCoder, "decodeObjectForKey:", "NSViewClass");
_wtFlags = objc_msgSend(aCoder, "decodeIntForKey:", "NSWTFlags");
_windowBacking = objc_msgSend(aCoder, "decodeIntForKey:", "NSWindowBacking");
_windowClass = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowClass");
_windowRect = objc_msgSend(aCoder, "decodeRectForKey:", "NSWindowRect");
_windowTitle = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowTitle");
_windowView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowView");
_styleMask = objc_msgSend(aCoder, "decodeIntForKey:", "NSWindowStyleMask");
_windowAutosave = objc_msgSend(aCoder, "decodeObjectForKey:", "NSFrameAutosaveName");
return self;
}
}, "void");

class_addMethod(the_class, "awakeAfterUsingCoder:", function(self, _cmd, aCoder) {
with(self) {
var theClass = NSClassFromString(_windowClass);
var theWindow = objc_msgSend(objc_msgSend(theClass, "alloc"), "initWithContentRect:styleMask:backing:defer:", _windowRect, _styleMask, 1, NO);
objc_msgSend(theWindow, "setContentView:", _windowView);
return theWindow;
}
}, "void");

