var the_class = objc_allocateClassPair(NSButtonCell, "NSMenuItemCell");
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
class_addIvar(the_class, "_menuItem", "NSMenuItem");
class_addIvar(the_class, "_menuView", "NSMenuView");

class_addMethod(the_class, "menuItem", function(self, _cmd) {
with(self) {
return _menuItem;
}
}, "void");

class_addMethod(the_class, "setMenuItem:", function(self, _cmd, item) {
with(self) {
_menuItem = item;
}
}, "void");

class_addMethod(the_class, "menuView", function(self, _cmd) {
with(self) {
return _menuView;
}
}, "void");

class_addMethod(the_class, "setMenuView:", function(self, _cmd, menuView) {
with(self) {
_menuView = menuView;
}
}, "void");

class_addMethod(the_class, "calcSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "needsSizing", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNeedsSizing:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "titleWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stateImageWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentRectForBounds:", function(self, _cmd, cellFrame) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stateImageRectForBounds:", function(self, _cmd, cellFrame) {
with(self) {
}
}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, cellFrame) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
if (!objc_msgSend(objc_msgSend(self, "menuItem"), "title"))
{
objc_msgSend(self, "drawSeparatorItemWithFrame:inView:", cellFrame, controlView);
return ;

}

objc_msgSend(NSGraphicsContext, "saveGraphicsState");
objc_msgSend(self, "drawBorderAndBackgroundWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawImageWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawKeyEquivalentWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawTitleWithFrame:inView:", cellFrame, controlView);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");
}
}, "void");

class_addMethod(the_class, "drawBorderAndBackgroundWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
if (objc_msgSend(self, "isHighlighted"))
{
var highlightTop = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.663, 0.714, 0.765, 1.0);
var highlightBottom = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.506, 0.569, 0.639, 1.0);
var highlightGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", highlightTop, highlightBottom);
objc_msgSend(highlightGradient, "drawInRect:angle:", cellFrame, 0);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.529, 0.573, 0.612, 1), "set");
var topBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.x,cellFrame.origin.y + cellFrame.size.height - 0.5));
objc_msgSend(topBorder, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width,cellFrame.origin.y + cellFrame.size.height - 0.5));
objc_msgSend(topBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.737, 0.776, 0.816, 1), "set");
var topBorderInner = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topBorderInner, "moveToPoint:", NSMakePoint(cellFrame.origin.x,cellFrame.origin.y + cellFrame.size.height - 1.5));
objc_msgSend(topBorderInner, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width,cellFrame.origin.y + cellFrame.size.height - 1.5));
objc_msgSend(topBorderInner, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.404, 0.455, 0.510, 1), "set");
var bottomBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.x,cellFrame.origin.y + 0.5));
objc_msgSend(bottomBorder, "lineToPoint:", NSMakePoint(cellFrame.origin.x + cellFrame.size.width,cellFrame.origin.y + 0.5));
objc_msgSend(bottomBorder, "stroke");

}

}
}, "void");

class_addMethod(the_class, "drawImageWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawKeyEquivalentWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawSeparatorItemWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawStateImageWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawTitleWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var _title = objc_msgSend(objc_msgSend(self, "menuItem"), "title");
if (!_title)
return ;

if (objc_msgSend(self, "isHighlighted"))
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.953, 0.953, 0.953, 1), "set");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(1,1));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.396, 0.435, 0.510, 0.5));
objc_msgSend(titleShadow, "set");

}
else
{
objc_msgSend(objc_msgSend(NSColor, "controlTextColor"), "set");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(1,1));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.5));
objc_msgSend(titleShadow, "set");

}

objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "systemFontSize")), "set");
if (objc_msgSend(_menuView, "isHorizontal"))
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(cellFrame.origin.x + 25,cellFrame.origin.y + 9,40,0), null, null);
else
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(cellFrame.origin.x + 25,cellFrame.origin.y + 6,40,0), null, null);

}
}, "void");

class_addMethod(the_class, "needsDisplay", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
with(self) {
}
}, "void");

