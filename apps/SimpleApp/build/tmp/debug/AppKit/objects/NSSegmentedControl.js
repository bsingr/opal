var the_class = objc_allocateClassPair(NSControl, "NSSegmentedControl");
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

class_addMethod(the_class, "setSegmentCount:", function(self, _cmd, count) {
with(self) {
}
}, "void");

class_addMethod(the_class, "segmentCount", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSelectedSegment:", function(self, _cmd, selectedSegment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectedSegment", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectSegmentWithTag:", function(self, _cmd, tag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWidth:forSegment:", function(self, _cmd, width, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "widthForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImage:forSegment:", function(self, _cmd, image, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImageScaling:forSegment:", function(self, _cmd, scaling, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageScalingForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLabel:forSegment:", function(self, _cmd, label, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "labelForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMenu:forSegment:", function(self, _cmd, menu, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "menuForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSelected:forSegment:", function(self, _cmd, selected, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isSelectedForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setEnabled:forSegment:", function(self, _cmd, enabled, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEnabledForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSegmentStyle:", function(self, _cmd, segmentStyle) {
with(self) {
}
}, "void");

class_addMethod(the_class, "segmentStyle", function(self, _cmd) {
with(self) {
}
}, "void");

