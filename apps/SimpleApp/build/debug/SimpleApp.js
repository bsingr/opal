var the_class = objc_allocateClassPair(NSObject, "AppController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
return null;
}, "void");

function main(argc,argv)
{
var myDict = objc_msgSend(objc_msgSend(NSMutableDictionary, "alloc"), "init");
return NSApplicationMain();
}