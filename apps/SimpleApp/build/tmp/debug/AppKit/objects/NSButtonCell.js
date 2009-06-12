var the_class = objc_allocateClassPair(NSCell, "NSButtonCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_alternateImage", "NSImage");
class_addIvar(the_class, "_image", "NSImage");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSButtonFlags");
var flags2 = objc_msgSend(aCoder, "decodeIntForKey:", "NSButtonFlags2");
_isBordered = (flags & 0x00800000) ? YES : NO;
_bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
_alternateImage = objc_msgSend(aCoder, "decodeObjectForKey:", "NSAlternateImage");
if (_alternateImage)
{
_image = objc_msgSend(_alternateImage, "normalImage");
_alternateImage = objc_msgSend(_alternateImage, "alternateImage");

}

return self;
}
}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alternateTitle", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlternateTitle:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alternateImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlternateImage:", function(self, _cmd, image) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imagePosition", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImagePosition:", function(self, _cmd, aPosition) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageScaling", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImageScaling:", function(self, _cmd, scaling) {
with(self) {
}
}, "void");

class_addMethod(the_class, "highlightsBy", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHighlightsBy:", function(self, _cmd, aType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsStateBy", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsStateBy:", function(self, _cmd, aType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setButtonType:", function(self, _cmd, aType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isTransparent", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTransparent:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setPeriodicDelay:interval:", function(self, _cmd, delay, interval) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getPeriodicDelay:interval:", function(self, _cmd, delay, interval) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setKeyEquivalent:", function(self, _cmd, aKeyEquivalent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentModifierMask", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setKeyEquivalentModifierMask:", function(self, _cmd, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentFont", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setKeyEquivalentFont:", function(self, _cmd, fontObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setKeyEquivalentFont:size:", function(self, _cmd, fontName, fontSize) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextClearRect(c,cellFrame);
objc_msgSend(self, "drawBezelWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawTitle:withFrame:inView:", _value, cellFrame, controlView);
}
}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
if (_image)
{
if (_state == 1)
objc_msgSend(self, "drawImage:withFrame:inView:", _alternateImage, CGRectMake(1,1,17,17), controlView);
else
objc_msgSend(self, "drawImage:withFrame:inView:", _image, CGRectMake(1,1,17,17), controlView);


}

}
}, "void");

class_addMethod(the_class, "drawImage:withFrame:inView:", function(self, _cmd, image, frame, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
if (!_isEnabled)
CGContextSetAlpha(c,0.8);

CGContextDrawImage(c,frame,image);
CGContextRestoreGState(c);
}
}, "void");

class_addMethod(the_class, "drawTitle:withFrame:inView:", function(self, _cmd, title, rect, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
if (_isEnabled)
{
CGContextSetFillColorWithColor(c,CGColorCreateGenericRGB(0.204,0.204,0.204,1.0));
CGContextSetShadowWithColor(c,CGSizeMake(1,1),1,CGColorCreateGenericRGB(1,1,1,1));
var theFont = CGFontCreate("Arial",12,NO);
CGContextSetFont(c,theFont);
CGContextShowTextAtPoint(c,20,((rect.size.height + 12) / 2) - 1,title,14);

}
else
{
CGContextSetFillColorWithColor(c,CGColorCreateGenericRGB(0.704,0.704,0.704,1.0));
CGContextSetShadowWithColor(c,CGSizeMake(1,1),1,CGColorCreateGenericRGB(1,1,1,1));
var theFont = CGFontCreate("Arial",12,NO);
CGContextSetFont(c,theFont);
CGContextShowTextAtPoint(c,20,((rect.size.height + 12) / 2) - 1,title,14);

}

CGContextRestoreGState(c);
}
}, "void");

class_addMethod(the_class, "drawBezelWithFrame:inView:", function(self, _cmd, frame, controlView) {
with(self) {
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
if (_isEnabled && _isBordered)
{
var theImage = CGImageCreateWithURLDataProvider("Resources/NSButtonNormalLeft.png");
CGContextDrawImage(c,CGRectMake(0,0,6,24),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSButtonNormalMiddle.png");
CGContextDrawImage(c,CGRectMake(6,0,frame.size.width - 12,24),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSButtonNormalRight.png");
CGContextDrawImage(c,CGRectMake(frame.size.width - 6,0,6,24),theImage);

}
else
if (_isBordered)
{
CGContextSaveGState(c);
CGContextSetAlpha(c,0.8);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSButtonNormalLeft.png");
CGContextDrawImage(c,CGRectMake(0,0,6,24),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSButtonNormalMiddle.png");
CGContextDrawImage(c,CGRectMake(6,0,frame.size.width - 12,24),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSButtonNormalRight.png");
CGContextDrawImage(c,CGRectMake(frame.size.width - 6,0,6,24),theImage);
CGContextRestoreGState(c);

}


CGContextRestoreGState(c);
}
}, "void");

class_addMethod(meta_class, "load", function(self, _cmd) {
with(self) {
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSButtonNormalLeft","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSButtonNormalMiddle","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSButtonNormalRight","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSwitchNormal","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSwitchAlternate","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSRadioButtonNormal","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSRadioButtonAlternate","png","");
}
}, "void");

var the_class = NSButtonCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlternateTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlternateMnemonicLocation:", function(self, _cmd, location) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alternateMnemonicLocation", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alternateMnemonic", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSButtonCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "gradientType", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setGradientType:", function(self, _cmd, type) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImageDimsWhenDisabled:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageDimsWhenDisabled", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsBorderOnlyWhileMouseInside:", function(self, _cmd, show) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsBorderOnlyWhileMouseInside", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mouseEntered:", function(self, _cmd, event) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mouseExited:", function(self, _cmd, event) {
with(self) {
}
}, "void");

class_addMethod(the_class, "backgroundColor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBackgroundColor:", function(self, _cmd, color) {
with(self) {
}
}, "void");

var the_class = NSButtonCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedTitle", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttributedTitle:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attributedAlternateTitle", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttributedAlternateTitle:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

var the_class = NSButtonCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, bezelStyle) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
with(self) {
}
}, "void");

