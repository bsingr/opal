var the_class = objc_allocateClassPair(NSControl, "NSScroller");
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
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_isVertical", "BOOL");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
if (Unhandled output_expression: [<(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]])
_isVertical = YES;
else
_isVertical = NO;

return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithFrame:", frameRect);
if (self)
{

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.4, 0.5, 0.4, 1), "set");
objc_msgSend(NSBezierPath, "fillRect:", rect);

}, "void");

class_addMethod(the_class, "isVertical", function(self, _cmd) {
return _isVertical;

}, "void");

