var the_class = objc_allocateClassPair(NSObject, "NSFont");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_name", "NSString");
class_addIvar(the_class, "_size", "CGFloat");

class_addMethod(the_class, "initWithName:size:", function(self, _cmd, fontName, fontSize) {
objc_msgSend(self, "init");
if (self)
{
_name = fontName;
_size = fontSize;

}

return self;
}, "void");

class_addMethod(the_class, "set", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
ctx.font = _size + "px " + _name;
}, "void");

class_addMethod(meta_class, "fontWithName:size:", function(self, _cmd, fontName, fontSize) {
return objc_msgSend(objc_msgSend(NSFont, "alloc"), "initWithName:size:", fontName, fontSize);
}, "void");

class_addMethod(meta_class, "systemFontOfSize:", function(self, _cmd, fontSize) {
return objc_msgSend(NSFont, "fontWithName:size:", "Helvetica", fontSize);
}, "void");

class_addMethod(meta_class, "titleBarFontOfSize:", function(self, _cmd, fontSize) {
return objc_msgSend(NSFont, "fontWithName:size:", "Helvetica", fontSize);
}, "void");

class_addMethod(meta_class, "systemFontSize", function(self, _cmd) {
return 12;
}, "void");

class_addMethod(meta_class, "smallSystemFontSize", function(self, _cmd) {
return 11;
}, "void");

