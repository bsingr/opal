var the_class = objc_allocateClassPair(NSObject, "NSEnumerator");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_array", "NSArray");
class_addIvar(the_class, "_currentIndex", "NSUInteger");

class_addMethod(the_class, "initWithArray:", function(self, _cmd, array) {
with(self) {
_array = array;
_currentIndex = 0;
return self;
}
}, "void");

class_addMethod(the_class, "nextObject", function(self, _cmd) {
with(self) {
_currentIndex += 1;
return objc_msgSend(_array, "objectAtIndex:", _currentIndex - 1);
}
}, "void");

var the_class = NSEnumerator;
var meta_class = the_class.isa;

class_addMethod(the_class, "allObjects", function(self, _cmd) {
with(self) {
return _array;
}
}, "void");

