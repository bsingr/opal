var NSModalPanelRunLoopMode = "NSModalPanelRunLoopMode";
var NSEventTrackingRunLoopMode = "NSEventTrackingRunLoopMode";
var NSApp = null;
var NSApplicationDidBecomeActiveNotification = "NSApplicationDidBecomeActiveNotification";
var NSApplicationDidHideNotification = "NSApplicationDidHideNotification";
var NSApplicationDidFinishLaunchingNotification = "NSApplicationDidFinishLaunchingNotification";
var NSApplicationDidResignActiveNotification = "NSApplicationDidResignActiveNotification";
var NSApplicationDidUnhideNotification = "NSApplicationDidUnhideNotification";
var NSApplicationDidUpdateNotification = "NSApplicationDidUpdateNotification";
var NSApplicationWillBecomeActiveNotification = "NSApplicationWillBecomeActiveNotification";
var NSApplicationWillHideNotification = "NSApplicationWillHideNotification";
var NSApplicationWillFinishLaunchingNotification = "NSApplicationWillFinishLaunchingNotification";
var NSApplicationWillResignActiveNotification = "NSApplicationWillResignActiveNotification";
var NSApplicationWillUnhideNotification = "NSApplicationWillUnhideNotification";
var NSApplicationWillUpdateNotification = "NSApplicationWillUpdateNotification";
var NSApplicationWillTerminateNotification = "NSApplicationWillTerminateNotification";
var NSApplicationDidChangeScreenParametersNotification = "NSApplicationDidChangeScreenParametersNotification";
function NSApplicationMain(argc,argv)
{
var mainBundle = objc_msgSend(NSBundle, "mainBundle");
var principalClass = objc_msgSend(mainBundle, "principalClass");
objc_msgSend(NSBundle, "loadNibNamed:owner:", "MainMenu", objc_msgSend(principalClass, "sharedApplication"));
objc_msgSend(objc_msgSend(AppController, "alloc"), "init");
objc_msgSend(objc_msgSend(principalClass, "sharedApplication"), "run");
return 0;
}
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
with(self) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{
_windows = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_eventQueue = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_eventBindingQueued = NO;
var mainBundle = objc_msgSend(NSBundle, "mainBundle");
var productName = objc_msgSend(mainBundle, "objectForInfoDictionaryKey:", "CFBundleName");

}

return self;
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
with(self) {
if (_delegate == anObject)
return ;

var nc = objc_msgSend(NSNotificationCenter, "defaultCenter");
_delegate = anObject;
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
return _delegate;
}
}, "void");

class_addMethod(the_class, "context", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "windowWithWindowNumber:", function(self, _cmd, windowNum) {
with(self) {
return objc_msgSend(_windows, "objectAtIndex:", windowNum);
}
}, "void");

class_addMethod(the_class, "windowAtPoint:", function(self, _cmd, point) {
with(self) {
for(var i = 0;
i < objc_msgSend(_windows, "count");
i++){
if (NSPointInRect(point,objc_msgSend(objc_msgSend(_windows, "objectAtIndex:", i), "frame")))
{
return objc_msgSend(_windows, "objectAtIndex:", i);

}


}
return null;
}
}, "void");

class_addMethod(the_class, "mainWindow", function(self, _cmd) {
with(self) {
for(var i = 0;
i < objc_msgSend(_windows, "count");
i++)if (objc_msgSend(objc_msgSend(_windows, "objectAtIndex:", i), "isMainWindow"))
return objc_msgSend(_windows, "objectAtIndex:", i);

return null;
}
}, "void");

class_addMethod(the_class, "keyWindow", function(self, _cmd) {
with(self) {
for(var i = 0;
i < objc_msgSend(_windows, "count");
i++)if (objc_msgSend(objc_msgSend(_windows, "objectAtIndex:", i), "isKeyWindow"))
return objc_msgSend(_windows, "objectAtIndex:", i);

return null;
}
}, "void");

class_addMethod(the_class, "addWindow:", function(self, _cmd, aWindow) {
with(self) {
objc_msgSend(_windows, "addObject:", aWindow);
return objc_msgSend(_windows, "count") - 1;
}
}, "void");

class_addMethod(the_class, "isRunning", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "finishLaunching", function(self, _cmd) {
with(self) {
var nc = objc_msgSend(NSNotificationCenter, "defaultCenter");
}
}, "void");

class_addMethod(the_class, "run", function(self, _cmd) {
with(self) {
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "finishLaunching");
}
}, "void");

class_addMethod(the_class, "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", function(self, _cmd, mask, expiration, mode, deqFlag, aTarget, aSelector) {
with(self) {
_eventBindingQueued = YES;
_eventBindingTarget = aTarget;
_eventBindingSelector = aSelector;
_eventBindingMask = mask;
}
}, "void");

class_addMethod(the_class, "discardEventsMatchingMask:beforeEvent:", function(self, _cmd, mask, lastEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "postEvent:atStart:", function(self, _cmd, event, flag) {
with(self) {
objc_msgSend(self, "sendEvent:", event);
}
}, "void");

class_addMethod(the_class, "currentEvent", function(self, _cmd) {
with(self) {
return _currentEvent;
}
}, "void");

class_addMethod(the_class, "sendEvent:", function(self, _cmd, theEvent) {
with(self) {
objc_msgSend(objc_msgSend(theEvent, "window"), "sendEvent:", theEvent);
}
}, "void");

class_addMethod(the_class, "preventWindowOrdering", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeWindowsPerform:inOrder:", function(self, _cmd, aSelector, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "windows", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWindowsNeedUpdate:", function(self, _cmd, needUpdate) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateWindows", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMainMenu:", function(self, _cmd, aMenu) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mainMenu", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setApplicationIconImage:", function(self, _cmd, image) {
with(self) {
}
}, "void");

class_addMethod(the_class, "applicationIconImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sendAction:to:from:", function(self, _cmd, theAction, theTarget, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "targetForAction:", function(self, _cmd, theAction) {
with(self) {
}
}, "void");

class_addMethod(the_class, "targetForAction:to:from:", function(self, _cmd, theAction, theTarget, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "reportException:", function(self, _cmd, theException) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "sharedApplication", function(self, _cmd) {
with(self) {
if (!NSApp)
NSApp = objc_msgSend(objc_msgSend(NSApplication, "alloc"), "init");

return NSApp;
}
}, "void");

class_addMethod(meta_class, "detachDrawingThread:toTarget:withObject:", function(self, _cmd, selector, target, argument) {
with(self) {
}
}, "void");

var the_class = NSApplication;
var meta_class = the_class.isa;

class_addMethod(the_class, "setWindowsMenu:", function(self, _cmd, aMenu) {
with(self) {
}
}, "void");

class_addMethod(the_class, "windowsMenu", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "arrangeInFront:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeWindowsItem:", function(self, _cmd, win) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addWindowsItem:title:filename:", function(self, _cmd, win, aString, isFilename) {
with(self) {
}
}, "void");

class_addMethod(the_class, "changeWindowsItem:title:filename:", function(self, _cmd, win, aString, isFilename) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateWindowsItem:", function(self, _cmd, win) {
with(self) {
}
}, "void");

class_addMethod(the_class, "miniaturizeAll:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

var the_class = NSApplication;
var meta_class = the_class.isa;

class_addMethod(the_class, "orderFrontStandardAboutPanel:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFrontStandardAboutPanelWithOptions:", function(self, _cmd, optionsDictionary) {
with(self) {
}
}, "void");

