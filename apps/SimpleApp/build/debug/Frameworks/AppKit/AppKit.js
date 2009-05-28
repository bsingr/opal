var the_class = objc_allocateClassPair(NSView, "_NSCornerView");
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

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frame) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frame);
if (self)
{

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {

}, "void");

var the_class = objc_allocateClassPair(NSResponder, "NSApplication");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_windows", "NSMutableArray");
class_addIvar(the_class, "_currentEvent", "NSEvent");
class_addIvar(the_class, "_eventQueue", "NSMutableArray");
class_addIvar(the_class, "_eventBindingQueued", "BOOL");
class_addIvar(the_class, "_eventBindingTarget", "id");
class_addIvar(the_class, "_eventBindingSelector", "SEL");
class_addIvar(the_class, "_eventBindingMask", "NSUInteger");
class_addIvar(the_class, "_menuBar", "NSMenuBar");

class_addMethod(the_class, "init", function(self, _cmd) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{
_windows = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_eventQueue = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_eventBindingQueued = NO;
var mainBundle = objc_msgSend(NSBundle, "mainBundle");
var productName = objc_msgSend(mainBundle, "objectForInfoDictionaryKey:", "CFBundleName");
var menuBarRect = NSMakeRect(0Unhandled output_expression: [-(), [.(.), [.(.), [M(), [M(), NSScreen (TYPE_NAME), mainScreen (IDENTIFIER)], frame (IDENTIFIER)], size (IDENTIFIER)], height (IDENTIFIER)], [M(), NSMenu (TYPE_NAME), menuBarHeight (IDENTIFIER)]]objc_msgSend(objc_msgSend(NSScreen, "mainScreen"), "frame").size.widthobjc_msgSend(NSMenu, "menuBarHeight"));
_menuBar = objc_msgSend(objc_msgSend(NSMenuBar, "alloc"), "initWithContentRect:styleMask:backing:defer:", menuBarRect, 0, nil, NO);
objc_msgSend(_menuBar, "setLevel:", 10);
return self;

}


}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
if (Unhandled output_expression: [EQ_OP(), _delegate (IDENTIFIER), anObject (IDENTIFIER)])
return ;

var nc = objc_msgSend(NSNotificationCenter, "defaultCenter");
_delegate = anObject;

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
return _delegate;

}, "void");

class_addMethod(the_class, "context", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "windowWithWindowNumber:", function(self, _cmd, windowNum) {
return objc_msgSend(_windows, "objectAtIndex:", windowNum);

}, "void");

class_addMethod(the_class, "mainWindow", function(self, _cmd) {
Unhandled output_statement_list: FOR (FOR)return nil;

}, "void");

class_addMethod(the_class, "keyWindow", function(self, _cmd) {
Unhandled output_statement_list: FOR (FOR)return nil;

}, "void");

class_addMethod(the_class, "isRunning", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "finishLaunching", function(self, _cmd) {
var nc = objc_msgSend(NSNotificationCenter, "defaultCenter");

}, "void");

class_addMethod(the_class, "run", function(self, _cmd) {
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "finishLaunching");

}, "void");

class_addMethod(the_class, "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", function(self, _cmd, mask, expiration, mode, deqFlag, aTarget, aSelector) {
_eventBindingQueued = YES;
_eventBindingTarget = aTarget;
_eventBindingSelector = aSelector;
_eventBindingMask = mask;

}, "void");

class_addMethod(the_class, "discardEventsMatchingMask:beforeEvent:", function(self, _cmd, mask, lastEvent) {

}, "void");

class_addMethod(the_class, "postEvent:atStart:", function(self, _cmd, event, flag) {
objc_msgSend(self, "sendEvent:", event);

}, "void");

class_addMethod(the_class, "currentEvent", function(self, _cmd) {
return _currentEvent;

}, "void");

class_addMethod(the_class, "sendEvent:", function(self, _cmd, theEvent) {
_currentEvent = theEvent;
if (_eventBindingQueued)
{
if (Unhandled output_expression: [NE_OP(), [((), [&(), [((), [LEFT_OP(), 1 (CONSTANT), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)]], ], _eventBindingMask (IDENTIFIER)], ], 0 (CONSTANT)])
{
_eventBindingQueued = NO;
objc_msgSend(_eventBindingTarget, "performSelector:withObject:", _eventBindingSelector, theEvent);

}
else
{

}

return ;

}

if (Unhandled output_expression: [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSLeftMouseDown (IDENTIFIER)])
objc_msgSend(objc_msgSend(theEvent, "window"), "makeKeyAndOrderFront:", self);
else
if (Unhandled output_expression: [OR_OP(), [((), [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSKeyDown (IDENTIFIER)], ], [((), [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSKeyUp (IDENTIFIER)], ]])
objc_msgSend(objc_msgSend(self, "keyWindow"), "sendEvent:", theEvent);
else
objc_msgSend(objc_msgSend(theEvent, "window"), "sendEvent:", theEvent);



}, "void");

class_addMethod(the_class, "preventWindowOrdering", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeWindowsPerform:inOrder:", function(self, _cmd, aSelector, flag) {

}, "void");

class_addMethod(the_class, "windows", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setWindowsNeedUpdate:", function(self, _cmd, needUpdate) {

}, "void");

class_addMethod(the_class, "updateWindows", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMainMenu:", function(self, _cmd, aMenu) {

}, "void");

class_addMethod(the_class, "mainMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setApplicationIconImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "applicationIconImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sendAction:to:from:", function(self, _cmd, theAction, theTarget, sender) {

}, "void");

class_addMethod(the_class, "targetForAction:", function(self, _cmd, theAction) {

}, "void");

class_addMethod(the_class, "targetForAction:to:from:", function(self, _cmd, theAction, theTarget, sender) {

}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {

}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {

}, "void");

class_addMethod(the_class, "reportException:", function(self, _cmd, theException) {

}, "void");

class_addMethod(meta_class, "sharedApplication", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "detachDrawingThread:toTarget:withObject:", function(self, _cmd, selector, target, argument) {

}, "void");

var the_class = NSApplication;
var meta_class = the_class.isa;

class_addMethod(the_class, "setWindowsMenu:", function(self, _cmd, aMenu) {

}, "void");

class_addMethod(the_class, "windowsMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "arrangeInFront:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "removeWindowsItem:", function(self, _cmd, win) {

}, "void");

class_addMethod(the_class, "addWindowsItem:title:filename:", function(self, _cmd, win, aString, isFilename) {

}, "void");

