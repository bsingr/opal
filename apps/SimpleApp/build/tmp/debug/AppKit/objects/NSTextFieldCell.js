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
with(self) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "init");
if (self)
{
_textColor = objc_msgSend(NSColor, "controlTextColor");

}

return self;
}
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeObjectForKey:", "NSContents");
if (!_value)
_value = " ";

_drawsBackground = objc_msgSend(aCoder, "decodeBoolForKey:", "NSDrawsBackground");
return self;
}
}, "void");

class_addMethod(the_class, "setGBorderType:", function(self, _cmd, type) {
with(self) {
_gBorderType = type;
}
}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var textToDraw = "";
if (_value == "")
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
titleRect.origin.y = ((titleRect.size.height - 10) / 2) + titleRect.origin.y;
titleRect.origin.x = titleRect.origin.x + 2;
objc_msgSend(textToDraw, "drawWithRect:options:attributes:", titleRect, null, null);

}

}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
_controlView = controlView;
if (_isBezeled)
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.439, 0.439, 0.439, 1.0), "set");
var topOuterBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topOuterBorder, "setLineWidth:", 1);
objc_msgSend(topOuterBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.x + 3.5,cellFrame.origin.y + cellFrame.size.height - 3.5));
objc_msgSend(topOuterBorder, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width - 3.5,cellFrame.origin.y + cellFrame.size.height - 3.5));
objc_msgSend(topOuterBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
var topInnerBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topInnerBorder, "setLineWidth:", 1);
objc_msgSend(topInnerBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.x + 3.5,cellFrame.origin.y + cellFrame.size.height - 4.5));
objc_msgSend(topInnerBorder, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width - 3.5,cellFrame.origin.y + cellFrame.size.height - 4.5));
objc_msgSend(topInnerBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.808, 0.808, 0.808, 1.0), "set");
var bottomOuterBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomOuterBorder, "setLineWidth:", 1);
objc_msgSend(bottomOuterBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.x + 3.5,cellFrame.origin.y + 3.5));
objc_msgSend(bottomOuterBorder, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width - 3.5,cellFrame.origin.y + 3.5));
objc_msgSend(bottomOuterBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.671, 0.671, 0.671, 1.0), "set");
var sideBorders = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(sideBorders, "setLineWidth:", 1);
objc_msgSend(sideBorders, "moveToPoint:", NSMakePoint(cellFrame.origin.x + 3.5,cellFrame.origin.y + 3.5));
objc_msgSend(sideBorders, "lineToPoint:", NSMakePoint(cellFrame.origin.x + 3.5,cellFrame.origin.y + cellFrame.size.height - 3.5));
objc_msgSend(sideBorders, "moveToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width - 3.5,cellFrame.origin.y + 3.5));
objc_msgSend(sideBorders, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width - 3.5,cellFrame.origin.y + cellFrame.size.height - 3.5));
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
objc_msgSend(highlightShadow, "setShadowOffset:", NSMakeSize(0,0));
objc_msgSend(highlightShadow, "set");

}

objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(cellFrame.origin.x + 4,cellFrame.origin.y + 4,cellFrame.size.width - 8,cellFrame.size.height - 9));
;
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}

objc_msgSend(NSGraphicsContext, "restoreGraphicsState");
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);
}
}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
with(self) {
return _drawsBackground;
}
}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
with(self) {
_drawsBackground = flag;
if (_drawsBackground == 0)
_drawsBackground = NO;

}
}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
with(self) {
_bezeled = flag;
}
}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
with(self) {
return _bezeled;
}
}, "void");

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, style) {
with(self) {
_bezelStyle = style;
}
}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
with(self) {
return _bezelStyle;
}
}, "void");

class_addMethod(the_class, "setTextColor:", function(self, _cmd, aColor) {
with(self) {
_textColor = aColor;
}
}, "void");

class_addMethod(the_class, "textColor", function(self, _cmd) {
with(self) {
return _textColor;
}
}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, theRect) {
with(self) {
if (_isEditable)
{
var titleRect = NSMakeRect(theRect.origin.x + 4,theRect.origin.y + 4,theRect.size.width - 8,theRect.size.height - 9);
return titleRect;

}

return theRect;
}
}, "void");

