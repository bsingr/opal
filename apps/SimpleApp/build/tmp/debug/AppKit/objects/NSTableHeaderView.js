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
class_addIvar(the_class, "_DOMContainer", "CGDOMElementRef");
class_addIvar(the_class, "_DOMGraphicsContext", "CGDOMElementRef");
class_addIvar(the_class, "_graphicsContext", "CGContextRef");
class_addIvar(the_class, "_tableView", "NSTableView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
_tableView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSTableView");
NSLog("Decoded table view:");
NSLog(_tableView);
return self;
}
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
with(self) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{

}

return self;
}
}, "void");

class_addMethod(the_class, "setTableView:", function(self, _cmd, aTableView) {
with(self) {
_tableView = aTableView;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "tableView", function(self, _cmd) {
with(self) {
return _tableView;
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
with(self) {
NSLog("Drawing");
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
CGContextSetFillColorWithColor(c,CGColorCreateGenericRGB(1,0,0,1.0));
CGContextFillRect(c,rect);
CGContextRestoreGState(c);
NSLog(rect);
NSLog(_bounds);
}
}, "void");

class_addMethod(the_class, "headerRectOfColumn:", function(self, _cmd, columnIndex) {
with(self) {
}
}, "void");