class_addMethod(the_class, "changeWindowsItem:title:filename:", function(self, _cmd, win, aString, isFilename) {

}, "void");

class_addMethod(the_class, "updateWindowsItem:", function(self, _cmd, win) {

}, "void");

class_addMethod(the_class, "miniaturizeAll:", function(self, _cmd, sender) {

}, "void");

var the_class = NSApplication;
var meta_class = the_class.isa;

class_addMethod(the_class, "orderFrontStandardAboutPanel:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderFrontStandardAboutPanelWithOptions:", function(self, _cmd, optionsDictionary) {

}, "void");

var the_class = objc_allocateClassPair(NSControl, "NSButton");
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

class_addMethod(the_class, "title", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "alternateTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlternateTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "alternateImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlternateImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "imagePosition", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImagePosition:", function(self, _cmd, aPosition) {

}, "void");

class_addMethod(the_class, "setButtonType:", function(self, _cmd, aType) {

}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, value) {

}, "void");

class_addMethod(the_class, "isBordered", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBordered:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isTransparent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTransparent:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "setPeriodicDelay:interval:", function(self, _cmd, delay, interval) {

}, "void");

class_addMethod(the_class, "getPeriodicDelay:interval:", function(self, _cmd, delay, interval) {

}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyEquivalent:", function(self, _cmd, charCode) {

}, "void");

class_addMethod(the_class, "keyEquivalentModifierMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyEquivalentModifierMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "highlight:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, key) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "attributedAlternateTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedAlternateTitle:", function(self, _cmd, obj) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, bezelStyle) {

}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setAllowsMixedState:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "allowsMixedState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNextState", function(self, _cmd) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setShowsBorderOnlyWhileMouseInside:", function(self, _cmd, show) {

}, "void");

class_addMethod(the_class, "showsBorderOnlyWhileMouseInside", function(self, _cmd) {

}, "void");

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

var the_class = objc_allocateClassPair(NSObject, "NSCell");
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

class_addMethod(the_class, "initTextCell:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "initImageCell:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeStringForKey:", "NSContents");
var _flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags");
var _flags2 = objc_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags2");
_state = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x80000000 (CONSTANT)], ] ? 1 : 0;
_isHighlighted = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x40000000 (CONSTANT)], ] ? YES : NO;
_isEnabled = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x20000000 (CONSTANT)], ] ? NO : YES;
_isEditable = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x10000000 (CONSTANT)], ] ? YES : NO;
_isBordered = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00800000 (CONSTANT)], ] ? YES : NO;
_isBezeled = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00400000 (CONSTANT)], ] ? YES : NO;
_isSelectable = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00200000 (CONSTANT)], ] ? YES : NO;
_isScrollable = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00100000 (CONSTANT)], ] ? YES : NO;
_alignment = Unhandled output_expression: [RIGHT_OP(), [((), [&(), flags2 (IDENTIFIER), 0x1c000000 (CONSTANT)], ], 26 (CONSTANT)];
_controlSize = Unhandled output_expression: [RIGHT_OP(), [((), [&(), flags2 (IDENTIFIER), 0xE0000 (CONSTANT)], ], 17 (CONSTANT)];
return self;

}, "void");

class_addMethod(the_class, "controlView", function(self, _cmd) {
return _controlView;

}, "void");

class_addMethod(the_class, "setControlView:", function(self, _cmd, view) {
_controlView = view;

}, "void");

class_addMethod(the_class, "type", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setType:", function(self, _cmd, aType) {

}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, value) {

}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return _target;

}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
_target = anObject;

}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return _action;

}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
_action = aSelector;

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {

}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isSelectable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSelectable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isBordered", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBordered:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isScrollable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setScrollable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isHighlighted", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHighlighted:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {

}, "void");

class_addMethod(the_class, "wraps", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setWraps:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {

}, "void");

class_addMethod(the_class, "entryType", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setEntryType:", function(self, _cmd, aType) {

}, "void");

class_addMethod(the_class, "isEntryAcceptable:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {

}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {

}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "hasValidObjectValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "compare:", function(self, _cmd, otherCell) {

}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {

}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {

}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {

}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "setControlTint:", function(self, _cmd, controlTint) {

}, "void");

class_addMethod(the_class, "controlTint", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setControlSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "controlSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "representedObject", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setRepresentedObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "cellAttribute:", function(self, _cmd, aParameter) {

}, "void");

class_addMethod(the_class, "setCellAttribute:to:", function(self, _cmd, aParameter, value) {

}, "void");

class_addMethod(the_class, "imageRectForBounds:", function(self, _cmd, theRect) {

}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, theRect) {
return theRect;

}, "void");

class_addMethod(the_class, "drawingRectForBounds:", function(self, _cmd, theRect) {

}, "void");

class_addMethod(the_class, "cellSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "cellSizeForBounds:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "highlightColorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "calcDrawInfo:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "setUpFieldEditorAttributes:", function(self, _cmd, textObj) {
objc_msgSend(textObj, "setAlignment:", objc_msgSend(self, "alignment"));
objc_msgSend(textObj, "setString:", objc_msgSend(self, "stringValue"));
objc_msgSend(textObj, "setSelectable:", objc_msgSend(self, "isSelectable"));
objc_msgSend(self, "setEditable:", objc_msgSend(self, "isEditable"));
if (objc_msgSend(self, "respondsToSelector:", Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), drawsBackground (IDENTIFIER), ]))
objc_msgSend(textObj, "setDrawsBackground:", objc_msgSend(self, "drawsBackground"));

if (objc_msgSend(self, "respondsToSelector:", Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), backgroundColor (IDENTIFIER), ]))
objc_msgSend(textObj, "setBackgroundColor:", objc_msgSend(self, "backgroundColor"));

return textObj;

}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);

}, "void");

class_addMethod(the_class, "highlight:withFrame:inView:", function(self, _cmd, flag, cellFrame, controlView) {
if (Unhandled output_expression: [NE_OP(), [M(), self (IDENTIFIER), isHighlighted (IDENTIFIER)], flag (IDENTIFIER)])
{
objc_msgSend(self, "setHighlighted:", flag);
objc_msgSend(self, "drawWithFrame:inView:", cellFrame, controlView);

}


}, "void");

class_addMethod(the_class, "mouseDownFlags", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "getPeriodicDelay:interval:", function(self, _cmd, delay, interval) {

}, "void");

