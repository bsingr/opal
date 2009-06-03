var the_class = objc_allocateClassPair(NSObject, "NSGradient");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_theColors", "NSMutableArray");

class_addMethod(the_class, "initWithStartingColor:endingColor:", function(self, _cmd, startingColor, endingColor) {
var theArray = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 2);
objc_msgSend(theArray, "addObject:", startingColor);
objc_msgSend(theArray, "addObject:", endingColor);
return objc_msgSend(self, "initWithColors:", theArray);
}, "void");

class_addMethod(the_class, "initWithColors:", function(self, _cmd, colorArray) {
objc_msgSend(self, "init");
if (self)
{
_theColors = colorArray;

}

return self;
}, "void");

class_addMethod(the_class, "drawInRect:angle:", function(self, _cmd, rect, angle) {
}, "void");

class_addMethod(the_class, "drawInBezierPath:angle:", function(self, _cmd, path, angle) {
}, "void");

