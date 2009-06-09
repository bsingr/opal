var the_class = objc_allocateClassPair(NSCell, "NSButtonCell");
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

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSButtonFlags");
var flags2 = objc_msgSend(aCoder, "decodeIntForKey:", "NSButtonFlags2");
_isBordered = (flags & 0x00800000) ? YES : NO;
_bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
return self;
}
}, "void");

