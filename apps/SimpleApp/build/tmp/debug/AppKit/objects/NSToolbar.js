var the_class = objc_allocateClassPair(NSObject, "NSToolbar");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_identifier", "NSString");
class_addIvar(the_class, "_displayMode", "NSToolbarDisplayMode");
class_addIvar(the_class, "_showsBaselineSeparator", "BOOL");
class_addIvar(the_class, "_visible", "BOOL");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_toolbarView", "NSView");
class_addIvar(the_class, "_itemIdentifiers", "NSMutableArray");
class_addIvar(the_class, "_items", "NSMutableArray");
class_addIvar(the_class, "_labels", "NSMutableArray");
class_addIvar(the_class, "_height", "NSUInteger");

class_addMethod(the_class, "initWithIdentifier:", function(self, _cmd, identifier) {
objc_msgSend(self, "init");
if (self)
{
_toolbarView = objc_msgSend(objc_msgSend(NSToolbarView, "alloc"), "initWithFrame:", NSMakeRect(0,0,10,10));
_identifier = identifier;
_visible = YES;
_items = objc_msgSend(objc_msgSend(NSMutableArray, "alloc"), "initWithCapacity:", 0);
_labels = objc_msgSend(objc_msgSend(NSMutableArray, "alloc"), "initWithCapacity:", 0);

}

return self;
}, "void");

class_addMethod(the_class, "height", function(self, _cmd) {
return _height;
}, "void");

class_addMethod(the_class, "reloadToolbarItems", function(self, _cmd) {
if (objc_msgSend(_delegate, "respondsToSelector:", "selector:"))
_itemIdentifiers = objc_msgSend(_delegate, "toolbarDefaultItemIdentifiers:", self);
else
_itemIdentifiers = null;

var totalItems = objc_msgSend(_itemIdentifiers, "count");
var i;
/* for statement needs to go here*/}, "void");

class_addMethod(the_class, "displayMode", function(self, _cmd) {
return _displayMode;
}, "void");

class_addMethod(the_class, "setDisplayMode:", function(self, _cmd, displayMode) {
_displayMode = displayMode;
_height = 56;
}, "void");

class_addMethod(the_class, "showsBaselineSeparator", function(self, _cmd) {
return _showsBaselineSeparator;
}, "void");

class_addMethod(the_class, "setShowsBaselineSeparator:", function(self, _cmd, flag) {
_showsBaselineSeparator = flag;
}, "void");

class_addMethod(the_class, "identifier", function(self, _cmd) {
return _identifier;
}, "void");

class_addMethod(the_class, "items", function(self, _cmd) {
return _items;
}, "void");

class_addMethod(the_class, "visibleItems", function(self, _cmd) {
return _items;
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
return _delegate;
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, delegate) {
_delegate = delegate;
objc_msgSend(self, "reloadToolbarItems");
}, "void");

class_addMethod(the_class, "insertItemWithItemIdentifier:atIndex:", function(self, _cmd, itemIdentifier, index) {
}, "void");

class_addMethod(the_class, "removeItemAtIndex:", function(self, _cmd, index) {
}, "void");

class_addMethod(the_class, "setSelectedItemIdentifier:", function(self, _cmd, itemIdentifier) {
}, "void");

class_addMethod(the_class, "selectedItemIdentifier", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "isVisible", function(self, _cmd) {
return _visible;
}, "void");

class_addMethod(the_class, "setVisible:", function(self, _cmd, shown) {
_visible = shown;
}, "void");

class_addMethod(the_class, "toolbarView", function(self, _cmd) {
return _toolbarView;
}, "void");

var the_class = objc_allocateClassPair(NSView, "NSToolbarView");
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
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "name", "NSString");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
objc_msgSend(self, "setFrameSize:", NSMakeSize(300,56));

}

return self;
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
var bottomPath = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomPath, "setLineWidth:", 1);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.322, 0.322, 0.322, 1.0), "set");
objc_msgSend(bottomPath, "moveToPoint:", NSMakePoint(0,_frame.size.height));
objc_msgSend(bottomPath, "lineToPoint:", NSMakePoint(_frame.size.width,_frame.size.height));
objc_msgSend(bottomPath, "stroke");
}, "void");

