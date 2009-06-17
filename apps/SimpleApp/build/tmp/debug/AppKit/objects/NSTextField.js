var the_class = objc_allocateClassPair(NSControl, "NSTextField");
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

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
return self;
}
}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
with(self) {
if (context == "value")
{
objc_msgSend(_cell, "setValue:", objc_msgSend(object, "valueForKeyPath:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "hidden")
{
objc_msgSend(_cell, "setHidden:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "enabled")
{
objc_msgSend(_cell, "setEnabled:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "editable")
{
objc_msgSend(_cell, "setEditable:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
{
objc_msgSendSuper({super_class:NSControl, receiver:self}, "observeValueForKeyPath:ofObject:change:context:", keyPath, object, change, context);

}




}
}, "void");

class_addMethod(the_class, "becomeFirstResponder", function(self, _cmd) {
with(self) {
objc_msgSend(self, "selectText:", null);
return YES;
}
}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
with(self) {
return YES;
}
}, "void");

class_addMethod(the_class, "selectText:", function(self, _cmd, sender) {
with(self) {
if (!objc_msgSend(_cell, "isEnabled"))
return ;

if (objc_msgSend(_cell, "isSelectable") || objc_msgSend(_cell, "isEditable"))
{
if (!_currentEditor)
{
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
_currentEditor = objc_msgSend(_cell, "setUpFieldEditorAttributes:", _currentEditor);

}

objc_msgSend(_cell, "selectWithFrame:inView:editor:delegate:start:length:", _bounds, self, _currentEditor, self, 0, 0);

}

}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
if (!objc_msgSend(_cell, "isEnabled"))
return ;

if (objc_msgSend(_cell, "isSelectable") || objc_msgSend(_cell, "isEditable"))
{
if (!_currentEditor)
{
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
NSLog(_currentEditor);
_currentEditor = objc_msgSend(_cell, "setUpFieldEditorAttributes:", _currentEditor);
NSLog(_currentEditor);

}

NSLog("Finished loop");
objc_msgSend(_cell, "setHighlighted:", YES);
NSLog("Yarp");
objc_msgSend(_cell, "editWithFrame:inView:editor:delegate:event:", _bounds, self, _currentEditor, self, theEvent);
NSLog("Hermmm");

}

}
}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
with(self) {
objc_msgSend(_cell, "setHighlighted:", NO);
objc_msgSend(self, "setNeedsDisplay:", YES);
if (objc_msgSend(_cell, "action") && objc_msgSend(_cell, "target"))
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", objc_msgSend(_cell, "action"), objc_msgSend(_cell, "target"), self);

}
}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
with(self) {
if (_cell)
return objc_msgSend(_cell, "drawsBackground");

}
}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
with(self) {
if (_cell)
objc_msgSend(_cell, "setDrawsBackground:", flag);

objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
with(self) {
objc_msgSend(_cell, "setBezeled:", flag);
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "isBezeled");
}
}, "void");

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, style) {
with(self) {
objc_msgSend(_cell, "setBezelStyle:", style);
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
with(self) {
return objc_msgSend(_cell, "bezelStyle");
}
}, "void");

class_addMethod(the_class, "textDidEndEditing:", function(self, _cmd, aNotification) {
with(self) {
NSLog("first");
objc_msgSendSuper({super_class:NSControl, receiver:self}, "textDidEndEditing:", aNotification);
NSLog("second");
_currentEditor = null;
NSLog("third");
objc_msgSend(self, "lockFocus");
NSLog("fourth");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
NSLog("fifth");
objc_msgSend(self, "unlockFocus");
}
}, "void");

