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
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
if (objc_msgSend(self, "isEditable"))
{
_frame.origin.x = _frame.origin.x - 3;
_frame.origin.y = _frame.origin.y - 3;
_frame.size.width = _frame.size.width + 6;
_frame.size.height = _frame.size.height + 6;
objc_msgSend(self, "setFrame:", _frame);

}

return self;
}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
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




}, "void");

class_addMethod(the_class, "becomeFirstResponder", function(self, _cmd) {
objc_msgSend(self, "selectText:", null);
return YES;
}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
return YES;
}, "void");

class_addMethod(the_class, "selectText:", function(self, _cmd, sender) {
NSLog("oh yeah");
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

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
NSLog("hmm");
if (!objc_msgSend(_cell, "isEnabled"))
return ;

if (objc_msgSend(_cell, "isSelectable") || objc_msgSend(_cell, "isEditable"))
{
if (!_currentEditor)
{
NSLog("first one");
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
NSLog("second one");
_currentEditor = objc_msgSend(_cell, "setUpFieldEditorAttributes:", _currentEditor);

}

objc_msgSend(_cell, "setHighlighted:", YES);
objc_msgSend(_cell, "editWithFrame:inView:editor:delegate:event:", _bounds, self, _currentEditor, self, theEvent);

}

}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_cell, "setHighlighted:", NO);
objc_msgSend(self, "setNeedsDisplay:", YES);
if (objc_msgSend(_cell, "action") && objc_msgSend(_cell, "target"))
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", objc_msgSend(_cell, "action"), objc_msgSend(_cell, "target"), self);

}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
if (_cell)
return objc_msgSend(_cell, "drawsBackground");

}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
if (_cell)
objc_msgSend(_cell, "setDrawsBackground:", flag);

objc_msgSend(self, "setNeedsDisplay:", YES);
}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
objc_msgSend(_cell, "setBezeled:", flag);
objc_msgSend(self, "setNeedsDisplay:", YES);
}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
return objc_msgSend(_cell, "isBezeled");
}, "void");

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, style) {
objc_msgSend(_cell, "setBezelStyle:", style);
objc_msgSend(self, "setNeedsDisplay:", YES);
}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
return objc_msgSend(_cell, "bezelStyle");
}, "void");

class_addMethod(the_class, "textDidEndEditing:", function(self, _cmd, aNotification) {
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
}, "void");

