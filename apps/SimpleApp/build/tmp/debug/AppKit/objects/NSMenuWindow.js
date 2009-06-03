var the_class = objc_allocateClassPair(NSWindow, "NSMenuWindow");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_gCanvas", "id");
class_addIvar(the_class, "_gBuffer", "id");
class_addIvar(the_class, "_contentRectOrigin", "NSPoint");
class_addIvar(the_class, "_contentRectSize", "NSSize");
class_addIvar(the_class, "_isVisible", "BOOL");
class_addIvar(the_class, "_hasShadow", "BOOL");
class_addIvar(the_class, "_hidesOnDeactivate", "BOOL");
class_addIvar(the_class, "_releasedWhenClosed", "BOOL");
class_addIvar(the_class, "_styleMask", "NSUInteger");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_visibleAtLaunch", "BOOL");
class_addIvar(the_class, "_resizable", "BOOL");
class_addIvar(the_class, "_showNormalTitlebar", "BOOL");
class_addIvar(the_class, "_unifiedTitleAndToolbar", "BOOL");
class_addIvar(the_class, "_toolbar", "NSToolbar");
class_addIvar(the_class, "_contentView", "NSView");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_windowNumber", "NSUInteger");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_visible", "BOOL");
class_addIvar(the_class, "_level", "int");
class_addIvar(the_class, "_keyWindow", "BOOL");
class_addIvar(the_class, "_mainWindow", "BOOL");
class_addIvar(the_class, "_firstResponder", "NSResponder");
class_addIvar(the_class, "_movableByWindowBackground", "BOOL");
class_addIvar(the_class, "_eventBindingCurrentX", "id");
class_addIvar(the_class, "_eventBindingCurrentY", "id");
class_addIvar(the_class, "_windowCloseButton", "NSWindowTitleButton");
class_addIvar(the_class, "_fieldEditor", "NSText");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_wtFlags", "NSUInteger");
class_addIvar(the_class, "_windowClass", "id");

class_addMethod(the_class, "drawRect:", function(self, _cmd, aRect) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.95), "set");
objc_msgSend(NSBezierPath, "fillRect:", aRect);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.698, 0.698, 0.698, 0.95), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(aRect.origin.x + 0.5,aRect.origin.y + 0.5,aRect.origin.x + aRect.size.width - 1,aRect.origin.y + aRect.size.height - 1));
}, "void");

class_addMethod(the_class, "isReleasedWhenClosed", function(self, _cmd) {
return YES;
}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;
}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
_keyWindow = NO;
}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"), "resignMainWindow");

_mainWindow = YES;
}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {
_mainWindow = NO;
}, "void");

