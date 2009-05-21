var the_class = objc_allocateClassPair(NSResponder, "NSApplication");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_windows", "NSMutableArray");
class_addIvar(the_class, "_currentEvent", "NSEvent");
class_addIvar(the_class, "_eventBindingQueued", "BOOL");
class_addIvar(the_class, "_eventBindingTarget", "id");
class_addIvar(the_class, "_eventBindingSelector", "SEL");
class_addIvar(the_class, "_eventBindingMask", "NSUInteger");

class_addMethod(the_class, "init", function(self, _cmd) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
Unhandled output_statement_list: [{(), [,(), [,(), [,(), [,(), [,(), [,(), [,(), [,(), [;(;), [=(=), _windows (IDENTIFIER), [M(), NSMutableArray (TYPE_NAME), [:(), arrayWithCapacity (IDENTIFIER), 0 (CONSTANT)]]], ], [;(;), [=(=), _eventQueue (IDENTIFIER), [M(), NSMutableArray (TYPE_NAME), [:(), arrayWithCapacity (IDENTIFIER), 0 (CONSTANT)]]], ]], [;(;), [=(=), _eventBindingQueued (IDENTIFIER), NO (IDENTIFIER)], ]], [;(;), [=(=), [d(), NSBundle (TYPE_NAME), mainBundle (IDENTIFIER)], [M(), NSBundle (TYPE_NAME), mainBundle (IDENTIFIER)]], ]], [;(;), [=(=), [d(), NSString (TYPE_NAME), productName (IDENTIFIER)], [M(), mainBundle (IDENTIFIER), [:(), objectForInfoDictionaryKey (IDENTIFIER), @"CFBundleName" (AT_STRING_LITERAL)]]], ]], [;(;), [=(=), [d(), NSRect (TYPE_NAME), menuBarRect (IDENTIFIER)], [f(), NSMakeRect (IDENTIFIER), [,(), [,(), [,(), 0 (CONSTANT), [-(), [.(.), [.(.), [M(), [M(), NSScreen (IDENTIFIER), mainScreen (IDENTIFIER)], frame (IDENTIFIER)], size (IDENTIFIER)], height (IDENTIFIER)], [M(), NSMenu (TYPE_NAME), menuBarHeight (IDENTIFIER)]]], [.(.), [.(.), [M(), [M(), NSScreen (IDENTIFIER), mainScreen (IDENTIFIER)], frame (IDENTIFIER)], size (IDENTIFIER)], width (IDENTIFIER)]], [M(), NSMenu (TYPE_NAME), menuBarHeight (IDENTIFIER)]]]], ]], [;(;), [=(=), _menuBar (IDENTIFIER), [M(), [M(), NSMenuBar (IDENTIFIER), alloc (IDENTIFIER)], [,(), [,(), [,(), [:(), initWithContentRect (IDENTIFIER), menuBarRect (IDENTIFIER)], [:(), styleMask (IDENTIFIER), NSBorderlessWindowMask (IDENTIFIER)]], [:(), backing (IDENTIFIER), nil (IDENTIFIER)]], [:(), defer (IDENTIFIER), NO (IDENTIFIER)]]]], ]], [;(;), [M(), _menuBar (IDENTIFIER), [:(), setLevel (IDENTIFIER), NSMainMenuWindowLevel (IDENTIFIER)]], ]], [RETURN(RETURN), self (IDENTIFIER), ]], ]

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
Unhandled output_statement_list: [{(), [,(), [IF(IF), [,(), [NE_OP(), [((), [&(), [((), [LEFT_OP(), 1 (CONSTANT), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)]], ], _eventBindingMask (IDENTIFIER)], ], 0 (CONSTANT)], [{(), [,(), [;(;), [=(=), _eventBindingQueued (IDENTIFIER), NO (IDENTIFIER)], ], [;(;), [M(), _eventBindingTarget (IDENTIFIER), [,(), [:(), performSelector (IDENTIFIER), _eventBindingSelector (IDENTIFIER)], [:(), withObject (IDENTIFIER), theEvent (IDENTIFIER)]]], ]], ]], [ELSE(ELSE), { (), ]], RETURN (RETURN)], ]
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

