function NSEventMouseEventFromCGEvent(event)
{
var location = CGEventGetLocation(event);
var windowNumber = 0;
var theWindow = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "windowAtPoint:", location);
if (theWindow)
windowNumber = objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "windowAtPoint:", location), "windowNumber");
else
windowNumber = -1;

var theEvent = objc_msgSend(NSEvent, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", CGEventGetType(event), location, CGEventGetFlags(event), 0, windowNumber, null, 1, 1, 1);
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendEvent:", theEvent);
}
function NSEventKeyEventFromCGEvent(event)
{
NSLog(CGEventKeyGetUnicodeString(event));
var theFlags = CGEventGetFlags(event);
}
var the_class = objc_allocateClassPair(NSObject, "NSEvent");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_type", "NSEventType");
class_addIvar(the_class, "_location", "NSPoint");
class_addIvar(the_class, "_modifierFlags", "int");
class_addIvar(the_class, "_timestamp", "NSTimeInterval");
class_addIvar(the_class, "_windowNumber", "NSInteger");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_context", "id");
class_addIvar(the_class, "_characters", "id");
class_addIvar(the_class, "_charactersIgnoringModifiers", "id");
class_addIvar(the_class, "_isARepeat", "id");
class_addIvar(the_class, "_keyCode", "id");
class_addIvar(the_class, "_clickCount", "id");
class_addIvar(the_class, "_locationInBase", "id");
class_addIvar(the_class, "_eventRef", "id");
class_addIvar(the_class, "_buttonNumber", "id");
class_addIvar(the_class, "_deltaX", "id");
class_addIvar(the_class, "_deltaY", "id");
class_addIvar(the_class, "_deltaZ", "id");

class_addMethod(the_class, "type", function(self, _cmd) {
with(self) {
return _type;
}
}, "void");

class_addMethod(the_class, "modifierFlags", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "timestamp", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
with(self) {
return _window;
}
}, "void");

class_addMethod(the_class, "windowNumber", function(self, _cmd) {
with(self) {
return _windowNumber;
}
}, "void");

class_addMethod(the_class, "context", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "clickCount", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "buttonNumber", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "eventNumber", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "locationInWindow", function(self, _cmd) {
with(self) {
return _location;
}
}, "void");

class_addMethod(the_class, "deltaX", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deltaY", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "characters", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "charactersIgnoringModifiers", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isARepeat", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyCode", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "trackingNumber", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "userData", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "trackingArea", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "subtype", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "data1", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "data2", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "startPeriodicEventsAfterDelay:withPeriod:", function(self, _cmd, delay, period) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stopPeriodicEvents", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", function(self, _cmd, type, location, flags, time, wNum, context, eNum, cNum, pressure) {
with(self) {
var theEvent = objc_msgSend(objc_msgSend(NSEvent, "alloc"), "init");
theEvent._type = type;
theEvent._location = location;
theEvent._modifierFlags = flags;
theEvent._timestamp = time;
theEvent._windowNumber = wNum;
theEvent._window = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "windowWithWindowNumber:", wNum);
theEvent._context = context;
theEvent._eventNumber = eNum;
theEvent._clickCount = cNum;
theEvent._pressure = pressure;
return theEvent;
}
}, "void");

class_addMethod(meta_class, "keyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", function(self, _cmd, type, location, flags, time, wNum, context, keys, ukeys, flag, code) {
with(self) {
var theEvent = objc_msgSend(objc_msgSend(NSEvent, "alloc"), "init");
}
}, "void");

class_addMethod(meta_class, "enterExitEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:trackingNumber:userData:", function(self, _cmd, type, location, flags, time, wNum, context, eNum, tNum, data) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "otherEventWithType:location:modifierFlags:timestamp:windowNumber:context:subtype:data1:data2:", function(self, _cmd, type, location, flags, time, wNum, context, subtype, d1, d2) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "mouseLocation", function(self, _cmd) {
with(self) {
}
}, "void");

