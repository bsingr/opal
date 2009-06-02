var the_class = objc_allocateClassPair(NSResponder, "NSWindowController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_owner", "id");

class_addMethod(the_class, "initWithWindowNibName:", function(self, _cmd, windowNibName) {
return objc_msgSend(objc_msgSend(NSWindowController, "alloc"), "initWithWindowNibName:owner:", windowNibName, self);

}, "void");

class_addMethod(the_class, "initWithWindowNibName:owner:", function(self, _cmd, windowNibName, owner) {
objc_msgSend(self, "init");
if (self)
{
_owner = owner;
objc_msgSend(NSBundle, "loadNibNamed:owner:", windowNibName, owner);

}

return self;

}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
return _window;

}, "void");

class_addMethod(the_class, "close", function(self, _cmd) {
if (_window)
objc_msgSend(_window, "close");


}, "void");

class_addMethod(the_class, "owner", function(self, _cmd) {
return _owner;

}, "void");