class_addMethod(the_class, "startTrackingAt:inView:", function(self, _cmd, startPoint, controlView) {

}, "void");

class_addMethod(the_class, "continueTracking:at:inView:", function(self, _cmd, lastPoint, currentPoint, controlView) {

}, "void");

class_addMethod(the_class, "stopTracking:at:inView:mouseIsUp:", function(self, _cmd, lastPoint, stopPoint, controlView, flag) {

}, "void");

class_addMethod(the_class, "trackMouse:inRect:ofView:untilMouseUp:", function(self, _cmd, theEvent, cellFrame, controlView, flag) {

}, "void");

class_addMethod(the_class, "editWithFrame:inView:editor:delegate:event:", function(self, _cmd, aRect, controlView, textObj, anObject, theEvent) {
if (Unhandled output_expression: [AND_OP(), [,(), ! (!), _isEditable (IDENTIFIER)], [,(), ! (!), _isSelectable (IDENTIFIER)]])
return ;

objc_msgSend(textObj, "setFrame:", objc_msgSend(self, "titleRectForBounds:", aRect));
objc_msgSend(controlView, "addSubview:", textObj);
objc_msgSend(objc_msgSend(controlView, "window"), "makeFirstResponder:", textObj);
objc_msgSend(textObj, "setDelegate:", anObject);
objc_msgSend(textObj, "mouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "selectWithFrame:inView:editor:delegate:start:length:", function(self, _cmd, aRect, controlView, textObj, anObject, selStart, selLength) {
if (Unhandled output_expression: [AND_OP(), [,(), ! (!), _isEditable (IDENTIFIER)], [,(), ! (!), _isSelectable (IDENTIFIER)]])
return ;

objc_msgSend(textObj, "setFrame:", objc_msgSend(self, "titleRectForBounds:", aRect));
objc_msgSend(controlView, "addSubview:", textObj);
objc_msgSend(objc_msgSend(controlView, "window"), "makeFirstResponder:", textObj);
objc_msgSend(textObj, "setDelegate:", anObject);
objc_msgSend(textObj, "setSelectedRange:", nil);

}, "void");

class_addMethod(the_class, "endEditing:", function(self, _cmd, textObj) {
objc_msgSend(self, "setStringValue:", objc_msgSend(textObj, "string"));

}, "void");

class_addMethod(the_class, "resetCursorRect:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, aMenu) {

}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "menuForEvent:inRect:ofView:", function(self, _cmd, event, cellFrame, view) {

}, "void");

class_addMethod(the_class, "setSendsActionOnEndEditing:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "sendsActionOnEndEditing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {

}, "void");

class_addMethod(the_class, "setLineBreakMode:", function(self, _cmd, mode) {

}, "void");

class_addMethod(the_class, "lineBreakMode", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAllowsUndo:", function(self, _cmd, allowsUndo) {

}, "void");

class_addMethod(the_class, "allowsUndo", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {

}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "truncatesLastVisibleLine", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTruncatesLastVisibleLine:", function(self, _cmd, flag) {

}, "void");

class_addMethod(meta_class, "prefersTrackingUntilMouseUp", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultMenu", function(self, _cmd) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setShowsFirstResponder:", function(self, _cmd, showFR) {

}, "void");

class_addMethod(the_class, "showsFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMnemonicLocation:", function(self, _cmd, location) {

}, "void");

class_addMethod(the_class, "mnemonicLocation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "mnemonic", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {

}, "void");

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setFocusRingType:", function(self, _cmd, focusRingType) {

}, "void");

class_addMethod(the_class, "focusRingType", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "wantsNotificationForMarkedText", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultFocusRingType", function(self, _cmd) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "allowsEditingTextAttributes", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAllowsEditingTextAttributes:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "importsGraphics", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImportsGraphics:", function(self, _cmd, flag) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setAllowsMixedState:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "allowsMixedState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "nextState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNextState", function(self, _cmd) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "hitTestForEvent:inRect:ofView:", function(self, _cmd, event, cellFrame, controlView) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "expansionFrameWithFrame:inView:", function(self, _cmd, cellFrame, view) {

}, "void");

class_addMethod(the_class, "drawWithExpansionFrame:inView:", function(self, _cmd, cellFrame, view) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "backgroundStyle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBackgroundStyle:", function(self, _cmd, style) {

}, "void");

class_addMethod(the_class, "interiorBackgroundStyle", function(self, _cmd) {

}, "void");

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
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
objc_msgSend(self, "setCell:", objc_msgSend(objc_msgSend(objc_msgSend(self, "cellClass"), "alloc"), "init"));

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder");
_cell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
return self;

}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "calcSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "cell", function(self, _cmd) {
return _cell;

}, "void");

class_addMethod(the_class, "setCell:", function(self, _cmd, aCell) {
_cell = aCell;
objc_msgSend(_cell, "setControlView:", self);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "selectedCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return objc_msgSend(_cell, "target");

}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
objc_msgSend(_cell, "setTarget:", anObject);

}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return objc_msgSend(_cell, "action");

}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
objc_msgSend(_cell, "setAction:", aSelector);

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {

}, "void");

class_addMethod(the_class, "selectedTag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIgnoresMultiClick:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "ignoresMultiClick", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
return objc_msgSend(_cell, "isEnabled");

}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
objc_msgSend(_cell, "setEnabled:", flag);

}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {

}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
return objc_msgSend(_cell, "alignment");

}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
objc_msgSend(_cell, "setAlignment:", mode);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {

}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {

}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {
objc_msgSend(_cell, "setObjectValue:", obj);

}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {
objc_msgSend(_cell, "setStringValue:", aString);

}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {
objc_msgSend(_cell, "setIntValue:", anInt);

}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {
objc_msgSend(_cell, "setFloatValue:", aFloat);

}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {
objc_msgSend(_cell, "setDoubleValue:", aDouble);

}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {
return objc_msgSend(_cell, "objectValue");

}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {
return objc_msgSend(_cell, "stringValue");

}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
return objc_msgSend(_cell, "intValue");

}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
return objc_msgSend(_cell, "floatValue");

}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
return objc_msgSend(_cell, "doubleValue");

}, "void");

