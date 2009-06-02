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

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, windowStyle, bufferingType, deferCreation) {
objc_msgSendSuper({super_class:NSWindow, receiver:self}, "initWithContentRect:styleMask:backing:defer:", contentRect, windowStyle, bufferingType, deferCreation);
return self;

}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;
objc_msgSend(self, "setLevel:", Unhandled output_expression: [((), [+(), 10 (CONSTANT), 5 (CONSTANT)], ]);

}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
_keyWindow = NO;
objc_msgSend(self, "setLevel:", 10);

}, "void");

class_addMethod(the_class, "makeKeyAndOrderFront:", function(self, _cmd, sender) {
objc_msgSend(self, "makeKeyWindow");

}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
var NSWindowBorderSize = 20;
var NSPanelUtilityTitleBarSize = 22;
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0, 0, 0.7), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(0.50.5Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.5 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.6, 0.6, 0.9), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(0.50.5Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1 (CONSTANT)]));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.351, 0.351, 0.351, 0.7), "set");
var titlebarBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(titlebarBorder, "setLineWidth:", 1);
objc_msgSend(titlebarBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), 0.5 (CONSTANT), NSWindowBorderSize (IDENTIFIER)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.5 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]));
objc_msgSend(titlebarBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], NSWindowBorderSize (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.5 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]));
objc_msgSend(titlebarBorder, "stroke");
var titlebarBackground1 = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.4, 0.4, 0.4, 0.8);
var titlebarBackground2 = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.2, 0.2, 0.2, 0.8);
var titlebarGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", titlebarBackground1, titlebarBackground2);
objc_msgSend(titlebarGradient, "drawInRect:angle:", NSMakeRect(NSWindowBorderSizeUnhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.0 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], NSWindowBorderSize (IDENTIFIER)], 1.0 (CONSTANT)]NSPanelUtilityTitleBarSize), 0);
if (_title)
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0, 0, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.9, 0.9, 0.9, 1.0), "set");
objc_msgSend(objc_msgSend(NSFont, "titleBarFontOfSize:", objc_msgSend(NSFont, "smallSystemFontSize")), "set");
var theWidth = objc_msgSend(_title, "sizeWithAttributes:", nil).width;
var xTitleOffset = Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], theWidth (IDENTIFIER)];
var actualTitleOffset = Unhandled output_expression: [/(), xTitleOffset (IDENTIFIER), 2 (CONSTANT)];
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(actualTitleOffsetUnhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 15 (CONSTANT)]400), nil, nil);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}


}, "void");

class_addMethod(the_class, "frameRectForContentRect:", function(self, _cmd, windowContent) {
var xOffset = 0;
var yOffset = 0;
var widthOffset = 0;
var heightOffset = 0;
xOffset = Unhandled output_expression: [-(), xOffset (IDENTIFIER), NSWindowBorderSize (IDENTIFIER)];
yOffset = Unhandled output_expression: [-(), yOffset (IDENTIFIER), NSWindowBorderSize (IDENTIFIER)];
widthOffset = Unhandled output_expression: [+(), widthOffset (IDENTIFIER), [((), [*(), 2 (CONSTANT), NSWindowBorderSize (IDENTIFIER)], ]];
heightOffset = Unhandled output_expression: [+(), heightOffset (IDENTIFIER), [((), [*(), 2 (CONSTANT), NSWindowBorderSize (IDENTIFIER)], ]];
heightOffset = Unhandled output_expression: [+(), heightOffset (IDENTIFIER), NSPanelUtilityTitleBarSize (IDENTIFIER)];
var frameRect = NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], xOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], yOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], widthOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], heightOffset (IDENTIFIER)]);
return frameRect;

}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
return NO;

}, "void");

