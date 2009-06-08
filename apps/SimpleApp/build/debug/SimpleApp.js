function dome(ptr)
{
}
function doSomething(callback)
{
var a = function(){
printf("ten");
};
doThis(function(age,height){
printf(age,height);
});
objc_msgSend(array, "each:", function(obj){
NSLog(obj);
});
}
var the_class = objc_allocateClassPair(NSObject, "AppController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
self = objc_msgSendSuper({super_class:NSObject, receiver:self}, "init");
if (self)
{

}

return self;
}
}, "void");

function main(argc,argv)
{
var myDict = objc_msgSend(objc_msgSend(NSMutableDictionary, "alloc"), "init");
return NSApplicationMain();
}
