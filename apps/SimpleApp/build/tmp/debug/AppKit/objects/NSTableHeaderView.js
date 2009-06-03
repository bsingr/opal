var the_class = objc_allocateClassPair(NSView, "NSTableHeaderView");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_superview", "NSView");
class_addIvar(the_class, "_subviews", "NSMutableArray");
class_addIvar(the_class, "_nextKeyView", "NSView");
class_addIvar(the_class, "_previousKeyView", "NSView");
class_addIvar(the_class, "_isHidden", "BOOL");
class_addIvar(the_class, "_postsNotificationOnFrameChange", "BOOL");
class_addIvar(the_class, "_postsNotificationOnBoundsChange", "BOOL");
class_addIvar(the_class, "_autoresizesSubviews", "BOOL");
class_addIvar(the_class, "_inLiveResize", "BOOL");
class_addIvar(the_class, "_autoresizingMask", "int");
class_addIvar(the_class, "_tag", "int");
class_addIvar(the_class, "_draggedTypes", "NSArray");
class_addIvar(the_class, "_defaultToolTipTag", "NSToolTipTag");
class_addIvar(the_class, "_toolTip", "NSString");
class_addIvar(the_class, "_invalidRect", "NSRect");
class_addIvar(the_class, "_validTransforms", "BOOL");
class_addIvar(the_class, "_transformFromWindow", "CGAffineTransform");
class_addIvar(the_class, "_transformToWindow", "CGAffineTransform");
class_addIvar(the_class, "_visibleRect", "NSRect");
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "_tableView", "NSTableView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
return self;
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{

}

return self;
}, "void");

class_addMethod(the_class, "setTableView:", function(self, _cmd, aTableView) {
_tableView = aTableView;
objc_msgSend(self, "setNeedsDisplay:", YES);
}, "void");

class_addMethod(the_class, "tableView", function(self, _cmd) {
return _tableView;
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
var gradientTop = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0);
var gradientBottom = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.902, 0.902, 0.902, 1.0);
var backgroundGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", gradientTop, gradientBottom);
objc_msgSend(backgroundGradient, "drawInRect:angle:", NSMakeRect(rect.origin.x,rect.origin.y,rect.size.width,rect.size.height), 0);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1), "set");
var topBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topBorder, "moveToPoint:", NSMakePoint(rect.origin.x,rect.origin.y + rect.size.height - 0.5));
objc_msgSend(topBorder, "lineToPoint:", NSMakePoint(rect.origin.x + rect.size.width,rect.origin.y + rect.size.height - 0.5));
objc_msgSend(topBorder, "stroke");
if (_tableView)
{
var tableColumns = objc_msgSend(_tableView, "tableColumns");
var count = objc_msgSend(tableColumns, "count");
var spacing = objc_msgSend(_tableView, "intercellSpacing");
var columnRect = NSMakeRect(_bounds.origin.x,_bounds.origin.y,_bounds.size.width,_bounds.size.height);
/* for statement needs to go here*/
}

}, "void");

class_addMethod(the_class, "headerRectOfColumn:", function(self, _cmd, columnIndex) {
}, "void");