class_addMethod(the_class, "setNeedsDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "updateCell:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "updateCellInside:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "drawCellInside:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "drawCell:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "selectCell:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "sendAction:to:", function(self, _cmd, theAction, theTarget) {
if (Unhandled output_expression: [AND_OP(), theAction (IDENTIFIER), theTarget (IDENTIFIER)])
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", theAction, theTarget, self);
return YES;

}

return NO;

}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "currentEditor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "abortEditing", function(self, _cmd) {
if (_currentEditor)
{
objc_msgSend(objc_msgSend(self, "window"), "endEditingFor:", self);
_currentEditor = nil;

}

return NO;

}, "void");

class_addMethod(the_class, "validateEditing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), isEnabled (IDENTIFIER)]])
return ;

objc_msgSend(self, "lockFocus");
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), nil);
if (NSPointInRect(location_bounds))
objc_msgSend(_cell, "highlight:withFrame:inView:", YES, _bounds, self);

objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownHandle (IDENTIFIER), ]);
objc_msgSend(self, "unlockFocus");

}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), nil);
if (NSPointInRect(location_bounds))
{
if (Unhandled output_expression: [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSLeftMouseUp (IDENTIFIER)])
{
objc_msgSend(self, "sendAction:to:", objc_msgSend(self, "action"), objc_msgSend(self, "target"));
objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");
return ;

}
else
if (Unhandled output_expression: [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSMouseMoved (IDENTIFIER)])
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownHandle (IDENTIFIER), ]);
return ;

}



}

objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");

}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {

}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {

}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(meta_class, "setCellClass:", function(self, _cmd, factoryId) {

}, "void");

class_addMethod(meta_class, "cellClass", function(self, _cmd) {

}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {

}, "void");

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "controlTextDidBeginEditing:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "controlTextDidEndEditing:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "controlTextDidChange:", function(self, _cmd, obj) {

}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSResponder");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");

class_addMethod(the_class, "nextResponder", function(self, _cmd) {
return _nextResponder;

}, "void");

class_addMethod(the_class, "setNextResponder:", function(self, _cmd, aResponder) {
_nextResponder = aResponder;

}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {
if (objc_msgSend(self, "respondsToSelector:", anAction))
{
objc_msgSend(self, "performSelector:with:", anAction, anObject);
return YES;

}

return objc_msgSend(_nextResponder, "tryToPerform:with:", anAction, anObject);

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, theEvent) {
return NO;

}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "rightMouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "rightMouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "otherMouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "otherMouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseUp:", theEvent);

}, "void");

class_addMethod(the_class, "rightMouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "rightMouseUp:", theEvent);

}, "void");

class_addMethod(the_class, "otherMouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "otherMouseUp:", theEvent);

}, "void");

class_addMethod(the_class, "mouseMoved:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseMoved:", theEvent);

}, "void");

class_addMethod(the_class, "mouseDragged:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseDragged:", theEvent);

}, "void");

class_addMethod(the_class, "scrollWheel:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "scrollWheel:", theEvent);

}, "void");

class_addMethod(the_class, "rightMouseDragged:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "rightMouseDragged:", theEvent);

}, "void");

class_addMethod(the_class, "otherMouseDragged:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "otherMouseDragged:", theEvent);

}, "void");

class_addMethod(the_class, "mouseEntered:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseEntered:", theEvent);

}, "void");

class_addMethod(the_class, "mouseExited:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseExited:", theEvent);

}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "keyDown:", theEvent);

}, "void");

class_addMethod(the_class, "keyUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "keyUp:", theEvent);

}, "void");

class_addMethod(the_class, "flagsChanged:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "tabletPoint:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "tabletProximity:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "cursorUpdate:", function(self, _cmd, event) {

}, "void");

class_addMethod(the_class, "noResponderFor:", function(self, _cmd, eventSelector) {
if (Unhandled output_expression: [EQ_OP(), eventSelector (IDENTIFIER), [AT_SELECTOR(AT_SELECTOR), keyDown (IDENTIFIER), ]])
{

}


}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "becomeFirstResponder", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "resignFirstResponder", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "interpretKeyEvents:", function(self, _cmd, eventArray) {
var eventsCount = objc_msgSend(eventArray, "count");
Unhandled output_statement_list: FOR (FOR)
}, "void");

class_addMethod(the_class, "flushBufferedKeyEvents", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, menu) {

}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "showContextHelp:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "helpRequested:", function(self, _cmd, eventPtr) {

}, "void");

class_addMethod(the_class, "shouldBeTreatedAsInkEvent:", function(self, _cmd, theEvent) {

}, "void");

var the_class = NSResponder;
var meta_class = the_class.isa;

class_addMethod(the_class, "undoManager", function(self, _cmd) {

}, "void");

var the_class = NSResponder;
var meta_class = the_class.isa;

class_addMethod(the_class, "presentError:modalForWindow:delegate:didPresentSelector:contextInfo:", function(self, _cmd, error, window, delegate, didPresentSelector, contextInfo) {

}, "void");

class_addMethod(the_class, "presentError:", function(self, _cmd, error) {

}, "void");

class_addMethod(the_class, "willPresentError:", function(self, _cmd, error) {

}, "void");

var the_class = objc_allocateClassPair(NSResponder, "NSView");
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

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
self = objc_msgSend(self, "init");
if (self)
{
_frame = frameRect;
_bounds = NSMakeRect(00_frame.size.width_frame.size.height);
_subviews = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(self, "setFrame:", frameRect);

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSResponder, receiver:self}, "initWithCoder:", aCoder);
_frame = NSMakeRect(0000);
_bounds = NSMakeRect(0000);
if (objc_msgSend(aCoder, "containsValueForKey:", "NSFrame"))
_frame = objc_msgSend(aCoder, "decodeRectForKey:", "NSFrame");
else
if (objc_msgSend(aCoder, "containsValueForKey:", "NSFrameSize"))
_frame.size = objc_msgSend(aCoder, "decodeSizeForKey:", "NSFrameSize");


_bounds.origin = NSMakePoint(00);
_bounds.size = _frame.size;
_superview = nil;
_window = nil;

}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
return _window;

}, "void");

class_addMethod(the_class, "superview", function(self, _cmd) {
return _superview;

}, "void");

class_addMethod(the_class, "subviews", function(self, _cmd) {
return _subviews;

}, "void");

class_addMethod(the_class, "isDescendantOf:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "ancestorSharedWithView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "opaqueAncestor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHidden:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isHidden", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isHiddenOrHasHiddenAncestor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "getRectsBeingDrawn:count:", function(self, _cmd, rects, count) {

}, "void");

class_addMethod(the_class, "needsToDrawRect:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "wantsDefaultClipping", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewDidHide", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewDidUnhide", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSubviews:", function(self, _cmd, newSubviews) {

}, "void");

