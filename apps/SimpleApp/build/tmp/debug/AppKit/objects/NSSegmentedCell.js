var the_class = objc_allocateClassPair(NSCell, "NSSegmentedCell");
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

class_addMethod(the_class, "makeNextSegmentKey", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makePreviousSegmentKey", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTrackingMode:", function(self, _cmd, trackingMode) {
with(self) {
}
}, "void");

class_addMethod(the_class, "trackingMode", function(self, _cmd) {
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

class_addMethod(the_class, "setMenu:forSegment:", function(self, _cmd, menu, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "menuForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setToolTip:forSegment:", function(self, _cmd, toolTip, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "toolTipForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTag:forSegment:", function(self, _cmd, tag, segment) {
with(self) {
}
}, "void");

class_addMethod(the_class, "tagForSegment:", function(self, _cmd, segment) {
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

class_addMethod(the_class, "drawSegment:inFrame:withView:", function(self, _cmd, segment, frame, controlView) {
with(self) {
}
}, "void");

var the_class = NSSegmentedCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "interiorBackgroundStyleForSegment:", function(self, _cmd, segment) {
with(self) {
}
}, "void");

