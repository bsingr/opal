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
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
if (_isEnabled)
{
CGContextSetFillColorWithColor(c,CGColorCreateGenericRGB(0.204,0.204,0.204,1.0));
CGContextSetShadowWithColor(c,CGSizeMake(1,1),1,CGColorCreateGenericRGB(1,1,1,1));
var theFont = CGFontCreate("Arial",12,NO);
CGContextSetFont(c,theFont);
CGContextShowTextAtPoint(c,5,((cellFrame.size.height + 12) / 2),_value,14);

}
else
{
CGContextSetFillColorWithColor(c,CGColorCreateGenericRGB(0.704,0.704,0.704,1.0));
CGContextSetShadowWithColor(c,CGSizeMake(1,1),1,CGColorCreateGenericRGB(1,1,1,1));
var theFont = CGFontCreate("Arial",12,NO);
CGContextSetFont(c,theFont);
CGContextShowTextAtPoint(c,5,((cellFrame.size.height + 12) / 2),_value,14);

}

CGContextRestoreGState(c);
}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
if (objc_msgSend(self, "drawsBackground"))
{
CGContextSetFillColorWithColor(c,CGColorCreateGenericRGB(1,1,1,1.0));
CGContextFillRect(c,cellFrame);

}

if (_isBezeled)
{
var theImage = CGImageCreateWithURLDataProvider("Resources/NSTextFieldBezelTopLeft.png");
CGContextDrawImage(c,CGRectMake(0,0,2,2),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSTextFieldBezelTopMiddle.png");
CGContextDrawImage(c,CGRectMake(2,0,cellFrame.size.width - 4,2),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSTextFieldBezelTopRight.png");
CGContextDrawImage(c,CGRectMake(cellFrame.size.width - 2,0,2,2),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSTextFieldBezelSides.png");
CGContextDrawImage(c,CGRectMake(0,2,1,cellFrame.size.height - 2),theImage);
CGContextDrawImage(c,CGRectMake(cellFrame.size.width - 1,2,1,cellFrame.size.height - 2),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSTextFieldBezelBottom.png");
CGContextDrawImage(c,CGRectMake(1,cellFrame.size.height - 1,cellFrame.size.width - 2,1),theImage);

}

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

class_addMethod(the_class, "setUpFieldEditorAttributes:", function(self, _cmd, textObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setPlaceholderString:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "placeholderString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setPlaceholderAttributedString:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "placeholderAttributedString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWantsNotificationForMarkedText:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allowedInputSourceLocales", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAllowedInputSourceLocales:", function(self, _cmd, localeIdentifiers) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "load", function(self, _cmd) {
with(self) {
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSTextFieldBezelTopLeft","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSTextFieldBezelTopMiddle","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSTextFieldBezelTopRight","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSTextFieldBezelSides","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSTextFieldBezelBottom","png","");
}
}, "void");

