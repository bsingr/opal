var the_class = objc_allocateClassPair(NSCell, "NSTextFieldCell");
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

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "init");
if (self)
{
_textColor = objc_msgSend(NSColor, "controlTextColor");

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeStringForKey:", "NSContents");
if (Unhandled output_expression: [,(), ! (!), _value (IDENTIFIER)])
_value = " ";

_drawsBackground = objc_msgSend(aCoder, "decodeBoolForKey:", "NSDrawsBackground");
return self;

}, "void");

class_addMethod(the_class, "setGBorderType:", function(self, _cmd, type) {
_gBorderType = type;

}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
var *;
if (Unhandled output_expression: [EQ_OP(), _value (IDENTIFIER), @"" (AT_STRING_LITERAL)])
{
textToDraw = _placeholderString;

}
else
{
textToDraw = _value;

}

if (textToDraw)
{
objc_msgSend(_textColor, "set");
objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "systemFontSize")), "set");
var titleRect = objc_msgSend(self, "titleRectForBounds:", cellFrame);
titleRect.origin.y = Unhandled output_expression: [+(), [((), [/(), [((), [-(), [.(.), [.(.), titleRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 10 (CONSTANT)], ], 2 (CONSTANT)], ], [.(.), [.(.), titleRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)]];
titleRect.origin.x = Unhandled output_expression: [+(), [.(.), [.(.), titleRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 2 (CONSTANT)];
objc_msgSend(textToDraw, "drawWithRect:options:attributes:", titleRect, nil, nil);

}


}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
_controlView = controlView;
if (_isBezeled)
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.439, 0.439, 0.439, 1.0), "set");
var topOuterBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topOuterBorder, "setLineWidth:", 1);
objc_msgSend(topOuterBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(topOuterBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(topOuterBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
var topInnerBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topInnerBorder, "setLineWidth:", 1);
objc_msgSend(topInnerBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 4.5 (CONSTANT)]));
objc_msgSend(topInnerBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 4.5 (CONSTANT)]));
objc_msgSend(topInnerBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.808, 0.808, 0.808, 1.0), "set");
var bottomOuterBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomOuterBorder, "setLineWidth:", 1);
objc_msgSend(bottomOuterBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(bottomOuterBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(bottomOuterBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.671, 0.671, 0.671, 1.0), "set");
var sideBorders = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(sideBorders, "setLineWidth:", 1);
objc_msgSend(sideBorders, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "moveToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "stroke");

}

if (objc_msgSend(self, "drawsBackground"))
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
if (objc_msgSend(self, "isHighlighted"))
{
var highlightShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(highlightShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.239, 0.502, 0.875, 1.0));
objc_msgSend(highlightShadow, "setShadowBlurRadius:", 6);
objc_msgSend(highlightShadow, "setShadowOffset:", NSMakeSize(00));
objc_msgSend(highlightShadow, "set");

}

objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 8 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 9 (CONSTANT)]));
;
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}

objc_msgSend(NSGraphicsContext, "restoreGraphicsState");
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);

}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
return _drawsBackground;

}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
_drawsBackground = flag;
if (Unhandled output_expression: [EQ_OP(), _drawsBackground (IDENTIFIER), 0 (CONSTANT)])
_drawsBackground = NO;


}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
_bezeled = flag;

}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
return _bezeled;

}, "void");

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, style) {
_bezelStyle = style;

}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
return _bezelStyle;

}, "void");

class_addMethod(the_class, "setTextColor:", function(self, _cmd, aColor) {
_textColor = aColor;

}, "void");

class_addMethod(the_class, "textColor", function(self, _cmd) {
return _textColor;

}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, theRect) {
if (_isEditable)
{
var titleRect = NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), theRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), theRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), theRect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 8 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), theRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 9 (CONSTANT)]);
return titleRect;

}

return theRect;

}, "void");