class_addMethod(the_class, "addSubview:", function(self, _cmd, aView) {
objc_msgSend(aView, "viewWillMoveToSuperview:", self);
objc_msgSend(aView, "viewWillMoveToWindow:", _window);
objc_msgSend(aView, "viewDidMoveToSuperview:", self);
objc_msgSend(aView, "viewDidMoveToWindow:", _window);
objc_msgSend(self, "didAddSubview:", aView);
objc_msgSend(_subviews, "addObject:", aView);

}, "void");

class_addMethod(the_class, "addSubview:positioned:relativeTo:", function(self, _cmd, aView, place, otherView) {

}, "void");

class_addMethod(the_class, "sortSubviewsUsingFunction:context:", function(self, _cmd, compare, context) {

}, "void");

class_addMethod(the_class, "viewWillMoveToWindow:", function(self, _cmd, newWindow) {

}, "void");

class_addMethod(the_class, "viewDidMoveToWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewWillMoveToSuperview:", function(self, _cmd, newSuperview) {

}, "void");

class_addMethod(the_class, "viewDidMoveToSuperview", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "didAddSubview:", function(self, _cmd, subview) {

}, "void");

class_addMethod(the_class, "willRemoveSubview:", function(self, _cmd, subview) {

}, "void");

class_addMethod(the_class, "removeFromSuperview", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "replaceSubview:with:", function(self, _cmd, oldView, newView) {

}, "void");

class_addMethod(the_class, "removeFromSuperviewWithoutNeedingDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setPostsFrameChangedNotifications:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "postsFrameChangedNotifications", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resizeSubviewsWithOldSize:", function(self, _cmd, oldSize) {

}, "void");

class_addMethod(the_class, "resizeWithOldSuperviewSize:", function(self, _cmd, oldSize) {

}, "void");

class_addMethod(the_class, "setAutoresizesSubviews:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "autoresizesSubviews", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutoresizingMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "autoresizingMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFrameOrigin:", function(self, _cmd, newOrigin) {

}, "void");

class_addMethod(the_class, "setFrameSize:", function(self, _cmd, newSize) {

}, "void");

class_addMethod(the_class, "setFrame:", function(self, _cmd, frameRect) {

}, "void");

class_addMethod(the_class, "frame", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFrameRotation:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "frameRotation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFrameCenterRotation:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "frameCenterRotation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBoundsOrigin:", function(self, _cmd, newOrigin) {

}, "void");

class_addMethod(the_class, "setBoundsSize:", function(self, _cmd, newSize) {

}, "void");

class_addMethod(the_class, "setBoundsRotation:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "boundsRotation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "translateOriginToPoint:", function(self, _cmd, translation) {

}, "void");

class_addMethod(the_class, "scaleUnitSquareToSize:", function(self, _cmd, newUnitSize) {

}, "void");

class_addMethod(the_class, "rotateByAngle:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "setBounds:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "bounds", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isFlipped", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isRotatedFromBase", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isRotatedOrScaledFromBase", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "convertPoint:fromView:", function(self, _cmd, aPoint, aView) {

}, "void");

class_addMethod(the_class, "convertPoint:toView:", function(self, _cmd, aPoint, aView) {

}, "void");

class_addMethod(the_class, "convertSize:fromView:", function(self, _cmd, aSize, aView) {

}, "void");

class_addMethod(the_class, "convertSize:toView:", function(self, _cmd, aSize, aView) {

}, "void");

class_addMethod(the_class, "convertRect:fromView:", function(self, _cmd, aRect, aView) {

}, "void");

class_addMethod(the_class, "convertRect:toView:", function(self, _cmd, aRect, aView) {

}, "void");

class_addMethod(the_class, "centerScanRect:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "convertPointToBase:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "convertPointFromBase:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "convertSizeToBase:", function(self, _cmd, aSize) {

}, "void");

class_addMethod(the_class, "convertSizeFromBase:", function(self, _cmd, aSize) {

}, "void");

class_addMethod(the_class, "convertRectToBase:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "convertRectFromBase:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "canDraw", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "setNeedsDisplayInRect:", function(self, _cmd, invalidRect) {

}, "void");

class_addMethod(the_class, "needsDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "lockFocus", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "unlockFocus", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "lockFocusIfCanDraw", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "lockFocusIfCanDrawInContext:", function(self, _cmd, context) {

}, "void");

class_addMethod(the_class, "visibleRect", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "display", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayIfNeeded", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayIfNeededIgnoringOpacity", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayIfNeededInRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayRectIgnoringOpacity:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayIfNeededInRectIgnoringOpacity:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayRectIgnoringOpacity:inContext:", function(self, _cmd, aRect, context) {

}, "void");

class_addMethod(the_class, "bitmapImageRepForCachingDisplayInRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "cacheDisplayInRect:toBitmapImageRep:", function(self, _cmd, rect, bitmapImageRep) {

}, "void");

class_addMethod(the_class, "viewWillDraw", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "graphicsContext", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "gState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "allocateGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "releaseGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setUpGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "renewGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "scrollPoint:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "scrollRectToVisible:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "autoscroll:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "adjustScroll:", function(self, _cmd, newVisible) {

}, "void");

class_addMethod(the_class, "scrollRect:by:", function(self, _cmd, aRect, delta) {

}, "void");

class_addMethod(the_class, "translateRectsNeedingDisplayInRect:by:", function(self, _cmd, clipRect, delta) {

}, "void");

class_addMethod(the_class, "hitTest:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "mouse:inRect:", function(self, _cmd, aPoint, aRect) {

}, "void");

class_addMethod(the_class, "viewWithTag:", function(self, _cmd, aTag) {

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "acceptsFirstMouse:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "shouldDelayWindowOrderingForEvent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "needsPanelToBecomeKey", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "mouseDownCanMoveWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addCursorRect:cursor:", function(self, _cmd, aRect, anObj) {

}, "void");

class_addMethod(the_class, "removeCursorRect:cursor:", function(self, _cmd, aRect, anObj) {

}, "void");

class_addMethod(the_class, "discardCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resetCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addTrackingRect:owner:userData:assumeInside:", function(self, _cmd, aRect, anObject, data, flag) {

}, "void");

class_addMethod(the_class, "removeTrackingRect:", function(self, _cmd, tag) {

}, "void");

class_addMethod(the_class, "setWantsLayer:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "wantsLayer", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setLayer:", function(self, _cmd, newLayer) {

}, "void");

class_addMethod(the_class, "layer", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlphaValue:", function(self, _cmd, viewAlpha) {

}, "void");

