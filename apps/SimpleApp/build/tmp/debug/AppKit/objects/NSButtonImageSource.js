var the_class = objc_allocateClassPair(NSObject, "NSButtonImageSource");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_imageName", "NSImage");
class_addIvar(the_class, "_images", "NSMutableDictionary");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
_imageName = objc_msgSend(aCoder, "decodeObjectForKey:", "NSImageName");
return self;
}
}, "void");

class_addMethod(the_class, "normalImage", function(self, _cmd) {
with(self) {
var theImage = CGImageCreateWithURLDataProvider("Resources/" + _imageName + "Normal.png");
return theImage;
}
}, "void");

class_addMethod(the_class, "alternateImage", function(self, _cmd) {
with(self) {
var theImage = CGImageCreateWithURLDataProvider("Resources/" + _imageName + "Alternate.png");
return theImage;
}
}, "void");

