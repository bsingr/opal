var the_class = objc_allocateClassPair(NSTextFieldCell, "NSTableHeaderCell");
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
class_addIvar(the_class, "_placeholderString", "NSString");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_bezeled", "BOOL");
class_addIvar(the_class, "_bezelStyle", "NSUInteger");
class_addIvar(the_class, "_gBorderType", "NSUInteger");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSTextFieldCell, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeObjectForKey:", "NSContents");
return self;
}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
NSLog("Drawing table header cell");
CGContextFillRect(c,CGRectMake(0,0,10000,10000));
CGContextRestoreGState(c);
}
}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "highlight:withFrame:inView:", function(self, _cmd, flag, cellFrame, controlView) {
with(self) {
}
}, "void");