class_addMethod(the_class, "alphaValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBackgroundFilters:", function(self, _cmd, filters) {

}, "void");

class_addMethod(the_class, "backgroundFilters", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setCompositingFilter:", function(self, _cmd, filter) {

}, "void");

class_addMethod(the_class, "compositingFilter", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentFilters:", function(self, _cmd, filters) {

}, "void");

class_addMethod(the_class, "contentFilters", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setShadow:", function(self, _cmd, shadow) {

}, "void");

class_addMethod(the_class, "shadow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addTrackingArea:", function(self, _cmd, trackingArea) {

}, "void");

class_addMethod(the_class, "removeTrackingArea:", function(self, _cmd, trackingArea) {

}, "void");

class_addMethod(the_class, "trackingAreas", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "updateTrackingAreas", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "shouldDrawColor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setPostsBoundsChangedNotifications:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "postsBoundsChangedNotifications", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "enclosingScrollView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "menuForEvent:", function(self, _cmd, event) {

}, "void");

class_addMethod(the_class, "setToolTip:", function(self, _cmd, string) {

}, "void");

class_addMethod(the_class, "toolTip", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addToolTipRect:owner:userData:", function(self, _cmd, aRect, anObject, data) {

}, "void");

class_addMethod(the_class, "removeToolTip:", function(self, _cmd, tag) {

}, "void");

class_addMethod(the_class, "removeAllToolTips", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewWillStartLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewDidEndLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "inLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "preservesContentDuringLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "rectPreservedDuringLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "getRectsExposedDuringLiveResize:count:", function(self, _cmd, exposedRects, count) {

}, "void");

class_addMethod(meta_class, "focusView", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultMenu", function(self, _cmd) {

}, "void");

var the_class = NSView;
var meta_class = the_class.isa;

class_addMethod(the_class, "performMnemonic:", function(self, _cmd, theString) {

}, "void");

class_addMethod(the_class, "setNextKeyView:", function(self, _cmd, next) {

}, "void");

class_addMethod(the_class, "nextKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "previousKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "nextValidKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "previousValidKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canBecomeKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyboardFocusRingNeedsDisplayInRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "setFocusRingType:", function(self, _cmd, focusRingType) {

}, "void");

class_addMethod(the_class, "focusRingType", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultFocusRingType", function(self, _cmd) {

}, "void");

var the_class = NSView;
var meta_class = the_class.isa;

class_addMethod(the_class, "dragImage:at:offset:event:pasteboard:source:slideBack:", function(self, _cmd, anImage, viewLocation, initialOffset, event, pboard, sourceObj, slideFlag) {

}, "void");

class_addMethod(the_class, "registeredDraggedTypes", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "registerForDraggedTypes:", function(self, _cmd, newTypes) {

}, "void");

class_addMethod(the_class, "unregisterDraggedTypes", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "dragFile:fromRect:slideBack:event:", function(self, _cmd, filename, rect, aFlag, event) {

}, "void");

class_addMethod(the_class, "dragPromisedFilesOfTypes:fromRect:source:slideBack:event:", function(self, _cmd, typeArray, rect, sourceObject, aFlag, event) {

}, "void");

var the_class = objc_allocateClassPair(NSResponder, "NSWindow");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_gCanvas", "id");
class_addIvar(the_class, "_gBuffer", "id");
class_addIvar(the_class, "_contentRectOrigin", "NSPoint");
class_addIvar(the_class, "_contentRectSize", "NSSize");
class_addIvar(the_class, "_isVisible", "BOOL");
class_addIvar(the_class, "_hasShadow", "BOOL");
class_addIvar(the_class, "_hidesOnDeactivate", "BOOL");
class_addIvar(the_class, "_releasedWhenClosed", "BOOL");
class_addIvar(the_class, "_styleMask", "NSUInteger");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_visibleAtLaunch", "BOOL");
class_addIvar(the_class, "_resizable", "BOOL");
class_addIvar(the_class, "_showNormalTitlebar", "BOOL");
class_addIvar(the_class, "_unifiedTitleAndToolbar", "BOOL");
class_addIvar(the_class, "_toolbar", "NSToolbar");
class_addIvar(the_class, "_contentView", "NSView");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_windowNumber", "NSUInteger");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_visible", "BOOL");
class_addIvar(the_class, "_level", "int");
class_addIvar(the_class, "_keyWindow", "BOOL");
class_addIvar(the_class, "_mainWindow", "BOOL");
class_addIvar(the_class, "_firstResponder", "NSResponder");
class_addIvar(the_class, "_movableByWindowBackground", "BOOL");
class_addIvar(the_class, "_eventBindingCurrentX", "id");
class_addIvar(the_class, "_eventBindingCurrentY", "id");
class_addIvar(the_class, "_windowCloseButton", "NSWindowTitleButton");
class_addIvar(the_class, "_fieldEditor", "NSText");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_wtFlags", "NSUInteger");
class_addIvar(the_class, "_windowClass", "id");

class_addMethod(the_class, "frameRectForContentRect:", function(self, _cmd, contentRect) {
if (Unhandled output_expression: [EQ_OP(), _styleMask (IDENTIFIER), 0 (CONSTANT)])
return contentRect;

var xOffset = 0;
var yOffset = 0;
var widthOffset = 0;
var heightOffset = 0;
Unhandled output_expression: [SUB_ASSIGN(SUB_ASSIGN), xOffset (IDENTIFIER), WINDOW_BORDER_SIZE (IDENTIFIER)];
Unhandled output_expression: [SUB_ASSIGN(SUB_ASSIGN), yOffset (IDENTIFIER), WINDOW_BORDER_SIZE (IDENTIFIER)];
Unhandled output_expression: [ADD_ASSIGN(ADD_ASSIGN), widthOffset (IDENTIFIER), [*(), 2 (CONSTANT), WINDOW_BORDER_SIZE (IDENTIFIER)]];
Unhandled output_expression: [ADD_ASSIGN(ADD_ASSIGN), heightOffset (IDENTIFIER), [*(), 2 (CONSTANT), WINDOW_BORDER_SIZE (IDENTIFIER)]];
Unhandled output_expression: [ADD_ASSIGN(ADD_ASSIGN), heightOffset (IDENTIFIER), WINDOW_TITLEBAR_SIZE (IDENTIFIER)];
return NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], xOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], yOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], widthOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], heightOffset (IDENTIFIER)]);

}, "void");

