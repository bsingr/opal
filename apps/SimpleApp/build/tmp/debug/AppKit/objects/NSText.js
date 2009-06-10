var the_class = objc_allocateClassPair(NSView, "NSText");
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
class_addIvar(the_class, "_string", "NSString");
class_addIvar(the_class, "_backgroundColor", "NSColor");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isFieldEditor", "BOOL");
class_addIvar(the_class, "_isRichText", "BOOL");
class_addIvar(the_class, "_importsGraphics", "BOOL");
class_addIvar(the_class, "_usesFontPanel", "BOOL");
class_addIvar(the_class, "_selectedRange", "NSRange");
class_addIvar(the_class, "_font", "NSFont");
class_addIvar(the_class, "_textAlignment", "NSTextAlignment");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_gCanvas", "CGContextRef");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
with(self) {
_delegate = anObject;
}
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, aFrame) {
with(self) {
objc_msgSend(self, "init");
_frame = aFrame;
_bounds = NSMakeRect(0,0,_frame.size.width,_frame.size.height);
_gCanvas = NSWindowServerCreateCanvas(self);
_subviews = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
return self;
}
}, "void");

