var the_class = objc_allocateClassPair(NSControl, "NSSlider");
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
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, aFrame) {
with(self) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithFrame:", aFrame);
if (self)
{

}

return self;
}
}, "void");

var the_class = objc_allocateClassPair(NSCell, "NSSliderCell");
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

