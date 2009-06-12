var the_class = objc_allocateClassPair(NSView, "NSScrollView");
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
class_addIvar(the_class, "_verticalScroller", "NSView");
class_addIvar(the_class, "_horizontalScroller", "NSView");
class_addIvar(the_class, "_clipView", "NSView");
class_addIvar(the_class, "_headerClipView", "NSView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_hasVerticalScroller", "BOOL");
class_addIvar(the_class, "_hasHorizontalScroller", "BOOL");
class_addIvar(the_class, "_borderType", "NSInteger");
class_addIvar(the_class, "_contentView", "NSView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSsFlags");
if (flags & 0x10)
_hasVerticalScroller = YES;
else
_hasVerticalScroller = NO;

if (flags & 0x20)
_hasHorizontalScroller = YES;
else
_hasHorizontalScroller = NO;

_borderType = flags & 0x303;
_verticalScroller = objc_msgSend(aCoder, "decodeObjectForKey:", "NSVScroller");
_horizontalScroller = objc_msgSend(aCoder, "decodeObjectForKey:", "NSHScroller");
_clipView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSContentView");
_headerClipView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderClipView");
_cornerView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCornerView");
NSLog(_subviews);
objc_msgSend(self, "tile");
return self;
}
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
with(self) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
_contentView = objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", NSMakeRect(0,0,0,0));
return self;
}
}, "void");

class_addMethod(the_class, "resizeSubviewsWithOldSize:", function(self, _cmd, oldBoundsSize) {
with(self) {
objc_msgSend(self, "tile");
}
}, "void");

class_addMethod(the_class, "tile", function(self, _cmd) {
with(self) {
var tilingFrame = {origin:{x:0,y:0,},size:{width:0,height:0,},};
if (_headerClipView)
{
NSLog("got header clip view");
tilingFrame = NSMakeRect(1,_frame.size.height - objc_msgSend(_headerClipView, "bounds").size.height,_frame.size.width,objc_msgSend(_headerClipView, "bounds").size.height);
objc_msgSend(_headerClipView, "setFrame:", tilingFrame);

}

if (_clipView)
{
NSLog("got clip view");
tilingFrame = NSMakeRect(1,1,_frame.size.width,objc_msgSend(_clipView, "bounds").size.height);
objc_msgSend(_clipView, "setFrame:", tilingFrame);

}

}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
with(self) {
}
}, "void");

