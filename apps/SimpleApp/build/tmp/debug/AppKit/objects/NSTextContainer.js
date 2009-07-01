var the_class = objc_allocateClassPair(NSObject, "NSTextContainer");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_layoutManager", "NSLayoutManager");
class_addIvar(the_class, "_textView", "NSTextView");
class_addIvar(the_class, "_size", "NSSize");
class_addIvar(the_class, "_lineFragmentPadding", "CGFloat");

class_addMethod(the_class, "initWithContainerSize:", function(self, _cmd, size) {
with(self) {
_size = size;
_textView = null;
_layoutManager = null;
return self;
}
}, "void");

class_addMethod(the_class, "layoutManager", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLayoutManager:", function(self, _cmd, layoutManager) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceLayoutManager:", function(self, _cmd, newLayoutManager) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textView", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTextView:", function(self, _cmd, textView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWidthTracksTextView:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "widthTracksTextView", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHeightTracksTextView:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "heightTracksTextView", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContainerSize:", function(self, _cmd, size) {
with(self) {
}
}, "void");

class_addMethod(the_class, "containerSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLineFragmentPadding:", function(self, _cmd, pad) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineFragmentPadding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineFragmentRectForProposedRect:sweepDirection:movementDirection:remainingRect:", function(self, _cmd, proposedRect, sweepDirection, movementDirection, remainingRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isSimpleRectangularTextContainer", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "containsPoint:", function(self, _cmd, point) {
with(self) {
}
}, "void");

