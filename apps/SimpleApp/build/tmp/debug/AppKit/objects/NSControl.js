var NSControlTextDidBeginEditingNotification = "NSControlTextDidBeginEditingNotification";
var NSControlTextDidEndEditingNotification = "NSControlTextDidEndEditingNotification";
var NSControlTextDidChangeNotification = "NSControlTextDidChangeNotification";
var the_class = objc_allocateClassPair(NSView, "NSControl");
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

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
with(self) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
objc_msgSend(self, "setCell:", objc_msgSend(objc_msgSend(objc_msgSend(self, "cellClass"), "alloc"), "init"));

}

return self;
}
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
_cell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
objc_msgSend(self, "setFrame:", _frame);
return self;
}
}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "calcSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cell", function(self, _cmd) {
with(self) {
return _cell;
}
}, "void");

class_addMethod(the_class, "setCell:", function(self, _cmd, aCell) {
with(self) {
_cell = aCell;
objc_msgSend(_cell, "setControlView:", self);
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "selectedCell", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "target");
}
}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
with(self) {
objc_msgSend(_cell, "setTarget:", anObject);
}
}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "action");
}
}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
with(self) {
objc_msgSend(_cell, "setAction:", aSelector);
}
}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectedTag", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIgnoresMultiClick:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ignoresMultiClick", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
with(self) {
return _isEnabled;
}
}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
with(self) {
_isEnabled = flag;
}
}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "alignment");
}
}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
with(self) {
objc_msgSend(_cell, "setAlignment:", mode);
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {
with(self) {
}
}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {
with(self) {
objc_msgSend(_cell, "setObjectValue:", obj);
}
}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {
with(self) {
objc_msgSend(_cell, "setStringValue:", aString);
}
}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {
with(self) {
objc_msgSend(_cell, "setIntValue:", anInt);
}
}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {
with(self) {
objc_msgSend(_cell, "setFloatValue:", aFloat);
}
}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {
with(self) {
objc_msgSend(_cell, "setDoubleValue:", aDouble);
}
}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "objectValue");
}
}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "stringValue");
}
}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "intValue");
}
}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "floatValue");
}
}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "doubleValue");
}
}, "void");

class_addMethod(the_class, "setNeedsDisplay", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateCell:", function(self, _cmd, aCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateCellInside:", function(self, _cmd, aCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawCellInside:", function(self, _cmd, aCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawCell:", function(self, _cmd, aCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectCell:", function(self, _cmd, aCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
if (_cell)
objc_msgSend(_cell, "drawWithFrame:inView:", objc_msgSend(self, "bounds"), self);

}
}, "void");

class_addMethod(the_class, "sendAction:to:", function(self, _cmd, theAction, theTarget) {
with(self) {
if (theAction && theTarget)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", theAction, theTarget, self);
return YES;

}

return NO;
}
}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "currentEditor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "abortEditing", function(self, _cmd) {
with(self) {
if (_currentEditor)
{
objc_msgSend(objc_msgSend(self, "window"), "endEditingFor:", self);
_currentEditor = null;

}

return NO;
}
}, "void");

class_addMethod(the_class, "validateEditing", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
if (!objc_msgSend(self, "isEnabled"))
return ;

objc_msgSend(self, "lockFocus");
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
if (NSPointInRect(location,_bounds))
objc_msgSend(_cell, "highlight:withFrame:inView:", YES, _bounds, self);

objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (4 | 32), null, null, null, self, "selector:");
objc_msgSend(self, "unlockFocus");
}
}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
with(self) {
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
if (NSPointInRect(location,_bounds))
{
if (objc_msgSend(theEvent, "type") == 2)
{
objc_msgSend(self, "sendAction:to:", objc_msgSend(self, "action"), objc_msgSend(self, "target"));
objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");
return ;

}
else
if (objc_msgSend(theEvent, "type") == 5)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (4 | 32), null, null, null, self, "selector:");
return ;

}



}

objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");
}
}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {
with(self) {
}
}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "setCellClass:", function(self, _cmd, factoryId) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "cellClass", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "controlTextDidBeginEditing:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "controlTextDidEndEditing:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "controlTextDidChange:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

