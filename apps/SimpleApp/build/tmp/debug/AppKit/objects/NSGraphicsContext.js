[d(), id (TYPE_NAME), [=(), NSGraphicsContextCurrent (IDENTIFIER), nil (IDENTIFIER)]]var the_class = objc_allocateClassPair(NSObject, "NSGraphicsContext");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_graphicsPort", "CGContextRef");

class_addMethod(the_class, "initWithGraphicsPort:flipped:", function(self, _cmd, graphicsPort, initialFlippedState) {
objc_msgSend(self, "init");
if (self)
{
_graphicsPort = graphicsPort;

}

return self;
}, "void");

class_addMethod(the_class, "graphicsPort", function(self, _cmd) {
return _graphicsPort;
}, "void");

class_addMethod(meta_class, "graphicsContextWithGraphicsPort:flipped:", function(self, _cmd, graphicsPort, initialFlippedState) {
return objc_msgSend(objc_msgSend(NSGraphicsContext, "alloc"), "initWithGraphicsPort:flipped:", graphicsPort, initialFlippedState);
}, "void");

class_addMethod(meta_class, "currentContext", function(self, _cmd) {
}, "void");

class_addMethod(meta_class, "setCurrentContext:", function(self, _cmd, context) {
}, "void");

class_addMethod(meta_class, "saveGraphicsState", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
}, "void");

class_addMethod(meta_class, "restoreGraphicsState", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
}, "void");

