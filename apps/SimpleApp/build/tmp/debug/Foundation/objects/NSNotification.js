var the_class = objc_allocateClassPair(NSObject, "NSNotification");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "name", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "object", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "userInfo", function(self, _cmd) {

}, "void");

var the_class = NSNotification;
var meta_class = the_class.isa;

class_addMethod(meta_class, "notificationWithName:object:", function(self, _cmd, aName, anObject) {

}, "void");

class_addMethod(meta_class, "notificationWithName:object:userInfo:", function(self, _cmd, aName, anObject, aUserInfo) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSNotificationCenter");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "addObserver:selector:name:object:", function(self, _cmd, observer, aSelector, aName, anObject) {

}, "void");

class_addMethod(the_class, "postNotification:", function(self, _cmd, notification) {

}, "void");

class_addMethod(the_class, "postNotificationName:object:", function(self, _cmd, aName, anObject) {

}, "void");

class_addMethod(the_class, "postNotificationName:object:userInfo:", function(self, _cmd, aName, anObject, aUserInfo) {

}, "void");

class_addMethod(the_class, "removeObserver:", function(self, _cmd, observer) {

}, "void");

class_addMethod(the_class, "removeObserver:name:object:", function(self, _cmd, observer, aName, anObject) {

}, "void");

class_addMethod(meta_class, "defaultCenter", function(self, _cmd) {

}, "void");

