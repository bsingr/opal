var the_class = objc_allocateClassPair(NSControl, "NSColorWell");
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
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
_value = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0.3, 0.8, 1.0);
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
return self;
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, sender) {
with(self) {
NSLog("NSColorWell - orderFront color picker");
}
}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, bounds) {
with(self) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(bounds.origin.x + 0.5,bounds.origin.y + 0.5,bounds.origin.x + bounds.size.width - 1,bounds.origin.y + bounds.size.height - 1));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.996, 0.996, 0.996, 1.0), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(bounds.origin.x + 1,bounds.origin.y + 1,bounds.origin.x + bounds.size.width - 2,bounds.origin.y + bounds.size.height - 2));
objc_msgSend(_value, "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(bounds.origin.x + 4,bounds.origin.y + 4,bounds.origin.x + bounds.size.width - 8,bounds.origin.y + bounds.size.height - 8));
}
}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
with(self) {
if (context == "value")
{
_value = objc_msgSend(object, "valueForKey:", keyPath);
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "hidden")
{
objc_msgSend(_cell, "setHidden:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "enabled")
{
objc_msgSend(_cell, "setEnabled:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
{
objc_msgSendSuper({super_class:NSControl, receiver:self}, "observeValueForKeyPath:ofObject:change:context:", keyPath, object, change, context);

}



}
}, "void");

