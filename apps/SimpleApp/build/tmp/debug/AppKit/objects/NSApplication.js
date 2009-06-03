[d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSModalPanelRunLoopMode (IDENTIFIER)], @"NSModalPanelRunLoopMode" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSEventTrackingRunLoopMode (IDENTIFIER)], @"NSEventTrackingRunLoopMode" (AT_STRING_LITERAL)]][d(), id (TYPE_NAME), [=(), NSApp (IDENTIFIER), nil (IDENTIFIER)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidBecomeActiveNotification (IDENTIFIER)], @"NSApplicationDidBecomeActiveNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidHideNotification (IDENTIFIER)], @"NSApplicationDidHideNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidFinishLaunchingNotification (IDENTIFIER)], @"NSApplicationDidFinishLaunchingNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidResignActiveNotification (IDENTIFIER)], @"NSApplicationDidResignActiveNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidUnhideNotification (IDENTIFIER)], @"NSApplicationDidUnhideNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidUpdateNotification (IDENTIFIER)], @"NSApplicationDidUpdateNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillBecomeActiveNotification (IDENTIFIER)], @"NSApplicationWillBecomeActiveNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillHideNotification (IDENTIFIER)], @"NSApplicationWillHideNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillFinishLaunchingNotification (IDENTIFIER)], @"NSApplicationWillFinishLaunchingNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillResignActiveNotification (IDENTIFIER)], @"NSApplicationWillResignActiveNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillUnhideNotification (IDENTIFIER)], @"NSApplicationWillUnhideNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillUpdateNotification (IDENTIFIER)], @"NSApplicationWillUpdateNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationWillTerminateNotification (IDENTIFIER)], @"NSApplicationWillTerminateNotification" (AT_STRING_LITERAL)]][d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSApplicationDidChangeScreenParametersNotification (IDENTIFIER)], @"NSApplicationDidChangeScreenParametersNotification" (AT_STRING_LITERAL)]]function NSApplicationMain(argc,argv)
{
var theAppController = objc_msgSend(objc_msgSend(AppController, "alloc"), "init");
var theApp = objc_msgSend(NSApplication, "sharedApplication");
objc_msgSend(theApp, "setDelegate:", theAppController);
}var the_class = objc_allocateClassPair(NSResponder, "NSApplication");
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
var menuBarRect = NSMakeRect(0,objc_msgSend(objc_msgSend(NSScreen, "mainScreen"), "frame").size.height - objc_msgSend(NSMenu, "menuBarHeight"),objc_msgSend(objc_msgSend(NSScreen, "mainScreen"), "frame").size.width,objc_msgSend(NSMenu, "menuBarHeight"));
_menuBar = objc_msgSend(objc_msgSend(NSMenuBar, "alloc"), "initWithContentRect:styleMask:backing:defer:", menuBarRect, 0, null, NO);
objc_msgSend(_menuBar, "setLevel:", 10);
return self;

}

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
if (_delegate == anObject)
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
/* for statement needs to go here*/return null;
}, "void");

class_addMethod(the_class, "keyWindow", function(self, _cmd) {
/* for statement needs to go here*/return null;
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
if (((1 << objc_msgSend(theEvent, "type")) & _eventBindingMask) != 0)
{
_eventBindingQueued = NO;
objc_msgSend(_eventBindingTarget, "performSelector:withObject:", _eventBindingSelector, theEvent);

}
else
{

}

return ;

}

if (objc_msgSend(theEvent, "type") == NSLeftMouseDown)
objc_msgSend(objc_msgSend(theEvent, "window"), "makeKeyAndOrderFront:", self);
else
if ((objc_msgSend(theEvent, "type") == NSKeyDown) || (objc_msgSend(theEvent, "type") == NSKeyUp))
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
if (!NSApp)
NSApp = objc_msgSend(objc_msgSend(NSApplication, "alloc"), "init");

return NSApp;
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

