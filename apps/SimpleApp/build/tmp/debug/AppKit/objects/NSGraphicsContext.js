var NSGraphicsContextCurrent = null;
var the_class = objc_allocateClassPair(NSObject, "NSGraphicsContext");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_graphicsPort", "CGContextRef");

class_addMethod(the_class, "initWithGraphicsPort:flipped:", function(self, _cmd, graphicsPort, initialFlippedState) {
with(self) {
objc_msgSend(self, "init");
if (self)
{
_graphicsPort = graphicsPort;

}

return self;
}
}, "void");

class_addMethod(the_class, "graphicsPort", function(self, _cmd) {
with(self) {
return _graphicsPort;
}
}, "void");

class_addMethod(meta_class, "graphicsContextWithGraphicsPort:flipped:", function(self, _cmd, graphicsPort, initialFlippedState) {
with(self) {
return objc_msgSend(objc_msgSend(NSGraphicsContext, "alloc"), "initWithGraphicsPort:flipped:", graphicsPort, initialFlippedState);
}
}, "void");

class_addMethod(meta_class, "currentContext", function(self, _cmd) {
with(self) {
return NSGraphicsContextCurrent;
}
}, "void");

class_addMethod(meta_class, "setCurrentContext:", function(self, _cmd, context) {
with(self) {
NSGraphicsContextCurrent = context;
}
}, "void");

class_addMethod(meta_class, "saveGraphicsState", function(self, _cmd) {
with(self) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(ctx);
}
}, "void");

class_addMethod(meta_class, "restoreGraphicsState", function(self, _cmd) {
with(self) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextRestoreGState(ctx);
}
}, "void");

