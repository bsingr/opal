var the_class = objc_allocateClassPair(NSObject, "NSException");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initWithName:reason:userInfo:", function(self, _cmd, aName, aReason, aUserInfo) {
with(self) {
_name = aName;
_reason = aReason;
_userInfo = aUserInfo;
return self;
}
}, "void");

class_addMethod(the_class, "name", function(self, _cmd) {
with(self) {
return _name;
}
}, "void");

class_addMethod(the_class, "reason", function(self, _cmd) {
with(self) {
return _reason;
}
}, "void");

class_addMethod(the_class, "userInfo", function(self, _cmd) {
with(self) {
return _userInfo;
}
}, "void");

class_addMethod(the_class, "raise", function(self, _cmd) {
with(self) {
objc_exception_throw(self);
}
}, "void");

class_addMethod(meta_class, "alloc", function(self, _cmd) {
with(self) {
return objc_exception_create();
}
}, "void");

class_addMethod(meta_class, "exceptionWithName:reason:userInfo:", function(self, _cmd, name, reason, userInfo) {
with(self) {
return objc_msgSend(objc_msgSend(self, "alloc"), "initWithName:reason:userInfo:", name, reason, userInfo);
}
}, "void");

objc_exception.prototype.isa = NSException;
var the_class = NSException;
var meta_class = the_class.isa;

class_addMethod(meta_class, "raise:format:", function(self, _cmd, name, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "raise:format:arguments:", function(self, _cmd, name, format, argList) {
with(self) {
}
}, "void");

