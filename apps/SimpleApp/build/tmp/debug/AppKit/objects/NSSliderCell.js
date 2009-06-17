var the_class = objc_allocateClassPair(NSCell, "NSSliderCell");
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
class_addIvar(the_class, "_minValue", "DOUBLE");
class_addIvar(the_class, "_maxValue", "DOUBLE");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "initWithCoder:", aCoder);
_minValue = objc_msgSend(aCoder, "decodeDoubleForKey:", "NSMinValue");
_maxValue = objc_msgSend(aCoder, "decodeDoubleForKey:", "NSMaxValue");
_value = objc_msgSend(aCoder, "decodeDoubleForKey:", "NSValue");
return aCoder;
}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
var SLIDER_PADDING = 8.5;
var KNOB_PADDING = 2;
var c = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextSaveGState(c);
if (!_isEnabled)
CGContextSetAlpha(c,0.8);

var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalLeft.png");
CGContextDrawImage(c,CGRectMake(KNOB_PADDING,8,5,5),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalMiddle.png");
CGContextDrawImage(c,CGRectMake(5 + KNOB_PADDING,8,(cellFrame.size.width - 10) - (2 * KNOB_PADDING),5),theImage);
var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalRight.png");
CGContextDrawImage(c,CGRectMake((cellFrame.size.width - 5) - KNOB_PADDING,8,5,5),theImage);
var knobPosition = (((_value / (_maxValue - _minValue)) * ((cellFrame.size.width - (2 * SLIDER_PADDING)))));
var theImage = CGImageCreateWithURLDataProvider("Resources/NSSliderHorizontalKnobNormal.png");
CGContextDrawImage(c,CGRectMake(knobPosition,2,17,17),theImage);
CGContextRestoreGState(c);
}
}, "void");

class_addMethod(the_class, "drawBarInside:flipped:", function(self, _cmd, cellFrame, flipped) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawKnob:", function(self, _cmd, rect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "startTrackingAt:inView:", function(self, _cmd, startPoint, controlView) {
with(self) {
if (objc_msgSend(self, "isEnabled"))
{
var SLIDER_PADDING = 8.5;
var location = objc_msgSend(controlView, "convertPoint:fromView:", startPoint, null);
objc_msgSend(self, "setDoubleValue:", ((location.x - SLIDER_PADDING) / (objc_msgSend(controlView, "bounds").size.width - (2 * SLIDER_PADDING))) * (_maxValue - _minValue));
objc_msgSend(self, "drawWithFrame:inView:", objc_msgSend(controlView, "bounds"), controlView);
return YES;

}

return NO;
}
}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {
with(self) {
if (aDouble < _minValue)
_value = _minValue;
else
if (aDouble > _maxValue)
_value = _maxValue;
else
_value = aDouble;


NSLog(_value);
}
}, "void");

class_addMethod(the_class, "continueTracking:at:inView:", function(self, _cmd, lastPoint, currentPoint, controlView) {
with(self) {
var SLIDER_PADDING = 8.5;
var location = objc_msgSend(controlView, "convertPoint:fromView:", currentPoint, null);
objc_msgSend(self, "setDoubleValue:", ((location.x - SLIDER_PADDING) / (objc_msgSend(controlView, "bounds").size.width - (2 * SLIDER_PADDING))) * (_maxValue - _minValue));
objc_msgSend(self, "drawWithFrame:inView:", objc_msgSend(controlView, "bounds"), controlView);
return YES;
}
}, "void");

class_addMethod(the_class, "stopTracking:at:inView:mouseIsUp:", function(self, _cmd, lastPoint, stopPoint, controlView, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "minValue", function(self, _cmd) {
with(self) {
return _minValue;
}
}, "void");

class_addMethod(the_class, "setMinValue:", function(self, _cmd, aDouble) {
with(self) {
_minValue = aDouble;
}
}, "void");

class_addMethod(the_class, "maxValue", function(self, _cmd) {
with(self) {
return _maxValue;
}
}, "void");

class_addMethod(the_class, "setMaxValue:", function(self, _cmd, aDouble) {
with(self) {
_maxValue = aDouble;
}
}, "void");

class_addMethod(the_class, "setAltIncrementValue:", function(self, _cmd, incValue) {
with(self) {
}
}, "void");

class_addMethod(the_class, "altIncrementValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isVertical", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitleColor:", function(self, _cmd, newColor) {
with(self) {
}
}, "void");

class_addMethod(the_class, "titleColor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitleFont:", function(self, _cmd, fontObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "titleFont", function(self, _cmd) {
with(self) {
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

class_addMethod(the_class, "setTitleCell:", function(self, _cmd, aCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "titleCell", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setKnobThickness:", function(self, _cmd, aFloat) {
with(self) {
}
}, "void");

class_addMethod(the_class, "knobThickness", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "knobRectFlipped:", function(self, _cmd, flipped) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawKnob:", function(self, _cmd, knobRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawKnob", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawBarInside:flipped:", function(self, _cmd, aRect, flipped) {
with(self) {
}
}, "void");

class_addMethod(the_class, "trackRect", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSliderType:", function(self, _cmd, sliderType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sliderType", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "load", function(self, _cmd) {
with(self) {
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalLeft","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalMiddle","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalRight","png","");
CFBundlePreloadResource(CFBundleGetBundleForClass(self),"NSSliderHorizontalKnobNormal","png","");
}
}, "void");

class_addMethod(meta_class, "prefersTrackingUntilMouseUp", function(self, _cmd) {
with(self) {
}
}, "void");

