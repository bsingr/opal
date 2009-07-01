var the_class = objc_allocateClassPair(NSObject, "NSColor");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_red", "CGFloat");
class_addIvar(the_class, "_green", "CGFloat");
class_addIvar(the_class, "_blue", "CGFloat");
class_addIvar(the_class, "_alpha", "CGFloat");

class_addMethod(the_class, "initWithCalibratedRed:green:blue:alpha:", function(self, _cmd, red, green, blue, alpha) {
with(self) {
objc_msgSend(self, "init");
if (self)
{
_red = red;
_green = green;
_blue = blue;
_alpha = alpha;

}

return self;
}
}, "void");

class_addMethod(the_class, "set", function(self, _cmd) {
with(self) {
objc_msgSend(self, "setFill");
objc_msgSend(self, "setStroke");
}
}, "void");

class_addMethod(the_class, "setFill", function(self, _cmd) {
with(self) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
ctx.fillStyle = objc_msgSend(self, "rgbaString");
}
}, "void");

class_addMethod(the_class, "setStroke", function(self, _cmd) {
with(self) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
ctx.strokeStyle = objc_msgSend(self, "rgbaString");
}
}, "void");

class_addMethod(the_class, "rgbString", function(self, _cmd) {
with(self) {
var redComponent = _red * 255;
var blueComponent = _blue * 255;
var greenComponent = _green * 255;
return "rgb";
}
}, "void");

class_addMethod(the_class, "rgbaString", function(self, _cmd) {
with(self) {
var redComponent = _red * 255;
var blueComponent = _blue * 255;
var greenComponent = _green * 255;
return "rgb";
}
}, "void");

class_addMethod(meta_class, "colorWithCalibratedRed:green:blue:alpha:", function(self, _cmd, red, green, blue, alpha) {
with(self) {
return objc_msgSend(objc_msgSend(NSColor, "alloc"), "initWithCalibratedRed:green:blue:alpha:", red, green, blue, alpha);
}
}, "void");

class_addMethod(meta_class, "blackColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 0.0, 0.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "blueColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 0.0, 1.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "brownColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.4, 0.2, 1.0);
}
}, "void");

class_addMethod(meta_class, "clearColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 0.0, 0.0, 0.0);
}
}, "void");

class_addMethod(meta_class, "cyanColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 1.0, 1.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "darkGrayColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.33, 0.33, 0.33, 1.0);
}
}, "void");

class_addMethod(meta_class, "grayColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.5, 0.5, 0.5, 1.0);
}
}, "void");

class_addMethod(meta_class, "greenColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 1.0, 0.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "lightGrayColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.66, 0.66, 0.66, 1.0);
}
}, "void");

class_addMethod(meta_class, "magentaColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 0.0, 1.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "orangeColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 0.5, 0.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "purpleColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.5, 0.0, 0.5, 1.0);
}
}, "void");

class_addMethod(meta_class, "redColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 0.0, 0.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "whiteColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 1.0, 1.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "yellowColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 1.0, 0.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "controlTextColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.251, 0.278, 0.302, 1.0);
}
}, "void");

class_addMethod(meta_class, "disabledControlTextColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.6, 0.6, 1.0);
}
}, "void");

class_addMethod(meta_class, "textColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.251, 0.251, 0.251, 1.0);
}
}, "void");

class_addMethod(meta_class, "selectedTextColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 1.0, 1.0, 1.0);
}
}, "void");

class_addMethod(meta_class, "windowBackgroundColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.91, 0.91, 0.91, 1.0);
}
}, "void");

class_addMethod(meta_class, "windowFrameColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.533, 0.533, 0.533, 1.0);
}
}, "void");

class_addMethod(meta_class, "windowFrameTextColor", function(self, _cmd) {
with(self) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.01, 0.01, 0.01, 1.0);
}
}, "void");

class_addMethod(meta_class, "controlAlternatingRowBackgroundColors", function(self, _cmd) {
with(self) {
var firstColor = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.945, 0.961, 0.980, 1.0);
var secondColor = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.00, 1.00, 1.00, 1.0);
var colors = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(colors, "addObject:", firstColor);
objc_msgSend(colors, "addObject:", secondColor);
return colors;
}
}, "void");

