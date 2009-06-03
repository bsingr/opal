var the_class = objc_allocateClassPair(NSController, "NSObjectController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_objectClass", "NSString");
class_addIvar(the_class, "_content", "id");
class_addIvar(the_class, "_selection", "id");
class_addIvar(the_class, "_editable", "BOOL");
class_addIvar(the_class, "_automaticallyPreparesContent", "BOOL");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSController, receiver:self}, "init");
return self;
}, "void");

class_addMethod(the_class, "setContent:", function(self, _cmd, content) {
_content = content;
}, "void");

class_addMethod(the_class, "content", function(self, _cmd) {
return _content;
}, "void");

class_addMethod(the_class, "setAutomaticallyPreparesContent:", function(self, _cmd, flag) {
_automaticallyPreparesContent = flag;
}, "void");

class_addMethod(the_class, "automaticallyPreparesContent", function(self, _cmd) {
return _automaticallyPreparesContent;
}, "void");

class_addMethod(the_class, "prepareContent", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setObjectClass:", function(self, _cmd, objectClass) {
_objectClass = objectClass;
}, "void");

class_addMethod(the_class, "objectClass", function(self, _cmd) {
return _objectClass;
}, "void");

class_addMethod(the_class, "newObject", function(self, _cmd) {
var theClass = eval(_objectClass);
var theObject = objc_msgSend(objc_msgSend(theClass, "alloc"), "init");
return theObject;
}, "void");

class_addMethod(the_class, "addObject:", function(self, _cmd, object) {
}, "void");

class_addMethod(the_class, "removeObject:", function(self, _cmd, object) {
}, "void");

class_addMethod(the_class, "add:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "canAdd", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "remove:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "canRemove", function(self, _cmd) {
return (_editable && objc_msgSend(objc_msgSend(self, "selectedObjects"), "count"));
}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
_editable = flag;
}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
return _editable;
}, "void");

class_addMethod(the_class, "selectedObjects", function(self, _cmd) {
return objc_msgSend(NSArray, "arrayWithObject:", _content);
}, "void");

class_addMethod(the_class, "selection", function(self, _cmd) {
return _selection;
}, "void");

