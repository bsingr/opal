var the_class = objc_allocateClassPair(NSObject, "NSShadow");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_shadowBlurRadius", "int");
class_addIvar(the_class, "_shadowColor", "NSColor");
class_addIvar(the_class, "_shadowOffset", "NSSize");

class_addMethod(the_class, "set", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShadowBlurRadius:", function(self, _cmd, val) {
with(self) {
_shadowBlurRadius = val;
}
}, "void");

class_addMethod(the_class, "setShadowColor:", function(self, _cmd, color) {
with(self) {
_shadowColor = color;
}
}, "void");

class_addMethod(the_class, "setShadowOffset:", function(self, _cmd, offset) {
with(self) {
_shadowOffset = offset;
}
}, "void");

class_addMethod(the_class, "shadowBlurRadius", function(self, _cmd) {
with(self) {
return _shadowBlurRadius;
}
}, "void");

class_addMethod(the_class, "shadowColor", function(self, _cmd) {
with(self) {
return _shadowColor;
}
}, "void");

class_addMethod(the_class, "shadowOffset", function(self, _cmd) {
with(self) {
return _shadowOffset;
}
}, "void");