class_addMethod(the_class, "contentRectForFrameRect:", function(self, _cmd, frameRect) {
return NSMakeRect(00frameRect.sihe.widthframeRect.size.height);

}, "void");

class_addMethod(the_class, "init", function(self, _cmd) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{

}


}, "void");

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, aStyle, bufferingType, flag) {
self = objc_msgSend(self, "init");
if (self)
{
objc_msgSend(self, "setFrame:display:", contentRect, YES);
_styleMask = aStyle;
_resizable = NO;
_firstResponder = self;
_movableByWindowBackground = YES;
_hasShadow = YES;
_isVisible = YES;
_contentView = objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", contentRect);
objc_msgSend(self, "setFrame:display:", contentRect, YES);
_windowNumber = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "addWindow:", self);

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSResponder, receiver:self}, "initWithCoder:", aCoder);
_maxSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSWindowContentSizeMax");
_minSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSWindowContentSizeMin");
_wtFlags = objc_msgSend(aCoder, "decodeIntForKey:", "NSWTFlags");
_windowClass = objc_msgSend(aCoder, "decodeStringForKey:", "NSWindowClass");
_styleMask = objc_msgSend(aCoder, "decodeIntForKey:", "NSWindowStyleMask");
_title = objc_msgSend(aCoder, "decodeStringForKey:", "NSWindowTitle");
_frame = objc_msgSend(self, "frameRectForContentRect:", objc_msgSend(aCoder, "decodeRectForKey:", "NSWindowRect"));
_contentView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowView");
objc_msgSend(self, "awakeAfterUsingCoder:", aCoder);
return self;

}, "void");

class_addMethod(the_class, "awakeAfterUsingCoder:", function(self, _cmd, aCoder) {
_gCanvas = NSWindowServerCreateCanvas(self);
_gCanvas.width = _frame.size.width;
_gCanvas.height = _frame.size.height;
_windowNumber = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "addWindow:", self);
objc_msgSend(_contentView, "viewWillMoveToWindow:", self);
objc_msgSend(_contentView, "viewDidMoveToWindow:", self);
NSWindowServerSetOrigin(_gCanvas_frame.origin);
objc_msgSend(self, "makeKeyAndOrderFront:", self);

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(self, "makeMainWindow");
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownHandle (IDENTIFIER), ]);

}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
if (Unhandled output_expression: [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSLeftMouseUp (IDENTIFIER)])
{

}
else
{
var newX = Unhandled output_expression: [+(), [((), [-(), [.(.), [M(), theEvent (IDENTIFIER), locationInBase (IDENTIFIER)], x (IDENTIFIER)], _eventBindingCurrentX (IDENTIFIER)], ], [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)]];
var newY = Unhandled output_expression: [+(), [((), [-(), [.(.), [M(), theEvent (IDENTIFIER), locationInBase (IDENTIFIER)], y (IDENTIFIER)], _eventBindingCurrentY (IDENTIFIER)], ], [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)]];
objc_msgSend(self, "setFrameOrigin:", NSMakePoint(newXnewY));
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownHandle (IDENTIFIER), ]);

}


}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
return _title;

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
_title = objc_msgSend(aString, "copy");
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "setRepresentedURL:", function(self, _cmd, url) {

}, "void");

class_addMethod(the_class, "representedURL", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "representedFilename", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setRepresentedFilename:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "setTitleWithRepresentedFilename:", function(self, _cmd, filename) {

}, "void");

class_addMethod(the_class, "setExcludedFromWindowsMenu:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isExcludedFromWindowsMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentView:", function(self, _cmd, aView) {
if (_contentView)
objc_msgSend(_contentView, "removeFromSuperview");

_contentView = aView;
objc_msgSend(_contentView, "viewWillMoveToSuperview:", nil);
objc_msgSend(_contentView, "viewWillMoveToWindow:", self);
objc_msgSend(_contentView, "setFrame:", objc_msgSend(self, "contentRectForFrameRect:", _frame));
objc_msgSend(_contentView, "viewDidMoveToSuperview:", nil);
objc_msgSend(_contentView, "viewDidMoveToWindow:", self);
objc_msgSend(_contentView, "setNextResponder:", self);

}, "void");

class_addMethod(the_class, "contentView", function(self, _cmd) {
return _contentView;

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "windowNumber", function(self, _cmd) {
return _windowNumber;

}, "void");

class_addMethod(the_class, "styleMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "fieldEditor:forObject:", function(self, _cmd, createFlag, anObject) {

}, "void");

class_addMethod(the_class, "endEditingFor:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "constrainFrameRect:toScreen:", function(self, _cmd, frameRect, screen) {

}, "void");

class_addMethod(the_class, "setFrame:display:", function(self, _cmd, frameRect, flag) {

}, "void");

class_addMethod(the_class, "setContentSize:", function(self, _cmd, aSize) {

}, "void");

class_addMethod(the_class, "setFrameOrigin:", function(self, _cmd, aPoint) {
_frame.origin.x = aPoint.x;
_frame.origin.y = aPoint.y;
NSWindowServerSetOrigin(_gCanvasaPoint);

}, "void");

class_addMethod(the_class, "setFrameTopLeftPoint:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "cascadeTopLeftFromPoint:", function(self, _cmd, topLeftPoint) {

}, "void");

class_addMethod(the_class, "frame", function(self, _cmd) {
return _frame;

}, "void");

class_addMethod(the_class, "animationResizeTime:", function(self, _cmd, newFrame) {

}, "void");

class_addMethod(the_class, "setFrame:display:animate:", function(self, _cmd, frameRect, displayFlag, animateFlag) {

}, "void");

class_addMethod(the_class, "setShowsResizeIndicator:", function(self, _cmd, show) {

}, "void");

class_addMethod(the_class, "showsResizeIndicator", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setResizeIncrements:", function(self, _cmd, increments) {

}, "void");

class_addMethod(the_class, "resizeIncrements", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAspectRatio:", function(self, _cmd, ratio) {

}, "void");

class_addMethod(the_class, "aspectRatio", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentResizeIncrements:", function(self, _cmd, increments) {

}, "void");

class_addMethod(the_class, "contentResizeIncrements", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentAspectRatio:", function(self, _cmd, ratio) {

}, "void");

