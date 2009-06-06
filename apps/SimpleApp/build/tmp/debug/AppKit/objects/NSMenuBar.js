var the_class = objc_allocateClassPair(NSWindow, "NSMenuBar");
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
class_addIvar(the_class, "_DOMContainer", "CGDOMElementRef");
class_addIvar(the_class, "_DOMGraphicsContext", "CGDOMElementRef");
class_addIvar(the_class, "_graphicsContext", "NSGraphicsContext");
class_addIvar(the_class, "_mainMenuView", "NSMenuView");
class_addIvar(the_class, "_statusBarView", "NSView");
class_addIvar(the_class, "_applicationTitleName", "NSString");
class_addIvar(the_class, "_applicationTitleView", "NSView");

class_addMethod(the_class, "setApplicationTitleName:", function(self, _cmd, aString) {
with(self) {
_applicationTitleName = aString;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "applicationTitleName", function(self, _cmd) {
with(self) {
return _applicationTitleName;
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
with(self) {
var backgroundColorTop = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0);
var backgroundColorBottom = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.902, 0.902, 0.902, 1.0);
var backgroundGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", backgroundColorTop, backgroundColorBottom);
objc_msgSend(backgroundGradient, "drawInRect:angle:", rect, 0);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.702, 0.702, 0.702, 1.0), "set");
var menuBarBottom = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(menuBarBottom, "moveToPoint:", NSMakePoint(rect.origin.x,rect.origin.y + 0.5));
objc_msgSend(menuBarBottom, "lineToPoint:", NSMakePoint(rect.origin.x + rect.size.width,rect.origin.y + 0.5));
objc_msgSend(menuBarBottom, "stroke");
if (_applicationTitleName)
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(1,1));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(objc_msgSend(NSColor, "controlTextColor"), "set");
objc_msgSend(objc_msgSend(NSFont, "titleBarFontOfSize:", (objc_msgSend(NSFont, "systemFontSize") + 1)), "set");
var theWidth = objc_msgSend(_applicationTitleName, "sizeWithAttributes:", null).width;
var xTitleOffset = _frame.size.width - theWidth;
var actualTitleOffset = xTitleOffset / 2;
objc_msgSend(_applicationTitleName, "drawWithRect:options:attributes:", NSMakeRect(actualTitleOffset,_frame.size.height - 18,40,0), null, null);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}

}
}, "void");

class_addMethod(the_class, "setMainMenuView:", function(self, _cmd, aView) {
with(self) {
_mainMenuView = aView;
objc_msgSend(objc_msgSend(self, "contentView"), "addSubview:", aView);
objc_msgSend(_mainMenuView, "setHorizontal:", YES);
objc_msgSend(_mainMenuView, "sizeToFit");
}
}, "void");

class_addMethod(the_class, "mainMenuView", function(self, _cmd) {
with(self) {
return _mainMenuView;
}
}, "void");

class_addMethod(the_class, "setApplicationTitleView:", function(self, _cmd, aView) {
with(self) {
_applicationTitleView = aView;
objc_msgSend(objc_msgSend(self, "contentView"), "addSubview:", aView);
}
}, "void");

class_addMethod(the_class, "applicationTitleView", function(self, _cmd) {
with(self) {
return _applicationTitleView;
}
}, "void");

class_addMethod(the_class, "setStatusBarView:", function(self, _cmd, aView) {
with(self) {
_statusBarView = aView;
objc_msgSend(objc_msgSend(self, "contentView"), "addSubview:", aView);
}
}, "void");

class_addMethod(the_class, "statusBarView", function(self, _cmd) {
with(self) {
return _statusBarView;
}
}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
with(self) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;
}
}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
with(self) {
_keyWindow = NO;
}
}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {
with(self) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"), "resignMainWindow");

_mainWindow = YES;
}
}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {
with(self) {
_mainWindow = NO;
}
}, "void");

