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

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
if (!_isEnabled)
CGContextSetAlpha(c,0.8);

var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalLeft.png");
CGContextDrawImage(c,CGRectMake(0,8,5,5),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalMiddle.png");
CGContextDrawImage(c,CGRectMake(5,8,cellFrame.size.width - 10,5),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalRight.png");
CGContextDrawImage(c,CGRectMake(cellFrame.size.width - 5,8,5,5),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalKnobNormal.png");
CGContextDrawImage(c,CGRectMake(20,2,17,17),theImage);
CGContextRestoreGState(c);
}
}, "void");

class_addMethod(meta_class, "load", function(self, _cmd) {
with(self) {
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalLeft","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalMiddle","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalRight","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalKnobNormal","png","");
}
}, "void");