class_addMethod(the_class, "contentAspectRatio", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "useOptimizedDrawing:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "setViewsNeedDisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "viewsNeedDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayIfNeeded", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "display", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutodisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isAutodisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "preservesContentDuringLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setPreservesContentDuringLiveResize:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeFirstResponder:", function(self, _cmd, aResponder) {

}, "void");

class_addMethod(the_class, "firstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resizeFlags", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "close", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setReleasedWhenClosed:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isReleasedWhenClosed", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "miniaturize:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "deminiaturize:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "isZoomed", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "zoom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "isMiniaturized", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {

}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {

}, "void");

class_addMethod(the_class, "setBackgroundColor:", function(self, _cmd, color) {

}, "void");

class_addMethod(the_class, "backgroundColor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentBorderThickness:forEdge:", function(self, _cmd, thickness, edge) {

}, "void");

class_addMethod(the_class, "contentBorderThicknessForEdge:", function(self, _cmd, edge) {

}, "void");

class_addMethod(the_class, "setAutorecalculatesContentBorderThickness:forEdge:", function(self, _cmd, flag, edge) {

}, "void");

class_addMethod(the_class, "autorecalculatesContentBorderThicknessForEdge:", function(self, _cmd, edge) {

}, "void");

class_addMethod(the_class, "setMovableByWindowBackground:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isMovableByWindowBackground", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHidesOnDeactivate:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "hidesOnDeactivate", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "center", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeKeyAndOrderFront:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderFront:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderBack:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderOut:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderWindow:relativeTo:", function(self, _cmd, place, otherWin) {

}, "void");

class_addMethod(the_class, "orderFrontRegardless", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMiniwindowImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "setMiniwindowTitle:", function(self, _cmd, title) {

}, "void");

class_addMethod(the_class, "miniwindowImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "miniwindowTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDocumentEdited:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isDocumentEdited", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isVisible", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canBecomeKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "worksWhenModal", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "convertBaseToScreen:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "convertScreenToBase:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "performClose:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "performMiniaturize:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "performZoom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "gState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setOneShot:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isOneShot", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "disableCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "enableCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "discardCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "areCursorRectsEnabled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "invalidateCursorRectsForView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "resetCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBackingType:", function(self, _cmd, bufferingType) {

}, "void");

class_addMethod(the_class, "backingType", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setLevel:", function(self, _cmd, newLevel) {

}, "void");

class_addMethod(the_class, "level", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDepthLimit:", function(self, _cmd, limit) {

}, "void");

class_addMethod(the_class, "depthLimit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDynamicDepthLimit:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "hasDynamicDepthLimit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "screen", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "deepestScreen", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canStoreColor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHasShadow:", function(self, _cmd, hasShadow) {

}, "void");

class_addMethod(the_class, "hasShadow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "invalidateShadow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlphaValue:", function(self, _cmd, windowAlpha) {

}, "void");

class_addMethod(the_class, "alphaValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setOpaque:", function(self, _cmd, isOpaque) {

}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "cacheImageInRect:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "restoreCachedImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "discardCachedImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "contentMinSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "contentMaxSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentMinSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "setContentMaxSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "nextEventMatchingMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "nextEventMatchingMask:untilDate:inMode:dequeue:", function(self, _cmd, mask, expiration, mode, deqFlag) {

}, "void");

class_addMethod(the_class, "discardEventsMatchingMask:beforeEvent:", function(self, _cmd, mask, lastEvent) {

}, "void");

class_addMethod(the_class, "postEvent:atStart:", function(self, _cmd, event, flag) {

}, "void");

class_addMethod(the_class, "currentEvent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAcceptsMouseMovedEvents:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "acceptsMouseMovedEvents", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIgnoresMouseEvents:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "ignoresMouseEvents", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sendEvent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "mouseLocationOutsideOfEventStream", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "windowController", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setWindowController:", function(self, _cmd, windowController) {

}, "void");

class_addMethod(the_class, "isSheet", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "attachedSheet", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "standardWindowButton:", function(self, _cmd, b) {

}, "void");

class_addMethod(the_class, "addChildWindow:ordered:", function(self, _cmd, childWin, place) {

}, "void");

class_addMethod(the_class, "removeChildWindow:", function(self, _cmd, childWin) {

}, "void");

class_addMethod(the_class, "childWindows", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "parentWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setParentWindow:", function(self, _cmd, window) {

}, "void");

class_addMethod(the_class, "graphicsContext", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "frameRectForContentRect:styleMask:", function(self, _cmd, cRect, aStyle) {

}, "void");

class_addMethod(meta_class, "contentRectForFrameRect:styleMask:", function(self, _cmd, fRect, aStyle) {

}, "void");

class_addMethod(meta_class, "minFrameWidthWithTitle:styleMask:", function(self, _cmd, aTitle, aStyle) {

}, "void");

class_addMethod(meta_class, "defaultDepthLimit", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "menuChanged:", function(self, _cmd, menu) {

}, "void");

class_addMethod(meta_class, "standardWindowButton:forStyleMask:", function(self, _cmd, b, styleMask) {

}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "setInitialFirstResponder:", function(self, _cmd, view) {

}, "void");

class_addMethod(the_class, "initialFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "selectNextKeyView:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "selectPreviousKeyView:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "selectKeyViewFollowingView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "selectKeyViewPrecedingView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "keyViewSelectionDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDefaultButtonCell:", function(self, _cmd, defButt) {

}, "void");

class_addMethod(the_class, "defaultButtonCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "disableKeyEquivalentForDefaultButtonCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "enableKeyEquivalentForDefaultButtonCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutorecalculatesKeyViewLoop:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "autorecalculatesKeyViewLoop", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "recalculateKeyViewLoop", function(self, _cmd) {

}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "setToolbar:", function(self, _cmd, toolbar) {

}, "void");

class_addMethod(the_class, "toolbar", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "toggleToolbarShown:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "runToolbarCustomizationPalette:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setShowsToolbarButton:", function(self, _cmd, show) {

}, "void");

class_addMethod(the_class, "showsToolbarButton", function(self, _cmd) {

}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "dragImage:at:offset:event:pasteboard:source:slideBack:", function(self, _cmd, anImage, baseLocation, initialOffset, event, pboard, sourceObj, slideFlag) {

}, "void");

class_addMethod(the_class, "registerForDraggedTypes:", function(self, _cmd, newTypes) {

}, "void");

class_addMethod(the_class, "unregisterDraggedTypes", function(self, _cmd) {

}, "void");

