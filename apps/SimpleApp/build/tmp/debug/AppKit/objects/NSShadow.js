var the_class = objc_allocateClassPair(NSObject, "NSShadow");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_shadowBlurRadius", "int");
class_addIvar(the_class, "_shadowColor", "NSColor");
class_addIvar(the_class, "_shadowOffset", "NSSize");

class_addMethod(the_class, "set", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setShadowBlurRadius:", function(self, _cmd, val) {
_shadowBlurRadius = val;
}, "void");

class_addMethod(the_class, "setShadowColor:", function(self, _cmd, color) {
_shadowColor = color;
}, "void");

class_addMethod(the_class, "setShadowOffset:", function(self, _cmd, offset) {
_shadowOffset = offset;
}, "void");

class_addMethod(the_class, "shadowBlurRadius", function(self, _cmd) {
return _shadowBlurRadius;
}, "void");

class_addMethod(the_class, "shadowColor", function(self, _cmd) {
return _shadowColor;
}, "void");

class_addMethod(the_class, "shadowOffset", function(self, _cmd) {
return _shadowOffset;
}, "void");

