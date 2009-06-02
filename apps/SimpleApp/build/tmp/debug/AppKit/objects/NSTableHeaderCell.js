var the_class = objc_allocateClassPair(NSTextFieldCell, "NSTableHeaderCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_placeholderString", "NSString");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_bezeled", "BOOL");
class_addIvar(the_class, "_bezelStyle", "NSUInteger");
class_addIvar(the_class, "_gBorderType", "NSUInteger");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSTextFieldCell, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeStringForKey:", "NSContents");
return self;

}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
var borderBottom = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.702, 0.702, 0.702, 1.0), "set");
objc_msgSend(borderBottom, "setLineWidth:", 1.0);
objc_msgSend(borderBottom, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(borderBottom, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(borderBottom, "stroke");
var borderRight = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.702, 0.702, 0.702, 1.0), "set");
objc_msgSend(borderRight, "setLineWidth:", 1.0);
objc_msgSend(borderRight, "moveToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 1.5 (CONSTANT)]));
objc_msgSend(borderRight, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]]));
objc_msgSend(borderRight, "stroke");
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.325, 0.325, 0.325, 1.0), "set");
objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "smallSystemFontSize")), "set");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(_value, "drawWithRect:options:attributes:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]cellFrame.size.width0), nil, nil);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}, "void");

class_addMethod(the_class, "highlight:withFrame:inView:", function(self, _cmd, flag, cellFrame, controlView) {

}, "void");

