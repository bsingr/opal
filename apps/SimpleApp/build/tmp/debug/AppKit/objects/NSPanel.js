var the_class = objc_allocateClassPair(NSWindow, "NSPanel");
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

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, windowStyle, bufferingType, deferCreation) {
with(self) {
objc_msgSendSuper({super_class:NSWindow, receiver:self}, "initWithContentRect:styleMask:backing:defer:", contentRect, windowStyle, bufferingType, deferCreation);
return self;
}
}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
with(self) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;
objc_msgSend(self, "setLevel:", (10 + 5));
}
}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
with(self) {
_keyWindow = NO;
objc_msgSend(self, "setLevel:", 10);
}
}, "void");

class_addMethod(the_class, "makeKeyAndOrderFront:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "makeKeyWindow");
}
}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
with(self) {
return NO;
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
with(self) {
var NSWindowBorderSize = 20;
var NSPanelUtilityTitleBarSize = 22;
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0, 0, 0.7), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(0.5,0.5,_frame.size.width - 1,_frame.size.height - 1.5 - NSPanelUtilityTitleBarSize));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.6, 0.6, 0.9), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(0.5,0.5,_frame.size.width - 1,_frame.size.height - 1));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.351, 0.351, 0.351, 0.7), "set");
var titlebarBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(titlebarBorder, "setLineWidth:", 1);
objc_msgSend(titlebarBorder, "moveToPoint:", NSMakePoint(0.5 + NSWindowBorderSize,_frame.size.height - 1.5 - NSPanelUtilityTitleBarSize));
objc_msgSend(titlebarBorder, "lineToPoint:", NSMakePoint(_frame.size.width - NSWindowBorderSize - 0.5,_frame.size.height - 1.5 - NSPanelUtilityTitleBarSize));
objc_msgSend(titlebarBorder, "stroke");
var titlebarBackground1 = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.4, 0.4, 0.4, 0.8);
var titlebarBackground2 = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.2, 0.2, 0.2, 0.8);
var titlebarGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", titlebarBackground1, titlebarBackground2);
objc_msgSend(titlebarGradient, "drawInRect:angle:", NSMakeRect(NSWindowBorderSize,_frame.size.height - 1.0 - NSPanelUtilityTitleBarSize,_frame.size.width - NSWindowBorderSize - 1.0,NSPanelUtilityTitleBarSize), 0);
if (_title)
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(1,1));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0, 0, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.9, 0.9, 0.9, 1.0), "set");
objc_msgSend(objc_msgSend(NSFont, "titleBarFontOfSize:", objc_msgSend(NSFont, "smallSystemFontSize")), "set");
var theWidth = objc_msgSend(_title, "sizeWithAttributes:", null).width;
var xTitleOffset = _frame.size.width - theWidth;
var actualTitleOffset = xTitleOffset / 2;
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(actualTitleOffset,_frame.size.height - 15,40,0), null, null);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}

}
}, "void");

class_addMethod(the_class, "frameRectForContentRect:", function(self, _cmd, windowContent) {
with(self) {
var xOffset = 0;
var yOffset = 0;
var widthOffset = 0;
var heightOffset = 0;
xOffset = xOffset - NSWindowBorderSize;
yOffset = yOffset - NSWindowBorderSize;
widthOffset = widthOffset + (2 * NSWindowBorderSize);
heightOffset = heightOffset + (2 * NSWindowBorderSize);
heightOffset = heightOffset + NSPanelUtilityTitleBarSize;
var frameRect = NSMakeRect(windowContent.origin.x + xOffset,windowContent.origin.y + yOffset,windowContent.size.width + widthOffset,windowContent.size.height + heightOffset);
return frameRect;
}
}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
with(self) {
return NO;
}
}, "void");

