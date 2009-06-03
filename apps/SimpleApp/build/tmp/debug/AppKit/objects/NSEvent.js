var the_class = objc_allocateClassPair(NSObject, "NSEvent");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_type", "id");
class_addIvar(the_class, "_locationInWindow", "id");
class_addIvar(the_class, "_modifierFlags", "id");
class_addIvar(the_class, "_timestamp", "id");
class_addIvar(the_class, "_windowNumber", "id");
class_addIvar(the_class, "_context", "id");
class_addIvar(the_class, "_characters", "id");
class_addIvar(the_class, "_charactersIgnoringModifiers", "id");
class_addIvar(the_class, "_isARepeat", "id");
class_addIvar(the_class, "_keyCode", "id");
class_addIvar(the_class, "_window", "id");
class_addIvar(the_class, "_clickCount", "id");
class_addIvar(the_class, "_locationInBase", "id");
class_addIvar(the_class, "_eventRef", "id");
class_addIvar(the_class, "_buttonNumber", "id");
class_addIvar(the_class, "_deltaX", "id");
class_addIvar(the_class, "_deltaY", "id");
class_addIvar(the_class, "_deltaZ", "id");

class_addMethod(the_class, "initKeyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", function(self, _cmd, type, location, flags, time, windowNum, context, characters, unmodCharacters, repeatKey, code) {
objc_msgSend(self, "init");
if (self)
{
_type = type;
_locationInWindow = location;
_modifierFlags = flags;
_timestamp = time;
_windowNumber = windowNum;
_context = context;
_characters = characters;
_charactersIgnoringModifiers = unmodCharacters;
_isARepeat = repeatKey;
_keyCode = code;

}

return self;
}, "void");

class_addMethod(the_class, "initMouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", function(self, _cmd, type, location, flags, time, windowNum, context, eventNumber, clickNumber, pressure) {
objc_msgSend(self, "init");
if (self)
{
_type = type;
_locationInWindow = location;
_modifierFlags = flags;
_timestamp = time;
_windowNumber = windowNum;
_context = context;
_clickCount = clickNumber;
_window = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "windowWithWindowNumber:", _windowNumber);
if (_modifierFlags & 1048576)
NSLog("Command key was pressed");

if (_modifierFlags & 131072)
NSLog("Shift key was pressed");

if (_modifierFlags & 524288)
NSLog("Alt key was pressed");

if (_modifierFlags & 262144)
NSLog("Control key was pressed");


}

return self;
}, "void");

class_addMethod(the_class, "context", function(self, _cmd) {
return _context;
}, "void");

class_addMethod(the_class, "locationInWindow", function(self, _cmd) {
return _locationInWindow;
}, "void");

class_addMethod(the_class, "modifierFlags", function(self, _cmd) {
return _modifierFlags;
}, "void");

class_addMethod(the_class, "timestamp", function(self, _cmd) {
return _timestamp;
}, "void");

class_addMethod(the_class, "type", function(self, _cmd) {
return _type;
}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
return _window;
}, "void");

class_addMethod(the_class, "setWindow:", function(self, _cmd, aWindow) {
_window = aWindow;
}, "void");

class_addMethod(the_class, "setLocationInBase:", function(self, _cmd, aPoint) {
_locationInBase = aPoint;
}, "void");

class_addMethod(the_class, "locationInBase", function(self, _cmd) {
return _locationInBase;
}, "void");

class_addMethod(the_class, "windowNumber", function(self, _cmd) {
return _windowNumber;
}, "void");

class_addMethod(the_class, "eventRef", function(self, _cmd) {
return _eventRef;
}, "void");

class_addMethod(the_class, "characters", function(self, _cmd) {
return _characters;
}, "void");

class_addMethod(the_class, "charactersIgnoringModifiers", function(self, _cmd) {
return _charactersIgnoringModifiers;
}, "void");

class_addMethod(the_class, "isARepeat", function(self, _cmd) {
return _isARepeat;
}, "void");

class_addMethod(the_class, "keyCode", function(self, _cmd) {
return _keyCode;
}, "void");

class_addMethod(the_class, "buttonNumber", function(self, _cmd) {
return _buttonNumber;
}, "void");

class_addMethod(the_class, "clickCount", function(self, _cmd) {
return _clickCount;
}, "void");

class_addMethod(the_class, "deltaX", function(self, _cmd) {
return _deltaX;
}, "void");

class_addMethod(the_class, "deltaY", function(self, _cmd) {
return _deltaY;
}, "void");

class_addMethod(the_class, "deltaZ", function(self, _cmd) {
return _deltaZ;
}, "void");

class_addMethod(meta_class, "keyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", function(self, _cmd, type, location, flags, time, windowNum, context, characters, unmodCharacters, repeatKey, code) {
return objc_msgSend(objc_msgSend(NSEvent, "alloc"), "initKeyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", type, location, flags, time, windowNum, context, characters, unmodCharacters, repeatKey, code);
}, "void");

class_addMethod(meta_class, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", function(self, _cmd, type, location, flags, time, windowNum, context, eventNumber, clickNumber, pressure) {
return objc_msgSend(objc_msgSend(NSEvent, "alloc"), "initMouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", type, location, flags, time, windowNum, context, eventNumber, clickNumber, pressure);
}, "void");

class_addMethod(meta_class, "mouseLocation", function(self, _cmd) {
return NSMakePoint(0,0);
}, "void");

